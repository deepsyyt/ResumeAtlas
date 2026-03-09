import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ResumeSlug =
  | "data-analyst-resume-example"
  | "business-analyst-resume-example"
  | "frontend-developer-resume-example"
  | "backend-developer-resume-example"
  | "machine-learning-engineer-resume-example"
  | "data-scientist-resume-example"
  | "product-manager-resume-example"
  | "software-engineer-resume-example"
  | "devops-engineer-resume-example"
  | "full-stack-developer-resume-example";

type ResumePageConfig = {
  slug: ResumeSlug;
  roleName: string;
  h1: string;
  metaDescription: string;
  exampleTitle: string;
  summary: string;
  bullets: string[];
};

const RESUME_PAGES: Record<ResumeSlug, ResumePageConfig> = {
  "data-analyst-resume-example": {
    slug: "data-analyst-resume-example",
    roleName: "Data Analyst",
    h1: "Data Analyst Resume Example",
    metaDescription:
      "See a strong Data Analyst resume example with ATS-friendly formatting, impact-focused bullets, and the right SQL, BI, and analytics keywords.",
    exampleTitle: "Data Analyst – Resume Example",
    summary:
      "Data analyst with 4+ years of experience turning messy data into clear, actionable insights for product, marketing, and operations teams across B2B SaaS.",
    bullets: [
      "Owned end‑to‑end analysis for user growth funnel, using SQL, Python, and Tableau to identify drop‑off points and recommend experiments that increased activation by 14%.",
      "Built automated reporting in Looker for executive KPIs (MRR, churn, CAC payback), reducing manual reporting time by 12 hours per month.",
      "Designed and implemented A/B tests with product managers; analyzed results using statistical methods and clearly communicated trade‑offs to non‑technical stakeholders.",
      "Partnered with engineering to improve event tracking and data quality, increasing trustworthy coverage of key product events from 68% to 96%.",
    ],
  },
  "business-analyst-resume-example": {
    slug: "business-analyst-resume-example",
    roleName: "Business Analyst",
    h1: "Business Analyst Resume Example",
    metaDescription:
      "ATS‑optimized Business Analyst resume example with clear impact, stakeholder communication, and requirements gathering experience.",
    exampleTitle: "Business Analyst – Resume Example",
    summary:
      "Business analyst with 5+ years of experience translating complex business problems into simple requirements, dashboards, and process improvements.",
    bullets: [
      "Led discovery for a billing modernization initiative, gathering requirements from finance, sales, and support, resulting in a 22% reduction in invoice disputes.",
      "Mapped current‑state and future‑state processes using BPMN diagrams and identified 8 automation opportunities, saving ~1,000 hours annually.",
      "Maintained a portfolio of executive dashboards in Power BI, surfacing trends in customer churn, NPS, and operational SLAs for leadership.",
      "Acted as product owner for an internal tooling squad, writing user stories and acceptance criteria that enabled predictable two‑week sprints.",
    ],
  },
  "frontend-developer-resume-example": {
    slug: "frontend-developer-resume-example",
    roleName: "Frontend Developer",
    h1: "Frontend Developer Resume Example",
    metaDescription:
      "Frontend Developer resume example that passes ATS with modern React, TypeScript, accessibility, and performance optimization keywords.",
    exampleTitle: "Frontend Developer – Resume Example",
    summary:
      "Frontend developer specializing in React and TypeScript, focused on building fast, accessible interfaces that meet product and UX goals.",
    bullets: [
      "Rebuilt the marketing site in React and Next.js, improving Core Web Vitals and increasing organic signup conversion by 11%.",
      "Created a reusable component library with Storybook, reducing duplicate UI code and accelerating feature delivery across three product squads.",
      "Worked closely with designers to implement responsive layouts from Figma, achieving high design‑to‑code fidelity across mobile and desktop.",
      "Improved accessibility by fixing color contrast, landmarks, and keyboard navigation issues, helping the app meet WCAG 2.1 AA standards.",
    ],
  },
  "backend-developer-resume-example": {
    slug: "backend-developer-resume-example",
    roleName: "Backend Developer",
    h1: "Backend Developer Resume Example",
    metaDescription:
      "Backend Developer resume example with ATS‑friendly keywords for APIs, microservices, databases, and cloud infrastructure.",
    exampleTitle: "Backend Developer – Resume Example",
    summary:
      "Backend developer with 5+ years of experience designing APIs and microservices in Node.js and Java, focused on reliability and performance.",
    bullets: [
      "Designed and implemented REST and GraphQL APIs for the core billing platform, handling ~5M requests/day with 99.95% uptime.",
      "Optimized slow SQL queries and added caching with Redis, reducing average response times for key endpoints by 40%.",
      "Containerized services with Docker and deployed to AWS ECS with CI/CD pipelines, cutting average deployment time from 45 to 10 minutes.",
      "Collaborated with frontend teams to define contracts and error handling, improving integration reliability and reducing support tickets.",
    ],
  },
  "machine-learning-engineer-resume-example": {
    slug: "machine-learning-engineer-resume-example",
    roleName: "Machine Learning Engineer",
    h1: "Machine Learning Engineer Resume Example",
    metaDescription:
      "Machine Learning Engineer resume example that highlights Python, ML frameworks, and production model deployment in an ATS‑friendly way.",
    exampleTitle: "Machine Learning Engineer – Resume Example",
    summary:
      "Machine learning engineer with experience taking models from notebooks to production, focusing on reliability, monitoring, and business impact.",
    bullets: [
      "Built and deployed a churn prediction model in Python (scikit‑learn, XGBoost) that identified at‑risk customers and reduced churn by 9%.",
      "Implemented real‑time inference APIs and batch scoring jobs on AWS using Docker, ECS, and Step Functions.",
      "Worked with data engineers to productionize feature pipelines, improving training data freshness from weekly to daily.",
      "Set up model performance dashboards and alerts for drift and data quality, enabling proactive retraining decisions.",
    ],
  },
  "data-scientist-resume-example": {
    slug: "data-scientist-resume-example",
    roleName: "Data Scientist",
    h1: "Data Scientist Resume Example",
    metaDescription:
      "Data Scientist resume example with ATS‑ready language for experimentation, machine learning, and stakeholder storytelling.",
    exampleTitle: "Data Scientist – Resume Example",
    summary:
      "Data scientist with 6+ years of experience designing experiments, building ML models, and communicating insights to executives.",
    bullets: [
      "Led experimentation roadmap for onboarding funnel, designing A/B tests that increased day‑7 retention by 7%.",
      "Built customer lifetime value models using Python and SQL, informing marketing budget allocation and pricing decisions.",
      "Partnered with product managers to prioritize high‑impact analyses and present findings in executive‑ready narratives.",
      "Mentored junior analysts and scientists on statistics, experimentation, and storytelling best practices.",
    ],
  },
  "product-manager-resume-example": {
    slug: "product-manager-resume-example",
    roleName: "Product Manager",
    h1: "Product Manager Resume Example",
    metaDescription:
      "Product Manager resume example that shows clear ownership, roadmap delivery, and data‑driven decision‑making in an ATS‑friendly way.",
    exampleTitle: "Product Manager – Resume Example",
    summary:
      "Product manager with 7+ years of experience owning B2B SaaS products from discovery to launch, focused on impact and execution.",
    bullets: [
      "Owned roadmap for a $5M ARR product line, shipping features that increased expansion revenue by 18% year‑over‑year.",
      "Partnered with design and engineering to run discovery interviews, synthesize insights, and define problems worth solving.",
      "Defined product KPIs, built dashboards with analytics, and used metrics to drive prioritization and iteration decisions.",
      "Led cross‑functional go‑to‑market for major releases, coordinating marketing, sales enablement, and customer success.",
    ],
  },
  "software-engineer-resume-example": {
    slug: "software-engineer-resume-example",
    roleName: "Software Engineer",
    h1: "Software Engineer Resume Example",
    metaDescription:
      "Software Engineer resume example focused on clean code, teamwork, and delivering features that matter—written for ATS scanners and hiring managers.",
    exampleTitle: "Software Engineer – Resume Example",
    summary:
      "Software engineer with 4+ years of experience building full‑stack features in high‑growth product teams using TypeScript and Node.js.",
    bullets: [
      "Built and shipped new onboarding flows that reduced time‑to‑value by 30%, measured via product analytics.",
      "Collaborated with PMs and designers to break down large initiatives into incremental slices and deliver on schedule.",
      "Improved test coverage for critical services from 55% to 85% using Jest and Playwright, reducing production bugs.",
      "Participated in on‑call rotation, debugging incidents and documenting fixes to prevent regressions.",
    ],
  },
  "devops-engineer-resume-example": {
    slug: "devops-engineer-resume-example",
    roleName: "DevOps Engineer",
    h1: "DevOps Engineer Resume Example",
    metaDescription:
      "DevOps Engineer resume example with ATS‑optimized keywords for CI/CD, cloud, Kubernetes, monitoring, and reliability.",
    exampleTitle: "DevOps Engineer – Resume Example",
    summary:
      "DevOps engineer focused on reliable deployments, observability, and helping development teams ship quickly and safely.",
    bullets: [
      "Designed and maintained CI/CD pipelines in GitHub Actions, reducing deploy time from 40 minutes to under 10.",
      "Migrated services to Kubernetes on AWS, improving scalability and simplifying rollbacks with blue‑green deployments.",
      "Implemented centralized logging and alerting with Prometheus and Grafana, cutting mean time to recovery by 35%.",
      "Partnered with security to integrate vulnerability scanning and secrets management into the deployment process.",
    ],
  },
  "full-stack-developer-resume-example": {
    slug: "full-stack-developer-resume-example",
    roleName: "Full‑Stack Developer",
    h1: "Full‑Stack Developer Resume Example",
    metaDescription:
      "Full‑Stack Developer resume example that balances frontend UX, backend reliability, and ATS‑friendly technical keywords.",
    exampleTitle: "Full‑Stack Developer – Resume Example",
    summary:
      "Full‑stack developer comfortable across React, Node.js, and SQL, focused on end‑to‑end ownership and customer impact.",
    bullets: [
      "Delivered end‑to‑end features across React, Node.js, and PostgreSQL for a SaaS app used by 5,000+ customers.",
      "Collaborated with design and product to prioritize usability issues and ship improvements that reduced support tickets by 20%.",
      "Refactored legacy endpoints and added caching, improving page load times by 25% for key workflows.",
      "Wrote documentation for APIs and frontend components, making it easier for new engineers to contribute.",
    ],
  },
};

