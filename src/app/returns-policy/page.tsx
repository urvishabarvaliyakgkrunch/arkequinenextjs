// src/app/returns-policy/page.tsx
import { notFound } from "next/navigation";
import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyContent } from "@/lib/policyContent";

export const revalidate = 86400;

export default function ReturnsPolicyPage() {
  const policy = getPolicyContent("returns-policy");
  if (!policy) notFound();

  return <PolicyPage title={policy.title} html={policy.html} />;
}
