// src/components/cart/AddToCartButton.tsx
"use client";

import type { ReactNode } from "react";
import { useCartStore } from "@/store/cart";

export default function AddToCartButton({
  productId,
  name,
  image,
  quantity = 1,
  className = "flex flex-1 cursor-pointer items-center justify-center gap-1 text-center",
  children,
}: {
  productId: number;
  name: string;
  image?: string;
  quantity?: number;
  className?: string;
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
        addItem(productId, name, image, quantity).catch(() => {});
      }}
      className={`${className} disabled:cursor-wait`}
    >
      {isPending ? "Adding…" : children}
    </button>
  );
}
