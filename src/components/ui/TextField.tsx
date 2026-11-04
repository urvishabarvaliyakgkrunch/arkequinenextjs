// src/components/ui/TextField.tsx
interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

// Shared label+input+error markup used across the account details and address forms
export default function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
  hint,
  required,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-sans text-[15.64px] font-bold text-label">
        {label} {required && <span className="text-[#a94442]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-none border bg-white px-[6px] py-2 font-sans text-xs text-[#919191] focus:outline-none ${
          error ? "border-[#a94442]" : "border-ark-border"
        }`}
      />
      {hint && !error && <p className="mt-1 font-sans text-[13px] text-meta">{hint}</p>}
      {error && <p className="mt-1 font-sans text-[13px] text-[#a94442]">{error}</p>}
    </div>
  );
}
