import { classifyJdDomain, jdDomainLabel, type JdDomain } from "@/app/lib/jdDomainClass";
import { detectJdRoleLevel, roleLevelLabel, type JdRoleLevel } from "@/app/lib/jdRoleLevel";

export type SummaryTailoringMeta = {
  targetRoleTitle?: string;
  roleLevelLabel?: string;
  jdDomain?: JdDomain;
  jdTopics: string[];
  highlightKeywords: string[];
};

/** Map analyzer form role level to JD seniority band for summary tone. */
export function mapFormRoleLevelToJdBand(roleLevel: string | undefined): JdRoleLevel {
  const lower = String(roleLevel ?? "").trim().toLowerCase();
  if (lower.includes("leadership") || lower.includes("manager")) return "leadership";
  if (lower.includes("senior") || lower.includes("staff") || lower.includes("principal")) {
    return "senior_ic";
  }
  if (lower.includes("entry") || lower.includes("junior")) return "junior";
  return "mid";
}

export function buildSummaryJdTopics(
  jobDescription: string,
  targetRoleTitle?: string,
  matchedSkills: string[] = []
): string[] {
  const domain = classifyJdDomain(jobDescription, targetRoleTitle);
  const topics = new Set<string>();
  topics.add(jdDomainLabel(domain));
  if (targetRoleTitle?.trim()) topics.add(targetRoleTitle.trim());
  for (const skill of matchedSkills.slice(0, 4)) {
    const t = skill.trim();
    if (t.length >= 3 && t.length <= 48) topics.add(t);
  }
  return Array.from(topics).slice(0, 5);
}

export function buildSummaryHighlightKeywords(
  summary: string,
  matchedSkills: string[],
  targetRoleTitle?: string,
  max = 8
): string[] {
  const lower = summary.toLowerCase();
  const out: string[] = [];
  const seen = new Set<string>();

  const push = (kw: string) => {
    const t = kw.trim();
    if (!t || t.length < 2) return;
    const key = t.toLowerCase();
    if (seen.has(key)) return;
    if (!lower.includes(key)) return;
    seen.add(key);
    out.push(t);
  };

  if (targetRoleTitle?.trim()) {
    for (const part of targetRoleTitle.split(/[\s,/|–-]+/)) {
      if (part.length >= 4) push(part);
    }
  }
  for (const skill of matchedSkills) push(skill);
  return out.slice(0, max);
}

export function buildSummaryTailoringMeta(args: {
  jobDescription: string;
  summary: string;
  targetRoleTitle?: string;
  formRoleLevel?: string;
  matchedSkills?: string[];
}): SummaryTailoringMeta {
  const jdDomain = classifyJdDomain(args.jobDescription, args.targetRoleTitle);
  const jdBand = detectJdRoleLevel(args.jobDescription);
  const candidateBand = mapFormRoleLevelToJdBand(args.formRoleLevel);
  const roleLevelLabelText = args.targetRoleTitle?.trim()
    ? `${args.targetRoleTitle.trim()} · ${roleLevelLabel(candidateBand)}`
    : roleLevelLabel(jdBand);

  return {
    targetRoleTitle: args.targetRoleTitle?.trim() || undefined,
    roleLevelLabel: roleLevelLabelText,
    jdDomain,
    jdTopics: buildSummaryJdTopics(
      args.jobDescription,
      args.targetRoleTitle,
      args.matchedSkills ?? []
    ),
    highlightKeywords: buildSummaryHighlightKeywords(
      args.summary,
      args.matchedSkills ?? [],
      args.targetRoleTitle
    ),
  };
}
