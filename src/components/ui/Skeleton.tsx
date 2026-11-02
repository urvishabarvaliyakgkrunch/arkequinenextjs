// src/components/ui/Skeleton.tsx
export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-pulse rounded bg-[#E1E1E1] ${className}`}
    />
  );
}
