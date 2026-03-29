import {
  TOOL_CLUSTER_SCORE,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";
import { ToolClusterLanding } from "@/app/components/ToolClusterLanding";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_SCORE);

export default function ResumeScoreCheckerPage() {
  return <ToolClusterLanding config={TOOL_CLUSTER_SCORE} />;
}
