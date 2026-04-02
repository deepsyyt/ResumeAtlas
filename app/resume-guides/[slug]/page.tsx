import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import {
  RESUME_GUIDE_PAGES,
  INDEXED_RESUME_GUIDE_SLUGS,
  type ResumeGuideSlug,
} from "@/app/lib/resumeGuidePages";

type PageParams = {
  slug: ResumeGuideSlug;
};

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = RESUME_GUIDE_PAGES[params.slug];
  if (!config) return {};
  const isIndexed = (INDEXED_RESUME_GUIDE_SLUGS as readonly string[]).includes(params.slug);
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: `/resume-guides/${params.slug}`,
    },
    ...(isIndexed ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function ResumeGuidePage({ params }: { params: PageParams }) {
  const config = RESUME_GUIDE_PAGES[params.slug];
  if (!config) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {config.h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {config.intro}
          </p>
          <Link
            href="/#ats-checker-form"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            Open the ATS resume checker
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro explanation */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            The right resume format and sections help{" "}
            <strong>applicant tracking systems (ATS)</strong> and recruiters quickly understand your
            experience. Use this guide to structure your resume in a way that is easy to scan,
            keyword rich, and tailored to the jobs you care about.
          </p>
          <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            When you want to test wording against a real role, use the{" "}
            <Link
              href="/#ats-checker-form"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              free ATS resume checker
            </Link>{" "}
            on the homepage. It doubles as a{" "}
            <Link
              href="/#ats-checker-form"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              resume vs job description tool
            </Link>
            : paste both texts (no upload) to see keyword gaps and ATS-style alignment for that posting. For more context, read{" "}
            <Link
              href="/how-to-pass-ats#how-ats-scans-resumes"
              className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              how ATS scans resumes
            </Link>{" "}
            or{" "}
            <Link
              href="/problems/resume-vs-job-description"
              className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              resume vs job description
            </Link>
            .
          </p>
        </section>

        {/* Guide sections */}
        {config.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              {section.heading}
            </h2>
            <p className="mt-3 text-slate-700 text-sm sm:text-base">
              {section.body}
            </p>
          </section>
        ))}

        {/* Example block */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Example Resume Structure
          </h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-2 text-sm sm:text-base text-slate-800">
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-slate-600">
              Target Role · email@example.com · City, Country · LinkedIn · Portfolio
            </p>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Professional Summary
              </h3>
              <p>
                Experienced professional with a track record of delivering measurable results in
                fast‑paced, cross‑functional teams. Skilled in translating business goals into
                clear, actionable work and communicating outcomes to stakeholders.
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Skills
              </h3>
              <p className="text-slate-700">
                Core tools for your role • Domain expertise • Collaboration &amp; communication
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Work Experience
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Job Title – Company: Impact-focused bullet with a measurable result for your most
                  recent role.
                </li>
                <li>
                  Job Title – Company: Second bullet highlighting scope, collaboration, or
                  ownership.
                </li>
              </ul>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Education
              </h3>
              <p>Bachelor&apos;s or Master&apos;s degree (or equivalent experience).</p>
            </div>
          </div>
        </section>

        {/* CTA + related guides */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Run the ATS resume checker on your draft
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Once you have updated your format and sections, open the{" "}
            <strong>AI-powered ATS resume checker</strong> on ResumeAtlas and{" "}
            <strong>compare your resume with a job description</strong> you are targeting. You will
            see keyword coverage, ATS-style compatibility, and a prioritized list of improvements
            before you apply.
          </p>
          <Link
            href="/#ats-checker-form"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Open the free ATS resume checker
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related guides
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href="/how-to-pass-ats#how-ats-scans-resumes"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-pass-ats#common-resume-mistakes-fail-ats"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href="/data-scientist"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Data Scientist resume guide
                </Link>
              </li>
              <li>
                <Link
                  href="/software-engineer"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Software Engineer resume guide
                </Link>
              </li>
              <li>
                <Link
                  href="/product-manager"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Product Manager resume guide
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            {config.faq.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {f.question}
                  </h3>
                  <span className="text-slate-400 text-xs group-open:hidden">+</span>
                  <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <RelatedResumeGuidesSection
        currentPath={`/resume-guides/${params.slug}`}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-10 border-t border-slate-200 pt-6"
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

