// src/components/product/AddToCartForm.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore, planToQuantity, type SubscriptionPlan } from "@/store/cart";
import { subscriptionDiscountedPrice, formatEuro, GUEST_SUBSCRIPTION_DISCOUNT_PERCENT } from "@/lib/subscriptionPricing";
import EnquiryButton from "@/components/product/EnquiryButton";
import type { ProductPageData } from "@/types/product";

// Matches the live site's own WCSATT query param naming exactly: "0" for Buy Now (full price),
// "1_month" / "3_month" for the two Deliver: options — e.g. ark-equine.com/product/bone-protect/?convert_to_sub_215=1_month
function convertToSubParamName(productId: number): string {
  return `convert_to_sub_${productId}`;
}

function convertToSubValue(purchaseType: "buy_now" | "subscribe", deliverPlan: "monthly" | "every_3_months"): string {
  if (purchaseType === "buy_now") return "0";
  return deliverPlan === "every_3_months" ? "3_month" : "1_month";
}

// Quantity box and button; adds through the shared cart store, so the header basket and toast update too.
//
// A VariableProduct (like "Aquatabs InLine", which comes as a Housing Unit or a Cartridge) shows one
// dropdown per attribute first. The shopper must pick a value in every dropdown before we know which
// exact variation (and which price/stock/image) to add to the basket.
export default function AddToCartForm({ product }: { product: ProductPageData }) {
  const [quantity, setQuantity] = useState(1);
  // The value picked in each attribute dropdown so far, e.g. { size: "Aquatabs Inline Cartridge" }
  const [selected, setSelected] = useState<Record<string, string>>({});
  // Matches the live product page: "Buy Now" (full price) vs "Subscribe to save 10%" (Deliver: dropdown)
  const [purchaseType, setPurchaseType] = useState<"buy_now" | "subscribe">("subscribe");
  const [deliverPlan, setDeliverPlan] = useState<Extract<SubscriptionPlan, "monthly" | "every_3_months">>("monthly");
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const pathname = usePathname();
  // Only push to the URL once the shopper actually picks something — otherwise the very first render
  // (before the deep-link read effect below runs) would immediately overwrite a URL someone shared.
  const userPickedRef = useRef(false);

  // Deep-link support: a visitor arriving via a shared "?convert_to_sub_215=3_month" link lands on
  // that option pre-selected, matching the live site. Read-only — deliberately not done via a lazy
  // useState initializer (would read window.location during the very first render and disagree with
  // the server-rendered default, a hydration mismatch like the one just fixed in LandingCart.tsx).
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(convertToSubParamName(product.databaseId));
    if (raw === "0") setPurchaseType("buy_now");
    else if (raw === "3_month") {
      setPurchaseType("subscribe");
      setDeliverPlan("every_3_months");
    } else if (raw === "1_month") {
      setPurchaseType("subscribe");
      setDeliverPlan("monthly");
    }
  }, [product.databaseId]);

  // Keep the URL in sync with whatever the shopper picks, same as the live site's own behavior.
  useEffect(() => {
    if (!userPickedRef.current) return;
    const value = convertToSubValue(purchaseType, deliverPlan);
    router.replace(`${pathname}?${convertToSubParamName(product.databaseId)}=${value}`, { scroll: false });
  }, [purchaseType, deliverPlan, pathname, product.databaseId, router]);

  const isVariable = product.type === "VariableProduct";

  // Find the one variation whose attribute values match everything the shopper picked.
  // Stays null until every dropdown has a value.
  const matchedVariation = useMemo(() => {
    const everyAttributePicked = product.attributes.every((attribute) => selected[attribute.name]);
    if (!isVariable || !everyAttributePicked) return null;

    return (
      product.variations.find((variation) =>
        product.attributes.every(
          (attribute) => variation.attributes[attribute.name] === selected[attribute.name],
        ),
      ) ?? null
    );
  }, [isVariable, product.attributes, product.variations, selected]);

  // What "Add to basket" should actually add: the matched variation for a variable product,
  // or the product itself for a simple one.
  const cartItemId = isVariable ? matchedVariation?.databaseId : product.databaseId;
  const cartItemImage = matchedVariation?.image?.sourceUrl ?? product.images[0]?.sourceUrl;

  const isPending = useCartStore((s) => s.pendingId === cartItemId);

  // Never let the quantity drop below 1
  const change = (step: number) => setQuantity((q) => Math.max(1, q + step));

  const pickAttribute = (name: string, value: string) =>
    setSelected((current) => ({ ...current, [name]: value }));

  // A simple product that's out of stock is always out of stock; a variable product only once the
  // shopper has actually picked the out-of-stock option
  const isOutOfStock = isVariable ? matchedVariation?.isInStock === false : !product.isInStock;
  if (isOutOfStock) {
    return <p className="mb-[5px] font-bold text-red-700">Out of stock</p>;
  }

  // Variable products only know their real price once a variation is matched
  const activePriceFormatted = isVariable ? matchedVariation?.price : product.price;
  const discountedPrice = activePriceFormatted ? subscriptionDiscountedPrice(activePriceFormatted) : 0;
  const discountedLabel = formatEuro(discountedPrice);

  // "Buy Now" = full price, quantity 1 per click. "Subscribe" = the picked delivery scheme sets both
  // the per-unit discounted price and the real cart quantity (every-3-months ships 3 units at once,
  // matching the live site's "3 items" wording and WooCommerce Subscriptions' own cart behavior).
  const plan: SubscriptionPlan = purchaseType === "subscribe" ? deliverPlan : "one_time";
  const finalQuantity = quantity * planToQuantity(plan);

  // Matches the live site's radio + "Deliver:" dropdown above the quantity box
  const purchaseOptions = activePriceFormatted ? (
    <fieldset className="mb-[15px]">
      <legend className="sr-only">Purchase option</legend>
      <label className="mb-[8px] flex items-center gap-2 text-[15px] text-secondary">
        <input
          type="radio"
          name="purchase-type"
          checked={purchaseType === "buy_now"}
          onChange={() => {
            userPickedRef.current = true;
            setPurchaseType("buy_now");
          }}
        />
        Buy Now
      </label>
      <label className="mb-[8px] flex items-center gap-2 text-[15px] text-secondary">
        <input
          type="radio"
          name="purchase-type"
          checked={purchaseType === "subscribe"}
          onChange={() => {
            userPickedRef.current = true;
            setPurchaseType("subscribe");
          }}
        />
        Subscribe to save {GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}%
      </label>

      {purchaseType === "subscribe" && (
        <div className="mt-[10px]">
          <p className="mb-[6px] text-[13px] font-semibold text-secondary">Deliver:</p>
          <select
            value={deliverPlan}
            onChange={(e) => {
              userPickedRef.current = true;
              setDeliverPlan(e.target.value as typeof deliverPlan);
            }}
            className="h-[43px] w-full border border-[#e1e1e1] bg-white px-[10px] text-[14px] text-meta"
          >
            <option value="monthly">
              Every month for {discountedLabel} ({GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}% off) Billed and shipped each month
            </option>
            <option value="every_3_months">
              Every 3 months for {discountedLabel} ({GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}% off) 3 items Billed and shipped every 3 months (save on postage)
            </option>
          </select>
        </div>
      )}
    </fieldset>
  ) : null;

  // Shared quantity +/- box and "Add to basket" button, used both inside and outside the variation box
  const quantityAndAddButton = (
    <div className="mb-[5px] flex items-start">
      <div className="mr-[22.8px] flex">
        <button
          type="button"
          onClick={() => change(-1)}
          aria-label="Decrease quantity"
          className="size-[43px] cursor-pointer bg-bg-qty text-[13px] text-meta border border-[#e1e1e1]"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          aria-label="Product quantity"
          className="size-[43px] border-x border-border bg-white text-center text-[17px] text-meta [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none border border-[#e1e1e1] border-r-0 border-l-0"
        />
        <button
          type="button"
          onClick={() => change(1)}
          aria-label="Increase quantity"
          className="size-[43px] cursor-pointer bg-bg-qty text-[13px] text-meta border border-[#e1e1e1]"
        >
          +
        </button>
      </div>
      <button
        type="button"
        // Variable product: wait until a variation is matched before letting the shopper add it
        disabled={isPending || (isVariable && !matchedVariation)}
        onClick={() =>
          cartItemId &&
          addItem(cartItemId, product.name, cartItemImage, finalQuantity, plan).catch(() => {})
        }
        className="h-[42px] cursor-pointer rounded-[2px] bg-primary px-[15px] text-xs text-white transition-colors duration-300 ease-out hover:bg-secondary disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Adding…" : "Add to basket"}
      </button>
    </div>
  );

  return (
    <>
      {isVariable ? (
        // Boxed layout matches the live site: one dropdown per attribute, then the picked
        // variation's own price, then the usual quantity + add-to-basket row
        <div className="mb-[25px] border border-[#e1e1e1] p-[25px]">
          {product.attributes.map((attribute) => (
            <div key={attribute.name} className="mb-[15px] flex items-center">
              <label
                htmlFor={`attribute-${attribute.name}`}
                className="mr-[22.8px] w-[60px] shrink-0 text-[15px] capitalize text-secondary"
              >
                {attribute.label}
              </label>
              <select
                id={`attribute-${attribute.name}`}
                value={selected[attribute.name] ?? ""}
                onChange={(e) => pickAttribute(attribute.name, e.target.value)}
                className="h-[43px] w-full max-w-[300px] border border-[#e1e1e1] bg-white px-[10px] text-[15px] text-meta"
              >
                <option value="">Choose an option</option>
                {attribute.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Only the picked variation has one exact price — show it once every dropdown is filled */}
          {matchedVariation && (
            <p className="mb-[15px] text-[15px] font-bold leading-6 text-primary">{matchedVariation.price}</p>
          )}

          {matchedVariation && purchaseOptions}
          {quantityAndAddButton}
        </div>
      ) : (
        <>
          {purchaseOptions}
          {quantityAndAddButton}
        </>
      )}

      <EnquiryButton product={product} />
    </>
  );
}
