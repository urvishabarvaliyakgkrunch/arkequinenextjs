// src/store/cart.ts
import { create } from "zustand";
import {
  addToCart as apiAddToCart,
  getCart,
  updateItemQuantity as apiUpdateItemQuantity,
  removeItem as apiRemoveItem,
  applyCoupon as apiApplyCoupon,
  updateShippingAddress as apiUpdateShippingAddress,
  selectShippingRate as apiSelectShippingRate,
  type StoreApiCart,
  type StoreApiAddress,
} from "@/lib/storeApi";

export interface LastAdded {
  name: string;
  image?: string;
}

// WooCommerce Subscriptions/WCSATT scheme pricing isn't reachable over the Store API (no read, no
// write) without a backend change — tried faking it by setting quantity to 3 for "every 3 months",
// but that computes qty × full price (e.g. €252), not WCSATT's real discounted total (e.g. €226.80),
// which is actively wrong, not just cosmetic. Don't resurrect that — it needs the backend extension.
export type SubscriptionPlan = "one_time" | "monthly" | "every_3_months";

export function planToQuantity(plan: SubscriptionPlan): number {
  return plan === "every_3_months" ? 3 : 1;
}

export function quantityToPlan(quantity: number): SubscriptionPlan {
  return quantity === 3 ? "every_3_months" : "one_time";
}

// Backend WP database drops intermittently (seen 500s from Store API) — without this, a failed hydrate
// leaves `cart` null and the header badge flashes 0 even though the real cart still has items.
const LAST_COUNT_KEY = "wc_cart_last_count";

function readLastCount(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(LAST_COUNT_KEY)) || 0;
}

function persistCount(count: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_COUNT_KEY, String(count));
}

// The real GET /api/cart round trip is ~3s (backend latency, see PROJECT-CONTEXT.md) — on every page
// load that meant /basket sat on its skeleton for that whole 3s, every single time, even though the
// cart rarely changed between visits. Caching the last-seen cart snapshot lets the page render the
// real table immediately from cache while hydrate() quietly confirms/corrects it in the background —
// same pattern as the header badge's lastKnownCount, just for the whole cart object.
const LAST_CART_KEY = "wc_cart_last_snapshot";

function readLastCart(): StoreApiCart | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_CART_KEY);
    return raw ? (JSON.parse(raw) as StoreApiCart) : null;
  } catch {
    return null;
  }
}

function persistCart(cart: StoreApiCart | null) {
  if (typeof window === "undefined") return;
  if (cart) localStorage.setItem(LAST_CART_KEY, JSON.stringify(cart));
  else localStorage.removeItem(LAST_CART_KEY);
}

// confirmedPlans used to live only in memory — fine for the same tab/session, but a fresh page load
// (new tab, hard refresh, or just clicking the mini-cart's "View basket" link on some navigations)
// re-runs the whole module, wiping it back to {}. The basket page then fell back to
// quantityToPlan(item.quantity), which can't tell "monthly" (qty 1) apart from "one-time" (also qty
// 1) — so a product-page "Subscribe → Every month" pick silently reverted to showing the full price.
// Persisting this the same way as the cart snapshot fixes it.
const CONFIRMED_PLANS_KEY = "wc_cart_confirmed_plans";

function readConfirmedPlans(): Record<string, SubscriptionPlan> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CONFIRMED_PLANS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, SubscriptionPlan>) : {};
  } catch {
    return {};
  }
}

function persistConfirmedPlans(plans: Record<string, SubscriptionPlan>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONFIRMED_PLANS_KEY, JSON.stringify(plans));
}

interface CartState {
  cart: StoreApiCart | null;
  lastKnownCount: number;
  pendingId: number | null;
  justAddedId: number | null;
  pendingKey: string | null;
  lastAdded: LastAdded | null;
  selectedPlans: Record<string, SubscriptionPlan>;
  // The plan last committed via "Update basket" — quantity alone can't tell "monthly" apart from
  // "one-time" (both are quantity 1), so this is what selectedPlans is compared against to decide
  // whether a radio pick is actually new. Falls back to quantityToPlan(item.quantity) when unset.
  confirmedPlans: Record<string, SubscriptionPlan>;
  applyingPlans: boolean;
   hydrateIfActive: () => Promise<void>;
   hydrate: () => Promise<void>;
  addItem: (
    id: number,
    name: string,
    image?: string,
    quantity?: number,
    plan?: SubscriptionPlan,
  ) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  updateShippingAddress: (address: Partial<StoreApiAddress>) => Promise<void>;
  selectShippingRate: (rateId: string, packageId?: number) => Promise<void>;
  setPlan: (key: string, plan: SubscriptionPlan) => void;
  applyPlans: () => Promise<void>;
  dismissToast: () => void;
}

