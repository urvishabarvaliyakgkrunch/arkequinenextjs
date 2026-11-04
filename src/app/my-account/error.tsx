// src/app/my-account/error.tsx
"use client";

import Container from "@/components/ui/Container";

// Covers layout.tsx + page.tsx + edit-account/edit-address — all of them call getCurrentUser(),
// which now throws SessionCheckFailedError (src/lib/auth.ts) on a transient backend failure
// instead of silently returning null. Without this boundary that throw would hit Next's generic
// crash page; this gives a retry affordance instead and makes clear it's a connection hiccup,
// not an actual logout.
export default function MyAccountError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container>
      <div className="py-10">
        <div className="max-w-[450px] rounded-[5px] border border-ark-border bg-white p-5 text-[14px] leading-[22px] text-ark-btn-text">
          Couldn&apos;t verify your session. This is usually a temporary connection issue, not an
          actual logout —{" "}
          <button type="button" onClick={reset} className="cursor-pointer text-ark-price underline">
            try again
          </button>
          .
        </div>
      </div>
    </Container>
  );
}
