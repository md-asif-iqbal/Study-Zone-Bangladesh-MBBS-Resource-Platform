import type { CollegeType, TodoStatus } from "@/lib/types";
import { Circle, CircleDashed, CheckCircle2 } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal lg:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 max-w-2xl text-sm text-charcoal-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function CollegeTypeBadge({ type }: { type: CollegeType }) {
  const map: Record<CollegeType, { label: string; cls: string }> = {
    government: { label: "Govt", cls: "bg-teal-light text-teal-dark" },
    private: { label: "Private", cls: "bg-amber-light text-amber" },
    armed_forces: { label: "Armed Forces", cls: "bg-charcoal/10 text-charcoal" },
  };
  const { label, cls } = map[type];
  return <span className={`sz-badge ${cls}`}>{label}</span>;
}

export function ProgressBar({
  value,
  total,
}: {
  value: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-bone-dark">
        <div
          className="h-full rounded-full bg-teal transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-charcoal-muted">
        {pct}%
      </span>
    </div>
  );
}

export function StatusToggle({
  status,
  onClick,
}: {
  status: TodoStatus;
  onClick: () => void;
}) {
  const config = {
    not_started: {
      Icon: Circle,
      cls: "text-charcoal-muted/50 hover:text-charcoal-muted",
      label: "Not started",
    },
    in_progress: {
      Icon: CircleDashed,
      cls: "text-amber hover:opacity-80",
      label: "In progress",
    },
    completed: {
      Icon: CheckCircle2,
      cls: "text-teal hover:opacity-80",
      label: "Completed",
    },
  }[status];
  const { Icon, cls, label } = config;
  return (
    <button
      onClick={onClick}
      title={`${label} — tap to change`}
      aria-label={`Status: ${label}. Tap to change.`}
      className={`tap-target inline-grid place-items-center rounded-full p-1 transition-colors ${cls}`}
    >
      <Icon className="h-6 w-6" strokeWidth={1.6} />
    </button>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="sz-card grid place-items-center px-6 py-12 text-center">
      <p className="font-medium text-charcoal">{title}</p>
      {hint && <p className="mt-1 text-sm text-charcoal-muted">{hint}</p>}
    </div>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-8 text-sm text-charcoal-muted">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-teal" />
      {label ?? "Loading…"}
    </div>
  );
}
