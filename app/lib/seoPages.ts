export type ResumeSlug =
  | "data-analyst-resume-example"
  | "business-analyst-resume-example"
  | "frontend-developer-resume-example"
  | "backend-developer-resume-example"
  | "machine-learning-engineer-resume-example"
  | "data-scientist-resume-example"
  | "product-manager-resume-example"
  | "software-engineer-resume-example"
  | "devops-engineer-resume-example"
  | "full-stack-developer-resume-example";

export type ResumePageConfig = {
  slug: ResumeSlug;
  roleName: string;
  h1: string;
  metaDescription: string;
  exampleTitle: string;
  summary: string;
  bullets: string[];
};

export const RESUME_PAGES: Record<ResumeSlug, ResumePageConfig> = {
  "data-analyst-resume-example": {
    slug: "data-analyst-resume-example",
    roleName: "Data Analyst",
    h1: "Data Analyst Resume Example & Template (ATS-Friendly + Sample Projects)",
    metaDescription:
      "Data analyst resume example and copy-paste template: SQL, Python, Power BI, metrics, and sample bullets for data analytics roles. ATS-friendly format, then match to any job description.",
    exampleTitle: "Data Analyst – Resume Example",
    summary:
      "Data analyst with 4+ years of experience turning messy data into clear, actionable insights for product, marketing, and operations teams across B2B SaaS.",
    bullets: [
      "Owned end‑to‑end analysis for user growth funnel, using SQL, Python, and Tableau to identify drop‑off points and recommend experiments that increased activation by 14%.",
      "Built automated reporting in Looker for executive KPIs (MRR, churn, CAC payback), reducing manual reporting time by 12 hours per month.",
      "Designed and implemented A/B tests with product managers; analyzed results using statistical methods and clearly communicated trade‑offs to non‑technical stakeholders.",
      "Partnered with engineering to improve event tracking and data quality, increasing trustworthy coverage of key product events from 68% to 96%.",
    ],
  },
  "business-analyst-resume-example": {
    slug: "business-analyst-resume-example",
    roleName: "Business Analyst",
    h1: "Business Analyst Resume Example",
    metaDescription:
      "ATS‑optimized Business Analyst resume example with clear impact, stakeholder communication, and requirements gathering experience.",
    exampleTitle: "Business Analyst – Resume Example",
    summary:
      "Business analyst with 5+ years of experience translating complex business problems into simple requirements, dashboards, and process improvements.",
    bullets: [
      "Led discovery for a billing modernization initiative, gathering requirements from finance, sales, and support, resulting in a 22% reduction in invoice disputes.",
      "Mapped current‑state and future‑state processes using BPMN diagrams and identified 8 automation opportunities, saving ~1,000 hours annually.",
      "Maintained a portfolio of executive dashboards in Power BI, surfacing trends in customer churn, NPS, and operational SLAs for leadership.",
      "Acted as product owner for an internal tooling squad, writing user stories and acceptance criteria that enabled predictable two‑week sprints.",
    ],
  },
  "frontend-developer-resume-example": {
    slug: "frontend-developer-resume-example",
    roleName: "Frontend Developer",
    h1: "Frontend Developer Resume Example",
    metaDescription:
      "Frontend Developer resume example that passes ATS with modern React, TypeScript, accessibility, and performance optimization keywords.",
    exampleTitle: "Frontend Developer – Resume Example",
    summary:
      "Frontend developer specializing in React and TypeScript, focused on building fast, accessible interfaces that meet product and UX goals.",
    bullets: [
      "Rebuilt the marketing site in React and Next.js, improving Core Web Vitals and increasing organic signup conversion by 11%.",
      "Created a reusable component library with Storybook, reducing duplicate UI code and accelerating feature delivery across three product squads.",
      "Worked closely with designers to implement responsive layouts from Figma, achieving high design‑to‑code fidelity across mobile and desktop.",
      "Improved accessibility by fixing color contrast, landmarks, and keyboard navigation issues, helping the app meet WCAG 2.1 AA standards.",
    ],
  },
  "backend-developer-resume-example": {
    slug: "backend-developer-resume-example",
    roleName: "Backend Developer",
    h1: "Backend Developer Resume Example",
    metaDescription:
      "Backend Developer resume example with ATS‑friendly keywords for APIs, microservices, databases, and cloud infrastructure.",
    exampleTitle: "Backend Developer – Resume Example",
    summary:
      "Backend developer with 5+ years of experience designing APIs and microservices in Node.js and Java, focused on reliability and performance.",
    bullets: [
      "Designed and implemented REST and GraphQL APIs for the core billing platform, handling ~5M requests/day with 99.95% uptime.",
      "Optimized slow SQL queries and added caching with Redis, reducing average response times for key endpoints by 40%.",
      "Containerized services with Docker and deployed to AWS ECS with CI/CD pipelines, cutting average deployment time from 45 to 10 minutes.",
      "Collaborated with frontend teams to define contracts and error handling, improving integration reliability and reducing support tickets.",
    ],
  },
  "machine-learning-engineer-resume-example": {
    slug: "machine-learning-engineer-resume-example",
    roleName: "Machine Learning Engineer",
    h1: "Machine Learning Engineer Resume Example",
    metaDescription:
      "Machine Learning Engineer resume example that highlights Python, ML frameworks, and production model deployment in an ATS‑friendly way.",
    exampleTitle: "Machine Learning Engineer – Resume Example",
    summary:
      "Machine learning engineer with experience taking models from notebooks to production, focusing on reliability, monitoring, and business impact.",
    bullets: [
      "Built and deployed a churn prediction model in Python (scikit‑learn, XGBoost) that identified at‑risk customers and reduced churn by 9%.",
      "Implemented real‑time inference APIs and batch scoring jobs on AWS using Docker, ECS, and Step Functions.",
      "Worked with data engineers to productionize feature pipelines, improving training data freshness from weekly to daily.",
      "Set up model performance dashboards and alerts for drift and data quality, enabling proactive retraining decisions.",
    ],
  },
  "data-scientist-resume-example": {
    slug: "data-scientist-resume-example",
    roleName: "Data Scientist",
    h1: "Data Scientist Resume Example",
    metaDescription:
      "Data Scientist resume example with ATS‑ready language for experimentation, machine learning, and stakeholder storytelling.",
    exampleTitle: "Data Scientist – Resume Example",
    summary:
      "Data scientist with 6+ years of experience designing experiments, building ML models, and communicating insights to executives.",
    bullets: [
      "Led experimentation roadmap for onboarding funnel, designing A/B tests that increased day‑7 retention by 7%.",
      "Built customer lifetime value models using Python and SQL, informing marketing budget allocation and pricing decisions.",
      "Partnered with product managers to prioritize high‑impact analyses and present findings in executive‑ready narratives.",
      "Mentored junior analysts and scientists on statistics, experimentation, and storytelling best practices.",
    ],
  },
  "product-manager-resume-example": {
    slug: "product-manager-resume-example",
    roleName: "Product Manager",
    h1: "Product Manager Resume Example & Template (ATS-Friendly + Real Projects)",
    metaDescription:
      "Product manager resume examples, sample resume, and templates: roadmaps, metrics, B2B and API PM angles, product lead and data PM keywords. Copy-paste ATS-friendly resume for product management; match any job description.",
    exampleTitle: "Product Manager – Resume Example",
    summary:
      "Product manager with 7+ years of experience owning B2B SaaS products from discovery to launch, focused on impact and execution.",
    bullets: [
      "Owned roadmap for a $5M ARR product line, shipping features that increased expansion revenue by 18% year‑over‑year.",
      "Partnered with design and engineering to run discovery interviews, synthesize insights, and define problems worth solving.",
      "Defined product KPIs, built dashboards with analytics, and used metrics to drive prioritization and iteration decisions.",
      "Led cross‑functional go‑to‑market for major releases, coordinating marketing, sales enablement, and customer success.",
    ],
  },
  "software-engineer-resume-example": {
    slug: "software-engineer-resume-example",
    roleName: "Software Engineer",
    h1: "Software Engineer Resume Example",
    metaDescription:
      "Software Engineer resume example focused on clean code, teamwork, and delivering features that matter, written for ATS scanners and hiring managers.",
    exampleTitle: "Software Engineer – Resume Example",
    summary:
      "Software engineer with 4+ years of experience building full‑stack features in high‑growth product teams using TypeScript and Node.js.",
    bullets: [
      "Built and shipped new onboarding flows that reduced time‑to‑value by 30%, measured via product analytics.",
      "Collaborated with PMs and designers to break down large initiatives into incremental slices and deliver on schedule.",
      "Improved test coverage for critical services from 55% to 85% using Jest and Playwright, reducing production bugs.",
      "Participated in on‑call rotation, debugging incidents and documenting fixes to prevent regressions.",
    ],
  },
  "devops-engineer-resume-example": {
    slug: "devops-engineer-resume-example",
    roleName: "DevOps Engineer",
    h1: "DevOps Engineer Resume Example",
    metaDescription:
      "DevOps Engineer resume example with ATS‑optimized keywords for CI/CD, cloud, Kubernetes, monitoring, and reliability.",
    exampleTitle: "DevOps Engineer – Resume Example",
    summary:
      "DevOps engineer focused on reliable deployments, observability, and helping development teams ship quickly and safely.",
    bullets: [
      "Designed and maintained CI/CD pipelines in GitHub Actions, reducing deploy time from 40 minutes to under 10.",
      "Migrated services to Kubernetes on AWS, improving scalability and simplifying rollbacks with blue‑green deployments.",
      "Implemented centralized logging and alerting with Prometheus and Grafana, cutting mean time to recovery by 35%.",
      "Partnered with security to integrate vulnerability scanning and secrets management into the deployment process.",
    ],
  },
  "full-stack-developer-resume-example": {
    slug: "full-stack-developer-resume-example",
    roleName: "Full‑Stack Developer",
    h1: "Full‑Stack Developer Resume Example",
    metaDescription:
      "Full‑Stack Developer resume example that balances frontend UX, backend reliability, and ATS‑friendly technical keywords.",
    exampleTitle: "Full‑Stack Developer – Resume Example",
    summary:
      "Full‑stack developer comfortable across React, Node.js, and SQL, focused on end‑to‑end ownership and customer impact.",
    bullets: [
      "Delivered end‑to‑end features across React, Node.js, and PostgreSQL for a SaaS app used by 5,000+ customers.",
      "Collaborated with design and product to prioritize usability issues and ship improvements that reduced support tickets by 20%.",
      "Refactored legacy endpoints and added caching, improving page load times by 25% for key workflows.",
      "Wrote documentation for APIs and frontend components, making it easier for new engineers to contribute.",
    ],
  },
};

