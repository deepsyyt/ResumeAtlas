import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  RESUME_WORK_EXPERIENCE_GUIDE_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  RESUME_ACTION_VERBS_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${RESUME_ACTION_VERBS_PATH}`;

export const metadata: Metadata = {
  title: `Resume Action Verbs (${CONTENT_FRESHNESS_YEAR}): 500+ by Role, Strength & ATS Impact | ResumeAtlas`,
  description:
    `500+ resume action verbs organized by role, strength tier, and ATS impact. Includes weak-verb replacements, before/after bullet examples, and role-specific lists for tech, data, and business roles.`,
  alternates: { canonical: RESUME_ACTION_VERBS_PATH },
  keywords: [
    "resume action verbs",
    "strong action verbs for resume",
    "resume verbs list",
    "resume action words",
    "best action verbs for resume",
    "resume power verbs",
    "action verbs for resume 2026",
  ],
  openGraph: {
    title: `Resume Action Verbs (${CONTENT_FRESHNESS_YEAR}): 500+ by Role, Strength & ATS Impact`,
    description:
      "500+ resume action verbs by role and strength tier. Replace weak verbs and see before/after examples for data, tech, and business roles.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume Action Verbs (${CONTENT_FRESHNESS_YEAR}): 500+ by Role, Strength & ATS Impact`,
    description:
      "Strong resume action verbs by role and category. Weak-verb replacements and before/after examples included.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my improved resume matches a job description?",
    answer:
      "No signup needed. Paste your resume and the job description into ResumeAtlas and you get a full intelligence dashboard — keyword gaps, match score, and rejection risks — in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "What are the best action verbs for a resume in 2026?",
    answer:
      "The strongest verbs are specific, measurable, and match your role. For technical roles: built, deployed, optimized, automated, migrated. For leadership: led, owned, spearheaded, championed. For analysis: diagnosed, identified, quantified, evaluated. For delivery: shipped, launched, drove, reduced, increased. Always pair the verb with a scope and outcome — the verb alone does not make the bullet strong.",
  },
  {
    question: "Which action verbs should I avoid on a resume?",
    answer:
      "Avoid: responsible for, worked on, helped, assisted, involved in, participated in, did, used. These describe proximity to work, not ownership or impact. Replace them with verbs that show what you specifically did and what changed as a result.",
  },
  {
    question: "Do action verbs actually help with ATS?",
    answer:
      "Verb choice alone has little direct ATS impact — ATS systems match keywords, not verb strength. The real benefit is recruiter readability: a bullet starting with 'drove' followed by a metric is parsed faster and remembered longer. The metric and the keyword are what ATS scores; the verb is what keeps the recruiter reading.",
  },
  {
    question: "How many action verbs should I use on a resume?",
    answer:
      "Every experience bullet should start with an action verb. Most roles have 3–5 bullets per position, so a two-page resume typically has 15–25 action verbs. Vary them — repeating the same verb 10 times flattens the read. Aim for variety within the same strength tier.",
  },
  {
    question: "What is the difference between a strong and weak resume verb?",
    answer:
      "A strong verb implies ownership and direction: built, drove, reduced, led, shipped. A weak verb implies proximity: helped, worked on, participated in, was involved with. The test: can you add '(but it wasn't really my project)' after the verb? If yes, it's weak.",
  },
  {
    question: "Are there role-specific action verbs I should use?",
    answer:
      "Yes. Hiring managers in different domains expect domain verbs: data scientists evaluate and validate; DevOps engineers provision and harden; product managers prioritize and align. Using generic verbs on a specialized role resume signals a lack of domain fluency. See the role sections below for copy-ready lists.",
  },
  {
    question: "Can I use the same action verb more than once on a resume?",
    answer:
      "Occasionally, but not back-to-back. If you 'built' three different things at three different jobs, that repetition is fine. What to avoid is two consecutive bullets starting with the same verb — it reads like a copy-paste and makes the recruiter skim faster.",
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
  headline: `Resume Action Verbs (${CONTENT_FRESHNESS_YEAR}): 500+ by Role, Strength & ATS Impact`,
  description:
    "500+ resume action verbs organized by role, strength tier, and ATS impact with weak-verb replacements and before/after examples.",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas" },
  mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Strong Resume Action Verbs",
  description: "Top resume action verbs by category for ATS-friendly bullet points",
  numberOfItems: 60,
  itemListElement: [
    "drove", "increased", "reduced", "saved", "generated", "accelerated", "improved",
    "delivered", "grew", "boosted", "cut", "led", "owned", "spearheaded", "championed",
    "launched", "established", "directed", "analyzed", "diagnosed", "identified",
    "evaluated", "assessed", "resolved", "optimized", "streamlined", "aligned",
    "partnered", "facilitated", "presented", "translated", "coordinated", "synthesized",
    "built", "designed", "implemented", "developed", "deployed", "shipped", "engineered",
    "automated", "migrated", "measured", "tracked", "monitored", "quantified",
    "forecasted", "modeled", "validated", "tested", "benchmarked", "refactored",
    "scaled", "secured", "hardened", "provisioned", "fine-tuned", "trained", "evaluated",
  ].map((verb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: verb,
  })),
};

