// src/app/shop/page.tsx
import { getShopPageData } from "@/lib/queries/shop";
import ProductGrid from "@/components/shop/ProductGrid";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CategoryGrid from "@/components/category/CategoryGrid";
import { CATEGORIES } from "@/components/category/categories";

// Live /shop skips Technology and Testing & Analysis in its 12-icon band.
const SHOP_CATEGORIES = CATEGORIES.filter(
  (c) => !["Technology", "Testing & Analysis"].includes(c.label),
).slice(0, 12);

// Live site's /shop has no sort/per-page toolbar and no pagination — it lists every product.
export default async function ShopPage() {
  const data = await getShopPageData();

  return (
    <>
      <PageHeaderBar title="Shop" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      {/* Icon band is full-bleed (its own bg spans the viewport); product grid sits in the normal container */}
      <CategoryGrid categories={SHOP_CATEGORIES} perRow={6} />
      <div className="mx-auto max-w-[1210px] px-4 pt-[26px] pb-8 min-[1242px]:px-0">
        <ProductGrid
          products={data.products.nodes}
          columnsClassName="grid-cols-1 gap-[12.09px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </>
  );
}
