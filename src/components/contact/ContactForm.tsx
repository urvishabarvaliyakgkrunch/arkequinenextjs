// src/components/contact/ContactForm.tsx
"use client";

import { useState } from "react";

// Visual-only, matches the live CF7 form (no mail backend wired yet, like other Phase-1 forms)
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="flex flex-col gap-5 font-[family-name:var(--f-body)]"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <Field label="Name" id="name" />
      <Field label="E-Mail" id="email" type="email" />
      <Field label="Subject" id="subject" />
      <Field label="Message" id="message" textarea />

      <button
        type="submit"
        className="w-fit rounded-[2px] bg-[color:var(--color-primary)] px-5 py-4 leading-[normal] font-[arial] text-[15.64px] min-w-[142px] text-white transition-colors hover:bg-[color:var(--color-secondary)]"
      >
        Submit
      </button>

      {submitted && <p className="text-[15px] text-[color:var(--color-primary)]">Thanks — we&rsquo;ll be in touch.</p>}
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  textarea = false,
}: {
  label: string;
  id: string;
  type?: string;
  textarea?: boolean;
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
    </label>
  );
}
