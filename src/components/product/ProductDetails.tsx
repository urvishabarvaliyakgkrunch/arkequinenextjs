// src/components/product/ProductDetails.tsx
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSummary from "@/components/product/ProductSummary";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import type { ProductPageData } from "@/types/product";

// Whole product page layout; receives data as props and never fetches
export default function ProductDetails({ product }: { product: ProductPageData }) {
  return (
    <main className="flex-1">
      <ProductBreadcrumb
        category={product.primaryCategory}
        productName={product.name}
      />

      <div className="mx-auto max-w-[1310px] px-4 pt-[50px] md:px-[50px]">
        {/* Image on the left (one third), details on the right */}
        <div className="grid gap-[50px] lg:grid-cols-[33%_1fr]">
          <ProductGallery images={product.images} productName={product.name} />
          <div>
            <ProductSummary product={product} />
            <ProductTabs tabs={product.tabs} />
          </div>
        </div>

        <RelatedProducts products={product.related} />
      </div>
    </main>
  );
}
