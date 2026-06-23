"use client";

import { useMemo, useCallback, useState, useEffect, useId, type ReactNode } from "react";
import { OptimizeCta } from "@/app/components/EvidenceMetricBar";
import { RecommendedFixTooltip } from "@/app/components/RecommendedFixTooltip";
import { computeApplicationVerdict } from "@/app/lib/applicationVerdict";
import {
  APPLICATION_VERDICT_TITLE,
  KEYWORD_COVERAGE_MISSING_DESC,
  KEYWORD_COVERAGE_MISSING_LABEL,
  KEYWORD_COVERAGE_PROVEN_DESC,
  KEYWORD_COVERAGE_PROVEN_LABEL,
  KEYWORD_COVERAGE_SCORE_TITLE,
  KEYWORD_COVERAGE_VIEW_ALL,
  KEYWORD_COVERAGE_WEAK_DESC,
  KEYWORD_COVERAGE_WEAK_LABEL,
  OPTIMIZE_ALIGN_AFTER_LABEL,
  OPTIMIZE_ALIGN_BEFORE_LABEL,
  OPTIMIZE_ALIGN_CARD_TITLE,
  OPTIMIZE_ALIGN_PRIVACY_NOTE,
  OPTIMIZE_CTA_LABEL_HERO,
  RECOMMENDED_FIXES_INTRO,
  RECOMMENDED_FIXES_TITLE,
  TOP_REJECTION_RISKS_INTRO,
  type KeywordCoverageMetricInput,
} from "@/app/lib/evidenceMetricCopy";
import { rejectionRiskRowCopy, rejectionRisksTitle } from "@/app/lib/rejectionRiskDisplay";
import { countSkillProofStatusBreakdown, resolveSkillProofRow } from "@/app/lib/jdSkillProofStatus";
import {
  distributeFixUplift,
  recommendedFixActionLabel,
  recommendedFixKey,
  resolveDashboardRecommendedFixes,
  selectedFixUpliftTotal,
  type RecommendedFix,
} from "@/app/lib/recommendedFixes";
import { DEMO_IMPACT_PREVIEW } from "@/app/lib/demoEvidenceDashboard";
import { ROLE_FIT_SECTION_INTRO, ROLE_FIT_SECTION_TITLE, roleFitVerdictStyle, verdictLabelCompactFor } from "@/app/lib/roleFitArchetypes";
import { splitTextByStrictHighlights } from "@/app/lib/resumeTermMatch";
import type { EvidenceDashboard, JdSkillEvidenceRow } from "@/app/lib/resumeEvidenceScore";
import type { ShareRecruiterReportArgs } from "@/app/lib/shareRecruiterReport";
import { ShareRecruiterReportCta } from "@/app/components/ShareRecruiterReportCta";
import {
  parseAnalyzeMatchSummary,
  type AnalyzeMatchLevel,
} from "@/app/lib/resumeTypography";

function matchLevelDisplay(level: AnalyzeMatchLevel): string {
  return level === "no_match" ? "no match" : level;
}

function VerdictShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="ref-dash-verdict-shield" aria-hidden>
      <path
        d="M10 2.5l6.5 2.5v4.5c0 3.6-2.4 6.2-6.5 7.5-4.1-1.3-6.5-3.9-6.5-7.5V5L10 2.5z"
        fill="rgb(124 58 237 / 0.22)"
        stroke="#A78BFA"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.5l.85 1.72 1.9.28-1.38 1.34.33 1.89L10 10.9l-1.7.89.33-1.89-1.38-1.34 1.9-.28L10 6.5z"
        fill="#C4B5FD"
      />
    </svg>
  );
}

