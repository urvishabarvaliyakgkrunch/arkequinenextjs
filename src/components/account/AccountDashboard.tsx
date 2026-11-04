// src/components/account/AccountDashboard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/types/auth";

interface Props {
  user: AuthUser;
}

export default function AccountDashboard({ user }: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <p className="mb-4">
        Hello <strong className="text-primary">{user.name}</strong> (not{" "}
        <strong className="text-primary">{user.name}</strong>?{" "}
        <button type="button" onClick={handleLogout} disabled={loggingOut} className="text-primary hover:underline">
          {loggingOut ? "Logging out…" : "Log out"}
        </button>
        )
      </p>
      <p>From your account dashboard you can view your orders and manage your account details.</p>
    </div>
  );
}
