// src/components/shop/ShopToolbar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from "@/lib/sorting";
import TriggerDropdown from "@/components/shop/TriggerDropdown";

// Updates the URL (?orderby=&per_page=) on change — the page re-fetches with the new GraphQL orderby/first.
export default function ShopToolbar({
  defaultOrderby = "",
  defaultPerPage = 15,
}: {
  defaultOrderby?: string;
  defaultPerPage?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const sortValueLabel =
    SORT_OPTIONS.find((o) => o.value === defaultOrderby)?.label.replace(/^Sort by /, "") ?? "Default";

  return (
    <div className="mb-[30px] flex flex-wrap gap-3">
      <TriggerDropdown
        prefix="Sort by"
        valueLabel={sortValueLabel}
        selectedValue={defaultOrderby}
        options={SORT_OPTIONS.map((o) => ({
          value: o.value,
          label: o.value === "" ? "Default" : o.label.replace(/^Sort by /, ""),
        }))}
        onSelect={(value) => updateParam("orderby", value)}
      />

      <TriggerDropdown
        prefix="Display"
        valueLabel={`${defaultPerPage} Products per page`}
        selectedValue={String(defaultPerPage)}
        options={PER_PAGE_OPTIONS.map((count) => ({
          value: String(count),
          label: `${count} Products per page`,
        }))}
        onSelect={(value) => updateParam("per_page", value)}
      />
    </div>
  );
}
