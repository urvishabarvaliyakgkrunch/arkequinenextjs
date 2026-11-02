// src/components/product/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

export type Product = {
  title: string;
  href: string;
  img: string;
  description: string;
  price: string;
  // Variable products only offer "Select options"; simple ones get basket + details.
  variable?: boolean;
  addToCartHref?: string;
};

function BasketIcon() {
  return (
    <svg viewBox="0 0 29 32" width="12.7" height="14" fill="currentColor" aria-hidden="true" className="mr-[3px] shrink-0">
      <path d="M4.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM20.8 27.2q0-1.28 0.96-2.24t2.24-0.96q1.344 0 2.272 0.96t0.928 2.24q0 1.344-0.928 2.272t-2.272 0.928q-1.28 0-2.24-0.928t-0.96-2.272zM10.496 19.648q-1.152 0.32-1.088 0.736t1.408 0.416h17.984v2.432q0 0.64-0.64 0.64h-20.928q-0.64 0-0.64-0.64v-2.432l-0.32-1.472-3.136-14.528h-3.136v-2.56q0-0.64 0.64-0.64h4.992q0.64 0 0.64 0.64v2.752h22.528v8.768q0 0.704-0.576 0.832z" />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg viewBox="0 0 22 32" width="9.6" height="14" fill="currentColor" aria-hidden="true" className="mr-[3px] shrink-0">
      <path d="M6.784 17.344v-2.88h8.96v2.88h-8.96zM19.2 1.6q1.344 0 2.272 0.928t0.928 2.272v22.4q0 1.28-0.928 2.24t-2.272 0.96h-16q-1.28 0-2.24-0.96t-0.96-2.24v-22.4q0-1.344 0.96-2.272t2.24-0.928h16zM19.2 27.2v-22.4h-16v22.4h16zM15.68 8.256v2.816h-8.96v-2.816h8.96zM15.68 20.8v2.816h-8.96v-2.816h8.96z" />
    </svg>
  );
}

const BUTTON =
  "flex h-[23px] items-center justify-center p-[3px] text-[11px] leading-[15px] text-body transition-colors hover:text-secondary";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-[2px] border border-border bg-white">
      <Link href={product.href} className="block">
        <Image
          src={product.img}
          alt={product.title}
          width={300}
          height={300}
          className="block aspect-square h-auto w-full"
        />
        <div className="relative min-h-[170px] border-t border-border bg-white px-[15px] pt-[10px] pb-[15px]">
          <span
            aria-hidden="true"
            className="absolute -top-[6px] left-1/2 -ml-[6px] h-[10px] w-[10px] rotate-45 border-t border-l border-border bg-white"
          />
          <h2 className="pt-[5px] font-heading text-[17px] leading-[22.1px] font-normal tracking-[1px] text-secondary uppercase">
            {product.title}
          </h2>
          <div className="text-[17px] leading-[28.05px] text-black">{product.description}</div>
          <div className="text-[17px] leading-[28.05px]">
            <span className="text-[15px] leading-[24px] font-semibold text-primary">
              {product.price}
              <small className="text-[12px]"> — or subscribe to save </small> 10%
            </span>
          </div>
        </div>
      </Link>
      <div className="flex border-t border-border bg-white p-[10px] opacity-20 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        {product.variable ? (
          <Link href={product.href} className={`${BUTTON} w-full`}>
            <BasketIcon />
            Select options
          </Link>
        ) : (
          <>
            <a href={product.addToCartHref ?? product.href} className={`${BUTTON} w-[49%]`}>
              <BasketIcon />
              Add to basket
            </a>
            <Link href={product.href} className={`${BUTTON} w-[49%]`}>
              <DetailsIcon />
              Show Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
