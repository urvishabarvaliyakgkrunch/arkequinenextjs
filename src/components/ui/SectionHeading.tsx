// src/components/ui/SectionHeading.tsx
import type { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-[30px] text-center font-heading text-[20px] leading-[28px] font-normal text-primary uppercase">
      {children}
    </h3>
  );
}
