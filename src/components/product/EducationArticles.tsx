// src/components/product/EducationArticles.tsx
import Link from "next/link";
import type { EducationTag } from "@/types/product";

// Blog tag box under the gallery; tags and counts come from WordPress
export default function EducationArticles({ tags }: { tags: EducationTag[] }) {
  // No tags means no empty heading on the page
  if (tags.length === 0) return null;

  return (
    <section aria-labelledby="education-title" className="pb-[30px] pt-10">
      <h3
        id="education-title"
        className="mb-2 font-heading text-[20px] font-normal uppercase leading-[28px] tracking-[1px] text-secondary"
      >
        Education Articles
      </h3>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <Link
            key={tag.databaseId}
            href={`/tag/${tag.slug}`}
            className="mb-px mr-px border border-border px-2 py-[2px] text-[11px] leading-[28px] text-meta hover:text-secondary"
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </section>
  );
}
