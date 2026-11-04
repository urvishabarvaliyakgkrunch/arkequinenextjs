// src/app/my-account/page.tsx
import { cookies } from "next/headers";
import LoginForm from "@/components/account/LoginForm";
import AccountDashboard from "@/components/account/AccountDashboard";
import { getCurrentUser } from "@/lib/auth";

export default async function MyAccountPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  const user = authToken ? await getCurrentUser(authToken) : null;

  return user ? <AccountDashboard user={user} /> : <LoginForm />;
}
