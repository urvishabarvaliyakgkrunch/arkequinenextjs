// src/app/my-account/view-order/[id]/loading.tsx
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function ViewOrderLoading() {
  return (
    <Container>
      <div className="py-10" role="status" aria-label="Loading order" aria-busy="true">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 md:w-[260px]">
            <Skeleton className="h-[220px] w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-6 h-7 w-40" />
            <Skeleton className="mb-6 h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </Container>
  );
}
