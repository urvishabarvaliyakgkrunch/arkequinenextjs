// src/components/home/Reviews.tsx
import Container from "@/components/ui/Container";
import TrustindexWidget from "@/components/ui/TrustindexWidget";
import { TRUSTINDEX } from "./homeData";

// Review cards come entirely from Trustindex; only the slot is ours.
export default function Reviews() {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-[25px]">
          <TrustindexWidget id={TRUSTINDEX.reviews} />
        </div>
      </Container>
    </section>
  );
}
