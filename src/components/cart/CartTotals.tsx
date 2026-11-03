// src/components/cart/CartTotals.tsx
import { formatMoney, type StoreApiCart } from "@/lib/storeApi";
import ShippingCalculator from "@/components/cart/ShippingCalculator";

// Matches ark-equine.com/basket/'s .cart_totals box — 14px uppercase Millar heading, teal buttons,
// measured live via computed styles.
export default function CartTotals({ cart }: { cart: StoreApiCart }) {
  return (
    <aside className="w-full max-w-[528px]">
      <h2 className="mb-2 font-[family-name:var(--f-head)] text-[14px] font-semibold text-ark-title uppercase">
        Basket totals
      </h2>
      <table className="w-full border-collapse border border-ark-border text-[13px]">
        <tbody>
          <tr>
            <th className="border-b border-ark-border p-[9px_12px] text-left font-normal text-ark-btn-text">
              Subtotal
            </th>
            <td className="border-b border-ark-border p-[9px_12px] text-left">
              {formatMoney(cart.totals.total_items, cart.totals)}
            </td>
          </tr>
          {cart.coupons.map((coupon) => (
            <tr key={coupon.code}>
              <th className="border-b border-ark-border p-[9px_12px] text-left font-normal text-ark-btn-text">
                Coupon: {coupon.code}
              </th>
              <td className="border-b border-ark-border p-[9px_12px] text-left text-ark-price">
                -{formatMoney(coupon.totals.total_discount, cart.totals)}
              </td>
            </tr>
          ))}
          <tr>
            <th className="border-b border-ark-border p-[9px_12px] text-left align-top font-normal text-ark-btn-text">
              Shipment
            </th>
            <td className="border-b border-ark-border p-[9px_12px] text-left">
              <ShippingCalculator cart={cart} />
            </td>
          </tr>
          <tr>
            <th className="p-[9px_12px] text-left text-[14px] font-semibold text-ark-title">Total</th>
            <td className="p-[9px_12px] text-left text-[14px] font-semibold text-ark-price">
              {formatMoney(cart.totals.total_price, cart.totals)}
            </td>
          </tr>
        </tbody>
      </table>

      <a
        href={`${process.env.NEXT_PUBLIC_WP_URL}/checkout/`}
        className="mt-4 block max-w-[300px] rounded-[2px] bg-ark-price px-[15px] py-[15px] text-center text-[15px] text-white"
      >
        Proceed to checkout
      </a>
    </aside>
  );
}
