// src/components/landing/ShopCard.tsx
import Image from "next/image";
import Link from "next/link";
import { upload, type ShopCategory } from "@/components/landing/landingData";

interface Props {
  item: ShopCategory;
  num: string;
  big?: boolean;
}

// Category tile: grey photo that turns to colour on hover, text reveals
export default function ShopCard({ item, num, big = false }: Props) {
  return (
    <article className={`group relative flex cursor-pointer overflow-hidden rounded-[6px] bg-grey after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(40,42,44,.86)_0%,rgba(40,42,44,.28)_52%,rgba(40,42,44,0)_80%)] after:content-[''] ${big ? "min-h-[496px] max-[900px]:min-h-[340px]" : "min-h-[239px] max-[560px]:min-h-[200px]"}`}>
      <Image src={upload(item.image)} alt="" fill sizes={big ? "(max-width: 900px) 100vw, 650px" : "300px"} className="object-cover grayscale-[.45] contrast-[1.04] transition-[transform,filter] duration-[800ms] ease-lt group-hover:scale-105 group-hover:grayscale-0" />
      <div className="pointer-events-none absolute inset-3 z-[2] border border-white/0 transition-[border-color] duration-[550ms] ease-lt group-hover:border-white/50" />
      <div className={`relative z-[3] w-full self-end text-white ${big ? "p-[30px]" : "p-[18px]"}`}>
        <span className={`mb-[10px] flex items-center gap-2 font-bold tracking-[0.2em] uppercase opacity-[.82] ${big ? "text-[10px]" : "text-[9px]"}`}>
          <span className="font-serif-lt text-[13px] font-light text-[#7fe3dd] italic opacity-100 tracking-normal normal-case">{num}</span>
        </span>
        <div className="mb-3 h-[2px] w-[30px] bg-teal transition-[width] duration-500 ease-lt group-hover:w-[54px]" />
        <h3 className={`mb-2 font-serif-lt leading-[1.04] font-light tracking-[-0.01em] ${big ? "text-[clamp(30px,3.4vw,40px)]" : "text-[20px]"}`}>{item.title}</h3>
        <p className={`max-h-0 overflow-hidden leading-[1.5] opacity-0 transition-[opacity,max-height] duration-[400ms] ease-lt group-hover:max-h-[60px] group-hover:opacity-90 ${big ? "text-[13.5px]" : "text-[12px]"}`}>{item.text}</p>
        <Link href={item.href} className="mt-[14px] inline-flex items-center gap-[7px] text-[10px] font-bold tracking-[0.14em] text-white uppercase">
          {big ? "View products" : "View"}
          <span className="transition-transform duration-[350ms] ease-lt group-hover:translate-x-[6px]">→</span>
        </Link>
      </div>
    </article>
  );
}
