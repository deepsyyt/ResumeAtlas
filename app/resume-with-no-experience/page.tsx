import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  RESUME_WITH_NO_EXPERIENCE_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_ACTION_VERBS_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH,
  ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${RESUME_WITH_NO_EXPERIENCE_PATH}`;

export const metadata: Metadata = {
  title: `Resume With No Experience (${CONTENT_FRESHNESS_YEAR}): ATS Guide for First-Time Job Seekers | ResumeAtlas`,
  description:
    `How to write a resume with no experience for ${CONTENT_FRESHNESS_YEAR}: ATS-safe format, what sections to include, how to use coursework and projects, summary examples, and a free keyword scan.`,
  alternates: { canonical: RESUME_WITH_NO_EXPERIENCE_PATH },
  keywords: [
    "resume with no experience",
    "how to write a resume with no experience",
    "resume no work experience",
    "resume for first job",
    "resume for students no experience",
    "resume with no job experience",
    "first resume template",
    "no experience resume examples",
    "resume for beginners",
    "high school student resume no experience",
  ],
  openGraph: {
    title: `Resume With No Experience (${CONTENT_FRESHNESS_YEAR}): ATS Guide for First-Time Job Seekers`,
    description:
      "How to write a resume with no work experience: ATS format, sections, summary examples, project bullets, and a free keyword scan before you apply.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume With No Experience (${CONTENT_FRESHNESS_YEAR}): First-Time Job Seeker ATS Guide`,
    description:
      "Resume with no experience: sections, format, summary examples, project bullets, and a free keyword scan. ATS tips for first-time applicants.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my no-experience resume matches a job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full keyword match score, rejection risks, and selectable fixes in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "How do I write a resume with no work experience?",
    answer:
      "Use a summary, skills, education, and a projects section — not a blank experience section. Projects (class assignments, personal builds, volunteer work, hackathons) count as evidence when written with the same action-verb + tool + outcome structure as work bullets. ATS doesn't check whether 'experience' was paid — it matches keywords and skills.",
  },
  {
    question: "What sections should a no-experience resume include?",
    answer:
      "Summary (2–3 lines), Skills, Education, and Projects or Relevant Experience. If you have any internship, volunteer, or part-time work — even tangentially related — add a Work Experience section. If not, Projects and Coursework carry that weight. Keep it to one page.",
  },
  {
    question: "Can ATS filter out resumes with no experience?",
    answer:
      "ATS filters on keywords and required skills — not job history length. A strong keyword match from project bullets and skills section will pass ATS even without paid experience. The real filter is keyword coverage: if the posting says 'Python' and 'SQL' and your resume doesn't, you're filtered regardless of experience level.",
  },
  {
    question: "Should I include high school or college extracurriculars on a resume with no experience?",
    answer:
      "Include extracurriculars only if they demonstrate a skill required by the posting: club treasurer shows budgeting, team captain shows leadership, debate shows communication. Generic listings ('member of chess club') add no value. One strong bullet about what you did and the outcome it had is worth more than five hollow entries.",
  },
  {
    question: "How long should a resume with no experience be?",
    answer:
      "One page — always. Even with limited content, one tight page with a strong summary, skills list, and 2–3 project entries is better than a half-filled two-page resume or a sparse one-page that needs padding.",
  },
  {
    question: "What's the best format for a first-time resume?",
    answer:
      "Single-column, standard headings, selectable PDF. No infographic designs, no skill-bar graphics, no multi-column layouts. ATS parses resumes as plain text — anything that makes your resume look designed but not readable by a parser hurts your keyword score.",
  },
  {
    question: "How do I tailor a no-experience resume to a specific job description?",
    answer:
      "Read the JD and match the exact tool names and skill terms it requires. If the posting says 'Excel' and your resume says 'spreadsheets', that's a keyword miss. If it says 'customer service' and your resume says 'helped clients', that's a vocabulary miss. ResumeAtlas shows you exactly which terms are missing before you apply.",
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
  headline: `Resume With No Experience (${CONTENT_FRESHNESS_YEAR}): ATS Guide for First-Time Job Seekers`,
  description:
    "How to write a resume with no work experience: ATS-safe sections, summary examples, project bullets, format rules, and a free keyword scan.",
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to Write a Resume With No Experience (${CONTENT_FRESHNESS_YEAR})`,
  description: "A 5-step guide to building a first resume that passes ATS keyword screening and reads credibly to hiring managers.",
  step: [
    { "@type": "HowToStep", name: "Write a focused summary", text: "2–3 lines: your field of study or strongest skill, the tools or methods you know, and the type of role you're targeting. No vague aspiration statements." },
    { "@type": "HowToStep", name: "Build a targeted skills section", text: "List only skills that appear in the job description and that you can discuss. Every skill needs at least one project bullet proving you used it." },
    { "@type": "HowToStep", name: "Add a projects section", text: "Treat each project (class, personal, volunteer) as a mini work entry: tool + task + result. Name specific tools and datasets, not generic descriptions." },
    { "@type": "HowToStep", name: "Use ATS-safe formatting", text: "Single-column layout, standard headings, selectable PDF. No skill bars, no graphics, no multi-column designs." },
    { "@type": "HowToStep", name: "Scan against the specific job description", text: "Paste your resume and the posting into ResumeAtlas to see which required terms are missing before you apply." },
  ],
};

const SUMMARY_EXAMPLES = [
  {
    label: "CS student with coursework and a project",
    text: "Computer science student (graduating May 2026) with Python, SQL, and React skills applied across 4 academic projects including a REST API for campus event management and a machine learning classifier for spam detection. Looking for a software engineering internship or junior developer role.",
  },
  {
    label: "Business/economics student with data skills",
    text: "Economics graduate with Excel, SQL (introductory), and Tableau skills developed through academic coursework and a capstone supply chain analysis project. Comfortable with data cleaning, pivot tables, and stakeholder-facing summaries. Seeking an entry-level data or operations analyst role.",
  },
  {
    label: "Any field — volunteer and self-taught skills",
    text: "Self-taught web developer with 2 personal projects (a portfolio site and a small e-commerce tool) built in React and Node.js over 6 months. No formal computer science degree, but consistent project output and a GitHub profile with 40+ commits. Looking for an entry-level frontend or full-stack role.",
  },
] as const;

const SECTIONS = [
  {
    section: "Summary",
    guidance: "2–3 lines. Field of study or strongest skill + tools you know + type of role. No 'I am a passionate...' openings. Lead with what you can do.",
    example: "Economics student with Python, SQL, and Excel skills applied to 3 academic projects. Looking for entry-level data analyst or operations roles.",
  },
  {
    section: "Skills",
    guidance: "Only list skills you can discuss in an interview and that appear in the job description. Max 8–12 items. Every skill here needs a project bullet.",
    example: "Python · SQL · Excel · Tableau · Google Sheets · Data analysis · Presentation skills · Jira (basics)",
  },
  {
    section: "Education",
    guidance: "Degree, school, graduation year, GPA if 3.5+. List relevant coursework if it directly maps to the job requirements (e.g., Database Systems, Machine Learning, Business Statistics).",
    example: "B.S. Computer Science, State University, May 2026 · GPA: 3.7 · Relevant courses: Data Structures, Database Systems, Statistics",
  },
  {
    section: "Projects",
    guidance: "3–4 entries. Each one: project name + tool + task + result. Treat this like work experience bullets. Link to GitHub or deployed URL if clean.",
    example: "• Built a REST API in Python/Flask for a campus event management system with 200 registered users and JWT authentication.\n• Analyzed 5-year sales dataset in SQL + Excel; identified 3 seasonal trends that informed a mock pricing recommendation.",
  },
  {
    section: "Work Experience (if any)",
    guidance: "Include any paid or unpaid work — retail, food service, volunteer, freelance. Frame bullets around transferable skills: customer service, communication, problem-solving, data handling.",
    example: "• Handled 80+ customer transactions daily as a cashier, maintaining 99% accuracy on end-of-day reconciliation.",
  },
] as const;

const BULLET_EXAMPLES = [
  {
    type: "Academic project",
    weak: "Did a data analysis project for a class using Excel.",
    strong: "Analyzed 3 years of e-commerce sales data in Excel using pivot tables and VLOOKUP; identified a 22% seasonal revenue gap that I recommended addressing with a promotional strategy in my final presentation.",
  },
  {
    type: "Personal / self-directed",
    weak: "Built a website to practice my web development skills.",
    strong: "Built a personal portfolio site in React with a blog section using a Markdown renderer and a contact form connected to Mailchimp; 340 unique visitors in the first month after posting on LinkedIn.",
  },
  {
    type: "Volunteer / extracurricular",
    weak: "Helped manage social media for a student organization.",
    strong: "Managed Instagram and LinkedIn for a 200-member student marketing club; grew Instagram following 45% in one semester by switching to a 3x/week posting schedule with Canva-designed graphics.",
  },
] as const;

const MISTAKES = [
  {
    mistake: "Leaving the experience section blank with a note like 'No work experience'",
    fix: "Remove an empty experience section entirely. Replace it with 'Projects' and 'Professional Development' sections that show what you've done. A blank section is worse than no section.",
  },
  {
    mistake: "Listing skills without any project proving you used them",
    fix: "Every skill in your skills section must appear in at least one project or education bullet. 'Python' in skills with no Python bullet is a red flag for both ATS and recruiters.",
  },
  {
    mistake: "Using a graphic CV or Canva template",
    fix: "ATS can't parse graphics, text boxes, or multi-column layouts. Stick to a plain single-column Word or Google Docs format exported as a selectable PDF.",
  },
  {
    mistake: "Writing vague project descriptions without tools or outcomes",
    fix: "Name the tool (Python, Excel, Figma), what you did with it (analyzed, built, designed), and what the result was (found X, saved Y, attracted Z). Vague descriptions don't score keywords.",
  },
  {
    mistake: "Submitting the same resume to every job without tailoring",
    fix: "Each posting uses different exact-match terms. A customer service posting says 'CRM' and 'Zendesk' — your resume needs those words even if your experience was informal. ResumeAtlas shows the keyword gap for each specific JD in 60 seconds.",
  },
] as const;

export default function ResumeWithNoExperiencePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/resume-guides" className="hover:text-gray-700">Resume Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Resume With No Experience</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            First-Time Resume Guide
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Resume With No Experience ({CONTENT_FRESHNESS_YEAR}): ATS Guide for First-Time Job Seekers
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            How to write a resume that passes ATS screening when you have no paid work experience — using coursework, projects, volunteering, and self-directed work to prove skills with the same rigor as job history.
          </p>
          <p className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            ATS doesn&apos;t check whether your experience was paid. It matches keywords. A project bullet that names the tool and the outcome will score equally against &ldquo;3 years of experience&rdquo; that doesn&apos;t name anything.
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
            What does &ldquo;no experience&rdquo; mean for ATS screening?
          </h2>
          <p className="mb-3 text-gray-700">
            ATS systems don&apos;t read job history the way humans do. They match keyword frequency and placement. A resume with a rich projects section that names Python, SQL, Excel, and specific outcomes will score higher on keyword coverage than a resume with 2 years of experience written vaguely. The challenge isn&apos;t having no experience — it&apos;s writing what experience you have with enough specificity that ATS can read it.
          </p>
          <p className="text-gray-700">
            &ldquo;No experience&rdquo; on a first-time resume means: no paid, full-time, direct-experience work history. It does not mean: no skills, no outcomes, no evidence. Your job is to turn coursework, projects, volunteering, and self-directed work into evidence using the same bullet structure as experienced candidates.
          </p>
        </section>

        {/* Summary examples */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Resume Summary Examples With No Experience
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
        </section>

        {/* Section guide */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            What Sections to Include on a No-Experience Resume (and How)
          </h2>
          <div className="space-y-4">
            {SECTIONS.map((s) => (
              <div key={s.section} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-1 text-sm font-semibold text-gray-900">{s.section}</p>
                <p className="mb-3 text-xs text-gray-500">{s.guidance}</p>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Example</p>
                  <p className="text-xs text-gray-700 whitespace-pre-line">{s.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project bullet examples */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            How to Write Project Bullets (Before & After)
          </h2>
          <div className="space-y-5">
            {BULLET_EXAMPLES.map((b) => (
              <div key={b.type} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-1 text-sm font-semibold text-gray-800">{b.type}</p>
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

        {/* CTA #2 */}
        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">
            Strong projects don&apos;t help if the keywords don&apos;t match the posting.
          </p>
          <p className="mb-4 text-sm text-blue-700">
            Each job description uses specific tool names and skill terms. A generic no-experience resume won&apos;t match a retail JD&apos;s &ldquo;POS system&rdquo; or a tech JD&apos;s &ldquo;React&rdquo;. ResumeAtlas shows you which required terms are missing in 60 seconds.
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
        </div>

        {/* Format */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">ATS Format Rules for a No-Experience Resume</h2>
          <ul className="space-y-3">
            {[
              "Single-column layout — infographic templates and skill-bar designs break ATS parsing.",
              "Standard section names: 'Summary', 'Skills', 'Education', 'Projects', 'Work Experience' — not 'About Me' or 'What I Offer'.",
              "Selectable PDF — not a JPEG of your resume, not a Canva export with embedded text in images.",
              "One page — tight and specific beats two half-filled pages.",
              "No photo, no date of birth, no marital status — irrelevant and sometimes triggers bias filters.",
            ].map((rule, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex-shrink-0 text-blue-500" aria-hidden="true">→</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            Full checklist: <Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link>
          </p>
        </section>

        {/* Mistakes */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Common No-Experience Resume Mistakes</h2>
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={ENTRY_LEVEL_DATA_ANALYST_RESUME_PATH} className="text-blue-600 hover:underline">Entry level data analyst resume — project-based examples and summary guide</Link></li>
            <li><Link href={ENTRY_LEVEL_SOFTWARE_ENGINEER_RESUME_PATH} className="text-blue-600 hover:underline">Entry level software engineer resume — new grad and bootcamp examples</Link></li>
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary examples — 50+ by role and experience level</Link></li>
            <li><Link href={RESUME_SKILLS_GUIDE_PATH} className="text-blue-600 hover:underline">Resume skills examples — ATS-friendly skills section format</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={ATS_RESUME_TEMPLATE_GUIDE_PATH} className="text-blue-600 hover:underline">ATS resume template — format and layout that passes ATS</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission check</Link></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Resume With No Experience — FAQ</h2>
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
          <h2 className="mb-3 text-2xl font-bold">You have more evidence than you think. Make sure it matches the posting.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            First-time applicants are filtered by ATS before a human reads their resume — not because they lack skills, but because their resume doesn&apos;t use the exact terms the posting requires. Paste your resume and the job description into ResumeAtlas. Full keyword match score and selectable fixes in about 60 seconds.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100"
          >
            Check my resume — no signup needed
          </Link>
          <p className="mt-3 text-xs text-gray-400">
            Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds
          </p>
        </section>
      </main>
    </>
  );
}
