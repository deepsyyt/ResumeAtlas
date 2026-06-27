import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";

export type AltRoleKeywordSlug =
  | "business-systems-analyst"
  | "systems-analyst"
  | "business-intelligence";

export type AltRoleKeywordPageConfig = {
  slug: AltRoleKeywordSlug;
  /** Public path (indexed). */
  path: string;
  roleName: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  scopeNote: string;
  relatedKeywordPages: { path: string; label: string }[];
  relatedGuidePages: { path: string; label: string }[];
  tools: string[];
  domainVerbs: string[];
  topKeywords: string[];
  exampleBullets: string[];
  keywordMistakes: string[];
  faq: { question: string; answer: string }[];
};

function pathFor(slug: AltRoleKeywordSlug): string {
  return `/${slug}-resume-keywords`;
}

export const ALT_ROLE_KEYWORD_PAGES: Record<AltRoleKeywordSlug, AltRoleKeywordPageConfig> = {
  "business-systems-analyst": {
    slug: "business-systems-analyst",
    path: pathFor("business-systems-analyst"),
    roleName: "Business Systems Analyst",
    h1: `Business Systems Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
    title: `Business Systems Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR}) - ATS List${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Business systems analyst (BSA) resume keywords for ATS: requirements, UAT, integrations, SQL, Jira, and process terms. Not the same as business analyst or data analyst—copy this list, then scan your resume against the job description.",
    intro:
      "Copy-ready business systems analyst resume keywords for ATS and recruiter scans—focused on requirements, solution design, UAT, and systems integration language common on BSA postings.",
    scopeNote:
      "This page is for business systems analyst (BSA) titles. For classic business analyst (BA) process work, use our business analyst keyword page. For SQL-heavy analytics roles, use the data analyst keyword page.",
    relatedKeywordPages: [
      { path: "/business-analyst-resume-keywords#business-systems-analyst-keywords", label: "Business systems analyst resume keywords" },
      { path: "/data-analyst-resume-keywords", label: "Data analyst resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/business-analyst-resume-guide", label: "Business analyst resume example" },
    ],
    tools: ["Jira", "Confluence", "SQL", "Visio", "Lucidchart", "UAT", "API documentation"],
    domainVerbs: ["elicited", "translated", "validated", "facilitated", "documented"],
    topKeywords: [
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
      "Confluence",
      "Gap analysis",
      "Functional specifications",
      "Agile",
      "Change management",
      "Workflow optimization",
      "Root cause analysis",
      "Cross-functional facilitation",
    ],
    exampleBullets: [
      "Elicited BSA requirements across finance and operations, reducing post-build change requests by 32% using structured user stories and acceptance criteria in Jira.",
      "Led UAT for a billing-system integration, documenting defects and sign-off criteria that cut production rollback risk on launch weekend.",
      "Mapped as-is/to-be workflows in Visio for order-to-cash, identifying integration points that saved ~700 hours of manual reconciliation annually.",
      "Partnered with engineering on API and data requirements, translating business rules into functional specs consumed by three delivery squads.",
      "Facilitated stakeholder workshops to prioritize a 35-item backlog, aligning business systems scope with a single release train.",
    ],
    keywordMistakes: [
      "Using business analyst keywords only when the posting says business systems analyst or integration-heavy BSA.",
      "Listing SQL or Jira without UAT, integration, or solution-design proof in bullets.",
      "Copying data analyst dashboard language when the role owns requirements and delivery, not analytics.",
    ],
    faq: [
      {
        question: "What are business systems analyst resume keywords for ATS?",
        answer:
          "Prioritize requirements elicitation, solution design, UAT, process mapping, systems integration, SQL, Jira, and stakeholder terms from the posting. Mirror the employer’s exact title (BSA vs BA).",
      },
      {
        question: "Is a business systems analyst the same as a business analyst?",
        answer:
          "Overlap exists, but BSA postings often emphasize integrations, enterprise systems, and technical requirements. Use this page for BSA titles; use the business analyst keyword page for classic BA work.",
      },
      {
        question: "Should BSA resumes include data analyst keywords?",
        answer:
          "Only when the job description asks for analytics, SQL modeling, or BI ownership. Otherwise keep BSA language aligned to requirements, UAT, and systems delivery.",
      },
      {
        question: "How do I check missing BSA keywords from a job description?",
        answer:
          "Paste the posting and your resume into the free resume vs job description checker to see gap terms before you apply.",
      },
      {
        question: "Is this the same page as data analyst resume keywords?",
        answer:
          "No. Data analyst roles focus on SQL analytics, dashboards, and metrics. Use /data-analyst-resume-keywords only when the posting is analytics-heavy—not for systems analyst titles.",
      },
    ],
  },
  "systems-analyst": {
    slug: "systems-analyst",
    path: pathFor("systems-analyst"),
    roleName: "Systems Analyst",
    h1: `Systems Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
    title: `Systems Analyst Resume Keywords (${CONTENT_FRESHNESS_YEAR}) | SDLC, UML & ATS Checklist${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Systems analyst resume keywords for ATS: IT support, applications, integrations, SQL, troubleshooting, and SDLC terms. Distinct from business analyst—scan your resume against the job description free.",
    intro:
      "Systems analyst resume keywords geared toward application support, technical requirements, integrations, and production systems—not pure business process BA work.",
    scopeNote:
      "For business analyst (requirements/process) keywords, use the business analyst page. For infrastructure and SRE-heavy roles, see DevOps engineer keywords. This page targets systems analyst and IT systems analyst postings.",
    relatedKeywordPages: [
      { path: "/business-analyst-resume-keywords", label: "Business analyst resume keywords" },
      { path: "/business-intelligence-resume-keywords", label: "Business intelligence resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/business-analyst-resume-guide", label: "Business analyst resume example" },
    ],
    tools: ["SQL", "Jira", "ServiceNow", "Confluence", "Linux", "Postman", "Git"],
    domainVerbs: ["troubleshot", "implemented", "documented", "supported", "integrated"],
    topKeywords: [
      "Systems analyst",
      "Application support",
      "Production support",
      "Incident management",
      "Root cause analysis",
      "SDLC",
      "Requirements analysis",
      "Technical specifications",
      "System integration",
      "SQL",
      "API",
      "ITIL",
      "ServiceNow",
      "Jira",
      "UAT",
      "Data mapping",
      "Workflow automation",
      "Regression testing",
      "Change management",
      "Stakeholder communication",
    ],
    exampleBullets: [
      "Supported tier-2 production incidents for billing APIs, reducing mean time to resolve (MTTR) from 4.2h to 2.1h over two quarters.",
      "Documented technical specifications and data mappings for a CRM integration used by sales and support teams.",
      "Authored SQL validation scripts for migration cutovers, surfacing data defects before go-live and avoiding a scheduled rollback.",
      "Partnered with developers on Jira-backed release cycles, improving on-time deployment rate from 78% to 91%.",
      "Led UAT and regression test plans for a policy admin system upgrade with 40+ signed acceptance scenarios.",
    ],
    keywordMistakes: [
      "Treating systems analyst as identical to business analyst without IT/production-support language.",
      "Listing tools never referenced in support, integration, or SDLC bullets.",
      "Omitting incident, troubleshooting, or change-management terms when the JD owns operations.",
    ],
    faq: [
      {
        question: "What are systems analyst resume keywords for ATS?",
        answer:
          "Common terms include application support, integrations, SQL, SDLC, incident management, technical specifications, UAT, and ticketing tools (Jira, ServiceNow). Match the posting literally.",
      },
      {
        question: "Are systems analyst and business analyst resume keywords the same?",
        answer:
          "No. Systems analyst roles usually skew IT applications, support, and integrations. Business analyst roles skew process, requirements, and stakeholder delivery. Use the page that matches the job title.",
      },
      {
        question: "What is the difference between systems analyst and data analyst keywords?",
        answer:
          "Data analyst keywords emphasize analytics, dashboards, and metrics. Systems analyst keywords emphasize applications, support, integrations, and technical delivery.",
      },
      {
        question: "How do I find missing systems analyst keywords in a JD?",
        answer:
          "Use the free resume vs job description checker to list gap skills and phrases, then add them to bullets you can defend in interviews.",
      },
    ],
  },
  "business-intelligence": {
    slug: "business-intelligence",
    path: pathFor("business-intelligence"),
    roleName: "Business Intelligence",
    h1: `Business Intelligence Resume Keywords (${CONTENT_FRESHNESS_YEAR})`,
    title: `Business Intelligence Resume Keywords (${CONTENT_FRESHNESS_YEAR}) - BI ATS List${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Business intelligence (BI) resume keywords for ATS: Power BI, Tableau, SQL, data modeling, dashboards, and KPI reporting. For general analytics roles, also see data analyst keywords. Free JD scan.",
    intro:
      "Business intelligence resume keywords for BI developer, BI analyst, and analytics engineer postings—dashboards, semantic models, SQL, and stakeholder reporting language.",
    scopeNote:
      "Focused on business intelligence and BI analyst titles across tools. For Power BI–only postings (DAX, semantic models, Fabric), use /power-bi-resume-keywords. For broader analytics roles, use data analyst or data scientist keyword pages.",
    relatedKeywordPages: [
      { path: "/power-bi-resume-keywords", label: "Power BI resume keywords" },
      { path: "/data-analyst-resume-keywords", label: "Data analyst resume keywords" },
      { path: "/data-scientist-resume-keywords", label: "Data scientist resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/data-analyst-resume-guide", label: "Data analyst resume example" },
    ],
    tools: ["Power BI", "Tableau", "SQL", "SSIS", "dbt", "Looker", "Excel"],
    domainVerbs: ["modeled", "visualized", "reported", "automated", "standardized"],
    topKeywords: [
      "Business intelligence",
      "Power BI",
      "Tableau",
      "SQL",
      "Data modeling",
      "Star schema",
      "ETL",
      "Dashboards",
      "KPI reporting",
      "DAX",
      "Semantic model",
      "Data warehouse",
      "Looker",
      "Self-service analytics",
      "Executive reporting",
      "Data governance",
      "Metrics definitions",
      "Cohort analysis",
      "Forecasting",
      "Stakeholder reporting",
    ],
    exampleBullets: [
      "Built Power BI executive dashboards for revenue and retention KPIs, cutting weekly leadership reporting time by 10 hours.",
      "Modeled star-schema datasets in SQL for self-service Tableau users, reducing ad-hoc request backlog by 45%.",
      "Standardized metric definitions across finance and product, eliminating recurring KPI discrepancies in monthly reviews.",
      "Automated ETL refreshes for sales operations reporting, improving data freshness from daily to hourly for pipeline views.",
      "Partnered with stakeholders to translate business questions into BI requirements, improving dashboard adoption by 28% quarter-over-quarter.",
    ],
    keywordMistakes: [
      "Listing Power BI or Tableau without dashboard outcomes, users, or decision impact.",
      "Using data scientist ML keywords when the posting is BI reporting and semantic modeling only.",
      "Ignoring data modeling and SQL terms that appear in the first half of the JD.",
    ],
    faq: [
      {
        question: "What are business intelligence resume keywords for ATS?",
        answer:
          "Prioritize Power BI, Tableau, SQL, data modeling, ETL, dashboards, KPI reporting, and metrics governance terms from the job description.",
      },
      {
        question: "Is business intelligence the same as data analyst resume keywords?",
        answer:
          "Overlap is high. Use this page when the title or JD says BI, BI developer, or business intelligence. Use the data analyst page for general analytics roles without BI tooling emphasis.",
      },
      {
        question: "Should BI resumes include machine learning keywords?",
        answer:
          "Only if the posting requires modeling beyond reporting and semantic layers. Otherwise stay focused on SQL, BI tools, and stakeholder metrics.",
      },
      {
        question: "How do I scan a BI job description for missing keywords?",
        answer:
          "Paste the JD and your resume into the free checker to see weak or missing BI tool and reporting terms before you apply.",
      },
    ],
  },
};

export const ALT_ROLE_KEYWORD_SLUGS = Object.keys(
  ALT_ROLE_KEYWORD_PAGES
) as AltRoleKeywordSlug[];

/** Standalone URL merged into `/business-analyst-resume-keywords#business-systems-analyst-keywords`. */
export const MERGED_ALT_ROLE_KEYWORD_SLUG = "business-systems-analyst" as const satisfies AltRoleKeywordSlug;

export function getIndexedAltRoleKeywordSlugs(): AltRoleKeywordSlug[] {
  return ALT_ROLE_KEYWORD_SLUGS.filter((slug) => slug !== MERGED_ALT_ROLE_KEYWORD_SLUG);
}

export function getAltRoleKeywordConfig(slug: AltRoleKeywordSlug): AltRoleKeywordPageConfig {
  return ALT_ROLE_KEYWORD_PAGES[slug];
}

export function isAltRoleKeywordPath(pathname: string): AltRoleKeywordSlug | null {
  const normalized = pathname.replace(/\/$/, "");
  for (const slug of ALT_ROLE_KEYWORD_SLUGS) {
    if (normalized === pathFor(slug)) return slug;
  }
  return null;
}
