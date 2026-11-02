// src/app/shop/page.tsx
import { getShopPageData } from "@/lib/queries/shop";
import ProductGrid from "@/components/shop/ProductGrid";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CategoryGrid from "@/components/category/CategoryGrid";

// Live site's /shop has no sort/per-page toolbar and no pagination — it lists every product.
export default async function ShopPage() {
  const data = await getShopPageData();

  return (
    <>
      <PageHeaderBar title="Shop" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      {/* Icon band is full-bleed (its own bg spans the viewport); product grid sits in the normal container */}
      <CategoryGrid perRow={6} />
      <main className="mx-auto max-w-[1210px] px-4 py-8">
        <ProductGrid products={data.products.nodes} />
      </main>
    </>
  );
}
