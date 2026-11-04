// src/components/landing/landingData.ts
// Static copy for the landing page, header and footer. Images come from the live host because staging uploads redirect to a placeholder
const UP = "https://ark-equine.com/wp-content/uploads/2026/10";
export const upload = (file: string) => `${UP}/${file}`;

export interface LandingLink {
  label: string;
  href: string;
  children?: LandingLink[];
  upper?: boolean;
}

export interface FooterData {
  logo: string;
  text: string;
  cols: { title: string; links: [string, string][] }[];
  contactTitle: string;
  offices: { name: string; lines: string[] }[];
  copyright: string;
}

const sub = (base: string, items: string[][]): LandingLink[] =>
  items.map(([label, slug]) => ({ label, href: `${base}${slug}/` }));

// Mirrors the WP menu "Landing Page Menu"
export const LANDING_MENU: LandingLink[] = [
  {
    label: "Products",
    href: "/shop/",
    children: sub("/product-category/", [
      ["Performance", "performance"], ["Digestion", "digestion"], ["Endocrine", "endocrine"],
      ["Hoofcare", "hoofcare"], ["Breeding", "breeding"], ["Hygiene", "hygiene"],
      ["Calming", "calming"], ["Hydration", "hydration"], ["Respiratory", "respiratory"],
      ["Mobility", "mobility"], ["Vitamins & Minerals", "vitamins-minerals"], ["Dermatology", "dermatology"],
    ]),
  },
  { label: "Equine", href: "/shop/" },
  { label: "Pets", href: "/product-category/pet/" },
  {
    label: "Science",
    href: "/#science",
    children: sub("/tag/", [
      ["Digestion and Nutrition", "digestion-and-nutrition"], ["Breeding", "breeding"],
      ["Performance Horse Management", "performance-horse-management"],
      ["Respiratory Health", "respiratory-health"], ["Illnesses and First Aid", "illnesses-and-first-aid"],
      ["Laminitis", "laminitis"], ["Skin Conditions", "skin-conditions"],
    ]),
  },
  { label: "Naturals", href: "/naturals/" },
  {
    label: "Brands",
    href: "#",
    upper: true,
    children: sub("/brand/", [
      ["ARKequine", "arkequine-brand"], ["Aquatabs", "aquatabs-brand"], ["Acme", "acme"], ["Derby", "derby"],
      ["Derbymed", "derbymed"], ["Easy Foal", "non-invasive-foaling-detection-system"],
      ["Staldren", "staldren"], ["VetTrue System", "vettrue-system"],
    ]),
  },
];

export const HERO = {
  image: upload("hero-scaled-1.jpg"),
  eyebrow: "Science-Led Nutrition. Trusted by Horse Owners.",
  lines: ["Horse Health ", "Solutions"],
  sub: "ARKequine provides effective nutritional solutions developed to support health, performance and wellbeing.",
  cta: { label: "Explore equine products", href: "/shop/" },
};

// Header bits shared by every page
export const SITE = {
  logo: upload("logo.svg"),
  cta: { label: "Shop", href: HERO.cta.href },
  trust: { image: upload("Trust-index.png"), url: "https://www.trustindex.io/reviews/ark-equine.com" },
};

export const TRUST = [
  { icon: "ic1.svg", title: "Science-Led Nutrition", text: "Innovative formulations backed by science" },
  { icon: "ic2.svg", title: "Trusted by Professionals", text: "Formulated with clinical expertise" },
  { icon: "ic3.svg", title: "Ireland & UK Delivery", text: "Reliable delivery with expert customer support" },
];

export const DUAL = [
  { image: "Equine-Health-1-copy.webp", eyebrow: "For horses & ponies", title: "Equine Health", text: "Trusted equine nutrition for health, performance and everyday wellbeing.", cta: "Explore equine", href: "/shop/" },
  { image: "pet-health.jpg", eyebrow: "For dogs & cats", title: "Pet Health", text: "Targeted nutritional support for happier, healthier pets", cta: "Explore pets", href: "/pet/" },
];

