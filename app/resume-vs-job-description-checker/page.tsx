import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";
import {
  TOOL_CLUSTER_PRIMARY,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_PRIMARY);

export default function ResumeVsJobDescriptionCheckerPage() {
  return <ToolClusterLanding config={TOOL_CLUSTER_PRIMARY} />;
}

