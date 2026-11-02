// src/store/cart.ts
import { create } from "zustand";
import {
  addToCart as apiAddToCart,
  getCart,
  updateItemQuantity as apiUpdateItemQuantity,
  removeItem as apiRemoveItem,
  applyCoupon as apiApplyCoupon,
  type StoreApiCart,
} from "@/lib/storeApi";

export interface LastAdded {
  name: string;
  image?: string;
}

interface CartState {
  cart: StoreApiCart | null;
  pendingId: number | null;
  justAddedId: number | null;
  pendingKey: string | null;
  lastAdded: LastAdded | null;
  hydrate: () => Promise<void>;
  addItem: (id: number, name: string, image?: string) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  dismissToast: () => void;
}

// Mirrors the WooCommerce Store API cart client-side for instant UI feedback — the Store API response is always the source of truth.
export const useCartStore = create<CartState>((set) => ({
  cart: null,
  pendingId: null,
  justAddedId: null,
  pendingKey: null,
  lastAdded: null,

  hydrate: async () => {
    const cart = await getCart();
    set({ cart });
  },

  addItem: async (id, name, image) => {
    set({ pendingId: id });
    try {
      const cart = await apiAddToCart(id, 1);
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
      set({ cart, pendingKey: null });
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

  dismissToast: () => set({ lastAdded: null }),
}));
