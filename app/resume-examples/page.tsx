import type { Metadata } from "next";

import Link from "next/link";

import {

  KEYWORD_PAGES,

  RESUME_PAGES,

  type RoleSlug,

  resumeExamplePublicPath,

} from "@/app/lib/seoPages";

import { LastUpdated } from "@/app/components/LastUpdated";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import {
  RESUME_GUIDES_HUB_PATH,
  RESUME_KEYWORDS_HUB_PATH,
  RESUME_EXAMPLES_HUB_PATH,
} from "@/app/lib/seoHubPages";

import {

  CHECK_RESUME_AGAINST_JD_FORM_HREF,

  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,

} from "@/app/lib/internalLinks";

import { CLUSTER_RESUME_EXAMPLES_INDEX_METADATA } from "@/app/lib/canonicalIntentClusters";

import { CONTENT_FRESHNESS_YEAR, CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";

import { getSiteUrl } from "@/app/lib/siteUrl";

import {

  getResumeExampleClusterConfig,

  RESUME_EXAMPLE_CLUSTER_TIER1,

  RESUME_EXAMPLE_CLUSTER_TIER2,

  resumeExampleClusterPath,

} from "@/app/lib/resumeExampleClusterPages";



const hub = CLUSTER_RESUME_EXAMPLES_INDEX_METADATA;



const CLUSTER_ROLE_SET = new Set<string>([

  ...RESUME_EXAMPLE_CLUSTER_TIER1,

  ...RESUME_EXAMPLE_CLUSTER_TIER2,

]);



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



function ClusterTierList({

  title,

  slugs,

}: {

  title: string;

  slugs: readonly import("@/app/lib/resumeExampleClusterPages").ResumeExampleClusterSlug[];

}) {

  return (

    <div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

        {slugs.map((slug) => {

          const config = getResumeExampleClusterConfig(slug);

          return (

            <li key={slug} className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">

              <Link

                href={resumeExampleClusterPath(slug)}

                className="font-semibold text-slate-900 hover:underline"

              >

                {config.roleName} resume example

              </Link>

              <p className="mt-1 text-xs text-sky-800">

                Full sample · ATS breakdown · recruiter review · FAQ

              </p>

              <p className="mt-2 text-xs text-slate-600 line-clamp-2">{config.description}</p>

            </li>

          );

        })}

      </ul>

    </div>

  );

}



export default function ResumeExamplesIndexPage() {

  const otherRoles = Object.values(RESUME_PAGES)

    .map((p) => p.slug.replace(/-resume-example$/, "") as RoleSlug)

    .filter((role) => !CLUSTER_ROLE_SET.has(role))

    .sort((a, b) => KEYWORD_PAGES[a].roleName.localeCompare(KEYWORD_PAGES[b].roleName));



  const clusterItems = [...RESUME_EXAMPLE_CLUSTER_TIER1, ...RESUME_EXAMPLE_CLUSTER_TIER2];

  const itemListSchema = {

    "@context": "https://schema.org",

    "@type": "ItemList",

    name: "Resume examples by role",

    numberOfItems: clusterItems.length + otherRoles.length,

    itemListElement: [

      ...clusterItems.map((slug, i) => {

        const config = getResumeExampleClusterConfig(slug);

        return {

          "@type": "ListItem",

          position: i + 1,

          name: config.h1,

          url: `${getSiteUrl()}${resumeExampleClusterPath(slug)}`,

        };

      }),

      ...otherRoles.map((role, j) => {

        const p = RESUME_PAGES[`${role}-resume-example` as keyof typeof RESUME_PAGES];

        return {

          "@type": "ListItem",

          position: clusterItems.length + j + 1,

          name: p.h1,

          url: `${getSiteUrl()}${resumeExamplePublicPath(role)}`,

        };

      }),

    ],

  };



  return (

    <main className="min-h-screen bg-white text-slate-900">

      <section className="border-b border-slate-200 bg-slate-50/50">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">

          <SeoBreadcrumbs
            kind="hub"
            currentLabel="Resume Examples"
            currentPath={RESUME_EXAMPLES_HUB_PATH}
            className="mb-4 text-left"
          />

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">

            Resume examples by role

          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">

            Each example page includes a realistic sample, ATS score breakdown, recruiter section review, role-specific

            mistakes, and FAQs—not a blank template. Built for {CONTENT_FRESHNESS_YEAR} hiring and keyword intent.

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

        <div className="space-y-8">

          <div>

            <h2 className="text-lg font-semibold text-slate-900">High-demand resume examples</h2>

            <p className="mt-1 text-sm text-slate-500">

              One canonical URL per role at <code className="text-xs">/resume-examples/[role]</code>.

            </p>

          </div>

          <ClusterTierList title="Tier 1" slugs={RESUME_EXAMPLE_CLUSTER_TIER1} />

          <ClusterTierList title="Tier 2" slugs={RESUME_EXAMPLE_CLUSTER_TIER2} />

        </div>



        {otherRoles.length > 0 ? (

          <div>

            <h2 className="text-lg font-semibold text-slate-900">Other roles</h2>

            <p className="mt-1 text-sm text-slate-500">Merged resume guide (patterns + sample sections).</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

              {otherRoles.map((role) => {

                const p = RESUME_PAGES[`${role}-resume-example` as keyof typeof RESUME_PAGES];

                return (

                  <li key={role} className="rounded-xl border border-slate-200 bg-white p-4">

                    <Link

                      href={resumeExamplePublicPath(role)}

                      className="font-semibold text-slate-900 hover:underline"

                    >

                      {p.h1}

                    </Link>

                    <p className="mt-1 text-xs text-slate-500">{p.metaDescription}</p>

                  </li>

                );

              })}

            </ul>

          </div>

        ) : null}



        <div className="border-t border-slate-200 pt-6 flex flex-wrap gap-4 text-sm">
          <Link href={RESUME_KEYWORDS_HUB_PATH} className="font-semibold text-sky-800 hover:underline">
            All resume keywords →
          </Link>
          <Link href={RESUME_GUIDES_HUB_PATH} className="font-semibold text-sky-800 hover:underline">
            All resume guides →
          </Link>
        </div>

        <div className="border-t border-slate-200 pt-6 mt-6">
          <h2 className="text-base font-semibold text-slate-900">ATS resume keywords by role</h2>
          <p className="mt-1 text-sm text-slate-500">
            All keyword guides—including data engineer, SQL, Power BI, BSA, systems analyst, and
            business intelligence—live on the resume keywords hub.
          </p>
          <Link
            href={RESUME_KEYWORDS_HUB_PATH}
            className="mt-3 inline-flex font-semibold text-sky-800 hover:underline"
          >
            Browse all resume keyword guides →
          </Link>
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

