"use client";

import { useEffect, useState } from "react";
import { previewBoard, type PreviewGuild } from "./preview-board";

/*
 * One board shape, two sources.
 *
 * With no contract deployed the site reads the simulation's exported season —
 * a real state, clearly labelled. Once an indexer is running it serves exactly
 * the same shape off the chain, so every component keeps reading one object and
 * nothing downstream has to know which world it is in.
 *
 * The board is not read from the chain directly. Pulling 547 hex owners plus
 * holder counts would be a 547-call multicall on every page load; the indexer
 * exists precisely so that work happens once, off the critical path. The chain
 * is read directly only for the tick and the phase, which are three cheap calls
 * — see `useChainTick`.
 */

export type Board = {
  radius: number;
  tick: number;
  ticksPerSeason: number;
  totalHexes: number;
  neutralHexes: number;
  battles: number;
  conquests: number;
  seasonPool: number;
  yieldUnit: number;
  mapYieldPerTick: number;
  ticksPerDay: number;
  upkeepPct: number;
  owners: number[];
  tiers: number[];
  refuges: number[];
  treasury: number[];
  heldSince: number[];
  holders: number[];
  topHolderPct: number[];
  guilds: PreviewGuild[];
};

export type BoardSource = "simulation" | "indexer";

const INDEXER = process.env.NEXT_PUBLIC_HEXWAR_INDEXER_URL ?? "";

/** The simulated board, typed as the shared shape. */
export const fallbackBoard = previewBoard as unknown as Board;

export function useBoard(): { board: Board; source: BoardSource; error: string | null } {
  const [board, setBoard] = useState<Board>(fallbackBoard);
  const [source, setSource] = useState<BoardSource>("simulation");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!INDEXER) return;
    let cancelled = false;

    const pull = async () => {
      try {
        const res = await fetch(`${INDEXER}/board`, { cache: "no-store" });
        if (!res.ok) throw new Error(`indexer ${res.status}`);
        const next = (await res.json()) as Board;
        if (cancelled) return;
        setBoard(next);
        setSource("indexer");
        setError(null);
      } catch (e) {
        if (cancelled) return;
        // Falling back is the honest failure: the page keeps working and keeps
        // saying the board is a simulation, rather than showing a stale chain
        // state as if it were current.
        setSource("simulation");
        setError(e instanceof Error ? e.message : "indexer unreachable");
      }
    };

    pull();
    const id = window.setInterval(pull, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return { board, source, error };
}
