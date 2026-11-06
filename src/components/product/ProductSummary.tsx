// src/components/product/ProductSummary.tsx
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductMeta from "@/components/product/ProductMeta";
import { GUEST_SUBSCRIPTION_DISCOUNT_PERCENT } from "@/lib/subscriptionPricing";
import type { ProductPageData } from "@/types/product";

// Right side of the page: title, price, short text, buy box, meta
export default function ProductSummary({ product }: { product: ProductPageData }) {
  return (
    <div>
      <h1 className="mb-[14px] font-heading text-[34px] font-bold leading-[37.4px] text-secondary">
        {product.name}
      </h1>

      {product.price && (
        <p className="mb-[15px] mt-[15.6px] text-[15px] font-bold leading-6 text-primary">
          {/* Old price is crossed out only when WooCommerce says it is on sale */}
          {product.isOnSale && product.regularPrice && (
            <del className="mr-2 font-normal text-meta">{product.regularPrice}</del>
          )}
          {product.price}
          {/* Guests always see the subscription plugin's 10% default, same as the shop cards */}
          <small className="text-[12px]">
            {" "}— or subscribe to save{" "}
            <span className="text-[15px]">{GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}%</span>
          </small>
        </p>
      )}

      {/* Short text is HTML written in WordPress admin, so it is rendered as HTML */}
      <div
        className="mb-[25px] text-[17px] leading-[28.05px] text-black [&_p]:m-0 opacity-80"
        dangerouslySetInnerHTML={{ __html: product.shortDescription }}
      />

      {/* Simple products ("Add to basket" straight away) and variable products (pick an option first,
          e.g. "Size" on Aquatabs InLine) can both be bought from here */}
      {(product.type === "SimpleProduct" || product.type === "VariableProduct") && (
        <AddToCartForm product={product} />
      )}

      <ProductMeta
        sku={product.sku}
        categories={product.categories}
        tags={product.tags}
      />
    </div>
  );
}
