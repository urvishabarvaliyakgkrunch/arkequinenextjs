// src/components/product/ProductBreadcrumb.tsx
import Link from "next/link";
import type { ProductTerm } from "@/types/product";

interface ProductBreadcrumbProps {
  category: ProductTerm | null;
  productName: string;
}

// Light title bar: "Products" on the left, the trail on the right
export default function ProductBreadcrumb({
  category,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <div className="border-y border-border bg-bg-soft">
      <div className="mx-auto flex min-h-[57px] max-w-[1310px] flex-wrap items-center justify-between gap-x-4 px-4 py-2 md:px-[50px]">
        <strong className="font-heading text-base font-normal text-[#666]">
          Products
        </strong>
        <nav aria-label="Breadcrumb" className="text-[11px] leading-[15px] text-[#666]">
          You are here:{" "}
          <Link href="/" className="px-[3px] hover:text-primary">Home</Link>/
          <Link href="/shop" className="px-[3px] hover:text-primary">Products</Link>
          {category && (
            <>
              /
              <Link href={`/shop/${category.slug}`} className="px-[3px] hover:text-primary">
                {category.name}
              </Link>
            </>
          )}
          {/* The current page is plain text, not a link */}
          /<span className="px-[3px]">{productName}</span>
        </nav>
      </div>
    </div>
  );
}
