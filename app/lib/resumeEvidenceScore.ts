import type { ResumeDocument } from "@/app/lib/resumeDocument";
import {
  resumeDocumentFromHeuristicParsed,
  resumeDocumentToPlainText,
} from "@/app/lib/resumeDocument";
import { parseResumeToJSON } from "@/app/lib/resumeParser";
import { resumeShowsSkillEvidence } from "@/app/lib/skillResumeEvidence";
import { filterSkillGapPhrases } from "@/app/lib/skillGapRules";
import { resumeShowsHomographOrShortSkillEvidence } from "@/app/lib/resumeTermMatch";
import {
  detectJdRoleLevel,
  evidenceMatchWeights,
  roleLevelLabel,
  seniorityMetricLabel,
  type JdRoleLevel,
} from "@/app/lib/jdRoleLevel";
import type { JdDomain } from "@/app/lib/jdDomainClass";
import { classifyJdDomain } from "@/app/lib/jdDomainClass";
import type { ApplicationVerdictLlm } from "@/app/lib/applicationVerdictLlm";
import type { KeywordCoverageVerdict } from "@/app/lib/skillProofLlm";
import type { RoleFitRow } from "@/app/lib/roleFitArchetypes";
import type { RecommendedFix } from "@/app/lib/recommendedFixes";
import { validateRecommendedFixTargets } from "@/app/lib/recommendedFixes";
import type {
  JdSkillProofStatus,
  SkillOptimizeAction,
} from "@/app/lib/jdSkillProofStatus";
import { resolveSkillProofRow, selectSkillProofForDisplay } from "@/app/lib/jdSkillProofStatus";

export type EvidenceStrength = "gap" | "weak" | "medium" | "strong";

export type JdSkillEvidenceRow = {
  skill: string;
  strength: EvidenceStrength;
  /** Universal proof status for UI and optimize actions. */
  proofStatus: JdSkillProofStatus;
  optimizeAction: SkillOptimizeAction;
  mentionCount: number;
  /** Where proof lives in the resume. */
  evidenceLocation: "project" | "experience" | "skills_only" | "summary" | "none";
  /** First project/role hint when evidence is project-level. */
  evidenceHint?: string;
  /** LLM-generated why line for live keyword coverage table. */
  whyDetail?: string;
  jdRequired: boolean;
};

export type SeniorityAlignment = {
  score: number;
  /** Inferred JD band used to weight metrics and gap copy. */
  roleLevel: JdRoleLevel;
  roleLevelLabel: string;
  seniorityMetricLabel: string;
  /** True when JD is senior IC or people-leadership (legacy UI flag). */
  jdExpectsSeniority: boolean;
  /** Scope evidence found in resume text (never invented). */
  indicatorsFound: string[];
  /** Missing scope signals for this JD level (suggestions only). */
  gaps: string[];
};

export type EvidenceSnapshot = {
  evidenceMatch: number;
  impactCoverage: number;
  /** Roles/companies where at least one bullet shows measurable outcomes. */
  experiencesWithMetrics: number;
  totalExperiences: number;
  /** Legacy bullet counts (optimize diffs, internal). */
  bulletsWithMetrics: number;
  totalBullets: number;
  architectureSignal: number;
  leadershipSignal: number;
  deploymentSignal: number;
  seniorityAlignment: number;
  /** Share of JD target skills with project- or experience-level proof (not skills-only). */
  jdSkillProof: number;
  jdSkillsProved: number;
  jdSkillsTotal: number;
};

export type EvidenceDashboard = {
  evidenceMatch: number;
  snapshot: EvidenceSnapshot;
  seniority: SeniorityAlignment;
  skillProof: JdSkillEvidenceRow[];
  /** Full JD keyword proof list (skillProof is a capped dashboard sample). */
  skillProofAll?: JdSkillEvidenceRow[];
  /** Posting domain used to frame role-specific topics and summary copy. */
  jdDomain?: JdDomain;
  /** JD-specific topic coverage — populated by LLM in /api/analyze. */
  jdTopicsVersion?: number;
  riskAreas: RecommendedFix[];
  /** Bumped when fix-before-apply prompt/calibration changes. */
  riskAreasVersion?: number;
  /** Top rejection risks for this posting — populated by LLM in /api/analyze. */
  mostMissingEvidence?: string[];
  /** Bumped when missing-evidence prompt/calibration changes. */
  missingEvidenceVersion?: number;
  /** Career archetype fit — populated by LLM in /api/analyze. */
  roleFit?: RoleFitRow[];
  /** Target role title used to generate parallel role-fit rows. */
  targetRoleTitle?: string;
  /** Parallel role titles shown in the role-fit table (same order as roleFit). */
  roleFitTargetRoles?: string[];
  /** Bumped when role-fit prompt/calibration changes (invalidates stale cache). */
  roleFitVersion?: number;
  /** LLM apply / optimize-first / skip verdict for live dashboard. */
  applicationVerdictLlm?: ApplicationVerdictLlm;
  applicationVerdictVersion?: number;
  /** LLM keyword coverage verdict for the score card (live dashboard). */
  keywordCoverageVerdict?: KeywordCoverageVerdict;
  /** JD keyword proof rows — populated by LLM in /api/analyze. */
  skillProofVersion?: number;
};

