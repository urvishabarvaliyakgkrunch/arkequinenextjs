// src/app/my-account/edit-account/loading.tsx
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function EditAccountLoading() {
  return (
    <Container>
      <div className="py-10" role="status" aria-label="Loading account details" aria-busy="true">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 md:w-[260px]">
            <Skeleton className="h-[220px] w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="mb-4 h-7 w-40" />
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <Skeleton className="mb-4 h-16 w-full" />
            <Skeleton className="mb-6 h-16 w-full" />
            <Skeleton className="mb-3 h-5 w-32" />
            <Skeleton className="mb-4 h-16 w-full" />
            <Skeleton className="mb-4 h-16 w-full" />
            <Skeleton className="mb-4 h-16 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </Container>
  );
}
