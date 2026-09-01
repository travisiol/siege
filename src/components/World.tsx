"use client";

import { useEffect, useMemo, useState } from "react";
import { HexMap } from "@/components/HexMap";
import { HexPanel } from "@/components/HexPanel";
import { Docs } from "@/components/Docs";
import { TickClock } from "@/components/TickClock";
import { Ticker } from "@/components/Ticker";
import { Button } from "@/components/ui/Button";
import { Label, PreviewTag } from "@/components/ui/Label";
import { buildMap, TIER_YIELD } from "@/lib/hexmap";
import { previewBoard } from "@/lib/preview-board";
import { TOTAL_TIER_WEIGHT, money } from "@/lib/economics";
import { siteConfig } from "@/lib/site-config";

/*
 * One page: the map, and whatever is being looked at on it.
 *
 * There is nothing to scroll to. The pitch sits over the map until a hex is
 * picked, at which point it steps aside for that hex's sheet, and the manual
 * opens over the top when asked for. A visitor only ever has one thing in
 * front of them.
 *
 * The subtitle states the payout, not the theme. Someone landing here should
 * learn what the game pays before they learn what it is about.
 */
export function World() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
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
   * The map slides out from under whatever is open: beside the copy on a wide
   * screen, and pushed further left when a hex sheet takes the right edge.
   *
   * Once the layout stacks there is no "beside" left, so the two are split
   * outright — map in the top band, copy in the bottom one. Overlaying them
   * makes both unreadable, and the rule is that nothing is ever read on top of
   * the map.
   */
  const bias = wide ? (selected ? 0.32 : 0.63) : 0.5;
  const biasY = 0.5;

  const tier1Day = TIER_YIELD[1] * previewBoard.yieldUnit * previewBoard.ticksPerDay;
  const tier3Day = TIER_YIELD[3] * previewBoard.yieldUnit * previewBoard.ticksPerDay;
  const tier3Pool = (previewBoard.seasonPool * TIER_YIELD[3]) / TOTAL_TIER_WEIGHT;

  const pills = [
    { key: "Prize pool", value: `${money(previewBoard.seasonPool)}`, tone: true },
    { key: "Unclaimed", value: `${previewBoard.neutralHexes} hexes` },
    { key: "Guilds", value: String(previewBoard.guilds.filter((g) => g.hexes > 0).length) },
    { key: "Battles fought", value: String(previewBoard.battles) },
  ];

  const openBestFreeHex = () => {
    // A free tier 3 shows both things that matter at once: what is worth
    // taking, and that there is still ground to take.
    const free = previewBoard.owners
      .map((owner, id) => ({ owner, id, tier: previewBoard.tiers[id] }))
      .filter((h) => h.owner === 0);
    const prize = free.find((h) => h.tier === 3) ?? free.find((h) => h.tier === 2) ?? free[0];
    if (prize) setSelectedId(prize.id);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="sheet-grid absolute inset-x-0 top-0 bottom-[58%] lg:inset-0">
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

      {/* The pitch, until a hex takes its place. */}
      {!selected && (
        <div className="pointer-events-none absolute inset-x-0 top-[42%] bottom-10 overflow-y-auto border-t border-rule bg-void/90 px-4 backdrop-blur-sm sm:px-8 lg:inset-y-0 lg:top-0 lg:bottom-0 lg:flex lg:w-[50%] lg:items-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:pb-12 lg:backdrop-blur-none">
          <div className="pitch pointer-events-auto w-full max-w-[560px] py-5 lg:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <PreviewTag />
              <Label>
                Simulated season · tick {previewBoard.tick} / {previewBoard.ticksPerSeason}
              </Label>
            </div>

            <h1 className="type-hero wordmark-outline mt-4 text-chalk">
              {siteConfig.wordmark}
            </h1>

            {/* The subtitle is the payout. */}
            <p className="type-display mt-3 text-ember">Hold ground.</p>
            <p className="type-display text-chalk">Get paid every 8 hours.</p>

            <p className="type-body mt-5 max-w-[50ch] text-chalk-soft">
              Every hex you hold pays yield three times a day — {money(tier1Day)}{" "}
              {siteConfig.ticker} for common ground, {money(tier3Day)} for the{" "}
              {previewBoard.tiers.filter((t) => t === 3).length} prime hexes. Take
              one off a guild and its entire treasury moves to you. At the end of
              the season a fixed {money(previewBoard.seasonPool)}{" "}
              {siteConfig.ticker} is split across whoever still holds the map — a
              single prime hex projects {money(tier3Pool)}.
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
                  <dd className={pill.tone ? "type-data text-ember" : "type-data text-chalk"}>
                    {pill.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap items-stretch gap-3">
              <Button onClick={openBestFreeHex}>See what a hex pays</Button>
              <Button variant="outline" onClick={() => setDocsOpen(true)}>
                How it works
              </Button>
            </div>

            <div className="mt-5 max-w-[320px]">
              <TickClock />
            </div>
          </div>
        </div>
      )}

      {/* Once a hex is picked, the pitch collapses to one line. */}
      {selected && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 hidden px-4 sm:block sm:px-8">
          <div className="pointer-events-auto flex flex-wrap items-center gap-3">
            <PreviewTag />
            <Button variant="outline" onClick={() => setDocsOpen(true)}>
              How it works
            </Button>
          </div>
        </div>
      )}

      {/* The hex sheet, over the map rather than beside it. */}
      {selected && (
        <div className="absolute inset-y-0 right-0 z-30 w-full max-w-[420px]">
          <HexPanel cell={selected} onClose={() => setSelectedId(null)} />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20">
        <Ticker />
      </div>

      {docsOpen && <Docs onClose={() => setDocsOpen(false)} />}
    </div>
  );
}
