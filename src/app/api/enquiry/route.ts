// src/app/api/enquiry/route.ts
import { validateEnquiry } from "@/lib/enquiry";
import { sendEnquiryToWordPress } from "@/lib/enquiryServer";
import type { EnquiryInput } from "@/types/enquiry";

// Same-origin proxy for the WordPress enquiry sender (browser can't call it cross-origin, and the recipient stays server-side)
export async function POST(request: Request) {
  const input = (await request.json().catch(() => null)) as EnquiryInput | null;
  if (!input || typeof input.productSlug !== "string" || !/^[a-z0-9-]+$/i.test(input.productSlug)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const fields = [input.name, input.email, input.message, input.subject ?? "", input.productName];
  if (fields.some((f) => typeof f !== "string") || !Number.isInteger(input.productId)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (Object.keys(validateEnquiry(input)).length > 0) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  try {
    const message = await sendEnquiryToWordPress(input);
    return Response.json({ message });
  } catch {
    return Response.json({ error: "Could not send your enquiry. Please try again." }, { status: 502 });
  }
}
