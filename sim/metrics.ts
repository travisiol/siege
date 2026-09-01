import { WAD } from "./fixed.ts";
import { TIER_YIELD } from "./hex.ts";
import type { World } from "./engine.ts";

const SCALE = 1_000_000n; // parts d'hex en millionnemes

/** Part de carte detenue par wallet, via les positions ERC-1155. En millionnemes d'hex. */
export function territoryByWallet(w: World): Map<number, bigint> {
  const out = new Map<number, bigint>();
  for (const h of w.hexes) {
    if (h.owner === 0) continue;
    let stake = 0n;
    for (const v of h.positions.values()) stake += v;
    if (stake === 0n) continue;
    for (const [id, v] of h.positions) {
      if (w.agents[id].guild !== h.owner) continue;   // position orpheline: hex repris
      out.set(id, (out.get(id) ?? 0n) + (SCALE * v) / stake);
    }
  }
  return out;
}

/** Idem, pondere par le rendement du tier (mesure la valeur, pas la surface). */
export function yieldWeightedByWallet(w: World): Map<number, bigint> {
  const out = new Map<number, bigint>();
  for (const h of w.hexes) {
    if (h.owner === 0) continue;
    let stake = 0n;
    for (const v of h.positions.values()) stake += v;
    if (stake === 0n) continue;
    for (const [id, v] of h.positions) {
      if (w.agents[id].guild !== h.owner) continue;
      out.set(id, (out.get(id) ?? 0n) + (SCALE * TIER_YIELD[h.tier] * v) / stake);
    }
  }
  return out;
}

/** Coefficient de Gini sur une population (0 = egalite parfaite, 1 = tout a un seul). */
export function gini(values: number[]): number {
  const v = values.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  const n = v.length;
  if (n === 0) return 0;
  let sum = 0, weighted = 0;
  for (let i = 0; i < n; i++) { sum += v[i]; weighted += (i + 1) * v[i]; }
  if (sum === 0) return 0;
  return (2 * weighted) / (n * sum) - (n + 1) / n;
}

export type SeasonReport = {
  totalHexes: number;
  ownedHexes: number;
  neutralPct: number;
  guildHexes: { guild: number; hexes: number; pct: number }[];
  biggestGuildPct: number;
  topWalletPct: number;          // part de carte du plus gros wallet
  topEntityPct: number;          // part de carte du plus gros acteur (wallets Sybil agreges)
  top10WalletsPct: number;
  giniTerritory: number;         // sur les wallets detenant du territoire
  giniTerritoryAll: number;      // sur tous les wallets (les exclus comptent pour 0)
  giniBalance: number;
  abandonRate: Record<string, number>;
  abandonSmall: number;          // passifs + moyens
  medianTicksToQuit: number;
  battles: number;
  conquests: number;
  claims: number;
  burnedPct: number;             // % du capital initial detruit
  burnSplit: { empireTax: number; missedReveal: number; battle: number; dust: number };
  poolLeftPct: number;           // cagnotte non consommee AVANT distribution finale
  orderIndependenceFailures: number;
  gatePass: boolean;             // top wallet < 15%
};

function share(part: bigint, total: bigint): number {
  if (total === 0n) return 0;
  return (100 * Number((part * 10000n) / total)) / 10000;
}

export function report(w: World): SeasonReport {
  const N = w.hexes.length;
  const owned = w.hexes.filter((h) => h.owner !== 0).length;

  const guildHexes = w.guilds
    .map((g) => ({ guild: g.id, hexes: g.hexes.size, pct: (100 * g.hexes.size) / N }))
    .sort((a, b) => b.hexes - a.hexes);

  const terr = territoryByWallet(w);
  const perWallet = [...terr.entries()];
  const pctOf = (v: bigint) => (100 * Number(v)) / (Number(SCALE) * N);

  const topWalletPct = perWallet.length
    ? Math.max(...perWallet.map(([, v]) => pctOf(v))) : 0;

  const byEntity = new Map<number, bigint>();
  for (const [id, v] of perWallet) {
    const e = w.agents[id].entity;
    byEntity.set(e, (byEntity.get(e) ?? 0n) + v);
  }
  const topEntityPct = byEntity.size
    ? Math.max(...[...byEntity.values()].map(pctOf)) : 0;

  const sortedShares = perWallet.map(([, v]) => pctOf(v)).sort((a, b) => b - a);
  const top10WalletsPct = sortedShares.slice(0, 10).reduce((s, x) => s + x, 0);

  const holders = perWallet.map(([, v]) => Number(v));
  const allWallets = w.agents.map((a) => Number(terr.get(a.id) ?? 0n));
  const balances = w.agents.map((a) => Number(a.balance / (WAD / 1000n)) / 1000);

  const quitters: Record<string, { q: number; n: number }> = {
    passive: { q: 0, n: 0 }, medium: { q: 0, n: 0 }, whale: { q: 0, n: 0 },
  };
  const quitTicks: number[] = [];
  for (const a of w.agents) {
    quitters[a.arch].n++;
    if (!a.alive) { quitters[a.arch].q++; quitTicks.push(a.quitTick); }
  }
  quitTicks.sort((a, b) => a - b);

  const initialCapital = w.agents.reduce((s, a) => s + a.initial, 0n);

  return {
    totalHexes: N,
    ownedHexes: owned,
    neutralPct: (100 * (N - owned)) / N,
    guildHexes,
    biggestGuildPct: guildHexes[0]?.pct ?? 0,
    topWalletPct,
    topEntityPct,
    top10WalletsPct,
    giniTerritory: gini(holders),
    giniTerritoryAll: gini(allWallets),
    giniBalance: gini(balances),
    abandonRate: {
      passive: quitters.passive.q / Math.max(1, quitters.passive.n),
      medium: quitters.medium.q / Math.max(1, quitters.medium.n),
      whale: quitters.whale.q / Math.max(1, quitters.whale.n),
    },
    abandonSmall:
      (quitters.passive.q + quitters.medium.q) /
      Math.max(1, quitters.passive.n + quitters.medium.n),
    medianTicksToQuit: quitTicks.length ? quitTicks[Math.floor(quitTicks.length / 2)] : -1,
    battles: w.stats.battles,
    conquests: w.stats.conquests,
    claims: w.stats.claims,
    burnedPct: (100 * Number(w.burned / (WAD / 1000n))) / Number(initialCapital / (WAD / 1000n)),
    burnSplit: {
      empireTax: share(w.burnBy.empireTax, w.burned),
      missedReveal: share(w.burnBy.missedReveal, w.burned),
      battle: share(w.burnBy.battle, w.burned),
      dust: share(w.burnBy.dust, w.burned),
    },
    poolLeftPct: (100 * Number(w.poolBeforeDistribution / (WAD / 1000n))) /
      Number(w.cfg.seasonPool / (WAD / 1000n)),
    orderIndependenceFailures: w.stats.orderIndependenceFailures,
    gatePass: topWalletPct < 15,
  };
}

export function mean(xs: number[]): number {
  return xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0;
}

export function stdev(xs: number[]): number {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1));
}
