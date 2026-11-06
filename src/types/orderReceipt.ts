// src/types/orderReceipt.ts

// Raw shape of the few fields we read from WooCommerce REST /wc/v3/orders/{id}
export interface WCRestOrder {
  id: number;
  number: string;
  order_key: string;
  status: string;
  date_created: string;
  currency_symbol: string;
  payment_method_title: string;
  discount_total: string;
  shipping_total: string;
  total_tax: string;
  total: string;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
  };
  line_items: { id: number; name: string; quantity: number; total: string }[];
  shipping_lines: { method_title: string }[];
}

// Safe, ready-to-show version of an order for the thank-you page (money is already formatted)
export interface OrderReceipt {
  id: number;
  number: string;
  status: string;
  date: string;
  paymentMethod: string;
  items: { id: number; name: string; quantity: number; total: string }[];
  shippingMethod: string;
  shipping: string;
  discount: string | null;
  tax: string | null;
  total: string;
  billingLines: string[];
}
