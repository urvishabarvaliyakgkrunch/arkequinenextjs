// src/lib/stripHtml.ts
// WPGraphQL short descriptions can include empty "&nbsp;" paragraphs from the editor — strip to plain text for the card.
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Caps a plain-text description to N words, ellipsis only when something was actually cut.
export function truncateWords(text: string, maxWords: number): string {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}
