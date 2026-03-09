import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Pass ATS Screening – Practical Guide | ResumeAtlas",
  description:
    "Learn how to pass ATS screening with the right formatting, keywords, and resume structure. Avoid common mistakes and get your resume in front of recruiters.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I make sure my resume passes ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Use a simple one-column layout, standard section headings, and include the skills and tools from the job description in your summary, skills section, and experience bullets. Avoid images and complex tables, and run your resume through an ATS checker like ResumeAtlas before you apply.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need different resumes for different jobs to pass ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Tailoring your resume to each job description—especially the skills and impact bullets—significantly improves keyword match and ATS scores. Start from a strong master resume, then adapt language and emphasis for each role.",
      },
    },
    {
      "@type": "Question",
      name: "Are PDFs OK for ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Most modern ATS can read text-based PDFs and .docx files. Avoid image-only PDFs or heavily designed templates. If in doubt, use a clean .docx or a simple, text-based PDF exported from Word or Google Docs.",
      },
    },
  ],
};

export default function HowToPassATSPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            How to Pass ATS Screening
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Learn how to structure, keyword, and format your resume so it passes Applicant Tracking
            Systems (ATS) and reaches a human recruiter.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume for ATS
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Intro */}
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            Most companies use <strong>Applicant Tracking Systems (ATS)</strong> to filter and rank
            resumes before a recruiter ever looks at them. Passing ATS isn&apos;t about gaming the
            system—it&apos;s about making your experience easy to parse and clearly relevant to the
            role. This guide walks through the practical steps you can take to improve your chances
            of making it past the screen.
          </p>
        </section>

        {/* 1. Fix formatting */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            1. Use ATS-Friendly Formatting
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ATS tools work best with <strong>simple, predictable layouts</strong>. Creative
            templates can look impressive to humans but break machine parsing. To keep your resume
            safe:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>Use a single column instead of multiple columns or text boxes.</li>
            <li>
              Stick to standard headings like <strong>Work Experience</strong>,{" "}
              <strong>Education</strong>, and <strong>Skills</strong>.
            </li>
            <li>Avoid images, icons, or tables for core content.</li>
            <li>
              Keep fonts simple (e.g. Arial, Calibri) and avoid heavy use of custom symbols.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            When in doubt, choose clarity over design. You can always bring a visually polished
            version to the interview.
          </p>
        </section>

        {/* 2. Match the job description */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            2. Match the Job Description with Keywords
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ATS compare your resume to the <strong>exact job description</strong> for the role.
            That means your wording matters. To align with the posting:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              Highlight the same <strong>skills, tools, and responsibilities</strong> where they are
              genuinely part of your experience.
            </li>
            <li>
              Use the employer&apos;s language—if they say &quot;stakeholder management&quot; or
              &quot;Python&quot;, use those exact phrases.
            </li>
            <li>
              Place key terms in your <strong>summary, skills list, and bullets</strong>, not just
              in one section.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            This doesn&apos;t mean copying the posting word‑for‑word. It means describing your real
            work in a way that clearly maps to what the role is asking for.
          </p>
        </section>

        {/* 3. Write impact bullets */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            3. Use Impact-Focused Bullets
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ATS and recruiters both prefer <strong>specific, outcome‑driven bullets</strong> over
            vague responsibilities. A good pattern is:
          </p>
          <p className="mt-2 text-slate-700 text-sm sm:text-base">
            <strong>Action verb + what you did + measurable result.</strong>
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              Weak: &quot;Responsible for running reports.&quot; <br />
              Strong: &quot;Automated weekly revenue reports in SQL and Excel, saving the finance
              team 5 hours per week.&quot;
            </li>
            <li>
              Weak: &quot;Helped improve onboarding.&quot; <br />
              Strong: &quot;Redesigned onboarding emails and in‑app prompts, increasing day‑7
              activation by 9%.&quot;
            </li>
          </ul>
        </section>

        {/* 4. Optimize skills section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            4. Optimize Your Skills Section
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Many recruiters and ATS scans look first at your <strong>Skills</strong> or{" "}
            <strong>Technical Skills</strong> section. Make it easy to parse:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>Group skills by category (e.g. Languages, Frameworks, Tools).</li>
            <li>List only tools you&apos;d be comfortable being interviewed on.</li>
            <li>
              Reflect the role you want—if you&apos;re moving toward data roles, emphasize SQL,
              Python, and analytics tools.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            For role‑specific keyword ideas, see the{" "}
            <Link
              href="/ats-keywords/data-scientist"
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS keywords for Data Scientist
            </Link>{" "}
            guide or other keyword pages in the navigation.
          </p>
        </section>

        {/* 5. Choose the right file type */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            5. Use a Safe File Type for ATS
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Most ATS handle <strong>.docx</strong> and text‑based <strong>PDF</strong> files well.
            However:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              Avoid scanned PDFs or designs exported as a single image—ATS can&apos;t read the
              text.
            </li>
            <li>
              Don&apos;t password‑protect your file or use unusual encodings that might block
              parsing.
            </li>
          </ul>
        </section>

        {/* CTA + related guides */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check If Your Resume Will Pass ATS
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Instead of guessing, paste your resume and a job description into ResumeAtlas. You&apos;ll
            see keyword coverage, ATS compatibility, and a clear to‑do list to improve your match
            before you apply.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume for ATS
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

