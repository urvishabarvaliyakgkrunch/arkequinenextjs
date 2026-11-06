// src/components/ui/HoverPrefetchLink.tsx
"use client";

import { useState, type ComponentProps } from "react";
import Link from "next/link";

// The backend answers in ~3 s and dynamic pages only prefetch their loading shell, so a click felt slow.
// Once the pointer (or a finger) is on the link, prefetch the whole page so the click is instant.
export default function HoverPrefetchLink(props: ComponentProps<typeof Link>) {
  const [armed, setArmed] = useState(false);
  const { onMouseEnter, onTouchStart, onFocus, ...rest } = props;
  return (
    <Link
      {...rest}
      prefetch={armed ? true : props.prefetch}
      onMouseEnter={(e) => {
        setArmed(true);
        onMouseEnter?.(e);
      }}
      onTouchStart={(e) => {
        setArmed(true);
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        setArmed(true);
        onFocus?.(e);
      }}
    />
  );
}
