import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Common Resume Mistakes That Fail ATS | ResumeAtlas",
  description:
    "Avoid the resume mistakes that make ATS reject you: missing keywords, poor formatting, generic descriptions, and no measurable achievements. Fix them before you apply.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the biggest resume mistake for ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "One of the biggest mistakes is missing required keywords from the job description. ATS rank and filter by keyword match; if your resume doesn’t include the skills and terms the employer listed, you’re likely to be filtered out or ranked low before a recruiter ever sees your application.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my resume get rejected by ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Common reasons include: missing job keywords, formatting that breaks parsing (columns, tables, images), generic or vague bullet points, and lack of measurable achievements. ATS need clear, parseable text and alignment with the job description to score you well.",
      },
    },
    {
      "@type": "Question",
      name: "Can resume formatting cause ATS to reject me?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Complex layouts, multiple columns, text in images or tables, and non-standard section names can cause the ATS to misparse or miss content. Use a simple, single-column layout with clear headings like Experience, Education, and Skills so the system can read your resume correctly.",
      },
    },
  ],
};

export default function CommonResumeMistakesFailATSPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Common Resume Mistakes That Fail ATS
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Fix these resume mistakes before you apply so your application gets past Applicant Tracking Systems and in front of recruiters.
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
            Many strong candidates are filtered out by <strong>Applicant Tracking Systems (ATS)</strong> before a human ever reads their resume. The good news: most rejections come from a handful of fixable mistakes. Here are the most common resume mistakes that fail ATS—and how to avoid them.
          </p>
        </section>

        {/* 1. Missing keywords */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            1. Missing Required Keywords
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ATS compare your resume to the <strong>job description</strong>. If the posting asks for “Python,” “agile,” or “stakeholder management” and those terms don’t appear in your resume (or appear only in a graphic the ATS can’t read), you’ll score lower or be filtered out. You don’t have to copy the job ad word for word—use the same skills and terminology naturally in your summary, bullets, and skills section so the system (and the recruiter) see a clear match.
          </p>
        </section>

        {/* 2. Poor formatting */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            2. Poor or Incompatible Formatting
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Fancy templates with <strong>columns, text boxes, tables, or images</strong> often break ATS parsing. Content in headers/footers may be ignored. The result: missing job titles, scrambled dates, or skills that never make it into the system. Use a simple, single-column layout with standard section headings (Work Experience, Education, Skills) and avoid graphics that contain important text. Learn more in our guide on <Link href="/how-ats-scans-resumes" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">how ATS scan resumes</Link>.
          </p>
        </section>

        {/* 3. Generic job descriptions */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            3. Generic or Vague Job Descriptions
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Bullet points like “Responsible for various tasks” or “Helped the team succeed” don’t give the ATS (or the recruiter) anything to match. Use <strong>concrete language</strong> that reflects the role you’re applying for: specific tools, projects, and outcomes. Mirror the job description’s wording where it honestly fits—e.g. if the role says “cross-functional collaboration,” use that phrase when it’s true for you. Generic resumes get low relevance scores and are easy to skip.
          </p>
        </section>

        {/* 4. Lack of measurable achievements */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            4. Lack of Measurable Achievements
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ATS and recruiters both respond better to <strong>quantified impact</strong>: numbers, percentages, scale. “Increased sales” is weak; “Increased regional sales by 23% in 12 months” is strong. Where you can, add metrics—revenue, time saved, team size, adoption rate, error reduction. These make your experience easier to match to the job and show you deliver results.
          </p>
        </section>

        {/* 5. Wrong file type or unreadable PDF */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            5. Wrong File Type or Unreadable PDF
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Most ATS handle <strong>.docx and text-based PDFs</strong> well. Image-only PDFs (e.g. a scanned document or a design exported as one big image) often fail—the ATS can’t extract text. Use a proper text-based PDF or Word file with standard fonts. Avoid password protection or unusual formats unless the employer specifically requests them.
          </p>
        </section>

        {/* 6. Unclear or non-standard sections */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            6. Unclear or Non-Standard Section Names
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Creative section titles like “Where I’ve Been” or “What I Bring” can confuse parsers that expect “Work Experience” or “Skills.” Stick to <strong>standard headings</strong>: Experience, Work History, Education, Skills, Summary (or Professional Summary). That way the ATS can correctly map your content and rank you.
          </p>
        </section>

        {/* Summary + CTA */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Avoid These Mistakes Before You Apply
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Fix missing keywords, simplify formatting, add measurable achievements, and use standard sections. Then run your resume through a free <Link href="/ats-resume-checker" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">ATS resume checker</Link> to see how it scores and what to improve before you hit submit.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume for ATS
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Related</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/ats-resume-checker" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Free ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link href="/how-ats-scans-resumes" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link href="/how-to-pass-ats" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  How to Pass ATS Screening
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
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">What is the biggest resume mistake for ATS?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                One of the biggest mistakes is missing required keywords from the job description. ATS rank and filter by keyword match; if your resume doesn’t include the skills and terms the employer listed, you’re likely to be filtered out or ranked low before a recruiter ever sees your application.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Why does my resume get rejected by ATS?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Common reasons include: missing job keywords, formatting that breaks parsing (columns, tables, images), generic or vague bullet points, and lack of measurable achievements. ATS need clear, parseable text and alignment with the job description to score you well.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Can resume formatting cause ATS to reject me?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Complex layouts, multiple columns, text in images or tables, and non-standard section names can cause the ATS to misparse or miss content. Use a simple, single-column layout with clear headings like Experience, Education, and Skills so the system can read your resume correctly.
              </p>
            </details>
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
