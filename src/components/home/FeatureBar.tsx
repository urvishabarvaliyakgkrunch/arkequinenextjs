// src/components/home/FeatureBar.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TrustindexWidget from "@/components/ui/TrustindexWidget";
import { FEATURES, TRUSTINDEX } from "./homeData";

export default function FeatureBar() {
  return (
    <section className="border-t border-border bg-white">
      <Container>
        <div className="grid grid-cols-2 items-start gap-x-[6%] gap-y-4 py-[25px] md:grid-cols-4">
          {FEATURES.map((f) => (
            <Link key={f.img} href={f.href} aria-label={f.alt} className="block">
              <Image src={f.img} alt={f.alt} width={f.width} height={f.height} className="block h-auto w-full" />
            </Link>
          ))}
          <TrustindexWidget id={TRUSTINDEX.rating} />
        </div>
      </Container>
    </section>
  );
}
