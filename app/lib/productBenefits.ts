/**
 * Canonical analysis + optimization benefits — single source for marketing,
 * workbench modals, and SEO copy. See also /ai-context/product-rules.md.
 */

export type ProductBenefit = {
  label: string;
  body: string;
};

/** What the free analysis dashboard delivers — order matches messaging hierarchy in ai-context/02_PRODUCT.md. */
export const ANALYSIS_BENEFITS: readonly ProductBenefit[] = [
  {
    label: "Application verdict",
    body: "Apply, Optimize First, or Skip — the apply decision for this specific posting.",
  },
  {
    label: "Critical rejection risks",
    body: "top reasons recruiters would reject this application — missing proof on critical JD skills, weak scope, or misaligned seniority.",
  },
  {
    label: "Shortlist odds",
    body: "estimated odds as written vs after selected fixes — current %, projected %, and uplift for this job.",
  },
  {
    label: "Skill proof map",
    body: "which JD-critical skills are proven in project bullets vs listed only — supporting detail behind rejection risks.",
  },
  {
    label: "Keyword coverage",
    body: "which posting terms appear in your resume — a signal alongside proof, not the eligibility verdict on its own.",
  },
  {
    label: "Experience fit for this posting",
    body: "whether your demonstrated work matches what this JD requires — not title match alone; plus related roles where your proof is stronger.",
  },
  {
    label: "Recommended fixes",
    body: "selectable changes to close honest proof gaps — you choose what Optimize applies.",
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

export const FREE_TIER_SCAN_TRUST = ["No signup", "Instant results", "Pay only to download"] as const;

export const FREE_TIER_OPTIMIZE_TRUST = [
  "Free optimize after sign-in",
  "Selected fixes only",
  "Pay to download",
] as const;

/** One-line product positioning for meta descriptions and bridges. */
export const PRODUCT_VALUE_ONE_LINER =
  "Know before you apply — Application Verdict, critical rejection risks, and shortlist odds for this job, then free job-specific optimization after sign-in; pay only to download PDF or DOCX.";

export const PRODUCT_PIPELINE_ONE_LINER =
  "Verdict for this job → select fixes → prove critical JD skills → edit → download the version you send.";
