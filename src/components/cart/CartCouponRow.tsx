// src/components/cart/CartCouponRow.tsx
"use client";

import { useState } from "react";
import { useCartStore, getConfirmedPlan } from "@/store/cart";

// Sits directly under the table, matching ark-equine.com/basket/'s layout: coupon input + Apply coupon
// on the left, Update basket on the right. Quantity +/- already saves instantly, so "Update basket"'s
// one real job is committing a staged subscription-plan radio (CartTable's SubscriptionPriceOptions —
// picking a radio there only stages the choice, it never touches the cart by itself). Disabled until a
// staged plan actually differs from the item's confirmed plan — compared by plan, not quantity, since
// "monthly" and "one-time" are both quantity 1 and would otherwise never register as a real change.
export default function CartCouponRow() {
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const cart = useCartStore((s) => s.cart);
  const selectedPlans = useCartStore((s) => s.selectedPlans);
  const confirmedPlans = useCartStore((s) => s.confirmedPlans);
  const applyingPlans = useCartStore((s) => s.applyingPlans);
  const applyPlans = useCartStore((s) => s.applyPlans);
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasPendingPlanChange = (cart?.items ?? []).some((item) => {
    const selected = selectedPlans[item.key];
    return selected && selected !== getConfirmedPlan(confirmedPlans, item.key, item.quantity);
  });

  async function handleApply() {
    if (!code.trim()) return;
    setApplying(true);
    setError(null);
    try {
      await applyCoupon(code.trim());
      setCode("");
    } catch {
      setError("That coupon code isn't valid.");
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="-mt-px mb-6 flex flex-wrap items-start justify-between gap-3 border border-ark-border p-[10px_12px]">
      <div className="flex flex-wrap">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          className="m-[3px_3px_3px_0] h-[41px] w-[200px] border border-ark-border px-[11px] text-[12px] text-ark-btn-text"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={applying}
          className="m-[3px_0] h-[42px] w-[200px] cursor-pointer rounded-[2px] bg-ark-price text-[12px] text-white disabled:cursor-wait disabled:opacity-60"
        >
          Apply coupon
        </button>
        {error ? <p className="w-full text-[12px] text-red-600">{error}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => applyPlans()}
        disabled={!hasPendingPlanChange || applyingPlans}
        className="m-[3px_0] h-[42px] w-[182px] cursor-pointer rounded-[2px] bg-ark-price px-[15px] text-[12px] text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {applyingPlans ? "Updating…" : "Update basket"}
      </button>
    </div>
  );
}
