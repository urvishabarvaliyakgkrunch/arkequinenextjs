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
    <div className="pt-[50px]">
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
              className={`-mr-px cursor-pointer border border-border px-5 pb-[10px] pt-[9px] text-[14px] leading-[28px] text-meta ${
                isActive
                  ? "relative z-10 border-b-white bg-white font-bold"
                  : "bg-bg-soft"
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
        className={`-mt-px border border-border bg-white p-[15px] text-[17px] leading-[28.05px] text-body [&_p]:mb-[1em] [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_ul]:mb-[1em] [&_ul]:list-disc [&_ul]:pl-6 ${
          activeTab.hasRawLineBreaks ? "whitespace-pre-line" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: activeTab.content }}
      />
    </div>
  );
}
