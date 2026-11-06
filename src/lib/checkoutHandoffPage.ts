// src/lib/checkoutHandoffPage.ts

// Makes a value safe to place inside an HTML attribute, so a strange token can never break out of the page
function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// A tiny page whose form posts the tokens to WordPress straight away.
// A form POST is used (not a redirect) so the tokens stay out of the address bar, history and server logs.
export function buildHandoffPage(actionUrl: string, fields: Record<string, string>): string {
  const inputs = Object.entries(fields)
    .map(([name, value]) => `<input type="hidden" name="${escapeAttribute(name)}" value="${escapeAttribute(value)}">`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Redirecting to checkout…</title></head>
<body>
<form id="handoff" method="POST" action="${escapeAttribute(actionUrl)}">${inputs}<noscript><button type="submit">Continue to checkout</button></noscript></form>
<script>document.getElementById("handoff").submit();</script>
</body>
</html>`;
}
