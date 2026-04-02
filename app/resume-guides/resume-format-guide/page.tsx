import type { Metadata } from "next";
import Link from "next/link";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";

export const metadata: Metadata = {
  title: "Resume Format Guide: ATS, Modern, Professional & One-Page | ResumeAtlas",
  description:
    "ATS-friendly resume format guide. Pair it with ResumeAtlas, an AI ATS resume checker: compare your resume with a job description after you fix structure. One-page, modern, and professional layouts.",
  alternates: {
    canonical: "/resume-guides/resume-format-guide",
  },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    id: "ats-resume-format",
    heading: "ATS Resume Format",
    body: "The right ATS resume format balances structure for machines with readability for humans. Use a reverse-chronological format. It surfaces your most recent experience first and makes it easy for ATS and recruiters to follow your career story. Essential sections: Contact Information, Summary, Skills, Work Experience, and Education. Use a single-column layout, left-aligned text, and consistent date formatting. Avoid charts, graphics, text boxes, and tables for core experience. Use bullet points rather than long paragraphs, and keep font sizes between 10 and 12 points. Purely functional formats can confuse ATS because they hide timelines; a clear reverse-chronological work history is safest. Some systems struggle with columns: a single column is the most reliable format.",
  },
  {
    id: "resume-format-for-ats",
    heading: "Resume Format for ATS: Do's and Don'ts",
    body: "Keep the layout simple, avoid decorative elements, and make your headings and dates easy to scan. Use standard fonts, clear section titles, and concise bullets. Do keep margins reasonable, use bullet points, and align text to the left. Do not rely on images, icons, or unusual fonts to carry meaning. Avoid placing important content in headers, footers, or sidebars that some ATS ignore. Copy your resume text into a plain text editor. If the order, headings, and spacing still make sense, your format is likely safe for ATS. Run it through ResumeAtlas with a real job description for additional feedback.",
  },
  {
    id: "best-resume-format-2025",
    heading: "Best Resume Format for 2025",
    body: "Resume trends change, but the fundamentals do not. In 2025, employers still prefer resumes that are simple, targeted, and easy to scan in under 30 seconds. Reverse-chronological still wins: recruiters and ATS both expect to see your most recent experience first. Include a focused summary, a skills section tuned to your target role, detailed work experience with metrics, and your education. If you are targeting remote or hybrid positions, highlight collaboration tools, asynchronous communication, and examples of working across time zones. Use the language of the job description, but only for skills and experiences that are truly part of your background. One page for early-career professionals, up to two pages for more experienced candidates.",
  },
  {
    id: "modern-resume-format",
    heading: "Modern Resume Format",
    body: "A modern resume format focuses on clarity, white space, and the story your career tells rather than heavy design. Short paragraphs, clear headings, and consistent spacing help your resume feel up to date. Modern resumes emphasize impact, not just responsibilities, and highlight cross-functional collaboration and measurable results. You do not need multiple colors, icons, or graphics to stand out. Those elements can hurt ATS compatibility. A single accent color, strong typography, and good alignment create a professional, modern look. Lead with a concise summary, followed by a skills section and your most relevant experience. Use bullets with strong verbs and metrics. Design-focused resumes can work for creative roles, but keep an ATS-friendly version for online applications.",
  },
  {
    id: "professional-resume-format",
    heading: "Professional Resume Format",
    body: "A professional resume format is designed for experienced candidates who need to present depth without overwhelming the reader. Beyond basic sections, emphasize scope (team size, budgets, markets) and outcomes (revenue, efficiency, quality). Include leadership bullets, mentorship, and cross-functional influence. Group related roles within the same company and highlight promotions. Prioritize the last 8–10 years, summarizing earlier roles more briefly. Use bullets to show how your work influenced strategy, roadmaps, or company-level metrics. Even at senior levels, stick to a simple layout: two pages is standard for experienced professionals. Use a professional summary that communicates who you are and the value you bring instead of an objective statement.",
  },
  {
    id: "one-page-resume",
    heading: "One-Page Resume",
    body: "One-page resumes force you to prioritize what matters most. When done well, they are easier for recruiters to read and can perform better in ATS because signal is high and noise is low. If you have less than 8–10 years of experience or are changing careers, a one-page resume is usually enough. Use a compact header, a three- to four-line summary, a short skills section, and your two or three most relevant roles with strong bullets. Cut repeated bullets, remove low-impact responsibilities, and focus on metrics. Do not shrink your font or margins to cram everything in: it is better to be selective and readable than dense and overwhelming. Avoid orphaned lines on a second page; if you need more room, commit to a well-structured two-page resume.",
  },
  {
    id: "resume-sections",
    heading: "Resume Sections",
    body: "At minimum, your resume should include: Contact Information, Summary, Skills, Work Experience, and Education. Many candidates also add Certifications, Projects, or Publications when relevant. Each section should start with a clear heading on its own line so ATS can map it correctly. Name and contact details at the top, followed by a short professional summary that highlights years of experience, core skills, and the type of roles you target. Next, a skills list grouped by category. Under Work Experience, use bullets that describe what you did and what changed because of your work. Close with your education and any relevant credentials. Optional extras such as certifications or projects can come last.",
  },
  {
    id: "simple-resume-format",
    heading: "Simple Resume Format",
    body: "A simple resume format is often the most effective: it is quick to create, easy for hiring managers to scan, and highly compatible with ATS. Simple formats work well for most candidates, especially students, recent graduates, and career switchers. Start with contact information, then a short summary, a skills section, and work or project experience. For early-career candidates, education can come before work experience if it is more relevant. Use plenty of white space, consistent fonts, and short bullets. Tailor your summary and bullets to the job: mention specific tools, domains, and results so your resume feels targeted, not one-size-fits-all. You can build a strong simple resume in Google Docs or Word.",
  },
];

