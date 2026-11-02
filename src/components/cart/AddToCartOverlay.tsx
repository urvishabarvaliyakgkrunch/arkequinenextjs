// src/components/cart/AddToCartOverlay.tsx
"use client";

import { useCartStore } from "@/store/cart";

// Matches ark-equine.com's add-to-cart feedback on the thumbnail itself: a white circle badge that
// shows a spinner while the request is in flight, then swaps to a checkmark for a moment on success
// (their .adding-to-cart-loading / .added-to-cart-check classes over the product image).
export default function AddToCartOverlay({ productId }: { productId: number }) {
  const isLoading = useCartStore((s) => s.pendingId === productId);
  const isSuccess = useCartStore((s) => s.justAddedId === productId);

  if (!isLoading && !isSuccess) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-ark-border border-t-ark-price" />
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#0fa7ac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
