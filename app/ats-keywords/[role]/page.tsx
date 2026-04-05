import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import {
  KEYWORD_PAGES,
  type RoleSlug,
  roleResumeSamplePath,
} from "@/app/lib/seoPages";
import { ROLE_CONTENT_MAP } from "@/app/lib/roleContentMap";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";

type PageParams = {
  role: RoleSlug;
};

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = KEYWORD_PAGES[params.role];
  if (!config) return {};
  return {
    title: `${config.h1} (2025 Guide) | ResumeAtlas`,
    description: config.metaDescription,
    alternates: {
      canonical: `/${params.role}-resume-keywords`,
    },
  };
}

export default function ATSKeywordsRolePage({ params }: { params: PageParams }) {
  const config = KEYWORD_PAGES[params.role];
  if (!config) notFound();

  const roleSlug = params.role;
  const roleContent = ROLE_CONTENT_MAP[roleSlug];
  const resumeSamplePath = roleResumeSamplePath(roleSlug);
  const mergedGuidePath = `/${roleSlug}-resume-guide`;
  const skillsSeoPath = `/${roleSlug}-resume-guide#skills`;
  const canonicalBase = getSiteUrl();

  const faqSchema = {
    "@context": "https://schema.org",
  "@type": "FAQPage",
  dateModified: "2026-03-17",
    mainEntity: [
      {
        "@type": "Question",
        name: `What keywords do ATS look for in ${config.roleName.toLowerCase()} resumes?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ATS compare your resume to the job description and look for overlapping skills, tools, and concepts. Include the core technologies, domain terms, and responsibilities listed in the posting where they genuinely match your experience.",
        },
      },
      {
        "@type": "Question",
        name: `How many keywords should my ${config.roleName.toLowerCase()} resume include?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Focus on coverage, not a specific number. Make sure each critical requirement from the job description appears in your summary, skills, and experience bullets where it is genuinely part of your background.",
        },
      },
      {
        "@type": "Question",
        name: "Is keyword stuffing a good idea for ATS?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Repeating keywords unnaturally can look spammy to recruiters and does not guarantee a higher score. Use keywords in context inside clear, outcome‑driven bullets that describe real work you have done.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `${config.roleName} Resume Guide`,
        item: `${canonicalBase}${mergedGuidePath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.h1,
        item: `${canonicalBase}/${roleSlug}-resume-keywords`,
      },
    ],
  } as const;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 sm:pb-12">
          <nav className="mb-3 text-[11px] sm:text-xs text-slate-500 text-left">
            <Link
              href={mergedGuidePath}
              className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
            >
              {config.roleName} Resume Guide
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <span>ATS Keywords</span>
          </nav>
          <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {config.h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Learn the most important ATS keywords for{" "}
            {config.roleName.toLowerCase()} roles so your resume matches what hiring managers and
            applicant tracking systems are looking for.
          </p>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            Modern{" "}
            <strong>
              {config.roleName.toLowerCase()} job descriptions are full of keywords that ATS scan
              for
            </strong>
            : languages, frameworks, cloud providers, and responsibilities. The goal is not to
            memorize a universal list, but to understand the most common keyword categories so you
            can mirror the exact language of each posting you apply to.
          </p>
          <p className="mt-1 text-[11px] sm:text-xs text-slate-500">
            Last updated: March 2026
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            {config.roleName} keyword context
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            For this role, ATS scans usually reward specific tooling references such as{" "}
            {roleContent.tools.slice(0, 4).join(", ")} and action language like{" "}
            {roleContent.domainVerbs.slice(0, 3).join(", ")}.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
            {roleContent.examplePhrases.slice(0, 2).map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
          </ul>
        </section>

        {/* Keyword categories */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Core ATS Keyword Categories for {config.roleName} Resumes
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">Technical skills</h3>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Languages and frameworks for your stack</li>
                <li>Core tools (IDE, version control, testing, CI/CD)</li>
                <li>Databases, cloud platforms, and infrastructure (if relevant)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Domain & responsibilities</h3>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>What you build or analyze (features, models, dashboards, services)</li>
                <li>How you collaborate (cross‑functional, stakeholders, customers)</li>
                <li>Business outcomes (revenue, efficiency, reliability)</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Start by highlighting the skills and concepts that appear repeatedly across postings for
            your target role, then customize them for each application.
          </p>
        </section>

        {/* How to use keywords */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How to Use These Keywords in Your Resume
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              Place the most important keywords in your <strong>summary</strong> and{" "}
              <strong>Skills</strong> section so they are easy for ATS and humans to see.
            </li>
            <li>
              Weave technical terms into your <strong>experience bullets</strong> alongside clear
              outcomes, not as isolated lists.
            </li>
            <li>
              Match the exact spelling used in the job description (e.g. “JavaScript” vs “JS”)
              where possible.
            </li>
            <li>
              Avoid copying tools you&apos;ve never used. Recruiters probe on keywords during
              interviews.
            </li>
          </ul>
        </section>

        {/* CTA + related guides */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check Your {config.roleName} Resume Against These Keywords
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Paste your resume and the role&apos;s job description into ResumeAtlas. You&apos;ll see
            keyword coverage, missing skills, and an ATS‑style match score so you can tighten your
            resume before applying.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
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
                  href={resumeSamplePath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} Resume Example
                </Link>
              </li>
              <li>
                <Link
                  href={skillsSeoPath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} resume skills examples
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <RelatedResumeGuidesSection currentPath={`/${params.role}-resume-keywords`} className="mt-10 border-t border-slate-200 pt-6" />

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            {(faqSchema.mainEntity as any[]).map((q) => (
              <details
                key={q.name}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{q.name}</h3>
                  <span className="text-slate-400 text-xs group-open:hidden">+</span>
                  <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{q.acceptedAnswer.text}</p>
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}

