// src/components/landing/LandingBest.tsx
import Image from "next/image";
import Link from "@/components/ui/HoverPrefetchLink";
import SectionTitle from "@/components/landing/SectionTitle";
import Reveal from "@/components/landing/Reveal";
import BestCarousel from "@/components/landing/BestCarousel";
import { BEST } from "@/components/landing/landingData";
import { stripHtml, truncateWords } from "@/lib/stripHtml";
import type { BestSellerProduct } from "@/lib/queries/home";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { GUEST_SUBSCRIPTION_DISCOUNT_PERCENT } from "@/lib/subscriptionPricing";

const ROUND_ADD = "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-graphite text-[19px] text-white transition-all duration-300 ease-lt hover:scale-[1.08] hover:bg-teal";

// WPGraphQL returns price pre-formatted with the currency symbol (e.g. "€29.00", or a range "€45.00 - €205.00"
// for variable products) — strip just the currency symbol here, keep the " - " separator so ranges stay readable.
function splitPrice(price: string | null): string {
  if (!price) return "0.00";
  return price.replace(/[^0-9.,\-\s]/g, "").trim();
}

// Symbol comes from the backend price so it follows the chosen currency (CURCY); fixed € only for the static fallback
function priceSymbol(price: string | null): string {
  return price?.match(/[^0-9.,-s]+/)?.[0] ?? "€";
}

function Price({ symbol, value, cls }: { symbol: string; value: string; cls: string }) {
  return (
    <span className="flex items-baseline gap-[5px]">
      <span className={`text-[13px] font-bold ${cls}`}>{symbol}</span>
      <span className={`font-serif-lt text-[26px] font-normal ${cls}`}>{value}</span>
    </span>
  );
}

