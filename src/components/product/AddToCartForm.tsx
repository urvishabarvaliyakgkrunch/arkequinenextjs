// src/components/product/AddToCartForm.tsx
"use client";

import { useState } from "react";

// Quantity box and button; real cart wiring comes with the cart task (P1-12)
export default function AddToCartForm({ isInStock }: { isInStock: boolean }) {
  const [quantity, setQuantity] = useState(1);

  // Never let the quantity drop below 1
  const change = (step: number) => setQuantity((q) => Math.max(1, q + step));

  if (!isInStock) {
    return <p className="mb-[5px] font-bold text-red-700">Out of stock</p>;
  }

  return (
    <>
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
        className="h-[42px] cursor-pointer rounded-[2px] bg-primary px-[15px] text-xs text-white transition-colors duration-300 ease-out hover:bg-secondary"
      >
        Add to basket
      </button>
    </div>
    <button
      type="button"
      className="mb-5 mr-[2px] mt-[12.4px] h-[42px] cursor-pointer rounded-[2px] bg-primary p-[15px] text-xs font-bold leading-3 text-white transition-colors duration-300 ease-out hover:bg-secondary"
    >
      Make an enquiry about product
    </button>
    </>
  );
}
