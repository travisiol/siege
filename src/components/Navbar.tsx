"use client";

import { Drawer } from "@/components/Drawer";
import { Label } from "@/components/ui/Label";
import { previewBoard } from "@/lib/preview-board";
import { siteConfig, isLive, chainConfig } from "@/lib/site-config";

/*
 * L'état de la carte, porté dans l'en-tête.
 *
 * Chaque puce est une vraie lecture du plateau simulé. La pastille de droite
 * dit l'état réel du projet — tant qu'aucun contrat n'existe, elle le dit,
 * plutôt que d'afficher un faux « live » qui vieillirait mal.
 */

/** La marque : un hexagone forcé sur un flanc. */
function Mark() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden focusable="false">
      <path
        d="M14 1.6 L26 8.5 V23.5 L14 30.4 L2 23.5 V8.5 Z"
        fill="none"
        stroke="#ff5a1f"
        strokeWidth="2"
      />
      <path d="M14 8.6 L20 12 V19 L14 22.4 L8 19 V12 Z" fill="#ffffff" />
    </svg>
  );
}

export function Navbar() {
  const held = previewBoard.totalHexes - previewBoard.neutralHexes;

  const chips = [
    { key: "Hexes", value: String(previewBoard.totalHexes) },
    {
      key: "Tenus",
      value: `${Math.round((100 * held) / previewBoard.totalHexes)}%`,
    },
    {
      key: "Guildes",
      value: String(previewBoard.guilds.filter((g) => g.hexes > 0).length),
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-void/92 backdrop-blur-sm">
      <nav className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <Drawer />

        <a href="/" className="flex items-center gap-2.5">
          <Mark />
          <span className="type-title text-chalk">{siteConfig.name}</span>
        </a>

        <dl className="ml-auto hidden items-center gap-5 md:flex">
          {chips.map((chip) => (
            <div key={chip.key} className="flex items-baseline gap-2">
              <dt>
                <Label>{chip.key}</Label>
              </dt>
              <dd className="type-data text-chalk">{chip.value}</dd>
            </div>
          ))}
        </dl>

        <span
          className="type-label ml-auto shrink-0 border border-rule-strong px-2.5 py-1.5 text-chalk-muted md:ml-0"
          title={
            isLive
              ? undefined
              : "Aucun contrat n'est déployé : la carte affichée sort de la simulation d'équilibrage."
          }
        >
          {isLive ? chainConfig.network : "Avant-lancement"}
        </span>
      </nav>
    </header>
  );
}
