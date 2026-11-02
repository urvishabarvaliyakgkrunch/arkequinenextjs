// src/lib/sorting.ts
export interface ProductsOrderby {
  field: "POPULARITY" | "RATING" | "DATE" | "PRICE" | "NAME";
  order: "ASC" | "DESC";
}

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Default sorting" },
  { value: "popularity", label: "Sort by popularity" },
  { value: "rating", label: "Sort by average rating" },
  { value: "date", label: "Sort by latest" },
  { value: "price-asc", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

export const PER_PAGE_OPTIONS = [15, 30, 45];

// Maps the toolbar's URL param to WooGraphQL's orderby input — null means "no orderby clause" (backend default).
export function parseOrderby(value?: string): ProductsOrderby | null {
  switch (value) {
    case "popularity":
      return { field: "POPULARITY", order: "DESC" };
    case "rating":
      return { field: "RATING", order: "DESC" };
    case "date":
      return { field: "DATE", order: "DESC" };
    case "price-asc":
      return { field: "PRICE", order: "ASC" };
    case "price-desc":
      return { field: "PRICE", order: "DESC" };
    default:
      return null;
  }
}
