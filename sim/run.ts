import { BASE, type Config } from "./config.ts";
import { runSeason } from "./season.ts";
import { report, mean, stdev, type SeasonReport } from "./metrics.ts";
import { buildMap, tierCounts } from "./hex.ts";

const SEASONS = 10;

type Scenario = { name: string; note: string; cfg: Config };

const scenarios: Scenario[] = [
  { name: "base", note: "one wallet per actor, position diluted by defending", cfg: { ...BASE } },
  {
    name: "conquest-only",
    note: "position minted on capture only (the whale-friendly reading)",
    cfg: { ...BASE, positionModel: "conquest-only" },
  },
  { name: "sybil-10", note: "each whale split across 10 wallets", cfg: { ...BASE, sybilSplit: 10 } },
  {
    name: "sybil-100+conquest-only",
    note: "100 wallets per whale AND undiluted positions",
    cfg: { ...BASE, sybilSplit: 100, positionModel: "conquest-only" },
  },
  {
    name: "guilds-3",
    note: "the brief never fixes the guild count: try three",
    cfg: { ...BASE, guilds: 3 },
  },
  {
    name: "whale-solo",
    note: "4 whales each running a one-member guild, undiluted positions",
    cfg: { ...BASE, guilds: 12, soloWhaleGuilds: 4, positionModel: "conquest-only" },
  },
  {
    name: "whale-solo-5g",
    note: "solo guilds against few rivals (3 claims per tick)",
    cfg: { ...BASE, guilds: 5, soloWhaleGuilds: 4, positionModel: "conquest-only" },
  },
  {
    name: "whale-solo-5g-floor",
    note: "same case, most conservative assumption: one claim per tick",
    cfg: {
      ...BASE, guilds: 5, soloWhaleGuilds: 4,
      positionModel: "conquest-only", maxClaimsPerTick: 1,
    },
  },
];

function runScenario(s: Scenario): SeasonReport[] {
  const out: SeasonReport[] = [];
  for (let i = 0; i < SEASONS; i++) out.push(report(runSeason(s.cfg, s.cfg.seed + i * 7919)));
  return out;
}

function summarize(name: string, note: string, reps: SeasonReport[]): void {
  const g = (f: (r: SeasonReport) => number) => reps.map(f);
  const line = (label: string, xs: number[], unit = "%", d = 1) =>
    console.log(
      `  ${label.padEnd(34)} ${mean(xs).toFixed(d).padStart(7)}${unit}` +
      `   (min ${Math.min(...xs).toFixed(d)}  max ${Math.max(...xs).toFixed(d)}  sd ${stdev(xs).toFixed(d)})`,
    );

  console.log(`\n=== ${name}  --  ${note}`);
  console.log(`    ${SEASONS} seasons of ${BASE.ticksPerSeason} ticks`);
  line("Top wallet share", g((r) => r.topWalletPct));
  line("Top actor share (sybil merged)", g((r) => r.topEntityPct));
  line("Top 10 wallets combined", g((r) => r.top10WalletsPct));
  line("Largest guild share", g((r) => r.biggestGuildPct));
  line("Map left neutral", g((r) => r.neutralPct));
  line("Gini territory (holders)", g((r) => r.giniTerritory), "", 3);
  line("Gini territory (all wallets)", g((r) => r.giniTerritoryAll), "", 3);
  line("Gini final balances", g((r) => r.giniBalance), "", 3);
  line("Small players quitting", g((r) => 100 * r.abandonSmall));
  line("  of which passive", g((r) => 100 * r.abandonRate.passive));
  line("  of which medium", g((r) => 100 * r.abandonRate.medium));
  line("  of which whales", g((r) => 100 * r.abandonRate.whale));
  line("Median quit tick", g((r) => r.medianTicksToQuit), "", 0);
  line("Capital destroyed (burn)", g((r) => r.burnedPct));
  console.log(
    `    of which empire tax ${mean(g((r) => r.burnSplit.empireTax)).toFixed(0)}%` +
    `, battle penalties ${mean(g((r) => r.burnSplit.battle)).toFixed(0)}%` +
    `, missed reveals ${mean(g((r) => r.burnSplit.missedReveal)).toFixed(0)}%`,
  );
  line("Season pool unspent", g((r) => r.poolLeftPct));
  line("Battles per season", g((r) => r.battles), "", 0);
  line("Captures per season", g((r) => r.conquests), "", 0);

  const fails = reps.reduce((s, r) => s + r.orderIndependenceFailures, 0);
  const passes = reps.filter((r) => r.gatePass).length;
  const worst = Math.max(...g((r) => r.topWalletPct));
  console.log(
    `  ${"Tx-order invariant".padEnd(34)} ` +
    `${fails === 0 ? "OK across every check" : fails + " FAILURES"}`,
  );
  console.log(
    `  ${"M0 GATE (top wallet < 15%)".padEnd(34)} ${passes}/${SEASONS} seasons` +
    `  worst ${worst.toFixed(1)}%  ->  ${passes === SEASONS ? "PASS" : "FAIL"}`,
  );
}

const map = buildMap(BASE.radius);
const tc = tierCounts(map);
console.log("SIEGE -- M0 balance simulation");
console.log("=".repeat(80));
console.log(
  `Map: radius ${BASE.radius} -> ${map.cells.length} hexes ` +
  "(the brief says 512: incompatible, see README)",
);
console.log(
  `Tiers: t1=${tc[1]} (${((100 * tc[1]) / map.cells.length).toFixed(0)}%)  ` +
  `t2=${tc[2]} (${((100 * tc[2]) / map.cells.length).toFixed(0)}%)  ` +
  `t3=${tc[3]} (${((100 * tc[3]) / map.cells.length).toFixed(0)}%)`,
);
console.log(
  `Agents: ${BASE.counts.passive} passive, ${BASE.counts.medium} medium, ` +
  `${BASE.counts.whale} whales (100x), ${BASE.guilds} guilds`,
);

const all: { s: Scenario; reps: SeasonReport[] }[] = [];
for (const s of scenarios) {
  const reps = runScenario(s);
  all.push({ s, reps });
  summarize(s.name, s.note, reps);
}

console.log("\n" + "=".repeat(80));
console.log("M0 VERDICT");
console.log("=".repeat(80));
for (const { s, reps } of all) {
  const worstWallet = Math.max(...reps.map((r) => r.topWalletPct));
  const worstEntity = Math.max(...reps.map((r) => r.topEntityPct));
  console.log(
    `  ${s.name.padEnd(24)} top wallet ${worstWallet.toFixed(1).padStart(5)}%` +
    `   top actor ${worstEntity.toFixed(1).padStart(5)}%` +
    `   ${worstWallet < 15 ? "PASS" : "FAIL"}`,
  );
}
console.log(
  "\nThe gate measures the WALLET. The 'top actor' column merges one actor's\n" +
  "sybil wallets: that is the figure that actually matters, since splitting into\n" +
  "N wallets is free and multiplies power by sqrt(N).",
);
