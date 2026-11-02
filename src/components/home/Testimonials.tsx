// src/components/home/Testimonials.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "./homeData";

// LayerSlider canvas width; positions/sizes scale with the section via cqw.
const CANVAS = 1905;
const cqw = (px: number) => `${(px / CANVAS) * 100}cqw`;

const ARROW =
  "absolute top-1/2 z-10 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-[3px] bg-black/30 text-white opacity-0 transition-opacity duration-300 hover:!opacity-100 focus-visible:opacity-100 group-hover/slider:opacity-50 sm:h-[60px] sm:w-[60px]";
const CONTROL =
  "flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-white bg-black text-white transition-opacity hover:opacity-60";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const go = (step: number) => setActive((i) => (i + step + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setTimeout(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section
      aria-label="Testimonials"
      className="group/slider relative aspect-[1905/520] w-full overflow-hidden [container-type:inline-size]"
    >
      {TESTIMONIALS.map((t, i) => (
        <div
          key={t.img}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image src={t.img} alt="" fill sizes="100vw" className="object-cover object-bottom" />
          <div
            className="absolute inset-0 flex flex-col items-center text-center text-white [font-family:Arial,sans-serif]"
            style={{ paddingTop: cqw(t.heading.y) }}
          >
            <h2 className="leading-[1.15] font-normal" style={{ fontSize: cqw(53.5459) }}>
              TESTIMONIALS
            </h2>
            <p
              className="leading-[1.45]"
              style={{ marginTop: cqw(18), maxWidth: cqw(720), fontSize: cqw(22.6541) }}
            >
              {t.quoteLines.join(" ")}
            </p>
            <p className="leading-[1.45]" style={{ marginTop: cqw(12), fontSize: cqw(22.6541) }}>
              {t.authorLines[0]}
              <br />
              {t.authorLines[1]}
            </p>
          </div>
        </div>
      ))}

      <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={`${ARROW} left-[2%]`}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={`${ARROW} right-[2%]`}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[5px]" style={{ top: cqw(460) }}>
        <button
          type="button"
          aria-label="Start slideshow"
          aria-pressed={playing}
          onClick={() => setPlaying(true)}
          className={`${CONTROL} ${playing ? "opacity-60" : "opacity-30"}`}
        >
          <svg viewBox="0 0 10 10" width="9" height="9" fill="currentColor" aria-hidden="true">
            <path d="M2 1l7 4-7 4z" />
          </svg>
        </button>
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.img}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-[14px] w-[14px] rounded-full border-2 border-white bg-black transition-opacity hover:opacity-60 ${
              i === active ? "opacity-60" : "opacity-30"
            }`}
          />
        ))}
        <button
          type="button"
          aria-label="Stop slideshow"
          aria-pressed={!playing}
          onClick={() => setPlaying(false)}
          className={`${CONTROL} ${playing ? "opacity-30" : "opacity-60"}`}
        >
          <svg viewBox="0 0 10 10" width="9" height="9" fill="currentColor" aria-hidden="true">
            <path d="M2 1h2v8H2zM6 1h2v8H6z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
