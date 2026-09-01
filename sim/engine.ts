import { WAD } from "./fixed.ts";
import { buildMap, type MapSpec } from "./hex.ts";
import {
  attackPower, defensePower, attackCost, rawPower,
  claimCost, NO_DEFENSE_LAPSE_TICKS,
} from "./rules.ts";
import type { Config, Archetype } from "./config.ts";

// ---------------------------------------------------------------- RNG (agents uniquement)
// La regle de jeu est 100% deterministe. Ce RNG ne pilote que le COMPORTEMENT des agents
// simules (qui agit, qui rate son reveal, qui abandonne) -- jamais une resolution.
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------- Etat
export type Agent = {
  id: number;
  entity: number;          // regroupe les wallets Sybil d'un meme acteur
  guild: number;           // 1-indexe
  arch: Archetype;
  balance: bigint;
  initial: bigint;
  alive: boolean;
  quitTick: number;
  frustration: number;
  staked: bigint;
  lost: bigint;
  gained: bigint;
  reveals: number;
  misses: number;
};

export type Hex = {
  id: number;
  tier: 1 | 2 | 3;
  owner: number;           // 0 = neutre
  treasury: bigint;
  heldSinceTick: number;
  lastDefendedTick: number;
  isRefuge: boolean;
  positions: Map<number, bigint>;  // ERC-1155: agentId -> part de la mise
};

export type Guild = {
  id: number;
  members: number[];
  hexes: Set<number>;
  refuge: number;          // -1 tant que la guilde n'a aucun hex
  conquests: number;
  claimed: number;
  losses: number;
};

export type World = {
  cfg: Config;
  map: MapSpec;
  hexes: Hex[];
  guilds: Guild[];
  agents: Agent[];
  burned: bigint;
  /** Origine des tokens detruits: sert a savoir quelle regle brule l'economie. */
  burnBy: { empireTax: bigint; missedReveal: bigint; battle: bigint; dust: bigint };
  seasonPool: bigint;
  /** Cagnotte restante AVANT la distribution de fin de saison. */
  poolBeforeDistribution: bigint;
  yieldPaid: bigint;
  tick: number;
  rng: () => number;
  intel: bigint[];         // puissance defensive moyenne observee par guilde (info publique)
  stats: {
    battles: number; conquests: number; claims: number;
    orderIndependenceChecks: number; orderIndependenceFailures: number;
  };
};

export type OrderKind = "attack" | "defend" | "claim";
export type Order = {
  agent: number;
  guild: number;
  hex: number;
  amount: bigint;
  kind: OrderKind;
};

export type Snapshot = {
  owner: number[];
  treasury: bigint[];
  heldSinceTick: number[];
  lastDefendedTick: number[];
  isRefuge: boolean[];
  hexCount: number[];      // indexe par (guildId - 1)
  tier: number[];
};

export function snapshot(w: World): Snapshot {
  return {
    owner: w.hexes.map((h) => h.owner),
    treasury: w.hexes.map((h) => h.treasury),
    heldSinceTick: w.hexes.map((h) => h.heldSinceTick),
    lastDefendedTick: w.hexes.map((h) => h.lastDefendedTick),
    isRefuge: w.hexes.map((h) => h.isRefuge),
    hexCount: w.guilds.map((g) => g.hexes.size),
    tier: w.hexes.map((h) => h.tier),
  };
}

