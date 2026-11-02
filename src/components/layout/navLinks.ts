// src/components/layout/navLinks.ts
export type SubLink = { label: string; href: string; children?: SubLink[] };

export type MegaColumn = { title: string; href: string; items: SubLink[] };

export type NavLink = {
  label: string;
  href: string;
  current?: boolean;
  button?: boolean;
  // Simple dropdown (About, Brands)
  children?: SubLink[];
  // Mega menu (Shop, Education)
  mega?: { width: number; columns: MegaColumn[] };
};

const l = (label: string): SubLink => ({ label, href: "#" });
const col = (title: string, items: string[]): MegaColumn => ({
  title,
  href: "#",
  items: items.map(l),
});

// Static for now — swap to WP Menu data when the backend wiring is approved.
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", current: true },
  {
    label: "About",
    href: "#",
    children: ["Our Vision", "Our Team", "Our Partners", "Careers", "Contact Us"].map(l),
  },
  {
    label: "Shop",
    href: "#",
    button: true,
    mega: {
      width: 908,
      columns: [
        col("Product Categories", [
          "Breeding",
          "Calming",
          "Dermatology",
          "Digestion",
          "Endocrine",
          "First Aid",
          "Hoofcare",
          "Horsecare",
          "Hydration",
          "Hygiene",
          "Mobility",
          "Naturals",
          "Performance",
          "Respiratory",
          "Testing & Analysis",
          "Technology",
          "Vitamins & Minerals",
        ]),
        col("Concern", [
          "Coughing and Respiratory",
          "Digestion and Gut",
          "Fertility",
          "Grooming Kit",
          "Hoof Problems",
          "Tendon & Ligament Supplements",
          "Innovative Technology",
          "Laminitis",
          "Muscle and Joint",
          "Sweet Itch",
          "Tiredness and Lethargy",
        ]),
        col("Horse Type", [
          "Breeding Stock",
          "Racehorses",
          "Sales Prep",
          "Sport Horses",
          "Veteran Horses",
        ]),
      ],
    },
  },
  { label: "Naturals", href: "#" },
  { label: "Pet Range", href: "#" },
  {
    label: "Brands",
    href: "#",
    children: [
      l("Arioneo"),
      l("ARKequine"),
      l("Aquatabs"),
      { ...l("Acme"), children: [l("Acme"), l("Acme – Feed"), l("Acme – Supplements")] },
      l("Derby"),
      {
        ...l("Derbymed"),
        children: [l("Derbymed"), l("Derbymed Topicals"), l("Derbymed – Supplements")],
      },
      l("Easy Foal"),
      l("Staldren"),
      l("VetTrue System"),
    ],
  },
  {
    label: "Education",
    href: "#",
    mega: {
      width: 605,
      columns: [
        col("Learning Academy", [
          "Digestion and Nutrition",
          "Breeding",
          "Illnesses and First Aid",
          "Equine Laminitis",
          "Performance Horse Management",
          "Pets",
          "Respiratory Health",
          "Skin Conditions",
        ]),
        col("Ask Our Experts", []),
      ],
    },
  },
  { label: "Ambassadors", href: "#" },
  { label: "News", href: "#" },
];
