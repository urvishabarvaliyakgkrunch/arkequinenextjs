// src/app/product/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetails from "@/components/product/ProductDetails";
import ProductPageSkeleton from "@/components/product/ProductPageSkeleton";
import { getProductPage } from "@/lib/products";

// Slug is read inside Suspense so Next can serve the page shell instantly
async function ProductContent({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductPage(slug); // 1 GraphQL call (result is cached)
  if (!product) notFound();

  return <ProductDetails product={product} />;
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // Same cached call as the page, so this does not hit WordPress twice
  const product = await getProductPage(slug);
  return { title: product ? `${product.name} | ARK Equine` : "Product not found" };
}

export default function ProductPage(props: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductContent {...props} />
    </Suspense>
  );
}
