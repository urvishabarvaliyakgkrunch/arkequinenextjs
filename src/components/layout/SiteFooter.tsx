// src/components/layout/SiteFooter.tsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import LandingPartners from "@/components/landing/LandingPartners";
import LandingFooter from "@/components/landing/LandingFooter";

// Live site only ships the redesigned dark landing footer on the home page;
// every other page (about, shop, product, etc.) keeps the old terms/contact/news footer.
export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        <LandingPartners />
        <LandingFooter />
      </>
    );
  }

  return <Footer />;
}
