import type { EvidenceCategoryScore } from "@/app/lib/resumeEvidenceScore";
import { classifyBulletEvidenceSignals } from "@/app/lib/resumeEvidenceScore";

const JD_TOPIC_PATTERNS: { category: string; patterns: RegExp[] }[] = [
  {
    category: "GenAI",
    patterns: [/\b(genai|generative\s+ai|llm|rag\b|retrieval-augmented|prompt\s+engineer|langchain|hugging\s*face|openai|fine-tun)/i],
  },
  {
    category: "Cloud",
    patterns: [/\b(aws|amazon\s+web|gcp|google\s+cloud|azure|s3\b|sagemaker|lambda|ec2|bedrock|databricks)\b/i],
  },
  {
    category: "MLOps",
    patterns: [/\b(mlops|ci\/?cd|monitoring|versioning|airflow|dag\b|model\s+monitoring|deployment\s+pipeline)\b/i],
  },
  {
    category: "Architecture",
    patterns: [/\b(architecture|system\s+design|scalable|pipeline|microservice|end-to-end)\b/i],
  },
  {
    category: "Deployment",
    patterns: [/\b(deploy|production|api\b|rest\s+api|flask|serving|inference)\b/i],
  },
  {
    category: "Data & analytics",
    patterns: [/\b(sql|tableau|power\s*bi|looker|etl|data\s+warehouse|analytics|reporting|dashboards?|snowflake|spark)\b/i],
  },
  {
    category: "Frontend",
    patterns: [/\b(react|vue|angular|typescript|javascript|css|html|next\.?js|ui\/ux|figma)\b/i],
  },
  {
    category: "Backend",
    patterns: [/\b(java|python|node\.?js|golang|\.net|c#|rest\s+api|graphql|microservices?)\b/i],
  },
  {
    category: "Leadership",
    patterns: [/\b(people\s+management|team\s+leadership|mentor(?:ing)?|stakeholder|cross-functional|org(?:anization)?al)\b/i],
  },
];

export function extractJdTopicPhrasesInText(
  text: string,
  categoryNames: Iterable<string>
): string[] {
  const names = new Set(categoryNames);
  const found = new Set<string>();

  for (const { category, patterns } of JD_TOPIC_PATTERNS) {
    if (!names.has(category)) continue;
    for (const pattern of patterns) {
      const re = new RegExp(pattern.source, "gi");
      let match: RegExpExecArray | null;
      while ((match = re.exec(text)) !== null) {
        const phrase = match[0]?.trim();
        if (phrase) found.add(phrase);
      }
    }
  }

  return Array.from(found).sort((a, b) => b.length - a.length);
}

/** Whether a bullet shows evidence for a JD topic category. */
export function jdTopicEvidentInBullet(text: string, category: string): boolean {
  if (extractJdTopicPhrasesInText(text, [category]).length > 0) return true;
  const signals = classifyBulletEvidenceSignals(text);
  switch (category) {
    case "Leadership":
      return signals.leadership;
    case "Architecture":
      return signals.architecture;
    case "Deployment":
    case "MLOps":
      return signals.deployment;
    default:
      return false;
  }
}

/** JD topics evidenced in a bullet (from categories this job cares about). */
export function jdTopicsEvidentInBullet(
  text: string,
  jdCategories: EvidenceCategoryScore[]
): string[] {
  return jdCategories
    .map((c) => c.category)
    .filter((category) => jdTopicEvidentInBullet(text, category));
}

/** Per-bullet JD topic tags for refined lines in the optimize preview. */
export function buildBulletJdTopicTags(args: {
  categories: EvidenceCategoryScore[];
  bulletDiffs: Array<{ original: string; improved: string; key?: string }>;
}): Record<string, string[]> {
  const tags: Record<string, string[]> = {};

  for (const diff of args.bulletDiffs) {
    if (!diff.key?.trim() || !diff.improved.trim()) continue;
    if (diff.original.trim() === diff.improved.trim()) continue;
    const topics = jdTopicsEvidentInBullet(diff.improved, args.categories);
    if (topics.length > 0) tags[diff.key] = topics;
  }

  return tags;
}

export function summaryJdTopicTags(
  summary: string | undefined,
  categories: EvidenceCategoryScore[]
): string[] {
  if (!summary?.trim()) return [];
  return jdTopicsEvidentInBullet(summary, categories);
}

const THEME_WEAKNESS_RE = /partially|no clear|not found|strengthen|weak/i;

/** JD topic categories that need stronger proof before optimization. */
export function weakJdCategoriesForRewrite(
  categories: EvidenceCategoryScore[]
): string[] {
  return categories
    .filter((c) => THEME_WEAKNESS_RE.test(c.detail) || c.score < 72)
    .map((c) => c.category);
}

function bulletLacksThemeSignal(text: string, category: string): boolean {
  const signals = classifyBulletEvidenceSignals(text);
  switch (category) {
    case "Leadership":
      return !signals.leadership;
    case "Architecture":
      return !signals.architecture;
    case "Deployment":
    case "MLOps":
      return !signals.deployment;
    case "GenAI":
    case "Data & analytics":
    case "Backend":
    case "Frontend":
    case "Cloud":
      return extractJdTopicPhrasesInText(text, [category]).length === 0;
    default:
      return extractJdTopicPhrasesInText(text, [category]).length === 0;
  }
}

/** Raise rewrite priority for bullets weak on JD themes the posting cares about. */
export function jdThemePriorityBoost(bulletText: string, weakJdCategories: string[]): number {
  let boost = 0;
  for (const category of weakJdCategories) {
    if (bulletLacksThemeSignal(bulletText, category)) boost += 32;
  }
  return boost;
}

export function jdThemesToStrengthenForBullet(
  bulletText: string,
  weakJdCategories: string[]
): string[] {
  return weakJdCategories.filter((category) => bulletLacksThemeSignal(bulletText, category));
}
