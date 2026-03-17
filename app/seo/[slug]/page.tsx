import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { RoleSlug } from "@/app/lib/seoPages";

type Topic =
  | "bullet-points"
  | "skills"
  | "summary"
  | "responsibilities"
  | "projects"
  | "experience-examples";

type SeoTopicConfig = {
  topic: Topic;
  topicLabel: string;
  pathSuffix: string;
};

const ROLE_SLUGS: RoleSlug[] = [
  "data-scientist",
  "software-engineer",
  "product-manager",
  "data-analyst",
  "frontend-developer",
  "backend-developer",
  "devops-engineer",
  "business-analyst",
  "machine-learning-engineer",
  "full-stack-developer",
];

const ROLE_NAMES: Record<RoleSlug, string> = {
  "data-analyst": "Data Analyst",
  "data-scientist": "Data Scientist",
  "software-engineer": "Software Engineer",
  "product-manager": "Product Manager",
  "business-analyst": "Business Analyst",
  "frontend-developer": "Frontend Developer",
  "backend-developer": "Backend Developer",
  "machine-learning-engineer": "Machine Learning Engineer",
  "devops-engineer": "DevOps Engineer",
  "full-stack-developer": "Full-Stack Developer",
};

const TOPIC_CONFIGS: SeoTopicConfig[] = [
  { topic: "bullet-points", topicLabel: "Bullet Points", pathSuffix: "bullet-points" },
  { topic: "skills", topicLabel: "Skills", pathSuffix: "skills" },
  { topic: "summary", topicLabel: "Summary", pathSuffix: "summary" },
  { topic: "responsibilities", topicLabel: "Responsibilities", pathSuffix: "responsibilities" },
  { topic: "projects", topicLabel: "Projects", pathSuffix: "projects" },
  { topic: "experience-examples", topicLabel: "Experience Examples", pathSuffix: "experience-examples" },
];

type ParsedSlug = {
  role: RoleSlug;
  topic: Topic;
};

function parseSlug(slug: string): ParsedSlug | null {
  // bullet-points-[role]-resume
  if (slug.startsWith("bullet-points-") && slug.endsWith("-resume")) {
    const rolePart = slug.replace(/^bullet-points-/, "").replace(/-resume$/, "");
    if (ROLE_SLUGS.includes(rolePart as RoleSlug)) {
      return { role: rolePart as RoleSlug, topic: "bullet-points" };
    }
    return null;
  }

  // [role]-resume-[topic]
  for (const cfg of TOPIC_CONFIGS) {
    const suffix = `-resume-${cfg.pathSuffix}`;
    if (slug.endsWith(suffix)) {
      const rolePart = slug.slice(0, slug.length - suffix.length) as RoleSlug;
      if (ROLE_SLUGS.includes(rolePart)) {
        return { role: rolePart, topic: cfg.topic };
      }
    }
  }

  return null;
}

function topicToKeywordPhrase(topic: Topic): string {
  switch (topic) {
    case "bullet-points":
      return "Bullet Points";
    case "skills":
      return "Skills";
    case "summary":
      return "Summary";
    case "responsibilities":
      return "Responsibilities";
    case "projects":
      return "Projects";
    case "experience-examples":
      return "Experience Examples";
    default:
      return "Resume Content";
  }
}

function topicToH1Prefix(topic: Topic): string {
  switch (topic) {
    case "bullet-points":
      return "Resume Bullet Points";
    case "skills":
      return "Resume Skills";
    case "summary":
      return "Resume Summary";
    case "responsibilities":
      return "Resume Responsibilities";
    case "projects":
      return "Resume Projects";
    case "experience-examples":
      return "Resume Experience Examples";
    default:
      return "Resume Content";
  }
}

function topicIntroFragment(topic: Topic): string {
  switch (topic) {
    case "bullet-points":
      return "achievement-driven bullet points that clearly show scope, tools, and business impact.";
    case "skills":
      return "a focused skills section that surfaces the right tools, technologies, and domain expertise.";
    case "summary":
      return "a tight, recruiter-friendly summary that frames your experience and target role in one short paragraph.";
    case "responsibilities":
      return "crisp responsibility lines that reflect what you actually owned without sounding like a copied job description.";
    case "projects":
      return "well-structured projects that highlight the problems you solved, how you built solutions, and what results you achieved.";
    case "experience-examples":
      return "experience bullets that translate your responsibilities into concrete, easy-to-skim achievements.";
    default:
      return "strong resume content tailored to modern hiring workflows.";
  }
}

function topicExplanationHeading(topic: Topic, roleName: string): string {
  switch (topic) {
    case "bullet-points":
      return `What makes a strong ${roleName.toLowerCase()} resume bullet point?`;
    case "skills":
      return `What makes a strong ${roleName.toLowerCase()} resume skills section?`;
    case "summary":
      return `What makes a strong ${roleName.toLowerCase()} resume summary?`;
    case "responsibilities":
      return `What makes strong ${roleName.toLowerCase()} resume responsibilities?`;
    case "projects":
      return `What makes strong ${roleName.toLowerCase()} resume projects?`;
    case "experience-examples":
      return `What makes strong ${roleName.toLowerCase()} resume experience examples?`;
    default:
      return `What makes a strong ${roleName.toLowerCase()} resume?`;
  }
}

