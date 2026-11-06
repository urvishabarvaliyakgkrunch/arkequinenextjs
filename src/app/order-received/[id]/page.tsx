// src/app/order-received/[id]/page.tsx
import type { Metadata } from "next";
import OrderReceivedView from "@/components/order/OrderReceivedView";
import OrderNotFound from "@/components/order/OrderNotFound";
import { getOrderForReceipt } from "@/lib/woocommerce";

// A private order page must never show up in Google
export const metadata: Metadata = { title: "Order received", robots: { index: false, follow: false } };

export default async function OrderReceivedPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const [{ id }, { key = "" }] = await Promise.all([params, searchParams]);
  const order = await getOrderForReceipt(Number(id), key);
  return order ? <OrderReceivedView order={order} /> : <OrderNotFound />;
}
