"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthLayout } from "@/components/AuthLayout";
import { MailCheck, RefreshCw, CheckCircle2, Info } from "lucide-react";

export default function VerifyEmailPage() {
  const {
    user,
    loading,
    mockMode,
    resendVerification,
    refreshVerification,
    simulateVerify,
  } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.emailVerified) {
      router.replace(user.collegeId ? "/dashboard" : "/onboarding");
    }
  }, [user, loading, router]);

  async function handleCheck() {
    setBusy(true);
    setMessage("");
    const verified = await refreshVerification();
    setBusy(false);
    if (verified) {
      router.replace(user?.collegeId ? "/dashboard" : "/onboarding");
    } else {
      setMessage("Not verified yet. Please click the link in your email, then try again.");
    }
  }

  async function handleResend() {
    setBusy(true);
    setMessage("");
    await resendVerification();
    setBusy(false);
    setMessage("Verification email sent. Check your inbox (and spam folder).");
  }

  async function handleSimulate() {
    await simulateVerify();
    router.replace("/onboarding");
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We need to confirm your email before you can access your dashboard."
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-md bg-teal-light px-4 py-3">
          <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-dark" strokeWidth={1.6} />
          <div className="text-sm text-charcoal">
            A verification link was sent to{" "}
            <span className="font-medium">{user?.email}</span>. Open it, then come
            back and continue.
          </div>
        </div>

        {message && (
          <div className="flex items-start gap-2 rounded-md bg-bone-dark px-3 py-2 text-sm text-charcoal">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-muted" strokeWidth={1.8} />
            {message}
          </div>
        )}

        <button onClick={handleCheck} className="sz-btn-primary w-full" disabled={busy}>
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
          {busy ? "Checking…" : "I've verified — continue"}
        </button>

        {!mockMode && (
          <button
            onClick={handleResend}
            className="sz-btn-secondary w-full"
            disabled={busy}
          >
            <RefreshCw className="h-4 w-4" strokeWidth={1.8} />
            Resend verification email
          </button>
        )}

        {mockMode && (
          <div className="rounded-md border border-dashed border-line bg-bone px-4 py-3 text-sm text-charcoal-muted">
            <p className="mb-2">
              <span className="font-medium text-charcoal">Preview mode:</span>{" "}
              Firebase isn&apos;t configured, so no real email is sent. Use the
              button below to simulate clicking the verification link.
            </p>
            <button onClick={handleSimulate} className="sz-btn-amber w-full">
              Simulate email verification
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