function topicExplanationBody(topic: Topic, roleName: string): string[] {
  const base =
    `${roleName} roles are evaluated quickly in ATS and by recruiters. ` +
    "They scan for relevant keywords, clear ownership, and measurable outcomes before deciding whether to read more closely.";

  switch (topic) {
    case "bullet-points":
      return [
        base,
        "A high-performing bullet point starts with a clear action verb, names the tools or techniques you used, and ends with a specific, quantified result. That structure makes it easy for both ATS and humans to understand why your work mattered.",
        "Avoid vague lines like “Worked on data projects” or “Responsible for software development.” Instead, anchor each bullet around a problem, the approach you took, and the concrete impact on revenue, reliability, efficiency, or user experience.",
      ];
    case "skills":
      return [
        base,
        "For the skills section, you want a balance of core technical skills, supporting tools, and domain knowledge. Group skills into logical buckets so hiring teams can verify fit in seconds, then reinforce those same keywords in your bullet points and projects.",
        "Dense keyword stuffing or giant comma-separated lists can backfire. Prioritize skills that are common in strong job descriptions for this role, and remove legacy tools you no longer want to be evaluated on.",
      ];
    case "summary":
      return [
        base,
        "A strong summary is not a generic objective statement. It should position you for a specific type of opportunity, highlight your years of experience, core strengths, and the business value you create.",
        "Keep it to three or four concise sentences. Mention your technical focus, the environments you’ve worked in (startups, enterprise, consulting), and the type of outcomes you repeatedly deliver, such as revenue growth, performance gains, or better decisions.",
      ];
    case "responsibilities":
      return [
        base,
        "Responsibility lines should describe what you consistently owned: systems, stakeholders, metrics, and decision areas. Strong responsibilities read like a clear snapshot of your scope, rather than a copied job posting.",
        "Use wording that reflects how you operated day to day – who you partnered with, the scale of systems or teams, and how your responsibilities evolved over time as you earned more trust.",
      ];
    case "projects":
      return [
        base,
        "Great projects are framed around a meaningful problem, the approach you took, and the business or user impact. That format works for personal, academic, and professional projects.",
        "Recruiters should be able to quickly see where you applied relevant tools, how complex the work was, and what changed after your project shipped or went into production.",
      ];
    case "experience-examples":
      return [
        base,
        "Your experience section is where you prove that you have already operated at the level this role requires. Strong examples go beyond task lists to show ownership, scale, and measurable outcomes in the context of your title and seniority.",
        "Each bullet should answer three questions: what situation or problem you faced, what you did (including tools and collaborators), and what changed because of your work. When those pieces are present, both ATS and hiring managers can quickly understand why you are a strong match.",
      ];
    default:
      return [base];
  }
}

type CategoryId = "ml" | "dataEng" | "analytics" | "leadership";

type BulletCategory = {
  id: CategoryId;
  label: string;
};

const CATEGORIES: BulletCategory[] = [
  { id: "ml", label: "Machine Learning" },
  { id: "dataEng", label: "Data Engineering" },
  { id: "analytics", label: "Analytics" },
  { id: "leadership", label: "Leadership" },
];

