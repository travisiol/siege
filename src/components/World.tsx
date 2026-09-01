"use client";

import { useEffect, useMemo, useState } from "react";
import { HexMap, type MapMode } from "@/components/HexMap";
import { HexPanel } from "@/components/HexPanel";
import { MapKey } from "@/components/MapKey";
import { Steps } from "@/components/Steps";
import { Docs } from "@/components/Docs";
import { Resolution } from "@/components/Resolution";
import { TickClock } from "@/components/TickClock";
import { Ticker } from "@/components/Ticker";
import { Button } from "@/components/ui/Button";
import { Label, SourceNote } from "@/components/ui/Label";
import { buildMap } from "@/lib/hexmap";
import { useBoardData } from "@/lib/board-context";
import { siteConfig } from "@/lib/site-config";

/*
 * One page: the map, and whatever is being looked at on it.
 *
 * There is nothing to scroll to. The pitch sits over the map until a hex is
 * picked, at which point it steps aside for that hex's sheet, and the manual
 * opens over the top when asked for. A visitor only ever has one thing in front
 * of them.
 *
 * The order of the left rail is the order of the questions a newcomer asks:
 * what is this, what do I get, and what do I press. The three-beat strip carries
 * that load — it replaced a paragraph and four stat pills that took longer to
 * say less.
 *
 * The map opens in "what it pays" rather than "who owns it". The guild map is
 * the prettier image, but a first-time visitor cannot read it, and the whole
 * point of the page is that they understand the payout before anything else.
 */
export function World() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [replayOpen, setReplayOpen] = useState(false);
  const [mode, setMode] = useState<MapMode>("pays");
  const [wide, setWide] = useState(true);
  const previewBoard = useBoardData();

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
  const bias = wide ? (selected ? 0.36 : 0.69) : 0.5;
  const biasY = 0.5;

  const openBestFreeHex = () => {
    // A free tier 3 shows both things that matter at once: what is worth taking,
    // and that there is still ground to take.
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
          treasury={previewBoard.treasury}
          yieldUnit={previewBoard.yieldUnit}
          ticksPerDay={previewBoard.ticksPerDay}
          radius={previewBoard.radius}
          mode={mode}
          selectedId={selectedId}
          onSelect={setSelectedId}
          bias={bias}
          biasY={biasY}
          className="h-full w-full"
        />
      </div>

      {/* The key sits with the map, and steps aside for the hex sheet. */}
      {!selected && (
        <div className="absolute right-3 top-3 z-20 w-[172px] sm:right-4 sm:top-4 sm:w-[236px]">
          <MapKey mode={mode} onMode={setMode} />
        </div>
      )}

      {/* The pitch, until a hex takes its place. */}
      {!selected && (
        <div className="pointer-events-none absolute inset-x-0 top-[42%] bottom-10 overflow-y-auto border-t border-rule bg-void/90 px-4 backdrop-blur-sm sm:px-8 lg:inset-y-0 lg:top-0 lg:bottom-0 lg:flex lg:w-[50%] lg:items-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:pb-12 lg:backdrop-blur-none">
          <div className="pitch pointer-events-auto w-full max-w-[480px] py-5 lg:py-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Label className="text-chalk-soft">
                Tick {previewBoard.tick} / {previewBoard.ticksPerSeason}
              </Label>
              <SourceNote />
            </div>

            <h1 className="type-hero wordmark-outline mt-4 text-chalk">
              {siteConfig.wordmark}
            </h1>

            {/* The subtitle is the payout, not the theme. */}
            <p className="type-display mt-3 text-ember">Hold ground.</p>
            <p className="type-display text-chalk">Get paid every 8 hours.</p>

            <Steps className="mt-5" />

            <div className="mt-5 flex flex-wrap items-stretch gap-3">
              <Button onClick={openBestFreeHex}>Pick a free hex</Button>
              <Button variant="outline" onClick={() => setDocsOpen(true)}>
                How it works
              </Button>
              <Button variant="outline" onClick={() => setReplayOpen(true)}>
                Watch a tick resolve
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
      {replayOpen && <Resolution onClose={() => setReplayOpen(false)} />}
    </div>
  );
}
