import type { RoleSlug } from "@/app/lib/seoPages";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import type { RoleKeywordIntent } from "@/app/lib/roleSeo";

/** Mirror of `ROLE_KEYWORD_INTENTS` — local to avoid circular imports via `seoPages` → `searchIntentSeo`. */
const ALL_ROLE_KEYWORD_CATEGORY_INTENTS = [
  "core-keywords",
  "technical-skills",
  "tools-platforms",
  "action-verbs",
  "projects",
  "summary",
] as const satisfies readonly RoleKeywordIntent[];

export type RoleKeywordsFaqItem = {
  question: string;
  answer: string;
};

/** Primary GSC-style phrase for the main keyword list H2 (exact-match SEO). */
export const ROLE_KEYWORDS_PRIMARY_H2: Record<RoleSlug, string> = {
  "data-analyst": `Data Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "data-scientist": `Data Science Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "software-engineer": `Software Engineer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "product-manager": `Product Manager Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "business-analyst": `Business Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "frontend-developer": `Frontend Developer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "backend-developer": `Backend Developer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "machine-learning-engineer": `Machine Learning Engineer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "devops-engineer": `DevOps Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "full-stack-developer": `Full-Stack Developer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
};

/** Role-specific hero intro (above-the-fold). Falls back to generic copy when omitted. */
export const ROLE_KEYWORDS_HERO_INTRO: Partial<Record<RoleSlug, string>> = {
  "data-scientist":
    "Copy-ready ATS keywords for data scientist resumes including Python, SQL, machine learning, experimentation, forecasting, feature engineering, and stakeholder communication.",
  "frontend-developer":
    "Copy-ready frontend developer resume keywords for ATS and recruiters. Use the lists below on a frontend developer resume—not generic web developer or software developer keyword dumps.",
  "software-engineer":
    "Software engineer resume keywords for generalist and product-engineering roles—copy the list below for software engineer or software developer titles. For UI-only, API-only, or platform-only JDs, use the dedicated frontend, backend, or DevOps keyword pages instead.",
};

/** Immediate answer block for `/frontend-developer-resume-keywords` (exact-match intent). */
export const FRONTEND_DEVELOPER_TOP_RESUME_KEYWORDS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "HTML",
  "CSS",
  "REST APIs",
  "GraphQL",
  "Accessibility",
  "WCAG",
  "Core Web Vitals",
  "Responsive design",
  "Storybook",
  "Playwright",
  "Jest",
  "State management",
  "Webpack",
  "Performance optimization",
  "Design systems",
  "Cross-browser compatibility",
  "Component library",
  "Server-side rendering",
  "Lazy loading",
  "E2E testing",
  "UI engineering",
] as const;

export const FRONTEND_DEVELOPER_TOP_TECHNICAL_SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "HTML/CSS",
  "Responsive design",
  "Accessibility (WCAG)",
  "State management",
  "REST API integration",
  "GraphQL clients",
] as const;

export const FRONTEND_DEVELOPER_TOP_ACTION_VERBS = [
  "implemented",
  "improved",
  "optimized",
  "instrumented",
  "tested",
  "shipped",
  "refactored",
  "hardened",
] as const;

/** Immediate answer block for `/software-engineer-resume-keywords` — one entity, not FE/BE/DevOps splits. */
export const SOFTWARE_ENGINEER_TOP_RESUME_KEYWORDS = [
  "Software engineer",
  "Software developer",
  "TypeScript",
  "JavaScript",
  "Java",
  "Python",
  "React",
  "Node.js",
  "REST APIs",
  "GraphQL",
  "PostgreSQL",
  "AWS",
  "Docker",
  "CI/CD",
  "Unit testing",
  "Integration testing",
  "System design",
  "Microservices",
  "API development",
  "Code review",
  "Git",
  "Agile",
  "Performance optimization",
  "Cloud computing",
  "Observability",
] as const;

export const SOFTWARE_ENGINEER_TOP_TECHNICAL_SKILLS = [
  "TypeScript / JavaScript",
  "System design",
  "REST & GraphQL APIs",
  "Relational databases",
  "Cloud platforms (AWS/GCP)",
  "CI/CD pipelines",
  "Automated testing",
  "Production debugging",
] as const;

export const SOFTWARE_ENGINEER_TOP_ACTION_VERBS = [
  "shipped",
  "scaled",
  "refactored",
  "optimized",
  "designed",
  "implemented",
  "deployed",
  "stabilized",
] as const;

