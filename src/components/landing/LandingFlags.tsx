// src/components/landing/LandingFlags.tsx
"use client";

import { CURRENCIES } from "@/lib/currency";
import { useCurrency } from "@/hooks/useCurrency";

// Euro / Pound currency switcher shown next to the cart, as on the live site header
function EuFlag() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return { x: +(12 + 5.2 * Math.sin(a)).toFixed(2), y: +(8 - 5.2 * Math.cos(a)).toFixed(2) };
  });
  return (
    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
      <rect width="24" height="16" fill="#039" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="0.9" fill="#fc0" />
      ))}
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#c8102e" strokeWidth="1.4" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.4" />
      <path d="M12 0V16M0 8H24" stroke="#c8102e" strokeWidth="3.2" />
    </svg>
  );
}

const FLAGS = { EUR: EuFlag, GBP: UkFlag } as const;

export default function LandingFlags() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center max-[900px]:hidden" role="group" aria-label="Currency">
      {CURRENCIES.map(({ code, label }) => {
        const Flag = FLAGS[code];
        const active = code === currency;
        return (
          <button
            key={code}
            type="button"
            aria-label={label}
            aria-pressed={active}
            title={label}
            onClick={() => setCurrency(code)}
            className={`flex h-[20px] w-[28px] cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-opacity ${active ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
          >
            <Flag />
          </button>
        );
      })}
    </div>
  );
}
