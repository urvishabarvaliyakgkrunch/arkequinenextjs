// src/lib/queries/shop.ts
import { gql } from "@/lib/graphql";
import { PRODUCT_CARD_FIELDS } from "@/lib/queries/fragments";
import type { ShopPageData } from "@/types/product";

const GET_SHOP_PRODUCTS = `
  ${PRODUCT_CARD_FIELDS}
  query GetShopProducts($first: Int!) {
    products(first: $first, where: { typeIn: [SIMPLE, VARIABLE] }) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;

export async function getShopPageData(first = 48) {
  return gql<ShopPageData>(GET_SHOP_PRODUCTS, { first }, { revalidate: 3600 });
}
