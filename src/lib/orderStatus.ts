// src/lib/orderStatus.ts
// WooCommerce order statuses come back from WooGraphQL as the raw "wc-*" slug
// (or occasionally without the prefix) — map to the label WooCommerce itself shows
// on the My Account > Orders screen.
const STATUS_LABELS: Record<string, string> = {
  pending: "Pending payment",
  processing: "Processing",
  "on-hold": "On hold",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  failed: "Failed",
  checkout_draft: "Draft",
};

export function getOrderStatusLabel(status: string): string {
  const slug = status.replace(/^wc-/, "").toLowerCase();
  return STATUS_LABELS[slug] ?? status;
}

export type ReceiptState = "paid" | "pending" | "failed";

// Only say "paid" when WooCommerce says so; the Stripe webhook can arrive a few seconds late
export function getReceiptState(status: string): ReceiptState {
  const slug = status.replace(/^wc-/, "").toLowerCase();
  if (slug === "processing" || slug === "completed") return "paid";
  if (slug === "failed" || slug === "cancelled") return "failed";
  return "pending";
}
