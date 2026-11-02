// src/components/layout/navLinks.ts
export type SubLink = {
  label: string;
  href: string;
  newTab?: boolean;
  image?: string;
  children?: SubLink[];
};

export type MegaColumn = { title: string; href: string; items: SubLink[] };

export type NavLink = {
  label: string;
  href: string;
  newTab?: boolean;
  current?: boolean;
  button?: boolean;
  // Simple dropdown (About, Brands)
  children?: SubLink[];
  // Mega menu (Shop, Education): used when every child is a heading with no link
  mega?: { width: number; columns: MegaColumn[] };
};
