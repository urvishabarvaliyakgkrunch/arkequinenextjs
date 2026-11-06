// src/components/product/EnquiryField.tsx
"use client";

import { useState } from "react";

// Same look as the live site's enquiry popup: the label sits inside the box and lifts onto the border when focused or filled
const BOX = "m-0 block w-full rounded-[3px] border bg-white px-3 text-[13px] leading-[30px] text-[#222] outline-none";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  textarea?: boolean;
}

export default function EnquiryField({ id, label, value, onChange, error, required, textarea }: Props) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value !== "";
  const border = error ? "border-[1.3px] border-red-600" : focused ? "border-[#999]" : "border-[#ddd]";
  const common = {
    id,
    value,
    "aria-invalid": Boolean(error),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div className="relative my-[15px]">
      <label
        htmlFor={id}
        className={`absolute z-[1] cursor-text leading-none text-[#9E9E9E] transition-all duration-200 ease-in-out ${
          lifted ? "-top-[10px] left-3 border border-[#ddd] bg-white px-[6px] py-[3px] text-[11px]" : "top-[8px] left-0 px-[6px] py-[3px] text-[13px]"
        } ${textarea && !lifted ? "top-[8px]" : ""}`}
      >
        {required && "* "}
        {label}
      </label>
      {textarea ? (
        <textarea {...common} rows={2} onChange={(e) => onChange(e.target.value)} className={`${BOX} ${border} resize-none py-[2px]`} />
      ) : (
        <input {...common} type="text" onChange={(e) => onChange(e.target.value)} className={`${BOX} ${border} py-[5px]`} />
      )}
      {error && <div role="alert" className="mt-[5px] text-[13px] text-red-600">{error}</div>}
    </div>
  );
}
