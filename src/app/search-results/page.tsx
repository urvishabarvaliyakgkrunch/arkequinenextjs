// src/app/search-results/page.tsx
import SearchResultsView from "@/components/search/SearchResultsView";
import { getSearchResults } from "@/lib/queries/search";

// Served at /?s=query through a rewrite in next.config.ts, so the homepage itself never reads the query string
export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; after?: string; before?: string }>;
}) {
  const { s = "", after, before } = await searchParams;
  const { contentNodes } = await getSearchResults(s, { after, before });
  return <SearchResultsView s={s} data={contentNodes} />;
}
