// src/components/landing/LandingPartners.tsx
import { PARTNERS } from "@/components/landing/landingData";

export default function LandingPartners() {
  return (
    <section className="bg-teal py-11 max-[767px]:px-5! max-[767px]:py-10!">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-10 px-8 max-[900px]:justify-center">
        <span className="text-[11px] font-bold tracking-[0.18em] whitespace-nowrap text-white/85 uppercase">{PARTNERS.label}</span>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-12 max-[900px]:justify-center max-[900px]:gap-8">
          {PARTNERS.logos.map((l) => (
            <span key={l} className="font-serif-lt text-[22px] font-normal text-white italic opacity-[.92]">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
