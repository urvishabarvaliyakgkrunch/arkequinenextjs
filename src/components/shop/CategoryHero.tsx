// src/components/shop/CategoryHero.tsx
import Image from "next/image";

// Brand archive banner, edge-to-edge like the live site's brand banner — a plain image with
// no overlay or title text (the banner artwork already carries the brand's own logo).
export default function CategoryHero({
  image,
}: {
  title: string;
  image: { sourceUrl: string; altText: string | null } | null;
}) {
  if (!image) return null;

  return (
    <div className="relative aspect-[1900/450] w-full overflow-hidden">
      <Image src={image.sourceUrl} alt={image.altText ?? ""} fill priority sizes="100vw" className="object-cover" />
    </div>
  );
}
