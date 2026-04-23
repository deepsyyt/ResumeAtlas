import Link from "next/link";
import { CLUSTER_ATS_GUIDE_METADATA } from "@/app/lib/canonicalIntentClusters";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
  RESUME_SKILLS_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { ATS_RESUME_TEMPLATE_DOCX_HREF, ATS_RESUME_TEMPLATE_TXT_HREF } from "@/app/lib/atsTemplateDownloads";
import { getSiteUrl } from "@/app/lib/siteUrl";
import { stripResumeAtlasTitleSuffix } from "@/app/lib/searchIntentSeo";
import { AtsTemplateHeroPanel } from "./AtsTemplateHeroPanel";
import { AtsTemplateJumpNav } from "./AtsTemplateJumpNav";
import { AtsTemplateMobileStickyCta } from "./AtsTemplateMobileStickyCta";
import { CopyResumeBlock } from "./CopyResumeBlock";
import {
  PREVIEW_GENERAL,
} from "./templatePreviewModels";
import {
  SNIPPET_FULL_DATA_ANALYST_EXAMPLE,
  SNIPPET_GENERAL_FRESHER,
} from "./resumeTemplateSnippets";

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
          "Good ATS keywords are the exact skills, tools, and responsibilities from the job description that match your real experience - placed in context across your summary, skills list, and bullets. Generic buzzwords without proof add little value; mirroring the posting honestly improves match scores.",
      },
    },
  ],
} as const;

function atsGuideArticleJsonLd() {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${ATS_RESUME_TEMPLATE_GUIDE_PATH}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripResumeAtlasTitleSuffix(CLUSTER_ATS_GUIDE_METADATA.title),
    description: CLUSTER_ATS_GUIDE_METADATA.description,
    dateModified: "2026-04-15",
    author: { "@type": "Organization", name: "ResumeAtlas" },
    publisher: { "@type": "Organization", name: "ResumeAtlas" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isAccessibleForFree: true,
  };
}

function atsGuideBreadcrumbJsonLd() {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: stripResumeAtlasTitleSuffix(CLUSTER_ATS_GUIDE_METADATA.title),
        item: `${base}${ATS_RESUME_TEMPLATE_GUIDE_PATH}`,
      },
    ],
  };
}

