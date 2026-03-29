import type { RoleSlug } from "@/app/lib/seoPages";
import type { KeywordIntentContent } from "../types";
import { cluster, ex, page } from "../helpers";

/** Summary section keywords & phrasing patterns for ATS + recruiters */
export const SUMMARY_KEYWORDS_BY_ROLE: Record<RoleSlug, KeywordIntentContent> = {
  "data-scientist": page(
    "Summary keywords for data scientist resumes: positioning, domains, and proof-style phrasing.",
    "Your summary is a compressed pitch: role focus, years, domains, and proof. These clusters help you align language with how DS roles are written while avoiding generic filler.",
    [
      cluster(
        "Role positioning & seniority",
        "Sets expectations fast.",
        [
          "data scientist",
          "senior data scientist",
          "staff data scientist",
          "applied scientist",
          "machine learning scientist",
          "6+ years",
          "B2B SaaS",
          "marketplace",
          "fintech",
          "consumer tech",
        ],
        [
          ex("Experienced data scientist", "Senior data scientist with 6+ years in B2C subscription businesses focused on retention and personalization."),
          ex("Professional summary", "Data scientist specializing in experimentation and production ML for growth teams."),
        ]
      ),
      cluster(
        "Technical domains",
        "ATS noun coverage.",
        [
          "machine learning",
          "experimentation",
          "A/B testing",
          "causal inference",
          "forecasting",
          "NLP",
          "recommendations",
          "computer vision",
          "risk modeling",
          "personalization",
        ],
        [
          ex("ML skills", "Hands-on Python/ SQL modeling with emphasis on uplift testing and deployment monitoring."),
          ex("Focus areas", "Experimentation, causal inference, and metric definition for product decisions."),
        ]
      ),
      cluster(
        "Business outcomes language",
        "Proof style without inventing numbers.",
        [
          "revenue impact",
          "retention",
          "churn reduction",
          "engagement",
          "cost savings",
          "risk reduction",
          "operational efficiency",
          "customer satisfaction",
          "expansion",
          "activation",
        ],
        [
          ex("Results-driven", "Delivered models influencing lifecycle campaigns with measured lift vs. control."),
          ex("Impact-focused", "Partnered with PMs to tie analyses to KPI movement and roadmap bets."),
        ]
      ),
      cluster(
        "Collaboration & communication",
        "Senior DS expectations.",
        [
          "cross-functional",
          "stakeholder management",
          "executive communication",
          "mentorship",
          "roadmap input",
          "product partnership",
          "engineering partnership",
          "influencing decisions",
          "storytelling",
          "prioritization",
        ],
        [
          ex("Team player", "Communicates trade-offs to leadership with clear metrics and next steps."),
          ex("Collaboration", "Works with engineering to productionize features and monitor post-launch performance."),
        ]
      ),
      cluster(
        "Phrases to avoid in summaries",
        "They read as filler to humans; ATS still parses them but they waste space.",
        [
          "hard worker",
          "passionate",
          "go-getter",
          "synergy",
          "think outside the box",
          "detail-oriented (alone)",
          "looking for opportunities",
          "references available",
          "objective statement",
        ],
        [
          ex("Passionate about data", "Focused on measurable business outcomes through rigorous experimentation and production ML."),
          ex("Hard-working professional", "Shipped models end-to-end: labels, training, deployment, monitoring."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "3–4 sentences: who you are, what domains, what outcomes, what you want next." },
      { section: "summary", advice: "Repeat 3 must-have nouns from the target JD naturally." },
      { section: "skills", advice: "Don’t duplicate entire skills list in summary—tease themes only." },
      { section: "experience", advice: "Summary claims must appear in bullets with evidence." },
      { section: "summary", advice: "Avoid first-person if the rest of resume is neutral—keep consistent voice." },
    ],
    [
      "Summary that could apply to any DS candidate.",
      "Inflated titles or scope.",
      "Metrics in summary not supported elsewhere.",
      "Keyword stuffing without readable sentences.",
    ]
  ),

  "software-engineer": page(
    "Summary keywords for software engineer resumes: specialty, scale, and delivery style.",
    "Engineering summaries should quickly state specialty, stack, and impact style: APIs, product, infra, etc.",
    [
      cluster(
        "Specialty & level",
        "Clarity first.",
        [
          "software engineer",
          "senior software engineer",
          "staff engineer",
          "backend engineer",
          "full-stack engineer",
          "frontend engineer",
          "8+ years",
          "startup",
          "enterprise",
          "remote",
        ],
        [
          ex("Software developer", "Senior backend engineer with 8+ years building high-throughput APIs and data-intensive services."),
          ex("Engineer summary", "Product-minded engineer focused on reliability, performance, and pragmatic delivery."),
        ]
      ),
      cluster(
        "Stack anchors",
        "Literal matches.",
        [
          "TypeScript",
          "Python",
          "Go",
          "Java",
          "React",
          "Node.js",
          "PostgreSQL",
          "AWS",
          "Kubernetes",
          "microservices",
        ],
        [
          ex("Tech skills", "TypeScript/Node services on AWS with Postgres and Redis; emphasis on observability and safe deploys."),
          ex("Stack", "Backend-heavy with strong SQL performance and distributed systems fundamentals."),
        ]
      ),
      cluster(
        "Impact verbs & themes",
        "How you deliver.",
        [
          "ownership",
          "end-to-end delivery",
          "reliability",
          "scalability",
          "performance",
          "quality",
          "mentorship",
          "technical leadership",
          "architecture",
          "customer impact",
        ],
        [
          ex("Results-oriented", "Reduced p95 latency and incident load through profiling, SLOs, and pragmatic refactors."),
          ex("Impact", "Shipped features used by millions with focus on correctness and operational excellence."),
        ]
      ),
      cluster(
        "Domain hints",
        "Match employer.",
        [
          "fintech",
          "payments",
          "SaaS",
          "marketplace",
          "developer tools",
          "data platforms",
          "security",
          "compliance",
          "healthcare",
          "ecommerce",
        ],
        [
          ex("Domain experience", "Backend engineer in fintech with emphasis on correctness, auditability, and fraud constraints."),
          ex("Industry", "B2B SaaS experience shipping features with enterprise security requirements."),
        ]
      ),
      cluster(
        "Weak summary patterns",
        "Replace with specifics.",
        [
          "coding enthusiast",
          "love to learn",
          "fast learner",
          "various languages",
          "many frameworks",
          "seeking challenging role",
          "open to anything",
        ],
        [
          ex("Love coding", "Enjoys shipping reliable systems with measurable improvements in latency and incidents."),
          ex("Fast learner", "Recently ramped on Kafka-based architecture and owned consumer migration."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "If T-shaped, say backend-heavy full-stack or frontend-heavy—clarity helps matching." },
      { section: "summary", advice: "One line on scale: users, RPS, data volume—pick what’s strongest." },
      { section: "skills", advice: "Summary teases stack; skills section lists comprehensively." },
      { section: "experience", advice: "Don’t claim staff scope in summary without staff outcomes in bullets." },
      { section: "summary", advice: "Match job title wording: Software Engineer vs Member of Technical Staff if appropriate." },
    ],
    [
      "Generic ‘developer’ with no specialty.",
      "Every technology you’ve ever touched in two sentences.",
      "Conflicting signals: ‘frontend’ summary with only backend bullets.",
      "Buzzwords: ‘rockstar’, ‘ninja’.",
    ]
  ),

  "data-analyst": page(
    "Summary keywords for data analyst resumes: business partnership, metrics, and tooling.",
    "Analyst summaries should signal trusted reporting, diagnostics, and influence on decisions.",
    [
      cluster(
        "Positioning & domains",
        "Where you operate.",
        [
          "data analyst",
          "senior data analyst",
          "marketing analytics",
          "product analytics",
          "finance analytics",
          "operations analytics",
          "growth",
          "B2C",
          "B2B",
          "marketplace",
        ],
        [
          ex("Professional summary", "Senior marketing analyst partnering with growth on funnel diagnostics, budget allocation, and experiment readouts."),
          ex("Analyst", "Product analyst focused on activation/retention metrics and trustworthy reporting."),
        ]
      ),
      cluster(
        "Tooling anchors",
        "ATS matches.",
        [
          "SQL",
          "Looker",
          "Tableau",
          "Power BI",
          "Snowflake",
          "BigQuery",
          "dbt",
          "Excel",
          "Python",
          "Amplitude",
        ],
        [
          ex("Tools", "SQL + Looker for stakeholder reporting; Python for deeper diagnostics when needed."),
          ex("Stack", "Snowflake/dbt for trusted metrics; Tableau for executive consumption."),
        ]
      ),
      cluster(
        "Workstyle keywords",
        "How you add value.",
        [
          "KPI ownership",
          "metric definitions",
          "executive reporting",
          "ad hoc analysis",
          "experimentation support",
          "forecasting support",
          "stakeholder training",
          "data quality",
          "insight storytelling",
          "prioritization",
        ],
        [
          ex("Detail-oriented", "Owns metric definitions and prevents conflicting numbers across teams."),
          ex("Storytelling", "Turns complex analyses into concise narratives for leadership decisions."),
        ]
      ),
      cluster(
        "Outcome phrasing",
        "Honest impact.",
        [
          "informed decisions",
          "budget reallocation",
          "roadmap changes",
          "cost savings",
          "conversion improvement",
          "churn reduction",
          "operational efficiency",
          "risk mitigation",
          "forecast accuracy",
          "sla improvement",
        ],
        [
          ex("Results-driven", "Analyses that shifted budget and roadmap based on measured lift and incrementality."),
          ex("Impact", "Reduced manual reporting hours through automation and self-serve dashboards."),
        ]
      ),
      cluster(
        "Weak analyst summaries",
        "Avoid.",
        [
          "data enthusiast",
          "love data",
          "analytical mindset",
          "good with numbers",
          "entry-level eager",
        ],
        [
          ex("Love data", "Analytics professional focused on decision quality, metric definitions, and business outcomes."),
          ex("Analytical", "SQL-first analyst with strong documentation habits and stakeholder communication."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "Name your primary partner function: marketing, product, finance." },
      { section: "summary", advice: "If you own definitions, say ‘metric ownership’ once." },
      { section: "skills", advice: "Don’t paste skills list into summary." },
      { section: "experience", advice: "Summary metrics must be defensible in bullets." },
      { section: "summary", advice: "Experiments: mention if role requires test readouts." },
    ],
    [
      "Summary could fit any analyst.",
      "Tool dump without domain.",
      "No hint of stakeholder influence.",
      "Conflicting focus: finance summary with only marketing bullets.",
    ]
  ),

  "product-manager": page(
    "Summary keywords for product manager resumes: customer, metrics, and shipping record.",
    "PM summaries should read like a product narrative: customer, strategy, shipping muscle, metrics.",
    [
      cluster(
        "Role & scope",
        "Clarity.",
        [
          "product manager",
          "senior product manager",
          "group product manager",
          "B2B SaaS",
          "B2C",
          "mobile",
          "platform PM",
          "growth PM",
          "enterprise",
          "PLG",
        ],
        [
          ex("Product manager summary", "Senior PM for B2B SaaS billing and monetization with enterprise rollout experience."),
          ex("PM profile", "Growth PM focused on activation, retention, and self-serve expansion."),
        ]
      ),
      cluster(
        "Discovery & strategy language",
        "How you decide.",
        [
          "customer research",
          "discovery",
          "roadmap",
          "prioritization",
          "OKRs",
          "strategy",
          "competitive analysis",
          "experimentation",
          "metrics fluency",
          "vision",
        ],
        [
          ex("Strategic PM", "Balances discovery insights with pragmatic sequencing and measurable bets."),
          ex("Customer-centric", "Runs structured discovery before committing engineering months."),
        ]
      ),
      cluster(
        "Shipping & leadership",
        "Execution.",
        [
          "shipped",
          "launched",
          "cross-functional leadership",
          "PRDs",
          "stakeholder alignment",
          "engineering partnership",
          "design partnership",
          "GTM",
          "rollouts",
          "scale",
        ],
        [
          ex("Results", "Shipped multiple initiatives per quarter with clear pre/post metrics and guardrails."),
          ex("Execution", "Known for crisp specs, fast decisions, and predictable delivery with engineering."),
        ]
      ),
      cluster(
        "Metric anchors",
        "Proof style.",
        [
          "activation",
          "retention",
          "conversion",
          "ARR",
          "NPS",
          "churn",
          "expansion",
          "time-to-value",
          "adoption",
          "support volume",
        ],
        [
          ex("Metrics-driven", "Uses metrics to prioritize and to validate launches with staged rollouts."),
          ex("Growth", "Improved activation and monetization through experimentation and onboarding improvements."),
        ]
      ),
      cluster(
        "Weak PM summaries",
        "Avoid.",
        [
          "idea person",
          "visionary",
          "CEO of product",
          "loves meetings",
          "people person",
        ],
        [
          ex("Visionary", "Product leader who translates customer pain into measurable roadmap outcomes."),
          ex("People person", "Facilitates alignment with evidence, trade-offs, and written decisions."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "Avoid internal titles only recruiters understand—use standard PM title." },
      { section: "summary", advice: "One strong metric line if you have a flagship outcome." },
      { section: "skills", advice: "Tools (Jira/Figma) can appear once if JD-heavy." },
      { section: "experience", advice: "Summary claims must match bullets." },
      { section: "summary", advice: "Enterprise PM: mention compliance/security comfort if true." },
    ],
    [
      "Buzzwords without shipped outcomes.",
      "Summary lists every product area you touched.",
      "Conflicting: B2C summary with only B2B experience.",
      "Inflated leadership without scope evidence.",
    ]
  ),

  "business-analyst": page(
    "Summary keywords for business analyst resumes: process, requirements, and value.",
    "BA summaries should emphasize structured discovery, documentation, and measurable change.",
    [
      cluster(
        "Positioning",
        "Role clarity.",
        [
          "business analyst",
          "senior business analyst",
          "systems analyst",
          "process analyst",
          "finance BA",
          "healthcare BA",
          "agile BA",
          "digital transformation",
          "ERP",
          "CRM",
        ],
        [
          ex("BA summary", "Senior business analyst specializing in order-to-cash process improvement and ERP-driven change."),
          ex("Profile", "Agile BA bridging product owners, engineering, and operations with traceable requirements."),
        ]
      ),
      cluster(
        "Core BA verbs as nouns",
        "ATS phrasing.",
        [
          "requirements elicitation",
          "process mapping",
          "business rules",
          "user stories",
          "acceptance criteria",
          "stakeholder facilitation",
          "gap analysis",
          "business case",
          "UAT",
          "change management",
        ],
        [
          ex("Experience summary", "Requirements ownership from workshops through UAT with measurable cycle time reduction."),
          ex("Skills in prose", "Strong facilitator translating business needs into testable acceptance criteria."),
        ]
      ),
      cluster(
        "Tooling",
        "Common matches.",
        [
          "Jira",
          "Confluence",
          "Azure DevOps",
          "Visio",
          "Lucidchart",
          "Power BI",
          "SQL",
          "Salesforce",
          "SAP",
          "ServiceNow",
        ],
        [
          ex("Tools", "Jira/Confluence for traceability; Power BI for operational KPIs supporting decisions."),
          ex("Systems", "Salesforce-focused BA work for lead-to-cash alignment."),
        ]
      ),
      cluster(
        "Value & outcomes",
        "Proof.",
        [
          "cost savings",
          "cycle time reduction",
          "error reduction",
          "compliance",
          "audit readiness",
          "automation ROI",
          "stakeholder satisfaction",
          "adoption",
          "risk mitigation",
          "quality improvement",
        ],
        [
          ex("Value-driven", "Delivered changes with documented ROI and reduced operational rework."),
          ex("Outcome-focused", "Requirements that reduced invoice disputes and SLA breaches measurably."),
        ]
      ),
      cluster(
        "Weak BA summaries",
        "Avoid.",
        [
          "organizational skills",
          "multitasker",
          "detail-oriented only",
          "jack of all trades",
        ],
        [
          ex("Organized", "Maintains traceable requirements and clear communication across distributed stakeholders."),
          ex("Multitasker", "Prioritizes initiatives using business impact and dependency risk."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "Name industry domain early—finance, healthcare, logistics." },
      { section: "summary", advice: "If agile, say ‘agile BA’ once if JD uses it." },
      { section: "experience", advice: "Summary savings claims need supporting bullet metrics." },
      { section: "skills", advice: "Keep tools minimal in summary." },
      { section: "summary", advice: "ERP/CRM transformation: mention module area if relevant." },
    ],
    [
      "Generic BA with no domain.",
      "Requirements jargon without outcomes.",
      "Conflicting agile vs waterfall signals.",
      "Tool list without role context.",
    ]
  ),

  "frontend-developer": page(
    "Summary keywords for frontend developer resumes: UI engineering, performance, and accessibility.",
    "Frontend summaries should signal craft: stack, product type, and impact focus.",
    [
      cluster(
        "Positioning",
        "Specialty.",
        [
          "frontend engineer",
          "UI engineer",
          "web developer",
          "senior frontend developer",
          "design systems",
          "React",
          "Next.js",
          "TypeScript",
          "B2C",
          "B2B",
        ],
        [
          ex("Frontend summary", "Senior frontend engineer focused on React/Next performance, accessibility, and conversion."),
          ex("Web developer", "UI engineer building design-system-backed experiences for SaaS products."),
        ]
      ),
      cluster(
        "Craft themes",
        "Keywords.",
        [
          "performance",
          "Core Web Vitals",
          "accessibility",
          "WCAG",
          "design systems",
          "component libraries",
          "responsive design",
          "testing",
          "UX",
          "conversion optimization",
        ],
        [
          ex("User-focused", "Ships fast, accessible interfaces with measurable UX and business metrics."),
          ex("Performance", "Optimizes bundles and rendering paths to improve CWV and conversion."),
        ]
      ),
      cluster(
        "Collaboration",
        "How you work.",
        [
          "product partnership",
          "design collaboration",
          "analytics",
          "experimentation",
          "A/B testing",
          "design systems",
          "code review",
          "mentorship",
          "cross-functional",
          "customer empathy",
        ],
        [
          ex("Collaborative", "Partners with design and analytics to ship experiments with guardrails."),
          ex("Team", "Mentors junior engineers on accessibility and testing patterns."),
        ]
      ),
      cluster(
        "Weak FE summaries",
        "Avoid.",
        [
          "pixel perfect",
          "creative",
          "passionate about design",
          "HTML/CSS only",
        ],
        [
          ex("Pixel perfect", "Engineers UI with performance and accessibility constraints, not just visual fidelity."),
          ex("Creative", "Balances product UX goals with engineering constraints and metrics."),
        ]
      ),
      cluster(
        "Metric anchors",
        "Optional proof.",
        [
          "conversion rate",
          "activation",
          "error rate",
          "LCP",
          "bundle size",
          "support tickets",
          "accessibility audit",
          "release cadence",
          "adoption",
          "engagement",
        ],
        [
          ex("Metrics", "Improved conversion and reduced client errors on critical flows."),
          ex("Performance", "Delivered measurable CWV improvements on core landing pages."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "3 sentences: stack + product type + impact theme (perf/ a11y / growth)." },
      { section: "summary", advice: "Design-system focus: say it once if that’s your brand." },
      { section: "skills", advice: "Tools in skills; summary stays high-level." },
      { section: "experience", advice: "Summary metrics supported by bullets." },
      { section: "summary", advice: "Mobile-heavy: mention responsive/mobile explicitly." },
    ],
    [
      "Generic ‘frontend developer’ with no stack.",
      "Accessibility claims without evidence elsewhere.",
      "Conflicting: backend summary with FE resume.",
      "Overstating design ownership if you didn’t lead design.",
    ]
  ),

  "backend-developer": page(
    "Summary keywords for backend developer resumes: APIs, data, reliability, and domains.",
    "Backend summaries should state service type, scale, and reliability themes.",
    [
      cluster(
        "Positioning",
        "Specialty.",
        [
          "backend engineer",
          "software engineer (backend)",
          "API engineer",
          "services engineer",
          "distributed systems",
          "microservices",
          "fintech",
          "payments",
          "SaaS platform",
          "data platform",
        ],
        [
          ex("Backend summary", "Backend engineer building high-throughput APIs and reliable data systems in fintech."),
          ex("Profile", "Services engineer focused on correctness, performance, and operational excellence."),
        ]
      ),
      cluster(
        "Technical themes",
        "Nouns.",
        [
          "REST",
          "GraphQL",
          "PostgreSQL",
          "Redis",
          "Kafka",
          "AWS",
          "Kubernetes",
          "Docker",
          "observability",
          "microservices",
        ],
        [
          ex("Technical", "Go/TypeScript services on AWS with Postgres/Redis/Kafka; strong observability culture."),
          ex("Systems", "Designs APIs and data models with performance and reliability constraints."),
        ]
      ),
      cluster(
        "Reliability & scale",
        "Signals.",
        [
          "high availability",
          "low latency",
          "high throughput",
          "SLOs",
          "incident reduction",
          "on-call",
          "cost optimization",
          "scaling",
          "multi-region",
          "data consistency",
        ],
        [
          ex("Reliable systems", "Reduced incident load and latency through profiling, caching, and disciplined deploys."),
          ex("Scale", "Built services handling millions of daily requests with clear ownership and metrics."),
        ]
      ),
      cluster(
        "Security & compliance",
        "Sensitive domains.",
        [
          "authentication",
          "authorization",
          "PCI",
          "GDPR",
          "encryption",
          "audit logs",
          "fraud prevention",
          "least privilege",
          "secure SDLC",
          "threat modeling",
        ],
        [
          ex("Security-minded", "Implemented auth patterns and audit logging meeting compliance reviews."),
          ex("Compliance", "Experience shipping APIs under strict regulatory and security requirements."),
        ]
      ),
      cluster(
        "Weak backend summaries",
        "Avoid.",
        [
          "CRUD APIs",
          "basic backend",
          "server stuff",
        ],
        [
          ex("CRUD", "Built domain services beyond CRUD: workflows, invariants, integrations, and reliability."),
          ex("Basic", "Owns complex domains with strong testing, observability, and incident practices."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "Mention domain: payments, ads, logistics—helps relevance." },
      { section: "summary", advice: "One scale hint: RPS, records, $ volume band." },
      { section: "skills", advice: "Stack list belongs in skills; summary uses 1 line max." },
      { section: "experience", advice: "Don’t claim ‘architect’ in summary without architecture bullets." },
      { section: "summary", advice: "SRE-adjacent: mention observability/SLOs if that’s your brand." },
    ],
    [
      "Backend summary with only frontend bullets.",
      "Buzzwords without scale or reliability hints.",
      "Security claims without supporting experience.",
      "Every cloud service listed in prose.",
    ]
  ),

  "machine-learning-engineer": page(
    "Summary keywords for ML engineer resumes: production ML, systems, and domains.",
    "MLE summaries should emphasize production: training, serving, monitoring—not only modeling.",
    [
      cluster(
        "Positioning",
        "Title clarity.",
        [
          "machine learning engineer",
          "applied ML engineer",
          "ML platform engineer",
          "deep learning engineer",
          "recommendations",
          "ranking",
          "search",
          "ads",
          "risk",
          "NLP",
        ],
        [
          ex("MLE summary", "ML engineer focused on ranking and retrieval with strong deployment and monitoring discipline."),
          ex("Profile", "Applied ML engineer shipping models to production with latency and cost constraints."),
        ]
      ),
      cluster(
        "Production themes",
        "Keywords.",
        [
          "training pipelines",
          "feature store",
          "model serving",
          "GPU inference",
          "monitoring",
          "drift",
          "MLflow",
          "Kubernetes",
          "batch scoring",
          "online inference",
        ],
        [
          ex("Production ML", "Owns training-to-serving path with monitoring, rollback, and cost controls."),
          ex("Systems", "Partners with data and platform teams on freshness, skew, and reliability."),
        ]
      ),
      cluster(
        "Modeling depth",
        "Careful claims.",
        [
          "deep learning",
          "gradient boosting",
          "transformers",
          "evaluation",
          "offline metrics",
          "online metrics",
          "A/B testing",
          "calibration",
          "fairness",
          "explainability",
        ],
        [
          ex("Modeling", "Balances offline metrics with latency/cost constraints and online guardrails."),
          ex("Evaluation", "Rigorous evaluation including error analysis and slice metrics."),
        ]
      ),
      cluster(
        "Weak MLE summaries",
        "Avoid.",
      [
          "passionate about AI",
          "ChatGPT",
          "cutting-edge AI",
          "research only",
        ],
        [
          ex("AI passion", "ML engineer focused on measurable business impact through reliable production systems."),
          ex("Cutting-edge", "Pragmatic model choices with strong evaluation and deployment discipline."),
        ]
      ),
      cluster(
        "Outcome phrasing",
        "Proof style.",
        [
          "latency",
          "cost",
          "precision",
          "recall",
          "engagement",
          "revenue",
          "risk reduction",
          "reliability",
          "incident reduction",
          "freshness",
        ],
        [
          ex("Impact", "Improved model quality while meeting latency SLO and reducing infra cost."),
          ex("Results", "Reduced model-related incidents via monitoring and automated retraining triggers."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "Say ‘production ML’ if that’s true—differentiates from pure DS." },
      { section: "summary", advice: "Domain line: ads, recommendations, risk, etc." },
      { section: "skills", advice: "Frameworks in skills; summary stays outcome-oriented." },
      { section: "experience", advice: "Online metrics in summary need backup in bullets." },
      { section: "summary", advice: "If platform-focused, mention feature store/serving once." },
    ],
    [
      "Research-only summary for production MLE role.",
      "Buzzwords: AGI, LLM hype without relevant scope.",
      "No serving/monitoring language.",
      "Overstating novelty of models.",
    ]
  ),

  "devops-engineer": page(
    "Summary keywords for DevOps/SRE resumes: platform, reliability, automation, and security.",
    "Platform summaries should highlight scope: CI, Kubernetes, observability, FinOps, security.",
    [
      cluster(
        "Positioning",
        "Title alignment.",
        [
          "DevOps engineer",
          "SRE",
          "platform engineer",
          "cloud engineer",
          "infrastructure engineer",
          "Kubernetes",
          "AWS",
          "GCP",
          "Azure",
          "GitOps",
        ],
        [
          ex("DevOps summary", "Platform engineer focused on Kubernetes, GitOps, and developer self-service on AWS."),
          ex("SRE summary", "SRE with emphasis on SLOs, incident reduction, and observability maturity."),
        ]
      ),
      cluster(
        "Core themes",
        "Nouns.",
        [
          "CI/CD",
          "IaC",
          "Terraform",
          "Kubernetes",
          "observability",
          "reliability",
          "security",
          "FinOps",
          "on-call",
          "automation",
        ],
        [
          ex("Platform", "Builds golden paths: templates, guardrails, and observability defaults."),
          ex("Automation", "Reduces toil via IaC, policy-as-code, and self-service workflows."),
        ]
      ),
      cluster(
        "Outcomes",
        "Metrics.",
        [
          "MTTR",
          "deployment frequency",
          "lead time",
          "change failure rate",
          "incident rate",
          "cost savings",
          "developer productivity",
          "alert noise",
          "SLO compliance",
          "audit readiness",
        ],
        [
          ex("Results", "Improved deployment frequency while lowering incidents and alert noise."),
          ex("Impact", "Reduced cloud spend and engineer toil through automation and rightsizing."),
        ]
      ),
      cluster(
        "Security & compliance",
        "Enterprise.",
        [
          "SOC2",
          "OIDC",
          "secrets management",
          "SBOM",
          "image scanning",
          "policy-as-code",
          "IAM",
          "network segmentation",
        ],
        [
          ex("Security", "Implemented secure CI/CD patterns with verified artifacts and least privilege."),
          ex("Compliance", "Automated controls evidence for audits and access reviews."),
        ]
      ),
      cluster(
        "Weak platform summaries",
        "Avoid.",
        [
          "keeps servers running",
          "IT support",
          "DevOps guy",
        ],
        [
          ex("Servers", "Builds reliable platforms with SLOs, automation, and developer-focused product mindset."),
          ex("IT", "Infrastructure engineering with software engineering practices and measurable outcomes."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "Pick SRE vs DevOps vs platform to match job title." },
      { section: "summary", advice: "One reliability metric if strong (MTTR, incident reduction)." },
      { section: "skills", advice: "Stack belongs in skills; summary uses themes." },
      { section: "experience", advice: "Claims about org-wide impact need scope in bullets." },
      { section: "summary", advice: "Multi-cloud: say only if true and relevant." },
    ],
    [
      "Generic ‘DevOps’ with no toolchain or outcome.",
      "Conflicting: application engineer summary for platform role.",
      "No reliability or automation language.",
      "Overstating security scope.",
    ]
  ),

  "full-stack-developer": page(
    "Summary keywords for full-stack developer resumes: product breadth with honest depth.",
    "Full-stack summaries should state end-to-end ownership and primary stack—avoid ‘everything’ claims.",
    [
      cluster(
        "Positioning",
        "Clarity.",
        [
          "full-stack engineer",
          "full-stack developer",
          "web engineer",
          "product engineer",
          "startup",
          "SaaS",
          "React",
          "Node.js",
          "TypeScript",
          "PostgreSQL",
        ],
        [
          ex("Full-stack summary", "Full-stack engineer shipping React/Node features end-to-end with strong Postgres modeling."),
          ex("Profile", "Product engineer focused on onboarding, billing, and activation flows."),
        ]
      ),
      cluster(
        "Breadth themes",
        "Keywords.",
        [
          "UI",
          "APIs",
          "databases",
          "integrations",
          "authentication",
          "payments",
          "background jobs",
          "testing",
          "CI/CD",
          "analytics",
        ],
        [
          ex("End-to-end", "Owns features across UI, API, and data layer with measurable product metrics."),
          ex("Integration", "Comfortable with OAuth, webhooks, and third-party APIs with production rigor."),
        ]
      ),
      cluster(
        "T-shape honesty",
        "Differentiation.",
        [
          "frontend-leaning",
          "backend-leaning",
          "product sense",
          "UX sensitivity",
          "performance",
          "reliability",
          "security basics",
          "experimentation",
        ],
        [
          ex("Balanced", "Backend-leaning full-stack with strong API design and pragmatic UI delivery."),
          ex("T-shaped", "Deepest in TypeScript services; competent React for product delivery."),
        ]
      ),
      cluster(
        "Outcomes",
        "Proof.",
        [
          "conversion",
          "activation",
          "reliability",
          "latency",
          "cost",
          "time-to-ship",
          "support reduction",
          "uptime",
          "customer satisfaction",
        ],
        [
          ex("Impact", "Shipped features improving conversion and reducing payment failures."),
          ex("Results", "Balances speed with testing and observability for SaaS reliability."),
        ]
      ),
      cluster(
        "Weak full-stack summaries",
        "Avoid.",
        [
          "knows all technologies",
          "master of everything",
          "full stack ninja",
        ],
        [
          ex("Everything", "Full-stack engineer with pragmatic depth across product stack and clear ownership."),
          ex("Ninja", "Shipping engineer who values tests, monitoring, and user-visible metrics."),
        ]
      ),
    ],
    [
      { section: "summary", advice: "State T-shape: which side is deeper in one line." },
      { section: "summary", advice: "Product type matters: B2B SaaS vs consumer." },
      { section: "skills", advice: "Split skills by layer; summary doesn’t duplicate." },
      { section: "experience", advice: "Full-stack claims need cross-layer bullets." },
      { section: "summary", advice: "Indie/SaaS: mention if you own production solo—signals maturity." },
    ],
    [
      "Claims full stack with single-layer evidence.",
      "Keyword soup of unrelated frameworks.",
      "No product or reliability hint.",
      "Conflicting depth: ‘expert’ in both FE and BE without tenure.",
    ]
  ),
};
