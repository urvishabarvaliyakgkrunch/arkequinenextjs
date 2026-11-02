// src/lib/storeApi.ts
// Client-safe cart calls — routed through our own /api/cart/* proxy (src/app/api/cart/) rather than
// the WP backend directly: the backend's real Store API responses don't send Access-Control-Allow-Origin
// (only its OPTIONS preflight does), so a direct cross-origin browser fetch fails with "Failed to fetch".
const STORE_API = "/api/cart";

export interface StoreApiCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  images: { src: string }[];
}

export interface StoreApiCart {
  items: StoreApiCartItem[];
  items_count: number;
  totals: { total_price: string; currency_minor_unit: number };
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

async function storeFetch(path: string, options: RequestInit = {}): Promise<StoreApiCart> {
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
  if (!res.ok) throw new Error(`Store API ${path} failed: ${res.status}`);
  return res.json();
}

export async function getCart(): Promise<StoreApiCart> {
  return storeFetch("");
}

export async function addToCart(id: number, quantity = 1): Promise<StoreApiCart> {
  // A POST needs a nonce issued by a prior GET — fetch one first on a fresh session.
  if (!localStorage.getItem(NONCE_KEY)) {
    await getCart();
  }
  return storeFetch("/add-item", {
    method: "POST",
    body: JSON.stringify({ id, quantity }),
  });
}
