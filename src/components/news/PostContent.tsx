// src/components/news/PostContent.tsx
// Renders the raw WP post body (Avia builder HTML: paragraphs, bold intro, inline images,
// the teal product promo block, "Shop Now" button) — styled via the .wp-post-content rules
// in globals.css so it matches ark-equine.com's single-post typography without the Avia CSS.
export default function PostContent({ html }: { html: string }) {
  return <div className="wp-post-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
