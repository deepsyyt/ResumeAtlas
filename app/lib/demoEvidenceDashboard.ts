import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";

/** Sample analyze summary — matches live dashboard summary box (not verdict headline). */
export const DEMO_ANALYZE_SUMMARY =
  "JD needs: senior GenAI / ML engineering IC with RAG, LLM delivery, and production MLOps. Resume shows: Python, RAG, LLMs, and pipeline work in project bullets. Match: strong.";

/** Illustrative keyword coverage for empty-state / preview dashboard. */
export const DEMO_KEYWORD_COVERAGE = {
  score: 88,
  matchedCount: 8,
  totalCount: 9,
  coverageLabel: "Good coverage",
} as const;

/** Illustrative evidence dashboard for empty-state Intelligence panel (GenAI DS JD). */
export const DEMO_EVIDENCE_DASHBOARD: EvidenceDashboard = {
  evidenceMatch: 76,
  snapshot: {
    evidenceMatch: 76,
    impactCoverage: 67,
    experiencesWithMetrics: 2,
    totalExperiences: 3,
    bulletsWithMetrics: 9,
    totalBullets: 22,
    architectureSignal: 72,
    leadershipSignal: 68,
    deploymentSignal: 81,
    seniorityAlignment: 65,
    jdSkillProof: 78,
    jdSkillsProved: 7,
    jdSkillsTotal: 9,
  },
  seniority: {
    score: 65,
    roleLevel: "senior_ic",
    roleLevelLabel: "Senior IC",
    seniorityMetricLabel: "Senior IC alignment",
    jdExpectsSeniority: true,
    indicatorsFound: [
      "Ownership or deliverable scope",
      "Architecture or system design evidenced",
      "Measurable outcomes in experience bullets",
    ],
    gaps: [
      "Stakeholder scope unclear: name business partners or clients you aligned with",
    ],
  },
  skillProof: [
    {
      skill: "RAG",
      strength: "strong",
      proofStatus: "proven",
      optimizeAction: "strengthen",
      mentionCount: 2,
      evidenceLocation: "project",
      evidenceHint: "Bon Appétit RAG chatbot",
      jdRequired: true,
    },
    {
      skill: "LLMs",
      strength: "strong",
      proofStatus: "proven",
      optimizeAction: "strengthen",
      mentionCount: 3,
      evidenceLocation: "project",
      evidenceHint: "Voice IVR analytics",
      jdRequired: true,
    },
    {
      skill: "Python",
      strength: "strong",
      proofStatus: "proven",
      optimizeAction: "strengthen",
      mentionCount: 12,
      evidenceLocation: "experience",
      evidenceHint: "Multiple ML projects",
      jdRequired: true,
    },
    {
      skill: "REST APIs",
      strength: "strong",
      proofStatus: "proven",
      optimizeAction: "strengthen",
      mentionCount: 1,
      evidenceLocation: "project",
      evidenceHint: "Flask API deployment",
      jdRequired: true,
    },
    {
      skill: "AWS",
      strength: "medium",
      proofStatus: "weak",
      optimizeAction: "add_evidence",
      mentionCount: 1,
      evidenceLocation: "skills_only",
      jdRequired: true,
    },
    {
      skill: "MLOps",
      strength: "strong",
      proofStatus: "proven",
      optimizeAction: "strengthen",
      mentionCount: 2,
      evidenceLocation: "project",
      evidenceHint: "Airflow DAGs, monitoring",
      jdRequired: false,
    },
    {
      skill: "LangChain",
      strength: "gap",
      proofStatus: "missing",
      optimizeAction: "do_not_invent",
      mentionCount: 0,
      evidenceLocation: "none",
      jdRequired: false,
    },
    {
      skill: "Bedrock",
      strength: "gap",
      proofStatus: "missing",
      optimizeAction: "do_not_invent",
      mentionCount: 0,
      evidenceLocation: "none",
      jdRequired: false,
    },
  ],
  jdDomain: "data",
  categories: [],
  keywordCoverageVerdict: {
    badgeLabel: "Good coverage",
    headline: "8 matched · 1 missed JD keywords in your resume.",
    reason: "AWS is skills-list only; LangChain not found in resume.",
  },
  riskAreas: [
    "Surface AWS in a project bullet with a shipped outcome if you used it — skills-list only reads weak for this JD",
    "Add one quantified result to your top GenAI bullet (latency, accuracy, or adoption you can defend)",
    "Strengthen experiment-evaluation proof in a bullet if you ran offline or online evals",
  ],
  riskAreasVersion: 1,
  mostMissingEvidence: [
    "AWS mentioned but not proven",
    "GenAI impact not quantified",
    "Evaluation experience not demonstrated",
  ],
  missingEvidenceVersion: 2,
  roleFit: [
    { role: "Head of AI", verdict: "strong", verdictLabel: "High chance of clearing" },
    { role: "Director of GenAI", verdict: "strong", verdictLabel: "High chance of clearing" },
    { role: "Senior GenAI Engineering Manager", verdict: "good", verdictLabel: "Good" },
    { role: "GenAI Platform Architect", verdict: "good", verdictLabel: "Good" },
    { role: "Principal AI Engineer", verdict: "good", verdictLabel: "Good" },
    { role: "Senior Staff GenAI Engineer", verdict: "moderate", verdictLabel: "Moderate" },
    {
      role: "Hands-on LLM Engineer",
      verdict: "needs_depth",
      verdictLabel: "Needs more implementation depth",
    },
  ],
  targetRoleTitle: "Senior GenAI Engineering Manager",
  roleFitTargetRoles: [
    "Head of AI",
    "Director of GenAI",
    "Senior GenAI Engineering Manager",
    "GenAI Platform Architect",
    "Principal AI Engineer",
    "Senior Staff GenAI Engineer",
    "Hands-on LLM Engineer",
  ],
  roleFitVersion: 4,
};

export const DEMO_EVIDENCE_BULLET_PREVIEW = {
  before:
    "Built a Retrieval-Augmented Generation chatbot using Llama for natural language understanding and response generation.",
  after:
    "Architected and deployed a Retrieval-Augmented Generation (RAG) chatbot using Llama, ChromaDB vector search, and Flask APIs to serve 35K+ content assets with low-latency retrieval and scalable inference.",
} as const;
