// src/components/category/CategoryGrid.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ImageOverlay from "@/components/ui/ImageOverlay";
import { CATEGORIES, type Category } from "./categories";

function CategoryItem({ category }: { category: Category }) {
  return (
    <div className="w-[121px]">
      <Link href={category.href} aria-label={category.label} className="group relative block">
        <Image
          src={category.img}
          alt={category.label}
          width={121}
          height={121}
          className="block h-[121px] w-[121px] rounded-[3px]"
        />
        <ImageOverlay className="inset-y-0 -inset-x-[5px]" />
      </Link>
      <h5 className="mt-[10px] text-center font-heading text-[11px] leading-[12.1px] font-semibold text-label uppercase">
        {category.label}
      </h5>
    </div>
  );
}

function chunk<T>(items: T[], size: number) {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

// Grey icon band used on the homepage (8 per row) and the shop (6 per row).
export default function CategoryGrid({
  categories = CATEGORIES,
  perRow = 8,
}: {
  categories?: Category[];
  perRow?: number;
}) {
  return (
    <section className="bg-bg-alt">
      {/* Desktop: one padded band per row, icons spaced evenly. */}
      <div className="hidden lg:block">
        {chunk(categories, perRow).map((row, i) => (
          <Container key={i}>
            <div className="flex justify-evenly py-[25px]">
              {row.map((c) => (
                <CategoryItem key={c.label} category={c} />
              ))}
            </div>
          </Container>
        ))}
      </div>

      {/* Tablet / mobile: four to a row, as on the live site. */}
      <div className="lg:hidden">
        <Container>
          <div className="grid grid-cols-2 justify-items-center gap-y-[25px] py-[25px] sm:grid-cols-4">
            {categories.map((c) => (
              <CategoryItem key={c.label} category={c} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
