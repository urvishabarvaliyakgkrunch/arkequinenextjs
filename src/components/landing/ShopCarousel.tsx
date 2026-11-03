// src/components/landing/ShopCarousel.tsx
"use client";

import { useState } from "react";
import ShopCard from "@/components/landing/ShopCard";
import type { ShopCategory } from "@/components/landing/landingData";

const ARROW = "absolute top-1/2 z-[12] flex h-[42px] w-[42px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-grey bg-white text-[17px] text-graphite transition-all duration-250 hover:enabled:border-graphite hover:enabled:bg-graphite hover:enabled:text-white disabled:cursor-not-allowed disabled:opacity-30";

// First category is the big anchor; the rest slide in pages of four
export default function ShopCarousel({ items }: { items: ShopCategory[] }) {
  const [big, ...rest] = items;
  const pages: ShopCategory[][] = [];
  for (let i = 0; i < rest.length; i += 4) pages.push(rest.slice(i, i + 4));
  const [page, setPage] = useState(0);
  const last = pages.length - 1;
  const [startX, setStartX] = useState<number | null>(null);

  const go = (p: number) => setPage(Math.max(0, Math.min(p, last)));

  return (
    <div className="relative mt-9">
      <button type="button" aria-label="Previous categories" disabled={page === 0} onClick={() => go(page - 1)} className={`${ARROW} -left-[21px] max-[900px]:left-[6px]`}>‹</button>
      <button type="button" aria-label="More categories" disabled={page === last} onClick={() => go(page + 1)} className={`${ARROW} -right-[21px] max-[900px]:right-[6px]`}>›</button>
      <div className="grid grid-cols-[1.12fr_1fr] items-stretch gap-[18px] max-[900px]:grid-cols-1">
        <ShopCard item={big} num="★" big />
        <div className="relative overflow-hidden rounded-[6px]">
          <div
            className="h-full overflow-hidden"
            onPointerDown={(e) => setStartX(e.clientX)}
            onPointerUp={(e) => {
              if (startX !== null && Math.abs(e.clientX - startX) > 60) go(page + (e.clientX < startX ? 1 : -1));
              setStartX(null);
            }}
          >
            <div className="flex h-full gap-12 transition-transform duration-[550ms] ease-lt will-change-transform" style={{ transform: `translateX(calc(${-page * 100}% - ${page * 48}px))` }}>
              {pages.map((p, pi) => (
                <div key={pi} className="grid flex-[0_0_100%] grid-cols-2 grid-rows-2 gap-[18px]">
                  {p.map((c, ci) => (
                    <ShopCard key={c.title} item={c} num={String(pi * 4 + ci + 2).padStart(2, "0")} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[18px] flex justify-end max-[900px]:justify-center">
        <div className="flex gap-2">
          {pages.map((_, i) => (
            <button key={i} type="button" aria-label={`Categories page ${i + 1}`} onClick={() => go(i)} className={`h-[7px] cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${i === page ? "w-[22px] rounded-[4px] bg-teal" : "w-[7px] bg-grey"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
