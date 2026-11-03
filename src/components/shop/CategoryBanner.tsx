// src/components/shop/CategoryBanner.tsx
"use client";

import { useEffect, useRef } from "react";

// Full-bleed category feature banner, like the live category page: a JS-driven parallax
// (the background moves at a fraction of scroll speed) with the category name overlaid in
// white. CSS `background-attachment: fixed` isn't reliable once any ancestor has a transform
// (sticky header, etc.), so this follows the same approach the live site uses instead.
// Image always comes from the current env — no fallback host.
const PARALLAX_FACTOR = 0.3;

export default function CategoryBanner({
  image,
  title,
}: {
  image: { sourceUrl: string; altText: string | null } | null;
  title: string;
}) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = bg.parentElement!.getBoundingClientRect();
      bg.style.transform = `translateY(${rect.top * PARALLAX_FACTOR}px)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!image) return null;

  return (
    <div className="relative flex h-[280px] items-center justify-center overflow-hidden md:h-[355px]">
      <div
        ref={bgRef}
        role="img"
        aria-label={image.altText ?? title}
        className="absolute inset-[-20%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image.sourceUrl})` }}
      />
      <h1 className="relative font-[family-name:var(--f-head)] text-[32px] font-bold text-white md:text-[40px]">
        {title}
      </h1>
    </div>
  );
}
