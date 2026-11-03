// src/components/shop/CategoryBanner.tsx
import Image from "next/image";

// Category feature image, as on the live category pages: a plain image confined to the
// content column (beside the sidebar), no overlay or title text — the category name is
// shown separately as the description line below it.
export default function CategoryBanner({
  image,
}: {
  image: { sourceUrl: string; altText: string | null } | null;
  title: string;
}) {
  if (!image) return null;

  return (
    <div className="relative mb-[10px] aspect-[845/321] w-full overflow-hidden rounded-[3px]">
      <Image
        src={image.sourceUrl}
        alt={image.altText ?? ""}
        fill
        priority
        sizes="(min-width: 1024px) 845px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
