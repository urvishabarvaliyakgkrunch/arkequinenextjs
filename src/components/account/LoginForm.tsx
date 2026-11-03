// src/components/account/LoginForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FieldErrors {
  username?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      errors.username = "Username or email address is required.";
    } else if (trimmedUsername.includes("@") && !EMAIL_RE.test(trimmedUsername)) {
      errors.username = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password, rememberMe }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-[450px] rounded-[5px] border border-ark-border bg-white p-5">
      <h2 className="mb-[10px] font-heading text-[28px] font-semibold text-ark-title">Login</h2>

      {formError && (
        <p className="mb-4 rounded border border-[#a94442]/30 bg-[#f8d7da] px-4 py-3 text-sm text-[#a94442]">
          {formError}
        </p>
      )}

      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="mb-1 block font-sans text-[15.64px] font-bold text-label">
            Username or email address <span className="text-[#a94442]">*</span>
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFieldErrors((prev) => ({ ...prev, username: undefined }));
            }}
            className={`w-full rounded-none border bg-white px-[6px] py-2 font-sans text-xs text-[#919191] focus:outline-none ${
              fieldErrors.username ? "border-[#a94442]" : "border-ark-border"
            }`}
          />
          {fieldErrors.username && (
            <p className="mt-1 font-sans text-[13px] text-[#a94442]">{fieldErrors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block font-sans text-[15.64px] font-bold text-label">
            Password <span className="text-[#a94442]">*</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className={`w-full rounded-none border bg-white px-[6px] py-2 font-sans text-xs text-[#919191] focus:outline-none ${
              fieldErrors.password ? "border-[#a94442]" : "border-ark-border"
            }`}
          />
          {fieldErrors.password && (
            <p className="mt-1 font-sans text-[13px] text-[#a94442]">{fieldErrors.password}</p>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="flex items-center gap-2 font-sans text-sm text-ark-btn-text">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-[2px] bg-primary px-[15px] py-[15px] font-sans text-xs text-white transition-colors hover:bg-primary-alt disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </div>

        <p className="font-sans text-[15.64px]">
          <a
            href={`${process.env.NEXT_PUBLIC_WP_URL}/my-account/lost-password/`}
            className="text-primary hover:underline"
          >
            Lost your password?
          </a>
        </p>
      </form>
    </div>
  );
}
