// src/components/cart/AddToCartButton.tsx
"use client";

import type { ReactNode } from "react";
import { useCartStore } from "@/store/cart";

export default function AddToCartButton({
  productId,
  name,
  image,
  children,
}: {
  productId: number;
  name: string;
  image?: string;
  children: ReactNode;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const pendingId = useCartStore((s) => s.pendingId);
  const isPending = pendingId === productId;

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        addItem(productId, name, image).catch(() => {});
      }}
      className="flex flex-1 items-center justify-center gap-1 text-center disabled:cursor-wait"
    >
      {isPending ? "Adding…" : children}
    </button>
  );
}
