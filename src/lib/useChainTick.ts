"use client";

import { useReadContracts } from "wagmi";
import { battleAbi } from "./abi";
import { chainConfig, isLive } from "./site-config";

/*
 * The tick, straight off the contract.
 *
 * This is the one thing worth reading from chain on every page load: three cheap
 * calls that say what turn it is, which phase is open, and whether the keeper
 * has caught up. The board comes from the indexer instead — see `board.ts`.
 *
 * Returns null while no contract is deployed, which is the signal for the clock
 * to fall back to its demonstration schedule and say so.
 */

export type ChainTick = {
  tick: number;
  /** 0 = commit, 1 = reveal, 2 = resolution. */
  phase: number;
  lastResolvedTick: number;
  /** True when the keeper still owes the current tick a resolution. */
  resolutionPending: boolean;
};

export function useChainTick(): { data: ChainTick | null; isLoading: boolean } {
  const address = chainConfig.battleAddress ?? undefined;

  const { data, isLoading } = useReadContracts({
    contracts: [
      { address, abi: battleAbi, functionName: "currentTick" },
      { address, abi: battleAbi, functionName: "phase" },
      { address, abi: battleAbi, functionName: "lastResolvedTick" },
    ],
    query: {
      enabled: isLive,
      // A tick is eight hours; polling every twenty seconds is plenty to catch
      // a phase change without hammering the RPC.
      refetchInterval: 20_000,
    },
  });

  if (!isLive || !data) return { data: null, isLoading };

  const [tick, phase, lastResolved] = data;
  if (tick.status !== "success" || phase.status !== "success" || lastResolved.status !== "success") {
    return { data: null, isLoading };
  }

  const t = Number(tick.result);
  const resolved = Number(lastResolved.result);

  return {
    data: {
      tick: t,
      phase: Number(phase.result),
      lastResolvedTick: resolved,
      resolutionPending: t > resolved,
    },
    isLoading,
  };
}
