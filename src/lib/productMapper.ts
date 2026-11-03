// src/lib/productMapper.ts
import type {
  EducationTag,
  GqlProduct,
  ProductPageData,
  ProductTab,
} from "@/types/product";

// Meta rows come back as a list, so we look one up by its key
function readMeta(product: GqlProduct, key: string): string | null {
  return product.metaData?.find((row) => row.key === key)?.value ?? null;
}

// The Composition / Instructions tabs are saved by the plugin as PHP-serialized text
// Minimal reader for arrays, strings and numbers (lengths are in UTF-8 bytes)
function readPhp(buf: Buffer, pos: { i: number }): unknown {
  const type = String.fromCharCode(buf[pos.i]);
  if (type === "s") {
    const lenEnd = buf.indexOf(":", pos.i + 2);
    const len = Number(buf.toString("utf8", pos.i + 2, lenEnd));
    const start = lenEnd + 2;
    pos.i = start + len + 2;
    return buf.toString("utf8", start, start + len);
  }
  if (type === "i" || type === "d") {
    const end = buf.indexOf(";", pos.i);
    const value = Number(buf.toString("utf8", pos.i + 2, end));
    pos.i = end + 1;
    return value;
  }
  if (type === "a") {
    const countEnd = buf.indexOf(":", pos.i + 2);
    const count = Number(buf.toString("utf8", pos.i + 2, countEnd));
    pos.i = countEnd + 2;
    const result: Record<string, unknown> = {};
    for (let n = 0; n < count; n++) {
      const key = String(readPhp(buf, pos));
      result[key] = readPhp(buf, pos);
    }
    pos.i += 1;
    return result;
  }
  throw new Error("Unsupported serialized type");
}

function parseCustomTabs(raw: string | null): ProductTab[] {
  if (!raw) return [];

  try {
    const parsed = readPhp(Buffer.from(raw, "utf8"), { i: 0 });
    if (typeof parsed !== "object" || parsed === null) return [];

    return Object.values(parsed).flatMap((item: unknown): ProductTab[] => {
      if (typeof item !== "object" || item === null) return [];
      const { id, title, content } = item as Record<string, unknown>;

      // Skip broken or empty tabs so we never render a blank panel
      if (typeof id !== "string" || typeof title !== "string") return [];
      if (typeof content !== "string" || !content.trim()) return [];

      // Plugin tabs keep raw line breaks, so the panel must show them
      return [{ id, title, content, hasRawLineBreaks: true }];
    });
  } catch {
    // Bad data should hide the extra tabs, not break the whole page
    return [];
  }
}

// Turns the raw GraphQL product into the clean shape the page uses
export function mapProduct(
  product: GqlProduct,
  tags: (EducationTag | null)[],
): ProductPageData {
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
      __typename: item.__typename,
      id: item.id,
      databaseId: item.databaseId,
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription ?? null,
      image: item.image
        ? { sourceUrl: item.image.sourceUrl, altText: item.image.altText ?? "" }
        : null,
      price: item.price ?? null,
      regularPrice: item.regularPrice ?? null,
      salePrice: item.salePrice ?? null,
      stockStatus: item.stockStatus ?? null,
    })),
    // A tag can come back null when WordPress hides it
    educationTags: tags.filter((tag): tag is EducationTag => tag !== null),
  };
}
