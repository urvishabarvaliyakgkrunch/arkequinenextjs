// src/app/layout.tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import CartToast from "@/components/cart/CartToast";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Same file the live site serves at wp-content/uploads/avia_fonts/type_fonts/millar-bold-1/millar bold.ttf
const millar = localFont({
  variable: "--font-millar",
  src: "./fonts/millar-bold.ttf",
  weight: "400",
  display: "swap",
});

// Display serif of the landing redesign (all weights the template uses)
const millarLanding = localFont({
  variable: "--font-millar-landing",
  src: [
    { path: "./fonts/MillarLight.woff2", weight: "300", style: "normal" },
    { path: "./fonts/MillarRegular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MillarItalic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARK Equine",
  description: "Equine Feed | Horse Supplements | Horse Care",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} ${millar.variable} ${millarLanding.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LandingHeader />
        <main className="flex-1">{children}</main>
        <LandingFooter />
        <CartToast />
      </body>
    </html>
  );
}