function getCategoryLabel(role: RoleSlug, topic: Topic, id: CategoryId): string {
  if (topic === "projects") {
    switch (role) {
      case "data-scientist":
        if (id === "ml") return "Machine Learning Projects";
        if (id === "dataEng") return "Data & Feature Engineering Projects";
        if (id === "analytics") return "Experimentation & Product Analytics Projects";
        if (id === "leadership") return "Stakeholder & Cross-Functional Projects";
        break;
      case "software-engineer":
        if (id === "ml") return "Backend Systems & Services";
        if (id === "dataEng") return "APIs & Integrations";
        if (id === "analytics") return "Performance & Reliability Improvements";
        if (id === "leadership") return "Ownership & Cross-Team Projects";
        break;
      case "product-manager":
        if (id === "ml") return "Product Strategy & Vision Projects";
        if (id === "dataEng") return "Discovery & Research Initiatives";
        if (id === "analytics") return "Experimentation & Metrics Projects";
        if (id === "leadership") return "Roadmap & Go-To-Market Projects";
        break;
      case "data-analyst":
        if (id === "ml") return "Analytics & Experimentation Projects";
        if (id === "dataEng") return "Dashboarding & BI Projects";
        if (id === "analytics") return "Business Performance Analyses";
        if (id === "leadership") return "Stakeholder & Enablement Projects";
        break;
      case "frontend-developer":
        if (id === "ml") return "UI & Frontend Projects";
        if (id === "dataEng") return "Design System & Component Library Work";
        if (id === "analytics") return "UX & Experimentation Projects";
        if (id === "leadership") return "Cross-Functional Delivery Projects";
        break;
      case "backend-developer":
        if (id === "ml") return "Core Services & APIs";
        if (id === "dataEng") return "Data & Storage Projects";
        if (id === "analytics") return "Performance & Reliability Work";
        if (id === "leadership") return "Architecture & Refactoring Projects";
        break;
      case "devops-engineer":
        if (id === "ml") return "Infrastructure & Platform Projects";
        if (id === "dataEng") return "CI/CD & Automation Work";
        if (id === "analytics") return "Monitoring & Observability Projects";
        if (id === "leadership") return "Reliability & Incident Management Initiatives";
        break;
      case "business-analyst":
        if (id === "ml") return "Process & Requirements Projects";
        if (id === "dataEng") return "Reporting & Dashboard Projects";
        if (id === "analytics") return "Business Analysis & Insights";
        if (id === "leadership") return "Stakeholder & Change Management Projects";
        break;
      case "machine-learning-engineer":
        if (id === "ml") return "ML Model & Deployment Projects";
        if (id === "dataEng") return "Feature Pipeline & Data Platform Work";
        if (id === "analytics") return "Evaluation & Experimentation Projects";
        if (id === "leadership") return "ML Platform & Enablement Projects";
        break;
      case "full-stack-developer":
        if (id === "ml") return "End-to-End Product Features";
        if (id === "dataEng") return "Data & API Integration Projects";
        if (id === "analytics") return "Performance & UX Improvements";
        if (id === "leadership") return "Ownership & Cross-Stack Projects";
        break;
    }
  }

  if (topic === "experience-examples") {
    switch (role) {
      case "data-scientist":
        if (id === "ml") return "Core Machine Learning Experience";
        if (id === "dataEng") return "Data & Feature Engineering Experience";
        if (id === "analytics") return "Experimentation & Analytics Experience";
        if (id === "leadership") return "Stakeholder & Leadership Experience";
        break;
      case "software-engineer":
        if (id === "ml") return "Core Engineering Experience";
        if (id === "dataEng") return "APIs, Services & Integrations";
        if (id === "analytics") return "Quality, Performance & Reliability";
        if (id === "leadership") return "Ownership & Collaboration Experience";
        break;
      case "product-manager":
        if (id === "ml") return "Product Strategy & Vision Experience";
        if (id === "dataEng") return "Discovery & Customer Research";
        if (id === "analytics") return "Metrics & Experimentation Experience";
        if (id === "leadership") return "Roadmap & Cross-Functional Leadership";
        break;
      case "data-analyst":
        if (id === "ml") return "Analysis & Insight Experience";
        if (id === "dataEng") return "Data Modeling & BI Experience";
        if (id === "analytics") return "Experimentation & Funnel Analysis";
        if (id === "leadership") return "Stakeholder & Enablement Experience";
        break;
      case "frontend-developer":
        if (id === "ml") return "UI & Frontend Experience";
        if (id === "dataEng") return "Design Systems & Components";
        if (id === "analytics") return "UX, A/B Testing & Analytics";
        if (id === "leadership") return "Collaboration & Delivery Experience";
        break;
      case "backend-developer":
        if (id === "ml") return "Core Backend & Services Experience";
        if (id === "dataEng") return "Databases & Storage Experience";
        if (id === "analytics") return "Performance & Reliability Experience";
        if (id === "leadership") return "Architecture & Mentorship Experience";
        break;
      case "devops-engineer":
        if (id === "ml") return "Infrastructure & Platform Experience";
        if (id === "dataEng") return "CI/CD & Automation Experience";
        if (id === "analytics") return "Monitoring & Observability Experience";
        if (id === "leadership") return "Reliability & Incident Leadership";
        break;
      case "business-analyst":
        if (id === "ml") return "Requirements & Process Experience";
        if (id === "dataEng") return "Reporting & Tooling Experience";
        if (id === "analytics") return "Business Analysis Experience";
        if (id === "leadership") return "Stakeholder & Change Management Experience";
        break;
      case "machine-learning-engineer":
        if (id === "ml") return "ML Engineering Experience";
        if (id === "dataEng") return "Feature Store & Data Pipelines";
        if (id === "analytics") return "Evaluation & Experimentation Experience";
        if (id === "leadership") return "ML Platform & Mentorship Experience";
        break;
      case "full-stack-developer":
        if (id === "ml") return "Full-Stack Feature Experience";
        if (id === "dataEng") return "API & Data Integration Experience";
        if (id === "analytics") return "Performance & UX Experience";
        if (id === "leadership") return "Ownership & Cross-Stack Experience";
        break;
    }
  }

  const base = CATEGORIES.find((c) => c.id === id);
  return base ? base.label : id;
}

