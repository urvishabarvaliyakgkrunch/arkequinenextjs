// src/lib/queries/category.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { CategoryPageData } from "@/types/product";

// One query covers the product grid AND the "Product categories" sidebar — still one call per page.
const GET_CATEGORY_PRODUCTS = `
  ${PRODUCT_CARD_FIELDS}
  query GetCategoryProducts($slug: ID!, $first: Int!) {
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      description
      products(first: $first, where: { typeIn: [SIMPLE, VARIABLE] }) {
        nodes {
          ...ProductCardFields
        }
      }
    }
    productCategories(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

export async function getCategoryPageData(slug: string, first = 48) {
  return gql<CategoryPageData>(
    GET_CATEGORY_PRODUCTS,
    { slug, first },
    { revalidate: 3600 }
  );
}