export type RoleKeywordsHeroAnswer = {
  primaryH2: string;
  primaryKeywords: readonly string[];
  technicalSkillsH2: string;
  technicalSkills: readonly string[];
  actionVerbsH2: string;
  actionVerbs: readonly string[];
};

export type RoleKeywordsPageLayout = {
  compactHero: boolean;
  heroAnswer?: RoleKeywordsHeroAnswer;
  categoryIntents: readonly RoleKeywordIntent[];
  showKeywordClusters: boolean;
  showKeywordApplicationModule: boolean;
  showKeywordGapsSection: boolean;
  showChecklistSection: boolean;
  showRoleClusterNav: boolean;
  showSecondaryH2: boolean;
  showBottomResourceBlock: boolean;
  showExampleBullets: boolean;
  showTopKeywordsSection: boolean;
  itemListSchemaName?: string;
};

const DEFAULT_KEYWORDS_PAGE_LAYOUT: RoleKeywordsPageLayout = {
  compactHero: false,
  categoryIntents: ALL_ROLE_KEYWORD_CATEGORY_INTENTS,
  showKeywordClusters: true,
  showKeywordApplicationModule: true,
  showKeywordGapsSection: true,
  showChecklistSection: true,
  showRoleClusterNav: true,
  showSecondaryH2: true,
  showBottomResourceBlock: true,
  showExampleBullets: true,
  showTopKeywordsSection: true,
};

const ROLE_KEYWORDS_PAGE_LAYOUT: Partial<Record<RoleSlug, Partial<RoleKeywordsPageLayout>>> = {
  /**
   * Compact keyword pages: ~80% copy-ready keyword intent, ~20% tool funnel (one JD-match CTA +
   * contextual scanner/checker links). No mini-hub navigation (example/template/resource blocks).
   */
  "frontend-developer": {
    compactHero: true,
    heroAnswer: {
      primaryH2: `Top Frontend Developer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
      primaryKeywords: FRONTEND_DEVELOPER_TOP_RESUME_KEYWORDS,
      technicalSkillsH2: "Top frontend developer technical skills",
      technicalSkills: FRONTEND_DEVELOPER_TOP_TECHNICAL_SKILLS,
      actionVerbsH2: "Top frontend developer action verbs",
      actionVerbs: FRONTEND_DEVELOPER_TOP_ACTION_VERBS,
    },
    categoryIntents: ["core-keywords", "technical-skills", "tools-platforms", "action-verbs"],
    showKeywordClusters: false,
    showKeywordApplicationModule: false,
    showKeywordGapsSection: false,
    showChecklistSection: false,
    showRoleClusterNav: false,
    showSecondaryH2: false,
    showBottomResourceBlock: false,
    showTopKeywordsSection: false,
    itemListSchemaName: "Frontend Developer Resume Keywords",
  },
  "software-engineer": {
    compactHero: true,
    heroAnswer: {
      primaryH2: `Top Software Engineer Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
      primaryKeywords: SOFTWARE_ENGINEER_TOP_RESUME_KEYWORDS,
      technicalSkillsH2: "Top software engineer technical skills",
      technicalSkills: SOFTWARE_ENGINEER_TOP_TECHNICAL_SKILLS,
      actionVerbsH2: "Top software engineer action verbs",
      actionVerbs: SOFTWARE_ENGINEER_TOP_ACTION_VERBS,
    },
    categoryIntents: ["core-keywords", "technical-skills", "tools-platforms", "action-verbs"],
    showKeywordClusters: false,
    showKeywordApplicationModule: false,
    showKeywordGapsSection: false,
    showChecklistSection: false,
    showRoleClusterNav: false,
    showSecondaryH2: false,
    showBottomResourceBlock: false,
    showTopKeywordsSection: false,
    itemListSchemaName: "Software Engineer Resume Keywords",
  },
};

export function getRoleKeywordsPageLayout(role: RoleSlug): RoleKeywordsPageLayout {
  const override = ROLE_KEYWORDS_PAGE_LAYOUT[role];
  return { ...DEFAULT_KEYWORDS_PAGE_LAYOUT, ...override };
}

/** Above-the-fold priority terms for `/data-analyst-resume-keywords` (GSC head terms). */
export const DATA_ANALYST_HERO_KEYWORDS = [
  "SQL",
  "Tableau",
  "Excel",
  "Dashboarding",
  "ETL",
  "Data modeling",
  "KPI reporting",
  "Stakeholder communication",
] as const;

