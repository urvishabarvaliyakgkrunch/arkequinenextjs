// src/lib/woocommerce.ts
// Server-only: uses the WooCommerce REST keys, so never import this from a "use client" file.
import { timingSafeEqual } from "node:crypto";
import type { OrderReceipt, WCRestOrder } from "@/types/orderReceipt";

const WC_ORDERS_URL = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders`;

function authHeader(): string {
  const credentials = `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

// Compares in constant time so the key cannot be guessed by measuring response speed
function keysMatch(expected: string, given: string): boolean {
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

// WooCommerce already did the maths; we only add the currency symbol
function money(amount: string, symbol: string): string {
  return `${symbol}${Number(amount).toFixed(2)}`;
}

// Hides zero amounts (no discount, no tax) so empty rows are not shown
function moneyOrNull(amount: string, symbol: string): string | null {
  return Number(amount) > 0 ? money(amount, symbol) : null;
}

function mapOrder(order: WCRestOrder): OrderReceipt {
  const symbol = order.currency_symbol;
  const b = order.billing;
  return {
    id: order.id,
    number: order.number,
    status: order.status,
    date: order.date_created,
    paymentMethod: order.payment_method_title,
    items: order.line_items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      total: money(item.total, symbol),
    })),
    shippingMethod: order.shipping_lines[0]?.method_title ?? "",
    shipping: money(order.shipping_total, symbol),
    discount: moneyOrNull(order.discount_total, symbol),
    tax: moneyOrNull(order.total_tax, symbol),
    total: money(order.total, symbol),
    billingLines: [
      `${b.first_name} ${b.last_name}`.trim(),
      b.address_1,
      b.address_2,
      `${b.postcode} ${b.city}`.trim(),
      b.country,
    ].filter(Boolean),
  };
}

// Returns null when the order does not exist OR the key is wrong, so people cannot guess order links
export async function getOrderForReceipt(id: number, key: string): Promise<OrderReceipt | null> {
  if (!Number.isInteger(id) || id <= 0 || !key) return null;

  const res = await fetch(`${WC_ORDERS_URL}/${id}`, {
    headers: { Authorization: authHeader() },
    // An order changes status (pending -> processing), so this page must never be cached
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`WC order fetch failed: ${res.status}`);

  const order = (await res.json()) as WCRestOrder;
  return keysMatch(order.order_key, key) ? mapOrder(order) : null;
}
