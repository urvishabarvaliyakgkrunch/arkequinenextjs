// src/components/product/ProductDetails.tsx
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import EducationArticles from "@/components/product/EducationArticles";
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
          <div>
            <ProductGallery images={product.images} productName={product.name} />
            <EducationArticles tags={product.educationTags} />
          </div>
          <div>
            <ProductSummary product={product} />
            <ProductTabs tabs={product.tabs} />
          </div>
        </div>
      </div>

      {/* Live site puts "People also liked" in its own full-width grey band */}
      <div className="mt-[38px] border-t border-border bg-bg-soft">
        <div className="mx-auto max-w-[1310px] px-4 py-5 md:px-[50px]">
          <div className="my-[30px]">
            <RelatedProducts products={product.related} />
          </div>
        </div>
      </div>
    </main>
  );
}
