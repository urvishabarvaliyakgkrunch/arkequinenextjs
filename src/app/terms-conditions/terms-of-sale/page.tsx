// src/app/terms-conditions/terms-of-sale/page.tsx
import { notFound } from "next/navigation";
import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyContent } from "@/lib/policyContent";

export const revalidate = 86400;

export default function TermsOfSalePage() {
  const policy = getPolicyContent("terms-conditions/terms-of-sale");
  if (!policy) notFound();

  return <PolicyPage title={policy.title} html={policy.html} />;
}
