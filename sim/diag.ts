// Diagnostic of the scenario that breaks the gate: by what mechanism does a
// single wallet take the map? Untaxed claims, or conquests?

import { BASE } from "./config.ts";
import { runSeason } from "./season.ts";
import { territoryByWallet } from "./metrics.ts";
import { fmt, WAD } from "./fixed.ts";
import { claimCost } from "./rules.ts";
import { TIER_YIELD } from "./hex.ts";

const cfg = { ...BASE, guilds: 5, soloWhaleGuilds: 4, positionModel: "conquest-only" as const };
const w = runSeason(cfg, BASE.seed);
const N = w.hexes.length;

const terr = territoryByWallet(w);
const ranked = [...terr.entries()].sort((a, b) => (b[1] > a[1] ? 1 : -1));
const [topId, topShare] = ranked[0];
const top = w.agents[topId];
const guild = w.guilds[top.guild - 1];

console.log("DIAGNOSTIC -- whale-solo-5g scenario\n" + "=".repeat(70));
console.log(`Dominant wallet     #${topId}  (${top.arch}, guild ${top.guild})`);
console.log(`Members in guild     ${guild.members.length}`);
console.log(`Share of map        ${((100 * Number(topShare)) / (1e6 * N)).toFixed(1)}%`);
console.log(`Guild hexes         ${guild.hexes.size} / ${N}`);
console.log(`  acquired by claim     ${guild.claimed}`);
console.log(`  acquired by conquest  ${guild.conquests}`);
console.log(`  lost in battle        ${guild.losses}`);

let claimSpend = 0n;
const tierMix: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
for (const id of guild.hexes) tierMix[w.hexes[id].tier]++;
for (const t of [1, 2, 3]) claimSpend += BigInt(tierMix[t]) * claimCost(t, WAD);

console.log(`\nTier mix held         t1=${tierMix[1]}  t2=${tierMix[2]}  t3=${tierMix[3]}`);
console.log(`Starting capital      ${fmt(top.initial)} SIEGE`);
console.log(`Cost of those ${guild.hexes.size} hexes at the claim price (tier x100)`);
console.log(`                      ${fmt(claimSpend)} SIEGE` +
  `  = ${((100 * Number(claimSpend / WAD)) / Number(top.initial / WAD)).toFixed(1)}% of its capital`);
console.log(`Final balance         ${fmt(top.balance)} SIEGE` +
  `  (x${(Number(top.balance / (WAD / 100n)) / Number(top.initial / (WAD / 100n))).toFixed(2)})`);

const totalYield = [...guild.hexes].reduce((s, id) => s + TIER_YIELD[w.hexes[id].tier], 0n);
const mapYield = w.hexes.filter((h) => h.owner !== 0)
  .reduce((s, h) => s + TIER_YIELD[h.tier], 0n);
console.log(`Share of the map total yield         ` +
  `${((100 * Number(totalYield)) / Number(mapYield)).toFixed(1)}%`);

console.log("\nBreakdown by guild");
for (const g of [...w.guilds].sort((a, b) => b.hexes.size - a.hexes.size)) {
  const alive = g.members.filter((m) => w.agents[m].alive).length;
  console.log(
    `  guild ${String(g.id).padStart(2)}  ${String(g.hexes.size).padStart(3)} hexes` +
    ` (${((100 * g.hexes.size) / N).toFixed(1).padStart(5)}%)` +
    `  members ${String(g.members.length).padStart(3)} (${alive} active)` +
    `  claims ${String(g.claimed).padStart(3)}  captures ${String(g.conquests).padStart(3)}`,
  );
}
