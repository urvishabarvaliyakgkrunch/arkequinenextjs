// src/types/product.ts

// One image from WordPress media library
export interface ProductImage {
  sourceUrl: string;
  altText: string;
  mediaDetails: { width: number; height: number } | null;
}

// Category or tag link shown under the product
export interface ProductTerm {
  databaseId: number;
  name: string;
  slug: string;
}

// One tab under the product (Description, Composition, ...)
export interface ProductTab {
  id: string;
  title: string;
  content: string; // HTML coming from WordPress
  hasRawLineBreaks: boolean; // true when new lines must stay visible
}

// Small version of a product used in "People also liked"
export interface RelatedProduct {
  databaseId: number;
  name: string;
  slug: string;
  shortDescription: string;
  price: string;
  image: ProductImage | null;
}

// Everything the product page needs, built from ONE GraphQL call
export interface ProductPageData {
  databaseId: number;
  type: string; // SimpleProduct, VariableProduct, ...
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  isOnSale: boolean;
  isInStock: boolean;
  images: ProductImage[]; // main image first, then gallery
  categories: ProductTerm[];
  primaryCategory: ProductTerm | null; // used in the breadcrumb
  tags: ProductTerm[];
  tabs: ProductTab[];
  related: RelatedProduct[];
}

// ---- Raw GraphQL response shapes (before we clean them up) ----

export interface GqlProduct {
  __typename: string;
  databaseId: number;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  onSale: boolean | null;
  price?: string | null;
  regularPrice?: string | null;
  stockStatus?: string | null;
  image: ProductImage | null;
  galleryImages: { nodes: ProductImage[] } | null;
  productCategories: { nodes: ProductTerm[] } | null;
  productTags: { nodes: ProductTerm[] } | null;
  metaData: { key: string; value: string | null }[] | null;
  related: { nodes: GqlRelatedProduct[] } | null;
}

export interface GqlRelatedProduct {
  databaseId: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  price?: string | null;
  image: ProductImage | null;
}

export interface GqlProductResponse {
  data: { product: GqlProduct | null } | null;
  errors?: { message: string }[];
}
