import {
  TOOL_CLUSTER_PRIMARY,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";
import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_PRIMARY);

export default function CheckResumeAgainstJobDescriptionPage() {
  return <ToolClusterLanding config={TOOL_CLUSTER_PRIMARY} />;
}
