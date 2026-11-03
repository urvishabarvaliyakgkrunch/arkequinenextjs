// src/components/product/AddToCartForm.tsx
"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart";
import type { ProductPageData } from "@/types/product";

// Quantity box and button; adds through the shared cart store, so the header basket and toast update too.
//
// A VariableProduct (like "Aquatabs InLine", which comes as a Housing Unit or a Cartridge) shows one
// dropdown per attribute first. The shopper must pick a value in every dropdown before we know which
// exact variation (and which price/stock/image) to add to the basket.
export default function AddToCartForm({ product }: { product: ProductPageData }) {
  const [quantity, setQuantity] = useState(1);
  // The value picked in each attribute dropdown so far, e.g. { size: "Aquatabs Inline Cartridge" }
  const [selected, setSelected] = useState<Record<string, string>>({});
  const addItem = useCartStore((s) => s.addItem);

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
        onClick={() => cartItemId && addItem(cartItemId, product.name, cartItemImage, quantity).catch(() => {})}
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
            <p className="mb-[15px] text-[15px] font-bold leading-6 text-primary">
              {matchedVariation.price}
              <small className="text-[12px]">
                {" "}— or subscribe to save <span className="text-[15px]">10%</span>
              </small>
            </p>
          )}

          {quantityAndAddButton}
        </div>
      ) : (
        quantityAndAddButton
      )}

      <button
        type="button"
        className="mb-5 mr-[2px] mt-[12.4px] h-[42px] cursor-pointer rounded-[2px] bg-primary p-[15px] text-xs font-bold leading-3 text-white transition-colors duration-300 ease-out hover:bg-secondary"
      >
        Make an enquiry about product
      </button>
    </>
  );
}
