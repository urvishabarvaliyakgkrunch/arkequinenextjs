// src/lib/currency.ts
// Client-safe currency constants. CURCY on WordPress does the real conversion; we only remember which
// currency the visitor picked, in the same cookie CURCY itself reads, and pass it on to the backend.
export const CURRENCY_COOKIE = "wmc_current_currency";

export const CURRENCIES = [
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "Pound sterling" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "EUR";

export function parseCurrency(value: string | null | undefined): CurrencyCode {
  return CURRENCIES.find((c) => c.code === value)?.code ?? DEFAULT_CURRENCY;
}

// The backend reads this header value as the visitor's cookie; EUR is its default so it needs no cookie
export function currencyCookieHeader(code: CurrencyCode): string {
  return `${CURRENCY_COOKIE}=${code}`;
}

// Picks the visitor's currency out of a raw Cookie header (used by the cart proxy routes)
export function currencyFromCookieHeader(header: string | null): CurrencyCode {
  const match = header?.split(/;\s*/).find((part) => part.startsWith(`${CURRENCY_COOKIE}=`));
  return parseCurrency(match?.slice(CURRENCY_COOKIE.length + 1));
}
