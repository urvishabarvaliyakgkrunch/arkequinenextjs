// src/components/tag/LatestArticlesSidebar.tsx
import Image from "next/image";
import Link from "next/link";
import type { TagPostSummary } from "@/lib/queries/tag";

// Matches the "Latest Articles" widget on ark-equine.com/tag/* sidebars — 36x36 thumb + title link.
export default function LatestArticlesSidebar({ posts }: { posts: TagPostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <aside>
      <h2 className="mb-2 font-[family-name:var(--f-head)] text-[20px] font-normal uppercase tracking-[1px] text-ark-title">
        Latest Articles
      </h2>
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li key={post.id} className="flex items-start gap-[10px] py-[8px]">
            {post.featuredImage ? (
              <Link
                href={post.uri}
                title={post.title}
                className="block shrink-0 overflow-hidden rounded-[3px] border border-[#e1e1e1] p-[3px]"
              >
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={36}
                  height={36}
                  className="block h-[28px] w-[28px] object-cover"
                />
              </Link>
            ) : null}
            <Link
              href={post.uri}
              title={post.title}
              className="text-[14.45px] leading-[1.7em] text-ark-title font-bold"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
