"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Label, PreviewTag } from "@/components/ui/Label";
import { guildColor, guildName } from "@/lib/guilds";
import { TIER_YIELD, type HexCell } from "@/lib/hexmap";
import { hexEconomics, guildEconomics, money } from "@/lib/economics";
import { isLive, chainConfig, siteConfig } from "@/lib/site-config";
import { previewBoard } from "@/lib/preview-board";

/*
 * One hex, and what it is worth.
 *
 * Everything here is public in the real game — owner, tier, treasury, how long
 * it has been held — because it is exactly what an attacker can read before
 * committing. The one thing nobody sees until reveal is the amount staked
 * against them, and the order panel says so rather than pretending otherwise.
 *
 * The earnings block leads. A player deciding whether to take this hex is
 * asking "what does it pay and who am I splitting it with", so that answer
 * comes before the combat maths.
 */

const TIER_NOTE: Record<number, string> = {
  1: "Common ground. 70% of the map.",
  2: "Rich ground. 25% of the map.",
  3: "Prime ground. 27 hexes in all, never adjacent to each other.",
};

function Row({
  k,
  v,
  tone,
  hint,
}: {
  k: string;
  v: string;
  tone?: string;
  hint?: string;
}) {
  return (
    <div className="border-b border-rule/50 py-2.5 last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <Label>{k}</Label>
        <span className={clsx("type-data shrink-0 text-chalk", tone)}>{v}</span>
      </div>
      {hint && <p className="type-data mt-1 text-chalk-muted">{hint}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule px-5 py-4">
      <Label className="text-chalk-soft">{title}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function HexPanel({ cell, onClose }: { cell: HexCell; onClose: () => void }) {
  const owner = previewBoard.owners[cell.id] ?? 0;
  const isRefuge = previewBoard.refuges.includes(cell.id);
  const e = hexEconomics(cell.id);
  const g = owner === 0 ? null : guildEconomics(owner);
  const ticksLeft = previewBoard.ticksPerSeason - previewBoard.tick;

  return (
    <div className="flex h-full flex-col border-l border-rule bg-void/96 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3 border-b border-rule px-5 py-4">
        <div>
          <Label>Hex</Label>
          <div className="type-display mt-1 text-chalk">
            #{String(cell.id).padStart(3, "0")}
          </div>
          <p className="type-data mt-1 text-chalk-muted">
            q {cell.q} · r {cell.r} · ring {cell.ring}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close hex sheet"
          className="type-label border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Ownership. Colour before figures. */}
        <div
          className="flex items-center gap-3 border-b border-rule px-5 py-3"
          style={{ background: owner === 0 ? "transparent" : `${guildColor(owner)}1f` }}
        >
          <span
            className="h-3 w-3 shrink-0"
            style={{ background: owner === 0 ? "#39404a" : guildColor(owner) }}
          />
          <span className="type-figure-sm text-chalk">
            {owner === 0 ? "Unclaimed" : guildName(owner)}
          </span>
          {isRefuge && (
            <span className="type-label ml-auto border border-chalk/40 px-2 py-1 text-chalk">
              Refuge
            </span>
          )}
          {e.tier === 3 && !isRefuge && (
            <span className="type-label ml-auto border border-ember/40 bg-ember/10 px-2 py-1 text-ember">
              Tier 3 · 8x
            </span>
          )}
        </div>

        {/* ---- What it pays. The reason anyone is looking at this sheet. */}
        <div className="bg-field/60 px-5 py-4">
          <Label className="text-ember">What this hex pays</Label>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="type-figure text-chalk">{money(e.yieldPerDay)}</span>
            <span className="type-label text-chalk-muted">{siteConfig.ticker} / day</span>
          </div>
          <p className="type-data mt-1 text-chalk-muted">
            {money(e.yieldPerTick)} per tick, three ticks a day. Tier {e.tier} pays{" "}
            {TIER_YIELD[e.tier]}x the base rate.
          </p>

          <dl className="mt-4">
            <Row
              k="Treasury on the hex"
              v={`${money(e.treasury)} ${siteConfig.ticker}`}
              tone={e.treasury > 0 ? "text-gain" : undefined}
              hint="Accrues every tick. Whoever takes the hex takes all of it."
            />
            <Row
              k="Yield still to come"
              v={`${money(e.yieldRemaining)} ${siteConfig.ticker}`}
              hint={`${ticksLeft} ticks left in the season.`}
            />
            <Row
              k="Upkeep this tick"
              // "-0" on an empty hex reads as a bug rather than as nothing owed.
              v={
                e.upkeepPerTick > 0
                  ? `−${money(e.upkeepPerTick)} ${siteConfig.ticker}`
                  : "—"
              }
              tone={e.upkeepPerTick > 0 ? "text-loss" : undefined}
              hint={`${previewBoard.upkeepPct}% of the treasury goes back to the season pool every tick. Nothing is owed on an empty hex.`}
            />
            <Row
              k="Season pool projection"
              v={`${money(e.poolShare)} ${siteConfig.ticker}`}
              tone="text-ember"
              hint={`${e.poolSharePct.toFixed(2)}% of the ${money(previewBoard.seasonPool)} pool, if this hex is still yours at tick ${previewBoard.ticksPerSeason}.`}
            />
          </dl>
        </div>

        {/* ---- Who you split it with. */}
        <Section title="Who holds it">
          {owner === 0 ? (
            <p className="type-body text-chalk-soft">
              Nobody yet. Claim it and the position is entirely yours until
              someone else buys in or takes it off you.
            </p>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="type-figure text-chalk">{e.holders}</span>
                <span className="type-label text-chalk-muted">
                  {e.holders === 1 ? "wallet" : "wallets"} on this hex
                </span>
              </div>
              <dl className="mt-3">
                <Row
                  k="Largest holder"
                  v={`${e.topHolderPct}%`}
                  hint="Position sizes follow the stake each wallet committed here."
                />
                <Row
                  k="Pool share each"
                  v={`${money(e.poolSharePerHolder)} ${siteConfig.ticker}`}
                  hint="Even split of the projection above. Real payout follows each wallet's position."
                />
                {g && (
                  <Row
                    k={`${guildName(owner)} guild`}
                    v={`${g.mapPct.toFixed(1)}% of map`}
                    hint={`${previewBoard.guilds.find((x) => x.id === owner)?.members ?? 0} active members, ${money(g.yieldPerDay)} ${siteConfig.ticker} a day across ${previewBoard.guilds.find((x) => x.id === owner)?.hexes ?? 0} hexes.`}
                  />
                )}
              </dl>
            </>
          )}
        </Section>

        {/* ---- How hard it is to take. */}
        <Section title={owner === 0 ? "Taking it" : "Breaking it"}>
          {owner === 0 ? (
            <dl>
              <Row
                k="Claim cost"
                v={`${money(e.claimCost)} ${siteConfig.ticker}`}
                hint="Tier x 100, flat. No battle: a free hex next to yours is simply bought."
              />
              <Row
                k="Pays for itself in"
                v={`${Math.ceil(e.claimCost / e.yieldPerDay)} days`}
                hint="At the yield above, ignoring upkeep and anything you win holding it."
              />
              <Row k="Ground" v={`Tier ${e.tier}`} hint={TIER_NOTE[e.tier]} />
            </dl>
          ) : (
            <dl>
              <Row
                k="Fortification"
                v={`${e.fortification}%`}
                tone={e.fortification >= 200 ? "text-ember" : undefined}
                hint={`Held ${e.ticksHeld} ticks. Defence climbs 5% a tick and caps at 200% after twenty.`}
              />
              <Row
                k="Prize if you win"
                v={`${money(e.treasury)} ${siteConfig.ticker}`}
                hint="The whole treasury moves to you, plus 10% of the defender's stake. The hex resets to 100% fortification in your hands."
              />
              <Row
                k="Cost if you lose"
                v="20% of your stake"
                tone="text-loss"
                hint="Half to the defender, half burned. Attacking is never free."
              />
              <Row k="Ground" v={`Tier ${e.tier}`} hint={TIER_NOTE[e.tier]} />
            </dl>
          )}
        </Section>

        {isRefuge && (
          <p className="type-data mx-5 my-4 border border-chalk/25 bg-chalk/5 px-3 py-2.5 text-chalk-soft">
            A refuge cannot be attacked. Every guild holds exactly one and can
            move it once every 21 ticks — which is what guarantees no guild can
            ever be wiped off the map.
          </p>
        )}

        {/* ---- Order panel. Disabled while no contract exists. */}
        <div className="mx-5 mb-5 mt-4 border border-rule">
          <div className="flex items-center justify-between gap-2 border-b border-rule px-4 py-3">
            <Label className="text-chalk-soft">Commit an order</Label>
            <PreviewTag />
          </div>

          <div className="px-4 py-4">
            <div className="flex gap-2">
              {(owner === 0
                ? ([{ k: "claim", l: "Claim" }] as const)
                : ([
                    { k: "attack", l: "Attack" },
                    { k: "defend", l: "Defend" },
                  ] as const)
              ).map((opt) => (
                <span
                  key={opt.k}
                  className="type-label flex-1 border border-rule-strong px-3 py-2.5 text-center text-chalk-muted"
                >
                  {opt.l}
                </span>
              ))}
            </div>

            <p className="type-data mt-3 text-chalk-muted">
              {owner === 0
                ? `A neutral hex next to ground you already hold costs ${money(e.claimCost)} ${siteConfig.ticker} and needs no battle.`
                : "Your stake stays sealed until reveal — the commit is only a hash. Nobody, defender included, sees what is coming."}
            </p>

            <Button className="mt-4 w-full" disabled>
              {isLive ? "Commit" : "Contracts not deployed"}
            </Button>

            <p className="type-data mt-3 text-chalk-muted">
              {isLive
                ? `${chainConfig.network}.`
                : `Nothing is deployed. ${chainConfig.network} is the target, once the balance simulation clears.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
