import type { Metadata } from "next";
import Link from "next/link";
import {
  BeforeAfterVisualSection,
  BenefitsProductSection,
  btnPrimary,
  btnPrimarySm,
  FlexibilitySection,
  GuidesFooterLinks,
  HowItWorksSection,
  TopicClusterCallout,
  ProductPreviewSection,
  TimeSavingSection,
} from "@/app/components/problemLandingShared";
import { PROBLEM_CONVERSION } from "@/app/lib/problemLandingVariants";
import {
  PROBLEM_PAGES,
  INDEXED_PROBLEM_SLUGS,
  problemPageLinkLabel,
} from "@/app/lib/problemPages";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";

export const metadata: Metadata = {
  title: "Fix Your Resume for Any Job | Job Search Problems | ResumeAtlas",
  description:
    "ResumeAtlas is an AI ATS resume checker: compare your resume with a job description, find gaps, and fix weak bullets. Pick a problem page below or use the free checker on the homepage, no login.",
  alternates: {
    canonical: "/problems",
  },
  robots: { index: false, follow: true },
};

const HUB_FAQ = [
  {
    question: "How does ResumeAtlas improve interview chances?",
    answer:
      "It compares your resume to a specific job description so you can see missing keywords, weak bullets, and ATS-style issues. AI suggests job-aligned rewrites you edit yourself, then you export a tailored resume.",
  },
  {
    question: "Is ResumeAtlas free to try?",
    answer:
      "Yes. You can run a free ATS-style analysis without logging in. Paid features apply when you want deeper optimization credits.",
  },
  {
    question: "Will AI invent jobs or skills on my resume?",
    answer:
      "No. The product is built to preserve your real experience. You accept or reject suggestions and edit every line before download.",
  },
  {
    question: "Can I export my resume?",
    answer: "Yes. After editing, export to PDF or DOCX.",
  },
] as const;

export default function ProblemsHubPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HUB_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Resume optimization</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Fix your resume for the job you want, not a generic template.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Paste your resume and a real job description. Get keyword matching, ATS-style feedback, and bullet rewrites
            aligned to that posting. Keep your honest experience, edit everything, export in minutes.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-700 sm:text-base">
            AI speeds you up. You stay in control: tone, wording, and every bullet before PDF or DOCX.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:gap-4">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimary}>
              Compare resume with job description
            </Link>
            <p className="text-xs text-slate-500 sm:text-sm">
              No login required · Free ATS analysis · Takes under 30 seconds
            </p>
          </div>
        </div>
      </section>

      <ProductPreviewSection
        id="hub-product-preview"
        emphasis="overall-gaps"
        title="Your score, missing keywords, and stronger bullets"
        subtitle="One place to see estimated ATS alignment, gap terms, coverage vs the job, and job-aligned bullet previews before you apply again."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="pick-problem-heading">
          <h2 id="pick-problem-heading" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Pick your situation
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Three high-intent angles—each links to the same workflow: compare resume and job description, fix gaps,
            download.
          </p>
          <TopicClusterCallout className="mt-5" />
          <ul className="mt-8 space-y-3">
            {INDEXED_PROBLEM_SLUGS.map((slug) => {
              const conv = PROBLEM_CONVERSION[slug];
              const page = PROBLEM_PAGES[slug];
              return (
                <li
                  key={slug}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
                >
                  <Link href={`/problems/${slug}`} className="group block">
                    <span className="text-base font-semibold text-slate-900 group-hover:text-sky-800">
                      {problemPageLinkLabel(slug)}
                    </span>
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">{conv.heroHeadline}</p>
                    <p className="mt-1 text-xs text-slate-500">{page.primaryKeyword}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex justify-center">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimarySm}>
              Fix my resume
            </Link>
          </div>
        </section>
      </div>

      <BenefitsProductSection />
      <div className="flex justify-center pb-4">
        <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimarySm}>
          Check my resume
        </Link>
      </div>

      <HowItWorksSection />

      <BeforeAfterVisualSection />
      <div className="flex justify-center pb-12">
        <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={btnPrimary}>
          Compare resume with job description
        </Link>
      </div>

      <FlexibilitySection />
      <TimeSavingSection />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8"
          aria-labelledby="hub-bottom-cta"
        >
          <h2 id="hub-bottom-cta" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Ready to align your resume to a real posting?
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            One workflow replaces hours of manual tailoring. Start with the job you care about most.
          </p>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className={`${btnPrimary} sm:px-8`}>
              Compare resume with job description
            </Link>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Fix my resume
            </Link>
          </div>
          <GuidesFooterLinks />
        </section>

        <section id="faq" className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-4">
            {HUB_FAQ.map((f) => (
              <details key={f.question} className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{f.question}</h3>
                  <span className="text-xs text-slate-400 group-open:hidden">+</span>
                  <span className="hidden text-xs text-slate-400 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
