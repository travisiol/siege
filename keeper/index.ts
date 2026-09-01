/*
 * The keeper.
 *
 * Every eight hours a tick closes and its battles have to be resolved. Nobody's
 * stake moves until that happens, and the next tick's commits are refused while
 * the previous one is open, so the game stalls rather than corrupts if the
 * keeper is late. That is the safe failure, but it is still a failure, so this
 * process exists to make sure it does not happen.
 *
 * Resolution is batched: `resolveTick(max)` walks contested hexes from a stored
 * cursor, so a busy tick spreads over several transactions. Batching cannot
 * change any outcome — no hex's result depends on another's — which is what
 * makes it safe to stop and resume here.
 *
 * Anyone can run this. `resolveTick` is permissionless by design: a game that
 * only advances when one privileged address is awake is a game with a single
 * point of failure.
 *
 *   node keeper/index.ts
 */

import { createPublicClient, createWalletClient, http, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { readFileSync } from "node:fs";

const RPC = process.env.HEXWAR_RPC_URL;
const BATTLE = process.env.HEXWAR_BATTLE_ADDRESS as Address | undefined;
const KEY = process.env.HEXWAR_KEEPER_KEY as `0x${string}` | undefined;
/** How many hexes to resolve per transaction. 0 lets the contract pick its default of 64. */
const BATCH = Number(process.env.HEXWAR_BATCH ?? 64);

if (!RPC || !BATTLE || !KEY) {
  console.error(
    "keeper: set HEXWAR_RPC_URL, HEXWAR_BATTLE_ADDRESS and HEXWAR_KEEPER_KEY (see .env.example)",
  );
  process.exit(1);
}

// Re-bound after the guard: TypeScript does not carry the narrowing of a
// module-level binding into the closures below.
const rpcUrl: string = RPC;
const battleAddress: Address = BATTLE;
const keeperKey: `0x${string}` = KEY;

const abi = JSON.parse(
  readFileSync(new URL("../contracts/out/Battle.abi.json", import.meta.url), "utf8"),
);

const account = privateKeyToAccount(keeperKey);
const publicClient = createPublicClient({ chain: baseSepolia, transport: http(rpcUrl) });
const wallet = createWalletClient({ account, chain: baseSepolia, transport: http(rpcUrl) });

const read = <T>(functionName: string, args: unknown[] = []) =>
  publicClient.readContract({ address: battleAddress, abi, functionName, args }) as Promise<T>;

/** 0 = Commit, 1 = Reveal, 2 = Resolution. */
async function state() {
  const [tick, phase, lastResolved, contested, cursor] = await Promise.all([
    read<number>("currentTick"),
    read<number>("phase"),
    read<number>("lastResolvedTick"),
    read<bigint>("contestedCount"),
    read<number>("resolveCursor"),
  ]);
  return { tick, phase, lastResolved, contested: Number(contested), cursor };
}

async function resolveUntilDone(tick: number) {
  for (let pass = 0; pass < 64; pass++) {
    const s = await state();
    if (s.lastResolved >= tick) {
      console.log(`tick ${tick}: resolved`);
      return;
    }

    const hash = await wallet.writeContract({
      address: battleAddress,
      abi,
      functionName: "resolveTick",
      args: [BATCH],
      chain: baseSepolia,
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(
      `tick ${tick}: batch from cursor ${s.cursor}/${s.contested}` +
        `  gas ${receipt.gasUsed}  ${receipt.status}`,
    );

    // The brief caps a tick at 25M gas. If one batch approaches that, the batch
    // size is too large for this board and wants lowering rather than hoping.
    if (receipt.gasUsed > 20_000_000n) {
      console.warn(
        `keeper: batch used ${receipt.gasUsed} gas, close to the 25M ceiling — lower HEXWAR_BATCH`,
      );
    }
    if (receipt.status !== "success") throw new Error("resolveTick reverted");
  }
  throw new Error(`tick ${tick}: still unresolved after 64 batches`);
}

async function loop() {
  const s = await state();
  console.log(
    `keeper: tick ${s.tick} phase ${["commit", "reveal", "resolution"][s.phase]}` +
      `  lastResolved ${s.lastResolved}  contested ${s.contested}`,
  );

  // Resolve as soon as the reveal window shuts, and also catch up if a previous
  // tick was missed entirely.
  if (s.tick > s.lastResolved && (s.phase === 2 || s.tick > s.lastResolved + 1)) {
    await resolveUntilDone(s.tick);
  }
}

async function main() {
  console.log(`keeper: watching ${battleAddress} as ${account.address}`);
  for (;;) {
    try {
      await loop();
    } catch (err) {
      console.error("keeper:", err instanceof Error ? err.message : err);
    }
    await new Promise((r) => setTimeout(r, 60_000));
  }
}

main();
