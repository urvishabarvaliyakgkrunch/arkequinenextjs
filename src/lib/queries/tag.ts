// src/lib/queries/tag.ts
import { gql } from "@/lib/graphql";
import type { PostTag } from "@/types/product";

export interface TagPostSummary {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
}

export interface TagArchiveData {
  tag: {
    name: string;
    slug: string;
    posts: { nodes: TagPostSummary[] };
  } | null;
  latestPosts: { nodes: TagPostSummary[] };
  tags: { nodes: PostTag[] };
}

// Matches the "Digestion and Nutrition Archives" tag pages on ark-equine.com — posts grid +
// "Latest Articles" / "Education Articles" (tag cloud) sidebar, same as the category sidebar widgets.
const GET_TAG_ARCHIVE = `
  query GetTagArchive($slug: ID!, $first: Int!) {
    tag(id: $slug, idType: SLUG) {
      name
      slug
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          uri
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    latestPosts: posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        uri
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    tags(first: 20) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

// 1 day — tag archives change rarely, so a longer cache than the product catalog is fine.
export async function getTagArchiveData(slug: string, first = 100): Promise<TagArchiveData> {
  return gql<TagArchiveData>(GET_TAG_ARCHIVE, { slug, first }, { revalidate: 86400, tags: ["posts"] });
}
