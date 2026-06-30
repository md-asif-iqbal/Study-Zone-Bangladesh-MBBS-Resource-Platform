"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  BookOpen,
  Library,
  Video,
  MessageSquareQuote,
  ListChecks,
  ExternalLink,
  Download,
  ChevronRight,
} from "lucide-react";
import { fetchResources, fetchMcqs } from "@/lib/api";
import { EmptyState, Spinner } from "@/components/ui";
import type { MCQ, Resource, ResourceType } from "@/lib/types";

type TabKey = ResourceType | "mcq";

const TABS: { key: TabKey; label: string; icon: typeof FileText }[] = [
  { key: "note", label: "Notes", icon: FileText },
  { key: "previous_question", label: "Prev. Questions", icon: BookOpen },
  { key: "guide_listing", label: "Guide Books", icon: Library },
  { key: "video_link", label: "Videos", icon: Video },
  { key: "mcq", label: "MCQs", icon: ListChecks },
  { key: "viva_question", label: "Viva", icon: MessageSquareQuote },
];

export function ResourceHub({
  topicId,
  collegeId,
}: {
  topicId: string;
  collegeId: string | null;
}) {
  const [tab, setTab] = useState<TabKey>("note");
  const [resources, setResources] = useState<Resource[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      fetchResources(topicId, collegeId),
      fetchMcqs(undefined, topicId),
    ])
      .then(([res, mq]) => {
        if (!active) return;
        setResources(res);
        setMcqs(mq);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [topicId, collegeId]);

  const counts: Record<TabKey, number> = {
    note: resources.filter((r) => r.type === "note").length,
    previous_question: resources.filter((r) => r.type === "previous_question").length,
    guide_listing: resources.filter((r) => r.type === "guide_listing").length,
    video_link: resources.filter((r) => r.type === "video_link").length,
    viva_question: resources.filter((r) => r.type === "viva_question").length,
    mcq: mcqs.length,
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-line pb-px">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`tap-target flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "border-teal font-medium text-teal-dark"
                  : "border-transparent text-charcoal-muted hover:text-charcoal"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.6} />
              {label}
              <span className="rounded-full bg-bone-dark px-1.5 text-xs text-charcoal-muted">
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <Spinner />
      ) : tab === "mcq" ? (
        <McqList mcqs={mcqs} />
      ) : (
        <ResourceList items={resources.filter((r) => r.type === tab)} type={tab} />
      )}
    </div>
  );
}

function ResourceList({ items, type }: { items: Resource[]; type: ResourceType }) {
  if (items.length === 0) {
    const hint =
      type === "previous_question"
        ? "No previous year questions for your college yet. Be the first to contribute them."
        : "No resources here yet. Check back soon or contribute your own.";
    return <EmptyState title="Nothing here yet" hint={hint} />;
  }

  return (
    <ul className="space-y-3">
      {items.map((r) => (
        <li key={r.id} className="sz-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-charcoal">{r.title}</p>
              {r.description && (
                <p className="mt-1 text-sm text-charcoal-muted">{r.description}</p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-charcoal-muted">
                {r.year && (
                  <span className="sz-badge bg-bone-dark text-charcoal">
                    Year {r.year}
                  </span>
                )}
                {r.collegeId === null && (
                  <span className="sz-badge bg-teal-light text-teal-dark">
                    National
                  </span>
                )}
                {r.uploaderName && <span>Shared by {r.uploaderName}</span>}
              </div>
            </div>
            <ResourceAction resource={r} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ResourceAction({ resource }: { resource: Resource }) {
  if (resource.type === "guide_listing" || resource.type === "video_link") {
    return (
      <a
        href={resource.externalLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="sz-btn-secondary shrink-0 px-3 py-2 text-xs"
      >
        {resource.type === "video_link" ? "Watch" : "View"}
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
      </a>
    );
  }
  if (resource.type === "viva_question") return null;
  return (
    <a
      href={resource.fileUrl || "#"}
      className="sz-btn-secondary shrink-0 px-3 py-2 text-xs"
    >
      Open
      <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
    </a>
  );
}

function McqList({ mcqs }: { mcqs: MCQ[] }) {
  if (mcqs.length === 0) {
    return <EmptyState title="No MCQs for this topic yet" />;
  }
  return (
    <div className="sz-card p-4">
      <p className="text-sm text-charcoal-muted">
        {mcqs.length} MCQ{mcqs.length > 1 ? "s" : ""} available for this topic.
      </p>
      <a
        href={`/mcq?topicId=${mcqs[0].topicId}`}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
      >
        Practice these MCQs
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </a>
    </div>
  );
}
