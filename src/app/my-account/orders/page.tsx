// src/app/my-account/orders/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCustomerOrders } from "@/lib/orders";
import OrdersTable from "@/components/account/OrdersTable";
import OrdersEmptyState from "@/components/account/OrdersEmptyState";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("ark_auth_token")?.value;
  if (!authToken) redirect("/my-account");
  const user = await getCurrentUser(authToken);
  if (!user) redirect("/my-account");

  const orders = await getCustomerOrders(authToken);

  return (
    <div>
      <h2 className="mb-6 font-heading text-xl font-semibold text-ark-title">Orders</h2>
      {orders.length > 0 ? <OrdersTable orders={orders} /> : <OrdersEmptyState />}
    </div>
  );
}
