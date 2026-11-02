// src/lib/queries/category.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { CategoryPageData } from "@/types/product";
import type { ProductsOrderby } from "@/lib/sorting";

// One query covers the product grid AND the "Product categories" sidebar — still one call per page.
// NOTE: the backend's `where: { hideEmpty: true }` arg returned wildly inconsistent counts between
// requests (29 categories, then 6, same query) — fetch the full list and filter count > 0 ourselves instead.
const GET_CATEGORY_PRODUCTS = `
  ${PRODUCT_CARD_FIELDS}
  query GetCategoryProducts($slug: ID!, $first: Int!, $orderby: [ProductsOrderbyInput]) {
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      description
      products(first: $first, where: { typeIn: [SIMPLE, VARIABLE], orderby: $orderby }) {
        nodes {
          ...ProductCardFields
        }
      }
    }
    productCategories(first: 100) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

export async function getCategoryPageData(
  slug: string,
  options: { first?: number; orderby?: ProductsOrderby | null } = {}
) {
  const { first = 15, orderby = null } = options;
  return gql<CategoryPageData>(
    GET_CATEGORY_PRODUCTS,
    { slug, first, orderby: orderby ? [orderby] : null },
    { revalidate: 3600 }
  );
}
