// src/components/shop/EducationArticles.tsx
import Link from "next/link";
import type { PostTag } from "@/types/product";

// Matches the "Education Articles" tag-cloud widget on ark-equine.com/product-category/* sidebars — links to /tag/[slug].
export default function EducationArticles({ tags }: { tags: PostTag[] }) {
  if (tags.length === 0) return null;

  return (
    <aside className="pt-[30px]">
      <h2 className="mb-2 font-[family-name:var(--f-head)] text-[20px] font-normal uppercase tracking-[1px] text-ark-title">
        Education Articles
      </h2>
      <div className="flex flex-wrap gap-x-[1px] gap-y-[1px]">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className="border border-ark-border px-[8px] py-[6px] text-[11px] text-[#919191] hover:text-ark-title"
          >
            {tag.name}
            {typeof tag.count === "number" ? ` (${tag.count})` : ""}
          </Link>
        ))}
      </div>
    </aside>
  );
}
