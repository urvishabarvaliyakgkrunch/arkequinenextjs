// src/components/home/HeroBanner.tsx
import Image from "next/image";
import { HERO } from "./homeData";

export default function HeroBanner() {
  return (
    <section>
      <Image
        src={HERO.img}
        alt={HERO.alt}
        width={HERO.width}
        height={HERO.height}
        priority
        sizes="100vw"
        className="block h-auto w-full"
      />
    </section>
  );
}
