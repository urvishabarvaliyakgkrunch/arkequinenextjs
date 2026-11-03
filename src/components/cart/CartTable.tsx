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
    <table className="w-full border-collapse border border-ark-border text-[13px]">
      <thead>
        <tr>
          <th className="w-[5.4%] border border-ark-border p-[9px_12px]"></th>
          <th className="w-[7.1%] border border-ark-border p-[9px_12px]"></th>
          <th className="w-[21.2%] border border-ark-border p-[9px_12px] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">
            Product
          </th>
          <th className="w-[35%] border border-ark-border p-[9px_12px] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">
            Price
          </th>
          <th className="w-[19.3%] border border-ark-border p-[9px_12px] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">
            Quantity
          </th>
          <th className="border border-ark-border p-[9px_12px] text-left text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase">
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
      <td className="border border-ark-border p-[6px_12px] align-middle">
        <button
          type="button"
          onClick={() => removeItem(item.key)}
          aria-label={`Remove ${item.name} from basket`}
          className="flex size-[18px] cursor-pointer items-center justify-center rounded-full border border-ark-border bg-ark-price text-[14px] leading-none text-white"
        >
          ×
        </button>
      </td>
      <td className="border border-ark-border p-[6px_12px] align-middle">
        {item.images[0] ? (
          <Link href={item.permalink}>
            <Image
              src={item.images[0].thumbnail}
              alt={item.images[0].alt || item.name}
              width={32}
              height={32}
              className="h-8 w-8 object-cover"
            />
          </Link>
        ) : null}
      </td>
      <td className="border border-ark-border p-[6px_12px] align-middle">
        <Link href={item.permalink} className="text-ark-price">
          {item.name}
        </Link>
      </td>
      <td className="border border-ark-border p-[6px_12px] align-middle">
        <SubscriptionPriceOptions item={item} />
      </td>
      <td className="border border-ark-border p-[6px_12px] align-middle">
        <div className="mx-auto flex w-[130px]">
          <button
            type="button"
            onClick={() => updateQuantity(item.key, Math.max(item.quantity_limits.minimum, item.quantity - 1))}
            disabled={isPending}
            aria-label="Decrease quantity"
            className="size-[43px] cursor-pointer bg-bg-qty text-[13px] text-[#919191] border border-[#E1E1E1]"
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
            className="size-[43px] border-x border-ark-border bg-white px-[5px] text-center text-[13px] text-[#919191] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none border border-r-0 border-l-0 border-[#E1E1E1]"
          />
          <button
            type="button"
            onClick={() => updateQuantity(item.key, Math.min(item.quantity_limits.maximum, item.quantity + 1))}
            disabled={isPending}
            aria-label="Increase quantity"
            className="size-[43px] cursor-pointer bg-bg-qty text-[13px] text-[#919191] border border-[#E1E1E1]"
          >
            +
          </button>
        </div>
      </td>
      <td className="border border-ark-border p-[6px_12px] align-middle font-semibold text-ark-price">
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
    <fieldset>
      <legend className="sr-only">Purchase option for {item.name}</legend>
      <ul>
      <li className="p-[3px_0] leading-[28.05px]">
        <label className="flex items-center">
          <input
            type="radio"
            name={`plan-${item.key}`}
            checked={selected === "one_time"}
            onChange={() => setPlan(item.key, "one_time")}
            className="m-0 h-[13px] w-[100px]"
          />
          <span className="text-[13px]">{oneTimeLabel}</span>
        </label>
      </li>
      <li className="p-[3px_0] leading-[28.05px]">
        <label className="flex items-center">
          <input
            type="radio"
            name={`plan-${item.key}`}
            checked={selected === "monthly"}
            onChange={() => setPlan(item.key, "monthly")}
            className="m-0 h-[13px] w-[100px]"
          />
          <span className="text-[13px] font-bold">{discountedLabel} / month</span>
        </label>
      </li>
      <li className="p-[3px_0] leading-[28.05px]">
        <label className="flex items-center">
          <input
            type="radio"
            name={`plan-${item.key}`}
            checked={selected === "every_3_months"}
            onChange={() => setPlan(item.key, "every_3_months")}
            className="m-0 h-[13px] w-[100px]"
          />
          <span className="text-[13px] font-bold">{discountedLabel} every 3 months</span>
        </label>
      </li>
      </ul>
    </fieldset>
  );
}
