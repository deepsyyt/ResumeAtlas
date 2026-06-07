import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { RoleOptimizeClusterNav } from "@/app/components/optimize/RoleOptimizeClusterNav";
import { RoleClusterNavSection } from "@/app/components/RoleClusterNavSection";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import { KeywordApplicationModule } from "@/app/components/seo/KeywordApplicationModule";
import { RoleKeywordClustersSection } from "@/app/components/seo/RoleKeywordClustersSection";
import { RoleKeywordIntentHubBlock } from "@/app/components/seo/RoleKeywordIntentHubBlock";
import {
  KEYWORD_PAGES,
  type RoleSlug,
  resumeExamplePublicPath,
} from "@/app/lib/seoPages";
import { ROLE_CONTENT_MAP } from "@/app/lib/roleContentMap";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import {
  ROLE_KEYWORDS_FAQ,
  ROLE_KEYWORDS_SCOPE_NOTE,
  ROLE_KEYWORDS_SECONDARY_H2,
  ROLE_KEYWORDS_SENIORITY,
  roleKeywordsFaqSchema,
} from "@/app/lib/roleKeywordsPageConfig";
import { ROLE_KEYWORD_INTENTS, type RoleKeywordIntent } from "@/app/lib/roleSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";
import {
  ATS_RESUME_TEMPLATE_GUIDE_PATH,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { getOptimizeClusterNav } from "@/app/lib/roleOptimizer/clusterNav";
import {
  roleResumeKeywordsH1,
  roleResumePillarPath,
  roleResumeKeywordsPath,
} from "@/app/lib/searchIntentSeo";

type PageParams = { role: RoleSlug };

export default function RoleKeywordsGuidePage({ params }: { params: PageParams }) {
  const config = KEYWORD_PAGES[params.role];

  const roleSlug = params.role;
  const roleContent = ROLE_CONTENT_MAP[roleSlug];
  const resumeExamplePath = resumeExamplePublicPath(roleSlug);
  const mergedGuidePath = roleResumePillarPath(roleSlug);
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const keywordHubTitle = roleResumeKeywordsH1(roleSlug);
  const keywordsPublicPath = roleResumeKeywordsPath(roleSlug);
  const isDataAnalystKeywordsPage = roleSlug === "data-analyst";
  const isMachineLearningEngineerPage = roleSlug === "machine-learning-engineer";
  const scopeNote = ROLE_KEYWORDS_SCOPE_NOTE[roleSlug];
  const secondaryH2 = ROLE_KEYWORDS_SECONDARY_H2[roleSlug];
  const clusterSectionTitle =
    roleSlug === "software-engineer"
      ? "Software engineer keyword clusters"
      : roleSlug === "devops-engineer"
        ? "DevOps tools vs concepts"
        : roleSlug === "backend-developer"
          ? "Backend developer keyword clusters"
          : roleSlug === "data-scientist"
            ? "Data scientist keyword clusters"
            : `${config.roleName} resume keyword clusters`;
  const topKeywords = (roleContent.topKeywords ?? roleContent.tools).slice(0, 20);
  const exampleBullets = roleContent.exampleBullets ?? roleContent.examplePhrases;
  const toolSet = new Set(roleContent.tools.map((t) => t.toLowerCase()));
  const verbSet = new Set(roleContent.domainVerbs.map((v) => v.toLowerCase()));
  const coreKeywords = topKeywords
    .filter((k) => !toolSet.has(k.toLowerCase()) && !verbSet.has(k.toLowerCase()))
    .slice(0, 8);
  const topKeywordCopyBlock = topKeywords.slice(0, 10).join(", ");
  const topMissingKeywordList = roleContent.tools.slice(0, 4);
  const checklistKeywords = topKeywords.slice(0, 20);
  const seniorityBlock = ROLE_KEYWORDS_SENIORITY[roleSlug];
  const introFreshnessEcho =
    roleSlug === "devops-engineer"
      ? "These DevOps resume keywords reflect what hiring teams and ATS systems prioritize in 2026, including tools, cloud platforms, and measurable impact language. "
      : "";
  const exactQueryMatchLine = `${config.roleName} resume keywords include tools like ${roleContent.tools
    .slice(0, 3)
    .join(", ")}, plus terms ATS and recruiters prioritize for this role.`;

  const faqSchema = roleKeywordsFaqSchema(roleSlug);
  const optimizeCluster = getOptimizeClusterNav(keywordsPublicPath);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${config.roleName} top resume keywords`,
    itemListElement: topKeywords.slice(0, 20).map((keyword, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: keyword,
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 sm:pb-12">
          <SeoBreadcrumbs
            kind="keywords"
            currentLabel={`${config.roleName} Resume Keywords`}
            currentPath={keywordsPublicPath}
            className="mb-3"
          />
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {keywordHubTitle}
            </h1>
            <LastUpdated
              className="mt-3 text-xs text-slate-500"
              label={CONTENT_LAST_UPDATED_LABEL}
            />
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              {introFreshnessEcho}
              Copy-ready {config.roleName.toLowerCase()} resume keywords recruiters and ATS look for—grouped by
              tools, skills, and verbs. Mirror terms from the job description where they match your real work,
              then scan for gaps against that posting.
            </p>
            {scopeNote ? (
              <p className="mt-3 text-sm text-amber-900/90 max-w-2xl mx-auto rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2">
                {scopeNote}
              </p>
            ) : null}
            <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl mx-auto">{exactQueryMatchLine}</p>
            <p className="mt-3 text-sm text-slate-700 max-w-2xl mx-auto">
              For resume examples, templates, and bullet banks, use the{" "}
              <Link
                href={mergedGuidePath}
                className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {config.roleName.toLowerCase()} resume example guide
              </Link>
              . This URL is for keyword lists and job-description matching only.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              <a href="#top-keywords" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:text-slate-900">
                Top keywords
              </a>
              <a href="#example-bullets" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:text-slate-900">
                Bullet examples
              </a>
              <a href="#keyword-gaps" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:text-slate-900">
                JD vs Resume gaps
              </a>
              <a href="#checklist" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:text-slate-900">
                Checklist
              </a>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-800 max-w-2xl mx-auto">
              Check if your resume includes these keywords →{" "}
              <Link
                href="/#ats-checker-form"
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
              Scan my resume for keyword gaps
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={keywordsPublicPath} />
        ) : null}

        {secondaryH2 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">{secondaryH2}</h2>
            <p className="mt-2 text-sm text-slate-700">
              Use this section when your search or job posting uses alternate wording. The full categorized
              lists below include tools, technical skills, and action verbs.
            </p>
          </section>
        ) : null}

        <section id="top-keywords" className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Quick copy: top {config.roleName.toLowerCase()} ATS keywords
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

        <section id="example-bullets" className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            How to use these keywords in resume bullets
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Short patterns below—see{" "}
            <Link href={`${mergedGuidePath}#bullet-points`} className="font-medium text-sky-800 underline">
              full {config.roleName.toLowerCase()} bullet examples
            </Link>{" "}
            for a complete sample resume.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
            {exampleBullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {isDataAnalystKeywordsPage ? (
          <section className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Data Analyst keywords by seniority
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Entry-level</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>SQL fundamentals</li>
                  <li>Excel reporting</li>
                  <li>Dashboard maintenance</li>
                  <li>Data cleaning</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Mid-level</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>Cohort analysis</li>
                  <li>Experiment readouts</li>
                  <li>dbt modeling</li>
                  <li>Stakeholder alignment</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Senior-level</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>Metric definitions governance</li>
                  <li>Decision impact storytelling</li>
                  <li>Cross-functional KPI strategy</li>
                  <li>Analytics roadmap ownership</li>
                </ul>
              </div>
            </div>
          </section>
        ) : seniorityBlock ? (
          <section className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              {seniorityBlock.title}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {seniorityBlock.tiers.map((tier) => (
                <div key={tier.label} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{tier.label}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {tier.keywords.map((keyword) => (
                      <li key={keyword}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <RoleKeywordClustersSection
          roleName={config.roleName}
          title={clusterSectionTitle}
          roleContent={roleContent}
        />

        <section aria-labelledby="kw-categories-heading">
          <h2
            id="kw-categories-heading"
            className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900"
          >
            {config.roleName} resume keywords by category (ATS checklist)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Expand each category for a full keyword list and phrasing patterns. These sections replace thin
            one-line summaries—use them as your master checklist before tailoring to a job description.
          </p>
          <ul className="mt-6 space-y-8 list-none p-0 m-0">
            {ROLE_KEYWORD_INTENTS.map((intent: RoleKeywordIntent) => (
              <RoleKeywordIntentHubBlock key={intent} role={roleSlug} intent={intent} />
            ))}
          </ul>
        </section>

        <KeywordApplicationModule keywordMistakes={roleContent.keywordMistakes} />

        <section id="keyword-gaps" className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Top missing keywords we repeatedly see in {config.roleName} resumes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            These are high-frequency gaps when resumes underperform against real job descriptions:
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            {topMissingKeywordList.map((tool) => (
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
          <p className="mt-4 text-sm text-slate-700">
            Pro tip: prioritize missing terms that appear in the first half of the JD and tie each to a
            measurable bullet.
          </p>
        </section>

        {isDataAnalystKeywordsPage ? (
          <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Keywords that look good but often fail in screening
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
              <li>
                <strong className="text-slate-900">"data-driven"</strong> without a metric or business decision
                outcome.
              </li>
              <li>
                <strong className="text-slate-900">"created dashboards"</strong> without audience, cadence, or
                changed behavior.
              </li>
              <li>
                <strong className="text-slate-900">"expert SQL"</strong> without concrete query work (funnel,
                retention, attribution, or experimentation).
              </li>
              <li>
                <strong className="text-slate-900">"worked cross-functionally"</strong> without evidence of impact
                on revenue, conversion, or efficiency.
              </li>
            </ul>
          </section>
        ) : null}

        {isMachineLearningEngineerPage ? (
          <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Machine learning resume keywords that need production proof
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
              <li>
                <strong className="text-slate-900">"deep learning"</strong> without model type, metric, or
                deployment context.
              </li>
              <li>
                <strong className="text-slate-900">"built models"</strong> without data volume, retraining, or
                monitoring story.
              </li>
              <li>
                <strong className="text-slate-900">"TensorFlow / PyTorch"</strong> listed only in skills with no
                serving or pipeline bullets.
              </li>
              <li>
                <strong className="text-slate-900">"MLOps"</strong> without CI/CD, registry, or incident language
                when the JD owns reliability.
              </li>
            </ul>
          </section>
        ) : null}

        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={keywordsPublicPath} />
        ) : null}

        <RoleClusterNavSection currentPath={keywordsPublicPath} />

        <section id="checklist" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.roleName} ATS keyword checklist
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            Use this quick checklist before every application. Aim to cover each keyword in context at least once
            across summary, skills, and impact bullets.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Copy checklist</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {checklistKeywords.map((keyword) => (
                <li
                  key={keyword}
                  className="list-none rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
          {isDataAnalystKeywordsPage ? (
            <div className="mt-5 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Reference frameworks recruiters recognize:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <a
                    href="https://www.o*netonline.org/link/summary/15-2051.00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    O*NET data analyst skills profile
                  </a>
                </li>
                <li>
                  <a
                    href="https://powerbi.microsoft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    BI dashboard platform ecosystem overview
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.getdbt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    dbt analytics engineering workflow
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
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
                  href="/ats-resume-template#how-ats-scans"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  How ATS Systems Scan Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/ats-resume-template#common-mistakes"
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  Common Resume Mistakes That Fail ATS
                </Link>
              </li>
              <li>
                <Link
                  href={resumeExamplePath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} resume example
                </Link>
              </li>
              <li>
                <Link
                  href={mergedGuidePath}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {config.roleName} resume guide
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="faq">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {config.roleName} Resume Keywords - FAQs
          </h2>
          <div className="mt-6 space-y-4">
            {ROLE_KEYWORDS_FAQ[roleSlug].map((item) => (
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </main>
  );
}
