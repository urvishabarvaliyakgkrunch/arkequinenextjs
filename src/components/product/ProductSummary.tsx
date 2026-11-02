// src/components/product/ProductSummary.tsx
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductMeta from "@/components/product/ProductMeta";
import type { ProductPageData } from "@/types/product";

// Right side of the page: title, price, short text, buy box, meta
export default function ProductSummary({ product }: { product: ProductPageData }) {
  return (
    <div>
      <h1 className="mb-[14px] font-heading text-[34px] font-bold leading-[37.4px] text-secondary">
        {product.name}
      </h1>

      {product.price && (
        <p className="my-[12.75px] text-[15px] font-bold leading-6 text-primary">
          {/* Old price is crossed out only when WooCommerce says it is on sale */}
          {product.isOnSale && product.regularPrice && (
            <del className="mr-2 font-normal text-meta">{product.regularPrice}</del>
          )}
          {product.price}
        </p>
      )}

      {/* Short text is HTML written in WordPress admin, so it is rendered as HTML */}
      <div
        className="mb-[25px] text-[17px] leading-[28.05px] text-black [&_p]:m-0"
        dangerouslySetInnerHTML={{ __html: product.shortDescription }}
      />

      {/* Only simple products can be bought from here for now */}
      {product.type === "SimpleProduct" && (
        <AddToCartForm isInStock={product.isInStock} />
      )}

      <ProductMeta
        sku={product.sku}
        categories={product.categories}
        tags={product.tags}
      />
    </div>
  );
}
