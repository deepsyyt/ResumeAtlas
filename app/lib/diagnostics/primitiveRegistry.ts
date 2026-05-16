/**
 * Posting-fit diagnosis engine - single source of truth for diagnostic primitives.
 * All UI labels, SEO copy, API field names, and glossary slugs MUST derive from this registry.
 *
 * @see docs/operations/DIAGNOSTICS_ENGINE_IMPLEMENTATION.md
 */

/** Gate model: ordered screening model (A-D). Do not renumber without bumping REGISTRY_VERSION. */
export const DIAGNOSTIC_GATES = ["A", "B", "C", "D"] as const;
export type DiagnosticGate = (typeof DIAGNOSTIC_GATES)[number];

/**
 * Stable primitive IDs (snake_case). Used in:
 * - API JSON (`dimension_scores[].primitive_id`)
 * - URL segments (`/diagnostics/{publicSlug}`)
 * - analytics payloads
 * - MDX frontmatter `primitives: []`
 */
export const DIAGNOSTIC_PRIMITIVE_IDS = [
  "parse_hygiene",
  "posting_vocabulary_coverage",
  "required_skill_debt",
  "preferred_skill_delta",
  "semantic_fit_gap",
  "evidence_density",
  "skim_friction",
  "truth_envelope",
] as const;

export type DiagnosticPrimitiveId = (typeof DIAGNOSTIC_PRIMITIVE_IDS)[number];

/** Public glossary / diagnostics URL segment (kebab-case). */
export type DiagnosticPrimitivePublicSlug =
  | "parse-hygiene"
  | "posting-vocabulary-coverage"
  | "required-skill-debt"
  | "preferred-skill-delta"
  | "semantic-fit-gap"
  | "evidence-density"
  | "skim-friction"
  | "truth-envelope";

export interface DiagnosticPrimitive {
  readonly id: DiagnosticPrimitiveId;
  readonly publicSlug: DiagnosticPrimitivePublicSlug;
  /** Short UI label (sentence case). */
  readonly label: string;
  /** Tooltip / glossary one-liner, max ~180 chars for UI. */
  readonly shortDefinition: string;
  readonly gate: DiagnosticGate;
  /** Keys returned by analyzer APIs that map to this primitive (contract for backend team). */
  readonly analyzerResponseKeys: readonly string[];
  /** Related primitives for cross-links and FAQ generation. */
  readonly relatedPrimitiveIds: readonly DiagnosticPrimitiveId[];
  /** SEO glossary priority (lower = pillar order in hub). */
  readonly glossaryOrder: number;
}

/** Semantic version of the entire registry. Bump when any primitive definition or gate assignment changes. */
export const DIAGNOSTIC_REGISTRY_VERSION = "1.0.0" as const;

export const DIAGNOSTIC_PRIMITIVES: readonly DiagnosticPrimitive[] = [
  {
    id: "parse_hygiene",
    publicSlug: "parse-hygiene",
    label: "Parse hygiene",
    shortDefinition:
      "How reliably applicant tracking systems can extract text, sections, and bullets from your file, not visual design taste.",
    gate: "A",
    analyzerResponseKeys: ["parse_hygiene", "ats_score"],
    relatedPrimitiveIds: ["skim_friction", "posting_vocabulary_coverage"],
    glossaryOrder: 10,
  },
  {
    id: "posting_vocabulary_coverage",
    publicSlug: "posting-vocabulary-coverage",
    label: "Posting vocabulary coverage",
    shortDefinition:
      "Literal overlap between this job posting’s vocabulary and your resume, before semantic fit.",
    gate: "B",
    analyzerResponseKeys: ["keyword_coverage", "matched_skills", "missing_skills"],
    relatedPrimitiveIds: ["required_skill_debt", "semantic_fit_gap"],
    glossaryOrder: 20,
  },
  {
    id: "required_skill_debt",
    publicSlug: "required-skill-debt",
    label: "Required skill debt",
    shortDefinition:
      "Hard gaps: posting-required capabilities that are missing or weakly evidenced in your resume.",
    gate: "B",
    analyzerResponseKeys: ["missing_skills_required", "missing_skills"],
    relatedPrimitiveIds: ["posting_vocabulary_coverage", "truth_envelope"],
    glossaryOrder: 30,
  },
  {
    id: "preferred_skill_delta",
    publicSlug: "preferred-skill-delta",
    label: "Preferred skill delta",
    shortDefinition:
      "Soft gaps: nice-to-have posting skills not clearly supported by your bullets.",
    gate: "B",
    analyzerResponseKeys: ["missing_skills_preferred", "missing_skills"],
    relatedPrimitiveIds: ["required_skill_debt", "evidence_density"],
    glossaryOrder: 40,
  },
  {
    id: "semantic_fit_gap",
    publicSlug: "semantic-fit-gap",
    label: "Semantic fit gap",
    shortDefinition:
      "Whether your responsibilities read like the role in the posting, not just keyword overlap.",
    gate: "C",
    analyzerResponseKeys: ["semantic_similarity"],
    relatedPrimitiveIds: ["posting_vocabulary_coverage", "evidence_density"],
    glossaryOrder: 50,
  },
  {
    id: "evidence_density",
    publicSlug: "evidence-density",
    label: "Evidence density",
    shortDefinition:
      "How much outcome proof (scope, metrics, ownership) appears where recruiters skim first.",
    gate: "C",
    analyzerResponseKeys: ["impact_score"],
    relatedPrimitiveIds: ["skim_friction", "truth_envelope"],
    glossaryOrder: 60,
  },
  {
    id: "skim_friction",
    publicSlug: "skim-friction",
    label: "Skim friction",
    shortDefinition:
      "How quickly a recruiter can extract role, impact, and relevance in the first pass.",
    gate: "D",
    analyzerResponseKeys: ["resume_quality"],
    relatedPrimitiveIds: ["parse_hygiene", "evidence_density"],
    glossaryOrder: 70,
  },
  {
    id: "truth_envelope",
    publicSlug: "truth-envelope",
    label: "Truth envelope",
    shortDefinition:
      "Whether stated skills and claims stay inside what your experience can defend in an interview.",
    gate: "D",
    analyzerResponseKeys: [],
    relatedPrimitiveIds: ["required_skill_debt", "evidence_density"],
    glossaryOrder: 80,
  },
] as const;

