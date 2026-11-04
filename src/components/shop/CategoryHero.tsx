// src/components/shop/CategoryHero.tsx
import Image from "next/image";

// Brand archive banner, edge-to-edge like the live site's brand banner — a plain image with
// no overlay or title text (the banner artwork already carries the brand's own logo).
export default function CategoryHero({
  image,
  title
}: {
  title: string;
  image: { sourceUrl: string; altText: string | null } | null;
}) {
  if (!image) return null;

  return (
    <div
      className="relative h-[350px] w-full overflow-hidden flex justify-center items-center"
      style={{
        backgroundImage: `url(${image.sourceUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <h1 className="font-[family-name:var(--font-heading)] uppercase text-[34px] font-bold text-white md:text-[34px]">{title}</h1>
    </div>
  );
}
