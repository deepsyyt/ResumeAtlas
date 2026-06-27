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
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { RESUME_KEYWORDS_HUB_PATH } from "@/app/lib/seoHubPages";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${RESUME_SUMMARY_GUIDE_PATH}`;

export const metadata: Metadata = {
  title: `Resume Summary Examples (${CONTENT_FRESHNESS_YEAR}): 50+ by Role, Level & ATS Impact | ResumeAtlas`,
  description:
    `50+ resume summary examples by role, experience level, and ATS impact for ${CONTENT_FRESHNESS_YEAR}. Includes career change summaries, weak-to-strong rewrites, and formatting rules for recruiters and ATS.`,
  alternates: { canonical: RESUME_SUMMARY_GUIDE_PATH },
  keywords: [
    "resume summary examples",
    "professional summary for resume",
    "resume summary",
    "resume objective vs summary",
    "resume profile examples",
    "resume summary for career change",
    "resume professional summary examples",
  ],
  openGraph: {
    title: `Resume Summary Examples (${CONTENT_FRESHNESS_YEAR}): 50+ by Role, Level & ATS Impact`,
    description:
      "50+ resume summary examples by role and experience level. Career change summaries, weak-to-strong rewrites, ATS formatting rules.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume Summary Examples (${CONTENT_FRESHNESS_YEAR}): 50+ by Role, Level & ATS Impact`,
    description:
      "50+ resume professional summary examples by role, level, and intent. Includes career change summaries and ATS formatting guidance.",
  },
};

