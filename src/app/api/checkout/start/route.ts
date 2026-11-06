// src/app/api/checkout/start/route.ts
import { cookies } from "next/headers";
import { refreshAuthToken } from "@/lib/auth";
import { isTokenFresh } from "@/lib/jwt";
import { buildHandoffPage } from "@/lib/checkoutHandoffPage";

const AUTH_COOKIE = "ark_auth_token";
const REFRESH_COOKIE = "ark_refresh_token";

// Gives back a valid login token, or null for a guest. Only the server can do this: the cookies are httpOnly.
async function getFreshAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(AUTH_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (authToken && isTokenFresh(authToken)) return authToken;
  if (!refreshToken) return null;

  // The short-lived token ran out, so ask for a new one with the refresh token
  const newToken = await refreshAuthToken(refreshToken);
  if (newToken) {
    cookieStore.set(AUTH_COOKIE, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  return newToken;
}

// The browser posts the cart token here; we add the login token and forward both to WordPress
export async function POST(request: Request) {
  const handoffUrl = process.env.NEXT_PUBLIC_CHECKOUT_HANDOFF_URL;
  if (!handoffUrl) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_WP_URL}/checkout/`, 303);
  }

  const form = await request.formData().catch(() => null);
  const cartToken = form?.get("cart_token");

  const fields: Record<string, string> = {};
  if (typeof cartToken === "string" && cartToken) fields.cart_token = cartToken;

  const authToken = await getFreshAuthToken();
  if (authToken) fields.auth_token = authToken;

  return new Response(buildHandoffPage(handoffUrl, fields), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // The page holds tokens, so nothing may store it
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}
