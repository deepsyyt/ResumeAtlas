import type { RoleSlug } from "@/app/lib/seoPages";

/**
 * Pillar section semantics (not “section copy plans”): each record defines intent + evidence.
 * `layout` deliberately varies per section/role to reduce cross-pillar structural fingerprinting.
 */

export type PillarAnchorId = "summary" | "skills" | "projects" | "bullet-points";

/** Render order of semantic chunks—omit blocks not listed; skip at render time if data empty. */
export const PILLAR_SEMANTIC_LAYOUT_BLOCKS = [
  "meta",
  "recruiter",
  "negative_expertise",
  "contrarian",
  "ats",
  "entity_zone",
  "proof_signals",
  "seniority",
  "anti_patterns",
  "evidence",
] as const;

export type PillarSemanticLayoutBlock = (typeof PILLAR_SEMANTIC_LAYOUT_BLOCKS)[number];

/** Default chunk order (legacy SWE skills-shaped); prefer explicit `layout` per section. */
export const DEFAULT_PILLAR_SEMANTIC_LAYOUT: readonly PillarSemanticLayoutBlock[] = [
  "meta",
  "recruiter",
  "contrarian",
  "ats",
  "entity_zone",
  "proof_signals",
  "seniority",
  "anti_patterns",
  "negative_expertise",
  "evidence",
];

/** What kind of judgment the section trains. */
export type SemanticPrimaryIntent =
  | "verification"
  | "screening"
  | "proof"
  | "impact"
  | "credibility"
  | "evaluation";

/** Surface / interaction pattern — must differ by section to avoid template collapse. */
export type SemanticEvidenceStyle =
  | "before_after"
  | "review_notes"
  | "matrix"
  | "failure_modes"
  | "rewrite_examples"
  | "case_study";

/**
 * Where instructional prose is allowed to spend entity budget.
 * Summary: role identity; Skills: core stack; Projects: build context; Bullets: outcomes.
 */
export type InstructionalEntityScope =
  | "role_identity"
  | "core_stack"
  | "implementation_context"
  | "outcome_metrics"
  | "mixed";

export type EntityZonePolicy = {
  instructionalScope: InstructionalEntityScope;
  /** Authoring rule for prose (and for future lint). */
  proseRule: string;
  /** Tokens/topics to avoid restating in instructional paragraphs (examples can still show them). */
  avoidRestating: string[];
};

export type SeniorityBand = "junior" | "mid" | "senior" | "staff";

export type SeniorityMatrix = Partial<
  Record<SeniorityBand, { reviewerFocus: string; proofExpectation: string }>
>;

export type AntiPattern = {
  pattern: string;
  /** Reviewer cognition — how it gets interpreted. */
  reviewerRead: string;
};

export type SemanticEvidenceBlock =
  | {
      style: "matrix";
      caption?: string;
      columns: [string, string, string];
      rows: { signal: string; shallowRead: string; credibleRead: string }[];
    }
  | {
      style: "before_after" | "rewrite_examples";
      pairs: { weak: string; strong: string }[];
    }
  | {
      style: "failure_modes";
      items: AntiPattern[];
    }
  | {
      style: "review_notes";
      /** Short “margin notes” / review simulation lines. */
      notes: string[];
    }
  | {
      style: "case_study";
      /** Label + tight paragraph; order matters. */
      beats: { heading: string; text: string }[];
    };

export type SemanticSectionCopyLabels = Partial<{
  recruiterHeading: string;
  negativeHeading: string;
  evidenceHeading: string;
}>;

