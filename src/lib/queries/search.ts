// src/lib/queries/search.ts
import { gql } from "@/lib/graphql";

export interface SearchResultNode {
  __typename: string;
  id: string;
  uri: string;
  date: string;
  title: string;
  excerpt: string;
  author: { node: { name: string } } | null;
  categories: { nodes: { name: string }[] } | null;
  productCategories: { nodes: { name: string }[] } | null;
}

export interface SearchResultsData {
  contentNodes: {
    pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string | null; endCursor: string | null };
    nodes: SearchResultNode[];
  };
}

const SEARCH_RESULTS = `
  query SearchResults($s: String!, $first: Int!, $after: String, $before: String, $last: Int) {
    contentNodes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { search: $s, contentTypes: [POST, PAGE, PRODUCT] }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        __typename
        id
        uri
        date
        ... on NodeWithTitle {
          title
        }
        ... on NodeWithExcerpt {
          excerpt
        }
        ... on NodeWithAuthor {
          author {
            node {
              name
            }
          }
        }
        ... on Post {
          categories {
            nodes {
              name
            }
          }
        }
        ... on Product {
          productCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

// Matches the live WordPress search slug (/?s=query) — searches posts + pages like WP core search.
export async function getSearchResults(s: string, options: { after?: string; before?: string } = {}) {
  const { after, before } = options;
  return gql<SearchResultsData>(
    SEARCH_RESULTS,
    before
      ? { s, first: null, last: 10, before, after: null }
      : { s, first: 10, after: after ?? null, before: null, last: null },
    { revalidate: 300, tags: ["search"] }
  );
}
