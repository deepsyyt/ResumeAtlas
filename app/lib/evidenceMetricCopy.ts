import type { ApplicationVerdict } from "@/app/lib/applicationVerdict";
import type { EvidenceStrength } from "@/app/lib/resumeEvidenceScore";
import type { BulletRefinementBreakdown } from "@/app/lib/optimizeBulletEvidence";
import type { KeywordCoverageVerdict } from "@/app/lib/skillProofLlm";
import { getKeywordCoverageLabel } from "@/app/lib/scoreColors";
import { OPTIMIZATION_BENEFIT_LINES, OPTIMIZATION_BENEFIT_MODAL_LINES } from "@/app/lib/productBenefits";

export const KEYWORD_COVERAGE_SCORE_TITLE = "Keyword coverage score";
export const KEYWORD_COVERAGE_SCORE_SUBTITLE =
  "Coverage % of JD keyword (matched vs missed).";

/** @deprecated Use KEYWORD_COVERAGE_SCORE_TITLE */
export const ATS_REFERENCE_TITLE = KEYWORD_COVERAGE_SCORE_TITLE;
/** @deprecated Use KEYWORD_COVERAGE_SCORE_SUBTITLE */
export const ATS_REFERENCE_SUBTITLE = KEYWORD_COVERAGE_SCORE_SUBTITLE;

export const ANALYSIS_REPORT_HEADING = "Analyze fit, then optimize for this job";
export const ANALYSIS_REPORT_SUBTITLE =
  "Verdict and elimination risks on the left — select fixes, then optimize summary and bullets to raise shortlist odds.";

export const OPTIMIZE_CTA_LABEL = "Increase shortlist odds";
export const OPTIMIZE_CTA_LABEL_HERO = "Optimize for this job";
export const OPTIMIZE_CTA_SUBLINE = "Strengthen proof before you apply";
export const OPTIMIZE_ALIGN_PRIVACY_NOTE = "Your data stays private. Nothing is shared with employers.";

export const OPTIMIZE_NUDGE_EYEBROW = "Your gaps are clear. Now close them.";
export const OPTIMIZE_NUDGE_HEADLINE = "Make this a shortlist-ready resume";
export const OPTIMIZE_NUDGE_SUBHEAD =
  "Pick your fixes and optimize in minutes. JD-tailored summary, proven skills in bullets, rejection fixes, and impact metrics.";
export const OPTIMIZE_NUDGE_SUBHEAD_SHORT =
  "Optimize free after sign-in — tailored summary, proven bullets, and the fixes you selected.";
export const OPTIMIZE_NUDGE_BENEFITS_TITLE = "What you get with optimization";
export const OPTIMIZE_NUDGE_OPTIMIZATION_POTENTIAL_LABEL = "optimization potential";
export const OPTIMIZE_NUDGE_CURRENT_MATCH_LABEL = "Current match";
export const OPTIMIZE_NUDGE_ESTIMATED_MATCH_LABEL = "Estimated match";
export const OPTIMIZE_NUDGE_URGENCY =
  "Applying to 20 jobs with one resume burns time.";
export const OPTIMIZE_NUDGE_URGENCY_EMPHASIS = "Aligning per job gets you shortlisted more.";
export const OPTIMIZE_NUDGE_PRIVACY_FOOTER = "Secure • Private • Only visible to you";
export const OPTIMIZE_NUDGE_BENEFITS = OPTIMIZATION_BENEFIT_MODAL_LINES;
export const OPTIMIZE_NUDGE_CREDIT_APPLIED = "1 credit applied.";

export const LOGIN_NUDGE_BANNER = "You're signed in. Your scan is saved.";
export const LOGIN_NUDGE_HEADLINE = "Pick up where you left off";
export const LOGIN_NUDGE_SUBHEAD =
  "Your verdict, skill proof map, and recommended fixes are ready. Optimize free now — summary, proven bullets, and selected fixes for this posting.";
export const LOGIN_NUDGE_SUBHEAD_SHORT =
  "You're signed in — optimize free with your selected fixes for this posting.";

export const OPTIMIZE_ALIGN_CARD_TITLE = "Align before you apply";
export const OPTIMIZE_ALIGN_CARD_BODY = OPTIMIZE_NUDGE_SUBHEAD;
export const OPTIMIZE_ALIGN_CARD_HINT =
  "Select at least one recommended fix on the left.";
export const OPTIMIZE_ALIGN_CARD_DEMO_HINT =
  "Run a check to see recommended fixes pre-selected here.";
