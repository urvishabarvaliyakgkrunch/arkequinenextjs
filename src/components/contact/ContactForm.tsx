// src/components/contact/ContactForm.tsx
"use client";

import { useState } from "react";

const CF7_FORM_ID = process.env.NEXT_PUBLIC_CF7_CONTACT_FORM_ID;
const WP_URL = process.env.NEXT_PUBLIC_WP_URL;

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});

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

        const errors: Record<string, string> = {};
        for (const invalid of json.invalid_fields ?? []) {
          errors[invalid.field] = invalid.message;
        }
        setFieldErrors(errors);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="flex flex-col gap-5 font-[family-name:var(--f-body)]"
      onSubmit={handleSubmit}
    >
      <Field label="Name" id="f-name" error={fieldErrors["f-name"]} />
      <Field label="E-Mail" id="E-Mail" type="email" error={fieldErrors["E-Mail"]} />
      <Field label="Subject" id="subject" error={fieldErrors["subject"]} />
      <Field label="Message" id="message" textarea error={fieldErrors["message"]} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit rounded-[2px] bg-[color:var(--color-primary)] px-5 py-4 leading-[normal] font-[arial] text-[15.64px] min-w-[142px] text-white transition-colors hover:bg-[color:var(--color-secondary)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>

      {status === "sent" && (
        <p className="text-[15px] text-[color:var(--color-primary)]">Thanks — we&rsquo;ll be in touch.</p>
      )}
      {status === "error" && Object.keys(fieldErrors).length === 0 && (
        <p className="text-[15px] text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  textarea = false,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  textarea?: boolean;
  error?: string;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-[15.64px] font-bold text-[color:var(--color-body)]">
      <span>
        {label} <span className="text-[color:var(--color-primary)]">*</span>
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required
          rows={6}
          className="rounded-[2px] border border-[color:var(--color-border)] p-[13px] text-[17px] font-normal text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-primary)]"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          className="rounded-[2px] border border-[color:var(--color-border)] p-[13px] text-[17px] font-normal text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-primary)]"
        />
      )}
      {error && <span className="text-[13px] font-normal text-red-600">{error}</span>}
    </label>
  );
}
