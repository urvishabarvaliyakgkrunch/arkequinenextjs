// src/components/product/ProductPageSkeleton.tsx
import Skeleton from "@/components/ui/Skeleton";

// Same wrapper classes as ProductDetails, so nothing jumps when data arrives (rule I4)
export default function ProductPageSkeleton() {
  return (
    <main
      role="status"
      aria-label="Loading product"
      className="flex-1"
    >
      <div className="border-y border-border bg-bg-soft">
        <div className="mx-auto flex min-h-[57px] max-w-[1310px] items-center justify-between px-4 py-2 md:px-[50px]">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-64" />
        </div>
      </div>

      <div className="mx-auto max-w-[1310px] px-4 pt-[50px] md:px-[50px]">
        <div className="grid gap-[50px] lg:grid-cols-[33%_1fr]">
          <div>
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="my-[10px] h-[120px] w-1/3" />
            <Skeleton className="mb-2 mt-5 h-7 w-3/4" />
            <Skeleton className="h-[34px] w-full" />
          </div>
          <div>
            <Skeleton className="mb-[14px] h-[37px] w-2/3" />
            <Skeleton className="my-[12.75px] h-5 w-24" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-[25px] h-4 w-4/5" />
            <div className="mb-[5px] flex gap-4">
              <Skeleton className="h-[43px] w-[130px]" />
              <Skeleton className="h-[42px] w-[110px]" />
            </div>
            <Skeleton className="mt-2 h-3 w-72" />
            <div className="pt-[50px]">
              <Skeleton className="h-12 w-72" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>

        <section className="py-5">
          <Skeleton className="mb-[10px] h-5 w-44" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-[400px] w-full" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
