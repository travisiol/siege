// Exports a real season state to the site.
//
// The board on hexwar is not invented data: it is the output of the M0 balance
// simulation, stopped mid-season. Hex ids in `sim/hex.ts` and
// `src/lib/hexmap.ts` line up, so these arrays apply directly to the map the
// browser draws.
//
//   npm run sim:board

import { writeFileSync } from "node:fs";
import { BASE } from "./config.ts";
import { runSeason } from "./season.ts";
import { WAD } from "./fixed.ts";
import { TIER_YIELD } from "./hex.ts";

const STOP_AT = 18; // contested map: sharp frontiers, ground still free to take

const cfg = { ...BASE, ticksPerSeason: STOP_AT };
const w = runSeason(cfg, BASE.seed);

const toTokens = (v: bigint) => Number(v / WAD);

const owners = w.hexes.map((h) => h.owner);
const tiers = w.hexes.map((h) => h.tier);
const refuges = w.hexes.filter((h) => h.isRefuge).map((h) => h.id);
const treasury = w.hexes.map((h) => toTokens(h.treasury));
const heldSince = w.hexes.map((h) => h.heldSinceTick);

/*
 * Who actually holds each hex. The ERC-1155 balance is a share of the stake
 * committed on that hex, so "holders" is the number of wallets with a live
 * position and "topHolderPct" is how concentrated that ownership is. Positions
 * left behind by a guild that has since lost the hex are dropped.
 */
const holders: number[] = [];
const topHolderPct: number[] = [];
for (const h of w.hexes) {
  const live = [...h.positions.entries()].filter(
    ([id]) => w.agents[id].guild === h.owner && h.owner !== 0,
  );
  let total = 0n;
  let top = 0n;
  for (const [, v] of live) {
    total += v;
    if (v > top) top = v;
  }
  holders.push(live.length);
  topHolderPct.push(total === 0n ? 0 : Number((top * 100n) / total));
}

const yieldUnit = toTokens(cfg.yieldUnit);
const mapYieldPerTick = w.hexes
  .filter((h) => h.owner !== 0)
  .reduce((s, h) => s + Number(TIER_YIELD[h.tier]) * yieldUnit, 0);

const guilds = w.guilds
  .map((g) => {
    const hexes = [...g.hexes];
    return {
      id: g.id,
      hexes: hexes.length,
      claimed: g.claimed,
      conquests: g.conquests,
      losses: g.losses,
      members: g.members.filter((m) => w.agents[m].alive).length,
      yieldPerTick: hexes.reduce(
        (s, id) => s + Number(TIER_YIELD[w.hexes[id].tier]) * yieldUnit,
        0,
      ),
      treasury: hexes.reduce((s, id) => s + toTokens(w.hexes[id].treasury), 0),
      tier3: hexes.filter((id) => w.hexes[id].tier === 3).length,
    };
  })
  .sort((a, b) => b.hexes - a.hexes);

const neutral = owners.filter((o) => o === 0).length;

const file = `/*
 * GENERATED — do not edit by hand. Regenerate with \`npm run sim:board\`.
 *
 * A real season state, taken from the M0 balance simulation at tick ${STOP_AT} of
 * ${BASE.ticksPerSeason}. No contracts exist: this board is a demonstration, not a chain
 * read, and every surface that shows it says so.
 */

export type PreviewGuild = {
  id: number;
  hexes: number;
  claimed: number;
  conquests: number;
  losses: number;
  members: number;
  yieldPerTick: number;
  treasury: number;
  tier3: number;
};

export const previewBoard = {
  radius: ${cfg.radius},
  tick: ${STOP_AT},
  ticksPerSeason: ${BASE.ticksPerSeason},
  totalHexes: ${owners.length},
  neutralHexes: ${neutral},
  battles: ${w.stats.battles},
  conquests: ${w.stats.conquests},

  /** Season economics. The pool is pre-funded and fixed — nothing is minted. */
  seasonPool: ${toTokens(BASE.seasonPool)},
  /** Base yield per tick, multiplied by the hex tier (1x / 3x / 8x). */
  yieldUnit: ${yieldUnit},
  /** Combined yield of every held hex, per tick. */
  mapYieldPerTick: ${mapYieldPerTick},
  ticksPerDay: 3,
  upkeepPct: 2,

  /** 0 = neutral, otherwise the id of the guild holding the hex. */
  owners: ${JSON.stringify(owners)} as number[],
  tiers: ${JSON.stringify(tiers)} as number[],
  refuges: ${JSON.stringify(refuges)} as number[],
  treasury: ${JSON.stringify(treasury)} as number[],
  heldSince: ${JSON.stringify(heldSince)} as number[],
  /** Wallets holding an ERC-1155 position on the hex. */
  holders: ${JSON.stringify(holders)} as number[],
  /** Share of that hex held by its single largest wallet, in percent. */
  topHolderPct: ${JSON.stringify(topHolderPct)} as number[],

  guilds: ${JSON.stringify(guilds, null, 2).replace(/\n/g, "\n  ")} as PreviewGuild[],
} as const;
`;

writeFileSync(new URL("../src/lib/preview-board.ts", import.meta.url), file);

const active = guilds.filter((g) => g.hexes > 0);
console.log(`board exported  tick ${STOP_AT}/${BASE.ticksPerSeason}`);
console.log(`  hexes            ${owners.length}`);
console.log(`  neutral          ${neutral} (${((100 * neutral) / owners.length).toFixed(1)}%)`);
console.log(`  guilds in play   ${active.length}`);
console.log(`  largest          ${guilds[0].hexes} hexes, ${guilds[0].members} members`);
console.log(`  holders / hex    ${(holders.reduce((s, h) => s + h, 0) / (owners.length - neutral)).toFixed(1)} avg`);
console.log(`  map yield        ${mapYieldPerTick} $HEXWAR per tick`);
console.log(`  battles          ${w.stats.battles}`);
