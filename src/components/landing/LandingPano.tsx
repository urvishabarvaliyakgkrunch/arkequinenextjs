// src/components/landing/LandingPano.tsx
import Image from "next/image";
import ArrowButton from "@/components/landing/ArrowButton";
import Reveal from "@/components/landing/Reveal";
import { PANO, upload } from "@/components/landing/landingData";

export default function LandingPano() {
  return (
    <section id="consult" className="relative flex min-h-[600px] items-center overflow-hidden bg-grey-soft max-[900px]:min-h-0 max-[900px]:flex-col max-[900px]:p-0 max-[767px]:px-5! max-[767px]:py-10!">
      <div className="absolute inset-0 z-0 max-[900px]:relative max-[900px]:h-[280px] max-[900px]:w-full">
        <Image src={upload(PANO.image)} alt="" fill sizes="100vw" className="object-cover object-right-top max-[900px]:object-center" />
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(100deg,#fff_0%,#fff_26%,rgb(255_255_255/65%)_46%,rgb(255_255_255/0%)_64%)] max-[900px]:hidden" />
      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-8 max-[900px]:px-5 max-[900px]:py-9">
        <Reveal className="max-w-[470px] max-[900px]:max-w-none">
          <span className="mb-4 block text-[11px] font-bold tracking-[0.22em] text-teal uppercase">{PANO.eyebrow}</span>
          <h2 className="mb-[18px] font-serif-lt text-[clamp(30px,4vw,46px)] leading-[1.04] font-light tracking-[-0.01em] text-graphite">{PANO.title}</h2>
          <p className="mb-[30px] max-w-[420px] text-[15px] text-graphite-deep">{PANO.text}</p>
          <div className="mb-8 flex gap-7 max-[560px]:gap-[18px]">
            {PANO.meta.map(([b, s]) => (
              <div key={b} className="flex flex-col">
                <b className="font-serif-lt text-[24px] font-normal text-teal-deep">{b}</b>
                <span className="text-[11px] font-bold tracking-[0.1em] text-[#9a9b9d] uppercase">{s}</span>
              </div>
            ))}
          </div>
          <ArrowButton href={PANO.cta.href}>{PANO.cta.label}</ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
