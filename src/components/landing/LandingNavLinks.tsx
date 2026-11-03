// src/components/landing/LandingNavLinks.tsx
"use client";

import Link from "next/link";
import type { LandingLink } from "@/components/landing/landingData";

interface Props {
  menu: LandingLink[];
  openSub: string | null;
  onToggle: (label: string) => void;
  onHover: (label: string | null) => void;
  onNavigate: () => void;
}

function SubList({ item, open, onNavigate }: { item: LandingLink; open: boolean; onNavigate: () => void }) {
  return (
    <ul
      className={`${open ? "block" : "hidden"} list-none p-0 min-[901px]:absolute min-[901px]:top-[calc(var(--menu-top,102px)-33px)] min-[901px]:left-0 min-[901px]:z-[2] min-[901px]:-mt-px min-[901px]:w-[208px] min-[901px]:border-t-2 min-[901px]:border-t-ink-dark min-[901px]:bg-white min-[901px]:text-[#717a7a] min-[901px]:shadow-[0_8px_15px_rgba(0,0,0,0.1)]`}
    >
      {item.children?.map((c) => (
        <li key={c.label} className="list-none max-[900px]:border-b-0">
          <Link
            href={c.href}
            onClick={onNavigate}
            className={`float-left min-h-[23px] w-full px-[15px] py-2 text-left text-[12px] leading-[23px] no-underline transition-[color,background] duration-150 ease-out hover:bg-[#e1e1e1] hover:text-ink-dark max-[900px]:block max-[900px]:text-[13px] ${item.upper ? "uppercase" : ""}`}
          >
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function LandingNavLinks({ menu, openSub, onToggle, onHover, onNavigate }: Props) {
  return (
    <nav>
      <ul className="mb-[10px] flex list-none gap-[34px] max-[1100px]:gap-[22px] max-[900px]:mb-0 max-[900px]:flex-col max-[900px]:gap-0">
        {menu.map((item) => {
          const open = openSub === item.label;
          return (
            <li
              key={item.label}
              onMouseEnter={() => item.children && onHover(item.label)}
              onMouseLeave={() => item.children && onHover(null)}
              className={`group/item ${item.children ? "relative min-[901px]:after:absolute min-[901px]:after:top-[30px] min-[901px]:after:left-0 min-[901px]:after:h-[50px] min-[901px]:after:w-full min-[901px]:after:content-['']" : ""} max-[900px]:border-b max-[900px]:border-grey max-[900px]:last:border-b-0`}
            >
              <div className="flex items-center max-[900px]:flex-wrap max-[900px]:justify-between">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group/link relative py-1 text-[13px] font-bold tracking-[0.04em] text-graphite transition-colors duration-[250ms] hover:text-teal-deep max-[900px]:block max-[900px]:py-[10px] max-[900px]:text-[14px]"
                >
                  {item.label}
                  <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-teal transition-[width] duration-300 ease-lt group-hover/link:w-full max-[900px]:hidden" />
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label="Open submenu"
                    aria-expanded={open}
                    onClick={() => onToggle(item.label)}
                    className="ml-1 cursor-pointer border-0 bg-transparent px-[2px] align-middle text-[12px] leading-none text-black"
                  >
                    <span aria-hidden="true">&#9662;</span>
                  </button>
                )}
              </div>
              {item.children && <SubList item={item} open={open} onNavigate={onNavigate} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
