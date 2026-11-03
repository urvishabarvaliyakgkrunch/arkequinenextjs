// src/lib/graphql.ts
  const WP_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`;

// Tag every catalog query so one revalidate call can clear them all
export const PRODUCTS_TAG = "products";
// Menu has its own tag so a product refresh does not force the slow menu call again
export const MENU_TAG = "menu";

export async function gql<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: { revalidate?: number; tags?: string[] } = {}
): Promise<T> {
  // A busy WP backend sometimes answers 5xx; retry a couple of times before giving up
  let res: Response;
  for (let attempt = 0; ; attempt++) {
    res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: options.revalidate ?? 3600,
        tags: options.tags ?? [PRODUCTS_TAG],
      },
    });
    if (res.status < 500 || attempt >= 2) break;
    await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
  }

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
