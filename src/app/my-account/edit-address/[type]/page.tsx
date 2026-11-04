// src/app/my-account/edit-address/[type]/page.tsx
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCustomerAddresses } from "@/lib/customer";
import AddressForm from "@/components/account/AddressForm";
import type { AddressType } from "@/types/customer";

function isAddressType(value: string): value is AddressType {
  return value === "billing" || value === "shipping";
}

export default async function EditAddressTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isAddressType(type)) notFound();

  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  if (!authToken) redirect("/my-account");
  const user = await getCurrentUser(authToken);
  if (!user) redirect("/my-account");

  const addresses = await getCustomerAddresses(authToken);
  const address = type === "billing" ? addresses.billing : addresses.shipping;

  return <AddressForm type={type} address={address} />;
}
