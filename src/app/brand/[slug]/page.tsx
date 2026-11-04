// src/app/brand/[slug]/page.tsx
// Brand archive pages (e.g. /brand/arkequine-brand/) — same URL shape and layout as the live site:
// header bar + contained brand banner + sort/per-page toolbar + product grid + categories/education sidebar.
import { notFound } from "next/navigation";
import { getBrandPageData, getBrandSlugs } from "@/lib/queries/brand";
import CategoryListing from "@/components/shop/CategoryListing";
import ProductCategoriesSidebar from "@/components/shop/ProductCategoriesSidebar";
import EducationArticles from "@/components/shop/EducationArticles";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import BrandBanner from "@/components/shop/BrandBanner";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getBrandSlugs()).map((slug) => ({ slug }));
}

export default async function BrandSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = await getBrandPageData(slug);

  if (!brand) {
    notFound();
  }

  const { name, image, products, categorySlug, categories, tags } = brand;

  return (
    <>
      <PageHeaderBar title={name} breadcrumbs={[{ label: "Home", href: "/" }, { label: name }]} />
      <BrandBanner image={image} />
      <main className="mx-auto flex max-w-[1210px] flex-col gap-8 px-4 py-[25px] lg:flex-row lg:gap-12">
        <div className="min-w-0 flex-1">
          {categorySlug ? (
            <CategoryListing slug={categorySlug} initialProducts={products} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.length === 0 ? (
                <p className="col-span-full py-12 text-center text-ark-btn-text">No products found.</p>
              ) : null}
            </div>
          )}
        </div>
        <div className="w-full lg:w-[325px] lg:shrink-0">
          <ProductCategoriesSidebar categories={categories} activeSlug={categorySlug ?? undefined} />
          <EducationArticles tags={tags} />
        </div>
      </main>
    </>
  );
}
