import type { JDAnalysisResult } from "./jdAnalysis";
import { flattenResumeToText } from "./jdMatch";
import type { Resume } from "@/app/types/resume";

const IMPACT_VERBS = [
  "led", "managed", "built", "scaled", "transformed", "optimized", "drove",
  "delivered", "achieved", "increased", "reduced", "improved", "launched",
  "developed", "implemented", "executed", "established", "grew", "streamlined",
];

const TEAM_SIZE_PATTERNS = [
  /\d+\+?\s*(people|team|members|engineers|reportees)/i,
  /team\s+of\s+\d+/i,
  /led\s+\d+/i,
  /managed\s+\d+/i,
  /direct\s+report(s)?/i,
];

const METRIC_PATTERN = /[\d$%€£]|\d+[kKmMbB]|\d+\s*(people|team|%|percent|million|billion)/i;

function hasImpactVerb(text: string): boolean {
  const lower = text.toLowerCase();
  return IMPACT_VERBS.some((v) => lower.includes(v));
}

function hasNumericMetric(text: string): boolean {
  return METRIC_PATTERN.test(text);
}

function hasTeamSizeIndicator(text: string): boolean {
  return TEAM_SIZE_PATTERNS.some((p) => p.test(text));
}

function competencyMentionedInResume(competency: string, resumeText: string): boolean {
  const words = competency.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  return words.some((w) => resumeText.toLowerCase().includes(w));
}

export function detectEvidenceGaps(
  jdAnalysis: JDAnalysisResult,
  resume: Resume
): string[] {
  const resumeText = flattenResumeToText(resume);
  const gaps: string[] = [];

  const allCompetencies = [
    { category: "Core skill", items: jdAnalysis.coreSkills },
    { category: "Core competency", items: jdAnalysis.coreCompetencies },
    { category: "Leadership expectation", items: jdAnalysis.leadershipExpectations },
    { category: "Business outcome", items: jdAnalysis.businessOutcomes },
  ];

  for (const { category, items } of allCompetencies) {
    for (const item of items) {
      if (!item || typeof item !== "string") continue;
      const mentioned = competencyMentionedInResume(item, resumeText);
      if (!mentioned) {
        gaps.push(`${category} "${item.slice(0, 50)}${item.length > 50 ? "…" : ""}" not reflected in resume`);
        continue;
      }
      const hasMetric = hasNumericMetric(resumeText);
      const hasVerb = hasImpactVerb(resumeText);
      if (!hasMetric && (category === "Business outcome" || category === "Leadership expectation")) {
        gaps.push(`"${item.slice(0, 40)}…" lacks measurable evidence (metrics)`);
      } else if (!hasVerb && (category === "Leadership expectation")) {
        if (!hasTeamSizeIndicator(resumeText) && /lead|team|manage|large/i.test(item)) {
          gaps.push(`Leadership expectation "${item.slice(0, 40)}…" lacks clear ownership/impact verbs`);
        }
      }
    }
  }

  return Array.from(new Set(gaps)).slice(0, 10);
}
