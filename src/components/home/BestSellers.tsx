// src/components/home/BestSellers.tsx
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shop/ProductCard";
import { getProductsBySlug } from "@/lib/queries/home";
import { BEST_SELLERS } from "./homeData";

export default async function BestSellers() {
  const live = await getProductsBySlug(BEST_SELLERS.map((p) => p.slug));

  return (
    <section className="bg-white">
      <Container>
        <div className="py-[25px]">
          <SectionHeading>Best Sellers</SectionHeading>
          <div className="mb-[13px] grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BEST_SELLERS.map((p) => {
              const real = live.get(p.slug);
              // Static fallback has made-up IDs, so it can't be added to the cart until the product exists in WooCommerce
              return <ProductCard key={p.id} product={real ?? p} purchasable={Boolean(real)} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
