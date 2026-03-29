import type { RoleSlug } from "@/app/lib/seoPages";

export type RoleContent = {
  tools: string[];
  domainVerbs: string[];
  examplePhrases: string[];
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
  },
  "data-scientist": {
    tools: ["Python", "SQL", "scikit-learn", "XGBoost", "A/B testing"],
    domainVerbs: ["modeled", "experimented", "evaluated", "validated", "forecasted"],
    examplePhrases: [
      "Improved retention by 7% through experiment-backed model updates.",
      "Built churn models and translated findings into lifecycle actions.",
      "Reduced false positives using threshold tuning and calibration analysis.",
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
