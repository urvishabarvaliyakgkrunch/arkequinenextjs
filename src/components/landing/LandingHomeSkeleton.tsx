// src/components/landing/LandingHomeSkeleton.tsx
import Skeleton from "@/components/ui/Skeleton";

// Same wrappers and heights as LandingHome so nothing jumps when the page lands
function Title() {
  return (
    <div className="mb-10 flex flex-col items-center gap-3">
      <Skeleton className="h-[34px] w-48" />
      <Skeleton className="h-[14px] w-64" />
    </div>
  );
}

export default function LandingHomeSkeleton() {
  return (
    <div role="status" aria-label="Loading home page" className="overflow-x-clip bg-white">
      <Skeleton className="aspect-[1920/725] w-full rounded-none" />

      <div className="flex h-[90px] items-center justify-center gap-16 bg-teal/60 px-8 max-[560px]:hidden">
        {["w-44", "w-40", "w-48"].map((w) => (
          <Skeleton key={w} className={`h-[38px] ${w} bg-white/30`} />
        ))}
      </div>

      <section className="mx-auto max-w-[1240px] py-24 max-[767px]:px-5 max-[767px]:py-10">
        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          <Skeleton className="min-h-[440px] rounded-[8px] max-[900px]:min-h-[340px]" />
          <Skeleton className="min-h-[440px] rounded-[8px] max-[900px]:min-h-[340px]" />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] pt-10 pb-24 max-[767px]:px-5 max-[767px]:py-10">
        <Title />
        <div className="grid grid-cols-[1.12fr_1fr] gap-[18px] max-[900px]:grid-cols-1">
          <Skeleton className="min-h-[496px] rounded-[6px] max-[900px]:min-h-[340px]" />
          <div className="grid grid-cols-2 grid-rows-2 gap-[18px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="min-h-[239px] rounded-[6px]" />
            ))}
          </div>
        </div>
      </section>

      <Skeleton className="min-h-[560px] w-full rounded-none" />

      <section className="mx-auto max-w-[1240px] py-24 max-[767px]:px-5 max-[767px]:py-10">
        <Title />
        <div className="grid grid-cols-[340px_1fr] gap-6 max-[900px]:grid-cols-1">
          <Skeleton className="min-h-[470px] rounded-[10px]" />
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[470px] flex-[0_0_calc((100%-24px)/2.25)] rounded-[8px] max-[560px]:flex-[0_0_86%]" />
            ))}
          </div>
        </div>
      </section>

      <Skeleton className="min-h-[600px] w-full rounded-none max-[900px]:min-h-[480px]" />

      <section className="bg-grey-soft pt-10 pb-24 max-[767px]:px-5 max-[767px]:py-10">
        <div className="mx-auto max-w-[1240px] px-8">
          <Title />
        </div>
      </section>

      <section className="bg-grey-soft py-24 max-[767px]:px-5 max-[767px]:py-10">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[300px_1fr] gap-12 px-8 max-[900px]:grid-cols-1">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[11px] w-32" />
            <Skeleton className="h-[110px] w-full" />
            <Skeleton className="h-[90px] w-full" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-[380px] flex-[0_0_calc((100%-24px)/2.15)] rounded-[8px] max-[560px]:flex-[0_0_88%]" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey-soft pb-24 max-[767px]:px-5 max-[767px]:pb-10">
        <div className="mx-auto max-w-[1240px] px-8">
          <Skeleton className="h-[260px] w-full rounded-[14px]" />
        </div>
      </section>
    </div>
  );
}
