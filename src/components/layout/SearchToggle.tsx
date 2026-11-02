// src/components/layout/SearchToggle.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function SearchToggle() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-label="Search"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[113px] w-[39px] items-center justify-center hover:text-ink-dark ${
          open ? "text-ink-dark" : "text-muted"
        }`}
      >
        <svg viewBox="0 0 20 20" width="17" height="17" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
          <path d="M12.5 12.5L18 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[96px] right-0 z-50 w-[300px] rounded-[2px] border border-border bg-white p-[10px] shadow-[0_3px_13px_rgba(0,0,0,0.2)]">
          <form role="search" action="/" method="get">
            <input
              type="search"
              name="s"
              autoFocus
              placeholder="Search …"
              aria-label="Search for:"
              className="mb-5 block h-9 w-full border border-border bg-border px-[6px] py-2 text-[15.64px] text-muted outline-none"
            />
            <input
              type="submit"
              value="Search"
              className="cursor-pointer bg-[#1c1a1c] px-[22px] py-[9px] text-[13.33px] text-white"
            />
          </form>
        </div>
      )}
    </li>
  );
}
