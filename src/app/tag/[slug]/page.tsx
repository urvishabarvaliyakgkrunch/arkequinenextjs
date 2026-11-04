// src/app/tag/[slug]/page.tsx
// Tag archive pages (e.g. /tag/digestion-and-nutrition/) — same layout as the live site:
// header bar + "Posts" grid + sidebar (Latest Articles, Education Articles tag cloud).
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTagArchiveData } from "@/lib/queries/tag";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import EducationArticles from "@/components/shop/EducationArticles";
import TagPostCard from "@/components/tag/TagPostCard";
import LatestArticlesSidebar from "@/components/tag/LatestArticlesSidebar";

// No generateStaticParams — every tag slug renders on demand, not pre-built at deploy time.
export const dynamicParams = true;
export const revalidate = 86400;

const POSTS_PER_PAGE = 9;

export default async function TagSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const data = await getTagArchiveData(slug);

  if (!data.tag) {
    notFound();
  }

  const { name, posts } = data.tag;
  const allPosts = posts.nodes;
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const pagePosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      <PageHeaderBar title={name} breadcrumbs={[{ label: "Home", href: "/" }, { label: name }]} />
      <div className="flex max-w-[1310px] flex-col mx-auto gap-8 lg:flex-row lg:gap-0  px-4 sm:px-[50px]">
        <div className="min-w-0 flex-1 lg:pr-[50px] py-[50px]">
          <h2 className="mb-2 font-heading text-[20px] font-normal uppercase leading-[28px] text-secondary">
            Posts
          </h2>
          {pagePosts.length === 0 ? (
            <p className="py-12 text-center text-meta">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-[50px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post) => (
                <TagPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          {totalPages > 1 ? (
            <nav className="mt-10 flex items-center gap-[2px] text-[11px] text-meta">
              <span className="px-[9px] leading-[35px]">
                Page {currentPage} of {totalPages}
              </span>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={n === 1 ? `/tag/${slug}` : `/tag/${slug}?page=${n}`}
                  className={`inline-flex h-[35px] w-[35px] items-center justify-center rounded-full leading-[35px] ${n === currentPage ? "font-bold text-secondary" : "text-meta hover:text-secondary"
                    }`}
                >
                  {n}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
        <div className="w-full pt-8 lg:w-[327px] lg:shrink-0 lg:border-l lg:border-border lg:pl-[50px]  ">
          <LatestArticlesSidebar posts={data.latestPosts.nodes} />
          <EducationArticles tags={data.tags.nodes} />
        </div>
      </div>
    </>
  );
}
