// src/components/order/OrderItemsTable.tsx
import type { OrderReceipt } from "@/types/orderReceipt";

const CELL = "border-b border-ark-border px-6 py-[10px] text-left";
const LABEL = `${CELL} text-[12px] font-bold tracking-[1.5px] text-ark-btn-text uppercase`;

// One row under the items: label on the left, amount on the right
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th className={LABEL}>{label}</th>
      <td className={CELL}>{value}</td>
    </tr>
  );
}

export default function OrderItemsTable({ order }: { order: OrderReceipt }) {
  return (
    <table className="w-full border-collapse border border-ark-border text-[13px]">
      <thead>
        <tr>
          <th className={LABEL}>Product</th>
          <th className={LABEL}>Total</th>
        </tr>
      </thead>
      <tbody>
        {order.items.map((item) => (
          <tr key={item.id}>
            <td className={CELL}>
              {item.name} <strong>× {item.quantity}</strong>
            </td>
            <td className={CELL}>{item.total}</td>
          </tr>
        ))}
        {order.discount && <SummaryRow label="Discount" value={`-${order.discount}`} />}
        <SummaryRow
          label="Shipping"
          value={order.shippingMethod ? `${order.shipping} via ${order.shippingMethod}` : order.shipping}
        />
        {order.tax && <SummaryRow label="Tax" value={order.tax} />}
        <SummaryRow label="Payment method" value={order.paymentMethod} />
        <SummaryRow label="Total" value={order.total} />
      </tbody>
    </table>
  );
}
