// src/components/cart/CartCouponRow.tsx
"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";

// Sits directly under the table, matching ark-equine.com/basket/'s layout: coupon input + Apply coupon
// on the left, Update basket on the right. "Update basket" has no separate action here — quantity
// changes already save instantly via the Store API, so it's shown disabled like the live site's
// does until a field actually changes (its own JS disables it the same way until you touch a qty input).
export default function CartCouponRow() {
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          className="h-[41px] border border-ark-border px-[11px] text-[12px] text-ark-btn-text"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={applying}
          className="h-[42px] cursor-pointer bg-ark-price px-4 text-[12px] font-semibold text-white disabled:cursor-wait disabled:opacity-60"
        >
          Apply coupon
        </button>
        {error ? <p className="w-full text-[12px] text-red-600">{error}</p> : null}
      </div>
      <button
        type="button"
        disabled
        className="h-[42px] cursor-not-allowed bg-ark-price px-4 text-[12px] font-semibold text-white opacity-50"
      >
        Update basket
      </button>
    </div>
  );
}
