// src/app/my-account/view-order/[id]/page.tsx
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getCustomerOrders } from "@/lib/orders";
import { getOrderStatusLabel } from "@/lib/orderStatus";

interface Props {
  params: Promise<{ id: string }>;
}

// WooGraphQL exposes a single order via Customer.orders, not a dedicated by-id query we could
// verify against the live (introspection-disabled) schema, so this reuses the same list fetch
// as the Orders tab and finds the matching order client-side rather than guessing a new query shape.
export default async function ViewOrderPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  if (!authToken) redirect("/my-account");
  const user = await getCurrentUser(authToken);
  if (!user) redirect("/my-account");

  const orders = await getCustomerOrders(authToken);
  const order = orders.find((o) => String(o.databaseId) === id);
  if (!order) notFound();

  return (
    <div>
      <h2 className="mb-6 font-heading text-xl font-semibold text-ark-title">Order #{order.orderNumber}</h2>

      <div className="mb-6 border border-ark-border p-5 font-sans text-sm text-ark-btn-text">
        <p>
          Status: <span className="font-semibold text-ark-title">{getOrderStatusLabel(order.status)}</span>
        </p>
        <p>Date: {order.date}</p>
        <p>Total: {order.total}</p>
      </div>

      <div className="overflow-x-auto border border-ark-border">
        <table className="w-full min-w-[480px] text-left font-sans text-sm">
          <thead>
            <tr className="divide-x divide-ark-border border-b border-ark-border bg-[#FAFAFA]">
              <th className="px-5 py-3 font-semibold text-ark-title">Product</th>
              <th className="px-5 py-3 font-semibold text-ark-title">Quantity</th>
              <th className="px-5 py-3 font-semibold text-ark-title">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ark-border">
            {order.lineItems.map((item) => (
              <tr key={item.productId} className="divide-x divide-ark-border">
                <td className="px-5 py-4 text-ark-btn-text">Product #{item.productId}</td>
                <td className="px-5 py-4 text-ark-btn-text">{item.quantity}</td>
                <td className="px-5 py-4 text-ark-btn-text">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/my-account/orders" className="mt-6 inline-block font-sans text-sm text-primary hover:underline">
        &larr; Back to orders
      </Link>
    </div>
  );
}
