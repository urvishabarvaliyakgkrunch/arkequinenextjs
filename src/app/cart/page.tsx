// src/app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CartTable from "@/components/cart/CartTable";
import CartCouponRow from "@/components/cart/CartCouponRow";
import CartTotals from "@/components/cart/CartTotals";
import Skeleton from "@/components/ui/Skeleton";
import { useCartStore } from "@/store/cart";

// Store API cart has no server data to fetch ahead of time — it's whatever the visitor's own
// cart session holds, read client-side on mount (clauderules D1: cart is never cached/SSR'd).
export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const hydrate = useCartStore((s) => s.hydrate);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    hydrate()
      .catch(() => {})
      .finally(() => setHasMounted(true));
  }, [hydrate]);

  const isEmpty = hasMounted && (!cart || cart.items.length === 0);

  return (
    <>
      <PageHeaderBar title="Basket" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Basket" }]} />
      <main className="mx-auto max-w-[1210px] px-4 py-[25px]">
        {!hasMounted ? (
          <Skeleton className="h-[300px] w-full" />
        ) : isEmpty ? (
          <p className="text-[14px] text-ark-btn-text">
            Your basket is currently empty.{" "}
            <Link href="/shop" className="text-ark-price underline">
              Return to shop
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            <div>
              <CartTable cart={cart!} />
              <CartCouponRow />
            </div>
            <CartTotals cart={cart!} />
          </div>
        )}
      </main>
    </>
  );
}
