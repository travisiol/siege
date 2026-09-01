"use client";

import { Drawer } from "@/components/Drawer";
import { Label } from "@/components/ui/Label";
import { useBoardData } from "@/lib/board-context";
import { WalletConnect } from "@/components/WalletConnect";
import { money } from "@/lib/economics";
import { siteConfig, isLive, chainConfig } from "@/lib/site-config";

/*
 * The state of the map, carried in the header.
 *
 * Every chip is a real reading off the simulated board. The pill on the right
 * states the actual state of the project — while no contract exists it says so,
 * rather than showing a fake "live" that would age badly.
 */

/** The mark: a hex breached on one flank. */
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
  const previewBoard = useBoardData();
  const held = previewBoard.totalHexes - previewBoard.neutralHexes;

  const chips = [
    { key: "Hexes", value: String(previewBoard.totalHexes) },
    {
      key: "Held",
      value: `${Math.round((100 * held) / previewBoard.totalHexes)}%`,
    },
    {
      key: "Guilds",
      value: String(previewBoard.guilds.filter((g) => g.hexes > 0).length),
    },
    {
      key: "Pool",
      value: money(previewBoard.seasonPool),
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

        <WalletConnect className="shrink-0 border border-rule-strong text-chalk hover:border-ember hover:text-ember" />

        <span className="type-label ml-auto shrink-0 border border-rule-strong px-2.5 py-1.5 text-chalk-muted md:ml-0">
          {chainConfig.network}
        </span>
      </nav>
    </header>
  );
}