const METRIC_RE =
  /(\d[\d.,]*\s*%|\$\s*\d[\d.,]*|\d[\d.,]*\s*(x|k|m|b|million|billion|users?|customers?|tickets?|projects?|hours?|days?|weeks?|months?|years?|articles?|assets?))/i;

/** Outcome language in bullets without requiring invented numbers. */
const OUTCOME_IMPACT_RE =
  /\b(measurable\s+(?:gains?|outcomes?|results?|improvements?)|(?:increased|improved|reduced|decreased|grew|boosted|elevated|accelerated|increase|improve)\b.{0,56}\b(?:ctr|revenue|engagement|conversion|retention|latency|throughput|accuracy|performance|efficiency|roi|page\s*views?|users?|customers?|tickets?|time)\b|\b(?:ctr|roi|kpi)\b)/i;

export function bulletHasImpactEvidence(text: string): boolean {
  return METRIC_RE.test(text) || OUTCOME_IMPACT_RE.test(text);
}

export type BulletEvidenceSignals = {
  impact: boolean;
  architecture: boolean;
  deployment: boolean;
  leadership: boolean;
};

export function classifyBulletEvidenceSignals(text: string): BulletEvidenceSignals {
  return {
    impact: bulletHasImpactEvidence(text),
    architecture: ARCHITECTURE_RE.test(text),
    deployment: DEPLOYMENT_RE.test(text),
    leadership: LEADERSHIP_RE.test(text) || COLLABORATION_RE.test(text),
  };
}

const ARCHITECTURE_RE =
  /\b(architect(?:ed|ure)?|system\s+architecture|solution\s+architecture|designed\s+(?:a|an|the)?\s*(?:multimodal|multi-stage|scalable|end-to-end|retrieval|pipeline|system|solution|platform)|multi-stage|end-to-end\s+(?:pipeline|system|solution|delivery)|retrieval\s+(?:architecture|pipeline|system)|system\s+design|technical\s+design|solution\s+design|scalable\s+(?:pipeline|architecture|workflow|inference|deployment|platform))\b/i;

const HANDS_ON_RE =
  /\b(built|implemented|developed|created|designed|shipped|delivered|maintained|automated|executed|produced|launched)\b/i;

const COLLABORATION_RE =
  /\b(collaborat(?:ed|ion|ing)|partnered|cross-functional|worked\s+with|aligned\s+with)\b/i;

const LEADERSHIP_RE =
  /\b(led|leading|lead\s+|managed|manag(?:ed|ing)|mentor(?:ed|ing)?|coached|coordinat(?:ed|ing)|spearheaded|oversaw|guided|championed|influenced|drove|cross-functional|stakeholder|people\s+management|team\s+of|ownership|principal|director|head\s+of)\b/i;

const DEPLOYMENT_RE =
  /\b(deploy(?:ed|ment)?|production|prod(?:uction)?\s+(?:system|deployment|pipeline)|\bapi\b|rest\s+api|microservice|flask|fastapi|webapp|mlops|ci\/?cd|monitoring|airflow|dag\b|workflow|serving|inference\s+at\s+scale)\b/i;

const GENERIC_BULLET_RE =
  /\b(innovative|dynamic|results-driven|data-driven\s+decision|enhance\s+customer|leveraged|utilized|passionate|seasoned|cutting-edge|synerg)\b/i;

const TEAM_SIZE_RE =
  /\b(team of\s*\d+|\d+\+?\s*(?:person|people|engineers?|scientists?|analysts?|members?|direct reports?|reports?)\b|led\s+(?:a\s+)?team\b|managed\s+\d+)/i;

const STAKEHOLDER_SCOPE_RE =
  /\b(stakeholders?|executives?|leadership team|c-?suite|vp[s]?\b|product\s+(?:managers?|leadership)|business\s+leaders?|client-facing|organizational)\b/i;

const OWNERSHIP_SCOPE_RE =
  /\b(owned|ownership|end-to-end|full lifecycle|accountable for|p&l|budget|portfolio|program ownership|product ownership|strategic)\b/i;

const MENTORING_RE =
  /\b(mentor(?:ed|ing)?|coach(?:ed|ing)?|developed team|team development|hiring|onboard(?:ed|ing)?)\b/i;

const SENIOR_TITLE_RE =
  /\b(manager|lead|principal|director|head of|vp|vice president|staff)\b/i;

