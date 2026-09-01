/*
 * Les douze guildes et leur couleur.
 *
 * La teinte est fonctionnelle, pas décorative: sur 547 hexagones identiques,
 * c'est la seule chose qui dise à qui appartient quoi. Elles sont donc tenues
 * hors de la bande orange, réservée à la braise (tier 3 et engagement).
 */

export type GuildSkin = { id: number; name: string; color: string };

export const GUILD_SKINS: GuildSkin[] = [
  { id: 1, name: "Meridian", color: "#4c8df6" },
  { id: 2, name: "Verdigris", color: "#1fc7a9" },
  { id: 3, name: "Nocturne", color: "#a271f2" },
  { id: 4, name: "Bastion", color: "#e0b33c" },
  { id: 5, name: "Thicket", color: "#48b558" },
  { id: 6, name: "Cinder Rose", color: "#ec6aa8" },
  { id: 7, name: "Halcyon", color: "#57cbe8" },
  { id: 8, name: "Wormwood", color: "#b9cf46" },
  { id: 9, name: "Cobalt Vow", color: "#7c86ea" },
  { id: 10, name: "Redoubt", color: "#e8556b" },
  { id: 11, name: "Tidewall", color: "#5aa79f" },
  { id: 12, name: "Amaranth", color: "#c070c8" },
];

export const NEUTRAL_COLOR = "#39404a";

export function guildSkin(id: number): GuildSkin | null {
  if (id <= 0) return null;
  return GUILD_SKINS[(id - 1) % GUILD_SKINS.length] ?? null;
}

export function guildColor(id: number): string {
  return guildSkin(id)?.color ?? NEUTRAL_COLOR;
}

export function guildName(id: number): string {
  return guildSkin(id)?.name ?? "Neutre";
}
