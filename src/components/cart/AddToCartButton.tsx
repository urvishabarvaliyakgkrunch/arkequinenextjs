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
<<<<<<< Updated upstream
      className="flex flex-1 cursor-pointer items-center justify-center gap-1 p-[3px] text-center leading-[15px] disabled:cursor-wait"
=======
      className={`${className} disabled:cursor-wait`}
>>>>>>> Stashed changes
    >
      {isPending ? "Adding…" : children}
    </button>
  );
}
