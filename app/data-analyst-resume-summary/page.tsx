import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  DATA_ANALYST_RESUME_SUMMARY_PATH,
  SENIOR_DATA_ANALYST_RESUME_PATH,
  ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
  RESUME_ACTION_VERBS_PATH,
} from "@/app/lib/internalLinks";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${DATA_ANALYST_RESUME_SUMMARY_PATH}`;

export const metadata: Metadata = {
  title: `Data Analyst Resume Summary (${CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples by Level | ResumeAtlas`,
  description:
    `Data analyst resume summary examples for ${CONTENT_FRESHNESS_YEAR}: entry-level, mid-level, and senior. Copy and adapt 20+ ATS-ready summaries with a free keyword scan.`,
  alternates: { canonical: DATA_ANALYST_RESUME_SUMMARY_PATH },
  openGraph: {
    title: `Data Analyst Resume Summary (${CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples`,
    description:
      "20+ data analyst resume summary examples by level. ATS-ready, keyword-anchored, with a free JD scan to verify keyword match before you apply.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my data analyst resume summary matches a job description?",
    answer:
      "No signup needed. Paste your resume and the JD into ResumeAtlas — full keyword match score, rejection risks, and selectable fixes in about 60 seconds. First scan is free.",
  },
  {
    question: "What should a data analyst resume summary include?",
    answer:
      "Three elements: (1) your years of experience and primary tools — SQL, Python, Tableau, Power BI; (2) the type of analysis you do — business intelligence, product analytics, marketing analytics, financial modeling; (3) one concrete outcome or scope — team size, dashboard users, business decision you informed. Keep it 2–4 lines.",
  },
  {
    question: "Should a data analyst resume have a summary or an objective?",
    answer:
      "Summary — always. Objectives say what you want; summaries show what you bring. ATS scans summaries for keyword density. A targeted summary with your tools and analysis type improves keyword coverage even before the skills section.",
  },
  {
    question: "How long should a data analyst resume summary be?",
    answer:
      "2–4 lines. Enough to name your primary stack, your analysis specialization, and one outcome. More than 4 lines is padding; less than 2 lines misses keyword opportunities.",
  },
  {
    question: "Should I mention SQL in my data analyst resume summary?",
    answer:
      "Yes — SQL is the most-matched keyword across data analyst job descriptions. Name it in both the summary and a bullet. The summary placement builds keyword density early in the document where ATS parsers weight it most.",
  },
  {
    question: "How do I write a data analyst resume summary with no experience?",
    answer:
      "Name your tools + what you applied them to (coursework, projects, internship) + the result or analysis type. 'Data analytics student with Python, SQL, and Tableau skills applied across 3 academic projects including a retail sales analysis that identified a $40K seasonal revenue gap. Seeking an entry-level analyst role.' Don't open with 'I am looking for' — open with what you bring.",
  },
  {
    question: "How do I write a senior data analyst resume summary?",
    answer:
      "Lead with years of experience + primary stack + cross-functional scope + business outcome. 'Senior data analyst with 7 years of SQL, Python, and Tableau experience driving analytics strategy across product, marketing, and finance. Built self-serve BI infrastructure adopted by 6 business units; led A/B test program generating $1.4M in validated uplifts. Seeking a senior or principal analyst role.' See the senior examples section above.",
  },
  {
    question: "What keywords should appear in a data analyst resume summary?",
    answer:
      "SQL, Python (if applicable), Tableau or Power BI (name the tool you actually use), data analysis, business intelligence, stakeholder reporting, Excel or Sheets, and domain terms from the posting (product analytics, marketing analytics, financial analysis). Mirror the JD's exact vocabulary.",
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
  headline: `Data Analyst Resume Summary (${CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples by Level`,
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const SUMMARY_EXAMPLES = [
  {
    level: "Entry-level / no experience",
    examples: [
      "Data analytics student (B.S. Statistics, graduating May 2026) with SQL, Python, and Tableau skills applied across 4 academic projects. Built a churn prediction model for a class project that identified 3 high-risk customer segments. Seeking an entry-level analyst or BI analyst role.",
      "Recent business graduate with Excel, SQL (introductory), and Power BI skills developed through coursework and a 2-month internship analyzing campaign performance data. Comfortable with data cleaning, pivot tables, and executive-facing summaries. Seeking an entry-level data analyst role in a fast-moving company.",
    ],
  },
  {
    level: "Mid-level (2–5 years)",
    examples: [
      "Data analyst with 3 years of SQL, Python, and Tableau experience in product analytics at a SaaS company. Built 6 self-serve dashboards used daily by product and marketing teams; A/B test analysis informing 4 roadmap decisions per quarter. Comfortable owning the full analysis workflow from data extraction to executive presentation.",
      "Business intelligence analyst with 4 years of SQL, Power BI, and Excel experience in retail and e-commerce. Designed a weekly sales reporting suite for 3 regional managers that reduced manual reporting time 70%; identified a $200K pricing optimization opportunity through margin analysis. Looking for a mid-senior BI or data analyst role.",
      "Marketing data analyst with 3 years of experience in digital performance analysis: attribution modeling, A/B test reporting, email segment analysis, and Google Analytics. Reduced CAC 18% through campaign reallocation informed by channel-level attribution analysis. Seeking a senior marketing analyst role at a consumer or DTC brand.",
    ],
  },
  {
    level: "Senior (5+ years)",
    examples: [
      "Senior data analyst with 7 years of SQL, Python, and Tableau experience across product, finance, and operations at B2B SaaS companies. Led a data governance initiative adopted by 4 teams; A/B test program generating $1.2M in validated revenue uplifts. Seeking a senior or staff analyst role with cross-functional ownership.",
      "Senior business intelligence analyst with 8 years of SQL, Looker, and dbt experience building self-serve analytics infrastructure. Designed an 80-dashboard reporting layer adopted by 6 business units; reduced ad-hoc analyst requests by 40% in 6 months. Comfortable partnering with engineering on data modeling and with executives on strategic reporting.",
      "Senior product analyst with 6 years of Python, SQL, and Amplitude experience at high-growth consumer apps. Drove retention analytics that informed 3 major product decisions; built a behavioral cohort model that identified the top 3 actions predictive of 6-month retention. Looking for a senior analyst or analytics lead role.",
      "Principal data analyst with 9 years of end-to-end analytics ownership — data modeling, stakeholder alignment, team mentorship, and executive reporting. Mentored 5 analysts to senior promotions; designed a company-wide KPI framework used in quarterly board reviews. Open to principal analyst or analytics lead opportunities.",
    ],
  },
  {
    level: "Career change / transition",
    examples: [
      "Finance analyst transitioning to data analytics, bringing 4 years of SQL-based financial modeling, variance analysis, and Excel dashboarding. Built automated monthly close reports reducing manual effort 60%; identified $800K in misallocated budget through cross-departmental reconciliation. Seeking a business analyst or BI analyst role where financial acumen and data analysis overlap.",
      "Operations manager transitioning to a data analyst role, with 5 years of Excel, SQL (self-taught), and Power BI experience tracking operational KPIs for 3 regional teams. Built reports surfacing a $400K cost allocation error during quarterly close. Targeting analyst roles in operations, supply chain, or business intelligence.",
    ],
  },
] as const;

const STRUCTURE_RULE = {
  parts: [
    { label: "Experience + tools", example: "Data analyst with 4 years of SQL, Python, and Tableau experience" },
    { label: "Domain / specialization", example: "in product analytics at a SaaS company" },
    { label: "Outcome or scope", example: "Built 6 self-serve dashboards used daily by product and marketing teams; A/B test analysis informing 4 roadmap decisions per quarter." },
    { label: "Target role (optional)", example: "Seeking a senior analyst or analytics lead role." },
  ],
};

export default function DataAnalystResumeSummaryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={roleResumePillarPath("data-analyst")} className="hover:text-gray-700">Data Analyst Resume</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Data Analyst Resume Summary</span>
        </nav>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">Resume Summary Examples</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Data Analyst Resume Summary ({CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples by Level
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            20+ data analyst resume summary examples — entry-level, mid-level, senior, and career change. Copy, adapt, and verify keyword match against the specific posting before you apply.
          </p>
          <p className="mb-6 text-sm text-gray-500">No signup needed for the first scan &middot; Results in about 60 seconds</p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Check if my summary matches the job description — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Data analyst resume summary structure</h2>
          <p className="mb-4 text-gray-700">
            A data analyst resume summary has 3–4 parts. Every one of the examples below follows this pattern — the structure is the same, the content differs by level and domain.
          </p>
          <div className="space-y-3">
            {STRUCTURE_RULE.parts.map((part, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600">{i + 1}. {part.label}</p>
                <p className="text-sm text-gray-700 italic">{part.example}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Data Analyst Resume Summary Examples</h2>
          <div className="space-y-8">
            {SUMMARY_EXAMPLES.map((group) => (
              <div key={group.level}>
                <h3 className="mb-3 text-base font-semibold text-gray-800 border-b pb-1">{group.level}</h3>
                <div className="space-y-4">
                  {group.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-gray-200 p-4">
                      <blockquote className="text-sm leading-relaxed text-gray-700 italic">&ldquo;{ex}&rdquo;</blockquote>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">The summary you copy may not match the specific JD you&apos;re applying to.</p>
          <p className="mb-4 text-sm text-blue-700">
            One posting says &ldquo;Looker&rdquo;; another says &ldquo;Tableau.&rdquo; One says &ldquo;product analytics&rdquo;; another says &ldquo;business intelligence.&rdquo; Paste your resume and the specific JD into ResumeAtlas to see which terms are missing in your summary and across the full resume.
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
            <li><Link href={roleResumePillarPath("data-analyst")} className="text-blue-600 hover:underline">Data analyst resume guide — full ATS guide and examples</Link></li>
            <li><Link href={roleResumeKeywordsPath("data-analyst")} className="text-blue-600 hover:underline">Data analyst resume keywords — 120+ ATS terms by category</Link></li>
            <li><Link href={SENIOR_DATA_ANALYST_RESUME_PATH} className="text-blue-600 hover:underline">Senior data analyst resume — keywords, bullets, and ATS guide</Link></li>
            <li><Link href={ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH} className="text-blue-600 hover:underline">Entry level data analyst resume — for junior and new grad roles</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary guide — structure, rules, and 50+ examples across roles</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Data Analyst Resume Summary — FAQ</h2>
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
          <h2 className="mb-3 text-2xl font-bold">A great summary still needs to match the specific posting.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Generic analyst summaries miss role-specific keywords. Paste your resume and the job description into ResumeAtlas. Full keyword match score and selectable fixes in about 60 seconds.
          </p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100">
            Check my data analyst resume — no signup
          </Link>
          <p className="mt-3 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
        </section>
      </main>
    </>
  );
}
