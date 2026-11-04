// src/app/api/account/address/route.ts
import { cookies } from "next/headers";
import { getCurrentUser, SessionCheckFailedError } from "@/lib/auth";
import { updateCustomerAddress, AccountUpdateError } from "@/lib/customer";
import type { AddressType, UpdateCustomerAddressInput } from "@/types/customer";

function isAddressType(value: unknown): value is AddressType {
  return value === "billing" || value === "shipping";
}

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
  if (!isAddressType(body?.type) || typeof body?.address !== "object" || body.address === null) {
    return Response.json({ error: "Invalid address submission." }, { status: 400 });
  }

  const raw = body.address as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  if (!str("firstName") || !str("lastName") || !str("country")) {
    return Response.json({ error: "First name, last name and country/region are required." }, { status: 400 });
  }

  const address: UpdateCustomerAddressInput = {
    firstName: str("firstName"),
    lastName: str("lastName"),
    company: str("company"),
    address1: str("address1"),
    address2: str("address2"),
    city: str("city"),
    state: str("state"),
    postcode: str("postcode"),
    country: str("country"),
    phone: str("phone"),
    ...(body.type === "billing" ? { email: str("email") } : {}),
  };

  try {
    const updated = await updateCustomerAddress(authToken, user.id, body.type, address);
    return Response.json({ address: updated });
  } catch (err) {
    if (err instanceof AccountUpdateError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