export interface ShopCategory { image: string; title: string; text: string; href: string }
export const SHOP_CATEGORIES: ShopCategory[] = [
  { image: "Vitamins-and-minerals1-copy.webp", title: "Vitamins & Minerals", text: "Essential equine vitamins and minerals for balanced nutrition, optimal condition, health and peak performance.", href: "/vitamins-minerals/" },
  { image: "Performance-New-copy-1.webp", title: "Performance & Immunity", text: "Nutritional support for equine performance, stamina, recovery, immune function and maintaining horses in top condition.", href: "/performance/" },
  { image: "Respiratory-Support-copy-1.webp", title: "Respiratory Support", text: "Equine respiratory supplements supporting healthy airways, breathing, lung function, performance and overall horse wellbeing.", href: "/respiratory/" },
  { image: "Calm-focus-copy-1.webp", title: "Calm & Focus", text: "Promoting calm, focused horses with nutritional support for relaxation, concentration, stress and confident performance.", href: "/calming-2/" },
  { image: "digestion-copy-1.webp", title: "Digestive Health", text: "Supporting horse gut health, healthy digestion, stomach comfort, condition and overall equine wellbeing.", href: "/digestion/" },
  { image: "Coat-Condition-copy.webp", title: "Coat & Condition", text: "Supporting healthy horse skin, coat shine, body condition, weight gain and overall equine wellbeing.", href: "/horsecare/" },
  { image: "Breeding-Youngstock-copy.webp", title: "Breeding & Youngstock", text: "Targeted nutrition for broodmares, foals and young horses, supporting healthy growth, development and breeding performance.", href: "/breeding/" },
  { image: "Stable-Hygiene-Tech-copy.webp", title: "Stable Hygiene & Tech", text: "Smart stable solutions for improved hygiene, horse care, foaling safety and everyday yard management.", href: "/hygiene/" },
  { image: "Hoof-Skin-Care-copy.webp", title: "Hoof & Skin Care", text: "Targeted horse care for healthy hooves, skin, coat condition, protection and everyday equine wellbeing.", href: "/product-tag/grooming-kit/" },
];

export const QUOTE = {
  image: "murphy.jpg",
  text: "As a trainer, respiratory health is always at the forefront of my mind. Respimin is the first thing we reach for when we have any respiratory issues on the yard.",
  name: "Ciaran Murphy",
  role: "Charlestown Racing",
  product: { image: "/landing/respimin.png", eyebrow: "Respiratory support", name: "Respimin", sub: "Mineral feed for healthy airways", href: "/product/respimin/" },
};

export const BEST = {
  title: "Best Sellers",
  text: "The products yards reorder, season after season.",
  hero: { name: "Respimin", text: "Mineral feed to support healthy airways, breathing and respiratory comfort", image: "/landing/respimin.png", price: "29.00" },
  // Sample cards: the staging page has no carousel products yet
  cards: [
    { cat: "Hoof care", name: "Carminal", desc: "Targeted nutritional support for everyday equine wellbeing.", price: "24.00", image: "/landing/prod-carminal.png" },
    { cat: "Digestion", name: "Obex", desc: "Supports healthy digestion and condition in horses.", price: "31.50", image: "/landing/prod-obex.png" },
    { cat: "Performance", name: "Renalof", desc: "Formulated to support recovery after hard work.", price: "28.75", image: "/landing/prod-renalof.png" },
    { cat: "Vitamins", name: "Viusid", desc: "Immune and vitality support for horses of all ages.", price: "39.00", image: "/landing/prod-viusid.png" },
  ],
};

export const PANO = {
  image: "Equine-Advice-2-copy.webp",
  eyebrow: "Speak to Our Equine Nutritional Manager",
  title: "Expert advice you can trust",
  text: "Not sure which supplement is right for your horse? Every horse is unique. Our Equine Nutritional Manager can help you choose the right nutritional support based on your horse's age, workload, lifestyle and specific requirements.",
  meta: [["1:1", "With our team"], ["Free", "No obligation"], ["30 min", "Online or phone"]],
  cta: { label: "Book free consultation", href: "/contact-us/" },
};

