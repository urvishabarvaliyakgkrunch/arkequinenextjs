// src/app/order-received/[id]/error.tsx
"use client";

import Container from "@/components/ui/Container";

// The order is safe in WooCommerce even if this page could not load it
export default function OrderReceivedError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container>
      <div className="py-10">
        <div className="max-w-[450px] rounded-[5px] border border-ark-border bg-white p-5 text-[14px] leading-[22px] text-ark-btn-text">
          Your order was received, but we couldn&apos;t load its details right now.{" "}
          <button type="button" onClick={reset} className="cursor-pointer text-ark-price underline">
            Try again
          </button>
          .
        </div>
      </div>
    </Container>
  );
}
