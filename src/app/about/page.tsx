// src/app/about/page.tsx
// Matches ark-equine.com/about/: grey title bar, teal "OUR VISION" banner, then a
// YouTube launch-video / copy two-column section (Avia builder layout on the live site).
import PageHeaderBar from "@/components/shop/PageHeaderBar";

export const metadata = {
  title: "About",
  description: "Scientifically-Driven Equine Business",
};

export default function AboutPage() {
  return (
    <>
      <PageHeaderBar title="About" breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div
        className="py-10 sm:pb-[40px] sm:pt-[25px]"
        style={{ background: "linear-gradient(rgb(26, 113, 153), rgb(11, 105, 113))" }}
      >
        <h1 className="mx-auto max-w-[1210px] px-4 text-center font-[family-name:var(--f-head)] text-[28px] font-bold tracking-[1px] leading-[1.1em] text-white uppercase sm:text-[34px]">
          Our Vision
        </h1>
      </div>

      <main className="mx-auto max-w-[1210px] px-4 py-10 sm:py-[25px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[72px]">
          <div className="aspect-video w-full overflow-hidden">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/sCOdxmOFvRQ"
              title="ARKequine launch video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-6 font-[family-name:var(--f-body)] text-[17px] leading-[1.65] text-[#57585a]">
            <div>
              <h3 className="mb-3 font-[family-name:var(--f-head)] text-[20px] font-normal text-[#2e2f92] uppercase">
                A Scientifically-Driven Equine Company
              </h3>
              <p>
                We are an innovative, solutions-driven business tailored to meet the needs of the equine community
                and its success both on and off the field. Whether you are a breeding establishment, professional
                producer, racehorse trainer or leisure rider, we have a broad spectrum of products to maximise your
                horse&rsquo;s potential.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-[family-name:var(--f-head)] text-[20px] font-normal text-[#2e2f92] uppercase">
                Veterinary-Formulated Equine Products
              </h3>
              <p>
                Primarily a horse nutrition business, our range of high quality, veterinary-formulated feed, and
                supplements all have one thing in common. They have been formulated by experts in their field using
                only the highest quality raw materials and components and are launched to the market only after
                years of research and development, and strict efficacy and palatability testing.
              </p>
              <p className="mt-4">
                We offer a full spectrum of feed and nutritional supplements designed to satisfy everyday nutritional
                deficits as well as assisting in the management of various equine specific conditions.
              </p>
              <p className="mt-4">
                Alongside our nutritional range, we also offer a selection of topical horse-care products to support
                common skin conditions as well as unique hygiene solutions.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-[family-name:var(--f-head)] text-[20px] font-normal text-[#2e2f92] uppercase">
                The Newest Offering From Forte Healthcare Ltd
              </h3>
              <p>
                Launched in 2021, ARKequine&trade; is the specialist equine business from leading animal healthcare
                company, Forte Healthcare Ltd. Forte Healthcare is a producer and distributor of a number of niche
                novel and innovative animal healthcare products. It has teams in Ireland, the UK and Poland and a
                global network exporting to over 18 countries in Europe, Asia, and the Middle East.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-[family-name:var(--f-head)] text-[20px] font-normal text-[#2e2f92] uppercase">
                Total Equine Solutions for Success
              </h3>
              <p>
                We want to partner with horse breeders, trainers, elite riders and horse-owners in their pursuit of
                optimum performance. We want our partners to be confident that when they choose ARKequine&trade; they
                are choosing quality, efficacy, affordability and reliability, all qualities synonymous with success.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
