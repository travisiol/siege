/*
 * La carte, côté navigateur.
 *
 * Même algorithme que `sim/hex.ts` — mêmes coordonnées axiales, même ordre
 * canonique, même placement déterministe des tiers — mais en `number` plutôt
 * qu'en `bigint`, parce qu'ici on dessine, on ne résout pas. Les identifiants
 * d'hex se correspondent d'un fichier à l'autre : c'est ce qui permet au
 * plateau exporté par la simulation de s'appliquer tel quel sur cette carte.
 */

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

const key = (q: number, r: number) => `${q},${r}`;

/** Hash entier déterministe : étale les tiers sans jamais tirer au sort. */
function spread(q: number, r: number, salt: number): number {
  let h = (q * 73856093) ^ (r * 19349663) ^ (salt * 83492791);
  h = Math.imul(h ^ (h >>> 15), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

export function buildMap(radius: number): HexCell[] {
  const raw: Axial[] = [];
  for (let q = -radius; q <= radius; q++) {
    const rLo = Math.max(-radius, -q - radius);
    const rHi = Math.min(radius, -q + radius);
    for (let r = rLo; r <= rHi; r++) raw.push({ q, r });
  }

  raw.sort((a, b) => {
    const da = axialDistance(a, { q: 0, r: 0 });
    const db = axialDistance(b, { q: 0, r: 0 });
    return da - db || a.q - b.q || a.r - b.r;
  });

  const byKey = new Map<string, number>();
  raw.forEach((c, i) => byKey.set(key(c.q, c.r), i));

  const cells: HexCell[] = raw.map((c, i) => {
    const neighbors: number[] = [];
    for (const d of DIRECTIONS) {
      const n = byKey.get(key(c.q + d.q, c.r + d.r));
      if (n !== undefined) neighbors.push(n);
    }
    return {
      id: i,
      q: c.q,
      r: c.r,
      ring: axialDistance(c, { q: 0, r: 0 }),
      tier: 1,
      neighbors,
      isBorder: axialDistance(c, { q: 0, r: 0 }) === radius,
    };
  });

  assignTiers(cells);
  return cells;
}

/** ~70 % tier 1, 25 % tier 2, 5 % tier 3, deux tier 3 jamais adjacents. */
function assignTiers(cells: HexCell[]): void {
  const n = cells.length;
  const n3 = Math.round(n * 0.05);
  const n2 = Math.round(n * 0.25);

  const t3 = [...cells].sort(
    (a, b) => spread(a.q, a.r, 3) - spread(b.q, b.r, 3) || a.id - b.id,
  );
  const picked = new Set<number>();
  for (const c of t3) {
    if (picked.size >= n3) break;
    if (c.neighbors.some((nb) => picked.has(nb))) continue;
    picked.add(c.id);
  }
  for (const id of picked) cells[id].tier = 3;

  const t2 = cells
    .filter((c) => c.tier === 1)
    .sort((a, b) => spread(a.q, a.r, 2) - spread(b.q, b.r, 2) || a.id - b.id);
  for (let i = 0; i < Math.min(n2, t2.length); i++) t2[i].tier = 2;
}

/** Rendement par tier : 1x / 3x / 8x. */
export const TIER_YIELD: Record<number, number> = { 1: 1, 2: 3, 3: 8 };

/** Centre d'un hex en pixels, orientation pointy-top. */
export function hexCenter(c: Axial, size: number): { x: number; y: number } {
  return {
    x: size * Math.sqrt(3) * (c.q + c.r / 2),
    y: size * 1.5 * c.r,
  };
}

/** Pixel -> axial, arrondi cubique. L'inverse exact de `hexCenter`. */
export function pixelToAxial(x: number, y: number, size: number): Axial {
  const r = (2 / 3) * (y / size);
  const q = x / (size * Math.sqrt(3)) - r / 2;

  // Arrondi en coordonnées cubiques: on corrige l'axe qui a le plus dérivé.
  const s = -q - r;
  let rq = Math.round(q);
  let rr = Math.round(r);
  const rs = Math.round(s);
  const dq = Math.abs(rq - q);
  const dr = Math.abs(rr - r);
  const ds = Math.abs(rs - s);
  if (dq > dr && dq > ds) rq = -rr - rs;
  else if (dr > ds) rr = -rq - rs;
  return { q: rq, r: rr };
}
