import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";
import {
  TOOL_CLUSTER_MATCH_RESUME,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_MATCH_RESUME);

export default function MatchResumeToJobDescriptionPage() {
  return <ToolClusterLanding config={TOOL_CLUSTER_MATCH_RESUME} />;
}

