/*
 * The indexer.
 *
 * Reads the chain's events, keeps a SQLite mirror of the board, and serves it
 * over HTTP in exactly the shape `src/lib/board.ts` already consumes. The site
 * therefore needs no code path for "live" versus "simulated": it fetches a board
 * and draws it, and the only difference is where the JSON came from.
 *
 * Two endpoints:
 *   GET /board        the current board
 *   GET /replay/:tick one tick's battles, for the resolution screen
 *
 *   node indexer/index.ts
 */

import { createServer } from "node:http";
import { createPublicClient, http as viemHttp, parseAbiItem, type Address, type Log } from "viem";
import { baseSepolia, base } from "viem/chains";
import { openDb, getMeta, setMeta } from "./db.ts";

const RPC = process.env.HEXWAR_RPC_URL;
const MAP = process.env.HEXWAR_MAP_ADDRESS as Address | undefined;
const BATTLE = process.env.HEXWAR_BATTLE_ADDRESS as Address | undefined;
const DEPLOY_BLOCK = BigInt(process.env.HEXWAR_DEPLOY_BLOCK ?? "0");
const DB_PATH = process.env.HEXWAR_DB ?? "indexer/hexwar.db";
const PORT = Number(process.env.HEXWAR_INDEXER_PORT ?? 8787);
const CHAIN = process.env.HEXWAR_CHAIN_ID === "8453" ? base : baseSepolia;

/** Season constants, mirrored from the contract so /board can fill the same shape. */
const TICKS_PER_SEASON = 126;
const TICKS_PER_DAY = 3;
const UPKEEP_PCT = 2;
const SEASON_POOL = Number(process.env.HEXWAR_SEASON_POOL ?? 2_000_000);
const YIELD_UNIT = Number(process.env.HEXWAR_YIELD_UNIT_TOKENS ?? 5);

if (!RPC || !MAP || !BATTLE) {
  console.error(
    "indexer: set HEXWAR_RPC_URL, HEXWAR_MAP_ADDRESS and HEXWAR_BATTLE_ADDRESS (see .env.example)",
  );
  process.exit(1);
}

const rpcUrl: string = RPC;
const mapAddress: Address = MAP;
const battleAddress: Address = BATTLE;

const db = openDb(DB_PATH);
const client = createPublicClient({ chain: CHAIN, transport: viemHttp(rpcUrl) });

// ---------------------------------------------------------------- event shapes

