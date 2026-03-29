import type { RoleSlug } from "@/app/lib/seoPages";
import type { KeywordIntentContent } from "../types";
import { cluster, ex, page } from "../helpers";

/** Tools & platforms vocabulary for ATS—vendors, clouds, and productized systems */
export const TOOLS_PLATFORMS_BY_ROLE: Record<RoleSlug, KeywordIntentContent> = {
  "data-scientist": page(
    "Tools and platform keywords for data scientist resumes: notebooks, warehouses, experiment systems, and ML platforms.",
    "Job descriptions often name specific vendors and platforms. Match them literally when truthful, and pair each with how you used it (datasets, environments, governance)—not just that it appears on your resume.",
    [
      cluster(
        "Notebooks, IDEs & collaboration",
        "Day-to-day DS work environment.",
        [
          "JupyterLab",
          "VS Code",
          "PyCharm",
          "Git",
          "GitHub",
          "pre-commit hooks",
          "code review",
          "pair programming",
          "internal packages",
          "conda",
        ],
        [
          ex("Jupyter", "Moved critical training paths from ad-hoc notebooks to versioned libraries with tests."),
          ex("Git", "Branching strategy for experiment branches vs. mainline model releases."),
        ]
      ),
      cluster(
        "Warehouses & lakehouse tooling",
        "Where data lives.",
        [
          "Snowflake",
          "BigQuery",
          "Redshift",
          "Databricks",
          "Delta Lake",
          "Iceberg",
          "Hive",
          "Presto",
          "Trino",
          "S3",
        ],
        [
          ex("Snowflake", "Snowflake SQL for cohort features with time-travel debugging."),
          ex("Databricks", "Feature engineering jobs on Spark with job clusters and autoscaling."),
        ]
      ),
      cluster(
        "Experimentation & analytics products",
        "How decisions get made.",
        [
          "Amplitude",
          "Mixpanel",
          "Optimizely",
          "Statsig",
          "Eppo",
          "LaunchDarkly",
          "Google Analytics",
          "Heap",
          "Tableau",
          "Mode",
        ],
        [
          ex("Statsig", "Experiment dashboards with segment slices for localized rollouts."),
          ex("Amplitude", "Funnel instrumentation reviews with PM before launch."),
        ]
      ),
      cluster(
        "ML platforms & deployment",
        "Production touchpoints.",
        [
          "SageMaker",
          "Vertex AI",
          "Azure ML",
          "MLflow",
          "Kubeflow",
          "Ray",
          "Docker",
          "Kubernetes",
          "Airflow",
          "Prefect",
        ],
        [
          ex("SageMaker", "Training and batch transform pipelines with model artifacts versioned."),
          ex("MLflow", "Model registry promotions gated on offline metrics and sign-offs."),
        ]
      ),
      cluster(
        "Cloud primitives & security",
        "How work is secured and scaled.",
        [
          "AWS",
          "IAM",
          "S3",
          "Lambda",
          "ECS",
          "Secrets Manager",
          "VPC",
          "CloudWatch",
          "GCP",
          "BigQuery IAM",
        ],
        [
          ex("AWS", "Least-privilege IAM roles for training jobs accessing specific buckets."),
          ex("Secrets", "Secrets rotation for service credentials used by scoring jobs."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Mirror vendor names from the JD exactly (Snowflake vs snowflake)." },
      { section: "experience", advice: "One bullet per important platform: what you built or fixed there." },
      { section: "skills", advice: "Group by Data / Experimentation / ML Platform / Cloud." },
      { section: "summary", advice: "If you’re cloud-heavy, name primary cloud once." },
      { section: "experience", advice: "Avoid claiming admin access unless true—‘used’ vs ‘owned’ matters." },
    ],
    [
      "Listing cloud services without any workload or scale context.",
      "Copying vendor names from JD into skills with no experience bullets.",
      "Mixing incompatible stacks (every cloud) without clarity.",
      "Ignoring experiment platform names for growth-heavy DS roles.",
    ]
  ),

  "software-engineer": page(
    "Tools and platform keywords for software engineer resumes: cloud, CI, observability, and IDEs.",
    "Engineering postings are often a toolchain list. Your job is to reflect the stack you actually shipped with, aligned to the target company’s stack.",
    [
      cluster(
        "Cloud providers & core services",
        "Literal ATS matches.",
        [
          "AWS",
          "GCP",
          "Azure",
          "S3",
          "EC2",
          "Lambda",
          "CloudFront",
          "RDS",
          "Cloud SQL",
          "IAM",
        ],
        [
          ex("AWS", "RDS Postgres with Multi-AZ and automated failover drills."),
          ex("GCP", "Cloud Run services for bursty workloads with min instances tuned."),
        ]
      ),
      cluster(
        "CI/CD & artifact systems",
        "Delivery tooling.",
        [
          "GitHub Actions",
          "GitLab CI",
          "Jenkins",
          "CircleCI",
          "Argo CD",
          "Spinnaker",
          "Artifactory",
          "npm",
          "pnpm",
          "Docker Registry",
        ],
        [
          ex("GitHub Actions", "Reusable workflows for services with matrix builds."),
          ex("Argo CD", "GitOps deploys with health checks and automated rollback."),
        ]
      ),
      cluster(
        "Observability & APM",
        "Production systems.",
        [
          "Datadog",
          "New Relic",
          "Honeycomb",
          "Prometheus",
          "Grafana",
          "Loki",
          "Sentry",
          "OpenTelemetry",
          "PagerDuty",
          "Opsgenie",
        ],
        [
          ex("Datadog", "APM traces identifying N+1 DB calls in hot endpoints."),
          ex("Sentry", "Release health tracking tied to staged rollouts."),
        ]
      ),
      cluster(
        "Data & messaging platforms",
        "Integration layer.",
        [
          "Kafka",
          "Confluent",
          "RabbitMQ",
          "SQS",
          "Kinesis",
          "Pub/Sub",
          "Elasticsearch",
          "OpenSearch",
          "DynamoDB",
          "Firestore",
        ],
        [
          ex("Kafka", "Clustered consumers with replay tooling for incident recovery."),
          ex("SQS", "FIFO queues for ordered processing with dedupe."),
        ]
      ),
      cluster(
        "Developer experience tooling",
        "How teams ship safely.",
        [
          "GitHub",
          "GitLab",
          "Bitbucket",
          "pre-commit",
          "ESLint",
          "Prettier",
          "SonarQube",
          "CodeQL",
          "feature flags",
          "LaunchDarkly",
        ],
        [
          ex("Feature flags", "Gradual rollouts with targeted segments and kill switches."),
          ex("SonarQube", "Quality gates on security hotspots before merge."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Align cloud provider with target employer when possible." },
      { section: "experience", advice: "Tie platforms to incidents solved, latency removed, cost saved." },
      { section: "skills", advice: "Don’t list three observability tools if you only used one in depth." },
      { section: "summary", advice: "Optional: ‘AWS-focused backend engineer’ if true." },
      { section: "experience", advice: "Mention IaC (Terraform) when platform work is part of your role." },
    ],
    [
      "Kitchen-sink cloud list without services you used.",
      "CI tool listed without pipeline ownership.",
      "APM tools without on-call or debugging story.",
      "Kafka/queue terms without consumer/producer experience.",
    ]
  ),

  "data-analyst": page(
    "Tools and platform keywords for data analyst resumes: BI, warehouses, spreadsheets, and ticketing.",
    "Analyst roles often specify exact BI and warehouse tools. Literal alignment with the posting improves ATS match quality.",
    [
      cluster(
        "BI & visualization platforms",
        "Primary analyst surfaces.",
        [
          "Tableau",
          "Looker",
          "Power BI",
          "Mode",
          "Sigma",
          "Metabase",
          "Qlik",
          "Google Data Studio",
          "ThoughtSpot",
          "Hex",
        ],
        [
          ex("Looker", "LookML refinements for certified revenue metrics."),
          ex("Power BI", "Row-level security for regional sales views."),
        ]
      ),
      cluster(
        "Warehouses & query engines",
        "Where data is queried.",
        [
          "Snowflake",
          "BigQuery",
          "Redshift",
          "Databricks SQL",
          "Presto",
          "Trino",
          "Athena",
          "Synapse",
          "Postgres",
          "Vertica",
        ],
        [
          ex("Snowflake", "Warehouse tuning for large joins on marketing events."),
          ex("BigQuery", "Partitioning and clustering to reduce scan costs."),
        ]
      ),
      cluster(
        "Transformation & orchestration",
        "Analytics engineering overlap.",
        [
          "dbt",
          "Airflow",
          "Fivetran",
          "Stitch",
          "Airbyte",
          "Matillion",
          "Prefect",
          "Dagster",
          "cron",
          "data tests",
        ],
        [
          ex("dbt", "Tests on grain and uniqueness preventing bad dashboard numbers."),
          ex("Fivetran", "Connector issues triaged with vendor and engineering."),
        ]
      ),
      cluster(
        "Collaboration & ticketing",
        "How work flows.",
        [
          "Jira",
          "Linear",
          "Asana",
          "Confluence",
          "Notion",
          "Slack",
          "ServiceNow",
          "Zendesk",
          "Google Sheets",
          "Excel",
        ],
        [
          ex("Jira", "Analytics requests triaged with definition of done and metric owners."),
          ex("Confluence", "Metric dictionary maintained for cross-team alignment."),
        ]
      ),
      cluster(
        "Experimentation & product analytics tools",
        "Growth-oriented analysts.",
        [
          "Amplitude",
          "Mixpanel",
          "Heap",
          "Optimizely",
          "Statsig",
          "Google Analytics 4",
          "Adobe Analytics",
          "Segment",
          "mParticle",
          "Singular",
        ],
        [
          ex("Amplitude", "Cohort charts feeding weekly growth experiment reviews."),
          ex("Segment", "Tracking plan governance reducing schema drift."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Put the BI + warehouse combo from the JD first." },
      { section: "experience", advice: "Show dashboards you owned, not ‘exposure’ to a tool." },
      { section: "skills", advice: "Include dbt/Airflow when job is analytics-engineering-heavy." },
      { section: "summary", advice: "Name primary business domain (marketing, finance, product)." },
      { section: "experience", advice: "Reference ticketing when stakeholder intake is part of the job." },
    ],
    [
      "Listing every BI tool—credibility drops.",
      "Warehouse named without SQL depth in bullets.",
      "No experimentation tools for growth roles.",
      "Ignoring collaboration stack when remote/async-heavy.",
    ]
  ),

  "product-manager": page(
    "Tools and platform keywords for product manager resumes: roadmapping, analytics, design, and delivery.",
    "PM postings mix roadmap tools, analytics, and delivery systems. Reflect what you actually drove—not just where you had a login.",
    [
      cluster(
        "Roadmapping & prioritization tools",
        "Core PM systems.",
        [
          "Productboard",
          "Aha!",
          "Jira Product Discovery",
          "Linear",
          "Asana",
          "Monday.com",
          "Notion",
          "Coda",
          "Roadmunk",
          "ProdPad",
        ],
        [
          ex("Productboard", "Insights linked to feature ideas with opportunity scoring."),
          ex("Jira", "Epics decomposed into stories with clear acceptance criteria."),
        ]
      ),
      cluster(
        "Analytics & experimentation platforms",
        "Data-informed PMs.",
        [
          "Amplitude",
          "Mixpanel",
          "Heap",
          "Pendo",
          "Google Analytics",
          "Statsig",
          "Optimizely",
          "LaunchDarkly",
          "Eppo",
          "Tableau",
        ],
        [
          ex("Pendo", "In-app guides tied to activation milestones."),
          ex("Statsig", "Experiment review with segment-level guardrails."),
        ]
      ),
      cluster(
        "Design & research tools",
        "Discovery craft.",
        [
          "Figma",
          "FigJam",
          "Miro",
          "Dovetail",
          "UserTesting",
          "Hotjar",
          "Zoom",
          "Calendly",
          "Typeform",
          "SurveyMonkey",
        ],
        [
          ex("Figma", "Spec reviews with engineering for feasible MVP scope."),
          ex("Dovetail", "Research synthesis feeding roadmap prioritization."),
        ]
      ),
      cluster(
        "Customer & sales systems",
        "B2B PMs especially.",
        [
          "Salesforce",
          "HubSpot",
          "Gong",
          "Chorus",
          "Zendesk",
          "Intercom",
          "Jira Service Management",
          "Slack",
          "Notion CRM",
          "Vitally",
        ],
        [
          ex("Salesforce", "Opportunity insights informing enterprise roadmap bets."),
          ex("Gong", "Call snippets clarifying buyer objections for positioning."),
        ]
      ),
      cluster(
        "Engineering delivery interfaces",
        "How PMs work with eng.",
        [
          "Jira",
          "GitHub",
          "GitLab",
          "Confluence",
          "Slack",
          "Loom",
          "Shortcut",
          "Azure DevOps",
          "status pages",
          "incident channels",
        ],
        [
          ex("GitHub", "Reviewed PR risk with eng for customer-impacting changes."),
          ex("Incident channels", "Led comms during outage with clear customer messaging."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Prioritize analytics + delivery tools mentioned in JD." },
      { section: "experience", advice: "Connect tools to decisions: cuts, launches, reprioritization." },
      { section: "skills", advice: "Include research tools for discovery-heavy PM roles." },
      { section: "summary", advice: "B2B vs B2C influences which tools matter most." },
      { section: "experience", advice: "Name GTM tools when role partners tightly with sales." },
    ],
    [
      "Every roadmap tool listed with no evidence of prioritization craft.",
      "Analytics tools without metrics you owned.",
      "Missing design collaboration tools for consumer PM roles.",
      "Sales tools ignored for enterprise PM roles.",
    ]
  ),

  "business-analyst": page(
    "Tools and platform keywords for business analyst resumes: requirements, BPM, BI, and enterprise systems.",
    "Enterprise BAs are evaluated on system familiarity. Match the employer’s stack and show implementation or migration exposure.",
    [
      cluster(
        "Requirements & ALM tools",
        "Where work is tracked.",
        [
          "Jira",
          "Azure DevOps",
          "ServiceNow",
          "HP ALM",
          "Rally",
          "VersionOne",
          "Confluence",
          "SharePoint",
          "Smartsheet",
          "Visio",
        ],
        [
          ex("Azure DevOps", "Traceability from requirement to test case for audit."),
          ex("Confluence", "Living BRD with change log for stakeholders."),
        ]
      ),
      cluster(
        "Process modeling & BPM",
        "Process-heavy BAs.",
        [
          "Lucidchart",
          "Visio",
          "Bizagi",
          "Camunda",
          "Appian",
          "Pega",
          "ARIS",
          "Signavio",
          "BPMN",
          "DMN",
        ],
        [
          ex("Lucidchart", "BPMN diagrams used in automation scoping workshops."),
          ex("Camunda", "Process orchestration requirements for human tasks."),
        ]
      ),
      cluster(
        "BI & data tools",
        "Quantitative BAs.",
        [
          "Power BI",
          "Tableau",
          "SQL Server",
          "Oracle",
          "Snowflake",
          "Excel",
          "Power Query",
          "Access",
          "SAP BW",
          "Looker",
        ],
        [
          ex("Power BI", "Certified datasets for finance with row-level security."),
          ex("SQL Server", "Ad hoc queries supporting reconciliation during migration."),
        ]
      ),
      cluster(
        "ERP / CRM platforms",
        "Domain-specific.",
        [
          "SAP",
          "Oracle ERP",
          "NetSuite",
          "Workday",
          "Salesforce",
          "Dynamics 365",
          "ServiceNow",
          "Coupa",
          "Ariba",
          "JDA",
        ],
        [
          ex("SAP", "FI/CO touchpoints mapped for reporting changes."),
          ex("Salesforce", "Lead object changes for marketing alignment."),
        ]
      ),
      cluster(
        "RPA & integration",
        "Automation BAs.",
        [
          "UiPath",
          "Automation Anywhere",
          "Blue Prism",
          "Power Automate",
          "MuleSoft",
          "Boomi",
          "Talend",
          "API management",
          "webhooks",
          "ETL",
        ],
        [
          ex("UiPath", "Exception handling design for invoice bots."),
          ex("MuleSoft", "API-led connectivity for customer 360 initiative."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Lead with ALM + ERP/CRM stack implied by posting." },
      { section: "experience", advice: "Tie platforms to migrations, rollouts, UAT, savings." },
      { section: "skills", advice: "Include BPM/RPA when JD stresses process automation." },
      { section: "summary", advice: "Industry + platform (e.g., SAP finance) helps ATS match." },
      { section: "experience", advice: "Reference audit/compliance when regulated industry." },
    ],
    [
      "ERP names with no module or process context.",
      "RPA tools without exception handling or ROI story.",
      "Generic Jira with no traceability examples.",
      "BI tools listed without dashboard ownership.",
    ]
  ),

  "frontend-developer": page(
    "Tools and platform keywords for frontend developer resumes: bundlers, design handoff, analytics, and deployment.",
    "Frontend postings often specify tooling for build, quality, and delivery. Align nouns and show production usage.",
    [
      cluster(
        "Build tooling & bundlers",
        "Core FE infra.",
        [
          "Webpack",
          "Vite",
          "esbuild",
          "Rollup",
          "Parcel",
          "SWC",
          "Babel",
          "PostCSS",
          "Turborepo",
          "Nx",
        ],
        [
          ex("Vite", "Migrated dev server cutting cold start time dramatically."),
          ex("Webpack", "Split chunks for route-based lazy loading."),
        ]
      ),
      cluster(
        "Design handoff & QA",
        "Collaboration with design.",
        [
          "Figma",
          "Zeplin",
          "Storybook",
          "Chromatic",
          "Percy",
          "Applitools",
          "BrowserStack",
          "Sauce Labs",
          "Playwright",
          "Cypress",
        ],
        [
          ex("Storybook + Chromatic", "Visual regression catching unintended UI drift."),
          ex("Figma", "Dev mode specs reducing CSS rework."),
        ]
      ),
      cluster(
        "Deployment & edge platforms",
        "How FE ships.",
        [
          "Vercel",
          "Netlify",
          "Cloudflare",
          "AWS CloudFront",
          "Fastly",
          "Akamai",
          "S3 static hosting",
          "GitHub Actions",
          "Docker",
          "Kubernetes",
        ],
        [
          ex("Vercel", "Preview deployments per PR for stakeholder review."),
          ex("CloudFront", "Cache policies tuned for HTML vs assets."),
        ]
      ),
      cluster(
        "Analytics & experimentation",
        "Product-connected FE.",
        [
          "Segment",
          "Amplitude",
          "Google Tag Manager",
          "Optimizely",
          "Statsig",
          "LaunchDarkly",
          "FullStory",
          "LogRocket",
          "Sentry",
          "Datadog RUM",
        ],
        [
          ex("Segment", "Tracking plan reducing broken funnel events."),
          ex("Datadog RUM", "Session replays for reproducing client errors."),
        ]
      ),
      cluster(
        "Accessibility & quality scanners",
        "Enterprise FE.",
        [
          "axe",
          "Lighthouse",
          "WAVE",
          "Pa11y",
          "eslint-plugin-jsx-a11y",
          "Stylelint",
          "SonarQube",
          "Dependabot",
          "Renovate",
          "npm audit",
        ],
        [
          ex("eslint-plugin-jsx-a11y", "CI blocking accessibility regressions on components."),
          ex("Lighthouse", "CI budgets for performance and accessibility scores."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Match bundler/hosting to target stack (Vite vs Webpack, Vercel vs Netlify)." },
      { section: "experience", advice: "Connect tools to metrics: CWV, conversion, error rates." },
      { section: "skills", advice: "Include RUM/error tools when JD stresses customer impact." },
      { section: "summary", advice: "Mention design-system work if that’s your strength." },
      { section: "experience", advice: "Storybook/Chromatic pairs well with design-system teams." },
    ],
    [
      "Build tools listed without bundle or performance outcomes.",
      "Analytics tools with no instrumentation ownership.",
      "Accessibility scanners mentioned but no WCAG work.",
      "Deployment tools without CI/CD story.",
    ]
  ),

  "backend-developer": page(
    "Tools and platform keywords for backend developer resumes: cloud services, data platforms, messaging, and observability.",
    "Backend JDs are dense with named services. Match the ones you operated in production.",
    [
      cluster(
        "AWS service vocabulary",
        "Common literal matches.",
        [
          "EC2",
          "ECS",
          "EKS",
          "Lambda",
          "API Gateway",
          "ALB",
          "NLB",
          "RDS",
          "Aurora",
          "DynamoDB",
        ],
        [
          ex("ECS", "Service mesh with sidecars for observability on internal calls."),
          ex("DynamoDB", "Partition key design for hot access patterns."),
        ]
      ),
      cluster(
        "GCP & Azure equivalents",
        "Multi-cloud realism.",
        [
          "Cloud Run",
          "GKE",
          "BigQuery",
          "Cloud SQL",
          "Pub/Sub",
          "Azure Functions",
          "AKS",
          "Cosmos DB",
          "Service Bus",
          "Blob Storage",
        ],
        [
          ex("Cloud Run", "Autoscaling services for bursty webhook traffic."),
          ex("Pub/Sub", "At-least-once consumers with idempotent handlers."),
        ]
      ),
      cluster(
        "Data platforms & search",
        "Backend data systems.",
        [
          "Kafka",
          "Confluent",
          "Redis",
          "Elasticsearch",
          "OpenSearch",
          "Cassandra",
          "MongoDB",
          "CockroachDB",
          "TimescaleDB",
          "ClickHouse",
        ],
        [
          ex("Kafka", "Repartitioning strategy for consumer lag management."),
          ex("Elasticsearch", "Index tuning for query latency vs. write throughput."),
        ]
      ),
      cluster(
        "Observability & APM",
        "Ops-heavy backend.",
        [
          "Datadog",
          "New Relic",
          "Honeycomb",
          "Prometheus",
          "Grafana",
          "Jaeger",
          "Zipkin",
          "OpenTelemetry",
          "Fluent Bit",
          "ELK",
        ],
        [
          ex("Honeycomb", "High-cardinality tracing for rare tail latency events."),
          ex("Prometheus", "SLO burn alerts on critical endpoints."),
        ]
      ),
      cluster(
        "Security & identity platforms",
        "APIs and enterprise.",
        [
          "Auth0",
          "Okta",
          "Cognito",
          "Keycloak",
          "Vault",
          "AWS KMS",
          "CloudHSM",
          "WAF",
          "Shield",
          "Secrets Manager",
        ],
        [
          ex("Auth0", "Rules for progressive profiling and fraud signals."),
          ex("Vault", "Dynamic secrets for CI deploy credentials."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Pick one primary cloud and go deep on its services you used." },
      { section: "experience", advice: "Tie each service to incident, scale, or cost story." },
      { section: "skills", advice: "Include Kafka/ES when JD lists them." },
      { section: "summary", advice: "Payments/fintech → mention auth/KMS/WAF if applicable." },
      { section: "experience", advice: "Avoid listing managed services you only configured once." },
    ],
    [
      "Every AWS service under the sun—signals resume padding.",
      "Kafka without consumer/producer ownership.",
      "Observability tools without on-call/debug usage.",
      "Identity tools without auth domain experience.",
    ]
  ),

  "machine-learning-engineer": page(
    "Tools and platform keywords for ML engineer resumes: training infra, feature stores, registries, and serving.",
    "MLE platforms are rapidly standardizing. Show alignment with MLflow, feature stores, and cloud ML services you actually used.",
    [
      cluster(
        "Cloud ML services",
        "Where models train and deploy.",
        [
          "SageMaker",
          "Vertex AI",
          "Azure ML",
          "Databricks",
          "Ray",
          "Horovod",
          "GCP TPUs",
          "AWS Trainium",
          "Batch",
          "Endpoints",
        ],
        [
          ex("SageMaker", "Training jobs with spot instances and checkpointing."),
          ex("Vertex AI", "Model registry and endpoint traffic splitting."),
        ]
      ),
      cluster(
        "Feature stores & offline/online consistency",
        "Modern ML systems.",
        [
          "Feast",
          "Tecton",
          "Databricks Feature Store",
          "SageMaker Feature Store",
          "Redis",
          "DynamoDB",
          "point-in-time joins",
          "TTL",
          "backfill jobs",
        ],
        [
          ex("Feast", "Online store for low-latency features with monitored freshness."),
          ex("Tecton", "Materialized features with validation on null rates."),
        ]
      ),
      cluster(
        "Orchestration & data pipelines",
        "How training runs.",
        [
          "Airflow",
          "Prefect",
          "Dagster",
          "Luigi",
          "Spark",
          "dbt",
          "Kafka",
          "Flink",
          "Beam",
          "Dataflow",
        ],
        [
          ex("Airflow", "DAGs with SLAs and alerting on upstream delays."),
          ex("Spark", "Large-scale feature backfills with partition pruning."),
        ]
      ),
      cluster(
        "Model registries & experiment tracking",
        "Governance.",
        [
          "MLflow",
          "Weights & Biases",
          "Neptune",
          "Comet",
          "Kubeflow Pipelines",
          "model registry",
          "artifact signing",
          "promotion",
          "approval workflows",
        ],
        [
          ex("MLflow", "Model stages with promotion gates on offline metrics."),
          ex("W&B", "Sweep experiments tracked for reproducibility."),
        ]
      ),
      cluster(
        "Serving & GPU infrastructure",
        "Inference path.",
        [
          "TorchServe",
          "TensorRT",
          "Triton",
          "ONNX Runtime",
          "Knative",
          "KFServing",
          "KServe",
          "NVIDIA GPU",
          "CUDA",
          "autoscaling",
        ],
        [
          ex("Triton", "Dynamic batching configuration for latency/cost tradeoff."),
          ex("TensorRT", "FP16 conversion with accuracy regression checks."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Separate Training / Features / Serving / Ops in your skills section." },
      { section: "experience", advice: "Each platform bullet: workload + metric (latency, cost, quality)." },
      { section: "skills", advice: "Feature store name when JD mentions it explicitly." },
      { section: "summary", advice: "Cloud ML focus helps if employer is AWS/GCP/Azure heavy." },
      { section: "experience", advice: "Registry/tools without governance story feel weak—add promotion criteria." },
    ],
    [
      "SageMaker listed without training or endpoint story.",
      "Feature store buzzword with no leakage or freshness detail.",
      "Experiment tracking tools without reproducibility practices.",
      "Serving tools without latency/cost tradeoffs.",
    ]
  ),

  "devops-engineer": page(
    "Tools and platform keywords for DevOps/SRE resumes: Kubernetes ecosystem, CI, IaC, and observability vendors.",
    "Platform engineering roles are toolchain-heavy. Match the posting and prove operational ownership.",
    [
      cluster(
        "Kubernetes ecosystem",
        "Most common platform layer.",
        [
          "EKS",
          "GKE",
          "AKS",
          "kubeadm",
          "kops",
          "Rancher",
          "OpenShift",
          "Istio",
          "Linkerd",
          "Cilium",
        ],
        [
          ex("EKS", "Managed node groups with spot diversification strategy."),
          ex("Istio", "mTLS between services with gradual rollout."),
        ]
      ),
      cluster(
        "GitOps & delivery",
        "How changes roll out.",
        [
          "Argo CD",
          "Flux",
          "Helm",
          "Kustomize",
          "Spinnaker",
          "Tekton",
          "Harness",
          "Octopus Deploy",
          "Fleet",
          "sealed secrets",
        ],
        [
          ex("Argo CD", "Sync waves for ordered migrations."),
          ex("Helm", "Chart versioning with rollback tested in staging."),
        ]
      ),
      cluster(
        "IaC & cloud provisioning",
        "Foundational.",
        [
          "Terraform",
          "Pulumi",
          "Crossplane",
          "CloudFormation",
          "Ansible",
          "Chef",
          "Puppet",
          "SaltStack",
          "AWS CDK",
          "Bicep",
        ],
        [
          ex("Terraform", "Remote state with locking; modules for org standards."),
          ex("Ansible", "Config drift remediation for baseline images."),
        ]
      ),
      cluster(
        "Observability stacks",
        "Reliability engineering.",
        [
          "Prometheus",
          "Thanos",
          "Cortex",
          "VictoriaMetrics",
          "Grafana",
          "Loki",
          "Tempo",
          "Elastic Stack",
          "Splunk",
          "Datadog",
        ],
        [
          ex("Thanos", "Long-term metrics retention for SLO reporting."),
          ex("Splunk", "Log patterns for incident triage playbooks."),
        ]
      ),
      cluster(
        "Security & policy in CI/CD",
        "Supply chain security.",
        [
          "Trivy",
          "Grype",
          "Snyk",
          "Dependabot",
          "Cosign",
          "Notary",
          "Kyverno",
          "OPA Gatekeeper",
          "Falco",
          "SBOM",
        ],
        [
          ex("Trivy", "Image scans blocking merges on critical CVEs."),
          ex("Cosign", "Signed images verified in admission policy."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Align Kubernetes distro and GitOps tool with employer." },
      { section: "experience", advice: "Quantify reliability improvements: MTTR, frequency, failure rate." },
      { section: "skills", advice: "Include observability vendor when JD lists it." },
      { section: "summary", advice: "SRE vs platform engineer vs DevOps—pick the label the job uses." },
      { section: "experience", advice: "Security scanning tools need policy outcomes, not just installation." },
    ],
    [
      "Kubernetes words without cluster ownership experience.",
      "GitOps tools without sync/rollback story.",
      "Observability stack listed without SLO/on-call usage.",
      "Security scanners without enforcement or policy outcomes.",
    ]
  ),

  "full-stack-developer": page(
    "Tools and platform keywords for full-stack developer resumes: frontend hosting, BaaS, auth, payments, and CI.",
    "Full-stack postings often mix Vercel, Supabase, Stripe, etc. Align with what you shipped end-to-end.",
    [
      cluster(
        "Frontend hosting & edge",
        "Delivery layer.",
        [
          "Vercel",
          "Netlify",
          "Cloudflare Pages",
          "AWS Amplify",
          "S3",
          "CloudFront",
          "Fastly",
          "Firebase Hosting",
          "Render",
          "Fly.io",
        ],
        [
          ex("Vercel", "Edge middleware for auth gating marketing pages."),
          ex("Cloudflare", "WAF rules reducing bot traffic on signup."),
        ]
      ),
      cluster(
        "Auth & identity providers",
        "Common integrations.",
        [
          "Auth0",
          "Clerk",
          "Supabase Auth",
          "Firebase Auth",
          "Cognito",
          "NextAuth",
          "Passport",
          "OAuth",
          "OIDC",
          "SAML",
        ],
        [
          ex("Clerk", "Organization roles and SSO for B2B customers."),
          ex("NextAuth", "Session strategy with secure cookies and CSRF protection."),
        ]
      ),
      cluster(
        "Backend-as-a-service & APIs",
        "Speed layers.",
        [
          "Supabase",
          "Firebase",
          "Appwrite",
          "Hasura",
          "PostgREST",
          "PlanetScale",
          "Neon",
          "Turso",
          "Upstash",
          "Convex",
        ],
        [
          ex("Supabase", "Row-level security policies for multi-tenant data."),
          ex("PlanetScale", "Branching schema changes with safe deploys."),
        ]
      ),
      cluster(
        "Payments & billing platforms",
        "SaaS full-stack.",
        [
          "Stripe",
          "Paddle",
          "Chargebee",
          "Recurly",
          "Braintree",
          "Adyen",
          "PayPal",
          "tax APIs",
          "webhooks",
          "idempotency",
        ],
        [
          ex("Stripe", "Webhook retries with idempotent invoice finalization."),
          ex("Chargebee", "Subscription lifecycle hooks for provisioning."),
        ]
      ),
      cluster(
        "Monorepo & CI for full-stack",
        "How teams coordinate.",
        [
          "Turborepo",
          "Nx",
          "pnpm workspaces",
          "GitHub Actions",
          "GitLab CI",
          "Docker Compose",
          "preview environments",
          "semantic release",
          "changesets",
          "E2E in CI",
        ],
        [
          ex("Turborepo", "Shared UI package consumed by web and admin apps."),
          ex("Preview envs", "Ephemeral DBs for PR testing with seeded data."),
        ]
      ),
    ],
    [
      { section: "skills", advice: "Group by Delivery / Auth / Data / Payments to show breadth cleanly." },
      { section: "experience", advice: "Cross-link layers: UI + API + provider integration + metric." },
      { section: "skills", advice: "Include Stripe/auth when JD lists them—very common." },
      { section: "summary", advice: "SaaS product vs internal tools shifts which platforms matter." },
      { section: "experience", advice: "Preview environments and monorepos signal mature team experience." },
    ],
    [
      "BaaS/auth listed without security or data model depth.",
      "Payments tools without webhook/idempotency literacy.",
      "Hosting listed without performance or caching story.",
      "Monorepo buzzword without shared package ownership.",
    ]
  ),
};