export default function LandingBest({ products }: { products: BestSellerProduct[] }) {
  // Falls back to the static sample set only when the backend's "bestsellers" category has nothing in it yet.
  const hasRealData = products.length > 0;
  const sortedProducts = hasRealData
    ? [...products].sort((a, b) => a.name.localeCompare(b.name))
    : products;
  const hero = hasRealData ? sortedProducts[0] : null;
  const rest = hasRealData ? sortedProducts.slice(1, 5) : [];

  const cards = hasRealData
    ? rest.map((p, i) => (
        <article key={p.id} className="group relative flex flex-col overflow-hidden rounded-[8px] border border-grey bg-white transition-[border-color,box-shadow] duration-[350ms] ease-lt hover:border-teal hover:shadow-[0_14px_36px_-22px_rgba(0,168,173,0.55)]">
          <span className="absolute top-[14px] left-[14px] z-[3] font-serif-lt text-[18px] font-light text-teal-deep italic">{String(i + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="absolute top-3 right-3 z-[3] flex h-8 w-8 items-center justify-center rounded-full border border-grey bg-white text-[15px] text-[#bcbdbf] transition-all duration-250 hover:border-teal hover:text-teal">&#9825;</span>
          <Link href={`/product/${p.slug}`} className="relative flex h-[210px] items-center justify-center px-6 pt-7 before:absolute before:bottom-[18px] before:left-1/2 before:h-[140px] before:w-[140px] before:-translate-x-1/2 before:rounded-full before:bg-grey-soft before:transition-all before:duration-[450ms] before:ease-lt before:content-[''] group-hover:before:h-[162px] group-hover:before:w-[162px] group-hover:before:bg-teal-tint">
            {p.image && (
              <Image src={p.image.sourceUrl} alt={p.image.altText || p.name} width={165} height={165} unoptimized className="relative z-[2] max-h-[165px] w-auto object-contain transition-transform duration-[450ms] ease-lt group-hover:-translate-y-[7px]" />
            )}
          </Link>
          <div className="flex flex-1 flex-col px-6 pt-[22px] pb-6">
            <span className="mb-2 text-[10px] font-bold tracking-[0.14em] text-[#a7a8aa] uppercase">{p.productCategories?.nodes[0]?.name ?? ""}</span>
            <Link href={`/product/${p.slug}`}>
              <h3 className="mb-[7px] font-serif-lt text-[22px] leading-[1.1] font-normal text-graphite">{p.name}</h3>
            </Link>
            <p className="mb-5 flex-1 text-[12.5px] leading-[1.5] text-[#9a9b9d]">{truncateWords(stripHtml(p.shortDescription), 12)}</p>
            <div className="flex items-start justify-between gap-[10px]">
              <div className="flex flex-col gap-[3px]">
                <Price symbol={priceSymbol(p.price)} value={splitPrice(p.price)} cls="text-graphite" />
                {/* Guest-facing default from the live site's subscription plugin (WCSATT) — matches shop page's ProductCard */}
                <span className="text-[11px] text-[#9a9b9d]">
                  — or subscribe to save{" "}
                  <span className="font-semibold text-graphite">{GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}%</span>
                </span>
              </div>
              {p.__typename === "SimpleProduct" ? (
                <AddToCartButton
                  productId={p.databaseId}
                  name={p.name}
                  image={p.image?.sourceUrl}
                  className={ROUND_ADD}
                  pendingContent={<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                >
                  +
                </AddToCartButton>
              ) : (
                <Link href={`/product/${p.slug}`} aria-label={`View ${p.name}`} className={ROUND_ADD}>
                  +
                </Link>
              )}
            </div>
          </div>
        </article>
      ))
    : BEST.cards.map((c, i) => (
        <article key={c.name} className="group relative flex flex-col overflow-hidden rounded-[8px] border border-grey bg-white transition-[border-color,box-shadow] duration-[350ms] ease-lt hover:border-teal hover:shadow-[0_14px_36px_-22px_rgba(0,168,173,0.55)]">
          <span className="absolute top-[14px] left-[14px] z-[3] font-serif-lt text-[18px] font-light text-teal-deep italic">{String(i + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="absolute top-3 right-3 z-[3] flex h-8 w-8 items-center justify-center rounded-full border border-grey bg-white text-[15px] text-[#bcbdbf] transition-all duration-250 hover:border-teal hover:text-teal">&#9825;</span>
          <div className="relative flex h-[210px] items-center justify-center px-6 pt-7 before:absolute before:bottom-[18px] before:left-1/2 before:h-[140px] before:w-[140px] before:-translate-x-1/2 before:rounded-full before:bg-grey-soft before:transition-all before:duration-[450ms] before:ease-lt before:content-[''] group-hover:before:h-[162px] group-hover:before:w-[162px] group-hover:before:bg-teal-tint">
            <Image src={c.image} alt={c.name} width={165} height={165} className="relative z-[2] max-h-[165px] w-auto object-contain transition-transform duration-[450ms] ease-lt group-hover:-translate-y-[7px]" />
          </div>
          <div className="flex flex-1 flex-col px-6 pt-[22px] pb-6">
            <span className="mb-2 text-[10px] font-bold tracking-[0.14em] text-[#a7a8aa] uppercase">{c.cat}</span>
            <h3 className="mb-[7px] font-serif-lt text-[22px] leading-[1.1] font-normal text-graphite">{c.name}</h3>
            <p className="mb-5 flex-1 text-[12.5px] leading-[1.5] text-[#9a9b9d]">{truncateWords(c.desc, 12)}</p>
            <div className="flex items-start justify-between gap-[10px]">
              <div className="flex flex-col gap-[3px]">
                <Price symbol="€" value={c.price} cls="text-graphite" />
                <span className="text-[11px] text-[#9a9b9d]">
                  — or subscribe to save{" "}
                  <span className="font-semibold text-graphite">{GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}%</span>
                </span>
              </div>
              <button type="button" aria-label={`Add ${c.name}`} className={ROUND_ADD}>+</button>
            </div>
          </div>
        </article>
      ));

  return (
    <section id="bestsellers" className="mx-auto max-w-[1240px] py-24 max-[767px]:px-5! max-[767px]:py-10!">
      <SectionTitle title={BEST.title} text={BEST.text} />
      <Reveal className="mt-9 grid grid-cols-[340px_1fr] items-stretch gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-5">
        <aside className="relative flex flex-col justify-between overflow-hidden rounded-[10px] bg-[linear-gradient(155deg,#5f6063_0%,#3f4042_55%,#303133_100%)] px-[30px] py-[34px] text-white before:pointer-events-none before:absolute before:-top-[40%] before:-right-[30%] before:h-4/5 before:w-4/5 before:bg-[radial-gradient(circle,rgba(0,168,173,.32),rgba(0,168,173,0)_70%)] before:content-[''] max-[900px]:flex-row max-[900px]:items-center max-[900px]:gap-6 max-[560px]:flex-col">
          <div>
            <div className="mb-4 text-[10px] font-bold tracking-[0.2em] text-[#7fd8d2] uppercase">Editor&apos;s choice</div>
            <h3 className="mb-[14px] font-serif-lt text-[36px] leading-[1.02] font-light tracking-[-0.01em]">{hero ? hero.name : BEST.hero.name}</h3>
            <p className="mb-5 max-w-[250px] text-[13px] leading-[1.55] opacity-85">
              {hero ? truncateWords(stripHtml(hero.shortDescription), 16) : BEST.hero.text}
            </p>
          </div>
          <div className="mt-1 mb-5 self-center max-[900px]:m-0">
            {hero?.image ? (
              <Image src={hero.image.sourceUrl} alt={hero.image.altText || hero.name} width={190} height={190} unoptimized className="max-h-[190px] w-auto drop-shadow-[0_16px_26px_rgba(0,0,0,0.4)]" />
            ) : (
              <Image src={BEST.hero.image} alt={BEST.hero.name} width={190} height={190} className="max-h-[190px] w-auto drop-shadow-[0_16px_26px_rgba(0,0,0,0.4)]" />
            )}
          </div>
          <div className="flex items-start justify-between border-t border-white/[0.18] pt-[18px]">
            <div className="flex flex-col gap-[3px]">
              <span className="flex items-baseline gap-[5px]">
                <span className="text-[13px] font-bold">{hero ? priceSymbol(hero.price) : "€"}</span>
                <span className="font-[Helvetica,Arial,sans-serif] text-[17px] font-normal">{hero ? splitPrice(hero.price) : BEST.hero.price}</span>
              </span>
              <span className="text-[11px] opacity-70">
                — or subscribe to save{" "}
                <span className="font-semibold">{GUEST_SUBSCRIPTION_DISCOUNT_PERCENT}%</span>
              </span>
            </div>
            {hero && hero.__typename === "SimpleProduct" ? (
              <AddToCartButton
                productId={hero.databaseId}
                name={hero.name}
                image={hero.image?.sourceUrl}
                className="rounded-[3px] border-0 bg-white px-5 py-3 text-[11px] font-bold tracking-[0.1em] text-graphite-deep uppercase transition-all duration-250 hover:bg-teal hover:text-white"
              >
                Add to bag
              </AddToCartButton>
            ) : (
              <Link
                href={hero ? `/product/${hero.slug}` : "/shop"}
                className="cursor-pointer rounded-[3px] border-0 bg-white px-5 py-3 text-[11px] font-bold tracking-[0.1em] text-graphite-deep uppercase transition-all duration-250 hover:bg-teal hover:text-white"
              >
                {hero ? "Select options" : "Add to bag"}
              </Link>
            )}
          </div>
        </aside>
        <BestCarousel cards={cards} />
      </Reveal>
    </section>
  );
}
