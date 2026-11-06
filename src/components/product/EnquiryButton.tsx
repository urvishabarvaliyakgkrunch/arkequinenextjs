// src/components/product/EnquiryButton.tsx
"use client";

import { useState } from "react";
import EnquiryModal from "@/components/product/EnquiryModal";

export default function EnquiryButton({ product }: { product: { databaseId: number; name: string; slug: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-5 mr-[2px] mt-[12.4px] h-[42px] cursor-pointer rounded-[2px] bg-primary p-[15px] text-xs font-bold leading-3 text-white transition-colors duration-300 ease-out hover:bg-secondary"
      >
        Make an enquiry about product
      </button>
      <EnquiryModal open={open} onClose={() => setOpen(false)} product={product} />
    </>
  );
}
