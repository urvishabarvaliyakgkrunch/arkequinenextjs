// src/components/product/ProductMeta.tsx
import Link from "next/link";
import type { ProductTerm } from "@/types/product";

interface ProductMetaProps {
  sku: string;
  categories: ProductTerm[];
  tags: ProductTerm[];
}

// Small grey line: SKU, categories, tags
export default function ProductMeta({ sku, categories, tags }: ProductMetaProps) {
  return (
    <div className="text-[11px] leading-[28px] text-muted">
      {sku && <span className="mr-1">SKU: {sku}</span>}
      <TermList label="Categories" basePath="/shop" terms={categories} />
      <TermList label="Tags" basePath="/shop/tag" terms={tags} />
    </div>
  );
}

// Same markup for categories and tags, so it lives in one place
function TermList({
  label,
  basePath,
  terms,
}: {
  label: string;
  basePath: string;
  terms: ProductTerm[];
}) {
  // Nothing to show: skip the label too
  if (terms.length === 0) return null;

  return (
    <span className="mr-1">
      {label}:{" "}
      {terms.map((term, index) => (
        <span key={term.slug}>
          <Link
            href={`${basePath}/${term.slug}`}
            className="text-primary hover:text-primary-alt"
          >
            {term.name}
          </Link>
          {index < terms.length - 1 && ", "}
        </span>
      ))}
    </span>
  );
}
