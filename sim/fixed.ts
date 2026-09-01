// Arithmetique entiere, precision 1e18. Aucun float ne touche jamais la regle de jeu.
// Ce fichier est la reference que Battle.sol devra reproduire au wei pres en M1.

export const WAD = 1_000_000_000_000_000_000n;

/**
 * floor(sqrt(x)) par methode de Babylone.
 * Le seed est la puissance de 2 immediatement au-dessus de sqrt(x), ce qui garantit
 * une convergence par le haut (invariant requis pour que la boucle rende bien le floor).
 * Solidity devra utiliser exactement cette formulation.
 */
export function isqrt(x: bigint): bigint {
  if (x < 0n) throw new Error("isqrt: negatif");
  if (x === 0n) return 0n;
  const bits = BigInt(x.toString(2).length);
  let z = 1n << ((bits + 1n) >> 1n); // seed >= sqrt(x): on converge par le haut
  let y = (x / z + z) >> 1n;
  while (y < z) {
    z = y;
    y = (x / y + y) >> 1n;
  }
  return z;
}

/** sqrt d'un montant WAD, resultat WAD: sqrt(x/1e18)*1e18 == sqrt(x*1e18). */
export function sqrtWad(x: bigint): bigint {
  return isqrt(x * WAD);
}

/** Multiplication/division entiere, troncature vers zero (identique a Solidity). */
export function mulDiv(a: bigint, b: bigint, d: bigint): bigint {
  return (a * b) / d;
}

export function pct(a: bigint, p: bigint): bigint {
  return (a * p) / 100n;
}

export function min(a: bigint, b: bigint): bigint {
  return a < b ? a : b;
}

export function max(a: bigint, b: bigint): bigint {
  return a > b ? a : b;
}

/** Formatage lisible d'un montant WAD. */
export function fmt(x: bigint, decimals = 2): string {
  const neg = x < 0n;
  const v = neg ? -x : x;
  const whole = v / WAD;
  const frac = ((v % WAD) * 10n ** BigInt(decimals)) / WAD;
  const s = `${whole.toString()}.${frac.toString().padStart(decimals, "0")}`;
  return neg ? `-${s}` : s;
}

export function tokens(n: number): bigint {
  return BigInt(Math.round(n * 1e6)) * (WAD / 1_000_000n);
}