export const OPTIMIZE_ALIGN_BENEFITS_TITLE = "What optimization delivers for this job";
export const DASHBOARD_APPLICATION_READINESS_TITLE = "Application readiness";
export const DASHBOARD_ESTIMATED_SHORTLIST_TITLE = "Estimated shortlist odds";
export const DASHBOARD_INCREASE_CHANCES_TITLE = "Increase your chances";
export const DASHBOARD_INCREASE_CHANCES_BULLETS = [
  "Fix gaps that reduce your shortlist odds",
  "Add missing proof & impact metrics",
  "Align better with this job's expectations",
] as const;
export const DASHBOARD_OPTIMIZE_NOW_CTA = "Optimize Resume Now";
export const DASHBOARD_OPTIMIZE_NOW_SUBLINE = "Apply optimized fixes & boost your odds";
export const DASHBOARD_COMPETITIVE_CANDIDATE_LINE = "You're a competitive candidate";
export const DASHBOARD_TOP_HERO_CHIPS = [
  "AI-Powered Analysis",
  "Role-Specific Insights",
  "ATS + Recruiter Aligned",
  "Private & Secure",
] as const;
export const DASHBOARD_OPTIMIZATION_DELIVERS_TITLE = "What optimization delivers";
export const DASHBOARD_OPTIMIZATION_DELIVERS_BENEFITS = [
  {
    label: "JD-aligned summary",
    body: "Professional summary rewritten for this posting, domain, focus, and tools.",
  },
  {
    label: "Listed-only → proven",
    body: "Weak skills and keywords turned into action-demonstrated project bullets with concrete evidence.",
  },
  {
    label: "Selected rejection fixes",
    body: "Add high-signal bullets, quantification, and proof to raise shortlist odds.",
  },
  {
    label: "Impact quantification",
    body: "Tie bullets with data, metrics, and outcome results that strengthen proof.",
  },
  {
    label: "Edit, then download",
    body: "Review every change in an editable preview, then export application-ready PDF and DOCX.",
  },
] as const;
export const DASHBOARD_OPTIMIZATION_IMPACT_TITLE = "See the impact of optimization";
export const OPTIMIZE_ALIGN_BEFORE_DASHBOARD_LABEL = "Before (current resume)";
export const OPTIMIZE_ALIGN_AFTER_DASHBOARD_LABEL = "After (with optimized fixes)";
export const OPTIMIZE_ALIGN_BEFORE_BADGE = "Too generic, less impact";
export const OPTIMIZE_ALIGN_AFTER_BADGE = "Stronger impact, more interviews";
export const OPTIMIZE_ALIGN_APPLY_FIXES_TITLE = "Apply optimized fixes in one click";
export const OPTIMIZE_ALIGN_APPLY_FIXES_BULLETS = [
  "ATS & recruiter aligned",
  "Role-specific optimization",
  "Proven frameworks",
  "Instant improvements",
] as const;
export const OPTIMIZE_ALIGN_IMPACT_CTA = "Optimize Now";
export const OPTIMIZE_ALIGN_SEE_IMPROVED_RESUME = "See your improved resume";
export const DASHBOARD_IMPACT_BEFORE_BULLETS = [
  "Led cross-functional delivery with stakeholder alignment.",
] as const;
export const DASHBOARD_IMPACT_AFTER_BULLETS = [
  "Led cross-functional delivery of scalable GenAI products, reducing inference latency by 32% using AWS.",
] as const;
export const DASHBOARD_REJECTION_RISKS_TITLE = "Why you might not get shortlisted";
export const DASHBOARD_BOTTOM_CTA_HEADLINE = "Don't leave interviews on the table";
export const DASHBOARD_BOTTOM_CTA_FOOTER = "Takes 2 minutes · 100% Safe & Private";
export const KEYWORD_COVERAGE_DASHBOARD_TITLE = "Keyword coverage";
export const OPTIMIZE_ALIGN_BENEFITS = OPTIMIZATION_BENEFIT_LINES;

export const OPTIMIZE_NUDGE_CREDIT_NOTICE =
  "1 credit applied. Next step: optimize so this resume is interview-ready for this posting.";

export const DOWNLOAD_UNLOCK_EYEBROW = "Optimized for this job";
export const DOWNLOAD_UNLOCK_TITLE = "Pay to download your resume";
export const DOWNLOAD_UNLOCK_BODY =
  "Your tailored file is ready. Complete a one-time payment to download it and unlock job credits for future roles.";
export const DOWNLOAD_UNLOCK_BENEFITS_TITLE = (price: string) => `What ${price} unlocks`;
export const DOWNLOAD_UNLOCK_BENEFITS = [
  "PDF and editable file download for current optimized resume",
  "Plus 5 job credits included: check, optimize, and download per role",
  "ATS-friendly export built for screening systems",
  "Align each application instead of mass-applying with generic resume",
] as const;
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
  "Full apply-readiness analysis per job",
  "JD-tailored summary and proven bullets",
  "Selected rejection fixes demonstrated in your projects",
  "Editable preview and PDF/DOCX download",
] as const;
export const CONVERSION_MODAL_PRICE_LABEL = "One-time unlock";
export const CONVERSION_MODAL_PRICE_HEADLINE = (price: string) => `${price} · 5 jobs`;
export const CONVERSION_MODAL_PRICE_SUBLINE = "Check, optimize, download for each role";
export const CONVERSION_MODAL_CTA = (price: string) => `Unlock optimization for ${price}`;

