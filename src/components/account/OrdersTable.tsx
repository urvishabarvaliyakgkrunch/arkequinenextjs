// src/components/account/OrdersTable.tsx
import Link from "next/link";
import type { Order } from "@/types/order";
import { getOrderStatusLabel } from "@/lib/orderStatus";

interface Props {
  orders: Order[];
}

function formatOrderDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto border border-ark-border">
      <table className="w-full min-w-[640px] text-left font-sans text-sm">
        <thead>
          <tr className="divide-x divide-ark-border border-b border-ark-border bg-[#FAFAFA]">
            <th className="px-5 py-3 font-semibold text-ark-title">Order</th>
            <th className="px-5 py-3 font-semibold text-ark-title">Date</th>
            <th className="px-5 py-3 font-semibold text-ark-title">Status</th>
            <th className="px-5 py-3 font-semibold text-ark-title">Total</th>
            <th className="px-5 py-3 font-semibold text-ark-title">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ark-border">
          {orders.map((order) => (
            <tr key={order.databaseId} className="divide-x divide-ark-border">
              <td className="px-5 py-4 text-ark-btn-text">#{order.orderNumber}</td>
              <td className="px-5 py-4 text-ark-btn-text">{formatOrderDate(order.date)}</td>
              <td className="px-5 py-4 text-ark-btn-text">{getOrderStatusLabel(order.status)}</td>
              <td className="px-5 py-4 text-ark-btn-text">{order.total}</td>
              <td className="px-5 py-4">
                <Link
                  href={`/my-account/view-order/${order.databaseId}`}
                  className="rounded-[2px] bg-primary px-[12px] py-[8px] text-xs text-white transition-colors hover:bg-primary-alt"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