export type SemanticSection = {
  sectionId: PillarAnchorId;
  /** Visible H2 — must not be a single generic noun (“Skills”). `id` stays on `<h2>`. */
  h2Title: string;
  primaryIntent: SemanticPrimaryIntent;
  /** Optional secondary tag for internal QA / future structured data. */
  secondaryIntent?: SemanticPrimaryIntent;

  /**
   * Structural asymmetry vs other sections/roles. Omit fields → render step skipped.
   * When absent, {@link DEFAULT_PILLAR_SEMANTIC_LAYOUT} applies.
   */
  layout?: readonly PillarSemanticLayoutBlock[];

  /** Replaces default “Reviewer lens” eyebrow for this section. */
  metaEyebrow?: string;

  copyLabels?: SemanticSectionCopyLabels;

  /** Reviewer cognition: how this section is read under time pressure. */
  recruiterInterpretation: string[];

  /**
   * “Negative expertise”: what strong screeners distrust or discount—nuance + trust.
   * Kept separate from antiPatterns (which are pattern → reviewer read pairs in UI).
   */
  negativeExpertise?: string[];

  /** ATS lens: short, section-specific—no repeated global “ATS looks for keywords” screeds. */
  atsInterpretation: string[];

  /** Contrarian / perspective lines — originality + trust signal; keep sparse. */
  contrarianHooks: string[];

  antiPatterns: AntiPattern[];

  /** Signals that should read as “owned” for this role (not synonyms). */
  roleSpecificSignals: string[];

  entityZone: EntityZonePolicy;

  seniorityMatrix?: SeniorityMatrix;

  /** One or more evidence surfaces — order is render order. */
  evidenceBlocks: SemanticEvidenceBlock[];
};

const SWE_SKILLS: SemanticSection = {
  sectionId: "skills",
  layout: [
    "meta",
    "recruiter",
    "contrarian",
    "negative_expertise",
    "ats",
    "entity_zone",
    "proof_signals",
    "seniority",
    "anti_patterns",
    "evidence",
  ],
  metaEyebrow: "Stack verification",
  h2Title:
    "Skills: what reviewers verify in seconds (before they trust your bullets)",
  primaryIntent: "verification",
  secondaryIntent: "credibility",
  copyLabels: {
    recruiterHeading: "How engineers get stack-matched—or downgraded—in a skim",
    evidenceHeading: "Verification table + brittle patterns",
    negativeHeading: "What senior screeners quietly distrust here",
  },
  recruiterInterpretation: [
    "Most screeners use the skills block as a fast JD overlap check, then immediately hunt the same terms inside experience. Mismatch between a ‘primary’ skill and zero contextual use is one of the strongest negative signals.",
    "When a heavy tool (Kubernetes, Kafka, a major cloud) appears without deployment, scale, observability, or failure context in the rest of the resume, experienced reviewers often downgrade it to familiarity—not operating ownership.",
    "Seniority is inferred less from the length of the skills list than from whether the stack aligns with the problems you claim to have solved repeatedly.",
  ],
  atsInterpretation: [
    "ATS may token-match skills literally; humans downgrade skills that never reappear next to scope or outcomes.",
    "Keep synonymous stacks honest: if the JD says ‘TypeScript’ and you only show ‘JavaScript’, expect both parser friction and skepticism unless the posting allows it.",
  ],
  contrarianHooks: [
    "Many resumes over-optimize for ATS recall and become unreadable to hiring managers—dense comma lists of cloud services can lower perceived seniority because they signal breadth inflation, not depth.",
  ],
  negativeExpertise: [
    "Inflated breadth (ten ‘production’ technologies with no corroborating incidents, scale, or ownership story) is often modeled as resume gaming, not seniority.",
    "Mentioning Redis, Kafka, Kubernetes, or similar without invalidation/lag/throughput/SLO/incident context frequently reads as shallow exposure—reviewers pattern-match on missing engineering aftermath.",
    "Skills that only exist in this block and never appear next to constraints in bullets are treated as keyword padding unless you are clearly early-career.",
  ],
  antiPatterns: [
    {
      pattern: "Every GCP/AWS/Azure service you’ve ever touched, listed at equal weight.",
      reviewerRead:
        "Reads as trophy hunting. Strong candidates usually emphasize the slice they operated in production.",
    },
    {
      pattern: "Skills that only appear in this section and nowhere else on the page.",
      reviewerRead:
        "Often interpreted as keyword padding unless you are clearly early-career and projecting learning goals.",
    },
  ],
  roleSpecificSignals: [
    "Latency, throughput, error budgets, incident response, and CI/CD are proof-adjacent signals—if you claim them here, reviewers expect them in bullets with numbers or concrete events.",
    "API and data-store keywords carry more weight when paired with reliability or scale language elsewhere, not in isolation.",
  ],
  entityZone: {
    instructionalScope: "core_stack",
    proseRule:
      "Instructional text names categories of tools (datastores, queues, cloud primitives), not a second full inventory. Examples may name specific tools.",
    avoidRestating: [
      "Duplicating the full top-keywords list from other sections in prose.",
    ],
  },
  seniorityMatrix: {
    junior: {
      reviewerFocus: "Evidence of build fluency and coached production exposure.",
      proofExpectation:
        "Projects and internships can carry most proof; skills should be short and consistent with what you shipped.",
    },
    mid: {
      reviewerFocus: "Alignment between stack and owned services/features.",
      proofExpectation:
        "Each major skill should echo in bullets tied to releases, metrics, or incidents you handled.",
    },
    senior: {
      reviewerFocus:
        "Operational depth: scale, architecture tradeoffs, cross-team technical leadership.",
      proofExpectation:
        "Thin project lists hurt less than missing scale, reliability, and multi-team ownership in bullets; skills should be tight, not sprawling.",
    },
    staff: {
      reviewerFocus:
        "Platform leverage, org-level technical judgment, and sustained cost/reliability outcomes.",
      proofExpectation:
        "Breadth without multi-quarter outcomes reads as title inflation; reviewers look for initiating constraints and stakeholder scope, not buzzwords.",
    },
  },
  evidenceBlocks: [
    {
      style: "matrix",
      caption:
        "How the same credential gets interpreted differently depending on surrounding proof",
      columns: ["Signal on page", "Shallow read", "Credible read"],
      rows: [
        {
          signal: '"Kubernetes" in skills only',
          shallowRead:
            "Familiarity or course exposure; skepticism at senior levels.",
          credibleRead:
            "Plausible if bullets mention rollouts, cluster ops, manifests, migrations, or on-call remediation you led.",
        },
        {
          signal: '"AWS" plus zero scale, reliability, or cost context',
          shallowRead:
            "Generic cloud fluency claimed by many applicants.",
          credibleRead:
            "Stronger when tied to workloads, incidents avoided, latency/cost movements, or security boundaries you enforced.",
        },
        {
          signal: "Huge skills block + short experience section",
          shallowRead:
            "ATS stuffing risk; HM may skim and move on.",
          credibleRead:
            "Rarely credible for senior hires unless each cluster is echoed with outcomes.",
        },
      ],
    },
    {
      style: "failure_modes",
      items: [
        {
          pattern: "Listing CI/CD without ever describing a deployment you improved or guarded.",
          reviewerRead:
            "Often read as toolchain tourism unless junior—reviewers expect time saved, rollback stories, gates, or failure prevention.",
        },
        {
          pattern: 'Microservices count without cohesion: "many services," no coupling or ownership story.',
          reviewerRead:
            "Can signal resume gaming: distributed systems credibility comes from interfaces, migrations, outages, SLAs—not service count.",
        },
      ],
    },
  ],
};

