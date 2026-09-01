// Emit the real 547-hex board as deploy data.
//
// The map the contract is seeded with is the same one the balance simulation
// played and the same one the site draws — one generator, three consumers, so
// hex 165 means the same cell everywhere.
//
//   node sim/export-seed.ts

import { writeFileSync } from "node:fs";
import { buildMap, tierCounts } from "./hex.ts";
import { BASE } from "./config.ts";

const map = buildMap(BASE.radius);
const seed = {
  radius: BASE.radius,
  count: map.cells.length,
  q: map.cells.map((c) => c.q),
  r: map.cells.map((c) => c.r),
  tier: map.cells.map((c) => c.tier),
};

writeFileSync(
  new URL("../contracts/seed/hexes.json", import.meta.url),
  JSON.stringify(seed, null, 1),
);

const tc = tierCounts(map);
console.log(`seed written  ${seed.count} hexes (radius ${seed.radius})`);
console.log(`  t1=${tc[1]}  t2=${tc[2]}  t3=${tc[3]}`);