const JD_CATEGORY_PATTERNS: { category: string; patterns: RegExp[] }[] = [
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

type BulletRecord = {
  text: string;
  location: "project" | "experience" | "summary" | "skills";
  hint?: string;
};

/** One employer/role block — metrics are scored per block, not per bullet. */
export type ExperienceBlock = {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  hint: string;
};

function experienceBlocksFromDocument(doc: ResumeDocument): ExperienceBlock[] {
  return (doc.experience ?? [])
    .map((exp) => {
      const bullets = [
        ...(exp.bullets ?? []),
        ...(exp.projects ?? []).flatMap((p) => p.bullets ?? []),
      ]
        .map((b) => b?.trim())
        .filter(Boolean) as string[];
      const hint = [exp.role, exp.company].filter(Boolean).join(" @ ") || "Experience";
      return {
        company: exp.company ?? "",
        role: exp.role ?? "",
        dates: exp.dates ?? "",
        bullets,
        hint,
      };
    })
    .filter((block) => block.bullets.length > 0);
}

function resolveStructuredResume(
  resumeText: string,
  structured?: ResumeDocument
): ResumeDocument | undefined {
  if (structured?.experience?.length) return structured;
  const parsed = resumeDocumentFromHeuristicParsed(parseResumeToJSON(resumeText));
  return parsed.experience?.length ? parsed : undefined;
}

/** Group work bullets by employer/role for experience-level evidence scoring. */
export function collectExperienceBlocks(
  resumeText: string,
  structured?: ResumeDocument
): ExperienceBlock[] {
  const doc = resolveStructuredResume(resumeText, structured);
  if (doc) {
    const blocks = experienceBlocksFromDocument(doc);
    if (blocks.length > 0) return blocks;
  }

  const fallbackBullets = collectBullets(resumeText, structured).filter(
    (b) => b.location === "project" || b.location === "experience"
  );
  if (fallbackBullets.length === 0) return [];

  return [
    {
      company: "",
      role: "",
      dates: "",
      bullets: fallbackBullets.map((b) => b.text),
      hint: "Experience",
    },
  ];
}

function experienceSignalScore(blocks: ExperienceBlock[], pattern: RegExp): number {
  if (blocks.length === 0) return 0;
  const hits = blocks.filter((block) => block.bullets.some((text) => pattern.test(text))).length;
  return Math.round((hits / blocks.length) * 100);
}

function experienceImpactCoverage(blocks: ExperienceBlock[]): {
  coverage: number;
  experiencesWithMetrics: number;
  totalExperiences: number;
} {
  const totalExperiences = blocks.length;
  if (totalExperiences === 0) {
    return { coverage: 0, experiencesWithMetrics: 0, totalExperiences: 0 };
  }

  const perExperienceCoverage: number[] = [];
  let experiencesWithMetrics = 0;

  for (const block of blocks) {
    const totalBullets = block.bullets.length;
    if (totalBullets === 0) continue;

    const bulletsWithMetrics = block.bullets.filter((text) => bulletHasImpactEvidence(text)).length;
    if (bulletsWithMetrics > 0) experiencesWithMetrics += 1;
    perExperienceCoverage.push(Math.round((bulletsWithMetrics / totalBullets) * 100));
  }

  const coverage =
    perExperienceCoverage.length > 0
      ? Math.round(
          perExperienceCoverage.reduce((sum, value) => sum + value, 0) / perExperienceCoverage.length
        )
      : 0;

  return { coverage, experiencesWithMetrics, totalExperiences };
}

function collectBullets(
  resumeText: string,
  structured?: ResumeDocument
): BulletRecord[] {
  const out: BulletRecord[] = [];

  if (structured) {
    const summary = structured.summary?.trim();
    if (summary) out.push({ text: summary, location: "summary" });

    for (const group of structured.skillGroups ?? []) {
      for (const item of group.items ?? []) {
        if (item?.trim()) out.push({ text: item.trim(), location: "skills" });
      }
    }
    for (const skill of structured.skills ?? []) {
      if (skill?.trim()) out.push({ text: skill.trim(), location: "skills" });
    }

    for (const exp of structured.experience ?? []) {
      const roleHint = [exp.role, exp.company].filter(Boolean).join(" @ ");
      for (const b of exp.bullets ?? []) {
        if (b?.trim()) out.push({ text: b.trim(), location: "experience", hint: roleHint });
      }
      for (const proj of exp.projects ?? []) {
        const projHint = proj.title?.trim() || roleHint;
        for (const b of proj.bullets ?? []) {
          if (b?.trim()) out.push({ text: b.trim(), location: "project", hint: projHint });
        }
      }
    }
    return out;
  }

  const lines = resumeText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const bullet = line.replace(/^[•\-*]\s*/, "").trim();
    if (bullet.length >= 20) {
      out.push({ text: bullet, location: "experience" });
    }
  }
  return out;
}

function countMentions(text: string, skill: string): number {
  const blob = text.toLowerCase();
  const key = skill.toLowerCase().trim();
  if (!key) return 0;

  const homograph = resumeShowsHomographOrShortSkillEvidence(text, skill);
  if (homograph !== null) return homograph ? 1 : 0;

  let count = 0;
  let idx = 0;
  while ((idx = blob.indexOf(key, idx)) !== -1) {
    count++;
    idx += key.length;
  }
  return count;
}

