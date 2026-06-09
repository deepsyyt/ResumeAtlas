import {
  postingFitWebApplicationJsonLd,
  postingFitWorkbenchBreadcrumbJsonLd,
} from "@/app/lib/postingFitJsonLd";
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
  const pageH1 = TOOL_CLUSTER_PRIMARY.heroH1 ?? TOOL_CLUSTER_PRIMARY.h1;

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
      <h1 className="sr-only">{pageH1}</h1>
    </>
  );
}
