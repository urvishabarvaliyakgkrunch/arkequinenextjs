// src/components/shop/ProductGrid.tsx
import ProductCard from "@/components/shop/ProductCard";
import type { ProductCardFields } from "@/types/product";

// Shared by the shop page and every category page — same cards, same gaps everywhere.
// Category pages have a sidebar narrowing the content column, so they pass a 3-col cap instead of the shop page's 4.
export default function ProductGrid({
  products,
  columnsClassName = "grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: {
  products: ProductCardFields[];
  columnsClassName?: string;
}) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-ark-btn-text">No products found.</p>;
  }

  return (
    <div className={`grid ${columnsClassName}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
