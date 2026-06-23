/**
 * Canonical analysis + optimization benefits — single source for marketing,
 * workbench modals, and SEO copy. See also /ai-context/product-rules.md.
 */

export type ProductBenefit = {
  label: string;
  body: string;
};

/** What the free analysis dashboard delivers. */
export const ANALYSIS_BENEFITS: readonly ProductBenefit[] = [
  {
    label: "Application verdict",
    body: "apply now, optimize first, or skip — with estimated shortlist odds (~X% today, ~Y% after optimize).",
  },
  {
    label: "Role fit for this posting",
    body: "if you're applying for this role: fit verdict for the target title plus related roles you may also qualify for.",
  },
  {
    label: "Elimination risks",
    body: "top reasons recruiters might skip your application for this posting.",
  },
  {
    label: "Skill proof map",
    body: "which JD skills are proven in project bullets vs listed only in your skills section.",
  },
  {
    label: "Keyword coverage",
    body: "ATS keyword match score — which posting terms are matched vs missed in your resume.",
  },
  {
    label: "Recommended fixes",
    body: "selectable changes tied to rejection risks — you choose what Optimize applies.",
  },
] as const;

/** What job-specific optimization delivers (user-selected fixes). */
export const OPTIMIZATION_BENEFITS: readonly ProductBenefit[] = [
  {
    label: "JD-tailored summary",
    body: "professional summary rewritten for this posting's domain, focus, and role fit.",
  },
  {
    label: "Listed-only → proven",
    body: "weak skills from your skills section demonstrated in project bullets with concrete experience.",
  },
  {
    label: "Selected rejection fixes",
    body: "each fix you check gets demonstrated in your best-matching bullets to raise shortlist odds.",
  },
  {
    label: "Impact quantification",
    body: "thin bullets refined with goal and outcome metrics that strengthen proof for this role.",
  },
  {
    label: "Edit, then download",
    body: "review every change in an editable preview, then export application-ready PDF and DOCX.",
  },
] as const;

/** Short lines for modal bullet lists (no label prefix). */
export const OPTIMIZATION_BENEFIT_LINES: readonly string[] = OPTIMIZATION_BENEFITS.map(
  (b) => `${b.label} — ${b.body.charAt(0).toLowerCase()}${b.body.slice(1)}`
);

/** Compact one-liners for optimize nudge modals (must fit without clipping). */
export const OPTIMIZATION_BENEFIT_MODAL_LINES: readonly string[] = [
  "JD-tailored summary for this posting's domain & focus",
  "Skills-list keywords proven in project bullets",
  "Selected rejection fixes applied for this job",
  "Impact metrics added to key bullets",
  "Edit, preview & download PDF and DOCX",
];

export const FREE_TIER_EYEBROW = "100% free scan · free optimize after sign-in";

export const FREE_TIER_SCAN_TRUST = ["100% free scan", "Instant results", "No signup"] as const;

export const FREE_TIER_OPTIMIZE_TRUST = [
  "Free optimize after sign-in",
  "Selected fixes only",
  "Pay to download",
] as const;

/** One-line product positioning for meta descriptions and bridges. */
export const PRODUCT_VALUE_ONE_LINER =
  "Free apply-readiness analysis, then free job-specific optimization after sign-in — pay only to download PDF or DOCX.";

export const PRODUCT_PIPELINE_ONE_LINER =
  "Analyze fit → select fixes → optimize for this job → edit → download the version you send.";
