// src/components/landing/LandingHome.tsx
import LandingHero from "@/components/landing/LandingHero";
import LandingTrust from "@/components/landing/LandingTrust";
import LandingDual from "@/components/landing/LandingDual";
import LandingShop from "@/components/landing/LandingShop";
import LandingQuote from "@/components/landing/LandingQuote";
import LandingBest from "@/components/landing/LandingBest";
import LandingPano from "@/components/landing/LandingPano";
import LandingPet from "@/components/landing/LandingPet";
import LandingArticles from "@/components/landing/LandingArticles";
import LandingSubscribe from "@/components/landing/LandingSubscribe";
import type { BestSellerProduct } from "@/lib/queries/home";

export default function LandingHome({ bestSellers }: { bestSellers: BestSellerProduct[] }) {
  return (
    <div className="overflow-x-clip bg-white font-sans leading-[1.6] text-graphite antialiased [scroll-behavior:smooth]">
      <LandingHero />
      <LandingTrust />
      <LandingDual />
      <LandingShop />
      <LandingQuote />
      <LandingBest products={bestSellers} />
      <LandingPano />
      <LandingPet />
      <LandingArticles />
      <LandingSubscribe />
    </div>
  );
}