const SWE_BULLETS: SemanticSection = {
  sectionId: "bullet-points",
  layout: [
    "meta",
    "recruiter",
    "evidence",
    "negative_expertise",
    "contrarian",
    "ats",
    "entity_zone",
    "proof_signals",
    "seniority",
    "anti_patterns",
  ],
  metaEyebrow: "Impact evidence",
  h2Title: "Bullets that prove engineering impact—not task participation",
  primaryIntent: "proof",
  secondaryIntent: "impact",
  copyLabels: {
    recruiterHeading: "The replacement test applied to engineering bullets",
    evidenceHeading: "Rewrites + review margin notes",
    negativeHeading: "Credibility killers on paper",
  },
  recruiterInterpretation: [
    "Strong engineer resumes pass a ‘replacement test’: if another candidate could paste the same line without lying, it is weak. Specific systems, constraints, and measurable deltas are how you defend uniqueness.",
    "Backend-heavy profiles without latency, throughput, traffic, datastore scale, incidents resolved, test reliability, or cost signals often stall at senior screening—even when keyword coverage looks fine.",
    "Reviewers scan for causal structure: situation or constraint → what you built/changed → quantified downstream effect on users, reliability, velocity, or cost.",
  ],
  atsInterpretation: [
    "Token overlap still matters, but stuffing the same tool name in every bullet flattens semantic variety and can weaken passage relevance on nuanced queries.",
    "Prefer one strong, contextual mention per bullet over repetitive keyword echoes.",
  ],
  contrarianHooks: [
    "Listing every sprint task you touched convinces parsers faster than humans; hiring managers overweight a handful of decisive outcomes.",
  ],
  negativeExpertise: [
    "Percent lifts without baseline, timeframe, cohort, or system boundary often read as fabricated—experienced reviewers discount them unless the interview backs the claim.",
    "Metrics that contradict the implied seniority signal (tiny lifts presented as transformational) undermine trust faster than vague bullets.",
    "‘AI-enabled’ shipping lines without evaluation, data volume, guardrails, or production boundary sound like marketing copy, not engineering evidence.",
  ],
  antiPatterns: [
    {
      pattern: "Responsible for development of…",
      reviewerRead:
        "Reads like JD paste; reviewers assume low ownership until disproven.",
    },
    {
      pattern: 'Tech salad: stacks of nouns (“React, Redux, Kafka, Docker”) with no causal story.',
      reviewerRead:
        "Often interpreted as toolkit exposure without engineered outcomes.",
    },
  ],
  roleSpecificSignals: [
    "p95/p99 latency, uptime, defect escape rate, CI time, infra cost deltas, incident MTTR—these differentiate senior claims when accurate.",
    "Ownership verbs (shipped, owned, led migration) carry weight only when the bullet still contains constraint + outcome specifics.",
  ],
  entityZone: {
    instructionalScope: "outcome_metrics",
    proseRule:
      "Instructional text emphasizes metrics categories and causal structure—not re-listing every tool from Skills. Concrete tools belong inside example rewrites.",
    avoidRestating: [
      "Re-listing the top 10 stack tokens from ROLE_CONTENT_MAP in exposition paragraphs.",
    ],
  },
  seniorityMatrix: {
    junior: {
      reviewerFocus: "Learning velocity, correctness, mentorship, measurable contributions in scope.",
      proofExpectation:
        "Projects + internships carry proof; bullets should still show causality even if metrics are modest.",
    },
    mid: {
      reviewerFocus: "Shipped features, reliability hygiene, autonomy on sizable tickets.",
      proofExpectation:
        "At least several bullets anchored in production realities (rollouts, regressions prevented, latency work).",
    },
    senior: {
      reviewerFocus:
        "Architecture stakes, sustained reliability improvements, mentoring at scale.",
      proofExpectation:
        "Thin project inventories hurt less than missing ops/scale narratives; bullets must show systemic impact, not only feature throughput.",
    },
    staff: {
      reviewerFocus:
        "Org-level leverage, multi-team alignment, ambiguous problem framing, sustained cost/risk reductions.",
      proofExpectation:
        "Breadth lists without initiating leadership read as inflated titles; reviewers expect named constraints spanning quarters.",
    },
  },
  evidenceBlocks: [
    {
      style: "rewrite_examples",
      pairs: [
        {
          weak: "Worked on backend APIs for the checkout team.",
          strong:
            "Cut p95 checkout API latency by 38% by profiling hot queries, tightening indexes, and adding a bounded cache—reducing payment timeouts during peak traffic.",
        },
        {
          weak: "Improved CI/CD for the engineering org.",
          strong:
            "Reduced median deploy duration from 28m to 9m by restructuring GitHub Actions workflows, layering artifacts, and gating risky steps—fewer rollback events post-release.",
        },
        {
          weak: "Used AWS and Kubernetes in production.",
          strong:
            "Led a zero-downtime migration of stateful workloads to Kubernetes, defining readiness gates and rollback playbooks—zero Sev-1 outages during migration.",
        },
      ],
    },
    {
      style: "review_notes",
      notes: [
        "Margin note — Senior screen: ‘Where is the outage, SLA, saturation, or cost story if they claim scale?’",
        "Margin note — HM skim: ‘Do two bullets suffice to explain why we should interview them over the next ten files?’",
        "Margin note — Staff bar: ‘Initiated vs participated: who else could claim the same wording?’",
      ],
    },
    {
      style: "failure_modes",
      items: [
        {
          pattern:
            "Quantified KPIs without baseline, timeframe, or cohort—'% lift' alone.",
          reviewerRead:
            "Experienced reviewers treat these as placeholders unless context appears in interview; weakens credibility on paper.",
        },
        {
          pattern: "Buzzwords (‘AI-powered’) with no constraint, data volume, evaluation, or production boundary.",
          reviewerRead:
            "Often filtered mentally as hype until a technical screen proves otherwise.",
        },
      ],
    },
  ],
};

