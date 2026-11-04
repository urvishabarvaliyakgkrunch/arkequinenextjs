// src/lib/queries/post.ts
// WPGraphQL's `content` field comes back empty for Avia-builder posts (the builder's shortcode
// output only runs through the REST `content.rendered` filter chain), so single posts are
// fetched from the WP REST API instead — matches .clauderules H3's REST-first strategy.
export interface SinglePost {
  id: number;
  title: string;
  content: string;
  date: string;
  category: { name: string; uri: string } | null;
}

export interface SinglePostData {
  post: SinglePost | null;
}

interface WPCategoryTerm {
  taxonomy: string;
  name: string;
  link: string;
}

interface WPRestPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: { "wp:term"?: WPCategoryTerm[][] };
}

// 1 day — same cadence as the other post archives (news.ts, tag.ts).
export async function getPostBySlug(slug: string): Promise<SinglePostData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=wp:term`,
    { next: { revalidate: 86400, tags: ["posts"] } }
  );

  if (!res.ok) return { post: null };

  const posts: WPRestPost[] = await res.json();
  const p = posts[0];
  if (!p) return { post: null };

  const terms = p._embedded?.["wp:term"]?.flat() ?? [];
  const categoryTerm = terms.find((t) => t.taxonomy === "category");
  const category = categoryTerm
    ? { name: categoryTerm.name, uri: new URL(categoryTerm.link).pathname }
    : null;

  return {
    post: {
      id: p.id,
      title: p.title.rendered,
      content: p.content.rendered,
      date: p.date,
      category,
    },
  };
}
