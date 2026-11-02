// src/app/shop/loading.tsx
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-[1210px] px-4 py-8">
      <ProductGridSkeleton />
    </main>
  );
}
