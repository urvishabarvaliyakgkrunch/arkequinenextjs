// src/components/home/HomeSkeleton.tsx
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";
import ProductCardSkeleton from "@/components/shop/ProductCardSkeleton";

function HeadingBar() {
  return <Skeleton className="mx-auto mb-[30px] h-[28px] w-40" />;
}

export default function HomeSkeleton() {
  return (
    <div role="status" aria-label="Loading home page">
      <Skeleton className="aspect-[1599/505] w-full rounded-none" />

      <section className="border-t border-border bg-white">
        <Container>
          <div className="grid grid-cols-2 items-start gap-x-[6%] gap-y-4 py-[25px] md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[524/94] w-full" />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-alt">
        <Container>
          <div className="grid grid-cols-2 justify-items-center gap-y-[25px] py-[25px] sm:grid-cols-4 lg:grid-cols-8">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-[121px]">
                <Skeleton className="h-[121px] w-[121px] rounded-[3px]" />
                <Skeleton className="mx-auto mt-[10px] h-[12px] w-20" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <Skeleton className="my-[25px] h-[160px] w-full" />
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-[25px]">
            <HeadingBar />
            <div className="mb-[13px] grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Skeleton className="aspect-[1905/520] w-full rounded-none" />

      <section className="bg-white">
        <Container>
          <div className="py-[25px]">
            <HeadingBar />
            <div className="mb-[40px] grid grid-cols-1 items-start gap-x-[6%] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="mb-[6px] aspect-[260/185] w-full" />
                  <Skeleton className="h-[20px] w-full" />
                  <Skeleton className="mt-2 h-[15px] w-24" />
                  <Skeleton className="mt-3 h-[17px] w-20" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-[25px]">
            <HeadingBar />
            <div className="mt-[28px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-px">
                  <Skeleton className="aspect-[3/1] w-full" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
