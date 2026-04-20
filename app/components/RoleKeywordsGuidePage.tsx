import Link from "next/link";
import { RelatedResumeGuidesSection } from "@/app/components/RelatedResumeGuidesSection";
import { KeywordApplicationModule } from "@/app/components/seo/KeywordApplicationModule";
import {
  KEYWORD_PAGES,
  type RoleSlug,
  roleResumeSamplePath,
} from "@/app/lib/seoPages";
import { ROLE_CONTENT_MAP } from "@/app/lib/roleContentMap";
import { INTENT_HUB_BLURBS } from "@/app/lib/keywordIntentHubBlurbs";
import {
  ROLE_KEYWORD_INTENTS,
  keywordIntentLabel,
  type RoleKeywordIntent,
} from "@/app/lib/roleSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import {
  roleResumeKeywordsHubMeta,
  stripResumeAtlasTitleSuffix,
} from "@/app/lib/searchIntentSeo";

type PageParams = { role: RoleSlug };

export default function RoleKeywordsGuidePage({ params }: { params: PageParams }) {
  const config = KEYWORD_PAGES[params.role];

  const roleSlug = params.role;
  const roleContent = ROLE_CONTENT_MAP[roleSlug];
  const resumeSamplePath = roleResumeSamplePath(roleSlug);
  const mergedGuidePath = `/${roleSlug}-resume-example`;
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const keywordHubTitle = stripResumeAtlasTitleSuffix(roleResumeKeywordsHubMeta(roleSlug).title);
  const isDevOpsKeywordsPage = roleSlug === "devops-engineer";
  const isSoftwareKeywordsPage = roleSlug === "software-engineer";
  const topKeywords = (roleContent.topKeywords ?? roleContent.tools).slice(0, 20);
  const exampleBullets = roleContent.exampleBullets ?? roleContent.examplePhrases;
  const toolSet = new Set(roleContent.tools.map((t) => t.toLowerCase()));
  const verbSet = new Set(roleContent.domainVerbs.map((v) => v.toLowerCase()));
  const coreKeywords = topKeywords
    .filter((k) => !toolSet.has(k.toLowerCase()) && !verbSet.has(k.toLowerCase()))
    .slice(0, 8);
  const topKeywordCopyBlock = topKeywords.slice(0, 10).join(", ");
  const introFreshnessEcho =
    roleSlug === "devops-engineer"
      ? "These DevOps resume keywords reflect what hiring teams and ATS systems prioritize in 2026, including tools, cloud platforms, and measurable impact language. "
      : "";
  const exactQueryMatchLine = `${config.roleName} resume keywords include tools like ${roleContent.tools
    .slice(0, 3)
    .join(", ")}, along with concepts recruiters and ATS systems prioritize for this role.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: "2026-03-17",
    mainEntity: [
      {
        "@type": "Question",
        name: `What keywords do ATS look for in ${config.roleName.toLowerCase()} resumes?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ATS compare your resume to the job description and look for overlapping skills, tools, and concepts. Include the core technologies, domain terms, and responsibilities listed in the posting where they genuinely match your experience.",
        },
      },
      {
        "@type": "Question",
        name: `How many keywords should my ${config.roleName.toLowerCase()} resume include?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Focus on coverage, not a specific number. Make sure each critical requirement from the job description appears in your summary, skills, and experience bullets where it is genuinely part of your background.",
        },
      },
      {
        "@type": "Question",
        name: "Is keyword stuffing a good idea for ATS?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Repeating keywords unnaturally can look spammy to recruiters and does not guarantee a higher score. Use keywords in context inside clear, outcome‑driven bullets that describe real work you have done.",
        },
      },
      {
        "@type": "Question",
        name: "Do ATS systems check keywords in resumes?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. ATS systems compare keywords in your resume against the job description, but context matters. Keywords inside clear, evidence-based bullets usually perform better than long keyword-only lists.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `${config.roleName} resume example (full page)`,
        item: `${canonicalBase}${mergedGuidePath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${config.roleName} resume keywords (complete guide)`,
        item: `${canonicalBase}/${roleSlug}-resume-keywords`,
      },
    ],
  } as const;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 sm:pb-12">
          <nav className="mb-3 text-[11px] sm:text-xs text-slate-500 text-left">
            <Link
              href={mergedGuidePath}
              className="text-sky-700 hover:text-sky-900 underline underline-offset-2"
            >
              {config.roleName} resume example
            </Link>
            <span className="mx-1.5 text-slate-400">/</span>
            <span>Keywords (complete guide)</span>
          </nav>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {keywordHubTitle}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              {introFreshnessEcho}
              This hub maps high-intent {config.roleName.toLowerCase()} resume keywords for ATS and recruiters:
              core terms, technical skills, tools, action verbs, projects, and summary patterns. Pick a
              category below, then mirror the job description where it matches your real experience—before
              you run a resume keyword scan or compare your resume to that posting.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl mx-auto">{exactQueryMatchLine}</p>
            <p className="mt-3 text-sm font-medium text-slate-800 max-w-2xl mx-auto">
              Check if your resume includes these keywords →{" "}
              <Link
                href="/resume-keyword-scanner#ats-checker-form"
                className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                scan your resume for missing keywords
              </Link>
            </p>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              For this role, ATS scans usually reward specific tooling such as{" "}
              {roleContent.tools.slice(0, 4).join(", ")} and verbs like{" "}
              {roleContent.domainVerbs.slice(0, 3).join(", ")}.
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-left max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                JD vs resume quick comparison
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <strong className="text-slate-900">JD asks:</strong> {roleContent.tools.slice(0, 3).join(", ")},{" "}
                measurable impact, and role-specific delivery terms.
              </p>
              <p className="mt-1 text-sm text-slate-700">
                <strong className="text-slate-900">Resumes often miss:</strong> one or more required tool terms,
                quantified outcomes, and domain verbs in top bullets.
              </p>
            </div>
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
            >
              Scan my resume for missing keywords
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        <section className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Top {config.roleName} Resume Keywords (2026)
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Core keywords</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {coreKeywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Tools</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {roleContent.tools.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Action verbs</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {roleContent.domainVerbs.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Copy-ready block</p>
            <p className="mt-2 text-sm text-slate-700">
              <strong className="text-slate-900">Top 10 keywords:</strong> {topKeywordCopyBlock}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Example Resume Bullets Using These Keywords
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
            {exampleBullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {isSoftwareKeywordsPage && roleContent.keywordClusters ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Software engineer keyword clusters
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Backend keywords
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {(roleContent.keywordClusters.backend ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Frontend keywords
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {(roleContent.keywordClusters.frontend ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  DevOps / Platform keywords
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {(roleContent.keywordClusters.devops ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {isDevOpsKeywordsPage && roleContent.keywordClusters ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              DevOps Tools vs Concepts
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Tools</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {(roleContent.keywordClusters.tools ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Concepts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {(roleContent.keywordClusters.concepts ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="kw-categories-heading">
          <h2
            id="kw-categories-heading"
            className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900"
          >
            Keyword categories
          </h2>
          <ul className="mt-6 space-y-8 list-none p-0 m-0">
            {ROLE_KEYWORD_INTENTS.map((intent: RoleKeywordIntent) => (
              <li
                key={intent}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
              >
                <Link
                  href={`/${roleSlug}/keywords/${intent}`}
                  className="text-lg font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
                >
                  {keywordIntentLabel(intent)} →
                </Link>
                <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {INTENT_HUB_BLURBS[intent]}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <KeywordApplicationModule keywordMistakes={roleContent.keywordMistakes} />

        <section className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Top missing keywords we repeatedly see in {config.roleName} resumes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            These are high-frequency gaps when resumes underperform against real job descriptions:
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            {roleContent.tools.slice(0, 4).map((tool) => (
              <li key={tool}>{tool} (missing or weakly supported in experience bullets)</li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Example JD vs resume gap output
            </p>
            <p className="mt-2 text-sm text-slate-700">
              JD asks for <strong className="text-slate-900">{roleContent.tools.slice(0, 3).join(", ")}</strong> and
              measurable delivery. Resume contains generic tooling terms but no clear result bullets.
              Estimated keyword coverage: <strong className="text-slate-900">61%</strong>.
            </p>
          </div>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Related resume guides
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Deepen your {config.roleName.toLowerCase()} resume with these high-signal pages.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href={`/${roleSlug}-resume-example#projects`}
                className="text-sky-700 font-medium underline underline-offset-2 hover:text-sky-900"
              >
                {config.roleName} resume projects →
              </Link>
            </li>
            <li>
              <Link
                href={mergedGuidePath}
                className="text-sky-700 font-medium underline underline-offset-2 hover:text-sky-900"
              >
                {config.roleName} resume guide →
              </Link>
            </li>
            <li>
              <Link
                href={`/${roleSlug}-resume-example#skills`}
                className="text-sky-700 font-medium underline underline-offset-2 hover:text-sky-900"
              >
                {config.roleName} resume skills examples →
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Check your {config.roleName} resume against real job descriptions
          </h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Paste your resume and the role&apos;s job description into ResumeAtlas. You&apos;ll see keyword
            coverage, missing skills, and an ATS-style match score so you can tighten your resume before
            applying.
          </p>
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Check my keyword gaps now
          </Link>
          <p className="mt-3 text-sm font-medium text-slate-800">
            See full ATS resume format →{" "}
            <Link
              href={ATS_RESUME_TEMPLATE_GUIDE_PATH}
              className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              ATS resume template guide
            </Link>
          </p>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              More resources
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href="/resume-guides/ats-resume-template#how-ats-scans-resumes"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-guides/ats-resume-template#common-resume-mistakes-fail-ats"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href={resumeSamplePath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} Resume Example
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <RelatedResumeGuidesSection
          currentPath={`/${roleSlug}-resume-keywords`}
          className="border-t border-slate-200 pt-6"
        />

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.roleName} Resume Keywords - FAQs
          </h2>
          <div className="mt-6 space-y-4">
            {(faqSchema.mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map(
              (q) => (
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
              )
            )}
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
