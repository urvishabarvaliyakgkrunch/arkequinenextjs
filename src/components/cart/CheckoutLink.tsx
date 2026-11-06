// src/components/cart/CheckoutLink.tsx
"use client";

import type { MouseEvent, ReactNode } from "react";
import { getCartToken } from "@/lib/storeApi";

interface CheckoutLinkProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

// Posts the cart token to our own server route, which adds the login and forwards both to WordPress
function submitToCheckoutStart(cartToken: string | null) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/api/checkout/start";

  if (cartToken) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "cart_token";
    input.value = cartToken;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

// One checkout button used everywhere (basket page + both mini-carts), so the handoff lives in one place
export default function CheckoutLink({ className, children, onClick }: CheckoutLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Build the request at click time: the Cart-Token only exists in the browser and may have changed
    event.preventDefault();
    onClick?.();
    submitToCheckoutStart(getCartToken());
  }

  return (
    // href is a plain fallback (open in new tab / no JavaScript); the click handler does the real handoff
    <a href={`${process.env.NEXT_PUBLIC_WP_URL}/checkout/`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
