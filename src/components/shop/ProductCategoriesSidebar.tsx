// src/components/shop/ProductCategoriesSidebar.tsx
import Link from "next/link";
import type { ProductCategorySummary } from "@/types/product";

// Matches the "Product categories" widget on ark-equine.com/product-category/* — category archive pages only, the main /shop page doesn't have one.
export default function ProductCategoriesSidebar({
  categories,
  activeSlug,
}: {
  categories: ProductCategorySummary[];
  activeSlug?: string;
}) {
  return (
    <aside className="w-full lg:w-[325px] lg:shrink-0">
      <h2 className="mb-2 font-[family-name:var(--f-head)] text-[20px] font-normal uppercase tracking-[1px] text-ark-title">
        Product Categories
      </h2>
      <ul className="list-none p-0">
        {categories.map((category) => (
          <li key={category.slug} className="py-[1px]">
            <Link
              href={`/product-category/${category.slug}`}
              className={`text-[12px] leading-[28px] ${
                category.slug === activeSlug ? "font-bold" : ""
              } text-[#919191] hover:underline`}
            >
              {category.name}
            </Link>
            {/* Backend count resolver is flaky (intermittently returns null) — only show it when it's a real number */}
            {typeof category.count === "number" ? (
              <>
                {" "}
                <span className="text-[10px] text-[#919191] italic">({category.count})</span>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
