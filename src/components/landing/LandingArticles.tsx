// src/components/landing/LandingArticles.tsx
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/landing/Reveal";
import ArticlesCarousel from "@/components/landing/ArticlesCarousel";
import { ARTICLES, upload } from "@/components/landing/landingData";

export default function LandingArticles() {
  const cards = ARTICLES.items.map((a) => (
    <article key={a.title} className="group flex cursor-pointer flex-col">
      <div className="relative mb-[18px] aspect-[3/2] overflow-hidden rounded-[8px] bg-graphite">
        <Image src={upload(a.image)} alt="" fill sizes="(max-width: 900px) 80vw, 420px" className="object-cover grayscale-[.35] contrast-[1.04] transition-[transform,filter] duration-700 ease-lt group-hover:scale-105 group-hover:grayscale-0" />
        {a.video && (
          <span className="absolute top-1/2 left-1/2 z-[2] flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.92] transition-all duration-300 ease-lt after:ml-1 after:border-y-[10px] after:border-l-[16px] after:border-y-transparent after:border-l-graphite after:content-[''] group-hover:scale-110 group-hover:bg-white" />
        )}
      </div>
      <div className="mb-[10px] text-[10px] font-bold tracking-[0.16em] text-teal-deep uppercase">{a.cat}</div>
      <h3 className="mb-[10px] font-serif-lt text-[20px] leading-[1.18] font-normal text-graphite transition-colors duration-250 group-hover:text-teal-deep">{a.title}</h3>
      <p className="mb-[14px] text-[13px] leading-[1.55] text-[#9a9b9d]">{a.text}</p>
      <Link href="#" className="inline-flex items-center gap-[7px] text-[11px] font-bold tracking-[0.12em] text-graphite uppercase">
        {a.cta}
        <span className="transition-transform duration-300 ease-lt group-hover:translate-x-[5px]">→</span>
      </Link>
    </article>
  ));

  return (
    <section id="science" className="bg-grey-soft py-24 max-[767px]:px-5! max-[767px]:py-10!">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[300px_1fr] items-start gap-12 px-8 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <Reveal className="sticky top-[100px] max-[900px]:static">
          <span className="mb-4 block text-[11px] font-bold tracking-[0.22em] text-teal uppercase">{ARTICLES.eyebrow}</span>
          <h2 className="mb-[18px] font-serif-lt text-[clamp(28px,3.2vw,40px)] leading-[1.05] font-light tracking-[-0.01em] text-graphite">{ARTICLES.title}</h2>
          <p className="mb-[30px] text-[14.5px] leading-[1.6] text-graphite-deep">{ARTICLES.text}</p>
          <Link href={ARTICLES.cta.href} className="group inline-flex items-center gap-[9px] rounded-[3px] border border-grey bg-white px-6 py-[14px] text-[12px] font-bold tracking-[0.08em] text-graphite uppercase transition-all duration-[280ms] ease-lt hover:border-graphite">
            {ARTICLES.cta.label}
            <span className="transition-transform duration-300 ease-lt group-hover:translate-x-[5px]">→</span>
          </Link>
        </Reveal>
        <Reveal className="min-w-0">
          <ArticlesCarousel cards={cards} />
        </Reveal>
      </div>
    </section>
  );
}
