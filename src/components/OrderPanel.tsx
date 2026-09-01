"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { formatUnits, parseUnits, maxUint256, type Address } from "viem";
import {
  useAccount,
  useChainId,
  useConnect,
  useReadContracts,
  useSignMessage,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { battleAbi, mapAbi, hexwartokenAbi } from "@/lib/abi";
import { chainConfig, isLive, siteConfig } from "@/lib/site-config";
import { targetChain } from "@/lib/wagmiConfig";
import { useChainTick } from "@/lib/useChainTick";
import {
  cacheSeed,
  cachedSeed,
  commitmentHash,
  deriveSalt,
  markRevealed,
  nextNonce,
  pendingForTick,
  saveOrder,
  seedFromSignature,
  seedMessage,
  type PendingOrder,
} from "@/lib/orders";

/*
 * The order panel: connect, fund, commit, reveal.
 *
 * It is a queue of one question at a time. A player arriving here does not want
 * a form with six disabled fields explaining what they have not done yet; they
 * want the single next thing. So the panel resolves to exactly one state —
 * connect, switch network, join a guild, approve, deposit, commit, reveal — and
 * shows only that, with the rest of the sequence as a quiet line underneath.
 *
 * Depositing is separate from staking on purpose, and not for convenience: an
 * ERC-20 transfer at commit time would publish the amount, which is the one
 * thing a sealed order exists to hide. Tokens go into an internal balance first,
 * and the commit moves nothing at all.
 */

type Props = { hexId: number; tier: number; isNeutral: boolean; claimCost: number };

const DEC = 18;

export function OrderPanel({ hexId, tier, isNeutral, claimCost }: Props) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors, isPending: connecting } = useConnect();
  const { switchChain } = useSwitchChain();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync, isPending: writing } = useWriteContract();
  const { data: chainTick } = useChainTick();

  const [amount, setAmount] = useState(isNeutral ? String(claimCost) : "100");
  const [side, setSide] = useState<"attack" | "defend">(isNeutral ? "attack" : "attack");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, forceRender] = useState(0);

  const battle = chainConfig.battleAddress ?? undefined;
  const token = chainConfig.tokenAddress ?? undefined;
  const map = chainConfig.mapAddress ?? undefined;

  const { data: reads, refetch } = useReadContracts({
    contracts: [
      { address: token, abi: hexwartokenAbi, functionName: "balanceOf", args: [address!] },
      { address: token, abi: hexwartokenAbi, functionName: "allowance", args: [address!, battle!] },
      { address: battle, abi: battleAbi, functionName: "freeBalance", args: [address!] },
      { address: battle, abi: battleAbi, functionName: "commitBond" },
      { address: map, abi: mapAbi, functionName: "guildOf", args: [address!] },
    ],
    query: { enabled: isLive && !!address, refetchInterval: 15_000 },
  });

  const walletBalance = (reads?.[0]?.result as bigint | undefined) ?? 0n;
  const allowance = (reads?.[1]?.result as bigint | undefined) ?? 0n;
  const internal = (reads?.[2]?.result as bigint | undefined) ?? 0n;
  const bond = (reads?.[3]?.result as bigint | undefined) ?? 0n;
  const guildId = Number((reads?.[4]?.result as bigint | number | undefined) ?? 0);

  const tick = chainTick?.tick ?? 0;
  const phase = chainTick?.phase ?? 0;

  const parsed = useMemo(() => {
    try {
      return amount.trim() === "" ? 0n : parseUnits(amount.trim(), DEC);
    } catch {
      return null;
    }
  }, [amount]);

  const pending = address && tick ? pendingForTick(address, tick) : [];

  // ------------------------------------------------------------------ actions

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(label);
    setError(null);
    try {
      await fn();
      await refetch();
      forceRender((n) => n + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "transaction failed";
      // Wallet rejections are a choice, not an error worth shouting about.
      setError(/user rejected|denied/i.test(msg) ? null : msg.split("\n")[0]);
    } finally {
      setBusy(null);
    }
  };

  /** Fetch the season seed, asking for one signature if it is not cached. */
  const ensureSeed = async (account: Address): Promise<`0x${string}`> => {
    const season = 1;
    const cached = cachedSeed(account, season);
    if (cached) return cached;
    const signature = await signMessageAsync({ message: seedMessage(season) });
    const seed = seedFromSignature(signature);
    cacheSeed(account, season, seed);
    return seed;
  };

  const doApprove = () =>
    run("Approving", () =>
      writeContractAsync({
        address: token!,
        abi: hexwartokenAbi,
        functionName: "approve",
        args: [battle!, maxUint256],
      }),
    );

  const doDeposit = () =>
    run("Depositing", () =>
      writeContractAsync({
        address: battle!,
        abi: battleAbi,
        functionName: "deposit",
        args: [parsed!],
      }),
    );

  const doCommit = () =>
    run("Committing", async () => {
      const seed = await ensureSeed(address!);
      const nonce = nextNonce(address!, tick, hexId);
      const salt = deriveSalt(seed, tick, hexId, nonce);
      const isAttack = isNeutral ? true : side === "attack";
      const commitment = commitmentHash(hexId, parsed!, isAttack, salt, address!);

      await writeContractAsync({
        address: battle!,
        abi: battleAbi,
        functionName: "commit",
        args: [commitment],
      });

      const order: PendingOrder = {
        tick,
        hexId,
        amount: parsed!.toString(),
        isAttack,
        nonce,
        commitment,
        revealed: false,
      };
      saveOrder(address!, order);
    });

  const doReveal = (o: PendingOrder) =>
    run("Revealing", async () => {
      const seed = await ensureSeed(address!);
      const salt = deriveSalt(seed, o.tick, o.hexId, o.nonce);
      await writeContractAsync({
        address: battle!,
        abi: battleAbi,
        functionName: "reveal",
        args: [address!, o.hexId, BigInt(o.amount), o.isAttack, salt],
      });
      markRevealed(address!, o.commitment);
    });

  // ------------------------------------------------------------------- render

  const frame = (title: string, children: React.ReactNode, note?: string) => (
    <div className="border border-rule">
      <div className="border-b border-rule px-4 py-3">
        <Label className="text-chalk-soft">{title}</Label>
      </div>
      <div className="px-4 py-4">
        {children}
        {note && <p className="type-data mt-3 text-chalk-muted">{note}</p>}
        {error && <p className="type-data mt-3 text-loss">{error}</p>}
      </div>
    </div>
  );

  // Nothing deployed yet. Say it once, plainly, and offer nothing that cannot work.
  if (!isLive) {
    return frame(
      "Commit an order",
      <>
        <p className="type-body text-chalk-soft">
          {isNeutral
            ? `This hex will cost ${claimCost.toLocaleString("en-US")} ${siteConfig.ticker} to claim, before the empire multiplier.`
            : "Taking this hex will mean staking against its defenders, sealed until reveal."}
        </p>
        <Button className="mt-4 w-full" disabled>
          Trading opens at launch
        </Button>
      </>,
      `${siteConfig.ticker} is not trading yet and no contract is deployed. ${chainConfig.network} is the target.`,
    );
  }

  if (!isConnected) {
    return frame(
      "Commit an order",
      <Button
        className="w-full"
        onClick={() => connect({ connector: connectors[0] })}
        disabled={connecting || !connectors[0]}
      >
        {connecting ? "Connecting…" : "Connect wallet"}
      </Button>,
      `Connect to stake ${siteConfig.ticker} on this hex.`,
    );
  }

  if (chainId !== targetChain.id) {
    return frame(
      "Wrong network",
      <Button className="w-full" onClick={() => switchChain({ chainId: targetChain.id })}>
        Switch to {chainConfig.network}
      </Button>,
    );
  }

  if (guildId === 0) {
    return frame(
      "Join a guild first",
      <p className="type-body text-chalk-soft">
        Orders are placed by guilds, and cohesion counts your active members — a
        guild fielding twenty-five hits half again as hard as a lone wallet. Open
        the standings to join one.
      </p>,
      "A one-member guild is allowed, and pays for it in cohesion.",
    );
  }

  if (allowance < parseUnits("1", DEC)) {
    return frame(
      "Approve once",
      <>
        <p className="type-body text-chalk-soft">
          Let the game move {siteConfig.ticker} from your wallet into your playing
          balance. Approving moves nothing on its own.
        </p>
        <Button className="mt-4 w-full" onClick={doApprove} disabled={writing || !!busy}>
          {busy === "Approving" ? "Approving…" : `Approve ${siteConfig.ticker}`}
        </Button>
      </>,
      `Wallet balance ${Number(formatUnits(walletBalance, DEC)).toLocaleString("en-US")} ${siteConfig.ticker}.`,
    );
  }

  const needed = parsed ?? 0n;

  if (internal < needed + bond) {
    return frame(
      "Top up your playing balance",
      <>
        <p className="type-body text-chalk-soft">
          Stakes come out of a balance held by the game, not straight from your
          wallet. That is what keeps an order sealed: a transfer at commit time
          would publish the amount.
        </p>
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label={`Amount of ${siteConfig.ticker} to deposit`}
          className="type-figure-sm mt-4 w-full border border-rule-strong bg-void px-3 py-2.5 text-chalk"
        />
        <Button
          className="mt-3 w-full"
          onClick={doDeposit}
          disabled={writing || !!busy || parsed === null || parsed === 0n}
        >
          {busy === "Depositing" ? "Depositing…" : `Deposit ${siteConfig.ticker}`}
        </Button>
      </>,
      `In the game ${Number(formatUnits(internal, DEC)).toLocaleString("en-US")} · in your wallet ${Number(formatUnits(walletBalance, DEC)).toLocaleString("en-US")}.`,
    );
  }

  if (phase === 1) {
    return frame(
      "Reveal your orders",
      pending.length === 0 ? (
        <p className="type-body text-chalk-soft">
          Nothing of yours is waiting this tick.
        </p>
      ) : (
        <>
          {pending.map((o) => (
            <div key={o.commitment} className="border-b border-rule/60 py-2.5 last:border-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="type-data text-chalk">
                  #{String(o.hexId).padStart(3, "0")} ·{" "}
                  {o.isAttack ? "attack" : "defend"}
                </span>
                <span className="type-data text-chalk">
                  {Number(formatUnits(BigInt(o.amount), DEC)).toLocaleString("en-US")}
                </span>
              </div>
              <Button
                className="mt-2 w-full"
                onClick={() => doReveal(o)}
                disabled={writing || !!busy}
              >
                {busy === "Revealing" ? "Revealing…" : "Reveal"}
              </Button>
            </div>
          ))}
        </>
      ),
      "Miss the window and the bond is forfeit — 10% burned. Anyone holding your salt can reveal for you.",
    );
  }

  if (phase === 2) {
    return frame(
      "Resolving",
      <p className="type-body text-chalk-soft">
        Every battle on the map is settling. Commits reopen when the tick closes.
      </p>,
      chainTick?.resolutionPending ? "Waiting on the keeper." : undefined,
    );
  }

  // Commit phase — the main event.
  return frame(
    isNeutral ? "Claim this hex" : "Commit an order",
    <>
      {!isNeutral && (
        <div className="flex gap-2">
          {(["attack", "defend"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              aria-pressed={side === s}
              className={clsx(
                "type-label flex-1 border px-3 py-2.5 text-center transition-colors",
                side === s
                  ? "border-ember bg-ember text-void"
                  : "border-rule-strong text-chalk-muted hover:text-chalk",
              )}
            >
              {s === "attack" ? "Attack" : "Defend"}
            </button>
          ))}
        </div>
      )}

      <input
        inputMode="decimal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-label={`Amount of ${siteConfig.ticker} to stake`}
        className="type-figure-sm mt-3 w-full border border-rule-strong bg-void px-3 py-2.5 text-chalk"
      />

      <Button
        className="mt-3 w-full"
        onClick={doCommit}
        disabled={writing || !!busy || parsed === null || parsed === 0n}
      >
        {busy === "Committing" ? "Sealing…" : "Commit sealed order"}
      </Button>
    </>,
    `Tick ${tick} · nothing moves until you reveal. A bond of ${Number(formatUnits(bond, DEC)).toLocaleString("en-US")} ${siteConfig.ticker} is locked, and that bond is all you risk if you never open the order.`,
  );
}
