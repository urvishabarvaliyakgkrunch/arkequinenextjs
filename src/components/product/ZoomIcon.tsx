// src/components/product/ZoomIcon.tsx

// Magnifying glass drawn as SVG, so no icon font is needed
export default function ZoomIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 30 30"
      className={`size-[30px] text-black transition-opacity ${className}`}
    >
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M17 17l8 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
