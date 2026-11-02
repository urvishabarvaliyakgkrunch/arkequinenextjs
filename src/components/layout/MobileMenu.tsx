// src/components/layout/MobileMenu.tsx
"use client";

import { useState } from "react";
import type { NavLink } from "./navLinks";

function subLabels(link: NavLink) {
  if (link.children) return link.children.map((c) => c.label);
  if (link.mega)
    return link.mega.columns.flatMap((c) => [c.title, ...c.items.map((i) => i.label).filter(Boolean)]);
  return [];
}

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
      >
        {open ? (
          <span className="relative block h-5 w-5">
            <span className="absolute top-1/2 left-0 h-[2px] w-5 -translate-y-1/2 rotate-45 bg-ink-dark" />
            <span className="absolute top-1/2 left-0 h-[2px] w-5 -translate-y-1/2 -rotate-45 bg-ink-dark" />
          </span>
        ) : (
          <>
            <span className="block h-[2px] w-6 bg-ink-dark" />
            <span className="block h-[2px] w-6 bg-ink-dark" />
            <span className="block h-[2px] w-6 bg-ink-dark" />
          </>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 h-screen w-full overflow-y-auto bg-white px-6 pt-6 pb-10">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="mb-4 ml-auto block text-2xl leading-none text-ink-dark"
          >
            ×
          </button>
          <nav className="flex flex-col">
            {links.map((link) => {
              const subs = subLabels(link);
              const isOpen = expanded === link.label;
              return (
                <div key={link.label} className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex-1 py-4 text-[13px] font-bold uppercase ${
                        link.current ? "text-primary" : "text-muted"
                      }`}
                    >
                      {link.button ? (
                        <span className="inline-block rounded-[2px] bg-ink-dark px-[9px] py-[9px] text-white">
                          {link.label}
                        </span>
                      ) : (
                        link.label
                      )}
                    </a>
                    {subs.length > 0 && (
                      <button
                        type="button"
                        aria-label={`Toggle ${link.label}`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : link.label)}
                        className="px-3 py-4 text-xs text-muted"
                      >
                        {isOpen ? "▴" : "▾"}
                      </button>
                    )}
                  </div>
                  {isOpen && (
                    <ul className="pb-3 pl-3">
                      {subs.map((s, i) => (
                        <li key={`${s}-${i}`} className="py-1 text-[12px] text-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
