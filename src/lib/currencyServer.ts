// src/lib/currencyServer.ts
// Server-only: reads the visitor's chosen currency. Using cookies() makes the calling route dynamic.
import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { DEFAULT_CURRENCY, CURRENCY_COOKIE, parseCurrency, type CurrencyCode } from "@/lib/currency";

export async function getCurrentCurrency(): Promise<CurrencyCode> {
  try {
    const store = await cookies();
    return parseCurrency(store.get(CURRENCY_COOKIE)?.value);
  } catch (error) {
    // Let Next's own "this route is dynamic" signal through; anything else means no request (build-time params)
    unstable_rethrow(error);
    return DEFAULT_CURRENCY;
  }
}
