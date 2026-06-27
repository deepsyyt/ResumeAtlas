import type { Metadata } from "next";
import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CAREER_CHANGE_RESUME_PATH,
  ATS_RESUME_CHECKLIST_PATH,
  RESUME_ACTION_VERBS_PATH,
  RESUME_SKILLS_GUIDE_PATH,
  RESUME_SUMMARY_GUIDE_PATH,
  RESUME_WORK_EXPERIENCE_GUIDE_PATH,
  RESUME_NOT_GETTING_INTERVIEWS_PATH,
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
} from "@/app/lib/internalLinks";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");
const pageUrl = `${siteBase}${CAREER_CHANGE_RESUME_PATH}`;

export const metadata: Metadata = {
  title: `Career Change Resume (${CONTENT_FRESHNESS_YEAR}): How to Pass ATS When Switching Roles | ResumeAtlas`,
  description:
    `Career change resume guide for ${CONTENT_FRESHNESS_YEAR}: how to reframe transferable skills, pass ATS screening, write a summary, and tailor to a new industry. Before/after bullet rewrites and a free JD keyword scan.`,
  alternates: { canonical: CAREER_CHANGE_RESUME_PATH },
  keywords: [
    "career change resume",
    "how to write a career change resume",
    "career change resume examples",
    "resume for career change no experience",
    "career change resume summary",
    "transferable skills resume",
    "career transition resume",
    "career change resume template",
    "changing careers resume tips",
    "ATS career change resume",
  ],
  openGraph: {
    title: `Career Change Resume (${CONTENT_FRESHNESS_YEAR}): How to Pass ATS When Switching Roles`,
    description:
      "Career change resume: reframe transferable skills, pass ATS, write a career-change summary, and tailor to a new field. Before/after rewrites and a free keyword scan.",
    url: pageUrl,
    type: "article",
    siteName: "ResumeAtlas",
  },
  twitter: {
    card: "summary_large_image",
    title: `Career Change Resume (${CONTENT_FRESHNESS_YEAR}): ATS Guide for Switching Roles`,
    description:
      "How to write a career change resume that passes ATS screening. Transferable skills, summary examples, bullet rewrites, and a free keyword scan.",
  },
};