function VerdictSummary({ text, omitMatch = false }: { text: string; omitMatch?: boolean }) {
  const parsed = parseAnalyzeMatchSummary(text);
  if (!parsed) {
    return <p className="ref-dash-verdict-copy">{text}</p>;
  }
  if (omitMatch) {
    return (
      <div className="ref-dash-verdict-copy">
        <p className="ref-dash-verdict-copy-line">
          <span className="ref-dash-verdict-copy-label">JD needs:</span> {parsed.jdNeeds}.
        </p>
        <p className="ref-dash-verdict-copy-line">
          <span className="ref-dash-verdict-copy-label">Resume shows:</span> {parsed.resumeShows}.
        </p>
      </div>
    );
  }
  const matchClass =
    parsed.match === "strong"
      ? "ref-dash-match-level ref-dash-match-level--strong"
      : parsed.match === "weak"
        ? "ref-dash-match-level ref-dash-match-level--weak"
        : "ref-dash-match-level ref-dash-match-level--none";
  return (
    <div className="ref-dash-verdict-copy">
      <p className="ref-dash-verdict-copy-line">
        <span className="ref-dash-verdict-copy-label">JD needs:</span> {parsed.jdNeeds}.
      </p>
      <p className="ref-dash-verdict-copy-line">
        <span className="ref-dash-verdict-copy-label">Resume shows:</span> {parsed.resumeShows}.{" "}
        <span className="ref-dash-verdict-copy-label">Match:</span>{" "}
        <span className={matchClass}>{matchLevelDisplay(parsed.match)}</span>.
      </p>
    </div>
  );
}

function VerdictMatchBadge({ match }: { match: AnalyzeMatchLevel }) {
  const matchClass =
    match === "strong"
      ? "ref-dash-match-level ref-dash-match-level--strong"
      : match === "weak"
        ? "ref-dash-match-level ref-dash-match-level--weak"
        : "ref-dash-match-level ref-dash-match-level--none";
  return (
    <p className="ref-dash-optimize-match">
      <span className="ref-dash-optimize-match-label">Match:</span>{" "}
      <span className={`ref-dash-optimize-match-value ${matchClass}`}>{matchLevelDisplay(match)}</span>
    </p>
  );
}

