// src/components/search/SearchResultsView.tsx
import Link from "next/link";
import SearchResultsList from "@/components/search/SearchResultsList";
import Container from "@/components/ui/Container";
import type { SearchResultsData } from "@/lib/queries/search";

// Search page layout, moved out of the homepage file so the homepage can be a cached static page
export default function SearchResultsView({ s, data }: { s: string; data: SearchResultsData["contentNodes"] }) {
  return (
    <>
      <div className="border-b border-border">
        <Container>
          <nav className="py-[14px] text-right text-[11px] text-muted">
            You are here:{" "}
            <Link href="/" className="text-muted hover:underline">
              Home
            </Link>{" "}
            / Search results for &quot;{s}&quot;
          </nav>
        </Container>
      </div>
      <Container>
        <main className="py-10">
          <p className="mb-5 text-[14px] text-ink">If you are not happy with the results below please do another search</p>
          <form role="search" action="/" method="get" className="mb-10 flex max-w-[600px] gap-0">
            <input
              type="search"
              name="s"
              defaultValue={s}
              aria-label="Search for:"
              className="h-12 flex-1 border border-border px-[14px] text-[14px] text-ink outline-none"
            />
            <input
              type="submit"
              value="Search"
              className="h-12 shrink-0 cursor-pointer bg-primary px-[24px] text-[14px] font-semibold text-white hover:bg-primary-alt"
            />
          </form>
          <hr className="mb-10 w-screen border-border" style={{ marginLeft: "calc(50% - 50vw)" }} />
          <SearchResultsList s={s} data={data} startIndex={1} />
        </main>
      </Container>
    </>
  );
}
