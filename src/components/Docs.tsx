"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Label } from "@/components/ui/Label";
import { PHASES, TICKS_PER_SEASON } from "@/lib/season";
import { siteConfig } from "@/lib/site-config";
import { previewBoard } from "@/lib/preview-board";
import { TIER_YIELD } from "@/lib/hexmap";
import { TOTAL_TIER_WEIGHT, money } from "@/lib/economics";

/*
 * The manual.
 *
 * A game whose pitch is "no randomness" has to show its formulas, or the pitch
 * is worth nothing. And a game that pays has to show the arithmetic of the
 * payout, or the numbers on the hex sheet look like decoration. Both are here,
 * with the same figures the sheet uses.
 *
 * The status section says what the balance simulation actually found, including
 * the part that has not been fixed yet. A launch page that hides a known hole
 * only gets to hide it until someone finds it.
 */

const SECTIONS = [
  { id: "earn", label: "What you earn" },
  { id: "tick", label: "The tick" },
  { id: "ground", label: "Taking ground" },
  { id: "math", label: "The maths" },
  { id: "small", label: "Small players" },
  { id: "faq", label: "FAQ" },
  { id: "status", label: "Status" },
];

const TIER_ROWS = [1, 2, 3].map((tier) => {
  const count = previewBoard.tiers.filter((t) => t === tier).length;
  const perTick = TIER_YIELD[tier] * previewBoard.yieldUnit;
  return {
    tier,
    count,
    perTick,
    perDay: perTick * previewBoard.ticksPerDay,
    season: (previewBoard.seasonPool * TIER_YIELD[tier]) / TOTAL_TIER_WEIGHT,
    claim: tier * 100,
  };
});

const FORMULAS = [
  {
    title: "Power",
    code: "power = Σ √(stake_i)",
    note: "The sum of roots, not the root of the sum. Doubling your stake does not double your force: four players at 250 outweigh one player at 1000.",
  },
  {
    title: "Cohesion",
    code: "cohesion = 100 + 2 × min(active members, 25)",
    note: "100 to 150. A guild fielding twenty-five members hits half again as hard as a lone wallet.",
  },
  {
    title: "Fortification",
    code: "fort = 100 + 5 × min(tick − held since, 20)",
    note: "100 to 200. Holding a hex for twenty ticks doubles its defence. Leave it undefended for thirty and it loses the bonus entirely.",
  },
  {
    title: "Empire tax",
    code: "cost = stake × (100 + hexes²) / 100",
    note: "Attacking with 10 hexes costs double, 20 costs five times, 30 costs ten times. The surcharge is burned, not redistributed.",
  },
  {
    title: "Resolution",
    code: "A > D  strictly",
    note: "On a tie the defender holds. The winner takes the hex, its entire treasury, and 20% of the defender's stake.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What do I actually own?",
    a: "A share of a hex, as an ERC-1155 where the token id is the hex id and your balance is your slice of the stake committed there. Several wallets can hold the same hex at once, and the payout follows those slices.",
  },
  {
    q: "How do I make money?",
    a: `Three ways. Yield: every hex you hold accrues ${money(previewBoard.yieldUnit)} to ${money(previewBoard.yieldUnit * 8)} ${siteConfig.ticker} per tick into its treasury, three ticks a day. Capture: win a siege and the defender's entire hex treasury moves to you, plus 10% of their stake. Season pool: a fixed ${money(previewBoard.seasonPool)} ${siteConfig.ticker} is split across held territory at the final tick, weighted by tier.`,
  },
  {
    q: "What does a hex actually pay?",
    a: `A tier 1 hex pays ${money(TIER_ROWS[0].perDay)} a day and projects ${money(TIER_ROWS[0].season)} from the season pool. A tier 3 pays ${money(TIER_ROWS[2].perDay)} a day and projects ${money(TIER_ROWS[2].season)}. There are only ${TIER_ROWS[2].count} tier 3 hexes and none of them touch each other.`,
  },
  {
    q: "Do I have to play every eight hours?",
    a: "To attack, yes — orders are per tick. To hold, not quite: fortification climbs the longer you keep a hex, so established ground defends itself better. But a hex nobody has defended for thirty ticks loses that bonus, and an undefended hex falls to any attack at all.",
  },
  {
    q: "What happens if I miss the reveal window?",
    a: "The stake you committed is forfeit — 10% burned, the rest returned. Reveal is 45 minutes and it is mandatory, because a commit nobody reveals would otherwise be a free option.",
  },
  {
    q: "Why square roots?",
    a: "So money alone does not decide the map. Power grows as the root of your stake, which means a hundred times the tokens buys ten times the force, not a hundred. It is the single most important number in the balance.",
  },
  {
    q: "Can a whale just buy the whole map?",
    a: "That is the exact question the balance simulation exists to answer, and the honest answer today is: not entirely, but further than intended. See Status below — the rules around claiming neutral ground are being revised before any launch.",
  },
  {
    q: "Can I be knocked out completely?",
    a: "No. Every guild holds one refuge hex that cannot be attacked, movable once every 21 ticks. You can lose everything else and still be on the board. A guild down to fewer than three hexes also attacks 25% harder from tick 32 onward.",
  },
  {
    q: "What does upkeep cost me?",
    a: `${previewBoard.upkeepPct}% of each hex treasury per tick, returned to the season pool. It is a drag on hoarding: treasury left sitting on a hex slowly leaks, and it is also the prize someone else collects if they take the hex from you.`,
  },
  {
    q: "Is anything random?",
    a: "No. Not the map, not the battles, not the tiers. Everything resolves in integer arithmetic at 1e18 precision, and replaying the same tick with the transactions in a different order gives the identical result — that property is tested, not assumed.",
  },
  {
    q: "Are new tokens minted as rewards?",
    a: "Never. The season pool is pre-funded and fixed. The supply is capped at deployment and the only flows are between players, into the pool, or burned.",
  },
  {
    q: "Is it live?",
    a: `No. No contract is deployed and no season has run. The board on this page is a real state produced by the balance simulation at tick ${previewBoard.tick} of ${TICKS_PER_SEASON} — not a chain read, and not invented either.`,
  },
];

