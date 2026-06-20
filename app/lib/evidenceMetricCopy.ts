import type { EvidenceDashboard, EvidenceStrength } from "@/app/lib/resumeEvidenceScore";
import type { BulletRefinementBreakdown } from "@/app/lib/optimizeBulletEvidence";
import { jdDomainLabel } from "@/app/lib/jdDomainClass";
import { getKeywordCoverageLabel } from "@/app/lib/scoreColors";

/** Familiar SERP language first; Evidence Match is the product metric name in parentheses. */
export const EVIDENCE_MATCH_TITLE = "Job description match score (Evidence Match)";
/** Compact label for the score-row card (full title available via tooltip). */
export const EVIDENCE_MATCH_CARD_LABEL = "Evidence match";
export const EVIDENCE_MATCH_SUBTITLE =
  "Resume-to-job match: how much of this posting you prove in project bullets, not just skills lists.";

export const OPTIMIZE_EVIDENCE_MATCH_TITLE = "Proof changes from optimization";
export const OPTIMIZE_EVIDENCE_MATCH_SUBTITLE =
  "Green +N in rewrites = bullets that gained that proof signal. Full-resume % is context for the whole document.";

export const KEYWORD_COVERAGE_SCORE_TITLE = "Keyword coverage score";
export const KEYWORD_COVERAGE_SCORE_SUBTITLE =
  "Coverage % of JD keyword (matched vs missed).";

/** @deprecated Use KEYWORD_COVERAGE_SCORE_TITLE */
export const ATS_REFERENCE_TITLE = KEYWORD_COVERAGE_SCORE_TITLE;
/** @deprecated Use KEYWORD_COVERAGE_SCORE_SUBTITLE */
export const ATS_REFERENCE_SUBTITLE = KEYWORD_COVERAGE_SCORE_SUBTITLE;

export const ANALYSIS_REPORT_HEADING = "Increase shortlist odds";
export const ANALYSIS_REPORT_SUBTITLE =
  "Tailor project bullets to this posting with evidence-first rewrites.";

export const OPTIMIZE_CTA_LABEL = "Increase shortlist odds";
export const OPTIMIZE_CTA_LABEL_HERO = "Optimize for this job";
export const OPTIMIZE_CTA_SUBLINE = "Strengthen proof before you apply";
export const OPTIMIZE_ALIGN_PRIVACY_NOTE = "Your data stays private. Nothing is shared with employers.";

export const OPTIMIZE_NUDGE_EYEBROW = "Your gaps are clear. Now close them.";
export const OPTIMIZE_NUDGE_HEADLINE = "Turn this check into a shortlist-ready resume";
export const OPTIMIZE_NUDGE_SUBHEAD =
  "Recruiters skim in seconds. A generic resume gets filtered out. Optimize for this job so your proof shows up where it matters.";
export const OPTIMIZE_NUDGE_URGENCY =
  "Applying to 20 jobs with one resume burns time. Aligning per job is how you land interviews.";

export const LOGIN_NUDGE_BANNER = "You're signed in. Your scan is saved.";
export const LOGIN_NUDGE_HEADLINE = "Pick up where you left off";
export const LOGIN_NUDGE_SUBHEAD =
  "Your job match and recommended fixes are ready. Optimize now to turn this analysis into a resume you'd confidently send to an interview.";

export const OPTIMIZE_ALIGN_CARD_TITLE = "Align before you apply";
export const OPTIMIZE_ALIGN_CARD_BODY = OPTIMIZE_NUDGE_SUBHEAD;
export const OPTIMIZE_ALIGN_CARD_HINT =
  "Select at least one recommended fix on the left.";
export const OPTIMIZE_ALIGN_CARD_DEMO_HINT =
  "Run a check to see recommended fixes pre-selected here.";