const VERB_CATEGORIES = [
  {
    label: "Impact & Results",
    color: "emerald",
    verbs: [
      "drove", "increased", "reduced", "saved", "generated", "accelerated",
      "improved", "doubled", "exceeded", "delivered", "grew", "boosted",
      "maximized", "cut", "achieved",
    ],
  },
  {
    label: "Leadership & Ownership",
    color: "sky",
    verbs: [
      "led", "owned", "spearheaded", "championed", "initiated",
      "founded", "launched", "established", "directed", "managed",
      "oversaw", "defined", "shaped", "steered", "guided",
    ],
  },
  {
    label: "Analysis & Problem-Solving",
    color: "violet",
    verbs: [
      "analyzed", "diagnosed", "identified", "evaluated", "assessed",
      "investigated", "resolved", "optimized", "streamlined", "audited",
      "mapped", "segmented", "forecasted", "benchmarked", "quantified",
    ],
  },
  {
    label: "Communication & Collaboration",
    color: "amber",
    verbs: [
      "aligned", "partnered", "facilitated", "presented", "translated",
      "documented", "coordinated", "collaborated", "synthesized", "communicated",
      "advocated", "influenced", "negotiated", "authored", "briefed",
    ],
  },
  {
    label: "Technical & Building",
    color: "slate",
    verbs: [
      "built", "designed", "implemented", "developed", "deployed",
      "shipped", "engineered", "architected", "integrated", "automated",
      "migrated", "refactored", "scaled", "secured", "hardened",
    ],
  },
  {
    label: "Data & Research",
    color: "rose",
    verbs: [
      "measured", "tracked", "monitored", "quantified", "forecasted",
      "modeled", "validated", "tested", "benchmarked", "calibrated",
      "predicted", "experimented", "published", "surfaced", "reported",
    ],
  },
] as const;

const WEAK_TO_STRONG = [
  { weak: "responsible for", strong: ["owned", "led", "managed", "directed"] },
  { weak: "worked on", strong: ["built", "shipped", "delivered", "developed"] },
  { weak: "helped", strong: ["accelerated", "contributed to", "enabled", "partnered on"] },
  { weak: "assisted with", strong: ["supported", "drove", "owned a portion of"] },
  { weak: "involved in", strong: ["built", "drove", "contributed", "led"] },
  { weak: "participated in", strong: ["led", "facilitated", "shaped", "collaborated on"] },
  { weak: "used [tool]", strong: ["leveraged", "deployed", "applied", "built with"] },
  { weak: "did [task]", strong: ["developed", "implemented", "delivered", "shipped"] },
  { weak: "managed (vague)", strong: ["owned", "directed", "oversaw", "scaled"] },
  { weak: "was responsible for", strong: ["owned", "led", "established", "drove"] },
] as const;

