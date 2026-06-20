import {
  postingFitWebApplicationJsonLd,
  postingFitWorkbenchBreadcrumbJsonLd,
} from "@/app/lib/postingFitJsonLd";
import { CLUSTER_JD_MATCH_TOOL_COPY } from "@/app/lib/canonicalIntentClusters";
import { TOOL_CLUSTER_PRIMARY } from "@/app/lib/toolClusterPages";

/**
 * JD workbench page chrome — JSON-LD only. The form is the above-the-fold UI; marketing copy
 * lives on `/` and in ToolClusterLanding below the workbench.
 */
export function JdWorkbenchPageChrome() {
  const jsonLd = [
    postingFitWorkbenchBreadcrumbJsonLd(),
    postingFitWebApplicationJsonLd(TOOL_CLUSTER_PRIMARY),
  ];
  const eyebrow = TOOL_CLUSTER_PRIMARY.heroEyebrow;
  const pageH1 = TOOL_CLUSTER_PRIMARY.heroH1 ?? TOOL_CLUSTER_PRIMARY.h1;
  const intro = TOOL_CLUSTER_PRIMARY.heroIntro ?? TOOL_CLUSTER_PRIMARY.intro;
  const heroShowLabel = CLUSTER_JD_MATCH_TOOL_COPY.heroShowLabel;
  const heroBullets = CLUSTER_JD_MATCH_TOOL_COPY.heroBullets ?? [];

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
      <section
        className="border-b border-slate-200 bg-gradient-to-b from-sky-50/40 to-white"
        aria-labelledby="jd-workbench-heading"
      >
        <div className="page-shell py-2 text-center sm:py-2 sm:text-left">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-800 sm:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="jd-workbench-heading"
            className="mt-0.5 text-pretty text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            {pageH1}
          </h1>
          <p className="mx-auto mt-1 max-w-2xl text-pretty text-[13px] leading-snug text-slate-600 sm:mx-0 sm:text-sm">
            {intro}
          </p>
          {heroBullets.length > 0 ? (
            <>
              {heroShowLabel ? (
                <p className="mx-auto mt-2 max-w-2xl text-[11px] font-medium text-slate-700 sm:mx-0 sm:text-xs">
                  {heroShowLabel}
                </p>
              ) : null}
              <ul className="mx-auto mt-1.5 flex max-w-2xl flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-700 sm:mx-0 sm:justify-start sm:text-xs">
                {heroBullets.map((line) => (
                  <li key={line} className="flex items-center gap-1">
                    <span className="font-semibold text-emerald-600" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
