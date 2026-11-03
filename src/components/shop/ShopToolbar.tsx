// src/components/shop/ShopToolbar.tsx
"use client";

import { PER_PAGE_OPTIONS, SORT_OPTIONS } from "@/lib/sorting";
import TriggerDropdown from "@/components/shop/TriggerDropdown";

// Pure controls — CategoryListing owns the state and the URL (?orderby=&per_page=), so the page itself stays static.
export default function ShopToolbar({
  orderby,
  perPage,
  onChange,
}: {
  orderby: string;
  perPage: number;
  onChange: (key: "orderby" | "per_page", value: string) => void;
}) {
  const sortValueLabel =
    SORT_OPTIONS.find((o) => o.value === orderby)?.label.replace(/^Sort by /, "") ?? "Default";

  return (
    <div className="mb-[30px] flex flex-wrap gap-3">
      <TriggerDropdown
        prefix="Sort by"
        valueLabel={sortValueLabel}
        selectedValue={orderby}
        options={SORT_OPTIONS.map((o) => ({
          value: o.value,
          label: o.value === "" ? "Default" : o.label.replace(/^Sort by /, ""),
        }))}
        onSelect={(value) => onChange("orderby", value)}
      />

      <TriggerDropdown
        prefix="Display"
        valueLabel={`${perPage} Products per page`}
        selectedValue={String(perPage)}
        options={PER_PAGE_OPTIONS.map((count) => ({
          value: String(count),
          label: `${count} Products per page`,
        }))}
        onSelect={(value) => onChange("per_page", value)}
      />
    </div>
  );
}
