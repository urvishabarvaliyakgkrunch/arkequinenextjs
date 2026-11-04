// src/types/customer.ts
export type AddressType = "billing" | "shipping";

export interface CustomerAddress {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email?: string;
}

export interface CustomerAddresses {
  billing: CustomerAddress | null;
  shipping: CustomerAddress | null;
}

export interface UpdateAccountDetailsInput {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password?: string;
}

export interface UpdateCustomerAddressInput {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email?: string;
}
