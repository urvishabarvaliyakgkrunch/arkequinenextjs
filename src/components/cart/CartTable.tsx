// src/components/cart/CartTable.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
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

// Live site's subscribe-and-save radios (WooCommerce Subscriptions/WCSATT) — that plugin's per-item
// scheme data isn't exposed by the Store API (checked: extensions/item_data are empty for it), so this
// is a cosmetic replica only: monthly/3-month shown at the same 10% guest default used on the product
// cards. Picking a radio does NOT change what's actually charged — there's no real data to wire it to.
function SubscriptionPriceOptions({ item }: { item: StoreApiCartItem }) {
  const oneTime = Number(item.prices.price) / 10 ** item.prices.currency_minor_unit;
  const discounted = (oneTime * 0.9).toFixed(item.prices.currency_minor_unit);
  const oneTimeLabel = formatMoney(item.prices.price, item.prices);
  const discountedLabel = `${item.prices.currency_symbol}${discounted}`;

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="sr-only">Purchase option for {item.name}</legend>
      <label className="flex items-center gap-2">
        <input type="radio" name={`plan-${item.key}`} defaultChecked className="accent-ark-price" />
        {oneTimeLabel}
      </label>
      <label className="flex items-center gap-2 text-ark-btn-text">
        <input type="radio" name={`plan-${item.key}`} className="accent-ark-price" />
        {discountedLabel} / month
      </label>
      <label className="flex items-center gap-2 text-ark-btn-text">
        <input type="radio" name={`plan-${item.key}`} className="accent-ark-price" />
        {discountedLabel} every 3 months
      </label>
    </fieldset>
  );
}
