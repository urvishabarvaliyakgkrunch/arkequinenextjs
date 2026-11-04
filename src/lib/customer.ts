// src/lib/customer.ts
import type { AuthUser } from "@/types/auth";
import type {
  AddressType,
  CustomerAddress,
  CustomerAddresses,
  UpdateAccountDetailsInput,
  UpdateCustomerAddressInput,
} from "@/types/customer";

const WP_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`;

const UPDATE_USER_MUTATION = `
  mutation ArkUpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        databaseId
        name
        email
        firstName
        lastName
      }
    }
  }
`;

const CUSTOMER_ADDRESS_FIELDS = `
  firstName
  lastName
  company
  address1
  address2
  city
  state
  postcode
  country
  phone
`;

const CUSTOMER_ADDRESS_QUERY = `
  query ArkCustomerAddresses {
    customer {
      id
      billing {
        ${CUSTOMER_ADDRESS_FIELDS}
        email
      }
      shipping {
        ${CUSTOMER_ADDRESS_FIELDS}
      }
    }
  }
`;

const UPDATE_CUSTOMER_MUTATION = `
  mutation ArkUpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        id
        billing {
          ${CUSTOMER_ADDRESS_FIELDS}
          email
        }
        shipping {
          ${CUSTOMER_ADDRESS_FIELDS}
        }
      }
    }
  }
`;

export class AccountUpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AccountUpdateError";
  }
}

async function graphqlRequest<T>(
  authToken: string,
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();
  // WPGraphQL/WooGraphQL surface validation errors (e.g. duplicate email) as json.errors
  // rather than an HTTP error status — the message is safe to show the user as-is.
  if (json.errors) {
    throw new AccountUpdateError(json.errors[0]?.message ?? "Something went wrong. Please try again.");
  }

  return json.data as T;
}

export async function updateAccountDetails(
  authToken: string,
  input: UpdateAccountDetailsInput
): Promise<AuthUser> {
  const data = await graphqlRequest<{ updateUser: { user: AuthUser } }>(
    authToken,
    UPDATE_USER_MUTATION,
    { input }
  );
  return data.updateUser.user;
}

export async function getCustomerAddresses(authToken: string): Promise<CustomerAddresses> {
  const data = await graphqlRequest<{ customer: { billing: CustomerAddress | null; shipping: CustomerAddress | null } | null }>(
    authToken,
    CUSTOMER_ADDRESS_QUERY,
    {}
  );
  return {
    billing: data.customer?.billing ?? null,
    shipping: data.customer?.shipping ?? null,
  };
}

export async function updateCustomerAddress(
  authToken: string,
  customerId: string,
  type: AddressType,
  address: UpdateCustomerAddressInput
): Promise<CustomerAddress> {
  const input = { id: customerId, [type]: address };
  const data = await graphqlRequest<{ updateCustomer: { customer: { billing: CustomerAddress; shipping: CustomerAddress } } }>(
    authToken,
    UPDATE_CUSTOMER_MUTATION,
    { input }
  );
  return data.updateCustomer.customer[type];
}