const faqItems = [
  {
    question:
      "Do I need to sign up to check if my resume summary matches a job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full intelligence dashboard — match score, keyword gaps, and rejection risks — in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "What is a resume summary and when should I use one?",
    answer:
      "A resume summary is a 2–4 line statement at the top of your resume that tells a recruiter who you are, what you do, and why you fit this role — before they read a single bullet. Use it when you have 3+ years of relevant experience and can lead with concrete domain expertise. Entry-level candidates with little relevant experience may skip it or use a brief objective instead.",
  },
  {
    question: "What is the difference between a resume summary and a resume objective?",
    answer:
      "A resume summary describes what you bring to the role based on past experience. A resume objective states what you want from the job. Summaries are preferred for experienced candidates; objectives are used by entry-level candidates or career changers who need to explain a pivot. In 2026 most tech and business roles expect a summary, not an objective.",
  },
  {
    question: "How long should a resume summary be?",
    answer:
      "Two to four sentences, or roughly 50–100 words. Recruiters skim resumes in 30 seconds — a summary longer than four lines gets skipped. Lead with your role and level, then your primary domain or skill set, then the specific value you deliver.",
  },
  {
    question: "Should I include a resume summary if I am a recent graduate?",
    answer:
      "Only if you can write something specific. A generic 'motivated recent graduate seeking opportunities' wastes prime resume real estate. If you have a relevant internship, research project, or capstone, write a summary that leads with that. Otherwise, skip the summary and let your experience and skills sections carry the page.",
  },
  {
    question: "How do I write a resume summary for a career change?",
    answer:
      "Lead with the destination role, not your origin. Mention transferable skills that apply to the new domain, then name one project or outcome that proves the transfer. Do not open with 'seeking to transition into' — it leads with what you lack, not what you offer. See the career change examples below for templates.",
  },
  {
    question: "Should I tailor my resume summary for each job?",
    answer:
      "Yes — the summary is the first thing recruiters read and the most impactful section to tailor. Weave in the role title, one or two key requirements from the posting, and the most relevant part of your background. A generic summary loses the advantage of job-specific fit. After updating your summary, check if the rest of your resume aligns with the JD.",
  },
  {
    question: "What keywords should go in a resume summary?",
    answer:
      "The job title from the posting (exact match), 2–3 core technical skills or domain terms, and your primary value delivery (cost reduction, revenue, scale, latency, accuracy). ATS systems scan the summary for keyword density, so reflecting the posting's language in the first paragraph lifts your keyword match score.",
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
  headline: `Resume Summary Examples (${CONTENT_FRESHNESS_YEAR}): 50+ by Role, Level & ATS Impact`,
  description:
    "50+ resume professional summary examples by role, experience level, and ATS impact with weak-to-strong rewrites and career change templates.",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas" },
  mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
};

const LEVEL_EXAMPLES: { level: string; description: string; example: string }[] = [
  {
    level: "Entry level (0–2 years)",
    description: "Lead with your degree or strongest internship, then your technical focus.",
    example:
      "Computer science graduate with Python and SQL internship experience at a fintech startup. Built a data validation pipeline that reduced manual QA review by 3 hours per week. Looking to apply data engineering skills to production pipelines at scale.",
  },
  {
    level: "Mid-level (3–6 years)",
    description: "Lead with role title, then primary domain, then a concrete outcome.",
    example:
      "Data analyst with 4 years of experience in e-commerce and subscription analytics. Track record of reducing churn by 11% through cohort segmentation and building executive dashboards that replaced 6 manual weekly reports. Strong SQL, Python, and Looker.",
  },
  {
    level: "Senior / Staff (7+ years)",
    description: "Lead with scope and impact, not just tools. Mention cross-functional reach.",
    example:
      "Senior software engineer with 9 years building distributed systems across fintech and SaaS. Led a 6-person team to migrate a monolithic payments service to microservices, reducing P99 latency from 1.4s to 180ms. Drive architecture decisions and cross-team technical alignment.",
  },
];

const ROLE_SUMMARIES: { role: string; path: string; examples: string[] }[] = [
  {
    role: "Data Analyst",
    path: "/data-analyst-resume-keywords",
    examples: [
      "Data analyst with 3 years in retail and logistics analytics. Built dashboards in Tableau and Looker that surfaced $2.4M in supply chain inefficiencies and reduced stockout events by 18%. SQL, Python, and A/B testing across high-volume transactional datasets.",
      "Senior data analyst specializing in product and growth analytics. Designed experimentation frameworks that accelerated A/B test throughput by 40% and delivered weekly churn signals to the retention team. Expert in Mixpanel, BigQuery, and dbt.",
      "Entry-level data analyst with internship experience in SQL, Excel, and Tableau. Built customer segmentation models for a 200K-user retail dataset as part of a university capstone. Focused on e-commerce and subscription analytics.",
    ],
  },
  {
    role: "Data Scientist",
    path: "/data-scientist-resume-keywords",
    examples: [
      "Data scientist with 5 years building predictive models in fintech and insurance. Developed a credit risk model that reduced default rate by 14% across a $400M portfolio. Python (scikit-learn, XGBoost), SQL, and Spark across large-scale structured datasets.",
      "Applied data scientist specializing in NLP and recommendation systems. Built a product recommendation engine that increased average order value by 22% for a mid-market e-commerce platform. Published 2 internal papers on evaluation methodology for language models.",
      "Machine learning researcher transitioning to applied data science. Published work on calibration in neural nets at a top-10 NLP venue. Seeking to apply research-grade evaluation methods to real-world prediction problems in healthcare or fintech.",
    ],
  },
  {
    role: "Software Engineer",
    path: "/software-engineer-resume-keywords",
    examples: [
      "Full-stack software engineer with 6 years building B2B SaaS products. Reduced API response time from 900ms to 95ms by redesigning caching architecture for a 500K-MAU platform. TypeScript, React, Node.js, and PostgreSQL. Strong ownership of product features end-to-end.",
      "Backend engineer with deep experience in high-throughput payment systems. Designed and shipped a settlement reconciliation service that processes $12M/day with zero manual review. Python, Go, Kafka, and AWS. Focused on reliability, observability, and latency.",
      "Software engineer with 2 years in mobile and web development. Shipped 4 production features at a 50-person startup — reduced app load time 31% and improved checkout completion rate by 9%. Swift, React Native, and Node.js.",
    ],
  },
  {
    role: "Product Manager",
    path: "/product-manager-resume-keywords",
    examples: [
      "Product manager with 5 years building B2C mobile products at fintech and consumer companies. Launched a budgeting feature that drove 38% uplift in 30-day retention. Skilled at discovery, roadmap prioritization, and cross-functional alignment with engineering, design, and data teams.",
      "Senior PM with a track record of scaling enterprise SaaS from $8M to $30M ARR. Led a platform consolidation that reduced churn by 18% and shortened implementation time by 6 weeks. Comfortable with SQL, experimentation, and stakeholder communication at C-suite level.",
      "Technical PM with an engineering background in distributed systems. Bridging product strategy and architecture decisions for a developer-facing API platform. Focused on reducing time-to-integration and driving adoption for mid-market customers.",
    ],
  },
  {
    role: "Business Analyst",
    path: "/business-analyst-resume-keywords",
    examples: [
      "Business analyst with 4 years in financial services and operations. Mapped and standardized 12 cross-departmental workflows that cut process cycle time by 35%. Strong in requirements elicitation, stakeholder facilitation, and translating business needs into system specifications.",
      "Senior business analyst specializing in ERP implementations and process improvement. Delivered 3 SAP S/4HANA projects on time across manufacturing and logistics clients. Expert in gap analysis, UAT design, and change management documentation.",
      "Business analyst with dual background in accounting and data analysis. Automated 4 monthly financial reports using Python and Power BI, freeing 12 analyst-hours per cycle. Bridge between finance stakeholders and engineering teams on data warehouse initiatives.",
    ],
  },
  {
    role: "DevOps Engineer",
    path: "/devops-engineer-resume-keywords",
    examples: [
      "DevOps engineer with 5 years managing cloud infrastructure on AWS and GCP. Reduced infrastructure costs by 29% through reserved instance optimization and right-sizing. Expert in Terraform, Kubernetes, and GitHub Actions CI/CD pipelines for multi-region deployments.",
      "Platform engineer specializing in developer experience and internal tooling. Cut deployment time from 45 minutes to 8 minutes by rebuilding CI/CD pipelines with parallelized test stages. Prometheus, Grafana, and PagerDuty for observability across 40+ microservices.",
      "Site reliability engineer with deep background in incident management. Drove MTTR from 4.2 hours to 38 minutes through runbook standardization and alert tuning. On-call ownership of a 99.99%-SLA platform processing 2M daily transactions.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    path: "/machine-learning-engineer-resume-keywords",
    examples: [
      "Machine learning engineer with 4 years deploying models to production in e-commerce and recommendation systems. Reduced recommendation latency from 280ms to 60ms via model distillation and serving optimization. Python, PyTorch, Ray Serve, and Feast feature store.",
      "ML engineer specializing in LLM integration and evaluation. Built a customer support agent backed by RAG architecture that resolved 41% of tier-1 tickets without human escalation. LangChain, Pinecone, and A/B-tested evaluation harnesses across 3 production models.",
      "Senior ML engineer leading the model lifecycle from training to monitoring. Established retraining pipelines and data drift detection for a fraud classification model handling $800M in daily transactions. MLflow, Airflow, and SageMaker.",
    ],
  },
  {
    role: "Frontend Developer",
    path: "/frontend-developer-resume-keywords",
    examples: [
      "Frontend developer with 4 years building high-performance React applications. Reduced Core Web Vitals LCP from 4.1s to 1.3s on a 2M-session/month marketing site. TypeScript, React, Next.js, and Tailwind. Strong focus on accessibility and performance instrumentation.",
      "Frontend engineer specializing in design system development and component library architecture. Built and maintained a shared component library used across 6 products and 12 engineers. React, Storybook, Radix UI, and Chromatic for visual regression testing.",
      "Entry-level frontend developer with internship and open-source experience in React and Tailwind. Contributed 15 PRs to a 3K-star open source UI library. Focused on accessible, mobile-first web components.",
    ],
  },
  {
    role: "Backend Developer",
    path: "/backend-developer-resume-keywords",
    examples: [
      "Backend developer with 5 years designing REST and gRPC APIs for high-traffic platforms. Scaled a payment processing API from 500 to 15,000 RPS without downtime using horizontal sharding and connection pooling. Python, Go, PostgreSQL, and Redis.",
      "Backend engineer with deep experience in event-driven systems and microservices. Built an order fulfillment event bus on Kafka that reduced cross-service coupling and improved resilience across 8 services. Java, Spring Boot, and AWS ECS.",
      "Backend developer with 3 years in healthcare data platforms. Built FHIR-compliant APIs under HIPAA constraints, reducing integration time for 4 EHR partners by 60%. Node.js, PostgreSQL, and Docker. Comfortable with compliance-adjacent development.",
    ],
  },
  {
    role: "Full-Stack Developer",
    path: "/full-stack-developer-resume-keywords",
    examples: [
      "Full-stack developer with 5 years delivering SaaS products end-to-end. Launched a self-serve onboarding flow that increased activation by 22% and reduced support tickets by 18%. React, Node.js, PostgreSQL, and Stripe integrations. Own features from design to deployment.",
      "Full-stack engineer at a Series A startup, wearing many hats across frontend, backend, and infrastructure. Rebuilt the billing system to support 3 pricing models, accelerating enterprise close rate by 30%. TypeScript, Next.js, Prisma, and AWS Lambda.",
      "Junior full-stack developer with internship experience shipping features in React and Express. Built a project tracking tool used internally by 40 teammates. Looking for a product-focused team where I can own end-to-end feature development.",
    ],
  },
];

const CAREER_CHANGE_EXAMPLES = [
  {
    from: "Finance → Data Analyst",
    example:
      "Financial analyst with 6 years in FP&A transitioning to data analytics. Built Python models for revenue forecasting during tenure at a $500M ARR SaaS company, reducing forecast error by 19%. Strong SQL and Excel — currently completing advanced data visualization coursework. Seeking to apply domain knowledge in financial data to a full-time analytics role.",
  },
  {
    from: "Teacher → Business Analyst",
    example:
      "High school educator with 8 years of curriculum design and stakeholder facilitation experience, now pursuing a career in business analysis. Completed CBAP coursework and delivered a volunteer ERP requirements-gathering project for a nonprofit. Skilled at translating complex needs across audiences and managing structured documentation processes.",
  },
  {
    from: "Operations Manager → Product Manager",
    example:
      "Operations manager with 7 years running logistics processes for a 200-person warehouse operation, transitioning to product management. Led 3 cross-functional process improvement initiatives that cut fulfillment error rate from 4.2% to 0.8%. Recently completed a PM bootcamp and shipped a side-project inventory management tool. Seeking a PM role in ops-tech or supply chain products.",
  },
];

const WEAK_TO_STRONG = [
  {
    weak: "Experienced professional seeking a challenging opportunity.",
    strong:
      "Data engineer with 5 years building ETL pipelines for financial services, seeking a senior role on a platform team.",
  },
  {
    weak: "Hard-working team player with strong communication skills.",
    strong:
      "Product manager with a track record of shipping 0-to-1 features that drove measurable retention improvements across B2C mobile apps.",
  },
  {
    weak: "Results-oriented software engineer with a passion for technology.",
    strong:
      "Backend engineer who scaled a payments API from 500 to 15,000 RPS and reduced P99 latency by 78% across a 3-year tenure at a fintech company.",
  },
  {
    weak: "Detail-oriented analyst with excellent Excel skills.",
    strong:
      "Business analyst with 4 years in financial services, known for requirements elicitation and delivering ERP projects that cut process cycle time by 35%.",
  },
] as const;

export default function ResumeSummaryExamplesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, articleSchema]) }}
      />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50/90 to-white">
        <div className="page-prose-wide py-14 text-center sm:py-18">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            50+ examples · by role · by level · career change templates
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Resume summary examples ({CONTENT_FRESHNESS_YEAR})
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            The professional summary is the first thing a recruiter reads. Get it right and they
            keep reading. This page covers how to write it, 50+ copy-ready examples by role and
            level, weak-to-strong rewrites, and career change templates.
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 text-left">
            <strong className="font-semibold">Not looking for ATS keyword lists?</strong> This page
            covers the summary section only. For role-specific keyword checklists (data analyst,
            software engineer, etc.), use the{" "}
            <Link
              href={RESUME_KEYWORDS_HUB_PATH}
              className="font-semibold text-sky-800 underline underline-offset-2"
            >
              resume keywords hub
            </Link>
            .
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-lg border border-sky-200 bg-sky-50/70 px-4 py-3 text-sm text-sky-950 text-left">
            <strong className="font-semibold">After you write your summary:</strong> paste your
            resume and the job description into ResumeAtlas to see whether your summary is hitting
            the right keywords and fit signals for that specific role.{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-semibold text-sky-800 underline underline-offset-2"
            >
              Free — no signup needed
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
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              ATS resume template guide
            </Link>
          </div>
          <LastUpdated
            className="mx-auto mt-6 text-center text-xs text-slate-500"
            label={CONTENT_LAST_UPDATED_LABEL}
          />
        </div>
      </section>

      <article className="page-prose space-y-14 py-12">

        {/* What makes a strong summary */}
        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            What makes a strong resume summary
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">
            A strong summary has three parts in this order: who you are (role + level), what you
            specialize in (domain or primary skill set), and what you deliver (a specific outcome or
            value). Missing any one part produces a summary that is either vague, credential-heavy
            without proof, or focused on what you want rather than what you offer.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
            <h3 className="font-semibold text-slate-900">The three-part structure</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
              <li>
                <strong className="text-slate-900">Role + level</strong> — "Data analyst with 4
                years…" or "Senior backend engineer…" — sets the frame in the first 5 words.
              </li>
              <li>
                <strong className="text-slate-900">Domain or specialization</strong> — the industry,
                technical stack, or type of work you know best: "in e-commerce analytics", "building
                distributed payment systems", "specializing in NLP."
              </li>
              <li>
                <strong className="text-slate-900">Proof or value</strong> — a concrete outcome,
                scale, or result that makes the claim credible: "reduced churn 11%", "processes
                $12M/day", "leading a team of 6."
              </li>
            </ol>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              Two to four sentences total. Use ATS-friendly plain text — no tables, no icons. Mirror
              the job title from the posting when it fits your experience.
            </p>
          </div>
        </section>

        {/* By experience level */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Resume summary examples by experience level
          </h2>
          <div className="space-y-4">
            {LEVEL_EXAMPLES.map((ex) => (
              <div key={ex.level} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-900">{ex.level}</p>
                <p className="mt-1 text-xs text-slate-500">{ex.description}</p>
                <blockquote className="mt-3 rounded-xl border-l-4 border-sky-300 bg-sky-50/50 py-3 pl-4 pr-3 text-sm text-slate-800 italic leading-relaxed">
                  {ex.example}
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* By role — bulk of examples */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Resume summary examples by role (30+ copy-ready examples)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Each role section below has three examples at different levels and specializations.
            Adapt the one closest to your background — swap the domain, years, and outcome metrics
            with your own.
          </p>
          <div className="space-y-8">
            {ROLE_SUMMARIES.map((rv) => (
              <div key={rv.role} className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {rv.role} summary examples
                  </h3>
                  <Link
                    href={rv.path}
                    className="text-xs font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900 flex-shrink-0"
                  >
                    {rv.role.split(" ")[0].toLowerCase()} keywords →
                  </Link>
                </div>
                <div className="space-y-3">
                  {rv.examples.map((ex, i) => (
                    <blockquote
                      key={i}
                      className="rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-4 pr-3 text-sm text-slate-800 italic leading-relaxed"
                    >
                      {ex}
                    </blockquote>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA #2 — highest-intent moment: right after seeing all role examples */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Now check if your summary matches this specific job
          </h2>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">
            A strong general summary is a start — but the summary that gets you an interview is the
            one that matches what this particular role is asking for. ResumeAtlas scans your resume
            against the job description and shows you: keyword gaps in your summary, match score,
            and which signals recruiters at this company are filtering on.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 sm:text-base">
            <li>No signup needed for your first scan</li>
            <li>Full intelligence dashboard — not a partial preview</li>
            <li>Results in about 60 seconds</li>
          </ul>
          <div className="mt-4">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Check if my summary matches this job — free
            </Link>
          </div>
        </section>

        {/* Career change examples */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Resume summary examples for career changers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Career change summaries require a specific structure: open with the destination role
            (not the origin), name the transferable skills that apply directly, then prove the
            transfer with one tangible example. Do not apologize for the pivot — frame what you
            bring, not what you lack.
          </p>
          <div className="space-y-4">
            {CAREER_CHANGE_EXAMPLES.map((ex) => (
              <div key={ex.from} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  {ex.from}
                </p>
                <blockquote className="rounded-xl border-l-4 border-violet-300 bg-violet-50/40 py-3 pl-4 pr-3 text-sm text-slate-800 italic leading-relaxed">
                  {ex.example}
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* Resume summary vs objective */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Resume summary vs resume objective: which to use
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-2 pr-4 font-semibold text-slate-700">Your situation</th>
                  <th className="pb-2 font-semibold text-slate-700">Use this</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">3+ years of relevant experience</td>
                  <td className="py-2 font-medium text-slate-900">Summary</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">Recent graduate, 0–1 years experience</td>
                  <td className="py-2 font-medium text-slate-900">Summary (if you have a relevant project) or skip</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">Career change with transferable skills</td>
                  <td className="py-2 font-medium text-slate-900">Summary (lead with destination role)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">Entry-level with no relevant experience</td>
                  <td className="py-2 font-medium text-slate-900">Objective (brief, specific goal)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Returning to workforce after a gap</td>
                  <td className="py-2 font-medium text-slate-900">Summary (focus on current skills and readiness)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-700">
            In 2026 most tech, data, and business roles expect a summary, not an objective. If the
            posting says "X years of experience required," use a summary to show you meet that bar.
          </p>
        </section>

        {/* Weak to strong rewrites */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Weak summary rewrites: before and after
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            Generic summaries waste the most important 3 lines on your resume. These are the most
            common weak patterns and what to replace them with.
          </p>
          <div className="space-y-4">
            {WEAK_TO_STRONG.map((ex, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-5 space-y-2">
                <div className="flex gap-3 items-start">
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                    Weak
                  </span>
                  <p className="text-sm text-slate-500 italic">&ldquo;{ex.weak}&rdquo;</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    Strong
                  </span>
                  <p className="text-sm font-medium text-slate-900 italic">&ldquo;{ex.strong}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ATS and summary */}
        <section className="space-y-4 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            How ATS parses resume summaries
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">
            Most ATS systems read the summary section early in parsing. A summary that contains the
            job title from the posting and 2–3 primary technical terms from the requirements can
            lift your keyword match score before the ATS reaches your experience bullets.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <strong className="text-slate-900">Mirror the job title exactly</strong> when it
              matches your experience — "Data Analyst" vs "Data Analyst II" can differ in ATS
              ranking.
            </li>
            <li>
              <strong className="text-slate-900">Include 2–3 required tools or skills</strong> from
              the posting in your summary if you genuinely have them.
            </li>
            <li>
              <strong className="text-slate-900">Plain text only</strong> — no tables, columns, or
              formatted text boxes. Some ATS systems skip parsing stylized sections.
            </li>
            <li>
              <strong className="text-slate-900">Keep it short</strong> — summaries over 6 lines
              are sometimes truncated in ATS display views.
            </li>
          </ul>
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
              — structure, ordering, and bullet examples for the experience section
            </li>
            <li>
              <Link
                href={RESUME_SKILLS_GUIDE_PATH}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume skills examples & format
              </Link>{" "}
              — ATS-friendly skills section patterns
            </li>
            <li>
              <Link
                href={RESUME_ACTION_VERBS_PATH}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume action verbs by role
              </Link>{" "}
              — verb lists for writing strong experience bullets
            </li>
            <li>
              <Link
                href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template guide
              </Link>{" "}
              — full resume format, sections, and parsing rules
            </li>
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume vs job description checker
              </Link>{" "}
              — check if your summary and resume match the target role
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
            Does your summary match what this specific job is looking for?
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Writing a strong general summary is step one. Step two is checking whether it matches
            the keywords, signals, and priorities of the specific posting you are applying to.
            ResumeAtlas gives you a full match score and keyword gap analysis — free, no signup
            needed for your first scan.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="inline-flex rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              ATS resume template guide
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
