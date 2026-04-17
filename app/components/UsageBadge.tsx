"use client";

import type { Usage } from "@/app/lib/usage";

type UsageBadgeProps = { usage: Usage | null };

export function UsageBadge({ usage }: UsageBadgeProps) {
  if (!usage) return null;

  if (usage.type === "anon") {
    return null;
  }

  const remaining = usage.creditsRemaining ?? 0;
  const reserved = usage.creditsReserved ?? 0;

  if (remaining > 0 || reserved > 0) {
    return (
      <span className="inline-flex items-center rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
        Resume optimizations: {remaining}
        {reserved > 0 ? ` (${reserved} in use)` : ""}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
      No optimizations left — buy a pack to tailor your resume
    </span>
  );
}
