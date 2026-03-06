import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker – Check If Your Resume Passes ATS | ResumeAtlas",
  description:
    "Use our free ATS resume checker to see if your resume passes Applicant Tracking Systems. Check your ATS score, keyword match, and compatibility before you apply.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can ATS read PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Most modern ATS systems can read PDF resumes. However, the way your PDF is built matters: text-based PDFs parse well, while image-heavy or scanned PDFs often fail. Use a clean, text-based PDF with standard fonts and avoid complex layouts, images, or tables so the ATS can extract your experience and skills correctly.",
      },
    },
    {
      "@type": "Question",
      name: "What ATS score is good?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A good ATS score is typically 75% or higher. Resumes that score above 75% usually have strong keyword alignment with the job description and clear, parseable structure. Aim for 80%+ when possible; scores in that range indicate your resume is likely to pass initial ATS screening and reach a human recruiter.",
      },
    },
    {
      "@type": "Question",
      name: "How to pass ATS screening?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "To pass ATS screening: use keywords from the job description naturally in your resume, keep formatting simple (clear headings, no images or complex tables), include standard sections (Experience, Education, Skills), and avoid graphics or columns that break parsing. Use a free ATS resume checker like ResumeAtlas to see your score and fix issues before you apply.",
      },
    },
  ],
};

export default function ATSResumeCheckerPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Free ATS Resume Checker
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your resume and see if it will pass Applicant Tracking Systems.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Section 1 — What Is an ATS Resume Checker? */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            What Is an ATS Resume Checker?
          </h2>
          <div className="mt-4 space-y-3 text-slate-700 text-sm sm:text-base">
            <p>
              An <strong>ATS (Applicant Tracking System)</strong> is software used by employers to
              collect, filter, and rank job applications. When you apply online, your resume is
              often fed into an ATS before a human ever sees it. An <strong>ATS resume checker</strong> is
              a tool that analyzes your resume the way these systems do, so you can fix problems
              before you submit.
            </p>
            <p>
              Resumes get rejected by ATS when they lack the right keywords, use formatting that
              breaks parsing (e.g., images, tables, or complex layouts), or bury important skills
              in long paragraphs. <strong>Keyword matching</strong> is central: ATS platforms compare
              your resume to the job description. If required skills or terms are missing or
              unclear, your application may be filtered out or ranked low, so it never reaches a
              recruiter.
            </p>
          </div>
        </section>

        {/* Section 2 — How ATS Systems Scan Resumes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How ATS Systems Scan Resumes
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Learn more in our guide:{" "}
            <Link href="/how-ats-scans-resumes" className="font-medium text-slate-900 underline hover:no-underline">
              How ATS scans resumes
            </Link>
            .
          </p>
          <ul className="mt-4 space-y-3 text-slate-700 text-sm sm:text-base list-none">
            <li>
              <strong>Resume parsing</strong> — The ATS converts your resume into structured data
              (name, experience, education, skills). Complex layouts or graphics can cause parsing
              errors and missing information.
            </li>
            <li>
              <strong>Keyword matching</strong> — Your resume is compared to the job description.
              Skills and terms that appear in both tend to rank higher; missing keywords can
              lower your score or trigger filters.
            </li>
            <li>
              <strong>Formatting rules</strong> — Many ATS systems prefer simple, linear layouts
              with clear section headings. Columns, text boxes, and images often break or confuse
              the parser.
            </li>
            <li>
              <strong>Experience relevance</strong> — Systems may weigh years of experience,
              job titles, and how well your history aligns with the role. Clear, consistent
              labels help the ATS interpret your background correctly.
            </li>
          </ul>
        </section>

        {/* Section 3 — Why ATS Rejects Many Resumes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Why ATS Rejects Many Resumes
          </h2>
          <p className="mt-4 text-slate-700 text-sm sm:text-base">
            Many resumes fail ATS screening before a recruiter ever reads them. Common reasons
            include missing job keywords, incompatible formatting, lack of measurable achievements,
            and poor alignment with the job description. ATS systems prioritize resumes that
            clearly match the required skills and experience listed in the job posting.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>Missing required keywords</li>
            <li>Poor formatting (tables, graphics)</li>
            <li>Generic job descriptions</li>
            <li>Lack of measurable achievements</li>
          </ul>
        </section>

        {/* Section 4 — Common Reasons ATS Rejects Resumes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Common Reasons ATS Rejects Resumes
          </h2>
          <ul className="mt-4 space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>Missing job keywords from the description</li>
            <li>Poor or non-standard formatting (columns, text boxes, unusual fonts)</li>
            <li>Images, charts, or tables that the ATS cannot read as text</li>
            <li>Generic job descriptions or vague bullet points that don’t reflect the role</li>
            <li>Important skills or titles buried in paragraphs instead of clear sections</li>
          </ul>
        </section>

        {/* Section 4 — Use ResumeAtlas ATS Scanner */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Use ResumeAtlas ATS Scanner
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            ResumeAtlas analyzes your resume and the job description you care about. You get a
            clear view of how ATS-friendly your resume is and where to improve.
          </p>
          <p className="mt-2 text-slate-700 text-sm sm:text-base font-medium">
            ResumeAtlas analyzes:
          </p>
          <ul className="mt-2 space-y-1 text-slate-700 text-sm sm:text-base list-disc pl-5">
            <li>Keyword match with the job description</li>
            <li>ATS compatibility and structure</li>
            <li>Resume structure and section clarity</li>
            <li>Missing skills and suggested improvements</li>
          </ul>
          <p className="mt-4 text-slate-600 text-sm">
            For more tips, see{" "}
            <Link href="/how-to-pass-ats" className="font-medium text-slate-900 underline hover:no-underline">
              how to pass ATS
            </Link>
            .
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check My Resume
          </Link>
        </section>

        {/* Section 5 — FAQ */}
        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">Can ATS read PDFs?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Most modern ATS systems can read PDF resumes. However, the way your PDF is
                built matters: text-based PDFs parse well, while image-heavy or scanned PDFs
                often fail. Use a clean, text-based PDF with standard fonts and avoid complex
                layouts, images, or tables so the ATS can extract your experience and skills
                correctly.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">What ATS score is good?</h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                A good ATS score is typically 75% or higher. Resumes that score above 75% usually
                have strong keyword alignment with the job description and clear, parseable
                structure. Aim for 80%+ when possible; scores in that range indicate your resume
                is likely to pass initial ATS screening and reach a human recruiter.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  How to pass ATS screening?
                </h3>
                <span className="text-slate-400 text-xs group-open:hidden">+</span>
                <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                To pass ATS screening: use keywords from the job description naturally in your
                resume, keep formatting simple (clear headings, no images or complex tables),
                include standard sections (Experience, Education, Skills), and avoid graphics or
                columns that break parsing. Use a free ATS resume checker like ResumeAtlas to see
                your score and fix issues before you apply.
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
