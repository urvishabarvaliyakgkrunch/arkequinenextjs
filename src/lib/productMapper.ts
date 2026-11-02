// src/lib/productMapper.ts
import type {
  GqlProduct,
  ProductPageData,
  ProductTab,
} from "@/types/product";

// Meta rows come back as a list, so we look one up by its key
function readMeta(product: GqlProduct, key: string): string | null {
  return product.metaData?.find((row) => row.key === key)?.value ?? null;
}

// The Composition / Instructions tabs are saved by a plugin as JSON text
function parseCustomTabs(raw: string | null): ProductTab[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item: unknown): ProductTab[] => {
      if (typeof item !== "object" || item === null) return [];
      const { id, title, content } = item as Record<string, unknown>;

      // Skip broken or empty tabs so we never render a blank panel
      if (typeof id !== "string" || typeof title !== "string") return [];
      if (typeof content !== "string" || !content.trim()) return [];

      // Plugin tabs keep raw line breaks, so the panel must show them
      return [{ id, title, content, hasRawLineBreaks: true }];
    });
  } catch {
    // Bad JSON should hide the extra tabs, not break the whole page
    return [];
  }
}

// Turns the raw GraphQL product into the clean shape the page uses
export function mapProduct(product: GqlProduct): ProductPageData {
  const customTabs = parseCustomTabs(readMeta(product, "yikes_woo_products_tabs"));

  // Description is always the first tab, like on the live site
  const descriptionTab: ProductTab[] = product.description?.trim()
    ? [
        {
          id: "description",
          title: "Description",
          content: product.description,
          hasRawLineBreaks: false,
        },
      ]
    : [];

  // Main image first, then gallery; works with zero images too
  const images = [
    ...(product.image ? [product.image] : []),
    ...(product.galleryImages?.nodes ?? []),
  ];

  const categories = product.productCategories?.nodes ?? [];
  // Rank Math saves the primary category id; fall back to the last category
  const primaryId = Number(readMeta(product, "rank_math_primary_product_cat"));
  const primaryCategory =
    categories.find((category) => category.databaseId === primaryId) ??
    categories[categories.length - 1] ??
    null;

  return {
    databaseId: product.databaseId,
    type: product.__typename,
    name: product.name,
    slug: product.slug,
    sku: product.sku ?? "",
    shortDescription: product.shortDescription ?? "",
    price: product.price ?? "",
    regularPrice: product.regularPrice ?? "",
    isOnSale: Boolean(product.onSale),
    isInStock: product.stockStatus !== "OUT_OF_STOCK",
    images,
    categories,
    primaryCategory,
    tags: product.productTags?.nodes ?? [],
    tabs: [...descriptionTab, ...customTabs],
    related: (product.related?.nodes ?? []).map((item) => ({
      databaseId: item.databaseId,
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription ?? "",
      price: item.price ?? "",
      image: item.image ?? null,
    })),
  };
}