const faqItems = [
  {
    question: "Do I need to sign up to check if my career change resume matches a job description?",
    answer:
      "No signup needed. Paste your resume and the target job description into ResumeAtlas and you get a full keyword match score, rejection risks, and selectable fixes in about 60 seconds. Your first scan is completely free with no account required.",
  },
  {
    question: "How do I write a career change resume for a field I have no direct experience in?",
    answer:
      "Map your existing work to the core competencies of the new role — not job titles to job titles. Identify the overlapping skills (data analysis, stakeholder communication, project ownership, process improvement) and reframe each bullet around the outcome it would produce in the new context. Then scan your resume against the specific job description to see which exact terms you're missing.",
  },
  {
    question: "Will ATS reject a career change resume?",
    answer:
      "ATS screens for keyword match against the job description — not career history continuity. A career changer with strong keyword coverage can outrank a same-field candidate with a weak resume. The risk is using your previous industry's vocabulary instead of the new field's. Mirror the exact tool names and skill terms from the posting, not your prior job's terminology.",
  },
  {
    question: "Should I use a functional or chronological resume for a career change?",
    answer:
      "Chronological wins — always. Functional resumes hide your timeline and recruiters know why, which creates suspicion rather than removing it. Use a chronological structure but lead each bullet with the transferable skill (action verb + outcome), not the job duty. A strong summary at the top signals the transition intent clearly.",
  },
  {
    question: "How do I write a career change resume summary?",
    answer:
      "Lead with your strongest transferable skill + the new role context + one outcome that maps to the new field. Example: 'Operations manager with 6 years of process improvement and data-driven decision-making experience transitioning to business analyst roles. Reduced manual workflows by 40% using Excel and SQL-based reporting — applying the same analytical approach to formal BA deliverables.' Don't open with 'I'm transitioning from X to Y' — open with what you bring.",
  },
  {
    question: "What are the most common ATS failures for career changers?",
    answer:
      "Using the vocabulary of your previous field instead of the new one — 'worked with complex data' instead of 'SQL', 'managed team projects' instead of 'Scrum', 'processed customer requests' instead of 'Jira ticket resolution'. ATS matches exact or near-exact terms. The second most common failure is leaving out tools that appear in the JD. A 60-second keyword scan prevents both.",
  },
  {
    question: "Should I explain the career change in a cover letter or the resume?",
    answer:
      "Both — briefly. The resume summary (2–3 lines) frames the narrative and signals intent. The cover letter has space for the full story. Don't write a long explanation in the resume — use the space for transferable skills evidence instead.",
  },
  {
    question: "How many career change resume submissions fail before a human reads them?",
    answer:
      "Most estimates put ATS filtering at 70–75% of initial applications — before any human review. For career changers, the risk is higher because the keyword mismatch between your old field vocabulary and the new field JD is more severe. Checking your resume against the specific posting before submitting is the single highest-ROI step in a career change job search.",
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
  headline: `Career Change Resume (${CONTENT_FRESHNESS_YEAR}): How to Pass ATS When Switching Roles`,
  description:
    "Career change resume guide: transferable skills, ATS keyword matching, summary examples, before/after bullet rewrites, common mistakes, and a free JD comparison scan.",
  url: pageUrl,
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  author: { "@type": "Organization", name: "ResumeAtlas" },
  publisher: { "@type": "Organization", name: "ResumeAtlas", url: siteBase },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to Write a Career Change Resume That Passes ATS (${CONTENT_FRESHNESS_YEAR})`,
  description: "A 6-step process for writing a career change resume that clears ATS and reads correctly to hiring managers in the new field.",
  step: [
    { "@type": "HowToStep", name: "Identify transferable skills", text: "Map your strongest outcomes from the old field to the core competencies of the new role — not job titles to job titles." },
    { "@type": "HowToStep", name: "Write a career-change summary", text: "Lead with your strongest transferable skill + new role context + one outcome that maps to the new field. Avoid 'I am transitioning' — lead with what you bring." },
    { "@type": "HowToStep", name: "Reframe experience bullets", text: "Rewrite bullets using the new field's vocabulary: action verb + transferable method + outcome in the new context. Check exact tool names from the posting." },
    { "@type": "HowToStep", name: "Build a targeted skills section", text: "Include only skills that appear in the new JD and that you can discuss in an interview. Remove skills specific to the old field that don't translate." },
    { "@type": "HowToStep", name: "Check keyword coverage against the posting", text: "Paste your resume and the job description into ResumeAtlas to see which required terms are missing and where to add them." },
    { "@type": "HowToStep", name: "Apply ATS-safe formatting", text: "Use a single-column layout, standard headings, and a selectable PDF. Remove graphics, skill bars, and multi-column designs that break ATS parsing." },
  ],
};

const SUMMARY_EXAMPLES = [
  {
    label: "Operations / project management → data analyst",
    text: "Operations analyst with 5 years of SQL-based reporting, KPI tracking, and process improvement now transitioning to a business data analyst role. Reduced manual reporting time by 40% using Excel and automated SQL queries; built dashboards in Tableau used by 3 regional managers. Applying the same analytical rigor to formal analytics deliverables and self-serve BI environments.",
  },
  {
    label: "Customer success / account management → product manager",
    text: "Customer success manager transitioning to product management, bringing 4 years of direct user feedback synthesis, feature request triage, and cross-functional coordination with engineering. Identified 3 recurring customer friction points that became roadmap items shipped in Q2; documented user stories that engineering used for acceptance criteria. Targeting APM and junior PM roles where customer empathy and requirements translation are the primary input.",
  },
  {
    label: "Finance / accounting → business analyst / FP&A analytics",
    text: "Finance analyst transitioning from budgeting and variance analysis to business analysis and FP&A tooling. Built Excel models and SQL queries for monthly close reporting; identified $1.2M in cost misclassifications through cross-functional data reconciliation. Seeking BA roles at companies where financial modeling and structured requirements work overlap.",
  },
] as const;

const WEAK_TO_STRONG_SUMMARY = {
  weak: "I am currently transitioning from a marketing role to a data analyst position. I am eager to learn and apply my skills in a new field.",
  strong: "Marketing analyst with 4 years of campaign performance measurement, A/B test design, and SQL-based attribution modeling transitioning to data analyst roles. Built conversion dashboards in Tableau used by 6 campaigns managers; wrote SQL for email segment analysis that reduced churn in a $2M retention campaign by 8%.",
  fix: "Remove the transition announcement. Lead with what you already do well that maps to the new role. The summary should answer: 'Why should I interview this person?' not 'Why are they changing careers?'",
};

const SKILL_TRANSLATION_PAIRS = [
  {
    oldRole: "Project manager / coordinator",
    transfersTo: "Business analyst / PMO / product manager",
    skills: [
      { old: "Ran weekly stakeholder status meetings", newField: "Stakeholder requirements gathering" },
      { old: "Managed project timelines in Asana", newField: "Jira / Agile sprint planning" },
      { old: "Created project risk logs", newField: "Risk analysis / gap analysis" },
    ],
  },
  {
    oldRole: "Customer success / support",
    transfersTo: "Product manager / business analyst",
    skills: [
      { old: "Collected and escalated feature requests", newField: "User research / product discovery" },
      { old: "Maintained help documentation", newField: "Requirements documentation / user stories" },
      { old: "Tracked account health metrics", newField: "KPI definition / retention analytics" },
    ],
  },
  {
    oldRole: "Finance / accounting",
    transfersTo: "Data analyst / business analyst / FP&A",
    skills: [
      { old: "Built Excel financial models", newField: "SQL + Excel data analysis" },
      { old: "Variance analysis and reporting", newField: "Dashboarding / stakeholder reporting" },
      { old: "Month-end close reconciliation", newField: "Data quality and audit processes" },
    ],
  },
] as const;

const BULLET_REWRITES = [
  {
    context: "Operations manager → data analyst",
    weak: "Managed the monthly reporting process for operations team.",
    strong: "Designed and maintained 4 Excel + SQL-based reports tracking operational KPIs for 3 regional teams; reduced report production time by 60% and surfaced a $400K cost allocation error caught during the Q3 close.",
    fix: "Name the tool (SQL + Excel), the scope (4 reports, 3 teams), and an outcome with business impact — the same evidence an experienced data analyst would present.",
  },
  {
    context: "Marketing coordinator → product analyst",
    weak: "Helped analyze campaign results and reported findings to management.",
    strong: "Analyzed A/B test results for 6 email campaigns using Google Sheets and GA4 attribution data; identified a subject-line variant that increased open rate 22% and recommended a creative brief update adopted by the team.",
    fix: "Own the verb ('analyzed'), name the tool, give the scope, and attach the business decision your finding drove.",
  },
  {
    context: "Customer success → product manager",
    weak: "Worked closely with customers and reported feedback to the product team.",
    strong: "Conducted 30+ customer interviews and synthesized feedback into a feature gap report cited in 2 quarterly roadmap reviews; 3 of 5 recommended features were scoped and shipped within 6 months.",
    fix: "Quantify the research (30+ interviews), show the output (gap report), and prove the outcome (3 features shipped). This reads as PM work, not support work.",
  },
] as const;

const ATS_RISKS = [
  {
    risk: "Using your old industry's vocabulary instead of the new field's exact terms",
    fix: "Compare your resume to the specific JD with ResumeAtlas. If the posting says 'SQL' and your resume says 'data analysis', that's a keyword miss. ATS matches exactly.",
  },
  {
    risk: "Leaving your job title unchanged — 'Marketing Manager' on a data analyst application reads as wrong-field",
    fix: "You can't change your employer-verified title, but your summary H1 can frame the transition: 'Marketing Analyst → Data Analyst' or just 'Data Analyst' if you've done the work under that title informally.",
  },
  {
    risk: "Using a functional resume to hide the career change",
    fix: "Use chronological format. Recruiters and ATS both see through functional resumes — they reduce trust rather than overcoming it. Let the summary and bullet reframing carry the transition narrative.",
  },
  {
    risk: "Missing required tools because you used them by a different name",
    fix: "If you used Jira but called it 'project tracking tool' internally, say Jira. If you built SQL queries but called it 'data pulls', say SQL. Use the tool's real name.",
  },
  {
    risk: "Applying to postings where 80%+ of required skills are missing from your current profile",
    fix: "Career changers typically need 60–70% skill overlap before ATS will surface them to humans. If the gap is larger, target adjacent bridging roles first (analyst → analyst in new domain, coordinator → junior PM).",
  },
] as const;

const MISTAKES = [
  {
    mistake: "Writing 'I am transitioning to...' in the summary",
    fix: "Lead with transferable skills and a result, not the transition narrative. Hiring managers care about what you bring, not the story of why you're changing.",
  },
  {
    mistake: "Using a functional resume to avoid showing the career history gap",
    fix: "Chronological format only. Functional resumes damage credibility. Frame the transition with a strong summary and rewritten bullets, not a hidden timeline.",
  },
  {
    mistake: "Keeping old-field keywords that don't translate to the new role",
    fix: "Audit every bullet for domain-specific vocabulary. Replace 'planned quarterly promotional campaigns' with 'designed experiment roadmaps and analyzed performance metrics' if targeting analytics roles.",
  },
  {
    mistake: "Not tailoring each application to the specific posting",
    fix: "Career changers have less keyword overlap by default — every point of additional match is more valuable. Run a 60-second scan against each specific JD before submitting.",
  },
  {
    mistake: "Submitting without evidence of new-field skills (no courses, projects, or certifications)",
    fix: "Add a 'Projects' or 'Professional Development' section with any hands-on new-field work: a SQL certification, a Tableau dashboard project, a Google Analytics course. This signals intentional transition, not accidental application.",
  },
] as const;

export default function CareerChangeResumePage() {
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
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/resume-guides" className="hover:text-gray-700">Resume Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Career Change Resume</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            Career Change Resume Guide
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Career Change Resume ({CONTENT_FRESHNESS_YEAR}): How to Pass ATS When Switching Roles
          </h1>
          <p className="mb-3 text-lg text-gray-600">
            How to reframe transferable skills, write a career-change summary, and ensure your resume passes ATS keyword screening for a new field — with before/after examples for three of the most common career pivots.
          </p>
          <p className="mb-5 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            The biggest risk for career changers isn&apos;t missing experience — it&apos;s using your old field&apos;s vocabulary when the new field uses different terms for the same skills. ATS can&apos;t infer equivalence. It matches exactly.
          </p>
          <p className="mb-6 text-sm text-gray-500">
            No signup needed for the first scan &middot; Full intelligence dashboard &middot; Results in about 60 seconds
          </p>

          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Check if my skills translate to this job — free
          </Link>
          <p className="mt-2 text-xs text-gray-400">
            Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds
          </p>
          <LastUpdated label={CONTENT_LAST_UPDATED_LABEL} className="mt-4" />
        </header>

        {/* Definition block — AI Overview eligible */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            What does ATS look for on a career change resume?
          </h2>
          <p className="mb-3 text-gray-700">
            ATS systems don&apos;t read narrative. They match keywords in your resume against keywords in the job description — regardless of whether your experience came from the same industry. A career changer with 70% keyword coverage can outrank a same-field candidate with a 40% match. The challenge is that your previous field uses different words for the same skills: what you called &ldquo;stakeholder reporting&rdquo; might be &ldquo;stakeholder communication&rdquo; in the new role&apos;s vocabulary, or &ldquo;data pulls&rdquo; might be &ldquo;SQL queries.&rdquo;
          </p>
          <p className="text-gray-700">
            The solution is not to hide the career change — it&apos;s to translate it. Use the exact tool names and role vocabulary from the new field&apos;s job descriptions, even when describing old-field work. A 60-second keyword scan against the specific posting shows you exactly which terms are missing before you submit.
          </p>
        </section>

        {/* Summary examples */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Career Change Resume Summary Examples
          </h2>
          <p className="mb-4 text-gray-600">
            The summary is your highest-leverage section for a career change — it frames the transition narrative before hiring managers see your old-field job titles.
          </p>
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

          {/* Weak → strong */}
          <div className="mt-6 rounded-xl border border-gray-200 p-5">
            <p className="mb-3 text-sm font-semibold text-gray-700">Summary rewrite — weak vs strong</p>
            <div className="mb-3 rounded-lg bg-red-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-red-600">Before (announces the transition)</p>
              <p className="text-sm text-gray-700 italic">&ldquo;{WEAK_TO_STRONG_SUMMARY.weak}&rdquo;</p>
            </div>
            <div className="mb-3 rounded-lg bg-green-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-green-600">After (leads with transferable skills)</p>
              <p className="text-sm text-gray-700 italic">&ldquo;{WEAK_TO_STRONG_SUMMARY.strong}&rdquo;</p>
            </div>
            <p className="text-xs text-gray-500">{WEAK_TO_STRONG_SUMMARY.fix}</p>
          </div>
        </section>

        {/* Transferable skills translation */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            How to Translate Transferable Skills Into New-Field Vocabulary
          </h2>
          <p className="mb-4 text-gray-600">
            The same work often reads very differently depending on the vocabulary used. Below are three common pivot paths with specific skill-translation pairs.
          </p>
          <div className="space-y-6">
            {SKILL_TRANSLATION_PAIRS.map((pair) => (
              <div key={pair.oldRole} className="rounded-xl border border-gray-200 p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{pair.oldRole}</span>
                  <span className="text-gray-400" aria-hidden="true">→</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">{pair.transfersTo}</span>
                </div>
                <div className="space-y-2">
                  {pair.skills.map((s) => (
                    <div key={s.old} className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-3 text-xs">
                      <div>
                        <p className="mb-0.5 font-semibold text-gray-500 uppercase tracking-wide">Old vocabulary</p>
                        <p className="text-gray-700">{s.old}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 font-semibold text-blue-600 uppercase tracking-wide">New-field term</p>
                        <p className="text-gray-900 font-medium">{s.newField}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bullet rewrites */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Career Change Resume Bullet Rewrites — Before & After
          </h2>
          <div className="space-y-6">
            {BULLET_REWRITES.map((bp) => (
              <div key={bp.context} className="rounded-xl border border-gray-200 p-5">
                <p className="mb-1 text-sm font-semibold text-gray-800">{bp.context}</p>
                <div className="mb-2 rounded-lg bg-red-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-red-600">Before (old-field framing)</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{bp.weak}&rdquo;</p>
                </div>
                <div className="mb-2 rounded-lg bg-green-50 p-3">
                  <p className="mb-0.5 text-xs font-semibold uppercase text-green-600">After (new-field vocabulary)</p>
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
            Even rewritten bullets might miss the exact terms this specific posting requires.
          </p>
          <p className="mb-4 text-sm text-blue-700">
            Generic vocabulary translation doesn&apos;t catch JD-specific terms — the difference between &ldquo;Power BI&rdquo; vs &ldquo;Tableau&rdquo; or &ldquo;Jira&rdquo; vs &ldquo;Linear&rdquo;. ResumeAtlas compares your resume to the specific posting and shows which required terms are still missing.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Check my career change resume — free
            </Link>
            <span className="text-xs text-blue-600">No signup needed for first scan</span>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-blue-700">
            <li>✓ Full intelligence dashboard — keyword coverage, rejection risks, selectable fixes</li>
            <li>✓ Identifies exact vocabulary mismatches between old-field and new-field terms</li>
            <li>✓ Results in about 60 seconds</li>
          </ul>
        </div>

        {/* ATS risks */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Top ATS Risks for Career Change Resumes
          </h2>
          <div className="space-y-4">
            {ATS_RISKS.map((r, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-4">
                <p className="mb-1 text-sm font-semibold text-amber-700">⚠ {r.risk}</p>
                <p className="text-sm text-gray-600">Fix: {r.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ATS format */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            ATS Format Rules That Apply Equally to Career Changers
          </h2>
          <ul className="space-y-3">
            {[
              "Single-column layout — multi-column breaks ATS parsing for everyone, career changer or not.",
              "Chronological order — don't switch to functional format to hide the career gap. It's transparent and damages trust.",
              "Standard section headings: 'Work Experience', 'Skills', 'Education', 'Projects' — not 'My Journey' or 'What I Bring'.",
              "Selectable PDF — not a scanned image or a PDF saved from a Canva design with non-parseable text.",
              "Add a 'Professional Development' section if you've completed any new-field courses, certifications, or self-directed projects.",
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Career Change Resume Mistakes</h2>
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
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Resume Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={RESUME_SUMMARY_GUIDE_PATH} className="text-blue-600 hover:underline">Resume summary examples — 50+ by role and career change type</Link></li>
            <li><Link href={RESUME_SKILLS_GUIDE_PATH} className="text-blue-600 hover:underline">Resume skills examples — how to build an ATS-friendly skills section</Link></li>
            <li><Link href={RESUME_ACTION_VERBS_PATH} className="text-blue-600 hover:underline">Resume action verbs — 500+ by role and strength tier</Link></li>
            <li><Link href={RESUME_WORK_EXPERIENCE_GUIDE_PATH} className="text-blue-600 hover:underline">Resume work experience examples — how to frame old-field experience for new roles</Link></li>
            <li><Link href={ATS_RESUME_CHECKLIST_PATH} className="text-blue-600 hover:underline">ATS resume checklist — 30-point pre-submission guide</Link></li>
            <li><Link href={ATS_RESUME_TEMPLATE_GUIDE_PATH} className="text-blue-600 hover:underline">ATS resume template — format, structure, and layout rules</Link></li>
            <li><Link href={RESUME_NOT_GETTING_INTERVIEWS_PATH} className="text-blue-600 hover:underline">Resume not getting interviews — ATS diagnosis and fixes</Link></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Career Change Resume — FAQ</h2>
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
          <h2 className="mb-3 text-2xl font-bold">Your skills translate. Make sure the keywords do too.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-300">
            Career changers are filtered out by ATS before a human reads their resume — not because their skills don&apos;t transfer, but because the vocabulary doesn&apos;t match exactly. Paste your resume and the job description into ResumeAtlas. Full keyword match score, rejection risks, and selectable fixes in about 60 seconds.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100"
          >
            Check if my skills translate — no signup needed
          </Link>
          <p className="mt-3 text-xs text-gray-400">
            Guest scan free &middot; sign in for +1 scan + free job-specific optimize &middot; pay to download an ATS-friendly resume in seconds
          </p>
        </section>
      </main>
    </>
  );
}
