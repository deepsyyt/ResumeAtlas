import type { RoleSlug } from "@/app/lib/seoPages";
import { ROLE_CONTENT_MAP } from "@/app/lib/roleContentMap";
import type { ResumeSeoTopic as Topic } from "@/app/lib/resumeTopicTypes";

/** Two extra role-grounded paragraphs inserted after the opening line in topic explanations */
export function getRoleTopicExtraParagraphs(
  role: RoleSlug,
  topic: Topic,
  roleName: string
): string[] {
  const rc = ROLE_CONTENT_MAP[role];
  const tools = rc.tools.slice(0, 4).join(", ");
  const verbs = rc.domainVerbs.slice(0, 3).join(", ");
  const phrase = rc.examplePhrases[0];

  switch (topic) {
    case "bullet-points":
      return [
        `For ${roleName} roles, strong bullets weave tools such as ${tools} with verbs like ${verbs} so ATS and humans see both keyword coverage and ownership.`,
        `Mirror patterns like: ${phrase}—then swap in your own metrics, constraints, and stakeholders.`,
      ];
    case "skills":
      return [
        `Prioritize skills recruiters expect for ${roleName} work: anchor on ${tools}, then reinforce the same terms inside your experience section.`,
        `Your skills block should read like a map of how you deliver work—tied to verbs such as ${verbs}—not a disconnected keyword dump.`,
      ];
    case "summary":
      return [
        `A ${roleName} summary should foreground the outcomes you repeat (${phrase.split(".")[0]}…) and the environments where you used ${tools}.`,
        `Keep the summary tight: one line on scope, one on stack (${tools}), and one on the business value you create.`,
      ];
    case "responsibilities":
      return [
        `For ${roleName} candidates, responsibility lines should show steady ownership of systems and partners—using language around ${verbs} and tools like ${tools}.`,
        `Tie responsibilities to scale and constraints (teams, data volume, SLAs) so they don’t read like pasted job descriptions.`,
      ];
    case "projects":
      return [
        `Project write-ups for ${roleName} resumes should read like mini case studies: problem → approach (${tools}) → measurable outcome, echoing patterns such as ${phrase}`,
        `Highlight cross-functional work explicitly—who you partnered with and what decision changed because of the project.`,
      ];
    case "experience-examples":
      return [
        `Experience bullets for ${roleName} roles win when each line combines tools (${tools}), action (${verbs}), and a quantified result aligned with postings you want.`,
        `Use ${phrase} as a structural template: problem/context, what you did, and what improved for the business or user.`,
      ];
    default:
      return [];
  }
}

/** Three ATS tips that vary by role—replaces identical six-bullet block sitewide */
export function getRoleSpecificAtsTips(role: RoleSlug, roleName: string): string[] {
  switch (role) {
    case "data-scientist":
      return [
        "Spell out experimentation language (A/B tests, guardrails, incrementality) next to modeling terms so ATS sees both stats and product impact.",
        "Pair model keywords with data/pipeline terms where true—freshness, monitoring, drift—to signal production maturity.",
        "Quantify research decisions: baseline, uplift, error rates, or latency budgets—not only offline AUC.",
      ];
    case "software-engineer":
      return [
        "Align API and datastore keywords with reliability signals: latency, uptime, incidents resolved, or test coverage on critical paths.",
        "When listing cloud services, tie each to something you operated: deploys, scaling events, or cost moves you influenced.",
        "Use concrete ownership verbs in bullets (shipped, owned, led) consistent with your actual scope.",
      ];
    case "data-analyst":
      return [
        "Mirror metric-definition language if you governed KPIs: ‘certified metrics’, ‘single source of truth’, ‘semantic layer’.",
        "Combine SQL + BI tool names with stakeholder outcomes: decisions influenced, hours saved, budget shifts.",
        "For growth roles, include experimentation support terms (readouts, holdouts, guardrails) when accurate.",
      ];
    case "product-manager":
      return [
        "Echo discovery and shipping vocabulary: PRDs, rollouts, guardrail metrics—paired with business numbers you moved.",
        "Connect roadmap keywords to evidence: what shipped, in what timeframe, with what adoption or revenue impact.",
        "Keep tools (Jira, Figma, Amplitude) aligned with the posting—ATS often literal-matches product stack.",
      ];
    case "business-analyst":
      return [
        "Use artifact language: BRD, UAT, BPMN, RACI—only where you truly delivered or signed off.",
        "Tie requirements work to measurable change: cycle time, savings, defects, audit findings.",
        "Pair ERP/CRM/system names with integration or process outcomes, not just exposure.",
      ];
    case "frontend-developer":
      return [
        "Blend performance and accessibility keywords (Core Web Vitals, WCAG) with conversion or error-rate outcomes when possible.",
        "Mention bundler/hosting only if production-relevant; tie to metrics like LCP, bundle size, or client error rate.",
        "Connect analytics/experiment hooks to UX outcomes: conversion, activation, task completion.",
      ];
    case "backend-developer":
      return [
        "Anchor bullets in APIs, datastores, and messaging with throughput/latency/incident metrics—not only technology names.",
        "For regulated domains, include correctness/security terms (idempotency, encryption, audit) with scope you owned.",
        "Show on-call or reliability work with MTTR/SLO language when it reflects your experience.",
      ];
    case "machine-learning-engineer":
      return [
        "Balance modeling terms with serving/monitoring terms: latency SLO, drift, batch vs online inference.",
        "Feature pipelines and data quality keywords differentiate MLE from notebook-only profiles.",
        "Connect deployments to cost and reliability tradeoffs—GPU usage, autoscaling, rollback stories.",
      ];
    case "devops-engineer":
      return [
        "Pair CI/CD and IaC keywords with DORA-style outcomes: lead time, deploy frequency, change failure rate, MTTR.",
        "Tie Kubernetes/GitOps terms to cluster patterns you operated—not just buzzwords.",
        "Include security/supply-chain automation (OIDC, image signing) when you enforced policies, not only installed tools.",
      ];
    case "full-stack-developer":
      return [
        "Cross-layer keywords matter: link UI terms to API/data terms in the same bullets when describing features.",
        "Mention integrations (auth, payments, webhooks) with idempotency/retry literacy if you owned them.",
        "Keep testing/CI keywords paired with what they prevented: regressions, incidents, or release risk.",
      ];
    default:
      return [
        `Keep ${roleName.toLowerCase()} keywords aligned with the job description without stuffing unrelated terms.`,
        "Use standard section headings and plain text so ATS parsers extract skills and experience reliably.",
        "Re-check keyword coverage after each major role change or job target shift.",
      ];
  }
}
