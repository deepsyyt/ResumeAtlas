import type { RoleSlug } from "@/app/lib/seoPages";
import type { KeywordIntentContent } from "../types";
import { cluster, ex, page } from "../helpers";

/** Project-related keywords & how to frame projects on a resume */
export const PROJECT_KEYWORDS_BY_ROLE: Record<RoleSlug, KeywordIntentContent> = {
  "data-scientist": page(
    "Project keywords for data scientist resumes: problem, data, method, deployment, and impact.",
    "Project sections should read like mini case studies. These clusters help ATS match project language while you keep each project honest and specific.",
    [
      cluster(
        "Problem & business framing",
        "Why the project existed.",
        [
          "churn reduction",
          "revenue uplift",
          "risk scoring",
          "personalization",
          "fraud detection",
          "forecasting",
          "quality improvement",
          "cost reduction",
          "latency reduction",
          "engagement",
        ],
        [
          ex("ML project", "Built churn model targeting high-value segments; informed lifecycle campaigns with expected incremental revenue."),
          ex("Data science project", "Designed uplift tests for promotions with guardrails on margin and support load."),
        ]
      ),
      cluster(
        "Data & evaluation setup",
        "Credibility signals.",
        [
          "training data",
          "label definition",
          "sampling",
          "offline metrics",
          "cross-validation",
          "holdout",
          "backtesting",
          "leakage checks",
          "bias evaluation",
          "error analysis",
        ],
        [
          ex("Used data", "Defined labels with product/legal; validated leakage risks before training."),
          ex("Evaluation", "Compared models on precision/recall at operational thresholds, not only AUC."),
        ]
      ),
      cluster(
        "Methods & tooling",
        "Technical depth.",
        [
          "gradient boosting",
          "deep learning",
          "calibration",
          "feature engineering",
          "hyperparameter search",
          "experiment tracking",
          "Python",
          "SQL",
          "Spark",
          "notebooks to production",
        ],
        [
          ex("Algorithms", "Chose gradient boosting for tabular data with strong baseline and interpretability needs."),
          ex("Tools", "Tracked experiments in MLflow; promoted models via registry with approval workflow."),
        ]
      ),
      cluster(
        "Deployment & monitoring",
        "Production awareness.",
        [
          "batch scoring",
          "online inference",
          "Docker",
          "Kubernetes",
          "monitoring",
          "drift detection",
          "retraining",
          "SLAs",
          "rollback",
          "shadow deployment",
        ],
        [
          ex("Deployed", "Productionized nightly scoring with Airflow monitoring and alerts on data delays."),
          ex("Serving", "Canary release with automated rollback when score distribution shifted beyond threshold."),
        ]
      ),
      cluster(
        "Stakeholder outcomes",
        "Human impact.",
        [
          "executive readout",
          "adoption",
          "decision support",
          "policy change",
          "campaign launch",
          "product roadmap",
          "AB test ship",
          "risk mitigation",
          "customer impact",
          "measurable lift",
        ],
        [
          ex("Impact", "Model outputs adopted by marketing ops; measured incremental lift with holdout."),
          ex("Stakeholders", "Presented trade-offs to leadership; aligned on precision-first policy for compliance."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Projects can live in Experience or Projects—avoid duplicating verbatim." },
      { section: "experience", advice: "Use STAR implicitly: context, approach, tools, metric." },
      { section: "skills", advice: "Don’t replace skills with project keywords—skills stay scannable nouns." },
      { section: "summary", advice: "Name 1 flagship project domain if it defines your brand." },
      { section: "experience", advice: "Link to Git only if repo is polished and relevant." },
    ],
    [
      "Project bullets that are only libraries with no business problem.",
      "Claiming production deployment with only notebook work.",
      "Missing metrics entirely.",
      "Copy-paste project descriptions across applications without tailoring keywords.",
    ]
  ),

  "software-engineer": page(
    "Project keywords for software engineer resumes: scope, architecture, quality, and launch.",
    "Engineering projects should emphasize systems: APIs, scale, reliability, and what shipped to users.",
    [
      cluster(
        "Scope & ownership",
        "Clarify what you owned.",
        [
          "end-to-end",
          "owned module",
          "led initiative",
          "solo project",
          "team project",
          "open source",
          "side project",
          "production system",
          "customer-facing",
          "internal tooling",
        ],
        [
          ex("Side project", "Built production SaaS MVP with auth, billing, and admin—100+ paying users."),
          ex("Team project", "Owned payments reconciliation service; on-call rotation for domain."),
        ]
      ),
      cluster(
        "Architecture & stack",
        "Technical keywords.",
        [
          "microservices",
          "monolith",
          "REST",
          "GraphQL",
          "event-driven",
          "PostgreSQL",
          "Redis",
          "Kafka",
          "Docker",
          "Kubernetes",
        ],
        [
          ex("Architecture", "Extracted billing service from monolith; defined API contracts and migration plan."),
          ex("Stack", "Node.js + Postgres + Redis; deployed on ECS with autoscaling."),
        ]
      ),
      cluster(
        "Quality & reliability",
        "How you shipped safely.",
        [
          "tests",
          "CI/CD",
          "monitoring",
          "logging",
          "tracing",
          "feature flags",
          "rollout",
          "rollback",
          "load testing",
          "on-call",
        ],
        [
          ex("Quality", "Integration tests for payment edge cases; blocked three regressions pre-release."),
          ex("Reliability", "Feature flags for staged rollout; automatic rollback on error rate spike."),
        ]
      ),
      cluster(
        "Performance & scale",
        "Numbers matter.",
        [
          "latency",
          "throughput",
          "RPS",
          "cost optimization",
          "caching",
          "indexing",
          "profiling",
          "scaling",
          "multi-region",
          "efficiency",
        ],
        [
          ex("Scale", "Handled 5k RPS peak with autoscaling and queue backpressure."),
          ex("Performance", "Reduced p95 latency 40% via caching and query optimization."),
        ]
      ),
      cluster(
        "Impact & adoption",
        "Business relevance.",
        [
          "user adoption",
          "conversion",
          "revenue",
          "cost savings",
          "incident reduction",
          "developer productivity",
          "customer tickets",
          "SLA",
          "uptime",
          "expansion",
        ],
        [
          ex("Impact", "Internal tool cut support tickets 25% by automating account fixes."),
          ex("Adoption", "Dashboard used weekly by 50+ PMs for experiment readouts."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "1–2 flagship projects with metrics beat 5 shallow ones." },
      { section: "experience", advice: "Open-source: link + stars/contributors if impressive." },
      { section: "skills", advice: "Project tech can echo skills section—keep wording consistent." },
      { section: "summary", advice: "Highlight project if it’s strongest proof (career pivot, freelance)." },
      { section: "experience", advice: "Avoid confidential details—use scale bands if needed." },
    ],
    [
      "Projects with no link between tech and outcome.",
      "Buzzword architecture with no constraints or tradeoffs.",
      "Fake metrics—interviews will dig.",
      "Outdated stack presented as current without context.",
    ]
  ),

  "data-analyst": page(
    "Project keywords for data analyst resumes: questions, datasets, methods, and decisions.",
    "Analyst projects should emphasize the business question, the metric definition, and the decision influenced.",
    [
      cluster(
        "Business questions & KPIs",
        "Why the analysis mattered.",
        [
          "funnel drop-off",
          "campaign performance",
          "cohort retention",
          "unit economics",
          "forecast accuracy",
          "pipeline health",
          "customer segmentation",
          "operational efficiency",
          "support volume",
          "churn drivers",
        ],
        [
          ex("Analysis project", "Diagnosed activation drop to step 3; quantified impact on ARR from lost conversions."),
          ex("KPI work", "Standardized MRR definition across teams ending monthly metric debates."),
        ]
      ),
      cluster(
        "Data sources & quality",
        "Trust signals.",
        [
          "warehouse",
          "events",
          "CRM",
          "billing",
          "surveys",
          "reconciliation",
          "data quality",
          "missing data",
          "definitions",
          "grain",
        ],
        [
          ex("Data", "Joined Salesforce + product events; fixed duplicate user mapping inflating funnel."),
          ex("Quality", "Caught tracking gap inflating activation; partnered with eng to patch SDK."),
        ]
      ),
      cluster(
        "Methods & deliverables",
        "How you worked.",
        [
          "SQL",
          "dashboards",
          "Excel models",
          "forecasting",
          "segmentation",
          "experiment readout",
          "insight deck",
          "executive summary",
          "ad hoc analysis",
          "self-serve reporting",
        ],
        [
          ex("Methods", "Built cohort views in SQL powering Looker dashboards for weekly reviews."),
          ex("Deliverable", "Executive one-pager influencing Q3 marketing budget shift."),
        ]
      ),
      cluster(
        "Stakeholders & adoption",
        "Influence.",
        [
          "presented findings",
          "weekly business review",
          "partnered with PM",
          "finance alignment",
          "sales enablement",
          "action owners",
          "follow-up metrics",
          "decision log",
          "adoption tracking",
          "training",
        ],
        [
          ex("Stakeholders", "Presented to leadership; three initiatives reprioritized based on analysis."),
          ex("Adoption", "Trained PMs on self-serve dashboard; cut ad hoc requests 25%."),
        ]
      ),
      cluster(
        "Experimentation language",
        "Growth analysts.",
        [
          "experiment design",
          "readout",
          "incrementality",
          "holdout",
          "guardrails",
          "segments",
          "power",
          "significance",
          "rollout decision",
          "post-launch monitoring",
        ],
        [
          ex("Experiment", "Supported pricing test with guardrails; recommended pause when support SLA slipped."),
          ex("Causal language", "Used geo holdouts to validate marketing lift beyond correlation."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Frame projects as questions answered, not charts built." },
      { section: "experience", advice: "Quantify decisions: budget, roadmap, staffing." },
      { section: "skills", advice: "Tools in skills; project narrative in experience." },
      { section: "summary", advice: "Name vertical (marketing, finance) if projects are domain-specific." },
      { section: "experience", advice: "Academic projects OK early-career—tie methods to job needs." },
    ],
    [
      "Charts without decisions.",
      "Vague ‘insights’ without metrics.",
      "No mention of metric definitions or data quality.",
      "Ignoring experimentation vocabulary for growth roles.",
    ]
  ),

  "product-manager": page(
    "Project keywords for product manager resumes: outcomes, scope, and cross-functional delivery.",
    "PM projects are product initiatives: problem, approach, launch, metrics—avoid feature laundry lists.",
    [
      cluster(
        "Problem & customer evidence",
        "Why it mattered.",
        [
          "customer pain",
          "opportunity sizing",
          "competitive gap",
          "retention risk",
          "expansion opportunity",
          "unit economics",
          "activation bottleneck",
          "support burden",
          "compliance requirement",
          "strategic bet",
        ],
        [
          ex("Product project", "Validated onboarding pain via interviews; sized opportunity with funnel + revenue impact."),
          ex("Initiative", "Addressed enterprise security gaps blocking deals in two key segments."),
        ]
      ),
      cluster(
        "Scope & roadmap placement",
        "How you chose what to build.",
        [
          "MVP",
          "phased rollout",
          "scope cuts",
          "trade-offs",
          "dependencies",
          "platform work",
          "tech debt",
          "risk mitigation",
          "timeline",
          "launch criteria",
        ],
        [
          ex("Roadmap", "Cut non-critical features to hit latency budget for enterprise pilot."),
          ex("Rollout", "Phased release with internal dogfood before GA."),
        ]
      ),
      cluster(
        "Delivery & collaboration",
        "Shipping mechanics.",
        [
          "PRD",
          "user stories",
          "design reviews",
          "engineering partnership",
          "QA plan",
          "beta program",
          "launch checklist",
          "GTM",
          "support enablement",
          "analytics plan",
        ],
        [
          ex("Delivery", "Co-authored PRD with analytics events and success metrics pre-approved."),
          ex("GTM", "Trained support on top failure modes; reduced launch tickets 30%."),
        ]
      ),
      cluster(
        "Metrics & experimentation",
        "Proof.",
        [
          "activation",
          "retention",
          "conversion",
          "ARPA",
          "NPS",
          "CSAT",
          "A/B test",
          "feature adoption",
          "support volume",
          "revenue impact",
        ],
        [
          ex("Metrics", "Shipped onboarding flow; activation +11% with guardrails on error rates."),
          ex("Experiment", "Validated pricing change with holdout measuring net revenue, not CTR."),
        ]
      ),
      cluster(
        "Strategic outcomes",
        "Senior signal.",
        [
          "market expansion",
          "new segment",
          "partnership launch",
          "platform unlock",
          "cost reduction",
          "compliance certification",
          "churn reduction",
          "expansion revenue",
          "time-to-value",
          "ecosystem",
        ],
        [
          ex("Outcome", "Unblocked enterprise deals with SSO + audit logging; accelerated pipeline $XM."),
          ex("Strategy", "Platform bet reduced integration time for partners from weeks to days."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Projects = initiatives with metrics; use same STAR structure as eng." },
      { section: "summary", advice: "Flagship launch: name metric + timeframe." },
      { section: "experience", advice: "Redact sensitive numbers with ranges if needed." },
      { section: "skills", advice: "Tools belong in skills; outcomes in project bullets." },
      { section: "experience", advice: "Show conflict/tradeoff when memorable—scope vs. time." },
    ],
    [
      "Feature lists without user/business outcome.",
      "Buzzwords: ‘vision’ without roadmap evidence.",
      "No metrics on launches.",
      "Ignoring GTM/support when B2B.",
    ]
  ),

  "business-analyst": page(
    "Project keywords for business analyst resumes: process change, requirements, and value.",
    "BA projects are change initiatives: current state, future state, value, rollout.",
    [
      cluster(
        "Process & problem framing",
        "Context.",
        [
          "as-is process",
          "to-be process",
          "pain points",
          "bottlenecks",
          "handoffs",
          "SLA breaches",
          "cost drivers",
          "audit findings",
          "customer impact",
          "compliance gap",
        ],
        [
          ex("BA project", "Mapped procure-to-pay; identified duplicate approvals adding 4-day delay."),
          ex("Initiative", "Quantified invoice error rate driving customer churn risk."),
        ]
      ),
      cluster(
        "Requirements & artifacts",
        "Deliverables.",
        [
          "BRD",
          "FRD",
          "user stories",
          "acceptance criteria",
          "process maps",
          "RACI",
          "traceability",
          "gap analysis",
          "solution options",
          "vendor evaluation",
        ],
        [
          ex("Requirements", "Delivered BRD with 30+ requirements traced to UAT tests."),
          ex("Artifacts", "BPMN diagrams used as single source of truth for automation scope."),
        ]
      ),
      cluster(
        "Analysis & business case",
        "Numbers.",
        [
          "ROI",
          "payback",
          "cost-benefit",
          "risk assessment",
          "scenario modeling",
          "capacity planning",
          "savings",
          "error reduction",
          "cycle time",
          "FTE equivalent",
        ],
        [
          ex("Business case", "ROI model justified RPA with 9-month payback based on hours saved."),
          ex("Analysis", "Scenario planning for staffing under peak season demand."),
        ]
      ),
      cluster(
        "Rollout & change management",
        "Implementation.",
        [
          "UAT",
          "training",
          "cutover",
          "hypercare",
          "communications",
          "change network",
          "adoption metrics",
          "issue triage",
          "rollback plan",
          "handover",
        ],
        [
          ex("Rollout", "Coordinated cutover weekend; hypercare reduced incidents vs. prior launch."),
          ex("Change", "Training cut support tickets 30% post go-live."),
        ]
      ),
      cluster(
        "Systems & integrations",
        "Technical BA.",
        [
          "API",
          "integration",
          "data mapping",
          "migration",
          "Salesforce",
          "SAP",
          "ERP",
          "CRM",
          "validation rules",
          "reconciliation",
        ],
        [
          ex("Integration", "Mapped fields between CRM and billing; eliminated duplicate customer records."),
          ex("Migration", "Data validation scripts catching 2% bad rows pre-cutover."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Frame projects as initiatives with measurable business impact." },
      { section: "experience", advice: "Name stakeholders: finance, ops, IT." },
      { section: "skills", advice: "Tools in skills; project story in experience." },
      { section: "summary", advice: "Industry + project type (digital transformation, ERP) helps ATS." },
      { section: "experience", advice: "Compliance/audit projects: outcomes without confidential details." },
    ],
    [
      "Process jargon without savings or quality metrics.",
      "Requirements projects without sign-off or UAT.",
      "Missing change management when rollout-heavy.",
      "Systems listed without integration role clarity.",
    ]
  ),

  "frontend-developer": page(
    "Project keywords for frontend developer resumes: UX, performance, accessibility, and adoption.",
    "Frontend projects should show user-visible impact: metrics, accessibility, and craft.",
    [
      cluster(
        "User problems & UX outcomes",
        "Why it mattered.",
        [
          "conversion",
          "activation",
          "task completion",
          "drop-off",
          "support tickets",
          "user errors",
          "accessibility barriers",
          "mobile usability",
          "internationalization",
          "performance pain",
        ],
        [
          ex("Frontend project", "Redesigned checkout; reduced abandonment 8% with fewer client-side errors."),
          ex("UX", "Simplified onboarding from 5 steps to 3; improved completion rate."),
        ]
      ),
      cluster(
        "UI engineering & stack",
        "Technical keywords.",
        [
          "React",
          "Next.js",
          "TypeScript",
          "design system",
          "component library",
          "Storybook",
          "server components",
          "responsive layout",
          "animations",
          "forms",
        ],
        [
          ex("Engineering", "Built reusable modal system with focus traps meeting WCAG."),
          ex("Stack", "Next.js app with hybrid rendering for SEO + performance."),
        ]
      ),
      cluster(
        "Performance & quality",
        "Measurable craft.",
        [
          "Core Web Vitals",
          "bundle size",
          "lazy loading",
          "image optimization",
          "caching",
          "profiling",
          "testing",
          "visual regression",
          "error tracking",
          "real user monitoring",
        ],
        [
          ex("Performance", "Cut LCP 45% via image pipeline + font strategy."),
          ex("Quality", "Playwright suite blocked three regressions on critical flows."),
        ]
      ),
      cluster(
        "Accessibility & inclusive design",
        "Many teams filter on this.",
        [
          "WCAG",
          "keyboard",
          "screen reader",
          "ARIA",
          "focus management",
          "color contrast",
          "accessible forms",
          "audit remediation",
          "legal compliance",
          "inclusive design",
        ],
        [
          ex("Accessibility", "Passed WCAG AA audit on checkout after remediation sprint."),
          ex("Inclusive", "Improved screen reader experience on multi-step flows."),
        ]
      ),
      cluster(
        "Analytics & experimentation",
        "Connect UI to product.",
        [
          "event tracking",
          "funnel analysis",
          "A/B test",
          "feature flags",
          "conversion metrics",
          "activation metrics",
          "error rates",
          "session replay",
          "heatmap",
          "iteration",
        ],
        [
          ex("Experiment", "Shipped CTA test; +7% signup conversion with no CLS regression."),
          ex("Analytics", "Fixed broken events inflating activation; restored trustworthy dashboard."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Portfolio projects: link + short metric; keep professional tone." },
      { section: "experience", advice: "Open-source: contribution type (bugfix, feature) + impact." },
      { section: "skills", advice: "Stack keywords echo between skills and project—consistent spelling." },
      { section: "summary", advice: "Highlight flagship UI project if career-defining." },
      { section: "experience", advice: "Mobile/responsive keywords when product is mobile-heavy." },
    ],
    [
      "Pretty UI claims without metrics.",
      "Accessibility claims without audit or user outcome.",
      "No performance numbers for consumer apps.",
      "Generic ‘redesigned website’ without scope.",
    ]
  ),

  "backend-developer": page(
    "Project keywords for backend developer resumes: systems, scale, correctness, and reliability.",
    "Backend projects should emphasize architecture constraints, data, and operational outcomes.",
    [
      cluster(
        "Service scope & domain",
        "What system you built.",
        [
          "payments",
          "billing",
          "identity",
          "notifications",
          "search",
          "recommendations",
          "inventory",
          "risk",
          "compliance logging",
          "integrations",
        ],
        [
          ex("Backend project", "Built ledger service enforcing double-entry invariants for money movement."),
          ex("Domain", "Owned notification pipeline delivering 10M+ emails/day with retries."),
        ]
      ),
      cluster(
        "Architecture & data",
        "Technical depth.",
        [
          "microservice",
          "monolith module",
          "REST",
          "GraphQL",
          "event sourcing",
          "PostgreSQL",
          "Redis",
          "Kafka",
          "idempotency",
          "transactions",
        ],
        [
          ex("Architecture", "Introduced outbox pattern for reliable Kafka publishing."),
          ex("Data", "Designed schema for multi-tenant isolation with performance tests."),
        ]
      ),
      cluster(
        "Scale & performance",
        "Numbers.",
        [
          "RPS",
          "QPS",
          "latency",
          "throughput",
          "fanout",
          "backpressure",
          "pooling",
          "sharding",
          "replication",
          "cost",
        ],
        [
          ex("Scale", "Scaled ingestion to 8k events/sec with partitioning and consumer autoscaling."),
          ex("Latency", "Cut p99 30% via batching and smarter connection pooling."),
        ]
      ),
      cluster(
        "Reliability & incidents",
        "Ops credibility.",
        [
          "SLO",
          "on-call",
          "postmortem",
          "retry",
          "dead letter",
          "chaos",
          "load test",
          "rollback",
          "feature flags",
          "runbooks",
        ],
        [
          ex("Reliability", "Reduced Sev-1 pages 40% via timeouts, bulkheads, and dashboards."),
          ex("Incidents", "Automated rollback playbook cutting MTTR 35%."),
        ]
      ),
      cluster(
        "Security & compliance",
        "Sensitive domains.",
        [
          "encryption",
          "PII",
          "tokenization",
          "OAuth",
          "scopes",
          "audit logs",
          "GDPR",
          "PCI",
          "rate limiting",
          "fraud",
        ],
        [
          ex("Security", "Implemented scoped OAuth for partner APIs with audit trail."),
          ex("Compliance", "PII minimization in logs passing security review."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Projects emphasize correctness for money systems; latency for user-facing." },
      { section: "experience", advice: "Use scale bands if exact numbers confidential." },
      { section: "skills", advice: "Consistent naming: Postgres vs PostgreSQL—match JD." },
      { section: "summary", advice: "Payments/platform/ads domain helps keyword relevance." },
      { section: "experience", advice: "Open-source: focus on merge outcomes, users, or adoption." },
    ],
    [
      "API project without error-handling or scale story.",
      "Security keywords without scope.",
      "No reliability metrics for high-uptime roles.",
      "Vague ‘microservices’ without boundaries.",
    ]
  ),

  "machine-learning-engineer": page(
    "Project keywords for ML engineer resumes: training systems, deployment, and production metrics.",
    "MLE projects must show the production bar: data, training, serving, monitoring.",
    [
      cluster(
        "Modeling objective & constraints",
        "Problem definition.",
        [
          "latency budget",
          "cost budget",
          "precision",
          "recall",
          "calibration",
          "fairness constraints",
          "business metric",
          "online metrics",
          "offline metrics",
          "guardrails",
        ],
        [
          ex("MLE project", "Optimized for precision at fixed latency using distillation + batching."),
          ex("Constraints", "Met fairness thresholds across regions before launch approval."),
        ]
      ),
      cluster(
        "Data & features",
        "System depth.",
        [
          "feature store",
          "training data",
          "label noise",
          "leakage",
          "freshness",
          "skew",
          "data validation",
          "backfill",
          "streaming features",
          "batch features",
        ],
        [
          ex("Features", "Moved transforms to shared library; reduced AUC gap between train and serve."),
          ex("Data", "Daily refresh of features with SLA monitors."),
        ]
      ),
      cluster(
        "Training & experiment tracking",
        "Rigor.",
        [
          "distributed training",
          "experiment tracking",
          "hyperparameter search",
          "ablations",
          "model registry",
          "reproducibility",
          "hardware",
          "GPU utilization",
          "checkpoints",
          "early stopping",
        ],
        [
          ex("Training", "Distributed training cut wall time 40%; tracked runs in MLflow."),
          ex("Experiments", "Ablations justified model choice vs. simpler baseline."),
        ]
      ),
      cluster(
        "Serving & monitoring",
        "Production story.",
        [
          "inference",
          "autoscaling",
          "GPU",
          "batch vs online",
          "monitoring",
          "drift",
          "rollback",
          "shadow",
          "canary",
          "cost",
        ],
        [
          ex("Serving", "Autoscaling inference on GPU from queue depth; held p99 SLO."),
          ex("Monitoring", "Drift alerts triggered retrain reducing incident rate."),
        ]
      ),
      cluster(
        "Cross-team outcomes",
        "Impact.",
        [
          "product launch",
          "revenue",
          "engagement",
          "risk reduction",
          "cost savings",
          "customer satisfaction",
          "compliance",
          "adoption",
          "error reduction",
          "latency improvement",
        ],
        [
          ex("Outcome", "Ranking model launch increased engagement 9% with stable infra costs."),
          ex("Risk", "Fraud model reduced chargebacks 12% quarter over quarter."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "MLE projects need both offline and online story when possible." },
      { section: "experience", advice: "Redact sensitive model details—focus on methodology class." },
      { section: "skills", advice: "Align framework names with what you actually tuned in projects." },
      { section: "summary", advice: "Name domain: ads, recommendations, risk, NLP." },
      { section: "experience", advice: "Kaggle projects: position as rigorous methodology + rank, not only score." },
    ],
    [
      "Notebook metrics only.",
      "No monitoring/drift language.",
      "Missing serving constraints.",
      "Overstating research novelty.",
    ]
  ),

  "devops-engineer": page(
    "Project keywords for DevOps/SRE resumes: automation, reliability, security, and cost.",
    "Platform projects should read like infrastructure initiatives: before/after metrics and scope.",
    [
      cluster(
        "Automation & platform scope",
        "What you built.",
        [
          "self-service",
          "golden paths",
          "templates",
          "IaC modules",
          "CI migration",
          "GitOps",
          "cluster provisioning",
          "policy enforcement",
          "developer portal",
          "service catalog",
        ],
        [
          ex("Platform project", "Self-service namespaces cut ticket volume 40% for internal customers."),
          ex("Automation", "Terraform modules standardized VPC+EKS baselines across accounts."),
        ]
      ),
      cluster(
        "Reliability & observability",
        "SRE outcomes.",
        [
          "SLO",
          "error budget",
          "alert noise",
          "MTTR",
          "MTBF",
          "on-call load",
          "incident rate",
          "postmortems",
          "runbooks",
          "chaos tests",
        ],
        [
          ex("Reliability", "Cut alert noise 50% with SLO-based routing; MTTR down 35%."),
          ex("Observability", "Unified traces reduced time to find root cause in incidents."),
        ]
      ),
      cluster(
        "Security & compliance",
        "Enterprise.",
        [
          "OIDC",
          "secrets",
          "SBOM",
          "image scanning",
          "policy-as-code",
          "SOC2",
          "IAM",
          "network segmentation",
          "audit logs",
          "vulnerability management",
        ],
        [
          ex("Security", "OIDC for CI deploys eliminated static cloud keys."),
          ex("Compliance", "Automated evidence for access reviews quarterly."),
        ]
      ),
      cluster(
        "Cost & efficiency",
        "FinOps.",
        [
          "rightsizing",
          "spot instances",
          "scheduling",
          "storage lifecycle",
          "reserved capacity",
          "tagging",
          "chargeback",
          "waste elimination",
          "throughput per dollar",
          "benchmarking",
        ],
        [
          ex("Cost", "Saved $200k/year via rightsizing and non-prod schedules."),
          ex("Efficiency", "Improved CI cache hit rate cutting compute minutes 45%."),
        ]
      ),
      cluster(
        "Migration & modernization",
        "Big projects.",
        [
          "cloud migration",
          "Kubernetes adoption",
          "CI replacement",
          "monitoring consolidation",
          "logging pipeline",
          "secrets migration",
          "network redesign",
          "disaster recovery",
          "blue-green",
          "rollback strategy",
        ],
        [
          ex("Migration", "Migrated CI from Jenkins to GitHub Actions with parity gates and training."),
          ex("Modernization", "Adopted GitOps with audited rollbacks for production changes."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Platform projects need customers: engineering teams, product, security." },
      { section: "experience", advice: "Quantify developer time saved or incident reduction." },
      { section: "skills", advice: "Tooling names consistent with project narrative." },
      { section: "summary", advice: "SRE vs DevOps vs platform—match job title language." },
      { section: "experience", advice: "Large migrations: risks mitigated (rollback, phased rollout)." },
    ],
    [
      "Infrastructure projects without users or metrics.",
      "Kubernetes adoption without reliability story.",
      "Security tools without enforcement outcomes.",
      "Cost savings without methodology.",
    ]
  ),

  "full-stack-developer": page(
    "Project keywords for full-stack developer resumes: product features, integrations, and full-path outcomes.",
    "Full-stack projects should name the user journey and the layers you touched.",
    [
      cluster(
        "Product feature & user journey",
        "Context.",
        [
          "onboarding",
          "checkout",
          "billing",
          "admin console",
          "search",
          "notifications",
          "settings",
          "permissions",
          "multi-tenant",
          "marketplace",
        ],
        [
          ex("Full-stack project", "Shipped team workspaces across UI, API, and billing with usage-based pricing."),
          ex("Journey", "Reduced onboarding time-to-value with guided setup + backend provisioning."),
        ]
      ),
      cluster(
        "Stack & integration",
        "Technical breadth.",
        [
          "React",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Stripe",
          "OAuth",
          "webhooks",
          "queues",
          "email",
          "file uploads",
        ],
        [
          ex("Integration", "Stripe subscriptions + webhooks with idempotent invoice finalization."),
          ex("Stack", "Next.js + Node API + Postgres with Row Level Security for tenant isolation."),
        ]
      ),
      cluster(
        "Quality & reliability",
        "Shipping safely.",
        [
          "tests",
          "CI",
          "E2E",
          "feature flags",
          "monitoring",
          "error tracking",
          "rollback",
          "migrations",
          "backups",
          "rate limits",
        ],
        [
          ex("Quality", "Playwright E2E for checkout; blocked regressions in CI."),
          ex("Reliability", "Webhook retries with dead-letter queue and replay tooling."),
        ]
      ),
      cluster(
        "Performance & UX metrics",
        "User-visible.",
        [
          "Core Web Vitals",
          "latency",
          "error rate",
          "conversion",
          "activation",
          "task completion",
          "support tickets",
          "cost per transaction",
          "uptime",
          "scalability",
        ],
        [
          ex("Performance", "Improved LCP and reduced API latency for faster checkout."),
          ex("UX", "Cut client errors 30% with validation and better empty states."),
        ]
      ),
      cluster(
        "Business outcomes",
        "Why it mattered.",
        [
          "revenue",
          "conversion",
          "retention",
          "expansion",
          "cost savings",
          "time saved",
          "risk reduction",
          "compliance",
          "customer satisfaction",
          "adoption",
        ],
        [
          ex("Outcome", "Billing project reduced failed payments 22%, recovering $XM ARR."),
          ex("Adoption", "Admin tools cut manual ops time 15 hours/week."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "One strong full-path project beats many shallow ones." },
      { section: "experience", advice: "Side projects: production URL + stack + metric if possible." },
      { section: "skills", advice: "Echo stack between skills and flagship project." },
      { section: "summary", advice: "If strongest project is indie/SaaS, mention customer count or MRR band." },
      { section: "experience", advice: "NDA: describe domain generically with real technical constraints." },
    ],
    [
      "Full-stack claim with single-layer evidence.",
      "No integration story (auth, payments, webhooks).",
      "Missing tests/CI for quality-focused employers.",
      "No business metric on product work.",
    ]
  ),
};