// ---------------------------------------------------------------- Construction du monde
export function createWorld(cfg: Config, seed: number): World {
  const map = buildMap(cfg.radius);
  const rng = mulberry32(seed);

  const hexes: Hex[] = map.cells.map((c) => ({
    id: c.id, tier: c.tier, owner: 0, treasury: 0n,
    heldSinceTick: 0, lastDefendedTick: 0, isRefuge: false,
    positions: new Map<number, bigint>(),
  }));

  const guilds: Guild[] = Array.from({ length: cfg.guilds }, (_, i) => ({
    id: i + 1, members: [], hexes: new Set<number>(), refuge: -1, conquests: 0, claimed: 0, losses: 0,
  }));

  const agents: Agent[] = [];
  let entity = 0;
  const push = (arch: Archetype, cap: bigint, ent: number, guild: number) => {
    agents.push({
      id: agents.length, entity: ent, guild, arch, balance: cap, initial: cap,
      alive: true, quitTick: -1, frustration: 0, staked: 0n, lost: 0n, gained: 0n,
      reveals: 0, misses: 0,
    });
  };

  // Les guildes 1..soloWhaleGuilds sont reservees a une whale chacune. Le reste de la
  // population se repartit sur les guildes suivantes.
  const solo = Math.min(cfg.soloWhaleGuilds, cfg.guilds - 1);
  let g = 0;
  const shared = cfg.guilds - solo;
  const nextGuild = () => { const v = solo + (g % shared) + 1; g++; return v; };

  for (let i = 0; i < cfg.counts.whale; i++) {
    const gi = i < solo ? i + 1 : nextGuild();
    const per = cfg.capital.whale / BigInt(cfg.sybilSplit);
    for (let s = 0; s < cfg.sybilSplit; s++) push("whale", per, entity, gi);
    entity++;
  }
  for (let i = 0; i < cfg.counts.medium; i++) push("medium", cfg.capital.medium, entity++, nextGuild());
  for (let i = 0; i < cfg.counts.passive; i++) push("passive", cfg.capital.passive, entity++, nextGuild());

  for (const a of agents) guilds[a.guild - 1].members.push(a.id);

  return {
    cfg, map, hexes, guilds, agents, burned: 0n,
    burnBy: { empireTax: 0n, missedReveal: 0n, battle: 0n, dust: 0n },
    seasonPool: cfg.seasonPool, poolBeforeDistribution: 0n, yieldPaid: 0n, tick: 0, rng,
    intel: new Array(cfg.guilds + 1).fill(0n),
    stats: {
      battles: 0, conquests: 0, claims: 0,
      orderIndependenceChecks: 0, orderIndependenceFailures: 0,
    },
  };
}

// ---------------------------------------------------------------- Validation
export function adjacentToGuild(map: MapSpec, snap: Snapshot, hexId: number, guild: number): boolean {
  for (const nb of map.cells[hexId].neighbors) if (snap.owner[nb] === guild) return true;
  return false;
}

/**
 * Filtre les ordres invalides et applique la contrainte de solde.
 * Le tri par (agent, hex) rend l'elagage independant de l'ordre d'arrivee des reveals.
 * Voir README trou #4: onchain, cette propriete exige un bond pose au commit.
 */
export function validateAndPrice(
  w: World, snap: Snapshot, orders: Order[],
): { valid: Order[]; debit: Map<number, bigint>; burn: bigint } {
  const map = w.map;
  const sorted = [...orders].sort(
    (a, b) => a.agent - b.agent || a.hex - b.hex || a.kind.localeCompare(b.kind),
  );
  const valid: Order[] = [];
  const debit = new Map<number, bigint>();
  let burn = 0n;

  for (const o of sorted) {
    if (o.amount <= 0n) continue;
    const cell = map.cells[o.hex];
    const owner = snap.owner[o.hex];

    if (o.kind === "defend") {
      if (owner !== o.guild) continue;
    } else if (o.kind === "attack") {
      if (owner === 0 || owner === o.guild) continue;
      if (snap.isRefuge[o.hex]) continue;                      // le refuge est intouchable
      if (!adjacentToGuild(map, snap, o.hex, o.guild)) continue;
    } else {
      if (owner !== 0) continue;
      const firstHex = snap.hexCount[o.guild - 1] === 0;
      if (firstHex ? !cell.isBorder : !adjacentToGuild(map, snap, o.hex, o.guild)) continue;
    }

    const cost = o.kind === "attack" ? attackCost(o.amount, snap.hexCount[o.guild - 1]) : o.amount;
    const used = debit.get(o.agent) ?? 0n;
    if (used + cost > w.agents[o.agent].balance) continue;     // solde insuffisant: ordre ecarte
    debit.set(o.agent, used + cost);

    if (o.kind === "attack") burn += cost - o.amount;          // le surcout d'empire est brule
    valid.push(o);
  }
  return { valid, debit, burn };
}

