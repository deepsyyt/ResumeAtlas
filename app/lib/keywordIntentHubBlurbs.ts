import type { RoleKeywordIntent } from "@/app/lib/roleSeo";

/**
 * Short, intent-distinct blurbs for the /{role}/keywords authority page (not role-specific;
 * role nuance comes from the full intent pages).
 */
export const INTENT_HUB_BLURBS: Record<RoleKeywordIntent, string> = {
  "core-keywords":
    "The essential nouns and phrases that signal role fit to ATS and recruiters—tools, domains, and outcomes. Start here before tailoring to a specific job description.",
  "technical-skills":
    "Stack depth: languages, frameworks, data tooling, and how to phrase skills so they read as credible production experience—not a keyword dump.",
  "tools-platforms":
    "Vendor and platform vocabulary (cloud, CI/CD, BI, analytics products) that job posts literal-match. Pair each name with how you used it.",
  "action-verbs":
    "Strong verbs and bullet structure patterns that show ownership, scale, and impact—what hiring managers scan for after keyword gates.",
  projects:
    "How to frame projects as mini case studies: problem, approach, tools, deployment, and measurable results for ATS and humans.",
  summary:
    "Summary and positioning language: seniority, domains, and proof-style phrasing without filler—aligned to how summaries are parsed.",
};
