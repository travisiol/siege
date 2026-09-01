"use client";

import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmiConfig";

/*
 * Wallet and query plumbing.
 *
 * Mounted unconditionally, even with no contract deployed: every hook below it
 * is written to sit idle when `isLive` is false, so the page behaves the same
 * whether or not a chain is there. Making the provider conditional would mean
 * two different component trees to keep working, and only one of them would
 * ever get tested.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
