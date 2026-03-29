import { ResumeKeywordScannerLanding } from "@/app/components/ResumeKeywordScannerLanding";
import {
  TOOL_CLUSTER_KEYWORD_SCANNER,
  buildToolClusterMetadata,
} from "@/app/lib/toolClusterPages";

export const metadata = buildToolClusterMetadata(TOOL_CLUSTER_KEYWORD_SCANNER);

export default function ResumeKeywordScannerPage() {
  return <ResumeKeywordScannerLanding />;
}
