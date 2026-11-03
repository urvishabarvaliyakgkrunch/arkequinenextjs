// src/components/search/SearchResultsList.tsx
import Link from "next/link";
import { stripHtml } from "@/lib/stripHtml";
import type { SearchResultsData } from "@/lib/queries/search";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function SearchResultsList({
  s,
  data,
  startIndex,
}: {
  s: string;
  data: SearchResultsData["contentNodes"];
  startIndex: number;
}) {
  const { nodes, pageInfo } = data;

  if (nodes.length === 0) {
    return (
      <p className="text-[14px] text-muted">
        Sorry, nothing matched your search terms. Please try again with different keywords.
      </p>
    );
  }

  return (
    <div>
      <ul className="flex flex-col gap-10">
        {nodes.map((node, i) => {
          const categories = node.categories?.nodes.map((c) => c.name) ?? node.productCategories?.nodes.map((c) => c.name) ?? [];
          const excerpt = stripHtml(node.excerpt);
          return (
            <li key={node.id} className="flex gap-4">
              <span className="text-[14px] text-muted">{startIndex + i}</span>
              <div>
                <Link
                  href={node.uri}
                  className="font-[family-name:var(--f-head)] text-[21px] font-bold text-ark-title hover:underline"
                >
                  {node.title}
                </Link>
                <p className="mt-1 text-[13px] text-muted">
                  {formatDate(node.date)}
                  {categories.length > 0 ? ` / in ${categories.join(", ")}` : ""}
                  {node.author ? ` / by ${node.author.node.name}` : ""}
                </p>
                {excerpt && <p className="mt-2 text-[14px] leading-relaxed text-ink">{excerpt}</p>}
              </div>
            </li>
          );
        })}
      </ul>

      {(pageInfo.hasPreviousPage || pageInfo.hasNextPage) && (
        <div className="mt-10 flex items-center justify-between text-[13px] text-muted">
          {pageInfo.hasPreviousPage ? (
            <Link
              href={`/?s=${encodeURIComponent(s)}&before=${encodeURIComponent(pageInfo.startCursor ?? "")}`}
              className="hover:text-ink-dark hover:underline"
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {pageInfo.hasNextPage && (
            <Link
              href={`/?s=${encodeURIComponent(s)}&after=${encodeURIComponent(pageInfo.endCursor ?? "")}`}
              className="hover:text-ink-dark hover:underline"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
