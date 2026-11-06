// src/components/landing/LandingCart.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatMoney } from "@/lib/storeApi";
import { useCartStore } from "@/store/cart";

// Same cart store as the add-to-cart buttons, so the badge and mini-cart stay in sync on every page
export default function LandingCart() {
  const cart = useCartStore((s) => s.cart);
  const lastKnownCount = useCartStore((s) => s.lastKnownCount);
  const hydrate = useCartStore((s) => s.hydrateIfActive);
  // `cart` is now pre-filled on the client from a cached last-known snapshot (see cart.ts's
  // readLastCart) so the basket page can skip its loading skeleton — but SSR has no localStorage, so
  // the server-rendered HTML never has that cache and `cart` is always null there. The badge's own
  // number is handled below with suppressHydrationWarning (a safe one-level text mismatch), but the
  // hover dropdown's item list is a structural branch (empty-state vs real list) that needs its first
  // client render to actually match the server's empty-cart output — hence gating it on `mounted` and
  // only swapping in the cached items after that first paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    hydrate().catch(() => {});
  }, [hydrate]);

  // The dropdown opens on plain CSS :hover — clicking "View basket" navigates client-side without the
  // mouse actually moving, so the cursor is still sitting over the same spot on the new page and the
  // CSS :hover never turns off. Force it shut on every route change instead.
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const items = mounted ? (cart?.items ?? []) : [];
  // lastKnownCount (not cart.items_count) — it's kept in step with every optimistic cart change, and
  // was already safe to read on the very first client render even before the cache-on-init change.
  const count = lastKnownCount;
  // WCSATT (backend) applies the real plan discount before the Store API response is built, so
  // cart.totals.total_items is already correct — no client-side recompute needed (see
  // scratch-ark-subscription-plan-backend-snippet.php and CartTable.tsx's ItemSubtotal).
  const subtotal = cart ? formatMoney(cart.totals.total_items, cart.totals) : "";

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
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
        {/* Server always renders 0 (no localStorage during SSR). Next.js 16's dev overlay now blocks
            the whole page on any unsuppressed text mismatch (not just a quiet console warning like
            before), so showing the raw client count here isn't viable anymore. Same `mounted` gate as
            the dropdown's item list below: both render 0 on the very first paint (matching the
            server), then swap to the real count a frame later via the mount effect — no mismatch, and
            no "frozen at 0" problem either, since this is a real state update, not suppressHydrationWarning. */}
        <span className="-mt-5 -ml-[2px] h-[18px] w-[18px] rounded-full bg-teal text-center text-[10px] leading-[18px] text-white">
          {mounted ? count : 0}
        </span>
      </Link>
      <div
        className={`absolute top-full right-0 z-[300] w-[280px] pt-2 transition-opacity duration-200 max-[900px]:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="rounded-[2px] border border-border bg-white text-left shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
          {/* items.length (not count) — items is forced to [] until `mounted`, so this branch choice
              matches the server's empty-cart render on the very first client paint too. */}
          {items.length === 0 ? (
            <p className="p-[10px] text-[11px] leading-[18px] text-muted">No products in the basket.</p>
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li key={item.key} className="flex items-center justify-between gap-[10px] border-b border-border p-3 last:border-b-0 hover:bg-[#e1e1e1]">
                    <div className="min-w-0">
                      <Link href="/basket/" className="block text-[12px] leading-[18px] font-bold text-ink-dark">{item.name}</Link>
                      <span className="block text-[12px] leading-[18px] text-muted">
                        {/* Optimistic row (cart.ts addItem) has no real Store API price yet — it's a
                            placeholder "0" until the real response replaces this item, a couple
                            seconds later. Showing that as "€0.00" read as a price glitch, not a loading
                            state, so show a transient label instead until the real price lands. */}
                        {item.key.startsWith("optimistic-")
                          ? `${item.quantity} × …`
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
              <p className="border-t border-border p-3 text-[13px] leading-[18px] text-muted">
                <strong className="text-ink-dark">Subtotal:</strong> {subtotal}
              </p>
              <div className="flex bg-[#e1e1e1] text-[13px] font-bold text-ink-dark">
                <Link href="/basket/" onClick={() => setOpen(false)} className="flex-1 py-[14px] text-center">View basket</Link>
                <a href={`${process.env.NEXT_PUBLIC_WP_URL}/checkout/`} onClick={() => setOpen(false)} className="flex-1 py-[14px] text-center">Checkout</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
