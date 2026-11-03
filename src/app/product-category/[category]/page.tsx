// src/app/product-category/[category]/page.tsx
import { notFound } from "next/navigation";
import { getCategoryPageData, getCategorySlugs } from "@/lib/queries/category";
import CategoryListing from "@/components/shop/CategoryListing";
import ProductCategoriesSidebar from "@/components/shop/ProductCategoriesSidebar";
import EducationArticles from "@/components/shop/EducationArticles";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CategoryBanner from "@/components/shop/CategoryBanner";

// Static + refreshed hourly (rule D1). Sort / per-page are handled client-side by CategoryListing, so no searchParams here.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getCategorySlugs()).map((category) => ({ category }));
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = await getCategoryPageData(category, { first: 15 });

  if (!data.productCategory) {
    notFound();
  }

  const description = data.productCategory.description?.replace(/<[^>]*>/g, "").trim();

  return (
    <>
      <CategoryBanner image={data.productCategory.image} title={data.productCategory.name} />
      <PageHeaderBar
        title={data.productCategory.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/shop" },
          { label: data.productCategory.name },
        ]}
      />
      <main className="mx-auto flex max-w-[1210px] flex-col gap-8 px-4 py-[25px] lg:flex-row lg:gap-12">
        <div className="min-w-0 flex-1">
          {description && (
            <div className="mb-[10px] text-left text-[12px] leading-[28.05px] text-[#57585a]">{description}</div>
          )}
          <CategoryListing slug={data.productCategory.slug} initialProducts={data.productCategory.products.nodes} />
        </div>
        <div className="w-full lg:w-[325px] lg:shrink-0">
          <ProductCategoriesSidebar
            categories={data.productCategories?.nodes ?? []}
            activeSlug={data.productCategory.slug}
          />
          <EducationArticles tags={data.tags?.nodes ?? []} />
        </div>
      </main>
    </>
  );
}
