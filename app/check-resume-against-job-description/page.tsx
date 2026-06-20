import { JdWorkbenchPageChrome } from "@/app/components/tools/JdWorkbenchPageChrome";
import { JdWorkbenchPostFormBridge } from "@/app/components/tools/JdWorkbenchPostFormBridge";
import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";
import {
  TOOL_CLUSTER_PRIMARY,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";
import HomeClient from "@/app/HomeClient";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_PRIMARY);

export default function CheckResumeAgainstJobDescriptionPage() {
  return (
    <>
      <JdWorkbenchPageChrome />
      <HomeClient variant="toolOnly" analysisMode="jdMatch" />
      <JdWorkbenchPostFormBridge />
      <ToolClusterLanding
        config={TOOL_CLUSTER_PRIMARY}
        hidePrimaryHero
        omitStructuredData
        omitWorkbench
        embedded
        workbenchMode
        homePageMode
      />
    </>
  );
}
