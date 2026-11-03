// src/components/cart/ShippingCalculator.tsx
"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatMoney, type StoreApiCart } from "@/lib/storeApi";
import SearchableSelect from "@/components/ui/SearchableSelect";

// Matches ark-equine.com/basket/'s "Calculate shipping" collapsible form + the live rate list it returns.
// Countries limited to what the backend actually ships to (confirmed in the theme's delivery-country check).
const COUNTRIES = [
  { code: "IE", label: "Ireland" },
  { code: "NI", label: "Northern Ireland" },
  { code: "GB", label: "United Kingdom (UK)" },
];

// Ireland is the only shippable country WooCommerce gives a state list for — confirmed live on
// arkequine.getkgkrunch.com/basket/ (#calc_shipping_state becomes a <select> of these 26 counties
// only when country = IE; GB keeps it a free-text field, NI has no state field at all).
const IE_COUNTIES = [
  { code: "CW", label: "Carlow" },
  { code: "CN", label: "Cavan" },
  { code: "CE", label: "Clare" },
  { code: "CO", label: "Cork" },
  { code: "DL", label: "Donegal" },
  { code: "D", label: "Dublin" },
  { code: "G", label: "Galway" },
  { code: "KY", label: "Kerry" },
  { code: "KE", label: "Kildare" },
  { code: "KK", label: "Kilkenny" },
  { code: "LS", label: "Laois" },
  { code: "LM", label: "Leitrim" },
  { code: "LK", label: "Limerick" },
  { code: "LD", label: "Longford" },
  { code: "LH", label: "Louth" },
  { code: "MO", label: "Mayo" },
  { code: "MH", label: "Meath" },
  { code: "MN", label: "Monaghan" },
  { code: "OY", label: "Offaly" },
  { code: "RN", label: "Roscommon" },
  { code: "SO", label: "Sligo" },
  { code: "TA", label: "Tipperary" },
  { code: "WD", label: "Waterford" },
  { code: "WH", label: "Westmeath" },
  { code: "WX", label: "Wexford" },
  { code: "WW", label: "Wicklow" },
];

export default function ShippingCalculator({ cart }: { cart: StoreApiCart }) {
  const updateShippingAddress = useCartStore((s) => s.updateShippingAddress);
  const selectShippingRate = useCartStore((s) => s.selectShippingRate);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState(cart.shipping_address.country || "");
  const [state, setState] = useState(cart.shipping_address.state || "");
  const [city, setCity] = useState(cart.shipping_address.city || "");
  const [postcode, setPostcode] = useState(cart.shipping_address.postcode || "");

  const rates = cart.shipping_rates[0]?.shipping_rates ?? [];
  const hasAddress = Boolean(cart.shipping_address.country) && rates.length > 0;

  // Matches the live site's WooCommerce country_to_state behaviour per country.
  const postcodeLabel = country === "IE" ? "Eircode" : "Postcode / ZIP";

  function handleCountryChange(value: string) {
    setCountry(value);
    setState("");
  }

  async function handleCalculate() {
    setLoading(true);
    setError(null);
    try {
      await updateShippingAddress({ country, state, city, postcode });
    } catch {
      setError("Couldn't calculate shipping for that address.");
    } finally {
      setLoading(false);
    }
  }

  const { city: addrCity, state: addrState, postcode: addrPostcode } = cart.shipping_address;
  const countyLabel = IE_COUNTIES.find((c) => c.code === addrState)?.label || addrState;
  const addressLine = [addrCity, countyLabel, addrPostcode].filter(Boolean).join(", ");

  return (
    <div className="text-[13px] text-ark-btn-text">
      {!hasAddress && (
        <div className="mb-3 text-[13px] leading-[28px] text-[#919191]">
          Enter your address to view shipping options.
          <br />
          <button type="button" onClick={() => setOpen((v) => !v)} className="cursor-pointer text-[13px] leading-[16px] text-ark-price">
            Calculate shipping
          </button>
        </div>
      )}

      {hasAddress && (
        <>
          {rates.map((rate) => {
            const description = rate.meta_data.find((m) => m.key === "description")?.value;
            return (
              <div key={rate.rate_id} className="mb-3">
                <label className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="shipping-rate"
                    checked={rate.selected}
                    onChange={() => selectShippingRate(rate.rate_id)}
                    className="mt-[3px] accent-ark-price"
                  />
                  <span>
                    <span className="font-semibold text-ark-title">
                      {rate.name}: {formatMoney(rate.price, rate)}
                    </span>
                    {description ? <span className="block text-ark-btn-text">{description}</span> : null}
                  </span>
                </label>
              </div>
            );
          })}
          {addressLine ? (
            <p className="mb-1">
              Shipping to <span className="font-semibold text-ark-price">{addressLine}.</span>
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mb-3 cursor-pointer text-ark-price underline"
          >
            Change address
          </button>
        </>
      )}

      {open && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-ark-btn-text">
              Country/Region <span className="text-red-600">*</span>
            </label>
            <SearchableSelect
              value={country}
              placeholder="Select a country / region…"
              options={COUNTRIES}
              onChange={handleCountryChange}
            />
          </div>
          {country !== "NI" && (
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-semibold text-ark-btn-text">
                {country === "IE" ? "County" : "State / County"} <span className="text-red-600">*</span>
              </label>
              {country === "IE" ? (
                <SearchableSelect
                  value={state}
                  placeholder="Select an option…"
                  options={IE_COUNTIES}
                  onChange={setState}
                />
              ) : (
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="h-[38px] border border-ark-border px-2 text-[13px] text-ark-btn-text"
                />
              )}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-ark-btn-text">
              Town / City <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-[38px] border border-ark-border px-2 text-[13px] text-ark-btn-text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-ark-btn-text">
              {postcodeLabel} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="h-[38px] border border-ark-border px-2 text-[13px] text-ark-btn-text"
            />
          </div>
          {error ? <p className="text-[12px] text-red-600">{error}</p> : null}
          <button
            type="button"
            onClick={handleCalculate}
            disabled={loading}
            className="h-[38px] w-fit cursor-pointer bg-ark-price px-6 text-[13px] font-semibold text-white disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Updating…" : "Update"}
          </button>
        </div>
      )}
    </div>
  );
}
