import type { Resume } from "@/app/types/resume";

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of",
  "with", "by", "from", "as", "is", "was", "are", "were", "been", "be", "have",
  "has", "had", "do", "does", "did", "will", "would", "could", "should", "may",
  "might", "must", "shall", "can", "need", "dare", "ought", "used", "this",
  "that", "these", "those", "i", "you", "he", "she", "it", "we", "they",
  "what", "which", "who", "whom", "whose", "where", "when", "why", "how",
]);

function extractKeywords(text: string): string[] {
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ");
  const words = normalized.split(" ").filter((w) => w.length > 1);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const w of words) {
    if (STOPWORDS.has(w)) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    out.push(w);
  }
  return out;
}

export function flattenResumeToText(resume: Resume): string {
  const parts: string[] = [
    resume.basics.name,
    resume.basics.title,
    resume.basics.summary,
    ...resume.skills,
    ...resume.experience.flatMap((e) => [
      e.company,
      e.role,
      e.duration,
      ...e.bullets,
    ]),
    ...resume.education.flatMap((e) => [e.institution, e.degree, e.year]),
  ];
  return parts.filter(Boolean).join(" ");
}

export type JDMatchResult = {
  totalKeywords: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  matchPercentage: number;
};

export function computeJDMatch(
  jobDescription: string,
  resume: Resume
): JDMatchResult {
  const jdKeywords = extractKeywords(jobDescription);
  const resumeText = flattenResumeToText(resume);
  const resumeLower = resumeText.toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of jdKeywords) {
    if (resumeLower.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  }

  const total = jdKeywords.length;
  const matchPercentage = total > 0 ? Math.round((matched.length / total) * 100) : 0;

  return {
    totalKeywords: total,
    matchedKeywords: matched,
    missingKeywords: missing,
    matchPercentage,
  };
}
