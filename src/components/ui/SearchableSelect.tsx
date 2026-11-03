// src/components/ui/SearchableSelect.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// Replicates the live site's Select2 country/county dropdown — a text filter above the option list.
export default function SearchableSelect({
  value,
  placeholder,
  options,
  onChange,
  className = "",
}: {
  value: string;
  placeholder: string;
  options: { code: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const selectedLabel = options.find((o) => o.code === value)?.label;
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[38px] w-full items-center justify-between border border-ark-border px-2 text-left text-[13px] text-ark-btn-text"
      >
        <span className={selectedLabel ? "" : "text-[#919191]"}>{selectedLabel ?? placeholder}</span>
        <svg width="9" height="6" viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="#57585a" strokeWidth="1.4" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 z-20 w-full border border-t-0 border-ark-border bg-white shadow-[0_8px_15px_rgba(0,0,0,0.1)]">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="block w-full border-b border-ark-border px-2 py-[6px] text-[13px] outline-none"
          />
          <ul className="max-h-[220px] overflow-y-auto">
            {filtered.length === 0 && <li className="px-2 py-[6px] text-[13px] text-[#919191]">No matches</li>}
            {filtered.map((option) => (
              <li key={option.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`block w-full px-2 py-[6px] text-left text-[13px] hover:bg-bg-alt ${
                    option.code === value ? "font-semibold text-ark-title" : "text-ark-btn-text"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
