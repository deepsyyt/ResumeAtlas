import type { RoleSlug } from "@/app/lib/seoPages";
import type { KeywordIntentContent } from "../types";
import { cluster, ex, page } from "../helpers";

/** Technical skill keywords & how to phrase them on a resume */
export const TECHNICAL_SKILLS_BY_ROLE: Record<RoleSlug, KeywordIntentContent> = {
  "data-scientist": page(
    "Technical skills keywords for data scientist resumes: modeling, Python/SQL depth, and ML engineering adjacent tooling.",
    "This guide groups technical skills the way strong job descriptions do: core modeling, data manipulation, experimentation, and production touchpoints. Mirror the posting’s taxonomy and prove depth with how you applied each skill—not a flat keyword list.",
    [
      cluster(
        "Modeling & statistics",
        "Classical and modern ML techniques recruiters expect to see spelled out.",
        [
          "classification",
          "regression",
          "gradient boosting",
          "logistic regression",
          "regularization",
          "cross-validation",
          "hyperparameter tuning",
          "probability calibration",
          "time series",
          "survival analysis",
        ],
        [
          ex("Machine learning algorithms", "Classification and regression with gradient-boosted trees; tuned with stratified CV and calibrated probabilities."),
          ex("Statistics", "Built uplift models with proper control groups and variance-aware readouts for leadership."),
        ]
      ),
      cluster(
        "Python data stack",
        "Libraries ATS often literal-matches.",
        [
          "pandas",
          "NumPy",
          "scikit-learn",
          "SciPy",
          "statsmodels",
          "PySpark",
          "Jupyter",
          "virtual environments",
          "packaging",
          "profiling",
        ],
        [
          ex("Python", "pandas/NumPy for feature work; vectorized transforms cutting batch runtime 6x."),
          ex("Notebooks", "Moved critical training code from notebooks into versioned packages with tests."),
        ]
      ),
      cluster(
        "Deep learning & NLP (when relevant)",
        "Use only if credible for your roles.",
        [
          "PyTorch",
          "TensorFlow",
          "transformers",
          "fine-tuning",
          "embeddings",
          "PyTorch Lightning",
          "CUDA",
          "mixed precision",
          "ONNX",
          "model distillation",
        ],
        [
          ex("Deep learning experience", "Fine-tuned transformer rankers; evaluated offline/online with guardrail metrics."),
          ex("NLP", "Built embedding-based retrieval improving candidate coverage vs. lexical baseline."),
        ]
      ),
      cluster(
        "SQL, warehouses & experimentation tooling",
        "Analyst/DS hybrid expectations.",
        [
          "SQL",
          "Snowflake",
          "BigQuery",
          "Redshift",
          "dbt",
          "Looker",
          "Mode",
          "Amplitude",
          "Statsig",
          "Eppo",
        ],
        [
          ex("SQL skills", "Complex SQL for cohort metrics feeding experiment dashboards."),
          ex("Warehouse", "dbt models for trusted experiment metrics with documented grain."),
        ]
      ),
      cluster(
        "MLOps & production interfaces",
        "Signals you can partner with engineering.",
        [
          "Docker",
          "FastAPI",
          "MLflow",
          "Airflow",
          "batch inference",
          "online inference",
          "monitoring",
          "Kubernetes basics",
          "CI for models",
          "artifact storage",
        ],
        [
          ex("Deployed models", "Packaged scoring service in Docker with health checks and structured logs."),
          ex("Pipelines", "Airflow DAGs for daily retrain with data quality gates."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Group skills by Modeling / Engineering / Experimentation to mirror JD sections." },
      { section: "skills", advice: "Put the highest-signal libraries first; avoid alphabetical soup." },
      { section: "experience", advice: "Repeat 3–5 must-have skills inside bullets with context (dataset, constraint, outcome)." },
      { section: "summary", advice: "Name stack + domain (e.g., experimentation + personalization) in one line." },
      { section: "experience", advice: "If you used PyTorch lightly, say ‘fine-tuned’ vs. ‘research-level architecture design’ honestly." },
    ],
    [
      "Listing every sklearn model name without evidence you tuned or shipped with them.",
      "Claiming deep learning depth with only coursework-level projects.",
      "Burying SQL—many DS roles still filter heavily on SQL proficiency.",
      "Putting tools you only interacted with in a demo once.",
    ]
  ),

  "software-engineer": page(
    "Technical skills keywords for software engineer resumes: languages, frameworks, testing, and platform tooling.",
    "Use this page to align your skills section with how engineering managers write reqs: explicit languages, runtime, data, and quality practices. Pair each skill with proof in your experience bullets.",
    [
      cluster(
        "Languages & runtime",
        "Primary stack signals.",
        [
          "TypeScript",
          "JavaScript",
          "Python",
          "Go",
          "Java",
          "Kotlin",
          "C#",
          "Rust",
          "memory management",
          "concurrency",
        ],
        [
          ex("Programming languages", "TypeScript for services and shared types across API clients; reduced integration bugs."),
          ex("Go", "Go services for high-concurrency workers with structured concurrency patterns."),
        ]
      ),
      cluster(
        "Frameworks & API styles",
        "Match front/back focus.",
        [
          "React",
          "Next.js",
          "Node.js",
          "Express",
          "Spring Boot",
          "Django",
          "FastAPI",
          "GraphQL",
          "OpenAPI",
          "protobuf",
        ],
        [
          ex("Framework experience", "Next.js App Router with server components for SEO-critical pages."),
          ex("APIs", "GraphQL federation for domain boundaries with resolver-level caching."),
        ]
      ),
      cluster(
        "Datastores & caching",
        "Expected for most SWE roles.",
        [
          "PostgreSQL",
          "MySQL",
          "Redis",
          "DynamoDB",
          "Elasticsearch",
          "index design",
          "transactions",
          "migrations",
          "ORM",
          "query optimization",
        ],
        [
          ex("Databases", "PostgreSQL with partial indexes and covering indexes for hot reporting queries."),
          ex("Caching", "Redis for idempotency keys and session offload reducing DB load."),
        ]
      ),
      cluster(
        "Testing & quality practices",
        "Depth marker for seniority.",
        [
          "unit tests",
          "integration tests",
          "contract tests",
          "TDD",
          "test coverage",
          "mocking",
          "testcontainers",
          "load testing",
          "chaos engineering",
          "static analysis",
        ],
        [
          ex("Testing", "Integration tests around payment edge cases preventing recurring production bugs."),
          ex("Quality", "Static analysis in CI blocking merges on new critical issues."),
        ]
      ),
      cluster(
        "Cloud, CI/CD & observability",
        "Operational skills.",
        [
          "AWS",
          "GCP",
          "Azure",
          "Docker",
          "Kubernetes",
          "Terraform",
          "GitHub Actions",
          "CI/CD",
          "Prometheus",
          "OpenTelemetry",
        ],
        [
          ex("AWS", "ECS services with autoscaling tied to custom metrics."),
          ex("Observability", "OpenTelemetry traces linking API to downstream DB calls for latency debugging."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Order by relevance to target role; repeat top skills in experience for ATS reinforcement." },
      { section: "experience", advice: "Attach metrics to skill usage: latency, uptime, cost, defect rate." },
      { section: "skills", advice: "Separate ‘proficient’ vs ‘exposure’ if needed—but be honest." },
      { section: "summary", advice: "One line on specialty: backend APIs, frontend perf, infra, etc." },
      { section: "experience", advice: "Mention scale: RPS, QPS, GB/day, team size—skills without scope look generic." },
    ],
    [
      "Listing 40 skills—signals breadth without depth.",
      "Framework names without production experience.",
      "Omitting testing/CI when job stresses quality.",
      "Ignoring cloud when posting is cloud-native.",
    ]
  ),

  "data-analyst": page(
    "Technical skills keywords for data analyst resumes: SQL depth, BI, stats, and warehouse tooling.",
    "Analyst resumes should read like a toolkit tied to business questions. Group skills the way finance/product orgs think: definitions, reporting, diagnostics, and experimentation support.",
    [
      cluster(
        "SQL & analytics engineering",
        "Core analyst technical bar.",
        [
          "SQL",
          "CTEs",
          "window functions",
          "joins",
          "subqueries",
          "query optimization",
          "dbt",
          "data tests",
          "documentation",
          "version control",
        ],
        [
          ex("Strong SQL", "CTEs for multi-step funnel reconstruction with readable, audited logic."),
          ex("dbt", "dbt models with tests catching grain mismatches before leadership reviews."),
        ]
      ),
      cluster(
        "BI & visualization",
        "How insights are consumed.",
        [
          "Tableau",
          "Looker",
          "Power BI",
          "LookML",
          "DAX",
          "data modeling",
          "semantic layer",
          "dashboard design",
          "storytelling",
          "self-serve",
        ],
        [
          ex("Tableau", "Executive dashboards with certified fields and governance-approved definitions."),
          ex("BI", "Reduced chart junk; focused KPIs aligned to OKRs."),
        ]
      ),
      cluster(
        "Statistics & experimentation support",
        "Differentiates strong analysts.",
        [
          "significance testing",
          "confidence intervals",
          "sample size",
          "A/B testing support",
          "power analysis",
          "bias checks",
          "forecasting",
          "seasonality",
          "segmentation",
          "propensity",
        ],
        [
          ex("Statistics", "Built CIs for campaign lift estimates used in budget decisions."),
          ex("Experiments", "Partnered on experiment spec—metrics, segments, and guardrails."),
        ]
      ),
      cluster(
        "Warehouse & pipeline awareness",
        "Modern analyst expectations.",
        [
          "Snowflake",
          "BigQuery",
          "Redshift",
          "ETL",
          "Airflow",
          "Fivetran",
          "data quality",
          "DQ tests",
          "lineage",
          "scheduling",
        ],
        [
          ex("Snowflake", "Debugged join explosions affecting KPI; fixed upstream grain issue."),
          ex("Pipelines", "Collaborated with eng on event schema for cleaner funnel metrics."),
        ]
      ),
      cluster(
        "Productivity & collaboration tools",
        "Often in JDs.",
        [
          "Excel",
          "Google Sheets",
          "Notion",
          "Confluence",
          "Jira",
          "Git",
          "Python",
          "pandas",
          "APIs",
          "CSV tooling",
        ],
        [
          ex("Excel / Sheets", "Financial models for scenario planning used by FP&A."),
          ex("Python", "pandas for ad hoc analyses too heavy for SQL-only workflows."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Lead with SQL + primary BI tool from the posting." },
      { section: "experience", advice: "Tie skills to decisions: ‘SQL + Looker → leadership reallocated budget’." },
      { section: "skills", advice: "Include experimentation stats terms when role owns test readouts." },
      { section: "summary", advice: "Mention domains: marketing, finance, product—skills gain meaning with domain." },
      { section: "experience", advice: "Reference semantic layers/metric ownership when you governed definitions." },
    ],
    [
      "Calling yourself ‘advanced SQL’ with only simple selects.",
      "BI tool listed without dashboard ownership examples.",
      "No stats/experiment language for growth analyst roles.",
      "Tool dump without business outcomes.",
    ]
  ),

  "product-manager": page(
    "Technical skills keywords for product manager resumes: analytics, delivery tools, and design collaboration.",
    "PM technical skills are about decision-grade fluency: metrics tools, light SQL, and working software artifacts. This page lists how to phrase that credibly.",
    [
      cluster(
        "Product analytics & instrumentation",
        "How PMs partner with data.",
        [
          "Amplitude",
          "Mixpanel",
          "Heap",
          "Google Analytics",
          "event taxonomy",
          "funnel analysis",
          "cohorts",
          "retention curves",
          "feature adoption",
          "SQL",
        ],
        [
          ex("Analytics tools", "Defined event schema for onboarding funnel; used Amplitude for weekly adoption reviews."),
          ex("SQL", "Wrote SQL to validate dashboard discrepancies before roadmap decisions."),
        ]
      ),
      cluster(
        "Experimentation platforms",
        "Growth/product-heavy PM roles.",
        [
          "A/B testing",
          "Optimizely",
          "Statsig",
          "LaunchDarkly",
          "experiment review",
          "guardrail metrics",
          "sample ratio mismatch",
          "sequential testing",
          "experiment design",
          "readouts",
        ],
        [
          ex("A/B testing", "Owned experiment spec: metrics, segments, and launch criteria with data science."),
          ex("Feature flags", "Staged rollouts with kill switches based on error and latency guardrails."),
        ]
      ),
      cluster(
        "Delivery & collaboration tooling",
        "Operational PM skills.",
        [
          "Jira",
          "Linear",
          "Asana",
          "Confluence",
          "Notion",
          "Figma",
          "Miro",
          "roadmap tools",
          "OKR tools",
          "Gantt",
        ],
        [
          ex("Jira", "Maintained epics with clear acceptance criteria tied to analytics events."),
          ex("Figma", "Partnered in Figma reviews to scope MVP that met latency budget."),
        ]
      ),
      cluster(
        "Customer insight & research tooling",
        "Discovery-heavy PMs.",
        [
          "user interviews",
          "Usertesting.com",
          "Dovetail",
          "survey tools",
          "NPS programs",
          "support ticket mining",
          "Salesforce",
          "Gong",
          "competitive intel",
          "pricing research",
        ],
        [
          ex("Research tools", "Synthesized 20+ interviews in Dovetail into prioritized problem themes."),
          ex("Sales insights", "Used Gong snippets to align roadmap with enterprise objections."),
        ]
      ),
      cluster(
        "Technical fluency (lightweight but real)",
        "Credibility without pretending to be an engineer.",
        [
          "REST APIs",
          "webhooks",
          "authentication basics",
          "latency budgets",
          "SLAs",
          "tech debt tradeoffs",
          "analytics SDKs",
          "CSV exports",
          "data pipelines awareness",
          "security review familiarity",
        ],
        [
          ex("Technical skills", "Partnered with eng on webhook retries and idempotency for partner integrations."),
          ex("APIs", "Negotiated pagination and rate limits with platform team for reliable sync."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Highlight analytics + delivery stack from the JD; PM resumes shouldn’t look like engineering resumes." },
      { section: "experience", advice: "Show how tools informed decisions: pivots, cuts, launches." },
      { section: "summary", advice: "If SQL/light technical: say ‘SQL for funnel validation’ not ‘SQL expert’." },
      { section: "skills", advice: "Include experimentation tools when PLG/growth PM." },
      { section: "experience", advice: "Connect Figma/Jira artifacts to shipped outcomes, not activity." },
    ],
    [
      "Claiming deep technical skills without examples of trade-off conversations.",
      "Listing every tool you’ve clicked once.",
      "No analytics/experiment tooling for data-driven PM roles.",
      "Ignoring research synthesis tools when discovery is central.",
    ]
  ),

  "business-analyst": page(
    "Technical skills keywords for business analyst resumes: requirements tooling, BI, SQL, and process modeling.",
    "Business analysts should show tool-assisted rigor: where requirements live, how data is validated, and how models are communicated.",
    [
      cluster(
        "Requirements & documentation systems",
        "Enterprise BA bread and butter.",
        [
          "Jira",
          "Azure DevOps",
          "Confluence",
          "SharePoint",
          "Visio",
          "Lucidchart",
          "BPMN",
          "user stories",
          "traceability matrices",
          "RACI",
        ],
        [
          ex("Jira", "Maintained traceability from BRD requirement → story → UAT test."),
          ex("BPMN", "Published process maps consumed by ops and IT for automation scoping."),
        ]
      ),
      cluster(
        "BI, SQL & spreadsheets",
        "Quantitative BAs.",
        [
          "SQL",
          "Power BI",
          "Tableau",
          "Excel",
          "Power Query",
          "pivot models",
          "KPI definitions",
          "reconciliation",
          "variance analysis",
          "forecast support",
        ],
        [
          ex("Power BI", "Built drill-through dashboards for pipeline health with certified metrics."),
          ex("SQL", "Validated reporting logic against source systems for finance sign-off."),
        ]
      ),
      cluster(
        "Process mining & automation awareness",
        "Modern BA skillset.",
        [
          "process mining",
          "RPA",
          "UiPath",
          "Power Automate",
          "ServiceNow",
          "workflow automation",
          "APIs",
          "integration patterns",
          "error handling",
          "monitoring",
        ],
        [
          ex("Automation", "Scoped RPA candidate processes with ROI and exception handling."),
          ex("Integrations", "Documented API contracts between CRM and billing for migration."),
        ]
      ),
      cluster(
        "Agile & QA collaboration",
        "Delivery alignment.",
        [
          "scrum",
          "sprint planning",
          "backlog refinement",
          "UAT",
          "test cases",
          "defect triage",
          "acceptance criteria",
          "definition of done",
          "retrospectives",
          "release coordination",
        ],
        [
          ex("UAT", "Ran structured UAT scripts; triaged defects by severity and business impact."),
          ex("Agile", "Participated in backlog refinement with clear ‘ready’ criteria."),
        ]
      ),
      cluster(
        "Domain systems",
        "Match industry.",
        [
          "Salesforce",
          "SAP",
          "NetSuite",
          "Workday",
          "ERP",
          "CRM",
          "billing systems",
          "inventory systems",
          "ticketing",
          "ITSM",
        ],
        [
          ex("Salesforce", "Mapped lead-to-cash fields for reporting alignment across sales and finance."),
          ex("ERP", "Documented procure-to-pay touchpoints for integration cutover."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Lead with requirements stack + BI/SQL depth implied by posting." },
      { section: "experience", advice: "Pair tools with artifacts: BRD, process map, dashboard, UAT plan." },
      { section: "skills", advice: "Include BPMN/Visio when process-heavy." },
      { section: "summary", advice: "Name industry (finance, healthcare) + tooling families." },
      { section: "experience", advice: "Quantify outcomes: hours saved, dollars, defects reduced." },
    ],
    [
      "Tool list without artifacts or stakeholders.",
      "Weak SQL/BI claims for analyst-leaning BA roles.",
      "Missing UAT/test language when rollout-heavy.",
      "Generic agile terms without squad outcomes.",
    ]
  ),

  "frontend-developer": page(
    "Technical skills keywords for frontend developer resumes: UI frameworks, performance, testing, and design tooling.",
    "Frontend technical skills should show craft: rendering stack, quality, accessibility, and how you instrument UX.",
    [
      cluster(
        "UI libraries & TypeScript depth",
        "Primary FE stack.",
        [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Vue",
          "Svelte",
          "state management",
          "hooks",
          "server components",
          "strict typing",
        ],
        [
          ex("React/TypeScript", "Strict TS across components; discriminated unions for safer UI state."),
          ex("Next.js", "Hybrid rendering strategy for SEO + performance on content-heavy routes."),
        ]
      ),
      cluster(
        "Styling, design systems & components",
        "How UI scales.",
        [
          "CSS",
          "Tailwind CSS",
          "CSS Modules",
          "styled-components",
          "Storybook",
          "design tokens",
          "responsive design",
          "theming",
          "dark mode",
          "i18n",
        ],
        [
          ex("Design system", "Built accessible primitives in Storybook with visual regression coverage."),
          ex("CSS", "Reduced layout shift with consistent spacing tokens and skeleton loaders."),
        ]
      ),
      cluster(
        "Performance & networking",
        "Core Web Vitals language.",
        [
          "Core Web Vitals",
          "LCP",
          "INP",
          "CLS",
          "lazy loading",
          "code splitting",
          "service workers",
          "HTTP caching",
          "image optimization",
          "font loading",
        ],
        [
          ex("Performance", "Improved INP by deferring non-critical work off main thread."),
          ex("Caching", "Tuned HTTP caching for static assets with hashed filenames."),
        ]
      ),
      cluster(
        "Accessibility & testing",
        "Quality bar.",
        [
          "WCAG",
          "ARIA",
          "axe",
          "Lighthouse",
          "Jest",
          "React Testing Library",
          "Playwright",
          "Cypress",
          "visual regression",
          "snapshot testing",
        ],
        [
          ex("Accessibility", "Keyboard-first flows with focus management verified by automated axe checks."),
          ex("Testing", "Playwright smoke suite for checkout happy path and failure modes."),
        ]
      ),
      cluster(
        "Analytics & feature delivery",
        "Connect UI to product.",
        [
          "Segment",
          "Amplitude",
          "Google Tag Manager",
          "event naming",
          "feature flags",
          "A/B testing hooks",
          "error tracking",
          "Sentry",
          "OpenTelemetry",
          "real user monitoring",
        ],
        [
          ex("Instrumentation", "Standardized event names reducing broken funnel dashboards."),
          ex("Flags", "Wrapped risky UI behind flags with staged audience ramp."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Order: framework → language → quality → performance tools." },
      { section: "experience", advice: "Prove skills with metrics: CWV, conversion, error rate, bundle size." },
      { section: "skills", advice: "Include accessibility explicitly when JD does." },
      { section: "summary", advice: "Position: product engineering vs marketing site vs design systems." },
      { section: "experience", advice: "Mention design handoff (Figma) when collaboration matters." },
    ],
    [
      "Huge list of libraries without production usage.",
      "Missing accessibility for inclusive product companies.",
      "No performance vocabulary for consumer apps.",
      "Ignoring testing when quality is emphasized.",
    ]
  ),

  "backend-developer": page(
    "Technical skills keywords for backend developer resumes: APIs, databases, messaging, cloud, and reliability.",
    "Backend skill keywords should reflect systems thinking: interfaces, data, async work, and how you observe production.",
    [
      cluster(
        "APIs & service design",
        "Core backend.",
        [
          "REST",
          "GraphQL",
          "gRPC",
          "protobuf",
          "OpenAPI",
          "API versioning",
          "pagination",
          "idempotency",
          "rate limiting",
          "error codes",
        ],
        [
          ex("REST APIs", "Versioned REST with consistent error envelope and retry guidance."),
          ex("GraphQL", "Resolver-level dataloaders to prevent N+1 database access."),
        ]
      ),
      cluster(
        "Databases & performance",
        "Depth marker.",
        [
          "PostgreSQL",
          "MySQL",
          "Redis",
          "indexing",
          "transactions",
          "locking",
          "query plans",
          "connection pooling",
          "read replicas",
          "sharding",
        ],
        [
          ex("PostgreSQL", "Rewrote hot queries; added partial indexes cutting p95 40%."),
          ex("Redis", "Used Redis for locks and dedupe keys with TTL discipline."),
        ]
      ),
      cluster(
        "Messaging & async systems",
        "Common at scale.",
        [
          "Kafka",
          "RabbitMQ",
          "SQS",
          "pub/sub",
          "consumer groups",
          "exactly-once",
          "at-least-once",
          "outbox pattern",
          "sagas",
          "dead letter queues",
        ],
        [
          ex("Kafka", "Consumers with idempotent writes and partition-aware scaling."),
          ex("Queues", "SQS workers with backoff and poison message handling."),
        ]
      ),
      cluster(
        "Cloud & containers",
        "Operational skills.",
        [
          "AWS",
          "GCP",
          "Azure",
          "Docker",
          "Kubernetes",
          "ECS",
          "Lambda",
          "Terraform",
          "IAM",
          "VPC networking",
        ],
        [
          ex("AWS", "ECS services with autoscaling on CPU and custom CloudWatch metrics."),
          ex("Terraform", "Modules for repeatable environment parity across staging/prod."),
        ]
      ),
      cluster(
        "Observability & reliability engineering",
        "Senior signals.",
        [
          "Prometheus",
          "Grafana",
          "OpenTelemetry",
          "structured logging",
          "distributed tracing",
          "SLOs",
          "load testing",
          "chaos testing",
          "on-call",
          "postmortems",
        ],
        [
          ex("Observability", "Traces linking API handler to DB spans for latency investigations."),
          ex("SLOs", "Error budget policies influencing release cadence and refactors."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Group by APIs / Data / Async / Cloud / Observability." },
      { section: "experience", advice: "Attach scale and failure modes: throughput, incidents, cost." },
      { section: "skills", advice: "Mirror JD’s cloud and datastore names exactly." },
      { section: "summary", advice: "State domain: payments, ads, platform, etc." },
      { section: "experience", advice: "Mention correctness (transactions, idempotency) for money systems." },
    ],
    [
      "API keywords without reliability or data depth.",
      "Missing messaging when JD is event-driven.",
      "No observability for production-heavy roles.",
      "Cloud skills without infra-as-code or deployment story.",
    ]
  ),

  "machine-learning-engineer": page(
    "Technical skills keywords for ML engineer resumes: training stacks, feature infra, serving, and monitoring.",
    "MLE technical skills bridge research tooling and production engineering. Reflect both sides explicitly.",
    [
      cluster(
        "Training frameworks & hardware",
        "Modeling stack.",
        [
          "PyTorch",
          "TensorFlow",
          "JAX",
          "CUDA",
          "mixed precision",
          "distributed training",
          "Horovod",
          "PyTorch Lightning",
          "ONNX",
          "TorchScript",
        ],
        [
          ex("PyTorch", "Distributed training with gradient accumulation for large batch sizes."),
          ex("GPU", "Profiled kernels; moved hot paths to fused ops improving step time."),
        ]
      ),
      cluster(
        "Feature pipelines & data",
        "Production ML backbone.",
        [
          "feature store",
          "Feast",
          "Airflow",
          "Spark",
          "BigQuery",
          "data validation",
          "Great Expectations",
          "point-in-time correctness",
          "backfills",
          "streaming joins",
        ],
        [
          ex("Feature store", "Point-in-time joins preventing label leakage in training data."),
          ex("Pipelines", "Airflow DAGs with SLA monitors on freshness."),
        ]
      ),
      cluster(
        "Serving, inference & efficiency",
        "Latency and cost.",
        [
          "TorchServe",
          "TensorRT",
          "ONNX Runtime",
          "batch inference",
          "real-time inference",
          "autoscaling",
          "GPU sharing",
          "quantization",
          "distillation",
          "caching",
        ],
        [
          ex("Inference", "Batch inference for nightly scoring with cost controls."),
          ex("Latency", "Quantization trade study holding quality within tolerance."),
        ]
      ),
      cluster(
        "MLOps & experiment tracking",
        "Operational rigor.",
        [
          "MLflow",
          "Weights & Biases",
          "Kubeflow",
          "model registry",
          "artifact storage",
          "CI for ML",
          "reproducibility",
          "environment pinning",
          "data versioning",
          "pipeline orchestration",
        ],
        [
          ex("MLflow", "Tracked experiments; promoted only models passing offline gates."),
          ex("CI", "Automated training smoke tests on schema change PRs."),
        ]
      ),
      cluster(
        "Monitoring & responsible ML",
        "Production safety.",
        [
          "drift detection",
          "data drift",
          "model monitoring",
          "Evidently",
          "whylogs",
          "SHAP",
          "fairness metrics",
          "bias testing",
          "shadow deployments",
          "rollback",
        ],
        [
          ex("Monitoring", "Alerts on score distribution shifts with automated rollback hooks."),
          ex("Explainability", "SHAP summaries for risk model governance."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Split Modeling / Data / Serving / Ops—avoid one undifferentiated list." },
      { section: "experience", advice: "Prove production: latency SLOs, drift incidents, retraining triggers." },
      { section: "skills", advice: "Include feature-store/pipeline terms when JD does." },
      { section: "summary", advice: "Name domain: ads, recommendations, risk, NLP." },
      { section: "experience", advice: "Mention GPU/scale when relevant." },
    ],
    [
      "Research-only stack without serving or monitoring.",
      "Listing frameworks without training/serving proof.",
      "Ignoring data quality and leakage controls.",
      "No cost/latency trade-off language.",
    ]
  ),

  "devops-engineer": page(
    "Technical skills keywords for DevOps/SRE resumes: CI/CD, Kubernetes, IaC, observability, and security.",
    "Platform roles reward explicit toolchain matches. Align nouns with the posting and show outcomes: speed, safety, cost.",
    [
      cluster(
        "CI/CD & build systems",
        "Delivery automation.",
        [
          "GitHub Actions",
          "GitLab CI",
          "Jenkins",
          "Bazel",
          "Gradle",
          "artifact repositories",
          "semantic versioning",
          "release automation",
          "deployment pipelines",
          "rollback strategies",
        ],
        [
          ex("CI/CD", "Parallelized test matrix; cut feedback time 50%."),
          ex("Pipelines", "Gates on security scans and integration tests before prod promotion."),
        ]
      ),
      cluster(
        "Kubernetes & containers",
        "Core for many roles.",
        [
          "Kubernetes",
          "Helm",
          "Kustomize",
          "operators",
          "HPA",
          "VPA",
          "pod disruption budgets",
          "network policies",
          "service accounts",
          "admission controllers",
        ],
        [
          ex("Kubernetes", "Hardened clusters with policy-as-code and audited RBAC."),
          ex("Helm", "Charted services with values per env and secret integration."),
        ]
      ),
      cluster(
        "IaC & cloud primitives",
        "Provisioning.",
        [
          "Terraform",
          "Pulumi",
          "CloudFormation",
          "Ansible",
          "AWS",
          "GCP",
          "Azure",
          "VPC",
          "IAM",
          "multi-account",
        ],
        [
          ex("Terraform", "Modules for baseline VPC + EKS with guardrails."),
          ex("IAM", "Least privilege roles for CI deployers with OIDC federation."),
        ]
      ),
      cluster(
        "Observability & incidents",
        "Reliability.",
        [
          "Prometheus",
          "Grafana",
          "Loki",
          "Tempo",
          "OpenTelemetry",
          "PagerDuty",
          "Opsgenie",
          "SLOs",
          "error budgets",
          "postmortems",
        ],
        [
          ex("Observability", "SLO dashboards tied to customer journeys."),
          ex("Incidents", "Blameless RCAs with tracked follow-ups reducing repeats."),
        ]
      ),
      cluster(
        "Security & compliance automation",
        "Enterprise platforms.",
        [
          "Vault",
          "SOPS",
          "SBOM",
          "image scanning",
          "Trivy",
          "policy-as-code",
          "OPA",
          "secrets rotation",
          "CIS benchmarks",
          "SOC2 readiness",
        ],
        [
          ex("Security", "Eliminated long-lived cloud keys via OIDC-based deploy authentication."),
          ex("Compliance", "Automated evidence collection for access reviews."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Mirror JD: Kubernetes vs Nomad vs ECS—be precise." },
      { section: "experience", advice: "Quantify DORA-style metrics where possible: frequency, lead time, failure rate." },
      { section: "skills", advice: "Include observability stack names when listed." },
      { section: "summary", advice: "Clarify SRE vs platform vs pure CI focus." },
      { section: "experience", advice: "Tie changes to developer productivity and incident reduction." },
    ],
    [
      "Generic DevOps with no toolchain alignment.",
      "Missing Kubernetes for container orchestration roles.",
      "No SLO/incident metrics for reliability jobs.",
      "Security ignored for regulated environments.",
    ]
  ),

  "full-stack-developer": page(
    "Technical skills keywords for full-stack developer resumes: client, server, data, and delivery quality.",
    "Full-stack skill sections should show credible breadth: UI stack, API/data layer, integrations, and how you verify quality.",
    [
      cluster(
        "Frontend stack",
        "Client credibility.",
        [
          "React",
          "Next.js",
          "TypeScript",
          "HTML",
          "CSS",
          "Tailwind CSS",
          "accessibility",
          "performance",
          "state management",
          "forms",
        ],
        [
          ex("React/Next", "App Router with server components for data-heavy pages."),
          ex("Accessibility", "WCAG-focused components with keyboard and screen reader support."),
        ]
      ),
      cluster(
        "Backend & APIs",
        "Server credibility.",
        [
          "Node.js",
          "Express",
          "NestJS",
          "REST",
          "GraphQL",
          "authentication",
          "authorization",
          "sessions",
          "validation",
          "error handling",
        ],
        [
          ex("APIs", "REST with consistent pagination and optimistic concurrency tokens."),
          ex("Auth", "OAuth/OIDC integration with secure cookie sessions."),
        ]
      ),
      cluster(
        "Databases & persistence",
        "Data layer.",
        [
          "PostgreSQL",
          "Prisma",
          "migrations",
          "indexing",
          "transactions",
          "Redis",
          "caching",
          "full-text search",
          "S3",
          "file uploads",
        ],
        [
          ex("PostgreSQL", "Schema design for multi-tenant isolation and performant queries."),
          ex("Caching", "Redis cache-aside for hot reads reducing DB load."),
        ]
      ),
      cluster(
        "Integrations & async",
        "Full-stack systems thinking.",
        [
          "webhooks",
          "Stripe",
          "queues",
          "background jobs",
          "cron",
          "email delivery",
          "third-party APIs",
          "retry policies",
          "idempotency keys",
        ],
        [
          ex("Stripe", "Webhook handlers with signature verification and replay safety."),
          ex("Queues", "Async jobs for exports improving API responsiveness."),
        ]
      ),
      cluster(
        "Testing & CI",
        "Breadth needs discipline.",
        [
          "Jest",
          "Playwright",
          "Cypress",
          "React Testing Library",
          "CI/CD",
          "GitHub Actions",
          "linting",
          "typecheck",
          "preview environments",
          "trunk-based development",
        ],
        [
          ex("Testing", "Playwright coverage for core ecommerce flows gating releases."),
          ex("CI", "Parallel jobs + caching cutting pipeline time substantially."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Split Frontend / Backend / Data / Quality—avoid one long list." },
      { section: "experience", advice: "Prefer bullets spanning layers: UI + API + metric." },
      { section: "skills", advice: "Highlight integrations (payments, auth) when JD does." },
      { section: "summary", advice: "Clarify product type and your strongest side if T-shaped." },
      { section: "experience", advice: "Show trade-offs: speed vs. quality, caching vs. freshness." },
    ],
    [
      "Undifferentiated ‘full stack’ with no cross-layer proof.",
      "Listing everything without depth markers.",
      "Missing testing/CI for quality-focused companies.",
      "No integration keywords for SaaS-heavy roles.",
    ]
  ),
};
