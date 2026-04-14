import type { RoleSlug } from "@/app/lib/seoPages";

export type RoleContent = {
  tools: string[];
  domainVerbs: string[];
  examplePhrases: string[];
  topKeywords?: string[];
  exampleBullets?: string[];
  keywordClusters?: {
    backend?: string[];
    frontend?: string[];
    devops?: string[];
    data?: string[];
    tools?: string[];
    concepts?: string[];
  };
  keywordMistakes?: string[];
};

export const ROLE_CONTENT_MAP: Record<RoleSlug, RoleContent> = {
  "software-engineer": {
    tools: ["TypeScript", "Node.js", "AWS", "PostgreSQL", "CI/CD"],
    domainVerbs: ["shipped", "scaled", "refactored", "optimized", "stabilized"],
    examplePhrases: [
      "Reduced API latency by 35% with query and caching improvements.",
      "Shipped production features with feature flags and rollout monitoring.",
      "Improved test reliability by expanding integration and contract coverage.",
    ],
    topKeywords: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "Docker",
      "CI/CD",
      "Unit testing",
      "Integration testing",
      "Performance optimization",
      "Microservices",
    ],
    exampleBullets: [
      "Built and optimized REST APIs in Node.js and PostgreSQL, reducing p95 response latency by 35% for core checkout endpoints.",
      "Implemented CI/CD with GitHub Actions and Docker, cutting average deployment time from 28 to 9 minutes.",
      "Refactored React + TypeScript UI modules, reducing production error rate by 22% and improving Lighthouse performance score by 14 points.",
      "Expanded unit and integration test coverage from 58% to 84%, reducing post-release regressions by 31% quarter-over-quarter.",
      "Designed caching and query-index strategy for high-traffic services, lowering infra cost by 18% without reliability trade-offs.",
    ],
    keywordClusters: {
      backend: ["Node.js", "REST APIs", "GraphQL", "PostgreSQL", "Microservices"],
      frontend: ["React", "Next.js", "TypeScript", "State management", "Web performance"],
      devops: ["AWS", "Docker", "CI/CD", "Monitoring", "Infrastructure as Code"],
    },
    keywordMistakes: [
      "Listing frameworks without showing where you used them in shipped features.",
      "Using generic bullets that omit scale, latency, reliability, or user impact.",
      "Stuffing the skills section with tools that never appear in experience bullets.",
      "Ignoring role-specific keywords from the target job description.",
    ],
  },
  "data-scientist": {
    tools: ["Python", "SQL", "scikit-learn", "XGBoost", "A/B testing"],
    domainVerbs: ["modeled", "experimented", "evaluated", "validated", "forecasted"],
    examplePhrases: [
      "Improved retention by 7% through experiment-backed model updates.",
      "Built churn models and translated findings into lifecycle actions.",
      "Reduced false positives using threshold tuning and calibration analysis.",
    ],
    topKeywords: [
      "Python",
      "SQL",
      "Machine Learning",
      "A/B testing",
      "scikit-learn",
      "XGBoost",
      "TensorFlow",
      "Feature engineering",
      "Model evaluation",
      "Data pipelines",
      "Experiment design",
      "Statistical analysis",
      "Forecasting",
      "NLP",
      "Dashboarding",
    ],
    exampleBullets: [
      "Built machine learning models using Python and XGBoost, improving churn prediction recall by 18% while maintaining precision targets.",
      "Designed and analyzed A/B tests in SQL cohorts, lifting activation by 11% with statistically significant results.",
      "Implemented feature engineering workflows for 12M+ events, reducing model error (MAPE) by 16% quarter-over-quarter.",
      "Automated KPI dashboards and experiment readouts, cutting weekly reporting time from 6 hours to 90 minutes.",
      "Calibrated model thresholds and retraining triggers, reducing false-positive alerts by 24% in production scoring.",
    ],
    keywordClusters: {
      data: ["Python", "SQL", "Machine Learning", "Experimentation", "Model evaluation"],
      tools: ["scikit-learn", "XGBoost", "TensorFlow", "dbt", "Looker"],
      concepts: ["Feature engineering", "A/B testing", "Statistical significance", "Forecasting", "Data quality"],
    },
    keywordMistakes: [
      "Listing ML libraries without tying them to business outcomes.",
      "Using model buzzwords without metrics like lift, precision, recall, or error reduction.",
      "Ignoring experiment and SQL terms repeated in the posting.",
      "Stuffing skills without showing usage in projects or work bullets.",
    ],
  },
  "product-manager": {
    tools: ["Amplitude", "SQL", "Jira", "Figma", "A/B testing"],
    domainVerbs: ["prioritized", "launched", "defined", "aligned", "iterated"],
    examplePhrases: [
      "Prioritized roadmap work tied to activation and retention targets.",
      "Launched onboarding improvements that increased conversion by 10%.",
      "Aligned engineering, design, and GTM around a measurable release plan.",
    ],
  },
  "data-analyst": {
    tools: ["SQL", "Looker", "Tableau", "Excel", "dbt"],
    domainVerbs: ["analyzed", "segmented", "reported", "diagnosed", "benchmarked"],
    examplePhrases: [
      "Identified funnel drop-off and improved activation by 8%.",
      "Built stakeholder dashboards for weekly KPI and cohort reviews.",
      "Standardized reporting definitions across marketing and finance teams.",
    ],
  },
  "business-analyst": {
    tools: ["Power BI", "SQL", "BPMN", "Jira", "Confluence"],
    domainVerbs: ["mapped", "elicited", "translated", "facilitated", "documented"],
    examplePhrases: [
      "Mapped current-state processes and identified automation opportunities.",
      "Translated stakeholder requirements into delivery-ready user stories.",
      "Reduced SLA breaches by clarifying workflow handoffs and ownership.",
    ],
  },
  "frontend-developer": {
    tools: ["React", "Next.js", "TypeScript", "Storybook", "Playwright"],
    domainVerbs: ["implemented", "improved", "instrumented", "tested", "hardened"],
    examplePhrases: [
      "Improved Core Web Vitals and raised conversion on key pages.",
      "Built reusable UI components that reduced duplicate code.",
      "Improved accessibility compliance for keyboard and screen-reader users.",
    ],
  },
  "backend-developer": {
    tools: ["Node.js", "Java", "Redis", "PostgreSQL", "Docker"],
    domainVerbs: ["designed", "secured", "cached", "deployed", "monitored"],
    examplePhrases: [
      "Designed resilient APIs handling high-throughput traffic.",
      "Cut response times with index tuning and cache strategy updates.",
      "Improved deployment reliability with containerized rollout pipelines.",
    ],
  },
  "machine-learning-engineer": {
    tools: ["Python", "PyTorch", "TensorFlow", "MLflow", "Kubernetes"],
    domainVerbs: ["trained", "deployed", "monitored", "retrained", "serving"],
    examplePhrases: [
      "Deployed model inference endpoints with drift monitoring.",
      "Improved precision and recall through feature engineering and tuning.",
      "Reduced model incidents with retraining triggers and data quality checks.",
    ],
  },
  "devops-engineer": {
    tools: ["Terraform", "Kubernetes", "AWS", "Prometheus", "GitHub Actions"],
    domainVerbs: ["automated", "provisioned", "hardened", "observed", "recovered"],
    examplePhrases: [
      "Automated infra provisioning with reusable IaC modules.",
      "Reduced MTTR via observability and incident runbook improvements.",
      "Improved deployment cadence with safer CI/CD release controls.",
    ],
    topKeywords: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "CI/CD",
      "Infrastructure as Code",
      "GitHub Actions",
      "Jenkins",
      "Prometheus",
      "Grafana",
      "Helm",
      "Linux",
      "Bash",
      "Observability",
      "Incident response",
      "SRE",
      "Auto-scaling",
      "Secrets management",
      "Blue-green deployments",
      "Disaster recovery",
    ],
    exampleBullets: [
      "Implemented CI/CD pipelines using GitHub Actions and Docker, reducing average deployment time by 42% while improving rollback safety.",
      "Provisioned reusable Terraform modules for AWS environments, lowering infrastructure setup errors by 60% across teams.",
      "Led Kubernetes auto-scaling and capacity tuning, cutting monthly cloud spend by 18% without SLO regressions.",
      "Built Prometheus and Grafana alerting with runbooks, improving mean time to recovery (MTTR) from 58 to 31 minutes.",
      "Hardened secrets management and release guardrails, eliminating plaintext credential exposure in deployment workflows.",
    ],
    keywordClusters: {
      tools: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "Prometheus", "Grafana"],
      concepts: [
        "CI/CD",
        "Infrastructure as Code",
        "Observability",
        "Incident response",
        "SRE reliability",
        "Release rollback strategy",
      ],
    },
    keywordMistakes: [
      "Keyword stuffing tools without showing reliability or delivery outcomes.",
      "Listing platforms that never appear in experience bullets.",
      "Using vague verbs instead of impact language tied to MTTR, deploy speed, or cost.",
      "Skipping core concepts like IaC, observability, and incident response from the JD.",
    ],
  },
  "full-stack-developer": {
    tools: ["React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs"],
    domainVerbs: ["delivered", "integrated", "refined", "measured", "iterated"],
    examplePhrases: [
      "Delivered end-to-end features across UI, API, and data layers.",
      "Integrated analytics to measure adoption and iterate faster.",
      "Improved reliability and UX through full-stack performance work.",
    ],
  },
};
