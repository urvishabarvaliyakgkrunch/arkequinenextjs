// src/components/shop/CategoryBanner.tsx
"use client";

import { useEffect, useRef } from "react";

// Full-bleed category feature banner, matching the live site's (Enfold/Avia theme)
// "bottom_top" background-image parallax with the category name overlaid in white.
// The live site's avia-snippet-parallax.js computes, on every scroll:
//   scrollPos = (winBottom - elTop) * speed   where winBottom = scrollY + innerHeight,
//   elTop = the banner's top offset in the document, speed = 0.5
// and applies translateY(scrollPos) to an oversized background layer clipped by the
// container. We reproduce that exact formula (rect.top is just elTop - scrollY, so
// winBottom - elTop === innerHeight - rect.top) instead of CSS `background-attachment:
// fixed`, which isn't reliable once any ancestor has a transform (sticky header, etc.).
// Image always comes from the current env — no fallback host.
const PARALLAX_SPEED = 0.5;

export default function CategoryBanner({
  image,
  title,
}: {
  image: { sourceUrl: string; altText: string | null } | null;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    if (!container || !bg) return;

    let ticking = false;
    let baseline: number | null = null;
    const update = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const scrollPos = Math.ceil((window.innerHeight - rect.top) * PARALLAX_SPEED);
      if (baseline === null) baseline = scrollPos;
      bg.style.transform = `translateY(${scrollPos - baseline}px)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const onResize = () => {
      baseline = null;
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!image) return null;

  return (
    <div ref={containerRef} className="relative flex h-[280px] items-center justify-center overflow-hidden md:h-[355px]">
      <div
        ref={bgRef}
        role="img"
        aria-label={image.altText ?? title}
        className="absolute -top-1/2 left-0 h-[200%] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image.sourceUrl})` }}
      />
      <h1 className="relative font-[family-name:var(--f-head)] text-[32px] font-bold text-white md:text-[40px]">
        {title}
      </h1>
    </div>
  );
}