import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  SENIOR_SOFTWARE_ENGINEER_RESUME_PATH,
  SOFTWARE_ENGINEER_RESUME_SUMMARY_PATH,
  ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${SENIOR_SOFTWARE_ENGINEER_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Senior Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples | ResumeAtlas`,
  description:
    `Senior software engineer resume guide for ${CONTENT_FRESHNESS_YEAR}: system design, technical leadership, scope, and architecture impact. Keywords, bullet examples, and a free JD keyword scan.`,
  alternates: { canonical: SENIOR_SOFTWARE_ENGINEER_RESUME_PATH },
  openGraph: {
    title: `Senior Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples`,
    description:
      "Senior software engineer resume: system design, technical leadership, cross-team impact, and architecture ownership. Keywords and a free JD scan.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check my senior software engineer resume?",
    answer:
      "No signup needed. Paste your resume and the JD into ResumeAtlas — full keyword match score, rejection risks, and selectable fixes in about 60 seconds. First scan is free.",
  },
  {
    question: "What makes a senior software engineer resume different from a mid-level one?",
    answer:
      "Scope, system ownership, and technical leadership. Senior resumes show: systems designed and owned end-to-end, cross-team influence, mentorship, production incidents resolved, and architectural decisions with business impact. A mid-level bullet says 'implemented feature X'; a senior bullet says 'designed and led implementation of a distributed job scheduler adopted across 4 microservices, reducing queue latency P95 from 2s to 120ms'.",
  },
  {
    question: "What keywords do senior software engineer job descriptions require beyond technical skills?",
    answer:
      "System design, technical leadership, architecture, mentoring, code review, cross-functional collaboration, incident response, API design, scalability, observability, and ownership. Most senior JDs also expect specific platform terms: Kubernetes, AWS/GCP/Azure, distributed systems, CI/CD. Mirror the posting's exact vocabulary.",
  },
  {
    question: "Should a senior software engineer resume be one page or two?",
    answer:
      "Two pages are appropriate for 6+ years of experience. Use the additional page for major system-design projects, cross-team contributions, and notable architectural decisions — not for listing every technology you've touched.",
  },
  {
    question: "How do I show technical leadership on a software engineer resume without a Staff or Principal title?",
    answer:
      "Technical leadership shows through scope and influence: 'led the backend architecture for a platform serving 2M users', 'defined the API contract for 3 downstream services', 'mentored 4 engineers and ran weekly system design reviews'. Ownership, not title, is the signal.",
  },
  {
    question: "How do I quantify software engineering impact for a senior-level resume?",
    answer:
      "Use four dimensions: performance (latency P95, throughput, uptime), scale (users, requests/second, data volume), reliability (error rate, incident reduction, MTTR), and delivery (time-to-ship, PR cycle time, test coverage). One major system metric at scale is worth more than three vague bullet points.",
  },
  {
    question: "What tools should a senior software engineer list on a resume?",
    answer:
      "Primary languages (specific versions matter less than naming them), frameworks, databases, cloud platforms, observability stack (Datadog, OpenTelemetry), CI/CD tools, container orchestration (Kubernetes, Docker). Every tool listed must appear in a bullet with scope and outcome.",
  },
  {
    question: "How do I write system design experience on a software engineer resume?",
    answer:
      "Name the system, the problem it solved, your specific design decision, and the production outcome. 'Designed a cache invalidation strategy for a distributed notification system; reduced redundant DB reads by 70% and increased throughput from 5k to 40k events/second.' The decision + metric pair is the unit of senior-level evidence.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Senior Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples`,
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const BULLET_REWRITES = [
  {
    weak: "Worked on improving the performance of the backend API.",
    strong: "Profiled and refactored the core order processing API in Go; identified 3 N+1 query patterns and introduced connection pooling — reduced P95 latency from 800ms to 90ms under 12k concurrent requests, dropping infrastructure cost by 35%.",
  },
  {
    weak: "Led the redesign of our CI/CD pipeline.",
    strong: "Redesigned the monorepo CI/CD pipeline using GitHub Actions and Docker layer caching; reduced average build time from 24 minutes to 6 minutes, enabling 3x faster release cadence across 8 backend services.",
  },
  {
    weak: "Mentored junior developers on the team.",
    strong: "Ran weekly system design reviews for 5 engineers; 3 progressed to leading their own services within 9 months. Established code review guidelines adopted as team standard, reducing critical defects in PRs by 40%.",
  },
] as const;

const SENIOR_KEYWORDS = [
  "Senior software engineer", "System design", "Technical leadership", "Architecture", "Microservices",
  "Distributed systems", "Kubernetes", "Observability", "API design", "Scalability", "Mentoring",
  "Code review", "Incident response", "CI/CD", "AWS / GCP / Azure", "Reliability engineering",
  "Cross-functional collaboration", "Technical roadmap", "Performance optimization", "SLO / SLA",
];

const SUMMARY_EXAMPLES = [
  {
    label: "Senior SWE — platform and scale focus",
    text: `Senior software engineer with 8 years building distributed backend systems in Go and Python. Designed and owned a real-time notification platform processing 40M events/day at 99.97% uptime. Led a 5-engineer cross-functional team through a database migration that eliminated a critical scaling bottleneck. Seeking a senior or staff IC role at a product-led company with strong engineering culture.`,
  },
  {
    label: "Senior SWE — technical leadership focus",
    text: `Senior software engineer with 7 years of full-stack experience (React, Node.js, PostgreSQL) and 3 years of technical leadership: system design reviews, mentorship, and cross-team API design. Defined a GraphQL API contract adopted by 4 downstream teams; mentored 6 engineers to IC4 and IC5 promotions. Comfortable owning complex, ambiguous projects from discovery through production.`,
  },
] as const;

export default function SeniorSoftwareEngineerResumePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={roleResumePillarPath("software-engineer")} className="hover:text-gray-700">Software Engineer Resume</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Senior Software Engineer Resume</span>
        </nav>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">Senior Role Resume Guide</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Senior Software Engineer Resume ({CONTENT_FRESHNESS_YEAR}): ATS Guide, Keywords & Examples
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            How to write a senior software engineer resume that shows system ownership, technical leadership, and production-scale impact — not just a list of technologies.
          </p>
          <p className="mb-6 text-sm text-gray-500">No signup needed for the first scan &middot; Results in about 60 seconds</p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Check my senior software engineer resume — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">What ATS looks for on a senior software engineer resume</h2>
          <p className="mb-3 text-gray-700">
            Senior SWE job descriptions layer two sets of requirements: the technical stack (languages, frameworks, infrastructure) and the scope/leadership signals (system design, architecture, mentorship, cross-team ownership). ATS keyword matching covers the first set. Human reviewers filter on the second. A senior resume that only shows technical keywords without scope indicators will pass ATS but fail the hiring manager screen.
          </p>
          <p className="text-gray-700">
            The most common gap for experienced engineers is writing bullets that describe what they built without showing the scale, the design decision, or the downstream impact. Fix one bullet at a time: tool + design decision + production metric.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior Software Engineer Resume Summary Examples</h2>
          <div className="space-y-5">
            {SUMMARY_EXAMPLES.map((ex) => (
              <div key={ex.label} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{ex.label}</p>
                <blockquote className="text-sm leading-relaxed text-gray-700 italic">&ldquo;{ex.text}&rdquo;</blockquote>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            More examples: <Link href={SOFTWARE_ENGINEER_RESUME_SUMMARY_PATH} className="text-blue-600 hover:underline">software engineer resume summary — 20+ examples by level</Link>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior Software Engineer Bullet Rewrites</h2>
          <div className="space-y-5">
            {BULLET_REWRITES.map((b, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-5">
                <div className="mb-2 rounded-lg bg-red-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-red-600">Before</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{b.weak}&rdquo;</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-green-600">After</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{b.strong}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Senior Software Engineer Keywords for ATS</h2>
          <div className="flex flex-wrap gap-2">
            {SENIOR_KEYWORDS.map((kw) => (
              <span key={kw} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{kw}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Full keyword list: <Link href={roleResumeKeywordsPath("software-engineer")} className="text-blue-600 hover:underline">software engineer resume keywords — ATS guide</Link>
          </p>
        </section>

        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">Generic senior keywords don&apos;t match specific postings.</p>
          <p className="mb-4 text-sm text-blue-700">
            One posting wants Kubernetes + Datadog; another wants AWS ECS + CloudWatch. Paste your resume and the specific JD to see exactly which terms are missing before you apply.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Check keyword match — free
            </Link>
            <span className="text-xs text-blue-600">No signup needed for first scan</span>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={roleResumePillarPath("software-engineer")} className="text-blue-600 hover:underline">Software engineer resume guide — full ATS guide and examples</Link></li>
            <li><Link href={roleResumeKeywordsPath("software-engineer")} className="text-blue-600 hover:underline">Software engineer resume keywords — ATS guide</Link></li>
            <li><Link href={SOFTWARE_ENGINEER_RESUME_SUMMARY_PATH} className="text-blue-600 hover:underline">Software engineer resume summary — 20+ examples by level</Link></li>
            <li><Link href={ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH} className="text-blue-600 hover:underline">Entry level software engineer resume — for new grad and bootcamp roles</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary guide — how to write a summary that passes ATS</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Senior Software Engineer Resume — FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Senior engineers get filtered out for the wrong reasons.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Strong systems don&apos;t show on resumes unless bullets name the design decision and the production metric. Paste your resume and the job description into ResumeAtlas. Full keyword match score and selectable fixes in about 60 seconds.
          </p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100">
            Check my senior software engineer resume — no signup
          </Link>
          <p className="mt-3 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
        </section>
      </main>
    </>
  );
}
