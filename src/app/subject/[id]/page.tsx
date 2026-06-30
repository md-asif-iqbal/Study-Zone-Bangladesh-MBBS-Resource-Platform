"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ProgressBar, Spinner, StatusToggle } from "@/components/ui";
import { ResourceHub } from "@/components/ResourceHub";
import { SubjectIcon } from "@/components/SubjectIcon";
import { useAuth } from "@/lib/AuthContext";
import { useTodos } from "@/lib/useTodos";
import { fetchSubjects, fetchTopics } from "@/lib/api";
import { Sparkles, ArrowLeft } from "lucide-react";
import type { Subject, Topic } from "@/lib/types";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <AppShell>
      <SubjectInner subjectId={id} />
    </AppShell>
  );
}

function SubjectInner({ subjectId }: { subjectId: string }) {
  const { user } = useAuth();
  const { statusOf, cycleStatus, ready } = useTodos();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([fetchSubjects(), fetchTopics(subjectId)])
      .then(([subs, tops]) => {
        if (!active) return;
        setSubject(subs.find((s) => s.id === subjectId) ?? null);
        setTopics(tops);
        setSelectedTopic(tops[0]?.id ?? null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [subjectId]);

  const completed = useMemo(
    () => topics.filter((t) => statusOf(t.id) === "completed").length,
    [topics, statusOf]
  );

  if (loading || !ready) return <Spinner label="Loading subject…" />;

  if (!subject) {
    return (
      <div>
        <Link
          href="/subjects"
          className="mb-4 inline-flex items-center gap-1 text-sm text-teal hover:underline"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} /> Back to subjects
        </Link>
        <p className="text-charcoal-muted">Subject not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/subjects"
        className="mb-4 inline-flex items-center gap-1 text-sm text-teal hover:underline"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} /> All subjects
      </Link>

      <PageHeader
        title={subject.name}
        subtitle={`${completed}/${topics.length} topics completed — tap the circle on a topic to update your progress.`}
        action={
          <div className="w-40">
            <ProgressBar value={completed} total={topics.length} />
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* Topic list */}
        <aside>
          <div className="sz-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line bg-bone px-4 py-3">
              <SubjectIcon name={subject.icon} className="h-4 w-4 text-teal-dark" />
              <span className="text-sm font-medium text-charcoal">Topics</span>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto">
              {topics.map((t) => {
                const status = statusOf(t.id);
                const active = selectedTopic === t.id;
                return (
                  <li
                    key={t.id}
                    className={`flex items-center gap-2 border-b border-line px-3 py-2 last:border-0 ${
                      active ? "bg-teal-light/60" : ""
                    }`}
                  >
                    <StatusToggle
                      status={status}
                      onClick={() => cycleStatus(t.id, subject.id)}
                    />
                    <button
                      onClick={() => setSelectedTopic(t.id)}
                      className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                    >
                      <span
                        className={`truncate text-sm ${
                          status === "completed"
                            ? "text-charcoal-muted line-through"
                            : "text-charcoal"
                        }`}
                      >
                        {t.name}
                      </span>
                      {t.highYield && (
                        <Sparkles
                          className="h-3.5 w-3.5 shrink-0 text-amber"
                          strokeWidth={1.8}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-2 flex items-center gap-1 px-1 text-xs text-charcoal-muted">
            <Sparkles className="h-3.5 w-3.5 text-amber" strokeWidth={1.8} />
            High-yield topic for professional exams
          </p>
        </aside>

        {/* Resource hub for selected topic */}
        <section>
          {selectedTopic ? (
            <ResourceHub
              key={selectedTopic}
              topicId={selectedTopic}
              collegeId={user?.collegeId ?? null}
            />
          ) : (
            <p className="text-sm text-charcoal-muted">
              Select a topic to see its resources.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
