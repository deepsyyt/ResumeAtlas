/** Customer-facing copy for the post-optimize results panel (conversion-focused). */

export const OPTIMIZE_HERO_TITLE = "Your resume is ready";
export const OPTIMIZE_HERO_SUBTITLE =
  "Tailored to this job. Review the highlights, edit anything on the left, then download when you're happy.";

export const OPTIMIZE_ATS_BADGE_LABEL = "ATS-friendly format";
export const OPTIMIZE_ATS_BADGE_TOOLTIP =
  "Standard sections, clean headings, and plain-text structure so applicant tracking systems can parse your resume reliably.";

export function optimizeAtsBadgeTooltip(score?: number): string {
  if (score == null) return OPTIMIZE_ATS_BADGE_TOOLTIP;
  return `${OPTIMIZE_ATS_BADGE_TOOLTIP} Compatibility score from your analyze step: ${Math.round(score)}%.`;
}

export const OPTIMIZE_BENEFITS_TITLE = "What you get";

export type OptimizeBenefitItem = {
  id: string;
  icon: "ats" | "summary" | "bullets" | "fixes" | "keywords" | "edit" | "match" | "download" | "gaps" | "skipped";
  title: string;
  detail?: string;
  /** Hero row — ATS only. */
  featured?: boolean;
};

export function recommendedFixShortTitle(fix: string, maxLen = 52): string {
  const trimmed = fix.trim();
  const dashSplit = trimmed.split(/\s*[—–-]\s+/);
  const head = (dashSplit[0] ?? trimmed).trim();
  if (head.length <= maxLen) return head;
  const slice = head.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 20 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

export function buildOptimizeBenefitItems(args: {
  atsScore?: number;
  summaryTailored: boolean;
  bulletsRefined: number;
  bulletsAdded: number;
  projectsRefined: number;
  selectedFixCount: number;
  unselectedFixCount: number;
  keywordCount: number;
  evidenceMatchDelta?: number;
  jdGapsRemaining: number;
}): OptimizeBenefitItem[] {
  const items: OptimizeBenefitItem[] = [];

  items.push({
    id: "ats",
    icon: "ats",
    title: OPTIMIZE_ATS_BADGE_LABEL,
    detail:
      args.atsScore != null
        ? `Structured for ATS parsing (${Math.round(args.atsScore)}% compatibility from your scan).`
        : "Structured for ATS parsing — ready to upload to job boards and company portals.",
  });

  if (args.summaryTailored) {
    items.push({
      id: "summary",
      icon: "summary",
      title: "Summary aligned to this role",
      detail: "Professional summary reframed using experience you already have.",
    });
  }

  const bulletParts: string[] = [];
  if (args.bulletsRefined > 0) {
    bulletParts.push(
      `${args.bulletsRefined} bullet${args.bulletsRefined === 1 ? "" : "s"} strengthened`
    );
  }
  if (args.bulletsAdded > 0) {
    bulletParts.push(
      `${args.bulletsAdded} new project bullet${args.bulletsAdded === 1 ? "" : "s"} added`
    );
  }
  if (bulletParts.length > 0) {
    const scope =
      args.projectsRefined > 0
        ? ` across ${args.projectsRefined} project${args.projectsRefined === 1 ? "" : "s"}`
        : "";
    items.push({
      id: "bullets",
      icon: "bullets",
      title: bulletParts.join(" and ") + scope,
      detail: "Impact-focused lines in the projects that best match this job.",
    });
  }

  if (args.selectedFixCount > 0) {
    items.push({
      id: "fixes",
      icon: "fixes",
      title: `All ${args.selectedFixCount} fix${args.selectedFixCount === 1 ? "" : "es"} you selected are in your resume`,
      detail: "Each recommended fix is reflected in a refined or new project bullet.",
    });
  }

  if (args.unselectedFixCount > 0 && args.selectedFixCount > 0) {
    items.push({
      id: "skipped",
      icon: "skipped",
      title: `${args.unselectedFixCount} other suggested fix${args.unselectedFixCount === 1 ? "" : "es"} not included`,
      detail: "Return to the analyzer to select more fixes and run optimize again.",
    });
  }

  if (args.keywordCount > 0) {
    items.push({
      id: "keywords",
      icon: "keywords",
      title: `${args.keywordCount} keyword${args.keywordCount === 1 ? "" : "s"} now show in project bullets`,
      detail: "Recruiters and ATS scans see proof where it counts — not just a skills list.",
    });
  }

  if (args.evidenceMatchDelta != null && args.evidenceMatchDelta > 0) {
    items.push({
      id: "match",
      icon: "match",
      title: `Evidence match improved by ${args.evidenceMatchDelta} point${args.evidenceMatchDelta === 1 ? "" : "s"}`,
      detail: "Stronger alignment between this job and proof in your experience.",
    });
  }

  items.push({
    id: "edit",
    icon: "edit",
    title: "Edit anything before you download",
    detail: "Click Edit on the preview to fine-tune wording until it sounds like you.",
  });

  items.push({
    id: "download",
    icon: "download",
    title: "PDF for applying and editable file for tweaks",
    detail: "Download when you're ready — no subscription required.",
  });

  if (args.jdGapsRemaining > 0) {
    items.push({
      id: "gaps",
      icon: "gaps",
      title: `${args.jdGapsRemaining} job requirement${args.jdGapsRemaining === 1 ? "" : "s"} still missing from your background`,
      detail: "Left out on purpose — we don't add skills or experience you can't defend in an interview.",
    });
  }

  return items;
}

export const OPTIMIZE_FIXES_SECTION_TITLE = "Fixes you selected";
export const OPTIMIZE_FIXES_SECTION_SUBTITLE =
  "Green highlights in the preview mark each fix and the keywords it added.";

export const OPTIMIZE_KEYWORDS_SECTION_TITLE = "Keywords recruiters scan for";
export const OPTIMIZE_GAPS_SECTION_TITLE = "Still missing from this job";
export const OPTIMIZE_GAPS_SECTION_SUBTITLE =
  "Not added to your resume — only include these if you truly have the experience.";
