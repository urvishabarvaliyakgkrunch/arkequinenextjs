// src/app/page.tsx
import LandingHome from "@/components/landing/LandingHome";
import { getBestSellers } from "@/lib/queries/home";

// No searchParams here on purpose: reading them makes Next render this page on every visit instead of caching it
export default async function Home() {
  const bestSellers = await getBestSellers();
  return <LandingHome bestSellers={bestSellers} />;
}
