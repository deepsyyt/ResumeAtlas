import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  roleResumeExampleListMeta,
  roleResumeExamplePath,
} from "@/app/lib/searchIntentSeo";
import type { ResumeSeoTopic } from "@/app/lib/resumeTopicTypes";
import { ResumeTopicSectionForGuide } from "@/app/seo/[slug]/page";

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
  const showFullSampleAppendix = role === "data-analyst" || role === "product-manager";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {config.roleName} resume example, sample &amp; template
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            These section-by-section patterns reflect how hiring teams and ATS tools read{" "}
            {config.roleName.toLowerCase()} resumes in {CONTENT_FRESHNESS_YEAR} - plain-text structure, proof in bullets, and
            honest posting-aligned keywords. Use it as a sample outline, then compare your resume to a job
            description to close gaps before you apply.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {MERGED_TOPICS.map((t) => (
              <Link
                key={t}
                href={`#${anchorForTopic(t)}`}
                className="inline-flex scroll-mt-24 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                {anchorForTopic(t).replace("-", " ")}
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
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href="#bullet-points"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              View bullet patterns
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {MERGED_TOPICS.map((topic) => (
          <ResumeTopicSectionForGuide
            key={topic}
            role={params.roleSlug}
            topic={topic}
            anchorId={anchorForTopic(topic)}
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

        <section className="rounded-2xl border border-slate-200 bg-white px-4 py-6 sm:px-6 sm:py-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Build stronger non-brand coverage for this role
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            Use this example page as your core owner, then branch into keyword and bullet-point pages for
            deeper intent coverage recruiters and ATS systems both scan.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
            <li>
              <Link
                href={`/${role}-resume-keywords`}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {config.roleName} resume keywords
              </Link>{" "}
              for tools, verbs, and summary terms.
            </li>
            <li>
              <Link
                href={`/${role}-resume-bullet-points`}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                {config.roleName} resume bullet points
              </Link>{" "}
              for entry-level, junior, and senior wording patterns.
            </li>
            <li>
              <Link
                href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
                className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
              >
                Compare your resume vs one job description
              </Link>{" "}
              before final edits.
            </li>
          </ul>
        </section>
      </div>

      {role === "data-analyst" ? (
        <section id="full-sample" className="scroll-mt-24 border-t border-slate-200 bg-slate-50/40">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Full data analyst resume example (appendix)
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
              Copy-paste sample, extended FAQs, and keyword blocks - on the same URL as the section-by-section
              walkthrough above.
            </p>
          </div>
          <DataAnalystResumeExampleMain omitHero />
        </section>
      ) : null}

      {role === "product-manager" ? (
        <section id="full-sample" className="scroll-mt-24 border-t border-slate-200 bg-slate-50/40">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
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
    </main>
  );
}
