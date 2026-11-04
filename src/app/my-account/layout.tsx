// src/app/my-account/layout.tsx
import { Suspense, type ReactNode } from "react";
import { cookies } from "next/headers";
import Container from "@/components/ui/Container";
import AccountNav from "@/components/account/AccountNav";
import Skeleton from "@/components/ui/Skeleton";
import { getCurrentUser } from "@/lib/auth";

// Shared chrome for every /my-account/* route — the sidebar only shows once a user is
// actually logged in, so the login form on /my-account itself stays nav-free.
//
// The auth check (cookies() + getCurrentUser(), ~3s against the slow backend — see
// PROJECT-CONTEXT.md) used to run directly in this layout, which is itself an async Server
// Component above page.tsx's own loading.tsx boundary — so it blocked the entire route from
// rendering *anything*, skeleton included, for the full round trip. Moving it into its own
// Suspense boundary lets Container/the page chrome paint immediately and shows a skeleton
// during the wait instead of a blank screen.
export default function MyAccountLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="py-10">
        <h1 className="sr-only">My account</h1>
        <Suspense fallback={<AccountShellSkeleton />}>
          <AccountShell>{children}</AccountShell>
        </Suspense>
      </div>
    </Container>
  );
}

async function AccountShell({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  const user = authToken ? await getCurrentUser(authToken) : null;

  return user ? (
    <div className="flex flex-col gap-8 md:flex-row">
      <AccountNav />
      <div className="flex-1 font-sans text-sm text-ark-btn-text">{children}</div>
    </div>
  ) : (
    children
  );
}

function AccountShellSkeleton() {
  return (
    <div className="max-w-[450px]">
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
