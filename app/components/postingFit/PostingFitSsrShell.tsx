import {
  postingFitFaqJsonLd,
  postingFitWebApplicationJsonLd,
  postingFitWorkbenchBreadcrumbJsonLd,
} from "@/app/lib/postingFitJsonLd";
import { JD_MATCH_WORKBENCH_FAQ } from "@/app/lib/jdMatchWorkbenchFaqs";
import { TOOL_CLUSTER_PRIMARY } from "@/app/lib/toolClusterPages";

/**
 * SEO-critical SSR hero for posting-fit workbench. Commercial intent above the fold.
 */
export function PostingFitSsrShell() {
  const jsonLd = [
    postingFitWorkbenchBreadcrumbJsonLd(),
    postingFitWebApplicationJsonLd(TOOL_CLUSTER_PRIMARY),
    postingFitFaqJsonLd(JD_MATCH_WORKBENCH_FAQ),
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <section className="border-b border-slate-200 bg-white" id="posting-fit-diagnosis">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12 sm:text-left lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
            Free analyze + optimize · compare resume to job description
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {TOOL_CLUSTER_PRIMARY.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            {TOOL_CLUSTER_PRIMARY.intro}
          </p>
        </div>
      </section>
    </>
  );
}
