// src/app/my-account/edit-address/loading.tsx
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function EditAddressOverviewLoading() {
  return (
    <Container>
      <div className="py-10" role="status" aria-label="Loading addresses" aria-busy="true">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 md:w-[260px]">
            <Skeleton className="h-[220px] w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-6 h-7 w-32" />
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-[220px] w-full" />
              <Skeleton className="h-[220px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
