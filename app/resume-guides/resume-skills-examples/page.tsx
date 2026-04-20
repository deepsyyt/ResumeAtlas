import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const PATH = "/resume-guides/resume-skills-examples" as const;
const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${PATH}`;

export const metadata: Metadata = {
  title: `Resume Skills Examples (${CONTENT_FRESHNESS_YEAR}) - ATS Skills Section Guide | ResumeAtlas`,
  description:
    `Use these ${CONTENT_FRESHNESS_YEAR} resume skills examples to build an ATS-friendly skills section that matches job descriptions: technical, soft, and role-specific skill patterns plus formatting rules.`,
  alternates: { canonical: PATH },
  keywords: [
    "resume skills examples",
    "skills section in resume examples",
    "sample skills for resume",
    "skills on resume examples",
    "ats friendly resume skills",
    "resume skills format",
    "skills list for resume",
  ],
  openGraph: {
    title: `Resume Skills Examples (${CONTENT_FRESHNESS_YEAR}) - ATS-Friendly Skills Section Guide | ResumeAtlas`,
    description:
      "Build a strong resume skills section with practical examples and ATS-friendly formatting rules. Match your skills wording to the job description before you apply.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume Skills Examples (${CONTENT_FRESHNESS_YEAR}) - ATS-Friendly Skills Section Guide`,
    description:
      "Examples and formatting rules for a resume skills section that ATS and recruiters can scan fast.",
  },
};

const faqItems = [
  {
    question: "What skills should I put on a resume?",
    answer:
      "Use skills that match the target job description and that you can prove in your experience bullets. Include role-specific tools first, then supporting methods and communication skills that are relevant to the work.",
  },
  {
    question: "How many skills should be on a resume?",
    answer:
      "Most resumes perform well with 8 to 16 skills grouped into clear categories. Too many creates noise; too few can miss ATS keyword coverage.",
  },
  {
    question: "How do I make a skills section ATS-friendly?",
    answer:
      "Use plain text headings, standard terms from the posting, and avoid icons or rating bars for core skills. Mirror exact wording where truthful and reinforce those skills in your experience bullets.",
  },
  {
    question: "Should soft skills be listed on a resume?",
    answer:
      "Yes, but only when they are relevant and supported by examples. Generic lists without evidence are weaker than short proof lines in your experience section.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Resume Skills Examples (${CONTENT_FRESHNESS_YEAR}) - ATS-Friendly Skills Section Guide`,
  description:
    "Examples and formatting rules for writing a resume skills section that improves ATS keyword coverage and recruiter skim clarity.",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas" },
  mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
};

export default function ResumeSkillsExamplesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, articleSchema]) }}
      />

      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Skills section format · ATS keywords · copy-ready patterns
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Resume skills examples (ATS-friendly skills section guide)
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Build a skills section recruiters can scan in seconds and ATS can parse cleanly. Use
            role-specific terms from the job description, grouped in plain text categories, and
            backed by proof in your experience bullets.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              ATS resume template & format guide
            </Link>
          </div>
          <LastUpdated
            className="mx-auto mt-6 text-center text-xs text-slate-500"
            label={CONTENT_LAST_UPDATED_LABEL}
          />
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            What a strong resume skills section looks like
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">
            A strong skills section is not a random keyword dump. It is a compact map of tools,
            methods, and domain terms that match the role you are applying for. It should make the
            recruiter think, “This person can likely do this job,” before they even read full
            bullets.
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            For ATS, clarity wins: plain text, standard wording, and terms that also appear in your
            experience section.
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            This guide covers <strong>skills section wording and format</strong>. For work history ordering,
            dates, and experience bullet structure, use{" "}
            <Link
              href="/resume-guides/resume-work-experience-examples"
              className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              resume work experience examples
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Resume skills examples by category
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">Technical skills</h3>
              <p className="mt-1">
                SQL, Python, A/B testing, dashboarding, API design, CI/CD, data modeling.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Role methods</h3>
              <p className="mt-1">
                Roadmapping, experimentation, requirements gathering, root cause analysis, incident
                response, stakeholder alignment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Business and communication</h3>
              <p className="mt-1">
                KPI reporting, cross-functional communication, prioritization, decision framing,
                presentation to leadership.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Mistakes to avoid in resume skills sections
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>Listing skills with no evidence in work experience.</li>
            <li>Using vague labels like “tools” or “tech stack” without specifics.</li>
            <li>Overloading 30+ skills with no priority.</li>
            <li>Using icons/progress bars that ATS may not parse reliably.</li>
            <li>Keeping the same skill list for every job application.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Tailor your skills section to one job description
          </h2>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">
            Fastest process: extract required skills from one posting, map them to your real
            experience, then rewrite your top skills block and first bullets together.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Keep must-have terms from the posting in your skills section.</li>
            <li>Add proof lines in experience for every critical skill you list.</li>
            <li>Reorder skills by role relevance, not personal preference.</li>
          </ul>
          <div className="mt-4">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </section>

        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Related guides</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <Link
                href="/resume-guides/resume-work-experience-examples"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume work experience examples
              </Link>
            </li>
            <li>
              <Link
                href="/resume-guides/ats-resume-template"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template guide
              </Link>
            </li>
            <li>
              <Link
                href="/resume-keyword-scanner"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume keyword scanner
              </Link>
            </li>
            <li>
              <Link
                href="/problems/resume-vs-job-description"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume vs job description mismatch
              </Link>
            </li>
            <li>
              <Link
                href="/data-scientist-resume-keywords"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Data scientist resume keywords
              </Link>
            </li>
            <li>
              <Link
                href="/devops-engineer-resume-keywords"
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                DevOps engineer resume keywords
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Common questions</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </main>
  );
}
