// src/lib/truncateExcerpt.ts
// WP excerpts come as HTML (often already ending in "[&hellip;]") — strip tags and cap at
// a fixed word count so every card shows roughly the same amount of text.
export function truncateExcerpt(html: string, maxWords = 15): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/\s+/g, " ")
    .trim();

  const words = text.split(" ").filter(Boolean);
  if (words.length <= maxWords) return text;

  return `${words.slice(0, maxWords).join(" ")}...`;
}
