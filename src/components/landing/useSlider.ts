// src/components/landing/useSlider.ts
"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// Slide-by-slide carousel: moves one card width (plus gap) per click
export function useSlider(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [{ step, max }, setSize] = useState({ step: 0, max: 0 });

  const measure = useCallback(() => {
    const t = track.current;
    const first = t?.children[0];
    if (!t || !first) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const s = first.getBoundingClientRect().width + gap;
    const viewport = t.parentElement?.getBoundingClientRect().width ?? 0;
    const perView = Math.max(1, Math.round(viewport / s));
    setSize({ step: s, max: Math.max(0, count - perView) });
  }, [count]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, [measure]);

  const current = Math.min(index, max);
  const go = (delta: number) => setIndex(Math.max(0, Math.min(current + delta, max)));

  return {
    track,
    style: { transform: `translateX(${-current * step}px)` },
    prev: () => go(-1),
    next: () => go(1),
    atStart: current === 0,
    atEnd: current === max,
    // Swipe: a drag of more than a quarter of a card moves one slide
    swipe: {
      onPointerDown: (e: React.PointerEvent) => {
        (e.currentTarget as HTMLElement).dataset.x = String(e.clientX);
      },
      onPointerUp: (e: React.PointerEvent) => {
        const dx = e.clientX - Number((e.currentTarget as HTMLElement).dataset.x ?? e.clientX);
        if (Math.abs(dx) > step * 0.25) go(dx < 0 ? 1 : -1);
      },
    },
  };
}
