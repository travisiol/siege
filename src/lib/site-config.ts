/*
 * Le nom vit ici et nulle part ailleurs.
 *
 * Sur les projets précédents le nom s'était infiltré dans les composants et
 * chaque renommage devenait un grep-and-replace. Ici le hero, la nav, le
 * drawer, l'OG et les métadonnées lisent tous ces trois chaînes.
 */
export const siteConfig = {
  // Nom provisoire — pas définitif.
  name: "SIEGE",
  wordmark: "Siege",
  ticker: "$SIEGE",
  tagline: "Take the map. Keep it.",
  description:
    "Un jeu de conquête territoriale onchain. Les guildes misent sur des hexagones, s'attaquent par tours, et la résolution est déterministe de bout en bout.",
  seoDescription:
    "547 hexagones, douze guildes, un tick toutes les huit heures. Aucun aléatoire: chaque bataille se résout en arithmétique entière.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://siege.example",
  x: process.env.NEXT_PUBLIC_SIEGE_X ?? null,
  discord: process.env.NEXT_PUBLIC_SIEGE_DISCORD ?? null,
} as const;

function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

/**
 * Surface chaîne. Rien n'est déployé: tant que l'adresse est absente, toute
 * l'interface d'ordre reste en démonstration et le bouton d'engagement est
 * désactivé. Aucune adresse ni aucun prix inventé ne peut partir en prod.
 */
export const chainConfig = {
  network: process.env.NEXT_PUBLIC_SIEGE_NETWORK ?? "Base Sepolia",
  battleAddress: envOrNull(
    process.env.NEXT_PUBLIC_SIEGE_BATTLE_ADDRESS,
  ) as `0x${string}` | null,
  isLive: process.env.NEXT_PUBLIC_SIEGE_LIVE === "true",
} as const;

/** Vrai seulement quand un contrat existe réellement à l'autre bout. */
export const isLive =
  chainConfig.isLive && chainConfig.battleAddress !== null;