/** H2 + list for `data analytics keywords` query cluster on the data analyst hub. */
export const DATA_ANALYST_ANALYTICS_KEYWORDS_SECTION = {
  h2: "Data Analytics Resume Keywords",
  intro:
    "Many postings use data analytics wording instead of data analyst in the title. These analytics resume keywords overlap with the lists below—mirror the job description literally.",
  keywords: [
    "Cohort analysis",
    "Funnel analysis",
    "Segmentation",
    "Attribution",
    "Data visualization",
    "KPI reporting",
    "A/B testing",
    "Retention analysis",
    "Forecasting",
    "Root cause analysis",
    "Data quality",
    "Stakeholder reporting",
  ],
} as const;

/** Fragment + public href after merging standalone BSA keyword URL into the BA hub. */
export const BUSINESS_ANALYST_BSA_KEYWORDS_SECTION_ID = "business-systems-analyst-keywords" as const;
export const BUSINESS_ANALYST_BSA_KEYWORDS_HREF =
  `/business-analyst-resume-keywords#${BUSINESS_ANALYST_BSA_KEYWORDS_SECTION_ID}` as const;

/** BSA keyword cluster on `/business-analyst-resume-keywords` (replaces `/business-systems-analyst-resume-keywords`). */
export const BUSINESS_ANALYST_BSA_KEYWORDS_SECTION = {
  h2: `Business Systems Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  intro:
    "Postings titled business systems analyst (BSA) emphasize integrations, solution design, UAT, and enterprise systems—not only process mapping. Use these keywords when the job description says BSA; classic BA keywords above still apply for requirements and stakeholder work.",
  keywords: [
    "Business systems analyst",
    "Requirements gathering",
    "Solution design",
    "User stories",
    "Acceptance criteria",
    "UAT",
    "Process mapping",
    "BPMN",
    "Systems integration",
    "Stakeholder management",
    "SQL",
    "Jira",
    "Functional specifications",
    "Gap analysis",
    "Change management",
  ],
  exampleBullets: [
    "Elicited BSA requirements across finance and operations, reducing post-build change requests by 32% using structured user stories and acceptance criteria in Jira.",
    "Led UAT for a billing-system integration, documenting defects and sign-off criteria that cut production rollback risk on launch weekend.",
    "Mapped as-is/to-be workflows in Visio for order-to-cash, identifying integration points that saved ~700 hours of manual reconciliation annually.",
    "Partnered with engineering on API and data requirements, translating business rules into functional specs consumed by three delivery squads.",
  ],
} as const;

/** Secondary H2 targeting alternate query variants (long-tail). */
export const ROLE_KEYWORDS_SECONDARY_H2: Partial<Record<RoleSlug, string>> = {
  "data-analyst": `Keywords for Data Analyst Resume (${CONTENT_FRESHNESS_YEAR} ATS Checklist)`,
  "data-scientist": `Data Scientist Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "machine-learning-engineer": `Machine Learning Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "business-analyst": `Keywords for Business Analyst Resume (${CONTENT_FRESHNESS_YEAR})`,
  "devops-engineer": `DevOps Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR})`,
  "product-manager": `PM Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS List)`,
  "backend-developer": `Backend Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR})`,
  "full-stack-developer": `Full Stack Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
};

export type RoleKeywordsSeniorityTier = {
  label: string;
  keywords: string[];
};

export const ROLE_KEYWORDS_SENIORITY: Partial<
  Record<RoleSlug, { title: string; tiers: RoleKeywordsSeniorityTier[] }>
> = {
  "data-scientist": {
    title: "Data scientist keywords by seniority",
    tiers: [
      {
        label: "Entry-level",
        keywords: ["Python", "SQL", "statistics", "data cleaning", "jupyter", "class projects"],
      },
      {
        label: "Mid-level",
        keywords: ["experimentation", "feature engineering", "A/B testing", "model evaluation", "stakeholder readouts"],
      },
      {
        label: "Senior-level",
        keywords: ["causal inference", "metric strategy", "model governance", "cross-functional influence", "roadmap prioritization"],
      },
    ],
  },
  "devops-engineer": {
    title: "DevOps resume keywords by seniority",
    tiers: [
      {
        label: "Entry-level",
        keywords: ["Linux", "bash", "Git", "CI basics", "monitoring dashboards", "runbooks"],
      },
      {
        label: "Mid-level",
        keywords: ["Kubernetes", "Terraform", "CI/CD pipelines", "incident response", "IaC", "observability"],
      },
      {
        label: "Senior-level",
        keywords: ["SRE practices", "reliability targets", "cost optimization", "security posture", "platform strategy"],
      },
    ],
  },
  "software-engineer": {
    title: "Software engineer keywords by seniority",
    tiers: [
      {
        label: "Entry-level",
        keywords: ["data structures", "unit tests", "code review", "REST APIs", "Git workflow"],
      },
      {
        label: "Mid-level",
        keywords: ["system design", "CI/CD", "observability", "performance tuning", "on-call rotation"],
      },
      {
        label: "Senior-level",
        keywords: ["technical leadership", "architecture decisions", "reliability SLAs", "mentorship", "delivery at scale"],
      },
    ],
  },
};

