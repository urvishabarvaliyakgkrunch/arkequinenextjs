// src/app/api/cart/route.ts
// Same-origin proxy for GET /wc/store/v1/cart — the backend's real (non-OPTIONS) responses don't
// send Access-Control-Allow-Origin, so the browser can't call it cross-origin directly. Proxying
// through our own origin (server-to-server, no CORS involved) sidesteps that backend limitation.
const STORE_API = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/store/v1`;

export async function GET(request: Request) {
  const nonce = request.headers.get("Nonce");
  const cartToken = request.headers.get("Cart-Token");

  const res = await fetch(`${STORE_API}/cart`, {
    headers: {
      ...(nonce ? { Nonce: nonce } : {}),
      ...(cartToken ? { "Cart-Token": cartToken } : {}),
    },
    cache: "no-store",
  });

  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      ...(res.headers.get("Nonce") ? { Nonce: res.headers.get("Nonce")! } : {}),
      ...(res.headers.get("Cart-Token") ? { "Cart-Token": res.headers.get("Cart-Token")! } : {}),
    },
  });
}
