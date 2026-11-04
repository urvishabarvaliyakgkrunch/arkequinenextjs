// src/app/my-account/orders/loading.tsx
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function OrdersLoading() {
  return (
    <Container>
      <div className="py-10" role="status" aria-label="Loading orders" aria-busy="true">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 md:w-[260px]">
            <Skeleton className="h-[220px] w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-6 h-7 w-32" />
            <Skeleton className="mb-4 h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </Container>
  );
}
