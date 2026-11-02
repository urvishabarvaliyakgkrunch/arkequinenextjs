// src/components/shop/ProductCardSkeleton.tsx
import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col border border-ark-border bg-white">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-[5px]">
        <Skeleton className="h-[17px] w-3/4" />
        <Skeleton className="h-[17px] w-full" />
        <Skeleton className="mt-auto h-[15px] w-1/3" />
      </div>
      <div className="flex gap-2 border-t border-ark-border p-[10px]">
        <Skeleton className="h-[15px] flex-1" />
        <Skeleton className="h-[15px] flex-1" />
      </div>
    </div>
  );
}
