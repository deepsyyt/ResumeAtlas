import { flattenResumeToText } from "./jdMatch";
import type { Resume } from "@/app/types/resume";

const FIRST_PERSON = /\b(I|me|my|we|our|us)\b/i;
const WEAK_VERBS = /\b(helped|assisted|supported|worked on|participated|contributed|involved in)\b/i;
const METRIC_IN_BULLET = /[\d$%]|\d+[kKmMbB]|%\s*increase|%\s*reduction|reduced by|increased by/i;

export type ATSScanResult = {
  riskLevel: "Low" | "Medium" | "High";
  issues: string[];
};

function countBulletsWithMetrics(resume: Resume): { total: number; withMetrics: number } {
  let total = 0;
  let withMetrics = 0;
  for (const exp of resume.experience) {
    for (const bullet of exp.bullets) {
      total++;
      if (METRIC_IN_BULLET.test(bullet)) withMetrics++;
    }
  }
  return { total, withMetrics };
}

function checkKeywordStuffing(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] ?? 0) + 1;
  }
  const max = Math.max(0, ...Object.values(freq));
  return max >= 8;
}

export function scanATS(resume: Resume): ATSScanResult {
  const text = flattenResumeToText(resume);
  const issues: string[] = [];

  if (FIRST_PERSON.test(text)) {
    issues.push("First-person pronouns detected (I, we, my, our)");
  }

  if (WEAK_VERBS.test(text)) {
    issues.push("Weak verbs detected (e.g. helped, assisted, supported)");
  }

  const { total: bulletTotal, withMetrics: bulletWithMetrics } = countBulletsWithMetrics(resume);
  if (bulletTotal > 0) {
    const pct = Math.round(((bulletTotal - bulletWithMetrics) / bulletTotal) * 100);
    if (pct >= 50) {
      issues.push(`${pct}% of bullets lack quantifiable metrics`);
    }
  }

  const paragraphs = resume.basics.summary.split(/\n\n+/);
  const longPara = paragraphs.some((p) => p.split(/\n/).length > 4);
  if (longPara) {
    issues.push("Long paragraph detected (consider shortening for ATS)");
  }

  if (checkKeywordStuffing(text)) {
    issues.push("Possible keyword stuffing (repeated terms)");
  }

  let riskLevel: ATSScanResult["riskLevel"] = "Low";
  if (issues.length >= 4) riskLevel = "High";
  else if (issues.length >= 1) riskLevel = "Medium";

  return { riskLevel, issues };
}
