// src/components/product/RelatedProducts.tsx
import ProductCard from "@/components/shop/ProductCard";
import type { ProductCardFields } from "@/types/product";

// "People also liked" row; hidden when WooCommerce finds no related products
export default function RelatedProducts({ products }: { products: ProductCardFields[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-title">
      <h2
        id="related-title"
        className="mb-[10px] font-heading text-[18px] font-semibold uppercase leading-[19.8px] text-secondary"
      >
        People also liked
      </h2>
      {/* Same card as the shop page, so the look and hover stay identical */}
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.databaseId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
