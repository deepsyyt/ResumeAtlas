import type { ReactNode } from "react";
import {
  getSemanticLayout,
  type PillarSemanticLayoutBlock,
  type SemanticEvidenceBlock,
  type SemanticSection,
} from "@/app/lib/pillarSemanticPlans";

function EvidenceBlockView({ block }: { block: SemanticEvidenceBlock }) {
  switch (block.style) {
    case "matrix":
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          {block.caption ? (
            <p className="border-b border-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
              {block.caption}
            </p>
          ) : null}
          <table className="w-full min-w-[280px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {block.columns[0]}
                </th>
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {block.columns[1]}
                </th>
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {block.columns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.signal} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="px-4 py-2.5 font-medium text-slate-800">{row.signal}</td>
                  <td className="px-4 py-2.5 text-slate-700">{row.shallowRead}</td>
                  <td className="px-4 py-2.5 text-slate-700">{row.credibleRead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "before_after":
    case "rewrite_examples":
      return (
        <div className="space-y-4">
          {block.pairs.map((pair) => (
            <div
              key={pair.weak.slice(0, 48)}
              className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:grid-cols-2"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-red-700/90">
                  Weak read
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{pair.weak}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                  Strong read
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-800">{pair.strong}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "failure_modes":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li
              key={item.pattern.slice(0, 40)}
              className="rounded-xl border border-amber-200/80 bg-amber-50/50 px-4 py-3"
            >
              <p className="text-sm font-medium text-amber-950">{item.pattern}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-amber-950/85">
                <span className="font-semibold text-amber-900">Reviewer read: </span>
                {item.reviewerRead}
              </p>
            </li>
          ))}
        </ul>
      );

    case "review_notes":
      return (
        <ul className="space-y-2 border-l-2 border-sky-200 pl-4">
          {block.notes.map((note) => (
            <li key={note.slice(0, 40)} className="text-sm italic leading-relaxed text-slate-700">
              {note}
            </li>
          ))}
        </ul>
      );

    case "case_study":
      return (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          {block.beats.map((b) => (
            <div key={b.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {b.heading}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">{b.text}</p>
            </div>
          ))}
        </div>
      );

    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

function renderSemanticChunk(
  chunk: PillarSemanticLayoutBlock,
  section: SemanticSection
): ReactNode {
  const L = section.copyLabels;

  switch (chunk) {
    case "meta":
      return (
        <header key="meta" className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {section.metaEyebrow ?? "Reviewer lens"} · {section.primaryIntent}
            {section.secondaryIntent ? ` + ${section.secondaryIntent}` : ""}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {section.h2Title}
          </h2>
        </header>
      );

    case "recruiter": {
      if (section.recruiterInterpretation.length === 0) return null;
      const h = L?.recruiterHeading ?? "How reviewers interpret this section";
      return (
        <div key="recruiter" className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900">{h}</h3>
          {section.recruiterInterpretation.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
        </div>
      );
    }

    case "negative_expertise": {
      const items = section.negativeExpertise ?? [];
      if (items.length === 0) return null;
      const h = L?.negativeHeading ?? "Negative expertise";
      return (
        <div key="negative_expertise" className="rounded-xl border border-rose-200/90 bg-rose-50/50 px-4 py-4">
          <h3 className="text-base font-semibold text-rose-950">{h}</h3>
          <p className="mt-1 text-xs text-rose-900/85">
            What strong screeners discount or reinterpret—nuance beats generic “tips.”
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-950/90">
            {items.map((line) => (
              <li key={line.slice(0, 48)}>{line}</li>
            ))}
          </ul>
        </div>
      );
    }

    case "contrarian": {
      if (section.contrarianHooks.length === 0) return null;
      return (
        <aside
          key="contrarian"
          className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
            Contrarian note
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-800">
            {section.contrarianHooks.map((h) => (
              <li key={h.slice(0, 40)}>{h}</li>
            ))}
          </ul>
        </aside>
      );
    }

    case "ats": {
      if (section.atsInterpretation.length === 0) return null;
      return (
        <div key="ats" className="space-y-2">
          <h3 className="text-base font-semibold text-slate-900">ATS lens (this section only)</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {section.atsInterpretation.map((line) => (
              <li key={line.slice(0, 32)}>{line}</li>
            ))}
          </ul>
        </div>
      );
    }

    case "entity_zone":
      return (
        <div
          key="entity_zone"
          className="rounded-xl border border-slate-200 bg-violet-50/40 px-4 py-3"
        >
          <h3 className="text-sm font-semibold text-slate-900">Entity zone control</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            {section.entityZone.instructionalScope.replaceAll("_", " ")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-800">{section.entityZone.proseRule}</p>
          {section.entityZone.avoidRestating.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
              {section.entityZone.avoidRestating.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : null}
        </div>
      );

    case "proof_signals": {
      if (section.roleSpecificSignals.length === 0) return null;
      return (
        <div key="proof_signals">
          <h3 className="text-base font-semibold text-slate-900">Proof signals (not synonyms)</h3>
          <p className="mt-1 text-sm text-slate-600">
            What separates defensible claims from generic keyword coverage on this section:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800">
            {section.roleSpecificSignals.map((s) => (
              <li key={s.slice(0, 40)}>{s}</li>
            ))}
          </ul>
        </div>
      );
    }

    case "seniority": {
      if (!section.seniorityMatrix) return null;
      return (
        <div key="seniority" className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Seniority: what shifts in review</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["junior", "mid", "senior", "staff"] as const).map((band) => {
              const row = section.seniorityMatrix?.[band];
              if (!row) return null;
              return (
                <div
                  key={band}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-900">{band}</p>
                  <p className="mt-2 font-medium text-slate-900">Reviewer focus</p>
                  <p className="text-slate-700 leading-relaxed">{row.reviewerFocus}</p>
                  <p className="mt-2 font-medium text-slate-900">Proof expectation</p>
                  <p className="text-slate-700 leading-relaxed">{row.proofExpectation}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "anti_patterns": {
      if (section.antiPatterns.length === 0) return null;
      return (
        <div key="anti_patterns">
          <h3 className="text-base font-semibold text-slate-900">Anti-patterns</h3>
          <ul className="mt-2 space-y-2">
            {section.antiPatterns.map((ap) => (
              <li
                key={ap.pattern.slice(0, 40)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-900">{ap.pattern}</span>
                <span className="text-slate-600"> — </span>
                <span className="text-slate-700">{ap.reviewerRead}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "evidence": {
      if (section.evidenceBlocks.length === 0) return null;
      const h = L?.evidenceHeading ?? "Evidence";
      return (
        <div key="evidence" className="space-y-4">
          <h3 className="text-base font-semibold text-slate-900">{h}</h3>
          {section.evidenceBlocks.map((b, i) => (
            <EvidenceBlockView key={i} block={b} />
          ))}
        </div>
      );
    }

    default: {
      const _x: never = chunk;
      return _x;
    }
  }
}

export function PillarSemanticSection({
  section,
  anchorId,
}: {
  section: SemanticSection;
  anchorId: string;
}) {
  const layout = getSemanticLayout(section);

  return (
    <section id={anchorId} className="scroll-mt-24 space-y-6">
      {layout.map((chunk) => {
        const node = renderSemanticChunk(chunk, section);
        return node;
      })}
    </section>
  );
}
