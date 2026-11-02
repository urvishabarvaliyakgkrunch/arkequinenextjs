// src/components/ui/TrustindexWidget.tsx
"use client";

import { useEffect, useRef } from "react";

// Trustindex's loader renders the widget next to its own <script> tag, so the
// tag is injected inside this container rather than through next/script.
export default function TrustindexWidget({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = `https://cdn.trustindex.io/loader.js?${id}`;
    script.defer = true;
    script.async = true;
    el.appendChild(script);
  }, [id]);

  return <div ref={ref} className={className} />;
}
