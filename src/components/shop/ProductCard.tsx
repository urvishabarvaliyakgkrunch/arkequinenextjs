// src/components/shop/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { ProductCardFields } from "@/types/product";
import { stripHtml } from "@/lib/stripHtml";

// Shared by the shop page and every category page — one card design, used everywhere products are listed.
export default function ProductCard({ product }: { product: ProductCardFields }) {
  const hasSale = Boolean(product.salePrice) && product.salePrice !== product.regularPrice;
  const description = stripHtml(product.shortDescription);

  return (
    <article className="flex h-full flex-col border border-ark-border bg-white">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square w-full bg-[#F5F5F5]">
          {product.image ? (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-[5px]">
          {/* Millar (the brand heading font) 404s on the live site too, so this fallback matches what actually renders there */}
          <h2 className="font-[Arial,Helvetica,sans-serif] text-[17px] font-normal leading-[22.1px] text-ark-title">
            {product.name}
          </h2>

          {description ? (
            <p className="text-[17px] leading-[28px] text-black">{description}</p>
          ) : null}

          <div className="mt-auto flex flex-wrap items-baseline gap-x-2 text-[15px] font-semibold">
            {hasSale ? (
              <>
                <span className="text-ark-price-strike line-through">
                  {product.regularPrice}
                </span>
                <span className="text-ark-price">{product.salePrice}</span>
              </>
            ) : (
              <span className="text-ark-price">{product.price}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex border-t border-ark-border p-[10px] text-[11px] font-semibold text-ark-btn-text">
        <Link href={`/product/${product.slug}`} className="flex flex-1 items-center justify-center gap-1 text-center">
          <BasketIcon /> Add to Cart
        </Link>
        <Link href={`/product/${product.slug}`} className="flex flex-1 items-center justify-center gap-1 text-center">
          <DocIcon /> Show Details
        </Link>
      </div>
    </article>
  );
}

function BasketIcon() {
  return (
    <svg width="12" height="13" viewBox="0 0 29 32" fill="currentColor" aria-hidden="true">
      <path d="M7 10l2-6h11l2 6h4v3H3v-3h4zm-2 5h19l-2 14H7L5 15zm6 3v8h2v-8h-2zm5 0v8h2v-8h-2z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="12" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 2h9l5 5v15H6V2z" />
      <path d="M9 12h6M9 16h6M9 8h3" />
    </svg>
  );
}
