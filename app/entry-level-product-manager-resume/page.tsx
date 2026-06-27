import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ENTRY_LEVEL_PRODUCT_MANAGER_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_ACTION_VERBS_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { roleResumePillarPath, roleResumeKeywordsPath } from "@/app/lib/searchIntentSeo";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${ENTRY_LEVEL_PRODUCT_MANAGER_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Entry Level Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide | ResumeAtlas`,
  description:
    `Entry level product manager resume examples, skills, summary, and ATS formatting for ${CONTENT_FRESHNESS_YEAR}. Before/after bullet rewrites for APM candidates and career changers with a free scan to check keyword match.`,
  alternates: { canonical: ENTRY_LEVEL_PRODUCT_MANAGER_RESUME_PATH },
  keywords: [
    "entry level product manager resume",
    "product manager resume no experience",
    "junior product manager resume",
    "APM resume",
    "associate product manager resume",
    "entry level PM resume examples",
    "product manager resume fresh graduate",
    "how to get into product management with no experience",
  ],
  openGraph: {
    title: `Entry Level Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide`,
    description:
      "Entry level product manager resume examples, summary, skills, and ATS tips. Before/after bullet rewrites for APM candidates, career changers, and new grads.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Entry Level Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide`,
    description:
      "Examples, summary, skills, and ATS tips for an entry level product manager resume. Free keyword scan before you apply.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my entry-level resume matches a PM job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full intelligence dashboard — keyword match score, rejection risks, and selectable fixes — in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "How do I write a product manager resume with no PM experience?",
    answer:
      "Map transferable experience to core PM competencies: user research, prioritization, data-driven decisions, cross-functional collaboration, and roadmap communication. A technical support role that involved collecting user feedback and escalating patterns to engineering is PM-adjacent. An analytics internship that produced a recommendation acted on by a team demonstrates product judgment. Write each bullet around a decision you influenced, a problem you defined, or an outcome you drove.",
  },
  {
    question: "What is an APM and how does an APM resume differ from a general PM resume?",
    answer:
      "Associate Product Manager (APM) programs are entry-level PM tracks at companies like Google, Microsoft, Facebook, and Stripe. APM applications are highly competitive and emphasize academic credentials, quantitative reasoning, communication, and culture fit over existing PM experience. An APM resume should lead with impact metrics from any adjacent role, emphasize analytical tools (SQL, Excel, Mixpanel), and demonstrate structured thinking in bullet framing.",
  },
  {
    question: "How long should an entry-level product manager resume be?",
    answer:
      "One page. Even career changers with 3–5 years of experience in an adjacent field should keep it to one tight page for entry-level PM roles. Recruiters for APM and junior PM roles scan fast — one focused page with 3–4 strong experience entries beats two pages with padding.",
  },
  {
    question: "What skills should I put on an entry-level product manager resume?",
    answer:
      "Prioritize skills that appear in the job description. For most entry-level PM and APM roles: product discovery, user research, A/B testing, roadmapping, Figma (wireframing), Jira, SQL or Excel, stakeholder communication, and competitive analysis. List only tools you have actually used — entry-level PM screens often include a quick 'walk me through how you used X' question.",
  },
  {
    question: "Can I get a PM job without any product experience?",
    answer:
      "Yes — but not without evidence of product thinking. Hiring managers for entry-level PM roles accept: UX research projects, analytics internships, growth or marketing roles with data work, side products you shipped (even small tools), customer-facing roles where you identified recurring patterns, and APM internship programs. The resume has to frame existing experience as product work — not list job titles and duties.",
  },
  {
    question: "Should I include a summary or objective on an entry-level PM resume?",
    answer:
      "A 2–3 line professional summary works better than an objective. Lead with your transferable specialty (research, analytics, technical), one quantified outcome from your strongest experience, and the type of PM role you're targeting. Avoid 'passionate about products' — it is the most common entry-level PM resume cliché and signals nothing.",
  },
  {
    question: "How do I tailor an entry-level product manager resume to a specific job description?",
    answer:
      "Read the JD and match the domain language. A B2B SaaS PM JD uses 'enterprise', 'customer success', and 'revenue impact'. A consumer JD uses 'engagement', 'retention', and 'user growth'. ResumeAtlas scans your resume against the specific posting and tells you which required terms are missing before you apply.",
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
  headline: `Entry Level Product Manager Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide`,
  description:
    "Entry level product manager resume examples, summary, skills, before/after bullet rewrites, ATS formatting, and a free keyword scan for APM candidates and career changers.",
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteBase },
    {
      "@type": "ListItem",
      position: 2,
      name: "Product Manager Resume Guide",
      item: `${siteBase}${roleResumePillarPath("product-manager")}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Entry Level Product Manager Resume",
      item: pageUrl,
    },
  ],
};

const SUMMARY_EXAMPLES = [
  {
    label: "Recent grad with UX / research background",
    text: "Product management candidate with a UX Research background and a published usability study that informed a redesign reducing task completion time by 22%. Proficient in Figma, Maze, and SQL. Seeking an APM or associate PM role where I can bridge user insights with engineering delivery.",
  },
  {
    label: "Career changer from analytics / growth",
    text: "Growth analyst pivoting to product management, bringing 2 years of A/B testing, funnel analysis in Mixpanel, and stakeholder reporting experience at a Series B SaaS company. Drove 3 retention experiments from hypothesis to readout; one became a permanent feature. Targeting PM roles in B2B SaaS with a metrics-focused culture.",
  },
  {
    label: "Technical background (engineering or data)",
    text: "Former data engineer transitioning to product management, with deep SQL, Python, and data pipeline experience across 3 years at a fintech startup. Built internal tooling used by 12 analysts daily — defined requirements, ran user interviews, prioritized the backlog, and managed go-live. Targeting PM roles at data-heavy or developer-tool companies.",
  },
] as const;

const WEAK_TO_STRONG_SUMMARY = {
  weak: "Recent graduate with a passion for technology and innovation, seeking an entry-level product manager role to learn and grow in a fast-paced environment.",
  strong: "UX-trained PM candidate with 3 shipped research studies and a Figma prototype that drove a pricing page redesign — conversion lift of 14% in a 3-week A/B test. Looking for an APM or junior PM role in a consumer or fintech product team.",
  fix: "Replace the aspiration with a specific tool, a project output, and a metric. 'Passion for technology' tells a recruiter nothing; a conversion lift from a prototype does.",
};

const SKILL_TIERS = {
  core: ["Product discovery", "User interviews", "A/B testing", "Roadmapping", "Stakeholder communication", "Jira / Linear", "SQL or Excel"],
  supporting: ["Figma (wireframing)", "Mixpanel / Amplitude", "Competitive analysis", "Customer journey mapping", "Go-to-market planning", "OKR definition"],
  signals: ["APM internship completed", "Side product shipped (with link)", "Product teardown published", "Completed PM certification (e.g., Pragmatic Institute, Reforge)", "Kaggle / SQL certificate"],
} as const;

const BULLET_PATTERNS = [
  {
    type: "Analytics or growth internship",
    pattern: "Analyzed / Identified / Proposed + problem + method + decision or outcome",
    weak: "Worked on data analysis projects and helped the team understand user behavior.",
    strong: "Analyzed 3-month Mixpanel funnel data to identify a 48% drop-off at step 3 of onboarding; proposed and documented a two-field simplification that reduced drop-off by 19% when tested with 500 users.",
    fix: "Own the analysis, name the tool, specify the problem found (48% drop-off), and attach the outcome from the test — not just the recommendation.",
  },
  {
    type: "Cross-functional project ownership",
    pattern: "Led / Defined / Scoped + initiative + collaborators + outcome",
    weak: "Helped coordinate between design and engineering teams on a new feature.",
    strong: "Defined requirements and wrote user stories for a notifications center redesign, collaborating with 2 designers and 4 engineers across 6-week sprint; feature shipped on time and reduced support tickets by 31%.",
    fix: "Own the scoping ('defined requirements'), name who you worked with, show a delivery outcome and a business impact.",
  },
  {
    type: "Research or side project",
    pattern: "Conducted / Shipped / Built + what + method + insight acted on",
    weak: "Did user research on a mobile app concept for a class project.",
    strong: "Conducted 12 user interviews and a competitive analysis for a mobile habit-tracking concept; synthesized findings into a 15-page spec and a Figma mid-fi prototype validated with 5 follow-up testers.",
    fix: "Specify the research method (12 interviews), the output (spec + prototype), and show the output was validated — not just created.",
  },
] as const;

const MISTAKES = [
  {
    mistake: "Writing bullets as a list of responsibilities instead of decisions and outcomes",
    fix: "PM resumes are judged on product thinking, not job duties. Replace 'responsible for gathering requirements' with 'defined requirements for X feature by interviewing 8 stakeholders; prioritized scope to reduce delivery risk by 40%'. Every bullet should have an action, a context, and a result.",
  },
  {
    mistake: "Using 'passionate about products' or 'product enthusiast' in the summary",
    fix: "Claim with evidence. Lead with a tool you know (Figma, SQL), a project that shipped or was tested, and a metric. Every entry-level PM candidate is 'passionate' — the one who names a result stands out.",
  },
  {
    mistake: "Listing PM skills without any bullet showing you applied them",
    fix: "If 'A/B testing' is in your skills section, a bullet somewhere must show the test you ran, what you measured, and what happened. Unanchored skill claims are the most common red flag on PM resumes.",
  },
  {
    mistake: "Skipping the tailoring step because 'PM resumes are generic'",
    fix: "B2B PM JDs use different vocabulary than consumer JDs. Developer-tools PM JDs weight technical fluency. Fintech JDs weight compliance awareness. ResumeAtlas scans your resume against the specific posting and shows keyword gaps in 60 seconds.",
  },
  {
    mistake: "Sending a multi-column or graphic-heavy resume",
    fix: "PM roles are screened by ATS first. Multi-column layouts corrupt keyword parsing. Graphic timelines and skill bars are not readable by ATS. Single-column, clean formatting only.",
  },
] as const;

export default function EntryLevelProductManagerResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={roleResumePillarPath("product-manager")} className="hover:text-gray-700">Product Manager Resume Guide</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Entry Level</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            Entry Level Product Manager Resume
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Entry Level Product Manager Resume ({CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            Built for APM candidates, career changers, and new grads breaking into product. Includes ATS format rules, skills guide, summary examples, and before/after bullet rewrites that translate transferable experience into PM language.
          </p>
          <p className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            No PM title yet? These examples are written for research backgrounds, analytics roles, engineering-to-PM pivots, and side projects — not two years of roadmap ownership.
          </p>
          <p className="mb-6 text-sm text-gray-500">
            No signup needed for the first scan &middot; Results in about 60 seconds &middot; Full intelligence dashboard
          </p>

          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Check my resume against the job description — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">
            Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds
          </p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        {/* Definition block */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            What does an entry-level product manager resume actually need?
          </h2>
          <p className="mb-3 text-gray-700">
            Entry-level PM hiring managers know you don&apos;t have a three-year roadmap track record. They are screening for product thinking: evidence that you have identified a user problem, framed it as a structured opportunity, and contributed to a decision about how to address it. That evidence can come from a research project, an analytics internship, a technical role, or a side product you shipped.
          </p>
          <p className="text-gray-700">
            ATS screening for PM roles is surprisingly specific. A B2B PM JD that says &ldquo;Jira&rdquo; and &ldquo;OKRs&rdquo; will not match &ldquo;project management tools&rdquo;. A consumer JD that says &ldquo;engagement metrics&rdquo; and &ldquo;Mixpanel&rdquo; will not match &ldquo;data analysis experience&rdquo;. Check the keyword gap before you apply — it takes 60 seconds.
          </p>
        </section>

        {/* Summary examples */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Entry Level Product Manager Resume Summary Examples
          </h2>
          <div className="space-y-5">
            {SUMMARY_EXAMPLES.map((ex) => (
              <div key={ex.label} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{ex.label}</p>
                <blockquote className="text-sm leading-relaxed text-gray-700 italic">
                  &ldquo;{ex.text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 p-5">
            <p className="mb-3 text-sm font-semibold text-gray-700">Summary rewrite — weak vs strong</p>
            <div className="mb-3 rounded-lg bg-red-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-red-600">Before</p>
              <p className="text-sm text-gray-700 italic">&ldquo;{WEAK_TO_STRONG_SUMMARY.weak}&rdquo;</p>
            </div>
            <div className="mb-3 rounded-lg bg-green-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-green-600">After</p>
              <p className="text-sm text-gray-700 italic">&ldquo;{WEAK_TO_STRONG_SUMMARY.strong}&rdquo;</p>
            </div>
            <p className="text-xs text-gray-500">{WEAK_TO_STRONG_SUMMARY.fix}</p>
          </div>
        </section>

        {/* Skills section */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Entry Level Product Manager Skills for a Resume
          </h2>
          <p className="mb-4 text-gray-600">
            Only include skills you can answer a &ldquo;walk me through how you used X&rdquo; question about. Entry-level PM screens frequently probe skills listed on the resume.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Core — most JDs will filter for these</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.core.map((s) => (
                  <span key={s} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Supporting — include with real project exposure</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.supporting.map((s) => (
                  <span key={s} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Signals — optional but high-value for entry-level PM</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.signals.map((s) => (
                  <span key={s} className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-800">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience bullets */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            How to Write Experience Bullets That Translate Transferable Experience Into PM Language
          </h2>
          <p className="mb-5 text-gray-600">
            PM bullets should show decision-making, not task completion. Here are three transferable-experience patterns with before/after examples:
          </p>
          <div className="space-y-6">
            {BULLET_PATTERNS.map((bp) => (
              <div key={bp.type} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-1 text-sm font-semibold text-gray-800">{bp.type}</p>
                <p className="mb-3 text-xs text-gray-500 italic">Pattern: {bp.pattern}</p>
                <div className="mb-2 rounded-lg bg-red-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-red-600">Before</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{bp.weak}&rdquo;</p>
                </div>
                <div className="mb-2 rounded-lg bg-green-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-green-600">After</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{bp.strong}&rdquo;</p>
                </div>
                <p className="text-xs text-gray-500">{bp.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA #2 */}
        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">
            Your bullets might still miss the keywords this PM posting requires.
          </p>
          <p className="mb-4 text-sm text-blue-700">
            B2B and consumer PM JDs use different vocabulary. Even well-framed transferable bullets miss ATS screening if the exact terms don&apos;t match the posting. ResumeAtlas checks the keyword gap in 60 seconds — no signup needed.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Check keyword match — free
            </Link>
            <span className="text-xs text-blue-600">No signup needed for first scan</span>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-blue-700">
            <li>✓ Full intelligence dashboard — not a partial preview</li>
            <li>✓ Keyword coverage, rejection risks, and selectable fixes</li>
            <li>✓ Results in about 60 seconds</li>
          </ul>
        </div>

        {/* ATS format */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">ATS Format Rules for Entry-Level PM Resumes</h2>
          <ul className="space-y-3">
            {[
              "Single-column layout — multi-column breaks ATS parsing and is especially common on PM resumes that try to look 'designed'.",
              "No skill-bar graphics or visual timelines — not readable by ATS and signal low technical awareness.",
              'Standard headings: "Work Experience", "Projects", "Education", "Skills" — no renaming.',
              "Selectable PDF only — never a screenshot, scanned image, or image-based PDF.",
              "Keep your LinkedIn URL current — PM recruiters cross-reference LinkedIn and resume dates within minutes.",
            ].map((rule, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex-shrink-0 text-blue-500" aria-hidden="true">→</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            Full format checklist:{" "}
            <Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">
              ATS resume checklist — 30-point pre-submission guide
            </Link>
          </p>
        </section>

        {/* Common mistakes */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Common Entry-Level Product Manager Resume Mistakes</h2>
          <div className="space-y-4">
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-4">
                <p className="mb-1 text-sm font-semibold text-red-700">✗ {m.mistake}</p>
                <p className="text-sm text-gray-600">Fix: {m.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related guides */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Product Manager Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={roleResumePillarPath("product-manager")} className="text-blue-600 hover:underline">Product manager resume guide — career-neutral examples and bullets</Link></li>
            <li><Link href={roleResumeKeywordsPath("product-manager")} className="text-blue-600 hover:underline">Product manager resume keywords — full ATS keyword list</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary examples — 50+ by role and level</Link></li>
            <li><Link href={RESUME_SKILLS_GUIDE_PATH} className="text-blue-600 hover:underline">Resume skills examples — ATS-friendly skills section format</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission check</Link></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Entry Level Product Manager Resume — FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA #3 */}
        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">You&apos;ve framed the experience. Now make sure the keywords match.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Entry-level PM candidates are rejected by ATS before a human reads their resume — not because their experience isn&apos;t relevant, but because it doesn&apos;t use the exact vocabulary the posting requires. Paste your resume and the job description into ResumeAtlas. Full keyword match score, rejection risks, and selectable fixes in about 60 seconds.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100"
          >
            Check my entry-level resume — no signup needed
          </Link>
          <p className="mt-3 text-xs text-gray-400">
            Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds
          </p>
        </section>
      </main>
    </>
  );
}
