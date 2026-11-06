// src/components/order/OrderStatusMessage.tsx
import type { ReceiptState } from "@/lib/orderStatus";

const MESSAGES: Record<ReceiptState, { text: string; tone: string }> = {
  paid: { text: "Thank you. Your order has been received.", tone: "border-ark-border" },
  pending: {
    text: "Payment processing… Your order is saved. This page shows as paid once the payment is confirmed. Refresh in a moment.",
    tone: "border-ark-border",
  },
  failed: {
    text: "Your payment was not completed, so this order was not paid. Please go back to your basket and try again.",
    tone: "border-red-300",
  },
};

export default function OrderStatusMessage({ state }: { state: ReceiptState }) {
  const { text, tone } = MESSAGES[state];
  return (
    <div role="status" className={`mb-6 rounded-[2px] border ${tone} bg-white p-[19px] text-[17px] leading-[28px] text-ark-btn-text`}>
      {text}
    </div>
  );
}