function getCategoryIntro(role: RoleSlug, topic: Topic, id: CategoryId): string | null {
  if (topic === "projects") {
    if (role === "data-scientist" && id === "ml") {
      return "Strong machine learning projects show how you framed the business problem, chose an appropriate model or approach, and quantified lift on a metric that matters (retention, revenue, risk). Mention scale, data sources, and how the project influenced a real decision.";
    }
    if (role === "software-engineer" && id === "ml") {
      return "For backend systems and services, recruiters look for reliability, scalability, and clear ownership. Projects should describe the system’s purpose, traffic or throughput, and how your changes improved latency, stability, or developer velocity.";
    }
    if (role === "product-manager" && id === "analytics") {
      return "Experimentation and metrics projects for PMs should highlight the product bets you tested, how you defined success, and what you learned or shipped as a result. Emphasize decisions, not just dashboards.";
    }
    if (role === "devops-engineer" && id === "analytics") {
      return "Monitoring and observability projects should connect specific tooling (e.g. Prometheus, Grafana), SLOs, and the impact on incident response or reliability. Recruiters expect to see before/after metrics like MTTR and incident rates.";
    }
  }

  if (topic === "experience-examples") {
    if (role === "data-analyst" && id === "analytics") {
      return "Analytics experience bullets should connect SQL and BI work to concrete decisions: which funnel, cohort, or campaign you analyzed, what you discovered, and how that changed spend, product focus, or process.";
    }
    if (role === "frontend-developer" && id === "analytics") {
      return "For frontend roles, UX and experimentation experience should tie interface changes to measurable outcomes such as conversion, activation, or task completion rates. Mention the tools you used to measure impact and how you iterated.";
    }
    if (role === "business-analyst" && id === "leadership") {
      return "Leadership experience for business analysts often shows up as facilitation and change management: workshops you ran, processes you redesigned, and how you brought stakeholders along while reducing friction or cost.";
    }
  }

  return null;
}

type BulletExample = {
  categoryId: CategoryId;
  text: string;
};

