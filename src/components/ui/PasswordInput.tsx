// src/components/ui/PasswordInput.tsx
"use client";

import { useState } from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  error?: string;
}

// Shared by every password field on account details — one toggle button, consistent markup
export default function PasswordInput({ id, label, value, onChange, autoComplete, error }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block font-sans text-[15.64px] font-bold text-label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-none border bg-white px-[6px] py-2 pr-10 font-sans text-xs text-[#919191] focus:outline-none ${
            error ? "border-[#a94442]" : "border-ark-border"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute right-0 top-0 flex h-full w-9 items-center justify-center text-meta hover:text-ark-title"
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M9.4 5.3A10.6 10.6 0 0112 5c5 0 9 4 10 7-.4 1.2-1.3 2.7-2.6 4M6.3 6.6C4 8.3 2.4 10.6 2 12c.8 2.5 3.5 6 7.3 7.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="mt-1 font-sans text-[13px] text-[#a94442]">{error}</p>}
    </div>
  );
}
