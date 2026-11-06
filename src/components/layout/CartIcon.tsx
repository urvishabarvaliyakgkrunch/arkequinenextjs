// src/components/layout/CartIcon.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/storeApi";
import { useCartStore } from "@/store/cart";

// Header basket: reads the same cart store as the add-to-cart buttons and the /cart page, so every page stays in sync.
export default function CartIcon() {
  const cart = useCartStore((s) => s.cart);
  const lastKnownCount = useCartStore((s) => s.lastKnownCount);
  const hydrate = useCartStore((s) => s.hydrateIfActive);

  useEffect(() => {
    hydrate().catch(() => {});
  }, [hydrate]);

  const items = cart?.items ?? [];
  // lastKnownCount is always kept in step with every cart mutation (including optimistically, before
  // the real response lands) — `cart.items_count` lags behind it right after an optimistic add/update,
  // so the badge must read lastKnownCount, not cart.items_count, or it won't look instant.
  //
  // Read directly (no mount-gate/useEffect): SSR has no localStorage so the server markup always has
  // count 0, but React's hydration itself reconciles the mismatch to this client value the moment it
  // hydrates — waiting for an extra effect tick (the old `mounted` flag) just added a second, visible
  // delay on pages with a lot to hydrate (e.g. /shop's full grid), which is what made the "stuck on 0"
  // window look tied to the slow cart fetch when it was actually tied to hydration timing instead.
  const count = lastKnownCount;
  const subtotal = cart ? formatMoney(cart.totals.total_price, cart.totals) : "";
  return (
    <div className="group relative shrink-0 lg:absolute lg:top-1/2 lg:-right-[2px] lg:-translate-y-1/2">
      <Link
        href="/basket/"
        aria-label="Shopping Cart"
        className="relative flex h-[46px] w-[46px] items-center justify-center rounded-[2px] border border-border bg-white text-ink-dark transition-colors duration-300 group-hover:text-primary"
      >
        <svg
          viewBox="0 0 29 32"
          width="13.59"
          height="15"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM20.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM10.496 19.648q-1.152 0.32-1.088 0.736t1.408 0.416h17.984v2.432q0 0.64-0.64 0.64h-20.928q-0.64 0-0.64-0.64v-2.432l-0.32-1.472-3.136-14.528h-3.136v-2.56q0-0.64 0.64-0.64h4.992q0.64 0 0.64 0.64v2.752h22.528v8.768q0 0.704-0.576 0.832z" />
        </svg>
        {count > 0 && (
          // Server always renders count 0 (no localStorage during SSR) — this badge intentionally
          // differs once the client hydrates with the real last-known count, so don't warn about it.
          <span
            suppressHydrationWarning
            className="absolute top-[1px] right-[1px] flex h-4 w-4 items-center justify-center rounded-full bg-ink-dark text-[11px] leading-none text-white"
          >
            {count}
          </span>
        )}
      </Link>
      {/* Mini-cart: opens on hover/focus like the live site. */}
      <div className="invisible absolute top-full right-[7px] z-[300] w-[280px] pt-[8px] opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <span
          aria-hidden="true"
          className="absolute top-[3px] right-[10px] h-[10px] w-[10px] rotate-45 border-t border-l border-border bg-white"
        />
        <div className="relative rounded-[2px] border border-border bg-white text-left shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
          {items.length === 0 ? (
            <p className="p-[10px] text-[11px] leading-[18px] text-muted">
              {count > 0 ? "Loading basket…" : "No products in the basket."}
            </p>
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between gap-[10px] border-b border-border p-[12px] last:border-b-0 hover:bg-[#e1e1e1]"
                  >
                    <div className="min-w-0">
                      <Link href="/basket/" className="block text-[12px] leading-[18px] font-bold text-ink-dark">
                        {item.name}
                      </Link>
                      <span className="block text-[12px] leading-[18px] text-muted">
                        {/* Optimistic row (cart.ts addItem) has no real Store API price yet — the real
                            response replaces this item within a couple seconds. */}
                        {item.key.startsWith("optimistic-")
                          ? `${item.quantity} × Adding…`
                          : `${item.quantity} × ${formatMoney(item.prices.price, item.prices)}`}
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
              <p className="border-t border-border px-[12px] py-[12px] text-[13px] leading-[18px] text-muted">
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