export function AtsResumeTemplateGuide() {
  const articleLd = atsGuideArticleJsonLd();
  const breadcrumbLd = atsGuideBreadcrumbJsonLd();

  return (
    <main className="min-h-screen bg-white pb-24 text-slate-900 lg:pb-0">
      <section id="ats-template-hero" className="scroll-mt-28 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Best ATS template resource · examples · format rules
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
              ATS Resume Template (Free + ATS-Friendly Format for {CONTENT_FRESHNESS_YEAR})
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Download ATS-friendly resume templates in Word / Google Docs, copy a plain-text version, and see
              examples built to pass applicant tracking systems.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-xs text-slate-500 sm:text-sm">
              Updated {CONTENT_LAST_UPDATED_LABEL} · Used by job seekers · ATS-safe layouts
            </p>
          </div>

          <AtsTemplateHeroPanel
            model={PREVIEW_GENERAL}
            plainText={SNIPPET_GENERAL_FRESHER}
            docxHref={ATS_RESUME_TEMPLATE_DOCX_HREF}
            structureHref={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-resume-template`}
          />
        </div>
      </section>

      <AtsTemplateJumpNav />

      <div className="mx-auto max-w-3xl space-y-0 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <section
          id="ats-template-downloads"
          className="scroll-mt-28 border-b border-slate-200 py-10"
        >
          <span id="ats-resume-free-download" className="sr-only">
            Legacy anchor: free ATS resume template downloads
          </span>
          <span id="ats-resume-template-word-pdf" className="sr-only">
            Downloads and export workflow anchor
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Download ATS Resume Templates (Word + Google Docs)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Grab the starter <strong>ATS resume template</strong> as a{" "}
            <a className="font-medium text-sky-800 underline" href={ATS_RESUME_TEMPLATE_DOCX_HREF} download>
              Word .docx
            </a>{" "}
            or{" "}
            <a className="font-medium text-sky-800 underline" href={ATS_RESUME_TEMPLATE_TXT_HREF} download>
              plain .txt
            </a>
            . Open a new{" "}
            <a
              className="font-medium text-sky-800 underline"
              href="https://docs.google.com/document/create"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Doc
            </a>
            , paste, apply Heading 2 to section titles, then export a <strong>text-based PDF</strong> or .docx.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Download or copy the template you want.</li>
            <li>Replace placeholder content with your real roles and metrics.</li>
            <li>Keep one column and standard headings (Summary, Experience, Skills, Education).</li>
            <li>Export a machine-readable file - never image-only PDFs.</li>
          </ol>
        </section>

        <section
          id="ats-resume-template-examples"
          className="scroll-mt-28 border-b border-slate-200 py-10"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS Resume Examples That Pass Screening
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Start from the filled sample, then branch into role-specific walkthroughs - same single-column patterns
            as the copy-paste cards above.
          </p>
          <div className="mt-5 max-w-xl">
            <CopyResumeBlock
              eyebrow="Filled sample"
              title="John Doe  -  Data Analyst (sample only)"
              body={SNIPPET_FULL_DATA_ANALYST_EXAMPLE}
            />
          </div>
          <p className="mt-8 text-sm font-semibold text-slate-900">More ATS resume examples (by role)</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 text-sm sm:text-base">
            <li>
              <Link
                href="/data-analyst-resume-example"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume example for data analyst
              </Link>{" "}
               -  section-by-section sample focused on analytics roles.
            </li>
            <li>
              <Link
                href="/product-manager-resume-example"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume example for product manager
              </Link>{" "}
               -  PM-oriented bullets, roadmap language, and outcomes.
            </li>
            <li>
              <Link href="/resume-examples" className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950">
                More resume examples by role
              </Link>{" "}
               -  browse other targets from one hub.
            </li>
            <li>
              <Link
                href="/resume-guides/resume-work-experience-examples"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume work experience examples (format + bullets)
              </Link>{" "}
               -  how to list jobs, dates, and impact for ATS and recruiters.
            </li>
            <li>
              <Link
                href={RESUME_SKILLS_GUIDE_PATH}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Resume skills examples (ATS-friendly section guide)
              </Link>{" "}
               -  how to write a skills section that matches postings.
            </li>
            <li>
              <Link
                href="/ats-resume-template-software-engineer"
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                ATS resume template  -  software engineer (keyword strip + starter text)
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 text-base font-semibold text-slate-900 sm:text-lg">
            ATS resume example bullets (patterns by function)
          </h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Use these as wording patterns - never copy metrics you cannot defend in an interview.
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

        <section id="ats-resume-format" className="scroll-mt-28 border-b border-slate-200 py-10">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Best ATS Resume Format for 2026
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Queries like <strong>ATS format</strong>, <strong>resume formatting for ATS</strong>, and{" "}
            <strong>best resume format for ATS</strong> all point to the same rule set: one column, plain
            text, predictable headings. Fancy template packs often break parsing.
          </p>
          <p className="mt-2 text-slate-700 text-sm sm:text-base">
            <strong className="text-slate-900">Format checklist:</strong> single column, standard section
            titles (Summary, Experience, Skills, Education), no tables or skill icons in images, simple fonts
            (Arial, Calibri, Inter) at 10.5–12pt.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-slate-900">Layout rules (scannable, not pretty)</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700 text-sm sm:text-base">
            <li>
              <strong>Single column</strong> for the full story: summary to education.
            </li>
            <li>
              <strong>Standard section titles</strong>  -  avoid clever renames like &quot;My journey.&quot;
            </li>
            <li>
              <strong>No tables, text boxes, or multi-column layouts</strong> for the main story.
            </li>
            <li>
              <strong>Spell skills as text</strong>  -  not icons, graphics, or skill bubbles.
            </li>
          </ul>
          <h3 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">Scannable body copy</h3>
          <p className="mt-2 text-slate-700 text-sm sm:text-base">
            Short summary, tight skills line, reverse-chronological roles with 3–6 bullets (tool + impact).
            When in doubt, pick clarity over design for the file you submit online.
          </p>
        </section>

        <section id="ats-resume-template" className="scroll-mt-28 border-b border-slate-200 py-10">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS-Compliant Resume Template
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            There is no magic file that guarantees a hire. What works is a{" "}
            <strong>predictable, single-column structure</strong> parsers and recruiters both
            understand. Build yours in Word or Google Docs using this order:
          </p>
          <ol className="mt-4 list-decimal pl-5 space-y-3 text-slate-700 text-sm sm:text-base">
            <li>
              <strong className="text-slate-900">Contact</strong>  -  name, email, phone, city/state or
              “Remote”, LinkedIn or portfolio (plain text links).
            </li>
            <li>
              <strong className="text-slate-900">Professional summary</strong>  -  2–3 lines: role,
              years of experience, top skills that match the posting, one proof point.
            </li>
            <li>
              <strong className="text-slate-900">Skills (scannable)</strong>  -  comma or line-separated
              tools and skills the job uses (only what you can defend in an interview).
            </li>
            <li>
              <strong className="text-slate-900">Work experience</strong>  -  reverse chronological;
              each role: title, company, dates, then 3–6 bullets (action + scope + metric).
            </li>
            <li>
              <strong className="text-slate-900">Education &amp; certifications</strong>  -  degree,
              field, school, year; certs that matter for the role.
            </li>
            <li>
              <strong className="text-slate-900">Optional</strong>  -  projects or volunteer only if they
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
          className="scroll-mt-28 border-b border-slate-200 py-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Resume Formatting for ATS Systems
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            The <strong>resume format for applicant tracking systems</strong> is not about design - it is
            about text extraction. When you apply online, your file is often parsed before a human reads it: sections,
            then keyword overlap, then rank or filter rules.
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
          id="how-to-make-resume-ats-friendly"
          className="scroll-mt-28 border-b border-slate-200 py-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How to Make Your Resume ATS Friendly
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            <strong className="text-slate-900">Do this before you apply:</strong>
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>Use one column and standard headings (Summary, Skills, Experience, Education).</li>
            <li>Export a text-based PDF or .docx - never image-only scans.</li>
            <li>Mirror the job description only where you can defend it in an interview.</li>
            <li>Lead bullets with outcomes: verb + scope + measurable result.</li>
          </ul>
        </section>

        <section
          id="common-resume-mistakes-fail-ats"
          className="scroll-mt-28 border-b border-slate-200 py-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS Mistakes That Fail Screening
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

        <section
          id="ats-resume-keywords-examples"
          className="scroll-mt-28 border-b border-slate-200 py-10"
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            ATS Keywords Examples
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            <strong className="text-slate-900">Optimization, compressed:</strong> put posting terms in
            summary, skills, and bullets only where you can defend them. Simple layout wins over clever
            design. Use text-based PDF or DOCX; evidence beats adjectives.
          </p>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Clusters like <strong>resume keywords for ATS</strong> and{" "}
            <strong>ATS optimized resume keywords</strong> map to the same behavior: put the
            employer&apos;s required tools and responsibilities into plain text where you truly have
            the experience - summary, skills, and bullets - not hidden in icons or graphics.
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

        <section id="tailor-template-to-jd" className="scroll-mt-28 border-b border-slate-200 py-10">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Tailor Template to Job Description
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Want to test this template against a real job posting? Paste your resume and the exact posting - ResumeAtlas
            highlights missing requirements and weak keyword coverage so you edit with intent, not guesswork.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href="/resume-keyword-scanner"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              Resume keyword scanner
            </Link>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 border-b border-slate-200 py-10">
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

        <section
          id="ats-resume-checker-tool"
          className="scroll-mt-28 border-b border-slate-200 bg-slate-50/60 py-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            ATS resume checker (parsing + compatibility score)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            After you format your file, run a quick machine-readability pass: section structure, bullets, dates, and
            common parser traps - separate from matching a specific job description.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/ats-resume-checker"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Open ATS resume checker
            </Link>
            <Link
              href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-template-downloads`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              Back to downloads
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            On this page:{" "}
            <Link href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-template-copy-paste`} className="text-sky-800 underline">
              ATS resume template
            </Link>
            {" · "}
            <Link href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-resume-format`} className="text-sky-800 underline">
              ATS resume format
            </Link>
            {" · "}
            <Link href={`${ATS_RESUME_TEMPLATE_GUIDE_PATH}#ats-resume-template-examples`} className="text-sky-800 underline">
              ATS resume examples
            </Link>
            {" · "}
            <Link href={RESUME_SKILLS_GUIDE_PATH} className="text-sky-800 underline">
              ATS friendly resume skills
            </Link>
          </p>
        </section>
      </div>

      <AtsTemplateMobileStickyCta docxHref={ATS_RESUME_TEMPLATE_DOCX_HREF} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(atsResumeTemplateFaqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  );
}
