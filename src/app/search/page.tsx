"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Spinner } from "@/components/ui";
import { fetchSubjects, fetchTopics, fetchResources, fetchMcqs } from "@/lib/api";
import { Search as SearchIcon, FileText, BookOpen, ListChecks } from "lucide-react";
import type { MCQ, Resource, Subject, Topic } from "@/lib/types";

export default function SearchPage() {
  return (
    <AppShell>
      <SearchInner />
    </AppShell>
  );
}

function SearchInner() {
  const [query, setQuery] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchSubjects(),
      fetchTopics(),
      fetchResources(),
      fetchMcqs(),
    ])
      .then(([s, t, r, m]) => {
        setSubjects(s);
        setTopics(t);
        setResources(r);
        setMcqs(m);
      })
      .finally(() => setLoading(false));
  }, []);

  const q = query.trim().toLowerCase();

  const subjectName = (id: string) => subjects.find((s) => s.id === id)?.name ?? "";
  const topicSubject = (topicId: string) => {
    const t = topics.find((x) => x.id === topicId);
    return t ? subjectName(t.subjectId) : "";
  };

  const results = useMemo(() => {
    if (!q)
      return { topics: [], resources: [], mcqs: [] } as {
        topics: Topic[];
        resources: Resource[];
        mcqs: MCQ[];
      };
    return {
      topics: topics.filter((t) => t.name.toLowerCase().includes(q)),
      resources: resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false)
      ),
      mcqs: mcqs.filter((m) => m.question.toLowerCase().includes(q)),
    };
  }, [q, topics, resources, mcqs]);

  const totalCount =
    results.topics.length + results.resources.length + results.mcqs.length;

  return (
    <div>
      <PageHeader
        title="Search everything"
        subtitle="One search across topics, notes, previous questions, guides and MCQs."
      />

      <div className="relative mb-6 max-w-2xl">
        <SearchIcon
          className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-muted"
          strokeWidth={1.6}
        />
        <input
          autoFocus
          className="sz-input py-3 pl-11 text-base"
          placeholder="Search topics, notes, questions, MCQs…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : !q ? (
        <p className="text-sm text-charcoal-muted">
          Start typing to search across all content.
        </p>
      ) : totalCount === 0 ? (
        <p className="text-sm text-charcoal-muted">No results for “{query}”.</p>
      ) : (
        <div className="space-y-8">
          {results.topics.length > 0 && (
            <ResultGroup icon={<BookOpen className="h-4 w-4" strokeWidth={1.6} />} label={`Topics (${results.topics.length})`}>
              {results.topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/subject/${t.subjectId}`}
                  className="sz-card block p-3 text-sm transition-shadow hover:shadow-card-hover"
                >
                  <span className="font-medium text-charcoal">{t.name}</span>
                  <span className="ml-2 text-charcoal-muted">{subjectName(t.subjectId)}</span>
                </Link>
              ))}
            </ResultGroup>
          )}

          {results.resources.length > 0 && (
            <ResultGroup icon={<FileText className="h-4 w-4" strokeWidth={1.6} />} label={`Resources (${results.resources.length})`}>
              {results.resources.map((r) => (
                <div key={r.id} className="sz-card p-3 text-sm">
                  <span className="font-medium text-charcoal">{r.title}</span>
                  {r.description && (
                    <p className="mt-0.5 text-charcoal-muted">{r.description}</p>
                  )}
                  <span className="mt-1 block text-xs text-charcoal-muted">
                    {topicSubject(r.topicId)} · {r.type.replace("_", " ")}
                  </span>
                </div>
              ))}
            </ResultGroup>
          )}

          {results.mcqs.length > 0 && (
            <ResultGroup icon={<ListChecks className="h-4 w-4" strokeWidth={1.6} />} label={`MCQs (${results.mcqs.length})`}>
              {results.mcqs.map((m) => (
                <Link
                  key={m.id}
                  href={`/mcq?topicId=${m.topicId}`}
                  className="sz-card block p-3 text-sm transition-shadow hover:shadow-card-hover"
                >
                  <span className="text-charcoal">{m.question}</span>
                  <span className="mt-1 block text-xs text-charcoal-muted">
                    {topicSubject(m.topicId)}
                  </span>
                </Link>
              ))}
            </ResultGroup>
          )}
        </div>
      )}
    </div>
  );
}

function ResultGroup({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-sm font-medium text-charcoal-muted">
        {icon}
        {label}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
