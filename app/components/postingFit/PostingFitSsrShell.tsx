import Link from "next/link";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";
import {
  DIAGNOSTIC_GATES,
  DIAGNOSTIC_PRIMITIVES,
  DIAGNOSTIC_REGISTRY_VERSION,
} from "@/app/lib/diagnostics/primitiveRegistry";
import {
  postingFitFaqJsonLd,
  postingFitWebApplicationJsonLd,
  postingFitWorkbenchBreadcrumbJsonLd,
} from "@/app/lib/postingFitJsonLd";
import { TOOL_CLUSTER_PRIMARY } from "@/app/lib/toolClusterPages";

const GATE_COPY: Record<(typeof DIAGNOSTIC_GATES)[number], { title: string; body: string }> = {
  A: {
    title: "Gate A — Parse hygiene",
    body:
      "If text, headings, and bullets do not extract cleanly, downstream matching is noisy. This gate asks whether applicant tracking systems can ingest your resume reliably—not whether it looks pretty.",
  },
  B: {
    title: "Gate B — Posting vocabulary & required skill debt",
    body:
      "Does your resume surface the posting’s vocabulary where it is truthful? Required skill debt flags hard requirements from the job description that are missing or only weakly evidenced.",
  },
  C: {
    title: "Gate C — Semantic fit & evidence density",
    body:
      "Do responsibilities read like the role in this posting, and do bullets carry outcome proof (scope, metrics, ownership) where recruiters skim first?",
  },
  D: {
    title: "Gate D — Skim friction & truth envelope",
    body:
      "Can a recruiter extract role and impact in seconds, and do claims stay inside what you can defend in an interview? The truth envelope rejects cosmetic keyword stuffing.",
  },
};

const SSR_FAQ = [
  {
    question: "What is posting fit diagnosis?",
    answer:
      "Posting fit diagnosis is how ResumeAtlas frames resume-versus-job-description analysis: vocabulary coverage against the posting, required skill debt, semantic fit, evidence density, parse hygiene, skim friction, and truth-envelope alignment—named consistently in the product and in this page’s HTML.",
  },
  {
    question: "Is posting fit the same as an employer’s ATS score?",
    answer:
      "Employers use different systems and weight signals differently. ResumeAtlas gives directional diagnostics to prioritize edits before you apply—not a hiring guarantee.",
  },
  {
    question: "Where do keyword gaps fit?",
    answer:
      "Keyword and skill gaps are part of Gate B (posting vocabulary coverage and required skill debt). Full tailoring still requires evidence and semantic fit (Gates C–D).",
  },
  {
    question: "What is parse hygiene (Gate A)?",
    answer:
      "Parse hygiene reflects whether your file structure is likely to be read correctly by ATS parsers—distinct from whether you match the posting’s language.",
  },
] as const;

/**
 * SEO-critical SSR region for posting-fit workbench. No client JS required for this output.
 */
export function PostingFitSsrShell() {
  const jsonLd = [
    postingFitWorkbenchBreadcrumbJsonLd(),
    postingFitWebApplicationJsonLd(TOOL_CLUSTER_PRIMARY),
    postingFitFaqJsonLd([...SSR_FAQ]),
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <section className="border-b border-slate-200 bg-white" id="posting-fit-diagnosis">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
            ResumeAtlas posting-fit diagnosis engine
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Posting fit diagnosis: match your resume to this job description
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            Paste your resume and the exact posting you are applying to. You get a structured readout
            aligned to Gates A–D: parse hygiene, posting vocabulary and required skill debt, semantic fit
            and evidence density, then skim friction and truth-envelope alignment. Diagnostic registry
            version <span className="font-mono text-sm">{DIAGNOSTIC_REGISTRY_VERSION}</span> defines the
            vocabulary you see in the product and on this page.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
              data-analytics-event="posting_fit_tier_s_cta_clicked"
              data-analytics-location="ssr_shell_hero"
            >
              Run posting fit diagnosis
            </a>
            <Link
              href="/methodology"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Read methodology
            </Link>
            <Link
              href="/ats-resume-checker"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Gate A: parse hygiene check
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Gates A–D (indexed diagnostic model)
          </h2>
          <ol className="mt-4 space-y-4">
            {DIAGNOSTIC_GATES.map((g) => (
              <li key={g} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-sky-900">Gate {g}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{GATE_COPY[g].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {GATE_COPY[g].body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Diagnostic primitives (vocabulary in HTML)
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            These labels are the same primitives referenced by the analyzer contract and glossary
            pages—no paraphrase drift between SEO and product.
          </p>
          <dl className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/40">
            {DIAGNOSTIC_PRIMITIVES.map((p) => (
              <div key={p.id} className="px-4 py-4 sm:px-5" id={p.publicSlug}>
                <dt className="text-sm font-semibold text-slate-900">
                  <span className="font-mono text-xs text-slate-500">{p.id}</span> — {p.label}{" "}
                  <span className="text-slate-500">(Gate {p.gate})</span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-700">{p.shortDefinition}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-600">
            Full definitions and scoring philosophy:{" "}
            <Link href="/methodology" className="font-semibold text-sky-800 underline underline-offset-2">
              /methodology
            </Link>
            . Parse hygiene deep-dive:{" "}
            <Link href="/ats-resume-checker" className="font-semibold text-sky-800 underline underline-offset-2">
              /ats-resume-checker
            </Link>
            . Layout prerequisites:{" "}
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="font-semibold text-sky-800 underline underline-offset-2"
            >
              ATS resume template
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-indigo-50/30">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Fixture: sample posting-fit snapshot (illustrative)
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Synthetic example for HTML crawlability—not your data. Same primitive names as live output.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm text-slate-800">
              <caption className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Demo fixture — software engineer vs B2B SaaS posting (abbreviated)
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-600">
                  <th className="px-4 py-2">Primitive</th>
                  <th className="px-4 py-2">Gate</th>
                  <th className="px-4 py-2">Illustrative signal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">parse_hygiene</td>
                  <td className="px-4 py-2">A</td>
                  <td className="px-4 py-2">Headings and bullets extract cleanly; single-column flow.</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">posting_vocabulary_coverage</td>
                  <td className="px-4 py-2">B</td>
                  <td className="px-4 py-2">Microservices and CI/CD appear; &quot;SLA&quot; language thin.</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">required_skill_debt</td>
                  <td className="px-4 py-2">B</td>
                  <td className="px-4 py-2">Posting requires on-call ownership evidence—missing in bullets.</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">preferred_skill_delta</td>
                  <td className="px-4 py-2">B</td>
                  <td className="px-4 py-2">Nice-to-have GraphQL exposure not shown (optional gap).</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">semantic_fit_gap</td>
                  <td className="px-4 py-2">C</td>
                  <td className="px-4 py-2">Backend API work present; product-facing outcomes under-specified.</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">evidence_density</td>
                  <td className="px-4 py-2">C</td>
                  <td className="px-4 py-2">Two bullets lack quantified impact.</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">skim_friction</td>
                  <td className="px-4 py-2">D</td>
                  <td className="px-4 py-2">Summary buries stack; recruiter must hunt.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">truth_envelope</td>
                  <td className="px-4 py-2">D</td>
                  <td className="px-4 py-2">No over-claim flags in this fixture.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            FAQ (posting fit diagnosis)
          </h2>
          <dl className="mt-4 space-y-4">
            {SSR_FAQ.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-sm text-slate-600">
            Canonical posting-fit URL:{" "}
            <span className="font-mono text-xs">{CHECK_RESUME_AGAINST_JD_PATH}</span>
          </p>
        </div>
      </section>
    </>
  );
}
