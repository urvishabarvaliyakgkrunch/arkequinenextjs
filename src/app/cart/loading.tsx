// src/app/cart/loading.tsx
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-[#fcfcfc] px-4 py-[10px] sm:px-[50px]">
        <Skeleton className="h-4 w-16" />
      </div>
      <main className="mx-auto max-w-[1210px] px-4 py-[25px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <Skeleton className="h-[300px] flex-1" />
          <Skeleton className="h-[200px] w-full lg:w-[325px]" />
        </div>
      </main>
    </>
  );
}
