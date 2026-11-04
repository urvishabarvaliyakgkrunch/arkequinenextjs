// src/components/shop/BrandBanner.tsx
import Image from "next/image";

// Brand archive banner — contained to the same width as the page header bar / main content
// (ark-equine.com's brand banners sit inside the page margins, not edge-to-edge), plain image
// with no overlay or title text since the artwork already carries the brand's own logo.
export default function BrandBanner({
  image,
}: {
  image: { sourceUrl: string; altText: string | null } | null;
}) {
  if (!image) return null;

  return (
    <div className="mx-auto max-w-[1310px] px-4 pt-[25px] sm:px-[50px]">
      <div className="relative aspect-[1900/450] w-full overflow-hidden">
        <Image src={image.sourceUrl} alt={image.altText ?? ""} fill priority sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
