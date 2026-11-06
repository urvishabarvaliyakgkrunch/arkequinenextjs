// src/lib/queries/category.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { CategoryPageData, ProductCardFields } from "@/types/product";
import type { ProductsOrderby } from "@/lib/sorting";

// One query covers the product grid AND the "Product categories" sidebar — still one call per page.
// NOTE: the backend's `where: { hideEmpty: true }` arg returned wildly inconsistent counts between
// requests (29 categories, then 6, same query) — fetch the full list and filter count > 0 ourselves instead.
const GET_CATEGORY_PRODUCTS = `
  ${PRODUCT_CARD_FIELDS}
  query GetCategoryProducts($slug: ID!, $first: Int!, $orderby: [ProductsOrderbyInput], $typeIn: [ProductTypesEnum]) {
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      description
      image {
        sourceUrl(size: LARGE)
        altText
      }
      products(first: $first, where: { typeIn: $typeIn, orderby: $orderby }) {
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
    tags(first: 20) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

const GET_CATEGORY_PRODUCTS_ONLY = `
  ${PRODUCT_CARD_FIELDS}
  query GetCategoryProductsOnly($slug: ID!, $first: Int!, $orderby: [ProductsOrderbyInput], $typeIn: [ProductTypesEnum]) {
    productCategory(id: $slug, idType: SLUG) {
      products(first: $first, where: { typeIn: $typeIn, orderby: $orderby }) {
        nodes {
          ...ProductCardFields
        }
      }
    }
  }
`;

// The backend's "bestsellers" category has a product whose WooCommerce `product_type` taxonomy term is
// broken/missing (confirmed directly against the live GraphQL endpoint) — WPGraphQL's typeIn filter
// (an allow-list tax_query) silently drops it even though it resolves as a normal SimpleProduct everywhere
// else. Every other category still needs typeIn: an unrelated WooCommerce Subscriptions product elsewhere
// in the catalog makes the *unfiltered* products() field return null entirely (a backend bug, not ours),
// so typeIn must stay on for every category except this one known-safe exception.
const TYPE_FILTERED_PRODUCT_TYPES = ["SIMPLE", "VARIABLE"];
function typeInFor(slug: string): string[] | null {
  return slug === "bestsellers" ? null : TYPE_FILTERED_PRODUCT_TYPES;
}

// Lighter call used when the visitor changes sort / per-page on the (static) category page.
export async function getCategoryProductsOnly(
  slug: string,
  options: { first?: number; orderby?: ProductsOrderby | null } = {}
) {
  const { first = 15, orderby = null } = options;
  const data = await gql<{ productCategory: { products: { nodes: ProductCardFields[] } } | null }>(
    GET_CATEGORY_PRODUCTS_ONLY,
    { slug, first, orderby: orderby ? [orderby] : null, typeIn: typeInFor(slug) },
    { revalidate: 3600 }
  );
  return data.productCategory?.products.nodes ?? null;
}

// Slugs of non-empty categories, used to prebuild category pages.
export async function getCategorySlugs(): Promise<string[]> {
  try {
    const data = await gql<{ productCategories: { nodes: { slug: string; count: number | null }[] } }>(
      `query CategorySlugs { productCategories(first: 100) { nodes { slug count } } }`,
      {},
      { revalidate: 3600 }
    );
    return data.productCategories.nodes.filter((c) => (c.count ?? 0) > 0).map((c) => c.slug);
  } catch {
    return [];
  }
}

export async function getCategoryPageData(
  slug: string,
  options: { first?: number; orderby?: ProductsOrderby | null } = {}
) {
  const { first = 15, orderby = null } = options;
  return gql<CategoryPageData>(
    GET_CATEGORY_PRODUCTS,
    { slug, first, orderby: orderby ? [orderby] : null, typeIn: typeInFor(slug) },
    { revalidate: 3600 }
  );
}
