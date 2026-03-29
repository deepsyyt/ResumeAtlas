export type KeywordExample = {
  bad: string;
  good: string;
  explanation?: string;
};

export type KeywordCluster = {
  title: string;
  keywords: string[];
  description: string;
  usageExamples: KeywordExample[];
};

export type PlacementSection = "summary" | "skills" | "experience";

export type PlacementGuideRow = {
  section: PlacementSection;
  advice: string;
  example?: string;
};

export type KeywordIntentContent = {
  /** SEO meta; replaces one-line keywordIntentDescription() */
  metaDescription: string;
  intro: string;
  clusters: KeywordCluster[];
  placementGuide: PlacementGuideRow[];
  mistakes: string[];
};
