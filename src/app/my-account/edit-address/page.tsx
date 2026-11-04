// src/app/my-account/edit-address/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCustomerAddresses } from "@/lib/customer";
import AddressCard from "@/components/account/AddressCard";

export default async function EditAddressOverviewPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  if (!authToken) redirect("/my-account");
  const user = await getCurrentUser(authToken);
  if (!user) redirect("/my-account");

  const { billing, shipping } = await getCustomerAddresses(authToken);

  return (
    <div>
      <h2 className="mb-6 font-heading text-xl font-semibold text-ark-title">Addresses</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <AddressCard title="Billing address" type="billing" address={billing} />
        <AddressCard title="Shipping address" type="shipping" address={shipping} />
      </div>
    </div>
  );
}
