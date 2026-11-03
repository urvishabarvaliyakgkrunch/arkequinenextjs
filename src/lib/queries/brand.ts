// src/lib/queries/brand.ts
// "Brand" pages (e.g. /brand/arkequine-brand/) come from the Perfect WooCommerce Brands plugin's
// `pwb-brand` taxonomy, which WPGraphQL does not expose at all — so brand terms are read over the
// WP REST API instead. Each brand mirrors a WooCommerce product category of the same name (confirmed
// by product_cat/pwb-brand overlap on the backend), so once the matching category is found the
// product grid itself still comes from the normal GraphQL category query (full price/stock data).
import { gql } from "@/lib/graphql";
import { getCategoryPageData } from "@/lib/queries/category";
import type { ProductCardFields } from "@/types/product";

const WP_BASE_URL = `${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`.replace(/\/graphql\/?$/, "");

interface WpBrandTerm {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

async function fetchBrandTerm(slug: string): Promise<WpBrandTerm | null> {
  try {
    const res = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/pwb-brand?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const terms: WpBrandTerm[] = await res.json();
    return terms[0] ?? null;
  } catch {
    return null;
  }
}

// The brand archive page's banner image isn't exposed by any public API — pull it straight off the
// plugin's own archive markup instead (`.pwb-brand-banner img`), the same source the live site uses.
async function fetchBrandBannerImage(
  slug: string
): Promise<{ sourceUrl: string; altText: string | null } | null> {
  try {
    const res = await fetch(`${WP_BASE_URL}/brand/${encodeURIComponent(slug)}/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const banner = html.match(/pwb-brand-banner[^>]*>[\s\S]*?<img[^>]*>/)?.[0];
    if (!banner) return null;
    const sourceUrl =
      banner.match(/data-lazy-src="([^"]+)"/)?.[1] ??
      banner.match(/\ssrc="([^"]+)"/)?.[1] ??
      null;
    if (!sourceUrl || sourceUrl.startsWith("data:")) return null;
    const altText = banner.match(/\salt="([^"]*)"/)?.[1] ?? null;
    return { sourceUrl, altText };
  } catch {
    return null;
  }
}

async function findMatchingCategorySlug(brandName: string, brandSlug: string): Promise<string | null> {
  const data = await gql<{ productCategories: { nodes: { name: string; slug: string }[] } }>(
    `query BrandCategoryLookup { productCategories(first: 100) { nodes { name slug } } }`,
    {},
    { revalidate: 3600 }
  );
  const strippedSlug = brandSlug.replace(/-brand$/, "");
  const match = data.productCategories.nodes.find(
    (c) =>
      c.name.toLowerCase() === brandName.toLowerCase() ||
      c.slug === strippedSlug ||
      c.slug === brandSlug
  );
  return match?.slug ?? null;
}

export async function getBrandSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/pwb-brand?per_page=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const terms: WpBrandTerm[] = await res.json();
    return terms.filter((t) => t.count > 0).map((t) => t.slug);
  } catch {
    return [];
  }
}

export interface BrandPageData {
  name: string;
  slug: string;
  description: string;
  image: { sourceUrl: string; altText: string | null } | null;
  products: ProductCardFields[];
}

export async function getBrandPageData(slug: string): Promise<BrandPageData | null> {
  const term = await fetchBrandTerm(slug);
  if (!term) return null;

  const [image, categorySlug] = await Promise.all([
    fetchBrandBannerImage(slug),
    findMatchingCategorySlug(term.name, slug),
  ]);

  const products = categorySlug
    ? (await getCategoryPageData(categorySlug, { first: 100 })).productCategory?.products.nodes ?? []
    : [];

  return {
    name: term.name,
    slug: term.slug,
    description: term.description,
    image,
    products,
  };
}
