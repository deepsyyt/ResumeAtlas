import Link from "next/link";
import {
  ATS_GUIDE_SECTIONS,
  ATS_RESUME_TEMPLATE_PATH,
} from "@/app/lib/atsResumeCheckerGuideContent";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PATH,
} from "@/app/lib/internalLinks";

const sectionClass = "scroll-mt-20";

export function AtsResumeCheckerGuide() {
  return (
    <div className="space-y-12">
      <nav
        aria-label="ATS resume checker guide"
        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
          ATS parsing and readability guide
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          How ATS parsers read resumes: parsing, readability, formatting, ATS compatibility, and what
          to fix so your file stays parsable before you apply.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 list-none m-0 p-0">
          {ATS_GUIDE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                {s.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="what-is-ats" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          What is ATS?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          An <strong className="text-slate-900">Applicant Tracking System (ATS)</strong> is software
          employers use to collect, parse, filter, and rank job applications. When you apply online,
          your resume usually enters an ATS first—not a recruiter&apos;s inbox. Common platforms
          include Workday, Greenhouse, Lever, Taleo, iCIMS, and SmartRecruiters.
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          The ATS turns your resume into structured data (experience, education, skills, dates) and
          often scores how well you match a posting. If parsing fails or your file is hard to read,
          strong experience can still be ranked low or filtered out before a human review.
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          This page focuses on <strong className="text-slate-900">machine readability</strong> and
          ATS compatibility. For full resume-to-job-description matching and tailoring, use the{" "}
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            resume vs job description checker
          </Link>
          .
        </p>
      </section>

      <section id="how-ats-scoring-works" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          How ATS scoring works
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          ATS scoring is not one universal number—each employer configures weights differently. Most
          systems start with parsing and readability: can the resume parser map your formatting into
          fields? Then they layer keyword overlap, experience filters, and sometimes semantic
          relevance. A parsable resume with weak structure still loses to a simpler file that parses
          cleanly.
        </p>
        <ol className="mt-4 space-y-3 list-decimal pl-5 text-sm sm:text-base text-slate-700">
          <li>
            <strong className="text-slate-900">Parse first.</strong> If sections, dates, or titles
            do not map into fields, downstream scoring is unreliable.
          </li>
          <li>
            <strong className="text-slate-900">Match vocabulary.</strong> Hard and soft skills from
            the posting are counted when they appear clearly in experience, skills, or summary—not
            buried in graphics or odd section names.
          </li>
          <li>
            <strong className="text-slate-900">Filter and rank.</strong> Recruiters may sort by
            score, years of experience, or title match. Thin evidence or generic bullets weaken the
            signal even when keywords are present.
          </li>
        </ol>
        <p className="mt-3 text-sm text-slate-600">
          ResumeAtlas estimates ATS-style readability and optional keyword overlap. Treat any score
          as a fix-priority guide, not a hiring guarantee.
        </p>
      </section>

      <section id="ats-parsing-explained" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          ATS parsing explained
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Parsing is how an ATS converts your resume file into fields like Work Experience, Education,
          and Skills. Parsers favor linear, text-based documents with predictable headings. They
          often struggle with multi-column layouts, tables used for structure, text inside images,
          headers/footers with critical content, and nonstandard section titles (&quot;Where I&apos;ve
          Worked&quot; instead of &quot;Experience&quot;).
        </p>
        <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
          <li>
            <strong className="text-slate-900">Section detection</strong> — Are Experience, Skills,
            and Education easy to recognize?
          </li>
          <li>
            <strong className="text-slate-900">Chronology</strong> — Can dates and job titles be
            read in order without ambiguity?
          </li>
          <li>
            <strong className="text-slate-900">Field mapping</strong> — Do bullets stay with the
            correct employer, or does layout break the link?
          </li>
          <li>
            <strong className="text-slate-900">Plain text path</strong> — Copy-paste and simple
            PDF/DOCX exports usually parse more reliably than designed portfolio layouts.
          </li>
        </ul>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Our checker simulates plain-text ingestion: paste your resume to see parsing-risk signals
          before you submit.
        </p>
      </section>

      <section id="ats-keyword-matching" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          ATS keyword matching
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Keyword matching compares terms in your resume against the job description—tools,
          frameworks, certifications, and role phrases. ATS and recruiters both use vocabulary as a
          fast filter. Missing must-have skills or hiding them in dense paragraphs can drop your
          rank even when you have the experience.
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          On this checker, keywords are <strong className="text-slate-900">optional</strong>: paste
          a job description to see overlap alongside parsing signals. For a posting-first gap list
          and tailoring priorities, use the{" "}
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            resume keyword scanner / JD matcher
          </Link>
          . Keyword stuffing without evidence still fails human review—match honestly in bullets and
          skills.
        </p>
      </section>

      <section id="ats-resume-format-examples" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          ATS resume format examples
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          The most reliable ATS format is reverse-chronological, single-column, with standard
          headings and plain bullets. Below is a simplified pattern parsers and recruiters both skim
          quickly.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <h3 className="text-sm font-semibold text-emerald-950">Parsable resume pattern</h3>
            <pre className="mt-2 text-xs sm:text-[13px] text-slate-800 whitespace-pre-wrap font-mono leading-relaxed">
              {`SUMMARY
Data analyst with 4+ years SQL and Python...

EXPERIENCE
Data Analyst | Acme Corp | 2021–Present
• Built dashboards in Tableau; cut reporting time 30%
• Partnered with PMs on A/B tests for activation

SKILLS
SQL, Python, Tableau, experimentation

EDUCATION
B.S. Statistics — State University`}
            </pre>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <h3 className="text-sm font-semibold text-rose-950">Higher parser risk</h3>
            <pre className="mt-2 text-xs sm:text-[13px] text-slate-800 whitespace-pre-wrap font-mono leading-relaxed">
              {`Two-column layout with skills sidebar
Icons for each skill; tables for job history
Section title: "Career Journey"
Dates as "2021 – now" mixed with "Present"
Bullets without employer context
Critical skills only in header graphic`}
            </pre>
          </div>
        </div>
        <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          Real-world fix: a candidate at ~58% compatibility moved to one column, renamed sections to
          Experience / Skills / Education, and aligned dates—parser detection improved before any
          keyword edits.
        </p>
      </section>

      <section id="ats-resume-templates" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          ATS resume templates
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Templates help when they enforce parser-safe rules: one column, standard headings, no
          tables for core content, and text-based export. ResumeAtlas hosts a dedicated{" "}
          <Link
            href={ATS_RESUME_TEMPLATE_PATH}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            ATS resume template guide
          </Link>{" "}
          with copyable layouts and Word/Google Docs starters—use that hub for downloads and
          step-by-step formatting. Return here to score the file you build.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
          <li>Single-column reverse-chronological structure</li>
          <li>Standard section names: Summary, Experience, Skills, Education</li>
          <li>Text-based PDF or DOCX—avoid image-only exports</li>
          <li>Run this ATS checker after you apply the template</li>
        </ul>
      </section>

      <section id="ats-resume-mistakes" className={sectionClass}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          ATS resume mistakes
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Most rejections before a human review trace back to a short list of formatting and content
          issues:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
          <li>Multi-column layouts, text boxes, or tables that break field mapping</li>
          <li>Skills or job titles placed only in images, icons, or headers</li>
          <li>Nonstandard or missing section headings</li>
          <li>Inconsistent dates, titles, or bullet styles across roles</li>
          <li>Generic bullets with no tools, scope, or outcomes</li>
          <li>Missing posting vocabulary when a target job description is available</li>
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Fix parsing and structure first; then tune keywords for the specific posting.
        </p>
      </section>

      <section
        id="ats-compatibility-check"
        className={`${sectionClass} rounded-2xl border border-sky-200 bg-sky-50/50 p-5 sm:p-6`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          ATS compatibility score
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Your ATS compatibility score summarizes parsing, readability, and formatting—how likely an
          ATS parser is to read your resume into the right fields. Run the free checker for that
          score;{" "}
          <Link
            href={CHECK_RESUME_AGAINST_JD_PATH}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            compare resume to a job description
          </Link>{" "}
          when you need keyword gaps on top of parsing signals.
        </p>
        <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
          <li>
            <strong className="text-slate-900">80–100%</strong> — strong ATS compatibility; minor
            polish may still help
          </li>
          <li>
            <strong className="text-slate-900">60–79%</strong> — targeted formatting or structure
            fixes likely to help
          </li>
          <li>
            <strong className="text-slate-900">Below 60%</strong> — higher risk of parser or skim
            friction; prioritize layout and headings
          </li>
        </ul>
        <p className="mt-4 text-sm sm:text-base text-slate-700">
          Score drivers: parsing quality, section clarity, layout simplicity, and optional keyword
          signal vs a pasted posting.
        </p>
        <Link
          href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
          className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Get my ATS compatibility score (free)
        </Link>
      </section>
    </div>
  );
}
