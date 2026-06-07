import Link from "next/link";
import { DIAGNOSTIC_GATES } from "@/app/lib/diagnostics/primitiveRegistry";

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

/** Plain-language summary of how match scoring works on the compare tool page. */
export function PostingFitMethodologyAppendix() {
  return (
    <section
        id="posting-fit-methodology"
        className="scroll-mt-20 rounded-2xl border border-sky-200 bg-sky-50/50 p-5 sm:p-6"
      >
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          How posting-fit scoring works (Gates A–D)
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          When you compare resume to job description here, ResumeAtlas scores fit through four gates
          in sequence. Each gate answers a different question, so resume gap analysis separates
          parsing problems from keyword gaps from weak evidence.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {DIAGNOSTIC_GATES.map((g) => (
            <li key={g} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-sky-900">Gate {g}</p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">{GATE_COPY[g].title}</h3>
              <p className="mt-1 text-sm text-slate-700">{GATE_COPY[g].body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-600">
          Gate B drives most resume gap analysis (missing resume keywords and skill gap analysis).
          Gate A overlaps with the{" "}
          <Link
            href="/ats-resume-checker"
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            free ATS resume checker
          </Link>
          . Full scoring philosophy:{" "}
          <Link
            href="/methodology"
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            methodology
          </Link>
          .
        </p>
    </section>
  );
}
