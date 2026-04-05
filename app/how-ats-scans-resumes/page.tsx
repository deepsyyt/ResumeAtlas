import type { Metadata } from "next";
import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_ANCHOR,
} from "@/app/lib/internalLinks";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "How ATS Systems Scan Resumes – Complete Guide | ResumeAtlas",
  description:
    "Learn how Applicant Tracking Systems scan and rank resumes: parsing, keyword matching, formatting rules, and scoring. Get your resume past ATS with this complete guide.",
  alternates: {
    canonical: "/how-ats-scans-resumes",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does an ATS parse my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ATS software extracts text from your resume and maps it into structured fields such as name, contact info, work experience, education, and skills. Simple, linear layouts with clear headings parse best; columns, images, and tables often break parsing or drop content.",
      },
    },
    {
      "@type": "Question",
      name: "What keywords do ATS look for?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ATS compare your resume to the job description. They look for the same skills, tools, and terms the employer listed, e.g. Python, project management, SQL. Including these keywords naturally in your resume improves your match score and chances of passing the filter.",
      },
    },
    {
      "@type": "Question",
      name: "Can ATS read Word and PDF resumes?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Most ATS can read both .docx and PDF. Text-based files with standard fonts and no graphics parse best. Avoid image-only PDFs, complex layouts, or unusual fonts so the system can reliably extract your experience and skills.",
      },
    },
  ],
};

