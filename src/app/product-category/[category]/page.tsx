// src/app/product-category/[category]/page.tsx
import { notFound } from "next/navigation";
import { getCategoryPageData } from "@/lib/queries/category";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductCategoriesSidebar from "@/components/shop/ProductCategoriesSidebar";

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await getCategoryPageData(category);

  if (!data.productCategory) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-[1210px] flex-col gap-8 px-4 py-8 lg:flex-row">
      <div className="flex-1">
        <h1 className="mb-6 text-2xl font-semibold text-ark-title">
          {data.productCategory.name}
        </h1>
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
  );
}