// ---------------------------------------------------------------- Resolution (pure)
export type Effects = {
  balance: Map<number, bigint>;         // credits post-resolution (remboursements + gains)
  burn: bigint;
  conquests: { hex: number; from: number; to: number; contributors: [number, bigint][] }[];
  claims: { hex: number; guild: number; contributors: [number, bigint][] }[];
  defended: number[];
  battles: number;
};

function credit(m: Map<number, bigint>, id: number, v: bigint) {
  m.set(id, (m.get(id) ?? 0n) + v);
}

/** Repartit `pot` au prorata des mises. Retourne le reliquat de troncature (a bruler). */
function proRata(pot: bigint, parts: [number, bigint][], out: Map<number, bigint>): bigint {
  let total = 0n;
  for (const p of parts) total += p[1];
  if (total === 0n) return pot;
  let given = 0n;
  for (const [id, v] of parts) {
    const share = (pot * v) / total;
    credit(out, id, share);
    given += share;
  }
  return pot - given;
}

/**
 * Resout TOUTES les batailles du tick contre le snapshot de debut de tick.
 * Aucune consequence d'une bataille n'est visible par une autre: c'est ce qui rend le
 * resultat independant de l'ordre des transactions (invariant M1).
 */
export function resolveTick(
  w: World, snap: Snapshot, orders: Order[], activeByGuild: number[], t: number,
): Effects {
  const eff: Effects = {
    balance: new Map<number, bigint>(), burn: 0n,
    conquests: [], claims: [], defended: [], battles: 0,
  };

  const byHex = new Map<number, Order[]>();
  for (const o of orders) {
    const arr = byHex.get(o.hex);
    if (arr) arr.push(o); else byHex.set(o.hex, [o]);
  }

  for (const hexId of [...byHex.keys()].sort((a, b) => a - b)) {
    const list = byHex.get(hexId)!.sort((a, b) => a.guild - b.guild || a.agent - b.agent);
    const owner = snap.owner[hexId];

    // ---- Hex neutre: claim sans combat
    if (owner === 0) {
      const claims = list.filter((o) => o.kind === "claim");
      if (claims.length === 0) continue;

      const byGuild = new Map<number, Order[]>();
      for (const o of claims) {
        const arr = byGuild.get(o.guild);
        if (arr) arr.push(o); else byGuild.set(o.guild, [o]);
      }

      let best = -1n, winner = 0;
      for (const gid of [...byGuild.keys()].sort((a, b) => a - b)) {
        const p = rawPower(byGuild.get(gid)!.map((o) => o.amount));
        if (p > best) { best = p; winner = gid; }        // egalite -> plus petit guildId
      }

      const cost = claimCost(snap.tier[hexId], WAD);
      const winOrders = byGuild.get(winner)!;
      let pooled = 0n;
      for (const o of winOrders) pooled += o.amount;

      if (pooled < cost) {                               // fonds insuffisants: tout est rendu
        for (const o of claims) credit(eff.balance, o.agent, o.amount);
        continue;
      }
      // Le cout de claim finance le treasury initial de l'hex; l'excedent est rendu.
      const contributors: [number, bigint][] = [];
      let consumed = 0n;
      for (const o of winOrders) {
        const part = (cost * o.amount) / pooled;
        contributors.push([o.agent, part]);
        credit(eff.balance, o.agent, o.amount - part);
        consumed += part;
      }
      eff.burn += cost - consumed;                       // reliquat de troncature
      for (const o of claims) if (o.guild !== winner) credit(eff.balance, o.agent, o.amount);
      eff.claims.push({ hex: hexId, guild: winner, contributors });
      continue;
    }

    // ---- Hex detenu: bataille
    const defenders = list.filter((o) => o.kind === "defend" && o.guild === owner);
    const attacksByGuild = new Map<number, Order[]>();
    for (const o of list) {
      if (o.kind !== "attack" || o.guild === owner) continue;
      const arr = attacksByGuild.get(o.guild);
      if (arr) arr.push(o); else attacksByGuild.set(o.guild, [o]);
    }

    if (defenders.length > 0) eff.defended.push(hexId);

    if (attacksByGuild.size === 0) {                     // pas d'attaque: mises rendues
      for (const o of defenders) credit(eff.balance, o.agent, o.amount);
      continue;
    }
    eff.battles++;

    const lapsed = t - snap.lastDefendedTick[hexId] >= NO_DEFENSE_LAPSE_TICKS;
    const D = defensePower({
      stakes: defenders.map((o) => o.amount),
      activeMembers: activeByGuild[owner - 1] ?? 0,
      tick: t,
      heldSinceTick: snap.heldSinceTick[hexId],
      fortificationLapsed: lapsed,
    });

    let bestA = -1n, winner = 0, tie = false;
    for (const gid of [...attacksByGuild.keys()].sort((a, b) => a - b)) {
      const A = attackPower({
        stakes: attacksByGuild.get(gid)!.map((o) => o.amount),
        activeMembers: activeByGuild[gid - 1] ?? 0,
        guildHexCount: snap.hexCount[gid - 1],
        tick: t,
      });
      if (A > bestA) { bestA = A; winner = gid; tie = false; }
      else if (A === bestA) tie = true;
    }
    // A > D strictement. Egalite parfaite entre attaquants -> le defenseur tient.
    const taken = bestA > D && !tie;

    const defParts: [number, bigint][] = defenders.map((o) => [o.agent, o.amount]);
    const losers = [...attacksByGuild.keys()].filter((g) => !(taken && g === winner)).sort((a, b) => a - b);

    // Attaquants perdants: 10% au defenseur, 10% brule, 80% rendu.
    for (const gid of losers) {
      for (const o of attacksByGuild.get(gid)!) {
        const cut = (o.amount * 10n) / 100n;
        credit(eff.balance, o.agent, o.amount - 2n * cut);
        eff.burn += cut;
        eff.burn += proRata(cut, defParts, eff.balance); // sans defenseur, cette part brule aussi
      }
    }

    if (!taken) {
      for (const o of defenders) credit(eff.balance, o.agent, o.amount);
      continue;
    }

    // Conquete: le defenseur recupere 80%, 10% au vainqueur, 10% brule.
    const winOrders = attacksByGuild.get(winner)!;
    const winParts: [number, bigint][] = winOrders.map((o) => [o.agent, o.amount]);
    for (const o of winOrders) credit(eff.balance, o.agent, o.amount);
    for (const o of defenders) {
      const cut = (o.amount * 10n) / 100n;
      credit(eff.balance, o.agent, o.amount - 2n * cut);
      eff.burn += cut;
      eff.burn += proRata(cut, winParts, eff.balance);
    }
    eff.conquests.push({ hex: hexId, from: owner, to: winner, contributors: winParts });
  }
  return eff;
}

/** Empreinte des effets: sert a prouver l'independance a l'ordre des transactions. */
export function effectsHash(eff: Effects): string {
  const bal = [...eff.balance.entries()].sort((a, b) => a[0] - b[0])
    .map(([k, v]) => k + ":" + v).join(",");
  const con = [...eff.conquests].sort((a, b) => a.hex - b.hex)
    .map((c) => c.hex + ">" + c.to).join(",");
  const cla = [...eff.claims].sort((a, b) => a.hex - b.hex)
    .map((c) => c.hex + ">" + c.guild).join(",");
  return bal + "|" + con + "|" + cla + "|" + eff.burn;
}
