// src/lib/products.ts
import { cacheLife } from "next/cache";
import { fetchGraphQL } from "@/lib/graphqlClient";
import { mapProduct } from "@/lib/productMapper";
import { PRODUCT_PAGE_QUERY } from "@/lib/productQuery";
import type { GqlProductResponse, ProductPageData } from "@/types/product";

// Single call for the whole product page; returns null when the slug does not exist
export async function getProductPage(
  slug: string,
): Promise<ProductPageData | null> {
  "use cache";
  // Product pages refresh about once an hour (rule D1)
  cacheLife("hours");

  const response = await fetchGraphQL<GqlProductResponse>(PRODUCT_PAGE_QUERY, {
    slug,
  });

  // WPGraphQL answers a wrong slug with data.product = null
  const product = response.data?.product;
  if (!product) return null;

  return mapProduct(product);
}
