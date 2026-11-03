// src/components/landing/LandingBest.tsx
import Image from "next/image";
import SectionTitle from "@/components/landing/SectionTitle";
import Reveal from "@/components/landing/Reveal";
import BestCarousel from "@/components/landing/BestCarousel";
import { BEST } from "@/components/landing/landingData";

const ROUND_ADD = "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-graphite text-[19px] text-white transition-all duration-300 ease-lt hover:scale-[1.08] hover:bg-teal";

function Price({ value, cls }: { value: string; cls: string }) {
  return (
    <span className="flex items-baseline gap-[5px]">
      <span className={`text-[13px] font-bold ${cls}`}>€</span>
      <span className={`font-serif-lt text-[26px] font-normal ${cls}`}>{value}</span>
    </span>
  );
}

export default function LandingBest() {
  const h = BEST.hero;
  const cards = BEST.cards.map((c, i) => (
    <article key={c.name} className="group relative flex flex-col overflow-hidden rounded-[8px] border border-grey bg-white transition-[border-color,box-shadow] duration-[350ms] ease-lt hover:border-teal hover:shadow-[0_14px_36px_-22px_rgba(0,168,173,0.55)]">
      <span className="absolute top-[14px] left-[14px] z-[3] font-serif-lt text-[18px] font-light text-teal-deep italic">{String(i + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="absolute top-3 right-3 z-[3] flex h-8 w-8 items-center justify-center rounded-full border border-grey bg-white text-[15px] text-[#bcbdbf] transition-all duration-250 hover:border-teal hover:text-teal">&#9825;</span>
      <div className="relative flex h-[210px] items-center justify-center px-6 pt-7 before:absolute before:bottom-[18px] before:left-1/2 before:h-[140px] before:w-[140px] before:-translate-x-1/2 before:rounded-full before:bg-grey-soft before:transition-all before:duration-[450ms] before:ease-lt before:content-[''] group-hover:before:h-[162px] group-hover:before:w-[162px] group-hover:before:bg-teal-tint">
        <Image src={c.image} alt={c.name} width={165} height={165} className="relative z-[2] max-h-[165px] w-auto object-contain transition-transform duration-[450ms] ease-lt group-hover:-translate-y-[7px]" />
      </div>
      <div className="flex flex-1 flex-col px-6 pt-[22px] pb-6">
        <span className="mb-2 text-[10px] font-bold tracking-[0.14em] text-[#a7a8aa] uppercase">{c.cat}</span>
        <h3 className="mb-[7px] font-serif-lt text-[22px] leading-[1.1] font-normal text-graphite">{c.name}</h3>
        <p className="mb-5 flex-1 text-[12.5px] leading-[1.5] text-[#9a9b9d]">{c.desc}</p>
        <div className="flex items-center justify-between gap-[10px]">
          <Price value={c.price} cls="text-graphite" />
          <button type="button" aria-label={`Add ${c.name}`} className={ROUND_ADD}>+</button>
        </div>
      </div>
    </article>
  ));

  return (
    <section id="bestsellers" className="mx-auto max-w-[1240px] py-24 max-[767px]:px-5! max-[767px]:py-10!">
      <SectionTitle title={BEST.title} text={BEST.text} />
      <Reveal className="mt-9 grid grid-cols-[340px_1fr] items-stretch gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-5">
        <aside className="relative flex flex-col justify-between overflow-hidden rounded-[10px] bg-[linear-gradient(155deg,#5f6063_0%,#3f4042_55%,#303133_100%)] px-[30px] py-[34px] text-white before:pointer-events-none before:absolute before:-top-[40%] before:-right-[30%] before:h-4/5 before:w-4/5 before:bg-[radial-gradient(circle,rgba(0,168,173,.32),rgba(0,168,173,0)_70%)] before:content-[''] max-[900px]:flex-row max-[900px]:items-center max-[900px]:gap-6 max-[560px]:flex-col">
          <div>
            <div className="mb-4 text-[10px] font-bold tracking-[0.2em] text-[#7fd8d2] uppercase">Editor&apos;s choice</div>
            <h3 className="mb-[14px] font-serif-lt text-[36px] leading-[1.02] font-light tracking-[-0.01em]">{h.name}</h3>
            <p className="mb-5 max-w-[250px] text-[13px] leading-[1.55] opacity-85">{h.text}</p>
          </div>
          <div className="mt-1 mb-5 self-center max-[900px]:m-0">
            <Image src={h.image} alt={h.name} width={190} height={190} className="max-h-[190px] w-auto drop-shadow-[0_16px_26px_rgba(0,0,0,0.4)]" />
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.18] pt-[18px]">
            <span className="flex items-baseline gap-[5px]">
              <span className="text-[13px] font-bold">€</span>
              <span className="font-serif-lt text-[28px] font-normal">{h.price}</span>
            </span>
            <button type="button" className="cursor-pointer rounded-[3px] border-0 bg-white px-5 py-3 text-[11px] font-bold tracking-[0.1em] text-graphite-deep uppercase transition-all duration-250 hover:bg-teal hover:text-white">Add to bag</button>
          </div>
        </aside>
        <BestCarousel cards={cards} />
      </Reveal>
    </section>
  );
}
