// src/components/product/RelatedProducts.tsx
import RelatedProductCard from "@/components/product/RelatedProductCard";
import type { RelatedProduct } from "@/types/product";

// "People also liked" row; hidden when WooCommerce finds no related products
export default function RelatedProducts({ products }: { products: RelatedProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="py-5">
      <h2
        id="related-title"
        className="mb-[10px] font-heading text-[18px] font-bold uppercase leading-[19.8px] text-secondary"
      >
        People also liked
      </h2>
      <ul className="grid grid-cols-2 items-start gap-3 lg:grid-cols-4">
        {products.map((product) => (
          <RelatedProductCard key={product.databaseId} product={product} />
        ))}
      </ul>
    </section>
  );
}
