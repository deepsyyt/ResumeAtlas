/**
 * Universal score color thresholds for the ATS dashboard.
 *
 * Overall ATS Score: 85–100 Strong match (Green), 70–84 Moderate (Yellow),
 *                    50–69 Weak (Orange), <50 Poor (Red)
 *
 * Metrics use per-metric Good / Medium / Bad thresholds (see below).
 */

export type ScoreBand = "excellent" | "strong" | "moderate" | "weak" | "poor";

export type ScoreStyle = {
  band: ScoreBand;
  hex: string;
  bgHex: string;
  label: string;
};

const BANDS: Record<ScoreBand, { hex: string; bgHex: string }> = {
  excellent: { hex: "#16A34A", bgHex: "#ECFDF5" },   // Emerald / Green
  strong:    { hex: "#22C55E", bgHex: "#ECFDF5" },   // Green
  moderate:  { hex: "#EAB308", bgHex: "#FEFCE8" },   // Yellow
  weak:      { hex: "#F97316", bgHex: "#FFF7ED" },   // Orange
  poor:      { hex: "#EF4444", bgHex: "#FEF2F2" },   // Red
};

/** Overall ATS score only: 85+ Green, 70–84 Yellow, 50–69 Orange, <50 Red. */
export function getScoreStyle(score: number): ScoreStyle {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s >= 85) return { band: "strong", ...BANDS.strong, label: "Strong match" };
  if (s >= 70) return { band: "moderate", ...BANDS.moderate, label: "Moderate" };
  if (s >= 50) return { band: "weak", ...BANDS.weak, label: "Weak" };
  return { band: "poor", ...BANDS.poor, label: "Poor" };
}

/** ATS Pass Likelihood badge label (main metric). */
export function getATSBadgeLabel(score: number): string {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s >= 85) return "Strong Match";
  if (s >= 70) return "Moderate";
  if (s >= 50) return "Weak";
  return "Poor";
}

/** ATS verdict box: short message for the user. */
export function getATSVerdictMessage(score: number): string {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s >= 85) return "Your resume has a strong chance of passing ATS systems when applying for this role.";
  if (s >= 70) return "Your resume has a moderate chance of passing ATS. Consider adding a few more aligned keywords and impact metrics.";
  if (s >= 50) return "Your resume may struggle with ATS. Focus on adding missing keywords and quantified achievements.";
  return "Your resume is at high risk of ATS rejection. Prioritize keyword alignment and measurable impact.";
}

/** ATS score ring: 85+ Green, 70–84 Yellow, 50–69 Orange, <50 Red. */
export function getATSRingHex(score: number): string {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s >= 85) return BANDS.strong.hex;
  if (s >= 70) return BANDS.moderate.hex;
  if (s >= 50) return BANDS.weak.hex;
  return BANDS.poor.hex;
}

/** Keyword coverage: Good >80, Medium 60–80, Bad <60. */
export function getKeywordCoverageStyle(score: number): ScoreStyle {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s > 80) return { band: "strong", ...BANDS.strong, label: "Good coverage" };
  if (s >= 60) return { band: "moderate", ...BANDS.moderate, label: "Partial coverage" };
  return { band: "poor", ...BANDS.poor, label: "Missing keywords" };
}

export function getKeywordCoverageLabel(score: number): string {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s > 80) return "Good coverage";
  if (s >= 60) return "Partial coverage";
  return "Missing critical keywords";
}

/** Semantic similarity: Good >80, Medium 65–80, Bad <65. */
export function getSemanticStyle(score: number): ScoreStyle {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s > 80) return { band: "strong", ...BANDS.strong, label: "Strong role alignment" };
  if (s >= 65) return { band: "moderate", ...BANDS.moderate, label: "Moderate role alignment" };
  return { band: "poor", ...BANDS.poor, label: "Low role alignment" };
}

/** Experience alignment: Good >85, Medium 70–85, Bad <70 (score-based). Years logic unchanged. */
export type ExperienceCondition = "above" | "exact" | "slightly_below" | "far_below";

export function getExperienceAlignmentStyle(
  requiredYears: number | null,
  resumeYears: number,
  alignmentScore: number
): { condition: ExperienceCondition; style: ScoreStyle } {
  const s = Math.max(0, Math.min(100, Math.round(alignmentScore)));
  if (requiredYears === null) {
    if (s > 85) return { condition: "exact", style: { band: "strong", ...BANDS.strong, label: "Not specified in JD" } };
    if (s >= 70) return { condition: "exact", style: { band: "moderate", ...BANDS.moderate, label: "Not specified in JD" } };
    return { condition: "exact", style: { band: "poor", ...BANDS.poor, label: "Not specified in JD" } };
  }
  const diff = resumeYears - requiredYears;
  if (diff > 0) {
    return { condition: "above", style: { band: "strong", ...BANDS.strong, label: "Above requirement" } };
  }
  if (diff === 0) {
    return { condition: "exact", style: { band: "strong", ...BANDS.strong, label: "Meets requirement" } };
  }
  if (s > 85) return { condition: "slightly_below", style: { band: "strong", ...BANDS.strong, label: "Close to requirement" } };
  if (s >= 70) return { condition: "slightly_below", style: { band: "moderate", ...BANDS.moderate, label: "Slightly below" } };
  return { condition: "far_below", style: { band: "poor", ...BANDS.poor, label: "Far below requirement" } };
}

/** Impact score: Good >75, Medium 55–75, Bad <55. */
export function getImpactStyle(score: number): ScoreStyle {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s > 75) return { band: "strong", ...BANDS.strong, label: "Strong impact" };
  if (s >= 55) return { band: "moderate", ...BANDS.moderate, label: "Moderate impact" };
  return { band: "poor", ...BANDS.poor, label: "Add more metrics" };
}

/** Resume quality: Good >80, Medium 60–80, Bad <60. */
export function getResumeQualityStyle(score: number): ScoreStyle {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  if (s > 80) return { band: "strong", ...BANDS.strong, label: "Good" };
  if (s >= 60) return { band: "moderate", ...BANDS.moderate, label: "Fair" };
  return { band: "poor", ...BANDS.poor, label: "Needs improvement" };
}
