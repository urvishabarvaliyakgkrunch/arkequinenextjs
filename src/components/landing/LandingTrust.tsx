// src/components/landing/LandingTrust.tsx
import Image from "next/image";
import { TRUST, upload } from "@/components/landing/landingData";

export default function LandingTrust() {
  return (
    <section className="bg-teal text-white max-[767px]:px-5! max-[767px]:py-10!">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-center px-8">
        {TRUST.map((t) => (
          <div
            key={t.title}
            className="relative flex min-w-[240px] flex-1 items-center justify-center gap-[14px] px-11 py-[26px] before:absolute before:top-[22px] before:bottom-[22px] before:left-0 before:w-px before:bg-white/[0.22] first:before:hidden max-[560px]:min-w-full max-[560px]:px-6 max-[560px]:py-5 max-[560px]:before:hidden"
          >
            <Image src={upload(t.icon)} alt="" width={38} height={38} unoptimized className="h-[38px] w-[38px] brightness-0 invert" />
            <div className="flex flex-col leading-[1.15]">
              <b className="text-[13px] font-bold tracking-[0.14em] uppercase">{t.title}</b>
              <span className="text-[12px] opacity-85">{t.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
