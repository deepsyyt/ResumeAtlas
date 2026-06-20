import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";
import {
  DIAGNOSTIC_PRIMITIVES,
  DIAGNOSTIC_REGISTRY_VERSION,
} from "@/app/lib/diagnostics/primitiveRegistry";
import { postingFitFaqJsonLd } from "@/app/lib/postingFitJsonLd";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
const site = getSiteUrl().replace(/\/$/, "");
const canonical = `${site}/methodology`;

const METHODOLOGY_FAQ = [
  {
    question: "What does ResumeAtlas mean by posting fit diagnosis?",
    answer:
      "Posting fit diagnosis is the framing for resume-versus-job-description analysis: vocabulary coverage against the posting, required skill debt, semantic fit, evidence density, parse hygiene, skim friction, and truth-envelope alignment. It is not a generic ATS score page.",
  },
  {
    question: "What do we not claim?",
    answer:
      "We do not claim to replicate a specific employer’s ATS scoring, to guarantee interviews, or to encourage keyword stuffing. Diagnostics are directional and meant to prioritize honest edits before you apply.",
  },
  {
    question: "What is the truth envelope?",
    answer:
      "The truth envelope is the constraint that recommendations and edits should stay inside what your experience can defend in an interview. When a posting term cannot be supported, we treat omission as a valid outcome.",
  },
] as const;

export const metadata: Metadata = {
  title: `Posting fit diagnosis methodology${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "How ResumeAtlas defines parse hygiene, posting vocabulary coverage, required skill debt, semantic fit, evidence density, skim friction, and truth envelope, what we measure and what we refuse to claim.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Posting fit diagnosis methodology${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Diagnostic primitives, scoring philosophy, and explicit limits for resume vs job description analysis.",
    url: canonical,
    siteName: "ResumeAtlas",
    type: "article",
  },
};

export default function MethodologyPage() {
  const faqLd = postingFitFaqJsonLd([...METHODOLOGY_FAQ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <main className="min-h-screen bg-white text-slate-900">
        <article className="page-prose py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
            Methodology · registry {DIAGNOSTIC_REGISTRY_VERSION}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Posting fit diagnosis methodology
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            This page defines the vocabulary that appears in HTML across ResumeAtlas for resume-versus-job-description
            diagnostics. Product surfaces, API contracts, and SEO content are aligned to the same primitive names and
            gate model, no paraphrase drift.
          </p>

          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Scoring philosophy</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Signals are grouped into Gates A-D so users know whether the bottleneck is machine ingestion (A),
              posting vocabulary and hard requirements (B), fit and proof in bullets (C), or recruiter skim and claim
              defensibility (D). A low score in one gate does not automatically mean failure in another.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Primitive glossary</h2>
            <dl className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
              {DIAGNOSTIC_PRIMITIVES.map((p) => (
                <div key={p.id} className="px-4 py-4">
                  <dt className="font-semibold text-slate-900">
                    {p.label} <span className="text-slate-500">(Gate {p.gate})</span>
                  </dt>
                  <dd className="mt-1 text-sm text-slate-700">{p.shortDefinition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">What we do not claim</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
              <li>We do not publish or endorse employer-specific ATS scores.</li>
              <li>We do not guarantee shortlists, interviews, or offers.</li>
              <li>We do not treat keyword density as a target to maximize.</li>
              <li>We do not recommend fabricating skills to match a posting.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Truth-envelope doctrine</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Tailoring stops where evidence stops. If a posting demands a skill you do not have, the correct output may
              be a gap flag, not a suggested lie. Optimization and exports in the product follow the same constraint:
              edits are for defensible wording and structure, not credential invention.
            </p>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Run posting fit diagnosis</h2>
            <p className="mt-2 text-sm text-slate-700">
              Canonical tool URL:{" "}
              <Link href={CHECK_RESUME_AGAINST_JD_PATH} className="font-mono text-xs text-sky-900 underline">
                {CHECK_RESUME_AGAINST_JD_PATH}
              </Link>
            </p>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Open posting fit workbench
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              Gate A (parse hygiene) tool:{" "}
              <Link href="/ats-resume-checker" className="font-semibold text-sky-800 underline underline-offset-2">
                ATS resume checker
              </Link>
              . Layout prerequisites:{" "}
              <Link href={ATS_RESUME_TEMPLATE_GUIDE_PATH} className="font-semibold text-sky-800 underline underline-offset-2">
                ATS resume template
              </Link>
              .
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">FAQ</h2>
            <dl className="mt-4 space-y-4">
              {METHODOLOGY_FAQ.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-slate-900">{item.question}</dt>
                  <dd className="mt-1 text-sm text-slate-700">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
    </>
  );
}