const SWE_SUMMARY: SemanticSection = {
  sectionId: "summary",
  layout: ["meta", "contrarian", "negative_expertise", "recruiter", "proof_signals", "evidence", "ats"],
  metaEyebrow: "First skim",
  h2Title: "Summary: two lines for fit—then the quiet credibility checks",
  primaryIntent: "screening",
  secondaryIntent: "evaluation",
  copyLabels: {
    recruiterHeading: "What the top of the page optimizes for (and what it cannot fix)",
    negativeHeading: "Negative expertise: what experienced readers distrust",
    evidenceHeading: "Fast-reject patterns vs stronger openers",
  },
  recruiterInterpretation: [
    "On most SWE pipelines, the summary buys you a few seconds of attention before the reader jumps to impact lines. It should answer: level, stack focus, and the type of problems you compress—not a mission statement.",
    "Generic ‘passionate engineer’ language rarely changes decisions; concrete scope language (systems, scale, ownership) does. If your summary could fit any graduate, it is doing no screening work.",
  ],
  negativeExpertise: [
    "Inflated claims without operational detail (e.g., ‘scaled platform to millions’) often read as hand-waving until bullets prove mechanism, constraints, and timeframe.",
    "Buzzword stacks (‘AI/ML microservices cloud-native leader’) with no craft detail signal marketing resume, not staff engineer judgment.",
  ],
  contrarianHooks: [
    "Over-optimizing the summary for keyword recall can backfire: when it reads like a tag cloud, hiring managers assume the rest of the file will feel synthetic too.",
  ],
  atsInterpretation: [
    "ATS may still tokenize the summary—keep honest overlaps with the posting—but humans overweight specificity; redundant JD echo without proof lines weakens both passes.",
  ],
  antiPatterns: [],
  roleSpecificSignals: [
    "Title + years + primary stack + problem class (APIs, data, infra, client perf) in one breath.",
    "One crisp ‘proof hook’ that points to the strongest bullet themes (latency, reliability, migration, cost).",
  ],
  entityZone: {
    instructionalScope: "role_identity",
    proseRule:
      "Keep named tools here minimal—identity and problem class only. Park deep stack proof in Skills; park outcomes in Bullets.",
    avoidRestating: [
      "Repeating the full skills inventory or project catalog in the summary.",
    ],
  },
  evidenceBlocks: [
    {
      style: "review_notes",
      notes: [
        "Margin note — HM: ‘Can I predict what their best bullet will be from line one?’",
        "Margin note — Staff bar: ‘Do they sound like they shrink ambiguity, or decorate it?’",
        "Margin note — Skeptic: ‘Is any line here legally true for 50 other applicants?’",
      ],
    },
    {
      style: "failure_modes",
      items: [
        {
          pattern: "Opening with adjectives (“results-driven, innovative”) instead of scope.",
          reviewerRead:
            "Often skipped mentally—screeners look for nouns of ownership and environment (team size, product surface, prod scale).",
        },
        {
          pattern: "Promising ‘end-to-end ownership’ with no later proof of delivery or operations.",
          reviewerRead:
            "Triggers credibility debt: readers hunt for incidents, releases, metrics, or migrations and downgrade if absent.",
        },
      ],
    },
  ],
};

