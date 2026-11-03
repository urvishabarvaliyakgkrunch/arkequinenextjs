// src/app/basket/page.tsx
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
      <main className="mx-auto max-w-[1210px] px-10 py-[25px] min-[1290px]:px-0">
        {!hasMounted ? (
          <Skeleton className="h-[300px] w-full" />
        ) : isEmpty ? (
          // Matches live .cart-empty.woocommerce-info box + .button.wc-backward (measured via computed styles)
          <>
            <div className="mb-5 rounded-[2px] border border-ark-border bg-white p-[19px] text-[17px] leading-[28px] text-ark-btn-text">
              Your basket is currently empty.
            </div>
            <Link
              href="/shop"
              className="mt-1 inline-block rounded-[2px] bg-ark-price p-[15px] text-[12px] leading-[12px] text-white"
            >
              Return to shop
            </Link>
          </>
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
