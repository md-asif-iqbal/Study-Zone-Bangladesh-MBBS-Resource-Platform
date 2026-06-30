"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthLayout } from "@/components/AuthLayout";
import { Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, refreshVerification } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
      const verified = await refreshVerification();
      router.replace(verified ? "/dashboard" : "/verify-email");
    } catch (err) {
      setError((err as Error).message || "Could not log in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your Study Zone account.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-md bg-amber-light px-3 py-2 text-sm text-amber">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            {error}
          </div>
        )}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">Email</span>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted"
              strokeWidth={1.6}
            />
            <input
              type="email"
              className="sz-input pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">
            Password
          </span>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted"
              strokeWidth={1.6}
            />
            <input
              type="password"
              className="sz-input pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>
        </label>
        <button type="submit" className="sz-btn-primary w-full" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-charcoal-muted">
        New here?{" "}
        <Link href="/register" className="font-medium text-teal hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
