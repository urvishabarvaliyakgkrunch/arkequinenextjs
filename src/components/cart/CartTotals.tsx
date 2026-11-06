// src/components/cart/CartTotals.tsx
"use client";

import { formatMoney, type StoreApiCart } from "@/lib/storeApi";
import ShippingCalculator from "@/components/cart/ShippingCalculator";
import CheckoutLink from "@/components/cart/CheckoutLink";

// Matches ark-equine.com/basket/'s .cart_totals box — 14px uppercase Millar heading, teal buttons,
// measured live via computed styles.
export default function CartTotals({ cart }: { cart: StoreApiCart }) {
  // WCSATT (backend) applies the real plan discount before the Store API response is built, so
  // cart.totals.total_items/total_price are already correct — no client-side recompute needed
  // (see scratch-ark-subscription-plan-backend-snippet.php and CartTable.tsx's ItemSubtotal).

  return (
    <aside className="w-full md:w-[48%]">
      <h2 className="mb-[10px] font-[family-name:var(--f-head)] text-[14px] font-semibold tracking-[1px] text-ark-title uppercase">
        Basket totals
      </h2>
      <table className="w-full border-collapse border border-ark-border text-[13px]">
        <tbody>
          <tr>
            <th className="border-b border-ark-border p-[6px_24px] w-[37.5%] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">
              Subtotal
            </th>
            <td className="border-b border-ark-border p-[6px_24px] text-left">
              {formatMoney(cart.totals.total_items, cart.totals)}
            </td>
          </tr>
          {cart.coupons.map((coupon) => (
            <tr key={coupon.code}>
              <th className="border-b border-ark-border p-[6px_24px] w-[37.5%] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">
                Coupon: {coupon.code}
              </th>
              <td className="border-b border-ark-border p-[6px_24px] text-left text-ark-price">
                -{formatMoney(coupon.totals.total_discount, cart.totals)}
              </td>
            </tr>
          ))}
          <tr>
            <th className="border-b border-ark-border p-[6px_24px] text-left align-top text-[12px] font-bold tracking-[1.5px] text-[#919191] uppercase">
              Shipment
            </th>
            <td className="border-b border-ark-border p-[6px_24px] text-left">
              <ShippingCalculator cart={cart} />
            </td>
          </tr>
          <tr>
            <th className="p-[6px_24px] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">Total</th>
            <td className="p-[6px_24px] text-left text-[14px] font-semibold text-ark-price">
              {formatMoney(cart.totals.total_price, cart.totals)}
            </td>
          </tr>
        </tbody>
      </table>

      <CheckoutLink className="mt-[14px] inline-block min-w-[193px] rounded-[2px] bg-ark-price p-[15px] text-center text-[15.64px] text-white">
        Proceed to checkout
      </CheckoutLink>
    </aside>
  );
}