export const OPTIMIZE_ALIGN_BENEFITS_TITLE = "What you get when you optimize";
export const OPTIMIZE_ALIGN_BENEFITS = [
  "Summary and title rewritten for this role",
  "Selected fixes applied to your strongest bullets",
  "JD keywords surfaced with evidence, not keyword stuffing",
  "ATS-friendly layout recruiters and systems can parse",
] as const;

export const OPTIMIZE_NUDGE_CREDIT_NOTICE =
  "1 credit applied. Next step: optimize so this resume is interview-ready for this posting.";

export const DOWNLOAD_UNLOCK_EYEBROW = "Ready to apply?";
export const DOWNLOAD_UNLOCK_TITLE = "Download your interview-ready resume";
export const DOWNLOAD_UNLOCK_BODY =
  "You have already aligned this resume to the job. Unlock the file you send, plus 5 full job runs to repeat the process without starting over.";
export const DOWNLOAD_UNLOCK_BENEFITS_TITLE = "What $2.99 unlocks";
export const DOWNLOAD_UNLOCK_BENEFITS = [
  "PDF and editable file for this optimized resume",
  "5 job credits included: check, optimize, and download per role",
  "ATS-friendly export built for screening systems",
  "Stop spray-and-pray. Align each application instead of mass-applying and burning out",
] as const;
export const DOWNLOAD_UNLOCK_OUTCOME =
  "Get shortlisted for roles you fit, not exhausted applying to ones you don't.";
export const DOWNLOAD_UNLOCK_PRICE_HEADLINE = "5 aligned resumes. One price.";
export const DOWNLOAD_UNLOCK_PRICE_SUBLINE = (price: string, credits: number) =>
  `${price} · ${credits} jobs end-to-end (scan, optimize, download)`;
export const DOWNLOAD_UNLOCK_CTA = (price: string) => `Unlock download for ${price}`;

export const DOWNLOAD_SUCCESS_EYEBROW = "Payment successful";
export const DOWNLOAD_SUCCESS_TITLE = "Your interview-ready resume is unlocked";
export const DOWNLOAD_SUCCESS_BODY =
  "Download this job now. Each credit covers one full run: check fit, optimize, and export an ATS-friendly resume.";
export function downloadSuccessCreditsLine(creditsGranted: number, creditsRemaining: number): string {
  const grantedLabel = `${creditsGranted} job credit${creditsGranted === 1 ? "" : "s"} added`;
  const balanceLabel = `${creditsRemaining} left for your next roles`;
  return `${grantedLabel} · ${balanceLabel}`;
}
export const DOWNLOAD_SUCCESS_THIS_JOB = "This job: PDF + editable file ready to download";
export const DOWNLOAD_SUCCESS_NEXT_JOBS = "Use remaining credits to align resumes for other postings";

export const CONVERSION_MODAL_HEADLINE = "Align this resume before you apply";
export const CONVERSION_MODAL_SUBHEAD =
  "This job needs its own version of your resume. Unlock optimization plus 5 job credits to check, tailor, and download for the roles you actually want.";
export const CONVERSION_MODAL_BENEFITS_TITLE = "Why alignment beats volume";
export const CONVERSION_MODAL_BENEFITS = [
  "Recruiters shortlist proof, not copy-paste resumes",
  "Fix gaps this posting flagged",
  "ATS-friendly output per job",
  "Apply smarter: fewer apps, better callbacks",
] as const;
export const CONVERSION_MODAL_PRICE_LABEL = "One-time unlock";
export const CONVERSION_MODAL_PRICE_HEADLINE = (price: string) => `${price} · 5 jobs`;
export const CONVERSION_MODAL_PRICE_SUBLINE = "Check, optimize, download for each role";
export const CONVERSION_MODAL_CTA = (price: string) => `Unlock optimization for ${price}`;

export const CREDIT_PACK_EXHAUSTED_HEADLINE = "Keep landing interviews. Don't stop at one job.";
export const CREDIT_PACK_EXHAUSTED_SUBHEAD =
  "You have used this run. Get 5 more full job credits: match check, optimize, and ATS-ready download for each posting.";
