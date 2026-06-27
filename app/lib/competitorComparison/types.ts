export type ComparisonTableRow = {
  capability: string;
  resumeAtlas: string;
  competitor: string;
};

export type WhoEachToolForRow = {
  ifYouWant: string;
  bestChoice: string;
};

export type WorkflowComparison = {
  resumeAtlasSteps: string[];
  competitorSteps: string[];
};

export type ExampleAnalysis = {
  roleLabel: string;
  resumeExcerpt: string;
  jdExcerpt: string;
  competitorHeadline: string;
  competitorDetail: string;
  resumeAtlasVerdict: string;
  resumeAtlasDetail: string;
  rejectionRisks: string[];
  recommendedFixes: string[];
  takeaway: string;
};

export type WhyAlternativeSection = {
  intro: string;
  reasons: string[];
};

export type PhilosophySection = {
  competitorTagline: string;
  resumeAtlasTagline: string;
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
  /** One sentence: what question the competitor answers. */
  heroCompetitorLine: string;
  /** One sentence: ResumeAtlas differentiation. */
  heroResumeAtlasLine: string;
  /** Core question the competitor optimizes for. */
  competitorCoreQuestion: string;
  /** Core question ResumeAtlas optimizes for. */
  resumeAtlasCoreQuestion: string;
  /** Targets "[competitor] alternative" / competitor intent after hero. */
  whyAlternative: WhyAlternativeSection;
  /** Memorable decision-model contrast (H2: "[Competitor] vs ResumeAtlas: Philosophy"). */
  philosophy: PhilosophySection;
  ctaHref: string;
  ctaLabel: string;
  /** Hero CTA override. Falls back to ctaLabel. */
  primaryCtaLabel?: string;
  /** Mobile sticky CTA override. Falls back to ctaLabel. */
  stickyCtaLabel?: string;
  /** Short trust signals rendered below the hero CTA. */
  trustSignals?: string[];
  /** Capability table intro override. */
  capabilitySubheading?: string;
  /** Micro-CTA after capability table. Omit = no CTA. */
  tableCtaLabel?: string;
  /** Value ladder copy after workflow comparison. */
  workflowValueLadder?: string;
  /** Text CTA after workflow comparison. Omit = no CTA. */
  workflowCtaLabel?: string;
  /** Button label after example analysis. Omit = text link fallback. */
  exampleCtaLabel?: string;
  whoEachToolIsFor: WhoEachToolForRow[];
  workflow: WorkflowComparison;
  comparisonRows: ComparisonTableRow[];
  exampleAnalysis: ExampleAnalysis;
  strengths: {
    resumeAtlas: string[];
    competitor: string[];
  };
  limitations: {
    resumeAtlas: string[];
    competitor: string[];
  };
  faq: { question: string; answer: string }[];
  internalLinks: { path: string; label: string }[];
};
