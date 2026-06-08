import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";

/** Illustrative evidence dashboard for empty-state Intelligence panel (GenAI DS JD). */
export const DEMO_EVIDENCE_DASHBOARD: EvidenceDashboard = {
  evidenceMatch: 76,
  snapshot: {
    evidenceMatch: 76,
    impactCoverage: 58,
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
      mentionCount: 2,
      evidenceLocation: "project",
      evidenceHint: "Bon Appétit RAG chatbot",
      jdRequired: true,
    },
    {
      skill: "LLMs",
      strength: "strong",
      mentionCount: 3,
      evidenceLocation: "project",
      evidenceHint: "Voice IVR analytics",
      jdRequired: true,
    },
    {
      skill: "Python",
      strength: "medium",
      mentionCount: 12,
      evidenceLocation: "experience",
      evidenceHint: "Multiple ML projects",
      jdRequired: true,
    },
    {
      skill: "REST APIs",
      strength: "strong",
      mentionCount: 1,
      evidenceLocation: "project",
      evidenceHint: "Flask API deployment",
      jdRequired: true,
    },
    {
      skill: "AWS",
      strength: "weak",
      mentionCount: 1,
      evidenceLocation: "skills_only",
      jdRequired: true,
    },
    {
      skill: "MLOps",
      strength: "medium",
      mentionCount: 2,
      evidenceLocation: "project",
      evidenceHint: "Airflow DAGs, monitoring",
      jdRequired: false,
    },
    {
      skill: "LangChain",
      strength: "gap",
      mentionCount: 0,
      evidenceLocation: "none",
      jdRequired: false,
    },
    {
      skill: "Bedrock",
      strength: "gap",
      mentionCount: 0,
      evidenceLocation: "none",
      jdRequired: false,
    },
  ],
  categories: [
    { category: "GenAI", score: 92, detail: "LLM and RAG evidenced in project bullets" },
    { category: "Cloud", score: 54, detail: "AWS partially evidenced; strengthen deployment proof" },
    { category: "MLOps", score: 71, detail: "DAGs and monitoring present in experience" },
    { category: "Deployment", score: 81, detail: "API and production deployment detected" },
  ],
  riskAreas: [
    "AWS: only listed in skills, not proven in project bullets",
    "LangChain: required in JD, not evidenced in resume (not invented)",
    "Impact coverage low: many bullets lack measurable outcomes from your existing work",
  ],
};

export const DEMO_EVIDENCE_BULLET_PREVIEW = {
  before:
    "Built a Retrieval-Augmented Generation chatbot using Llama for natural language understanding and response generation.",
  after:
    "Architected and deployed a Retrieval-Augmented Generation (RAG) chatbot using Llama, ChromaDB vector search, and Flask APIs to serve 35K+ content assets with low-latency retrieval and scalable inference.",
} as const;
