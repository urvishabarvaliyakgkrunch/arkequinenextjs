// src/components/product/ProductLightbox.tsx
"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { ProductImage } from "@/types/product";

interface ProductLightboxProps {
  images: ProductImage[];
  index: number;
  productName: string;
  onChange: (index: number) => void;
  onClose: () => void;
}

// Full-screen slider opened from the gallery; shows the picked image with arrows, caption and "1 / 2"
export default function ProductLightbox({
  images,
  index,
  productName,
  onChange,
  onClose,
}: ProductLightboxProps) {
  const image = images[index];
  const hasMany = images.length > 1;
  // "+ length" keeps the index positive when going back from the first image
  const go = (step: number) => onChange((index + step + images.length) % images.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (hasMany && event.key === "ArrowLeft") go(-1);
      if (hasMany && event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    // Page behind must not scroll while the lightbox is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // go() only reads index/images, which are already deps through hasMany + index
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasMany, onClose]);

  const caption = image.altText || productName;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} images`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-lightbox-fade motion-reduce:animate-none"
      onClick={onClose}
    >
      {/* Clicking the picture itself must not close the lightbox */}
      <figure
        className="relative w-full max-w-[831px] animate-lightbox-pop motion-reduce:animate-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-square max-h-[85vh] w-full bg-white">
          <Image
            src={image.sourceUrl}
            alt={caption}
            fill
            sizes="(min-width: 900px) 831px, 100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="flex justify-between pt-2 text-[13px] text-white">
          <span>{caption}</span>
          {hasMany && (
            <span>
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 cursor-pointer text-[32px] leading-none text-white"
      >
        ×
      </button>

      {hasMany && (
        <>
          <NavButton direction="prev" onClick={() => go(-1)} />
          <NavButton direction="next" onClick={() => go(1)} />
        </>
      )}
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={isPrev ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 cursor-pointer bg-black/40 px-3 py-6 text-[40px] leading-none text-white hover:bg-black/70 ${
        isPrev ? "left-0" : "right-0"
      }`}
    >
      {isPrev ? "‹" : "›"}
    </button>
  );
}
