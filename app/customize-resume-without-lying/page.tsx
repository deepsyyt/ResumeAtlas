import type { Metadata } from "next";
import Link from "next/link";
import {
  CHECK_ATS_COMPATIBILITY_ANCHOR,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { getSiteUrl } from "@/app/lib/siteUrl";

const PATH = "/customize-resume-without-lying" as const;

const title =
  "How to Customize Resume Without Lying (Match Any Job Description Easily) | ResumeAtlas";

const description =
  "Learn how to customize your resume for any job without lying. Find missing keywords, align your experience, and improve your chances of getting shortlisted.";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${PATH}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title:
      "How to Customize Resume Without Lying (Match Any Job Description Easily)",
    description,
    url: pageUrl,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Customize Resume Without Lying (Match Any Job Description Easily)",
    description,
  },
};

const faqItems = [
  {
    question: "Is it okay to change wording in my resume?",
    answer:
      "Yes. Rewriting bullets for clarity and alignment with the role is not lying—it is standard practice. You are still describing the same work; you are making it easier for recruiters and ATS to see the fit.",
  },
  {
    question: "Can I use keywords from the job description?",
    answer:
      "Yes—when they accurately reflect what you have done. Mirror the employer’s language for skills, tools, and outcomes you genuinely have. Do not claim tools or responsibilities you have not used.",
  },
  {
    question: "Do I need a different resume for every job?",
    answer:
      "You do not need a completely new resume each time. A tailored version for each serious application usually performs better than one generic document, because alignment—not length—is what gets you shortlisted.",
  },
  {
    question: "What if I don’t have all the required skills?",
    answer:
      "Lead with overlap: transferable skills, adjacent tools, and results that prove you can learn quickly. Be honest about scope. Many postings list a wish list; your job is to show strong fit where you truly have it.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Customize Resume Without Lying (Match Any Job Description Easily)",
  description,
  author: {
    "@type": "Organization",
    name: "ResumeAtlas",
  },
  publisher: {
    "@type": "Organization",
    name: "ResumeAtlas",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": pageUrl,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Customize your resume for a specific job without lying",
  description:
    "Align your real experience with the job description using honest reframing, keyword alignment, and evidence-based edits.",
  totalTime: "PT20M",
  step: [
    {
      "@type": "HowToStep",
      name: "Understand what the job actually needs",
      text: "Identify recurring skills, must-have tools, and repeated responsibilities in the posting so you know what to reflect in your resume.",
    },
    {
      "@type": "HowToStep",
      name: "Match your existing experience",
      text: "Reorder bullets, emphasize relevant work, and describe scope with honest terminology that maps to the role.",
    },
    {
      "@type": "HowToStep",
      name: "Align keywords naturally",
      text: "Replace vague phrases with specific tools and outcomes you used; mirror the posting’s language only where it matches your real work.",
    },
  ],
};

export default function CustomizeResumeWithoutLyingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Honest tailoring · ATS alignment
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            How to Customize Resume Without Lying (Match Any Job Description
            Easily)
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            If you have ever stared at a job description and wondered whether
            tailoring your resume crosses an ethical line—you are not alone.
            Here is how to align your real experience with what employers ask
            for, without exaggeration.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
          <p className="mx-auto mt-3 max-w-lg text-xs text-slate-500 sm:text-sm">
            Paste your resume and a real posting—see gaps and keyword alignment
            in seconds.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How to customize your resume for a job (without lying)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Most people hit the same wall:{" "}
            <em>Am I supposed to change things—or am I just lying?</em> You do
            not need to lie to customize your resume. You need to{" "}
            <strong className="text-slate-900">
              align what you have already done with what the job requires
            </strong>
            . Start with a{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              check resume against job description
            </Link>{" "}
            pass so you can see missing terms and misalignment side by side.
            Then{" "}
            <Link
              href="/ats-resume-checker#ats-compatibility-check"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {CHECK_ATS_COMPATIBILITY_ANCHOR}
            </Link>{" "}
            for parsing and layout. When you need to{" "}
            <Link
              href="/resume-keyword-scanner#ats-checker-form"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              find missing keywords in resume
            </Link>{" "}
            versus the posting, run a keyword scan before you submit—so you
            edit with evidence, not guesswork.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Why this feels so confusing
          </h2>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">
            Many candidates either copy keywords blindly, rewrite bullets at
            random, or add skills they do not have. That is how resumes start
            to feel fake—and still do not get shortlisted.
          </p>
          <p className="mt-4 rounded-xl border border-amber-100 bg-white/80 px-4 py-3 text-sm font-medium text-slate-800 sm:text-base">
            The real issue is usually simpler: your resume is not aligned with
            the job description—not that your experience is weak.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            The right way to customize your resume
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            You are not changing your history. You are{" "}
            <strong className="text-slate-900">
              reframing it so employers can see the match
            </strong>
            .
          </p>

          <ol className="mt-6 space-y-8">
            <li>
              <h3 className="text-lg font-semibold text-slate-900">
                Step 1 — Understand what the job actually needs
              </h3>
              <p className="mt-2 text-sm text-slate-700 sm:text-base">
                Read the posting like a checklist: recurring skills, must-have
                tools, and responsibilities that show up more than once. Those
                signals are what your resume should reflect—in your summary,
                skills, and bullets.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-slate-900">
                Step 2 — Match your existing experience
              </h3>
              <p className="mt-2 text-sm text-slate-700 sm:text-base">
                You rarely need new experience—you need better emphasis. Reorder
                bullets so the most relevant wins sit first, drop or shorten
                work that does not support this role, and use terminology that
                honestly describes work you already did.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-slate-900">
                Step 3 — Align keywords naturally
              </h3>
              <p className="mt-2 text-sm text-slate-700 sm:text-base">
                Avoid keyword stuffing. Replace vague phrases with specific tools
                and outcomes you actually used. Mirror the job’s language only
                where it matches your real scope.
              </p>
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Example: before vs after (same work, stronger alignment)
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Before
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Worked on data analysis and reporting.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                After (aligned)
              </p>
              <p className="mt-2 text-sm text-slate-800">
                Analyzed large datasets using Python and SQL to generate
                insights that informed business decisions.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Same underlying work: clearer tools, clearer impact, no invention.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common mistakes to avoid
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Listing skills you have not actually used in context</li>
            <li>Copy-pasting phrases from the job description into a giant block</li>
            <li>Replacing real achievements with buzzwords that do not map to your work</li>
            <li>Leaving bullets so vague that neither ATS nor humans see a fit</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-200 bg-sky-50/40 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            The fastest way to do this without guessing
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Instead of manually “matching” every line, compare your resume
            directly with the posting. ResumeAtlas highlights missing keywords,
            skill gaps, and misalignment—so you know what to fix while keeping
            your experience truthful.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why this approach works
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Recruiters and ATS systems reward relevance, clarity, and alignment
            more than clever formatting. When your resume clearly reflects the
            requirements in the posting, you do not need to exaggerate—you need
            to be specific.
          </p>
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            FAQ
          </h2>
          <div className="mt-6 space-y-3">
            {faqItems.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">
                    {f.question}
                  </span>
                  <span className="text-xs text-slate-400 group-open:hidden">
                    +
                  </span>
                  <span className="hidden text-xs text-slate-400 group-open:inline">
                    −
                  </span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Next steps
          </h2>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">
            You do not need a fake resume to get interviews. You need a resume
            that matches what the job is asking for—with specifics you can stand
            behind.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href="/how-to-pass-ats"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              How to pass ATS screening
            </Link>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li>
              <Link
                href="/how-to-pass-ats#how-ats-scans-resumes"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                How ATS scans resumes
              </Link>
            </li>
            <li>
              <Link
                href="/how-to-pass-ats"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                ATS-friendly resume format
              </Link>
            </li>
          </ul>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </main>
  );
}
