// src/lib/queries/home.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { ProductCardFields } from "@/types/product";

const GET_PRODUCTS_BY_SLUG = `
  ${PRODUCT_CARD_FIELDS}
  query GetProductsBySlug($slugs: [String]) {
    products(first: 20, where: { typeIn: [SIMPLE, VARIABLE], slugIn: $slugs }) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;

// Real WooCommerce products for the homepage cards (real databaseId = add-to-cart works).
// Slugs missing on the backend just don't come back, and the caller keeps its static card for them.
export async function getProductsBySlug(slugs: string[]): Promise<Map<string, ProductCardFields>> {
  try {
    const data = await gql<{ products: { nodes: ProductCardFields[] } }>(
      GET_PRODUCTS_BY_SLUG,
      { slugs },
      { revalidate: 86400 },
    );
    return new Map(data.products.nodes.map((p) => [p.slug, p]));
  } catch {
    return new Map();
  }
}
