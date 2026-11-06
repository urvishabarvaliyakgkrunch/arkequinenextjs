// src/lib/subscriptionPricing.ts
// Replicates WCSATT's guest-facing "subscribe to save" discount (see
// arkequine0211/wp-content/themes/enfold-child/functions.php: ARK_SUB_DISCOUNT_FIRST = 10,
// ARK_SUB_DISCOUNT_RETURNING = 15). Phase 1 has no customer login (clauderules A4), so every
// Next.js visitor is effectively first-time — the 15% returning-customer rate never applies here.
// One source of truth so the shop cards, product page, and basket all show the same number.
export const GUEST_SUBSCRIPTION_DISCOUNT_PERCENT = 10;

// WPGraphQL/Store API only return prices as pre-formatted strings like "€84.00" (no raw numeric
// field is fetched) — parse the number back out so the discount math matches WooCommerce's own
// rounding. Site's currency settings use "." as decimal separator and "," as thousand separator
// (confirmed via the live Store API response's currency_decimal_separator/currency_thousand_separator).
export function parseFormattedPrice(formatted: string): number {
  const cleaned = formatted.replace(/[^0-9.,]/g, "").replace(/,/g, "");
  return Number(cleaned) || 0;
}

export function formatEuro(amount: number): string {
  return `€${amount.toFixed(2)}`;
}

// The per-unit price shown next to "Every month" / "Every 3 months" — same number both times,
// matching the live product page (the "3 items" wording communicates the bundle, not a different price).
export function applyGuestDiscount(amount: number): number {
  return amount * (1 - GUEST_SUBSCRIPTION_DISCOUNT_PERCENT / 100);
}

export function subscriptionDiscountedPrice(formattedPrice: string): number {
  return applyGuestDiscount(parseFormattedPrice(formattedPrice));
}

// Store API cart items carry price as an integer minor-unit string (e.g. "8400" = €84.00) — this is
// what the mini-cart, basket table, and basket totals all actually have to work with, so the discount
// math is done in minor units (no float rounding drift) rather than round-tripping through a formatted
// string each time. One home for "what does this line actually cost given its plan" so the mini-cart,
// basket rows, and basket totals can never disagree with each other.
export type CartLinePlan = "one_time" | "monthly" | "every_3_months";

export function discountedLineTotalMinor(
  unitPriceMinor: number,
  quantity: number,
  plan: CartLinePlan,
): number {
  const fullLine = unitPriceMinor * quantity;
  return plan === "one_time" ? fullLine : Math.round(fullLine * (1 - GUEST_SUBSCRIPTION_DISCOUNT_PERCENT / 100));
}
