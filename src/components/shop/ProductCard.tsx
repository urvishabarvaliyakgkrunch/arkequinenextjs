// src/components/shop/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { ProductCardFields } from "@/types/product";
import { stripHtml } from "@/lib/stripHtml";
import AddToCartButton from "@/components/cart/AddToCartButton";
import AddToCartOverlay from "@/components/cart/AddToCartOverlay";

// Shared by the shop page and every category page — one card design, used everywhere products are listed.
// priority = above-the-fold image. purchasable=false is for static placeholder cards whose product is not in WooCommerce yet.
export default function ProductCard({
  product,
  priority = false,
  purchasable = true,
}: {
  product: ProductCardFields;
  priority?: boolean;
  purchasable?: boolean;
}) {
  const hasSale = Boolean(product.salePrice) && product.salePrice !== product.regularPrice;
  const description = stripHtml(product.shortDescription);
  // Live site renders price ranges with an en dash
  const price = product.price?.replace(" - ", " – ");
  // Variable products need a variation chosen first (live site shows "Select options") — only simple products add straight to cart.
  const canAddDirectly = purchasable && product.__typename === "SimpleProduct";
  const isOutOfStock = product.stockStatus == 'OUT_OF_STOCK';
  const hasPrice = Boolean(price);

  return (
    <article className="group flex h-full flex-col border border-ark-border bg-white">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square w-full border-b border-ark-border bg-[#F5F5F5]">
          {product.image ? (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PlaceholderIcon />
            </div>
          )}
          <AddToCartOverlay productId={product.databaseId} />
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-[15px]">
          <h2 className="font-[family-name:var(--f-head)] text-[17px] font-normal leading-[22.1px] text-ark-title uppercase tracking-[1px]">
            {product.name}
          </h2>

          {description ? (
            <p className="text-[17px] leading-[28px] text-black opacity-80">{description}</p>
          ) : null}

          <div className="mt-auto flex flex-wrap items-baseline gap-x-2 text-[15px] leading-6 font-semibold text-ark-price">
            {hasSale ? (
              <>
                <span className="text-ark-price-strike line-through">
                  {product.regularPrice}
                </span>
                <span>{product.salePrice}</span>
              </>
            ) : (
              <span>{price}</span>
            )}
            {/* Guest-facing default from the live site's subscription plugin (WCSATT) — the real % is computed
                server-side per visitor and isn't exposed via GraphQL, but guests always see the 10% default. */}
            {hasPrice ? (
              <span className="text-[12px]">
                {" "}— or subscribe to save <span className="text-[15px]">10%</span>
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="flex border-t border-ark-border p-[10px] text-[11px] font-semibold text-ark-btn-text opacity-20 transition-opacity duration-300 group-hover:opacity-100">
        {isOutOfStock ? (
          <Link
            href={`/product/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1 p-[3px] text-center leading-[15px]"
          >
            <DocIcon /> Read more
          </Link>
        ) : canAddDirectly ? (
          <AddToCartButton
            productId={product.databaseId}
            name={product.name}
            image={product.image?.sourceUrl}
          >
            <BasketIcon /> Add to basket
          </AddToCartButton>
        ) : (
          <Link
            href={`/product/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1 p-[3px] text-center leading-[15px]"
          >
            <BasketIcon /> Select options
          </Link>
        )}
        {canAddDirectly ? (
          <Link href={`/product/${product.slug}`} className="flex flex-1 items-center justify-center gap-1 p-[3px] text-center leading-[15px]">
            <DocIcon /> Show Details
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function BasketIcon() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#57585a" viewBox="0 0 29 32" preserveAspectRatio="xMidYMid meet" aria-labelledby="av-svg-title-2" aria-describedby="av-svg-desc-2" role="graphics-symbol" aria-hidden="true">
      <title id="av-svg-title-2">Add to cart</title>
      <desc id="av-svg-desc-2">Add to cart</desc>
      <path d="M4.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM20.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM10.496 19.648q-1.152 0.32-1.088 0.736t1.408 0.416h17.984v2.432q0 0.64-0.64 0.64h-20.928q-0.64 0-0.64-0.64v-2.432l-0.32-1.472-3.136-14.528h-3.136v-2.56q0-0.64 0.64-0.64h4.992q0.64 0 0.64 0.64v2.752h22.528v8.768q0 0.704-0.576 0.832z"></path>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#57585a" viewBox="0 0 22 32" preserveAspectRatio="xMidYMid meet" aria-labelledby="av-svg-title-5" aria-describedby="av-svg-desc-5" role="graphics-symbol" aria-hidden="true">
      <title id="av-svg-title-5">Show Details</title>
      <desc id="av-svg-desc-5">Show Details</desc>
      <path d="M6.784 17.344v-2.88h8.96v2.88h-8.96zM19.2 1.6q1.344 0 2.272 0.928t0.928 2.272v22.4q0 1.28-0.928 2.24t-2.272 0.96h-16q-1.28 0-2.24-0.96t-0.96-2.24v-22.4q0-1.344 0.96-2.272t2.24-0.928h16zM19.2 27.2v-22.4h-16v22.4h16zM15.68 8.256v2.816h-8.96v-2.816h8.96zM15.68 20.8v2.816h-8.96v-2.816h8.96z"></path>
    </svg>
  );
}

// WooCommerce's default "no image" placeholder look — grey mountain glyph
function PlaceholderIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#bbbbbb" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" rx="2" />
      <circle cx="21" cy="21" r="5" />
      <path d="M4 44l16-16 12 12 8-8 16 16" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
