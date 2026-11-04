// src/app/[slug]/page.tsx
// Short root-level URLs. Two WP content types share this namespace exactly like on
// ark-equine.com: a category (e.g. /naturals) renders the shop grid; anything else falls
// back to a single blog post (e.g. /getting-stallions-off-to-the-right-start-this-breeding-season/).
import { notFound } from "next/navigation";
import { getCategoryPageData, getCategorySlugs } from "@/lib/queries/category";
import { getPostBySlug } from "@/lib/queries/post";
import ProductGrid from "@/components/shop/ProductGrid";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import CategoryHero from "@/components/shop/CategoryHero";
import PostContent from "@/components/news/PostContent";
import { stripHtml } from "@/lib/stripHtml";

// No segment-level revalidate here — this route serves both category pages (1h, category.ts)
// and single posts (1 day, post.ts); a fixed value here would force both onto the shorter one.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCategorySlugs()).map((slug) => ({ slug }));
}

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCategoryPageData(slug, { first: 100 });

  if (data.productCategory) {
    const { name, image, products } = data.productCategory;

    return (
      <>
        <PageHeaderBar title={name} breadcrumbs={[{ label: "Home", href: "/" }, { label: name }]} />
        <CategoryHero title={name} image={image} />
        <div className="mx-auto max-w-[1210px] px-4 pt-[26px] pb-8 min-[1242px]:px-0">
          <ProductGrid
            products={products.nodes}
            columnsClassName="grid-cols-1 gap-[12.09px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        </div>
      </>
    );
  }

  const postData = await getPostBySlug(slug);

  if (!postData.post) {
    notFound();
  }

  const { title, content, category } = postData.post;

  return (
    <>
      <PageHeaderBar
        title={stripHtml(title)}
        breadcrumbs={[
          { label: "Home", href: "/" },
          ...(category ? [{ label: category.name, href: category.uri }] : []),
          { label: stripHtml(title) },
        ]}
      />
      <div className="mx-auto max-w-[1310px] px-4 py-[50px] sm:px-[50px]">
        <PostContent html={content} />
      </div>
    </>
  );
}
