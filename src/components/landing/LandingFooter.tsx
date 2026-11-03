// src/components/landing/LandingFooter.tsx
import Image from "next/image";
import Link from "next/link";
import { FOOTER as FOOTER_DATA, SITE } from "@/components/landing/landingData";

// Live footer copy is Helvetica (the site body font); only the column titles are Lato
const BODY = "font-[family-name:HelveticaNeue,'Helvetica_Neue',Helvetica,Arial,sans-serif]";
const COL_TITLE = "mb-[18px] font-sans text-[11px] leading-[1.1] font-bold tracking-[0.16em] text-teal uppercase";
const SOCIAL = "flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/20 text-[13px] leading-[28.05px] text-white opacity-80 transition-all duration-250 hover:border-teal hover:bg-teal hover:opacity-100";

// Same footer on every page
export default function LandingFooter() {
  const FOOTER = { ...FOOTER_DATA, logo: SITE.logo, copyright: `© ${new Date().getFullYear()} ark-equine.com` };
  return (
    <footer id="about" className={`${BODY} bg-graphite-deep px-5 py-[72px] text-[17px] leading-[28.05px] text-white`}>
      <div className="mx-auto max-w-[1240px] px-8 max-[560px]:px-0">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 pb-[52px] max-[900px]:grid-cols-2 max-[900px]:gap-8 max-[560px]:grid-cols-1">
          <div>
            <Image src={FOOTER.logo} alt="ARK Equine" width={160} height={67} unoptimized className="mb-5 h-auto w-[160px] brightness-0 invert" />
            <p className="my-[11.05px] max-w-[280px] text-[13px] leading-[1.6] opacity-70">{FOOTER.text}</p>
          </div>
          {FOOTER.cols.map((c) => (
            <div key={c.title}>
              <h5 className={COL_TITLE}>{c.title}</h5>
              <ul className="mb-5 ml-[7px]">
                {c.links.map(([label, href]) => (
                  <li key={label} className="mb-[11px]">
                    <Link href={href} className="block text-[13.5px] leading-[28.05px] opacity-[.78] transition-[opacity,color] duration-200 hover:text-teal hover:opacity-100">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 className={COL_TITLE}>{FOOTER.contactTitle}</h5>
            {FOOTER.offices.map((o) => (
              <div key={o.name} className="mb-4 text-[13px] leading-[1.7] opacity-[.78]">
                <b className="mb-[3px] block font-bold opacity-100">{o.name}</b>
                {o.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.12] py-6">
          <span className="text-[12px] leading-[28.05px] opacity-60">{FOOTER.copyright}</span>
          <div className="flex gap-[14px]">
            <a href="#" aria-label="Instagram" className={SOCIAL}>◎</a>
            <a href="#" aria-label="Facebook" className={SOCIAL}>f</a>
            <a href="#" aria-label="LinkedIn" className={SOCIAL}>in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
