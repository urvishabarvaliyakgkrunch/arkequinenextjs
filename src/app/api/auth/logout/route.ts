// src/app/api/auth/logout/route.ts
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("ark_auth_token");
  cookieStore.delete("ark_refresh_token");
  return Response.json({ success: true });
}
