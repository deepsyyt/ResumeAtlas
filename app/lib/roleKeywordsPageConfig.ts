import type { RoleSlug } from "@/app/lib/seoPages";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";

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
};

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

/** Secondary H2 targeting alternate query variants (long-tail). */
export const ROLE_KEYWORDS_SECONDARY_H2: Partial<Record<RoleSlug, string>> = {
  "data-analyst": `Keywords for Data Analyst Resume (${CONTENT_FRESHNESS_YEAR} ATS Checklist)`,
  "data-scientist": `Data Scientist Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "machine-learning-engineer": `Machine Learning Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
  "software-engineer": `Software Engineer Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR})`,
  "business-analyst": `Keywords for Business Analyst Resume (${CONTENT_FRESHNESS_YEAR})`,
  "devops-engineer": `DevOps Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR})`,
  "product-manager": `PM Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS List)`,
  "frontend-developer": `Frontend Resume Keywords for ATS (${CONTENT_FRESHNESS_YEAR})`,
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
    "Focused on business analyst (BA) job titles—not BSA, systems analyst, or BI-only roles. Use /business-systems-analyst-resume-keywords or /systems-analyst-resume-keywords when the posting uses those titles instead of BA.",
  "machine-learning-engineer":
    "Covers machine learning engineer (MLE) and production ML roles. For general data science research wording, also scan our data scientist keyword list.",
  "full-stack-developer":
    "End-to-end web stack keywords—not backend-only or frontend-only resumes unless the posting is explicitly full-stack.",
  "software-engineer":
    "Covers software engineer and software developer postings—mirror the job description’s exact title and stack (React, Java, Python, etc.).",
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
      question: "What are software engineer resume keywords for ATS?",
      answer:
        "Languages and frameworks from the posting, plus delivery terms: CI/CD, testing, APIs, system design, observability, and scale metrics. Mirror the stack in the JD (React, Node, Java, AWS, etc.).",
    },
    {
      question: "What are software engineer resume keywords for ATS in 2026?",
      answer:
        "Common 2026 terms include TypeScript, cloud platforms, container tooling, on-call/reliability language, and security basics. Always prioritize the employer’s literal wording.",
    },
    {
      question: "Should I list every programming language as a keyword?",
      answer:
        "List languages you can defend in interviews and support with project or work bullets. ATS match quality drops when skills never appear in experience.",
    },
    {
      question: "How do I match my resume to a software engineer job description?",
      answer:
        "Use the JD comparison tool to extract missing hard skills and responsibility phrases, then add them to bullets where you have evidence—not in a keyword block alone.",
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
        "No. Systems analyst postings often skew IT infrastructure and support integrations. This page targets classic BA work: requirements, process, and delivery alignment.",
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
      question: "What are frontend developer resume keywords for ATS?",
      answer:
        "React, TypeScript, JavaScript, HTML/CSS, accessibility (WCAG), performance (Core Web Vitals), testing (Jest, Playwright), and design-system terms when relevant.",
    },
    {
      question: "Should frontend resumes include backend keywords?",
      answer:
        "Only if the posting asks for full-stack or API work. Otherwise stay focused on UI, UX quality, and delivery metrics.",
    },
    {
      question: "What frontend resume keywords matter in 2026?",
      answer:
        "Component architecture, SSR/Next.js, a11y compliance, and measurable UX or conversion improvements are high-signal.",
    },
    {
      question: "How do I check missing keywords for a frontend role?",
      answer:
        "Run the job description and resume through the free matcher and add missing stack terms to bullets you can support.",
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
