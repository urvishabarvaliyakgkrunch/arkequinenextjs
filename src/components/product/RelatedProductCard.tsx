// src/components/product/RelatedProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { RelatedProduct } from "@/types/product";

// One card in "People also liked"
export default function RelatedProductCard({ product }: { product: RelatedProduct }) {
  const href = `/product/${product.slug}`;

  return (
    <li className="flex flex-col border border-border bg-white">
      <Link href={href} className="block aspect-square bg-white">
        {product.image ? (
          <Image
            src={product.image.sourceUrl}
            alt={product.image.altText || product.name}
            width={300}
            height={300}
            sizes="(min-width: 1024px) 220px, 50vw"
            className="size-full object-contain"
          />
        ) : (
          // Same square box when the product has no photo yet
          <div className="size-full bg-bg-qty" aria-hidden="true" />
        )}
      </Link>

      <div className="flex flex-1 flex-col px-[15px] pb-[15px] pt-[10px]">
        <h3 className="pt-[5px] font-heading text-[17px] leading-[1.2] text-ink-dark">
          <Link href={href}>{product.name}</Link>
        </h3>
        {/* Short text is HTML written in WordPress admin */}
        <div
          className="mt-1 text-[14px] leading-[1.5] text-black [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: product.shortDescription }}
        />
        <p className="mt-auto pt-3 text-[15px] font-bold text-primary">{product.price}</p>
        <Link
          href={href}
          className="mt-2 text-[11px] font-bold text-ink-body hover:text-primary"
        >
          Show Details
        </Link>
      </div>
    </li>
  );
}