const ROLE_VERBS: { role: string; path: string; verbs: string[] }[] = [
  {
    role: "Data Analyst",
    path: "/data-analyst-resume-keywords",
    verbs: ["analyzed", "segmented", "diagnosed", "benchmarked", "automated", "modeled", "visualized", "surfaced", "quantified", "reported", "transformed", "identified"],
  },
  {
    role: "Data Scientist",
    path: "/data-scientist-resume-keywords",
    verbs: ["modeled", "experimented", "validated", "forecasted", "calibrated", "trained", "evaluated", "predicted", "optimized", "published", "designed", "reduced"],
  },
  {
    role: "Software Engineer",
    path: "/software-engineer-resume-keywords",
    verbs: ["shipped", "scaled", "refactored", "optimized", "stabilized", "designed", "implemented", "deployed", "debugged", "hardened", "built", "reduced"],
  },
  {
    role: "Product Manager",
    path: "/product-manager-resume-keywords",
    verbs: ["prioritized", "launched", "defined", "aligned", "iterated", "shipped", "discovered", "researched", "synthesized", "led", "drove", "increased"],
  },
  {
    role: "Business Analyst",
    path: "/business-analyst-resume-keywords",
    verbs: ["elicited", "mapped", "facilitated", "translated", "documented", "validated", "authored", "standardized", "reduced", "streamlined", "analyzed", "aligned"],
  },
  {
    role: "Frontend Developer",
    path: "/frontend-developer-resume-keywords",
    verbs: ["implemented", "improved", "instrumented", "tested", "hardened", "optimized", "rebuilt", "shipped", "refactored", "accelerated", "reduced", "migrated"],
  },
  {
    role: "Backend Developer",
    path: "/backend-developer-resume-keywords",
    verbs: ["designed", "secured", "cached", "deployed", "monitored", "scaled", "optimized", "migrated", "automated", "hardened", "reduced", "built"],
  },
  {
    role: "Machine Learning Engineer",
    path: "/machine-learning-engineer-resume-keywords",
    verbs: ["trained", "deployed", "monitored", "retrained", "optimized", "built", "evaluated", "fine-tuned", "reduced", "shipped", "scaled", "instrumented"],
  },
  {
    role: "DevOps Engineer",
    path: "/devops-engineer-resume-keywords",
    verbs: ["automated", "provisioned", "hardened", "observed", "recovered", "deployed", "optimized", "reduced", "migrated", "implemented", "standardized", "eliminated"],
  },
  {
    role: "Full-Stack Developer",
    path: "/full-stack-developer-resume-keywords",
    verbs: ["delivered", "integrated", "refined", "measured", "iterated", "built", "shipped", "scaled", "refactored", "designed", "migrated", "reduced"],
  },
];

const BEFORE_AFTER = [
  {
    before: "Responsible for managing the data pipeline.",
    after: "Owned and optimized the daily ETL pipeline, reducing processing time by 42% and improving data freshness from hourly to near-real-time.",
    role: "Data Engineer",
  },
  {
    before: "Helped with product launches.",
    after: "Partnered with product on 3 quarterly feature launches, driving 14% activation improvement across onboarding flows.",
    role: "Product Manager",
  },
  {
    before: "Used Python to analyze customer data.",
    after: "Analyzed churn signals in Python across 200K customer records, identifying 3 at-risk cohorts that reduced voluntary churn by 9%.",
    role: "Data Analyst",
  },
  {
    before: "Worked on improving the API performance.",
    after: "Optimized API response time from 420 ms to 95 ms by introducing query caching and connection pooling, eliminating 97% of timeout errors.",
    role: "Backend Developer",
  },
];

const colorMap: Record<string, string> = {
  emerald: "border-emerald-200 bg-emerald-50/50",
  sky: "border-sky-200 bg-sky-50/50",
  violet: "border-violet-200 bg-violet-50/50",
  amber: "border-amber-200 bg-amber-50/50",
  slate: "border-slate-200 bg-slate-50/60",
  rose: "border-rose-200 bg-rose-50/50",
};