type PageParams = {
  resumeSlug: ResumeSlug;
};

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = RESUME_PAGES[params.resumeSlug];
  if (!config) return {};
  return {
    title: `${config.h1} | ResumeAtlas`,
    description: config.metaDescription,
  };
}

export default function ResumeExamplePage({ params }: { params: PageParams }) {
  const config = RESUME_PAGES[params.resumeSlug];
  if (!config) {
    notFound();
  }

  const roleLower = config.roleName.toLowerCase();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does a strong ${config.roleName} resume include?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A strong ${config.roleName} resume includes a clear summary, impact‑focused bullets with metrics, ATS‑friendly keywords for the tools and technologies you use, and a clean layout with standard sections like Experience, Skills, and Education.`,
        },
      },
      {
        "@type": "Question",
        name: `How can I make my ${config.roleName} resume pass ATS?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Use the same language as the job description for skills and responsibilities, keep formatting simple (one column, no images), and run your resume through an ATS checker like ResumeAtlas to spot missing keywords.",
        },
      },
      {
        "@type": "Question",
        name: `Do I need multiple versions of my ${config.roleName} resume?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. For competitive roles, tailoring your resume to each job description—especially the skills and impact bullets—significantly improves your ATS match score and your chances of getting an interview.",
        },
      },
    ],
  };

  const pairedKeywordsPath = `/ats-keywords/${roleLower.replace(" ", "-")}`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {config.h1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            See a real‑world {config.roleName.toLowerCase()} resume example that is structured for
            Applicant Tracking Systems (ATS) and hiring managers—then adapt it to your own career
            story.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume with ResumeAtlas
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            {config.roleName} roles are crowded, and most applications are filtered by{" "}
            <strong>Applicant Tracking Systems (ATS)</strong> before a human recruiter reads them.
            To stand out, your resume needs two things: the right keywords for the role and clear,
            quantified impact. Use this example as a starting point, then tailor it to the specific
            job description you are targeting.
          </p>
        </section>

        {/* Resume example */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.exampleTitle}
          </h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3 text-sm sm:text-base text-slate-800">
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-slate-600">
              {config.roleName} · email@example.com · City, Country · LinkedIn · Portfolio
            </p>
            <div className="pt-3 space-y-2">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Professional Summary
              </h3>
              <p>{config.summary}</p>
            </div>
            <div className="pt-3 space-y-2">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Experience Highlights
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {config.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why this resume works */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Why This {config.roleName} Resume Works
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            This example focuses on{" "}
            <strong>outcomes, ownership, and relevant keywords for the role</strong>. Each bullet
            pairs a concrete action (what you did) with a measurable result (why it mattered).
            Standard headings like Experience, Skills, and Education keep the layout parse‑friendly
            for ATS while still being easy for a recruiter to skim in under 30 seconds.
          </p>
        </section>

        {/* ATS keywords */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS Keywords for a {config.roleName}
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Use the exact language from the job description where it truthfully matches your
            background. Common keyword categories for {config.roleName.toLowerCase()} roles include:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm sm:text-base text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">Core skills</h3>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Role‑specific tools and technologies</li>
                <li>Core frameworks and languages</li>
                <li>Data, analytics, or experimentation (where relevant)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Impact & collaboration</h3>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Cross‑functional collaboration</li>
                <li>Stakeholder communication</li>
                <li>Ownership of roadmaps, projects, or systems</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            For a deeper, role‑specific keyword list, see{" "}
            <Link
              href={pairedKeywordsPath}
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS keywords for {config.roleName.toLowerCase()} resumes
            </Link>
            .
          </p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Tips to Improve Your {config.roleName} Resume
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              Start each bullet with a strong verb and end with a{" "}
              <strong>specific outcome or metric</strong> (e.g. time saved, revenue, adoption).
            </li>
            <li>
              Mirror the job description’s keywords where they accurately describe your work, and
              remove buzzwords that don’t map to real experience.
            </li>
            <li>
              Keep formatting simple: one column, standard headings, no images or text inside
              tables.
            </li>
            <li>
              Run your resume and target job description through{" "}
              <Link
                href="/"
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                the free ResumeAtlas ATS resume checker
              </Link>{" "}
              to see keyword gaps before you apply.
            </li>
          </ul>
        </section>

        {/* CTA + related guides */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check How Your {config.roleName} Resume Scores
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Paste your resume and the job description into ResumeAtlas. You&apos;ll see an ATS‑style
            match score, missing skills, and specific suggestions to tighten your bullets for this
            role before you apply.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume with ResumeAtlas
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related guides
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href="/how-ats-scans-resumes"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/common-resume-mistakes-fail-ats"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href={pairedKeywordsPath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  ATS Keywords for {config.roleName} Resumes
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            {(faqSchema.mainEntity as any[]).map((q) => (
              <details
                key={q.name}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{q.name}</h3>
                  <span className="text-slate-400 text-xs group-open:hidden">+</span>
                  <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

