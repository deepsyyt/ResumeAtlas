import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RoleOptimizeClusterNav } from "@/app/components/optimize/RoleOptimizeClusterNav";
import { RoleClusterNavSection } from "@/app/components/RoleClusterNavSection";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import { DataAnalystResumeExampleMain } from "@/app/data-analyst-resume-example/DataAnalystResumeExampleMain";
import { ProductManagerResumeExampleMain } from "@/app/product-manager-resume-example/ProductManagerResumeExampleMain";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { buildResumeExampleMetadata } from "@/app/lib/resumeExampleSeoTemplate";
import {
  absoluteCanonicalUrl,
  roleResumeExampleH1,
  roleResumeExampleListMeta,
  roleResumeExamplePath,
  roleResumeKeywordsPath,
} from "@/app/lib/searchIntentSeo";
import { isResumeBulletRole, publicPathForBulletHub } from "@/app/lib/resumeBulletPointContent";
import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";
import { ResumeTopicSectionForGuide } from "@/app/components/resumeTopicGuide";
import { RolePostingFitMoat } from "@/app/components/postingFit/RolePostingFitMoat";
import { getOptimizeClusterNav } from "@/app/lib/roleOptimizer/clusterNav";

type PageParams = { roleSlug: RoleSlug };

const MERGED_TOPICS: readonly ResumeSeoTopic[] = [
  "summary",
  "skills",
  "projects",
  "bullet-points",
];

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) return {};
  const canonicalPath = roleResumeExamplePath(params.roleSlug);
  const canonicalAbs = absoluteCanonicalUrl(canonicalPath);

  const slug = params.roleSlug;
  if (slug === "data-analyst" || slug === "product-manager") {
    const ex = buildResumeExampleMetadata(canonicalPath, slug);
    return {
      ...ex,
      alternates: { canonical: canonicalAbs },
      openGraph: {
        ...ex.openGraph,
        url: canonicalAbs,
      },
    };
  }

  const { title, description } = roleResumeExampleListMeta(params.roleSlug);
  return {
    title,
    description,
    alternates: { canonical: canonicalAbs },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalAbs,
      siteName: "ResumeAtlas",
      type: "article",
    },
  };
}

function anchorForTopic(topic: ResumeSeoTopic): string {
  switch (topic) {
    case "summary":
      return "summary";
    case "skills":
      return "skills";
    case "projects":
      return "projects";
    case "bullet-points":
      return "bullet-points";
    default:
      return "bullet-points";
  }
}

export default function RoleResumeExamplePage({ params }: { params: PageParams }) {
  const config = KEYWORD_PAGES[params.roleSlug];
  if (!config) notFound();

  const role = params.roleSlug;
  const showFullSampleAppendix = role === "product-manager";
  const isDataAnalyst = role === "data-analyst";
  const keywordsPagePath = roleResumeKeywordsPath(role);
  const examplePath = roleResumeExamplePath(role);
  const bulletHubPath = isResumeBulletRole(role) ? publicPathForBulletHub(role) : null;
  const optimizeCluster = getOptimizeClusterNav(examplePath);
  const roleLower = config.roleName.toLowerCase();
  const heroHeading = roleResumeExampleH1(role);
  const heroIntro = isDataAnalyst
    ? "Recruiter-ready example with SQL, Python, Tableau, Power BI, and analytics bullet patterns—plain-text structure and measurable outcomes."
    : `These section-by-section patterns reflect how hiring teams and ATS tools read ${roleLower} resumes in ${CONTENT_FRESHNESS_YEAR}—plain-text structure, proof in bullets, and honest posting-aligned language. Use this sample outline, then compare your resume to a job description to close gaps before you apply.`;

  return (
    <>
      <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="page-prose-wide py-14 text-center sm:py-16">
          <SeoBreadcrumbs
            kind="guide"
            currentLabel={`${config.roleName} Resume Guide`}
            currentPath={roleResumeExamplePath(role)}
            className="mb-4 text-left"
          />
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {heroHeading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            {heroIntro}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-700">
            For ATS keyword lists and missing terms from a job description, use the{" "}
            <Link
              href={keywordsPagePath}
              className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              {roleLower} resume keywords
            </Link>{" "}
            page. Section patterns and bullet examples stay on this guide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {(isDataAnalyst ? (["resume-example", "outline", "skills", "resume-bullet-points-h2", "faq"] as const) : MERGED_TOPICS).map((t) => (
              <Link
                key={t}
                href={`#${isDataAnalyst ? t : anchorForTopic(t as ResumeSeoTopic)}`}
                className="inline-flex scroll-mt-24 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                {isDataAnalyst ? t.replaceAll("-", " ") : anchorForTopic(t as ResumeSeoTopic).replace("-", " ")}
              </Link>
            ))}
            {showFullSampleAppendix ? (
              <Link
                href="#full-sample"
                className="inline-flex scroll-mt-24 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Full sample
              </Link>
            ) : null}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isDataAnalyst ? (
              <Link
                href="#resume-example"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View Resume Example
              </Link>
            ) : null}
            {isDataAnalyst ? (
              <Link
                href="#outline"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Copy outline
              </Link>
            ) : null}
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {isDataAnalyst ? "Tailor to Job Description" : CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            {!isDataAnalyst && bulletHubPath ? (
              <Link
                href={bulletHubPath}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View resume bullet points
              </Link>
            ) : !isDataAnalyst ? (
              <Link
                href="#bullet-points"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View bullet patterns
              </Link>
            ) : null}
          </div>
          {role === "data-analyst" || role === "product-manager" ? (
            <div className="mx-auto mt-8 max-w-3xl">
              <RolePostingFitMoat role={role} />
            </div>
          ) : null}
        </div>
      </section>

      {!isDataAnalyst ? (
        <div className="page-prose space-y-10 py-10">
          {optimizeCluster ? (
            <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={examplePath} />
          ) : null}
          {MERGED_TOPICS.map((topic) => (
            <ResumeTopicSectionForGuide
              key={topic}
              role={params.roleSlug}
              topic={topic}
              anchorId={anchorForTopic(topic)}
              showRoleSpecificContext={
                role === "data-scientist" || role === "software-engineer"
                  ? topic === "summary"
                  : true
              }
            />
          ))}

          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-6 sm:px-6 sm:py-8">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Check your resume against a real job description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Paste your resume and the posting into ResumeAtlas to see ATS-style match signals and
              prioritized improvements for {config.roleName.toLowerCase()} roles.
            </p>
            <div className="mt-6">
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:text-base"
              >
                {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
              </Link>
            </div>
          </section>
        </div>
      ) : null}

      {role === "data-analyst" ? <DataAnalystResumeExampleMain omitHero /> : null}

      {role === "product-manager" ? (
        <section id="full-sample" className="scroll-mt-24 border-t border-slate-200 bg-slate-50/40">
          <div className="page-prose-wide py-6">
            <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Full product manager resume example (appendix)
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
              Copy-paste sample, extended FAQs, and keyword blocks - on the same URL as the section-by-section
              walkthrough above.
            </p>
          </div>
          <ProductManagerResumeExampleMain omitHero />
        </section>
      ) : null}

      <div className="page-prose space-y-10 pb-14">
        {optimizeCluster ? (
          <RoleOptimizeClusterNav cluster={optimizeCluster} currentPath={examplePath} />
        ) : null}
        <RoleClusterNavSection currentPath={examplePath} />
      </div>
    </main>
    </>
  );
}