function OptimizeSparkline() {
  const uid = useId().replace(/:/g, "");
  const bloomId = `ref-dash-spark-bloom-${uid}`;
  const glowId = `ref-dash-spark-glow-${uid}`;
  const strokeGradId = `ref-dash-spark-stroke-${uid}`;
  const fillGradId = `ref-dash-spark-fill-${uid}`;

  const curvePath = "M6 32 C16 32, 20 32, 28 29 C38 25, 52 18, 64 12 C72 9, 78 7, 86 6";
  const areaPath = `${curvePath} L86 36 L6 36 Z`;

  return (
    <svg viewBox="0 0 96 40" fill="none" className="ref-dash-optimize-sparkline" aria-hidden>
      <defs>
        <filter id={bloomId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
        </filter>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={strokeGradId} x1="6" y1="32" x2="86" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#9333EA" />
          <stop offset="1" stopColor="#EDE9FE" />
        </linearGradient>
        <linearGradient id={fillGradId} x1="46" y1="6" x2="46" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" stopOpacity="0.38" />
          <stop offset="0.55" stopColor="#8B5CF6" stopOpacity="0.14" />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill={`url(#${fillGradId})`} />

      <line
        x1="86"
        y1="6"
        x2="86"
        y2="36"
        stroke="rgb(255 255 255 / 0.2)"
        strokeWidth="1"
        strokeDasharray="2.5 2.5"
        strokeLinecap="round"
      />

      <path
        d={curvePath}
        stroke="#A855F7"
        strokeWidth="5.5"
        strokeLinecap="round"
        opacity="0.32"
        filter={`url(#${bloomId})`}
      />

      <path
        d={curvePath}
        stroke={`url(#${strokeGradId})`}
        strokeWidth="2.85"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />

      <circle cx="6" cy="32" r="2.75" fill="#EF4444" />

      <circle cx="86" cy="6" r="9.5" fill="rgb(168 85 247 / 0.16)" filter={`url(#${bloomId})`} />
      <circle cx="86" cy="6" r="6.75" fill="rgb(139 92 246 / 0.28)" />
      <circle cx="86" cy="6" r="4.35" fill="#9333EA" stroke="#F5F3FF" strokeWidth="1.5" />
    </svg>
  );
}

function ScanSummaryHeaderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="ref-dash-glance-title-icon" aria-hidden>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M6.5 13V9.25M10 13V7M13.5 13v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CountMetricIcon({ kind }: { kind: "risks" | "fixes" | "keyword" }) {
  const common = "ref-dash-count-metric-icon";
  if (kind === "risks") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${common} ${common}--risks`} aria-hidden>
        <path
          d="M12 4.5 20.5 19H3.5L12 4.5z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "fixes") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${common} ${common}--fixes`} aria-hidden>
        <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M8.5 12.5 11 15l4.5-5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${common} ${common}--keyword`} aria-hidden>
      <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M15 15l4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function KeywordBreakdownSublabel({
  proven,
  weak,
  missing,
  className = "ref-dash-kw-breakdown",
  layout = "inline",
}: {
  proven: number;
  weak: number;
  missing: number;
  className?: string;
  layout?: "inline" | "stacked";
}) {
  const items = [
    { tone: "proven" as const, count: proven, label: "proven" },
    { tone: "weak" as const, count: weak, label: "weak" },
    { tone: "missing" as const, count: missing, label: "missing" },
  ];

  if (layout === "stacked") {
    return (
      <ul className={`${className} ref-dash-kw-breakdown--stacked`}>
        {items.map((item) => (
          <li key={item.tone} className="ref-dash-kw-breakdown-row">
            <span className={`ref-dash-kw-dot ref-dash-kw-dot--${item.tone}`} aria-hidden>
              •
            </span>
            <span>
              {item.count} {item.label}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={className}>
      {items.map((item) => (
        <span key={item.tone} className="ref-dash-kw-breakdown-inline-item">
          <span className={`ref-dash-kw-dot ref-dash-kw-dot--${item.tone}`} aria-hidden>
            •
          </span>{" "}
          {item.count} {item.label}{" "}
        </span>
      ))}
    </p>
  );
}

function CountMetric({
  kind,
  label,
  value,
  sublabel,
  tone,
  keywordBreakdown,
}: {
  kind: "risks" | "fixes" | "keyword";
  label: string;
  value: number | string;
  sublabel?: string;
  tone: "risk" | "fix" | "keyword";
  keywordBreakdown?: { proven: number; weak: number; missing: number };
}) {
  return (
    <div className={`ref-dash-count-metric ref-dash-count-metric--${tone}`}>
      <span className="ref-dash-count-metric-glow" aria-hidden />
      <span className="ref-dash-count-metric-dots" aria-hidden />
      <div className="ref-dash-count-metric-icon-wrap">
        <CountMetricIcon kind={kind} />
      </div>
      <p className="ref-dash-count-metric-label">{label}</p>
      <p className="ref-dash-count-metric-value">{value}</p>
      <div className="ref-dash-count-metric-sub-area">
        {keywordBreakdown ? (
          <KeywordBreakdownSublabel
            {...keywordBreakdown}
            layout="inline"
            className="ref-dash-count-metric-sub ref-dash-count-metric-sub--keyword ref-dash-kw-breakdown ref-dash-kw-breakdown--inline"
          />
        ) : (
          <p className="ref-dash-count-metric-sub">{sublabel}</p>
        )}
      </div>
      <span className="ref-dash-count-metric-chevron" aria-hidden>
        ›
      </span>
    </div>
  );
}

function DashboardColIcon({ tone }: { tone: "risk" | "fix" | "keyword" | "roles" }) {
  const cls = `ref-dash-col-icon ref-dash-col-icon--${tone}`;
  if (tone === "risk") {
    return (
      <span className={cls} aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4.5 20.5 19H3.5L12 4.5z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (tone === "fix") {
    return (
      <span className={cls} aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M8.5 12.5 11 15l4.5-5.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (tone === "keyword") {
    return (
      <span className={cls} aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M5 18V8M10 18V5M15 18v-7M20 18v-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className={cls} aria-hidden>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M6.5 19.5c0-3 2.463-5.5 5.5-5.5s5.5 2.5 5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function DashboardColHead({
  tone,
  titleId,
  title,
  subtitle,
  trailing,
  trailingOnSubtitle = false,
}: {
  tone: "risk" | "fix" | "keyword" | "roles";
  titleId?: string;
  title: string;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  trailingOnSubtitle?: boolean;
}) {
  const subtitleNode =
    subtitle == null ? null : typeof subtitle === "string" ? (
      <p className={`ref-dash-col-sub ref-dash-col-sub--${tone}`}>{subtitle}</p>
    ) : (
      subtitle
    );

  return (
    <div className={`ref-dash-col-head${trailingOnSubtitle ? " ref-dash-col-head--subtitle-trailing" : ""}`}>
      <DashboardColIcon tone={tone} />
      <div className="ref-dash-col-head-body">
        <div className="ref-dash-col-head-top">
          <h2 id={titleId} className={`ref-dash-col-title ref-dash-col-title--${tone}`}>
            {title}
          </h2>
          {trailing && !trailingOnSubtitle ? (
            <div className="ref-dash-col-head-trailing">{trailing}</div>
          ) : null}
        </div>
        {subtitleNode || (trailing && trailingOnSubtitle) ? (
          <div className="ref-dash-col-head-sub-row">
            {subtitleNode}
            {trailing && trailingOnSubtitle ? (
              <div className="ref-dash-col-head-trailing">{trailing}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RoleFitRowIcon({ role, index }: { role: string; index: number }) {
  const lower = role.toLowerCase();
  let kind: "crown" | "star" | "stack" | "user" | "shield" = "user";
  if (/\b(head|director|chief|vp)\b/.test(lower)) kind = "crown";
  else if (/\b(architect|platform|staff|principal)\b/.test(lower)) kind = "stack";
  else if (/\b(manager|lead)\b/.test(lower)) kind = "star";
  else if (/\b(engineer|developer|scientist)\b/.test(lower)) kind = "user";
  else kind = (["crown", "star", "stack", "user", "shield"] as const)[index % 5] ?? "user";

  return (
    <span className={`ref-dash-role-row-icon ref-dash-role-row-icon--${kind}`} aria-hidden>
      {kind === "crown" ? (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 8.5 7.5 5l3.5 4 3.5-4L18 8.5 16.5 18h-9L4 8.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : kind === "star" ? (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4.5 14.2 9.8l5.8.5-4.4 3.8 1.4 5.7L12 17.2 7 19.8l1.4-5.7-4.4-3.8 5.8-.5L12 4.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : kind === "stack" ? (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 4 4 8l8 4 8-4-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4 12l8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ) : kind === "shield" ? (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3.5 18 6v5.5c0 3.4-2.2 5.8-6 7-3.8-1.2-6-3.6-6-7V6l6-2.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 19c0-3 2.463-5.5 5.5-5.5S17.5 16 17.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
function RoleFitTable({ rows }: { rows: NonNullable<EvidenceDashboard["roleFit"]> }) {
  return (
    <div className="ref-dash-role-table-wrap">
      <div className="ref-dash-role-list" role="table">
        <div className="ref-dash-role-list-head" role="row">
          <span className="ref-dash-role-list-th" role="columnheader">
            Role
          </span>
          <span className="ref-dash-role-list-th ref-dash-role-table-verdict-col" role="columnheader">
            Verdict
          </span>
        </div>
        {rows.map((row, index) => {
          const style = roleFitVerdictStyle(row.verdict);
          return (
            <div className="ref-dash-role-list-row" role="row" key={row.role}>
              <div className="ref-dash-role-name" role="cell">
                <span className="ref-dash-role-row">
                  <RoleFitRowIcon role={row.role} index={index} />
                  <span className="ref-dash-role-row-label">{row.role}</span>
                </span>
              </div>
              <div className="ref-dash-role-table-verdict-col" role="cell">
                <span
                  className={`ref-dash-role-badge ref-dash-role-badge--${row.verdict}`}
                  style={{ color: style.hex, backgroundColor: style.bgHex }}
                >
                  {verdictLabelCompactFor(row.verdict)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type ApplicationIntelligenceDashboardProps = {
  dashboard: EvidenceDashboard;
  keywordCoverage?: KeywordCoverageMetricInput;
  isDemo?: boolean;
  takeawayHeadline?: string;
  shareReport?: ShareRecruiterReportArgs | null;
  selectedRecommendedFixes?: RecommendedFix[];
  onSelectedRecommendedFixesChange?: (fixes: RecommendedFix[]) => void;
  onOptimize?: () => void;
  optimizeDisabled?: boolean;
  optimizeBusy?: boolean;
};

function truncateLine(text: string, max = 140): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function HighlightedAfter({ text, highlights }: { text: string; highlights: string[] }) {
  if (highlights.length === 0) return <>{text}</>;
  const parts = splitTextByStrictHighlights(text, highlights);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={`${part}-${i}`} className="ref-dash-highlight">
            {part}
          </mark>
        ) : (
          <span key={`${part}-${i}`}>{part}</span>
        )
      )}
    </>
  );
}

type KeywordTone = "proven" | "weak" | "missing";

function keywordGroupForRow(row: JdSkillEvidenceRow): KeywordTone {
  const status = resolveSkillProofRow(row).proofStatus;
  if (status === "proven") return "proven";
  if (status === "missing") return "missing";
  return "weak";
}

function groupKeywordsByTone(rows: JdSkillEvidenceRow[]): Record<KeywordTone, JdSkillEvidenceRow[]> {
  const groups: Record<KeywordTone, JdSkillEvidenceRow[]> = {
    proven: [],
    weak: [],
    missing: [],
  };
  for (const row of rows) {
    groups[keywordGroupForRow(row)].push(row);
  }
  return groups;
}

function KeywordRingCard({
  count,
  label,
  desc,
  tone,
  active,
  onClick,
}: {
  count: number;
  label: string;
  desc: string;
  tone: KeywordTone;
  active: boolean;
  onClick: () => void;
}) {
  const stroke =
    tone === "proven" ? "#16A34A" : tone === "weak" ? "#F59E0B" : "#EF4444";
  const pct = Math.min(100, Math.max(12, count * 18));
  const r = 28;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`ref-dash-ring-stat ref-dash-ring-stat--${tone} ${
        active ? "ref-dash-ring-stat--active" : ""
      }`}
      aria-pressed={active}
      aria-expanded={active}
      aria-label={`${count} ${label.toLowerCase()}. ${desc}`}
    >
      <div className="ref-dash-ring-wrap" aria-hidden>
        <svg viewBox="0 0 72 72" className="h-[4.5rem] w-[4.5rem]">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            transform="rotate(-90 36 36)"
          />
        </svg>
        <span className="ref-dash-ring-count">{count}</span>
      </div>
      <p className="ref-dash-ring-label">{label}</p>
      <p className="ref-dash-ring-desc">{desc}</p>
    </button>
  );
}

export function ApplicationIntelligenceDashboard({
  dashboard,
  keywordCoverage,
  isDemo = false,
  takeawayHeadline,
  shareReport,
  selectedRecommendedFixes,
  onSelectedRecommendedFixesChange,
  onOptimize,
  optimizeDisabled = false,
  optimizeBusy = false,
}: ApplicationIntelligenceDashboardProps) {
  const applicationVerdict = computeApplicationVerdict(dashboard);
  const recommendedFixes = useMemo(
    () => resolveDashboardRecommendedFixes(dashboard.riskAreas),
    [dashboard.riskAreas]
  );
  const risks = dashboard.mostMissingEvidence ?? [];
  const roleFitRows = dashboard.roleFit ?? [];
  const skillRows = dashboard.skillProofAll ?? dashboard.skillProof;
  const breakdown = countSkillProofStatusBreakdown(skillRows);
  const keywordGroups = useMemo(() => groupKeywordsByTone(skillRows), [skillRows]);
  const skillRowsKey = useMemo(() => skillRows.map((row) => row.skill).join("\0"), [skillRows]);
  const [expandedKeywordGroups, setExpandedKeywordGroups] = useState<KeywordTone[]>([]);
  const [viewAllKeywords, setViewAllKeywords] = useState(false);

  useEffect(() => {
    setExpandedKeywordGroups([]);
    setViewAllKeywords(false);
  }, [skillRowsKey]);

  const toggleKeywordGroup = useCallback((tone: KeywordTone) => {
    setViewAllKeywords(false);
    setExpandedKeywordGroups((prev) =>
      prev.includes(tone) ? prev.filter((item) => item !== tone) : [...prev, tone]
    );
  }, []);

  const toggleViewAllKeywords = useCallback(() => {
    setViewAllKeywords((open) => {
      if (open) {
        setExpandedKeywordGroups([]);
        return false;
      }
      setExpandedKeywordGroups(["proven", "weak", "missing"]);
      return true;
    });
  }, []);

  const fixesKey = useMemo(() => recommendedFixes.map(recommendedFixKey).join("\0"), [recommendedFixes]);
  const [internalSelected, setInternalSelected] = useState<Set<string>>(() => new Set());

  const isControlled = onSelectedRecommendedFixesChange != null;
  const selectedSet = useMemo(() => {
    if (isDemo) return new Set(recommendedFixes.map(recommendedFixKey));
    if (isControlled) return new Set((selectedRecommendedFixes ?? []).map(recommendedFixKey));
    return internalSelected;
  }, [isDemo, recommendedFixes, internalSelected, isControlled, selectedRecommendedFixes]);

  useEffect(() => {
    if (isDemo) {
      setInternalSelected(new Set(recommendedFixes.map(recommendedFixKey)));
      return;
    }
    setInternalSelected(new Set());
  }, [isDemo, fixesKey, recommendedFixes]);

  const uplifts = useMemo(
    () => distributeFixUplift(applicationVerdict.shortlistUplift, recommendedFixes.length),
    [applicationVerdict.shortlistUplift, recommendedFixes.length]
  );

  const selectedList = recommendedFixes.filter((f) => selectedSet.has(recommendedFixKey(f)));
  const projectedUplift = isDemo
    ? applicationVerdict.shortlistUplift
    : selectedFixUpliftTotal(recommendedFixes, selectedList, applicationVerdict);

  const preview = DEMO_IMPACT_PREVIEW;

  const toggleFix = useCallback(
    (fix: RecommendedFix) => {
      if (isDemo) return;
      const key = recommendedFixKey(fix);
      const next = new Set(selectedSet);
      if (next.has(key)) {
        if (next.size <= 1) return;
        next.delete(key);
      } else {
        next.add(key);
      }
      const nextList = recommendedFixes.filter((item) => next.has(recommendedFixKey(item)));
      if (isControlled) onSelectedRecommendedFixesChange?.(nextList);
      else setInternalSelected(new Set(nextList.map(recommendedFixKey)));
    },
    [isDemo, isControlled, onSelectedRecommendedFixesChange, recommendedFixes, selectedSet]
  );

  const keywordScore = keywordCoverage?.score ?? dashboard.snapshot.jdSkillProof;

  const ctaDisabled = isDemo || optimizeDisabled || optimizeBusy || !onOptimize;
  const summaryLine = takeawayHeadline ?? applicationVerdict.headline;
  const parsedSummary = parseAnalyzeMatchSummary(summaryLine);
  const riskItems = risks.slice(0, 3);
  const criticalRiskCount = risks.length;
  const recommendedFixCount = recommendedFixes.length;

  return (
    <div className="ref-dash">
      {/* ROW 1 */}
      <div className="ref-dash-row ref-dash-row--1 ref-dash-row-1-card">
        <section className="ref-dash-verdict" aria-labelledby="ref-verdict-heading">
          <div className="ref-dash-verdict-head">
            <VerdictShieldIcon />
            <h2 id="ref-verdict-heading" className="ref-dash-verdict-title">
              {APPLICATION_VERDICT_TITLE}
            </h2>
            <span className="ref-dash-info-icon" title={APPLICATION_VERDICT_TITLE} aria-hidden>
              ⓘ
            </span>
          </div>

          <div className="ref-dash-verdict-hero">
            <span className="ref-dash-verdict-pct">{applicationVerdict.shortlistPct}%</span>
            <span className="ref-dash-verdict-badge">
              <span className="ref-dash-verdict-badge-star" aria-hidden>
                ✦
              </span>
              {applicationVerdict.badgeLabel}
            </span>
          </div>

          <VerdictSummary text={summaryLine} omitMatch />

          <div className="ref-dash-optimize-box">
            <p className="ref-dash-optimize-box-label">{OPTIMIZE_ALIGN_CARD_TITLE}</p>
            <div className="ref-dash-optimize-box-row">
              <div className="ref-dash-optimize-box-odds">
                <span className="ref-dash-optimize-from">{applicationVerdict.shortlistPct}%</span>
                <span className="ref-dash-optimize-arrow" aria-hidden>
                  →
                </span>
                <span className="ref-dash-optimize-to">{applicationVerdict.optimizedShortlistPct}%</span>
                {applicationVerdict.shortlistUplift > 0 ? (
                  <span className="ref-dash-uplift-pill">+{applicationVerdict.shortlistUplift}%</span>
                ) : null}
              </div>
              <OptimizeSparkline />
              {parsedSummary ? <VerdictMatchBadge match={parsedSummary.match} /> : null}
            </div>
          </div>

          <OptimizeCta
            onClick={() => onOptimize?.()}
            size="lg"
            disabled={ctaDisabled}
            className="ref-dash-verdict-cta optimize-cta-purple w-full"
            variant="purple"
            showSparkle
            steadyChevrons={!isDemo}
          >
            {optimizeBusy ? "Starting…" : OPTIMIZE_CTA_LABEL_HERO}
          </OptimizeCta>

          <p className="ref-dash-privacy">
            <span aria-hidden>🔒</span> {OPTIMIZE_ALIGN_PRIVACY_NOTE}
          </p>
        </section>

        <section className="ref-dash-glance" aria-labelledby="ref-scan-summary-heading">
          <div className="ref-dash-glance-scan-box">
            <div className="ref-dash-glance-head">
              <div className="ref-dash-glance-title-row">
                <ScanSummaryHeaderIcon />
                <h2 id="ref-scan-summary-heading" className="ref-dash-glance-title">
                  Scan summary
                </h2>
              </div>
              {isDemo ? (
                <span className="ref-dash-sample-btn">
                  <svg viewBox="0 0 20 20" fill="none" className="ref-dash-sample-btn-icon" aria-hidden>
                    <rect x="4" y="3" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Sample Report
                </span>
              ) : (
                <span className="ref-dash-live-badge">Your result</span>
              )}
            </div>

            <div className="ref-dash-count-metrics">
              <CountMetric
                kind="risks"
                label="Critical risks"
                value={criticalRiskCount}
                sublabel="Interview odds at risk"
                tone="risk"
              />
              <CountMetric
                kind="fixes"
                label="Recommended fixes"
                value={recommendedFixCount}
                sublabel="for this role"
                tone="fix"
              />
              <CountMetric
                kind="keyword"
                label="Keyword coverage"
                value={`${keywordScore}%`}
                tone="keyword"
                keywordBreakdown={breakdown}
              />
            </div>
          </div>

          <div className="ref-dash-impact-panel" aria-labelledby="ref-impact-heading">
            <h3 id="ref-impact-heading" className="ref-dash-impact-panel-title">
              See the impact
            </h3>
            <p className="ref-dash-impact-panel-sub">Illustrative before vs after optimization</p>

            <div className="ref-dash-preview-compare ref-dash-preview-compare--dark">
              <div className="ref-dash-preview-half ref-dash-preview-half--before">
                <p className="ref-dash-preview-label">{OPTIMIZE_ALIGN_BEFORE_LABEL}</p>
                <p className="ref-dash-preview-text">{truncateLine(preview.before)}</p>
              </div>
              <div className="ref-dash-preview-half ref-dash-preview-half--after">
                <p className="ref-dash-preview-label ref-dash-preview-label--after">
                  {OPTIMIZE_ALIGN_AFTER_LABEL}
                </p>
                <p className="ref-dash-preview-text">
                  <HighlightedAfter text={truncateLine(preview.after, 220)} highlights={preview.highlights} />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ROW 2 */}
      <div className="ref-dash-row ref-dash-row--2">
        {riskItems.length > 0 ? (
          <section className="ref-dash-col ref-dash-risks" aria-labelledby="ref-risks-heading">
            <DashboardColHead
              tone="risk"
              titleId="ref-risks-heading"
              title={rejectionRisksTitle(riskItems.length)}
              subtitle={TOP_REJECTION_RISKS_INTRO}
            />
            <ul className="ref-dash-risk-list">
              {riskItems.map((item, index) => {
                const copy = rejectionRiskRowCopy(item);
                const impact = "High Impact";
                return (
                  <li key={item} className="ref-dash-risk-card">
                    <span className="ref-dash-risk-num">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="ref-dash-risk-title">{copy.headline}</p>
                        <span className="ref-dash-impact-badge ref-dash-impact-badge--high">
                          {impact}
                        </span>
                      </div>
                      <p className="ref-dash-risk-desc">{copy.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {recommendedFixes.length > 0 ? (
          <section className="ref-dash-col ref-dash-fixes" aria-labelledby="ref-fixes-heading">
            <DashboardColHead
              tone="fix"
              titleId="ref-fixes-heading"
              title={RECOMMENDED_FIXES_TITLE}
              subtitle={RECOMMENDED_FIXES_INTRO}
              trailingOnSubtitle
              trailing={
                projectedUplift > 0 ? (
                  <span className="ref-dash-projected-badge">+{projectedUplift}% projected</span>
                ) : null
              }
            />
            <ul className="ref-dash-fix-list">
              {recommendedFixes.map((fix, index) => {
                const checked = selectedSet.has(recommendedFixKey(fix));
                const uplift = uplifts[index] ?? 0;
                return (
                  <li key={`${index}-${recommendedFixKey(fix)}`} className="group/fix relative">
                    <button
                      type="button"
                      disabled={isDemo}
                      onClick={() => toggleFix(fix)}
                      className={`ref-dash-fix-card ${checked ? "ref-dash-fix-card--on" : ""}`}
                      aria-pressed={checked}
                      aria-label={recommendedFixActionLabel(fix)}
                    >
                      <span className="ref-dash-fix-check" aria-hidden>
                        {checked ? "✓" : ""}
                      </span>
                      <span className="ref-dash-fix-text">{recommendedFixActionLabel(fix)}</span>
                      {uplift > 0 ? (
                        <span className="ref-dash-fix-uplift">(+{uplift}%)</span>
                      ) : null}
                    </button>
                    <RecommendedFixTooltip fix={fix} />
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>

      {/* ROW 3 */}
      <div className="ref-dash-row ref-dash-row--3">
        <section className="ref-dash-col ref-dash-keywords" aria-labelledby="ref-kw-heading">
          <DashboardColHead
            tone="keyword"
            titleId="ref-kw-heading"
            title={KEYWORD_COVERAGE_SCORE_TITLE}
            subtitle={
              <KeywordBreakdownSublabel
                proven={breakdown.proven}
                weak={breakdown.weak}
                missing={breakdown.missing}
                className="ref-dash-col-sub ref-dash-col-sub--keyword ref-dash-kw-breakdown"
              />
            }
            trailing={
              <button
                type="button"
                className="ref-dash-link ref-dash-link-btn"
                onClick={toggleViewAllKeywords}
                aria-expanded={viewAllKeywords}
              >
                {viewAllKeywords ? "Hide keywords" : `${KEYWORD_COVERAGE_VIEW_ALL} →`}
              </button>
            }
          />
          <div className="ref-dash-rings">
            <KeywordRingCard
              count={breakdown.proven}
              label={KEYWORD_COVERAGE_PROVEN_LABEL}
              desc={KEYWORD_COVERAGE_PROVEN_DESC}
              tone="proven"
              active={viewAllKeywords || expandedKeywordGroups.includes("proven")}
              onClick={() => toggleKeywordGroup("proven")}
            />
            <KeywordRingCard
              count={breakdown.weak}
              label={KEYWORD_COVERAGE_WEAK_LABEL}
              desc={KEYWORD_COVERAGE_WEAK_DESC}
              tone="weak"
              active={viewAllKeywords || expandedKeywordGroups.includes("weak")}
              onClick={() => toggleKeywordGroup("weak")}
            />
            <KeywordRingCard
              count={breakdown.missing}
              label={KEYWORD_COVERAGE_MISSING_LABEL}
              desc={KEYWORD_COVERAGE_MISSING_DESC}
              tone="missing"
              active={viewAllKeywords || expandedKeywordGroups.includes("missing")}
              onClick={() => toggleKeywordGroup("missing")}
            />
          </div>
          {(viewAllKeywords || expandedKeywordGroups.length > 0) ? (
            <div className="ref-dash-kw-expanded">
              {(viewAllKeywords
                ? (["proven", "weak", "missing"] as const)
                : expandedKeywordGroups
              ).map((tone) => {
                const rows = keywordGroups[tone];
                if (rows.length === 0) return null;
                const toneLabel =
                  tone === "proven"
                    ? KEYWORD_COVERAGE_PROVEN_LABEL
                    : tone === "weak"
                      ? KEYWORD_COVERAGE_WEAK_LABEL
                      : KEYWORD_COVERAGE_MISSING_LABEL;
                return (
                  <div key={tone} className="ref-dash-kw-expanded-group">
                    {viewAllKeywords || expandedKeywordGroups.length > 1 ? (
                      <p className="ref-dash-kw-expanded-label">{toneLabel}</p>
                    ) : null}
                    <ul className="ref-dash-kw-skill-list">
                      {rows.map((row) => (
                        <li key={row.skill}>
                          <span className={`ref-dash-kw-skill-chip ref-dash-kw-skill-chip--${tone}`}>
                            {row.skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>

        {roleFitRows.length > 0 ? (
          <section className="ref-dash-col ref-dash-roles" aria-labelledby="ref-roles-heading">
            <DashboardColHead
              tone="roles"
              titleId="ref-roles-heading"
              title={ROLE_FIT_SECTION_TITLE}
              subtitle={!isDemo && ROLE_FIT_SECTION_INTRO ? ROLE_FIT_SECTION_INTRO : null}
              trailing={
                <span className="ref-dash-roles-count">
                  {roleFitRows.length} role{roleFitRows.length === 1 ? "" : "s"}
                </span>
              }
            />
            <RoleFitTable rows={roleFitRows} />
          </section>
        ) : null}
      </div>

      {shareReport && !isDemo ? (
        <ShareRecruiterReportCta report={shareReport} compact className="mt-3" />
      ) : null}
    </div>
  );
}