export default function ResumeActionVerbsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, articleSchema, itemListSchema]) }}
      />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="page-prose-wide py-14 text-center sm:py-18">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            500+ verbs · by role · strength tier · ATS impact
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Resume action verbs ({CONTENT_FRESHNESS_YEAR})
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Strong action verbs make bullets faster to read and easier to remember — but the verb
            alone does not make the bullet strong. A bullet needs a verb, a scope, and an outcome.
            This page covers all three: copy-ready verb lists by category and role, weak-verb
            replacements, and before/after examples.
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-lg border border-sky-200 bg-sky-50/70 px-4 py-3 text-sm text-sky-950 text-left">
            <strong className="font-semibold">After you improve your verbs:</strong> paste your
            resume and the job description into ResumeAtlas to check if your new bullets match what
            this specific role is looking for.{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-semibold text-sky-800 underline underline-offset-2"
            >
              No signup needed — first scan is free
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={RESUME_WORK_EXPERIENCE_GUIDE_PATH}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Resume work experience guide
            </Link>
          </div>
          <LastUpdated
            className="mx-auto mt-6 text-center text-xs text-slate-500"
            label={CONTENT_LAST_UPDATED_LABEL}
          />
        </div>
      </section>

      <article className="page-prose space-y-14 py-12">

        {/* Quick-copy verb tables by category */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Strong action verbs by category (copy-ready)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Each category below targets a different dimension of work. Pick verbs from the category
            that matches what the bullet is actually about — then add scope and outcome.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {VERB_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className={`rounded-2xl border p-5 ${colorMap[cat.color]}`}
              >
                <h3 className="font-semibold text-slate-900">{cat.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.verbs.map((verb) => (
                    <span
                      key={verb}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-sm font-medium text-slate-800 shadow-sm"
                    >
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weak → Strong replacements */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Weak verbs to replace (and what to use instead)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            These are the most common weak openers on resumes. Each describes proximity to work,
            not ownership. Replace them with the alternatives below — then add what you specifically
            did and what changed.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-left">
                  <th className="px-4 py-3 font-semibold text-slate-700">Weak verb / phrase</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Replace with</th>
                </tr>
              </thead>
              <tbody>
                {WEAK_TO_STRONG.map((row, i) => (
                  <tr
                    key={row.weak}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                  >
                    <td className="px-4 py-3 text-rose-700 font-medium">{row.weak}</td>
                    <td className="px-4 py-3 text-slate-800">
                      {row.strong.map((v, j) => (
                        <span key={v}>
                          <span className="font-medium text-emerald-700">{v}</span>
                          {j < row.strong.length - 1 && (
                            <span className="text-slate-400"> · </span>
                          )}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Before / After examples + CTA #2 */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Before and after: verb upgrades in context
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Swapping the verb alone is not enough. The examples below show full bullet rewrites:
            stronger verb, clearer scope, specific outcome. The metric is what recruiters remember;
            the strong verb is what keeps them reading to find it.
          </p>
          <div className="space-y-4">
            {BEFORE_AFTER.map((ex) => (
              <div key={ex.before} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  {ex.role}
                </p>
                <div className="space-y-2">
                  <div className="flex gap-3 items-start">
                    <span className="mt-0.5 flex-shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                      Before
                    </span>
                    <p className="text-sm text-slate-600">{ex.before}</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="mt-0.5 flex-shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      After
                    </span>
                    <p className="text-sm font-medium text-slate-900">{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA #2 — after seeing examples, highest-intent moment */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
            <h3 className="font-semibold text-slate-900 sm:text-lg">
              Now check if your improved bullets match the job
            </h3>
            <p className="mt-2 text-sm text-slate-700 sm:text-base">
              A strong verb plus a good metric is a great bullet — but only if it matches what the
              specific job description is asking for. Paste your resume and the JD into ResumeAtlas
              to see keyword gaps, match score, and which bullets are landing. Free, no signup.
            </p>
            <div className="mt-4">
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Check if my bullets match this job — free
              </Link>
            </div>
          </div>
        </section>

        {/* Role-specific verbs */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Action verbs by role
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Hiring managers in each domain expect verbs that signal familiarity with that type of
            work. Generic verbs on a specialized resume read as imprecise. Use the lists below for
            role-specific bullet openers.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {ROLE_VERBS.map((rv) => (
              <div key={rv.role} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{rv.role}</h3>
                  <Link
                    href={rv.path}
                    className="text-xs font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    All {rv.role.split(" ")[0].toLowerCase()} keywords →
                  </Link>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {rv.verbs.map((verb) => (
                    <span
                      key={verb}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-sm font-medium text-slate-800 shadow-sm"
                    >
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ATS and verb strength */}
        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            What actually improves your ATS score — and what does not
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">
            ATS systems match keywords, not verb strength. "Drove revenue growth" and "was
            responsible for revenue" score identically if the role requires "revenue" — the verb
            makes no difference to the ATS.
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            What strong verbs <em>do</em> affect: recruiter read speed and retention. A bullet that
            leads with "drove" triggers faster comprehension than "was responsible for driving." In a
            30-second resume scan, faster comprehension means the metric actually gets read.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <strong className="text-slate-900">ATS keyword score:</strong> determined by matching
              specific terms from the job description — not by verb choice.
            </li>
            <li>
              <strong className="text-slate-900">Recruiter read speed:</strong> strong opening verb
              + clear scope = faster comprehension = metric gets seen.
            </li>
            <li>
              <strong className="text-slate-900">What to optimize first:</strong> keyword coverage
              (match the JD), then verb quality, then formatting.
            </li>
          </ul>
        </section>

        {/* How to write the full bullet */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            The anatomy of a strong bullet (verb is only step one)
          </h2>
          <p className="text-sm text-slate-700 sm:text-base">
            A strong resume bullet has three parts. Swapping the verb without the other two
            produces a better-sounding weak bullet.
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              <strong className="text-slate-900">Strong verb</strong> — shows ownership or
              direction (built, drove, reduced, led).
            </li>
            <li>
              <strong className="text-slate-900">Scope</strong> — what you acted on, at what scale
              (the checkout pipeline, across 3 markets, for 200K users).
            </li>
            <li>
              <strong className="text-slate-900">Outcome</strong> — what changed and by how much
              (reduced latency 40%, cut manual review time by 8 hours/week).
            </li>
          </ol>
          <p className="text-sm text-slate-700 sm:text-base">
            Example: <span className="font-medium text-slate-900">Built</span>{" "}
            <span className="text-slate-500">[verb]</span> the automated reconciliation pipeline for
            the AP team{" "}
            <span className="text-slate-500">[scope]</span>, reducing close cycle from 5 days to
            overnight{" "}
            <span className="text-slate-500">[outcome]</span>.
          </p>
        </section>

        {/* Related guides */}
        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Related guides</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <Link
                href={RESUME_WORK_EXPERIENCE_GUIDE_PATH}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume work experience examples & format
              </Link>{" "}
              — structure, dates, and ordering for the experience section
            </li>
            <li>
              <Link
                href={RESUME_SKILLS_GUIDE_PATH}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume skills examples & format
              </Link>{" "}
              — ATS-friendly skills section patterns by category
            </li>
            <li>
              <Link
                href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template guide
              </Link>{" "}
              — format, sections, and parsing rules
            </li>
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume vs job description checker
              </Link>{" "}
              — check if your improved bullets match the specific role
            </li>
          </ul>
        </section>

        {/* FAQ */}
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

        {/* CTA #3 — closing */}
        <section className="rounded-2xl border border-slate-900 bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-lg font-semibold sm:text-xl">
            Ready to check if your resume is competitive for this role?
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Strong verbs and tight bullets are the foundation — but the finish line is matching
            what the job actually asks for. Paste your resume and the job description to get a
            full match score, keyword gaps, and rejection risks. Free scan, no signup needed.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={RESUME_WORK_EXPERIENCE_GUIDE_PATH}
              className="inline-flex rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Work experience format guide
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
