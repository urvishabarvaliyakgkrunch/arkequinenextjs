// src/components/landing/LandingHero.tsx
import Image from "next/image";
import ArrowButton from "@/components/landing/ArrowButton";
import { HERO } from "@/components/landing/landingData";

const RISE = "translate-y-4 opacity-0";
const MOTION = "motion-reduce:translate-y-0 motion-reduce:animate-none motion-reduce:opacity-100";
const A_EYEBROW = "animate-[rise_.8s_cubic-bezier(.2,.6,.2,1)_.15s_forwards]";
const A_LINE1 = "animate-[rise_.9s_cubic-bezier(.2,.6,.2,1)_.28s_forwards]";
const A_LINE2 = "animate-[rise_.9s_cubic-bezier(.2,.6,.2,1)_.4s_forwards]";
const A_SUB = "animate-[rise_.8s_cubic-bezier(.2,.6,.2,1)_.56s_forwards]";
const A_ACTIONS = "animate-[rise_.8s_cubic-bezier(.2,.6,.2,1)_.68s_forwards]";

export default function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-grey-soft max-[900px]:flex max-[900px]:flex-col max-[767px]:px-5! max-[767px]:py-10!">
      <div className="relative aspect-[1920/725] w-full max-[900px]:aspect-[16/10]">
        <Image src={HERO.image} alt="" fill priority sizes="100vw" className="object-cover object-right max-[900px]:object-center" />
      </div>
      <div className="absolute inset-0 z-[2] flex items-center max-[900px]:relative max-[900px]:inset-auto max-[900px]:pt-8 max-[900px]:pb-2 max-[560px]:px-5">
        <div className="mx-auto w-full max-w-[1240px] px-8">
          <div className="max-w-[42%] max-[900px]:max-w-none">
            <span className={`${RISE} ${A_EYEBROW} ${MOTION} block text-[11px] font-bold tracking-[0.22em] text-teal uppercase`}>{HERO.eyebrow}</span>
            <h1 className="mt-4 font-serif-lt text-[clamp(30px,4.4vw,62px)] leading-none font-light tracking-[-0.02em] text-graphite max-[900px]:text-[clamp(34px,9vw,52px)]">
              <span className={`${RISE} ${A_LINE1} ${MOTION} block`}>{HERO.lines[0]}</span>
              <span className={`${RISE} ${A_LINE2} ${MOTION} block text-teal`}>{HERO.lines[1]}</span>
            </h1>
            <p className={`${RISE} ${A_SUB} ${MOTION} mt-[18px] mb-[26px] max-w-[360px] text-[clamp(14px,1.1vw,17px)] text-graphite-deep max-[900px]:max-w-none`}>{HERO.sub}</p>
            <div className={`${RISE} ${A_ACTIONS} ${MOTION} flex flex-wrap gap-[14px]`}>
              <ArrowButton href={HERO.cta.href}>{HERO.cta.label}</ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
