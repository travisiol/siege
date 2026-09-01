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
 * Le battement du jeu, en trois segments.
 *
 * Sept heures de commit, quarante-cinq minutes de reveal, un quart d'heure de
 * résolution. La barre est proportionnelle à la vraie durée des phases, ce qui
 * fait que le reveal et la résolution sont deux fines lamelles au bout d'un
 * long segment: c'est exactement le ressenti du jeu, et une barre en trois
 * tiers égaux mentirait là-dessus.
 *
 * Rien ne tourne pour de vrai — aucun contrat n'est déployé. L'horloge démontre
 * la cadence à partir d'une ancre fixe, et le dit.
 */
export function TickClock({ className }: { className?: string }) {
  // Rendu serveur et premier rendu client doivent coïncider: on démarre à null
  // et l'horloge n'apparaît qu'une fois montée.
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

      {/* Segments à l'échelle des vraies durées. */}
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
          : "Un tick dure 8 h : commit, reveal, résolution."}
      </p>
    </div>
  );
}
