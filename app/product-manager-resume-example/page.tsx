import type { Metadata } from "next";
import Link from "next/link";
import { ResumeExampleSeoFunnel } from "@/app/components/ResumeExampleSeoFunnel";
import {
  ResumeExampleAtsScoreCta,
  ResumeExampleExploreMoreFooter,
  ResumeExampleSeoBulletSamplesSection,
  ResumeExampleSeoIntro,
  ResumeExampleStandardFaqBlock,
  ResumeExampleTopAtsKeywordsSection,
} from "@/app/components/ResumeExampleSeoTemplate";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
} from "@/app/lib/internalLinks";
import {
  buildResumeExampleMetadata,
  DEFAULT_SEO_SAMPLE_BULLETS,
  DEFAULT_TOP_ATS_KEYWORDS,
  getResumeExampleSerpTitle,
  mergeResumeExampleFaqSchema,
  type FaqSchemaEntity,
} from "@/app/lib/resumeExampleSeoTemplate";
import { goodResumeSnippet } from "@/app/lib/roleHubSeo";

const ROLE = "Product Manager";

const JD_CHECK_HREF = CHECK_RESUME_AGAINST_JD_FORM_HREF;
const KEYWORD_SCANNER_HREF = "/resume-keyword-scanner";
const ATS_CHECKER_HREF = "/ats-resume-checker";

const CANONICAL_PATH = "/product-manager-resume-example";

export const metadata: Metadata = {
  ...buildResumeExampleMetadata(CANONICAL_PATH, "product-manager"),
  keywords: [
    "resume for product manager",
    "product management resume examples",
    "product lead resume",
    "sample resume product manager",
    "resume for product management",
    "product manager resume",
    "data product manager resume",
    "product management resume",
    "resume of product manager",
    "product manager resume examples",
    "api product manager resume",
    "product manager resume sample",
    "product manager resume templates",
    "sample product manager resume",
    "product manager resumes",
    "product manager resume template",
    "b2b product manager resume",
    "sample product manager resumes",
    "PM resume example",
    "ATS resume example",
  ],
};

const COPY_PASTE_TEMPLATE = `ALEX RIVERA
Product Manager
New York, NY | alex.rivera@email.com | linkedin.com/in/alexrivera

SUMMARY
Product manager with experience in product strategy, user research, and data-driven decision making. Skilled in roadmap planning and improving conversion metrics.

SKILLS
• Product strategy, Roadmapping
• SQL, Data analysis
• User research, A/B testing
• Stakeholder management

EXPERIENCE

Product Manager | Meridian Software | 2021 - Present
• Led launch of a feature increasing user retention by 18%
• Defined roadmap aligned with business goals across 3 teams
• Used SQL to analyze user behavior and optimize funnel

Associate Product Manager | Meridian Software | 2019 - 2021
• Conducted user research leading to 2 major feature improvements
• Collaborated with engineering and design to ship features faster

PROJECTS

Growth Optimization Initiative
• Improved onboarding conversion by 22% through experimentation

EDUCATION
MBA, State University, 2019
B.S. Business Administration, State University, 2014`;

const faqLegacyEntities: FaqSchemaEntity[] = [
  {
    "@type": "Question",
    name: "What is a good product manager resume?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "A good product manager resume proves impact with metrics (retention, revenue, adoption) and shows how you used research, roadmapping, and data. It should mirror the job description you are applying for, not a generic list of tasks.",
    },
  },
  {
    "@type": "Question",
    name: "What should a resume for a product manager include?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Include scope (B2B, API, platform, or consumer where true), outcomes with numbers, and how you worked with design and engineering. Product lead and senior roles should show strategy and stakeholder breadth; specialist PMs (data product manager, API product manager) should name the systems and metrics you owned.",
    },
  },
  {
    "@type": "Question",
    name: "How do product management resume examples differ for B2B or API PMs?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "B2B product manager resumes emphasize revenue, expansion, and stakeholder workflows. API product manager resumes should cite developer experience, adoption, reliability SLAs, and partner integrations. Use the same ATS-friendly layout; swap bullets so they match the posting.",
    },
  },
  {
    "@type": "Question",
    name: "How do I write a product manager resume with no experience?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Lean on internships, side projects, and cross-functional work: ship narratives with outcomes, cite tools (docs, SQL, analytics), and show how you prioritized. Entry-level and junior PMs still win by matching keywords to the posting.",
    },
  },
  {
    "@type": "Question",
    name: "What skills should a product manager include in a resume?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Include roadmapping, stakeholder communication, user research, SQL or data analysis where true, experimentation, and prioritization frameworks, always tied to examples. Senior PMs add strategy and org scope; align depth to the role.",
    },
  },
];

