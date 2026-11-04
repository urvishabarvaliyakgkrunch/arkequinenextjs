// src/components/news/NewsPostCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { NewsPostSummary } from "@/lib/queries/news";
import { truncateExcerpt } from "@/lib/truncateExcerpt";

// Matches a "News" grid card on ark-equine.com/news/ — measured from live computed styles:
// 260x185 image (6px below), uppercase blue h3 (20px/28px, #2e2f92), grey date (15.3px, #919191,
// 10px below), excerpt (17px/28.05px, #57585a) flowing straight into the teal "Read more" + arrow
// (17px, #0fa7ac) with no extra gap — live shows the link always, not just on hover.
export default function NewsPostCard({ post }: { post: NewsPostSummary }) {
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      <Link
        href={post.uri}
        title={post.title}
        className="group relative mb-[6px] block aspect-[260/185] w-full overflow-hidden rounded-[3px] bg-[#F5F5F5]"
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition-opacity duration-200 group-hover:opacity-70"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlaceholderIcon />
          </div>
        )}
      </Link>
      <h3 className="font-heading text-[20px] font-normal uppercase leading-[28px] text-secondary">
        <Link href={post.uri} title={post.title} dangerouslySetInnerHTML={{ __html: post.title }} />
      </h3>
      <time dateTime={post.date} className="block text-[15.3px] text-meta">
        {date}
      </time>
      <div className="pt-[10px] text-[17px] leading-[28.05px]">
        {post.excerpt ? (
          <p className="text-[#57585a]">{truncateExcerpt(post.excerpt, 10)} </p>
        ) : null}
        <Link href={post.uri} title={post.title} className="whitespace-nowrap text-primary">
          Read more
          <svg
            viewBox="0 0 15 32"
            className="ml-1 inline-block h-[10px] w-[10px] fill-primary align-baseline"
            aria-hidden="true"
          >
            <path d="M0.416 27.84l11.456-11.84-11.456-11.904q-0.832-0.832 0-1.536 0.832-0.832 1.536 0l12.544 12.608q0.768 0.832 0 1.6l-12.544 12.608q-0.704 0.832-1.536 0-0.832-0.704 0-1.536z" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// Same "no image" look as ProductCard — grey mountain glyph on a light grey box.
function PlaceholderIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#bbbbbb" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" rx="2" />
      <circle cx="21" cy="21" r="5" />
      <path d="M4 44l16-16 12 12 8-8 16 16" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
