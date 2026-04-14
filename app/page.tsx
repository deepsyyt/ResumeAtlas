import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { CLUSTER_HOME_METADATA } from "@/app/lib/canonicalIntentClusters";
import { getSiteUrl } from "@/app/lib/siteUrl";

export function generateMetadata(): Metadata {
  const base = getSiteUrl().replace(/\/$/, "");
  const m = CLUSTER_HOME_METADATA;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `${base}/` },
    openGraph: m.openGraph,
  };
}

export default function Page() {
  return <HomeClient />;
}
