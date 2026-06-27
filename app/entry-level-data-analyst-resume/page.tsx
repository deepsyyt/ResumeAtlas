import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_ACTION_VERBS_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { roleResumePillarPath, roleResumeKeywordsPath } from "@/app/lib/searchIntentSeo";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Entry Level Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): Examples, Skills & ATS Tips | ResumeAtlas`,
  description:
    `Entry level data analyst resume examples, skills section, summary, and ATS formatting for ${CONTENT_FRESHNESS_YEAR}. Includes before/after bullet rewrites and a free scan to check keyword match before you apply.`,
  alternates: { canonical: ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH },
  keywords: [
    "entry level data analyst resume",
    "data analyst resume no experience",
    "junior data analyst resume",
    "entry level data analyst resume examples",
    "data analyst resume fresh graduate",
    "data analyst skills for resume entry level",
    "data analyst resume with no experience",
    "entry level data analyst resume summary",
  ],
  openGraph: {
    title: `Entry Level Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): Examples, Skills & ATS Tips`,
    description:
      "Entry level data analyst resume examples, summary, skills, and ATS formatting. Before/after bullet rewrites and a free keyword scan for any job description.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Entry Level Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Tips`,
    description:
      "Examples, skills, summary, and ATS tips for an entry level data analyst resume. Free keyword scan to check match before you apply.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my entry-level resume matches a job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full intelligence dashboard — keyword match score, rejection risks, and selectable fixes — in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "How do I write a data analyst resume with no experience?",
    answer:
      "Focus on SQL coursework, Excel projects, academic analyses, Kaggle competitions, and any internship work. Use the same bullet structure as experienced candidates: action verb + tool + task + result. A capstone project with a real dataset and a finding that informed a decision is legitimate experience. List the exact tools and methods required by each posting — even if your exposure was coursework.",
  },
  {
    question: "Should I include my GPA on an entry-level data analyst resume?",
    answer:
      "Yes, if it is 3.5 or above and you are within 3 years of graduation. GPA is a proxy for work ethic and learning ability when you have limited professional experience. Remove it once you have 2+ years of relevant work history.",
  },
  {
    question: "How long should an entry-level data analyst resume be?",
    answer:
      "One page. You do not have enough relevant work history to justify two pages, and recruiters for entry-level roles scan fast. Use the space efficiently: a focused summary, a skills section with exact-match terms, and 2–3 project or internship entries with strong bullets.",
  },
  {
    question: "Can I use coursework or academic projects as experience on a data analyst resume?",
    answer:
      "Yes. Create a 'Projects' or 'Academic Projects' section and treat each project as a mini work entry — dataset, tools used, analytical approach, and a finding or result. SQL queries that answered a real business question, regression models that predicted an outcome, or dashboards built for a class are all valid. Name the tools exactly as they appear in the job description.",
  },
  {
    question: "What is the most important skill for an entry-level data analyst resume?",
    answer:
      "SQL. Nearly every data analyst job description lists SQL as a required skill, and it is the most filtered-for term in ATS screening. After SQL, Python (especially pandas) and Excel are the next highest-value skills for entry-level roles. List only tools you have actually used.",
  },
  {
    question: "Should I include a summary or objective on an entry-level data analyst resume?",
    answer:
      "A brief professional summary (2–3 lines) is better than an objective statement. Lead with your analytical focus, the tools you know, and one outcome signal from your strongest project. Avoid generic phrases like 'passionate about data' — name a specific tool and a result instead.",
  },
  {
    question: "How do I tailor an entry-level data analyst resume to a specific job description?",
    answer:
      "Compare your resume to the posting and match the exact tool names and skill terms required. If the posting says 'Power BI' and your resume says 'data visualization', you will not match ATS screening. Use ResumeAtlas to see which specific terms are missing from your resume for each posting before you apply.",
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
  headline: `Entry Level Data Analyst Resume (${CONTENT_FRESHNESS_YEAR}): Examples, Skills & ATS Tips`,
  description:
    "Entry level data analyst resume examples, summary, skills section, bullet rewrites, ATS formatting, and a free keyword scan to verify match before applying.",
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
      name: "Data Analyst Resume Guide",
      item: `${siteBase}${roleResumePillarPath("data-analyst")}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Entry Level Data Analyst Resume",
      item: pageUrl,
    },
  ],
};

const SUMMARY_EXAMPLES = [
  {
    label: "No work experience (coursework and projects)",
    text: "Data analyst with a degree in Economics and hands-on SQL and Python experience from academic projects and Kaggle competitions. Built a customer segmentation analysis in Python (pandas, seaborn) for a capstone project, identifying three behavioral clusters that informed a mock retention strategy. Comfortable with Tableau for visualization and Excel for ad-hoc analysis.",
  },
  {
    label: "With an internship",
    text: "Aspiring data analyst with a 3-month analytics internship at a SaaS company, where I wrote SQL queries to support weekly funnel reporting and built two Looker dashboards used by the growth team. Proficient in Python, SQL, and Excel. Pursuing a data analyst role to apply quantitative skills to real product decisions.",
  },
  {
    label: "Career changer",
    text: "Former marketing coordinator pivoting to data analysis, bringing 2 years of Excel-based reporting, A/B test interpretation, and Google Analytics experience. Completed Google Data Analytics Certificate and a self-directed SQL capstone analyzing e-commerce conversion data. Strongest in translating analytical findings into business-facing summaries.",
  },
] as const;

const WEAK_TO_STRONG_SUMMARY = {
  weak: "Recent graduate seeking entry-level data analyst position to use my analytical skills and passion for data to contribute to a dynamic team.",
  strong: "Data analyst graduate with SQL, Python (pandas), and Tableau skills applied across 3 capstone projects, including a churn analysis that identified a 12% at-risk segment. Looking to bring quantitative rigor to product or growth analytics.",
  fix: "Replace the intention (seeking, passionate) with the tool stack and a project result. Hiring managers want evidence, not ambition.",
};

const SKILL_TIERS = {
  core: ["SQL", "Excel", "Python (pandas, NumPy)", "Data visualization (Tableau or Power BI)", "Google Sheets"],
  supporting: ["R", "dbt", "Looker / Metabase", "A/B testing basics", "Statistical analysis", "Data cleaning", "Cohort analysis"],
  signals: ["Google Data Analytics Certificate", "Kaggle competitions (rank or medal)", "Mode Analytics", "BigQuery", "Jupyter Notebooks"],
} as const;

const BULLET_PATTERNS = [
  {
    type: "Internship",
    pattern: "Action verb + tool + task + outcome or scope",
    weak: "Helped with data analysis and reporting tasks during internship.",
    strong: "Wrote 15 SQL queries in Looker to support weekly retention reporting; findings fed into a campaign that reduced churn by 6% in Q3.",
    fix: "Own the verb ('wrote'), name the tool, give a scope (15 queries), and attach the downstream result.",
  },
  {
    type: "Academic project",
    pattern: "Built/Designed/Analyzed + project name + stack + finding or result",
    weak: "Analyzed data for a class project on customer behavior.",
    strong: "Analyzed 50K customer transactions in Python (pandas) for a capstone project; identified 3 behavioral segments using K-means clustering, with findings presented to a panel of marketing faculty.",
    fix: "Name the dataset size, the method, the tools, and what the output informed.",
  },
  {
    type: "Personal / self-directed project",
    pattern: "Created + project description + what you found or built",
    weak: "Did a data project on Kaggle to practice SQL.",
    strong: "Completed Kaggle 'House Prices' competition in Python and SQL; feature-engineered 12 variables, achieving top-18% RMSE on the public leaderboard.",
    fix: "Cite the competition name, the metric, and your ranking — specificity is credibility.",
  },
] as const;

const MISTAKES = [
  {
    mistake: "Listing SQL or Python in skills without any bullet showing where you used them",
    fix: "Every skill in your skills section must appear in at least one project or experience bullet. Unanchored skills score lower in ATS and read as padding to recruiters.",
  },
  {
    mistake: "Writing a generic objective statement ('seeking a challenging position…')",
    fix: "Replace with a 2–3 line summary: tools you know + strongest project result + the type of role you're targeting. Specificity is more credible than aspiration.",
  },
  {
    mistake: "Leaving out GPA when it's 3.5+ and you're a recent graduate",
    fix: "GPA is a legitimate proxy for analytical ability when you have no work history. Include it in the Education section: 'GPA: 3.7/4.0'. Remove once you have 2+ years of work experience.",
  },
  {
    mistake: "Using a two-column layout to 'fit more content'",
    fix: "Multi-column layouts break ATS parsing. Skills from the left column get mixed into the experience text from the right column, corrupting keyword matching. Use a single-column layout.",
  },
  {
    mistake: "Submitting the same resume to every posting without adjusting for the specific JD",
    fix: "Each posting uses different exact-match terms (Power BI vs Tableau, pandas vs NumPy). A scan against the specific job description takes 60 seconds and tells you exactly which terms to add.",
  },
] as const;

export default function EntryLevelDataAnalystResumePage() {
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
          <Link href={roleResumePillarPath("data-analyst")} className="hover:text-gray-700">Data Analyst Resume Guide</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Entry Level</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            Entry Level Data Analyst Resume
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Entry Level Data Analyst Resume ({CONTENT_FRESHNESS_YEAR}): Examples, Skills & ATS Tips
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            Built for candidates with limited work experience — SQL coursework, capstone projects, Kaggle competitions, and internships. Includes ATS format rules, skills guide, summary examples, and bullet rewrites.
          </p>
          <p className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            No analytics job experience yet? These examples are designed for SQL coursework, Python capstones, academic analyses, and internships — not three years of dashboards.
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
            What does an entry-level data analyst resume actually need?
          </h2>
          <p className="mb-3 text-gray-700">
            Entry-level hiring managers are not expecting 3–5 years of dashboards and A/B testing. They are screening for SQL proficiency, evidence of quantitative thinking, and proof you can translate a dataset into a clear finding. Project work — from a capstone, a Kaggle competition, or a self-directed analysis — counts as evidence when it is written up correctly.
          </p>
          <p className="text-gray-700">
            ATS screening for entry-level roles is identical to senior roles: keyword matching against the posting. If the job description says "Power BI" and your resume says "data visualization tools," you will not match. Use the exact tool names from each posting, even if your exposure was coursework. The scan that takes 60 seconds tells you which terms are missing before you apply.
          </p>
        </section>

        {/* Summary examples */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Entry Level Data Analyst Resume Summary Examples
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

          {/* Weak → strong summary */}
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
            Entry Level Data Analyst Skills for a Resume
          </h2>
          <p className="mb-4 text-gray-600">
            Only list skills you can discuss in an interview. Listing Tableau without being able to show a real dashboard or explain a design decision will hurt you in technical screens.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Core — include if you know them (most postings require these)</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.core.map((s) => (
                  <span key={s} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Supporting — include where you have real exposure</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.supporting.map((s) => (
                  <span key={s} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Signals — optional but high-value for entry-level</p>
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
            How to Write Experience Bullets With No or Limited Experience
          </h2>
          <p className="mb-5 text-gray-600">
            Use the same action-verb + tool + outcome structure as experienced candidates. The difference is that your context is a project or internship, not a full-time role. Here are three patterns with before/after examples:
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

        {/* CTA #2 — after bullets, highest-intent moment */}
        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">
            Your bullets might still miss the ATS keywords for this specific posting.
          </p>
          <p className="mb-4 text-sm text-blue-700">
            Even well-written entry-level bullets miss required terms when they&apos;re not matched to the posting. ResumeAtlas compares your resume to the job description — keyword gaps, rejection risks, and selectable fixes in 60 seconds.
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
          <h2 className="mb-3 text-xl font-semibold text-gray-900">ATS Format Rules for Entry-Level Resumes</h2>
          <ul className="space-y-3">
            {[
              "Single-column layout only — multi-column breaks ATS parsing and mixes skills text with experience text.",
              'Standard section headings: "Work Experience" or "Projects", "Education", "Skills" — not "My Story" or "What I Bring".',
              "Selectable PDF or .docx — never a scanned image or screenshot.",
              "No objective statement — a focused 2–3 line summary with tools and a result is more credible.",
              "LinkedIn dates must match resume dates exactly — recruiters cross-reference both.",
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Common Entry-Level Data Analyst Resume Mistakes</h2>
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Data Analyst Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={roleResumePillarPath("data-analyst")} className="text-blue-600 hover:underline">Data analyst resume guide — career-neutral examples and bullets</Link></li>
            <li><Link href={roleResumeKeywordsPath("data-analyst")} className="text-blue-600 hover:underline">Data analyst resume keywords — full ATS keyword list</Link></li>
            <li><Link href="/data-analyst-resume-bullet-points" className="text-blue-600 hover:underline">Data analyst resume bullet points — entry-level, junior, and senior examples</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary examples — 50+ by role and level</Link></li>
            <li><Link href={RESUME_SKILLS_GUIDE_PATH} className="text-blue-600 hover:underline">Resume skills examples — ATS-friendly skills section format</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission check</Link></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Entry Level Data Analyst Resume — FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA #3 — dark closing panel */}
        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">You&apos;ve done the work. Now check if the keywords match.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Entry-level candidates are rejected by ATS before a human reads their resume — not because they lack ability, but because their resume doesn&apos;t use the exact terms the posting requires. Paste your resume and the job description into ResumeAtlas. Full keyword match score, rejection risks, and selectable fixes in about 60 seconds.
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
