/*
 * The rhythm of the game.
 *
 * A tick lasts 8h and splits three ways: 7h of commit where amounts stay
 * sealed, 45min of mandatory reveal, 15min of resolution where every battle
 * lands at once. 126 ticks make a six-week season.
 *
 * No contract is deployed, so none of this runs for real. The clock on the
 * site demonstrates the cadence from a fixed anchor, and every surface showing
 * it says so.
 */

export const TICK_SECONDS = 8 * 60 * 60;
export const TICKS_PER_SEASON = 126;

export type PhaseName = "commit" | "reveal" | "resolution";

export const PHASES: { name: PhaseName; label: string; seconds: number; blurb: string }[] = [
  {
    name: "commit",
    label: "Commit",
    seconds: 7 * 60 * 60,
    blurb: "You post a hash. The amount stays secret.",
  },
  {
    name: "reveal",
    label: "Reveal",
    seconds: 45 * 60,
    blurb: "Mandatory reveal. Miss it and the stake is forfeit.",
  },
  {
    name: "resolution",
    label: "Resolution",
    seconds: 15 * 60,
    blurb: "Every battle on the map resolves at once.",
  },
];

/** Demonstration anchor. Fixed, so the cadence is reproducible. */
const ANCHOR = Date.parse(
  process.env.NEXT_PUBLIC_HEXWAR_SEASON_START ?? "2026-08-24T00:00:00Z",
);

export type TickState = {
  tick: number;
  phase: PhaseName;
  phaseLabel: string;
  /** Seconds left in the current phase. */
  remaining: number;
  /** Phase progress, 0..1. */
  phaseProgress: number;
  /** Whole-tick progress, 0..1. */
  tickProgress: number;
};

export function tickStateAt(now: number): TickState {
  const elapsed = Math.max(0, Math.floor((now - ANCHOR) / 1000));
  const intoTick = elapsed % TICK_SECONDS;
  const tick = (Math.floor(elapsed / TICK_SECONDS) % TICKS_PER_SEASON) + 1;

  let acc = 0;
  for (const phase of PHASES) {
    if (intoTick < acc + phase.seconds) {
      const into = intoTick - acc;
      return {
        tick,
        phase: phase.name,
        phaseLabel: phase.label,
        remaining: phase.seconds - into,
        phaseProgress: into / phase.seconds,
        tickProgress: intoTick / TICK_SECONDS,
      };
    }
    acc += phase.seconds;
  }

  // Unreachable: the three phases total exactly TICK_SECONDS.
  const last = PHASES[PHASES.length - 1];
  return {
    tick,
    phase: last.name,
    phaseLabel: last.label,
    remaining: 0,
    phaseProgress: 1,
    tickProgress: 1,
  };
}

/** hh:mm:ss, trimmed to mm:ss under an hour. */
export function formatCountdown(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}
