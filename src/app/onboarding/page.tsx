"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { CollegePicker } from "@/components/CollegePicker";
import { YEARS } from "@/lib/constants";
import { Stethoscope, ArrowRight } from "lucide-react";
import type { StudyYear } from "@/lib/types";

export default function OnboardingPage() {
  const { user, loading, setOnboarding } = useAuth();
  const router = useRouter();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [year, setYear] = useState<StudyYear | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (!user.emailVerified) router.replace("/verify-email");
  }, [user, loading, router]);

  function handleContinue() {
    if (!collegeId || !year) return;
    setOnboarding(collegeId, year);
    router.replace("/dashboard");
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-bone px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-teal text-white">
            <Stethoscope className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <span className="font-serif text-xl font-semibold text-charcoal">
            Study Zone
          </span>
        </div>
        <div className="sz-card p-6 lg:p-8">
          <h1 className="font-serif text-2xl font-semibold text-charcoal">
            Set up your space
          </h1>
          <p className="mt-1 text-sm text-charcoal-muted">
            Select your college and current year. We&apos;ll organize everything
            around exactly that.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Your medical college
              </label>
              <CollegePicker value={collegeId} onChange={setCollegeId} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Current year / phase
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {YEARS.map((y) => (
                  <button
                    key={y.value}
                    type="button"
                    onClick={() => setYear(y.value)}
                    className={`tap-target rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                      year === y.value
                        ? "border-teal bg-teal-light font-medium text-teal-dark"
                        : "border-line bg-white text-charcoal hover:bg-bone"
                    }`}
                  >
                    {y.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!collegeId || !year}
              className="sz-btn-primary w-full"
            >
              Go to my dashboard
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
