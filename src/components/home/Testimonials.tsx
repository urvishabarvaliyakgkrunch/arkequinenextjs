// src/components/home/Testimonials.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "./homeData";

// LayerSlider canvas width; positions/sizes scale with the section via cqw.
const CANVAS = 1905;
const cqw = (px: number) => `${(px / CANVAS) * 100}cqw`;

const TEXT = "absolute whitespace-nowrap text-white [font-family:Arial,sans-serif]";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section
      aria-label="Testimonials"
      className="relative aspect-[1905/494] w-full overflow-hidden [container-type:inline-size]"
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
          <p
            className={`${TEXT} text-left leading-normal`}
            style={{ left: cqw(t.heading.x), top: cqw(t.heading.y), fontSize: cqw(53.5459) }}
          >
            TESTIMONIALS
          </p>
          <p
            className={`${TEXT} text-center leading-normal`}
            style={{ left: cqw(t.quote.x), top: cqw(t.quote.y), fontSize: cqw(22.6541) }}
          >
            {t.quoteLines.map((line, n) => (
              <span key={n} className="block">
                {line}
              </span>
            ))}
          </p>
          <p
            className={`${TEXT} text-center leading-normal`}
            style={{ left: cqw(t.author.x), top: cqw(t.author.y), fontSize: cqw(22.6541) }}
          >
            {t.authorLines.map((line, n) => (
              <span key={n} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}

      <div className="absolute left-1/2 flex -translate-x-1/2" style={{ top: cqw(437) }}>
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
      </div>
    </section>
  );
}
