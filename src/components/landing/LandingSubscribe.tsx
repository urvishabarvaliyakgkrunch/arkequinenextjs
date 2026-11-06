// src/components/landing/LandingSubscribe.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/landing/Reveal";
import { SUBSCRIBE, upload } from "@/components/landing/landingData";

const CF7_FORM_ID = process.env.NEXT_PUBLIC_CF7_NEWSLETTER_FORM_ID;
const WP_URL = process.env.NEXT_PUBLIC_WP_URL;

type Status = "idle" | "submitting" | "sent" | "error";

// Posts to the live site's CF7 newsletter form (same pattern as ContactForm)
export default function LandingSubscribe() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-p0-o1`);
    data.append("_wpcf7", String(CF7_FORM_ID));

    try {
      const res = await fetch(
        `${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
        { method: "POST", body: data }
      );
      const json = await res.json();

      if (json.status === "mail_sent") {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(json.invalid_fields?.[0]?.message ?? json.message ?? null);
      }
    } catch {
      setStatus("error");
      setErrorMessage(null);
    }
  }

  return (
    <section className="bg-grey-soft pb-24 max-[767px]:px-5! max-[767px]:py-10!">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal className="grid grid-cols-4 items-center rounded-[14px] border border-grey bg-white px-11 py-12 max-[900px]:grid-cols-2 max-[900px]:gap-7 max-[900px]:px-7 max-[900px]:py-9 max-[560px]:grid-cols-1 max-[560px]:gap-6">
          <div className="border-r border-grey pr-9 max-[900px]:col-span-full max-[900px]:mb-1 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:pr-0 max-[900px]:pb-6">
            <h3 className="mb-[22px] font-serif-lt text-[28px] leading-[1.1] font-light text-graphite">{SUBSCRIBE.title}</h3>
            <form onSubmit={handleSubmit} aria-label="ARKequine newsletter signup" className="flex flex-col gap-[10px]">
              <label htmlFor="ark-newsletter-email" className="sr-only">Email address</label>
              <input id="ark-newsletter-email" type="email" name="email-424" autoComplete="email" required placeholder="Your email address" className="rounded-[3px] border border-grey bg-grey-soft px-[15px] py-[13px] text-[13px] text-graphite placeholder:text-[#a7a8aa]" />
              <label className="flex gap-2 text-[11px] leading-[16.5px] text-graphite">
                <input type="checkbox" name="gdpr-consent" required className="mt-[2px] size-[15px] shrink-0" />
                <span>I agree to receive ARKequine news and understand I can unsubscribe at any time.</span>
              </label>
              <button type="submit" disabled={status === "submitting"} className="cursor-pointer rounded-[3px] border-0 bg-teal p-[13px] text-[12px] font-bold tracking-[0.08em] text-white uppercase transition-colors duration-250 hover:bg-teal-deep disabled:opacity-60">
                {status === "submitting" ? "Subscribing..." : "Subscribe"}
              </button>
              {status === "sent" && <p className="text-[12px] leading-[16px] text-teal">Thanks for subscribing!</p>}
              {status === "error" && <p className="text-[12px] leading-[16px] text-red-600">{errorMessage ?? "Something went wrong. Please try again."}</p>}
            </form>
          </div>
          {SUBSCRIBE.features.map((f) => (
            <div key={f.title} className="flex flex-col gap-3 border-r border-grey px-7 last:border-r-0 last:pr-0 max-[900px]:border-r-0 max-[900px]:p-0">
              <div className="flex h-11 w-[52px] items-center justify-center">
                <Image src={upload(f.icon)} alt="" width={52} height={44} className="max-h-full max-w-full object-contain" />
              </div>
              <h4 className="text-[13px] leading-[1.25] font-bold tracking-[0.08em] text-graphite uppercase">{f.title}</h4>
              <p className="text-[13px] leading-[1.5] text-[#9a9b9d]">{f.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
