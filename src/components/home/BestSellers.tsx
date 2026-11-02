// src/components/home/BestSellers.tsx
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import { BEST_SELLERS } from "./homeData";

export default function BestSellers() {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-[25px]">
          <SectionHeading>Best Sellers</SectionHeading>
          <div className="mb-[13px] grid grid-cols-1 items-start gap-x-[1%] gap-y-[12.09px] sm:grid-cols-2 lg:grid-cols-4">
            {BEST_SELLERS.map((p) => (
              <ProductCard key={p.href} product={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
