import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  RESUME_WORK_EXPERIENCE_GUIDE_PATH,
  RESUME_ACTION_VERBS_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${ATS_RESUME_CHECKLIST_PATH}`;

export const metadata: Metadata = {
  title: `ATS Resume Checklist (${CONTENT_FRESHNESS_YEAR}): 30-Point Check Before You Apply | ResumeAtlas`,
  description:
    `Use this 30-point ATS resume checklist to verify your resume is ready before submitting. Covers format, keywords, contact, sections, and job-description match — with a free scan to catch what you miss.`,
  alternates: { canonical: ATS_RESUME_CHECKLIST_PATH },
  keywords: [
    "ats resume checklist",
    "resume checklist before applying",
    "ats checklist for resume",
    "resume submission checklist",
    "ats friendly resume checklist",
    "ats resume requirements",
    "resume readiness checklist",
    "ats resume format checklist",
  ],
  openGraph: {
    title: `ATS Resume Checklist (${CONTENT_FRESHNESS_YEAR}): 30-Point Check Before You Apply`,
    description:
      "30-point checklist to verify your resume is ATS-ready before submitting. Format, keywords, bullets, contact, and job-description match — plus a free scan for keyword gaps.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `ATS Resume Checklist (${CONTENT_FRESHNESS_YEAR}): 30-Point Check Before You Apply`,
    description:
      "30 items to check before you submit — format, keywords, section headings, bullets, and a free scan to catch missed JD keywords.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check my resume against a job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full intelligence dashboard — keyword match score, rejection risks, and selectable fixes — in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "What does ATS actually check in a resume?",
    answer:
      "ATS software parses your resume into structured fields — contact, work history, education, skills — then scores keyword overlap between your resume text and the job description. Common failure points include: multi-column layouts that break parsing order, tables in the experience section, creative section headings it cannot classify, and missing exact-match terms from the posting.",
  },
  {
    question: "Does PDF or Word format pass ATS better?",
    answer:
      "Both pass most modern ATS if the text is selectable (not scanned). .docx is the safest choice for older systems. PDF is fine for cloud-based ATS like Greenhouse, Lever, and Workday when the file is text-based, not image-based. Never submit a scanned PDF.",
  },
  {
    question: "How many keywords should my resume have?",
    answer:
      "There is no universal keyword count. The goal is to match the required qualifications, tools, and skills from the specific posting — not to hit a number. A resume that exactly matches 20 core keywords from the JD will outperform one that stuffs 80 generic terms. Use the job description as your checklist.",
  },
  {
    question: "Does ATS read tables or columns in a resume?",
    answer:
      "Most ATS struggle with tables and multi-column layouts in the experience and skills sections. Text inside table cells is often parsed in the wrong order or skipped entirely. Use a single-column layout with plain text for all content areas. Tables are safer in the contact block at the top.",
  },
  {
    question: "What ATS score should I aim for?",
    answer:
      "Different tools report different scores using different algorithms — there is no universal passing threshold. What matters is whether your resume covers the required qualifications and keywords from the specific posting. Focus on match quality for each application, not a generic score.",
  },
  {
    question: "Can I use a two-column resume with ATS?",
    answer:
      "Technically, but the risk is high. Most modern ATS read left-to-right, top-to-bottom across columns, mixing sidebar skills with main-column experience text. The result is garbled text that fails keyword matching even when the right words are present. Use a single-column layout to be safe.",
  },
  {
    question: "How often should I run through this ATS checklist?",
    answer:
      "Once to fix format and structure issues — those are durable. For keyword matching and job-description alignment, run through a scan for each application. The format checks in this list are one-time; the keyword and match checks need to be done per posting.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `ATS Resume Checklist (${CONTENT_FRESHNESS_YEAR}): 30-Point Check Before You Apply`,
  description:
    "A 30-point ATS resume checklist covering format, contact section, section headings, keywords, experience bullets, and final submission review — with a free scan to catch keyword gaps.",
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check If Your Resume Is ATS-Ready",
  description:
    "A 30-point checklist to verify your resume passes ATS screening before you apply. Covers file format, contact section, section headings, keywords, experience bullets, and final submission review.",
  step: [
    {
      "@type": "HowToStep",
      name: "Format and file",
      text: "Use a .docx or PDF with selectable text. Use a single-column layout. Avoid tables in the experience section, headers/footers containing important content, and decorative fonts.",
    },
    {
      "@type": "HowToStep",
      name: "Contact section",
      text: "Include your full legal name, phone number, professional email, LinkedIn URL, and city/state. Remove photos, age, and marital status.",
    },
    {
      "@type": "HowToStep",
      name: "Section headings and structure",
      text: "Use standard labels: Work Experience, Education, Skills. Avoid creative names ATS cannot classify. Use reverse-chronological order. Avoid functional resume formats.",
    },
    {
      "@type": "HowToStep",
      name: "Keywords and job-description match",
      text: "Verify required tools, technologies, and qualifications from the job description appear verbatim in your resume. Match the job title or a close variation in your summary or most recent role.",
    },
    {
      "@type": "HowToStep",
      name: "Experience bullets and metrics",
      text: "Start each bullet with an action verb. Include at least one metric per role. Use bullets, not paragraphs. Show outcomes, not responsibilities.",
    },
    {
      "@type": "HowToStep",
      name: "Final submission review",
      text: "Check for typos, use a professional file name, verify LinkedIn dates match your resume, and confirm the resume is tailored to this specific posting.",
    },
  ],
};

type ChecklistItem = {
  text: string;
  why: string;
};

type ChecklistCategory = {
  id: string;
  heading: string;
  items: ChecklistItem[];
};

const CHECKLIST: ChecklistCategory[] = [
  {
    id: "format",
    heading: "A — Format and File",
    items: [
      {
        text: "File is .docx or a text-based PDF (not a scanned image)",
        why: "Scanned PDFs are images — ATS cannot extract text from them. Your qualifications become invisible.",
      },
      {
        text: "Layout is single-column throughout the content area",
        why: "Multi-column layouts break ATS parsing order. Skills from the left column get merged into experience text from the right, creating garbled output.",
      },
      {
        text: "No tables in the Work Experience or Skills sections",
        why: "Most ATS read table cells in unpredictable order. Use plain text for all content sections; tables are only safe in the contact block.",
      },
      {
        text: "No important content in headers or footers",
        why: "Many ATS skip header and footer regions entirely. Contact details, names, or page numbers in headers may not be parsed.",
      },
      {
        text: "Font is standard: Arial, Calibri, Times New Roman, or Garamond",
        why: "Decorative or uncommon fonts can render as garbled characters during text extraction, corrupting keyword matching.",
      },
    ],
  },
  {
    id: "contact",
    heading: "B — Contact Section",
    items: [
      {
        text: "Full legal name appears at the top (not a nickname)",
        why: "Some ATS auto-populate candidate profiles from the name field. Nicknames can create duplicate profiles or mismatched records.",
      },
      {
        text: "Professional email address (no university address if 5+ years post-graduation)",
        why: "An active university email signals you may have lost access. A gmail or custom domain reads as current and professional.",
      },
      {
        text: "Phone number is included with country code if applying internationally",
        why: "ATS systems require a parseable phone field for applicant profiles. Missing or malformatted numbers create data entry errors for recruiters.",
      },
      {
        text: "LinkedIn URL is live, complete, and dates match your resume",
        why: "Recruiters cross-reference LinkedIn for every shortlisted candidate. Inconsistent dates are the most common disqualifying discrepancy.",
      },
      {
        text: "No photo, age, date of birth, or marital status",
        why: "In most jurisdictions these details create legal liability for the employer. Some ATS auto-flag resumes containing them.",
      },
    ],
  },
  {
    id: "structure",
    heading: "C — Section Headings and Structure",
    items: [
      {
        text: '"Work Experience" — not "Career Journey", "My Story", or "Where I\'ve Made My Mark"',
        why: 'ATS classifies sections by heading keywords. Non-standard labels cause experience bullets to be parsed as unclassified text, invisible to keyword scoring.',
      },
      {
        text: '"Education" — not "Academic Background" or "Where I Studied"',
        why: "Same parsing logic: ATS expects exact or near-exact matches to standard section labels to correctly attribute degree and institution data.",
      },
      {
        text: '"Skills" or "Technical Skills" — not "What I Bring" or "Toolbox"',
        why: "Skills sections are keyword-dense and heavily weighted. Creative headings cause ATS to skip the section or mis-weight the terms inside.",
      },
      {
        text: "Entries within each section are in reverse-chronological order (most recent first)",
        why: "ATS and recruiter scanning both assume most recent experience is first. Out-of-order entries create confusion and can make your most relevant experience less visible.",
      },
      {
        text: "Not using a functional resume format (skills-first, experience de-emphasized)",
        why: "Functional resumes are nearly universally misread by ATS. The skills section is parsed without context, and experience bullets may not be associated with dates or employers.",
      },
    ],
  },
  {
    id: "keywords",
    heading: "D — Keywords and Job-Description Match",
    items: [
      {
        text: "Required tools and technologies from the JD appear verbatim in your resume",
        why: "ATS keyword matching is often exact or near-exact. If the posting says 'Tableau' and your resume says 'data visualization software', you will not match.",
      },
      {
        text: "Required qualifications (degree level, years of experience) are explicitly stated",
        why: 'Many ATS filter by hard cutoffs: "Bachelor\'s degree required", "5+ years experience". If these are not stated explicitly, automated screening may reject you before a human reads the resume.',
      },
      {
        text: "The target job title (or a close variation) appears in your summary or most recent role",
        why: "Job title is one of the highest-weighted fields in most ATS. Matching the title signals role fit before any other content is parsed.",
      },
      {
        text: "Soft skills emphasized in the JD are supported by evidence in your experience bullets",
        why: "Soft skills listed only in a skills section carry almost no weight. A soft skill demonstrated in a bullet (led, negotiated, facilitated) is both ATS-readable and recruiter-credible.",
      },
      {
        text: "Every skill listed in your skills section appears in at least one experience bullet",
        why: "Skills-section-only terms are lower-confidence signals. When the same term appears in both skills and experience, it scores higher and is more credible to human reviewers.",
      },
    ],
  },
  {
    id: "bullets",
    heading: "E — Experience Bullets and Metrics",
    items: [
      {
        text: "Every bullet starts with a strong action verb (past tense for previous roles, present for current)",
        why: 'Action verbs signal outcomes, not duties. Bullets starting with "Responsible for" or "Helped with" are consistently rated lower by recruiters and score weaker in ATS because they lack outcome terms.',
      },
      {
        text: "At least one bullet per role includes a metric (%, $, time, volume, or count)",
        why: "Metrics are the fastest shortlist signal. A bullet with a number is retained in recruiter memory 3–5× longer than one without.",
      },
      {
        text: "Experience section uses bullets only — no paragraphs",
        why: "ATS and recruiters both scan, not read. Paragraph text in experience sections is parsed as unstructured text and keyword-matched less reliably than bulleted lines.",
      },
      {
        text: 'No "responsible for" or "duties included" bullets — show outcomes instead',
        why: '"Responsible for managing a team" tells a recruiter nothing about impact. "Led a 6-person team, reducing delivery cycle by 22%" shows both ownership and result.',
      },
      {
        text: "Dates are formatted consistently throughout (Month Year or Year only — not mixed)",
        why: "Mixed date formats (Jan 2022 in one entry, 2022 in another) create parsing ambiguity. ATS may calculate incorrect tenure, affecting filtering rules based on years of experience.",
      },
    ],
  },
  {
    id: "final",
    heading: "F — Final Review Before Submitting",
    items: [
      {
        text: "No spelling or grammar errors anywhere in the document",
        why: "ATS can misparse misspelled keywords (e.g. 'Pyhton' instead of 'Python'). Recruiters disqualify for typos — often immediately, without reading further.",
      },
      {
        text: 'File name is professional: "FirstName-LastName-Resume.docx" — not "resume_v3_FINAL_final2.docx"',
        why: "The file name is the first impression before the resume opens. A chaotic name signals disorganization; it also makes candidate management harder for recruiting teams.",
      },
      {
        text: "Resume length is appropriate for experience level (1 page <5 years, 2 pages 5–15 years, 3 pages rarely)",
        why: "Resume length is a soft signal of self-editing judgment. Recruiters spending 7–10 seconds on first pass do not benefit from a 4-page resume for a 3-year career.",
      },
      {
        text: "LinkedIn profile dates and job titles match the resume exactly",
        why: "Recruiters cross-reference LinkedIn during shortlisting. Any discrepancy — even a month difference in end dates — triggers doubt and often disqualification.",
      },
      {
        text: "You have checked the resume against the keywords in this specific job description",
        why: "A resume polished for format and general quality still fails ATS if it misses the exact terms the posting requires. Each application needs a targeted keyword check.",
      },
    ],
  },
];

const BEFORE_AFTER = [
  {
    failure: "Creative section heading",
    before: '"Where I\'ve Made My Mark"',
    after: '"Work Experience"',
    fix: "ATS cannot classify non-standard headings — your experience goes unread.",
  },
  {
    failure: "Multi-column layout",
    before: "Skills on left column, experience on right column",
    after: "Single-column layout: contact → summary → experience → skills",
    fix: "Multi-column text is parsed in the wrong order, corrupting keyword matching.",
  },
  {
    failure: "Responsibility-only bullet",
    before: '"Responsible for managing a team of analysts"',
    after: '"Led 6-person analytics team; reduced reporting cycle from 5 days to 1 day"',
    fix: "Outcome bullets with metrics score higher in ATS and are retained by recruiters.",
  },
  {
    failure: "Generic skills list",
    before: '"Communication, teamwork, problem-solving, leadership"',
    after: '"SQL, Tableau, A/B testing, stakeholder reporting, Python (pandas, scikit-learn)"',
    fix: "Generic soft skills without context are near-zero weight in ATS keyword scoring.",
  },
  {
    failure: "Missing JD keyword",
    before: 'Resume says "analytics" — JD requires "data analysis"',
    after: '"Data analysis" added verbatim; skill reinforced in experience bullet',
    fix: "ATS matching is often exact-term. 'Analytics' does not score for 'data analysis'.",
  },
] as const;

export default function AtsResumeChecklistPage() {
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
        {/* ── Hero ── */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            ATS Resume Checklist
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            ATS Resume Checklist ({CONTENT_FRESHNESS_YEAR}): 30-Point Check Before You Apply
          </h1>
          <p className="mb-5 text-lg text-gray-600">
            Work through these 30 items before you hit submit. Covers format, keywords, section labels, bullets,
            and contact — then use the free scan to catch what you missed for this specific posting.
          </p>

          {/* Trust signal strip */}
          <p className="mb-6 text-sm text-gray-500">
            No signup needed for the first scan &middot; Results in about 60 seconds &middot; Full intelligence dashboard
          </p>

          {/* CTA #1 — Hero */}
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Check my resume against the job description — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">
            Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds
          </p>

          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        {/* ── Definition block (AI Overview hook) ── */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            What does an ATS look for in a resume?
          </h2>
          <p className="mb-3 text-gray-700">
            An ATS (Applicant Tracking System) is software that parses, indexes, and scores resumes before a human reads them. It extracts structured fields — name, contact, work history, education, skills — then measures keyword overlap between your resume text and the job description. Most mid-size and enterprise employers use one. Greenhouse, Lever, Workday, iCIMS, and Taleo are among the most common.
          </p>
          <p className="text-gray-700">
            A 30-point checklist exists because the most common ATS failures are preventable formatting and keyword errors — not qualification gaps. Candidates with the right experience get filtered out because their resume uses a two-column layout, a non-standard section heading, or a synonym instead of the exact term in the posting. This checklist prevents those failures before they cost you an interview.
          </p>
        </section>

        {/* ── Checklist categories A–C ── */}
        {CHECKLIST.slice(0, 3).map((category) => (
          <section key={category.id} className="mb-10">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">{category.heading}</h3>
            <ul className="space-y-4">
              {category.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-green-500" aria-hidden="true">
                    ☐
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{item.text}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{item.why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* ── Checklist category D — Keywords (highest-intent moment) ── */}
        <section className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">{CHECKLIST[3].heading}</h3>
          <ul className="space-y-4">
            {CHECKLIST[3].items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex-shrink-0 text-green-500" aria-hidden="true">
                  ☐
                </span>
                <div>
                  <p className="font-medium text-gray-900">{item.text}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{item.why}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA #2 — After keywords section (highest-intent moment) ── */}
        <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-1 text-base font-semibold text-blue-900">
            These keyword checks require comparing to your specific job description.
          </p>
          <p className="mb-4 text-sm text-blue-700">
            ResumeAtlas does this automatically — paste your resume and the posting, and you get a full keyword
            match score, missed terms, and rejection risks in about 60 seconds. No signup needed.
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

        {/* ── Checklist categories E–F ── */}
        {CHECKLIST.slice(4).map((category) => (
          <section key={category.id} className="mb-10">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">{category.heading}</h3>
            <ul className="space-y-4">
              {category.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-green-500" aria-hidden="true">
                    ☐
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{item.text}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{item.why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* ── Before / After table ── */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Common ATS Failures — Before and After
          </h2>
          <p className="mb-4 text-gray-600">
            These are the five patterns that most commonly cause technically qualified candidates to fail ATS
            screening. Each has a straightforward fix.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Failure</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Before</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BEFORE_AFTER.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.failure}</td>
                    <td className="px-4 py-3 text-red-600">{row.before}</td>
                    <td className="px-4 py-3 text-green-700">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Bridge section ── */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            The one thing this checklist cannot do
          </h2>
          <p className="mb-3 text-gray-700">
            Format and structure issues are durable — fix them once and they apply to every application. But
            keyword matching is job-specific. A resume polished to format perfection still fails ATS if it misses
            the exact terms the posting requires — and those terms change with every role.
          </p>
          <p className="mb-3 text-gray-700">
            The only way to know if your resume matches a specific job description is to compare the two texts
            directly. ResumeAtlas does this in about 60 seconds: paste your resume and the posting, and you get a
            keyword match score, missed required terms, and selectable fixes. No signup needed for the first scan.
          </p>
          <p className="text-gray-700">
            Use this checklist to verify format. Use the{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              ATS resume checker
            </Link>{" "}
            to verify keyword match for each posting before you apply.
          </p>
        </section>

        {/* ── Related guides ── */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related ATS Guides</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={ATS_RESUME_TEMPLATE_GUIDE_PATH} className="text-blue-600 hover:underline">
                ATS resume template — single-column format guide
              </Link>
            </li>
            <li>
              <Link href={RESUME_WORK_EXPERIENCE_GUIDE_PATH} className="text-blue-600 hover:underline">
                Resume work experience examples — bullet writing with metrics
              </Link>
            </li>
            <li>
              <Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">
                Resume action verbs — 500+ by role and strength tier
              </Link>
            </li>
            <li>
              <Link href={RESUME_SKILLS_GUIDE_PATH} className="text-blue-600 hover:underline">
                Resume skills examples — ATS-friendly skills section format
              </Link>
            </li>
            <li>
              <Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">
                Resume summary examples — 50+ by role and experience level
              </Link>
            </li>
            <li>
              <Link href="/ats-resume-checker" className="text-blue-600 hover:underline">
                ATS resume checker — free keyword and format scan
              </Link>
            </li>
          </ul>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            ATS Resume Checklist — Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA #3 — Dark closing panel ── */}
        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">
            You&apos;ve done the checklist. Now check the keywords.
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            The one thing this checklist can&apos;t do: tell you which keywords are missing for this specific job
            description. Paste your resume and the posting into ResumeAtlas — you get a full match score,
            rejection risks, and selectable fixes in about 60 seconds.
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
