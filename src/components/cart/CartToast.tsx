// src/components/cart/CartToast.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";

// Mounted once in layout.tsx — pops up top-right whenever addItem() succeeds, matches ark-equine.com's add-to-cart notice.
export default function CartToast() {
  const lastAdded = useCartStore((s) => s.lastAdded);
  const dismissToast = useCartStore((s) => s.dismissToast);

  useEffect(() => {
    if (!lastAdded) return;
    const timer = setTimeout(dismissToast, 4000);
    return () => clearTimeout(timer);
  }, [lastAdded, dismissToast]);

  if (!lastAdded) return null;

  return (
    <div
      role="status"
      className="fixed top-[100px] right-4 z-[60] flex w-[280px] items-center gap-3 border border-border bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
    >
      <div className="flex-1">
        <p className="text-[13px] font-bold text-primary">&quot;{lastAdded.name}&quot;</p>
        <p className="text-[12px] text-muted">was added to the cart</p>
      </div>
      {lastAdded.image ? (
        <Image src={lastAdded.image} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
      ) : null}
    </div>
  );
}
