// src/components/landing/LandingSearch.tsx
"use client";

import { useEffect, useRef } from "react";

export default function LandingSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keyup", onKey);
    return () => document.removeEventListener("keyup", onKey);
  }, [open, onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div className="relative w-[90%] max-w-[600px] rounded-[10px] bg-white p-10">
        <button type="button" aria-label="Close search" onClick={onClose} className="absolute top-[15px] right-5 cursor-pointer border-0 bg-transparent text-[32px]">
          &times;
        </button>
        <form action="/" method="get" role="search" className="flex gap-[10px]">
          <input ref={input} type="search" name="s" placeholder="Search products" aria-label="Search" className="w-full border border-grey p-[14px] text-[18px]" />
        </form>
      </div>
    </div>
  );
}
