import { tokens } from "./fixed.ts";

export type Archetype = "passive" | "medium" | "whale";

export type Config = {
  radius: number;
  guilds: number;
  ticksPerSeason: number;
  counts: Record<Archetype, number>;
  capital: Record<Archetype, bigint>;
  /** Participation: proba qu'un agent agisse a un tick donne. */
  participation: Record<Archetype, number>;
  /** Part du budget orientee attaque (le reste va en defense). */
  aggression: Record<Archetype, number>;
  /** Fraction du solde engagee par tick, en pour-mille. */
  budgetPerMille: Record<Archetype, number>;
  /** Proba de rater son reveal (perte seche de 10%). */
  missReveal: Record<Archetype, number>;
  /** Hasard d'abandon de base par tick. */
  quitHazard: Record<Archetype, number>;
  /** Nombre de wallets par whale. 1 = pas de Sybil. */
  sybilSplit: number;
  /**
   * Comment se minte la position ERC-1155.
   *  accumulate    : chaque mise de defense consolide la part (dilue les gros porteurs)
   *  conquest-only : seule la prise/le claim mintent (lecture favorable aux whales)
   * Le brief ne tranche pas; le gate M0 y est tres sensible.
   */
  positionModel: "accumulate" | "conquest-only";
  /**
   * Nombre de whales qui montent leur PROPRE guilde solo. Le brief ne dit rien du
   * nombre de guildes ni d'une taille minimale: rien n'interdit la guilde a un membre.
   */
  soloWhaleGuilds: number;
  /** Claims qu'un meme wallet peut placer dans un tick. Rien dans le brief ne le limite. */
  maxClaimsPerTick: number;
  /**
   * CORRECTIF. Le brief n'applique la taxe d'empire qu'a l'attaque, ce qui laisse
   * l'expansion sur les hexes neutres entierement gratuite quelle que soit la
   * taille de la guilde -- le trou par lequel un wallet solo prend 40% de la
   * carte sans livrer bataille. A vrai, le claim subit la meme courbe que
   * l'attaque: grandir coute cher, peu importe comment on grandit.
   */
  taxClaims: boolean;
  /** Cagnotte de saison pre-financee et fixe. */
  seasonPool: bigint;
  /** Unite de rendement par tick et par point de tier. */
  yieldUnit: bigint;
  /** Au-dela de ce multiplicateur de taxe d'empire, les agents cessent d'attaquer. */
  empireTaxStopX100: bigint;
  seed: number;
};

export const BASE: Config = {
  radius: 13,
  guilds: 12,
  ticksPerSeason: 126,
  counts: { passive: 200, medium: 250, whale: 50 },
  capital: { passive: tokens(1000), medium: tokens(3000), whale: tokens(100000) },
  participation: { passive: 0.12, medium: 0.5, whale: 0.9 },
  aggression: { passive: 0.15, medium: 0.45, whale: 0.7 },
  budgetPerMille: { passive: 25, medium: 55, whale: 80 },
  missReveal: { passive: 0.04, medium: 0.012, whale: 0.002 },
  quitHazard: { passive: 0.006, medium: 0.0025, whale: 0.0002 },
  sybilSplit: 1,
  positionModel: "accumulate",
  soloWhaleGuilds: 0,
  maxClaimsPerTick: 3,
  taxClaims: true,
  seasonPool: tokens(2_000_000),
  yieldUnit: tokens(5),
  empireTaxStopX100: 900n,
  seed: 0x51E6E,
};

