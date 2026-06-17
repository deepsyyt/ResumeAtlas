import type { KeywordScannerResultsData } from "@/app/components/KeywordScannerResultsPanel";

/** Static demo for `/resume-keyword-scanner` empty-state preview. */
export const DEMO_KEYWORD_SCANNER_RESULTS: KeywordScannerResultsData = {
  coverageScore: 72,
  coverageDetail: "6 of 9 posting terms found in your resume",
  missingKeywords: ["Kubernetes", "Terraform", "CI/CD", "on-call"],
  weakCoverageAreas: ["AWS", "Docker"],
  keywordFrequency: [
    { term: "Python", resumeCount: 4, postingCount: 3 },
    { term: "React", resumeCount: 2, postingCount: 2 },
    { term: "PostgreSQL", resumeCount: 2, postingCount: 1 },
    { term: "AWS", resumeCount: 1, postingCount: 2 },
  ],
  suggestedKeywords: ["Kubernetes", "Terraform", "CI/CD", "observability"],
};
