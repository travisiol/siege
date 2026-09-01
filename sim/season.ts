import { TIER_YIELD } from "./hex.ts";
import { UPKEEP_PCT } from "./rules.ts";
import {
  createWorld, snapshot, validateAndPrice, resolveTick, effectsHash, mulberry32,
  type World, type Order,
} from "./engine.ts";
import { decideOrders, updateIntel } from "./agents.ts";
import type { Config } from "./config.ts";

/** Melange deterministe, uniquement pour tester l'independance a l'ordre. */
function shuffled<T>(arr: T[], seed: number): T[] {
  const r = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

export function runSeason(cfg: Config, seed: number): World {
  const w = createWorld(cfg, seed);

  for (let t = 1; t <= cfg.ticksPerSeason; t++) {
    w.tick = t;
    const snap = snapshot(w);
    const before = w.agents.map((a) => a.balance);

    // --- Phase commit (les montants restent scelles) puis reveal
    const committed = decideOrders(w, snap, t);
    const revealed: Order[] = [];
    for (const o of committed) {
      const a = w.agents[o.agent];
      if (w.rng() < cfg.missReveal[a.arch]) {
        // Reveal manquant: 10% brules, 90% rendus.
        // ATTENTION: tel que specifie, ceci est irrealisable onchain -- le contrat ne
        // peut pas lire un montant qui n'a jamais ete revele. Voir README, trou #1.
        const burn = (o.amount * 10n) / 100n;
        if (burn <= a.balance) {
          a.balance -= burn;
          w.burned += burn;
          w.burnBy.missedReveal += burn;
        }
        a.misses++;
        continue;
      }
      revealed.push(o);
    }

    const { valid, debit, burn } = validateAndPrice(w, snap, revealed);
    for (const [agentId, amount] of debit) w.agents[agentId].balance -= amount;
    w.burned += burn;                                  // surcout de taxe d'empire
    w.burnBy.empireTax += burn;

    const actors = new Set<number>();
    for (const o of valid) actors.add(o.agent);
    for (const id of actors) w.agents[id].reveals++;
    for (const o of valid) w.agents[o.agent].staked += o.amount;

    const activeByGuild = new Array(cfg.guilds).fill(0);
    const seen = new Set<string>();
    for (const o of valid) {
      const k = o.guild + ":" + o.agent;
      if (seen.has(k)) continue;
      seen.add(k);
      activeByGuild[o.guild - 1]++;
    }

    // --- Resolution
    const eff = resolveTick(w, snap, valid, activeByGuild, t);

    // Invariant M1 prouve des M0: rejouer le tick dans un autre ordre de transactions
    // doit donner exactement le meme resultat.
    if (valid.length > 1 && t % 7 === 0) {
      const alt = resolveTick(w, snap, shuffled(valid, seed ^ (t * 2654435761)), activeByGuild, t);
      w.stats.orderIndependenceChecks++;
      if (effectsHash(alt) !== effectsHash(eff)) w.stats.orderIndependenceFailures++;
    }

    w.stats.battles += eff.battles;
    w.burned += eff.burn;
    w.burnBy.battle += eff.burn;
    for (const [agentId, amount] of eff.balance) w.agents[agentId].balance += amount;

    // --- Application: conquetes
    for (const c of eff.conquests) {
      const h = w.hexes[c.hex];
      w.guilds[c.from - 1].hexes.delete(c.hex);
      w.guilds[c.from - 1].losses++;
      w.guilds[c.to - 1].hexes.add(c.hex);
      w.guilds[c.to - 1].conquests++;
      h.owner = c.to;
      h.heldSinceTick = t;
      h.lastDefendedTick = t;

      // 100% du treasury au vainqueur, au prorata des mises engagees.
      let total = 0n;
      for (const p of c.contributors) total += p[1];
      let given = 0n;
      if (total > 0n && h.treasury > 0n) {
        for (const [id, v] of c.contributors) {
          const share = (h.treasury * v) / total;
          w.agents[id].balance += share;
          w.agents[id].gained += share;
          given += share;
        }
      }
      w.burned += h.treasury - given;                  // reliquat de troncature
      w.burnBy.dust += h.treasury - given;
      h.treasury = 0n;

      h.positions = new Map<number, bigint>();
      for (const [id, v] of c.contributors) h.positions.set(id, (h.positions.get(id) ?? 0n) + v);
      w.stats.conquests++;
    }

    // --- Application: claims
    for (const c of eff.claims) {
      const h = w.hexes[c.hex];
      let cost = 0n;
      for (const p of c.contributors) cost += p[1];
      w.guilds[c.guild - 1].hexes.add(c.hex);
      h.owner = c.guild;
      h.heldSinceTick = t;
      h.lastDefendedTick = t;
      h.treasury += cost;                              // le cout de claim amorce le treasury
      h.positions = new Map<number, bigint>();
      for (const [id, v] of c.contributors) h.positions.set(id, (h.positions.get(id) ?? 0n) + v);
      // Le premier hex d'une guilde devient son refuge.
      if (w.guilds[c.guild - 1].refuge === -1) {
        w.guilds[c.guild - 1].refuge = c.hex;
        h.isRefuge = true;
      }
      w.guilds[c.guild - 1].claimed++;
      w.stats.claims++;
    }

    // --- Defenses reussies: la mise consolide (ou non) la position ERC-1155
    for (const o of valid) {
      if (o.kind !== "defend") continue;
      const h = w.hexes[o.hex];
      if (h.owner !== o.guild) continue;
      if (cfg.positionModel === "accumulate") {
        h.positions.set(o.agent, (h.positions.get(o.agent) ?? 0n) + o.amount);
      }
      h.lastDefendedTick = t;
    }

    // --- Rendement puis upkeep (la cagnotte est pre-financee: aucun mint)
    for (const h of w.hexes) {
      if (h.owner === 0) continue;
      const y = TIER_YIELD[h.tier] * cfg.yieldUnit;
      const pay = y < w.seasonPool ? y : w.seasonPool;
      w.seasonPool -= pay;
      w.yieldPaid += pay;
      h.treasury += pay;
      const up = (h.treasury * UPKEEP_PCT) / 100n;
      h.treasury -= up;
      w.seasonPool += up;
    }

    updateIntel(w, valid);

    // --- Abandon
    for (const a of w.agents) {
      if (!a.alive) continue;
      const delta = a.balance - before[a.id];
      if (delta < 0n) { a.frustration++; a.lost += -delta; }
      else if (delta > 0n) { a.frustration = Math.max(0, a.frustration - 1); a.gained += delta; }

      if (a.balance * 5n < a.initial) {                // ruine: moins de 20% du capital
        a.alive = false; a.quitTick = t; continue;
      }
      const hazard = cfg.quitHazard[a.arch] * (1 + a.frustration / 10);
      if (w.rng() < hazard) { a.alive = false; a.quitTick = t; }
    }
  }

  // --- Fin de saison: la cagnotte restante va au territoire detenu (tier-pondere).
  w.poolBeforeDistribution = w.seasonPool;
  distributeSeasonPool(w);
  return w;
}

function distributeSeasonPool(w: World): void {
  const weight = new Map<number, bigint>();
  let total = 0n;
  for (const h of w.hexes) {
    if (h.owner === 0) continue;
    let stake = 0n;
    for (const v of h.positions.values()) stake += v;
    if (stake === 0n) continue;
    for (const [id, v] of h.positions) {
      const share = (TIER_YIELD[h.tier] * 1_000_000n * v) / stake;
      weight.set(id, (weight.get(id) ?? 0n) + share);
      total += share;
    }
  }
  if (total === 0n) return;
  const pool = w.seasonPool;
  let given = 0n;
  for (const [id, v] of [...weight.entries()].sort((a, b) => a[0] - b[0])) {
    const cut = (pool * v) / total;
    w.agents[id].balance += cut;
    w.agents[id].gained += cut;
    given += cut;
  }
  w.seasonPool -= given;
}
