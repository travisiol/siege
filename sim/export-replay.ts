// Export one tick's battles for the resolution screen.
//
// The brief calls the resolution screen the product rather than a bonus, so the
// numbers it replays had better be real. This takes an actual tick out of the
// balance simulation — every attacker's power, the defender's, the fortification
// that stood between them, and what changed hands — and hands it to the site in
// the same shape the indexer serves from chain.
//
//   node sim/export-replay.ts

import { writeFileSync } from "node:fs";
import { BASE } from "./config.ts";
import { runSeason } from "./season.ts";
import { WAD } from "./fixed.ts";

/** A busy tick a little past the land grab, when guilds have started fighting. */
const TRACE_TICK = 18;

const cfg = { ...BASE, ticksPerSeason: TRACE_TICK };
const w = runSeason(cfg, BASE.seed, TRACE_TICK);
const trace = w.trace ?? [];

const tokens = (v: bigint) => Number(v / WAD);
// Powers are WAD-scaled sums of roots; two decimals is plenty to compare bars.
const power = (v: bigint) => Math.round(Number(v / (WAD / 100n))) / 100;

const events = trace.map((b) => ({
  hex: b.hex,
  tier: b.tier,
  kind: b.kind,
  defender: b.defender,
  defPower: power(b.defPower),
  defStake: tokens(b.defStake),
  fort: b.fort,
  attackers: b.attackers.map((a) => ({
    guild: a.guild,
    power: power(a.power),
    stake: tokens(a.stake),
  })),
  winner: b.winner,
  treasury: tokens(b.treasury),
}));

const captures = events.filter((e) => e.kind === "battle" && e.winner !== 0).length;
const holds = events.filter((e) => e.kind === "battle" && e.winner === 0).length;
const claims = events.filter((e) => e.kind === "claim").length;
const moved = events.reduce((s, e) => s + (e.winner !== 0 ? e.treasury : 0), 0);

const file = `/*
 * GENERATED — do not edit by hand. Regenerate with \`npm run sim:replay\`.
 *
 * One real tick out of the balance simulation, ready to be replayed. Once a
 * chain is live the indexer serves the same shape from \`/replay/:tick\`.
 */

export type ReplayAttacker = { guild: number; power: number; stake: number };

export type ReplayEvent = {
  hex: number;
  tier: number;
  kind: "battle" | "claim";
  /** 0 when the ground was unclaimed. */
  defender: number;
  defPower: number;
  defStake: number;
  fort: number;
  attackers: ReplayAttacker[];
  /** 0 means the defender held. */
  winner: number;
  treasury: number;
};

export const previewReplay = {
  tick: ${TRACE_TICK},
  ticksPerSeason: ${BASE.ticksPerSeason},
  captures: ${captures},
  holds: ${holds},
  claims: ${claims},
  treasuryMoved: ${moved},
  events: ${JSON.stringify(events)} as ReplayEvent[],
} as const;
`;

writeFileSync(new URL("../src/lib/preview-replay.ts", import.meta.url), file);

console.log(`replay written  tick ${TRACE_TICK}`);
console.log(`  events        ${events.length}`);
console.log(`  captures      ${captures}`);
console.log(`  holds         ${holds}`);
console.log(`  claims        ${claims}`);
console.log(`  treasury moved ${moved}`);
