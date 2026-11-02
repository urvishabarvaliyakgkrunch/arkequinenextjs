// src/app/shop/page.tsx
import { getShopPageData } from "@/lib/queries/shop";
import { parseOrderby } from "@/lib/sorting";
import ProductGrid from "@/components/shop/ProductGrid";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import ShopToolbar from "@/components/shop/ShopToolbar";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ orderby?: string; per_page?: string }>;
}) {
  const { orderby, per_page } = await searchParams;
  const first = Number(per_page) || 15;
  const data = await getShopPageData({ first, orderby: parseOrderby(orderby) });

  return (
    <>
      <PageHeaderBar title="Shop" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <main className="mx-auto max-w-[1210px] px-4 py-8">
        <ShopToolbar defaultOrderby={orderby ?? ""} defaultPerPage={first} />
        <ProductGrid products={data.products.nodes} />
      </main>
    </>
  );
}
