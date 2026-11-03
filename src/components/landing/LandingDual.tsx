// src/components/landing/LandingDual.tsx
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/landing/Reveal";
import { DUAL, upload } from "@/components/landing/landingData";

export default function LandingDual() {
  return (
    <section id="equine" className="mx-auto max-w-[1240px] py-24 max-[767px]:px-5! max-[767px]:py-10!">
      <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
        {DUAL.map((d) => (
          <Reveal key={d.title}>
            <article className="group relative flex min-h-[440px] cursor-pointer items-end overflow-hidden rounded-[8px] bg-graphite after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(40,42,44,.86)_0%,rgba(40,42,44,.3)_45%,rgba(40,42,44,0)_75%)] after:content-[''] max-[900px]:min-h-[340px]">
              <Image src={upload(d.image)} alt="" fill sizes="(max-width: 900px) 100vw, 620px" className="object-cover grayscale-[.45] contrast-[1.04] transition-[transform,filter] duration-[800ms] ease-lt group-hover:scale-105 group-hover:grayscale-0" />
              <div className="pointer-events-none absolute inset-4 z-[2] border border-white/0 transition-[border-color] duration-[550ms] ease-lt group-hover:border-white/50" />
              <div className="relative z-[3] p-[30px] text-white">
                <span className="mb-[14px] block text-[10px] font-bold tracking-[0.2em] uppercase opacity-85">{d.eyebrow}</span>
                <h3 className="mb-3 font-serif-lt text-[clamp(30px,4vw,44px)] leading-none font-light tracking-[-0.01em]">{d.title}</h3>
                <div className="mb-4 h-[2px] w-[34px] bg-teal transition-[width] duration-500 ease-lt group-hover:w-[60px]" />
                <p className="mb-[22px] max-w-[330px] text-[14px] opacity-90">{d.text}</p>
                <Link href={d.href} className="group/go inline-flex items-center gap-[9px] text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                  {d.cta}
                  <span className="transition-transform duration-[350ms] ease-lt group-hover:translate-x-[6px]">→</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