function buildBulletExamples(role: RoleSlug, topic: Topic): BulletExample[] {
  const roleName = ROLE_NAMES[role];
  const focusPhrase =
    topic === "projects"
      ? "project"
      : topic === "responsibilities"
      ? "responsibility"
      : "bullet";

  switch (role) {
    case "data-scientist":
      return [
        {
          categoryId: "ml",
          text:
            "Designed, trained, and evaluated gradient-boosted models in Python to predict customer churn, " +
            "improving retention by 8% across a base of 120k+ active users and informing lifecycle campaigns.",
        },
        {
          categoryId: "ml",
          text:
            "Ran controlled experiments on recommendation algorithms using offline metrics and online A/B tests, " +
            "lifting click-through rate on suggested content by 11% while keeping latency under 120 ms.",
        },
        {
          categoryId: "dataEng",
          text:
            "Partnered with data engineering to define feature pipelines in SQL and dbt, " +
            "cutting model training time from 6 hours to under 90 minutes and reducing data quality incidents by 40%.",
        },
        {
          categoryId: "analytics",
          text:
            "Owned end-to-end analysis of a new pricing experiment, quantifying a 5% ARR uplift and presenting trade-offs to GTM and finance leaders.",
        },
        {
          categoryId: "analytics",
          text:
            "Built executive-ready dashboards in BI tools to monitor experiment performance and cohort retention, " +
            "shortening decision cycles from monthly to weekly.",
        },
        {
          categoryId: "leadership",
          text:
            "Mentored 3 junior data scientists on experiment design and storytelling, " +
            "resulting in a 25% reduction in analysis re-work and more consistent review quality.",
        },
      ];
    case "software-engineer":
      return [
        {
          categoryId: "ml",
          text:
            "Collaborated with ML engineers to productionize ranking models behind a recommendations API, " +
            "reducing p95 latency by 35% and supporting 4x traffic growth without regressions.",
        },
        {
          categoryId: "dataEng",
          text:
            "Implemented event-driven data pipelines in TypeScript and Node.js, " +
            "streaming application logs into a centralized warehouse and cutting debugging time for incidents by 30%.",
        },
        {
          categoryId: "analytics",
          text:
            "Instrumented key product flows with analytics events, enabling product managers to track activation and upgrade funnels and identify a 12% conversion gap.",
        },
        {
          categoryId: "analytics",
          text:
            "Partnered with data analysts to define clean contracts for tracking, reducing conflicting metrics across dashboards by 40%.",
        },
        {
          categoryId: "leadership",
          text:
            "Led a cross-functional initiative to refactor legacy services, " +
            "retiring 10k+ lines of brittle code and lowering on-call pages for the domain by 45%.",
        },
        {
          categoryId: "leadership",
          text:
            "Coordinated design and code review practices for a squad of 6 engineers, " +
            "improving pull request cycle time from 2.3 days to under 1 day.",
        },
      ];
    case "product-manager":
      return [
        {
          categoryId: "ml",
          text:
            "Prioritized and shipped ML-powered lead scoring in partnership with data science, " +
            "increasing sales-qualified opportunities by 18% without adding headcount.",
        },
        {
          categoryId: "ml",
          text:
            "Defined success metrics and experiment design for personalization features, " +
            "driving a 9% uplift in time-on-site for key customer segments.",
        },
        {
          categoryId: "dataEng",
          text:
            "Partnered with data engineering to standardize product analytics tracking, " +
            "reducing conflicting metrics across teams and unlocking a single source of truth for roadmap decisions.",
        },
        {
          categoryId: "analytics",
          text:
            "Owned a KPI dashboard for the product line (conversion, retention, ARPA), " +
            "using trends to reprioritize roadmap items and recover 6% churn in one quarter.",
        },
        {
          categoryId: "leadership",
          text:
            "Led a cross-functional squad of design, engineering, and marketing to ship a new onboarding flow, " +
            "improving activation rate by 14% across new signups.",
        },
        {
          categoryId: "leadership",
          text:
            "Facilitated quarterly planning sessions, turning a backlog of 100+ ideas into a focused roadmap aligned to company OKRs.",
        },
      ];
    case "data-analyst":
      return [
        {
          categoryId: "ml",
          text:
            "Collaborated with data scientists to productionize a propensity model, " +
            "turning exploratory SQL analyses into a reusable feature set that lifted campaign response rate by 10%.",
        },
        {
          categoryId: "dataEng",
          text:
            "Built and maintained ETL jobs in SQL and dbt, " +
            "reducing dashboard refresh time from overnight to hourly and improving reliability for 30+ stakeholders.",
        },
        {
          categoryId: "dataEng",
          text:
            "Documented warehouse tables and business logic, cutting onboarding time for new analysts by 40%.",
        },
        {
          categoryId: "analytics",
          text:
            "Owned weekly performance reporting for marketing campaigns, " +
            "identifying underperforming channels and reallocating budget to achieve a 17% improvement in ROAS.",
        },
        {
          categoryId: "analytics",
          text:
            "Partnered with product to analyze user funnels, " +
            "proposing UX changes that increased feature adoption by 9% within one release cycle.",
        },
        {
          categoryId: "leadership",
          text:
            "Ran training sessions on SQL best practices for non-analyst stakeholders, " +
            "reducing ad-hoc data requests to the analytics team by 25%.",
        },
      ];
    case "frontend-developer":
      return [
        {
          categoryId: "ml",
          text:
            "Implemented UI components to surface ML-driven recommendations while preserving accessibility, " +
            "increasing engagement with suggested content by 15% for screen-reader users.",
        },
        {
          categoryId: "dataEng",
          text:
            "Integrated frontend events with analytics pipelines, " +
            "ensuring 95%+ tracking coverage across core user journeys in React and Next.js.",
        },
        {
          categoryId: "analytics",
          text:
            "Collaborated with analysts to design event schemas and naming conventions, " +
            "reducing confusion across 50+ dashboards and supporting cleaner experimentation.",
        },
        {
          categoryId: "analytics",
          text:
            "Used A/B testing insights to refine page layouts and call-to-action placement, " +
            "increasing trial-to-signup conversion by 7%.",
        },
        {
          categoryId: "leadership",
          text:
            "Led a frontend performance initiative, " +
            "cutting Largest Contentful Paint from 3.1s to 1.8s and reducing bundle size by 30%.",
        },
        {
          categoryId: "leadership",
          text:
            "Introduced a reusable component library and coding standards, " +
            "shortening average feature implementation time by 20% across the team.",
        },
      ];
    case "backend-developer":
      return [
        {
          categoryId: "ml",
          text:
            "Exposed scalable APIs for ML inference services, " +
            "handling 3M+ monthly predictions with automated retries and structured observability.",
        },
        {
          categoryId: "dataEng",
          text:
            "Designed streaming ingestion pipelines using Kafka and PostgreSQL, " +
            "reducing data latency for downstream analytics from 24 hours to under 10 minutes.",
        },
        {
          categoryId: "dataEng",
          text:
            "Optimized database indices and query patterns, " +
            "cutting p95 response times for critical endpoints by 40% under peak load.",
        },
        {
          categoryId: "analytics",
          text:
            "Collaborated with analytics engineers to define clean data contracts, " +
            "reducing schema-related incidents by 35%.",
        },
        {
          categoryId: "leadership",
          text:
            "Led the decomposition of a monolith into services, " +
            "guiding design reviews and reducing deployment risk for the most critical domain.",
        },
        {
          categoryId: "leadership",
          text:
            "Documented backend APIs and operational runbooks, " +
            "improving incident resolution time by 25%.",
        },
      ];
    case "devops-engineer":
      return [
        {
          categoryId: "ml",
          text:
            "Partnered with ML teams to productionize model deployments on Kubernetes, " +
            "introducing canary rollouts that reduced failed releases by 60%.",
        },
        {
          categoryId: "dataEng",
          text:
            "Automated infrastructure for analytics and data engineering teams using Terraform, " +
            "cutting manual provisioning work by 80%.",
        },
        {
          categoryId: "dataEng",
          text:
            "Implemented CI pipelines that validated schema migrations and data jobs before deploy, " +
            "reducing deployment-related incidents around the warehouse by 30%.",
        },
        {
          categoryId: "analytics",
          text:
            "Rolled out centralized logging and metrics across services, " +
            "giving engineering leads real-time views into error rates and latency.",
        },
        {
          categoryId: "leadership",
          text:
            "Led an SRE-style reliability program, " +
            "defining SLOs and on-call practices that lowered mean time to recovery by 35%.",
        },
        {
          categoryId: "leadership",
          text:
            "Coached product teams on deployment best practices and incident response, " +
            "reducing repeat outages in key services.",
        },
      ];
    case "business-analyst":
      return [
        {
          categoryId: "ml",
          text:
            "Translated outputs from ML churn and propensity models into simple business playbooks, " +
            "helping account managers prioritize outreach and recover 6% of at-risk revenue.",
        },
        {
          categoryId: "dataEng",
          text:
            "Worked with data engineering to define reporting layers and semantic definitions, " +
            "eliminating conflicting KPI definitions across finance and sales.",
        },
        {
          categoryId: "analytics",
          text:
            "Owned weekly business performance reviews, " +
            "analyzing pipeline, bookings, and churn trends and surfacing 3–5 high-impact actions for leadership.",
        },
        {
          categoryId: "analytics",
          text:
            "Built self-serve dashboards that reduced manual slide preparation for monthly business reviews by 50%.",
        },
        {
          categoryId: "leadership",
          text:
            "Facilitated discovery workshops with operations, sales, and product to map current processes and identify automation opportunities worth 1,000+ hours annually.",
        },
        {
          categoryId: "leadership",
          text:
            "Acted as a bridge between technical teams and executives, " +
            "turning complex analytical findings into clear recommendations.",
        },
      ];
    case "machine-learning-engineer":
      return [
        {
          categoryId: "ml",
          text:
            "Built, tuned, and deployed deep learning models for ranking and recommendations, " +
            "driving a 13% increase in engagement on the homepage feed.",
        },
        {
          categoryId: "ml",
          text:
            "Set up automated retraining pipelines with feature stores and model registries, " +
            "reducing manual maintenance work by 60%.",
        },
        {
          categoryId: "dataEng",
          text:
            "Designed data pipelines to generate, validate, and backfill features at scale, " +
            "improving training data freshness from weekly to daily.",
        },
        {
          categoryId: "analytics",
          text:
            "Partnered with analysts to design evaluation metrics and dashboards, " +
            "making it easier to compare candidate models and understand trade-offs.",
        },
        {
          categoryId: "leadership",
          text:
            "Led a small ML platform initiative that standardized monitoring, logging, and deployment practices across 5+ models.",
        },
        {
          categoryId: "leadership",
          text:
            "Mentored junior engineers on production ML best practices, " +
            "reducing incidents tied to model drift and data quality issues.",
        },
      ];
    case "full-stack-developer":
      return [
        {
          categoryId: "ml",
          text:
            "Integrated ML-powered personalization into a full-stack Next.js app, " +
            "increasing repeat session rate by 9% while keeping page load performance within SLO.",
        },
        {
          categoryId: "dataEng",
          text:
            "Implemented end-to-end logging and analytics for new features across frontend and backend, " +
            "giving product teams clear visibility into adoption and funnel drop-off.",
        },
        {
          categoryId: "dataEng",
          text:
            "Designed database schemas and migrations in PostgreSQL, " +
            "supporting a 3x increase in customers without performance regressions.",
        },
        {
          categoryId: "analytics",
          text:
            "Collaborated with analysts to define success metrics and alerts for shipped features, " +
            "catching regressions within hours instead of days.",
        },
        {
          categoryId: "leadership",
          text:
            "Owned several high-impact epics from design to deployment, " +
            "coordinating with stakeholders and delivering consistently within agreed timelines.",
        },
        {
          categoryId: "leadership",
          text:
            "Introduced coding standards and code review templates, " +
            "reducing back-and-forth on pull requests and raising baseline quality.",
        },
      ];
    default:
      return [
        {
          categoryId: "analytics",
          text:
            `Drove impactful ${focusPhrase}s that combined clear problem statements, practical tooling, and measurable outcomes relevant to the target role.`,
        },
      ];
  }
}

