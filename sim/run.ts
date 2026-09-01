import { BASE, type Config } from "./config.ts";
import { runSeason } from "./season.ts";
import { report, mean, stdev, type SeasonReport } from "./metrics.ts";
import { buildMap, tierCounts } from "./hex.ts";

const SEASONS = 10;

type Scenario = { name: string; note: string; cfg: Config };

const scenarios: Scenario[] = [
  { name: "base", note: "1 wallet par acteur, position diluee par la defense", cfg: { ...BASE } },
  {
    name: "conquest-only",
    note: "position mintee a la prise seulement (lecture favorable aux whales)",
    cfg: { ...BASE, positionModel: "conquest-only" },
  },
  { name: "sybil-10", note: "chaque whale se decoupe en 10 wallets", cfg: { ...BASE, sybilSplit: 10 } },
  {
    name: "sybil-100+conquest-only",
    note: "100 wallets par whale ET position non diluee",
    cfg: { ...BASE, sybilSplit: 100, positionModel: "conquest-only" },
  },
  {
    name: "guildes-3",
    note: "le brief ne fixe pas le nombre de guildes: on en met 3",
    cfg: { ...BASE, guilds: 3 },
  },
  {
    name: "whale-solo",
    note: "4 whales montent chacune sa guilde a un membre, position non diluee",
    cfg: { ...BASE, guilds: 12, soloWhaleGuilds: 4, positionModel: "conquest-only" },
  },
  {
    name: "whale-solo-5g",
    note: "guildes solo + peu de guildes concurrentes (3 claims/tick)",
    cfg: { ...BASE, guilds: 5, soloWhaleGuilds: 4, positionModel: "conquest-only" },
  },
  {
    name: "whale-solo-5g-plancher",
    note: "meme cas, hypothese la plus conservatrice: 1 seul claim par tick",
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
  console.log(`    ${SEASONS} saisons de ${BASE.ticksPerSeason} ticks`);
  line("Part du top wallet", g((r) => r.topWalletPct));
  line("Part du top acteur (Sybil agrege)", g((r) => r.topEntityPct));
  line("Part cumulee du top 10 wallets", g((r) => r.top10WalletsPct));
  line("Part de la plus grosse guilde", g((r) => r.biggestGuildPct));
  line("Carte restee neutre", g((r) => r.neutralPct));
  line("Gini territoire (detenteurs)", g((r) => r.giniTerritory), "", 3);
  line("Gini territoire (tous wallets)", g((r) => r.giniTerritoryAll), "", 3);
  line("Gini soldes finaux", g((r) => r.giniBalance), "", 3);
  line("Abandon petits joueurs", g((r) => 100 * r.abandonSmall));
  line("  dont passifs", g((r) => 100 * r.abandonRate.passive));
  line("  dont moyens", g((r) => 100 * r.abandonRate.medium));
  line("  dont whales", g((r) => 100 * r.abandonRate.whale));
  line("Tick median d'abandon", g((r) => r.medianTicksToQuit), "", 0);
  line("Capital detruit (burn)", g((r) => r.burnedPct));
  console.log(
    `    dont taxe d'empire ${mean(g((r) => r.burnSplit.empireTax)).toFixed(0)}%` +
    `, penalites de bataille ${mean(g((r) => r.burnSplit.battle)).toFixed(0)}%` +
    `, reveals rates ${mean(g((r) => r.burnSplit.missedReveal)).toFixed(0)}%`,
  );
  line("Cagnotte non consommee", g((r) => r.poolLeftPct));
  line("Batailles / saison", g((r) => r.battles), "", 0);
  line("Conquetes / saison", g((r) => r.conquests), "", 0);

  const fails = reps.reduce((s, r) => s + r.orderIndependenceFailures, 0);
  const passes = reps.filter((r) => r.gatePass).length;
  const worst = Math.max(...g((r) => r.topWalletPct));
  console.log(
    `  ${"Invariant ordre des tx".padEnd(34)} ` +
    `${fails === 0 ? "OK sur toutes les verifications" : fails + " ECHECS"}`,
  );
  console.log(
    `  ${"GATE M0 (top wallet < 15%)".padEnd(34)} ${passes}/${SEASONS} saisons` +
    `  pire saison ${worst.toFixed(1)}%  ->  ${passes === SEASONS ? "PASS" : "ECHEC"}`,
  );
}

const map = buildMap(BASE.radius);
const tc = tierCounts(map);
console.log("SIEGE -- M0, simulation d'equilibrage");
console.log("=".repeat(80));
console.log(
  `Carte: rayon ${BASE.radius} -> ${map.cells.length} hexes ` +
  "(le brief dit 512: incompatible, voir README)",
);
console.log(
  `Tiers: t1=${tc[1]} (${((100 * tc[1]) / map.cells.length).toFixed(0)}%)  ` +
  `t2=${tc[2]} (${((100 * tc[2]) / map.cells.length).toFixed(0)}%)  ` +
  `t3=${tc[3]} (${((100 * tc[3]) / map.cells.length).toFixed(0)}%)`,
);
console.log(
  `Agents: ${BASE.counts.passive} passifs, ${BASE.counts.medium} moyens, ` +
  `${BASE.counts.whale} whales (100x), ${BASE.guilds} guildes`,
);

const all: { s: Scenario; reps: SeasonReport[] }[] = [];
for (const s of scenarios) {
  const reps = runScenario(s);
  all.push({ s, reps });
  summarize(s.name, s.note, reps);
}

console.log("\n" + "=".repeat(80));
console.log("VERDICT M0");
console.log("=".repeat(80));
for (const { s, reps } of all) {
  const worstWallet = Math.max(...reps.map((r) => r.topWalletPct));
  const worstEntity = Math.max(...reps.map((r) => r.topEntityPct));
  console.log(
    `  ${s.name.padEnd(24)} top wallet ${worstWallet.toFixed(1).padStart(5)}%` +
    `   top acteur ${worstEntity.toFixed(1).padStart(5)}%` +
    `   ${worstWallet < 15 ? "PASS" : "ECHEC"}`,
  );
}
console.log(
  "\nLe gate porte sur le WALLET. La colonne 'top acteur' agrege les wallets Sybil\n" +
  "d'un meme acteur: c'est la mesure qui compte reellement, puisque se decouper en\n" +
  "N wallets est gratuit et multiplie la puissance par sqrt(N).",
);
