// src/app/my-account/edit-account/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AccountDetailsForm from "@/components/account/AccountDetailsForm";

export default async function EditAccountPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  const user = authToken ? await getCurrentUser(authToken) : null;
  if (!user) redirect("/my-account");

  return <AccountDetailsForm user={user} />;
}
