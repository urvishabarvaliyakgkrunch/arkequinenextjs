// src/components/shop/PageHeaderBar.tsx
import Link from "next/link";

// Matches the grey "Shop" / "ARKequine" title bar + breadcrumb row on ark-equine.com — shared by shop and category pages.
export default function PageHeaderBar({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="bg-[#fcfcfc]">
      <div className="mx-auto flex max-w-[1310px] flex-wrap items-center justify-between gap-2 px-4 py-[10px] sm:px-[50px]">
        <h1 className="font-[family-name:var(--f-head)] text-[16px] font-bold text-[#666666]">
          {title}
        </h1>
        <nav className="text-[11px] text-[#666666]">
          You are here:{" "}
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label}>
              {crumb.href ? (
                <Link href={crumb.href} className="text-[#666666] no-underline hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                crumb.label
              )}
              {i < breadcrumbs.length - 1 ? " / " : ""}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
