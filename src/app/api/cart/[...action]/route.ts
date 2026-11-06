// src/app/api/cart/[...action]/route.ts
// Same-origin proxy for POST /wc/store/v1/cart/<action> (add-item, update-item, remove-item, apply-coupon,
// remove-coupon) — see src/app/api/cart/route.ts for why this proxy exists at all.
import { currencyCookieHeader, currencyFromCookieHeader } from "@/lib/currency";

const STORE_API = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/store/v1`;
// Store API's own /cart/add-item has no field for "which subscription plan" — same-product adds
// always merge into one line. A custom WP endpoint (ark/v1/cart/add-item) tags the cart item and
// applies the real discount server-side instead; see scratch-ark-subscription-plan-backend-snippet.php.
const ARK_API = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/ark/v1`;

export async function POST(request: Request, { params }: { params: Promise<{ action: string[] }> }) {
  const { action } = await params;
  const nonce = request.headers.get("Nonce");
  const cartToken = request.headers.get("Cart-Token");
  const body = await request.text();

  const base = action.join("/") === "add-item" ? ARK_API : STORE_API;
  const res = await fetch(`${base}/cart/${action.join("/")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(nonce ? { Nonce: nonce } : {}),
      ...(cartToken ? { "Cart-Token": cartToken } : {}),
      // CURCY converts the cart prices from this cookie
      Cookie: currencyCookieHeader(currencyFromCookieHeader(request.headers.get("cookie"))),
    },
    body,
  });

  const responseBody = await res.text();
  return new Response(responseBody, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      ...(res.headers.get("Nonce") ? { Nonce: res.headers.get("Nonce")! } : {}),
      ...(res.headers.get("Cart-Token") ? { "Cart-Token": res.headers.get("Cart-Token")! } : {}),
    },
  });
}
