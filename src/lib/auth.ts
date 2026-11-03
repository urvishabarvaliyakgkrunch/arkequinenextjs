// src/lib/auth.ts
import type { LoginResult } from "@/types/auth";

const WP_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`;

const LOGIN_MUTATION = `
  mutation ArkLogin($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        databaseId
        name
        email
      }
    }
  }
`;

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid username/email or password.");
    this.name = "InvalidCredentialsError";
  }
}

// Auth never goes through gql() in src/lib/graphql.ts — that wrapper defaults to cached,
// revalidate-tagged GET-style reads for the product catalog, which a login mutation must never be.
export async function loginWithPassword(username: string, password: string): Promise<LoginResult> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: LOGIN_MUTATION, variables: { username, password } }),
    cache: "no-store",
  });

  const json = await res.json();

  // The backend's JWT auth plugin throws a generic "Internal server error" for bad
  // credentials rather than a clean validation error — treat any GraphQL error here
  // as invalid credentials rather than surfacing the raw backend message to the user.
  if (json.errors || !json.data?.login) {
    // TEMP DEBUG — remove after diagnosing the backend error
    console.error("GraphQL login error:", JSON.stringify(json.errors ?? json));
    throw new InvalidCredentialsError();
  }

  return json.data.login as LoginResult;
}
