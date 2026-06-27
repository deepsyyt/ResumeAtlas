import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_ACTION_VERBS_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { roleResumePillarPath, roleResumeKeywordsPath } from "@/app/lib/searchIntentSeo";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Entry Level Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide | ResumeAtlas`,
  description:
    `Entry level software engineer resume examples, skills, summary, and ATS formatting for ${CONTENT_FRESHNESS_YEAR}. Before/after bullet rewrites for students, bootcamp grads, and new grads with a free scan to check keyword match.`,
  alternates: { canonical: ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH },
  keywords: [
    "entry level software engineer resume",
    "software engineer resume no experience",
    "junior software engineer resume",
    "entry level software engineer resume examples",
    "software engineer resume fresh graduate",
    "new grad software engineer resume",
    "bootcamp software engineer resume",
    "software developer resume entry level",
  ],
  openGraph: {
    title: `Entry Level Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide`,
    description:
      "Entry level software engineer resume examples, summary, skills, and ATS tips. Before/after rewrites for new grads and bootcamp graduates with a free keyword scan.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Entry Level Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide`,
    description:
      "Examples, summary, skills, and ATS tips for an entry level software engineer resume. Free keyword scan before you apply.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my entry-level resume matches a job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full intelligence dashboard — keyword match score, rejection risks, and selectable fixes — in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "How do I write a software engineer resume with no work experience?",
    answer:
      "Focus on projects — academic assignments, personal repos, bootcamp capstones, hackathons, and open-source contributions. Use the same action-verb + tech stack + outcome structure as experienced engineers. A working CRUD app with tests and a README is legitimate evidence. Name the exact languages and frameworks the posting requires, even if your exposure was coursework.",
  },
  {
    question: "Should I include my GPA on an entry-level software engineer resume?",
    answer:
      "Include GPA if it is 3.5 or above and you are within 3 years of graduation. For bootcamp graduates, include the program name and completion date instead. Remove GPA once you have a full-time engineering role on your resume.",
  },
  {
    question: "How long should an entry-level software engineer resume be?",
    answer:
      "One page. Tight, scannable, and project-dense is better than two pages with padding. Use the space for 3–4 strong project entries with specific tech stacks and outcome metrics, not a long list of coursework or generic soft-skill bullets.",
  },
  {
    question: "Can I use personal projects and bootcamp capstones as experience on a software engineer resume?",
    answer:
      "Yes — and you should. Create a 'Projects' section and treat each project as a work entry: stack, what you built, a measurable outcome (test coverage, latency, users, or ranking), and a GitHub link if the code is clean. A well-written project bullet with React + TypeScript + deployed URL is stronger than a vague internship bullet.",
  },
  {
    question: "What is the most important skill for an entry-level software engineer resume?",
    answer:
      "Match the posting. Most entry-level SWE roles specify a primary language (TypeScript, Python, Java, Go) and a core framework (React, Node.js, Spring). List exactly what the posting requires, not a generic list of 20 languages. ATS keyword matching is exact or near-exact — 'JavaScript' does not score for 'TypeScript'.",
  },
  {
    question: "Should I include a GitHub link on an entry-level software engineer resume?",
    answer:
      "Yes, if the repositories are clean and representative. Clean means: readable README, organized code, no credentials in the repo, and working state (not a half-finished skeleton). One or two strong repos are more valuable than 15 empty or abandoned ones. Link to your best project directly in the resume, not just your profile.",
  },
  {
    question: "How do I tailor an entry-level software engineer resume to a specific job description?",
    answer:
      "Read the posting and match exact tool names. If the JD says 'React' and 'TypeScript', those terms need to appear in your resume — not just 'JavaScript frameworks'. ResumeAtlas compares your resume to the posting and shows which required terms are missing before you apply.",
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
  headline: `Entry Level Software Engineer Resume (${CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide`,
  description:
    "Entry level software engineer resume examples, summary, skills section, before/after bullet rewrites, ATS formatting, and a free keyword scan for new grads and bootcamp graduates.",
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
      name: "Software Engineer Resume Guide",
      item: `${siteBase}${roleResumePillarPath("software-engineer")}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Entry Level Software Engineer Resume",
      item: pageUrl,
    },
  ],
};

const SUMMARY_EXAMPLES = [
  {
    label: "New grad / CS degree",
    text: "Software engineer with a CS degree and strong fundamentals in TypeScript, React, and Node.js. Shipped 3 full-stack projects including a real-time chat app and a REST API for a campus event platform. Looking for a product-focused engineering role where I can contribute to user-facing features from day one.",
  },
  {
    label: "Bootcamp graduate",
    text: "Bootcamp-trained full-stack developer with demonstrated ability to ship end-to-end features using React, Express, and PostgreSQL. Completed a 3-month program at [Bootcamp Name] and built a capstone e-commerce app with cart, auth, and Stripe test-mode checkout — deployed and live. Strongest in JavaScript / TypeScript and REST API design.",
  },
  {
    label: "Career changer with transferable skills",
    text: "Former mechanical engineer transitioning to software development, bringing 3 years of Python scripting experience and a 6-month self-study track that produced 4 deployed projects (React + FastAPI). Comfortable with git, CI basics, and REST APIs. Targeting backend or full-stack roles in engineering tooling or infrastructure.",
  },
] as const;

const WEAK_TO_STRONG_SUMMARY = {
  weak: "Recent computer science graduate seeking an entry-level software engineering position to utilize my programming skills and grow as a developer.",
  strong: "CS graduate with React, TypeScript, and Node.js skills applied across 3 shipped projects, including a REST API that handles 500+ daily requests in production. Targeting product engineering roles where I can own frontend or full-stack features.",
  fix: "Replace 'seeking to utilize' with a specific tech stack and a production or project signal. A deployed project with usage is stronger than any intention statement.",
};

const SKILL_TIERS = {
  core: ["TypeScript", "JavaScript", "React", "Node.js / Express", "REST APIs", "Git", "SQL"],
  supporting: ["Next.js", "Python", "PostgreSQL", "Docker", "Jest / Vitest", "CI/CD (GitHub Actions)", "HTML/CSS"],
  signals: ["Open-source contributions (PRs merged)", "Deployed production projects (with URL)", "Hackathon placements", "LeetCode (if relevant)", "AWS Cloud Practitioner"],
} as const;

const BULLET_PATTERNS = [
  {
    type: "Personal or capstone project",
    pattern: "Built/Shipped/Implemented + what + stack + outcome or metric",
    weak: "Created a web app using React for a class project.",
    strong: "Built a full-stack task manager with React, Express, and PostgreSQL; added JWT auth and Playwright E2E tests covering 6 critical flows — deployed on Railway with 0 failed CI runs in 30 days.",
    fix: "Name the stack, add a reliability or coverage signal, and show it is deployed and working — not a local demo.",
  },
  {
    type: "Internship contribution",
    pattern: "Action verb + tech + task + result or scope",
    weak: "Helped the team fix bugs and worked on new features.",
    strong: "Fixed a React memory leak in the settings dashboard during a summer internship; reduced crash rate on that page by 35% (Sentry) and added a regression test that caught 2 subsequent issues.",
    fix: "Own the verb, name the tool, give a scope (35% crash reduction), and show how your fix held up.",
  },
  {
    type: "Open-source or academic",
    pattern: "Contributed + to what + with what + outcome",
    weak: "Contributed to open-source projects on GitHub.",
    strong: "Submitted a documentation PR to an OSS React library clarifying TypeScript generic usage with a runnable example — merged by maintainers within 4 days; currently cited in 3 Stack Overflow answers.",
    fix: "Name the project, the change, and that it was accepted — 'contributed to OSS' without evidence is noise.",
  },
] as const;

const MISTAKES = [
  {
    mistake: "Listing languages and frameworks without any project showing you used them",
    fix: "Every tech in your skills section needs a project bullet. Unanchored skills are the most common red flag on entry-level SWE resumes — recruiters test them in screens.",
  },
  {
    mistake: "Linking to a GitHub profile full of empty, forked, or abandoned repos",
    fix: "Only link GitHub if at least 2–3 repos are clean, documented, and buildable. Better to link directly to your best project repo in the resume than to a profile with low signal.",
  },
  {
    mistake: "Writing a multi-column resume to fit your full skill list",
    fix: "Single-column only. Multi-column resumes fail ATS parsing. Skills from the left column get merged into experience text from the right, corrupting keyword matching.",
  },
  {
    mistake: "Using vague bullets like 'worked on features' or 'assisted with backend'",
    fix: "Own the verb and name the result. 'Implemented pagination for a REST endpoint; reduced payload size from 2MB to 40KB' is 10× stronger than 'assisted with backend work'.",
  },
  {
    mistake: "Submitting the same resume to every posting without checking for keyword gaps",
    fix: "Frontend JDs specify React vs Vue vs Angular. Backend JDs specify Python vs Go vs Java. A one-minute keyword scan before you apply tells you exactly which terms to add.",
  },
] as const;

export default function EntryLevelSoftwareEngineerResumePage() {
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
          <Link href={roleResumePillarPath("software-engineer")} className="hover:text-gray-700">Software Engineer Resume Guide</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Entry Level</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            Entry Level Software Engineer Resume
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Entry Level Software Engineer Resume ({CONTENT_FRESHNESS_YEAR}): Examples & ATS Guide
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            Built for new grads, bootcamp graduates, and career changers. Includes ATS format rules, skills guide, summary examples, and before/after bullet rewrites for project-based experience.
          </p>
          <p className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            No full-time engineering experience yet? These examples are built around capstone projects, bootcamp work, hackathons, and internships — not two years of production systems.
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
            What does an entry-level software engineer resume actually need?
          </h2>
          <p className="mb-3 text-gray-700">
            Hiring managers reviewing entry-level SWE resumes are not expecting production ownership of a distributed system. They are screening for language and framework fundamentals, evidence you can ship something that works, and a signal that you write clean, tested code. Projects count as evidence when they are specific, deployed, and written up with the same rigor as a work bullet.
          </p>
          <p className="text-gray-700">
            ATS screening is the first filter — and it is stack-specific. If the posting says "TypeScript" and "React," those exact terms must appear in your resume. "JavaScript frameworks" does not match "React" in most ATS. Check each posting before you apply — the keyword gap for a specific role takes 60 seconds to find.
          </p>
        </section>

        {/* Summary examples */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Entry Level Software Engineer Resume Summary Examples
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
            Entry Level Software Engineer Skills for a Resume
          </h2>
          <p className="mb-4 text-gray-600">
            List only technologies you can discuss confidently in a technical interview. A concise, defensible skills section outperforms a padded one.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Core — include where you have real proficiency</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.core.map((s) => (
                  <span key={s} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Supporting — include with real project usage</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TIERS.supporting.map((s) => (
                  <span key={s} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="mb-2 text-sm font-semibold text-gray-800">Signals — optional differentiators for entry-level</p>
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
            How to Write Experience Bullets With Projects and Limited Work History
          </h2>
          <p className="mb-5 text-gray-600">
            Project bullets follow the same structure as work experience bullets — the context is different, not the quality standard. Here are three patterns with before/after examples:
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
            Your bullets might still miss the ATS keywords for this specific posting.
          </p>
          <p className="mb-4 text-sm text-blue-700">
            Frontend JDs require React. Backend JDs require specific languages. Even strong project bullets miss ATS screening if they don&apos;t match the posting&apos;s exact terms. ResumeAtlas checks the keyword gap in 60 seconds — no signup needed.
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
          <h2 className="mb-3 text-xl font-semibold text-gray-900">ATS Format Rules for Entry-Level Engineer Resumes</h2>
          <ul className="space-y-3">
            {[
              "Single-column layout — multi-column breaks ATS parsing and mixes your skills list with your project bullets.",
              'Standard headings: "Projects", "Work Experience", "Education", "Skills" — no creative renaming.',
              "Selectable PDF or .docx — never a screenshot or image-based PDF.",
              "GitHub link: only if 2+ repos are clean and well-documented. Link to your best project directly.",
              "LinkedIn profile dates must match resume dates — recruiters verify both.",
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Common Entry-Level Software Engineer Resume Mistakes</h2>
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Software Engineer Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={roleResumePillarPath("software-engineer")} className="text-blue-600 hover:underline">Software engineer resume guide — career-neutral examples and bullets</Link></li>
            <li><Link href={roleResumeKeywordsPath("software-engineer")} className="text-blue-600 hover:underline">Software engineer resume keywords — full ATS keyword list</Link></li>
            <li><Link href="/software-engineer-resume-bullet-points" className="text-blue-600 hover:underline">Software engineer resume bullet points — entry-level, junior, and senior examples</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary examples — 50+ by role and level</Link></li>
            <li><Link href={RESUME_SKILLS_GUIDE_PATH} className="text-blue-600 hover:underline">Resume skills examples — ATS-friendly skills section format</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission check</Link></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Entry Level Software Engineer Resume — FAQ</h2>
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
          <h2 className="mb-3 text-2xl font-bold">You&apos;ve built the projects. Now make sure the keywords match.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Entry-level candidates are rejected by ATS before a human reads their resume — not because their projects aren&apos;t strong, but because the exact stack terms don&apos;t match the posting. Paste your resume and the job description into ResumeAtlas. Full keyword match score, rejection risks, and selectable fixes in about 60 seconds.
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
