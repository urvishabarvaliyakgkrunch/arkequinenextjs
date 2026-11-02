// src/app/product/[slug]/loading.tsx
import ProductPageSkeleton from "@/components/product/ProductPageSkeleton";

// Shown the moment a product link is clicked, until data arrives
export default function Loading() {
  return <ProductPageSkeleton />;
}
