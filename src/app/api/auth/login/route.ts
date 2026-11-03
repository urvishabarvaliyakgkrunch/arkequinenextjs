// src/app/api/auth/login/route.ts
import { cookies } from "next/headers";
import { loginWithPassword, InvalidCredentialsError } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return Response.json(
      { error: !username ? "Username or email address is required." : "Password is required." },
      { status: 400 }
    );
  }

  try {
    const { authToken, refreshToken, user } = await loginWithPassword(username, password);

    const cookieStore = await cookies();
    // httpOnly: the token never needs to be read by client JS, only sent back to our own API routes.
    cookieStore.set("ark_auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("ark_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return Response.json({ user });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return Response.json({ error: err.message }, { status: 401 });
    }
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
