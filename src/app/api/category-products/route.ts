// src/app/api/category-products/route.ts
import { getCategoryProductsOnly } from "@/lib/queries/category";
import { PER_PAGE_OPTIONS, parseOrderby } from "@/lib/sorting";

// Sorted / resized category lists for the static category page — cached for 1 hour like the page itself.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return Response.json({ error: "slug is required" }, { status: 400 });

  const requested = Number(url.searchParams.get("per_page"));
  const first = PER_PAGE_OPTIONS.includes(requested) ? requested : PER_PAGE_OPTIONS[0];
  const products = await getCategoryProductsOnly(slug, {
    first,
    orderby: parseOrderby(url.searchParams.get("orderby") ?? undefined),
  }).catch(() => null);

  if (!products) return Response.json({ error: "Category not found" }, { status: 404 });
  return Response.json(products, {
    // Vary: Cookie so a CDN keeps separate copies per chosen currency
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400", Vary: "Cookie" },
  });
}
