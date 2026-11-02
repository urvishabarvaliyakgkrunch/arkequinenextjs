// src/components/ui/Skeleton.tsx

// One grey pulsing block; size comes from className (rule I5)
export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-border motion-reduce:animate-none ${className}`}
    />
  );
}