export function Docs({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-void/97 backdrop-blur-sm">
      {/* Section rail. Sticky so a long read never loses its place. */}
      <div className="sticky top-0 z-10 flex items-center gap-1 overflow-x-auto border-b border-rule bg-void/95 px-4 py-3 backdrop-blur-sm sm:px-8">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setActive(s.id)}
            className={clsx(
              "type-label shrink-0 border px-3 py-2 transition-colors",
              active === s.id
                ? "border-ember/50 bg-ember/10 text-ember"
                : "border-transparent text-chalk-muted hover:text-chalk",
            )}
          >
            {s.label}
          </a>
        ))}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="type-label ml-auto shrink-0 border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk"
        >
          Close
        </button>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Label className="text-ember">How it works</Label>
        <h2 className="type-display mt-2 text-chalk">Take ground. Hold it. Get paid.</h2>
        <p className="type-body mt-5 max-w-[64ch] text-chalk-soft">
          {siteConfig.wordmark} runs in eight-hour turns. Guilds stake{" "}
          {siteConfig.ticker} on the hexes they want to take or keep, every order
          lands at once, and the winner walks off with the treasury. A season is{" "}
          {TICKS_PER_SEASON} ticks — six weeks.
        </p>

        {/* ---- Earnings */}
        <h3 id="earn" className="type-title mt-12 scroll-mt-20 text-chalk">
          What you earn
        </h3>
        <p className="type-body mt-3 max-w-[64ch] text-chalk-soft">
          Three income streams, and they stack.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Yield", "Every tick, each hex you hold accrues tier x base into its own treasury. Three payouts a day."],
            ["Capture", "Win a siege and the defender's whole treasury moves to you, plus 10% of the stake they committed."],
            ["Season pool", `A fixed ${money(previewBoard.seasonPool)} ${siteConfig.ticker}, split at the last tick across held territory, weighted by tier.`],
          ].map(([title, body]) => (
            <div key={title} className="panel px-4 py-4">
              <Label className="text-ember">{title}</Label>
              <p className="type-body mt-2 text-chalk-soft">{body}</p>
            </div>
          ))}
        </div>

        <p className="type-body mt-6 max-w-[64ch] text-chalk-soft">
          Ground is not equal. The map is {previewBoard.totalHexes} hexes split
          across three tiers, and the tier sets both what a hex pays every tick
          and how large a slice of the season pool it carries.
        </p>

        <div className="mt-4 overflow-x-auto border border-rule">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b border-rule bg-field">
                {["Tier", "Hexes", "Per tick", "Per day", "Season pool", "Claim cost"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={clsx(
                        "type-label px-4 py-3 text-chalk-muted",
                        i === 0 ? "text-left" : "text-right",
                      )}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {TIER_ROWS.map((r) => (
                <tr key={r.tier} className="border-b border-rule/50 last:border-0">
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "type-figure-sm",
                        r.tier === 3 ? "text-ember" : "text-chalk",
                      )}
                    >
                      Tier {r.tier}
                    </span>
                    <span className="type-label ml-2 text-chalk-muted">
                      {TIER_YIELD[r.tier]}x
                    </span>
                  </td>
                  <td className="type-data px-4 py-3 text-right text-chalk-soft">
                    {r.count}
                  </td>
                  <td className="type-data px-4 py-3 text-right text-chalk">
                    {money(r.perTick)}
                  </td>
                  <td className="type-data px-4 py-3 text-right text-chalk">
                    {money(r.perDay)}
                  </td>
                  <td
                    className={clsx(
                      "type-data px-4 py-3 text-right",
                      r.tier === 3 ? "text-ember" : "text-chalk",
                    )}
                  >
                    {money(r.season)}
                  </td>
                  <td className="type-data px-4 py-3 text-right text-chalk-soft">
                    {money(r.claim)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="type-data mt-2 text-chalk-muted">
          All figures in {siteConfig.ticker}. Season pool column assumes you hold
          the hex at tick {TICKS_PER_SEASON}; upkeep of {previewBoard.upkeepPct}%
          per tick is not deducted.
        </p>

        {/* ---- The tick */}
        <h3 id="tick" className="type-title mt-12 scroll-mt-20 text-chalk">
          The tick
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PHASES.map((phase) => (
            <div key={phase.name} className="panel px-4 py-4">
              <Label className={phase.name === "resolution" ? "text-ember" : undefined}>
                {phase.label}
              </Label>
              <div className="type-figure-sm mt-2 text-chalk">
                {phase.seconds >= 3600
                  ? `${phase.seconds / 3600} h`
                  : `${phase.seconds / 60} min`}
              </div>
              <p className="type-data mt-2 text-chalk-muted">{phase.blurb}</p>
            </div>
          ))}
        </div>

        <p className="type-body mt-5 max-w-[64ch] text-chalk-soft">
          The staked amount has to stay secret until reveal, or the other side
          simply outbids you. So you deposit into an internal balance first, and
          the commit carries only a hash — no transfer moves during the commit
          phase, because a transfer would leak the size of it.
        </p>

        <pre className="type-formula mt-4 overflow-x-auto border border-rule bg-field px-4 py-3 text-chalk-soft">
          commitment = keccak256(hexId, amount, isAttack, salt, sender)
        </pre>

        {/* ---- Taking ground */}
        <h3 id="ground" className="type-title mt-12 scroll-mt-20 text-chalk">
          Taking ground
        </h3>
        <ul className="mt-4 space-y-3">
          {[
            ["Your first hex", "A new guild claims any unowned hex on the rim of the map. That hex becomes its refuge."],
            ["Free ground", `A neutral hex touching ground you already hold is bought outright — ${money(TIER_ROWS[0].claim)} to ${money(TIER_ROWS[2].claim)} ${siteConfig.ticker} depending on tier. No battle.`],
            ["Held ground", "You can only attack a hex adjacent to one of yours. Both sides commit blind; the attacker needs strictly more power than the defender."],
            ["Refuges", "Never attackable. One per guild, movable once every 21 ticks."],
          ].map(([title, body]) => (
            <li key={title} className="flex gap-3 border-b border-rule/60 pb-3 last:border-0">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" />
              <div>
                <span className="type-figure-sm text-chalk">{title}</span>
                <p className="type-body mt-1 max-w-[62ch] text-chalk-soft">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* ---- Maths */}
        <h3 id="math" className="type-title mt-12 scroll-mt-20 text-chalk">
          The maths
        </h3>
        <p className="type-body mt-3 max-w-[64ch] text-chalk-soft">
          There is no randomness anywhere, not even for flavour. Everything
          computes in integer arithmetic at 1e18 precision: two players replaying
          the same tick get the same answer, and the order the transactions land
          in changes nothing.
        </p>

        <div className="mt-5 space-y-3">
          {FORMULAS.map((f) => (
            <div key={f.title} className="panel px-4 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Label className="text-chalk-soft">{f.title}</Label>
                <code className="type-formula text-ember">{f.code}</code>
              </div>
              <p className="type-data mt-2.5 max-w-[70ch] text-chalk-muted">{f.note}</p>
            </div>
          ))}
        </div>

        {/* ---- Small players */}
        <h3 id="small" className="type-title mt-12 scroll-mt-20 text-chalk">
          What protects small players
        </h3>
        <ul className="mt-4 space-y-3">
          {[
            ["The refuge", "One hex per guild that cannot be attacked. Nobody gets wiped off the map."],
            ["The square root", "Power grows as the root of your stake. A hundred times the tokens is ten times the force."],
            ["The empire tax", "The more hexes a guild holds, the more every attack costs it. The surcharge is burned."],
            ["The rebellion bonus", "A guild down to fewer than three hexes attacks 25% harder from tick 32."],
          ].map(([title, body]) => (
            <li key={title} className="flex gap-3 border-b border-rule/60 pb-3 last:border-0">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" />
              <div>
                <span className="type-figure-sm text-chalk">{title}</span>
                <p className="type-body mt-1 max-w-[62ch] text-chalk-soft">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* ---- FAQ */}
        <h3 id="faq" className="type-title mt-12 scroll-mt-20 text-chalk">
          Questions
        </h3>
        <dl className="mt-4">
          {FAQ.map((item) => (
            <div key={item.q} className="border-b border-rule/60 py-4 last:border-0">
              <dt className="type-figure-sm text-chalk">{item.q}</dt>
              <dd className="type-body mt-2 max-w-[64ch] text-chalk-soft">{item.a}</dd>
            </div>
          ))}
        </dl>

        {/* ---- Status */}
        <h3 id="status" className="type-title mt-12 scroll-mt-20 text-chalk">
          Where the project actually stands
        </h3>
        <div className="mt-4 border border-ember/30 bg-ember/5 px-4 py-4">
          <p className="type-body max-w-[64ch] text-chalk-soft">
            No contract is deployed and no season has been played. The rules
            above are the design; the balance simulation that has to clear before
            any of it ships is written and running, over ten seasons and five
            hundred agents.
          </p>
          <p className="type-body mt-3 max-w-[64ch] text-chalk-soft">
            It has not cleared. The gate is that no single wallet ends a season
            holding more than 15% of the map, and one strategy beats it: buying
            unclaimed ground is not subject to the empire tax, so a well-funded
            wallet playing alone can take a large share of the map without ever
            fighting. That is being fixed before launch, and this page will say
            so when it is.
          </p>
          <p className="type-data mt-3 text-chalk-muted">
            The board on this page is the simulation&apos;s own output at tick{" "}
            {previewBoard.tick} of {TICKS_PER_SEASON} — {previewBoard.battles}{" "}
            battles fought, {previewBoard.neutralHexes} hexes still unclaimed.
          </p>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
