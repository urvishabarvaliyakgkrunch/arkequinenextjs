// src/components/product/EnquiryModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import EnquiryField from "@/components/product/EnquiryField";
import { sendEnquiry, validateEnquiry } from "@/lib/enquiry";
import type { EnquiryErrors } from "@/types/enquiry";

interface Props {
  open: boolean;
  onClose: () => void;
  product: { databaseId: number; name: string; slug: string };
}

const EMPTY = { name: "", email: "", subject: "", message: "", consent: false };

export default function EnquiryModal({ open, onClose, product }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sending, setSending] = useState(false);
  // Set after the send: the plugin's own reply text, or a failure message
  const [result, setResult] = useState<{ text: string; ok: boolean } | null>(null);

  // Native <dialog> gives focus trap, Esc to close and the dimmed backdrop for free
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const set = (key: keyof typeof EMPTY) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    try {
      const text = await sendEnquiry({
        ...form,
        productId: product.databaseId,
        productName: product.name,
        productSlug: product.slug,
      });
      setResult({ text, ok: true });
      setForm(EMPTY);
    } catch (err) {
      setResult({ text: err instanceof Error ? err.message : "Could not send your enquiry.", ok: false });
    } finally {
      setSending(false);
    }
  }

  function close() {
    setResult(null);
    setErrors({});
    onClose();
  }

  return (
    <dialog
      ref={dialog}
      onClose={close}
      onClick={(e) => e.target === dialog.current && close()}
      className="m-auto w-[min(calc(100vw-20px),480px)] overflow-hidden rounded-[20px] border-0 bg-[#eee] p-0 font-[Verdana,Arial,sans-serif] text-[#222] backdrop:bg-black/70"
    >
      <div className="relative bg-[#2196F3] px-6 py-[10px] pr-14 text-white">
        <h2 className="m-0 text-[20px] leading-[1.4] font-bold">Enquiry for {product.name}</h2>
        <button type="button" aria-label="Close" onClick={close} className="absolute top-1/2 right-4 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[26px] leading-none text-black">
          &times;
        </button>
      </div>

      <div className="max-h-[570px] overflow-y-auto px-6 py-2">
        {result ? (
          <div role="status" className="py-4">
            <p className={`mb-4 text-[14px] ${result.ok ? "text-[#222]" : "text-red-600"}`}>{result.text}</p>
            <button type="button" onClick={close} className="cursor-pointer rounded-[2px] border-0 bg-primary px-5 py-[5px] text-[13px] font-bold text-white hover:bg-secondary">
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <EnquiryField id="enq-name" label="Name" required value={form.name} onChange={set("name")} error={errors.name} />
            <EnquiryField id="enq-email" label="Email" required value={form.email} onChange={set("email")} error={errors.email} />
            <EnquiryField id="enq-subject" label="Subject" value={form.subject} onChange={set("subject")} />
            <EnquiryField id="enq-message" label="Enquiry" required textarea value={form.message} onChange={set("message")} error={errors.message} />

            <label className="mb-[10px] flex items-start gap-2 text-[13px] leading-[2.2]">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-[13px]" />
              <span>
                I allow the Site owner to contact me via email/phone to discuss this enquiry. (If you want to know more about the way this site handles the data, then please go through our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0000ee] underline">privacy policy</a>).
              </span>
            </label>
            {errors.consent && <div role="alert" className="mb-2 text-[13px] text-red-600">{errors.consent}</div>}

            <div className="border-b border-[#cecece] pb-[15px]">
              <button type="submit" disabled={sending} className="cursor-pointer rounded-[2px] border-0 bg-primary px-5 py-[5px] text-[15px] font-bold text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-70">
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
