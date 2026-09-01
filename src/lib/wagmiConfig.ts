import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

/*
 * Injected wallets only.
 *
 * No WalletConnect project id, no hosted relay, no third party that has to be
 * up for the page to work. The game targets Base Sepolia first and Base after,
 * and both are reachable from any browser wallet.
 */

export const targetChain =
  process.env.NEXT_PUBLIC_HEXWAR_CHAIN_ID === "8453" ? base : baseSepolia;

export const wagmiConfig = createConfig({
  chains: [targetChain],
  connectors: [injected()],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_HEXWAR_RPC_URL),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_HEXWAR_RPC_URL),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