export function getConfirmedPlan(
  confirmedPlans: Record<string, SubscriptionPlan>,
  key: string,
  quantity: number
): SubscriptionPlan {
  return confirmedPlans[key] ?? quantityToPlan(quantity);
}

// Mirrors the WooCommerce Store API cart client-side for instant UI feedback — the Store API response is always the source of truth.
// One cart read at a time: header icon and cart page both hydrate on mount, they share the same request
let hydrating: Promise<void> | null = null;

// Rapid-fire add/remove clicks (e.g. 5-6 "Add to basket" clicks on the shop grid) used to fire their
// Store API calls concurrently — whichever response landed last fully overwrote `cart`, so an item
// added earlier could vanish if its own request happened to resolve after a later one. The optimistic
// local update already made every click feel instant, so there's no UI cost to running the *real*
// network calls strictly one-at-a-time in click order instead — this queue does that.
let mutationQueue: Promise<unknown> = Promise.resolve();
function enqueueMutation<T>(task: () => Promise<T>): Promise<T> {
  const run = mutationQueue.then(task, task);
  mutationQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

// Bumped by every optimistic local change (add/update/remove). hydrate() is a passive background
// resync — if it started before the user's click and its response lands after, applying it blindly
// would stomp the optimistic state with pre-click data (the badge would flicker back down, an item
// would "come back"). hydrate() snapshots this at call time and skips applying its result if a mutation
// has started since — that mutation's own response (already queued) is the current truth instead.
let cartVersion = 0;

export const useCartStore = create<CartState>((set, get) => ({
  cart: readLastCart(),
  lastKnownCount: readLastCount(),
  pendingId: null,
  justAddedId: null,
  pendingKey: null,
  lastAdded: null,
  selectedPlans: {},
  confirmedPlans: readConfirmedPlans(),
  applyingPlans: false,

  hydrate: () => {
    const versionAtStart = cartVersion;
    // Also goes through the mutation queue — otherwise a hydrate() fired while an add/remove is still
    // in flight (e.g. a page navigation right after a click) could land first with a stale snapshot
    // and overwrite the in-progress optimistic/real update.
    hydrating ??= enqueueMutation(getCart)
      .then((cart) => {
        // A mutation started after this hydrate began — its own (queued, more current) response will
        // land next; applying this older snapshot now would just stomp it straight back out.
        if (cartVersion !== versionAtStart) return;
        persistCount(cart.items_count);
        persistCart(cart);
        set({ cart, lastKnownCount: cart.items_count });
      })
      .finally(() => {
        hydrating = null;
      });
    return hydrating;
  },

  // Header calls this on every page: a visitor who never added anything has nothing to sync, so skip
  // the /api/cart function run + WordPress request. addItem fetches its own nonce, so the first add still works.
  hydrateIfActive: () => (get().lastKnownCount > 0 ? get().hydrate() : Promise.resolve()),

  // Optimistic: the real backend add-item round trip is ~3s (see PROJECT-CONTEXT.md), so the badge
  // count/toast/checkmark/mini-cart row update instantly here and the real request runs in the
  // background. Only revert (count + toast + mini-cart row) if the backend actually rejects it.
  addItem: async (id, name, image, quantity = 1, plan) => {
    const prevCart = get().cart;
    const prevCount = get().lastKnownCount;
    const optimisticCount = prevCount + quantity;
    // Already in the cart (same product, no variation picked here): bump its existing row's quantity
    // in place instead of appending a second "new" row that only merges away once the real response
    // lands — that's what made it look like a duplicate flashed up then turned into a qty update.
    const existing = prevCart?.items.find((i) => i.id === id && !i.key.startsWith("optimistic-"));
    // We don't have the real Store API price yet (only the GraphQL-side name/image), so a brand-new
    // mini-cart row shows this item with a placeholder price until the real response replaces it — see
    // CartIcon.tsx, which special-cases this key prefix to show "Adding…" instead of formatMoney() on a fake "0".
    const optimisticItem: StoreApiCart["items"][number] = {
      key: `optimistic-${id}`,
      id,
      quantity,
      quantity_limits: { minimum: 1, maximum: 99 },
      name,
      permalink: "",
      images: [{ thumbnail: image ?? "", alt: name }],
      variation: [],
      item_data: [],
      prices: { currency_minor_unit: 2, currency_symbol: "", price: "0" },
      totals: { currency_minor_unit: 2, currency_symbol: "", line_subtotal: "0" },
    };
    const optimisticCart = prevCart
      ? {
          ...prevCart,
          items: existing
            ? prevCart.items.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i))
            : [...prevCart.items, optimisticItem],
          items_count: optimisticCount,
        }
      : prevCart;
    const versionAtStart = ++cartVersion;
    persistCount(optimisticCount);
    persistCart(optimisticCart);
    set({
      cart: optimisticCart,
      lastKnownCount: optimisticCount,
      pendingId: null,
      lastAdded: { name, image },
      justAddedId: id,
    });
    // Checkmark badge over the product image fades back out on its own, like the live site's.
    setTimeout(() => {
      set((s) => (s.justAddedId === id ? { justAddedId: null } : {}));
    }, 1500);
    try {
      const cart = await enqueueMutation(() => apiAddToCart(id, quantity));
      persistCount(cart.items_count);
      persistCart(cart);
      // The product page already picked a plan (its quantity already matches planToQuantity(plan)) —
      // record it as confirmed so the basket page's radios land on the right option immediately,
      // instead of falling back to quantityToPlan() which can't tell "monthly" apart from "one-time".
      if (plan && plan !== "one_time") {
        const addedItem = cart.items.find((i) => i.id === id);
        if (addedItem) {
          const nextConfirmed = { ...get().confirmedPlans, [addedItem.key]: plan };
          persistConfirmedPlans(nextConfirmed);
          set({ cart, lastKnownCount: cart.items_count, confirmedPlans: nextConfirmed });
          return;
        }
      }
      set({ cart, lastKnownCount: cart.items_count });
    } catch (err) {
      // Only revert to the pre-click snapshot if nothing else has changed the cart since — otherwise
      // this would stomp a later, unrelated optimistic change (another item added/removed meanwhile).
      // If something else did change, a hydrate() resync (not a local guess) is what should fix it.
      if (cartVersion === versionAtStart) {
        persistCount(prevCount);
        persistCart(prevCart);
        set((s) => ({
          cart: prevCart,
          lastKnownCount: prevCount,
          justAddedId: s.justAddedId === id ? null : s.justAddedId,
          lastAdded: null,
        }));
      }
      throw err;
    }
  },

  // Optimistic: patch the item/count in local state immediately so the basket table doesn't sit on
  // a ~3s spinner for a quantity bump, then reconcile with the real Store API response in the background.
  updateQuantity: async (key, quantity) => {
    const prevCart = get().cart;
    if (!prevCart) return;
    const prevItem = prevCart.items.find((i) => i.key === key);
    if (!prevItem) return;
    const delta = quantity - prevItem.quantity;
    const optimisticCart: StoreApiCart = {
      ...prevCart,
      items: prevCart.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
      items_count: prevCart.items_count + delta,
    };
    const versionAtStart = ++cartVersion;
    persistCount(optimisticCart.items_count);
    persistCart(optimisticCart);
    set({ cart: optimisticCart, lastKnownCount: optimisticCart.items_count, pendingKey: null });
    try {
      const cart = await enqueueMutation(() => apiUpdateItemQuantity(key, quantity));
      persistCount(cart.items_count);
      persistCart(cart);
      // A direct +/- quantity edit invalidates any staged/confirmed plan for this item — let it
      // fall back to being derived from the new real quantity instead of lying about the plan.
      set((s) => {
        const { [key]: _selected, ...selectedPlans } = s.selectedPlans;
        const { [key]: _confirmed, ...confirmedPlans } = s.confirmedPlans;
        persistConfirmedPlans(confirmedPlans);
        return { cart, lastKnownCount: cart.items_count, selectedPlans, confirmedPlans };
      });
    } catch (err) {
      // See addItem's catch: don't stomp a later, unrelated optimistic change with this stale snapshot.
      if (cartVersion === versionAtStart) {
        persistCount(prevCart.items_count);
        persistCart(prevCart);
        set({ cart: prevCart, lastKnownCount: prevCart.items_count });
      }
      throw err;
    }
  },

  removeItem: async (key) => {
    const prevCart = get().cart;
    if (!prevCart) return;
    const removed = prevCart.items.find((i) => i.key === key);
    // A second click on the same "×" before React re-renders (it's not disabled mid-removal) would
    // otherwise fire another real remove-item call for a key that's already gone from the optimistic
    // cart — the Store API answers that with a 409 Conflict, and the resulting catch-block revert is
    // what made removal look like it "didn't work". Already-removed key: nothing left to do.
    if (!removed) return;
    const optimisticCart: StoreApiCart = {
      ...prevCart,
      items: prevCart.items.filter((i) => i.key !== key),
      items_count: prevCart.items_count - (removed?.quantity ?? 0),
    };
    const versionAtStart = ++cartVersion;
    persistCount(optimisticCart.items_count);
    persistCart(optimisticCart);
    set({ cart: optimisticCart, lastKnownCount: optimisticCart.items_count, pendingKey: null });
    try {
      const cart = await enqueueMutation(() => apiRemoveItem(key));
      persistCount(cart.items_count);
      persistCart(cart);
      // Clean up the removed item's stale plan entries — otherwise a later item that happens to land
      // on the same Store API key would incorrectly inherit this one's old confirmed plan.
      set((s) => {
        const { [key]: _selected, ...selectedPlans } = s.selectedPlans;
        const { [key]: _confirmed, ...confirmedPlans } = s.confirmedPlans;
        persistConfirmedPlans(confirmedPlans);
        return { cart, lastKnownCount: cart.items_count, selectedPlans, confirmedPlans };
      });
    } catch (err) {
      // See addItem's catch: don't stomp a later, unrelated optimistic change with this stale snapshot.
      if (cartVersion === versionAtStart) {
        persistCount(prevCart.items_count);
        persistCart(prevCart);
        set({ cart: prevCart, lastKnownCount: prevCart.items_count });
      }
      throw err;
    }
  },

  applyCoupon: async (code) => {
    const cart = await enqueueMutation(() => apiApplyCoupon(code));
    persistCart(cart);
    set({ cart });
  },

  updateShippingAddress: async (address) => {
    const cart = await enqueueMutation(() => apiUpdateShippingAddress(address));
    persistCart(cart);
    set({ cart });
  },

  selectShippingRate: async (rateId, packageId = 0) => {
    const cart = await enqueueMutation(() => apiSelectShippingRate(rateId, packageId));
    persistCart(cart);
    set({ cart });
  },

  setPlan: (key, plan) => set((s) => ({ selectedPlans: { ...s.selectedPlans, [key]: plan } })),

  // Only called from "Update basket" — radio selection alone never touches the cart.
  applyPlans: async () => {
    const { cart, selectedPlans, confirmedPlans } = get();
    if (!cart) return;

    const changed = cart.items.filter((item) => {
      const selected = selectedPlans[item.key];
      return selected && selected !== getConfirmedPlan(confirmedPlans, item.key, item.quantity);
    });
    if (changed.length === 0) return;

    set({ applyingPlans: true });
    try {
      let updatedCart = cart;
      const nextConfirmed = { ...confirmedPlans };
      for (const item of changed) {
        const plan = selectedPlans[item.key];
        const quantity = planToQuantity(plan);
        if (quantity !== item.quantity) {
          updatedCart = await enqueueMutation(() => apiUpdateItemQuantity(item.key, quantity));
        }
        nextConfirmed[item.key] = plan;
      }
      persistCart(updatedCart);
      persistConfirmedPlans(nextConfirmed);
      set({ cart: updatedCart, confirmedPlans: nextConfirmed, applyingPlans: false });
    } catch (err) {
      set({ applyingPlans: false });
      throw err;
    }
  },

  dismissToast: () => set({ lastAdded: null }),
}));
