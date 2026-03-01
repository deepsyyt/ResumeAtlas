"use client";

import type { Usage } from "@/app/lib/usage";

type UsageBadgeProps = { usage: Usage | null };

export function UsageBadge({ usage }: UsageBadgeProps) {
  if (!usage) return null;

  if (usage.type === "blocked") {
    return (
      <span className="inline-flex items-center rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
        Upgrade Required
      </span>
    );
  }

  if (usage.type === "pro") {
    return (
      <span className="inline-flex items-center rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
        Pro — {usage.resumeCount} / {usage.resumeLimit} this month
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
      Free — {usage.resumeCount} / {usage.resumeLimit} used
    </span>
  );
}
