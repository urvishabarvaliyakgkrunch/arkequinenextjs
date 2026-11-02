// src/app/product-category/[category]/page.tsx
import { notFound } from "next/navigation";
import { getCategoryPageData } from "@/lib/queries/category";
import { parseOrderby } from "@/lib/sorting";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductCategoriesSidebar from "@/components/shop/ProductCategoriesSidebar";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import ShopToolbar from "@/components/shop/ShopToolbar";

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ orderby?: string; per_page?: string }>;
}) {
  const { category } = await params;
  const { orderby, per_page } = await searchParams;
  const first = Number(per_page) || 15;
  const data = await getCategoryPageData(category, { first, orderby: parseOrderby(orderby) });

  if (!data.productCategory) {
    notFound();
  }

  return (
    <>
      <PageHeaderBar
        title={data.productCategory.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/shop" },
          { label: data.productCategory.name },
        ]}
      />
      <main className="mx-auto flex max-w-[1210px] flex-col gap-8 px-4 py-8 lg:flex-row">
        <div className="flex-1">
          <ShopToolbar defaultOrderby={orderby ?? ""} defaultPerPage={first} />
          <ProductGrid
            products={data.productCategory.products.nodes}
            columnsClassName="grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
        <ProductCategoriesSidebar
          categories={data.productCategories?.nodes ?? []}
          activeSlug={data.productCategory.slug}
        />
      </main>
    </>
  );
}
