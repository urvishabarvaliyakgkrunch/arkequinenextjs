// src/components/landing/LandingCart.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/storeApi";
import { useCartStore } from "@/store/cart";

// Same cart store as the add-to-cart buttons, so the badge and mini-cart stay in sync on every page
export default function LandingCart() {
  const cart = useCartStore((s) => s.cart);
  const hydrate = useCartStore((s) => s.hydrate);

  useEffect(() => {
    hydrate().catch(() => {});
  }, [hydrate]);

  const items = cart?.items ?? [];
  const count = cart?.items_count ?? 0;
  const subtotal = cart ? formatMoney(cart.totals.total_price, cart.totals) : "";

  return (
    <div className="group relative">
      <Link
        href="/basket/"
        aria-label="Cart"
        className="flex h-9 w-9 items-center justify-center text-teal transition-colors duration-[250ms] hover:text-teal-deep"
      >
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] max-[900px]:h-5 max-[900px]:w-5" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span className="-mt-5 -ml-[2px] h-[18px] w-[18px] rounded-full bg-teal text-center text-[10px] leading-[18px] text-white">{count}</span>
      </Link>
      <div className="invisible absolute top-full right-0 z-[300] w-[280px] pt-2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 max-[900px]:hidden">
        <div className="rounded-[2px] border border-border bg-white text-left shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
          {count === 0 ? (
            <p className="p-[10px] text-[11px] leading-[18px] text-muted">No products in the basket.</p>
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li key={item.key} className="flex items-center justify-between gap-[10px] border-b border-border p-3 last:border-b-0 hover:bg-[#e1e1e1]">
                    <div className="min-w-0">
                      <Link href="/basket/" className="block text-[12px] leading-[18px] font-bold text-ink-dark">{item.name}</Link>
                      <span className="block text-[12px] leading-[18px] text-muted">
                        {item.quantity} × {formatMoney(item.prices.price, item.prices)}
                      </span>
                    </div>
                    <span className="h-[55px] w-[55px] shrink-0 border border-border bg-white">
                      {item.images[0]?.thumbnail && (
                        // Cart thumbnails come from the Store API and can sit on any WP host, so no next/image here
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.images[0].thumbnail} alt="" loading="lazy" className="h-full w-full object-contain" />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-border p-3 text-[13px] leading-[18px] text-muted">
                <strong className="text-ink-dark">Subtotal:</strong> {subtotal}
              </p>
              <div className="flex bg-[#e1e1e1] text-[13px] font-bold text-ink-dark">
                <Link href="/basket/" className="flex-1 py-[14px] text-center">View basket</Link>
                <a href={`${process.env.NEXT_PUBLIC_WP_URL}/checkout/`} className="flex-1 py-[14px] text-center">Checkout</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
