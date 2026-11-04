// src/components/account/AccountDashboard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/types/auth";

interface Props {
  user: AuthUser;
}

// Core WooCommerce My Account tabs. Orders/Addresses/Account details aren't wired up yet
// (no order/address data flowing through GraphQL on this project yet) — shown as static
// labels so the layout matches the live site, not yet live links.
const NAV_ITEMS = ["Dashboard", "Orders", "Addresses", "Account details"];

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
    <div className="flex flex-col gap-8 md:flex-row">
      <nav className="w-full shrink-0 md:w-[260px]">
        <ul className="divide-y divide-ark-border border border-ark-border">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item}
              className={`px-5 py-4 font-sans text-sm ${
                i === 0 ? "font-semibold text-ark-title" : "text-meta"
              }`}
            >
              {item}
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full px-5 py-4 text-left font-sans text-sm text-primary hover:underline disabled:opacity-60"
            >
              {loggingOut ? "Logging out…" : "Log out"}
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex-1 font-sans text-sm text-ark-btn-text">
        <p className="mb-4">
          Hello <strong className="text-primary">{user.name}</strong> (not{" "}
          <strong className="text-primary">{user.name}</strong>?{" "}
          <button type="button" onClick={handleLogout} className="text-primary hover:underline">
            Log out
          </button>
          )
        </p>
        <p>From your account dashboard you can view your orders and manage your account details.</p>
      </div>
    </div>
  );
}
