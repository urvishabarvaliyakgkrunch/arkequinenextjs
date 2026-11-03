// src/app/brand/[slug]/page.tsx
// Brand archive pages (e.g. /brand/arkequine-brand/) — same URL shape and layout as the live site:
// header bar + full-width banner (the brand's feature image) + product grid, no sidebar/toolbar.
import { notFound } from "next/navigation";
import { getBrandPageData, getBrandSlugs } from "@/lib/queries/brand";
import ProductGrid from "@/components/shop/ProductGrid";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CategoryHero from "@/components/shop/CategoryHero";

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

  const { name, image, products } = brand;

  return (
    <>
      <PageHeaderBar title={name} breadcrumbs={[{ label: "Home", href: "/" }, { label: name }]} />
      <CategoryHero title={name} image={image} />
      <main className="mx-auto max-w-[1210px] px-4 pt-[26px] pb-8 min-[1242px]:px-0">
        <ProductGrid
          products={products}
          columnsClassName="grid-cols-1 gap-[12.09px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </main>
    </>
  );
}
