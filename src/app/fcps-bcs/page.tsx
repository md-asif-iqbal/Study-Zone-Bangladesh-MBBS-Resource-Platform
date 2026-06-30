"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { GraduationCap, ListChecks, ArrowRight, FileText } from "lucide-react";

const TRACKS = [
  {
    title: "FCPS Part 1",
    body: "For interns and post-internship doctors. Basic subjects (Anatomy, Physiology, Biochemistry, Pathology, Pharmacology) tested at depth.",
    points: ["Subject-wise high-yield revision", "Past paper MCQ drills", "Timed mock tests"],
  },
  {
    title: "BCS (Health)",
    body: "For graduates entering the cadre service. Combines medical subjects with general BCS preliminary topics.",
    points: ["Medical science MCQs", "General knowledge & current affairs", "Exam strategy notes"],
  },
];

export default function FcpsBcsPage() {
  return (
    <AppShell>
      <PageHeader
        title="FCPS / BCS Prep Corner"
        subtitle="A dedicated space for high-stakes competitive exams after MBBS."
      />
      <div className="mb-6 flex items-start gap-3 rounded-card border border-line bg-white px-4 py-3 text-sm text-charcoal-muted">
        <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={1.6} />
        <p>
          Best used in your internship and post-internship phase. The MCQ engine
          below already supports timed practice — dedicated FCPS/BCS question banks
          are being added by senior contributors.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {TRACKS.map((t) => (
          <div key={t.title} className="sz-card p-5">
            <h3 className="font-serif text-lg font-semibold text-charcoal">{t.title}</h3>
            <p className="mt-1 text-sm text-charcoal-muted">{t.body}</p>
            <ul className="mt-3 space-y-1.5">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-charcoal">
                  <FileText className="h-4 w-4 text-teal" strokeWidth={1.6} />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/mcq" className="sz-btn-secondary mt-4">
              <ListChecks className="h-4 w-4" strokeWidth={1.8} />
              Start MCQ practice
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
