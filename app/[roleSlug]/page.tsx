import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { ROLE_CONTENT_MAP } from "@/app/lib/roleContentMap";
import {
  KEYWORD_PAGES,
  RESUME_SAMPLE_HASH,
  resumePageConfigForRole,
  type RoleSlug,
} from "@/app/lib/seoPages";
import { roleToProblemLinkLabel, roleToProblemPath } from "@/app/lib/roleSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

type PageParams = {
  roleSlug: string;
};

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const roleConfig = KEYWORD_PAGES[params.roleSlug as keyof typeof KEYWORD_PAGES];
  if (!roleConfig) return {};
  const rn = roleConfig.roleName;
  return {
    title: `${rn} Resume Not Getting Interviews? Fix It Here | ResumeAtlas`,
    description: `If your ${rn.toLowerCase()} resume is not getting interviews, find role-specific keyword gaps, ATS issues, and targeted fixes in one page.`,
    alternates: {
      canonical: `/${params.roleSlug}`,
    },
    robots: { index: false, follow: true },
  };
}

export default function RoleHubPage({ params }: { params: PageParams }) {
  const roleConfig = KEYWORD_PAGES[params.roleSlug as keyof typeof KEYWORD_PAGES];
  if (!roleConfig) {
    notFound();
  }

  const role = params.roleSlug as RoleSlug;
  const roleName = roleConfig.roleName;
  const roleLower = roleName.toLowerCase();
  const roleContent = ROLE_CONTENT_MAP[role];
  const sampleConfig = resumePageConfigForRole(role);
  const canonicalBase = getSiteUrl();
  const rolePath = `/${role}`;
  const atsKeywordsPath = `/${role}-resume-keywords`;
  const resumeGuidePath = `/${role}-resume-guide`;
  const skillsPath = `${resumeGuidePath}#skills`;
  const summaryPath = `${resumeGuidePath}#summary`;
  const projectsPath = `${resumeGuidePath}#projects`;
  const bulletsPath = `${resumeGuidePath}#bullet-points`;

  const faqItems = [
    {
      question: `How should a ${roleLower} resume be structured for ATS?`,
      answer:
        `Use a clean, single-column layout with clear headings for Summary, Skills, Experience, Projects, and Education. ` +
        `Make sure your job titles, dates, and company names are easy to parse, and keep important ${roleLower} keywords in plain text rather than graphics or sidebars.`,
    },
    {
      question: `How many pages should a ${roleLower} resume be?`,
      answer:
        "Most early- and mid-career candidates can keep their resume to one page. If you have 8–10+ years of experience, a focused two-page resume is fine as long as every line adds signal for the type of roles you are targeting.",
    },
    {
      question: `How do I tailor my ${roleLower} resume to a specific job description?`,
      answer:
        "Read the posting carefully, highlight tools, responsibilities, and outcomes that repeat, and then mirror that language in your summary, skills, and bullets where it truthfully matches your background. You want the resume to read like evidence for that exact role, not a generic profile.",
    },
    {
      question: "Do I need different resume versions for ATS and recruiters?",
      answer:
        "A single, well-structured, ATS-friendly resume usually works for both. Focus on clarity, strong verbs, and measurable results. You can keep a slightly more visual version for networking, but your online applications should favor simple, parseable formatting.",
    },
  ];

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
  } as const;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalBase,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: roleName,
        item: `${canonicalBase}${rolePath}`,
      },
    ],
  } as const;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {roleName} Resume Not Getting Interviews? Fix It Here
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            One page for your {roleLower} job search: an ATS-friendly sample resume, keyword lists,
            and deep links for skills, summaries, projects, and bullets—so you rank in screenings and
            read clearly to hiring managers.
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Start with the example below, tighten each section using the topic guides, then{" "}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>{" "}
            against your target posting.
          </p>
          <div className="mt-6">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Check why my {roleName} resume is not getting interviews
            </Link>
          </div>
          <LastUpdated className="mt-2 text-xs text-slate-500" />
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Start here</h2>
          <p className="mt-1 text-sm text-slate-600">
            Jump to the sample or the highest-intent sections for this role.
          </p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-slate-800 list-none p-0 m-0">
            <li>
              <Link
                href={`${rolePath}${RESUME_SAMPLE_HASH}`}
                className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {roleName} resume example (on this page)
              </Link>
            </li>
            <li>
              <Link
                href={atsKeywordsPath}
                className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {roleName} ATS keyword clusters
              </Link>
            </li>
            <li>
              <Link
                href={projectsPath}
                className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {roleName} project examples
              </Link>
            </li>
            <li>
              <Link
                href={bulletsPath}
                className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {roleName} experience examples
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            Role-specific signals ATS expects for {roleLower} resumes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Prioritize evidence around tools like {roleContent.tools.slice(0, 3).join(", ")} and
            verbs such as {roleContent.domainVerbs.slice(0, 3).join(", ")}. These patterns help ATS
            and recruiters quickly map your experience to role requirements.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
            {roleContent.examplePhrases.slice(0, 2).map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Top gaps we see in {roleLower} resumes
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Role terms missing from summary/skills despite matching experience.</li>
              <li>ATS-unfriendly bullet wording that hides outcomes and tooling.</li>
              <li>Weak alignment between JD must-haves and top experience bullets.</li>
            </ul>
            <Link href={CHECK_RESUME_AGAINST_JD_FORM_HREF} className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">
              Check my {roleName} resume gaps now
            </Link>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Example failure output for {roleLower} resumes
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Match estimate: <strong className="text-slate-900">63%</strong> · Missing terms:
              <span className="ml-1">{roleContent.tools.slice(0, 3).join(", ")}</span> ·
              Top fix: rewrite first 3 bullets using verbs like{" "}
              <span className="font-medium text-slate-900">{roleContent.domainVerbs.slice(0, 2).join(", ")}</span>{" "}
              with measurable outcomes.
            </p>
          </div>
        </section>

        {sampleConfig ? (
          <section
            id={RESUME_SAMPLE_HASH.slice(1)}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 scroll-mt-20"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                1. Start with a complete {roleLower} resume example
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-700">
                Use this ATS-friendly sample for structure—section order, bullet style, and balance
                of responsibilities and impact—then replace with your own experience.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3 text-sm sm:text-base text-slate-800">
              <p className="font-semibold">Alex Rivera</p>
              <p className="text-slate-600">
                {sampleConfig.roleName} · email@example.com · City, Country · LinkedIn · Portfolio
              </p>
              <div className="pt-3 space-y-2">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Professional Summary
                </h3>
                <p>{sampleConfig.summary}</p>
              </div>
              <div className="pt-3 space-y-2">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">Skills</h3>
                <p className="text-slate-700">{roleContent.tools.join(" • ")}</p>
              </div>
              <div className="pt-3 space-y-2">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Experience Highlights
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {sampleConfig.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 space-y-1">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">Education</h3>
                <p>Relevant degree or bootcamp</p>
                <p className="text-slate-600">University or program name</p>
              </div>
            </div>
            <p className="text-sm text-slate-700">
              For keyword ideas that match this role, see{" "}
              <Link
                href={atsKeywordsPath}
                className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                ATS keywords for {roleLower} resumes
              </Link>
              .
            </p>
          </section>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            2. Identify core ATS keywords for {roleLower} roles
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Before you write or rewrite bullets, get familiar with the keywords that show up across
            strong job descriptions for {roleLower} positions.
          </p>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            You&apos;ll use these keywords in your summary, skills section, and throughout your
            experience bullets so ATS can quickly match your profile to each job.
          </p>
          <Link
            href={atsKeywordsPath}
            className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
          >
            Explore ATS keywords for {roleLower} resumes →
          </Link>
          <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Keyword gap: tool names present in JD but missing from top-half resume.</li>
            <li>Coverage gap: required terms listed in skills but not proven in bullets.</li>
            <li>Context gap: terms present once, but no measurable result attached.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              3. Build a focused skills section
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              Your skills section should make it obvious, in a few seconds, that you work in{" "}
              {roleLower}. Group tools and concepts into clear categories and emphasize the stack
              that matches the roles you actually want next.
            </p>
            <Link
              href={skillsPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              See {roleLower} resume skills examples →
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              4. Write a targeted resume summary
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              A strong summary positions you for a specific type of {roleLower} opportunity, names
              your core strengths and domains, and hints at the business outcomes you deliver.
            </p>
            <Link
              href={summaryPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              Browse {roleLower} resume summary examples →
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              5. Highlight the right projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              Projects (professional, academic, or personal) are a powerful way to prove your skills.
              Focus on work that looks like the problems you&apos;ll solve in your next {roleLower}{" "}
              role, and describe them in terms of problem, approach, and impact.
            </p>
            <Link
              href={projectsPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              View {roleLower} resume project examples →
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              6. Turn responsibilities into impact-focused bullet points
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700">
              The strongest {roleLower} resumes are built from specific, quantified bullets, not
              copied job descriptions. Start each line with a verb, name the tools or methods you
              used, and end with a clear result or metric.
            </p>
            <Link
              href={bulletsPath}
              className="mt-3 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              See {roleLower} resume bullet point examples →
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Also on this role</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>
              <Link
                href={atsKeywordsPath}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {roleName} keywords (complete guide)
              </Link>
            </li>
            <li>
              <Link
                href={roleToProblemPath(role)}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {roleToProblemLinkLabel(role)}
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-emerald-900">
              Check your ATS score for this resume
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-emerald-900/80">
              Paste your resume and a live job description into ResumeAtlas to see your ATS score,
              missing keywords, and how well your {roleLower} bullets, skills, and projects line up
              with the role.
            </p>
          </div>
          <div className="flex-none">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 focus-visible:ring-offset-emerald-50 transition"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
          </div>
        </section>

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <span className="text-slate-400 text-xs group-open:hidden">+</span>
                  <span className="text-slate-400 text-xs hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
