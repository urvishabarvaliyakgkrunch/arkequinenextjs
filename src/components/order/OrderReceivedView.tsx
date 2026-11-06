// src/components/order/OrderReceivedView.tsx
import Link from "next/link";
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import OrderItemsTable from "@/components/order/OrderItemsTable";
import OrderStatusMessage from "@/components/order/OrderStatusMessage";
import OrderCartReset from "@/components/order/OrderCartReset";
import { getReceiptState } from "@/lib/orderStatus";
import type { OrderReceipt } from "@/types/orderReceipt";

function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function OrderReceivedView({ order }: { order: OrderReceipt }) {
  const state = getReceiptState(order.status);

  return (
    <>
      <PageHeaderBar title="Order received" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Order received" }]} />
      <main className="mx-auto max-w-[1210px] px-4 py-[25px] sm:px-10 min-[1290px]:px-0">
        {/* Only a paid order empties the cart; a pending or failed one must keep it */}
        {state === "paid" && <OrderCartReset />}
        <OrderStatusMessage state={state} />

        <ul className="mb-8 flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-ark-btn-text">
          <li>Order number: <strong>{order.number}</strong></li>
          <li>Date: <strong>{formatDate(order.date)}</strong></li>
          <li>Total: <strong>{order.total}</strong></li>
        </ul>

        <h2 className="mb-[10px] font-[family-name:var(--f-head)] text-[14px] font-semibold tracking-[1px] text-ark-title uppercase">
          Order details
        </h2>
        <OrderItemsTable order={order} />

        <h2 className="mt-8 mb-[10px] font-[family-name:var(--f-head)] text-[14px] font-semibold tracking-[1px] text-ark-title uppercase">
          Billing address
        </h2>
        <address className="border border-ark-border p-[19px] text-[13px] leading-[22px] not-italic text-ark-btn-text">
          {order.billingLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </address>

        <Link href="/shop" className="mt-8 inline-block rounded-[2px] bg-ark-price p-[15px] text-[12px] leading-[12px] text-white">
          Continue shopping
        </Link>
      </main>
    </>
  );
}
