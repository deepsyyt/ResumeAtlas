"use client";

import { DashboardContent } from "@/app/components/DashboardContent";
import { DEMO_DASHBOARD_CONTENT_DATA } from "@/app/lib/dashboardContentData";

type HeroDashboardPreviewProps = {
  /** `hero`: marketing crop. `tool`: workbench fill + scroll. `full`: legacy alias for tool scroll. */
  variant?: "hero" | "tool" | "full";
  /** Hide in-card footer when the parent shell already shows hint text. */
  hideFooter?: boolean;
};

/**
 * Demo intelligence dashboard — delegates to unified DashboardContent.
 */
export function HeroDashboardPreview({
  variant = "hero",
  hideFooter = false,
}: HeroDashboardPreviewProps) {
  const isWorkbench = variant === "tool" || variant === "full";

  return (
    <DashboardContent
      data={DEMO_DASHBOARD_CONTENT_DATA}
      variant={isWorkbench ? "workbench" : "hero"}
      hideFooter={hideFooter}
    />
  );
}
