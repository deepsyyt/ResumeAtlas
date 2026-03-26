import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { RESUME_PAGES, type ResumeSlug } from "@/app/lib/seoPages";
import { getSiteUrl } from "@/app/lib/siteUrl";

type PageParams = {
  roleSlug: ResumeSlug;
};

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = RESUME_PAGES[params.roleSlug];
  if (!config) return {};
  return {
    title: `${config.h1} (ATS-Friendly Template) | ResumeAtlas`,
    description: config.metaDescription,
  };
}

export default function ResumeExamplePage({ params }: { params: PageParams }) {
  const config = RESUME_PAGES[params.roleSlug];
  if (!config) {
    notFound();
  }

  const roleLower = config.roleName.toLowerCase();
  const roleSlug = params.roleSlug.replace("-resume-example", "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: "2026-03-17",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does a strong ${config.roleName} resume include?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A strong ${config.roleName} resume includes a clear summary, impact‑focused bullets with metrics, ATS‑friendly keywords for the tools and technologies you use, and a clean layout with standard sections like Experience, Skills, and Education.`,
        },
      },
      {
        "@type": "Question",
        name: `How can I make my ${config.roleName} resume pass ATS?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Use the same language as the job description for skills and responsibilities, keep formatting simple (one column, no images), and run your resume through an ATS checker like ResumeAtlas to spot missing keywords.",
        },
      },
      {
        "@type": "Question",
        name: `Do I need multiple versions of my ${config.roleName} resume?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. For competitive roles, tailoring your resume to each job description, especially the skills and impact bullets, significantly improves your ATS match score and your chances of getting an interview.",
        },
      },
    ],
  };

  const pairedKeywordsPath = `/ats-keywords/${roleSlug}`;
  const hubPath = `/${roleSlug}/resume`;
  const skillsSeoPath = `/seo/${roleSlug}-resume-skills`;
  const summarySeoPath = `/seo/${roleSlug}-resume-summary`;
  const projectsSeoPath = `/seo/${roleSlug}-resume-projects`;
  const canonicalBase = getSiteUrl();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `${config.roleName} Resume Guide`,
        item: `${canonicalBase}${hubPath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.h1,
        item: `${canonicalBase}/${roleSlug}-resume-example`,
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
              href={hubPath}
              className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
            >
              {config.roleName} Resume Guide
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <span>Resume Example</span>
          </nav>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {config.h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              See a real‑world {config.roleName.toLowerCase()} resume example that is structured for
              Applicant Tracking Systems (ATS) and hiring managers, then adapt it to your own career
              story.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
            >
              Check My Resume with ResumeAtlas
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            {config.roleName} roles are crowded, and most applications are filtered by{" "}
            <strong>Applicant Tracking Systems (ATS)</strong> before a human recruiter reads them.
            To stand out, your resume needs two things: the right keywords for the role and clear,
            quantified impact. Use this example as a starting point, then tailor it to the specific
            job description you are targeting.
          </p>
          <p className="mt-1 text-[11px] sm:text-xs text-slate-500">
            Last updated: March 2026
          </p>
        </section>

        {/* On this page */}
        <section
          aria-label="On this page"
          className="border border-slate-200 rounded-2xl bg-slate-50/70 px-4 py-3 sm:px-5 sm:py-4"
        >
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-slate-500">
            On this page
          </p>
          <ul className="mt-1.5 text-xs sm:text-sm text-slate-700 space-y-1 list-disc pl-4">
            <li>
              <a
                href="#example"
                className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
              >
                Resume example
              </a>
            </li>
            <li>
              <a
                href="#why-it-works"
                className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
              >
                Why this resume works
              </a>
            </li>
            <li>
              <a
                href="#keywords"
                className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
              >
                ATS keywords
              </a>
            </li>
            <li>
              <a
                href="#tips"
                className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
              >
                Improvement tips
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
              >
                FAQ
              </a>
            </li>
          </ul>
        </section>

        {/* Resume example */}
        <section id="example">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.exampleTitle}
          </h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3 text-sm sm:text-base text-slate-800">
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-slate-600">
              {config.roleName} · email@example.com · City, Country · LinkedIn · Portfolio
            </p>
            <div className="pt-3 space-y-2">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Professional Summary
              </h3>
              <p>{config.summary}</p>
            </div>
            <div className="pt-3 space-y-2">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">Skills</h3>
              <p className="text-slate-700">
                React • TypeScript • Next.js • HTML • CSS • Accessibility • REST APIs • SQL •
                Testing
              </p>
            </div>
            <div className="pt-3 space-y-2">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Experience Highlights
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {config.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">Education</h3>
              <p>B.S. in Computer Science</p>
              <p className="text-slate-600">University of Example</p>
            </div>
          </div>
        </section>

        {/* Why this resume works */}
        <section id="why-it-works">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Why This {config.roleName} Resume Works
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            This example focuses on{" "}
            <strong>outcomes, ownership, and relevant keywords for the role</strong>. Each bullet
            pairs a concrete action (what you did) with a measurable result (why it mattered).
            Standard headings like Experience, Skills, and Education keep the layout parse‑friendly
            for ATS while still being easy for a recruiter to skim in under 30 seconds.
          </p>
        </section>

        {/* ATS keywords */}
        <section id="keywords">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS Keywords for a {config.roleName}
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Use the exact language from the job description where it truthfully matches your
            background. Common keyword categories for {config.roleName.toLowerCase()} roles include:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">Core skills</h3>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Role‑specific tools and technologies</li>
                <li>Core frameworks and languages</li>
                <li>Data, analytics, or experimentation (where relevant)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Impact & collaboration</h3>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Cross‑functional collaboration</li>
                <li>Stakeholder communication</li>
                <li>Ownership of roadmaps, projects, or systems</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            For a deeper, role‑specific keyword list, see{" "}
            <Link
              href={pairedKeywordsPath}
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS keywords for {config.roleName.toLowerCase()} resumes
            </Link>
            .
          </p>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Tips to Improve Your {config.roleName} Resume
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              Start each bullet with a strong verb and end with a{" "}
              <strong>specific outcome or metric</strong> (e.g. time saved, revenue, adoption).
            </li>
            <li>
              Mirror the job description’s keywords where they accurately describe your work, and
              remove buzzwords that don’t map to real experience.
            </li>
            <li>
              Keep formatting simple: one column, standard headings, no images or text inside
              tables.
            </li>
            <li>
              Run your resume and target job description through{" "}
              <Link
                href="/"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                the free ResumeAtlas ATS resume checker
              </Link>{" "}
              to see keyword gaps before you apply.
            </li>
          </ul>
        </section>

        {/* CTA + related guides */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check How Your {config.roleName} Resume Scores
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Paste your resume and the job description into ResumeAtlas. You&apos;ll see an ATS‑style
            match score, missing skills, and specific suggestions to tighten your bullets for this
            role before you apply.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume with ResumeAtlas
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related guides
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href="/how-ats-scans-resumes"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/common-resume-mistakes-fail-ats"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href={pairedKeywordsPath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  ATS Keywords for {config.roleName} Resumes
                </Link>
              </li>
              <li>
                <Link
                  href={hubPath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} resume guide (hub)
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
              <li>
                <Link
                  href={summarySeoPath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} resume summary examples
                </Link>
              </li>
              <li>
                <Link
                  href={projectsSeoPath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} resume project ideas
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <RelatedResumeGuidesSection
          currentPath={`/${roleSlug}-resume-example`}
          className="mt-10 border-t border-slate-200 pt-6"
        />

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

