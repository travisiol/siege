"use client";

import { useEffect, useMemo, useState } from "react";
import { HexMap } from "@/components/HexMap";
import { HexPanel } from "@/components/HexPanel";
import { InfoOverlay } from "@/components/InfoOverlay";
import { TickClock } from "@/components/TickClock";
import { Ticker } from "@/components/Ticker";
import { Button } from "@/components/ui/Button";
import { Label, PreviewTag } from "@/components/ui/Label";
import { buildMap } from "@/lib/hexmap";
import { previewBoard } from "@/lib/preview-board";
import { siteConfig } from "@/lib/site-config";

/*
 * Une seule page: la carte, et ce qu'on est en train d'y regarder.
 *
 * Il n'y a rien à faire défiler. Le pitch reste posé sur la carte tant qu'aucun
 * hexagone n'est choisi, puis s'efface pour la fiche de cet hexagone, et les
 * règles s'ouvrent par-dessus quand on les demande. Le visiteur n'a jamais
 * qu'une seule chose devant lui.
 */
export function World() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [wide, setWide] = useState(true);

  const cells = useMemo(() => buildMap(previewBoard.radius), []);
  const selected = selectedId === null ? null : cells[selectedId];

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /*
   * La carte se décale de sous ce qui est ouvert: à côté du texte sur grand
   * écran, poussée à gauche quand la fiche prend le bord droit, et remontée
   * dans la moitié haute quand la mise en page s'empile. On ne lit jamais
   * par-dessus la carte.
   */
  const bias = wide ? (selected ? 0.34 : 0.62) : 0.5;
  const biasY = wide ? 0.5 : 0.34;

  const held = previewBoard.totalHexes - previewBoard.neutralHexes;
  const pills = [
    { key: "Hexagones", value: String(previewBoard.totalHexes) },
    { key: "Libres", value: String(previewBoard.neutralHexes) },
    { key: "Tenus", value: `${held} / ${previewBoard.totalHexes}` },
    { key: "Batailles", value: String(previewBoard.battles) },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="sheet-grid absolute inset-0">
        <HexMap
          owners={previewBoard.owners}
          tiers={previewBoard.tiers}
          refuges={previewBoard.refuges}
          radius={previewBoard.radius}
          selectedId={selectedId}
          onSelect={setSelectedId}
          bias={bias}
          biasY={biasY}
          className="h-full w-full"
        />
      </div>

      {/* Le pitch, jusqu'à ce qu'un hexagone prenne sa place. */}
      {!selected && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 px-4 sm:px-8 lg:inset-y-0 lg:right-auto lg:flex lg:w-[48%] lg:items-center">
          <div className="pitch pointer-events-auto w-full max-w-[540px]">
            <div className="flex flex-wrap items-center gap-2">
              <PreviewTag />
              <Label>Saison simulée · tick {previewBoard.tick} / {previewBoard.ticksPerSeason}</Label>
            </div>

            <h1 className="type-hero wordmark-outline mt-4 text-chalk">
              {siteConfig.wordmark}
            </h1>
            <p className="type-display mt-3 text-ember">Prends la carte.</p>
            <p className="type-display text-chalk">Garde-la.</p>

            <p className="type-body mt-5 max-w-[48ch] text-chalk-soft">
              547 hexagones, douze guildes, un tour toutes les huit heures. On
              mise à l&apos;aveugle, tout se résout d&apos;un bloc, et le
              vainqueur emporte le trésor de la case. Aucun aléatoire nulle
              part : rien que des entiers.
            </p>

            <dl className="mt-6 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <div
                  key={pill.key}
                  className="flex items-baseline gap-2 border border-rule bg-void/70 px-3 py-2"
                >
                  <dt>
                    <Label>{pill.key}</Label>
                  </dt>
                  <dd className="type-data text-chalk">{pill.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap items-stretch gap-3">
              <Button variant="outline" onClick={() => setInfoOpen(true)}>
                Comment ça marche
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Un tier 3 libre montre d'un coup les deux choses qui
                  // comptent: ce qui vaut cher, et ce qui est encore à prendre.
                  const free = previewBoard.owners
                    .map((owner, id) => ({ owner, id, tier: previewBoard.tiers[id] }))
                    .filter((h) => h.owner === 0);
                  const prize = free.find((h) => h.tier === 3) ?? free[0];
                  if (prize) setSelectedId(prize.id);
                }}
              >
                Voir une case libre
              </Button>
            </div>

            <div className="mt-5 max-w-[300px]">
              <TickClock />
            </div>
          </div>
        </div>
      )}

      {/* Une fois une case choisie, le pitch se réduit à une ligne. */}
      {selected && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 hidden px-4 sm:block sm:px-8">
          <div className="pointer-events-auto flex flex-wrap items-center gap-3">
            <PreviewTag />
            <Button variant="outline" onClick={() => setInfoOpen(true)}>
              Comment ça marche
            </Button>
          </div>
        </div>
      )}

      {/* La fiche, par-dessus la carte plutôt qu'à côté. */}
      {selected && (
        <div className="absolute inset-y-0 right-0 z-30 w-full max-w-[420px]">
          <HexPanel cell={selected} onClose={() => setSelectedId(null)} />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20">
        <Ticker />
      </div>

      {infoOpen && <InfoOverlay onClose={() => setInfoOpen(false)} />}
    </div>
  );
}
