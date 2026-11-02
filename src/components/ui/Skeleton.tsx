// src/components/ui/Skeleton.tsx
// aria-hidden so screen readers hear one "Loading" from the wrapper, not one per bar (rule I7)
export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-[#E1E1E1] motion-reduce:animate-none ${className}`}
    />
  );
}
