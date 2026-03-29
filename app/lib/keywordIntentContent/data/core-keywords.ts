import type { RoleSlug } from "@/app/lib/seoPages";
import type { KeywordIntentContent } from "../types";
import { cluster, ex, page } from "../helpers";

/** Core high-signal ATS terms per role — 5 clusters × ~10 keywords, 2 examples/cluster */
export const CORE_KEYWORDS_BY_ROLE: Record<RoleSlug, KeywordIntentContent> = {
  "data-scientist": page(
    "Core ATS keywords for data scientist resumes: ML, statistics, Python, experimentation, and stakeholder impact.",
    "These clusters capture what hiring systems and recruiters scan for first on data scientist resumes: modeling depth, statistical rigor, tooling, experimentation, and how you translate analysis into decisions. Use them as a checklist against real job descriptions—mirror phrasing where it matches your experience, and avoid dumping terms you cannot defend in an interview.",
    [
      cluster(
        "Machine learning & statistical modeling",
        "Shows you can go beyond dashboards to estimators, uncertainty, and model lifecycle work.",
        [
          "supervised learning",
          "unsupervised learning",
          "classification",
          "regression",
          "gradient boosting",
          "random forest",
          "XGBoost",
          "hyperparameter tuning",
          "cross-validation",
          "model calibration",
        ],
        [
          ex("Used machine learning", "Built gradient-boosted churn models (XGBoost) with calibrated probabilities for lifecycle campaigns."),
          ex("Statistics background", "Applied frequentist and Bayesian methods to quantify uncertainty for executive decisions."),
        ]
      ),
      cluster(
        "Programming, SQL & the modern data stack",
        "ATS matches languages and query patterns to data-heavy job descriptions.",
        [
          "Python",
          "pandas",
          "NumPy",
          "SQL",
          "PySpark",
          "scikit-learn",
          "Jupyter",
          "Git",
          "unit testing",
          "code review",
        ],
        [
          ex("Python skills", "Wrote production-ready Python for feature generation and offline evaluation pipelines."),
          ex("SQL", "Authored complex SQL (CTEs, window functions) for cohort and funnel metrics used in experiments."),
        ]
      ),
      cluster(
        "Experimentation, metrics & causal thinking",
        "Differentiates analytics-heavy DS roles from pure modeling gigs.",
        [
          "A/B testing",
          "experiment design",
          "power analysis",
          "incrementality",
          "causal inference",
          "quasi-experiments",
          "KPI definition",
          "North Star metrics",
          "significance testing",
          "multiple comparisons",
        ],
        [
          ex("Ran A/B tests", "Designed and analyzed onboarding experiments; recommended ship/no-ship with guardrails on secondary metrics."),
          ex("Metrics", "Partnered with PMs to define success metrics aligned to revenue and retention, not vanity clicks."),
        ]
      ),
      cluster(
        "Data quality, features & deployment",
        "Signals MLOps-adjacent strength many teams now expect.",
        [
          "feature engineering",
          "feature store",
          "data pipelines",
          "ETL",
          "model monitoring",
          "drift detection",
          "batch scoring",
          "real-time inference",
          "Docker",
          "MLflow",
        ],
        [
          ex("Deployed models", "Productionized scoring jobs on AWS with monitoring for drift and data-quality regressions."),
          ex("Data", "Worked with engineers to harden feature pipelines and reduce training-serving skew."),
        ]
      ),
      cluster(
        "Communication, product partnership & ethics",
        "Executive-ready storytelling and responsible use separate senior DS profiles.",
        [
          "stakeholder management",
          "executive narratives",
          "slide decks",
          "requirements translation",
          "bias and fairness",
          "model explainability",
          "documentation",
          "mentorship",
          "cross-functional collaboration",
          "prioritization",
        ],
        [
          ex("Good communicator", "Presented experiment readouts to leadership with clear trade-offs and next experiments."),
          ex("Team player", "Led weekly analytics reviews with PM and engineering to align on metric ownership."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice:
          "Name 2–3 anchor domains (e.g., experimentation, personalization) plus scale signals (users, revenue, data volume).",
        example:
          "Data scientist with 5+ years driving retention and monetization via experimentation and production ML at B2C scale.",
      },
      {
        section: "skills",
        advice: "Group by Modeling, Engineering, Experimentation, Tools—mirror the job’s section headers when possible.",
        example: "Modeling: classification, uplift modeling, calibration · Experimentation: A/B testing, sequential testing",
      },
      {
        section: "skills",
        advice: "Spell out acronyms once with the expansion for ATS parsers (e.g., SHAP (SHapley Additive exPlanations)).",
      },
      {
        section: "experience",
        advice:
          "Each bullet should contain at least one domain keyword and one outcome (metric, rate, latency, revenue).",
        example:
          "Shipped uplift models for promotions; measured incremental revenue with holdout and guardrail metrics.",
      },
      {
        section: "experience",
        advice: "Tie modeling choices to business decisions: why this objective, why this model class, what changed after ship.",
      },
    ],
    [
      "Keyword stuffing a skills line with every ML buzzword—recruiters will probe and ATS may still miss context.",
      "Listing tools you only used once at hobby depth; keep keywords tied to recent, credible scope.",
      "Hiding impact behind tasks: ‘built models’ without metrics, constraints, or stakeholder outcome.",
      "Ignoring experimentation keywords when the job emphasizes A/B testing and causal thinking.",
    ]
  ),

  "software-engineer": page(
    "Core ATS keywords for software engineer resumes: languages, systems design, testing, CI/CD, and measurable delivery.",
    "These terms map to how engineering job descriptions are written: stack specifics, reliability, ownership, and collaboration. Your resume should echo the posting’s vocabulary while proving depth with scope, scale, and outcomes—not isolated buzzwords.",
    [
      cluster(
        "Languages, frameworks & runtime",
        "Primary signals for stack fit and seniority.",
        [
          "TypeScript",
          "JavaScript",
          "Python",
          "Go",
          "Java",
          "React",
          "Node.js",
          "GraphQL",
          "REST APIs",
          "gRPC",
        ],
        [
          ex("Developed software", "Shipped TypeScript services handling 4k RPS with p95 latency under 120ms after caching."),
          ex("Know React", "Implemented React features with strong typing, error boundaries, and integration tests."),
        ]
      ),
      cluster(
        "Systems design, APIs & data stores",
        "Shows you think beyond feature work.",
        [
          "microservices",
          "service boundaries",
          "idempotency",
          "PostgreSQL",
          "Redis",
          "messaging queues",
          "Kafka",
          "schema design",
          "migrations",
          "CAP tradeoffs",
        ],
        [
          ex("Worked on APIs", "Designed versioned REST APIs with backward-compatible migrations and consumer-driven contracts."),
          ex("Databases", "Reduced hot-query latency 40% via index redesign and read replicas for reporting workloads."),
        ]
      ),
      cluster(
        "Quality, testing & reliability",
        "Differentiates engineers who ship safely.",
        [
          "unit tests",
          "integration tests",
          "contract testing",
          "CI/CD",
          "feature flags",
          "observability",
          "logging",
          "metrics",
          "tracing",
          "on-call",
        ],
        [
          ex("Testing experience", "Expanded integration tests for billing flows, cutting production regressions 55% quarter over quarter."),
          ex("DevOps", "Built CI pipelines with staged rollouts and automated smoke tests before promotion."),
        ]
      ),
      cluster(
        "Performance, scale & security",
        "Critical for backend-heavy and customer-facing roles.",
        [
          "performance profiling",
          "load testing",
          "caching strategies",
          "rate limiting",
          "OAuth",
          "JWT",
          "secrets management",
          "encryption at rest",
          "TLS",
          "dependency scanning",
        ],
        [
          ex("Optimized code", "Profiled CPU hotspots and reduced allocation churn, improving p99 by 28% on checkout path."),
          ex("Security", "Implemented least-privilege IAM for service accounts and rotated credentials automatically."),
        ]
      ),
      cluster(
        "Collaboration & delivery",
        "How you work with product, design, and peers.",
        [
          "code review",
          "technical design docs",
          "agile",
          "scrum",
          "sprint planning",
          "pair programming",
          "mentorship",
          "cross-functional",
          "roadmap input",
          "incident response",
        ],
        [
          ex("Team player", "Led design review for payments refactor with clear rollout plan and rollback criteria."),
          ex("Agile", "Partnered with PM/design in two-week cycles; shipped incremental slices behind feature flags."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "State your specialty (backend, full-stack, infra-adjacent) and 1–2 scale or domain anchors.",
        example: "Backend engineer focused on high-throughput APIs and data-intensive services in fintech.",
      },
      {
        section: "skills",
        advice: "Align ordering with the job: if React/TypeScript lead the posting, surface them first.",
      },
      {
        section: "skills",
        advice: "Separate ‘strong’ vs ‘exposure’ only if you must—mislabeling depth backfires in interviews.",
      },
      {
        section: "experience",
        advice: "Bullets: action + system/component + tool + measurable outcome (latency, uptime, cost, incidents).",
        example: "Cut incident rate 35% by adding SLOs, burn alerts, and runbooks for checkout dependencies.",
      },
      {
        section: "experience",
        advice: "Mention constraints: traffic, data size, SLAs, compliance—this differentiates seniority.",
      },
    ],
    [
      "Treating ‘familiar with’ tools as production-level expertise.",
      "Bullets that only list libraries without business or reliability outcomes.",
      "Omitting testing/CI keywords when the job emphasizes quality and delivery rigor.",
      "Generic ‘fast-paced environment’ lines instead of concrete ownership and metrics.",
    ]
  ),

  "data-analyst": page(
    "Core ATS keywords for data analyst resumes: SQL, BI, metrics, experimentation, and stakeholder storytelling.",
    "Hiring teams look for analysts who can own definitions, ship trustworthy reporting, and drive decisions—not only pull queries. These clusters align with how ATS maps analyst postings to resumes.",
    [
      cluster(
        "SQL, data modeling & BI",
        "Foundation for almost every analyst role.",
        [
          "SQL",
          "CTEs",
          "window functions",
          "joins",
          "dbt",
          "data modeling",
          "star schema",
          "Looker",
          "Tableau",
          "Power BI",
        ],
        [
          ex("SQL skills", "Wrote SQL with CTEs and window functions to build cohort retention views used in weekly reviews."),
          ex("Dashboards", "Maintained executive KPI dashboards in Looker with certified metrics and row-level security."),
        ]
      ),
      cluster(
        "Metrics, funnels & business context",
        "Shows you connect data work to outcomes.",
        [
          "KPIs",
          "OKRs",
          "funnel analysis",
          "conversion rate",
          "retention",
          "churn",
          "cohort analysis",
          "segmentation",
          "ROI",
          "forecasting",
        ],
        [
          ex("Analyzed data", "Diagnosed activation drop using funnel and segment cuts; recommended UX tests that recovered 8% lift."),
          ex("Reporting", "Standardized MRR/churn definitions across finance and ops to end metric debates."),
        ]
      ),
      cluster(
        "Experimentation & causal language",
        "Increasingly required even outside pure DS roles.",
        [
          "A/B testing",
          "experiment results",
          "holdout groups",
          "incrementality",
          "significance",
          "confidence intervals",
          "sample size",
          "guardrail metrics",
          "post-stratification",
          "bias checks",
        ],
        [
          ex("Ran tests", "Supported A/B tests on pricing page with pre-registered metrics and week-over-week readouts."),
          ex("Correlation", "Separated correlation from impact using holdouts and geo-based controls."),
        ]
      ),
      cluster(
        "Data quality, governance & ops",
        "Signals maturity for larger orgs.",
        [
          "data quality",
          "anomaly detection",
          "SLAs",
          "data dictionaries",
          "lineage",
          "ETL",
          "Airflow",
          "Snowflake",
          "BigQuery",
          "Redshift",
        ],
        [
          ex("Cleaned data", "Partnered with eng to fix tracking gaps; raised event coverage from 72% to 96% on core flows."),
          ex("Pipelines", "Documented semantic layer in BI to reduce duplicate dashboards across teams."),
        ]
      ),
      cluster(
        "Stakeholder enablement & communication",
        "Analysts win on influence and clarity.",
        [
          "requirements gathering",
          "executive summaries",
          "slide decks",
          "workshops",
          "ad hoc analysis",
          "narratives",
          "prioritization",
          "stakeholder management",
          "cross-functional",
          "self-serve analytics",
        ],
        [
          ex("Communication skills", "Translated funnel findings into a 3-slide exec brief that unlocked roadmap reprioritization."),
          ex("Meetings", "Facilitated weekly metrics review with PM/marketing with action owners and deadlines."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Highlight domains (marketing, product, finance) and decision types you support.",
        example: "Analyst partnering with growth and product on funnel diagnostics, experimentation readouts, and KPI reporting.",
      },
      {
        section: "skills",
        advice: "List BI + warehouse stack explicitly if the posting names them.",
      },
      {
        section: "experience",
        advice: "Quantify decisions influenced: budget shifts, roadmap bets, support volume avoided.",
        example: "Recommended channel mix change that improved ROAS 17% QoQ after geo holdout analysis.",
      },
      {
        section: "experience",
        advice: "Name the audience: leadership, PM, finance—matches stakeholder-heavy JD language.",
      },
      {
        section: "skills",
        advice: "Include ‘metric definitions’ skills when you owned semantic layers or finance alignment.",
      },
    ],
    [
      "Vague ‘data-driven’ claims without metrics, definitions, or decisions.",
      "Keyword dumping vendor names without how you used them in production reporting.",
      "Ignoring experimentation terms when the role owns test readouts.",
      "Burying SQL depth—many ATS templates weight SQL strongly for analysts.",
    ]
  ),

  "product-manager": page(
    "Core ATS keywords for product manager resumes: discovery, roadmaps, metrics, delivery, and cross-functional leadership.",
    "PM job descriptions cluster around customer insight, prioritization, metrics, and shipping. These keywords help ATS align your resume with that vocabulary while you prove outcomes.",
    [
      cluster(
        "Discovery, problem framing & research",
        "Shows you start from customer and business problems.",
        [
          "customer interviews",
          "user research",
          "jobs-to-be-done",
          "problem statements",
          "hypothesis",
          "opportunity sizing",
          "competitive analysis",
          "market research",
          "personas",
          "journey mapping",
        ],
        [
          ex("Talked to users", "Ran structured interviews and synthesis workshops that reframed onboarding as an activation problem."),
          ex("Research", "Partnered with UX research on usability tests that informed roadmap cuts saving 2 quarters of build."),
        ]
      ),
      cluster(
        "Roadmaps, prioritization & strategy",
        "Core PM ownership language.",
        [
          "product strategy",
          "roadmap",
          "RICE",
          "ICE",
          "OKRs",
          "theme-based roadmap",
          "now-next-later",
          "trade-off analysis",
          "stakeholder alignment",
          "portfolio planning",
        ],
        [
          ex("Prioritized backlog", "Re-ranked roadmap using RICE with explicit opportunity cost vs. platform debt."),
          ex("Strategy", "Defined 12-month bet on self-serve expansion tied to ARR and activation KPIs."),
        ]
      ),
      cluster(
        "Metrics, experimentation & analytics fluency",
        "Modern PMs are expected to pair with data.",
        [
          "North Star metric",
          "activation",
          "retention",
          "conversion",
          "A/B testing",
          "experiment design",
          "funnel analytics",
          "cohorts",
          "SQL",
          "Amplitude",
        ],
        [
          ex("Data-driven", "Defined success metrics for checkout redesign; monitored guardrails during staged rollout."),
          ex("Analytics", "Used funnel and cohort views to decide between two onboarding flows pre-build."),
        ]
      ),
      cluster(
        "Delivery, agile & technical partnership",
        "Proves you ship with engineering responsibly.",
        [
          "agile",
          "scrum",
          "sprints",
          "PRDs",
          "user stories",
          "acceptance criteria",
          "technical constraints",
          "APIs",
          "tech debt",
          "release management",
        ],
        [
          ex("Worked with engineers", "Co-authored PRD with non-functional requirements, latency budget, and analytics plan."),
          ex("Agile", "Ran sprint reviews with clear ship criteria and post-launch monitoring checklist."),
        ]
      ),
      cluster(
        "Go-to-market, growth & monetization",
        "Important for B2B/B2C PM roles.",
        [
          "GTM",
          "pricing",
          "packaging",
          "launch plan",
          "positioning",
          "messaging",
          "sales enablement",
          "partnerships",
          "expansion revenue",
          "retention",
        ],
        [
          ex("Launched feature", "Owned launch checklist across support docs, sales training, and in-product announcements."),
          ex("Growth", "Shipped pricing experiment that lifted net expansion 6% with neutral NPS."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Name product area, customer type, and business outcome you optimize for.",
        example: "PM for B2B SaaS billing; focused on revenue capture, churn reduction, and platform reliability.",
      },
      {
        section: "skills",
        advice: "Include tools (Jira, Figma, Amplitude) when JD lists them—ATS often literal-matches.",
      },
      {
        section: "experience",
        advice: "Outcome-first bullets: decision, metric movement, timeframe, scope (team, geography).",
        example: "Drove activation +11% by redesigning first-run checklist; coordinated eng/design across two squads.",
      },
      {
        section: "experience",
        advice: "Show trade-offs: what you cut, what you sequenced, what you learned from failed bets.",
      },
      {
        section: "summary",
        advice: "Avoid empty leadership adjectives—tie ‘cross-functional’ to artifacts you led (PRDs, reviews, launches).",
      },
    ],
    [
      "Buzzwords without artifacts: ‘vision’ with no roadmap bets or outcomes.",
      "Listing every agile term without evidence you shipped meaningful scope.",
      "Omitting metrics/experiment language when the role is growth or PLG-heavy.",
      "Generic stakeholder bullets with no decision or conflict resolution.",
    ]
  ),

  "business-analyst": page(
    "Core ATS keywords for business analyst resumes: requirements, process modeling, BI, and stakeholder facilitation.",
    "Business analyst postings emphasize structured discovery, documentation, and enabling change. These clusters mirror that language for ATS while nudging you toward concrete artifacts and savings.",
    [
      cluster(
        "Requirements, discovery & process modeling",
        "Heart of most BA roles.",
        [
          "requirements gathering",
          "elicitation",
          "user stories",
          "acceptance criteria",
          "BPMN",
          "process mapping",
          "as-is / to-be",
          "gap analysis",
          "BRD",
          "FRD",
        ],
        [
          ex("Gathered requirements", "Facilitated workshops that produced signed BRD for billing workflow with 14 acceptance criteria."),
          ex("Process improvement", "Mapped as-is process; identified handoff delays cutting invoice cycle time 22%."),
        ]
      ),
      cluster(
        "Data, reporting & BI literacy",
        "BAs increasingly bridge ops and analytics.",
        [
          "SQL",
          "Power BI",
          "Tableau",
          "Excel",
          "KPIs",
          "dashboards",
          "data validation",
          "reconciliation",
          "root cause analysis",
          "forecasting support",
        ],
        [
          ex("Made reports", "Built Power BI dashboards for pipeline health; automated weekly exec summary saving 8 hours."),
          ex("Excel", "Modeled capacity scenarios used by ops to decide hiring plan for peak season."),
        ]
      ),
      cluster(
        "Stakeholders, change & governance",
        "Shows enterprise readiness.",
        [
          "stakeholder management",
          "RACI",
          "change management",
          "training",
          "UAT",
          "sign-off",
          "compliance",
          "audit",
          "documentation",
          "knowledge transfer",
        ],
        [
          ex("Worked with teams", "Ran UAT with sales ops; captured defects with severity and owner SLAs."),
          ex("Change management", "Delivered training playbooks that cut post-launch support tickets 30%."),
        ]
      ),
      cluster(
        "Agile delivery partnership",
        "How BAs embed with squads.",
        [
          "agile",
          "scrum",
          "backlog refinement",
          "sprint planning",
          "Jira",
          "Confluence",
          "definition of ready",
          "definition of done",
          "retrospectives",
          "dependency management",
        ],
        [
          ex("Agile experience", "Refined backlog with PO; broke epics into stories sized for two-week sprints."),
          ex("Jira", "Maintained traceability from requirement → story → test case for audit readiness."),
        ]
      ),
      cluster(
        "Domain depth (finance, ops, healthcare, etc.)",
        "Match your target industry wording.",
        [
          "order-to-cash",
          "procure-to-pay",
          "revenue recognition",
          "SLAs",
          "inventory",
          "forecast accuracy",
          "risk",
          "controls",
          "vendor management",
          "customer onboarding",
        ],
        [
          ex("Domain knowledge", "Translated GAAP considerations into requirements for revenue recognition module."),
          ex("Operations", "Partnered with logistics on SLA breaches; proposed routing rules saving $400k annually."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Name domains (finance, healthcare, supply chain) and artifact types you own (BRD, process maps).",
      },
      {
        section: "skills",
        advice: "Pair tools with outcomes: ‘SQL for reconciliation’, not ‘SQL’ alone.",
      },
      {
        section: "experience",
        advice: "Quantify business impact: hours saved, dollars recovered, defects reduced, cycle time improved.",
        example: "Cut invoice disputes 22% by clarifying approval matrix and system validations in BRD.",
      },
      {
        section: "experience",
        advice: "Reference facilitation: workshops, interviews, sign-offs—this differentiates senior BAs.",
      },
      {
        section: "skills",
        advice: "Include modeling notation (BPMN) when enterprise BAs are expected.",
      },
    ],
    [
      "Task lists without artifacts or business outcomes.",
      "Vague ‘communication skills’ instead of facilitation and sign-off examples.",
      "Ignoring tooling (Jira/Confluence/Power BI) that appears in the posting.",
      "Omitting UAT/change management when the JD stresses rollout.",
    ]
  ),

  "frontend-developer": page(
    "Core ATS keywords for frontend developer resumes: JavaScript/TypeScript, performance, accessibility, and UI engineering.",
    "Frontend job descriptions emphasize the rendering stack, quality, and measurable UX. These clusters help ATS map your resume to that stack.",
    [
      cluster(
        "UI frameworks & language ecosystem",
        "Primary ATS signals for FE roles.",
        [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS",
          "Tailwind CSS",
          "Webpack",
          "Vite",
          "state management",
        ],
        [
          ex("Frontend developer", "Built Next.js features with React Server Components reducing TTFB 35% on marketing pages."),
          ex("JavaScript", "Hardened client state with typed reducers and discriminated unions to eliminate class of UI bugs."),
        ]
      ),
      cluster(
        "Performance, Core Web Vitals & networking",
        "Shows user-impact orientation.",
        [
          "Core Web Vitals",
          "LCP",
          "INP",
          "CLS",
          "lazy loading",
          "code splitting",
          "image optimization",
          "CDN",
          "caching",
          "bundle size",
        ],
        [
          ex("Fast websites", "Cut LCP from 3.2s to 1.7s via image pipeline, font strategy, and route-level code splitting."),
          ex("Performance", "Profiled React renders; memoized hot paths cutting unnecessary re-renders 60%."),
        ]
      ),
      cluster(
        "Accessibility, semantics & inclusive design",
        "Often explicit in postings.",
        [
          "WCAG",
          "ARIA",
          "keyboard navigation",
          "focus management",
          "screen readers",
          "semantic HTML",
          "color contrast",
          "accessible forms",
          "axe",
          "Lighthouse",
        ],
        [
          ex("Accessibility", "Fixed WCAG AA violations in checkout; raised automated axe score to 100 on critical flows."),
          ex("UI", "Implemented focus traps and announcements for modal workflows meeting a11y audit."),
        ]
      ),
      cluster(
        "Testing, quality & design systems",
        "Modern FE expects rigor.",
        [
          "Jest",
          "React Testing Library",
          "Playwright",
          "Cypress",
          "Storybook",
          "visual regression",
          "design system",
          "component library",
          "Chromatic",
          "CI",
        ],
        [
          ex("Testing", "Added RTL coverage for edge cases; reduced production UI regressions 45% quarter over quarter."),
          ex("Design system", "Authored tokens and primitives consumed by 4 squads; cut duplicate CSS ~30%."),
        ]
      ),
      cluster(
        "Analytics, experimentation & product partnership",
        "Ties UI work to outcomes.",
        [
          "A/B testing",
          "event tracking",
          "analytics instrumentation",
          "conversion rate",
          "activation",
          "feature flags",
          "product analytics",
          "Amplitude",
          "Segment",
          "heatmap analysis",
        ],
        [
          ex("Worked with product", "Instrumented funnels; A/B test on CTA placement lifted signup conversion 7%."),
          ex("Data", "Partnered with analytics to fix duplicate events polluting activation metrics."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Mention stack (React/Next), product type (B2B/B2C), and impact domain (perf, a11y, conversion).",
      },
      {
        section: "skills",
        advice: "Order skills to mirror posting: if TypeScript/React lead, list them before secondary tools.",
      },
      {
        section: "experience",
        advice: "Tie UI changes to metrics: CWV, conversion, support tickets, error rates.",
        example: "Reduced client error rate 40% by tightening error boundaries and fallback UX on payment step.",
      },
      {
        section: "experience",
        advice: "Mention design collaboration (Figma) when JD stresses craft.",
      },
      {
        section: "skills",
        advice: "Include accessibility keywords when company states inclusive product goals.",
      },
    ],
    [
      "Listing frameworks without performance or quality outcomes.",
      "Treating accessibility as optional when many JDs require WCAG language.",
      "Bullets that ignore business metrics—frontend wins should show user or revenue impact proxies.",
      "Omitting testing/tooling when posting emphasizes quality and design systems.",
    ]
  ),

  "backend-developer": page(
    "Core ATS keywords for backend developer resumes: APIs, data stores, reliability, cloud, and scale.",
    "Backend postings emphasize services, data, and operational excellence. These clusters align your resume language with how those roles are written.",
    [
      cluster(
        "APIs, services & architecture",
        "Core backend signals.",
        [
          "REST",
          "GraphQL",
          "microservices",
          "service mesh",
          "API design",
          "pagination",
          "idempotency",
          "backpressure",
          "event-driven architecture",
          "domain modeling",
        ],
        [
          ex("Built APIs", "Designed idempotent payment APIs with explicit error taxonomy and retry policy."),
          ex("Microservices", "Split monolith domain into services; reduced deploy blast radius and sped up releases."),
        ]
      ),
      cluster(
        "Databases, caching & consistency",
        "Expected depth for most backend roles.",
        [
          "PostgreSQL",
          "MySQL",
          "Redis",
          "indexing",
          "query optimization",
          "transactions",
          "locking",
          "replication",
          "sharding",
          "migrations",
        ],
        [
          ex("Database skills", "Cut p95 query time 40% by redesigning indexes and eliminating N+1 patterns."),
          ex("SQL", "Authored safe migrations with zero-downtime expand/contract pattern."),
        ]
      ),
      cluster(
        "Messaging, streaming & integration",
        "Shows async thinking.",
        [
          "Kafka",
          "RabbitMQ",
          "SQS",
          "pub/sub",
          "event sourcing",
          "CDC",
          "webhooks",
          "batch jobs",
          "stream processing",
          "dead letter queues",
        ],
        [
          ex("Kafka experience", "Implemented consumer with at-least-once semantics and dedupe keys for finance events."),
          ex("Integration", "Replaced brittle polling with webhook + retry strategy cutting sync latency 10x."),
        ]
      ),
      cluster(
        "Cloud, infra & reliability",
        "Operational credibility.",
        [
          "AWS",
          "Docker",
          "Kubernetes",
          "ECS",
          "Terraform",
          "CI/CD",
          "observability",
          "SLOs",
          "on-call",
          "incident response",
        ],
        [
          ex("AWS", "Deployed services to ECS with autoscaling policies tied to CPU and queue depth."),
          ex("Reliability", "Reduced Sev-1 incidents 50% via SLOs, error budgets, and postmortems with action items."),
        ]
      ),
      cluster(
        "Security, compliance & performance",
        "Differentiates senior engineers.",
        [
          "authentication",
          "authorization",
          "OAuth",
          "JWT",
          "rate limiting",
          "secrets management",
          "encryption",
          "PII",
          "GDPR",
          "penetration testing",
        ],
        [
          ex("Security", "Implemented OAuth scopes least-privilege for partner API; passed security review first pass."),
          ex("Performance", "Load tested peak traffic; fixed hot locks improving throughput 3x."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Highlight domains (fintech, ads, logistics) and scale (RPS, records, $).",
        example: "Backend engineer building payment and ledger services at high throughput with strong correctness guarantees.",
      },
      {
        section: "skills",
        advice: "Surface datastore + cloud pairing the job stresses (e.g., Postgres + AWS).",
      },
      {
        section: "experience",
        advice: "Bullets: problem → system change → metric (latency, cost, incidents, throughput).",
        example: "Lowered monthly infra cost 18% by rightsizing instances and tuning autoscaling after load profiling.",
      },
      {
        section: "experience",
        advice: "Mention correctness/consistency when JD mentions money or compliance.",
      },
      {
        section: "skills",
        advice: "Include observability stack keywords (Prometheus, Grafana, OpenTelemetry) when SRE-ish language appears.",
      },
    ],
    [
      "Generic ‘backend development’ without APIs, data, or reliability specifics.",
      "Ignoring messaging/streaming keywords when JD lists Kafka or event-driven systems.",
      "Missing cloud/IaC terms for roles clearly on AWS/GCP/Azure.",
      "No incident/SLO language for high-reliability postings.",
    ]
  ),

  "machine-learning-engineer": page(
    "Core ATS keywords for ML engineer resumes: training, deployment, monitoring, data pipelines, and scale.",
    "MLE roles blend modeling with production engineering. These clusters reflect that hybrid bar for ATS matching.",
    [
      cluster(
        "Modeling, training & evaluation",
        "Research-adjacent depth.",
        [
          "deep learning",
          "PyTorch",
          "TensorFlow",
          "transformers",
          "gradient boosting",
          "hyperparameter search",
          "cross-validation",
          "offline metrics",
          "online metrics",
          "bias evaluation",
        ],
        [
          ex("ML models", "Trained transformer-based rankers with offline NDCG gains validated in shadow traffic."),
          ex("Evaluation", "Built evaluation harness comparing calibration and fairness slices across regions."),
        ]
      ),
      cluster(
        "Feature pipelines, data & training infra",
        "Production ML differentiator.",
        [
          "feature store",
          "data pipelines",
          "Airflow",
          "Spark",
          "batch scoring",
          "streaming features",
          "data validation",
          "training datasets",
          "labeling",
          "sampling",
        ],
        [
          ex("Features", "Reduced training-serving skew by moving features to managed feature store with shared transforms."),
          ex("Pipelines", "Cut feature freshness from weekly to hourly enabling timely retraining triggers."),
        ]
      ),
      cluster(
        "Deployment, serving & reliability",
        "What separates MLE from notebook work.",
        [
          "model serving",
          "TorchServe",
          "TensorRT",
          "gRPC",
          "REST",
          "autoscaling",
          "GPU",
          "Kubernetes",
          "Docker",
          "canary releases",
        ],
        [
          ex("Deployed model", "Served models on GPU-backed K8s with autoscaling from RPS and queue depth."),
          ex("Latency", "Achieved p99 inference under 50ms via batching and quantization trade-offs."),
        ]
      ),
      cluster(
        "Monitoring, drift & responsible ML",
        "Expected at mature teams.",
        [
          "model monitoring",
          "drift detection",
          "data drift",
          "concept drift",
          "retraining",
          "MLflow",
          "experiment tracking",
          "explainability",
          "fairness",
          "model cards",
        ],
        [
          ex("Monitoring", "Set alerts on prediction distribution shifts tied to retraining playbooks."),
          ex("Explainability", "Shipped SHAP-based explanations for risk models for compliance review."),
        ]
      ),
      cluster(
        "Collaboration with product, data science & platform",
        "MLE is cross-functional.",
        [
          "product sense",
          "stakeholder reviews",
          "SLAs",
          "error analysis",
          "A/B testing",
          "guardrail metrics",
          "cost-performance tradeoffs",
          "on-call",
          "documentation",
          "mentorship",
        ],
        [
          ex("Cross-functional", "Partnered with DS on experiment design for model changes with safe ramp strategy."),
          ex("Cost", "Reduced inference cost 25% via distillation while holding offline quality within tolerance."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "State modeling specialty + deployment environment (ads, recommendations, risk, NLP).",
        example: "MLE focused on ranking and retrieval at scale with strong evaluation and serving discipline.",
      },
      {
        section: "skills",
        advice: "Separate modeling stack from serving stack clearly.",
      },
      {
        section: "experience",
        advice: "Each bullet: model/pipeline change → metric (latency, precision, cost) → business outcome.",
        example: "Cut false positives 12% via threshold tuning and calibration while holding latency SLO.",
      },
      {
        section: "experience",
        advice: "Mention GPU/throughput when JD stresses scale.",
      },
      {
        section: "skills",
        advice: "Include monitoring/drift terms when role owns model health.",
      },
    ],
    [
      "Notebook metrics without online impact or serving constraints.",
      "Omitting feature-store/pipeline language for production ML roles.",
      "No monitoring/drift vocabulary when job stresses reliability.",
      "Treating MLE as pure research—missing deployment and ops keywords.",
    ]
  ),

  "devops-engineer": page(
    "Core ATS keywords for DevOps/SRE resumes: CI/CD, Kubernetes, IaC, observability, and incident culture.",
    "These clusters map to how platform and reliability roles are described in ATS-heavy job posts.",
    [
      cluster(
        "CI/CD, GitOps & release engineering",
        "Foundational delivery automation.",
        [
          "GitHub Actions",
          "GitLab CI",
          "Jenkins",
          "Argo CD",
          "Flux",
          "blue-green deployments",
          "canary releases",
          "feature flags",
          "artifact repositories",
          "supply chain security",
        ],
        [
          ex("CI/CD", "Reduced lead time for changes from 3 days to 4 hours via trunk-based flow and automated gates."),
          ex("Deployments", "Implemented canary pipeline with automated rollback on error budget burn."),
        ]
      ),
      cluster(
        "Kubernetes, containers & runtime",
        "Standard for many DevOps JDs.",
        [
          "Kubernetes",
          "Helm",
          "Kustomize",
          "Docker",
          "containers",
          "pod autoscaling",
          "resource quotas",
          "network policies",
          "service mesh",
          "ingress",
        ],
        [
          ex("Kubernetes", "Hardened cluster with network policies, pod security standards, and centralized ingress."),
          ex("Containers", "Cut image size 40% improving pull times and cold start on batch jobs."),
        ]
      ),
      cluster(
        "Infrastructure as code & cloud",
        "Provisioning discipline.",
        [
          "Terraform",
          "CloudFormation",
          "AWS",
          "GCP",
          "Azure",
          "VPC",
          "IAM",
          "modules",
          "state management",
          "policy as code",
        ],
        [
          ex("Terraform", "Authored reusable modules; reduced provisioning time from days to minutes."),
          ex("Cloud", "Designed multi-AZ Postgres with automated backups and tested restore drills."),
        ]
      ),
      cluster(
        "Observability, SRE & incidents",
        "Reliability vocabulary.",
        [
          "Prometheus",
          "Grafana",
          "OpenTelemetry",
          "logging",
          "tracing",
          "SLOs",
          "error budgets",
          "on-call",
          "postmortems",
          "runbooks",
        ],
        [
          ex("Monitoring", "Cut MTTR 35% with unified traces and SLO-based alerts tied to customer journeys."),
          ex("Incidents", "Drove blameless postmortems with tracked corrective actions and reduced repeats."),
        ]
      ),
      cluster(
        "Security, compliance & cost",
        "Platform maturity.",
        [
          "secrets management",
          "Vault",
          "OIDC",
          "SBOM",
          "image scanning",
          "CIS benchmarks",
          "FinOps",
          "rightsizing",
          "reserved instances",
          "cost allocation",
        ],
        [
          ex("Security", "Enforced OIDC-based cloud auth for CI; eliminated long-lived cloud keys."),
          ex("Cost", "Saved $200k annually via rightsizing and scheduling non-prod environments."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Position as platform/SRE/infra with focus (K8s, CI, observability, security).",
      },
      {
        section: "skills",
        advice: "Mirror toolchain in JD exactly (Terraform vs CloudFormation).",
      },
      {
        section: "experience",
        advice: "Quantify reliability: MTTR, incident rate, deployment frequency, change failure rate.",
        example: "Improved deployment frequency from weekly to daily while holding change failure rate under 5%.",
      },
      {
        section: "experience",
        advice: "Tie work to dev productivity: faster builds, faster tests, safer deploys.",
      },
      {
        section: "skills",
        advice: "Include SLO/incident language when role is SRE-titled.",
      },
    ],
    [
      "Generic ‘DevOps’ without CI/CD, cloud, or observability specifics.",
      "Missing Kubernetes when it is required in posting.",
      "No incident/SLO metrics for reliability-focused roles.",
      "Ignoring security/supply-chain keywords for enterprise platform teams.",
    ]
  ),

  "full-stack-developer": page(
    "Core ATS keywords for full-stack developer resumes: end-to-end delivery, APIs, UI, data, and quality.",
    "Full-stack JDs want breadth with evidence. These clusters span client, server, and integration concerns.",
    [
      cluster(
        "Frontend stack & UX craft",
        "Shows product-facing strength.",
        [
          "React",
          "Next.js",
          "TypeScript",
          "CSS",
          "responsive design",
          "accessibility",
          "performance",
          "state management",
          "forms",
          "client-side validation",
        ],
        [
          ex("Full-stack", "Shipped responsive Next.js flows with accessible components and measurable conversion lift."),
          ex("UI", "Reduced client errors 30% with better empty states and optimistic UI patterns."),
        ]
      ),
      cluster(
        "Backend APIs, data & auth",
        "Server-side credibility.",
        [
          "Node.js",
          "REST",
          "GraphQL",
          "PostgreSQL",
          "Prisma",
          "migrations",
          "authentication",
          "authorization",
          "sessions",
          "JWT",
        ],
        [
          ex("API development", "Built REST APIs with pagination, filtering, and consistent error payloads."),
          ex("Database", "Designed schemas supporting multi-tenant isolation with row-level checks."),
        ]
      ),
      cluster(
        "Integration, async work & cloud",
        "How full-stack spans systems.",
        [
          "webhooks",
          "background jobs",
          "queues",
          "S3",
          "AWS Lambda",
          "API gateways",
          "third-party APIs",
          "Stripe",
          "OAuth",
          "rate limits",
        ],
        [
          ex("Integrations", "Integrated Stripe billing webhooks with idempotent handlers and replay tooling."),
          ex("Async", "Moved long tasks to workers improving API p99 and user-perceived latency."),
        ]
      ),
      cluster(
        "Testing, CI/CD & quality",
        "Breadth must still be disciplined.",
        [
          "Jest",
          "Playwright",
          "Cypress",
          "integration tests",
          "CI/CD",
          "GitHub Actions",
          "linting",
          "type safety",
          "code review",
          "trunk-based development",
        ],
        [
          ex("Testing", "Added Playwright smoke suite blocking deploys on critical ecommerce flows."),
          ex("CI", "Parallelized test jobs cutting CI time 45% enabling faster feedback."),
        ]
      ),
      cluster(
        "Analytics, ownership & product collaboration",
        "Ties features to outcomes.",
        [
          "product analytics",
          "event tracking",
          "A/B testing",
          "feature flags",
          "KPIs",
          "activation",
          "conversion",
          "stakeholders",
          "roadmap input",
          "mentorship",
        ],
        [
          ex("Ownership", "Owned checkout initiative end-to-end: UX, API, payments, and experiment readouts."),
          ex("Analytics", "Instrumented events enabling funnel analysis that guided iteration priorities."),
        ]
      ),
    ],
    [
      {
        section: "summary",
        advice: "Clarify stack and domain (B2B SaaS, ecommerce) and what ‘full-stack’ means for you (web app depth).",
      },
      {
        section: "skills",
        advice: "Split into Frontend / Backend / Data to avoid a flat grab-bag.",
      },
      {
        section: "experience",
        advice: "Prefer bullets that cross layers: UI change + API + metric.",
        example: "Shipped saved-cart feature: API + React state + analytics; lifted checkout completion 6%.",
      },
      {
        section: "experience",
        advice: "Show trade-offs: performance vs. speed to market, caching vs. consistency.",
      },
      {
        section: "skills",
        advice: "Include integration keywords (Stripe, OAuth) when JD lists them.",
      },
    ],
    [
      "‘Full stack’ with only frontend or only backend evidence.",
      "Long ungrouped skill lists that read as keyword stuffing.",
      "No cross-layer outcomes—features need business or UX metrics.",
      "Omitting testing/CI when posting emphasizes quality.",
    ]
  ),
};
