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

interface CartState {
  cart: StoreApiCart | null;
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
  hydrate: () => Promise<void>;
  addItem: (id: number, name: string, image?: string, quantity?: number) => Promise<void>;
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

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  pendingId: null,
  justAddedId: null,
  pendingKey: null,
  lastAdded: null,
  selectedPlans: {},
  confirmedPlans: {},
  applyingPlans: false,

  hydrate: () => {
    hydrating ??= getCart()
      .then((cart) => set({ cart }))
      .finally(() => {
        hydrating = null;
      });
    return hydrating;
  },

  addItem: async (id, name, image, quantity = 1) => {
    set({ pendingId: id });
    try {
      const cart = await apiAddToCart(id, quantity);
      set({ cart, pendingId: null, lastAdded: { name, image }, justAddedId: id });
      // Checkmark badge over the product image fades back out on its own, like the live site's.
      setTimeout(() => {
        set((s) => (s.justAddedId === id ? { justAddedId: null } : {}));
      }, 1500);
    } catch (err) {
      set({ pendingId: null });
      throw err;
    }
  },

  updateQuantity: async (key, quantity) => {
    set({ pendingKey: key });
    try {
      const cart = await apiUpdateItemQuantity(key, quantity);
      // A direct +/- quantity edit invalidates any staged/confirmed plan for this item — let it
      // fall back to being derived from the new real quantity instead of lying about the plan.
      set((s) => {
        const { [key]: _selected, ...selectedPlans } = s.selectedPlans;
        const { [key]: _confirmed, ...confirmedPlans } = s.confirmedPlans;
        return { cart, pendingKey: null, selectedPlans, confirmedPlans };
      });
    } catch (err) {
      set({ pendingKey: null });
      throw err;
    }
  },

  removeItem: async (key) => {
    set({ pendingKey: key });
    try {
      const cart = await apiRemoveItem(key);
      set({ cart, pendingKey: null });
    } catch (err) {
      set({ pendingKey: null });
      throw err;
    }
  },

  applyCoupon: async (code) => {
    const cart = await apiApplyCoupon(code);
    set({ cart });
  },

  updateShippingAddress: async (address) => {
    const cart = await apiUpdateShippingAddress(address);
    set({ cart });
  },

  selectShippingRate: async (rateId, packageId = 0) => {
    const cart = await apiSelectShippingRate(rateId, packageId);
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
          updatedCart = await apiUpdateItemQuantity(item.key, quantity);
        }
        nextConfirmed[item.key] = plan;
      }
      set({ cart: updatedCart, confirmedPlans: nextConfirmed, applyingPlans: false });
    } catch (err) {
      set({ applyingPlans: false });
      throw err;
    }
  },

  dismissToast: () => set({ lastAdded: null }),
}));
