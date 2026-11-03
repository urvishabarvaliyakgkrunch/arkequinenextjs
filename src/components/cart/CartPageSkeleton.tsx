// src/components/cart/CartPageSkeleton.tsx
import Skeleton from "@/components/ui/Skeleton";

// Shaped like the real CartTable + CartTotals (same column widths, same "3 rows" feel) so the page
// doesn't jump when the real basket data arrives — only shown on the very first visit, before we
// know whether the basket has anything in it (rule I4)
export default function CartPageSkeleton() {
  return (
    <div role="status" aria-label="Loading basket" className="flex flex-col gap-8">
      <div>
        <table className="w-full border-collapse border border-ark-border text-[13px]">
          <thead>
            <tr>
              <th className="w-[5.4%] border border-ark-border p-[9px_12px]" />
              <th className="w-[7.1%] border border-ark-border p-[9px_12px]" />
              <th className="w-[21.2%] border border-ark-border p-[9px_12px] text-left">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="w-[35%] border border-ark-border p-[9px_12px] text-left">
                <Skeleton className="h-3 w-12" />
              </th>
              <th className="w-[19.3%] border border-ark-border p-[9px_12px] text-left">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="border border-ark-border p-[9px_12px] text-left">
                <Skeleton className="h-3 w-16" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }, (_, index) => (
              <tr key={index}>
                <td className="border border-ark-border p-[6px_12px] align-middle">
                  <Skeleton className="size-[18px] rounded-full" />
                </td>
                <td className="border border-ark-border p-[6px_12px] align-middle">
                  <Skeleton className="size-8" />
                </td>
                <td className="border border-ark-border p-[6px_12px] align-middle">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="border border-ark-border p-[6px_12px] align-middle">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="border border-ark-border p-[6px_12px] align-middle">
                  <Skeleton className="h-[43px] w-[130px]" />
                </td>
                <td className="border border-ark-border p-[6px_12px] align-middle">
                  <Skeleton className="h-4 w-14" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Skeleton className="mt-5 h-[42px] w-[180px]" />
      </div>

      <div className="w-full md:w-[48%]">
        <Skeleton className="mb-[10px] h-5 w-36" />
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="mt-[14px] h-[46px] w-[193px]" />
      </div>
    </div>
  );
}
