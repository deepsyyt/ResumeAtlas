import { HomeBrowseByRoleSection } from "@/app/components/HomeBrowseByRoleSection";
import { PostingFitAnalyticsRoot } from "@/app/components/postingFit/PostingFitAnalyticsRoot";
import { PostingFitSsrShell } from "@/app/components/postingFit/PostingFitSsrShell";
import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";
import {
  TOOL_CLUSTER_PRIMARY,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";
import HomeClient from "./HomeClient";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_PRIMARY);

export default function Page() {
  return (
    <>
      <PostingFitAnalyticsRoot surface="workbench" />
      <PostingFitSsrShell />
      <HomeClient variant="home" hideMarketingHero hidePostFormSections />
      <ToolClusterLanding
        config={TOOL_CLUSTER_PRIMARY}
        hidePrimaryHero
        omitStructuredData
        omitWorkbench
        embedded
        workbenchMode
        homePageMode
      />
      <HomeBrowseByRoleSection />
    </>
  );
}
