// src/components/landing/ArrowButton.tsx
import Link from "next/link";

// Teal pill button with a sliding arrow (hero and consultation sections)
export default function ArrowButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-[10px] rounded-[3px] border border-transparent bg-teal px-[26px] py-[15px] text-[13px] font-bold tracking-[0.06em] text-white uppercase transition-all duration-[280ms] ease-lt hover:bg-teal-deep"
    >
      {children}
      <span className="transition-transform duration-300 ease-lt group-hover:translate-x-[5px]">→</span>
    </Link>
  );
}
