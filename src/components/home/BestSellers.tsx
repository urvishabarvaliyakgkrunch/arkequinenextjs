// src/components/home/BestSellers.tsx
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shop/ProductCard";
import { BEST_SELLERS } from "./homeData";

export default function BestSellers() {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-[25px]">
          <SectionHeading>Best Sellers</SectionHeading>
          <div className="mb-[13px] grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BEST_SELLERS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
