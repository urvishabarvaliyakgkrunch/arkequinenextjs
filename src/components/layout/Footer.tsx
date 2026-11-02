// src/components/layout/Footer.tsx
import Image from "next/image";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/layout/SocialLinks";
import { SOCIALS } from "@/components/layout/TopBar";

const UPLOADS = "https://ark-equine.com/wp-content/uploads";

const TERMS_LINKS = [
  "Privacy Policy",
  "Delivery Policy",
  "Returns Policy",
  "Cookie Policy (EU)",
  "Terms of Sale",
  "Terms & Conditions",
];

const NEWS_ITEMS = [
  {
    title: "Getting Stallions Off to the Right Start This Breeding Season",
    img: `${UPLOADS}/2026/03/485310460_692982433246772_7564050590762334944_n-80x80.jpg`,
  },
  {
    title: "Why Every Stud Farm Needs a Brix Refractometer This Foaling Season",
    img: `${UPLOADS}/2026/02/b436fa92-428b-4de5-ae6e-c8ecb9e8557a-80x80.png`,
  },
  {
    title: "ARKequine Celebrates Partnership with Naas Racecourse",
    img: `${UPLOADS}/2026/02/NAAS-Racecourse-Photo-80x80.jpg`,
  },
  { title: "Haygain FAQs", img: `${UPLOADS}/2025/05/5-80x80.jpg` },
  {
    title:
      "ARKequine appointed as Official Distributor for Haygain in Ireland and Northern Ireland",
    img: `${UPLOADS}/2025/05/Haygain-425-x-500-px-copy-80x80.webp`,
  },
];

const HEADING =
  "pb-2 text-[20px] leading-[28px] font-normal tracking-normal text-primary uppercase";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="border-t border-bg-alt bg-bg-alt pt-[15px] pb-[30px]">
        <Container>
          <div className="grid grid-cols-1 gap-x-[6%] md:grid-cols-3 md:[grid-template-columns:29.33%_29.33%_29.33%]">
            <div>
              <div className="my-[30px]">
                <h3 className={HEADING}>Terms &amp; Conditions</h3>
              </div>
              <ul className="my-[30px] mt-0 text-[17px] leading-[28.05px]">
                {TERMS_LINKS.map((label) => (
                  <li key={label}>
                    <a href="#" className="block pt-1 pb-[5px] text-[#333] hover:text-primary">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="my-[30px]">
                <h3 className={HEADING}>Contact Us</h3>
              </div>
              <div className="mt-0 pt-[15px] pb-[14px]">
                <p className="text-[14.45px] leading-[28.05px] text-[#333]">
                  <a href="#">Contact Us</a>
                  <br />
                  Head Office: ARK Equine,
                  <br />
                  Newbridge Industrial Estate,
                  <br />
                  Newbridge, Co. Kildare,
                  <br />
                  W12 YF63, Ireland.
                  <br />
                  Phone: 045 433552 (IE) or 01292 800022 (UK)
                </p>
              </div>
              <div className="my-[30px]">
                <SocialLinks />
              </div>
            </div>

            <div>
              <div className="my-[30px]">
                <h3 className={HEADING}>Latest News</h3>
              </div>
              <ul className="mt-0 mb-[30px] text-[17px] leading-[28.05px]">
                {NEWS_ITEMS.map((n) => (
                  <li key={n.title} className="mb-2 flex min-h-[84px]">
                    <a href="#" className="mt-1 mr-[17px] block h-20 w-20 shrink-0">
                      <Image
                        src={n.img}
                        alt={n.title}
                        width={80}
                        height={80}
                        unoptimized
                        className="block h-20 w-20"
                      />
                    </a>
                    <a href="#" className="text-[#333] hover:text-primary">
                      {n.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-primary bg-primary text-[11px] leading-[28.05px] text-white">
        <Container>
          <div className="flex flex-col gap-2 py-[15px] md:flex-row md:items-start md:justify-between">
            <p>
              © Copyright - ark-equine.com 2026 |{" "}
              <a href="#">Part of Forte Healthcare Group - www.fortehealthcare.com</a>{" "}
              | <a href="#">Web Development by Digital Ideas</a>
            </p>
            <ul className="-mt-[5px] flex md:ml-[30px]">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={`Link to ${s.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[30px] w-[30px] items-center justify-center text-[#999] hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
