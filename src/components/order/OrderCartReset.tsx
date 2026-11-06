// src/components/order/OrderCartReset.tsx
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

// Once the order is paid, ask the Store API for the cart again so the header badge and basket show the real (emptied) cart
export default function OrderCartReset() {
  const hydrate = useCartStore((s) => s.hydrate);

  useEffect(() => {
    // A failed refresh is harmless here: the next page that reads the cart will try again
    hydrate().catch(() => {});
  }, [hydrate]);

  return null;
}
