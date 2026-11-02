// src/components/home/homeData.ts
// Static homepage content mirrored from ark-equine.com — swap to WP data later.
import type { Product } from "@/components/product/ProductCard";

const UPLOADS = "https://ark-equine.com/wp-content/uploads";

export const TRUSTINDEX = {
  reviews: "46509eb23b97334a16260b7617f",
  rating: "9fdc3192615b8851d2566b13cb5",
};

export const HERO = {
  img: `${UPLOADS}/2026/02/width_1600.png`,
  width: 1599,
  height: 505,
  alt: "EasyFoal non-invasive foaling alarm",
};

export const FEATURES = [
  { href: "/nutritional-consultation/", img: `${UPLOADS}/2023/10/nutritional.webp`, width: 524, height: 94, alt: "Nutritional advice & support" },
  { href: "/delivery-policy/", img: `${UPLOADS}/2026/09/Delivery-3-1030x220.png`, width: 1030, height: 220, alt: "Free delivery" },
  { href: "/delivery-policy/", img: `${UPLOADS}/2023/10/CTA-NEXTDAY.webp`, width: 524, height: 94, alt: "Same day dispatch" },
];

export const BEST_SELLERS: Product[] = [
  {
    title: "Elevate",
    href: "/product/elevate/",
    img: `${UPLOADS}/2025/08/packshot-e1756393824802-300x300.png`,
    description:
      "A COMPLEMENTARY LIQUID FEED PROVIDING 30 VITAMINS, MINERAL, AMINO ACIDS AND TRACE ELEMENTS TO ENSURE […]",
    price: "€69.50",
    variable: true,
  },
  {
    title: "Essential Grooming Kit",
    href: "/product/essential-grooming-kit/",
    img: `${UPLOADS}/2024/10/DERBY_GroomingBundle-300x300.jpg`,
    description: "High-quality, grooming kit essentials",
    price: "€39.99",
    addToCartHref: "/?add-to-cart=7194",
  },
  {
    title: "Viusid Equine",
    href: "/product/viusid-equine/",
    img: `${UPLOADS}/2025/06/Packshot-300x300.jpg`,
    description: "A complementary feed rich in antioxidants to support horses during periods of stress.",
    price: "€45.00 – €205.00",
    variable: true,
  },
  {
    title: "Respimin 800G",
    href: "/product/respimin/",
    img: `${UPLOADS}/2021/08/RespiminARKequine_low-300x300.jpg`,
    description: "Effective equine respiratory support",
    price: "€60.00",
    addToCartHref: "/?add-to-cart=200",
  },
];

type Point = { x: number; y: number };

export type Testimonial = {
  img: string;
  heading: Point;
  quote: Point;
  quoteLines: string[];
  author: Point;
  authorLines: string[];
};

// Layer positions are LayerSlider's, in px on its 1905×494 canvas.
export const TESTIMONIALS: Testimonial[] = [
  {
    img: `${UPLOADS}/layerslider/projects/testimonials/ulcosan.webp`,
    heading: { x: 816.58, y: 67.96 },
    quote: { x: 647.7, y: 156.52 },
    quoteLines: [
      "\" We started using Ulcosan this season and it's a great success.",
      "The horses are taking their racing well, easily recovering,",
      "eating well with plenty of energy and looking super. It is a great benefit",
      "to any horse in training \"",
    ],
    author: { x: 845.41, y: 298.62 },
    authorLines: ["Colin Bowe", "Leading Point-to-Point Handler"],
  },
  {
    img: `${UPLOADS}/layerslider/projects/testimonials/anthony.webp`,
    heading: { x: 755.82, y: 61.78 },
    quote: { x: 601.36, y: 141.07 },
    quoteLines: [
      "\" We swapped from a regular oil to Kilotone over a year ago,",
      "and I have been delighted with how well it has worked. The horses’",
      "coats are fantastic, they maintain condition well, and we have",
      "noticed how well our horses are recovering after races.",
      "As it also contains B Vitamins and Vitamin E, it ticks a lot of boxes,",
      "and reduces the overall number of supplements I use on a daily basis.",
      "We now include Kilotone in the diets of all our horses.\"",
    ],
    author: { x: 859.82, y: 357.32 },
    authorLines: ["Anthony McCann", "Racehorse Trainer"],
  },
  {
    img: `${UPLOADS}/layerslider/projects/testimonials/Testimonials_templ_Ciaran_PK1.png`,
    heading: { x: 803.19, y: 68.99 },
    quote: { x: 621.96, y: 155.49 },
    quoteLines: [
      "\" As a trainer, respiratory health is always at the forefront of my mind.",
      "In previous years we have tried various other products with limited success.",
      "Respimin was introduced to us by the team at ARKequine and we have",
      "been more than happy with the results to date. It is very effective and",
      "is the first thing we reach for when we have any respiratory issues",
      "on the yard. \"",
    ],
    author: { x: 898.95, y: 361.44 },
    authorLines: ["Ciaran Murphy", "Charlestown Racing"],
  },
];

export const BLOG_POSTS = [
  {
    title: "The Science of Sales Prep: Condition, Calm and Shine.",
    href: "/the-science-of-sales-prep-condition-calm-and-shine/",
    img: `${UPLOADS}/2025/07/3-260x185.png`,
    date: "8 July 2025",
    dateTime: "2025-07-08",
  },
  {
    title: "Is your hay clean enough?",
    href: "/is-your-hay-clean-enough/",
    img: `${UPLOADS}/2025/05/4-260x185.jpg`,
    date: "26 May 2025",
    dateTime: "2025-05-26",
  },
  {
    title: "Decoding Equine Supplement Labels",
    href: "/decoding-equine-supplement-labels/",
    img: `${UPLOADS}/2025/02/Screenshot-2025-02-14-153011-260x185.png`,
    date: "14 February 2025",
    dateTime: "2025-02-14",
  },
  {
    title: "Preparing your Horse for Seasonal Changes",
    href: "/preparing-your-horse-for-seasonal-changes/",
    img: `${UPLOADS}/2024/10/Screenshot-2024-10-03-122501-260x185.png`,
    date: "3 October 2024",
    dateTime: "2024-10-03",
  },
];

export const PARTNERS = [
  "acme",
  "derbymed",
  "staldren",
  "nuveq",
  "aquatabs",
  "innoval",
  "vettrue-1",
  "ovacyte-1",
  "arioneo",
].map((name) => ({ name: name.replace(/-1$/, ""), img: `${UPLOADS}/2024/10/${name}.webp` }));
