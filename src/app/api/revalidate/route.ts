// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { PRODUCTS_TAG } from "@/lib/graphql";

// Clears cached WordPress data on demand, so a product change shows up without waiting the 1 hour
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "REVALIDATE_SECRET is not set." }, { status: 500 });
  }

  const url = new URL(request.url);
  if (url.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Bad secret." }, { status: 401 });
  }

  revalidateTag(PRODUCTS_TAG, { expire: 0 });
  return NextResponse.json({ cleared: [PRODUCTS_TAG], clearedAt: new Date().toISOString() });
}
