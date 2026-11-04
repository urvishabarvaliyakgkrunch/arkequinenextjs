// src/components/policy/PolicyPage.tsx
// Shared by every static WP "legal" page (terms, privacy, delivery, returns). Matches
// ark-equine.com exactly: no grey title bar on these pages, just a top-right
// breadcrumb line above a plain 1210px content column. Swapping to an ACF wysiwyg
// field later only means passing that field's html into the `html` prop below.
import Link from "next/link";

export default function PolicyPage({
  title,
  html,
}: {
  title: string;
  html: string;
}) {
  return (
    <div className="mx-auto max-w-[1210px] px-4 pt-[18px] pb-[50px] min-[1242px]:px-0">
      <nav className="mb-[10px] text-right text-[11px] leading-[15px] text-[#666666]">
        You are here:{" "}
        <Link href="/" className="text-[#666666] no-underline hover:underline">
          Home
        </Link>{" "}
        / {title}
      </nav>
      <div
        className="policy-content text-[17px] leading-[28.05px] text-[var(--color-body)] [&_p]:my-[14.45px] [&_strong]:font-bold [&_strong]:text-[var(--color-primary)] [&_a]:text-[var(--color-primary)] [&_a]:no-underline [&_a:hover]:underline"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
