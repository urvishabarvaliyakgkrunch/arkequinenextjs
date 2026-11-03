// src/components/landing/LandingHeader.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingNavLinks from "@/components/landing/LandingNavLinks";
import LandingCart from "@/components/landing/LandingCart";
import LandingSearch from "@/components/landing/LandingSearch";
import LandingFlags from "@/components/landing/LandingFlags";
import { LANDING_MENU, SITE } from "@/components/landing/landingData";

const ICON = "h-[22px] w-[22px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] max-[900px]:h-5 max-[900px]:w-5";
const ICON_LINK = "flex h-9 w-9 items-center justify-center text-teal transition-colors duration-[250ms] hover:text-teal-deep";
const BAR = "block h-[2px] w-6 bg-graphite transition-[transform,opacity] duration-300 ease-lt";

function TrustIndex({ className, trust }: { className: string; trust: typeof SITE.trust }) {
  return (
    <div className={className}>
      <a href={trust.url} target="_blank" rel="noopener noreferrer" aria-label="Trust Index" title="Trust Index" className="block w-[120px] max-[1100px]:w-[100px]">
        <Image src={trust.image} alt="Trust Index" width={240} height={80} className="h-auto w-full object-contain" />
      </a>
    </div>
  );
}

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  // Dropdowns hang from the header bottom, so they need its live height (it shrinks on scroll)
  const [menuTop, setMenuTop] = useState(102);

  useEffect(() => {
    const measure = () => setMenuTop(header.current?.offsetHeight ?? 102);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      measure();
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
      measure();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleSub = (label: string) => setOpenSub((cur) => (cur === label ? null : label));

  return (
    <>
      <header ref={header} style={{ ["--menu-top" as string]: `${menuTop}px` }} className={`sticky top-0 right-0 left-0 z-[100] bg-white font-sans leading-[1.6] text-graphite transition-[padding] duration-[400ms] ease-lt ${scrolled ? "py-3 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.18)]" : "py-[18px] shadow-[0_1px_0_#e6e7e8]"}`}>
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-8 max-[1024px]:gap-[6px] max-[900px]:gap-2">
          <Link href="/" aria-label="ARK Equine home" className="shrink-0">
            <Image src={SITE.logo} alt="ARK Equine" width={150} height={60} unoptimized priority className={`h-auto transition-[width] duration-[400ms] ease-lt max-[1100px]:max-w-[100px] ${scrolled ? "w-[128px]" : "w-[150px]"}`} />
          </Link>

          <div
            id="navMenu"
            className={`min-[901px]:contents max-[900px]:absolute max-[900px]:top-full max-[900px]:right-0 max-[900px]:left-0 max-[900px]:z-[99] max-[900px]:max-h-[450px] max-[900px]:overflow-y-auto max-[900px]:border-t max-[900px]:border-grey max-[900px]:bg-white max-[900px]:px-8 max-[900px]:pt-5 max-[900px]:pb-7 max-[900px]:shadow-[0_12px_28px_-14px_rgba(0,0,0,0.22)] ${open ? "max-[900px]:block" : "max-[900px]:hidden"}`}
          >
            <LandingNavLinks menu={LANDING_MENU} openSub={openSub} onToggle={toggleSub} onNavigate={closeMenu} />
            <TrustIndex trust={SITE.trust} className="flex flex-col items-center justify-center text-center min-[901px]:hidden" />
            {(
              <Link href={SITE.cta.href} onClick={closeMenu} className="inline-flex items-center gap-2 rounded-[3px] bg-teal px-[15px] py-[11px] text-[12px] font-bold tracking-[0.08em] text-white uppercase transition-[background,transform] duration-[250ms] hover:-translate-y-px hover:bg-teal-deep max-[900px]:mt-5 max-[900px]:flex max-[900px]:w-full max-[900px]:justify-center">
                {SITE.cta.label}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-[18px] max-[900px]:gap-[5px]">
            <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className={`${ICON_LINK} cursor-pointer border-0 bg-transparent`}>
              <svg viewBox="0 0 24 24" className={ICON} aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
            </button>
            <a href={`/my-account/`} aria-label="Account" className={ICON_LINK}>
              <svg viewBox="0 0 24 24" className={ICON} aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </a>
            <LandingCart />
            <LandingFlags />
            <TrustIndex trust={SITE.trust} className="flex items-center max-[900px]:hidden" />
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Menu"}
            aria-expanded={open}
            aria-controls="navMenu"
            onClick={() => setOpen((o) => !o)}
            className="z-[101] hidden cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-1 max-[900px]:flex"
          >
            <span className={`${BAR} ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`${BAR} ${open ? "opacity-0" : ""}`} />
            <span className={`${BAR} ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>
      <LandingSearch open={searchOpen} onClose={closeSearch} />
    </>
  );
}
