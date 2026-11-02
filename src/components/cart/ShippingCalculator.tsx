// src/components/cart/ShippingCalculator.tsx
"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatMoney, type StoreApiCart } from "@/lib/storeApi";

// Matches ark-equine.com/basket/'s "Calculate shipping" collapsible form + the live rate list it returns.
// Countries limited to what the backend actually ships to (confirmed in the theme's delivery-country check).
const COUNTRIES = [
  { code: "IE", label: "Ireland" },
  { code: "NI", label: "Northern Ireland" },
  { code: "GB", label: "United Kingdom (UK)" },
];

export default function ShippingCalculator({ cart }: { cart: StoreApiCart }) {
  const updateShippingAddress = useCartStore((s) => s.updateShippingAddress);
  const selectShippingRate = useCartStore((s) => s.selectShippingRate);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState(cart.shipping_address.country || "IE");
  const [city, setCity] = useState(cart.shipping_address.city || "");
  const [postcode, setPostcode] = useState(cart.shipping_address.postcode || "");

  const rates = cart.shipping_rates[0]?.shipping_rates ?? [];
  const hasAddress = Boolean(cart.shipping_address.country) && rates.length > 0;

  async function handleCalculate() {
    setLoading(true);
    setError(null);
    try {
      await updateShippingAddress({ country, city, postcode });
      setOpen(false);
    } catch {
      setError("Couldn't calculate shipping for that address.");
    } finally {
      setLoading(false);
    }
  }

  if (!open && hasAddress) {
    return (
      <div className="text-[12px] text-ark-btn-text">
        {rates.map((rate) => (
          <label key={rate.rate_id} className="mb-1 flex items-center gap-2">
            <input
              type="radio"
              name="shipping-rate"
              checked={rate.selected}
              onChange={() => selectShippingRate(rate.rate_id)}
              className="accent-ark-price"
            />
            {rate.name}: {formatMoney(rate.price, rate)}
          </label>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-ark-price underline"
        >
          Change address
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-[12px] text-ark-btn-text">
        Enter your address to view shipping options.{" "}
        <button type="button" onClick={() => setOpen(true)} className="cursor-pointer text-ark-price underline">
          Calculate shipping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="h-[38px] border border-ark-border px-2 text-[12px] text-ark-btn-text"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Town / City"
        className="h-[38px] border border-ark-border px-2 text-[12px] text-ark-btn-text"
      />
      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="Postcode / Eircode"
        className="h-[38px] border border-ark-border px-2 text-[12px] text-ark-btn-text"
      />
      {error ? <p className="text-[12px] text-red-600">{error}</p> : null}
      <button
        type="button"
        onClick={handleCalculate}
        disabled={loading}
        className="h-[38px] cursor-pointer bg-ark-price text-[12px] font-semibold text-white disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Updating…" : "Update"}
      </button>
    </div>
  );
}
