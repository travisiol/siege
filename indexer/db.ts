/*
 * The indexer's store.
 *
 * SQLite through `node:sqlite`, which ships with Node — no native build, no
 * dependency, nothing to install. That matches the rest of the project: the
 * simulation has no dependencies either, and a backend nobody can run is a
 * backend nobody runs.
 *
 * Everything here is derived state. The chain is the source of truth; this file
 * only decides how to keep a fast answer to "what does the board look like right
 * now", so the site does not have to make a 547-call multicall on every load.
 * Deleting the database and resyncing from the deploy block must produce the
 * identical result, which is why nothing is ever written that cannot be replayed
 * from logs.
 */

import { DatabaseSync } from "node:sqlite";

export type BoardRow = {
  id: number;
  tier: number;
  owner: number;
  treasury: number;
  heldSince: number;
  isRefuge: number;
};

export function openDb(path: string): DatabaseSync {
  const db = new DatabaseSync(path);

  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA synchronous = NORMAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hexes (
      id         INTEGER PRIMARY KEY,
      q          INTEGER NOT NULL,
      r          INTEGER NOT NULL,
      tier       INTEGER NOT NULL,
      owner      INTEGER NOT NULL DEFAULT 0,
      treasury   TEXT    NOT NULL DEFAULT '0',
      heldSince  INTEGER NOT NULL DEFAULT 0,
      isRefuge   INTEGER NOT NULL DEFAULT 0,
      epoch      INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS guilds (
      id       INTEGER PRIMARY KEY,
      treasury TEXT NOT NULL,
      members  INTEGER NOT NULL DEFAULT 0,
      claimed  INTEGER NOT NULL DEFAULT 0,
      captures INTEGER NOT NULL DEFAULT 0,
      losses   INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS members (
      account TEXT PRIMARY KEY,
      guildId INTEGER NOT NULL
    );

    -- One row per (hex, epoch, wallet). The epoch is what expires a position
    -- when a hex changes hands, so old rows stay as history without polluting
    -- the current holder count.
    CREATE TABLE IF NOT EXISTS positions (
      hexId   INTEGER NOT NULL,
      epoch   INTEGER NOT NULL,
      account TEXT    NOT NULL,
      amount  TEXT    NOT NULL,
      PRIMARY KEY (hexId, epoch, account)
    );

    -- Everything needed to replay one tick's battles as an animation.
    CREATE TABLE IF NOT EXISTS battles (
      tick        INTEGER NOT NULL,
      hexId       INTEGER NOT NULL,
      kind        TEXT    NOT NULL,  -- 'captured' | 'held' | 'claimed'
      fromGuild   INTEGER NOT NULL DEFAULT 0,
      toGuild     INTEGER NOT NULL DEFAULT 0,
      treasury    TEXT    NOT NULL DEFAULT '0',
      blockNumber INTEGER NOT NULL,
      logIndex    INTEGER NOT NULL,
      PRIMARY KEY (tick, hexId, logIndex)
    );

    CREATE INDEX IF NOT EXISTS battles_by_tick ON battles(tick);
    CREATE INDEX IF NOT EXISTS positions_by_hex ON positions(hexId, epoch);
  `);

  return db;
}

export function getMeta(db: DatabaseSync, key: string, fallback: string): string {
  const row = db.prepare("SELECT value FROM meta WHERE key = ?").get(key) as
    | { value: string }
    | undefined;
  return row?.value ?? fallback;
}

export function setMeta(db: DatabaseSync, key: string, value: string): void {
  db.prepare(
    "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
  ).run(key, value);
}
