// src/components/shop/ShopToolbar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from "@/lib/sorting";

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

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <select
        defaultValue={defaultOrderby}
        onChange={(e) => updateParam("orderby", e.target.value)}
        className="border border-ark-border bg-white px-3 py-2 text-[13px] text-[#333333]"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        defaultValue={String(defaultPerPage)}
        onChange={(e) => updateParam("per_page", e.target.value)}
        className="border border-ark-border bg-white px-3 py-2 text-[13px] text-[#333333]"
      >
        {PER_PAGE_OPTIONS.map((count) => (
          <option key={count} value={count}>
            Display {count} Products per page
          </option>
        ))}
      </select>
    </div>
  );
}
