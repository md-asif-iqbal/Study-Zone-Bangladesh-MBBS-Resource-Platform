"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Spinner, EmptyState } from "@/components/ui";
import { fetchMcqs, fetchSubjects } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy } from "lucide-react";
import type { MCQ, Subject } from "@/lib/types";

export default function McqPage() {
  return (
    <AppShell>
      <Suspense fallback={<Spinner />}>
        <McqInner />
      </Suspense>
    </AppShell>
  );
}

function McqInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId") ?? undefined;

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState<string>("");
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);

  // session state
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!user?.currentYear) return;
    fetchSubjects(user.currentYear).then((subs) => {
      setSubjects(subs);
      if (!topicId && subs[0]) setSubjectId((prev) => prev || subs[0].id);
    });
  }, [user?.currentYear, topicId]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchMcqs(topicId ? undefined : subjectId || undefined, topicId)
      .then((list) => {
        if (!active) return;
        setMcqs(list);
        resetSession();
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, topicId]);

  function resetSession() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  }

  const current = mcqs[index];

  function choose(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    setAnswered((a) => a + 1);
    if (current && i === current.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= mcqs.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const accuracy = useMemo(
    () => (answered > 0 ? Math.round((score / answered) * 100) : 0),
    [score, answered]
  );

  return (
    <div>
      <PageHeader
        title="MCQ Practice Center"
        subtitle="Answer, get instant feedback with an explanation, and track your session score."
      />

      {!topicId && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-charcoal-muted">Subject:</span>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubjectId(s.id)}
              className={`tap-target rounded-full border px-3 py-1.5 text-sm transition-colors ${
                subjectId === s.id
                  ? "border-teal bg-teal-light font-medium text-teal-dark"
                  : "border-line bg-white text-charcoal hover:bg-bone"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Score bar */}
      <div className="mb-4 flex items-center justify-between rounded-card border border-line bg-white px-4 py-3 text-sm">
        <span className="text-charcoal-muted">
          Question{" "}
          <span className="font-medium text-charcoal">
            {Math.min(index + 1, mcqs.length || 1)}
          </span>{" "}
          of {mcqs.length}
        </span>
        <span className="flex items-center gap-1.5 text-charcoal">
          <Trophy className="h-4 w-4 text-amber" strokeWidth={1.8} />
          Score: <span className="font-medium">{score}</span> / {answered} ({accuracy}%)
        </span>
      </div>

      {loading ? (
        <Spinner />
      ) : mcqs.length === 0 ? (
        <EmptyState
          title="No MCQs available here yet"
          hint="Try another subject, or contribute MCQs for this topic."
        />
      ) : finished ? (
        <div className="sz-card p-8 text-center">
          <Trophy className="mx-auto h-10 w-10 text-amber" strokeWidth={1.4} />
          <h3 className="mt-3 font-serif text-2xl font-semibold text-charcoal">
            Session complete
          </h3>
          <p className="mt-1 text-charcoal-muted">
            You scored <span className="font-medium text-charcoal">{score}</span> out of{" "}
            {mcqs.length} ({Math.round((score / mcqs.length) * 100)}%).
          </p>
          <button onClick={resetSession} className="sz-btn-primary mx-auto mt-5">
            <RotateCcw className="h-4 w-4" strokeWidth={1.8} />
            Practice again
          </button>
        </div>
      ) : (
        current && (
          <div className="sz-card p-5 lg:p-6">
            <p className="font-serif text-lg font-medium text-charcoal">
              {current.question}
            </p>
            <div className="mt-4 space-y-2.5">
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correctIndex;
                const isChosen = i === selected;
                let cls =
                  "border-line bg-white text-charcoal hover:border-teal hover:bg-bone";
                if (revealed && isCorrect)
                  cls = "border-teal bg-teal-light text-teal-dark";
                else if (revealed && isChosen && !isCorrect)
                  cls = "border-alert/40 bg-alert/10 text-alert";
                else if (revealed) cls = "border-line bg-white text-charcoal-muted";
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={`tap-target flex w-full items-center justify-between gap-2 rounded-md border px-4 py-3 text-left text-sm transition-colors ${cls}`}
                  >
                    <span>{opt}</span>
                    {revealed && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" strokeWidth={1.8} />
                    )}
                    {revealed && isChosen && !isCorrect && (
                      <XCircle className="h-5 w-5 shrink-0 text-alert" strokeWidth={1.8} />
                    )}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="mt-4 rounded-md bg-bone px-4 py-3">
                <p className="text-sm font-medium text-charcoal">Explanation</p>
                <p className="mt-1 text-sm text-charcoal-muted">{current.explanation}</p>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={next}
                disabled={!revealed}
                className="sz-btn-primary"
              >
                {index + 1 >= mcqs.length ? "Finish" : "Next question"}
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