function classifySkillEvidence(
  skill: string,
  bullets: BulletRecord[],
  resumeText: string
): Pick<JdSkillEvidenceRow, "strength" | "mentionCount" | "evidenceLocation" | "evidenceHint"> {
  const mentionCount = countMentions(resumeText, skill);
  if (!resumeShowsSkillEvidence(resumeText, skill)) {
    return { strength: "gap", mentionCount: 0, evidenceLocation: "none" };
  }

  const projectHits = bullets.filter(
    (b) => b.location === "project" && resumeShowsSkillEvidence(b.text, skill)
  );
  if (projectHits.length > 0) {
    return {
      strength: "strong",
      mentionCount: Math.max(mentionCount, projectHits.length),
      evidenceLocation: "project",
      evidenceHint: projectHits[0]?.hint,
    };
  }

  const expHits = bullets.filter(
    (b) => b.location === "experience" && resumeShowsSkillEvidence(b.text, skill)
  );
  if (expHits.length > 0) {
    return {
      strength: "strong",
      mentionCount: Math.max(mentionCount, expHits.length),
      evidenceLocation: "experience",
      evidenceHint: expHits[0]?.hint,
    };
  }

  const skillsOnly = bullets.some(
    (b) => b.location === "skills" && resumeShowsSkillEvidence(b.text, skill)
  );
  if (skillsOnly) {
    return {
      strength: "medium",
      mentionCount,
      evidenceLocation: "skills_only",
    };
  }

  return { strength: "weak", mentionCount, evidenceLocation: "summary" };
}

