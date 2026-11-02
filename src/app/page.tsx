// src/app/page.tsx
import CategoryGrid from "@/components/category/CategoryGrid";
import HeroBanner from "@/components/home/HeroBanner";
import FeatureBar from "@/components/home/FeatureBar";
import Reviews from "@/components/home/Reviews";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import ExpertBlog from "@/components/home/ExpertBlog";
import Partners from "@/components/home/Partners";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeatureBar />
      <CategoryGrid perRow={8} />
      <Reviews />
      <BestSellers />
      <Testimonials />
      <ExpertBlog />
      <Partners />
    </>
  );
}