const SWE_PROJECTS: SemanticSection = {
  sectionId: "projects",
  layout: [
    "meta",
    "recruiter",
    "evidence",
    "negative_expertise",
    "seniority",
    "proof_signals",
    "ats",
    "entity_zone",
  ],
  metaEyebrow: "Build narrative",
  h2Title: "Projects: prove build judgment—not a portfolio dump",
  primaryIntent: "credibility",
  secondaryIntent: "proof",
  copyLabels: {
    recruiterHeading: "How engineering projects are read when they’re not just ‘GitHub links’",
    negativeHeading: "Negative expertise: portfolio red flags",
    evidenceHeading: "Case shape + common credibility breaks",
  },
  recruiterInterpretation: [
    "For SWE, projects are read as compressed case studies: problem class, technical constraints, what you personally built, and what changed in production or for users. Link-only projects without those beats look like coursework.",
    "Senior reviewers privilege migration, rework, deprecation, observability hardening, and cost/performance tradeoffs over greenfield demos that never touched users.",
    "Architecture without aftermath (on-call pain, regressions prevented, phased rollout risk) reads as diagrams, not accountability.",
  ],
  negativeExpertise: [
    "Tutorial-scale apps presented with production verbs (‘scaled’, ‘enterprise-grade’) invite harsh scrutiny—credibility resets on proof of constraints.",
    "'Group project' blur where your slice is unknowable triggers ‘cannot attribute impact’ deductions.",
    "Metrics on toy datasets or hypothetical users are frequently ignored for senior leveling unless framed as methodological proof for a deliberate scope.",
  ],
  contrarianHooks: [],
  atsInterpretation: [
    "Keywords still help if they mirror stacks you honestly used—parity matters more here than synonym stuffing.",
  ],
  antiPatterns: [],
  roleSpecificSignals: [
    "Explicit production boundary: shipped vs internal vs unreleased; user or revenue touch when true.",
    "Tradeoffs named (latency vs cost, consistency vs speed) signal engineering maturity.",
    "Links belong in networking contexts; on cold applies, the resume still needs standalone proof lines.",
  ],
  entityZone: {
    instructionalScope: "implementation_context",
    proseRule:
      "Spend entity budget on how you built and verified (tests, telemetry, rollout), not a second skills dump.",
    avoidRestating: [
      "Recopying the Skills grid or every bullet theme without new build-specific detail.",
    ],
  },
  seniorityMatrix: {
    junior: {
      reviewerFocus: "Learning arc, correctness, coached delivery, tangible artifacts.",
      proofExpectation:
        "Course and side projects are fair if constraints and your slice are explicit; still show tests, users, or measurable outcomes when possible.",
    },
    senior: {
      reviewerFocus: "Operational proof: reliability, scale, migrations, hardening, cross-team interfaces.",
      proofExpectation:
        "Projects should echo production stakes or credible substitutes (high-fidelity OSS, serious beta) with measurable aftermath.",
    },
    staff: {
      reviewerFocus: "Initiation under ambiguity, platform leverage, multi-quarter technical bets.",
      proofExpectation:
        "Thin demos without org impact read as title inflation; show how decisions moved teams, cost, risk, or velocity.",
    },
  },
  evidenceBlocks: [
    {
      style: "case_study",
      beats: [
        {
          heading: "Problem + constraint",
          text: "High write load on a critical path service; strict latency budget; mobile clients sensitive to tail latency.",
        },
        {
          heading: "Technical move",
          text: "Partitioned hot keys, added bounded caching with explicit invalidation rules, and instrumented p95/p99 by route to catch regressions pre-release.",
        },
        {
          heading: "Credibility hinge",
          text: "Rolled out behind a flag; watched error budget and incident volume during ramp; documented rollback because reviewers look for operational maturity, not just ‘shipped’.",
        },
      ],
    },
    {
      style: "failure_modes",
      items: [
        {
          pattern: "‘Led microservices architecture’ with no data flow, failure mode, or migration story.",
          reviewerRead:
            "Often interpreted as resume theater—credible senior work names interfaces, contracts, and operational outcomes.",
        },
        {
          pattern: "AI/GenAI side project with no evaluation, safety boundary, or user workflow.",
          reviewerRead:
            "Skimmed as hype unless you show data volume, offline metrics, moderation, latency, or cost constraints you respected.",
        },
      ],
    },
  ],
};

export const SEMANTIC_PLANS_BY_ROLE: Partial<
  Record<RoleSlug, Partial<Record<PillarAnchorId, SemanticSection>>>
> = {
  "software-engineer": {
    skills: SWE_SKILLS,
    summary: SWE_SUMMARY,
    projects: SWE_PROJECTS,
    "bullet-points": SWE_BULLETS,
  },
};

/** Resolved chunk order for rendering. */
export function getSemanticLayout(section: SemanticSection): readonly PillarSemanticLayoutBlock[] {
  return section.layout ?? DEFAULT_PILLAR_SEMANTIC_LAYOUT;
}

/** Resolve semantic pillar section plan; absence means legacy template renderer runs. */
export function getPillarSemanticSection(
  role: RoleSlug,
  anchorId: string
): SemanticSection | null {
  if (!isPillarAnchorId(anchorId)) return null;
  return SEMANTIC_PLANS_BY_ROLE[role]?.[anchorId] ?? null;
}

function isPillarAnchorId(id: string): id is PillarAnchorId {
  return (
    id === "summary" ||
    id === "skills" ||
    id === "projects" ||
    id === "bullet-points"
  );
}
