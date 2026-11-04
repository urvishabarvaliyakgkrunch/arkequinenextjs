// src/app/api/account/update/route.ts
import { cookies } from "next/headers";
import { getCurrentUser, loginWithPassword, InvalidCredentialsError, SessionCheckFailedError } from "@/lib/auth";
import { updateAccountDetails, AccountUpdateError } from "@/lib/customer";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  if (!authToken) {
    return Response.json({ error: "You must be logged in." }, { status: 401 });
  }

  let user;
  try {
    user = await getCurrentUser(authToken);
  } catch (err) {
    if (err instanceof SessionCheckFailedError) {
      return Response.json({ error: "Couldn't verify your session. Please try again." }, { status: 503 });
    }
    throw err;
  }
  if (!user) {
    return Response.json({ error: "Your session has expired. Please log in again." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const firstName = typeof body?.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body?.lastName === "string" ? body.lastName.trim() : "";
  const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  if (!firstName || !lastName || !displayName || !email) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  // The JWT proves who the request is from, not that the caller still knows the current
  // password — re-verify it with a real login before honouring a password change.
  if (newPassword) {
    if (!currentPassword) {
      return Response.json({ error: "Enter your current password to set a new one." }, { status: 400 });
    }
    try {
      await loginWithPassword(user.email, currentPassword);
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return Response.json({ error: "Your current password is incorrect." }, { status: 400 });
      }
      throw err;
    }
  }

  try {
    const updatedUser = await updateAccountDetails(authToken, {
      id: user.id,
      firstName,
      lastName,
      displayName,
      email,
      ...(newPassword ? { password: newPassword } : {}),
    });
    return Response.json({ user: updatedUser });
  } catch (err) {
    if (err instanceof AccountUpdateError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
