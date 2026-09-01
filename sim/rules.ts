// Les formules du brief, isolees pour etre transposables ligne a ligne en Solidity.
// Tout est en entiers. Toute modification ici doit etre repercutee dans Battle.sol.

import { sqrtWad, min } from "./fixed.ts";

/** puissance_brute = somme des racines des mises (PAS racine de la somme). */
export function rawPower(stakes: bigint[]): bigint {
  let acc = 0n;
  for (const s of stakes) acc += sqrtWad(s);
  return acc;
}

/** cohesion = 100 + 2*min(membres_actifs, 25)  ->  100..150 */
export function cohesion(activeMembers: number): bigint {
  return 100n + 2n * BigInt(Math.min(activeMembers, 25));
}

/** fortification = 100 + 5*min(tick - heldSinceTick, 20)  ->  100..200 */
export function fortification(currentTick: number, heldSinceTick: number): bigint {
  const held = Math.max(0, currentTick - heldSinceTick);
  return 100n + 5n * BigInt(Math.min(held, 20));
}

export type AttackInput = {
  stakes: bigint[];
  activeMembers: number;
  guildHexCount: number;
  tick: number;
};

/** A = puissance_brute * cohesion / 100, +25% si guilde <3 hexes et tick > 32. */
export function attackPower(a: AttackInput): bigint {
  let A = (rawPower(a.stakes) * cohesion(a.activeMembers)) / 100n;
  if (a.guildHexCount < 3 && a.tick > 32) A = (A * 125n) / 100n;
  return A;
}

export type DefenseInput = {
  stakes: bigint[];
  activeMembers: number;
  tick: number;
  heldSinceTick: number;
  /** Un hex non defendu depuis 30 ticks perd sa fortification (retombe a 100). */
  fortificationLapsed: boolean;
};

/** D = puissance_brute * cohesion / 100 * fortification / 100 */
export function defensePower(d: DefenseInput): bigint {
  const base = (rawPower(d.stakes) * cohesion(d.activeMembers)) / 100n;
  const fort = d.fortificationLapsed ? 100n : fortification(d.tick, d.heldSinceTick);
  return (base * fort) / 100n;
}

/** cout = mise * (100 + hexCount^2) / 100. Le surcout est brule. */
export function attackCost(stake: bigint, guildHexCount: number): bigint {
  const h = BigInt(guildHexCount);
  return (stake * (100n + h * h)) / 100n;
}

export function empireTaxMultiplierX100(guildHexCount: number): bigint {
  const h = BigInt(guildHexCount);
  return 100n + h * h;
}

/** Resolution: l'attaquant l'emporte strictement. */
export function attackerWins(A: bigint, D: bigint): boolean {
  return A > D;
}

export const PENALTY_BPS = { toWinner: 10n, burned: 10n }; // 10% + 10% = 20%
export const UPKEEP_PCT = 2n;
export const NO_DEFENSE_LAPSE_TICKS = 30;
export const REFUGE_MOVE_COOLDOWN = 21;
export const TICKS_PER_SEASON = 126;
export const REBELLION_TICK = 32;

/** Cout de claim d'un hex neutre adjacent: tier * 100 $SIEGE. */
export function claimCost(tier: number, wad: bigint): bigint {
  return BigInt(tier) * 100n * wad;
}

export { min };
