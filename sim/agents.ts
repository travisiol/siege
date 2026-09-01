import { sqrtWad, WAD } from "./fixed.ts";
import { TIER_YIELD } from "./hex.ts";
import { claimCost, empireTaxMultiplierX100, fortification, cohesion } from "./rules.ts";
import type { World, Snapshot, Order } from "./engine.ts";

/**
 * Modele de comportement. Rien ici n'est une regle de jeu: c'est l'hypothese de jeu
 * des joueurs. Les agents ne voient que l'information publique (proprietaire, tier,
 * treasury, heldSinceTick, et les reveals passes via `intel`) -- jamais les mises
 * committees du tick en cours, qui sont scellees.
 */

const VALUE_HORIZON = 20n; // on valorise un hex a ~20 ticks de rendement futur

function hexValue(w: World, snap: Snapshot, id: number): bigint {
  const tier = snap.tier[id];
  return TIER_YIELD[tier] * w.cfg.yieldUnit * VALUE_HORIZON + snap.treasury[id];
}

type GuildPlan = {
  attackTargets: number[];
  claimTargets: number[];
  defendHexes: number[];
  canAttack: boolean;
};

function planGuild(w: World, snap: Snapshot, gid: number, t: number): GuildPlan {
  const g = w.guilds[gid - 1];
  const owned = [...g.hexes].sort((a, b) => a - b);
  const hexCount = owned.length;

  // Au-dela d'un certain multiplicateur, attaquer n'a plus de sens economique.
  const canAttack = empireTaxMultiplierX100(hexCount) <= w.cfg.empireTaxStopX100;

  const attackSet = new Set<number>();
  const claimSet = new Set<number>();
  for (const h of owned) {
    for (const nb of w.map.cells[h].neighbors) {
      const owner = snap.owner[nb];
      if (owner === gid) continue;
      if (owner === 0) claimSet.add(nb);
      else if (!snap.isRefuge[nb]) attackSet.add(nb);
    }
  }

  // Premier hex: n'importe quel hex neutre du bord. On decale par guilde pour
  // que les 12 guildes ne demarrent pas toutes au meme endroit.
  if (hexCount === 0) {
    const border = w.map.cells.filter((c) => c.isBorder && snap.owner[c.id] === 0);
    if (border.length > 0) {
      const pick = border
        .map((c) => ({ id: c.id, k: (c.id * 7919 + gid * 104729) % 1000003 }))
        .sort((a, b) => a.k - b.k)[0].id;
      claimSet.add(pick);
    }
  }

  // Rendement estime d'une attaque: valeur de l'hex / resistance estimee.
  const estResistance = (id: number): bigint => {
    const owner = snap.owner[id];
    const base = w.intel[owner] > 0n ? w.intel[owner] : sqrtWad(w.cfg.capital.medium / 20n);
    const fort = fortification(t, snap.heldSinceTick[id]);
    return (base * fort) / 100n;
  };

  const attackTargets = [...attackSet]
    .sort((a, b) => {
      const ra = (hexValue(w, snap, a) * WAD) / (estResistance(a) + 1n);
      const rb = (hexValue(w, snap, b) * WAD) / (estResistance(b) + 1n);
      return rb > ra ? 1 : rb < ra ? -1 : a - b;
    })
    .slice(0, 3);

  const claimTargets = [...claimSet]
    .sort((a, b) => {
      const va = hexValue(w, snap, a), vb = hexValue(w, snap, b);
      return vb > va ? 1 : vb < va ? -1 : a - b;
    })
    .slice(0, 3);

  // On concentre la defense sur les hexes de valeur plutot que de l'etaler.
  const defendHexes = owned
    .sort((a, b) => {
      const va = hexValue(w, snap, a), vb = hexValue(w, snap, b);
      return vb > va ? 1 : vb < va ? -1 : a - b;
    })
    .slice(0, Math.max(1, Math.ceil(owned.length * 0.6)));

  return { attackTargets, claimTargets, defendHexes, canAttack };
}

export function decideOrders(w: World, snap: Snapshot, t: number): Order[] {
  const orders: Order[] = [];
  const plans = new Map<number, GuildPlan>();
  for (const g of w.guilds) plans.set(g.id, planGuild(w, snap, g.id, t));

  // Compteur d'acteurs par guilde: sert a repartir les membres sur les cibles.
  const slot = new Map<number, number>();

  for (const a of w.agents) {
    if (!a.alive) continue;
    if (w.rng() > w.cfg.participation[a.arch]) continue;

    const plan = plans.get(a.guild)!;
    const budget = (a.balance * BigInt(w.cfg.budgetPerMille[a.arch])) / 1000n;
    if (budget <= 0n) continue;

    const k = slot.get(a.guild) ?? 0;
    slot.set(a.guild, k + 1);

    const aggro = w.cfg.aggression[a.arch];
    let attackStake = (budget * BigInt(Math.round(aggro * 100))) / 100n;
    let defendStake = budget - attackStake;

    // Une guilde sans hex met tout dans le claim initial.
    const hasHex = plan.defendHexes.length > 0 && w.guilds[a.guild - 1].hexes.size > 0;
    if (!hasHex) { attackStake = 0n; defendStake = 0n; }

    // --- Claim (non taxe par la taille de l'empire: voir README, trou #6)
    // Une guilde reduite (typiquement un operateur solo) scripte plusieurs claims par
    // tick: rien dans le brief ne l'en empeche.
    const guildSize = w.guilds[a.guild - 1].members.filter((m) => w.agents[m].alive).length;
    if (plan.claimTargets.length > 0 && (guildSize <= 2 || k % 3 === 0)) {
      const targets = guildSize <= 2
        ? plan.claimTargets.slice(0, w.cfg.maxClaimsPerTick)
        : [plan.claimTargets[((k / 3) | 0) % plan.claimTargets.length]];
      let spent = 0n;
      let placed = false;
      for (const target of targets) {
        const need = claimCost(snap.tier[target], WAD);
        if (spent + need > a.balance) break;
        orders.push({ agent: a.id, guild: a.guild, hex: target, amount: need, kind: "claim" });
        spent += need;
        placed = true;
      }
      if (placed) continue;
    }

    // --- Attaque
    if (plan.canAttack && attackStake > 0n && plan.attackTargets.length > 0) {
      const target = plan.attackTargets[k % plan.attackTargets.length];
      orders.push({ agent: a.id, guild: a.guild, hex: target, amount: attackStake, kind: "attack" });
    }

    // --- Defense
    if (defendStake > 0n && plan.defendHexes.length > 0) {
      const target = plan.defendHexes[k % plan.defendHexes.length];
      orders.push({ agent: a.id, guild: a.guild, hex: target, amount: defendStake, kind: "defend" });
    }
  }
  return orders;
}

/** Les reveals sont publics: les guildes apprennent la puissance defensive adverse. */
export function updateIntel(w: World, orders: Order[]): void {
  const perGuild = new Map<number, { p: bigint; n: number }>();
  for (const o of orders) {
    if (o.kind !== "defend") continue;
    const e = perGuild.get(o.guild) ?? { p: 0n, n: 0 };
    e.p += sqrtWad(o.amount);
    e.n++;
    perGuild.set(o.guild, e);
  }
  for (const [gid, e] of perGuild) {
    const avg = e.p / BigInt(Math.max(1, e.n));
    // EMA 3/4 ancien + 1/4 nouveau
    w.intel[gid] = w.intel[gid] === 0n ? avg : (w.intel[gid] * 3n + avg) / 4n;
  }
}

export { cohesion };