/** Clarify role scope to reduce wrong-query impressions (GSC bleed). */
export const ROLE_KEYWORDS_SCOPE_NOTE: Partial<Record<RoleSlug, string>> = {
  "data-analyst":
    "This checklist is for data analyst and analytics roles only—not business analyst, systems analyst, or data scientist titles. Use /business-analyst-resume-keywords, /systems-analyst-resume-keywords, or /data-scientist-resume-keywords for those roles. For Power BI–only, SQL developer, or data engineer stacks, use the dedicated keyword pages linked from /resume-keywords.",
  "data-scientist":
    "Focused on data scientist and ML-heavy analytics roles—not data engineer pipeline ownership. Use /data-engineer-resume-keywords when the JD emphasizes Spark, Airflow, warehouses, and ETL over experimentation and modeling.",
  "business-analyst":
    "Focused on business analyst (BA) job titles. Business systems analyst (BSA) keywords are in the section below. For IT systems analyst roles, use /systems-analyst-resume-keywords. For BI-only postings, use /business-intelligence-resume-keywords.",
  "machine-learning-engineer":
    "Covers machine learning engineer (MLE) and production ML roles. For general data science research wording, also scan our data scientist keyword list.",
  "full-stack-developer":
    "End-to-end web stack keywords—not backend-only or frontend-only resumes unless the posting is explicitly full-stack.",
  "software-engineer":
    "Software engineer resume keywords only—not a split frontend, backend, or DevOps keyword page. Mirror the job title literally (software engineer, software developer, SDE). For UI-only JDs use /frontend-developer-resume-keywords; for API/services-only use /backend-developer-resume-keywords; for platform/SRE JDs use /devops-engineer-resume-keywords.",
  "frontend-developer":
    "Frontend developer resume keywords only—not generic web developer, software developer, or React-only skill lists. Mirror the job title literally (frontend developer, UI engineer, front-end engineer). For full-stack JDs use /full-stack-developer-resume-keywords; for general SWE use /software-engineer-resume-keywords.",
};