type FaqItem = { question: string; answer: string };

function buildFaq(role: RoleSlug, topic: Topic): FaqItem[] {
  const roleName = ROLE_NAMES[role];
  const topicPhrase = topicToKeywordPhrase(topic).toLowerCase();

  return [
    {
      question: `How many ${topicPhrase} should a ${roleName.toLowerCase()} resume have?`,
      answer:
        `Most ${roleName.toLowerCase()} resumes benefit from 4–7 focused ${topicPhrase} per recent role or section. ` +
        "It is better to have fewer, high-quality lines with clear impact than a long list of generic statements. " +
        "Prioritize bullets that align strongly with the job description you are targeting.",
    },
    {
      question: `How do I tailor these examples to a specific ${roleName.toLowerCase()} job description?`,
      answer:
        "Start by highlighting the exact tools, domains, and outcomes that show up in the posting. " +
        "Then adjust the verbs, metrics, and terminology in your own experience so they mirror that language without exaggerating. " +
        "You want the resume to read naturally, but also to echo the most important phrases that ATS and recruiters are scanning for.",
    },
    {
      question: `Can I reuse the same ${topicPhrase} across multiple ${roleName.toLowerCase()} applications?`,
      answer:
        "You can absolutely reuse strong core bullets, but you should keep a tailored version for each type of role or company. " +
        "For example, you might emphasize experimentation and stakeholder storytelling for product-driven companies, " +
        "and highlight tooling, scale, or reliability for more infrastructure-heavy teams.",
    },
    {
      question: "Do I need an ATS-optimized template as well as strong content?",
      answer:
        "Content and formatting work together. A clean, single-column layout with clear headings helps ATS parse your resume correctly, " +
        "while strong, quantified bullets make sure that once parsed, your experience is compelling. " +
        "If you are not sure how your resume performs today, you can paste it into ResumeAtlas and get a free ATS score.",
    },
  ];
}

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const parsed = parseSlug(params.slug);
  if (!parsed) return {};

  const { role, topic } = parsed;
  const roleName = ROLE_NAMES[role];
  const topicPhrase = topicToKeywordPhrase(topic);

  const title =
    topic === "projects"
      ? `${roleName} Resume Projects (ATS-Friendly Examples) | ResumeAtlas`
      : topic === "experience-examples"
      ? `${roleName} Resume Experience Examples (ATS-Friendly Examples) | ResumeAtlas`
      : `${roleName} Resume ${topicPhrase} (ATS-Friendly Examples) | ResumeAtlas`;
  const description =
    topic === "projects"
      ? `Explore ATS-optimized project examples for ${roleName.toLowerCase()} resumes. Includes real projects, impact-focused bullets, and tips to showcase your work effectively.`
      : topic === "experience-examples"
      ? `Explore ATS-optimized experience examples for ${roleName.toLowerCase()} resumes. Includes ready-to-use bullets, guidance, and tips to improve your work history section.`
      : `Explore ATS-optimized ${topicPhrase.toLowerCase()} for ${roleName.toLowerCase()} resumes. Includes real examples, tips, and templates to improve your resume and pass ATS screening.`;

  return {
    title,
    description,
  };
}

