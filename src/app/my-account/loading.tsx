// src/app/my-account/loading.tsx
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function MyAccountLoading() {
  return (
    <Container>
      <div className="py-10" role="status" aria-label="Loading login form" aria-busy="true">
        <div className="max-w-[450px] rounded-[5px] border border-ark-border bg-white p-5">
          <Skeleton className="mb-4 h-8 w-24" />
          <Skeleton className="mb-1 h-4 w-40" />
          <Skeleton className="mb-4 h-9 w-full" />
          <Skeleton className="mb-1 h-4 w-20" />
          <Skeleton className="mb-4 h-9 w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    </Container>
  );
}
