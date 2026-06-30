"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ProgressBar, Spinner } from "@/components/ui";
import { SubjectIcon } from "@/components/SubjectIcon";
import { useAuth } from "@/lib/AuthContext";
import { useTodos } from "@/lib/useTodos";
import { fetchSubjects, fetchTopics, fetchColleges } from "@/lib/api";
import { yearLabel } from "@/lib/constants";
import { Mail, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import type { Subject, Topic } from "@/lib/types";

export default function ProfilePage() {
  return (
    <AppShell>
      <ProfileInner />
    </AppShell>
  );
}

function ProfileInner() {
  const { user } = useAuth();
  const { statusOf, ready } = useTodos();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([fetchSubjects(), fetchTopics(), fetchColleges()])
      .then(([subs, tops, colleges]) => {
        setSubjects(subs);
        setTopics(tops);
        setCollegeName(colleges.find((c) => c.id === user.collegeId)?.name ?? "");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const perSubject = useMemo(() => {
    return subjects
      .map((s) => {
        const subTopics = topics.filter((t) => t.subjectId === s.id);
        const completed = subTopics.filter((t) => statusOf(t.id) === "completed").length;
        const inProgress = subTopics.filter((t) => statusOf(t.id) === "in_progress").length;
        return { subject: s, total: subTopics.length, completed, inProgress };
      })
      .filter((x) => x.total > 0);
  }, [subjects, topics, statusOf]);

  const overall = useMemo(() => {
    const total = perSubject.reduce((a, b) => a + b.total, 0);
    const completed = perSubject.reduce((a, b) => a + b.completed, 0);
    return { total, completed };
  }, [perSubject]);

  if (loading || !ready) return <Spinner label="Loading your profile…" />;

  return (
    <div>
      <PageHeader title="Profile & progress" subtitle="Your account and study tracker." />

      {/* Account card */}
      <div className="sz-card mb-8 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-teal text-xl font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() ?? "S"}
          </span>
          <div>
            <p className="font-serif text-xl font-semibold text-charcoal">
              {user?.name}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal-muted">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" strokeWidth={1.6} />
                {user?.email}
                {user?.emailVerified && (
                  <CheckCircle2 className="h-4 w-4 text-teal" strokeWidth={1.8} />
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" strokeWidth={1.6} />
                {collegeName || "No college set"}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" strokeWidth={1.6} />
                {yearLabel(user?.currentYear)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* My Todo aggregation */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-charcoal">My study tracker</h2>
        <span className="text-sm text-charcoal-muted">
          {overall.completed}/{overall.total} topics overall
        </span>
      </div>

      {perSubject.length === 0 ? (
        <p className="text-sm text-charcoal-muted">
          Start marking topics as completed in your subjects to see progress here.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {perSubject.map(({ subject, total, completed, inProgress }) => (
            <Link
              key={subject.id}
              href={`/subject/${subject.id}`}
              className="sz-card p-4 transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-teal-light text-teal-dark">
                  <SubjectIcon name={subject.icon} className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-charcoal">{subject.name}</p>
                  <p className="text-xs text-charcoal-muted">
                    {completed} done · {inProgress} in progress · {total} total
                  </p>
                </div>
              </div>
              <ProgressBar value={completed} total={total} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
