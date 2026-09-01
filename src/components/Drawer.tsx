"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { guildColor, guildName } from "@/lib/guilds";
import { previewBoard } from "@/lib/preview-board";
import { guildEconomics, money } from "@/lib/economics";
import { siteConfig, chainConfig } from "@/lib/site-config";

/*
 * The full standings, behind one control.
 *
 * The band at the bottom carries colour and a hex count; this is where the
 * columns that explain that count live — how many people are in the guild, what
 * their ground pays a day, and what it projects from the season pool. A guild
 * on forty hexes none of which were fought for is not the same story as a guild
 * on twenty that tore fifteen out of someone else.
 */
export function Drawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const standings = previewBoard.guilds.filter((g) => g.hexes > 0);
  const totalMembers = standings.reduce((s, g) => s + g.members, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open standings"
        aria-expanded={open}
        className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] border border-rule transition-colors duration-150 hover:border-ember"
      >
        {[0, 1, 2].map((bar) => (
          <span key={bar} aria-hidden className="h-px w-4 bg-chalk" />
        ))}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex">
          <button
            type="button"
            aria-label="Close standings"
            onClick={() => setOpen(false)}
            className="flex-1 bg-void/80"
          />
          <nav className="w-[380px] max-w-[92vw] overflow-y-auto border-l border-rule bg-field">
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <Label className="text-chalk">{siteConfig.wordmark}</Label>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close standings"
                className="type-data px-2 text-chalk-muted transition-colors duration-150 hover:text-ember"
              >
                Close
              </button>
            </div>

            <div className="border-b border-rule px-5 py-4">
              <Label className="block text-chalk-muted">
                Standings — tick {previewBoard.tick} / {previewBoard.ticksPerSeason}
              </Label>

              <ul className="mt-3">
                {standings.map((g) => {
                  const e = guildEconomics(g.id);
                  return (
                    <li key={g.id} className="border-b border-rule/40 py-3 last:border-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 self-center"
                          style={{ background: guildColor(g.id) }}
                        />
                        <span className="type-figure-sm truncate text-chalk">
                          {guildName(g.id)}
                        </span>
                        <span className="type-data ml-auto shrink-0 text-chalk">
                          {g.hexes} hexes
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 pl-[18px]">
                        <span className="type-data text-chalk-muted">
                          {g.members} {g.members === 1 ? "member" : "members"}
                        </span>
                        <span className="type-data text-chalk-soft">
                          {e ? money(e.yieldPerDay) : 0} / day
                        </span>
                        <span className="type-data text-ember">
                          {e ? money(e.poolShare) : 0} projected
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 pl-[18px]">
                        <span className="type-label text-chalk-muted">
                          {g.conquests} taken
                        </span>
                        <span className="type-label text-chalk-muted">
                          {g.losses} lost
                        </span>
                        <span className="type-label text-chalk-muted">
                          {g.tier3} prime
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-b border-rule px-5 py-4">
              <Label className="block text-chalk-muted">The season</Label>
              <dl className="mt-3 space-y-2">
                {[
                  ["Hexes", String(previewBoard.totalHexes)],
                  ["Still unclaimed", String(previewBoard.neutralHexes)],
                  ["Players on the board", String(totalMembers)],
                  ["Battles fought", String(previewBoard.battles)],
                  ["Hexes captured", String(previewBoard.conquests)],
                  [
                    "Map yield",
                    `${money(previewBoard.mapYieldPerTick)} / tick`,
                  ],
                  ["Prize pool", `${money(previewBoard.seasonPool)} ${siteConfig.ticker}`],
                  ["Target network", chainConfig.network],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="type-body text-chalk-soft">{k}</dt>
                    <dd className="type-data shrink-0 text-chalk">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="type-data px-5 py-4 text-chalk-muted">
              Nothing is deployed. These standings come out of the balance
              simulation, not the chain — a demonstration of what the map will
              do, not a live game state.
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