export const CREDIT_PACK_OFFER_HEADLINE = (price: string) => `5 aligned applications · ${price}`;
export const CREDIT_PACK_OFFER_SUBHEAD = "Less time applying. More time interviewing.";
export const CREDIT_PACK_BENEFITS = [
  "Match score and gap list for each job",
  "Optimize summary, bullets, and fixes per posting",
  "Download PDF and editable file when ready",
  "Built for shortlists, not generic mass applications",
] as const;
export const CREDIT_PACK_CTA = (price: string) => `Get 5 job credits for ${price}`;
export const CREDIT_PACK_FREE_SCAN_HEADLINE = "You've used your free scan";

export const LIMIT_MODAL_ANON_HEADLINE = "You've used your free scan";
export const LIMIT_MODAL_ANON_SUBHEAD =
  "Sign in to save your work and unlock 5 job credits: check fit, optimize, and download an interview-ready resume for each role you target.";
export const LIMIT_MODAL_ANON_BODY =
  "Don't keep applying with one resume. Align per job so you spend time on roles where you can actually get shortlisted.";
export const LIMIT_MODAL_ANON_CTA = "Sign in with Google";
export const LIMIT_MODAL_ANON_FOOTNOTE = "Free scan resets 30 days after use.";
export const LIMIT_MODAL_USER_FOOTNOTE = "Free scan resets 30 days after use, same as guest users.";
export const OPTIMIZE_ALIGN_SELECTION_TITLE = "Recommended fixes";
export const OPTIMIZE_ALIGN_PREVIEW_TITLE = "Bullet preview";
export const OPTIMIZE_ALIGN_BEFORE_LABEL = "Before";
export const OPTIMIZE_ALIGN_AFTER_LABEL = "After (with selected fixes)";
export const OPTIMIZE_ALIGN_EMPTY_SELECTION =
  "Uncheck fixes on the left only if you do not want them optimized.";
export const OPTIMIZE_ALIGN_PREVIEW_PLACEHOLDER =
  "Select at least one fix to preview how a work bullet may be strengthened.";

export const OPTIMIZE_ALIGN_STEPS = [
  "Optimize the professional summary and title to align with the job role",
  "Add selected JD skills into work bullets with measurable outcomes",
  "Address selected rejection risks in the right projects",
] as const;

export const ANALYSIS_OPTIMIZE_STEPS = [
  "Move JD skills into work bullets",
  "Strengthen topic proof for this role",
  "Add measurable outcomes you already have",
] as const;

export const APPLICATION_VERDICT_TITLE = "Application verdict";
export const APPLICATION_VERDICT_SUBTITLE =
  "Based on topics this job cares about, top rejection risks, and skills proven in work bullets.";