export const ROLE_KEYWORDS_FAQ: Record<RoleSlug, RoleKeywordsFaqItem[]> = {
  "data-analyst": [
    {
      question: "What are the best data analyst resume keywords for ATS?",
      answer:
        "Prioritize SQL, Excel, a BI tool (Tableau, Power BI, or Looker), Python or R when required, plus outcome terms: dashboards, cohort analysis, A/B testing, KPI reporting, and stakeholder communication. Match the job description literally where you have real experience.",
    },
    {
      question: "How many keywords should a data analyst resume include?",
      answer:
        "Aim for 25–40 relevant terms across summary, skills, and bullets—not repeated lists. Every keyword should appear in context with a metric or decision outcome at least once in experience or projects.",
    },
    {
      question: "What are data analyst resume keywords for ATS in 2026?",
      answer:
        "In 2026 postings we still see heavy SQL, dbt, cloud warehouses, experiment readouts, and metric ownership language. Use this page as a baseline, then paste the exact posting into ResumeAtlas to see missing terms.",
    },
    {
      question: "How do I find missing keywords from a job description?",
      answer:
        "Paste the job description and your resume into the free resume vs job description checker. You get a coverage-style view of skills and phrases from the posting that are weak or absent in your draft.",
    },
    {
      question: "I searched for systems analyst resume keywords—am I on the right page?",
      answer:
        "No. Systems analyst postings skew IT applications, support, and integrations. Use /systems-analyst-resume-keywords for that title—not this data analyst checklist.",
    },
    {
      question: "I searched for business analyst resume keywords—should I use this page?",
      answer:
        "No. Business analyst roles focus on requirements, process, and stakeholder delivery. Use /business-analyst-resume-keywords instead of this data analyst keyword list.",
    },
  ],
  "data-scientist": [
    {
      question: "What keywords should a data scientist resume include?",
      answer:
        "Python, SQL, machine learning, experimentation, feature engineering, model evaluation, and deployment-adjacent terms when relevant. Tie each to business metrics: churn, retention, revenue, or efficiency.",
    },
    {
      question: "What is the difference between data science and data scientist resume keywords?",
      answer:
        "Searches overlap. Use data science resume keywords for general DS roles and emphasize modeling, statistics, and experimentation. Add MLOps or deployment terms only when the posting requires production ownership.",
    },
    {
      question: "What are data scientist resume keywords for ATS in 2026?",
      answer:
        "2026 listings still stress Python, SQL, causal/experiment language, and LLM-adjacent skills on some teams. Validate against each posting—keyword lists are a starting point, not a substitute for the JD.",
    },
    {
      question: "How do I avoid keyword stuffing on a data science resume?",
      answer:
        "Use keywords inside bullets that describe datasets, methods, and impact. Avoid skills-only dumps of every library you have touched once.",
    },
  ],
  "software-engineer": [
    {
      question: "What are the best software engineer resume keywords for ATS?",
      answer:
        "TypeScript, JavaScript, system design, REST APIs, databases, cloud, CI/CD, testing, and delivery verbs (shipped, scaled, refactored)—placed in bullets on a software engineer resume, not as a tool dump split by frontend vs backend.",
    },
    {
      question: "Are software engineer resume keywords different from frontend or backend keywords?",
      answer:
        "Yes. Software engineer postings are often generalist. Use this page when the title says software engineer or software developer. Use /frontend-developer-resume-keywords or /backend-developer-resume-keywords when the JD is stack-specific.",
    },
    {
      question: "Should a software engineer resume list DevOps keywords?",
      answer:
        "Only when the posting expects platform or reliability ownership. Otherwise link out to /devops-engineer-resume-keywords and keep this page focused on product engineering delivery terms.",
    },
  ],
  "product-manager": [
    {
      question: "What are product manager resume keywords for ATS?",
      answer:
        "Roadmap, discovery, prioritization, metrics, launches, stakeholder alignment, and tools such as Jira, SQL, Amplitude, or Figma when listed. Outcome language beats feature lists.",
    },
    {
      question: "What keywords do ATS look for on PM resumes?",
      answer:
        "Overlap between your bullets and the posting: OKRs, experimentation, go-to-market, user research, and domain nouns (B2B SaaS, marketplace, etc.).",
    },
    {
      question: "How should product managers use keywords without sounding generic?",
      answer:
        "Pair each keyword with a shipped initiative and metric: conversion, retention, revenue, or time saved—not ‘managed roadmap’ alone.",
    },
    {
      question: "Can I scan a PM job description for missing keywords?",
      answer:
        "Yes—paste the posting and resume into the free checker to see gap terms before you apply.",
    },
  ],
  "business-analyst": [
    {
      question: "What are business analyst resume keywords for ATS?",
      answer:
        "Requirements elicitation, process mapping, user stories, BPMN, SQL, Power BI, Jira, Confluence, UAT, and stakeholder communication. Use the employer’s exact tool names.",
    },
    {
      question: "Are business analyst and systems analyst resume keywords the same?",
      answer:
        "No. Systems analyst postings often skew IT applications, support, and integrations. Use /systems-analyst-resume-keywords when the job title says systems analyst. This page targets classic BA work: requirements, process, and delivery alignment.",
    },
    {
      question: "Is a business systems analyst the same as a business analyst?",
      answer:
        "Overlap exists, but BSA postings often emphasize integrations, enterprise systems, and technical requirements. Use the business systems analyst section on this page for BSA titles; lead with classic BA keywords when the posting is process and delivery focused.",
    },
    {
      question: "What are business analyst resume keywords for ATS in 2026?",
      answer:
        "Agile ceremony language, API/integration requirements, data literacy, and automation/RPA mentions appear more often. Compare your draft to each JD.",
    },
    {
      question: "How many BA keywords should I include?",
      answer:
        "Cover each major requirement from the posting once in skills or bullets. Quality and traceability matter more than raw count.",
    },
  ],
  "frontend-developer": [
    {
      question: "What are the best frontend developer resume keywords?",
      answer:
        "React, TypeScript, JavaScript, Next.js, HTML, CSS, accessibility (WCAG), Core Web Vitals, Storybook, Playwright, and REST APIs—placed in summary, skills, and impact bullets on a frontend developer resume, not as a standalone skills dump.",
    },
    {
      question: "What are frontend developer ATS keywords?",
      answer:
        "ATS scans frontend developer resumes for stack terms (React, TypeScript, Next.js), quality signals (Jest, Playwright, WCAG), and delivery verbs (implemented, optimized, instrumented) inside measurable bullets.",
    },
    {
      question: "Are web developer resume keywords the same as frontend developer keywords?",
      answer:
        "Often overlapping, but job titles differ. Use this page when the posting says frontend developer or front-end engineer; mirror web developer wording only when that is the exact title in the job description.",
    },
  ],
  "backend-developer": [
    {
      question: "What are backend developer resume keywords for ATS?",
      answer:
        "APIs, databases, caching, authentication, microservices, cloud, CI/CD, and reliability metrics (latency, uptime, error rate).",
    },
    {
      question: "What backend resume technical skills do ATS scan for?",
      answer:
        "Literal matches to languages, frameworks, data stores, and messaging systems in the posting—plus verbs that show ownership of production systems.",
    },
    {
      question: "How is backend different from software engineer keywords?",
      answer:
        "Software engineer postings may include frontend or generalist scope. Backend pages should emphasize services, data layer, security, and scale.",
    },
    {
      question: "How do I find missing backend keywords in a JD?",
      answer:
        "Use the resume vs job description tool to list gap terms, then weave them into experience bullets with metrics.",
    },
  ],
  "machine-learning-engineer": [
    {
      question: "What are machine learning engineer resume keywords for ATS?",
      answer:
        "Model training, deployment, monitoring, feature pipelines, Python, PyTorch or TensorFlow, Kubernetes, and MLOps tooling. Emphasize production impact, not notebook-only work.",
    },
    {
      question: "What is the difference between machine learning and ML engineer resume keywords?",
      answer:
        "‘Machine learning resume keywords’ searches are broader. MLE roles should stress serving, drift, retraining, SLAs, and collaboration with platform teams.",
    },
    {
      question: "What ML resume keywords are common in 2026?",
      answer:
        "Feature stores, batch/real-time inference, observability for models, and responsible AI guardrails show up in more postings—when true for you, reflect them in bullets.",
    },
    {
      question: "Should I use data scientist keywords on an MLE resume?",
      answer:
        "Use overlap (Python, SQL, experimentation) where accurate, but prioritize deployment and reliability terms for MLE-targeted jobs.",
    },
  ],
  "devops-engineer": [
    {
      question: "What are DevOps resume keywords for ATS?",
      answer:
        "CI/CD, Kubernetes, Terraform, AWS (or Azure/GCP), monitoring, incident response, IaC, and security practices. Quantify deploy frequency, MTTR, and cost or reliability wins.",
    },
    {
      question: "What are DevOps resume keywords for ATS in 2025 and 2026?",
      answer:
        "GitOps, SRE language, secrets management, and policy-as-code appear frequently. Always mirror the posting’s cloud and toolchain names.",
    },
    {
      question: "Should DevOps resumes list every cloud service?",
      answer:
        "List services you operated in production with outcomes. Avoid a laundry list unrelated to your bullets.",
    },
    {
      question: "How do I match a DevOps job description?",
      answer:
        "Scan the JD against your resume with the free tool, then add missing platform and reliability keywords to bullets—not only the skills section.",
    },
  ],
  "full-stack-developer": [
    {
      question: "What are full-stack developer resume keywords for ATS?",
      answer:
        "Frontend and backend stack terms from the posting: React, Node, TypeScript, SQL, REST/GraphQL, auth, testing, and deployment. Show end-to-end ownership in bullets.",
    },
    {
      question: "How is full-stack different from software engineer keywords?",
      answer:
        "Full-stack JDs expect UI plus API plus data layer proof. Software engineer may be broader—tailor to the posting’s literal stack.",
    },
    {
      question: "What full-stack resume keywords matter in 2026?",
      answer:
        "Type-safe frontends, API design, database modeling, CI/CD, and measurable product outcomes (performance, conversion, reliability).",
    },
    {
      question: "Can I check missing full-stack keywords from a JD?",
      answer:
        "Yes—use the free resume vs job description checker to see gap skills and phrases before applying.",
    },
  ],
};

export function roleKeywordsFaqSchema(role: RoleSlug) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ROLE_KEYWORDS_FAQ[role].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
