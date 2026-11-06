// src/components/cart/CartTotals.tsx
"use client";

import { useCartStore, getConfirmedPlan } from "@/store/cart";
import { formatMoney, type StoreApiCart } from "@/lib/storeApi";
import { discountedLineTotalMinor } from "@/lib/subscriptionPricing";
import ShippingCalculator from "@/components/cart/ShippingCalculator";

// Matches ark-equine.com/basket/'s .cart_totals box — 14px uppercase Millar heading, teal buttons,
// measured live via computed styles.
export default function CartTotals({ cart }: { cart: StoreApiCart }) {
  const confirmedPlans = useCartStore((s) => s.confirmedPlans);

  // cart.totals.total_items is always the full-price sum (Store API has no idea a plan was picked) —
  // rebuild it from each line's real confirmed plan so the box matches the table rows above it. The
  // gap between total_price and total_items (shipping/fees/tax) is backend-computed and kept as-is.
  const discountedSubtotalMinor = cart.items.reduce(
    (sum, item) =>
      sum + discountedLineTotalMinor(Number(item.prices.price), item.quantity, getConfirmedPlan(confirmedPlans, item.key, item.quantity)),
    0,
  );
  const extrasMinor = Number(cart.totals.total_price) - Number(cart.totals.total_items);
  const discountedTotalMinor = discountedSubtotalMinor + extrasMinor;

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
              {formatMoney(String(discountedSubtotalMinor), cart.totals)}
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
              {formatMoney(String(discountedTotalMinor), cart.totals)}
            </td>
          </tr>
        </tbody>
      </table>

      <a
        href={`${process.env.NEXT_PUBLIC_WP_URL}/checkout/`}
        className="mt-[14px] inline-block min-w-[193px] rounded-[2px] bg-ark-price p-[15px] text-center text-[15.64px] text-white"
      >
        Proceed to checkout
      </a>
    </aside>
  );
}
