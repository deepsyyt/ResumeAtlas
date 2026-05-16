/**
 * Source-of-truth for SWE pillar semantics (author before expanding semantic plans).
 * Not rendered directly, feeds authoring discipline for pillarSemanticPlans + future lint tooling.
 */

export const softwareEngineerCognition = {
  reviewerFears: [
    "Tool-list inflation masking shallow production exposure.",
    "Bullets anyone on the team could paste without lying (no constraint, no causal chain).",
    "Roadmap/feature theater without reliability, scale, or operational aftermath.",
    "Metrics that imply precision but lack cohort, timeframe, baseline, or system boundary.",
  ],
  fakeSignalPatterns: [
    "Heavy cloud/K8s/redis naming with no latency, caches, failover, rollout, observability, or incident context.",
    "Microservice counts or architecture buzzwords without interface, data-flow, migration, or ownership story.",
    "CI/CD tooling with no measurable deploy or quality outcome.",
    "‘Led’ or ‘architected’ without scope boundaries another IC couldn’t also claim.",
  ],
  credibilityMarkers: [
    "Named constraints: traffic, SLO, data volume, release risk, security boundary, cost envelope.",
    "Specific failure modes addressed: timeouts, corruption, drift, hot partitions, flaky tests, noisy alerts.",
    "Quantified deltas tied to engineering levers (not vanity KPIs alone).",
    "Cross-team ownership with explicit interface (API contract, shared library, platform migration).",
  ],
  seniorityHeuristics: {
    junior: "Projects and internships can justify breadth; proof is learning + shipped work in scope.",
    mid: "Production outcomes on real services; recurring themes in reliability and delivery.",
    senior: "Sustained systems thinking, scale, operability, mentoring, multi-quarter technical bets.",
    staff: "Org-level leverage, ambiguous problem framing, durable platform or cost/risk reduction narratives.",
  },
  commonExaggerations: [
    "Claiming production scale for demo, tutorial, or unreleased work.",
    "Team outcomes presented as sole authorship without scope honesty.",
    "Percent lifts without denominator, period, or metric definition.",
  ],
} as const;
