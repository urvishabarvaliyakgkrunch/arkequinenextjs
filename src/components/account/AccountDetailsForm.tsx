// src/components/account/AccountDetailsForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/TextField";
import PasswordInput from "@/components/ui/PasswordInput";
import type { AuthUser } from "@/types/auth";

interface Props {
  user: AuthUser;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccountDetailsForm({ user }: Props) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [displayName, setDisplayName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";
    if (!displayName.trim()) errors.displayName = "Display name is required.";
    if (!email.trim() || !EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";

    const changingPassword = Boolean(currentPassword || newPassword || confirmPassword);
    if (changingPassword) {
      if (!currentPassword) errors.currentPassword = "Enter your current password.";
      if (!newPassword) errors.newPassword = "Enter a new password.";
      else if (newPassword.length < 8) errors.newPassword = "New password must be at least 8 characters.";
      if (newPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          displayName: displayName.trim(),
          email: email.trim(),
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormSuccess("Account details saved.");
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h2 className="mb-4 font-heading text-xl font-semibold text-ark-title">Account details</h2>

      {formError && (
        <p className="mb-4 rounded border border-[#a94442]/30 bg-[#f8d7da] px-4 py-3 text-sm text-[#a94442]">
          {formError}
        </p>
      )}
      {formSuccess && (
        <p className="mb-4 rounded border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          {formSuccess}
        </p>
      )}

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <TextField id="firstName" label="First name" value={firstName} onChange={setFirstName} error={fieldErrors.firstName} />
        <TextField id="lastName" label="Last name" value={lastName} onChange={setLastName} error={fieldErrors.lastName} />
      </div>

      <div className="mb-4">
        <TextField
          id="displayName"
          label="Display name"
          value={displayName}
          onChange={setDisplayName}
          error={fieldErrors.displayName}
          hint="This is how your name is displayed publicly."
        />
      </div>

      <div className="mb-6">
        <TextField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
        />
      </div>

      <h3 className="mb-3 font-heading text-base font-semibold text-ark-title">Password change</h3>

      <PasswordInput id="currentPassword" label="Current password" value={currentPassword} onChange={setCurrentPassword} autoComplete="current-password" error={fieldErrors.currentPassword} />
      <PasswordInput id="newPassword" label="New password" value={newPassword} onChange={setNewPassword} autoComplete="new-password" error={fieldErrors.newPassword} />
      <PasswordInput id="confirmPassword" label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" error={fieldErrors.confirmPassword} />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-[2px] bg-primary px-[15px] py-[15px] font-sans text-xs text-white transition-colors hover:bg-primary-alt disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
