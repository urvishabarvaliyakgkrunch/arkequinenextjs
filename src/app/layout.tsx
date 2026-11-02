// src/app/layout.tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Heading face used across ark-equine.com (served there from avia_fonts).
const millar = localFont({
  variable: "--font-millar",
  src: "./fonts/millar-bold.ttf",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ARK Equine",
  description: "Equine Feed | Horse Supplements | Horse Care",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} ${millar.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
