// src/components/account/AddressCard.tsx
import Link from "next/link";
import type { AddressType, CustomerAddress } from "@/types/customer";

interface Props {
  title: string;
  type: AddressType;
  address: CustomerAddress | null;
}

function hasAddress(address: CustomerAddress | null): address is CustomerAddress {
  return Boolean(address && (address.address1 || address.city || address.postcode));
}

export default function AddressCard({ title, type, address }: Props) {
  const filled = hasAddress(address);

  return (
    <div className="border border-ark-border p-5">
      <h2 className="mb-3 font-heading text-base font-semibold text-ark-title">{title}</h2>

      {filled ? (
        <address className="mb-4 font-sans text-sm not-italic leading-6 text-ark-btn-text">
          {address.firstName} {address.lastName}
          <br />
          {address.company && (
            <>
              {address.company}
              <br />
            </>
          )}
          {address.address1}
          <br />
          {address.address2 && (
            <>
              {address.address2}
              <br />
            </>
          )}
          {address.city}
          {address.state ? `, ${address.state}` : ""} {address.postcode}
          <br />
          {address.country}
          {address.phone && (
            <>
              <br />
              {address.phone}
            </>
          )}
          {type === "billing" && address.email && (
            <>
              <br />
              {address.email}
            </>
          )}
        </address>
      ) : (
        <p className="mb-4 font-sans text-sm text-meta">You have not set up this type of address yet.</p>
      )}

      <Link href={`/my-account/edit-address/${type}`} className="font-sans text-sm text-primary hover:underline">
        {filled ? "Edit" : "Add"} address
      </Link>
    </div>
  );
}