export default function ResumeFormatGuidePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is a functional resume format ATS friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purely functional formats can confuse ATS and recruiters because they hide timelines and job titles. A clear reverse-chronological work history is safest.",
        },
      },
      {
        "@type": "Question",
        name: "How long should my resume be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One page for early-career professionals, up to two pages for more experienced candidates. Focus on relevance over completeness.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use color in a resume?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Light use of color for headings or accent lines is fine. Ensure enough contrast and that the document remains legible when printed in black-and-white.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Resume Format Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            One guide to choose the right resume format: ATS-friendly structure, modern and
            professional formats, one-page resumes, and essential sections. Use the links below to
            jump to any topic.
          </p>
          <Link
            href="/#ats-checker-form"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            Open the ATS resume checker
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Table of contents */}
        <nav aria-label="On this page" className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">
            On this page
          </h2>
          <ul className="space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            The right resume format and sections help{" "}
            <strong>applicant tracking systems (ATS)</strong> and recruiters quickly understand your
            experience. Use this guide to structure your resume in a way that is easy to scan,
            keyword rich, and tailored to the jobs you care about.
          </p>
          <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            After you adjust layout, run the{" "}
            <Link
              href="/#ats-checker-form"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              free ATS resume checker
            </Link>{" "}
            and use it as a{" "}
            <Link
              href="/#ats-checker-form"
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              resume vs job description tool
            </Link>{" "}
            to confirm keyword fit for a real posting.
          </p>
        </section>

        {/* Pillar sections with anchors */}
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              {section.heading}
            </h2>
            <p className="mt-3 text-slate-700 text-sm sm:text-base">
              {section.body}
            </p>
          </section>
        ))}

        {/* Example structure */}
        <section id="example-structure">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Example Resume Structure
          </h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-2 text-sm sm:text-base text-slate-800">
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-slate-600">
              Target Role · email@example.com · City, Country · LinkedIn · Portfolio
            </p>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Professional Summary
              </h3>
              <p>
                Experienced professional with a track record of delivering measurable results in
                fast‑paced, cross‑functional teams. Skilled in translating business goals into
                clear, actionable work and communicating outcomes to stakeholders.
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">Skills</h3>
              <p className="text-slate-700">
                Core tools for your role · Domain expertise · Collaboration &amp; communication
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Work Experience
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Job Title – Company: Impact-focused bullet with a measurable result for your most
                  recent role.
                </li>
                <li>
                  Job Title – Company: Second bullet highlighting scope, collaboration, or
                  ownership.
                </li>
              </ul>
            </div>
            <div className="pt-3 space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">Education</h3>
              <p>Bachelor&apos;s or Master&apos;s degree (or equivalent experience).</p>
            </div>
          </div>
        </section>

        {/* CTA + related */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Run the ATS resume checker on your draft
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Once you have updated your format and sections, open the{" "}
            <strong>AI-powered ATS resume checker</strong> and{" "}
            <strong>compare your resume with a job description</strong>. You will see keyword
            coverage, ATS-style compatibility, and improvements to prioritize before you apply.
          </p>
          <Link
            href="/#ats-checker-form"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Open the free ATS resume checker
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related guides
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href="/how-to-pass-ats#how-ats-scans-resumes"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-pass-ats#common-resume-mistakes-fail-ats"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-guides/resume-skills-examples"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Resume Skills Examples
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
          <div className="mt-6 space-y-4">
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  Is a functional resume format ATS friendly?
                </h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Purely functional formats can confuse ATS and recruiters because they hide timelines
                and job titles. A clear reverse-chronological work history is safest.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  How long should my resume be?
                </h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                One page for early-career professionals, up to two pages for more experienced
                candidates. Focus on relevance over completeness.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Can I use color in a resume?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Light use of color for headings or accent lines is fine. Ensure enough contrast and
                that the document remains legible when printed in black-and-white.
              </p>
            </details>
          </div>
        </section>
      </div>

      <RelatedResumeGuidesSection
        currentPath="/resume-guides/resume-format-guide"
        count={5}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-10 border-t border-slate-200 pt-6"
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
