// src/lib/queries/shop.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { ShopPageData } from "@/types/product";
import type { ProductsOrderby } from "@/lib/sorting";

// Category term IDs from the live site's Enfold "Products" builder element on /shop (aviaTBcategories select,
// "Select from categories only" / OR relation) — the shop page only shows products in these categories, not the whole catalog.
const SHOP_CATEGORY_IDS = [47, 48, 23, 29, 32, 24, 27, 34, 21, 33, 43, 31, 25, 26, 28, 30, 36];

const GET_SHOP_PRODUCTS = `
  ${PRODUCT_CARD_FIELDS}
  query GetShopProducts($first: Int!, $categoryIdIn: [Int], $orderby: [ProductsOrderbyInput]) {
    products(first: $first, where: { typeIn: [SIMPLE, VARIABLE], categoryIdIn: $categoryIdIn, orderby: $orderby }) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;

// Live /shop has no pagination — it shows the full category-filtered set, so fetch a high ceiling, not a page size.
// Default sort matches the builder element's "Sort alphabetically" setting.
export async function getShopPageData(options: { first?: number; orderby?: ProductsOrderby | null } = {}) {
  const { first = 100, orderby = { field: "NAME", order: "ASC" } } = options;
  return gql<ShopPageData>(
    GET_SHOP_PRODUCTS,
    { first, categoryIdIn: SHOP_CATEGORY_IDS, orderby: orderby ? [orderby] : null },
    { revalidate: 3600 }
  );
}
