"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Check, ChevronDown } from "lucide-react";
import { fetchColleges } from "@/lib/api";
import { CollegeTypeBadge } from "@/components/ui";
import type { College, CollegeType } from "@/lib/types";

type TypeFilter = "all" | CollegeType;

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "government", label: "Govt" },
  { key: "private", label: "Private" },
  { key: "armed_forces", label: "Armed Forces" },
];

export function CollegePicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (collegeId: string) => void;
}) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selected = colleges.find((c) => c.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return colleges.filter((c) => {
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.affiliatedUniversity.toLowerCase().includes(q)
      );
    });
  }, [colleges, query, typeFilter]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="sz-input flex items-center justify-between text-left"
      >
        <span className={selected ? "text-charcoal" : "text-charcoal-muted/70"}>
          {selected ? selected.name : "Search and select your college…"}
        </span>
        <ChevronDown className="h-4 w-4 text-charcoal-muted" strokeWidth={1.8} />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-line bg-white shadow-card-hover">
          <div className="border-b border-line p-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted"
                strokeWidth={1.6}
              />
              <input
                autoFocus
                className="w-full rounded-md bg-bone py-2 pl-9 pr-3 text-sm outline-none"
                placeholder="Type a college name or city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setTypeFilter(f.key)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    typeFilter === f.key
                      ? "border-teal bg-teal-light font-medium text-teal-dark"
                      : "border-line bg-white text-charcoal-muted hover:bg-bone"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <p className="px-4 pt-2 text-xs text-charcoal-muted">
            {filtered.length} college{filtered.length === 1 ? "" : "s"}
          </p>
          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-charcoal-muted">
                No colleges match “{query}”.
              </li>
            )}
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm hover:bg-bone"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-charcoal">{c.name}</span>
                    <span className="block truncate text-xs text-charcoal-muted">
                      {c.location} · {c.affiliatedUniversity}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <CollegeTypeBadge type={c.type} />
                    {value === c.id && (
                      <Check className="h-4 w-4 text-teal" strokeWidth={2} />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
