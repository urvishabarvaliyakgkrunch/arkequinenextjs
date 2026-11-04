// src/types/order.ts
export interface OrderLineItem {
  productId: number;
  quantity: number;
  total: string;
}

export interface Order {
  databaseId: number;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  lineItems: OrderLineItem[];
}
