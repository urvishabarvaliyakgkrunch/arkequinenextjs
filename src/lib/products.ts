// src/lib/products.ts
import { gql } from "@/lib/graphql";
import { mapProduct } from "@/lib/productMapper";
import { PRODUCT_PAGE_QUERY } from "@/lib/productQuery";
import type { GqlProductResponse, ProductPageData } from "@/types/product";

// Product pages refresh about once an hour (rule D1)
const PRODUCT_PAGE_SECONDS = 3600;

type ProductPageResult = NonNullable<GqlProductResponse["data"]>;

// Single call for the whole product page; returns null when the slug does not exist
export async function getProductPage(
  slug: string,
): Promise<ProductPageData | null> {
  const data = await gql<ProductPageResult>(
    PRODUCT_PAGE_QUERY,
    { slug },
    { revalidate: PRODUCT_PAGE_SECONDS },
  );

  // WPGraphQL answers a wrong slug with product = null
  if (!data?.product) return null;

  return mapProduct(data.product, data.tags?.nodes ?? []);
}
