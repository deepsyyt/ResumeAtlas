"use client";

import { DashboardContent } from "@/app/components/DashboardContent";
import { HeroKeywordScannerPreview } from "@/app/components/postingFit/HeroKeywordScannerPreview";
import { DEMO_DASHBOARD_CONTENT_DATA } from "@/app/lib/dashboardContentData";

type Props = {
  hint?: string;
  isAnalyzing?: boolean;
  previewVariant?: "fullDashboard" | "keywordScanner";
};

/**
 * Tool-page empty preview — delegates to unified DashboardContent (demo data).
 */
export function AnimatedIntelligenceDashboardPreview({
  hint,
  isAnalyzing = false,
  previewVariant = "fullDashboard",
}: Props) {
  if (previewVariant === "keywordScanner") {
    return (
      <div className="workbench-preview-mockup w-full">
        <HeroKeywordScannerPreview variant="tool" />
      </div>
    );
  }

  return (
    <DashboardContent
      data={DEMO_DASHBOARD_CONTENT_DATA}
      variant="workbench"
      isAnalyzing={isAnalyzing}
      hint={hint}
      hideFooter
    />
  );
}
