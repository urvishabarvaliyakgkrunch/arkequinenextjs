// src/components/shop/CategoryBanner.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const LIVE_MEDIA_HOST = "https://ark-equine.com";

// Category feature image + description above the toolbar, like the live category page.
export default function CategoryBanner({
  image,
  description,
}: {
  image: { sourceUrl: string; altText: string | null } | null;
  description: string | null;
}) {
  const [src, setSrc] = useState(image?.sourceUrl ?? "");

  // Backend description holds heading markup (centered h1); live shows it as plain left text
  const text = description?.replace(/<[^>]*>/g, "").trim();

  if (!image && !text) return null;

  return (
    <>
      {image && (
        <div className="mb-2 leading-[0]">
          <Image
            src={src}
            alt={image.altText ?? ""}
            width={845}
            height={321}
            priority
            className="h-auto w-full"
            // Staging backend is missing some category uploads (redirects to a placeholder) — retry on the live site
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth <= 300 && src === image.sourceUrl) {
                setSrc(LIVE_MEDIA_HOST + new URL(image.sourceUrl).pathname);
              }
            }}
            onError={() => setSrc(LIVE_MEDIA_HOST + new URL(image.sourceUrl).pathname)}
          />
        </div>
      )}
      {text && <div className="mb-[10px] text-left text-[12px] leading-[28.05px] text-[#57585a]">{text}</div>}
    </>
  );
}
