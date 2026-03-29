import {
  TOOL_CLUSTER_COMPAT,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";
import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_COMPAT);

export default function ATSCompatibilityCheckPage() {
  return <ToolClusterLanding config={TOOL_CLUSTER_COMPAT} />;
}
