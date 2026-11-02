// src/components/home/Partners.tsx
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PARTNERS } from "./homeData";

export default function Partners() {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-[25px]">
          <SectionHeading>Our Partners</SectionHeading>
          {/* Enfold's logo grid keeps an empty 28px heading row above the logos. */}
          <div className="h-[28px]" aria-hidden="true" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((p) => (
              <div key={p.name} className="p-px">
                <Image src={p.img} alt={p.name} width={300} height={100} className="block h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
