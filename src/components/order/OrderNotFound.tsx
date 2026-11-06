// src/components/order/OrderNotFound.tsx
import Link from "next/link";
import PageHeaderBar from "@/components/shop/PageHeaderBar";

// Same message for "no such order" and "wrong key", so nobody can tell which orders exist
export default function OrderNotFound() {
  return (
    <>
      <PageHeaderBar title="Order received" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Order received" }]} />
      <main className="mx-auto max-w-[1210px] px-4 py-[25px] sm:px-10 min-[1290px]:px-0">
        <div className="mb-5 rounded-[2px] border border-ark-border bg-white p-[19px] text-[17px] leading-[28px] text-ark-btn-text">
          We couldn&apos;t find this order. Check the link in your confirmation email.
        </div>
        <Link href="/shop" className="inline-block rounded-[2px] bg-ark-price p-[15px] text-[12px] leading-[12px] text-white">
          Return to shop
        </Link>
      </main>
    </>
  );
}