export const CREDIT_PACK_EXHAUSTED_HEADLINE = "Keep landing interviews. Don't stop at one job.";
export const CREDIT_PACK_EXHAUSTED_SUBHEAD =
  "You have used this run. Get 5 more full job credits: match check, optimize, and ATS-ready download for each posting.";
export const CREDIT_PACK_OFFER_SUBHEAD = "Less time applying. More time interviewing.";
export const CREDIT_PACK_BENEFITS = [
  "Apply-readiness analysis: verdict, risks, and skill proof map",
  "Job-specific optimization: summary, proven bullets, selected fixes",
  "Impact quantification and editable preview per posting",
  "Download PDF and DOCX when ready to apply",
] as const;
export const CREDIT_PACK_CTA = (price: string) => `Get 5 job credits for ${price}`;
export const CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_HEADLINE = (credits: number) =>
  `${credits} job credit${credits === 1 ? "" : "s"} added`;
export const CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_BODY =
  "Your credits are on your account. Close this window, then click Analyze when you're ready to check your next job.";
export const CREDIT_PACK_PAYMENT_SUCCESS_CONTINUE_BODY =
  "You're all set. Use your credits whenever you're ready for the next job.";
export const CREDIT_PACK_PAYMENT_SUCCESS_ANALYZE_CTA = "Run job check";
export const CREDIT_PACK_PAYMENT_SUCCESS_CONTINUE_CTA = "Continue";
export const CREDIT_PACK_FREE_SCAN_HEADLINE = "You've used your free scan";

export const CREDIT_PACK_UPGRADE_BADGE = "1 free scan used";
export const CREDIT_PACK_UPGRADE_HEADLINE = "Upgrade to continue";
export const CREDIT_PACK_UPGRADE_SUBHEAD =
  "Your free scan covered one job. Add credits to check, optimize, and download for your next role.";
export const CREDIT_PACK_UPGRADE_BENEFITS_TITLE = (credits: number) =>
  `What you get with ${credits} credits`;
export const CREDIT_PACK_UPGRADE_BENEFITS = [
  {
    title: "Analyze up to 5 job postings",
    detail: "Verdict, elimination risks, skill proof map, and recommended fixes per role.",
  },
  {
    title: "Optimize each resume for that job",
    detail: "JD summary, proven bullets, selected rejection fixes, and impact metrics.",
  },
  {
    title: "Download PDF and DOCX",
    detail: "Editable preview first, then application-ready export per role.",
  },
] as const;
export const CREDIT_PACK_UPGRADE_FOOTNOTE = "Free scan resets 30 days after use. Job credits never expire.";

export const LIMIT_MODAL_ANON_HEADLINE = "Your free scan is used";
export const LIMIT_MODAL_ANON_SUBHEAD_PREFIX = "Sign in to get";
export const LIMIT_MODAL_ANON_SUBHEAD_HIGHLIGHT = "1 more free";
export const LIMIT_MODAL_ANON_SUBHEAD_SUFFIX =
  "resume scan and continue improving your chances.";
export const LIMIT_MODAL_ANON_PROMO = "Sign in and get 1 additional free scan";
export const LIMIT_MODAL_ANON_BENEFITS = [
  {
    title: "1 additional free scan",
    detail: "Unlock one more ATS scan instantly",
  },
  {
    title: "1-click optimize",
    detail: "Increase shortlist odds for this job",
  },
  {
    title: "Compare multiple resumes",
    detail: "Find the best version for every job",
  },
] as const;
export const LIMIT_MODAL_ANON_CTA = "Continue with Google";
export const LIMIT_MODAL_ANON_DISMISS = "Maybe later";
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
  "Rewrite the professional summary for this job description",
  "Prove listed-only skills in project bullets with demonstrated experience",
  "Apply your selected rejection fixes in the best-matching projects",
  "Quantify impact on thin bullets — goals achieved, scale, and outcomes",
  "Review in the editable preview, then download PDF or DOCX",
] as const;

export const ANALYSIS_OPTIMIZE_STEPS = [
  "Read application verdict and elimination risks",
  "Select recommended fixes to address",
  "Optimize summary and bullets for this posting",
  "Edit the preview, then download when ready",
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

/** Compact line for PDF / share exports — mirrors the application verdict card. */
export function applicationVerdictReportLine(verdict: ApplicationVerdict): string {
  const pct = clampLikelihoodPct(verdict.shortlistPct);
  return `~${pct}% estimated shortlist odds · ${verdict.badgeLabel}`;
}

/** Compact line for PDF / share exports — mirrors the keyword coverage score card. */
export function keywordCoverageReportLine(
  coverage: KeywordCoverageMetricInput,
  verdict: KeywordCoverageVerdict
): string {
  return `${keywordCoverageScoreLine(coverage)} ${verdict.headline}`.trim();
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
export const RECOMMENDED_FIXES_IMPACT_TITLE = "Recommended fixes";
export const RECOMMENDED_FIXES_INTRO =
  "Pre-selected for this posting. Keep at least one checked to run Optimize.";
export const RECOMMENDED_FIXES_INTRO_COMPACT =
  "Pre-selected for this posting · keep one checked to optimize.";

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

