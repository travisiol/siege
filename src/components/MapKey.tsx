"use client";

import { clsx } from "clsx";
import { TIER_YIELD } from "@/lib/hexmap";
import { useBoardData } from "@/lib/board-context";
import { money } from "@/lib/economics";
import type { MapMode } from "@/components/HexMap";

/*
 * The switch and the key, together.
 *
 * A map of 547 identical shapes in twelve colours is a wall until someone says
 * what the colour means. Putting the legend next to the control that changes it
 * means the answer is always beside the question.
 */

const MODES: { key: MapMode; label: string; hint: string }[] = [
  { key: "pays", label: "What it pays", hint: "Brighter ground earns more" },
  { key: "owners", label: "Who owns it", hint: "One colour per guild" },
];

export function MapKey({
  mode,
  onMode,
  className,
}: {
  mode: MapMode;
  onMode: (m: MapMode) => void;
  className?: string;
}) {
  const board = useBoardData();
  const day = (tier: number) => TIER_YIELD[tier] * board.yieldUnit * board.ticksPerDay;

  return (
    <div className={clsx("border border-rule bg-void/85 backdrop-blur-sm", className)}>
      <div className="flex" role="group" aria-label="Map colouring">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => onMode(m.key)}
            aria-pressed={mode === m.key}
            className={clsx(
              "type-label flex-1 px-3 py-2.5 transition-colors",
              mode === m.key
                ? "bg-ember text-void"
                : "text-chalk-muted hover:text-chalk",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="hidden border-t border-rule px-3 py-2.5 sm:block">
        {mode === "pays" ? (
          <ul className="space-y-1.5">
            {[3, 2, 1].map((tier) => (
              <li key={tier} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0"
                  style={{
                    background: `rgba(255,90,31,${tier === 3 ? 0.95 : tier === 2 ? 0.44 : 0.14})`,
                  }}
                />
                <span className="type-label text-chalk-soft">Tier {tier}</span>
                <span className="type-data ml-auto text-chalk">
                  {money(day(tier))} / day
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2 border-t border-rule/60 pt-2">
              <span className="h-3 w-3 shrink-0 border border-dashed border-chalk" />
              <span className="type-label text-chalk-soft">Free</span>
              <span className="type-data ml-auto text-chalk">
                {board.neutralHexes} left
              </span>
            </li>
          </ul>
        ) : (
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 bg-[#4c8df6]/40 ring-1 ring-[#4c8df6]" />
              <span className="type-label text-chalk-soft">Guild territory</span>
              <span className="type-data ml-auto text-chalk">
                {board.guilds.filter((g) => g.hexes > 0).length} guilds
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 bg-[#39404a]" />
              <span className="type-label text-chalk-soft">Unclaimed</span>
              <span className="type-data ml-auto text-chalk">
                {board.neutralHexes}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full border-2 border-ember" />
              <span className="type-label text-chalk-soft">Tier 3 · pays 8x</span>
              <span className="type-data ml-auto text-chalk">
                {board.tiers.filter((t) => t === 3).length}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 border-2 border-chalk" />
              <span className="type-label text-chalk-soft">Refuge · safe</span>
              <span className="type-data ml-auto text-chalk">
                {board.refuges.length}
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
