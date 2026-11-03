// src/lib/productQuery.ts

// Reused so every image field asks for the same things
const IMAGE_FIELDS = `
  sourceUrl
  altText
  mediaDetails { width height }
`;

// ONE query = product + gallery + tabs + related products (1 call per page)
export const PRODUCT_PAGE_QUERY = `
  query ProductPage($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      __typename
      databaseId
      name
      slug
      sku
      description
      shortDescription
      onSale
      image { ${IMAGE_FIELDS} }
      galleryImages { nodes { ${IMAGE_FIELDS} } }
      productCategories { nodes { databaseId name slug } }
      productTags { nodes { databaseId name slug } }
      metaData(keysIn: ["yikes_woo_products_tabs", "rank_math_primary_product_cat"]) { key value }
      ... on ProductWithPricing { price regularPrice }
      ... on InventoriedProduct { stockStatus }
      related(first: 4) {
        nodes {
          __typename
          id
          databaseId
          name
          slug
          shortDescription
          image { sourceUrl altText }
          ... on ProductWithPricing { price regularPrice salePrice }
          ... on InventoriedProduct { stockStatus }
        }
      }
    }
    # "Education Articles" box = blog tags, fetched in the same call
    tags(first: 45, where: { hideEmpty: true, orderby: NAME, order: ASC }) {
      nodes { databaseId name slug count }
    }
  }
`;
