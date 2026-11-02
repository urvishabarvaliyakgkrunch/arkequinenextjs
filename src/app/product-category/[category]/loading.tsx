// src/app/product-category/[category]/loading.tsx
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex max-w-[1210px] flex-col gap-8 px-4 py-8 lg:flex-row">
      <div className="flex-1">
        <Skeleton className="mb-6 h-8 w-48" />
        <ProductGridSkeleton columnsClassName="grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" />
      </div>
      <aside className="w-full lg:w-[325px] lg:shrink-0">
        <Skeleton className="mb-2 h-6 w-40" />
        <div className="flex flex-col gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[12px] w-3/4" />
          ))}
        </div>
      </aside>
    </main>
  );
}
