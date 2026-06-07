/**
 * Content contracts for posting-fit diagnosis engine pages.
 * Validates MDX/build-time bundles - extend with CI script that reads frontmatter.
 */

import type { DiagnosticPrimitiveId } from "./primitiveRegistry";
import { DIAGNOSTIC_PRIMITIVE_IDS } from "./primitiveRegistry";

export type ContentPageKind =
  | "utility"
  | "role_hub"
  | "methodology"
  | "problem"
  | "glossary"
  | "demo";

export interface MdxFrontmatterBase {
  title: string;
  description: string;
  /** Single H1 source for MDX pages that use it; utility shells may override in layout. */
  h1?: string;
  /** Owning diagnostic narrative - must align with posting-fit engine. */
  engine: "posting_fit_diagnosis";
  /** Registry version this content was authored against. */
  diagnostic_registry_version: string;
  /** Primitives explicitly referenced in body (for link injection + QA). */
  primitives?: DiagnosticPrimitiveId[];
  /** Minimum counts enforced by CI. */
  content_contract_version: "1";
}

export interface UtilityPageContract extends MdxFrontmatterBase {
  kind: "utility";
  /** Primary product path for CTA. */
  primary_cta_path: "/" | "/check-resume-against-job-description" | "/ats-resume-checker";
  /** SSR static prose minimum word count (CI). */
  min_static_word_count: number;
  /** Required proof: fixture demo paths or screenshot asset IDs. */
  proof_fixture_ids: readonly string[];
  faq_max_items: number;
}

export interface RoleHubContract extends MdxFrontmatterBase {
  kind: "role_hub";
  role_slug: string;
  role_display_name: string;
  min_role_specific_sentences: number;
  primary_cta_path: "/" | "/check-resume-against-job-description";
  proof_fixture_ids: readonly string[];
  faq_max_items: number;
}

export interface MethodologyPageContract extends MdxFrontmatterBase {
  kind: "methodology";
  min_static_word_count: number;
  faq_max_items: number;
}

export interface ProblemPageContract extends MdxFrontmatterBase {
  kind: "problem";
  problem_slug: string;
  primary_cta_path: "/" | "/check-resume-against-job-description";
  secondary_cta_path?: "/ats-resume-checker" | "/ats-resume-template";
  faq_max_items: number;
}

export interface GlossaryPageContract extends MdxFrontmatterBase {
  kind: "glossary";
  primitive_id: DiagnosticPrimitiveId;
  faq_max_items: 8;
}

export interface DemoPageContract extends MdxFrontmatterBase {
  kind: "demo";
  fixture_id: string;
  primitive_ids: readonly DiagnosticPrimitiveId[];
}

export type AnyPageContract =
  | UtilityPageContract
  | RoleHubContract
  | MethodologyPageContract
  | ProblemPageContract
  | GlossaryPageContract
  | DemoPageContract;

function isPrimitiveId(x: unknown): x is DiagnosticPrimitiveId {
  return typeof x === "string" && (DIAGNOSTIC_PRIMITIVE_IDS as readonly string[]).includes(x);
}

export interface ContractValidationResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

const ENGINE = "posting_fit_diagnosis" as const;

export function validateUtilityContract(input: Partial<UtilityPageContract>): ContractValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (input.engine !== ENGINE) errors.push("engine must be posting_fit_diagnosis");
  if (input.kind !== "utility") errors.push("kind must be utility");
  if (!input.title?.trim()) errors.push("title required");
  if (!input.description?.trim()) errors.push("description required");
  if (typeof input.min_static_word_count !== "number" || input.min_static_word_count < 900) {
    errors.push("min_static_word_count must be >= 900 for indexable utilities");
  }
  if (!input.proof_fixture_ids?.length || input.proof_fixture_ids.length < 2) {
    errors.push("proof_fixture_ids must have at least 2 entries");
  }
  if (typeof input.faq_max_items !== "number" || input.faq_max_items > 12) {
    errors.push("faq_max_items must be set and <= 12");
  }
  if (
    input.primary_cta_path &&
    input.primary_cta_path !== "/" &&
    input.primary_cta_path !== "/check-resume-against-job-description" &&
    input.primary_cta_path !== "/ats-resume-checker"
  ) {
    errors.push("primary_cta_path must be posting-fit or parse-risk canonical");
  }
  for (const p of input.primitives ?? []) {
    if (!isPrimitiveId(p)) errors.push(`invalid primitive id: ${String(p)}`);
  }
  if (!input.primitives?.length) warnings.push("primitives empty - intentional?");
  return { ok: errors.length === 0, errors, warnings };
}

export function validateRoleHubContract(input: Partial<RoleHubContract>): ContractValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (input.engine !== ENGINE) errors.push("engine must be posting_fit_diagnosis");
  if (input.kind !== "role_hub") errors.push("kind must be role_hub");
  if (!input.role_slug?.trim()) errors.push("role_slug required");
  if (typeof input.min_role_specific_sentences !== "number" || input.min_role_specific_sentences < 12) {
    errors.push("min_role_specific_sentences must be >= 12");
  }
  if (
    input.primary_cta_path &&
    input.primary_cta_path !== "/" &&
    input.primary_cta_path !== "/check-resume-against-job-description"
  ) {
    errors.push("role hubs must primary CTA to posting fit workbench");
  }
  if (!input.proof_fixture_ids?.length) errors.push("proof_fixture_ids required");
  return { ok: errors.length === 0, errors, warnings };
}

export function validateProblemContract(input: Partial<ProblemPageContract>): ContractValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (input.engine !== ENGINE) errors.push("engine must be posting_fit_diagnosis");
  if (input.kind !== "problem") errors.push("kind must be problem");
  if (!input.problem_slug?.trim()) errors.push("problem_slug required");
  if (
    input.primary_cta_path &&
    input.primary_cta_path !== "/" &&
    input.primary_cta_path !== "/check-resume-against-job-description"
  ) {
    errors.push("problem pages must primary CTA to posting fit workbench");
  }
  if (typeof input.faq_max_items !== "number" || input.faq_max_items > 12) {
    errors.push("faq_max_items must be set and <= 12");
  }
  return { ok: errors.length === 0, errors, warnings };
}
