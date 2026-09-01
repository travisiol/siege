"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useBoard, fallbackBoard, type Board, type BoardSource } from "./board";

/*
 * The board, shared without prop drilling.
 *
 * Nine components need some slice of it — the map, the hex sheet, the header
 * chips, the standings, the ticker. Threading it through props would mean every
 * one of them declaring a board prop it only forwards, so it goes in context and
 * each component takes the field it wants.
 *
 * The default value is the simulated board rather than null, which means a
 * component rendered outside the provider still shows something true instead of
 * crashing.
 */

type BoardContextValue = { board: Board; source: BoardSource; error: string | null };

const BoardContext = createContext<BoardContextValue>({
  board: fallbackBoard,
  source: "simulation",
  error: null,
});

export function BoardProvider({ children }: { children: ReactNode }) {
  const value = useBoard();
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoardContext(): BoardContextValue {
  return useContext(BoardContext);
}

/** Shorthand for the common case of wanting only the data. */
export function useBoardData(): Board {
  return useContext(BoardContext).board;
}
