// src/components/product/ProductTabs.tsx
"use client";

import { useState } from "react";
import type { ProductTab } from "@/types/product";

// Description / Composition / Instructions; click state makes this a client component
export default function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);

  // No tabs from WordPress means no empty box on the page
  if (tabs.length === 0) return null;

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="mt-[2px] pt-[51px]">
      <div role="tablist" className="flex flex-wrap">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              // Active tab is white and merges into the panel below it
              // Live tab is 48px tall; the active one is 1px taller and overlaps the panel border
              className={`-mr-px cursor-pointer border border-b-0 border-border px-5 pt-[9px] text-[14.076px] leading-[28px] text-meta ${
                isActive
                  ? "relative z-10 -mb-px bg-white pb-[11px] font-bold"
                  : "pb-[10px]"
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Content is HTML written in WordPress admin, so it is rendered as HTML */}
      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        className={`border border-border bg-white p-[15px] text-[17px] leading-[28.05px] text-body [&_h1]:mb-[14px] [&_h1]:font-heading [&_h1]:text-[34px] [&_h1]:font-bold [&_h1]:leading-[37.4px] [&_h1]:text-secondary [&_strong]:text-primary [&_p]:mb-[1em] [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_ul]:mb-[1em] [&_ul]:list-disc [&_ul]:pl-6 ${
          activeTab.hasRawLineBreaks ? "whitespace-pre-line" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: activeTab.content }}
      />
    </div>
  );
}
