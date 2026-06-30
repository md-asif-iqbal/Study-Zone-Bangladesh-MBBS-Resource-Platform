"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { CollegePicker } from "@/components/CollegePicker";
import { useAuth } from "@/lib/AuthContext";
import { fetchSubjects, fetchTopics, submitContribution } from "@/lib/api";
import { uploadResourceFile } from "@/lib/upload";
import { YEARS } from "@/lib/constants";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileUp,
} from "lucide-react";
import type { ResourceType, Subject, Topic } from "@/lib/types";

const TYPES: { value: ResourceType; label: string; needsFile: boolean }[] = [
  { value: "note", label: "Lecture Note", needsFile: true },
  { value: "previous_question", label: "Previous Year Question", needsFile: true },
  { value: "video_link", label: "Video Lecture (link)", needsFile: false },
  { value: "guide_listing", label: "Guide Book (listing)", needsFile: false },
  { value: "viva_question", label: "Viva / Card Question", needsFile: false },
];

export default function ContributePage() {
  return (
    <AppShell>
      <ContributeInner />
    </AppShell>
  );
}

function ContributeInner() {
  const { user, mockMode } = useAuth();
  const [type, setType] = useState<ResourceType>("note");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [year, setYear] = useState("");
  const [collegeId, setCollegeId] = useState<string | null>(user?.collegeId ?? null);
  const [externalLink, setExternalLink] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubjects().then(setSubjects);
  }, []);

  useEffect(() => {
    if (subjectId) fetchTopics(subjectId).then(setTopics);
    else setTopics([]);
    setTopicId("");
  }, [subjectId]);

  const typeMeta = TYPES.find((t) => t.value === type)!;
  const isPyq = type === "previous_question";
  const isLink = type === "guide_listing" || type === "video_link";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Please add a title.");
      return;
    }
    setBusy(true);
    try {
      let fileUrl: string | undefined;
      if (typeMeta.needsFile && file) {
        fileUrl = await uploadResourceFile(file, isPyq ? collegeId : null);
      }
      await submitContribution({
        topicId: topicId || undefined,
        collegeId: isPyq ? collegeId : null,
        type,
        title: title.trim(),
        description: description.trim() || undefined,
        fileUrl,
        externalLink: isLink ? externalLink.trim() : undefined,
        year: isPyq ? year || undefined : undefined,
      });
      setDone(true);
    } catch (err) {
      setError((err as Error).message || "Could not submit. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div>
        <PageHeader title="Contribute" />
        <div className="sz-card mx-auto max-w-lg p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-teal" strokeWidth={1.4} />
          <h3 className="mt-3 font-serif text-2xl font-semibold text-charcoal">
            Submitted for review
          </h3>
          <p className="mt-1 text-charcoal-muted">
            Thank you for contributing! Your submission is now{" "}
            <span className="font-medium text-charcoal">pending moderation</span>.
            It will appear publicly once a moderator approves it.
          </p>
          <button
            onClick={() => {
              setDone(false);
              setTitle("");
              setDescription("");
              setFile(null);
              setExternalLink("");
            }}
            className="sz-btn-secondary mx-auto mt-5"
          >
            Contribute another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Contribute a resource"
        subtitle="Share notes, previous year questions or links. Everything is reviewed before going live."
      />

      <div className="mb-5 flex items-start gap-3 rounded-card border border-line bg-white px-4 py-3 text-sm text-charcoal-muted">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={1.6} />
        <p>
          Please share only original notes, your own previous year questions, or
          public links. Do not upload scanned copies of copyrighted textbooks.
        </p>
      </div>

      <form onSubmit={onSubmit} className="sz-card max-w-2xl space-y-5 p-5 lg:p-6">
        {error && (
          <div className="flex items-start gap-2 rounded-md bg-amber-light px-3 py-2 text-sm text-amber">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            {error}
          </div>
        )}

        {/* Type */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            Resource type
          </label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={`tap-target rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  type === t.value
                    ? "border-teal bg-teal-light font-medium text-teal-dark"
                    : "border-line bg-white text-charcoal hover:bg-bone"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">Title</span>
          <input
            className="sz-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Brachial Plexus — summary note"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal">
            Description <span className="text-charcoal-muted">(optional)</span>
          </span>
          <textarea
            className="sz-input min-h-20 resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short summary of what this contains."
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-charcoal">
              Subject
            </span>
            <select
              className="sz-input"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select subject…</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.year})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-charcoal">
              Topic
            </span>
            <select
              className="sz-input"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              disabled={!subjectId}
            >
              <option value="">Select topic…</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* PYQ specific fields */}
        {isPyq && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-charcoal">
                College
              </span>
              <CollegePicker value={collegeId} onChange={setCollegeId} />
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-charcoal">
                Exam year
              </span>
              <select
                className="sz-input"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select year…</option>
                {["2025", "2024", "2023", "2022", "2021", "2020"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Link field */}
        {isLink && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-charcoal">
              {type === "video_link" ? "Video URL" : "Buy / borrow / info URL"}
            </span>
            <input
              type="url"
              className="sz-input"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="https://…"
            />
          </label>
        )}

        {/* File upload */}
        {typeMeta.needsFile && (
          <div>
            <span className="mb-1.5 block text-sm font-medium text-charcoal">
              File {mockMode && <span className="text-charcoal-muted">(optional in preview)</span>}
            </span>
            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-line bg-bone px-4 py-4 text-sm hover:border-teal">
              <FileUp className="h-5 w-5 text-teal" strokeWidth={1.6} />
              <span className="text-charcoal-muted">
                {file ? file.name : "Click to choose a PDF or image"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {mockMode && (
              <p className="mt-1.5 text-xs text-charcoal-muted">
                Firebase Storage isn&apos;t configured, so files aren&apos;t actually
                uploaded in preview — the submission flow still completes.
              </p>
            )}
          </div>
        )}

        <button type="submit" className="sz-btn-primary w-full sm:w-auto" disabled={busy}>
          <UploadCloud className="h-4 w-4" strokeWidth={1.8} />
          {busy ? "Submitting…" : "Submit for review"}
        </button>
      </form>
    </div>
  );
}
