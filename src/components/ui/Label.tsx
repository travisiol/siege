"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";
import { useBoardContext } from "@/lib/board-context";

/** A key on the sheet: mono, tracked out, uppercase. */
export function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={clsx("type-label text-chalk-muted", className)}>
      {children}
    </span>
  );
}

/**
 * Says where the board came from, and only when that needs saying.
 *
 * A map showing twelve guilds and hundreds of battles is asserting activity. If
 * that activity came out of the balance simulation rather than off a chain, the
 * page has to say so somewhere or it is claiming something untrue. One quiet
 * line does that job; a badge on every surface only shouted it.
 *
 * It renders nothing once a real board is being served, so there is no label to
 * remember to remove on launch day.
 */
export function SourceNote({ className }: { className?: string }) {
  const { source } = useBoardContext();
  if (source !== "simulation") return null;
  return (
    <span className={clsx("type-label text-chalk-muted", className)}>
      Board from the balance simulation
    </span>
  );
}
