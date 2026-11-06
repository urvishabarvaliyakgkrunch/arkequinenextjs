// src/lib/auth.ts
import { cache } from "react";
import type { AuthUser, LoginResult } from "@/types/auth";

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

const VIEWER_QUERY = `
  query ArkViewer {
    viewer {
      id
      databaseId
      name
      email
      firstName
      lastName
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
    throw new InvalidCredentialsError();
  }

  return json.data.login as LoginResult;
}

export class SessionCheckFailedError extends Error {
  constructor(cause: string) {
    super(`Couldn't verify the session: ${cause}`);
    this.name = "SessionCheckFailedError";
  }
}

// Used server-side on /my-account to decide login form vs dashboard.
// Wrapped in React's cache() because the layout and page both call this with the same token in the
// same request — without it, that's two full ~3s GraphQL round trips back-to-back (the "no-store"
// fetch option opts out of Next.js's own fetch memoization, so cache() is needed on top of it).
export const getCurrentUser = cache(async (authToken: string): Promise<AuthUser | null> => {
  let res: Response;
  try {
    res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ query: VIEWER_QUERY }),
      cache: "no-store",
    });
  } catch {
    throw new SessionCheckFailedError("network request failed");
  }

  if (!res.ok) {
    throw new SessionCheckFailedError(`backend returned ${res.status}`);
  }

  let json: { errors?: Array<{ message?: string }>; data?: { viewer?: AuthUser } };
  try {
    json = await res.json();
  } catch {
    throw new SessionCheckFailedError("backend returned a non-JSON response");
  }

  // The backend's JWT auth plugin gives a generic "Internal server error" for a bad/expired
  // token on this query too (same pattern as loginWithPassword's bad-credentials case above) —
  // there's no reliable signal in the message to tell "invalid token" apart from any other
  // app-level GraphQL error. A 200 response that still carries a GraphQL error is a completed
  // round trip, not a dropped/flaky one, so treat it as "really logged out" rather than
  // transient. Only an actual transport-level failure (network error, non-2xx, bad JSON —
  // caught above) counts as transient now.
  if (json.errors?.length) {
    return null;
  }

  return json.data?.viewer ?? null;
});

const REFRESH_MUTATION = `
  mutation ArkRefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

// The authToken only lives a few minutes; the refresh token buys a new one without asking for the password again.
// Returns null when the refresh token is bad or expired, so the caller can carry on as a guest.
export async function refreshAuthToken(refreshToken: string): Promise<string | null> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: REFRESH_MUTATION, variables: { refreshToken } }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  const token = json?.data?.refreshJwtAuthToken?.authToken;
  return typeof token === "string" ? token : null;
}
