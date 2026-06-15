export type ComparisonTableRow = {
  feature: string;
  resumeAtlas: string;
  jobscan: string;
};

export type BenchmarkResultRow = {
  label: string;
  resumeAtlas: string;
  jobscan: string;
};

export type RoleComparisonSection = {
  role: string;
  anchorSlug: string;
  intro: string;
  resumeAtlas: string;
  competitor: string;
};

export type CompetitorComparisonPageConfig = {
  path: string;
  competitorName: string;
  competitorSlug: string;
  primaryKeyword: string;
  title: string;
  h1: string;
  metaDescription: string;
  lastUpdatedLabel: string;
  heroAnswer: string;
  verdictSummary: string;
  quickVerdictPoints: string[];
  ctaHref: string;
  ctaLabel: string;
  comparisonRows: ComparisonTableRow[];
  benchmark: {
    roleLabel: string;
    resumeExcerpt: string;
    jdExcerpt: string;
    results: BenchmarkResultRow[];
    takeaway: string;
  };
  pricing: {
    resumeAtlas: string[];
    jobscan: string[];
  };
  strengths: {
    resumeAtlas: string[];
    jobscan: string[];
  };
  limitations: {
    resumeAtlas: string[];
    jobscan: string[];
  };
  audience: { persona: string; pick: string }[];
  roleComparisons: RoleComparisonSection[];
  whyAlternatives: string[];
  faq: { question: string; answer: string }[];
  internalLinks: { path: string; label: string }[];
};
