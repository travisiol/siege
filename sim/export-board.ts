// Exporte un état de saison réel vers le site.
//
// Le plateau affiché sur siege n'est pas une donnée inventée: c'est la sortie
// de la simulation M0, arrêtée en milieu de saison. Les identifiants d'hex de
// `sim/hex.ts` et de `src/lib/hexmap.ts` se correspondent, donc les tableaux
// exportés s'appliquent tels quels sur la carte du navigateur.
//
//   node sim/export-board.ts

import { writeFileSync } from "node:fs";
import { BASE } from "./config.ts";
import { runSeason } from "./season.ts";
import { WAD } from "./fixed.ts";

const STOP_AT = 18; // carte disputee: frontieres nettes, du neutre encore a prendre

const cfg = { ...BASE, ticksPerSeason: STOP_AT };
const w = runSeason(cfg, BASE.seed);

const owners = w.hexes.map((h) => h.owner);
const tiers = w.hexes.map((h) => h.tier);
const refuges = w.hexes.filter((h) => h.isRefuge).map((h) => h.id);
// Trésor arrondi au token: le site n'affiche pas les décimales.
const treasury = w.hexes.map((h) => Number(h.treasury / WAD));
const heldSince = w.hexes.map((h) => h.heldSinceTick);

const guilds = w.guilds
  .map((g) => ({
    id: g.id,
    hexes: g.hexes.size,
    claimed: g.claimed,
    conquests: g.conquests,
    losses: g.losses,
    members: g.members.filter((m) => w.agents[m].alive).length,
  }))
  .sort((a, b) => b.hexes - a.hexes);

const neutral = owners.filter((o) => o === 0).length;

const file = `/*
 * GÉNÉRÉ — ne pas éditer à la main. Régénérer avec \`npm run sim:board\`.
 *
 * Un vrai état de saison, sorti de la simulation M0 au tick ${STOP_AT} sur ${cfg.ticksPerSeason * 0 + BASE.ticksPerSeason}.
 * Aucun contrat n'existe: ce plateau est une démonstration, pas une lecture
 * de chaîne, et le site le dit partout où il l'affiche.
 */

export type PreviewGuild = {
  id: number;
  hexes: number;
  claimed: number;
  conquests: number;
  losses: number;
  members: number;
};

export const previewBoard = {
  radius: ${cfg.radius},
  tick: ${STOP_AT},
  ticksPerSeason: ${BASE.ticksPerSeason},
  totalHexes: ${owners.length},
  neutralHexes: ${neutral},
  battles: ${w.stats.battles},
  conquests: ${w.stats.conquests},
  /** 0 = neutre, sinon l'identifiant de la guilde qui tient l'hex. */
  owners: ${JSON.stringify(owners)} as number[],
  tiers: ${JSON.stringify(tiers)} as number[],
  refuges: ${JSON.stringify(refuges)} as number[],
  treasury: ${JSON.stringify(treasury)} as number[],
  heldSince: ${JSON.stringify(heldSince)} as number[],
  guilds: ${JSON.stringify(guilds, null, 2).replace(/\n/g, "\n  ")} as PreviewGuild[],
} as const;
`;

writeFileSync(new URL("../src/lib/preview-board.ts", import.meta.url), file);

console.log(`plateau exporté  tick ${STOP_AT}/${BASE.ticksPerSeason}`);
console.log(`  hexes            ${owners.length}`);
console.log(`  neutres          ${neutral} (${((100 * neutral) / owners.length).toFixed(1)}%)`);
console.log(`  guildes en jeu   ${guilds.filter((g) => g.hexes > 0).length}`);
console.log(`  plus grosse      ${guilds[0].hexes} hexes`);
console.log(`  batailles        ${w.stats.battles}`);
