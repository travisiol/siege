"use client";

import { clsx } from "clsx";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { isLive, chainConfig } from "@/lib/site-config";

/*
 * Connect, disconnect, and nothing else.
 *
 * Hidden entirely while no contract is deployed. A connect button on a page with
 * nothing to sign invites a wallet prompt that cannot lead anywhere, and asking
 * for a connection you have no use for is how a pre-launch page teaches people
 * to click through prompts without reading them.
 */
export function WalletConnect({ className }: { className?: string }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isLive) return null;

  const short = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";
  const injectedConnector = connectors.find((c) => c.type === "injected") ?? connectors[0];

  return (
    <button
      type="button"
      onClick={() => (isConnected ? disconnect() : connect({ connector: injectedConnector }))}
      disabled={isPending || !injectedConnector}
      className={clsx(
        "type-label px-4 py-3 transition-colors duration-150 disabled:cursor-not-allowed",
        className,
      )}
      title={isConnected ? `Connected on ${chainConfig.network}` : undefined}
    >
      {isPending ? "Connecting…" : isConnected ? short : "Connect wallet"}
    </button>
  );
}
