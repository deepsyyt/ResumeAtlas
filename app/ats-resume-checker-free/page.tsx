import { ATSResumeCheckerFreeLanding } from "@/app/components/ATSResumeCheckerFreeLanding";
import {
  TOOL_CLUSTER_ATS_FREE,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_ATS_FREE);

export default function ATSResumeCheckerFreePage() {
  return <ATSResumeCheckerFreeLanding />;
}
