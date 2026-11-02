// src/app/layout.tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

// Lato is the body font used on the live site
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "ARK Equine",
  description: "Equine supplements and health products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
