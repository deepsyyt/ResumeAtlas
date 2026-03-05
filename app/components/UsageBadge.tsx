 "use client";

import type { Usage } from "@/app/lib/usage";

type UsageBadgeProps = { usage: Usage | null };

export function UsageBadge({ usage }: UsageBadgeProps) {
  if (!usage) return null;

  if (usage.type === "anon") {
    // For anonymous users we now keep the hero clean and do not show a pill.
    return null;
  }

  if (
    !usage.freePreviewUsed &&
    usage.generationCredits === 0 &&
    usage.downloadCredits === 0
  ) {
    return (
      <span className="inline-flex items-center rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
        Member — 1 free optimization available
      </span>
    );
  }

  if (usage.generationCredits > 0 || usage.downloadCredits > 0) {
    return (
      <span className="inline-flex items-center rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
        Pack: {usage.generationCredits} gens · {usage.downloadCredits} downloads
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
      Pack exhausted — Buy another 25
    </span>
  );
}
