// src/components/landing/LandingShop.tsx
import SectionTitle from "@/components/landing/SectionTitle";
import ShopCarousel from "@/components/landing/ShopCarousel";
import Reveal from "@/components/landing/Reveal";
import { SHOP_CATEGORIES } from "@/components/landing/landingData";

export default function LandingShop() {
  return (
    <section id="shop" className="mx-auto max-w-[1240px] pt-10 pb-24 max-[767px]:px-5! max-[767px]:py-10!">
      <SectionTitle title="Equine Shop" text="Targeted support for every stage and discipline." />
      <Reveal>
        <ShopCarousel items={SHOP_CATEGORIES} />
      </Reveal>
    </section>
  );
}
