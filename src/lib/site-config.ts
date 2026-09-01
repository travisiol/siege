/*
 * The name lives here and nowhere else.
 *
 * On earlier projects the name leaked into components and every rename turned
 * into a grep-and-replace. Here the hero, the nav, the drawer, the OG image and
 * the metadata all read these three strings.
 */
export const siteConfig = {
  // Placeholder name — not final.
  name: "SIEGE",
  wordmark: "Siege",
  ticker: "$SIEGE",
  tagline: "Hold ground. Get paid every 8 hours.",
  description:
    "An onchain territory game. Guilds stake tokens on hexes, attack in turns, and the winner takes the treasury. Every battle resolves in integer arithmetic — no randomness anywhere.",
  seoDescription:
    "547 hexes, twelve guilds, one turn every eight hours. Hold a hex and it pays yield three times a day; take one and its whole treasury moves to you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://siege.example",
  x: process.env.NEXT_PUBLIC_SIEGE_X ?? null,
  discord: process.env.NEXT_PUBLIC_SIEGE_DISCORD ?? null,
} as const;

function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

/**
 * Chain surface. Nothing is deployed: while the address is missing, the whole
 * order interface stays in demonstration and the commit button is disabled. No
 * invented address or price can ship to production.
 */
export const chainConfig = {
  network: process.env.NEXT_PUBLIC_SIEGE_NETWORK ?? "Base Sepolia",
  battleAddress: envOrNull(
    process.env.NEXT_PUBLIC_SIEGE_BATTLE_ADDRESS,
  ) as `0x${string}` | null,
  isLive: process.env.NEXT_PUBLIC_SIEGE_LIVE === "true",
} as const;

/** True only when a contract actually exists at the other end. */
export const isLive = chainConfig.isLive && chainConfig.battleAddress !== null;