export function getPrimitiveById(id: DiagnosticPrimitiveId): DiagnosticPrimitive | undefined {
  return DIAGNOSTIC_PRIMITIVES.find((p) => p.id === id);
}

export function getPrimitiveBySlug(slug: string): DiagnosticPrimitive | undefined {
  return DIAGNOSTIC_PRIMITIVES.find((p) => p.publicSlug === slug);
}

export function primitiveIdFromAnalyzerKey(key: string): DiagnosticPrimitiveId | undefined {
  for (const p of DIAGNOSTIC_PRIMITIVES) {
    if (p.analyzerResponseKeys.includes(key)) return p.id;
  }
  return undefined;
}

/** API: one scored dimension (extend /api/analyze to emit this shape over time). */
export interface DiagnosticDimensionScore {
  primitive_id: DiagnosticPrimitiveId;
  /** 0-100 normalized score when applicable; null if not computed for this run. */
  score: number | null;
  /** Machine-readable detail keys only, no prose in API. */
  detail_keys?: readonly string[];
}

export interface PostingFitAnalyzeResponseV1 {
  diagnostic_registry_version: typeof DIAGNOSTIC_REGISTRY_VERSION;
  dimensions: readonly DiagnosticDimensionScore[];
  /** Existing ATS analyze fields remain; this block is additive. */
}

/** UI: maps a card to registry + optional live values (React components import this only). */
export interface DiagnosticPrimitiveRenderProps {
  primitiveId: DiagnosticPrimitiveId;
  score?: number | null;
}

/** Explanation template keys (file-based under explanations/templates/en/). */
export const EXPLANATION_TEMPLATE_IDS = [
  "gate_model_overview",
  "primitive_card_body",
  "posting_fit_workbench_intro",
  "parse_risk_lab_intro",
  "truth_envelope_policy",
] as const;
export type ExplanationTemplateId = (typeof EXPLANATION_TEMPLATE_IDS)[number];

export interface ExplanationTemplateRef {
  readonly templateId: ExplanationTemplateId;
  readonly primitiveIds?: readonly DiagnosticPrimitiveId[];
}

/** Glossary entry (static page generation). */
export interface GlossaryPageSpec {
  readonly primitiveId: DiagnosticPrimitiveId;
  readonly faqMaxItems: 8;
}

export const GLOSSARY_PAGE_SPECS: readonly GlossaryPageSpec[] = DIAGNOSTIC_PRIMITIVES.map(
  (p) =>
    ({
      primitiveId: p.id,
      faqMaxItems: 8,
    }) as const
);

/** Validation: every primitive must have ≥1 analyzer key OR explicit empty for policy-only (truth_envelope). */
export function validateRegistryIntegrity(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const p of DIAGNOSTIC_PRIMITIVES) {
    if (p.analyzerResponseKeys.length === 0 && p.id !== "truth_envelope") {
      errors.push(`Primitive ${p.id} has no analyzerResponseKeys`);
    }
  }
  const slugs = new Set<string>();
  for (const p of DIAGNOSTIC_PRIMITIVES) {
    if (slugs.has(p.publicSlug)) errors.push(`Duplicate slug ${p.publicSlug}`);
    slugs.add(p.publicSlug);
  }
  return { ok: errors.length === 0, errors };
}
