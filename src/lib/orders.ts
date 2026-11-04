// src/lib/orders.ts
import type { Order, OrderLineItem } from "@/types/order";

const WP_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`;

// NOTE: field names below (customer.orders.nodes.*) follow the documented WooGraphQL
// Customer.orders connection shape. Introspection is disabled on the live endpoint, so
// this has not been verified against the live schema — adjust if WooGraphQL returns errors.
const CUSTOMER_ORDERS_QUERY = `
  query ArkCustomerOrders {
    customer {
      orders {
        nodes {
          databaseId
          orderNumber
          date
          status
          total
          lineItems {
            nodes {
              productId
              quantity
              total
            }
          }
        }
      }
    }
  }
`;

interface RawOrderLineItemsNode {
  productId: number;
  quantity: number;
  total: string;
}

interface RawOrderNode {
  databaseId: number;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  lineItems: { nodes: RawOrderLineItemsNode[] } | null;
}

interface CustomerOrdersResponse {
  customer: { orders: { nodes: RawOrderNode[] } | null } | null;
}

async function graphqlRequest<T>(authToken: string, query: string): Promise<T | null> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const json = await res.json();
  // A bad/expired token or a missing orders field should just mean "no orders to show"
  // rather than crashing the page — this is a read-only account view.
  if (json.errors) {
    return null;
  }

  return json.data as T;
}

function mapLineItem(node: RawOrderLineItemsNode): OrderLineItem {
  return {
    productId: node.productId,
    quantity: node.quantity,
    total: node.total,
  };
}

function mapOrder(node: RawOrderNode): Order {
  return {
    databaseId: node.databaseId,
    orderNumber: node.orderNumber,
    date: node.date,
    status: node.status,
    total: node.total,
    lineItems: node.lineItems?.nodes.map(mapLineItem) ?? [],
  };
}

export async function getCustomerOrders(authToken: string): Promise<Order[]> {
  const data = await graphqlRequest<CustomerOrdersResponse>(authToken, CUSTOMER_ORDERS_QUERY);
  const nodes = data?.customer?.orders?.nodes ?? [];
  return nodes.map(mapOrder);
}
