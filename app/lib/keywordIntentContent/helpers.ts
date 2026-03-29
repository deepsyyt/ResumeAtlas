import type { KeywordCluster, KeywordExample, KeywordIntentContent, PlacementGuideRow } from "./types";

export function ex(bad: string, good: string, explanation?: string): KeywordExample {
  return explanation ? { bad, good, explanation } : { bad, good };
}

export function cluster(
  title: string,
  description: string,
  keywords: string[],
  usageExamples: KeywordExample[]
): KeywordCluster {
  return { title, description, keywords, usageExamples };
}

export function page(
  metaDescription: string,
  intro: string,
  clusters: KeywordCluster[],
  placementGuide: PlacementGuideRow[],
  mistakes: string[]
): KeywordIntentContent {
  return { metaDescription, intro, clusters, placementGuide, mistakes };
}
