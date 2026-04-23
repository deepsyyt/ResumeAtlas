/** Visual preview fields (abbreviated for card UI); `plainText` is full copy payload. */

export type TemplatePreviewModel = {
  eyebrow: string;
  cardTitle: string;
  name: string;
  roleLine: string;
  contactLine: string;
  /** Optional second line (phone, LinkedIn) — reads like a real resume header. */
  contactLine2?: string;
  summary: string;
  skills: string;
  /** ATS-style experience header: title, company, dates (matches typical resume line). */
  experienceJob?: {
    title: string;
    company: string;
    dates: string;
  };
  bullets: string[];
  /** Optional projects / portfolio (common for early-career & tech resumes). */
  projects?: ReadonlyArray<{
    title: string;
    context?: string;
    outcome: string;
  }>;
  education?: string;
};

export const PREVIEW_GENERAL: TemplatePreviewModel = {
  eyebrow: "Template A",
  cardTitle: "General / early career",
  name: "Jordan Lee",
  roleLine: "Operations analytics · early career",
  contactLine: "Boston, MA · jordan.lee@email.com · (555) 010-0199",
  contactLine2: "linkedin.com/in/jordanlee",
  summary:
    "Economics graduate targeting operations analytics roles. Internship-proven at turning messy operational data into weekly KPI packs, exec-ready Excel readouts, and SQL-backed answers for account managers—comfortable owning the loop from raw tables to clear stakeholder updates under tight deadlines.",
  skills: "SQL · Microsoft Excel · Google Sheets · Tableau (basics) · Python (pandas, introductory)",
  experienceJob: {
    title: "Operations Analytics Intern",
    company: "Acme Logistics",
    dates: "Jun 2023 – Aug 2024",
  },
  bullets: [
    "Built weekly KPI pack in Excel; reduced prep time from roughly 4 hours to under 90 minutes.",
    "Joined and cleaned shipment-level tables (5k+ rows/week) for ad-hoc questions from account managers.",
  ],
  projects: [
    {
      title: "Campus operations KPI dashboard (Tableau + SQL)",
      context: "Academic project · team of 3",
      outcome:
        "Modeled dining-hall traffic and staffing gaps from 18 months of facility logs; surfaced $120K annualized overtime risk and a staffing plan adopted by the student union board.",
    },
    {
      title: "Cohort retention capstone (Python + Excel)",
      context: "Senior thesis · anonymized sample data",
      outcome:
        "Segmented first-year retention drivers with logistic-style feature exploration; delivered a 12-slide readout and reproducible notebook the department reused for advising outreach.",
    },
  ],
  education: "BS Economics · State University · May 2024",
};

export const PREVIEW_DATA_ANALYST: TemplatePreviewModel = {
  eyebrow: "Template B",
  cardTitle: "Data analyst",
  name: "Sam Rivera",
  roleLine: "Data Analyst · marketing & product analytics",
  contactLine: "Remote · sam.rivera@email.com · (555) 010-0220",
  contactLine2: "linkedin.com/in/samrivera",
  summary:
    "Marketing-leaning data analyst with 3+ years shipping self-serve dashboards, experiment readouts, and metric definitions PMs trust. Known for translating vague analytics asks into SQL + dbt models, Looker explores, and crisp narratives for GTM and product leadership.",
  skills: "SQL · dbt · Looker · Google Analytics · Snowflake (basics) · Python · A/B testing",
  experienceJob: {
    title: "Data Analyst",
    company: "BrightCo",
    dates: "Mar 2022 – Present",
  },
  bullets: [
    "Owned funnel dashboards for growth; supported tests that improved trial-to-paid.",
    "Standardized event definitions with PM + engineering across four squads.",
  ],
  projects: [
    {
      title: "Trial-to-paid attribution model (dbt + Snowflake)",
      context: "Side project · synthetic marketing funnel",
      outcome:
        "Built a multi-touch attribution prototype with staged SQL tests; documented assumptions and sensitivity checks recruiters could follow in a live walkthrough.",
    },
    {
      title: "Looker “single source of truth” style guide",
      context: "Internal wiki + example explores",
      outcome:
        "Published naming conventions and grain rules for event streams; cut duplicate explores and reduced conflicting KPI labels for partner squads.",
    },
    {
      title: "Paid search efficiency scorecard (Looker + SQL)",
      context: "Weekend build · public sample ad spend",
      outcome:
        "Rebuilt channel CPA/CVR views with drill paths marketing could self-serve; documented grain so blended metrics could not be double-counted.",
    },
    {
      title: "Churn early-warning playbook (Python + SQL)",
      context: "Kaggle-style churn dataset · personal repo",
      outcome:
        "Engineered rolling-usage features, ranked decile lift, and wrote a one-pager on leakage checks before any model ships to stakeholders.",
    },
  ],
  education: "BS Applied Mathematics · State University · 2019",
};

export const PREVIEW_PRODUCT_MANAGER: TemplatePreviewModel = {
  eyebrow: "Template C",
  cardTitle: "Product manager",
  name: "Alex Kim",
  roleLine: "Product Manager · B2B SaaS",
  contactLine: "San Francisco Bay Area · alex.kim@email.com · (555) 010-0331",
  contactLine2: "linkedin.com/in/alexkim",
  summary:
    "B2B SaaS PM who pairs discovery with measurable delivery: crisp PRDs, roadmap bets tied to KPIs, and tight loops with design and engineering. Comfortable running triage with CS, scoping A/B tests, and narrating tradeoffs to execs without hand-wavy roadmaps.",
  skills: "Product discovery · Roadmapping · PRDs · Jira · SQL (light) · A/B tests · Stakeholder management",
  experienceJob: {
    title: "Associate Product Manager",
    company: "CloudApp Inc",
    dates: "Jan 2021 – Present",
  },
  bullets: [
    "Prioritized onboarding backlog with design and engineering; improved day-7 activation by 9% after two release cycles.",
    "Ran weekly triage with customer success; converted top ticket themes into roadmap bets with measurable success criteria.",
  ],
  projects: [
    {
      title: "API usage-based pricing exploration",
      context: "0→1 discovery · cross-functional working group",
      outcome:
        "Interviewed 14 customers, mapped jobs-to-be-done, and shipped a one-pager with success metrics and risk flags—used by leadership to greenlight a scoped MVP track.",
    },
    {
      title: "Self-serve onboarding teardown",
      context: "Personal case study · public SaaS product",
      outcome:
        "Recorded 10-session funnel analysis with annotated screenshots and experiment backlog; practice artifact for stakeholder reviews and PM interviews.",
    },
    {
      title: "Enterprise SSO readiness competitive matrix",
      context: "PM interview prep · three public vendors",
      outcome:
        "Compared SCIM/SAML depth, audit logs, and SLA posture in a shareable sheet plus narrative on GTM risk—used as a live walkthrough artifact.",
    },
    {
      title: "“Power user” workflow research sprint",
      context: "5 interviews · B2B tool you already use",
      outcome:
        "Synthesized jobs-to-be-done into a FigJam map and opportunity tree tagged by impact vs. effort; informed a mock PRD outline for a settings overhaul.",
    },
  ],
  education: "MBA · Pacific State University · 2020",
};
