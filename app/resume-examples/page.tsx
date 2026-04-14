import type { Metadata } from "next";
import Link from "next/link";
import {
  RESUME_PAGES,
  type RoleSlug,
  ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE,
  resumeExamplePublicPath,
} from "@/app/lib/seoPages";
import { LastUpdated } from "@/app/components/LastUpdated";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { CLUSTER_RESUME_EXAMPLES_INDEX_METADATA } from "@/app/lib/canonicalIntentClusters";
import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import { getSiteUrl } from "@/app/lib/siteUrl";

const hub = CLUSTER_RESUME_EXAMPLES_INDEX_METADATA;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: {
    canonical: hub.path,
  },
  openGraph: {
    title: hub.ogTitle,
    description: hub.ogDescription,
    url: hub.openGraphUrl,
    siteName: "ResumeAtlas",
    type: "website",
  },
};

const standaloneSet = new Set<RoleSlug>([...ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE]);

export default function ResumeExamplesIndexPage() {
  const items = Object.values(RESUME_PAGES).sort((a, b) => {
    const ra = a.slug.replace(/-resume-example$/, "") as RoleSlug;
    const rb = b.slug.replace(/-resume-example$/, "") as RoleSlug;
    const sa = standaloneSet.has(ra) ? 0 : 1;
    const sb = standaloneSet.has(rb) ? 0 : 1;
    if (sa !== sb) return sa - sb;
    return a.roleName.localeCompare(b.roleName);
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Resume examples by role",
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => {
      const role = p.slug.replace(/-resume-example$/, "") as RoleSlug;
      const url = `${getSiteUrl()}${resumeExamplePublicPath(role)}`;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: p.h1,
        url,
      };
    }),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Resume examples by role
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Examples here track common {CONTENT_FRESHNESS_YEAR} role titles and keyword patterns - each card
            links to that role’s canonical sample page (one primary URL per role, not thin duplicates). For
            ATS layout rules read the template guide; to compare your text to a posting, use the free
            resume-to-job-description matcher.
          </p>
          <LastUpdated className="mx-auto mt-3 max-w-2xl text-center text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
          <Link
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition"
          >
            {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Browse by role</h2>
          <p className="mt-1 text-sm text-slate-500">
            Full example pages (template, preview, FAQ) are listed first; other roles open the merged guide until a
            dedicated page goes live.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {items.map((p) => {
              const role = p.slug.replace(/-resume-example$/, "") as RoleSlug;
              const isStandalone = standaloneSet.has(role);
              return (
                <li key={p.slug} className="rounded-xl border border-slate-200 bg-white p-4">
                  <Link
                    href={resumeExamplePublicPath(role)}
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    {p.h1}
                  </Link>
                  {isStandalone ? (
                    <p className="mt-1 text-xs text-sky-700">Dedicated example page (full template + FAQ)</p>
                  ) : (
                    <p className="mt-1 text-xs text-slate-500">Links to merged guide sample</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">{p.metaDescription}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold text-slate-900">More resume writing resources</h2>
          <p className="text-sm text-slate-500 mt-1">
            Deep dives for bullet points, skills, summaries, and projects.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/data-scientist-resume-example#bullet-points"
                className="text-sky-700 hover:underline"
              >
                Data Scientist resume bullet points
              </Link>
            </li>
            <li>
              <Link
                href="/software-engineer-resume-example#skills"
                className="text-sky-700 hover:underline"
              >
                Software Engineer resume skills
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </main>
  );
}
