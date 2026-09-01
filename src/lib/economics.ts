/*
 * What a hex is worth, in numbers a player can act on.
 *
 * Two things pay out, and they are not the same thing:
 *
 *   1. Yield. Every tick, a held hex accrues `tier x base` into its own
 *      treasury. Upkeep skims 2% of that treasury back to the season pool.
 *      Whoever takes the hex takes the treasury with it — so yield sitting on
 *      a hex is a prize, not a balance.
 *
 *   2. The season pool. Fixed, pre-funded, nothing minted. At the end it is
 *      split across held territory weighted by tier, so a tier 3 is worth
 *      eight tier 1s in the final payout regardless of what happened in
 *      between.
 *
 * The pool projection assumes you still hold the hex at the last tick. That is
 * the assumption the whole game is about, so it is stated wherever it shows.
 */

import { TIER_YIELD } from "./hexmap";
import { previewBoard } from "./preview-board";
import type { Board } from "./board";

/** Config-shaped values (pool size, yield rate, tier weights) do not change
 *  between the simulated and the live board, so they stay bound to the export. */
const DEFAULT = previewBoard as unknown as Board;

/** Tier weight of the entire map — the denominator of every pool share. */
export const TOTAL_TIER_WEIGHT = previewBoard.tiers.reduce(
  (sum, tier) => sum + TIER_YIELD[tier],
  0,
);

export type HexEconomics = {
  tier: number;
  /** Yield accrued into the hex treasury each tick. */
  yieldPerTick: number;
  yieldPerDay: number;
  /** Yield still to come if held to the final tick. */
  yieldRemaining: number;
  /** Upkeep skimmed off the treasury this tick. */
  upkeepPerTick: number;
  /** Treasury sitting on the hex — transfers whole to whoever takes it. */
  treasury: number;
  /** Projected cut of the fixed season pool, if held to the end. */
  poolShare: number;
  /** That cut as a share of the whole pool, in percent. */
  poolSharePct: number;
  /** Wallets holding a position, and the largest one's share. */
  holders: number;
  topHolderPct: number;
  /** Pool projection split evenly across current holders. */
  poolSharePerHolder: number;
  /** Cost to claim, when the hex is neutral: tier x 100. */
  claimCost: number;
  /** 100..200 — doubles after twenty ticks held. */
  fortification: number;
  ticksHeld: number;
};

export function hexEconomics(id: number, board: Board = DEFAULT): HexEconomics {
  const tier = board.tiers[id] ?? 1;
  const weight = TIER_YIELD[tier];
  const treasury = board.treasury[id] ?? 0;
  const heldSince = board.heldSince[id] ?? 0;
  const owner = board.owners[id] ?? 0;
  const holders = board.holders[id] ?? 0;

  const yieldPerTick = weight * board.yieldUnit;
  const ticksLeft = Math.max(0, board.ticksPerSeason - board.tick);
  const poolShare = (board.seasonPool * weight) / TOTAL_TIER_WEIGHT;
  const ticksHeld = owner === 0 ? 0 : Math.max(0, board.tick - heldSince);

  return {
    tier,
    yieldPerTick,
    yieldPerDay: yieldPerTick * board.ticksPerDay,
    yieldRemaining: yieldPerTick * ticksLeft,
    upkeepPerTick: (treasury * board.upkeepPct) / 100,
    treasury,
    poolShare,
    poolSharePct: (100 * weight) / TOTAL_TIER_WEIGHT,
    holders,
    topHolderPct: board.topHolderPct[id] ?? 0,
    poolSharePerHolder: holders > 0 ? poolShare / holders : poolShare,
    claimCost: tier * 100,
    fortification: 100 + 5 * Math.min(ticksHeld, 20),
    ticksHeld,
  };
}

export type GuildEconomics = {
  yieldPerTick: number;
  yieldPerDay: number;
  treasury: number;
  poolShare: number;
  poolSharePct: number;
  perMember: number;
  mapPct: number;
};

export function guildEconomics(guildId: number, board: Board = DEFAULT): GuildEconomics | null {
  const g = board.guilds.find((x) => x.id === guildId);
  if (!g) return null;

  // Tier weight actually held, rebuilt from the board rather than stored twice.
  let weight = 0;
  for (let id = 0; id < board.owners.length; id++) {
    if (board.owners[id] === guildId) weight += TIER_YIELD[board.tiers[id]];
  }
  const poolShare = (board.seasonPool * weight) / TOTAL_TIER_WEIGHT;

  return {
    yieldPerTick: g.yieldPerTick,
    yieldPerDay: g.yieldPerTick * board.ticksPerDay,
    treasury: g.treasury,
    poolShare,
    poolSharePct: (100 * weight) / TOTAL_TIER_WEIGHT,
    perMember: g.members > 0 ? poolShare / g.members : poolShare,
    mapPct: (100 * g.hexes) / board.totalHexes,
  };
}

/** Compact money: 15.8k rather than 15,841 once past a thousand. */
export function compact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 10_000) return `${(n / 1000).toFixed(1)}k`;
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(2)}k`;
  return n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 1 : 0 });
}

export function money(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
