"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Spinner, EmptyState } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { fetchExamRoutines, fetchColleges } from "@/lib/api";
import { yearLabel } from "@/lib/constants";
import { CalendarDays } from "lucide-react";
import type { ExamRoutine } from "@/lib/types";

export default function ExamRoutinePage() {
  return (
    <AppShell>
      <ExamRoutineInner />
    </AppShell>
  );
}

function ExamRoutineInner() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState<ExamRoutine[]>([]);
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetchExamRoutines(user.collegeId ?? undefined, user.currentYear ?? undefined),
      fetchColleges(),
    ])
      .then(([rts, colleges]) => {
        setRoutines(rts);
        setCollegeName(colleges.find((c) => c.id === user.collegeId)?.name ?? "");
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Spinner label="Loading exam routine…" />;

  return (
    <div>
      <PageHeader
        title="Exam routine"
        subtitle={`${collegeName} · ${yearLabel(user?.currentYear)}`}
      />
      {routines.length === 0 ? (
        <EmptyState
          title="No exam routine added yet"
          hint="Your college's exam routine will appear here once it's added by a moderator or contributor."
        />
      ) : (
        <ol className="relative space-y-4 border-l border-line pl-6">
          {routines.map((r) => {
            const d = Math.ceil(
              (new Date(r.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            return (
              <li key={r.id} className="relative">
                <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full bg-teal text-white">
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
                <div className="sz-card flex flex-wrap items-center justify-between gap-2 p-4">
                  <div>
                    <p className="font-medium text-charcoal">{r.examName}</p>
                    <p className="text-sm text-charcoal-muted">
                      {new Date(r.date).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`sz-badge ${
                      d < 0
                        ? "bg-bone-dark text-charcoal-muted"
                        : d <= 7
                          ? "bg-amber-light text-amber"
                          : "bg-teal-light text-teal-dark"
                    }`}
                  >
                    {d < 0 ? "Completed" : d === 0 ? "Today" : `In ${d} days`}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
