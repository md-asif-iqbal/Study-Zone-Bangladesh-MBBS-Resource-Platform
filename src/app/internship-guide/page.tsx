"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { Building2, Clock, Stethoscope } from "lucide-react";

const HOSPITALS = [
  {
    name: "Dhaka Medical College Hospital",
    location: "Dhaka",
    departments: ["Medicine", "Surgery", "Gynae & Obs", "Paediatrics", "Casualty"],
    note: "Very high patient load; excellent for hands-on procedures and emergency exposure.",
  },
  {
    name: "Chittagong Medical College Hospital",
    location: "Chattogram",
    departments: ["Medicine", "Surgery", "Orthopaedics", "Gynae & Obs"],
    note: "Major tertiary referral centre for the southeast; strong trauma and surgical caseload.",
  },
  {
    name: "Sir Salimullah Medical College Mitford Hospital",
    location: "Dhaka",
    departments: ["Medicine", "Surgery", "ENT", "Gynae & Obs"],
    note: "Old-city catchment; busy outpatient and emergency departments.",
  },
];

const ROTATION_TIPS = [
  "Each placement typically runs 1–2 months across Medicine, Surgery, Gynae & Obs and Paediatrics.",
  "Keep a pocket notebook of common ward drugs, doses and emergency protocols.",
  "Maintain your logbook daily — it is required for registration.",
  "Learn cannulation, catheterization and basic suturing early in your first placement.",
];

export default function InternshipGuidePage() {
  return (
    <AppShell>
      <PageHeader
        title="Internship Hospital Guide"
        subtitle="What to expect during your internship rotations across major teaching hospitals."
      />

      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
          <Clock className="h-5 w-5 text-teal" strokeWidth={1.6} />
          Rotation basics
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ROTATION_TIPS.map((t) => (
            <li key={t} className="sz-card flex items-start gap-2 p-3 text-sm text-charcoal">
              <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={1.6} />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
          <Building2 className="h-5 w-5 text-teal" strokeWidth={1.6} />
          Teaching hospitals
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {HOSPITALS.map((h) => (
            <div key={h.name} className="sz-card p-5">
              <h3 className="font-medium text-charcoal">{h.name}</h3>
              <p className="text-xs text-charcoal-muted">{h.location}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {h.departments.map((d) => (
                  <span key={d} className="sz-badge bg-bone-dark text-charcoal">
                    {d}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-charcoal-muted">{h.note}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
