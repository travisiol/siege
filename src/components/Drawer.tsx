"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { guildColor, guildName } from "@/lib/guilds";
import { previewBoard } from "@/lib/preview-board";
import { siteConfig, chainConfig } from "@/lib/site-config";

/*
 * Le classement complet, derrière un seul contrôle.
 *
 * Le bandeau du bas ne montre que la couleur et le nombre d'hexagones; ici on
 * donne les colonnes qui expliquent ce nombre — pris par claim, pris de force,
 * perdus. Sur une carte de conquête, une guilde à 40 hexagones dont aucun n'a
 * été gagné au combat ne raconte pas la même histoire qu'une guilde à 20 qui
 * en a arraché 15.
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le classement"
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
            aria-label="Fermer"
            onClick={() => setOpen(false)}
            className="flex-1 bg-void/80"
          />
          <nav className="w-[340px] max-w-[88vw] overflow-y-auto border-l border-rule bg-field">
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <Label className="text-chalk">{siteConfig.wordmark}</Label>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="type-data px-2 text-chalk-muted transition-colors duration-150 hover:text-ember"
              >
                Fermer
              </button>
            </div>

            <div className="border-b border-rule px-5 py-4">
              <Label className="block text-chalk-muted">
                Classement — tick {previewBoard.tick} / {previewBoard.ticksPerSeason}
              </Label>

              <div className="mt-3 flex items-baseline gap-3 border-b border-rule/60 pb-2">
                <span className="type-label w-full text-chalk-muted">Guilde</span>
                <span className="type-label w-10 shrink-0 text-right text-chalk-muted">Hex</span>
                <span className="type-label w-14 shrink-0 text-right text-chalk-muted">Pris</span>
                <span className="type-label w-14 shrink-0 text-right text-chalk-muted">Perdus</span>
              </div>

              <ul className="mt-1">
                {standings.map((g) => (
                  <li
                    key={g.id}
                    className="flex items-baseline gap-3 border-b border-rule/40 py-2 last:border-0"
                  >
                    <span className="flex w-full items-center gap-2 overflow-hidden">
                      <span
                        className="h-2 w-2 shrink-0"
                        style={{ background: guildColor(g.id) }}
                      />
                      <span className="type-body truncate text-chalk">
                        {guildName(g.id)}
                      </span>
                    </span>
                    <span className="type-data w-10 shrink-0 text-right text-chalk">
                      {g.hexes}
                    </span>
                    <span className="type-data w-14 shrink-0 text-right text-chalk-soft">
                      {g.conquests}
                    </span>
                    <span className="type-data w-14 shrink-0 text-right text-chalk-muted">
                      {g.losses}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-rule px-5 py-4">
              <Label className="block text-chalk-muted">La saison</Label>
              <dl className="mt-3 space-y-2">
                {[
                  ["Hexagones", String(previewBoard.totalHexes)],
                  ["Encore neutres", String(previewBoard.neutralHexes)],
                  ["Batailles jouées", String(previewBoard.battles)],
                  ["Conquêtes", String(previewBoard.conquests)],
                  ["Jeton", siteConfig.ticker],
                  ["Réseau visé", chainConfig.network],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="type-body text-chalk-soft">{k}</dt>
                    <dd className="type-data text-chalk">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="type-data px-5 py-4 text-chalk-muted">
              Rien n'est déployé. Ce classement sort de la simulation
              d'équilibrage, pas de la chaîne — c'est une démonstration de ce
              que la carte donnera, pas un état de jeu.
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