export default function HowATSScansResumesPage() {
  redirect("/how-to-pass-ats#how-ats-scans-resumes");
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            How ATS Systems Scan Resumes – Complete Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Understand how Applicant Tracking Systems parse, score, and filter resumes so yours gets past the screen and in front of recruiters.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_ANCHOR}
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            When you apply online, your resume is usually processed by an <strong>Applicant Tracking System (ATS)</strong> before a human sees it. These systems parse your document, match it to the job description, and rank or filter candidates. Knowing how they work helps you tailor your resume so it passes the first gate and reaches a recruiter.
          </p>
        </section>

        {/* 1. Resume parsing */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            1. Resume Parsing: How ATS Extracts Your Data
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            The first step is <strong>parsing</strong>: the ATS reads your file and tries to put your information into structured fields (name, email, phone, work history, education, skills). It uses layout cues, headings, and patterns to guess which block of text is a job title, which is a company name, and so on.
          </p>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Problems occur when the layout is non-standard. <strong>Columns, text boxes, headers/footers, images, and tables</strong> can confuse the parser. Content inside graphics is often ignored because ATS read text, not images. The result can be missing dates, mangled job titles, or skills that never make it into the system. For best results, use a simple, single-column layout with clear section headings (Experience, Education, Skills) and standard fonts.
          </p>
        </section>

        {/* 2. Keyword matching */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            2. Keyword Matching and Relevance
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            After parsing, the ATS compares your resume to the <strong>job description</strong>. It looks for overlap in skills, tools, and terminology. Keywords that appear in both the job posting and your resume usually increase your score; missing “must-have” terms can trigger filters or a low rank.
          </p>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            That doesn’t mean stuffing the same phrase everywhere. Use the job’s language naturally in your summary, bullet points, and skills section. Include exact terms where accurate (e.g. “Python,” “AWS,” “project management”) so the system and the recruiter both see a clear match.
          </p>
        </section>

        {/* 3. Formatting and structure */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            3. Formatting and Structure Rules
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Most ATS work best with <strong>simple formatting</strong>: standard section names (Work Experience, Education, Skills), bullet lists, and linear flow. Avoid:
          </p>
          <ul className="mt-3 space-y-1 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>Multiple columns or text boxes</li>
            <li>Images, charts, or logos containing important text</li>
            <li>Tables for resume content</li>
            <li>Unusual section names the ATS may not recognize</li>
            <li>Headers and footers that hold key info (some systems ignore them)</li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            A clean, scannable structure helps both the ATS and the human reader. Use a standard font (e.g. Arial, Calibri), clear headings, and consistent dates and job titles.
          </p>
        </section>

        {/* 4. Scoring and ranking */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            4. How ATS Score and Rank Candidates
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Many ATS assign a <strong>match score</strong> based on keyword fit, experience alignment, education, and sometimes seniority. Recruiters often sort or filter by this score, so a higher score increases the chance your resume gets reviewed. Scores are usually not visible to you; they’re internal to the system.
          </p>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            To improve your effective score: align your resume with the job description, include relevant keywords, use a parse-friendly format, and make experience and titles easy to recognize. Use a free{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              {CHECK_RESUME_AGAINST_JD_ANCHOR}
            </Link>{" "}
            to see how ATS-friendly your resume is before you apply.
          </p>
        </section>

        {/* 5. Quick tips */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            5. Quick Tips to Pass ATS Scanning
          </h2>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>Use the job description’s wording for skills and responsibilities where it fits honestly.</li>
            <li>Keep one main column, clear headings, and simple bullets.</li>
            <li>Spell out acronyms once if the job uses them (e.g. “Search Engine Optimization (SEO)”.</li>
            <li>Save as a text-based PDF or .docx; avoid image-only or heavily designed files.</li>
            <li>Include a Skills or Key Skills section so keywords are easy to find.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Role-Specific ATS Examples (Engineer vs Scientist vs PM)
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ATS expects different keyword patterns across roles. A software engineer resume is
            usually matched on stack and delivery terms (TypeScript, AWS, CI/CD), while a data
            scientist resume is matched on modeling and experiment language (Python, SQL, A/B
            testing). Product manager resumes often rank better with ownership and outcome language
            (roadmap, prioritization, activation, retention).
          </p>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>
              <strong>Software Engineer:</strong> API latency, distributed systems, CI/CD, test
              coverage, incident response.
            </li>
            <li>
              <strong>Data Scientist:</strong> model evaluation, precision/recall, experiment design,
              feature engineering, prediction impact.
            </li>
            <li>
              <strong>Product Manager:</strong> roadmap ownership, cross-functional alignment, launch
              outcomes, KPI movement, stakeholder communication.
            </li>
          </ul>
        </section>

        {/* CTA + internal links */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check How Your Resume Scores
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ResumeAtlas analyzes your resume and the job description you care about. You get an ATS-style match score, keyword coverage, and clear improvement ideas, all free, no login required.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_ANCHOR}
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Related</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href={CHECK_RESUME_AGAINST_JD_PATH}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {CHECK_RESUME_AGAINST_JD_ANCHOR}
                </Link>
              </li>
              <li>
                <Link href="/how-to-pass-ats" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  How to Pass ATS Screening
                </Link>
              </li>
              <li>
                <Link href="/software-engineer-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Software Engineer ATS keywords
                </Link>
              </li>
              <li>
                <Link href="/data-scientist-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Data Scientist ATS keywords
                </Link>
              </li>
              <li>
                <Link href="/product-manager-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Product Manager ATS keywords
                </Link>
              </li>
              <li>
                <Link href="/problems/ats-rejecting-my-resume" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Why ATS rejects resumes
                </Link>
              </li>
              <li>
                <Link href="/resume-keyword-scanner#ats-checker-form" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Missing keywords diagnosis
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
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">How does an ATS parse my resume?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                ATS software extracts text from your resume and maps it into structured fields such as name, contact info, work experience, education, and skills. Simple, linear layouts with clear headings parse best; columns, images, and tables often break parsing or drop content.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">What keywords do ATS look for?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                ATS compare your resume to the job description. They look for the same skills, tools, and terms the employer listed, e.g. Python, project management, SQL. Including these keywords naturally in your resume improves your match score and chances of passing the filter.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Can ATS read Word and PDF resumes?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Most ATS can read both .docx and PDF. Text-based files with standard fonts and no graphics parse best. Avoid image-only PDFs, complex layouts, or unusual fonts so the system can reliably extract your experience and skills.
              </p>
            </details>
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
