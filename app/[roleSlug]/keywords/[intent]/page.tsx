import type { Metadata } from "next";
import Link from "next/link";
import {
  CHECK_RESUME_AGAINST_JD_PATH,
  CHECK_RESUME_AGAINST_JD_ANCHOR,
} from "@/app/lib/internalLinks";
import { notFound } from "next/navigation";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import { getKeywordIntentContent } from "@/app/lib/keywordIntentContent";
import {
  isRoleKeywordIntent,
  keywordIntentLabel,
  getRelatedKeywordIntents,
  roleToProblemPath,
  type RoleKeywordIntent,
} from "@/app/lib/roleSeo";
import { NOINDEX_ROLE_KEYWORD_INTENT_PAGES } from "@/app/lib/roleClusterIndexPolicy";

type PageParams = {
  roleSlug: RoleSlug;
  intent: string;
};

function intentToResumeTopicPath(
  role: RoleSlug,
  intent: RoleKeywordIntent
): string {
  const guidePath = `/${role}-resume-guide`;
  if (intent === "core-keywords") return `${guidePath}#skills`;
  if (intent === "action-verbs") return `${guidePath}#bullet-points`;
  if (intent === "summary") return `${guidePath}#summary`;
  if (intent === "projects") return `${guidePath}#projects`;
  if (intent === "technical-skills") return `${guidePath}#skills`;
  if (intent === "tools-platforms") return `${guidePath}#skills`;
  return `${guidePath}#summary`;
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const roleConfig = KEYWORD_PAGES[params.roleSlug];
  if (!roleConfig || !isRoleKeywordIntent(params.intent)) return {};
  const intent = params.intent;
  const intentLabel = keywordIntentLabel(intent);
  const content = getKeywordIntentContent(params.roleSlug, intent);
  return {
    title: `${roleConfig.roleName} Resume Keywords (${intentLabel} + Examples)`,
    description: content.metaDescription,
    alternates: {
      canonical: `/${params.roleSlug}/keywords/${intent}`,
    },
    ...(NOINDEX_ROLE_KEYWORD_INTENT_PAGES
      ? { robots: { index: false, follow: true } as const }
      : {}),
  };
}

export default function RoleKeywordIntentPage({ params }: { params: PageParams }) {
  const roleConfig = KEYWORD_PAGES[params.roleSlug];
  if (!roleConfig || !isRoleKeywordIntent(params.intent)) notFound();
  const intent = params.intent;
  const role = params.roleSlug;
  const intentLabel = keywordIntentLabel(intent);
  const relatedIntents = getRelatedKeywordIntents(intent);
  const content = getKeywordIntentContent(role, intent);
  const resumeTopicPath = intentToResumeTopicPath(role, intent);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-xs text-slate-500">
            <Link
              href={`/${role}`}
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              {roleConfig.roleName}
            </Link>
            <span className="mx-1.5">/</span>
            <Link
              href={`/${role}-resume-keywords`}
              className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
            >
              Keywords
            </Link>
            <span className="mx-1.5">/</span>
            <span>{intentLabel}</span>
          </nav>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            {roleConfig.roleName} Resume Keywords ({intentLabel} + ATS Examples)
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">{content.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_PATH}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              {CHECK_RESUME_AGAINST_JD_ANCHOR}
            </Link>
            <Link
              href={resumeTopicPath}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Related resume topic: {intentLabel} →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {content.clusters.map((cluster) => (
          <section key={cluster.title} className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">{cluster.title}</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">{cluster.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cluster.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-800"
                >
                  {k}
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-4">
              {cluster.usageExamples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                >
                  <p>
                    <span className="font-semibold text-rose-700">Weak: </span>
                    {ex.bad}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-emerald-800">Strong: </span>
                    {ex.good}
                  </p>
                  {ex.explanation ? (
                    <p className="mt-2 text-xs text-slate-500">{ex.explanation}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Where to use these keywords (ATS + readability)
          </h2>
          <ul className="mt-4 space-y-4">
            {content.placementGuide.map((row, i) => (
              <li key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {row.section === "summary" && "Summary"}
                  {row.section === "skills" && "Skills"}
                  {row.section === "experience" && "Experience bullets"}
                </p>
                <p className="mt-1 text-sm text-slate-800">{row.advice}</p>
                {row.example ? (
                  <p className="mt-2 text-sm text-slate-600 italic border-l-2 border-sky-300 pl-3">
                    Example: {row.example}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Common mistakes</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-700">
            {content.mistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Internal links</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>
              <Link href={`/${role}`} className="text-sky-700 underline underline-offset-2 hover:text-sky-900">
                {roleConfig.roleName} resume guide (hub)
              </Link>
            </li>
            <li>
              <Link
                href={resumeTopicPath}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Related resume topic page
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/keywords/core-keywords`}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Core ATS keyword clusters
              </Link>
            </li>
            <li>
              <Link
                href={roleToProblemPath(role)}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Related problem page
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Related keyword guides</h3>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
            {relatedIntents.map((sibling) => (
              <li key={sibling}>
                <Link
                  href={`/${role}/keywords/${sibling}`}
                  className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
                >
                  {keywordIntentLabel(sibling)} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
