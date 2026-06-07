import Link from "next/link";
import {
  DIAGNOSTIC_GATES,
  DIAGNOSTIC_PRIMITIVES,
  DIAGNOSTIC_REGISTRY_VERSION,
} from "@/app/lib/diagnostics/primitiveRegistry";
import { ATS_RESUME_TEMPLATE_GUIDE_PATH } from "@/app/lib/internalLinks";

const GATE_COPY: Record<(typeof DIAGNOSTIC_GATES)[number], { title: string; body: string }> = {
  A: {
    title: "Gate A - Parse hygiene",
    body:
      "Whether text, headings, and bullets extract cleanly before match scoring. Distinct from keyword fit.",
  },
  B: {
    title: "Gate B - Posting vocabulary & required skill debt",
    body:
      "Coverage of posting vocabulary and hard requirements missing or weakly evidenced in your resume.",
  },
  C: {
    title: "Gate C - Semantic fit & evidence density",
    body:
      "Whether responsibilities read like the role and bullets carry outcome proof recruiters skim first.",
  },
  D: {
    title: "Gate D - Skim friction & truth envelope",
    body:
      "Whether a recruiter can extract role and impact quickly, and claims stay interview-defensible.",
  },
};

/**
 * Technical posting-fit model — below the commercial guide, collapsed by default.
 */
export function PostingFitMethodologyAppendix() {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white group">
      <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base font-semibold text-slate-900 marker:content-none">
        <span className="inline-flex items-center gap-2">
          How posting-fit scoring works (Gates A–D)
          <span className="text-xs font-normal text-slate-500 group-open:hidden">
            — expand for diagnostic model
          </span>
        </span>
      </summary>
      <div className="border-t border-slate-200 px-5 py-6 sm:px-6 space-y-8">
        <p className="text-sm text-slate-600">
          Registry version{" "}
          <span className="font-mono text-xs">{DIAGNOSTIC_REGISTRY_VERSION}</span>. Full philosophy:{" "}
          <Link href="/methodology" className="font-medium text-sky-800 underline underline-offset-2">
            methodology
          </Link>
          . Parse hygiene deep-dive:{" "}
          <Link
            href="/ats-resume-checker"
            className="font-medium text-sky-800 underline underline-offset-2"
          >
            ATS resume checker
          </Link>
          . Layout rules:{" "}
          <Link
            href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
            className="font-medium text-sky-800 underline underline-offset-2"
          >
            ATS resume template
          </Link>
          .
        </p>
        <ol className="space-y-3">
          {DIAGNOSTIC_GATES.map((g) => (
            <li key={g} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-sky-900">Gate {g}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">{GATE_COPY[g].title}</h3>
              <p className="mt-1 text-sm text-slate-700">{GATE_COPY[g].body}</p>
            </li>
          ))}
        </ol>
        <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200">
          {DIAGNOSTIC_PRIMITIVES.map((p) => (
            <div key={p.id} className="px-4 py-3 sm:px-5" id={p.publicSlug}>
              <dt className="text-sm font-semibold text-slate-900">
                <span className="font-mono text-xs text-slate-500">{p.id}</span> — {p.label}{" "}
                <span className="text-slate-500">(Gate {p.gate})</span>
              </dt>
              <dd className="mt-1 text-sm text-slate-700">{p.shortDefinition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </details>
  );
}
