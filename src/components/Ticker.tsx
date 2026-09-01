"use client";

import { guildColor, guildName } from "@/lib/guilds";
import { previewBoard } from "@/lib/preview-board";

/*
 * Le classement, en bandeau.
 *
 * Contenu dupliqué une fois: l'animation défile exactement une copie puis
 * repart de zéro, ce qui donne une boucle sans couture sans avoir à mesurer
 * quoi que ce soit en JavaScript.
 */
export function Ticker() {
  const standings = previewBoard.guilds.filter((g) => g.hexes > 0);

  const items = standings.map((g) => (
    <span key={g.id} className="flex shrink-0 items-center gap-2 px-5">
      <span className="h-2 w-2 shrink-0" style={{ background: guildColor(g.id) }} />
      <span className="type-label text-chalk-soft">{guildName(g.id)}</span>
      <span className="type-data text-chalk">{g.hexes}</span>
      <span className="type-label text-chalk-muted">
        {g.conquests} prises · {g.losses} perdus
      </span>
    </span>
  ));

  return (
    <div className="flex items-center border-t border-rule bg-void/92 backdrop-blur-sm">
      <span className="type-label shrink-0 border-r border-rule px-4 py-2.5 text-chalk-muted">
        Saison simulée
      </span>
      <div className="flex-1 overflow-hidden py-2.5">
        <div className="animate-ticker flex w-max items-center">
          {items}
          {/* La copie qui rend la boucle continue. */}
          <span aria-hidden className="flex">
            {items}
          </span>
        </div>
      </div>
    </div>
  );
}
