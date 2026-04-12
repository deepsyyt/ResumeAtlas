import Link from "next/link";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { ROLE_ATS_PATH } from "@/app/lib/roleAtsTemplateConfig";
import { CopyResumeBlock } from "./CopyResumeBlock";
import { ResumeTemplatePreviewCard } from "./ResumeTemplatePreviewCard";
import {
  PREVIEW_DATA_ANALYST,
  PREVIEW_GENERAL,
  PREVIEW_PRODUCT_MANAGER,
} from "./templatePreviewModels";
import {
  SNIPPET_DATA_ANALYST,
  SNIPPET_FULL_DATA_ANALYST_EXAMPLE,
  SNIPPET_GENERAL_FRESHER,
  SNIPPET_PRODUCT_MANAGER,
} from "./resumeTemplateSnippets";

const PREVIEW_CARDS = [
  { ...PREVIEW_GENERAL, plainText: SNIPPET_GENERAL_FRESHER },
  { ...PREVIEW_DATA_ANALYST, plainText: SNIPPET_DATA_ANALYST },
  { ...PREVIEW_PRODUCT_MANAGER, plainText: SNIPPET_PRODUCT_MANAGER },
] as const;

export const atsResumeTemplateFaqSchema = {
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
          "Yes. Tailoring your resume to each job description, especially the skills and impact bullets, significantly improves keyword match and ATS scores. Start from a strong master resume, then adapt language and emphasis for each role.",
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
    {
      "@type": "Question",
      name: "What is the best resume format for ATS systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Use a single-column layout with standard headings (Summary, Experience, Skills, Education), simple fonts, and no tables, icons, or text inside images for core content. Export as a text-based PDF or DOCX so parsers can read every line.",
      },
    },
    {
      "@type": "Question",
      name: "What is an ATS resume template?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "An ATS resume template is a predictable structure ATS parsers expect: clear section titles, one column, plain bullets, and skills spelled out in plain text. Fancy visual templates often hide content from parsers; a simple outline beats a decorative layout for screening.",
      },
    },
    {
      "@type": "Question",
      name: "What should an applicant tracking system resume template include?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Include contact details, a short professional summary, reverse-chronological work experience with bullets, a scannable skills list that mirrors the job description where truthful, and education. Tailor keywords per application while keeping your real experience accurate.",
      },
    },
    {
      "@type": "Question",
      name: "How to pass ATS screening?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Use a single-column resume with standard headings, put must-have skills from the job description into your summary, skills, and bullets where truthful, avoid tables and graphics for core text, export a text-based PDF or DOCX, and run your resume against the posting in ResumeAtlas to catch missing keywords before you apply.",
      },
    },
    {
      "@type": "Question",
      name: "Are PDFs ATS friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes, when the PDF contains real selectable text. Text-based PDFs exported from Word or Google Docs are generally ATS friendly. Avoid scanned or image-only PDFs because parsers cannot read the text.",
      },
    },
    {
      "@type": "Question",
      name: "What format works best for ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A simple one-column layout with headings like Summary, Skills, Experience, and Education works best. Plain bullets, standard fonts, and no text hidden in images give parsers the highest chance of reading every keyword.",
      },
    },
    {
      "@type": "Question",
      name: "What are good resume keywords for ATS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Good ATS keywords are the exact skills, tools, and responsibilities from the job description that match your real experience—placed in context across your summary, skills list, and bullets. Generic buzzwords without proof add little value; mirroring the posting honestly improves match scores.",
      },
    },
  ],
} as const;

