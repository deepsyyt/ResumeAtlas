import type { Metadata } from "next";
import Link from "next/link";
import {
  RESUME_PAGES,
  type RoleSlug,
  ROLES_WITH_STANDALONE_RESUME_EXAMPLE_PAGE,
  resumeExamplePublicPath,
} from "@/app/lib/seoPages";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { getSiteUrl } from "@/app/lib/siteUrl";

export const metadata: Metadata = {
  title: "Resume Examples by Role (ATS-Friendly Templates) | ResumeAtlas",
  description:
    "Browse ATS-friendly resume examples by role: copy-paste templates, sample bullets, and full pages for product manager and data analyst. Scale your resume to any job description.",
  alternates: {
    canonical: "/resume-examples",
  },
  openGraph: {
    title: "Resume Examples by Role (ATS-Friendly) | ResumeAtlas",
    description:
      "Resume examples and templates for top roles. Full dedicated pages for product manager and data analyst; more roles link to merged guides.",
    url: `${getSiteUrl()}/resume-examples`,
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
            Resume Examples Hub
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            One place to jump into ATS-friendly resume examples by role. Full dedicated pages (template,
            preview, FAQ) ship first for high-intent roles; every role below links to the best URL for that
            job family.
          </p>
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
                href="/data-scientist-resume-guide#bullet-points"
                className="text-sky-700 hover:underline"
              >
                Data Scientist resume bullet points
              </Link>
            </li>
            <li>
              <Link
                href="/software-engineer-resume-guide#skills"
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
