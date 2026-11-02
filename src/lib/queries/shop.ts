// src/lib/queries/shop.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { ShopPageData } from "@/types/product";
import type { ProductsOrderby } from "@/lib/sorting";

const GET_SHOP_PRODUCTS = `
  ${PRODUCT_CARD_FIELDS}
  query GetShopProducts($first: Int!, $orderby: [ProductsOrderbyInput]) {
    products(first: $first, where: { typeIn: [SIMPLE, VARIABLE], orderby: $orderby }) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;

export async function getShopPageData(options: { first?: number; orderby?: ProductsOrderby | null } = {}) {
  const { first = 15, orderby = null } = options;
  return gql<ShopPageData>(
    GET_SHOP_PRODUCTS,
    { first, orderby: orderby ? [orderby] : null },
    { revalidate: 3600 }
  );
}
