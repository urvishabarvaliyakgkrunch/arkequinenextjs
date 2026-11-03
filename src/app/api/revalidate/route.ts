// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { MENU_TAG, PRODUCTS_TAG } from "@/lib/graphql";

// Clears cached WordPress data on demand, so a product change shows up without waiting the 1 hour.
// GET is allowed too so it can be opened straight in the browser; the secret still protects it.
export async function GET(request: Request) {
  return POST(request);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "REVALIDATE_SECRET is not set." }, { status: 500 });
  }

  const url = new URL(request.url);
  if (url.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Bad secret." }, { status: 401 });
  }

  // Default clears products; ?tag=menu clears the nav menu, ?tag=all clears both
  const tag = url.searchParams.get("tag");
  const cleared = tag === "menu" ? [MENU_TAG] : tag === "all" ? [PRODUCTS_TAG, MENU_TAG] : [PRODUCTS_TAG];
  cleared.forEach((t) => revalidateTag(t, { expire: 0 }));
  return NextResponse.json({ cleared, clearedAt: new Date().toISOString() });
}
