import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  SOFTWARE_ENGINEER_RESUME_SUMMARY_PATH,
  SENIOR_SOFTWARE_ENGINEER_RESUME_PATH,
  ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
  RESUME_ACTION_VERBS_PATH,
} from "@/app/lib/internalLinks";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${SOFTWARE_ENGINEER_RESUME_SUMMARY_PATH}`;

export const metadata: Metadata = {
  title: `Software Engineer Resume Summary (${CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples by Level | ResumeAtlas`,
  description:
    `Software engineer resume summary examples for ${CONTENT_FRESHNESS_YEAR}: new grad, mid-level, senior, and career change. 20+ ATS-ready examples with a free JD keyword scan.`,
  alternates: { canonical: SOFTWARE_ENGINEER_RESUME_SUMMARY_PATH },
  openGraph: {
    title: `Software Engineer Resume Summary (${CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples`,
    description:
      "20+ software engineer resume summary examples by level. ATS-ready, keyword-anchored, with a free JD scan to verify keyword match before you apply.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my software engineer resume summary matches a job description?",
    answer:
      "No signup needed. Paste your resume and the JD into ResumeAtlas — full keyword match score, rejection risks, and selectable fixes in about 60 seconds. First scan is free.",
  },
  {
    question: "What should a software engineer resume summary include?",
    answer:
      "Three elements: (1) your primary languages and framework — Python, Go, React, Node.js; (2) the type of systems you build — APIs, distributed systems, frontend, full-stack, data pipelines; (3) one scope or outcome — scale (users, requests/second), reliability metric (uptime), or delivery contribution. Keep it 2–4 lines.",
  },
  {
    question: "Should I have a summary on my software engineer resume?",
    answer:
      "Yes, if you have more than 1 year of experience. A summary builds keyword density in the top third of the document where ATS parsers weight it most, and it frames your stack and specialization before hiring managers see your job history.",
  },
  {
    question: "How do I write a software engineer resume summary with no experience?",
    answer:
      "Lead with your primary language + what you built (project or course) + a quality signal (GitHub commits, test coverage, users). 'CS student with Python, React, and PostgreSQL skills applied across 3 personal projects. Built a REST API serving 400 daily users with 92% test coverage. Seeking a software engineering internship or junior developer role.'",
  },
  {
    question: "How do I write a senior software engineer resume summary?",
    answer:
      "Lead with years + primary stack + system ownership + business or scale outcome. 'Senior software engineer with 8 years building distributed backend systems in Go and Java. Designed and owned a real-time event processing pipeline at 40M events/day; led 5-engineer cross-functional team through a critical database migration. Seeking a senior or staff IC role.' See the senior examples section above.",
  },
  {
    question: "What keywords should appear in a software engineer resume summary?",
    answer:
      "Primary language (Python, Go, Java, JavaScript, TypeScript), frameworks (React, Node.js, FastAPI, Spring), infrastructure keywords from the JD (AWS, Kubernetes, Docker, CI/CD), and scale/reliability terms (distributed systems, microservices, API design). Mirror the posting's exact stack vocabulary.",
  },
  {
    question: "How long should a software engineer resume summary be?",
    answer:
      "2–4 lines. Long enough to name your stack and one outcome; short enough to keep the focus on your experience bullets. More than 4 lines reduces space for the bullet evidence that actually proves your skills.",
  },
  {
    question: "Should a software engineer resume use a summary or a profile?",
    answer:
      "The heading doesn't matter — 'Summary', 'Professional Summary', 'Profile' all work. What matters is the content: lead with stack and scope, not with aspirations or personality adjectives. ATS doesn't score 'passionate problem-solver' — it scores 'Python, FastAPI, PostgreSQL'.",
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
  headline: `Software Engineer Resume Summary (${CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples by Level`,
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const SUMMARY_EXAMPLES = [
  {
    level: "New grad / no experience",
    examples: [
      "Computer science graduate (May 2026) with Python, React, and PostgreSQL skills applied across 4 academic and personal projects, including a REST API with JWT authentication and 200 daily active users. Looking for a software engineering internship or junior developer role.",
      "Self-taught web developer with React, Node.js, and MongoDB skills developed across 3 personal projects over 8 months. Published a working full-stack app with 400+ GitHub stars. No formal CS degree — strong project output and consistent open-source activity. Seeking an entry-level frontend or full-stack role.",
    ],
  },
  {
    level: "Mid-level (2–5 years)",
    examples: [
      "Software engineer with 3 years of Python and FastAPI experience building REST APIs and data pipelines at a B2B SaaS company. Reduced a core API's P95 latency from 800ms to 120ms through query optimization and caching; maintained 99.8% uptime on a service handling 500K daily requests.",
      "Full-stack engineer with 4 years of React and Node.js experience building consumer web applications. Led the front-end architecture of a checkout redesign that increased conversion 18%; established a component library adopted by 3 teams. Looking for a mid-to-senior full-stack or frontend role.",
      "Backend engineer with 3 years of Java and Kubernetes experience at a fintech company. Designed a payment processing microservice handling $4M daily transaction volume; reduced infrastructure cost 25% through rightsizing and horizontal scaling. Comfortable with system design, reliability engineering, and cross-team API contracts.",
    ],
  },
  {
    level: "Senior (5+ years)",
    examples: [
      "Senior software engineer with 8 years of Go and distributed systems experience. Owned and scaled a real-time data pipeline from 500K to 40M events/day at 99.97% uptime. Led 5-engineer cross-team migration off a legacy monolith; reduced deployment time from 45 minutes to 8 minutes. Seeking a senior or staff IC role at a high-throughput product company.",
      "Senior full-stack engineer with 7 years of React, TypeScript, and Python experience. Designed a design system adopted by 6 product squads; reduced average feature development time 30% through component reuse. Comfortable with accessibility, performance profiling, and cross-functional technical leadership.",
      "Staff engineer with 10 years of experience across distributed systems, API design, and platform engineering. Defined the API contract for a platform serving 200 enterprise customers; mentored 8 engineers to IC4 and IC5 promotions. Experienced in technical roadmap ownership, incident leadership, and cross-organization alignment.",
      "Senior backend engineer with 6 years of Python and AWS Lambda experience in serverless architecture. Reduced cold-start latency 60% through runtime optimization and provisioned concurrency; designed a multi-tenant billing service processing 2M monthly transactions. Seeking a senior engineer or tech-lead role at a cloud-native company.",
    ],
  },
  {
    level: "Career change / transition",
    examples: [
      "Former data analyst transitioning to a software engineering role, with 3 years of Python scripting, SQL, and REST API consumption before completing a 6-month full-stack bootcamp (React, Node.js, PostgreSQL). Built 3 portfolio projects; comfortable with Git workflow, testing, and agile development. Seeking a junior or associate software engineer role.",
      "Systems administrator with 5 years of Linux, Bash, and Python automation experience transitioning to software engineering. Automated 15 operational workflows saving 8 hours/week; wrote monitoring scripts in Python deployed across 40 servers. Completed a backend development course (FastAPI, PostgreSQL, Docker). Targeting backend or DevOps-adjacent engineering roles.",
    ],
  },
] as const;

export default function SoftwareEngineerResumeSummaryPage() {
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
          <span className="text-gray-900">Software Engineer Resume Summary</span>
        </nav>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">Resume Summary Examples</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Software Engineer Resume Summary ({CONTENT_FRESHNESS_YEAR}): 20+ ATS-Ready Examples by Level
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            20+ software engineer resume summary examples — new grad, mid-level, senior, and career change. Copy, adapt, and verify keyword match against the specific posting before you apply.
          </p>
          <p className="mb-6 text-sm text-gray-500">No signup needed for the first scan &middot; Results in about 60 seconds</p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Check if my summary matches the job description — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Software engineer resume summary structure</h2>
          <p className="mb-4 text-gray-700">
            Every example below follows the same pattern: primary language + framework + system type + scale or reliability outcome + optional target role. The content changes by level; the structure does not.
          </p>
          <div className="rounded-xl border border-gray-200 p-5 text-sm text-gray-700 leading-relaxed">
            <p><span className="font-semibold text-blue-700">[Level]</span> software engineer with <span className="font-semibold text-blue-700">[N]</span> years of <span className="font-semibold text-blue-700">[language + framework]</span> experience building <span className="font-semibold text-blue-700">[system type]</span>. <span className="font-semibold text-blue-700">[One scope or outcome with a metric]</span>. Seeking <span className="font-semibold text-blue-700">[target level + type of role]</span>.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Software Engineer Resume Summary Examples</h2>
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
          <p className="mb-1 text-base font-semibold text-blue-900">The summary you copy may not match the specific posting.</p>
          <p className="mb-4 text-sm text-blue-700">
            One posting wants &ldquo;Go and Kubernetes&rdquo;; another wants &ldquo;Python and AWS Lambda.&rdquo; Paste your resume and the specific JD into ResumeAtlas to see which terms are missing.
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
            <li><Link href={SENIOR_SOFTWARE_ENGINEER_RESUME_PATH} className="text-blue-600 hover:underline">Senior software engineer resume — keywords, bullets, and ATS guide</Link></li>
            <li><Link href={ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH} className="text-blue-600 hover:underline">Entry level software engineer resume — new grad and bootcamp examples</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary guide — structure, rules, and 50+ examples across roles</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Software Engineer Resume Summary — FAQ</h2>
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
          <h2 className="mb-3 text-2xl font-bold">A strong summary still needs to match the specific JD.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Generic summaries miss role-specific keywords. Paste your resume and the job description into ResumeAtlas. Full keyword match score and selectable fixes in about 60 seconds.
          </p>
          <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100">
            Check my software engineer resume — no signup
          </Link>
          <p className="mt-3 text-xs text-gray-400">Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds</p>
        </section>
      </main>
    </>
  );
}
