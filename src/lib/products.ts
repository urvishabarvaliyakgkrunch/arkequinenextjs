// src/lib/products.ts
import { gql } from "@/lib/graphql";
import { mapProduct } from "@/lib/productMapper";
import { BEST_SELLERS_QUERY, PRODUCT_PAGE_QUERY } from "@/lib/productQuery";
import type { BestSellerProduct, GqlProductResponse, ProductPageData } from "@/types/product";

// Product pages refresh about once an hour (rule D1)
const PRODUCT_PAGE_SECONDS = 3600;

type ProductPageResult = NonNullable<GqlProductResponse["data"]>;

// Slugs used to prebuild product pages; an unreachable backend just means none are prebuilt
export async function getProductSlugs(): Promise<string[]> {
  try {
    const data = await gql<{ products: { nodes: { slug: string }[] } }>(
      `query ProductSlugs { products(first: 100, where: { typeIn: [SIMPLE, VARIABLE] }) { nodes { slug } } }`,
      {},
      { revalidate: PRODUCT_PAGE_SECONDS },
    );
    return data.products.nodes.map((p) => p.slug);
  } catch {
    return [];
  }
}

// Single call for the whole product page; returns null when the slug does not exist
export async function getProductPage(
  slug: string,
): Promise<ProductPageData | null> {
  let data: ProductPageResult;
  try {
    data = await gql<ProductPageResult>(
      PRODUCT_PAGE_QUERY,
      { slug },
      { revalidate: PRODUCT_PAGE_SECONDS, currency: true },
    );
  } catch (error) {
    // This backend answers an unknown slug with a GraphQL error instead of product = null: show the 404 page
    if (error instanceof Error && error.message.startsWith("No product ID was found")) return null;
    throw error;
  }

  // WPGraphQL answers a wrong slug with product = null
  if (!data?.product) return null;

  return mapProduct(data.product, data.tags?.nodes ?? []);
}

interface RawBestSeller extends Omit<BestSellerProduct, "category"> {
  productCategories?: { nodes: { name: string }[] };
}

// Landing page Best Sellers; empty array (not a thrown error) when the backend has no featured products yet
export async function getBestSellers(): Promise<BestSellerProduct[]> {
  try {
    const data = await gql<{ products: { nodes: RawBestSeller[] } }>(
      BEST_SELLERS_QUERY,
      {},
      { revalidate: PRODUCT_PAGE_SECONDS, currency: true },
    );
    return data.products.nodes.map((p) => ({
      ...p,
      category: p.productCategories?.nodes[0]?.name ?? null,
    }));
  } catch {
    return [];
  }
}
