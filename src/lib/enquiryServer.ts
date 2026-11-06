// src/lib/enquiryServer.ts
// Server-only: hands the enquiry to the WordPress plugin's own sender, so WordPress keeps doing the mailing.
import type { EnquiryInput } from "@/types/enquiry";

const WP_URL = `${process.env.NEXT_PUBLIC_WP_URL}`;
const SITE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}`;

// WordPress's host-level firewall/CDN rejects requests that don't look like they came from a browser
const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Referer: WP_URL,
  Origin: WP_URL,
};

// The plugin prints a one-time security token and the recipient address into the product page itself
async function readFormSecrets(slug: string): Promise<{ security: string; authorEmail: string }> {
  const res = await fetch(`${WP_URL}/product/${encodeURIComponent(slug)}/`, { cache: "no-store", headers: BROWSER_HEADERS });
  if (!res.ok) throw new Error("Product page not reachable");
  const html = await res.text();
  const security = html.match(/name="product_enquiry"\s+value="([^"]+)"/)?.[1];
  const authorEmail = html.match(/id="author_email"\s+value="([^"]*)"/)?.[1];
  if (!security || !authorEmail) throw new Error("Enquiry form is not enabled for this product");
  return { security, authorEmail };
}

export async function sendEnquiryToWordPress(input: EnquiryInput): Promise<string> {
  const { security, authorEmail } = await readFormSecrets(input.productSlug);
  const body = new URLSearchParams({
    action: "wdm_send",
    security,
    wdm_name: input.name.trim(),
    wdm_emailid: input.email.trim(),
    wdm_subject: input.subject.trim(),
    wdm_phone: "",
    wdm_enquiry: input.message.trim(),
    wdm_cc: "0",
    wdm_product_name: input.productName,
    wdm_product_url: `${SITE_URL}/product/${input.productSlug}/`,
    uemail: authorEmail,
    wdm_product_id: String(input.productId),
    wdm_variation_id: "",
  });
  const res = await fetch(`${WP_URL}/wp-admin/admin-ajax.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", ...BROWSER_HEADERS },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Enquiry request failed: ${res.status}`);
  return (await res.text()).trim();
}
