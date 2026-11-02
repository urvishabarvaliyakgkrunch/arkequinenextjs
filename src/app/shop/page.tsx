// src/app/shop/page.tsx
import { getShopPageData } from "@/lib/queries/shop";
import ProductGrid from "@/components/shop/ProductGrid";

export default async function ShopPage() {
  const data = await getShopPageData();

  return (
    <main className="mx-auto max-w-[1210px] px-4 py-8">
      <ProductGrid products={data.products.nodes} />
    </main>
  );
}
