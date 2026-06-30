"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthLayout } from "@/components/AuthLayout";
import { Mail, Lock, User as UserIcon, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      await register(email.trim(), password, name.trim());
      router.replace("/verify-email");
    } catch (err) {
      setError((err as Error).message || "Could not create account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up with your email — we'll send a verification link. No phone OTP required."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-md bg-amber-light px-3 py-2 text-sm text-amber">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            {error}
          </div>
        )}
        <Field
          icon={<UserIcon className="h-4 w-4" strokeWidth={1.6} />}
          label="Full name"
        >
          <input
            className="sz-input pl-9"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tahmid Rahman"
            required
          />
        </Field>
        <Field icon={<Mail className="h-4 w-4" strokeWidth={1.6} />} label="Email">
          <input
            type="email"
            className="sz-input pl-9"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field icon={<Lock className="h-4 w-4" strokeWidth={1.6} />} label="Password">
          <input
            type="password"
            className="sz-input pl-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
          />
        </Field>
        <button type="submit" className="sz-btn-primary w-full" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-charcoal-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-teal hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted">
          {icon}
        </span>
        {children}
      </div>
    </label>
  );
}