export function AtsResumeTemplateGuide() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Copy-paste ATS resume templates · ATS format rules · sample resume text
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              ATS resume template (free examples + format guide)
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
              Start with plain-text layouts that parse cleanly in applicant tracking systems—then
              tailor keywords to each job. Each card below shows a{" "}
              <strong>mini resume preview</strong> plus buttons to copy the full plain text or jump
              to the section-order checklist.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-xs text-slate-500 sm:text-sm">
              Typical flow: paste your draft, align keywords to the posting, run a free check—often
              under five minutes once your master resume is ready.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PREVIEW_CARDS.map((model) => (
              <ResumeTemplatePreviewCard
                key={model.cardTitle}
                model={model}
                structureHref={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-resume-template`}
              />
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-500 sm:text-sm">
            Replace every line with your real history. These are illustrative patterns only—not
            claims about your background.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-slate-800 hover:shadow-lg"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" id="why-this-ats-template-works">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Why this ATS resume template actually works
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Applicant Tracking Systems first <strong>parse</strong> your file into sections (summary,
            experience, skills), then <strong>match tokens</strong> from your text against the job
            description and role library. Fancy layouts often hide headings or skills from that
            pipeline—so rankings suffer even when you are qualified. These templates prioritize{" "}
            <strong>parser-safe structure</strong> first, then{" "}
            <strong>keyword alignment you can prove</strong>.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              <strong>Parsing:</strong> predictable headings and one column keep your experience in
              the right buckets.
            </li>
            <li>
              <strong>Keyword matching:</strong> tools like ResumeAtlas compare your resume text to
              the <em>exact posting</em> so you see missing skills before you submit.
            </li>
            <li>
              <strong>Scoring:</strong> higher overlap with required skills—stated honestly—usually
              correlates with better ATS-style match scores.
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Match my resume to a job description (free)
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section>
          <p className="text-slate-700 text-sm sm:text-base">
            Search intent for <strong>ATS resume templates</strong>,{" "}
            <strong>resume templates for ATS systems</strong>, and{" "}
            <strong>best resume format for ATS</strong> is practical: people want something they can
            paste into Word or Google Docs, export as a text-based PDF, and submit without getting
            filtered out. Below we pair <strong>ATS resume examples</strong> (including full sample
            text) with <strong>ATS format rules</strong> and a free tool to match your resume to a job
            description.
          </p>
        </section>

        <section
          id="ats-resume-template-examples"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS resume template examples (by role)
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            For full on-site examples you can mirror for structure and keyword style, use our
            walkthrough pages (same single-column, parser-safe patterns as the copy-paste blocks
            above):
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
            <li>
              <Link
                href="/data-analyst-resume-example"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume example for data analyst
              </Link>{" "}
              — section-by-section sample focused on analytics roles.
            </li>
            <li>
              <Link
                href="/product-manager-resume-example"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template for product manager
              </Link>{" "}
              — PM-oriented bullets, roadmap language, and outcomes.
            </li>
            <li>
              <Link href="/resume-examples" className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
                More resume examples by role
              </Link>{" "}
              — browse other targets from one hub.
            </li>
            <li>
              <Link
                href={ROLE_ATS_PATH["data-analyst"]}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template — data analyst (dedicated page)
              </Link>
            </li>
            <li>
              <Link
                href={ROLE_ATS_PATH["product-manager"]}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template — product manager (dedicated page)
              </Link>
            </li>
            <li>
              <Link
                href={ROLE_ATS_PATH["software-engineer"]}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template — software engineer (dedicated page)
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 text-base font-semibold text-slate-900 sm:text-lg">
            ATS resume example bullets (patterns by function)
          </h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Use these as wording patterns—never copy metrics you cannot defend in an interview.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
            <li>
              <strong>Engineer:</strong> “Reduced API latency by 30% using caching and index tuning.”
            </li>
            <li>
              <strong>Data scientist:</strong> “Improved churn prediction recall after feature and
              threshold updates.”
            </li>
            <li>
              <strong>Product manager:</strong> “Prioritized onboarding roadmap; lifted activation after
              two release cycles.”
            </li>
          </ul>
        </section>

        <section
          id="ats-resume-template"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Resume templates for ATS systems: scannable section order
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            There is no magic file that guarantees a hire. What works is an{" "}
            <strong>ATS-optimized resume template</strong> in the sense of a{" "}
            <strong>predictable, single-column structure</strong> parsers and recruiters both
            understand. Build yours in Word or Google Docs using this order:
          </p>
          <ol className="mt-4 list-decimal pl-5 space-y-3 text-slate-700 text-sm sm:text-base">
            <li>
              <strong className="text-slate-900">Contact</strong> — name, email, phone, city/state or
              “Remote”, LinkedIn or portfolio (plain text links).
            </li>
            <li>
              <strong className="text-slate-900">Professional summary</strong> — 2–3 lines: role,
              years of experience, top skills that match the posting, one proof point.
            </li>
            <li>
              <strong className="text-slate-900">Skills (scannable)</strong> — comma or line-separated
              tools and skills the job uses (only what you can defend in an interview).
            </li>
            <li>
              <strong className="text-slate-900">Work experience</strong> — reverse chronological;
              each role: title, company, dates, then 3–6 bullets (action + scope + metric).
            </li>
            <li>
              <strong className="text-slate-900">Education &amp; certifications</strong> — degree,
              field, school, year; certs that matter for the role.
            </li>
            <li>
              <strong className="text-slate-900">Optional</strong> — projects or volunteer only if they
              strengthen keyword match or story for this application.
            </li>
          </ol>
          <p className="mt-4 text-slate-700 text-sm sm:text-base">
            This is the same structure we recommend when people ask for an{" "}
            <strong>ATS CV template</strong>, <strong>resume format for ATS</strong>, or a{" "}
            <strong>resume template for applicant tracking systems</strong>: plain sections, one
            column, no skill icons or text baked into images.
          </p>
        </section>

        <section
          id="how-ats-scans-resumes"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How ATS Systems Scan Resumes
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            When you apply online, your resume is usually processed by an{" "}
            <strong>Applicant Tracking System (ATS)</strong> before a human sees it. ATS software
            parses your resume, looks for keyword overlap with the job description, and then ranks
            or filters candidates.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              <strong>Parsing:</strong> ATS extracts your data (name, work history, education, skills)
              using headings and layout cues. Single-column, standard headings parse best.
            </li>
            <li>
              <strong>Keyword matching:</strong> ATS checks for overlap in skills, tools, and
              responsibilities. Use the job&apos;s language only where it matches your real experience.
            </li>
            <li>
              <strong>Formatting rules:</strong> Columns, tables, and text inside images can break
              extraction and hide content.
            </li>
            <li>
              <strong>Scoring & ranking:</strong> Many ATS assign a match score based on relevance and
              how well your experience aligns to the posting’s requirements.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Quick win: keep formatting simple, use standard section titles, and mirror the posting&apos;s
            skills and responsibilities naturally in your summary, skills, and bullets.
          </p>
        </section>

        <section
          id="common-resume-mistakes-fail-ats"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Common Resume Mistakes That Fail ATS
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Most “ATS rejections” come from a small set of fixable issues. If you improve these
            patterns, your resume becomes easier for ATS to parse and easier for recruiters to skim.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>
              <strong>Missing required keywords:</strong> don&apos;t bury must-have skills in non-text formats.
              Use the job&apos;s terms in context where you truly have the experience.
            </li>
            <li>
              <strong>Poor or incompatible formatting:</strong> avoid multiple columns, tables for core content,
              and text in images.
            </li>
            <li>
              <strong>Vague responsibilities:</strong> replace “responsible for” bullets with evidence-based
              action verbs and measurable outcomes.
            </li>
            <li>
              <strong>Lack of measurable achievements:</strong> add numbers (impact, scale, time saved, adoption,
              reliability, revenue) where you can.
            </li>
            <li>
              <strong>Wrong file type / unreadable PDF:</strong> prefer text-based PDF or DOCX, and avoid scanned/image-only files.
            </li>
            <li>
              <strong>Non-standard section names:</strong> stick to “Experience / Skills / Education / Summary” so ATS maps content correctly.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Use this guide&apos;s steps (formatting + keyword alignment + impact bullets) to fix the highest-risk areas first.
          </p>
        </section>

        <section id="ats-resume-format" className="scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS resume format (critical): best ATS resume format + ATS-friendly structure
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Google clusters queries like <strong>ATS format</strong>,{" "}
            <strong>resume formatting for ATS</strong>, and <strong>ATS resume design</strong> around
            the same idea: parsers need predictable headings, one column, and plain text for core
            content. Fancy marketing templates often hide keywords or break tables—bad for screening.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Best ATS resume format (checklist)</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
            <li>
              <strong>Single column</strong> for the entire story (summary → skills → experience →
              education).
            </li>
            <li>
              <strong>Standard section titles</strong> recruiters and parsers expect: Summary,
              Skills, Experience, Education (avoid clever renames like “My journey”).
            </li>
            <li>
              <strong>No tables, text boxes, or multi-column layouts</strong> for the main narrative;
              keep callouts minimal.
            </li>
            <li>
              <strong>No icons or skill “bubbles”</strong> as images—spell skills as text.
            </li>
            <li>
              <strong>Simple fonts</strong> (Arial, Calibri, Inter) and normal body sizes (10.5–12pt).
            </li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">ATS-friendly structure (layout rules)</h3>
          <p className="mt-2 text-slate-700 text-sm sm:text-base">
            Think “scannable resume template”: short summary, tight skills line or block, reverse
            chronological roles, each with 3–6 bullets that include tools + outcomes. White space is
            fine; complexity is not.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
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

        <section
          id="ats-resume-example-real"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS resume example (full sample text you can adapt)
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Below is a longer <strong>ATS resume example</strong> for a data analyst-shaped profile.
            Swap employers, metrics, and tools for your real experience—never invent outcomes.
          </p>
          <div className="mt-4 max-w-xl">
            <CopyResumeBlock
              eyebrow="Full example"
              title="John Doe — Data Analyst (sample only)"
              body={SNIPPET_FULL_DATA_ANALYST_EXAMPLE}
            />
          </div>
        </section>

        <section id="ats-resume-template-word-pdf" className="scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Turn these ATS resume templates into Word or PDF (honest workflow)
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            We don&apos;t host proprietary .docx downloads—many “free template files” online are
            bloated or hide text from parsers. The highest-signal approach is to{" "}
            <strong>paste plain text</strong> into Google Docs or Microsoft Word, apply headings
            styles (Heading 2 for sections), then export a <strong>text-based PDF</strong> or .docx.
            Avoid scanned/image PDFs.
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
            <li>Copy one of the templates above.</li>
            <li>Paste into a blank document; set one column; map section titles to simple styles.</li>
            <li>Proofread for truthful keywords vs the job description you are targeting.</li>
            <li>Export PDF (or DOCX) and run it through ResumeAtlas before you apply.</li>
          </ol>
          <div className="mt-5">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </section>

        <section id="ats-optimization-tips" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS optimization tips (keywords + layout + files)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
            <li>
              <strong>Keywords from the job description</strong> belong in summary, skills, and
              bullets—only where you can speak to them credibly.
            </li>
            <li>
              <strong>Simple layout beats clever design</strong>: no columns/tables for core story,
              no text baked into images.
            </li>
            <li>
              <strong>File hygiene:</strong> text-based PDF or DOCX; never password-protect; avoid
              scanned resumes.
            </li>
            <li>
              <strong>Evidence beats adjectives:</strong> verbs + scope + measurable outcomes parse
              well and read well to humans.
            </li>
          </ul>
        </section>

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
              Use the employer&apos;s language. If they say &quot;stakeholder management&quot; or
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
              Reflect the role you want. If you&apos;re moving toward data roles, emphasize SQL,
              Python, and analytics tools.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            For role‑specific keyword ideas, see the{" "}
            <Link
              href="/data-scientist-resume-keywords"
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              ATS keywords for Data Scientist
            </Link>{" "}
            guide or other keyword pages in the navigation.
          </p>
        </section>

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
              Avoid scanned PDFs or designs exported as a single image. ATS can&apos;t read the
              text.
            </li>
            <li>
              Don&apos;t password‑protect your file or use unusual encodings that might block
              parsing.
            </li>
          </ul>
        </section>

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
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Related guides
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#why-this-ats-template-works`}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Why this ATS resume template works
                </Link>
              </li>
              <li>
                <Link
                  href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-resume-keywords-examples`}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  ATS resume keywords examples
                </Link>
              </li>
              <li>
                <Link
                  href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#how-ats-scans-resumes`}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes (anchor)
                </Link>
              </li>
              <li>
                <Link
                  href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#common-resume-mistakes-fail-ats`}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS (anchor)
                </Link>
              </li>
              <li>
                <Link href="/software-engineer-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Software Engineer ATS keywords
                </Link>
              </li>
              <li>
                <Link href="/data-scientist-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Data Scientist ATS keywords
                </Link>
              </li>
              <li>
                <Link href="/product-manager-resume-keywords" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Product Manager ATS keywords
                </Link>
              </li>
              <li>
                <Link href="/problems/resume-not-getting-interviews" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  Resume not getting interviews
                </Link>
              </li>
              <li>
                <Link href="/problems/ats-rejecting-my-resume" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                  ATS rejecting my resume
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="ats-resume-keywords-examples"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS resume keywords examples (skills + verbs)
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Clusters like <strong>resume keywords for ATS</strong> and{" "}
            <strong>ATS optimized resume keywords</strong> map to the same behavior: put the
            employer&apos;s required tools and responsibilities into plain text where you truly have
            the experience—summary, skills, and bullets—not hidden in icons or graphics.
          </p>
          <h3 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">
            Example skill tokens (tailor per posting)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 sm:text-base">
            SQL · Python · A/B testing · KPI dashboards · Roadmaps · APIs · CI/CD · Stakeholder
            management · Experiment design · Data modeling · Product discovery · Cloud (AWS/GCP) ·
            Looker / Tableau / Power BI · Jira · PRDs · Unit testing · Observability
          </p>
          <h3 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">
            Example action verbs
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 sm:text-base">
            Shipped · Automated · Analyzed · Owned · Reduced · Increased · Partnered · Prioritized ·
            Designed · Implemented · Led · Scoped · Validated · Documented
          </p>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Go deeper by role:{" "}
            <Link href="/data-analyst-resume-keywords" className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
              data analyst keywords
            </Link>
            ,{" "}
            <Link href="/product-manager-resume-keywords" className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
              product manager keywords
            </Link>
            ,{" "}
            <Link href="/software-engineer-resume-keywords" className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
              software engineer keywords
            </Link>
            .
          </p>
        </section>

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            FAQ
          </h2>
          <div className="mt-6 space-y-4">
            {[...atsResumeTemplateFaqSchema.mainEntity].map((q) => (
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(atsResumeTemplateFaqSchema) }}
      />
    </main>
  );
}
