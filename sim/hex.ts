// Carte hexagonale en coordonnees axiales (q, r).
//
// NOTE SPEC: le brief demande "512 hexagones, disque de rayon 13". Les deux sont
// incompatibles: un disque hexagonal de rayon R contient 3R^2+3R+1 hexes, soit 547
// pour R=13 et 469 pour R=12. Aucun rayon ne donne 512. On genere donc le disque
// complet (parametre RADIUS) et on documente l'ecart; voir README, section "Conflits de spec".

export type Axial = { q: number; r: number };

export const DIRECTIONS: Axial[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

export function axialDistance(a: Axial, b: Axial): number {
  const dq = a.q - b.q;
  const dr = a.r - b.r;
  return (Math.abs(dq) + Math.abs(dq + dr) + Math.abs(dr)) / 2;
}

export type HexCell = {
  id: number;
  q: number;
  r: number;
  ring: number;
  tier: 1 | 2 | 3;
  neighbors: number[];
  isBorder: boolean;
};

export type MapSpec = {
  radius: number;
  cells: HexCell[];
  byKey: Map<string, number>;
};

const key = (q: number, r: number) => `${q},${r}`;

/** Hash entier deterministe: sert a etaler les tiers sans jamais utiliser d'aleatoire. */
function spread(q: number, r: number, salt: number): number {
  let h = (q * 73856093) ^ (r * 19349663) ^ (salt * 83492791);
  h = Math.imul(h ^ (h >>> 15), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

export function buildMap(radius: number): MapSpec {
  const raw: Axial[] = [];
  for (let q = -radius; q <= radius; q++) {
    const rLo = Math.max(-radius, -q - radius);
    const rHi = Math.min(radius, -q + radius);
    for (let r = rLo; r <= rHi; r++) raw.push({ q, r });
  }
  // Ordre canonique: anneau croissant, puis q, puis r. L'id 0 est le centre.
  raw.sort((a, b) => {
    const da = axialDistance(a, { q: 0, r: 0 });
    const db = axialDistance(b, { q: 0, r: 0 });
    return da - db || a.q - b.q || a.r - b.r;
  });

  const byKey = new Map<string, number>();
  raw.forEach((c, i) => byKey.set(key(c.q, c.r), i));

  const cells: HexCell[] = raw.map((c, i) => {
    const ring = axialDistance(c, { q: 0, r: 0 });
    const neighbors: number[] = [];
    for (const d of DIRECTIONS) {
      const n = byKey.get(key(c.q + d.q, c.r + d.r));
      if (n !== undefined) neighbors.push(n);
    }
    return { id: i, q: c.q, r: c.r, ring, tier: 1, neighbors, isBorder: ring === radius };
  });

  assignTiers(cells);
  return { radius, cells, byKey };
}

/**
 * ~70% tier 1, 25% tier 2, 5% tier 3, deux tier 3 jamais adjacents.
 * Placement deterministe: c'est la "table posee a la main" du brief, generee une fois.
 */
function assignTiers(cells: HexCell[]): void {
  const n = cells.length;
  const n3 = Math.round(n * 0.05);
  const n2 = Math.round(n * 0.25);

  const t3 = [...cells].sort((a, b) => spread(a.q, a.r, 3) - spread(b.q, b.r, 3) || a.id - b.id);
  const picked3 = new Set<number>();
  for (const c of t3) {
    if (picked3.size >= n3) break;
    if (c.neighbors.some((nb) => picked3.has(nb))) continue;
    picked3.add(c.id);
  }
  for (const id of picked3) cells[id].tier = 3;

  const t2 = cells
    .filter((c) => c.tier === 1)
    .sort((a, b) => spread(a.q, a.r, 2) - spread(b.q, b.r, 2) || a.id - b.id);
  for (let i = 0; i < Math.min(n2, t2.length); i++) t2[i].tier = 2;
}

/** Rendement par tier: 1x / 3x / 8x. */
export const TIER_YIELD: Record<number, bigint> = { 1: 1n, 2: 3n, 3: 8n };

export function tierCounts(map: MapSpec): Record<number, number> {
  const out: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
  for (const c of map.cells) out[c.tier]++;
  return out;
}
