// src/lib/queries/news.ts
import { gql } from "@/lib/graphql";

export interface NewsPostSummary {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
}

export interface NewsArchiveData {
  category: { posts: { nodes: NewsPostSummary[] } } | null;
}

// Matches ark-equine.com/news/ — the WP "News" category archive (slug "news"), not every post:
// on live, a post can sit in "Learning Academy" and still show here because it also carries News.
const GET_NEWS_ARCHIVE = `
  query GetNewsArchive($slug: ID!, $first: Int!) {
    category(id: $slug, idType: SLUG) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          uri
          date
          excerpt
          featuredImage {
            node {
              sourceUrl(size: MEDIUM)
              altText
            }
          }
        }
      }
    }
  }
`;

// 1 day — news changes rarely, same cadence as the tag archives.
export async function getNewsArchiveData(first = 100): Promise<NewsArchiveData> {
  return gql<NewsArchiveData>(GET_NEWS_ARCHIVE, { slug: "news", first }, { revalidate: 86400, tags: ["posts"] });
}
