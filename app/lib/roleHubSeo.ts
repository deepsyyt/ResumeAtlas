import type { RoleSlug } from "@/app/lib/seoPages";

/**
 * Two-line "featured snippet" answers for role hubs: "What is a good {role} resume?"
 */
export function goodResumeSnippet(role: RoleSlug, roleName: string): { line1: string; line2: string } {
  const map: Record<RoleSlug, { line1: string; line2: string }> = {
    "product-manager": {
      line1:
        "A good product manager resume shows product launches, ownership, and metrics (retention, revenue, adoption) with tools like SQL, roadmapping, and experimentation.",
      line2:
        "It should mirror the job description you want: stakeholders, scope, and outcomes, without generic buzzwords.",
    },
    "data-scientist": {
      line1:
        "A good data scientist resume combines Python/SQL, modeling or experimentation, and clear business impact (lift, precision, revenue, or efficiency).",
      line2:
        "Tie every bullet to the posting: statistics, ML, and communication with PMs and stakeholders.",
    },
    "software-engineer": {
      line1:
        "A good software engineer resume proves shipping with stack-specific terms (languages, frameworks, infra) and measurable outcomes (latency, reliability, delivery speed).",
      line2:
        "Avoid laundry lists; show how your code moved metrics or reduced risk for the team.",
    },
    "data-analyst": {
      line1:
        "A good data analyst resume highlights SQL, dashboards, and analysis that changed decisions: funnel metrics, time saved, or revenue impact.",
      line2:
        "Align tools and verbs with the job description so ATS and recruiters see an obvious match.",
    },
    "business-analyst": {
      line1:
        "A good business analyst resume shows requirements, process, and stakeholder work with concrete outcomes: cost savings, cycle time, or adoption.",
      line2:
        "Use the same keywords as the posting: BPMN, SQL, Jira, and executive-ready reporting.",
    },
    "frontend-developer": {
      line1:
        "A good frontend developer resume ties UI work to Core Web Vitals, accessibility, and conversion, plus your React/TypeScript stack in context.",
      line2:
        "Each bullet should read like a shipped feature with a measurable or qualitative user impact.",
    },
    "backend-developer": {
      line1:
        "A good backend developer resume emphasizes APIs, data stores, scale, and reliability: latency, uptime, throughput, or incident reduction.",
      line2:
        "Name the stack from the job description where it matches your experience.",
    },
    "machine-learning-engineer": {
      line1:
        "A good ML engineer resume shows training, deployment, and monitoring (not just model names) with production metrics and tooling.",
      line2:
        "Connect pipelines, evaluation, and business KPIs to the role you are targeting.",
    },
    "devops-engineer": {
      line1:
        "A good DevOps engineer resume shows automation, IaC, CI/CD, and observability with measurable MTTR, deploy frequency, or cost wins.",
      line2:
        "Mirror the posting’s cloud and toolchain (Kubernetes, Terraform, GitHub Actions, etc.).",
    },
    "full-stack-developer": {
      line1:
        "A good full-stack developer resume shows end-to-end delivery across UI, API, and data with stack keywords and shipped outcomes.",
      line2:
        "Balance breadth with depth: what you owned and what changed for users or the business.",
    },
  };
  return map[role] ?? {
    line1: `A good ${roleName.toLowerCase()} resume proves impact with metrics and tools that match the job description.`,
    line2: "Tailor keywords and bullets to each posting. Generic resumes rarely pass ATS.",
  };
}
