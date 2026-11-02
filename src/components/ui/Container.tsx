// src/components/ui/Container.tsx
import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1310px] px-5 md:px-[50px]">
      {children}
    </div>
  );
}
