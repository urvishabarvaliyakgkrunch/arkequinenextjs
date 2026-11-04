// src/app/basket/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CartTable from "@/components/cart/CartTable";
import CartCouponRow from "@/components/cart/CartCouponRow";
import CartTotals from "@/components/cart/CartTotals";
import CartPageSkeleton from "@/components/cart/CartPageSkeleton";
import { useCartStore } from "@/store/cart";

// Store API cart has no server data to fetch ahead of time — it's whatever the visitor's own
// cart session holds, read client-side on mount (clauderules D1: cart is never cached/SSR'd).
export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const hydrate = useCartStore((s) => s.hydrate);
  // The header's basket icon hydrates the same store on every page, so by the time someone clicks
  // through to /basket the cart is usually already loaded — show it right away instead of flashing
  // a skeleton over data we already have. Only a genuinely first load (cart still null) waits.
  const [hasMounted, setHasMounted] = useState(cart !== null);
  // A failed fetch (network down, backend unreachable) must not look like "cart is empty" — those
  // are different facts and the empty-state copy/CTA ("Return to shop") is actively wrong for a
  // fetch failure, since the basket might not be empty at all, we just couldn't ask.
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    hydrate()
      .then(() => setLoadError(false))
      .catch(() => setLoadError(true))
      .finally(() => setHasMounted(true));
  }, [hydrate]);

  const isEmpty = hasMounted && !loadError && (!cart || cart.items.length === 0);

  return (
    <>
      <PageHeaderBar title="Basket" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Basket" }]} />
      <main className="mx-auto max-w-[1210px] px-10 py-[25px] min-[1290px]:px-0">
        {!hasMounted ? (
          <CartPageSkeleton />
        ) : loadError ? (
          <div className="mb-5 rounded-[2px] border border-ark-border bg-white p-[19px] text-[17px] leading-[28px] text-ark-btn-text">
            Couldn&apos;t load your basket. Check your connection and{" "}
            <button
              type="button"
              onClick={() => {
                setHasMounted(false);
                hydrate()
                  .then(() => setLoadError(false))
                  .catch(() => setLoadError(true))
                  .finally(() => setHasMounted(true));
              }}
              className="cursor-pointer text-ark-price underline"
            >
              try again
            </button>
            .
          </div>
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