function clampLikelihoodPct(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/** Footer line under keyword coverage score card. */
export function keywordCoverageScoreLine(coverage: KeywordCoverageMetricInput): string {
  const { matchedCount, totalCount, coverageLabel } = coverage;
  if (totalCount <= 0) return coverageLabel;
  const missed = Math.max(0, totalCount - matchedCount);
  return `${matchedCount} matched · ${missed} missed — ${coverageLabel.toLowerCase()}.`;
}

/** @deprecated Use keywordCoverageScoreLine */
export function atsShortlistLikelihoodLine(score: number): string {
  const pct = clampLikelihoodPct(score);
  return `~${pct}% estimated shortlist likelihood after ATS review.`;
}

/** Second line under Evidence Match — derived from the evidence match score. */
export function evidenceInterviewLikelihoodLine(score: number): string {
  const pct = clampLikelihoodPct(score);
  return `~${pct}% estimated interview clearance at current proof level.`;
}

export const SKILL_PROOF_MAP_TITLE = "Keyword coverage";
export const SKILL_PROOF_MAP_INTRO =
  "Each JD keyword gets a status, what it means for this role, and a fix you can run in Optimize.";

export const KEYWORD_COVERAGE_VIEW_ALL = "View all keywords";
export const KEYWORD_COVERAGE_PROVEN_LABEL = "Proven";
export const KEYWORD_COVERAGE_PROVEN_DESC = "Skills clearly proven";
export const KEYWORD_COVERAGE_WEAK_LABEL = "Weak";
export const KEYWORD_COVERAGE_WEAK_DESC = "Mentioned, not proven";
export const KEYWORD_COVERAGE_MISSING_LABEL = "Missing";
export const KEYWORD_COVERAGE_MISSING_DESC = "Not mentioned";

export const OPTIMIZE_SKILL_PROOF_TITLE = "Skills strengthened for this job";
export const OPTIMIZE_SKILL_PROOF_INTRO =
  "Skills you already had that now show stronger proof in project or role bullets. Missing JD requirements are not shown here.";

export const OPTIMIZE_SUMMARY_CHANGED_LINE =
  "Professional summary tightened for this job";

export function optimizeBulletSummaryLine(refinedCount: number, projectScopes: number): string {
  if (refinedCount <= 0) return "";
  const scope =
    projectScopes > 0
      ? projectScopes
      : refinedCount;
  if (scope === 1) {
    return "One impact-focused bullet refined where proof was thin (not every line rewritten)";
  }
  return `${refinedCount} bullet${refinedCount === 1 ? "" : "s"} refined across ${scope} project${
    scope === 1 ? "" : "s"
  } — about one impact line per project, not a full rewrite`;
}

/** Why bullets were rewritten — rejection risks, weak keyword proof, or impact polish. */
export function optimizeBulletRefinementSummaryLines(
  breakdown: BulletRefinementBreakdown
): string[] {
  const lines: string[] = [];
  const {
    rejectionRiskBulletCount,
    weakKeywordBulletCount,
    impactPolishBulletCount,
    quantifiedBulletCount,
    addressedRejectionRiskCount,
    selectedRejectionRiskCount,
    totalRefined,
  } = breakdown;

  if (totalRefined <= 0) return lines;

  if (rejectionRiskBulletCount > 0) {
    lines.push(
      `${rejectionRiskBulletCount} bullet${rejectionRiskBulletCount === 1 ? "" : "s"} updated to address selected rejection risks (including new lines in the best-matching project)`
    );
  } else if (selectedRejectionRiskCount > 0) {
    lines.push(
      `${selectedRejectionRiskCount} selected rejection risk${selectedRejectionRiskCount === 1 ? "" : "s"} targeted with new or refined project bullets`
    );
  }
  if (weakKeywordBulletCount > 0) {
    lines.push(
      `${weakKeywordBulletCount} bullet${weakKeywordBulletCount === 1 ? "" : "s"} refined to strengthen weak or implied JD keywords you already had`
    );
  }
  if (impactPolishBulletCount > 0) {
    const metricsNote =
      quantifiedBulletCount > 0
        ? `; ${quantifiedBulletCount} gained clearer metrics`
        : "";
    lines.push(
      `${impactPolishBulletCount} bullet${impactPolishBulletCount === 1 ? "" : "s"} polished for stronger impact language${metricsNote}`
    );
  }
  if (lines.length === 0) {
    return [optimizeBulletSummaryLine(totalRefined, breakdown.projectScopes)];
  }
  return lines;
}

export const OPTIMIZE_BULLET_REFINEMENT_NOTE =
  "Each selected rejection risk gets a refined or new bullet in the project where your experience best fits.";

export function optimizeSkillsSurfacedLine(skillCount: number): string {
  if (skillCount <= 0) return "";
  return `${skillCount} skill${skillCount === 1 ? "" : "s"} now proven in project bullets`;
}

export function optimizeWeakKeywordsStrengthenedLine(keywordCount: number): string {
  if (keywordCount <= 0) return "";
  return `${keywordCount} weak keyword${keywordCount === 1 ? "" : "s"} strengthened in refined bullets`;
}

export const RISK_AREAS_TITLE = "Fix before you apply (recommended fix)";
export const RISK_AREAS_INTRO =
  "Resume changes to improve shortlist odds for this role. Optimize applies the fixes you select.";

export const RECOMMENDED_FIXES_TITLE = "Recommended fixes for this role";
export const RECOMMENDED_FIXES_INTRO =
  "Pre-selected for this posting. Keep at least one checked to run Optimize.";

export const TOP_REJECTION_RISKS_TITLE = "3 things reducing interview chances";
export const TOP_REJECTION_RISKS_INTRO =
  "These gaps may cause recruiters to skip your application.";
export const TOP_REJECTION_RISKS_FOOTER =
  "Fixing these gaps can increase your shortlist odds.";

/** Fix banner when JD lists skills not proven in work bullets (missing from resume or skills-list only). */
export function missingSkillsImprovementTip(args: {
  missingCount: number;
  requiredMissingCount?: number;
  hasRequiredPreferred?: boolean;
}): string {
  const { missingCount, requiredMissingCount = 0, hasRequiredPreferred = false } = args;
  if (missingCount <= 0) return "";

  if (hasRequiredPreferred && requiredMissingCount > 0) {
    return `${requiredMissingCount} required skill${requiredMissingCount === 1 ? "" : "s"} from this job ${requiredMissingCount === 1 ? "isn't" : "aren't"} proven in your work bullets yet. Select a matching fix and run Optimize to strengthen proof.`;
  }

  return `${missingCount} skill${missingCount === 1 ? "" : "s"} this job asks for ${missingCount === 1 ? "isn't" : "aren't"} shown in your work bullets yet. Select fixes on the left and run Optimize to close the gap.`;
}

export const OPTIMIZE_RISK_AREAS_TITLE = "Still thin after optimize";
export const OPTIMIZE_RISK_AREAS_INTRO =
  "These items stayed weak or unproven after your selected fixes. Review before you apply.";

export type KeywordCoverageMetricInput = {
  score: number;
  matchedCount: number;
  totalCount: number;
  coverageLabel: string;
};

export function buildKeywordCoverageMetricInput(args: {
  score: number | null | undefined;
  matchedSkills: string[];
  missingSkills: string[];
}): KeywordCoverageMetricInput | undefined {
  if (args.score === null) return undefined;
  const score = typeof args.score === "number" ? args.score : 0;
  const totalCount = args.matchedSkills.length + args.missingSkills.length;
  return {
    score,
    matchedCount: args.matchedSkills.length,
    totalCount,
    coverageLabel: getKeywordCoverageLabel(score),
  };
}

export function evidenceStrengthDescription(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "In a project or role bullet, counts as work proof";
    case "medium":
      return "Skills list only, move into work bullets";
    case "weak":
      return "Summary only, not in project or role bullets";
    case "gap":
      return "Not in resume — target with a selected fix in Optimize";
  }
}

export function evidenceStrengthShortLabel(strength: EvidenceStrength): string {
  switch (strength) {
    case "strong":
      return "Proven";
    case "medium":
      return "Partial";
    case "weak":
      return "Listed only";
    case "gap":
      return "Missing";
  }
}

export function snapshotSummaryLine(dashboard: EvidenceDashboard): string {
  const { snapshot, seniority } = dashboard;
  const domainPhrase = jdDomainLabel(dashboard.jdDomain);
  return `This posting reads as ${domainPhrase} at ${seniority.roleLevelLabel.toLowerCase()} scope. ${snapshot.jdSkillsProved} of ${snapshot.jdSkillsTotal} required skills are proven in work bullets. Measurable-outcome coverage averages ${snapshot.impactCoverage}% across project experiences.`;
}
