// src/app/news/page.tsx
// Matches ark-equine.com/news/ — header bar + full-width 4-column posts grid, no sidebar.
import { getNewsArchiveData } from "@/lib/queries/news";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import NewsPostCard from "@/components/news/NewsPostCard";

export const revalidate = 86400;

export default async function NewsPage() {
  const { category } = await getNewsArchiveData();
  const posts = category?.posts.nodes ?? [];

  return (
    <>
      <PageHeaderBar title="News" breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]} />
      <div className="mx-auto max-w-[1310px] px-4 py-[50px] sm:px-[50px]">
        {posts.length === 0 ? (
          <p className="py-12 text-center text-meta">No posts found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-[6%]">
            {posts.map((post) => (
              <NewsPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
