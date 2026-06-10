/** Visual preview fields (abbreviated for card UI); `plainText` is full copy payload. */

export type TemplatePreviewModel = {
  eyebrow: string;
  cardTitle: string;
  name: string;
  roleLine: string;
  contactLine: string;
  /** Optional second line (phone, LinkedIn) - reads like a real resume header. */
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
  eyebrow: "Featured template",
  cardTitle: "Professional ATS layout",
  name: "Jordan Lee",
  roleLine: "Senior Business Analyst · 8+ years",
  contactLine: "Chicago, IL · jordan.lee@email.com · (555) 010-0199",
  contactLine2: "linkedin.com/in/jordanlee",
  summary:
    "Senior business analyst with 8+ years translating requirements into shipped solutions. Delivers SQL-backed reporting, executive dashboards, and cross-functional alignment that improves forecast accuracy and cycle time across finance and operations.",
  skills:
    "SQL · Power BI · Tableau · Excel · Requirements gathering · Process mapping · Jira · Stakeholder management",
  experienceJob: {
    title: "Senior Business Analyst",
    company: "Northwind Financial",
    dates: "2019 – Present",
  },
  bullets: [
    "Led requirements workshops with 12 stakeholders; delivered a unified KPI framework adopted across finance and ops, reducing conflicting metrics by 38%.",
    "Built Power BI executive dashboard suite; cut monthly close reporting time from 6 days to 2.5 days.",
    "Mapped order-to-cash processes and authored 140+ user stories; accelerated release cadence by 22% over three quarters.",
    "Partnered with engineering on API integration specs; reduced production defects tied to requirements gaps by 31%.",
  ],
  education: "MBA · Midwest University · 2018",
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
    dates: "Mar 2022 - Present",
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
    dates: "Jan 2021 - Present",
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
        "Interviewed 14 customers, mapped jobs-to-be-done, and shipped a one-pager with success metrics and risk flags, used by leadership to greenlight a scoped MVP track.",
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
        "Compared SCIM/SAML depth, audit logs, and SLA posture in a shareable sheet plus narrative on GTM risk, used as a live walkthrough artifact.",
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
