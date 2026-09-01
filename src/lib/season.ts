/*
 * Le rythme du jeu.
 *
 * Un tick dure 8 h et se découpe en trois: 7 h de commit où les montants
 * restent scellés, 45 min de reveal obligatoire, 15 min de résolution où
 * toutes les batailles tombent d'un bloc. 126 ticks font une saison de six
 * semaines.
 *
 * Aucun contrat n'est déployé, donc rien de tout cela ne tourne pour de vrai.
 * L'horloge du site démontre la cadence à partir d'une ancre fixe, et chaque
 * surface qui l'affiche le dit.
 */

export const TICK_SECONDS = 8 * 60 * 60;
export const TICKS_PER_SEASON = 126;

export type PhaseName = "commit" | "reveal" | "resolution";

export const PHASES: { name: PhaseName; label: string; seconds: number; blurb: string }[] = [
  {
    name: "commit",
    label: "Commit",
    seconds: 7 * 60 * 60,
    blurb: "On dépose un hash. Le montant reste secret.",
  },
  {
    name: "reveal",
    label: "Reveal",
    seconds: 45 * 60,
    blurb: "Révélation obligatoire. Un reveal manqué coûte la mise.",
  },
  {
    name: "resolution",
    label: "Résolution",
    seconds: 15 * 60,
    blurb: "Toutes les batailles se résolvent d'un seul bloc.",
  },
];

/** Ancre de démonstration. Fixe, pour que la cadence soit reproductible. */
const ANCHOR = Date.parse(
  process.env.NEXT_PUBLIC_SIEGE_SEASON_START ?? "2026-08-24T00:00:00Z",
);

export type TickState = {
  tick: number;
  phase: PhaseName;
  phaseLabel: string;
  /** Secondes restantes dans la phase courante. */
  remaining: number;
  /** Avancement de la phase, 0..1. */
  phaseProgress: number;
  /** Avancement du tick entier, 0..1. */
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

  // Inatteignable: les trois phases totalisent exactement TICK_SECONDS.
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

/** hh:mm:ss, tronqué à mm:ss sous une heure. */
export function formatCountdown(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}
