/**
 * Single source for optimize value props.
 * Used by: demo/live dashboard align card, optimize nudge modal, payment modals, post-optimize panel.
 * Edit claims here only — all surfaces stay in sync.
 */

export type OptimizeClaimId =
  | "summary"
  | "fixes"
  | "skills"
  | "weak_bullets"
  | "download";

export type OptimizeClaim = {
  id: OptimizeClaimId;
  text: string;
};

export const OPTIMIZE_CLAIMS_TITLE = "What you get when you optimize";

export const OPTIMIZE_CLAIMS: readonly OptimizeClaim[] = [
  {
    id: "summary",
    text: "Summary and headline tailored to the role you're targeting",
  },
  {
    id: "fixes",
    text: "Fixes you selected applied to the experience and projects that matter most for this job",
  },
  {
    id: "skills",
    text: "Unproven skills strengthened in project bullets",
  },
  {
    id: "weak_bullets",
    text: "Weak bullets improved to highlight results and impact",
  },
  {
    id: "download",
    text: "Clean, ready-to-apply resume that recruiters and ATS systems can read easily",
  },
] as const;

/** Plain-text lines for bullet lists (dashboard, modals, payment cards). */
export const OPTIMIZE_CLAIM_LINES: readonly string[] = OPTIMIZE_CLAIMS.map((c) => c.text);
