// src/components/tag/TagPostCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { TagPostSummary } from "@/lib/queries/tag";
import { truncateExcerpt } from "@/lib/truncateExcerpt";

// Matches a "Posts" grid card on ark-equine.com/tag/* — image, uppercase blue h3, grey date, excerpt.
export default function TagPostCard({ post }: { post: TagPostSummary }) {
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      {post.featuredImage ? (
        <Link href={post.uri} title={post.title} className="mb-[6px] block overflow-hidden rounded-[3px] bg-white">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            width={170}
            height={137}
            className="block h-auto w-full"
          />
        </Link>
      ) : null}
      <h3 className="font-heading text-[20px] font-normal uppercase leading-[28px] text-secondary">
        <Link href={post.uri} title={post.title} dangerouslySetInnerHTML={{ __html: post.title }} />
      </h3>
      <time dateTime={post.date} className="block text-[15.3px] text-meta">
        {date}
      </time>
      {post.excerpt ? (
        <p className="pt-[6px] text-[17px] leading-[28.05px] text-[#57585a]">{truncateExcerpt(post.excerpt, 12)}</p>
      ) : null}
    </article>
  );
}
