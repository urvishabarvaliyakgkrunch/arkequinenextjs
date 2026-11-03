// src/components/product/ProductGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import type { MouseEvent } from "react";
import ProductLightbox from "@/components/product/ProductLightbox";
import ZoomIcon from "@/components/product/ZoomIcon";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

// How much the image grows while the mouse is over it
const ZOOM_LEVEL = 3;

// Slider with arrows + thumbnails, and hover zoom; state is why this is a client component
export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Where the mouse is inside the image (in %), so the zoom follows it
  const [zoomPoint, setZoomPoint] = useState<{ x: number; y: number } | null>(null);

  // Product has no photo yet: keep a same-size box so the layout does not jump
  if (images.length === 0) {
    return (
      <div
        role="img"
        aria-label={`${productName} has no image yet`}
        className="flex aspect-square w-full items-center justify-center bg-bg-qty text-sm text-meta"
      >
        No image available
      </div>
    );
  }

  const hasMany = images.length > 1;
  // "+ length" keeps the index positive when going back from the first image
  const go = (step: number) =>
    setActiveIndex((i) => (i + step + images.length) % images.length);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setZoomPoint({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  };

  return (
    <div>
      <div
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden"
        onMouseMove={handleMove}
        onMouseLeave={() => setZoomPoint(null)}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Slides sit side by side; moving the track shows the next image */}
        <div
          className="flex size-full transition-transform duration-300 motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.sourceUrl} className="relative size-full shrink-0">
              <Image
                src={image.sourceUrl}
                alt={image.altText || productName}
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                priority={index === 0}
                // Zoom only the visible slide, from the point under the mouse
                style={
                  zoomPoint && index === activeIndex
                    ? { transform: `scale(${ZOOM_LEVEL})`, transformOrigin: `${zoomPoint.x}% ${zoomPoint.y}%` }
                    : undefined
                }
                className="object-contain transition-transform duration-150"
              />
            </div>
          ))}
        </div>

        {/* Magnifier hint in the bottom-right corner, hidden while zooming */}
        <ZoomIcon
          className={`pointer-events-none absolute bottom-[10px] right-[10px] ${
            zoomPoint ? "opacity-0" : "opacity-100"
          }`}
        />

        {hasMany && (
          <>
            <ArrowButton direction="prev" onClick={() => go(-1)} />
            <ArrowButton direction="next" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* Thumbnails are always shown, like on the live site */}
      <ul className="grid grid-cols-[repeat(3,132px)] py-[10px]">
        {images.map((image, index) => (
          <li key={image.sourceUrl}>
            <button
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setLightboxOpen(true);
              }}
              aria-label={`Open image ${index + 1}`}
              aria-current={index === activeIndex}
              className={`block w-full cursor-pointer border p-[5px] ${
                index === activeIndex ? "border-primary" : "border-border"
              }`}
            >
              <Image
                src={image.sourceUrl}
                alt=""
                width={120}
                height={120}
                className="aspect-square h-auto w-full object-contain"
              />
            </button>
          </li>
        ))}
      </ul>

      {lightboxOpen && (
        <ProductLightbox
          images={images}
          index={activeIndex}
          productName={productName}
          onChange={setActiveIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

// Small round arrow on the left or right edge of the slider
function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={(event) => {
        // Arrows only slide; they must not open the lightbox under them
        event.stopPropagation();
        onClick();
      }}
      aria-label={isPrev ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 cursor-pointer bg-white/80 px-2 py-3 text-body opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 ${
        isPrev ? "left-0" : "right-0"
      }`}
    >
      {isPrev ? "‹" : "›"}
    </button>
  );
}
