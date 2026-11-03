// src/components/shop/CategoryListing.tsx
"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import ShopToolbar from "@/components/shop/ShopToolbar";
import { PER_PAGE_OPTIONS } from "@/lib/sorting";
import type { ProductCardFields } from "@/types/product";

const COLUMNS = "grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";
const DEFAULT_PER_PAGE = PER_PAGE_OPTIONS[0];

interface View {
  orderby: string;
  perPage: number;
}

function readView(): View {
  const params = new URLSearchParams(window.location.search);
  const perPage = Number(params.get("per_page"));
  return {
    orderby: params.get("orderby") ?? "",
    perPage: PER_PAGE_OPTIONS.includes(perPage) ? perPage : DEFAULT_PER_PAGE,
  };
}

// The page HTML is static (default sort, 15 products). A different sort / per-page loads from a cached API route,
// so ?orderby= and ?per_page= keep working without making the whole page dynamic.
export default function CategoryListing({
  slug,
  initialProducts,
}: {
  slug: string;
  initialProducts: ProductCardFields[];
}) {
  const [view, setView] = useState<View>({ orderby: "", perPage: DEFAULT_PER_PAGE });
  const [loaded, setLoaded] = useState<{ key: string; products: ProductCardFields[] } | null>(null);

  // Pick up ?orderby=&per_page= from a shared / reloaded URL after hydration
  useEffect(() => {
    const fromUrl = readView();
    if (fromUrl.orderby || fromUrl.perPage !== DEFAULT_PER_PAGE) queueMicrotask(() => setView(fromUrl));
  }, []);

  const isDefault = !view.orderby && view.perPage === DEFAULT_PER_PAGE;
  const key = `${view.orderby}|${view.perPage}`;

  useEffect(() => {
    if (isDefault) return;
    let cancelled = false;
    const query = new URLSearchParams({ slug, orderby: view.orderby, per_page: String(view.perPage) });
    fetch(`/api/category-products?${query}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((products: ProductCardFields[]) => {
        if (!cancelled) setLoaded({ key, products });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isDefault, key, slug, view.orderby, view.perPage]);

  function onChange(name: "orderby" | "per_page", value: string) {
    const next = { ...view, ...(name === "orderby" ? { orderby: value } : { perPage: Number(value) }) };
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(name, value);
    else params.delete(name);
    const search = params.toString();
    window.history.pushState(null, "", search ? `?${search}` : window.location.pathname);
    setView(next);
  }

  const products = isDefault ? initialProducts : loaded?.key === key ? loaded.products : null;

  return (
    <>
      <ShopToolbar orderby={view.orderby} perPage={view.perPage} onChange={onChange} />
      {products ? (
        <ProductGrid products={products} columnsClassName={COLUMNS} priorityCount={3} />
      ) : (
        <ProductGridSkeleton count={view.perPage} columnsClassName={COLUMNS} />
      )}
    </>
  );
}
