import { isqrt, sqrtWad, WAD, tokens, fmt } from "./fixed.ts";
import {
  cohesion, fortification, attackCost, empireTaxMultiplierX100,
  rawPower, attackPower, defensePower, attackerWins,
} from "./rules.ts";
import { buildMap, tierCounts } from "./hex.ts";

let fails = 0;
function ok(cond: boolean, label: string, detail = "") {
  if (!cond) { fails++; console.log(`  ECHEC  ${label} ${detail}`); }
  else console.log(`  ok     ${label} ${detail}`);
}

console.log("\n1. Racine entiere (methode de Babylone)");
for (const x of [0n, 1n, 2n, 3n, 4n, 99n, 100n, 10n ** 18n, 10n ** 36n, 123456789012345678901234567890n]) {
  const r = isqrt(x);
  ok(r * r <= x && (r + 1n) * (r + 1n) > x, `isqrt(${x})`, `= ${r}`);
}
ok(sqrtWad(tokens(100)) === tokens(10), "sqrt(100 tokens) = 10 tokens", fmt(sqrtWad(tokens(100))));
ok(sqrtWad(tokens(10000)) === tokens(100), "sqrt(10000) = 100", fmt(sqrtWad(tokens(10000))));

console.log("\n2. Bornes de cohesion (100..150)");
ok(cohesion(0) === 100n, "0 membre actif -> 100");
ok(cohesion(25) === 150n, "25 membres -> 150");
ok(cohesion(999) === 150n, "plafonne a 150");

console.log("\n3. Bornes de fortification (100..200)");
ok(fortification(10, 10) === 100n, "hex fraichement pris -> 100");
ok(fortification(30, 10) === 200n, "20 ticks tenus -> 200");
ok(fortification(200, 10) === 200n, "plafonne a 200");

console.log("\n4. Taxe d'empire -- les 3 exemples du brief");
ok(empireTaxMultiplierX100(10) === 200n, "10 hexes -> x2", String(empireTaxMultiplierX100(10)));
ok(empireTaxMultiplierX100(20) === 500n, "20 hexes -> x5", String(empireTaxMultiplierX100(20)));
ok(empireTaxMultiplierX100(30) === 1000n, "30 hexes -> x10", String(empireTaxMultiplierX100(30)));
ok(attackCost(tokens(100), 10) === tokens(200), "cout(100 @10 hexes) = 200");

console.log("\n5. La racine est bien SOMME des racines, pas racine de la somme");
const split4 = rawPower([tokens(250), tokens(250), tokens(250), tokens(250)]);
const single = rawPower([tokens(1000)]);
ok(split4 > single, "4 wallets battent 1 wallet a capital egal",
  `${fmt(split4)} vs ${fmt(single)}  (x${(Number(split4) / Number(single)).toFixed(2)})`);
const split100 = rawPower(Array(100).fill(tokens(10)));
ok(split100 > single, "100 wallets a capital egal",
  `${fmt(split100)} vs ${fmt(single)}  (x${(Number(split100) / Number(single)).toFixed(2)})`);

console.log("\n6. Resolution: A > D strictement");
const eq = { stakes: [tokens(100)], activeMembers: 0, tick: 40, heldSinceTick: 40, fortificationLapsed: false };
const D = defensePower(eq);
const A = attackPower({ stakes: [tokens(100)], activeMembers: 0, guildHexCount: 5, tick: 40 });
ok(A === D, "puissances egales", `${fmt(A)} = ${fmt(D)}`);
ok(!attackerWins(A, D), "egalite -> le defenseur tient");

console.log("\n7. Buff rebellion (<3 hexes et tick > 32)");
const noBuff = attackPower({ stakes: [tokens(100)], activeMembers: 0, guildHexCount: 2, tick: 32 });
const buff = attackPower({ stakes: [tokens(100)], activeMembers: 0, guildHexCount: 2, tick: 33 });
ok((noBuff * 125n) / 100n === buff, "+25% a partir du tick 33", `${fmt(noBuff)} -> ${fmt(buff)}`);

console.log("\n8. Carte");
const map = buildMap(13);
ok(map.cells.length === 547, "rayon 13 -> 547 hexes (le brief en annonce 512)", String(map.cells.length));
const tc = tierCounts(map);
ok(Math.abs((100 * tc[3]) / map.cells.length - 5) < 1, "tier 3 ~5%", `${tc[3]} hexes`);
ok(Math.abs((100 * tc[2]) / map.cells.length - 25) < 1, "tier 2 ~25%", `${tc[2]} hexes`);
let adjacentT3 = 0;
for (const c of map.cells) {
  if (c.tier !== 3) continue;
  for (const nb of c.neighbors) if (map.cells[nb].tier === 3) adjacentT3++;
}
ok(adjacentT3 === 0, "aucun tier 3 adjacent a un autre", `${adjacentT3} paires`);
const isolated = map.cells.filter((c) => c.neighbors.length < 3).length;
ok(isolated === 0, "aucun hex isole (connexite)", `${isolated}`);

console.log(`\n${fails === 0 ? "TOUT PASSE" : fails + " ECHEC(S)"}\n`);
process.exit(fails === 0 ? 0 : 1);
