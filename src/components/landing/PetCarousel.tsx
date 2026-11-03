// src/components/landing/PetCarousel.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PET } from "@/components/landing/landingData";

const ARROW = "absolute top-1/2 z-[12] flex h-[42px] w-[42px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-grey bg-white text-[17px] text-graphite transition-all duration-250 hover:enabled:border-graphite hover:enabled:bg-graphite hover:enabled:text-white disabled:cursor-not-allowed disabled:opacity-30";

type Item = (typeof PET.items)[number];

function Mini({ item }: { item: Item }) {
  return (
    <article className="group relative flex min-h-[251px] overflow-hidden rounded-[8px] bg-grey after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,rgba(40,42,44,.55)_0%,rgba(40,42,44,0)_45%,rgba(40,42,44,.4)_100%)] after:content-[''] max-[560px]:min-h-[220px]">
      <Image src={item.image} alt={item.title} fill sizes="300px" className="object-cover transition-transform duration-[800ms] ease-lt group-hover:scale-105" />
      <div className="pointer-events-none absolute inset-[10px] z-[2] border border-white/0 transition-[border-color] duration-[550ms] ease-lt group-hover:border-white/50" />
      <div className="relative z-[3] flex w-full flex-col justify-between text-white">
        <div className="px-[18px] pt-[18px]">
          <span className="block text-[9px] font-bold tracking-[0.2em] uppercase opacity-[.82]">Pet Range</span>
          <h3 className="mt-1 mb-3 font-serif-lt text-[20px] leading-[1.04] font-light tracking-[-0.01em]">{item.title}</h3>
          <div className="h-[2px] w-[30px] bg-teal transition-[width] duration-500 ease-lt group-hover:w-[54px]" />
        </div>
        <Link href={item.href} className="mt-auto mr-auto mb-4 ml-[18px] rounded-[3px] bg-teal px-[13px] py-2 text-[9px] font-bold tracking-[0.1em] text-white uppercase">View product</Link>
      </div>
    </article>
  );
}

// ALZERpets is the big anchor; the other pet products slide in pages of four
export default function PetCarousel() {
  const h = PET.hero;
  const pages: Item[][] = [];
  for (let i = 0; i < PET.items.length; i += 4) pages.push(PET.items.slice(i, i + 4));
  const [page, setPage] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const last = pages.length - 1;
  const go = (p: number) => setPage(Math.max(0, Math.min(p, last)));

  return (
    <div className="relative mt-9">
      <button type="button" aria-label="Previous pet products" disabled={page === 0} onClick={() => go(page - 1)} className={`${ARROW} -left-[21px] max-[900px]:left-[6px]`}>‹</button>
      <button type="button" aria-label="More pet products" disabled={page === last} onClick={() => go(page + 1)} className={`${ARROW} -right-[21px] max-[900px]:right-[6px]`}>›</button>
      <div className="grid grid-cols-[1.05fr_1fr] items-stretch gap-[22px] max-[900px]:grid-cols-1">
        <article className="group relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[10px] bg-grey-soft after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(40,42,44,.55)_0%,rgba(40,42,44,0)_50%)] after:content-[''] max-[900px]:min-h-[420px]">
          <Image src={h.image} alt={h.name} fill priority={false} sizes="(max-width: 900px) 100vw, 600px" className="object-cover" />
          <div className="relative z-[3] px-[34px] pt-[34px]">
            <span className="mb-3 block text-[11px] font-bold tracking-[0.22em] text-[#007f83] uppercase">{h.eyebrow}</span>
            <h3 className="font-serif-lt text-[36px] leading-[38px] font-light tracking-[-0.01em] text-[#58595b]">{h.name}</h3>
          </div>
          <div className="relative z-[3] p-[34px] text-white">
            <span className="mb-1 block font-serif-lt text-[20px]">{h.name}</span>
            <span className="mb-[18px] block max-w-[450px] text-[13px] leading-[28px]">{h.text}</span>
            <Link href={h.href} className="inline-flex items-center gap-[7px] rounded-[3px] bg-teal px-[18px] py-[18px] text-[11px] font-bold tracking-[0.14em] text-white uppercase">
              View products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
        <div
          className="overflow-hidden"
          onPointerDown={(e) => setStartX(e.clientX)}
          onPointerUp={(e) => {
            if (startX !== null && Math.abs(e.clientX - startX) > 60) go(page + (e.clientX < startX ? 1 : -1));
            setStartX(null);
          }}
        >
          <div className="flex h-full gap-12 transition-transform duration-[550ms] ease-lt will-change-transform" style={{ transform: `translateX(calc(${-page * 100}% - ${page * 48}px))` }}>
            {pages.map((p, pi) => (
              <div key={pi} className="grid flex-[0_0_100%] grid-cols-2 grid-rows-2 gap-[18px]">
                {p.map((it) => <Mini key={it.title} item={it} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
