"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Spinner } from "@/components/ui";
import { SubjectIcon } from "@/components/SubjectIcon";
import { fetchSubjects } from "@/lib/api";
import { YEARS } from "@/lib/constants";
import { useAuth } from "@/lib/AuthContext";
import type { Subject } from "@/lib/types";

export default function SubjectsPage() {
  return (
    <AppShell>
      <SubjectsInner />
    </AppShell>
  );
}

function SubjectsInner() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects()
      .then(setSubjects)
      .finally(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => {
    return YEARS.map((y) => ({
      year: y,
      subjects: subjects.filter((s) => s.year === y.value),
    })).filter((g) => g.subjects.length > 0);
  }, [subjects]);

  if (loading) return <Spinner label="Loading subjects…" />;

  return (
    <div>
      <PageHeader
        title="All subjects"
        subtitle="Browse the full BMDC curriculum. Your current year is highlighted."
      />
      <div className="space-y-8">
        {grouped.map(({ year, subjects: subs }) => (
          <section key={year.value}>
            <div className="mb-3 flex items-center gap-2">
              <h2 className="font-serif text-lg font-semibold text-charcoal">
                {year.label}
              </h2>
              {user?.currentYear === year.value && (
                <span className="sz-badge bg-teal-light text-teal-dark">
                  Your year
                </span>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {subs.map((s) => (
                <Link
                  key={s.id}
                  href={`/subject/${s.id}`}
                  className="sz-card flex items-center gap-3 p-4 transition-shadow hover:shadow-card-hover"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal-light text-teal-dark">
                    <SubjectIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-charcoal">{s.name}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
