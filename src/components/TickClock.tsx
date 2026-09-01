"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Label } from "@/components/ui/Label";
import {
  PHASES,
  TICKS_PER_SEASON,
  formatCountdown,
  tickStateAt,
  type TickState,
} from "@/lib/season";

/*
 * The heartbeat of the game, in three segments.
 *
 * Seven hours of commit, forty-five minutes of reveal, a quarter hour of
 * resolution. The bar is proportional to the real phase durations, which makes
 * reveal and resolution two thin slivers at the end of a long segment: that is
 * exactly how the game feels, and a bar in three equal thirds would lie about
 * it.
 *
 * Nothing runs for real — no contract is deployed. The clock demonstrates the
 * cadence from a fixed anchor, and says so.
 */
export function TickClock({ className }: { className?: string }) {
  // Server render and first client render have to agree: start at null and let
  // the clock appear only once mounted.
  const [state, setState] = useState<TickState | null>(null);

  useEffect(() => {
    const sync = () => setState(tickStateAt(Date.now()));
    sync();
    const id = window.setInterval(sync, 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = PHASES.reduce((s, p) => s + p.seconds, 0);

  return (
    <div className={clsx("panel px-4 py-3", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label>Tick {state ? `${state.tick} / ${TICKS_PER_SEASON}` : `— / ${TICKS_PER_SEASON}`}</Label>
        <span
          className={clsx(
            "type-label",
            state?.phase === "resolution"
              ? "animate-pulse-ember text-ember"
              : "text-chalk-soft",
          )}
        >
          {state ? state.phaseLabel : "Cadence"}
        </span>
      </div>

      <div className="mt-2 type-figure text-chalk">
        {state ? formatCountdown(state.remaining) : "--:--:--"}
      </div>

      {/* Segments scaled to the real durations. */}
      <div className="mt-3 flex h-1.5 w-full gap-[2px]">
        {PHASES.map((phase) => {
          const active = state?.phase === phase.name;
          const done =
            state !== null &&
            PHASES.findIndex((p) => p.name === state.phase) >
              PHASES.findIndex((p) => p.name === phase.name);
          return (
            <div
              key={phase.name}
              className="relative overflow-hidden bg-field-line"
              style={{ flexGrow: phase.seconds / total }}
              title={`${phase.label} — ${phase.blurb}`}
            >
              <div
                className={clsx(
                  "absolute inset-y-0 left-0",
                  phase.name === "resolution" ? "bg-ember" : "bg-chalk-soft",
                )}
                style={{
                  width: done ? "100%" : active ? `${(state?.phaseProgress ?? 0) * 100}%` : "0%",
                }}
              />
            </div>
          );
        })}
      </div>

      <p className="type-data mt-2 text-chalk-muted">
        {state
          ? PHASES.find((p) => p.name === state.phase)?.blurb
          : "One tick is 8h: commit, reveal, resolution."}
      </p>
    </div>
  );
}