export const PET = {
  title: "Pet Supplements",
  text: "Science-led nutritional supplements supporting the health and wellbeing of dogs and cats.",
  hero: {
    eyebrow: "Pet Health",
    name: "ALZERpets",
    text: "ALZERpets supports brain health in elderly pets with cognitive impairment and dementia.…",
    image: "https://ark-equine.com/wp-content/uploads/2025/07/Bod.-ALZER-Pets_in-1030x942.jpg",
    href: "/product/ark-equine-com-supporting-brain-health-elderly-pets-alzerpets/",
  },
  // Small tiles slide in pages of four
  items: [
    { title: "Obex Pets", image: "https://ark-equine.com/wp-content/uploads/2025/07/OBEX-Pets_low-300x274.jpg", href: "/product/obex-pets/" },
    { title: "Viusid Pets", image: "https://ark-equine.com/wp-content/uploads/2025/07/VIUSID-Pets_Low-300x274.jpg", href: "/product/viusid-pets/" },
    { title: "ASBRIP pets", image: "https://ark-equine.com/wp-content/uploads/2025/07/Bod.-ASBRIP-Pets_Low-300x274.jpg", href: "/product/asbrip-pets/" },
    { title: "Folrex Pets", image: "https://ark-equine.com/wp-content/uploads/2025/07/FOLREX-Pets__low-300x274.jpg", href: "/product/folrex-pets/" },
    { title: "Ocoxin Pets", image: "https://ark-equine.com/wp-content/uploads/2025/07/Bod.-OCOXIN-Pets_Low-300x274.jpg", href: "/product/ocoxin-pets/" },
  ],
};

export const ARTICLES = {
  eyebrow: "Learn from the Experts",
  title: "Helping you make informed decisions for your horse",
  text: "Read articles written by our veterinary team and Equine Nutritional Manager, covering nutrition, health, performance and seasonal horse care.",
  cta: { label: "Talk to our team", href: "/contact-us/" },
  items: [
    { image: "cat-breeding.jpg", cat: "Breeding", title: "Why every stud farm needs a Brix refractometer this foaling season", text: "A simple tool that takes the guesswork out of colostrum quality — and protects your foals from day one.", cta: "Read article", video: false },
    { image: "equine-health.jpg", cat: "Performance", title: "Building a respiratory health routine for horses in hard work", text: "Practical, evidence-led steps trainers use to keep airways clear through a demanding season.", cta: "Watch video", video: true },
    { image: "pet-health.jpg", cat: "Pet care", title: "Supporting senior pets: small changes that make a big difference", text: "From joint comfort to digestion, how targeted support helps older dogs and cats thrive.", cta: "Read article", video: false },
    { image: "cat-performance.jpg", cat: "Recovery", title: "Electrolytes and recovery: getting the balance right after competition", text: "What to replace, when, and how to read the signs your horse needs support.", cta: "Read article", video: false },
  ],
};

export const SUBSCRIBE = {
  title: "Stay Updated with ARKequine!",
  // Same Mailchimp list the live site posts to
  action: "https://ark-equine.us19.list-manage.com/subscribe/post?u=6df3094962d722680bd8eb679&id=28595b0ec9",
  features: [
    { icon: "sub-ic1.png", title: "Expert Recommendations", text: "on care and maintaining good health" },
    { icon: "sub-ic2.png", title: "Special Offers", text: "from ARKequine" },
    { icon: "sub-ic3.png", title: "Latest News", text: "from the equestrian industry" },
  ],
};

export const PARTNERS = { label: "Trusted by professionals worldwide", logos: ["VetPlus", "ACME", "derbymed", "Derby", "Nuveq"] };

export const FOOTER: Omit<FooterData, "logo" | "copyright"> = {
  text: "Science-led equine and pet healthcare, developed with expertise and trusted by owners.",
  cols: [
    { title: "Terms & Conditions", links: [["Privacy Policy", "/privacy-policy/"], ["Delivery Policy", "/delivery-policy/"], ["Returns Policy", "/returns-policy/"], ["Cookie Policy", "/cookie-policy/"], ["Terms & Conditions", "/terms-conditions/"], ["Terms of Sale", "/terms-conditions/terms-of-sale/"]] },
    { title: "Company", links: [["About", "/about/"], ["ARKequine Blog", "/news/"], ["Brand Ambassadors", "/ambassadors/"], ["Contact Us", "/contact-us/"]] },
  ],
  contactTitle: "Get in touch",
  offices: [
    { name: "Ireland office", lines: ["Tel: +353 (01) 045 433552", "Email: enquiries@ark-equine.com"] },
    { name: "UK office", lines: ["Tel: +44 (0) 01292 800022", "Email: enquiries@ark-equine.com"] },
  ],
};