const EVENTS = {
  seeded: parseAbiItem(
    "event HexSeeded(uint16 indexed hexId, int16 q, int16 r, uint8 tier)",
  ),
  ownerChanged: parseAbiItem(
    "event HexOwnerChanged(uint16 indexed hexId, uint32 indexed from, uint32 indexed to, uint32 tick)",
  ),
  guildCreated: parseAbiItem("event GuildCreated(uint32 indexed guildId, address treasury)"),
  memberJoined: parseAbiItem(
    "event MemberJoined(uint32 indexed guildId, address indexed member)",
  ),
  refugeMoved: parseAbiItem("event RefugeMoved(uint32 indexed guildId, uint16 from, uint16 to)"),
  transferSingle: parseAbiItem(
    "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  ),
  captured: parseAbiItem(
    "event HexCaptured(uint16 indexed hexId, uint32 indexed from, uint32 indexed to, uint128 treasury)",
  ),
  held: parseAbiItem("event HexHeld(uint16 indexed hexId, uint32 indexed guildId)"),
  claimed: parseAbiItem(
    "event HexClaimed(uint16 indexed hexId, uint32 indexed guildId, uint256 cost)",
  ),
} as const;

// ------------------------------------------------------------------- ingestion

type AnyLog = Log & { args: Record<string, unknown>; blockNumber: bigint; logIndex: number };

/** The tick a log belongs to, taken from the resolution that emitted it. */
let currentTick = 0;

function ingest(name: keyof typeof EVENTS, log: AnyLog) {
  const a = log.args;

  switch (name) {
    case "seeded":
      db.prepare(
        "INSERT INTO hexes (id, q, r, tier) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING",
      ).run(Number(a.hexId), Number(a.q), Number(a.r), Number(a.tier));
      break;

    case "ownerChanged": {
      const hexId = Number(a.hexId);
      const to = Number(a.to);
      const from = Number(a.from);
      const tick = Number(a.tick);
      currentTick = Math.max(currentTick, tick);
      db.prepare("UPDATE hexes SET owner = ?, heldSince = ? WHERE id = ?").run(to, tick, hexId);
      if (from !== 0) {
        db.prepare("UPDATE guilds SET losses = losses + 1 WHERE id = ?").run(from);
      }
      break;
    }

    case "guildCreated":
      db.prepare(
        "INSERT INTO guilds (id, treasury, members) VALUES (?, ?, 0) ON CONFLICT(id) DO NOTHING",
      ).run(Number(a.guildId), String(a.treasury));
      break;

    case "memberJoined":
      db.prepare(
        "INSERT INTO members (account, guildId) VALUES (?, ?) ON CONFLICT(account) DO UPDATE SET guildId = excluded.guildId",
      ).run(String(a.member).toLowerCase(), Number(a.guildId));
      db.prepare(
        "UPDATE guilds SET members = (SELECT COUNT(*) FROM members WHERE guildId = ?) WHERE id = ?",
      ).run(Number(a.guildId), Number(a.guildId));
      break;

    case "refugeMoved": {
      const from = Number(a.from);
      const to = Number(a.to);
      if (from !== 0) db.prepare("UPDATE hexes SET isRefuge = 0 WHERE id = ?").run(from);
      db.prepare("UPDATE hexes SET isRefuge = 1 WHERE id = ?").run(to);
      break;
    }

    case "transferSingle": {
      // Positions are minted, never traded in normal play, so `from == 0` is the
      // case that matters. The token id carries the hex's epoch in its high bits.
      const id = BigInt(a.id as bigint);
      const hexId = Number(id & 0xffffn);
      const epoch = Number(id >> 16n);
      const to = String(a.to).toLowerCase();
      const value = BigInt(a.value as bigint);
      if (to === "0x0000000000000000000000000000000000000000") break;

      const row = db
        .prepare("SELECT amount FROM positions WHERE hexId = ? AND epoch = ? AND account = ?")
        .get(hexId, epoch, to) as { amount: string } | undefined;
      const next = (row ? BigInt(row.amount) : 0n) + value;
      db.prepare(
        "INSERT INTO positions (hexId, epoch, account, amount) VALUES (?, ?, ?, ?) " +
          "ON CONFLICT(hexId, epoch, account) DO UPDATE SET amount = excluded.amount",
      ).run(hexId, epoch, to, next.toString());
      db.prepare("UPDATE hexes SET epoch = ? WHERE id = ? AND epoch < ?").run(epoch, hexId, epoch);
      break;
    }

    case "captured":
      db.prepare(
        "INSERT INTO battles (tick, hexId, kind, fromGuild, toGuild, treasury, blockNumber, logIndex) " +
          "VALUES (?, ?, 'captured', ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING",
      ).run(
        currentTick,
        Number(a.hexId),
        Number(a.from),
        Number(a.to),
        String(a.treasury),
        Number(log.blockNumber),
        log.logIndex,
      );
      db.prepare("UPDATE guilds SET captures = captures + 1 WHERE id = ?").run(Number(a.to));
      break;

    case "held":
      db.prepare(
        "INSERT INTO battles (tick, hexId, kind, toGuild, blockNumber, logIndex) " +
          "VALUES (?, ?, 'held', ?, ?, ?) ON CONFLICT DO NOTHING",
      ).run(
        currentTick,
        Number(a.hexId),
        Number(a.guildId),
        Number(log.blockNumber),
        log.logIndex,
      );
      break;

    case "claimed":
      db.prepare(
        "INSERT INTO battles (tick, hexId, kind, toGuild, treasury, blockNumber, logIndex) " +
          "VALUES (?, ?, 'claimed', ?, ?, ?, ?) ON CONFLICT DO NOTHING",
      ).run(
        currentTick,
        Number(a.hexId),
        Number(a.guildId),
        String(a.cost),
        Number(log.blockNumber),
        log.logIndex,
      );
      db.prepare("UPDATE guilds SET claimed = claimed + 1 WHERE id = ?").run(Number(a.guildId));
      break;
  }
}

// ----------------------------------------------------------------------- sync

const CHUNK = 5_000n;

async function sync() {
  const head = await client.getBlockNumber();
  let from = BigInt(getMeta(db, "lastBlock", DEPLOY_BLOCK.toString())) + 1n;
  if (from > head) return;

  while (from <= head) {
    const to = from + CHUNK > head ? head : from + CHUNK;

    for (const [name, event] of Object.entries(EVENTS)) {
      const address = name === "captured" || name === "held" || name === "claimed"
        ? battleAddress
        : mapAddress;
      const logs = await client.getLogs({ address, event, fromBlock: from, toBlock: to });
      // Chain order is the only ordering the mirror may rely on.
      for (const log of logs) ingest(name as keyof typeof EVENTS, log as unknown as AnyLog);
    }

    setMeta(db, "lastBlock", to.toString());
    console.log(`indexer: ${from}..${to}`);
    from = to + 1n;
  }
}

// ----------------------------------------------------------------- board shape

function buildBoard() {
  const hexes = db.prepare("SELECT * FROM hexes ORDER BY id").all() as Array<{
    id: number;
    tier: number;
    owner: number;
    treasury: string;
    heldSince: number;
    isRefuge: number;
    epoch: number;
  }>;

  const owners: number[] = [];
  const tiers: number[] = [];
  const refuges: number[] = [];
  const treasury: number[] = [];
  const heldSince: number[] = [];
  const holders: number[] = [];
  const topHolderPct: number[] = [];

  const holderRows = db
    .prepare("SELECT hexId, epoch, account, amount FROM positions")
    .all() as Array<{ hexId: number; epoch: number; account: string; amount: string }>;

  const byHex = new Map<string, { total: bigint; top: bigint; n: number }>();
  for (const row of holderRows) {
    const key = `${row.hexId}:${row.epoch}`;
    const e = byHex.get(key) ?? { total: 0n, top: 0n, n: 0 };
    const amt = BigInt(row.amount);
    e.total += amt;
    if (amt > e.top) e.top = amt;
    e.n += 1;
    byHex.set(key, e);
  }

  for (const h of hexes) {
    owners.push(h.owner);
    tiers.push(h.tier);
    if (h.isRefuge) refuges.push(h.id);
    treasury.push(Number(BigInt(h.treasury) / 10n ** 18n));
    heldSince.push(h.heldSince);
    const e = byHex.get(`${h.id}:${h.epoch}`);
    holders.push(e?.n ?? 0);
    topHolderPct.push(e && e.total > 0n ? Number((e.top * 100n) / e.total) : 0);
  }

  const guildRows = db.prepare("SELECT * FROM guilds ORDER BY id").all() as Array<{
    id: number;
    members: number;
    claimed: number;
    captures: number;
    losses: number;
  }>;

  const tierYield = (t: number) => (t === 3 ? 8 : t === 2 ? 3 : 1);
  const guilds = guildRows
    .map((g) => {
      const own = hexes.filter((h) => h.owner === g.id);
      return {
        id: g.id,
        hexes: own.length,
        claimed: g.claimed,
        conquests: g.captures,
        losses: g.losses,
        members: g.members,
        yieldPerTick: own.reduce((s, h) => s + tierYield(h.tier) * YIELD_UNIT, 0),
        treasury: own.reduce((s, h) => s + Number(BigInt(h.treasury) / 10n ** 18n), 0),
        tier3: own.filter((h) => h.tier === 3).length,
      };
    })
    .sort((a, b) => b.hexes - a.hexes);

  const battles = db.prepare("SELECT COUNT(*) AS n FROM battles").get() as { n: number };
  const captures = db
    .prepare("SELECT COUNT(*) AS n FROM battles WHERE kind = 'captured'")
    .get() as { n: number };

  return {
    radius: 13,
    tick: currentTick,
    ticksPerSeason: TICKS_PER_SEASON,
    totalHexes: hexes.length,
    neutralHexes: owners.filter((o) => o === 0).length,
    battles: battles.n,
    conquests: captures.n,
    seasonPool: SEASON_POOL,
    yieldUnit: YIELD_UNIT,
    mapYieldPerTick: hexes
      .filter((h) => h.owner !== 0)
      .reduce((s, h) => s + tierYield(h.tier) * YIELD_UNIT, 0),
    ticksPerDay: TICKS_PER_DAY,
    upkeepPct: UPKEEP_PCT,
    owners,
    tiers,
    refuges,
    treasury,
    heldSince,
    holders,
    topHolderPct,
    guilds,
  };
}

function buildReplay(tick: number) {
  const rows = db
    .prepare("SELECT * FROM battles WHERE tick = ? ORDER BY hexId")
    .all(tick) as Array<{
    hexId: number;
    kind: string;
    fromGuild: number;
    toGuild: number;
    treasury: string;
  }>;

  return {
    tick,
    events: rows.map((r) => ({
      hexId: r.hexId,
      kind: r.kind,
      from: r.fromGuild,
      to: r.toGuild,
      treasury: Number(BigInt(r.treasury || "0") / 10n ** 18n),
    })),
  };
}

// ---------------------------------------------------------------------- server

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const url = new URL(req.url ?? "/", "http://localhost");

  try {
    if (url.pathname === "/board") {
      res.end(JSON.stringify(buildBoard()));
      return;
    }
    const replay = url.pathname.match(/^\/replay\/(\d+)$/);
    if (replay) {
      res.end(JSON.stringify(buildReplay(Number(replay[1]))));
      return;
    }
    if (url.pathname === "/health") {
      res.end(JSON.stringify({ ok: true, lastBlock: getMeta(db, "lastBlock", "0") }));
      return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "not found" }));
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e instanceof Error ? e.message : "error" }));
  }
});

server.listen(PORT, () => {
  console.log(`indexer: serving on http://localhost:${PORT} (db ${DB_PATH})`);
});

async function loop() {
  for (;;) {
    try {
      await sync();
    } catch (e) {
      console.error("indexer:", e instanceof Error ? e.message : e);
    }
    await new Promise((r) => setTimeout(r, 15_000));
  }
}

loop();
