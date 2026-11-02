// src/components/ui/ImageOverlay.tsx
// Enfold's linked-image hover: white wash at 70% with a teal link badge.
// The parent link needs `group relative`.
export default function ImageOverlay({ className = "inset-0" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bg-white opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-70 ${className}`}
    >
      <span className="absolute top-1/2 left-1/2 -mt-10 -ml-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L11.6 6" />
          <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.6-1.6" />
        </svg>
      </span>
    </span>
  );
}
