// src/lib/queries/fragments.ts
// Shared across shop + category pages — the product card looks identical everywhere, so it fetches identical fields.
export const PRODUCT_CARD_FIELDS = `
  fragment ProductCardFields on Product {
    __typename
    id
    databaseId
    slug
    name
    shortDescription
    image {
      sourceUrl
      altText
    }
    ... on ProductWithPricing {
      price(format: FORMATTED)
      regularPrice(format: FORMATTED)
      salePrice(format: FORMATTED)
    }
    ... on InventoriedProduct {
      stockStatus
    }
  }
`;
