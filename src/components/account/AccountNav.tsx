// src/components/account/AccountNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Dashboard", href: "/my-account" },
  { label: "Orders", href: "/my-account/orders" },
  { label: "Addresses", href: "/my-account/edit-address" },
  { label: "Account details", href: "/my-account/edit-account" },
];

export default function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="w-full shrink-0 md:w-[260px]">
      <ul className="divide-y divide-ark-border border border-ark-border">
        {NAV_LINKS.map((item) => {
          // Dashboard matches only the exact root; the rest match their whole subtree
          const active = item.href === "/my-account" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-5 py-4 font-sans text-sm ${
                  active ? "font-semibold text-ark-title" : "text-meta hover:text-ark-title"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
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
  );
}
