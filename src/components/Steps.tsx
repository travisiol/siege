import { TIER_YIELD } from "@/lib/hexmap";
import { previewBoard } from "@/lib/preview-board";
import { money } from "@/lib/economics";
import { siteConfig } from "@/lib/site-config";

/*
 * The ten-second explanation.
 *
 * A visitor arrives asking three things in this order: what do I get, how do I
 * get it, and what do I actually have to do. Prose answers all three eventually;
 * three numbered beats answer them at a glance — and the figures are the real
 * ones, so the strip doubles as the price list.
 *
 * It replaces the paragraph and the stat pills that used to sit here. Both said
 * the same thing, slower.
 */

const tier1Day = TIER_YIELD[1] * previewBoard.yieldUnit * previewBoard.ticksPerDay;
const tier3Day = TIER_YIELD[3] * previewBoard.yieldUnit * previewBoard.ticksPerDay;

const STEPS = [
  {
    n: "1",
    title: "Take a hex",
    figure: "100",
    unit: `${siteConfig.ticker} and up`,
    body: `${previewBoard.neutralHexes} are still unclaimed. Free ground next to yours is bought outright — no battle. The price climbs the more you hold.`,
  },
  {
    n: "2",
    title: "Hold it",
    figure: "1",
    unit: "order every 8h",
    body: "Stake to defend. The longer you hold, the harder you are to shift — defence doubles after twenty turns.",
  },
  {
    n: "3",
    title: "Get paid",
    figure: `${money(tier1Day)}–${money(tier3Day)}`,
    unit: `${siteConfig.ticker} a day`,
    body: `Paid three times a day, plus a cut of the fixed ${money(previewBoard.seasonPool)} pool at season end.`,
  },
];

export function Steps({ className }: { className?: string }) {
  return (
    <ol className={className}>
      {STEPS.map((step) => (
        <li
          key={step.n}
          className="flex gap-3 border-b border-rule/60 py-2.5 last:border-0"
        >
          <span className="type-figure-sm mt-0.5 w-4 shrink-0 text-ember">{step.n}</span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="type-figure-sm text-chalk">{step.title}</span>
              <span className="flex items-baseline gap-1.5">
                <span className="type-figure-sm text-ember">{step.figure}</span>
                <span className="type-label text-chalk-muted">{step.unit}</span>
              </span>
            </div>
            <p className="type-data mt-1 text-chalk-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
