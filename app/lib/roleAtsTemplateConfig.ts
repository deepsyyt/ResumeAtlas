import type { Metadata } from "next";
import { getSiteUrl } from "@/app/lib/siteUrl";

export type RoleAtsTemplateKey = "data-analyst" | "product-manager" | "software-engineer";

export const ROLE_ATS_TEMPLATE_KEYS = [
  "data-analyst",
  "product-manager",
  "software-engineer",
] as const satisfies readonly RoleAtsTemplateKey[];

export const ROLE_ATS_PATH: Record<RoleAtsTemplateKey, string> = {
  "data-analyst": "/ats-resume-template-data-analyst",
  "product-manager": "/ats-resume-template-product-manager",
  "software-engineer": "/ats-resume-template-software-engineer",
};

type RoleBlock = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  keywordStrip: string[];
  verbStrip: string[];
  copySnippet: string;
  exampleHref: string;
  exampleLabel: string;
  keywordGuideHref: string;
  keywordGuideLabel: string;
  resumeGuideHref: string;
  resumeGuideLabel: string;
};

const BLOCKS: Record<RoleAtsTemplateKey, RoleBlock> = {
  "data-analyst": {
    path: ROLE_ATS_PATH["data-analyst"],
    title: "ATS Resume Template for Data Analysts (Format + Keywords) | ResumeAtlas",
    description:
      "Data analyst ATS resume template: single-column layout, SQL and dashboard keywords, and copy-paste starter text—then match your resume to any job description.",
    h1: "ATS resume template for data analysts",
    intro: [
      "Data analyst roles get flooded with applicants, so Applicant Tracking Systems filter on skills like SQL, Python, experimentation, and stakeholder communication before a human reads a line. A strong data analyst ATS resume template is not decorative—it is a predictable layout with plain-text skills and bullets that mirror the posting where you have real experience.",
      "This page gives you a role-specific keyword strip, action verbs hiring managers expect, and a compact starter block you can paste into Google Docs or Word. After you adapt it with your true metrics, run ResumeAtlas against the exact job description to see keyword gaps and ATS-style alignment before you submit.",
    ],
    keywordStrip: [
      "SQL · dbt · Snowflake · BigQuery · Python · pandas · Looker · Tableau · Power BI · A/B testing · funnel metrics · cohort analysis · KPI dashboards · stakeholder reporting · data quality · ETL",
    ],
    verbStrip: [
      "Analyzed · Automated · Built · Dashboarded · Modeled · Partnered · Quantified · Reconciled · Standardized · Validated · Visualized",
    ],
    copySnippet: `SAM RIVERA
Remote · sam.rivera@email.com

SUMMARY
Data analyst with 3+ years in marketing and product analytics. SQL, dashboards, experiments, and partnering with PMs on metrics.

SKILLS
SQL · dbt · Looker · Google Analytics · Snowflake (basics) · Python · A/B testing

EXPERIENCE
Data Analyst · BrightCo · Mar 2022–Present
• Owned self-serve funnel dashboards for growth; supported tests that improved trial-to-paid conversion.
• Standardized event definitions with PM + engineering; cut conflicting metric labels across four squads.

EDUCATION
BS Applied Mathematics · State University · 2019`,
    exampleHref: "/data-analyst-resume-example",
    exampleLabel: "Full data analyst resume example on ResumeAtlas",
    keywordGuideHref: "/data-analyst-resume-keywords",
    keywordGuideLabel: "Data analyst ATS keywords",
    resumeGuideHref: "/data-analyst-resume-guide",
    resumeGuideLabel: "Data analyst resume guide",
  },
  "product-manager": {
    path: ROLE_ATS_PATH["product-manager"],
    title: "ATS Resume Template for Product Managers (Format + Keywords) | ResumeAtlas",
    description:
      "Product manager ATS resume template: roadmap, discovery, and KPI language in a parser-safe layout—plus copy-paste starter text and a free job description match.",
    h1: "ATS resume template for product managers",
    intro: [
      "Product manager resumes fail ATS checks when keywords from the job description—like roadmap, prioritization, discovery, KPIs, and cross-functional delivery—never appear in plain text, or when fancy templates hide bullets from parsers. The fix is an ATS-friendly PM template: one column, standard headings, and bullets that map your real launches to the language of the posting.",
      "Use the keyword and verb strips below to tune a master resume for each application. Paste the starter snippet into Word or Google Docs, replace every line with your own outcomes, then paste your resume plus the job description into ResumeAtlas for a structured gap analysis.",
    ],
    keywordStrip: [
      "Roadmap · prioritization · PRD · discovery · stakeholder management · KPIs · OKRs · A/B testing · SQL (light) · Jira · go-to-market · retention · activation · monetization · user research",
    ],
    verbStrip: [
      "Prioritized · Shipped · Defined · Measured · Aligned · Drove · Scoped · Validated · Negotiated · Communicated · Iterated",
    ],
    copySnippet: `ALEX KIM
San Francisco Bay Area · alex.kim@email.com

SUMMARY
B2B SaaS product manager. Discovery, roadmaps, KPI impact, and shipping with design and engineering.

SKILLS
Product discovery · Roadmapping · PRDs · Jira · SQL (light) · A/B tests · Stakeholder management

EXPERIENCE
Associate Product Manager · CloudApp Inc · Jan 2021–Present
• Prioritized onboarding backlog with design and engineering; improved day-7 activation by 9% after two release cycles.
• Ran weekly triage with customer success; converted top ticket themes into roadmap bets with measurable success criteria.

EDUCATION
MBA · Pacific State University · 2020`,
    exampleHref: "/product-manager-resume-example",
    exampleLabel: "Full product manager resume example on ResumeAtlas",
    keywordGuideHref: "/product-manager-resume-keywords",
    keywordGuideLabel: "Product manager ATS keywords",
    resumeGuideHref: "/product-manager-resume-guide",
    resumeGuideLabel: "Product manager resume guide",
  },
  "software-engineer": {
    path: ROLE_ATS_PATH["software-engineer"],
    title: "ATS Resume Template for Software Engineers (Format + Keywords) | ResumeAtlas",
    description:
      "Software engineer ATS resume template: APIs, reliability, and delivery keywords in a scannable layout—starter text plus links to engineer keyword and bullet guides.",
    h1: "ATS resume template for software engineers",
    intro: [
      "Engineering job postings are dense with stack-specific tokens—languages, frameworks, cloud primitives, and reliability work—that ATS and recruiters scan for in seconds. A software engineer ATS resume template keeps those tokens in plain text sections parsers expect: Summary, Skills, Experience, Education—without multi-column layouts that drop content.",
      "Use the strips below as a sanity checklist against your target posting, then adapt the starter snippet with repos, systems, and scale you actually owned. For a structured match, paste your resume and the job description into ResumeAtlas to see missing skills and alignment issues before you apply.",
    ],
    keywordStrip: [
      "TypeScript · JavaScript · React · Node · APIs · microservices · CI/CD · AWS · testing · observability · performance · SQL · system design · code review · mentoring",
    ],
    verbStrip: [
      "Built · Shipped · Refactored · Optimized · Debugged · Automated · Scaled · Secured · Instrumented · Documented · Led",
    ],
    copySnippet: `RILEY NGUYEN
Austin, TX · riley.nguyen@email.com

SUMMARY
Software engineer focused on backend services, API reliability, and CI/CD. TypeScript/Node and AWS in production.

SKILLS
TypeScript · Node.js · PostgreSQL · AWS (ECS, Lambda) · Docker · GitHub Actions · Jest · OpenAPI

EXPERIENCE
Software Engineer · RiverStack · 2021–Present
• Reduced p95 API latency by 28% via caching, query tuning, and connection pool limits.
• Shipped GitHub Actions pipelines for blue/green deploys; cut failed releases by roughly 40% in six months.

EDUCATION
BS Computer Science · State University · 2021`,
    exampleHref: "/resume-bullet-points/software-engineer",
    exampleLabel: "Software engineer resume bullet hub (levels)",
    keywordGuideHref: "/software-engineer-resume-keywords",
    keywordGuideLabel: "Software engineer ATS keywords",
    resumeGuideHref: "/software-engineer-resume-guide",
    resumeGuideLabel: "Software engineer resume guide",
  },
};

export function getRoleAtsBlock(role: RoleAtsTemplateKey): RoleBlock {
  return BLOCKS[role];
}

export function roleAtsTemplateMetadata(role: RoleAtsTemplateKey): Metadata {
  const b = BLOCKS[role];
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${b.path}`;
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: b.path },
    openGraph: {
      title: b.title,
      description: b.description,
      type: "article",
      url,
    },
    keywords: [
      "ATS resume template",
      `${role.replace(/-/g, " ")} ATS resume`,
      "ATS friendly resume format",
      "resume keywords for ATS",
    ],
  };
}
