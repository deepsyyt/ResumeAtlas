/** Visual preview fields (abbreviated for card UI); `plainText` is full copy payload. */

export type TemplatePreviewModel = {
  eyebrow: string;
  cardTitle: string;
  name: string;
  roleLine: string;
  contactLine: string;
  summary: string;
  skills: string;
  bullets: string[];
  education?: string;
};

export const PREVIEW_GENERAL: TemplatePreviewModel = {
  eyebrow: "Template A",
  cardTitle: "General / early career",
  name: "Jordan Lee",
  roleLine: "Early career · analytics & operations",
  contactLine: "Boston, MA · jordan.lee@email.com",
  summary:
    "Recent graduate with internship experience in reporting and operations. SQL, Excel, and clear stakeholder updates.",
  skills: "SQL · Excel · Google Sheets · Tableau (basics) · Python",
  bullets: [
    "Built weekly KPI pack in Excel; cut prep from ~4h to under 90 minutes.",
    "Joined shipment tables (5k+ rows/week) for ad-hoc account manager questions.",
  ],
  education: "BS Economics · State University · 2024",
};

export const PREVIEW_DATA_ANALYST: TemplatePreviewModel = {
  eyebrow: "Template B",
  cardTitle: "Data analyst",
  name: "Sam Rivera",
  roleLine: "Data Analyst · marketing & product analytics",
  contactLine: "Remote · sam.rivera@email.com",
  summary:
    "3+ years in dashboards, experiments, and partnering with PMs on metrics and readouts.",
  skills: "SQL · dbt · Looker · GA · Snowflake · Python · A/B testing",
  bullets: [
    "Owned funnel dashboards for growth; supported tests that improved trial-to-paid.",
    "Standardized event definitions with PM + engineering across four squads.",
  ],
  education: "BS Applied Math · State University · 2019",
};

export const PREVIEW_PRODUCT_MANAGER: TemplatePreviewModel = {
  eyebrow: "Template C",
  cardTitle: "Product manager",
  name: "Alex Kim",
  roleLine: "Product Manager · B2B SaaS",
  contactLine: "SF Bay Area · alex.kim@email.com",
  summary:
    "Discovery, roadmaps, KPI impact, and shipping with design and engineering.",
  skills: "PRDs · Jira · SQL (light) · A/B tests · Stakeholder management",
  bullets: [
    "Prioritized onboarding backlog; improved day-7 activation after two releases.",
    "Weekly CS triage → roadmap bets with measurable success criteria.",
  ],
  education: "MBA · Pacific State University · 2020",
};
