// src/components/cart/CartTable.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, getConfirmedPlan, type SubscriptionPlan } from "@/store/cart";
import { formatMoney, type StoreApiCart, type StoreApiCartItem } from "@/lib/storeApi";

// Matches ark-equine.com/basket/'s table.shop_table — 13px body text, uppercase bold 12px headers,
// #E1E1E1 borders, measured live via computed styles.
export default function CartTable({ cart }: { cart: StoreApiCart }) {
  return (
    <table className="w-full border-collapse text-[13px]">
      <thead>
        <tr>
          <th className="border-b border-ark-border p-[9px_12px] text-left text-[12px] font-bold text-ark-btn-text uppercase"></th>
          <th className="border-b border-ark-border p-[9px_12px] text-left text-[12px] font-bold text-ark-btn-text uppercase">
            Product
          </th>
          <th className="border-b border-ark-border p-[9px_12px] text-left text-[12px] font-bold text-ark-btn-text uppercase">
            Price
          </th>
          <th className="border-b border-ark-border p-[9px_12px] text-left text-[12px] font-bold text-ark-btn-text uppercase">
            Quantity
          </th>
          <th className="border-b border-ark-border p-[9px_12px] text-left text-[12px] font-bold text-ark-btn-text uppercase">
            Subtotal
          </th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((item) => (
          <CartRow key={item.key} item={item} />
        ))}
      </tbody>
    </table>
  );
}

function CartRow({ item }: { item: StoreApiCartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const pendingKey = useCartStore((s) => s.pendingKey);
  const isPending = pendingKey === item.key;

  return (
    <tr className={isPending ? "opacity-50" : ""}>
      <td className="border-b border-ark-border p-[6px_5px] align-middle">
        <button
          type="button"
          onClick={() => removeItem(item.key)}
          aria-label={`Remove ${item.name} from basket`}
          className="cursor-pointer text-[16px] leading-none text-ark-btn-text hover:text-ark-price"
        >
          ×
        </button>
      </td>
      <td className="border-b border-ark-border p-[6px_5px] align-middle">
        <Link href={item.permalink} className="flex items-center gap-3">
          {item.images[0] ? (
            <Image
              src={item.images[0].thumbnail}
              alt={item.images[0].alt || item.name}
              width={64}
              height={64}
              className="h-16 w-16 object-cover"
            />
          ) : null}
          <span className="text-ark-price">{item.name}</span>
        </Link>
        {/* Shows which option was picked, e.g. "size: 10kg", under the product name — same as the live cart */}
        {item.variation.map((row) => (
          <p key={row.attribute} className="m-0 text-[12px] text-ark-btn-text">
            {row.attribute}: {row.value}
          </p>
        ))}
        {item.item_data.map((row) => (
          <p key={row.display_key} className="m-0 text-[12px] text-ark-btn-text">
            {row.display_key}: {row.display_value}
          </p>
        ))}
      </td>
      <td className="border-b border-ark-border p-[6px_5px] align-middle">
        <SubscriptionPriceOptions item={item} />
      </td>
      <td className="border-b border-ark-border p-[6px_5px] align-middle">
        <div className="flex">
          <button
            type="button"
            onClick={() => updateQuantity(item.key, Math.max(item.quantity_limits.minimum, item.quantity - 1))}
            disabled={isPending}
            aria-label="Decrease quantity"
            className="size-[43px] cursor-pointer bg-bg-qty text-[13px] text-ark-btn-text"
          >
            -
          </button>
          <input
            type="number"
            min={item.quantity_limits.minimum}
            max={item.quantity_limits.maximum}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.key, Math.max(1, Number(e.target.value) || 1))}
            disabled={isPending}
            aria-label="Product quantity"
            className="size-[43px] border-x border-ark-border bg-white text-center text-[13px] text-ark-btn-text [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => updateQuantity(item.key, Math.min(item.quantity_limits.maximum, item.quantity + 1))}
            disabled={isPending}
            aria-label="Increase quantity"
            className="size-[43px] cursor-pointer bg-bg-qty text-[13px] text-ark-btn-text"
          >
            +
          </button>
        </div>
      </td>
      <td className="border-b border-ark-border p-[6px_5px] align-middle font-semibold text-ark-price">
        {formatMoney(item.totals.line_subtotal, item.totals)}
      </td>
    </tr>
  );
}

// Live site's subscribe-and-save radios (WooCommerce Subscriptions/WCSATT). That plugin's real
// per-unit discount data isn't exposed by the Store API (checked: extensions/item_data are empty for
// it) and wiring it up for real needs a backend change this project isn't making, so the €/month and
// €/3-months labels stay the same 10%-off guest estimate used on the product cards — not the real
// charged amount. Picking a radio only stages the choice (useCartStore's selectedPlans); nothing hits
// the cart until "Update basket" is clicked (see CartCouponRow), which calls the real Store API
// quantity-update endpoint — so the Subtotal column stays a true, correctly calculated WooCommerce
// total, just at full per-unit price (quantity × full price) since WCSATT's discount isn't reachable.
function SubscriptionPriceOptions({ item }: { item: StoreApiCartItem }) {
  const setPlan = useCartStore((s) => s.setPlan);
  const confirmedPlans = useCartStore((s) => s.confirmedPlans);
  const selected: SubscriptionPlan =
    useCartStore((s) => s.selectedPlans[item.key]) ??
    getConfirmedPlan(confirmedPlans, item.key, item.quantity);

  const oneTime = Number(item.prices.price) / 10 ** item.prices.currency_minor_unit;
  const discounted = (oneTime * 0.9).toFixed(item.prices.currency_minor_unit);
  const oneTimeLabel = formatMoney(item.prices.price, item.prices);
  const discountedLabel = `${item.prices.currency_symbol}${discounted}`;

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="sr-only">Purchase option for {item.name}</legend>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name={`plan-${item.key}`}
          checked={selected === "one_time"}
          onChange={() => setPlan(item.key,"one_time")}
          className="accent-ark-price"
        />
        {oneTimeLabel}
      </label>
      <label className="flex items-center gap-2 text-ark-btn-text">
        <input
          type="radio"
          name={`plan-${item.key}`}
          checked={selected === "monthly"}
          onChange={() => setPlan(item.key,"monthly")}
          className="accent-ark-price"
        />
        {discountedLabel} / month
      </label>
      <label className="flex items-center gap-2 text-ark-btn-text">
        <input
          type="radio"
          name={`plan-${item.key}`}
          checked={selected === "every_3_months"}
          onChange={() => setPlan(item.key,"every_3_months")}
          className="accent-ark-price"
        />
        {discountedLabel} every 3 months
      </label>
    </fieldset>
  );
}
