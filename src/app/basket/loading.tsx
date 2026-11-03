// src/app/basket/loading.tsx
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-[#fcfcfc] px-4 py-[10px] sm:px-[50px]">
        <Skeleton className="h-4 w-16" />
      </div>
      <main className="mx-auto max-w-[1210px] px-4 py-[25px]">
        {/* Same single-column shell as cart/page.tsx while the cart loads */}
        <Skeleton className="h-[300px] w-full" />
      </main>
    </>
  );
}
