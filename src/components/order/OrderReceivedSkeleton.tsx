// src/components/order/OrderReceivedSkeleton.tsx
import Skeleton from "@/components/ui/Skeleton";

// Same blocks and spacing as OrderReceivedView, so nothing jumps when the order arrives
export default function OrderReceivedSkeleton() {
  return (
    <div role="status" aria-label="Loading order">
      <div className="border-b border-[#e1e1e1] bg-[#fcfcfc]">
        <div className="mx-auto flex max-w-[1310px] items-center justify-between px-4 py-[10px] sm:px-[50px]">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <main className="mx-auto max-w-[1210px] px-4 py-[25px] sm:px-10 min-[1290px]:px-0">
        <Skeleton className="mb-6 h-[67px] w-full" />
        <div className="mb-8 flex flex-wrap gap-x-10 gap-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="mb-[10px] h-4 w-28" />
        <Skeleton className="h-[260px] w-full" />
        <Skeleton className="mt-8 mb-[10px] h-4 w-32" />
        <Skeleton className="h-[130px] w-full" />
        <Skeleton className="mt-8 h-[42px] w-[150px]" />
      </main>
    </div>
  );
}
