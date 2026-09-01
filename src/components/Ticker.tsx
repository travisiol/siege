"use client";

import { guildColor, guildName } from "@/lib/guilds";
import { useBoardData } from "@/lib/board-context";

/*
 * The standings, as a band.
 *
 * Content duplicated once: the animation scrolls exactly one copy then starts
 * over, which gives a seamless loop without measuring anything in JavaScript.
 */
export function Ticker() {
  const previewBoard = useBoardData();
  const standings = previewBoard.guilds.filter((g) => g.hexes > 0);

  const items = standings.map((g) => (
    <span key={g.id} className="flex shrink-0 items-center gap-2 px-5">
      <span className="h-2 w-2 shrink-0" style={{ background: guildColor(g.id) }} />
      <span className="type-label text-chalk-soft">{guildName(g.id)}</span>
      <span className="type-data text-chalk">{g.hexes}</span>
      <span className="type-label text-chalk-muted">
        {g.conquests} taken · {g.losses} lost
      </span>
    </span>
  ));

  return (
    <div className="flex items-center border-t border-rule bg-void/92 backdrop-blur-sm">
      <span className="type-label shrink-0 border-r border-rule px-4 py-2.5 text-chalk-muted">
        Simulated season
      </span>
      <div className="flex-1 overflow-hidden py-2.5">
        <div className="animate-ticker flex w-max items-center">
          {items}
          {/* The copy that makes the loop continuous. */}
          <span aria-hidden className="flex">
            {items}
          </span>
        </div>
      </div>
    </div>
  );
}
