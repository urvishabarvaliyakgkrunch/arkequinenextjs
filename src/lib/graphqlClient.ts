// src/lib/graphqlClient.ts

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WP_URL}/graphql`;

// The only place that talks to the WPGraphQL endpoint
export async function fetchGraphQL<TResponse>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<TResponse> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);
  return (await res.json()) as TResponse;
}