function hasIndirectBulletEvidence(skill: string, bullets: BulletRecord[]): boolean {
  const workBullets = bullets.filter(
    (b) => b.location === "project" || b.location === "experience"
  );
  if (workBullets.length === 0) return false;

  const topic = jdTopicForSkill(skill);
  if (topic) {
    const category = JD_CATEGORY_PATTERNS.find((c) => c.category === topic);
    if (category && workBullets.some((b) => category.patterns.some((p) => p.test(b.text)))) {
      return true;
    }
  }

  const tokens = skill
    .toLowerCase()
    .split(/[\s,/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 4);
  if (tokens.length === 0) return false;

  return workBullets.some((b) => {
    const lower = b.text.toLowerCase();
    return tokens.some((token) => lower.includes(token));
  });
}

function resolveJdSkillProofStatus(
  skill: string,
  classified: Pick<JdSkillEvidenceRow, "strength" | "evidenceLocation">,
  bullets: BulletRecord[]
): Pick<JdSkillEvidenceRow, "proofStatus" | "optimizeAction"> {
  if (classified.strength === "strong") {
    return { proofStatus: "proven", optimizeAction: "strengthen" };
  }
  if (classified.strength === "medium" || classified.strength === "weak") {
    return { proofStatus: "weak", optimizeAction: "add_evidence" };
  }
  if (hasIndirectBulletEvidence(skill, bullets)) {
    return { proofStatus: "implied", optimizeAction: "surface" };
  }
  return { proofStatus: "missing", optimizeAction: "do_not_invent" };
}

function buildJdSkillEvidenceRow(
  skill: string,
  bullets: BulletRecord[],
  resumeText: string,
  jdRequired: boolean,
  llmMatched: boolean
): JdSkillEvidenceRow {
  const classified = classifySkillEvidence(skill, bullets, resumeText);
  const effectiveClassified =
    llmMatched && classified.strength === "gap"
      ? {
          strength: "weak" as const,
          mentionCount: Math.max(1, classified.mentionCount ?? 0),
          evidenceLocation: "summary" as const,
        }
      : classified;
  const status = resolveJdSkillProofStatus(skill, effectiveClassified, bullets);
  return {
    skill,
    ...effectiveClassified,
    ...status,
    jdRequired,
  };
}

function roleTitles(structured?: ResumeDocument): string[] {
  const fromRoles = (structured?.experience ?? []).map((e) => e.role?.trim()).filter(Boolean) as string[];
  const docTitle = structured?.title?.trim();
  return docTitle ? [...fromRoles, docTitle] : fromRoles;
}

type ScopeIndicator =
  | "senior_title"
  | "team_size"
  | "stakeholder_scope"
  | "ownership_scope"
  | "mentoring"
  | "hands_on_delivery"
  | "collaboration"
  | "technical_proof"
  | "architecture_scope"
  | "impact_outcomes";

const INDICATOR_LABELS: Record<ScopeIndicator, string> = {
  senior_title: "Senior title in role history",
  team_size: "Team size or team leadership stated",
  stakeholder_scope: "Stakeholder or executive scope",
  ownership_scope: "Ownership or deliverable scope",
  mentoring: "Mentoring or team development",
  hands_on_delivery: "Hands-on project delivery in bullets",
  collaboration: "Cross-functional collaboration stated",
  technical_proof: "JD skills proven in work narratives",
  architecture_scope: "Architecture or system design evidenced",
  impact_outcomes: "Measurable outcomes in role project bullets",
};

function expectedIndicatorsForLevel(level: JdRoleLevel): ScopeIndicator[] {
  switch (level) {
    case "junior":
      return ["hands_on_delivery", "technical_proof", "impact_outcomes"];
    case "mid":
      return ["technical_proof", "ownership_scope", "impact_outcomes", "hands_on_delivery"];
    case "senior_ic":
      return ["ownership_scope", "architecture_scope", "impact_outcomes", "stakeholder_scope"];
    case "leadership":
      return [
        "senior_title",
        "team_size",
        "stakeholder_scope",
        "ownership_scope",
        "mentoring",
      ];
  }
}

function gapMessageForIndicator(indicator: ScopeIndicator, level: JdRoleLevel): string {
  switch (indicator) {
    case "hands_on_delivery":
      return level === "junior"
        ? "Project delivery unclear: describe what you built or shipped in experience bullets"
        : "Hands-on delivery weak: move tools from skills lists into project narratives";
    case "technical_proof":
      return "JD skills mostly in skills list: prove them in project or experience bullets";
    case "impact_outcomes":
      return "Outcomes unclear: add metrics or results from work you already did (%, time saved, volume)";
    case "collaboration":
      return "Collaboration scope unclear: name teams, partners, or functions you worked with";
    case "ownership_scope":
      return "Ownership scope unclear: clarify what you owned end-to-end vs contributed to";
    case "architecture_scope":
      return "System scope unclear: surface design, architecture, or technical decisions you made";
    case "stakeholder_scope":
      return level === "leadership"
        ? "Stakeholder scope unclear: name executives, PM partners, or org stakeholders you influenced"
        : "Stakeholder scope unclear: name business partners or clients you aligned with";
    case "team_size":
      return "Team size not stated: add only if truthful (e.g. team of 4)";
    case "mentoring":
      return "People leadership not evidenced: add mentoring or hiring scope only if accurate";
    case "senior_title":
      return "Title alignment weak: ensure role titles reflect the level this JD expects";
  }
}

function detectScopeIndicators(args: {
  resumeText: string;
  structured?: ResumeDocument;
  bullets: BulletRecord[];
  experienceBlocks: ExperienceBlock[];
  skillProof: JdSkillEvidenceRow[];
}): Set<ScopeIndicator> {
  const blob = args.resumeText.toLowerCase();
  const found = new Set<ScopeIndicator>();
  const experienceBullets = args.bullets.filter(
    (b) => b.location === "project" || b.location === "experience"
  );

  const titles = roleTitles(args.structured);
  if (titles.some((t) => SENIOR_TITLE_RE.test(t))) found.add("senior_title");
  if (TEAM_SIZE_RE.test(blob)) found.add("team_size");
  if (STAKEHOLDER_SCOPE_RE.test(blob)) found.add("stakeholder_scope");
  if (OWNERSHIP_SCOPE_RE.test(blob)) found.add("ownership_scope");
  if (MENTORING_RE.test(blob)) found.add("mentoring");
  if (experienceBullets.some((b) => HANDS_ON_RE.test(b.text))) found.add("hands_on_delivery");
  if (COLLABORATION_RE.test(blob) || STAKEHOLDER_SCOPE_RE.test(blob)) {
    found.add("collaboration");
  }

  const provedSkills = args.skillProof.filter((s) => s.strength === "strong");
  const requiredSkills = args.skillProof.filter((s) => s.jdRequired);
  const proofDenominator = Math.max(requiredSkills.length, args.skillProof.length, 1);
  const proofRatio = provedSkills.length / proofDenominator;
  if (proofRatio >= 0.45 || provedSkills.length > 0) {
    found.add("technical_proof");
  }

  if (args.experienceBlocks.some((block) => block.bullets.some((text) => ARCHITECTURE_RE.test(text)))) {
    found.add("architecture_scope");
  }
  if (args.experienceBlocks.some((block) => block.bullets.some((text) => bulletHasImpactEvidence(text)))) {
    found.add("impact_outcomes");
  }

  return found;
}

function computeSeniorityAlignment(
  resumeText: string,
  jobDescription: string,
  structured: ResumeDocument | undefined,
  bullets: BulletRecord[],
  experienceBlocks: ExperienceBlock[],
  skillProof: JdSkillEvidenceRow[],
  roleLevel: JdRoleLevel
): SeniorityAlignment {
  const found = detectScopeIndicators({
    resumeText,
    structured,
    bullets,
    experienceBlocks,
    skillProof,
  });
  const expected = expectedIndicatorsForLevel(roleLevel);

  const indicatorsFound = expected
    .filter((key) => found.has(key))
    .map((key) => INDICATOR_LABELS[key]);

  // Senior IC: stakeholder OR collaboration satisfies stakeholder expectation
  const stakeholderSatisfied =
    found.has("stakeholder_scope") || found.has("collaboration");
  const matchedCount = expected.filter((key) => {
    if (key === "stakeholder_scope" && roleLevel === "senior_ic") {
      return stakeholderSatisfied;
    }
    return found.has(key);
  }).length;

  const gaps: string[] = [];
  for (const key of expected) {
    if (key === "stakeholder_scope" && roleLevel === "senior_ic") {
      if (!stakeholderSatisfied) gaps.push(gapMessageForIndicator("stakeholder_scope", roleLevel));
      continue;
    }
    if (!found.has(key)) {
      gaps.push(gapMessageForIndicator(key, roleLevel));
    }
  }

  const score =
    expected.length > 0
      ? Math.min(100, Math.round((matchedCount / expected.length) * 100))
      : found.size > 0
        ? 80
        : 55;

  const jdExpectsSeniority = roleLevel === "leadership" || roleLevel === "senior_ic";

  return {
    score,
    roleLevel,
    roleLevelLabel: roleLevelLabel(roleLevel),
    seniorityMetricLabel: seniorityMetricLabel(roleLevel),
    jdExpectsSeniority,
    indicatorsFound,
    gaps: gaps.slice(0, 4),
  };
}

function buildRiskAreas(
  skillProof: JdSkillEvidenceRow[],
  snapshot: EvidenceSnapshot,
  seniority: SeniorityAlignment
): RecommendedFix[] {
  const risks: RecommendedFix[] = [];
  const level = seniority.roleLevel;

  const weakRequired = skillProof.filter(
    (s) =>
      s.jdRequired &&
      (s.proofStatus === "missing" ||
        s.proofStatus === "weak" ||
        s.proofStatus === "implied")
  );
  for (const s of weakRequired.slice(0, 3)) {
    const target = s.evidenceHint?.trim() || null;
    const section =
      s.evidenceLocation === "summary"
        ? "summary"
        : s.evidenceLocation === "skills_only"
          ? "skills"
          : "experience";

    if (s.proofStatus === "missing") {
      risks.push({
        action: `Strengthen ${s.skill} proof in a work bullet (required for this JD)`,
        target,
        section,
        detail: "Not evidenced in resume — do not invent experience",
      });
    } else if (s.proofStatus === "implied") {
      risks.push({
        action: `Surface ${s.skill} in a project bullet with a concrete outcome`,
        target,
        section: "experience",
        detail: "Only indirect evidence found today",
      });
    } else if (s.evidenceLocation === "skills_only") {
      risks.push({
        action: `Move ${s.skill} from your skills list into a work bullet`,
        target,
        section: "experience",
        detail: "Skills-list-only reads weak for this posting",
      });
    } else {
      risks.push({
        action: `Prove ${s.skill} in a work bullet, not only in summary text`,
        target,
        section: "experience",
      });
    }
  }

  if (snapshot.impactCoverage < 55) {
    risks.push({
      action: "Add measurable outcomes to thin project bullets",
      section: "experience",
      detail: "Impact coverage is low for this posting",
    });
  }

  for (const gap of seniority.gaps.slice(0, 2)) {
    risks.push({
      action: gap.replace(/^Add:\s*/i, "Add ").trim(),
      section: "experience",
    });
  }

  if (level !== "leadership" && snapshot.deploymentSignal < 45 && snapshot.deploymentSignal > 0) {
    risks.push({
      action: "Surface shipped work, tools, or delivery outcomes from real projects",
      section: "experience",
      detail: "Production or delivery signal is weak",
    });
  } else if (level === "leadership" && snapshot.deploymentSignal < 35) {
    risks.push({
      action: "Quantify program or team delivery results where truthful",
      section: "experience",
    });
  }

  return risks.slice(0, 5);
}

/** Heuristic fallback for recommended fixes when LLM is unavailable. */
export function inferRiskAreasHeuristic(
  dashboard: EvidenceDashboard,
  resumeText = ""
): RecommendedFix[] {
  const fixes = buildRiskAreas(
    dashboard.skillProofAll ?? dashboard.skillProof,
    dashboard.snapshot,
    dashboard.seniority
  );
  if (!resumeText.trim()) return fixes;
  return validateRecommendedFixTargets(fixes, resumeText);
}

function computeSnapshot(
  resumeText: string,
  structured: ResumeDocument | undefined,
  jdSkills: string[],
  skillProof: JdSkillEvidenceRow[],
  seniorityScore: number,
  roleLevel: JdRoleLevel
): EvidenceSnapshot {
  const bullets = collectBullets(resumeText, structured);
  const experienceBlocks = collectExperienceBlocks(resumeText, structured);
  const experienceBullets = bullets.filter((b) => b.location === "project" || b.location === "experience");
  const totalBullets = experienceBullets.length;
  const bulletsWithMetrics = experienceBullets.filter((b) => bulletHasImpactEvidence(b.text)).length;

  const impact = experienceImpactCoverage(experienceBlocks);
  const impactCoverage = impact.coverage;

  const architectureSignal = experienceSignalScore(experienceBlocks, ARCHITECTURE_RE);
  const leadershipSignal = experienceSignalScore(experienceBlocks, LEADERSHIP_RE);
  const deploymentSignal = experienceSignalScore(experienceBlocks, DEPLOYMENT_RE);

  const proved = skillProof.filter(
    (row) => resolveSkillProofRow(row).proofStatus === "proven"
  ).length;
  const jdSkillsTotal = jdSkills.length;
  const jdSkillProof =
    jdSkillsTotal > 0 ? Math.round((proved / jdSkillsTotal) * 100) : 100;

  const weights = evidenceMatchWeights(roleLevel);
  const evidenceMatch = Math.round(
    jdSkillProof * weights.jdSkillProof +
      impactCoverage * weights.impactCoverage +
      architectureSignal * weights.architectureSignal +
      leadershipSignal * weights.leadershipSignal +
      deploymentSignal * weights.deploymentSignal +
      seniorityScore * weights.seniorityAlignment
  );

  return {
    evidenceMatch: Math.min(100, evidenceMatch),
    impactCoverage,
    experiencesWithMetrics: impact.experiencesWithMetrics,
    totalExperiences: impact.totalExperiences,
    bulletsWithMetrics,
    totalBullets,
    architectureSignal,
    leadershipSignal,
    deploymentSignal,
    seniorityAlignment: seniorityScore,
    jdSkillProof,
    jdSkillsProved: proved,
    jdSkillsTotal,
  };
}

export function buildJdSkillProofRows(args: {
  resumeText: string;
  structuredResume?: ResumeDocument;
  matchedSkills?: string[];
  missingSkills?: string[];
  missingRequired?: string[];
  missingPreferred?: string[];
}): JdSkillEvidenceRow[] {
  const resumeText =
    args.structuredResume != null
      ? resumeDocumentToPlainText(args.structuredResume) || args.resumeText
      : args.resumeText;

  const structuredResume = resolveStructuredResume(resumeText, args.structuredResume);
  const required = filterSkillGapPhrases(args.missingRequired ?? []);
  const preferred = filterSkillGapPhrases(args.missingPreferred ?? []);
  const missing = filterSkillGapPhrases(args.missingSkills ?? []);
  const matched = filterSkillGapPhrases(args.matchedSkills ?? []);

  const requiredSet = new Set(required.map((s) => s.toLowerCase()));
  const matchedSet = new Set(matched.map((s) => s.toLowerCase().trim()));
  const jdSkills = Array.from(
    new Set([...matched, ...missing, ...required, ...preferred].map((s) => s.trim()).filter(Boolean))
  );

  const bullets = collectBullets(resumeText, structuredResume);

  const skillProof = jdSkills.map((skill) =>
    buildJdSkillEvidenceRow(
      skill,
      bullets,
      resumeText,
      requiredSet.has(skill.toLowerCase()) || missing.includes(skill),
      matchedSet.has(skill.toLowerCase().trim())
    )
  );

  skillProof.sort((a, b) => {
    if (a.jdRequired !== b.jdRequired) return a.jdRequired ? -1 : 1;
    return a.skill.localeCompare(b.skill);
  });

  return skillProof;
}

/** Deterministic evidence dashboard: proof location, signal scores, honest gaps. */
export function buildEvidenceDashboard(args: {
  resumeText: string;
  jobDescription: string;
  structuredResume?: ResumeDocument;
  matchedSkills?: string[];
  missingSkills?: string[];
  missingRequired?: string[];
  missingPreferred?: string[];
  requiredYearsExperience?: number | null;
  resumeYearsExperience?: number | null;
  targetRoleTitle?: string;
  skillProofDisplayLimit?: number;
}): EvidenceDashboard {
  const resumeText =
    args.structuredResume != null
      ? resumeDocumentToPlainText(args.structuredResume) || args.resumeText
      : args.resumeText;

  const structuredResume = resolveStructuredResume(resumeText, args.structuredResume);
  const skillProof = buildJdSkillProofRows({
    resumeText,
    structuredResume,
    matchedSkills: args.matchedSkills,
    missingSkills: args.missingSkills,
    missingRequired: args.missingRequired,
    missingPreferred: args.missingPreferred,
  });

  const bullets = collectBullets(resumeText, structuredResume);
  const experienceBlocks = collectExperienceBlocks(resumeText, structuredResume);

  const roleLevel = detectJdRoleLevel(args.jobDescription, {
    requiredYears: args.requiredYearsExperience,
    resumeYears: args.resumeYearsExperience,
  });

  const seniority = computeSeniorityAlignment(
    resumeText,
    args.jobDescription,
    structuredResume,
    bullets,
    experienceBlocks,
    skillProof,
    roleLevel
  );
  const snapshot = computeSnapshot(
    resumeText,
    structuredResume,
    skillProof.map((row) => row.skill),
    skillProof,
    seniority.score,
    roleLevel
  );
  const riskAreas = buildRiskAreas(skillProof, snapshot, seniority);
  const jdDomain = classifyJdDomain(args.jobDescription, args.targetRoleTitle);

  return {
    evidenceMatch: snapshot.evidenceMatch,
    snapshot,
    seniority,
    skillProof: selectSkillProofForDashboard(
      skillProof,
      args.skillProofDisplayLimit ?? 14
    ),
    skillProofAll: skillProof,
    jdDomain,
    riskAreas,
  };
}

/** Balanced JD skill rows — avoids showing only one status when others exist. */
export function selectSkillProofForDashboard(
  rows: JdSkillEvidenceRow[],
  limit: number
): JdSkillEvidenceRow[] {
  return selectSkillProofForDisplay(rows, limit);
}

/** Bullets that are generic or weak candidates for evidence-focused rewrite. */
export function isEvidenceWeakBullet(bullet: string): boolean {
  const t = String(bullet ?? "").trim();
  if (!t) return false;
  if (GENERIC_BULLET_RE.test(t)) return true;
  if (t.length < 90 && !METRIC_RE.test(t)) return true;
  if (/^(responsible for|worked on|helped with|developed innovative)\b/i.test(t)) return true;
  return false;
}

const STRENGTH_RANK: Record<EvidenceStrength, number> = {
  gap: 0,
  weak: 1,
  medium: 2,
  strong: 3,
};

const LOCATION_RANK: Record<JdSkillEvidenceRow["evidenceLocation"], number> = {
  none: 0,
  skills_only: 1,
  summary: 2,
  experience: 3,
  project: 4,
};

/** JD theme bucket for a skill phrase (GenAI, Leadership, etc.). */
export function jdTopicForSkill(skill: string): string | undefined {
  const text = skill.trim();
  if (!text) return undefined;
  for (const { category, patterns } of JD_CATEGORY_PATTERNS) {
    if (patterns.some((p) => p.test(text))) return category;
  }
  return undefined;
}

/** Proof rows for a fixed skill list (optimize targets — excludes honest JD gaps). */
export function buildSkillProofForSkills(
  skills: string[],
  resumeText: string,
  structuredResume?: ResumeDocument,
  requiredSkills?: Set<string>
): JdSkillEvidenceRow[] {
  const bullets = collectBullets(resumeText, structuredResume);
  const unique = Array.from(new Set(skills.map((s) => s.trim()).filter(Boolean)));

  return unique.map((skill) =>
    buildJdSkillEvidenceRow(
      skill,
      bullets,
      resumeText,
      requiredSkills?.has(skill.toLowerCase()) ?? false,
      false
    )
  );
}

export type OptimizedSkillProofRow = {
  skill: string;
  beforeStrength: EvidenceStrength;
  afterStrength: EvidenceStrength;
  beforeProofStatus: JdSkillProofStatus;
  afterProofStatus: JdSkillProofStatus;
  beforeLocation: JdSkillEvidenceRow["evidenceLocation"];
  afterLocation: JdSkillEvidenceRow["evidenceLocation"];
  evidenceHint?: string;
  jdTopic?: string;
  improvementNote: string;
};

const PROOF_STATUS_RANK: Record<JdSkillProofStatus, number> = {
  missing: 0,
  weak: 1,
  implied: 2,
  proven: 3,
};

function isWorkBulletLocation(location: JdSkillEvidenceRow["evidenceLocation"]): boolean {
  return location === "project" || location === "experience";
}

function skillProofImproved(before: JdSkillEvidenceRow, after: JdSkillEvidenceRow): boolean {
  if (PROOF_STATUS_RANK[after.proofStatus] < PROOF_STATUS_RANK[before.proofStatus]) return false;
  if (!isWorkBulletLocation(after.evidenceLocation)) return false;
  if (after.proofStatus !== "proven") return false;
  if (before.proofStatus === "proven" && isWorkBulletLocation(before.evidenceLocation)) return false;
  return (
    PROOF_STATUS_RANK[after.proofStatus] > PROOF_STATUS_RANK[before.proofStatus] ||
    LOCATION_RANK[after.evidenceLocation] > LOCATION_RANK[before.evidenceLocation]
  );
}

function buildSkillImprovementNote(
  before: JdSkillEvidenceRow,
  after: JdSkillEvidenceRow
): string {
  if (before.evidenceLocation === "skills_only" && isWorkBulletLocation(after.evidenceLocation)) {
    return "Moved from skills list into project bullets";
  }
  if (before.evidenceLocation === "summary" && isWorkBulletLocation(after.evidenceLocation)) {
    return "Moved from summary into project bullets";
  }
  if (before.proofStatus === "implied" && after.proofStatus === "proven") {
    return "Indirect evidence surfaced in project bullets";
  }
  if (before.proofStatus === "weak" && after.proofStatus === "proven") {
    return "Weak mention upgraded to bullet-level proof";
  }
  return "Now proven in project bullets";
}

/**
 * Optimize-only skill proof: targeted skills that strengthened after tailoring.
 * Omits unselected missing gaps unless the skill was in optimizeTargetSkills.
 */
export function buildOptimizedSkillProofRows(
  beforeRows: JdSkillEvidenceRow[],
  afterRows: JdSkillEvidenceRow[],
  optimizeTargetSkills?: string[]
): OptimizedSkillProofRow[] {
  const beforeMap = new Map(beforeRows.map((r) => [r.skill.toLowerCase(), r]));
  const allowlist = new Set(
    (optimizeTargetSkills ?? []).map((skill) => skill.toLowerCase().trim())
  );
  const out: OptimizedSkillProofRow[] = [];

  for (const afterRow of afterRows) {
    const beforeRow = beforeMap.get(afterRow.skill.toLowerCase());
    if (!beforeRow) continue;
    const skillKey = afterRow.skill.toLowerCase().trim();
    if (
      beforeRow.optimizeAction === "do_not_invent" &&
      !allowlist.has(skillKey)
    ) {
      continue;
    }
    if (afterRow.proofStatus === "missing") continue;
    if (!skillProofImproved(beforeRow, afterRow)) continue;

    out.push({
      skill: afterRow.skill,
      beforeStrength: beforeRow.strength,
      afterStrength: afterRow.strength,
      beforeProofStatus: beforeRow.proofStatus,
      afterProofStatus: afterRow.proofStatus,
      beforeLocation: beforeRow.evidenceLocation,
      afterLocation: afterRow.evidenceLocation,
      evidenceHint: afterRow.evidenceHint,
      improvementNote: buildSkillImprovementNote(beforeRow, afterRow),
    });
  }

  return out.sort((a, b) => {
    const deltaA = STRENGTH_RANK[a.afterStrength] - STRENGTH_RANK[a.beforeStrength];
    const deltaB = STRENGTH_RANK[b.afterStrength] - STRENGTH_RANK[b.beforeStrength];
    if (deltaB !== deltaA) return deltaB - deltaA;
    return STRENGTH_RANK[b.afterStrength] - STRENGTH_RANK[a.afterStrength];
  });
}
