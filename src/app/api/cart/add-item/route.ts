// src/app/api/cart/add-item/route.ts
// Same-origin proxy for POST /wc/store/v1/cart/add-item — see src/app/api/cart/route.ts for why this exists.
const STORE_API = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/store/v1`;

export async function POST(request: Request) {
  const nonce = request.headers.get("Nonce");
  const cartToken = request.headers.get("Cart-Token");
  const body = await request.text();

  const res = await fetch(`${STORE_API}/cart/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(nonce ? { Nonce: nonce } : {}),
      ...(cartToken ? { "Cart-Token": cartToken } : {}),
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
