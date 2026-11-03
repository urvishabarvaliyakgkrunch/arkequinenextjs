// src/components/landing/LandingQuote.tsx
import Image from "next/image";
import Link from "next/link";
import { QUOTE, upload } from "@/components/landing/landingData";

export default function LandingQuote() {
  const p = QUOTE.product;
  return (
    <section id="ambassador" className="relative overflow-hidden bg-graphite text-white max-[767px]:px-5! max-[767px]:py-10!">
      <div className="grid min-h-[560px] grid-cols-[1.05fr_1fr] items-stretch max-[900px]:grid-cols-1">
        <div className="relative max-[900px]:min-h-[300px] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(40,42,44,0)_55%,rgba(63,64,66,.85)_100%)] after:content-[''] max-[900px]:after:bg-[linear-gradient(180deg,rgba(40,42,44,0)_50%,rgba(63,64,66,.9)_100%)]">
          <Image src={upload(QUOTE.image)} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover object-left" />
        </div>
        <div className="relative flex flex-col justify-center bg-[linear-gradient(120deg,rgba(63,64,66,.9),rgba(48,50,52,.95))] px-14 py-16 max-[900px]:px-7 max-[900px]:py-11">
          <div className="mb-[6px] font-serif-lt text-[96px] leading-[.6] text-teal italic opacity-55">&ldquo;</div>
          <p className="mb-8 max-w-[520px] font-serif-lt text-[clamp(22px,2.6vw,30px)] leading-[1.32] font-light tracking-[-0.01em]">{QUOTE.text}</p>
          <div className="mb-2 flex items-center gap-4">
            <span className="text-[13px] tracking-[3px] text-teal">★★★★★</span>
          </div>
          <div className="text-[15px] font-black tracking-[0.04em] uppercase">{QUOTE.name}</div>
          <div className="mb-[30px] text-[13px] opacity-70">{QUOTE.role}</div>
          <div className="flex max-w-[430px] items-center gap-[18px] border-t border-white/[0.16] pt-[26px] max-[560px]:flex-wrap">
            <Image src={p.image} alt="" width={74} height={110} className="h-auto w-[74px] drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]" />
            <div className="flex-1">
              <div className="mb-1 text-[9px] font-bold tracking-[0.18em] text-teal uppercase">{p.eyebrow}</div>
              <div className="mb-[2px] font-serif-lt text-[21px] font-normal">{p.name}</div>
              <div className="text-[12px] opacity-[.72]">{p.sub}</div>
            </div>
            <Link href={p.href} className="rounded-[3px] bg-white px-4 py-[10px] text-[10px] font-bold tracking-[0.12em] whitespace-nowrap text-graphite uppercase transition-all duration-250 hover:bg-teal hover:text-white">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
