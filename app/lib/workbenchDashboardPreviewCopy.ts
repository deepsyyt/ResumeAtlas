/** Marketing chrome for the tool workbench preview column (demo + live). */

export const WORKBENCH_PREVIEW_EYEBROW = "NEW: APPLICATION INTELLIGENCE";

export const WORKBENCH_PREVIEW_HEADLINE = "Know if you should apply. And how to win.";

export type WorkbenchPreviewFeature = {
  title: string;
  body: string;
};

export const WORKBENCH_PREVIEW_FEATURES: readonly WorkbenchPreviewFeature[] = [
  { title: "Application Verdict", body: "Know if you should apply" },
  { title: "Keyword Coverage", body: "See missing & strong skills" },
  { title: "Role Fit Analysis", body: "Match your resume to role" },
  { title: "Skill Proof Map", body: "Show proof, not just listing" },
  { title: "Recommended Fixes", body: "Pick what to optimize" },
] as const;

export type WorkbenchPreviewBottomChip = {
  title: string;
  body: string;
  icon: "clock" | "chart" | "shield" | "trophy";
};

export const WORKBENCH_PREVIEW_BOTTOM_CHIPS: readonly WorkbenchPreviewBottomChip[] = [
  {
    title: "Save hours",
    body: "Know your true match in minutes.",
    icon: "clock",
  },
  {
    title: "Increase callbacks",
    body: "Fix what actually matters to recruiters.",
    icon: "chart",
  },
  {
    title: "Avoid wrong applications",
    body: "Focus only on roles where you can win.",
    icon: "shield",
  },
  {
    title: "Win more interviews",
    body: "Better alignment = better conversations.",
    icon: "trophy",
  },
] as const;
