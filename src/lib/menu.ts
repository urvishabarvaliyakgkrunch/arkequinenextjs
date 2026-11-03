// src/lib/menu.ts
import { gql } from "@/lib/graphql";
import type { NavLink, SubLink } from "@/components/layout/navLinks";

type WpItem = { label: string; url: string | null; target: string | null; childItems?: { nodes: WpItem[] } };

const ITEM = "label url target";
const MENU_QUERY = `
  query NavMenu {
    menu(idType: NAME, id: "New Main Menu") {
      menuItems(first: 100, where: { parentId: "0" }) {
        nodes { ${ITEM} childItems(first: 100) { nodes { ${ITEM} childItems(first: 100) { nodes { ${ITEM} } } } } }
      }
    }
  }`;

const WP_ORIGIN = process.env.NEXT_PUBLIC_WP_URL ?? "";
const COLUMN_WIDTH = 302.5;

// WP admin uses "#" or "http://-" for items that are only headings
const isHeading = (url: string | null) => !url || url === "#" || url.startsWith("http://-");

// Internal links become relative so they stay inside the Next.js site
const hrefOf = (url: string | null) => {
  if (isHeading(url)) return "#";
  return url!.startsWith(WP_ORIGIN) ? url!.slice(WP_ORIGIN.length) || "/" : url!;
};

function toSub(it: WpItem): SubLink {
  const img = it.label.match(/<img[^>]+src="([^"]+)"/);
  const kids = it.childItems?.nodes.map(toSub) ?? [];
  return {
    label: img ? "" : it.label,
    href: hrefOf(it.url),
    ...(it.target === "_blank" ? { newTab: true } : {}),
    ...(img ? { image: img[1] } : {}),
    ...(kids.length ? { children: kids } : {}),
  };
}

function toNav(it: WpItem): NavLink {
  const href = hrefOf(it.url);
  const subs = it.childItems?.nodes.map(toSub) ?? [];
  const link: NavLink = {
    label: it.label,
    href,
    ...(it.target === "_blank" ? { newTab: true } : {}),
    ...(href === "/" ? { current: true } : {}),
    ...(href === "/shop/" ? { button: true } : {}),
  };
  const mega = subs.length > 0 && it.childItems!.nodes.every((c) => isHeading(c.url));
  if (mega) {
    link.mega = {
      width: Math.round(subs.length * COLUMN_WIDTH),
      columns: subs.map((c) => ({ title: c.label, href: c.href, items: c.children ?? [] })),
    };
  } else if (subs.length) {
    link.children = subs;
  }
  return link;
}

export async function getNavLinks(): Promise<NavLink[]> {
  const data = await gql<{ menu: { menuItems: { nodes: WpItem[] } } | null }>(
    MENU_QUERY,
    {},
    { revalidate: 86400 },
  );
  return data.menu?.menuItems.nodes.map(toNav) ?? [];
}
