"use client";

import { keccak256, encodeAbiParameters, parseAbiParameters, type Address } from "viem";

/*
 * Salt custody, and why it works this way.
 *
 * A commit is a hash over (hexId, amount, isAttack, salt, player). Seven hours
 * later the player has to produce all five again or the order dies. If the salt
 * were a random number in localStorage, clearing site data on the wrong evening
 * would cost somebody their whole position.
 *
 * So the salt is not random. It is derived:
 *
 *     seed = keccak256(signature over a fixed per-season message)
 *     salt = keccak256(seed, tick, hexId, nonce)
 *
 * The seed is cached locally for convenience, but it is never the only copy:
 * signing the same message again reproduces it, because wallets sign
 * deterministically. Losing your browser costs you a signature prompt.
 *
 * The order details are cached too, and if that cache is lost the player can
 * simply re-enter the hex, amount and side — the salt is rederivable, so the
 * reveal still goes through. And because the contract debits the stake at reveal
 * rather than at commit, the worst case for a wallet that can recover nothing at
 * all is the bond, not the stake.
 */

const SEED_KEY = (account: Address, season: number) =>
  `hexwar:seed:${account.toLowerCase()}:${season}`;
const ORDERS_KEY = (account: Address) => `hexwar:orders:${account.toLowerCase()}`;

/** The message a wallet signs once per season to derive its salts. */
export function seedMessage(season: number): string {
  return [
    "HEXWAR order salt",
    `Season: ${season}`,
    "",
    "Signing this derives the secret that seals your orders.",
    "It moves no funds and grants no approval.",
    "Sign the same message again on any device to recover it.",
  ].join("\n");
}

function readCache(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Private windows and blocked site data throw rather than return null.
    return null;
  }
}

function writeCache(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // A failed cache write is survivable: the seed is re-derivable by signing.
  }
}

export function cachedSeed(account: Address, season: number): `0x${string}` | null {
  const v = readCache(SEED_KEY(account, season));
  return v && v.startsWith("0x") ? (v as `0x${string}`) : null;
}

export function cacheSeed(account: Address, season: number, seed: `0x${string}`): void {
  writeCache(SEED_KEY(account, season), seed);
}

/** seed = keccak256(signature). One signature covers a whole season. */
export function seedFromSignature(signature: `0x${string}`): `0x${string}` {
  return keccak256(signature);
}

/** salt = keccak256(seed, tick, hexId, nonce) — deterministic, so recoverable. */
export function deriveSalt(
  seed: `0x${string}`,
  tick: number,
  hexId: number,
  nonce = 0,
): `0x${string}` {
  return keccak256(
    encodeAbiParameters(parseAbiParameters("bytes32, uint32, uint16, uint32"), [
      seed,
      tick,
      hexId,
      nonce,
    ]),
  );
}

/** The commitment the contract stores. Must match Battle.reveal exactly. */
export function commitmentHash(
  hexId: number,
  amount: bigint,
  isAttack: boolean,
  salt: `0x${string}`,
  player: Address,
): `0x${string}` {
  return keccak256(
    encodeAbiParameters(parseAbiParameters("uint16, uint128, bool, bytes32, address"), [
      hexId,
      amount,
      isAttack,
      salt,
      player,
    ]),
  );
}

// ---------------------------------------------------------------- local orders

export type PendingOrder = {
  tick: number;
  hexId: number;
  /** Stored as a decimal string: JSON has no bigint. */
  amount: string;
  isAttack: boolean;
  nonce: number;
  commitment: `0x${string}`;
  revealed: boolean;
};

export function loadOrders(account: Address): PendingOrder[] {
  const raw = readCache(ORDERS_KEY(account));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as PendingOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrder(account: Address, order: PendingOrder): void {
  const all = loadOrders(account).filter((o) => o.commitment !== order.commitment);
  all.push(order);
  // A season is 126 ticks; keeping the last few is enough to reveal and audit.
  const trimmed = all.slice(-40);
  writeCache(ORDERS_KEY(account), JSON.stringify(trimmed));
}

export function markRevealed(account: Address, commitment: `0x${string}`): void {
  const all = loadOrders(account).map((o) =>
    o.commitment === commitment ? { ...o, revealed: true } : o,
  );
  writeCache(ORDERS_KEY(account), JSON.stringify(all));
}

/** Orders committed this tick that still need opening. */
export function pendingForTick(account: Address, tick: number): PendingOrder[] {
  return loadOrders(account).filter((o) => o.tick === tick && !o.revealed);
}

/** The next free nonce for a hex in a tick, so two orders never collide. */
export function nextNonce(account: Address, tick: number, hexId: number): number {
  const used = loadOrders(account)
    .filter((o) => o.tick === tick && o.hexId === hexId)
    .map((o) => o.nonce);
  let n = 0;
  while (used.includes(n)) n++;
  return n;
}