const faqPageSchema = mergeResumeExampleFaqSchema(ROLE, faqLegacyEntities);

const copyPasteExampleBullets = [
  "Led product launch increasing retention by 18%",
  "Defined roadmap for $5M ARR product",
  "Conducted user research improving feature adoption by 22%",
];

const copyPasteItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Product Manager Resume Example (Copy & Paste)",
  itemListElement: copyPasteExampleBullets.map((text, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: text,
  })),
} as const;

export default function ProductManagerResumeExamplePage() {
  const goodResumeLines = goodResumeSnippet("product-manager", "Product Manager");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {getResumeExampleSerpTitle("product-manager")}
          </h1>
          <ResumeExampleSeoIntro role={ROLE} />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Takes 10 seconds • No signup required
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={JD_CHECK_HREF}
              className="inline-flex justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-slate-800"
            >
              Optimize this resume for a job description
            </Link>
            <Link
              href={KEYWORD_SCANNER_HREF}
              className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Find missing keywords in your resume
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-4">
          <ResumeExampleTopAtsKeywordsSection role={ROLE} keywords={DEFAULT_TOP_ATS_KEYWORDS["product-manager"]} />
          <Link
            href={KEYWORD_SCANNER_HREF}
            className="inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            Scan my resume for missing keywords
          </Link>
        </div>

        <ResumeExampleSeoBulletSamplesSection role={ROLE} bullets={DEFAULT_SEO_SAMPLE_BULLETS["product-manager"]} />

        <ResumeExampleAtsScoreCta />

        <section aria-labelledby="resume-examples-h2" className="space-y-10">
          <h2 id="resume-examples-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Resume Examples
          </h2>

          <div className="space-y-3">
            <h3 id="copy-paste-snippet" className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Product Manager Resume Example (Copy &amp; Paste)
            </h3>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Steal the structure, then rewrite with your own launches and numbers. This is the
              &quot;resume example&quot; block search engines and candidates scan first.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-800 sm:text-base">
              {copyPasteExampleBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

        {/* Featured-snippet style answer */}
        <section
          aria-labelledby="what-is-good-pm-resume"
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h3
            id="what-is-good-pm-resume"
            className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            What is a good product manager resume?
          </h3>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">{goodResumeLines.line1}</p>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">{goodResumeLines.line2}</p>
        </section>

        <ResumeExampleSeoFunnel />

        {/* 2. Full resume example */}
        <div>
          <h3 id="resume-preview-heading" className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Full resume sample (ATS-friendly layout)
          </h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
              <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Resume preview (ATS-friendly layout)
              </p>
            </div>
            <div className="space-y-5 px-5 py-6 text-sm leading-relaxed text-slate-800 sm:px-8 sm:py-8 sm:text-[15px]">
              <header className="text-center">
                <p className="text-lg font-semibold tracking-tight text-slate-900">Alex Rivera</p>
                <p className="mt-1 text-slate-700">Product Manager</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  New York, NY · alex.rivera@email.com · linkedin.com/in/alexrivera
                </p>
              </header>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Summary
                </h3>
                <p className="mt-2 text-slate-700">
                  Product manager with experience in product strategy, user research, and data-driven
                  decision making. Skilled in roadmap planning and improving conversion metrics.
                </p>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Skills
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  <li>Product strategy, Roadmapping</li>
                  <li>SQL, Data analysis</li>
                  <li>User research, A/B testing</li>
                  <li>Stakeholder management</li>
                </ul>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Experience
                </h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Product Manager · Meridian Software{" "}
                      <span className="font-normal text-slate-600">(2021-Present)</span>
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                      <li>Led launch of feature increasing user retention by 18%</li>
                      <li>Defined roadmap aligned with business goals across 3 teams</li>
                      <li>Used SQL to analyze user behavior and optimize funnel</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Associate Product Manager · Meridian Software{" "}
                      <span className="font-normal text-slate-600">(2019-2021)</span>
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                      <li>Conducted user research leading to 2 major feature improvements</li>
                      <li>Collaborated with engineering and design to ship features faster</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Projects
                </h3>
                <div className="mt-2">
                  <p className="font-medium text-slate-900">Growth Optimization Initiative</p>
                  <ul className="mt-1 list-disc pl-5 text-slate-700">
                    <li>Improved onboarding conversion by 22% through experimentation</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                  Education
                </h3>
                <p className="mt-2 text-slate-700">MBA, State University, 2019</p>
                <p className="mt-1 text-slate-700">B.S. Business Administration, State University, 2014</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Template */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Product Manager Resume Template (Copy-Paste)
          </h3>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Plain text, one column, standard headings. Easy for ATS to read. Copy into Word or Google
            Docs and replace with your details.
          </p>
          <pre className="mt-4 max-h-[min(28rem,70vh)] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-800 sm:p-5 sm:text-[13px]">
            {COPY_PASTE_TEMPLATE}
          </pre>
        </div>
        </section>

        {/* 4. Bullet point bridge */}
        <section aria-labelledby="resume-bullet-points-h2">
          <h2 id="resume-bullet-points-h2" className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Resume Bullet Points
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Hiring managers skim for outcomes. Lead with impact, scope, and the metrics that matter
            to the business.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              Owned roadmap for onboarding; shipped experiments that lifted activation from 34% to 41%
              in two quarters.
            </li>
            <li>
              Partnered with analytics on funnel SQL models; prioritized fixes that cut signup
              drop-off by 18% at the top of the funnel.
            </li>
            <li>
              Ran qualitative research with 24 customers; translated themes into a PRD that
              aligned design, eng, and GTM on one release.
            </li>
            <li>
              Negotiated scope with stakeholders for a platform migration; delivered on time with no
              P0 incidents in the first 30 days post-launch.
            </li>
            <li>
              Defined North Star KPIs for a new growth area; exec reviews cited the dashboard in weekly
              business reviews.
            </li>
            <li>
              Led pricing and packaging experiment; ARPU increased 6% with stable churn over 90
              days.
            </li>
          </ul>
          <p className="mt-5 text-sm text-slate-600">
            <Link
              href="/product-manager-resume-bullet-points"
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              See more product manager resume bullet points
            </Link>
            .
          </p>
        </section>

        {/* 5. Common mistakes */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Common Mistakes in Product Manager Resumes
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              <strong className="text-slate-900">No measurable impact</strong>: “Owned roadmap”
              without a number leaves room for doubt. Tie work to retention, revenue, or velocity.
            </li>
            <li>
              <strong className="text-slate-900">Too generic (no product metrics)</strong>: ATS and
              humans both look for conversion, adoption, or NPS-style language when it fits your
              story.
            </li>
            <li>
              <strong className="text-slate-900">Missing keywords (SQL, roadmap, user research)</strong>{" "}
              If the job asks for them and you have them, say so in context, not just in a keyword
              dump.
            </li>
            <li>
              <strong className="text-slate-900">Not aligned with job description</strong>: Most
              resumes fail here. One-size-fits-all PM resumes rarely match the seniority or domain
              of the role.
            </li>
          </ul>
          <Link
            href="/problems/ats-rejecting-my-resume"
            className="mt-6 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            Fix why your resume is getting rejected
          </Link>
        </section>

        {/* 6. Core conversion */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Check if Your Resume Matches the Job Description
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Most product manager resumes fail because they don&apos;t match the job description. See
            exactly what&apos;s missing in seconds.
          </p>
          <Link
            href={JD_CHECK_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:text-base"
          >
            Optimize this resume for a job description
          </Link>
        </section>

        {/* 7. ATS */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How to Make Your Resume ATS-Friendly
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Use simple headings (Summary, Experience, Skills, Education), avoid tables and images for
            core text, and export a clean PDF or DOCX. Most ATS issues are parse and keyword
            alignment, not fancy design.
          </p>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Use our{" "}
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS resume template
            </Link>{" "}
            hub for previews + copy-paste starters, then lock in an{" "}
            <Link
              href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-resume-format`}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS-friendly resume format
            </Link>
            . Want a quick sanity check before you apply? Run the{" "}
            <Link
              href={ATS_CHECKER_HREF}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS resume checker
            </Link>
            .
          </p>
        </section>

        {/* 8. FAQ */}
        <section id="faq">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Frequently Asked Questions
          </h2>
          <ResumeExampleStandardFaqBlock role={ROLE} />
          <h3 className="mt-10 text-lg font-semibold tracking-tight text-slate-900">More answers</h3>
          <div className="mt-4 space-y-3">
            {faqLegacyEntities.map((q) => (
              <details
                key={q.name}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">{q.name}</span>
                  <span className="text-xs text-slate-400 group-open:hidden">+</span>
                  <span className="hidden text-xs text-slate-400 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <ResumeExampleExploreMoreFooter currentRole="product-manager" />
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(copyPasteItemListSchema) }}
      />
    </div>
  );
}
