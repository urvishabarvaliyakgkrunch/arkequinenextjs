// src/lib/enquiry.ts
// Client-safe: same rules and messages as the WordPress "Product Enquiry" plugin form, plus the browser call to our own route.
import type { EnquiryErrors, EnquiryInput } from "@/types/enquiry";

export function validateEnquiry(input: Pick<EnquiryInput, "name" | "email" | "message" | "consent">): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = input.name.trim();
  if (!name) errors.name = "Name is required.";
  else if (!/^[A-Za-z '-]{2,}$/.test(name)) errors.name = "Please enter a valid name (letters, spaces, apostrophes, hyphens).";

  if (!/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(input.email.trim())) {
    errors.email = "Enter valid Email Id.";
  }
  if (input.message.trim().length < 10) errors.message = "Enquiry length must be atleast 10 characters.";
  if (!input.consent) errors.consent = "Please select terms and conditions";
  return errors;
}

export async function sendEnquiry(input: EnquiryInput): Promise<string> {
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => null)) as { message?: string; error?: string } | null;
  if (!res.ok) throw new Error(data?.error ?? "Could not send your enquiry. Please try again.");
  return data?.message ?? "Thank you for your enquiry.";
}