export type RoleSlug =
  | "data-analyst"
  | "data-scientist"
  | "software-engineer"
  | "product-manager"
  | "business-analyst"
  | "frontend-developer"
  | "backend-developer"
  | "machine-learning-engineer"
  | "devops-engineer"
  | "full-stack-developer";

/**
 * Roles with `app/{role}-resume-example/page.tsx`. The `/{role}` hub should use the same canonical
 * URL so the resume-example page is the single primary URL for “resume example” intent.
 */
export const ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE: readonly RoleSlug[] = [
  "data-analyst",
  "product-manager",
];

export type KeywordsConfig = {
  slug: RoleSlug;
  roleName: string;
  h1: string;
  metaDescription: string;
};

export const KEYWORD_PAGES: Record<RoleSlug, KeywordsConfig> = {
  "data-analyst": {
    slug: "data-analyst",
    roleName: "Data Analyst",
    h1: "ATS Keywords for Data Analyst Resumes",
    metaDescription:
      "See the most important ATS keywords for data analyst resumes across SQL, BI tools, dashboards, and analytics so you can pass screenings.",
  },
  "data-scientist": {
    slug: "data-scientist",
    roleName: "Data Scientist",
    h1: "ATS Keywords for Data Scientist Resumes",
    metaDescription:
      "Key ATS keywords for data scientist resumes, including machine learning, experimentation, and Python tooling.",
  },
  "software-engineer": {
    slug: "software-engineer",
    roleName: "Software Engineer",
    h1: "ATS Keywords for Software Engineer Resumes",
    metaDescription:
      "Software engineer ATS keywords for languages, frameworks, testing, and deployment so your resume passes screenings.",
  },
  "product-manager": {
    slug: "product-manager",
    roleName: "Product Manager",
    h1: "ATS Keywords for Product Manager Resumes",
    metaDescription:
      "Product manager ATS keywords for roadmaps, discovery, and metrics so your resume matches modern PM roles.",
  },
  "business-analyst": {
    slug: "business-analyst",
    roleName: "Business Analyst",
    h1: "ATS Keywords for Business Analyst Resumes",
    metaDescription:
      "Business analyst ATS keywords for requirements, processes, BI, and stakeholder comms.",
  },
  "frontend-developer": {
    slug: "frontend-developer",
    roleName: "Frontend Developer",
    h1: "ATS Keywords for Frontend Developer Resumes",
    metaDescription:
      "Frontend developer ATS keywords for React, TypeScript, accessibility, and performance optimization.",
  },
  "backend-developer": {
    slug: "backend-developer",
    roleName: "Backend Developer",
    h1: "ATS Keywords for Backend Developer Resumes",
    metaDescription:
      "Backend developer ATS keywords for APIs, databases, microservices, and cloud infrastructure.",
  },
  "machine-learning-engineer": {
    slug: "machine-learning-engineer",
    roleName: "Machine Learning Engineer",
    h1: "ATS Keywords for Machine Learning Engineer Resumes",
    metaDescription:
      "ML engineer ATS keywords for model training, deployment, and monitoring so your resume passes screenings.",
  },
  "devops-engineer": {
    slug: "devops-engineer",
    roleName: "DevOps Engineer",
    h1: "ATS Keywords for DevOps Engineer Resumes",
    metaDescription:
      "DevOps engineer ATS keywords for CI/CD, Kubernetes, monitoring, and reliability.",
  },
  "full-stack-developer": {
    slug: "full-stack-developer",
    roleName: "Full‑Stack Developer",
    h1: "ATS Keywords for Full‑Stack Developer Resumes",
    metaDescription:
      "Full‑stack developer ATS keywords across frontend, backend, and databases.",
  },
};

/** Inline sample copy still defined on `/{role}` for legacy/redirect traffic; internal links use the merged guide. */
export function resumePageConfigForRole(role: RoleSlug): ResumePageConfig | undefined {
  const key = `${role}-resume-example` as ResumeSlug;
  return RESUME_PAGES[key];
}

/** Fragment for the embedded sample card on the role hub (direct visits / legacy bookmarks only). */
export const RESUME_SAMPLE_HASH = "#resume-sample" as const;

/** Prefer the merged role resume guide (indexed) over the broad `/{role}` hub (noindex). */
export function roleResumeSamplePath(role: RoleSlug): string {
  return `/${role}-resume-guide#bullet-points`;
}

/**
 * Public URL for “resume example” intent: dedicated `/{role}-resume-example` when it exists;
 * otherwise the merged guide sample anchor (same as {@link roleResumeSamplePath}).
 */
export function resumeExamplePublicPath(role: RoleSlug): string {
  for (const r of ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE) {
    if (r === role) return `/${role}-resume-example`;
  }
  return roleResumeSamplePath(role);
}

