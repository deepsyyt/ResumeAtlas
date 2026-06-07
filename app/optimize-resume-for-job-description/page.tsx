import type { Metadata } from "next";
import { OptimizeHubPage } from "@/app/components/optimize/OptimizeHubPage";
import { OPTIMIZE_HUB_CONTENT, OPTIMIZE_HUB_PATH } from "@/app/lib/roleOptimizerContent";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = getSiteUrl().replace(/\/$/, "");

export const metadata: Metadata = {
  title: OPTIMIZE_HUB_CONTENT.title,
  description: OPTIMIZE_HUB_CONTENT.description,
  alternates: { canonical: OPTIMIZE_HUB_PATH },
  openGraph: {
    title: OPTIMIZE_HUB_CONTENT.title,
    description: OPTIMIZE_HUB_CONTENT.description,
    url: `${siteBase}${OPTIMIZE_HUB_PATH}`,
    type: "website",
  },
};

export default function OptimizeResumeForJobDescriptionPage() {
  return <OptimizeHubPage />;
}
