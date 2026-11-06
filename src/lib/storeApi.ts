// src/lib/storeApi.ts
// Client-safe cart calls — routed through our own /api/cart/* proxy (src/app/api/cart/) rather than
// the WP backend directly: the backend's real Store API responses don't send Access-Control-Allow-Origin
// (only its OPTIONS preflight does), so a direct cross-origin browser fetch fails with "Failed to fetch".
const STORE_API = "/api/cart";

export interface StoreApiMoney {
  currency_minor_unit: number;
  currency_symbol: string;
}

// One "label: value" line the Store API attaches to a cart item — a chosen variation option
// (e.g. "Size: 10kg") uses `attribute`/`value`; other plugin-added details (e.g. "Unit pricing
// measure") use `display_key`/`display_value` instead.
export interface StoreApiCartItemVariation {
  attribute: string;
  value: string;
}
export interface StoreApiCartItemData {
  display_key: string;
  display_value: string;
}

export interface StoreApiCartItem {
  key: string;
  id: number;
  quantity: number;
  quantity_limits: { minimum: number; maximum: number };
  name: string;
  permalink: string;
  images: { thumbnail: string; alt: string }[];
  // Which variation options were picked (e.g. Size) — empty for a simple product
  variation: StoreApiCartItemVariation[];
  // Extra per-item details some plugins attach (e.g. "Unit pricing measure")
  item_data: StoreApiCartItemData[];
  // `price` is whatever plan is actually active for this line (already discounted for a
  // monthly/every_3_months item) — `regular_price` is the product's true undiscounted unit price,
  // the same regardless of which plan the line is on. CartTable.tsx's "what you'd pay" preview
  // radios must base their hypothetical options on `regular_price`, not `price` — using `price`
  // for an already-discounted line double-discounted the preview (e.g. 10% off of 75.60 instead of
  // 10% off of 84.00).
  prices: StoreApiMoney & { price: string; regular_price: string };
  totals: StoreApiMoney & { line_subtotal: string };
}

export interface StoreApiShippingRate {
  rate_id: string;
  name: string;
  price: string;
  selected: boolean;
  currency_minor_unit: number;
  currency_symbol: string;
  meta_data: { key: string; value: string }[];
}

export interface StoreApiShippingPackage {
  package_id: number;
  name: string;
  shipping_rates: StoreApiShippingRate[];
}

export interface StoreApiAddress {
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface StoreApiCart {
  items: StoreApiCartItem[];
  items_count: number;
  coupons: { code: string; totals: { total_discount: string } }[];
  totals: StoreApiMoney & {
    total_items: string;
    total_price: string;
    total_discount: string;
    total_shipping: string | null;
  };
  needs_shipping: boolean;
  shipping_address: StoreApiAddress;
  shipping_rates: StoreApiShippingPackage[];
}

// Store API amounts are integer minor units (e.g. "1444" = €14.44) — divide by 10^currency_minor_unit.
export function formatMoney(amount: string, money: StoreApiMoney): string {
  const value = Number(amount) / 10 ** money.currency_minor_unit;
  return `${money.currency_symbol}${value.toFixed(money.currency_minor_unit)}`;
}

// Headless frontend + separate WP origin means no shared cookie jar — the Store API's own
// Nonce/Cart-Token headers carry the cart session instead (its documented headless pattern).
const NONCE_KEY = "wc_store_nonce";
const CART_TOKEN_KEY = "wc_cart_token";

function readSession() {
  return {
    nonce: localStorage.getItem(NONCE_KEY),
    cartToken: localStorage.getItem(CART_TOKEN_KEY),
  };
}

function saveSession(res: Response) {
  const nonce = res.headers.get("Nonce");
  const cartToken = res.headers.get("Cart-Token");
  if (nonce) localStorage.setItem(NONCE_KEY, nonce);
  if (cartToken) localStorage.setItem(CART_TOKEN_KEY, cartToken);
}

async function storeFetchOnce(path: string, options: RequestInit): Promise<Response> {
  const { nonce, cartToken } = readSession();
  const res = await fetch(`${STORE_API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(nonce ? { Nonce: nonce } : {}),
      ...(cartToken ? { "Cart-Token": cartToken } : {}),
      ...(options.headers || {}),
    },
  });
  saveSession(res);
  return res;
}

// A cached nonce/cart-token can go stale — session expired or recreated server-side (403), or this
// tab's cached Cart-Token no longer matches the session's current cart, e.g. another tab mutated the
// same cart and overwrote localStorage's token (409 Conflict) — in both cases the Store API rejects an
// otherwise-valid request for something that's really just a stale local header. Retry exactly once
// with a freshly-fetched nonce/token instead of surfacing either to the user as a hard failure.
async function storeFetch(path: string, options: RequestInit = {}): Promise<StoreApiCart> {
  let res = await storeFetchOnce(path, options);
  if (res.status === 403 || res.status === 409) {
    localStorage.removeItem(NONCE_KEY);
    localStorage.removeItem(CART_TOKEN_KEY);
    await getCart();
    res = await storeFetchOnce(path, options);
  }
  if (!res.ok) throw new Error(`Store API ${path} failed: ${res.status}`);
  return res.json();
}

async function ensureNonce() {
  if (!localStorage.getItem(NONCE_KEY)) await getCart();
}

export async function getCart(): Promise<StoreApiCart> {
  return storeFetch("");
}

// "plan" (one_time/monthly/every_3_months) is forwarded to our custom ark/v1/cart/add-item
// WordPress endpoint (see /api/cart/[...action]/route.ts) so the backend tags the cart item
// and applies the real 10% discount — WooCommerce's own Store API add-item has no field for
// this, so a plain add-item call can't tell "subscribe" apart from "buy now" and always merges
// same-product adds into one line.
export async function addToCart(id: number, quantity = 1, plan: string = "one_time"): Promise<StoreApiCart> {
  await ensureNonce();
  return storeFetch("/add-item", { method: "POST", body: JSON.stringify({ id, quantity, plan }) });
}

export async function updateItemQuantity(key: string, quantity: number): Promise<StoreApiCart> {
  await ensureNonce();
  return storeFetch("/update-item", { method: "POST", body: JSON.stringify({ key, quantity }) });
}

export async function removeItem(key: string): Promise<StoreApiCart> {
  await ensureNonce();
  return storeFetch("/remove-item", { method: "POST", body: JSON.stringify({ key }) });
}

export async function applyCoupon(code: string): Promise<StoreApiCart> {
  await ensureNonce();
  return storeFetch("/apply-coupon", { method: "POST", body: JSON.stringify({ code }) });
}

export async function updateShippingAddress(address: Partial<StoreApiAddress>): Promise<StoreApiCart> {
  await ensureNonce();
  return storeFetch("/update-customer", { method: "POST", body: JSON.stringify({ shipping_address: address }) });
}

export async function selectShippingRate(rateId: string, packageId = 0): Promise<StoreApiCart> {
  await ensureNonce();
  return storeFetch("/select-shipping-rate", {
    method: "POST",
    body: JSON.stringify({ package_id: packageId, rate_id: rateId }),
  });
}

// The Cart-Token is how WordPress finds this browser's cart at checkout. Browser-only (localStorage).
export function getCartToken(): string | null {
  return readSession().cartToken;
}
