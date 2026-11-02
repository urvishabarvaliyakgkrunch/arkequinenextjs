// src/components/layout/CartIcon.tsx
export default function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <a
      href="#"
      aria-label="Shopping Cart"
      className="relative flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[2px] border border-border bg-white text-ink-dark lg:absolute lg:top-1/2 lg:-right-[2px] lg:-translate-y-1/2"
    >
      <svg
        viewBox="0 0 29 32"
        width="13.59"
        height="15"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM20.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM10.496 19.648q-1.152 0.32-1.088 0.736t1.408 0.416h17.984v2.432q0 0.64-0.64 0.64h-20.928q-0.64 0-0.64-0.64v-2.432l-0.32-1.472-3.136-14.528h-3.136v-2.56q0-0.64 0.64-0.64h4.992q0.64 0 0.64 0.64v2.752h22.528v8.768q0 0.704-0.576 0.832z" />
      </svg>
      {count > 0 && (
        <span className="absolute top-[1px] right-[1px] flex h-4 w-4 items-center justify-center rounded-full bg-ink-dark text-[11px] leading-none text-white">
          {count}
        </span>
      )}
    </a>
  );
}
