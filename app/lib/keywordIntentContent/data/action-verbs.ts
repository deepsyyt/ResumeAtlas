import type { RoleSlug } from "@/app/lib/seoPages";
import type { KeywordIntentContent } from "../types";
import { cluster, ex, page } from "../helpers";

/** Action verbs & phrasing clusters for stronger resume bullets */
export const ACTION_VERBS_BY_ROLE: Record<RoleSlug, KeywordIntentContent> = {
  "data-scientist": page(
    "Action verbs and phrasing for data scientist resumes: modeling, experimentation, and influence.",
    "Strong DS bullets start with verbs that imply ownership and decision impact: designed, owned, led, improved, productionized—not just ‘used’ or ‘helped with’. Use these clusters to upgrade weak phrasing.",
    [
      cluster(
        "Modeling & evaluation verbs",
        "Signals technical depth.",
        [
          "designed",
          "trained",
          "evaluated",
          "calibrated",
          "benchmarked",
          "tuned",
          "regularized",
          "deployed",
          "productionized",
          "monitored",
        ],
        [
          ex("Used ML", "Trained and calibrated gradient-boosted churn models; improved retention lift by 8% with monitored drift."),
          ex("Worked on models", "Owned offline evaluation harness comparing candidate models on business-aligned metrics."),
        ]
      ),
      cluster(
        "Experimentation & causal language",
        "Shows rigor beyond offline metrics.",
        [
          "designed experiments",
          "analyzed results",
          "recommended",
          "validated",
          "quantified incrementality",
          "controlled for",
          "segmented",
          "pre-registered",
          "interpreted",
          "communicated uncertainty",
        ],
        [
          ex("Ran tests", "Designed onboarding experiment with guardrails; recommended ship based on retention + support load."),
          ex("A/B testing", "Analyzed ratio metrics with variance corrections; prevented misleading launch calls."),
        ]
      ),
      cluster(
        "Data & feature engineering verbs",
        "Connects modeling to systems.",
        [
          "engineered features",
          "defined labels",
          "built pipelines",
          "partnered with data engineering",
          "improved data quality",
          "reduced leakage",
          "accelerated training",
          "standardized",
          "documented",
          "audited",
        ],
        [
          ex("Made features", "Partnered with DE to productionize features; cut training-serving skew causing 3pt AUC gap."),
          ex("SQL work", "Authored SQL feature sets with point-in-time correctness for training datasets."),
        ]
      ),
      cluster(
        "Stakeholder & leadership verbs",
        "Senior DS signals.",
        [
          "presented",
          "influenced",
          "aligned",
          "prioritized",
          "mentored",
          "defined success metrics",
          "facilitated",
          "translated",
          "negotiated trade-offs",
          "drove adoption",
        ],
        [
          ex("Good communication", "Presented model trade-offs to exec team; aligned on precision/recall targets for compliance."),
          ex("Helped team", "Mentored two analysts on experiment design; reduced review cycle time."),
        ]
      ),
      cluster(
        "Weak verbs to avoid (replace with specifics)",
        "ATS may still parse them, but humans won’t be impressed.",
        [
          "helped",
          "assisted",
          "involved in",
          "responsible for",
          "worked on",
          "familiar with",
          "exposed to",
          "various",
          "multiple",
          "general",
        ],
        [
          ex("Responsible for modeling", "Owned end-to-end churn modeling from label definition to production monitoring."),
          ex("Worked on data projects", "Built pricing response models informing discount strategy across regions."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Start bullets with a strong verb + scope + tool + metric (in any readable order)." },
      { section: "summary", advice: "Use 1–2 leadership verbs only if backed by bullets." },
      { section: "experience", advice: "Replace ‘utilized’ with ‘used’ sparingly—prefer ‘built’, ‘shipped’, ‘cut’." },
      { section: "skills", advice: "Skills lines are noun-heavy; verbs belong in experience." },
      { section: "experience", advice: "Pair experimentation verbs with guardrail metrics when relevant." },
    ],
    [
      "Repeating the same verb ten times—vary with synonyms but keep accuracy.",
      "Inflating seniority with ‘led’ when you contributed as IC.",
      "Vague verbs with no numbers: ‘improved model’ without metric or baseline.",
      "Buzz verbs (‘synergized’) that read as filler.",
    ]
  ),

  "software-engineer": page(
    "Action verbs for software engineer resumes: shipping, ownership, and reliability.",
    "Engineering hiring managers scan for verbs that imply ownership and impact: shipped, reduced, designed, led, migrated. Weak verbs hide scope.",
    [
      cluster(
        "Shipping & delivery verbs",
        "Core SWE story.",
        [
          "shipped",
          "implemented",
          "designed",
          "refactored",
          "migrated",
          "rolled out",
          "owned",
          "led",
          "delivered",
          "cut over",
        ],
        [
          ex("Developed features", "Shipped billing API migration with zero-downtime cutover and 40% latency reduction."),
          ex("Worked on backend", "Designed idempotent webhook processor handling 2M events/day."),
        ]
      ),
      cluster(
        "Performance & reliability verbs",
        "Shows seniority.",
        [
          "optimized",
          "profiled",
          "reduced latency",
          "improved uptime",
          "eliminated",
          "hardened",
          "load tested",
          "fixed memory leaks",
          "tuned",
          "scaled",
        ],
        [
          ex("Made it faster", "Profiled hot path; reduced p95 latency 28% via caching and query fixes."),
          ex("Improved reliability", "Cut incident rate 35% with SLOs, alerts, and postmortem follow-through."),
        ]
      ),
      cluster(
        "Quality & safety verbs",
        "Modern engineering expectations.",
        [
          "added tests",
          "increased coverage",
          "caught regressions",
          "automated",
          "instrumented",
          "added observability",
          "flagged",
          "canaried",
          "rolled back",
          "patched",
        ],
        [
          ex("Testing", "Expanded integration tests around payment edge cases; prevented three regressions pre-prod."),
          ex("Monitoring", "Instrumented traces linking API to DB spans; cut MTTR during incidents."),
        ]
      ),
      cluster(
        "Collaboration verbs (specific, not vague)",
        "How you work with others.",
        [
          "partnered with",
          "aligned with",
          "coordinated",
          "reviewed",
          "mentored",
          "documented",
          "presented design",
          "negotiated scope",
          "unblocked",
          "facilitated",
        ],
        [
          ex("Team player", "Partnered with PM/design to scope MVP; delivered incremental releases behind flags."),
          ex("Collaborated", "Led design review for auth refactor with security and mobile stakeholders."),
        ]
      ),
      cluster(
        "Weak phrasing to avoid",
        "Common resume padding.",
        [
          "assisted with",
          "helped with",
          "participated in",
          "involved in",
          "supported",
          "general development",
          "various tasks",
          "learned",
          "exposed to",
        ],
        [
          ex("Participated in agile ceremonies", "Owned sprint outcomes for payments domain; shipped two releases with zero Sev-1 incidents."),
          ex("Supported production", "Owned on-call rotation; reduced repeat incidents via runbook updates."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Lead with outcome when possible: ‘Cut costs 18% by…’ then how." },
      { section: "experience", advice: "Use ‘owned’ when you had end-to-end accountability—not for small tasks." },
      { section: "summary", advice: "Strong opener: years + domain + specialty (APIs, infra, product eng)." },
      { section: "skills", advice: "Keep verbs out of skills unless ‘public speaking’-style soft skills." },
      { section: "experience", advice: "Quantify: latency, uptime, cost, incidents, throughput." },
    ],
    [
      "Same verb repeated every bullet—readability suffers.",
      "Overclaiming ‘architected’ for small changes.",
      "Buzzwords without evidence: ‘innovated’, ‘synergized’.",
      "Passive voice hiding ownership: ‘was responsible for’.",
    ]
  ),

  "data-analyst": page(
    "Action verbs for data analyst resumes: analysis, reporting, and enabling decisions.",
    "Analyst bullets should sound like ownership of insights: diagnosed, quantified, recommended—not only ‘created reports’.",
    [
      cluster(
        "Analysis & diagnostic verbs",
        "Core analyst impact.",
        [
          "analyzed",
          "diagnosed",
          "quantified",
          "segmented",
          "benchmarked",
          "forecasted",
          "reconciled",
          "validated",
          "investigated",
          "root-caused",
        ],
        [
          ex("Analyzed data", "Diagnosed activation drop to onboarding step 3; recommended UX test that recovered 8% activation."),
          ex("Looked at metrics", "Segmented cohorts by channel; reallocated spend improving ROAS 17%."),
        ]
      ),
      cluster(
        "Reporting & enablement verbs",
        "How insights spread.",
        [
          "built dashboards",
          "automated reporting",
          "standardized metrics",
          "documented definitions",
          "trained stakeholders",
          "enabled self-serve",
          "presented findings",
          "facilitated reviews",
          "supported planning",
          "tracked KPIs",
        ],
        [
          ex("Made reports", "Automated weekly KPI pack; saved 8 hours/month and reduced definition disputes."),
          ex("Dashboards", "Built self-serve Looker explores for PMs with certified fields."),
        ]
      ),
      cluster(
        "Experiment support verbs",
        "Growth analysts.",
        [
          "supported experiments",
          "validated results",
          "defined metrics",
          "monitored guardrails",
          "sliced results",
          "summarized readouts",
          "recommended next steps",
          "tracked adoption",
          "measured lift",
          "checked for bias",
        ],
        [
          ex("Helped with A/B tests", "Defined primary and guardrail metrics; analyzed ratio metrics with appropriate variance."),
          ex("Ran analysis", "Recommended rollout pause when guardrail metric degraded."),
        ]
      ),
      cluster(
        "Process improvement verbs",
        "BA/analyst hybrid.",
        [
          "identified inefficiencies",
          "proposed process changes",
          "reduced manual work",
          "improved accuracy",
          "cut turnaround time",
          "streamlined",
          "documented workflows",
          "partnered with ops",
          "tracked savings",
          "implemented controls",
        ],
        [
          ex("Improved process", "Cut manual reconciliation time 40% with automated checks and exception queues."),
          ex("Worked with ops", "Partnered on SLA dashboard; reduced breaches by clarifying ownership."),
        ]
      ),
      cluster(
        "Weak analyst phrasing",
        "Replace with specifics.",
        [
          "helped",
          "assisted",
          "supported reporting",
          "data entry",
          "general analysis",
          "various ad hoc",
          "looked at",
          "touched",
          "familiar with",
        ],
        [
          ex("Ad hoc analysis", "Owned weekly funnel diagnostic; surfaced three actionable issues for product each sprint."),
          ex("Helped finance", "Reconciled revenue definitions across systems; eliminated $XM variance in quarterly close."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Tie verbs to decisions: recommended, influenced, changed budget/roadmap." },
      { section: "experience", advice: "Prefer active voice: ‘Built’ over ‘Was responsible for building’." },
      { section: "summary", advice: "Use one strong verb in opening: diagnosed, owned, scaled, led." },
      { section: "skills", advice: "Keep verbs in experience; skills stay nouns." },
      { section: "experience", advice: "Pair ‘quantified’ with actual numbers whenever possible." },
    ],
    [
      "‘Analyzed’ without what changed because of the analysis.",
      "Reporting verbs without audience or decision context.",
      "Buzz stacks: ‘leveraged insights’ with no metric.",
      "Passive voice: ‘was tasked with’.",
    ]
  ),

  "product-manager": page(
    "Action verbs for product manager resumes: discovery, prioritization, and shipping.",
    "PM resumes should emphasize decisions and outcomes: prioritized, shipped, launched, defined metrics—not ‘managed’ everything.",
    [
      cluster(
        "Discovery & problem framing verbs",
        "Customer insight.",
        [
          "interviewed users",
          "synthesized research",
          "framed problems",
          "hypothesized",
          "validated assumptions",
          "prioritized opportunities",
          "defined scope",
          "wrote PRDs",
          "aligned stakeholders",
          "ran discovery",
        ],
        [
          ex("Talked to customers", "Interviewed 25 enterprise buyers; reframed onboarding as an activation problem, shifting roadmap focus."),
          ex("Research", "Synthesized qualitative feedback into prioritized problem themes with sizing."),
        ]
      ),
      cluster(
        "Prioritization & strategy verbs",
        "Roadmap ownership.",
        [
          "prioritized",
          "sequenced",
          "cut scope",
          "negotiated trade-offs",
          "defined OKRs",
          "aligned roadmap",
          "sunset",
          "replatformed",
          "invested in",
          "deprioritized",
        ],
        [
          ex("Managed backlog", "Reprioritized roadmap using RICE; cut two low-impact initiatives freeing two quarters."),
          ex("Strategy", "Defined multi-quarter bet on self-serve tied to ARR and activation KPIs."),
        ]
      ),
      cluster(
        "Shipping & metrics verbs",
        "Outcomes, not activity.",
        [
          "shipped",
          "launched",
          "rolled out",
          "improved activation",
          "increased retention",
          "grew revenue",
          "reduced churn",
          "expanded",
          "instrumented",
          "measured impact",
        ],
        [
          ex("Launched features", "Shipped onboarding redesign; improved activation 11% with staged rollout and guardrails."),
          ex("Drove metrics", "Owned KPI dashboard; used trends to reprioritize roadmap items recovering 6% churn."),
        ]
      ),
      cluster(
        "Cross-functional leadership verbs",
        "How PMs work.",
        [
          "aligned engineering",
          "partnered with design",
          "coordinated GTM",
          "facilitated decisions",
          "resolved conflicts",
          "unblocked",
          "communicated trade-offs",
          "ran reviews",
          "managed expectations",
          "drove adoption",
        ],
        [
          ex("Worked with teams", "Aligned eng/design on MVP scope meeting latency budget and analytics plan."),
          ex("Stakeholder management", "Facilitated exec decision on pricing change with clear risk summary."),
        ]
      ),
      cluster(
        "Weak PM phrasing",
        "Replace with outcomes.",
        [
          "helped the team",
          "supported launches",
          "involved in roadmap",
          "attended meetings",
          "general PM duties",
          "worked on strategy",
          "various initiatives",
          "assisted sales",
        ],
        [
          ex("Helped launch", "Owned GTM checklist: docs, training, support macros—launch hit adoption targets week one."),
          ex("Worked on roadmap", "Prioritized three initiatives based on opportunity sizing and strategic fit."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Every bullet: decision or shipped outcome + metric + timeframe when possible." },
      { section: "summary", advice: "Strong verbs: shipped, launched, grew, reduced, defined—paired with domain." },
      { section: "experience", advice: "Avoid ‘responsible for’—use owned/led/drove where appropriate." },
      { section: "skills", advice: "PM skills are tools; verbs belong in experience." },
      { section: "experience", advice: "Show trade-offs: cut, deprioritized, sequenced." },
    ],
    [
      "Buzzwords: ‘visionary leader’ without shipped outcomes.",
      "‘Managed stakeholders’ with no conflict or decision.",
      "Activity lists: meetings attended without impact.",
      "Same verbs repeated without variety.",
    ]
  ),

  "business-analyst": page(
    "Action verbs for business analyst resumes: elicitation, documentation, and change.",
    "BA bullets should emphasize facilitation: elicited, documented, validated, facilitated—paired with artifacts and savings.",
    [
      cluster(
        "Elicitation & facilitation verbs",
        "Core BA work.",
        [
          "elicited requirements",
          "facilitated workshops",
          "interviewed stakeholders",
          "documented",
          "mapped processes",
          "validated assumptions",
          "signed off",
          "prioritized needs",
          "translated",
          "aligned teams",
        ],
        [
          ex("Gathered requirements", "Facilitated workshops producing signed BRD for billing with 14 acceptance criteria."),
          ex("Talked to stakeholders", "Elicited pain points from finance; translated into user stories for two squads."),
        ]
      ),
      cluster(
        "Analysis & quantification verbs",
        "When BAs quantify outcomes.",
        [
          "quantified savings",
          "estimated ROI",
          "benchmarked",
          "modeled scenarios",
          "reconciled",
          "validated data",
          "identified gaps",
          "assessed risks",
          "tracked benefits",
          "measured adoption",
        ],
        [
          ex("Analysis", "Quantified automation ROI; secured funding for RPA reducing 1,000+ hours annually."),
          ex("Benchmarked", "Compared vendor SLAs; recommended switch saving $200k/year."),
        ]
      ),
      cluster(
        "Change & rollout verbs",
        "Implementation BAs.",
        [
          "supported UAT",
          "coordinated rollout",
          "trained users",
          "managed change",
          "cut over",
          "monitored adoption",
          "resolved defects",
          "triage",
          "documented runbooks",
          "handed off",
        ],
        [
          ex("UAT", "Ran structured UAT with defect triage by severity; achieved sign-off before cutover."),
          ex("Training", "Delivered playbooks reducing post-launch support tickets 30%."),
        ]
      ),
      cluster(
        "Governance & compliance verbs",
        "Enterprise-heavy BAs.",
        [
          "ensured compliance",
          "audited controls",
          "documented traceability",
          "maintained RACI",
          "reviewed policies",
          "mitigated risks",
          "tracked approvals",
          "supported audits",
          "enforced standards",
          "managed exceptions",
        ],
        [
          ex("Compliance", "Mapped controls to requirements for SOX audit; zero findings on traceability."),
          ex("Governance", "Maintained RACI for cross-functional workflow reducing handoff delays."),
        ]
      ),
      cluster(
        "Weak BA phrasing",
        "Replace with artifacts.",
        [
          "helped projects",
          "supported business",
          "general analysis",
          "made slides",
          "attended meetings",
          "miscellaneous tasks",
          "familiar with BPMN",
          "worked on requirements",
        ],
        [
          ex("Supported project", "Owned BRD sections for order-to-cash; drove sign-off across finance and ops."),
          ex("Made documentation", "Published process maps used as baseline for automation vendor RFP."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Link verbs to artifacts: BRD, process map, dashboard, UAT plan." },
      { section: "experience", advice: "Quantify: hours saved, dollars, defects, cycle time." },
      { section: "summary", advice: "Name domains: finance, healthcare, supply chain." },
      { section: "skills", advice: "Verbs belong in bullets; tools stay in skills." },
      { section: "experience", advice: "Use ‘facilitated’ when you led workshops, not just attended." },
    ],
    [
      "Vague ‘communication skills’ without facilitation examples.",
      "Requirements verbs without sign-off or acceptance criteria.",
      "Missing UAT/change verbs for rollout-heavy roles.",
      "Passive voice hiding ownership.",
    ]
  ),

  "frontend-developer": page(
    "Action verbs for frontend developer resumes: shipping UI, performance, and accessibility.",
    "Frontend bullets should show craft: implemented, improved, optimized, instrumented—with measurable UX impact.",
    [
      cluster(
        "UI implementation verbs",
        "Shipping features.",
        [
          "implemented",
          "shipped",
          "built",
          "refactored",
          "migrated",
          "rolled out",
          "designed components",
          "integrated APIs",
          "hardened",
          "fixed",
        ],
        [
          ex("Developed UI", "Implemented checkout redesign in React; lifted conversion 6% with staged A/B rollout."),
          ex("Worked on frontend", "Built accessible modal flows with focus management passing WCAG audit."),
        ]
      ),
      cluster(
        "Performance & quality verbs",
        "Core Web Vitals story.",
        [
          "optimized",
          "reduced bundle size",
          "improved LCP",
          "improved INP",
          "lazy loaded",
          "code split",
          "memoized",
          "profiled",
          "cached",
          "prefetched",
        ],
        [
          ex("Made site faster", "Cut LCP from 3.1s to 1.8s via image pipeline and route-level code splitting."),
          ex("Performance work", "Profiled renders; reduced unnecessary re-renders 60% on data-heavy tables."),
        ]
      ),
      cluster(
        "Accessibility & testing verbs",
        "Inclusive product teams.",
        [
          "fixed accessibility issues",
          "added ARIA",
          "improved keyboard navigation",
          "added tests",
          "caught regressions",
          "automated checks",
          "audited",
          "remediated",
          "verified",
          "documented patterns",
        ],
        [
          ex("Accessibility", "Remediated WCAG AA violations in checkout; raised automated axe score to 100."),
          ex("Testing", "Added Playwright flows for critical paths blocking regressions in CI."),
        ]
      ),
      cluster(
        "Analytics & experimentation verbs",
        "Product-connected FE.",
        [
          "instrumented",
          "tracked events",
          "ran experiments",
          "measured conversion",
          "analyzed funnels",
          "iterated",
          "validated",
          "rolled back",
          "segmented",
          "improved activation",
        ],
        [
          ex("Analytics", "Instrumented onboarding funnel; identified step with highest drop-off for redesign."),
          ex("A/B test", "Shipped CTA experiment increasing signup conversion 7% with no CLS regression."),
        ]
      ),
      cluster(
        "Weak FE phrasing",
        "Replace with specifics.",
        [
          "worked on UI",
          "made changes",
          "HTML/CSS",
          "React stuff",
          "helped with website",
          "general frontend",
          "familiar with",
          "responsive design (only)",
        ],
        [
          ex("Worked on React", "Built reusable table component with virtualization handling 50k rows smoothly."),
          ex("Frontend tasks", "Owned performance initiative cutting bundle size 30% and improving CWV scores."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Pair UI verbs with metrics: conversion, CWV, error rate, tickets." },
      { section: "summary", advice: "Mention specialty: design systems, growth, B2B apps." },
      { section: "experience", advice: "Use ‘shipped’ when you owned release outcomes." },
      { section: "skills", advice: "Verbs in experience; skills list libraries." },
      { section: "experience", advice: "Accessibility verbs need audit or user-impact context." },
    ],
    [
      "Pretty UI claims without metrics.",
      "‘Optimized’ without before/after.",
      "Accessibility verbs without WCAG context.",
      "Repeated ‘developed’ every bullet.",
    ]
  ),

  "backend-developer": page(
    "Action verbs for backend developer resumes: APIs, data, reliability, and scale.",
    "Backend bullets should sound like systems ownership: designed, scaled, hardened, reduced incidents.",
    [
      cluster(
        "API & service verbs",
        "Core backend.",
        [
          "designed",
          "implemented",
          "shipped",
          "scaled",
          "hardened",
          "deprecated",
          "versioned",
          "migrated",
          "split",
          "integrated",
        ],
        [
          ex("Built APIs", "Designed versioned REST APIs with idempotent writes for payment retries."),
          ex("Worked on services", "Migrated monolith module to service; reduced deploy risk for billing domain."),
        ]
      ),
      cluster(
        "Data & performance verbs",
        "Database-heavy roles.",
        [
          "optimized queries",
          "added indexes",
          "reduced latency",
          "improved throughput",
          "tuned pools",
          "sharded",
          "replicated",
          "backfilled",
          "migrated schemas",
          "validated consistency",
        ],
        [
          ex("Database work", "Cut p95 query time 40% via index redesign and elimination of N+1 calls."),
          ex("Optimized", "Reduced DB load 25% with caching and batching for hot endpoints."),
        ]
      ),
      cluster(
        "Reliability & incident verbs",
        "SRE-adjacent backend.",
        [
          "reduced incidents",
          "improved MTTR",
          "added SLOs",
          "automated runbooks",
          "fixed root causes",
          "hardened",
          "load tested",
          "chaos tested",
          "on-call",
          "postmortemed",
        ],
        [
          ex("On-call", "Drove postmortems with tracked actions; cut repeat incidents 50% in domain."),
          ex("Reliability", "Defined SLOs and alerts tied to customer journeys."),
        ]
      ),
      cluster(
        "Security & correctness verbs",
        "Sensitive domains.",
        [
          "implemented auth",
          "enforced authorization",
          "rotated secrets",
          "audited access",
          "encrypted",
          "mitigated",
          "patched",
          "reviewed threats",
          "validated inputs",
          "prevented fraud",
        ],
        [
          ex("Security", "Implemented OAuth scopes with least privilege for partner APIs."),
          ex("Correctness", "Added idempotency keys preventing duplicate charges during retries."),
        ]
      ),
      cluster(
        "Weak backend phrasing",
        "Replace with systems language.",
        [
          "backend stuff",
          "API development (vague)",
          "worked with databases",
          "maintained servers",
          "general coding",
          "helped with bugs",
        ],
        [
          ex("Maintained APIs", "Owned on-call for payments APIs; reduced Sev-1 pages 40% via retries and timeouts."),
          ex("Database", "Authored safe migrations with zero-downtime expand/contract for user table."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Verbs + scale: RPS, QPS, records, dollars, latency." },
      { section: "experience", advice: "Use ‘designed’ when you owned architecture—not for small tweaks." },
      { section: "summary", advice: "Domain: fintech, ads, platform—helps keyword relevance." },
      { section: "skills", advice: "Keep verbs out of skills section." },
      { section: "experience", advice: "Reliability verbs need metrics: MTTR, incident rate, SLO." },
    ],
    [
      "‘Developed REST APIs’ with no scale or error-handling story.",
      "Security verbs without scope.",
      "‘Optimized’ without measurement.",
      "Passive voice: ‘was involved in microservices migration’.",
    ]
  ),

  "machine-learning-engineer": page(
    "Action verbs for ML engineer resumes: training, deploying, monitoring, and improving models.",
    "MLE bullets should emphasize production: trained, deployed, monitored, reduced latency—not only research.",
    [
      cluster(
        "Training & evaluation verbs",
        "Model work.",
        [
          "trained",
          "fine-tuned",
          "evaluated",
          "benchmarked",
          "ablated",
          "distilled",
          "quantized",
          "compressed",
          "validated",
          "reproduced",
        ],
        [
          ex("Built models", "Fine-tuned transformer rankers; improved NDCG@10 6% offline before online shadow."),
          ex("Trained", "Ran distributed training with mixed precision reducing wall-clock 35%."),
        ]
      ),
      cluster(
        "Deployment & serving verbs",
        "Production path.",
        [
          "deployed",
          "containerized",
          "scaled",
          "autoscaling",
          "canaried",
          "rolled back",
          "load tested",
          "optimized inference",
          "reduced latency",
          "cut costs",
        ],
        [
          ex("Deployed model", "Served models on GPU autoscaling from queue depth; held p99 under 50ms."),
          ex("Inference", "Quantized model reducing GPU cost 25% with offline quality gates."),
        ]
      ),
      cluster(
        "Data & feature pipeline verbs",
        "MLE systems.",
        [
          "built pipelines",
          "engineered features",
          "validated data",
          "monitored freshness",
          "backfilled",
          "fixed skew",
          "improved freshness",
          "reduced leakage",
          "standardized",
          "versioned datasets",
        ],
        [
          ex("Features", "Cut training-serving skew by moving transforms to shared libraries."),
          ex("Pipelines", "Improved feature freshness from weekly to daily enabling timely retraining."),
        ]
      ),
      cluster(
        "Monitoring & reliability verbs",
        "Production ML ops.",
        [
          "monitored drift",
          "set alerts",
          "retrained",
          "rolled forward",
          "investigated incidents",
          "reduced false positives",
          "improved robustness",
          "audited",
          "documented runbooks",
          "owned on-call",
        ],
        [
          ex("Monitoring", "Set drift alerts tied to automated rollback on scoring jobs."),
          ex("Incidents", "Reduced model-related incidents 40% with retraining triggers and data checks."),
        ]
      ),
      cluster(
        "Weak MLE phrasing",
        "Notebook vs production.",
        [
          "used sklearn",
          "played with models",
          "research only",
          "jupyter notebooks",
          "experimented",
          "various algorithms",
        ],
        [
          ex("Research", "Productionized churn model with monitoring, rollback, and weekly retrain cadence."),
          ex("ML project", "Owned inference service on Kubernetes with autoscaling and canary releases."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Pair training verbs with datasets, metrics, and constraints." },
      { section: "experience", advice: "Deployment verbs need latency, throughput, or cost numbers." },
      { section: "summary", advice: "Position as ML in production, not only experimentation." },
      { section: "skills", advice: "Libraries in skills; verbs in experience." },
      { section: "experience", advice: "Monitoring verbs need incident or drift examples." },
    ],
    [
      "Research metrics without online story.",
      "‘Deployed’ without latency/cost/quality tradeoffs.",
      "Missing monitoring/drift language for production roles.",
      "Algorithm names without evaluation rigor.",
    ]
  ),

  "devops-engineer": page(
    "Action verbs for DevOps/SRE resumes: automation, reliability, and security.",
    "Platform roles reward verbs like automated, reduced MTTR, enforced policy, migrated—not ‘maintained servers’.",
    [
      cluster(
        "Automation & delivery verbs",
        "CI/CD story.",
        [
          "automated",
          "standardized",
          "accelerated",
          "reduced lead time",
          "implemented pipelines",
          "enforced gates",
          "rolled out",
          "migrated",
          "templatized",
          "self-serviced",
        ],
        [
          ex("CI/CD", "Automated multi-stage pipelines; cut lead time for changes from 3 days to 4 hours."),
          ex("Deployments", "Implemented canary releases with automated rollback on error budget burn."),
        ]
      ),
      cluster(
        "Infrastructure & IaC verbs",
        "Provisioning.",
        [
          "provisioned",
          "codified",
          "refactored modules",
          "applied policies",
          "secured",
          "segmented",
          "networked",
          "peer reviewed",
          "drift detected",
          "remediated",
        ],
        [
          ex("Terraform", "Authored reusable modules; reduced provisioning time from days to minutes."),
          ex("IaC", "Enforced policy-as-code blocking insecure security group rules."),
        ]
      ),
      cluster(
        "Reliability & incident verbs",
        "SRE core.",
        [
          "reduced MTTR",
          "reduced MTBF",
          "defined SLOs",
          "burn alerts",
          "postmortemed",
          "eliminated repeat incidents",
          "load tested",
          "chaos tested",
          "improved observability",
          "on-call",
        ],
        [
          ex("Incidents", "Cut MTTR 35% with trace-first triage and runbook automation."),
          ex("SLOs", "Aligned error budgets with release policy; fewer risky Friday deploys."),
        ]
      ),
      cluster(
        "Security & cost verbs",
        "Platform maturity.",
        [
          "rotated secrets",
          "enforced OIDC",
          "scanned images",
          "blocked CVEs",
          "rightsized",
          "saved",
          "allocated cost",
          "tagged resources",
          "deleted waste",
          "reserved capacity",
        ],
        [
          ex("Security", "Eliminated long-lived cloud keys via OIDC-based deploy authentication."),
          ex("FinOps", "Saved $200k annually via rightsizing and scheduling non-prod environments."),
        ]
      ),
      cluster(
        "Weak DevOps phrasing",
        "Replace with outcomes.",
        [
          "maintained servers",
          "handled tickets",
          "general support",
          "helped developers",
          "monitored stuff",
        ],
        [
          ex("Maintained Jenkins", "Rebuilt CI onto GitHub Actions; improved reliability and developer UX."),
          ex("Support", "Created self-service cluster namespaces cutting platform tickets 40%."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Reliability verbs need numbers: MTTR, frequency, error budget." },
      { section: "experience", advice: "Automation verbs need before/after time or effort." },
      { section: "summary", advice: "Clarify: platform, SRE, CI—pick what matches job." },
      { section: "skills", advice: "Tools in skills; outcomes in bullets." },
      { section: "experience", advice: "Security verbs need policy/enforcement outcomes." },
    ],
    [
      "‘DevOps engineer’ with no CI/CD or IaC evidence.",
      "Monitoring without incident impact.",
      "Kubernetes listed without cluster ownership story.",
      "Cost savings without methodology.",
    ]
  ),

  "full-stack-developer": page(
    "Action verbs for full-stack developer resumes: end-to-end delivery across UI, API, and data.",
    "Full-stack bullets should connect layers: shipped feature across React, API, DB—with one outcome metric.",
    [
      cluster(
        "End-to-end delivery verbs",
        "Ownership signal.",
        [
          "delivered end-to-end",
          "shipped",
          "owned",
          "implemented",
          "integrated",
          "migrated",
          "rolled out",
          "instrumented",
          "measured",
          "iterated",
        ],
        [
          ex("Full-stack developer", "Delivered saved-cart feature across Next.js UI, Node API, and Postgres; lifted checkout completion 6%."),
          ex("Built feature", "Owned Stripe webhooks + UI states; reduced payment failures 22%."),
        ]
      ),
      cluster(
        "Frontend impact verbs",
        "UX side.",
        [
          "improved UX",
          "optimized performance",
          "fixed bugs",
          "improved accessibility",
          "reduced errors",
          "increased conversion",
          "simplified flows",
          "instrumented",
          "A/B tested",
          "refined",
        ],
        [
          ex("UI work", "Improved form validation UX; cut client-side errors 40% on payment step."),
          ex("Performance", "Reduced bundle size and improved LCP on landing pages."),
        ]
      ),
      cluster(
        "Backend & data verbs",
        "Server side.",
        [
          "designed schema",
          "built APIs",
          "secured endpoints",
          "optimized queries",
          "added caching",
          "handled webhooks",
          "ensured idempotency",
          "migrated data",
          "indexed",
          "validated",
        ],
        [
          ex("API", "Built REST endpoints with pagination and consistent errors for admin console."),
          ex("Database", "Added indexes and caching cutting p95 API latency 35%."),
        ]
      ),
      cluster(
        "Integration & async verbs",
        "Full-stack systems.",
        [
          "integrated",
          "synced",
          "queued jobs",
          "retried",
          "handled failures",
          "backfilled",
          "reconciled",
          "monitored pipelines",
          "alerted",
          "documented",
        ],
        [
          ex("Integration", "Integrated OAuth provider with token refresh and session handling."),
          ex("Jobs", "Moved exports to background workers improving API responsiveness."),
        ]
      ),
      cluster(
        "Weak full-stack phrasing",
        "Breadth without depth.",
        [
          "did full stack",
          "frontend and backend",
          "various technologies",
          "helped everywhere",
        ],
        [
          ex("Full stack tasks", "Owned checkout epic: UI states, API contracts, webhook retries, and experiment readouts."),
          ex("Worked on app", "Shipped multi-tenant admin with RLS in Postgres and role-based UI."),
        ]
      ),
    ],
    [
      { section: "experience", advice: "Prefer bullets that span two+ layers with one metric." },
      { section: "summary", advice: "If T-shaped, say strongest side honestly." },
      { section: "experience", advice: "‘Delivered’ needs scope: solo vs team, timeline." },
      { section: "skills", advice: "Split skills section by layer for clarity." },
      { section: "experience", advice: "Integration verbs need failure/retry/idempotency when payments/webhooks." },
    ],
    [
      "Claiming full stack with only one layer in bullets.",
      "No cross-layer outcome metric.",
      "Weak verbs repeated: ‘worked on’, ‘helped’.",
      "Missing integration language for SaaS roles.",
    ]
  ),
};
