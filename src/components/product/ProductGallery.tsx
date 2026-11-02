// src/components/product/ProductGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

// Big image + small thumbnails; the click state is why this is a client component
export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  // Product has no photo yet: keep a same-size box so the layout does not jump
  if (!activeImage) {
    return (
      <div
        role="img"
        aria-label={`${productName} has no image yet`}
        className="flex aspect-square w-full items-center justify-center bg-bg-qty text-sm text-muted"
      >
        No image available
      </div>
    );
  }

  return (
    <div>
      <Image
        src={activeImage.sourceUrl}
        alt={activeImage.altText || productName}
        width={activeImage.mediaDetails?.width ?? 600}
        height={activeImage.mediaDetails?.height ?? 600}
        sizes="(min-width: 1024px) 400px, 100vw"
        priority
        className="h-auto w-full"
      />

      {/* Thumbnails only make sense when there is more than one image */}
      {images.length > 1 && (
        <ul className="mt-[10px] grid grid-cols-3 gap-[10px]">
          {images.map((image, index) => (
            <li key={image.sourceUrl}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex}
                className={`block w-full cursor-pointer border p-1 ${
                  index === activeIndex ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={image.sourceUrl}
                  alt=""
                  width={100}
                  height={100}
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
