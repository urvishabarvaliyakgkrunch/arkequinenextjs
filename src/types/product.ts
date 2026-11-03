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

// Landing page "Best Sellers" card — ProductCardFields plus the one category name shown as the card's eyebrow
export interface BestSellerProduct extends ProductCardFields {
  category: string | null;
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

export interface PostTag {
  name: string;
  slug: string;
  count: number | null;
}

export interface CategoryPageData {
  productCategory: {
    name: string;
    slug: string;
    description: string | null;
    image: { sourceUrl: string; altText: string | null } | null;
    products: {
      nodes: ProductCardFields[];
    };
  } | null;
  productCategories: {
    nodes: ProductCategorySummary[];
  };
  tags: {
    nodes: PostTag[];
  };
}

// ---- Single product page ----
export interface ProductImage {
  sourceUrl: string;
  altText: string | null;
  mediaDetails?: { width: number | null; height: number | null } | null;
}

export interface ProductTerm {
  databaseId: number;
  name: string;
  slug: string;
}

export interface ProductTab {
  id: string;
  title: string;
  content: string;
  hasRawLineBreaks: boolean;
}

export interface RelatedProduct {
  type: ProductTypename;
  databaseId: number;
  name: string;
  slug: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  isOnSale: boolean;
  image: ProductImage | null;
}

// One post tag shown in the "Education Articles" box
export interface EducationTag {
  databaseId: number;
  name: string;
  slug: string;
  count: number;
}

// One attribute dropdown shown on a variable product, e.g. "Size" with its list of choices
export interface ProductAttribute {
  name: string; // WooCommerce's internal key for this attribute, e.g. "size"
  label: string; // the text shown to the shopper, e.g. "Size"
  options: string[]; // the choices that appear in the dropdown
}

// One buyable variation of a variable product, e.g. the "Cartridge" option of "Aquatabs InLine"
export interface ProductVariation {
  databaseId: number;
  price: string;
  regularPrice: string;
  isInStock: boolean;
  image: ProductImage | null;
  // Which attribute value this variation matches, keyed by attribute name, e.g. { size: "Cartridge" }
  attributes: Record<string, string>;
}

export interface ProductPageData {
  databaseId: number;
  type: ProductTypename;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  isOnSale: boolean;
  isInStock: boolean;
  images: ProductImage[];
  categories: ProductTerm[];
  primaryCategory: ProductTerm | null;
  tags: ProductTerm[];
  tabs: ProductTab[];
  related: ProductCardFields[];
  educationTags: EducationTag[];
  // Empty arrays for a SimpleProduct — only a VariableProduct (like "Aquatabs InLine") has these
  attributes: ProductAttribute[];
  variations: ProductVariation[];
}

// Raw WPGraphQL shapes
export interface GqlProduct {
  __typename: ProductTypename;
  databaseId: number;
  name: string;
  slug: string;
  sku?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  onSale?: boolean | null;
  image?: ProductImage | null;
  galleryImages?: { nodes: ProductImage[] } | null;
  productCategories?: { nodes: ProductTerm[] } | null;
  productTags?: { nodes: ProductTerm[] } | null;
  metaData?: { key: string; value: string | null }[] | null;
  price?: string | null;
  regularPrice?: string | null;
  stockStatus?: string | null;
  // Only present on a VariableProduct (WPGraphQL skips these fields for a SimpleProduct)
  attributes?: {
    nodes: {
      name: string;
      label?: string | null;
      options?: string[] | null;
      variation?: boolean | null; // true = this attribute is used to pick a variation, not just shown as info
    }[];
  } | null;
  variations?: {
    nodes: {
      databaseId: number;
      price?: string | null;
      regularPrice?: string | null;
      stockStatus?: string | null;
      image?: ProductImage | null;
      attributes?: { nodes: { name: string; value?: string | null }[] } | null;
    }[];
  } | null;
  related?: {
    nodes: {
      __typename: ProductTypename;
      id: string;
      databaseId: number;
      name: string;
      slug: string;
      shortDescription?: string | null;
      price?: string | null;
      regularPrice?: string | null;
      salePrice?: string | null;
      stockStatus?: string | null;
      image?: { sourceUrl: string; altText?: string | null } | null;
    }[];
  } | null;
}

export interface GqlProductResponse {
  data?: {
    product: GqlProduct | null;
    tags?: { nodes: (EducationTag | null)[] } | null;
  } | null;
}
