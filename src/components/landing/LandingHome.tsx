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
import LandingPartners from "@/components/landing/LandingPartners";

export default function LandingHome() {
  return (
    <div className="overflow-x-clip bg-white font-sans leading-[1.6] text-graphite antialiased [scroll-behavior:smooth]">
      <LandingHero />
      <LandingTrust />
      <LandingDual />
      <LandingShop />
      <LandingQuote />
      <LandingBest />
      <LandingPano />
      <LandingPet />
      <LandingArticles />
      <LandingSubscribe />
      <LandingPartners />
    </div>
  );
}
