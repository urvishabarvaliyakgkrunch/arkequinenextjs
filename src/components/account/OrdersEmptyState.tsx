// src/components/account/OrdersEmptyState.tsx
import Link from "next/link";

// Matches the two stacked boxes WooCommerce's native My Account > Orders screen shows
// when a customer has no orders: a guest-order-matching-by-email prompt, then the
// "no orders yet" prompt. The "Confirm email address" box is a visual match only — WooCommerce
// drives that flow through a logged-in-only AJAX action (woocommerce_match_customer_orders)
// with no WPGraphQL/REST equivalent exposed on this site, so there is nothing safe to wire it to.
export default function OrdersEmptyState() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border border-ark-border p-6">
        <button
          type="button"
          disabled
          title="Email confirmation is not available yet"
          className="mb-4 cursor-not-allowed rounded-[2px] bg-primary px-[15px] py-[15px] font-sans text-xs text-white opacity-70"
        >
          Confirm email address
        </button>
        <p className="font-sans text-sm text-ark-btn-text">
          Confirm your email address to check for past orders and link them to your account.
        </p>
      </div>

      <div className="border border-ark-border p-6">
        <Link
          href="/shop"
          className="mb-4 inline-block rounded-[2px] bg-primary px-[15px] py-[15px] font-sans text-xs text-white transition-colors hover:bg-primary-alt"
        >
          Browse products
        </Link>
        <p className="font-sans text-sm text-ark-btn-text">No order has been made yet.</p>
      </div>
    </div>
  );
}
