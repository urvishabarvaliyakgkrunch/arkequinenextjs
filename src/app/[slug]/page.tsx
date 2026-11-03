// src/app/[slug]/page.tsx
// Short category URLs (e.g. /naturals) — same category as /product-category/naturals, laid out like the live site's
// /naturals page: header bar + full-width 4-column grid, no sidebar / banner / sort toolbar, every product listed.
import { notFound } from "next/navigation";
import { getCategoryPageData, getCategorySlugs } from "@/lib/queries/category";
import ProductGrid from "@/components/shop/ProductGrid";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CategoryHero from "@/components/shop/CategoryHero";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCategorySlugs()).map((slug) => ({ slug }));
}

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCategoryPageData(slug, { first: 100 });

  if (!data.productCategory) {
    notFound();
  }

  const { name, image, products } = data.productCategory;

  return (
    <>
      <PageHeaderBar title={name} breadcrumbs={[{ label: "Home", href: "/" }, { label: name }]} />
      <CategoryHero title={name} image={image} />
      <main className="mx-auto max-w-[1210px] px-4 pt-[26px] pb-8 min-[1242px]:px-0">
        <ProductGrid
          products={products.nodes}
          columnsClassName="grid-cols-1 gap-[12.09px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </main>
    </>
  );
}