export default function SeoSlugPage({ params }: PageProps) {
  const parsed = parseSlug(params.slug);
  if (!parsed) return notFound();

  const { role, topic } = parsed;
  const roleName = ROLE_NAMES[role];
  const topicPhrase = topicToKeywordPhrase(topic);

  const h1 = `${roleName} ${topicToH1Prefix(topic)} (ATS-Optimized Examples)`;

  const intro =
    topic === "projects"
      ? [
          `${roleName} resumes are much stronger when your projects read like mini case studies, not vague side notes at the bottom of the page.`,
          "Recruiters and hiring managers look for projects that mirror the real problems they need solved: data quality, model performance, reliability, UX, or business growth, depending on the role.",
          "This page gives you concrete, ATS-friendly project examples tailored to modern roles, with clear problems, approaches, and measurable outcomes.",
          "Use them as patterns to describe your own work in a way that passes ATS scans and quickly convinces a human reviewer that you can deliver similar results in their environment.",
        ].join(" ")
      : topic === "experience-examples"
      ? [
          `Most ${roleName.toLowerCase()} hiring decisions are made based on your recent work experience section, not your tech stack alone.`,
          "ATS systems and recruiters scan those bullets for ownership, scope, and impact: what you actually did, how you did it, and what changed because of your work.",
          "This page collects ready-to-use, role-specific experience examples you can adapt to your own background, all written in an ATS-friendly, impact-first style.",
          "Treat these examples as scaffolding: copy the structure, then swap in your own tools, domains, and metrics so your resume reads like a clear narrative of your strongest contributions.",
        ].join(" ")
      : [
          `${roleName} hiring managers skim dozens of resumes in minutes, and most are filtered by Applicant Tracking Systems (ATS) before a human ever looks at them.`,
          `This page gives you concrete, ${topicPhrase.toLowerCase()} examples written specifically for modern ${roleName.toLowerCase()} roles, with the right mix of action verbs, tools, and measurable results.`,
          "Use these patterns as a starting point, then adapt them to your own stack, domain, and metrics so your resume reads like evidence for the exact job you want, not a generic template.",
          "Every example here is structured to be friendly to ATS parsing while still sounding natural to recruiters, so you can improve both your score and your chances of getting an interview.",
        ].join(" ");

  const explanationHeading = topicExplanationHeading(topic, roleName);
  const explanationBody = topicExplanationBody(topic, roleName);

  const bullets = buildBulletExamples(role, topic);

  const bulletsByCategory: Record<CategoryId, string[]> = {
    ml: [],
    dataEng: [],
    analytics: [],
    leadership: [],
  };
  for (const b of bullets) {
    bulletsByCategory[b.categoryId].push(b.text);
  }

  const faqItems = buildFaq(role, topic);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;

  const resumeExamplePath = `/${role}-resume-example`;
  const atsKeywordPath = `/ats-keywords/${role}`;
  const hubPath = `/${role}/resume`;
  const canonicalBase = "https://resumeatlas.ai-stack.dev";
  const currentPath = `/seo/${params.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `${roleName} Resume Guide`,
        item: `${canonicalBase}${hubPath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: h1,
        item: `${canonicalBase}${currentPath}`,
      },
    ],
  } as const;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <header className="space-y-3">
          <nav className="text-[11px] sm:text-xs text-slate-500">
            <Link
              href={hubPath}
              className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
            >
              {roleName} Resume Guide
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <span>{topicPhrase}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {roleName} · ATS Optimization
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {h1}
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">{intro}</p>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Last updated: March 2026
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Built for modern ATS like Greenhouse, Lever, and Workday.</span>
            <span className="hidden sm:inline">·</span>
            <span>Optimized for keyword matching, clarity, and impact.</span>
          </div>
        </header>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {explanationHeading}
          </h2>
          {explanationBody.map((p, i) => (
            <p key={i} className="text-sm text-slate-700 leading-relaxed">
              {p}
            </p>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {topicPhrase} examples by category
          </h2>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            Use these examples as inspiration, not copy-paste templates. Adapt the verbs, tools, and
            metrics so they reflect your actual work. Your goal is for a recruiter to be able to
            read any bullet and understand what changed in the business because you did that work.
          </p>

          <div className="mt-6 space-y-6">
            {CATEGORIES.map((cat) => {
              const items = bulletsByCategory[cat.id];
              if (!items || items.length === 0) return null;
              const catIntro = getCategoryIntro(role, topic, cat.id);
              return (
                <div key={cat.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {getCategoryLabel(role, topic, cat.id)}
                  </h3>
                  {catIntro && (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {catIntro}
                    </p>
                  )}
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                    {items.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Copy, tweak, then check with ATS
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-700">
              Take any example above, swap in your own tools, domains, and metrics, then run it
              through the ResumeAtlas checker alongside your target job description to see how well
              it matches.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex text-xs sm:text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              Analyze this bullet with ResumeAtlas →
            </Link>
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            How to customize these examples for a specific job description
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Start by pasting the target job description into a document and highlighting the key
            nouns and verbs: tools, platforms, responsibilities, and business outcomes. Those are
            the phrases your {roleName.toLowerCase()} resume needs to echo in a natural way.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Then, look at each of your own experiences and ask: where have I done something
            similar? Rewrite your bullets to mirror the language of the posting while staying honest
            about your role and scope. If the description emphasizes ownership, show how you drove
            decisions; if it leans on scale, quantify traffic, data volume, or revenue wherever you
            can.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Finally, run your resume through an ATS checker to see whether the most important
            keywords from the posting show up in your {topicPhrase.toLowerCase()}, summary, and work
            history. Iterate until the resume clearly “talks back” to the job description.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            ATS optimization tips for {roleName.toLowerCase()} resumes
          </h2>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700 list-disc pl-5">
            <li>
              Use a clean, single-column layout with standard section headings so ATS parsers can
              reliably extract your experience, skills, and education.
            </li>
            <li>
              Mirror the exact job title, skills, and domain keywords used in the posting where they
              truthfully match your background.
            </li>
            <li>
              Anchor each bullet point around a clear action, the tools or methods you used, and a
              quantified result that matters to the business.
            </li>
            <li>
              Avoid images, text boxes, or overly stylized templates that can break ATS parsing,
              especially for critical sections like experience and skills.
            </li>
            <li>
              Keep acronyms and full names together at least once (for example, “ETL (extract,
              transform, load)”) so both recruiters and machines can understand them.
            </li>
            <li>
              Re-run your resume through ATS tools whenever you significantly change the job type,
              seniority, or domain you are targeting.
            </li>
          </ul>
        </section>

        <section className="mt-10 border border-emerald-100 bg-emerald-50/70 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-emerald-900">
              Check your ATS score for this resume
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-emerald-900/80">
              Paste your resume and the job description into ResumeAtlas to see your ATS score,
              missing keywords, and gaps in your {topicPhrase.toLowerCase()} and experience.
            </p>
          </div>
          <div className="flex-none">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 focus-visible:ring-offset-emerald-50 transition"
            >
              Check your ATS score →
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Related links</h2>
          <p className="mt-2 text-sm text-slate-700">
            Deepen your {roleName.toLowerCase()} resume with these related examples and guides.
            Each resource is designed to work together so you can move from a rough draft to a
            polished, ATS-ready application.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-800 list-disc pl-5">
            <li>
              <Link
                href={resumeExamplePath}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {ROLE_NAMES[role]} resume example
              </Link>
            </li>
            <li>
              <Link
                href={atsKeywordPath}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                ATS keywords for {roleName.toLowerCase()} resumes
              </Link>
            </li>
            <li>
              <Link
                href="/resume-guides/resume-skills-examples"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Resume skills examples
              </Link>
            </li>
            <li>
              <Link
                href="/resume-guides/resume-summary-examples"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Resume summary examples
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-10" id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}

