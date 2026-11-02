// src/types/product.ts
export type ProductTypename =
  | "SimpleProduct"
  | "VariableProduct"
  | "ExternalProduct"
  | "GroupProduct";

export interface ProductCardFields {
  __typename: ProductTypename;
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  shortDescription: string | null;
  image: { sourceUrl: string; altText: string } | null;
  price: string | null;
  regularPrice: string | null;
  salePrice: string | null;
  stockStatus: string | null;
}

export interface ShopPageData {
  products: {
    nodes: ProductCardFields[];
  };
}

export interface ProductCategorySummary {
  name: string;
  slug: string;
  count: number | null;
}

export interface CategoryPageData {
  productCategory: {
    name: string;
    slug: string;
    description: string | null;
    products: {
      nodes: ProductCardFields[];
    };
  } | null;
  productCategories: {
    nodes: ProductCategorySummary[];
  };
}
