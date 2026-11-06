// src/hooks/useCurrency.ts
"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, currencyFromCookieHeader, type CurrencyCode } from "@/lib/currency";
import { useCartStore } from "@/store/cart";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const readCurrency = () => currencyFromCookieHeader(document.cookie);

export function useCurrency() {
  const router = useRouter();
  const hydrateCart = useCartStore((s) => s.hydrate);
  // Server snapshot is the default so the first paint matches the server HTML, then the cookie takes over
  const currency = useSyncExternalStore(subscribe, readCurrency, () => DEFAULT_CURRENCY);

  const setCurrency = useCallback(
    (code: CurrencyCode) => {
      if (code === readCurrency()) return;
      document.cookie = `${CURRENCY_COOKIE}=${code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      listeners.forEach((l) => l());
      // Re-render server pages with converted prices, and re-read the cart in the new currency
      router.refresh();
      hydrateCart().catch(() => {});
    },
    [router, hydrateCart],
  );

  return { currency, setCurrency };
}
