// src/app/shop/loading.tsx
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-[#fcfcfc] px-4 py-[10px] sm:px-[50px]">
        <Skeleton className="h-4 w-16" />
      </div>
      <main className="mx-auto max-w-[1210px] px-4 py-8">
        <Skeleton className="mb-6 h-10 w-64" />
        <ProductGridSkeleton />
      </main>
    </>
  );
}
