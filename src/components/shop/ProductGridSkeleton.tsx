// src/components/shop/ProductGridSkeleton.tsx
import ProductCardSkeleton from "@/components/shop/ProductCardSkeleton";

export default function ProductGridSkeleton({
  count = 8,
  columnsClassName = "grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: {
  count?: number;
  columnsClassName?: string;
}) {
  return (
    <div className={`grid ${columnsClassName}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
