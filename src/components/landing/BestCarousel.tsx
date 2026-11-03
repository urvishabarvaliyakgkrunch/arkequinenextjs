// src/components/landing/BestCarousel.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useSlider } from "@/components/landing/useSlider";

const BTN = "flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full border border-grey bg-white text-[18px] text-graphite transition-all duration-250 hover:enabled:border-graphite hover:enabled:bg-graphite hover:enabled:text-white disabled:cursor-not-allowed disabled:opacity-30";

export default function BestCarousel({ cards }: { cards: ReactNode[] }) {
  const { track, style, prev, next, atStart, atEnd, swipe } = useSlider(cards.length);
  return (
    <div className="relative overflow-hidden">
      <div className="overflow-hidden" {...swipe}>
        <div ref={track} style={style} className="flex gap-6 transition-transform duration-[550ms] ease-lt will-change-transform [&>*]:flex-[0_0_calc((100%-24px)/2.25)] max-[900px]:[&>*]:flex-[0_0_calc((100%-24px)/1.6)] max-[560px]:[&>*]:flex-[0_0_86%]">
          {cards}
        </div>
      </div>
      <div className="mt-7 flex items-center justify-between">
        <Link href="/shop/" className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-teal-deep uppercase">
          View all products <span className="transition-transform duration-300 ease-lt group-hover:translate-x-[5px]">→</span>
        </Link>
        <div className="flex gap-[10px]">
          <button type="button" aria-label="Previous" disabled={atStart} onClick={prev} className={BTN}>←</button>
          <button type="button" aria-label="Next" disabled={atEnd} onClick={next} className={BTN}>→</button>
        </div>
      </div>
    </div>
  );
}
