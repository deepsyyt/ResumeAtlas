import { PostingFitAnalyticsRoot } from "@/app/components/postingFit/PostingFitAnalyticsRoot";
import { PostingFitSsrShell } from "@/app/components/postingFit/PostingFitSsrShell";
import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";
import {
  TOOL_CLUSTER_PRIMARY,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_PRIMARY);

export default function CheckResumeAgainstJobDescriptionPage() {
  return (
    <>
      <PostingFitAnalyticsRoot surface="workbench" />
      <PostingFitSsrShell />
      <ToolClusterLanding
        config={TOOL_CLUSTER_PRIMARY}
        hidePrimaryHero
        omitStructuredData
      />
    </>
  );
}
