// src/components/product/RelatedProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { RelatedProduct } from "@/types/product";

// Both buttons share the same look, so the classes live in one place
const ACTION_CLASS =
  "flex flex-1 cursor-pointer items-center justify-center gap-1 p-[3px] text-[11px] font-bold leading-[15px] text-body hover:text-primary";

// One card in "People also liked": image, text box, then two action links
export default function RelatedProductCard({ product }: { product: RelatedProduct }) {
  const href = `/product/${product.slug}`;

  return (
    // items-start in the parent keeps each card its own height, like the live site
    <li>
      <Link href={href} className="block">
        <div className="relative aspect-square w-full border border-b-0 border-border bg-white">
          {product.image ? (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              fill
              sizes="(min-width: 1024px) 293px, 50vw"
              className="object-contain"
            />
          ) : (
            // Same square box when the product has no photo yet
            <div className="size-full bg-bg-qty" aria-hidden="true" />
          )}
        </div>

        <div className="border border-border bg-white px-[15px] pb-[15px] pt-[10px]">
          <h3 className="pt-[5px] font-heading text-[17px] font-normal leading-[22.1px] text-secondary">
            {product.name}
          </h3>
          {/* Short text is HTML written in WordPress admin */}
          <div
            className="text-[17px] leading-[28.05px] text-black [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: product.shortDescription }}
          />
          <RelatedPrice product={product} />
        </div>
      </Link>

      <div className="flex border border-t-0 border-border bg-white p-[10px]">
        <button type="button" className={ACTION_CLASS}>
          <BasketIcon />
          Add to basket
        </button>
        <Link href={href} className={`${ACTION_CLASS} border-l border-border`}>
          <DetailsIcon />
          Show Details
        </Link>
      </div>
    </li>
  );
}

// Price line: crossed-out old price when on sale
function RelatedPrice({ product }: { product: RelatedProduct }) {
  const showOld = product.isOnSale && product.regularPrice !== product.price;

  return (
    <p className="mt-[10px] text-[15px] font-bold leading-6 text-primary">
      {showOld && (
        <>
          <del className="text-meta">{product.regularPrice}</del>
          <span aria-hidden="true" className="mx-2">·</span>
        </>
      )}
      {product.price}
    </p>
  );
}

// Tiny inline icons so no icon font is loaded
function BasketIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[13px] fill-current">
      <path d="M7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zM1 2v2h2l3.6 7.6-1.4 2.4A2 2 0 007 17h12v-2H7.4l1.1-2h7.5a2 2 0 001.7-1l3.6-6.5A1 1 0 0020.4 4H5.2l-.9-2z" />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[13px] fill-current">
      <path d="M5 2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h14V4zm2 3h10v2H7zm0 4h10v2H7zm0 4h6v2H7z" />
    </svg>
  );
}
