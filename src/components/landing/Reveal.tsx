// src/components/landing/Reveal.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fade-up on first scroll into view
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,translate] duration-[800ms] ease-lt motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
