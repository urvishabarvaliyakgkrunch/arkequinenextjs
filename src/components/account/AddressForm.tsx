// src/components/account/AddressForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/TextField";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { COUNTRIES, IE_COUNTIES } from "@/lib/addressOptions";
import type { AddressType, CustomerAddress } from "@/types/customer";

interface Props {
  type: AddressType;
  address: CustomerAddress | null;
}

const EMPTY_ADDRESS: CustomerAddress = {
  firstName: "",
  lastName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  phone: "",
  email: "",
};

export default function AddressForm({ type, address }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<CustomerAddress>(address ?? EMPTY_ADDRESS);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof CustomerAddress>(key: K, value: CustomerAddress[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.country.trim()) {
      setFormError("First name, last name and country/region are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/account/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, address: form }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }

      router.push("/my-account/edit-address");
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h2 className="mb-4 font-heading text-xl font-semibold text-ark-title">
        {type === "billing" ? "Billing address" : "Shipping address"}
      </h2>

      {formError && (
        <p className="mb-4 rounded border border-[#a94442]/30 bg-[#f8d7da] px-4 py-3 text-sm text-[#a94442]">
          {formError}
        </p>
      )}

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <TextField id="firstName" label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} required />
        <TextField id="lastName" label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} required />
      </div>

      <div className="mb-4">
        <TextField id="company" label="Company name (optional)" value={form.company} onChange={(v) => set("company", v)} />
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label className="font-sans text-[15.64px] font-bold text-label">
          Country / Region <span className="text-[#a94442]">*</span>
        </label>
        <SearchableSelect
          value={form.country}
          placeholder="Select a country / region…"
          options={COUNTRIES}
          onChange={(v) => {
            set("country", v);
            set("state", "");
          }}
        />
      </div>

      <div className="mb-4">
        <TextField id="address1" label="Street address" value={form.address1} onChange={(v) => set("address1", v)} required />
      </div>
      <div className="mb-4">
        <TextField id="address2" label="Apartment, suite, etc. (optional)" value={form.address2} onChange={(v) => set("address2", v)} />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <TextField id="city" label="Town / City" value={form.city} onChange={(v) => set("city", v)} required />
        <div className="flex flex-col gap-1">
          <label className="font-sans text-[15.64px] font-bold text-label">
            {form.country === "IE" ? "County" : "State / County"}
          </label>
          {form.country === "IE" ? (
            <SearchableSelect value={form.state} placeholder="Select an option…" options={IE_COUNTIES} onChange={(v) => set("state", v)} />
          ) : (
            <input
              type="text"
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
              className="h-[38px] border border-ark-border px-2 text-[13px] text-ark-btn-text"
            />
          )}
        </div>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <TextField
          id="postcode"
          label={form.country === "IE" ? "Eircode" : "Postcode / ZIP"}
          value={form.postcode}
          onChange={(v) => set("postcode", v)}
        />
        <TextField id="phone" label="Phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
      </div>

      {type === "billing" && (
        <div className="mb-6">
          <TextField id="email" label="Email address" type="email" value={form.email ?? ""} onChange={(v) => set("email", v)} />
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-[2px] bg-primary px-[15px] py-[15px] font-sans text-xs text-white transition-colors hover:bg-primary-alt disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Saving…" : "Save address"}
      </button>
    </form>
  );
}
