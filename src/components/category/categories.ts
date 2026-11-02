// src/components/category/categories.ts
export type Category = { label: string; href: string; img: string };

const UPLOADS = "https://ark-equine.com/wp-content/uploads";

// Order matches the homepage icon rows on ark-equine.com.
export const CATEGORIES: Category[] = [
  { label: "Performance", href: "/performance/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Performance.png` },
  { label: "Digestion", href: "/digestion/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Digestion.png` },
  { label: "Endocrine", href: "/endocrine/", img: `${UPLOADS}/2021/08/Endocrine-copy.png` },
  { label: "Hoofcare", href: "/hoofcare-2/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Hoofcare.png` },
  { label: "Breeding", href: "/breeding/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Breeding.png` },
  { label: "Hygiene", href: "/hygiene/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Hygiene.png` },
  { label: "Technology", href: "/technology/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Technology.png` },
  { label: "Testing & Analysis", href: "/testing-analysis/", img: `${UPLOADS}/2022/10/ArkEquineCategoryIcon-TestingAnalysis.png` },
  { label: "Calming", href: "/calming-2/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Calming.png` },
  { label: "Hydration", href: "/hydration-2/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Hydration.png` },
  { label: "Respiratory", href: "/respiratory/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Respiratory.png` },
  { label: "Mobility", href: "/mobility/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Mobility.png` },
  { label: "Vitamins & Minerals", href: "/vitamins-minerals/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-VitaminsMinerals.png` },
  { label: "Dermatology", href: "/dermatology/", img: `${UPLOADS}/2021/08/ArkEquineCategoryIcon-Dermatology.png` },
  { label: "Horsecare", href: "/horsecare/", img: `${UPLOADS}/2022/10/ArkEquineCategoryIcon-Horsecare.png` },
  { label: "First Aid", href: "/first-aid/", img: `${UPLOADS}/2023/04/ArkEquineCategoryIcon-FirstAid-copy.webp` },
];
