"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ProgressBar, Spinner } from "@/components/ui";
import { SubjectIcon } from "@/components/SubjectIcon";
import { useAuth } from "@/lib/AuthContext";
import { useTodos } from "@/lib/useTodos";
import {
  fetchSubjects,
  fetchTopics,
  fetchExamRoutines,
  fetchColleges,
} from "@/lib/api";
import { yearLabel } from "@/lib/constants";
import type { ExamRoutine, Subject, Topic } from "@/lib/types";
import {
  CalendarDays,
  ListChecks,
  Upload,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardInner />
    </AppShell>
  );
}

function DashboardInner() {
  const { user } = useAuth();
  const { statusOf, ready } = useTodos();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [routines, setRoutines] = useState<ExamRoutine[]>([]);
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.currentYear) return;
    let active = true;
    setLoading(true);
    Promise.all([
      fetchSubjects(user.currentYear),
      fetchTopics(),
      fetchExamRoutines(user.collegeId ?? undefined, user.currentYear),
      fetchColleges(),
    ])
      .then(([subs, tops, rts, colleges]) => {
        if (!active) return;
        setSubjects(subs);
        setTopics(tops);
        setRoutines(rts);
        setCollegeName(colleges.find((c) => c.id === user.collegeId)?.name ?? "");
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [user?.currentYear, user?.collegeId]);

  const subjectProgress = useMemo(() => {
    return subjects.map((s) => {
      const subTopics = topics.filter((t) => t.subjectId === s.id);
      const completed = subTopics.filter(
        (t) => statusOf(t.id) === "completed"
      ).length;
      return { subject: s, total: subTopics.length, completed };
    });
  }, [subjects, topics, statusOf]);

  const nextExam = routines[0];
  const daysToExam = nextExam
    ? Math.ceil(
        (new Date(nextExam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  // Exam-proximity reminder: any subject < 70% complete with < 14 days left.
  const reminder = useMemo(() => {
    if (daysToExam === null || daysToExam > 14 || daysToExam < 0) return null;
    const weak = subjectProgress.find(
      (sp) => sp.total > 0 && sp.completed / sp.total < 0.7
    );
    return weak ? { exam: nextExam, weak } : null;
  }, [daysToExam, subjectProgress, nextExam]);

  if (loading || !ready) {
    return <Spinner label="Loading your dashboard…" />;
  }

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0] ?? "Student"}`}
        subtitle={`${collegeName}${collegeName ? " · " : ""}${yearLabel(
          user?.currentYear
        )}`}
      />

      {reminder && (
        <div className="mb-6 flex items-start gap-3 rounded-card border border-amber/40 bg-amber-light px-4 py-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber" strokeWidth={1.8} />
          <div className="text-sm text-charcoal">
            <span className="font-medium">{reminder.exam.examName}</span> is in{" "}
            <span className="font-medium">{daysToExam} days</span>, and your{" "}
            <span className="font-medium">{reminder.weak.subject.name}</span>{" "}
            progress is {reminder.weak.completed}/{reminder.weak.total}. Consider
            prioritizing it.
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <QuickAction
          href="/mcq"
          icon={<ListChecks className="h-5 w-5" strokeWidth={1.6} />}
          title="Practice MCQs"
          desc="Topic-tagged questions with explanations"
        />
        <QuickAction
          href="/exam-routine"
          icon={<CalendarDays className="h-5 w-5" strokeWidth={1.6} />}
          title="Exam Routine"
          desc="Your college's upcoming exams"
        />
        <QuickAction
          href="/contribute"
          icon={<Upload className="h-5 w-5" strokeWidth={1.6} />}
          title="Contribute"
          desc="Share notes & previous questions"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Subjects + progress */}
        <section className="xl:col-span-2">
          <h2 className="mb-3 font-serif text-xl font-semibold text-charcoal">
            Your subjects
          </h2>
          {subjectProgress.length === 0 ? (
            <p className="text-sm text-charcoal-muted">
              No subjects found for this year yet.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {subjectProgress.map(({ subject, total, completed }) => (
                <Link
                  key={subject.id}
                  href={`/subject/${subject.id}`}
                  className="sz-card p-4 transition-shadow hover:shadow-card-hover"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal-light text-teal-dark">
                      <SubjectIcon name={subject.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-charcoal">
                        {subject.name}
                      </p>
                      <p className="text-xs text-charcoal-muted">
                        {completed}/{total} topics completed
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={completed} total={total} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming exams */}
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-charcoal">
            Upcoming exams
          </h2>
          {routines.length === 0 ? (
            <div className="sz-card p-4 text-sm text-charcoal-muted">
              No exam routine added for your college yet.
            </div>
          ) : (
            <ul className="space-y-2">
              {routines.map((r) => {
                const d = Math.ceil(
                  (new Date(r.date).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                );
                return (
                  <li key={r.id} className="sz-card flex items-center justify-between p-3">
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {r.examName}
                      </p>
                      <p className="text-xs text-charcoal-muted">{r.date}</p>
                    </div>
                    <span
                      className={`sz-badge ${
                        d <= 7 ? "bg-amber-light text-amber" : "bg-teal-light text-teal-dark"
                      }`}
                    >
                      {d < 0 ? "Past" : d === 0 ? "Today" : `${d} days`}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <Link
            href="/subjects"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
          >
            Browse all subjects
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </section>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="sz-card flex items-center gap-3 p-4 transition-shadow hover:shadow-card-hover"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal text-white">
        {icon}
      </span>
      <div>
        <p className="font-medium text-charcoal">{title}</p>
        <p className="text-xs text-charcoal-muted">{desc}</p>
      </div>
    </Link>
  );
}
