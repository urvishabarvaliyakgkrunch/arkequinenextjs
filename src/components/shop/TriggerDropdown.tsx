// src/components/shop/TriggerDropdown.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// Replicates ark-equine.com's "Sort by **Default**" trigger — a plain <select> can't bold just part
// of its own text, so this is a button + click-open flyout list instead of a native select.
export default function TriggerDropdown({
  prefix,
  valueLabel,
  options,
  selectedValue,
  onSelect,
}: {
  prefix: string;
  valueLabel: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[33px] items-center gap-2 border border-ark-border bg-white pr-[32px] pl-[10px] text-[11px] text-ark-btn-text"
      >
        {prefix} <strong className="font-bold text-ark-title">{valueLabel}</strong>
        <svg width="9" height="6" viewBox="0 0 10 6" className="absolute right-[12px]" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="#57585a" strokeWidth="1.4" />
        </svg>
      </button>

      {open && (
        <ul className="absolute top-full left-0 z-20 min-w-full border border-t-0 border-ark-border bg-white py-1 whitespace-nowrap shadow-[0_8px_15px_rgba(0,0,0,0.1)]">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
                className={`block w-full px-[10px] py-[6px] text-left text-[11px] hover:bg-bg-alt hover:font-bold hover:text-ark-title ${
                  option.value === selectedValue ? "font-bold text-ark-title" : "text-ark-btn-text"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
