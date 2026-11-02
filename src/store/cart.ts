// src/store/cart.ts
import { create } from "zustand";
import { addToCart as apiAddToCart, getCart, type StoreApiCart } from "@/lib/storeApi";

export interface LastAdded {
  name: string;
  image?: string;
}

interface CartState {
  cart: StoreApiCart | null;
  pendingId: number | null;
  lastAdded: LastAdded | null;
  hydrate: () => Promise<void>;
  addItem: (id: number, name: string, image?: string) => Promise<void>;
  dismissToast: () => void;
}

// Mirrors the WooCommerce Store API cart client-side for instant UI feedback — the Store API response is always the source of truth.
export const useCartStore = create<CartState>((set) => ({
  cart: null,
  pendingId: null,
  lastAdded: null,

  hydrate: async () => {
    const cart = await getCart();
    set({ cart });
  },

  addItem: async (id, name, image) => {
    set({ pendingId: id });
    try {
      const cart = await apiAddToCart(id, 1);
      set({ cart, pendingId: null, lastAdded: { name, image } });
    } catch (err) {
      set({ pendingId: null });
      throw err;
    }
  },

  dismissToast: () => set({ lastAdded: null }),
}));
