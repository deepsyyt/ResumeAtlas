import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/internalLinks";

export type InterviewBridgeStep = {
  title: string;
  body: string;
};

export const INTERVIEW_BRIDGE_STEPS: InterviewBridgeStep[] = [
  {
    title: "Resume not getting interviews",
    body:
      "You apply consistently but hear nothing back — even when your background feels like a fit. The resume clears your gut check but not the recruiter's ten-second scan.",
  },
  {
    title: "Unproven skills",
    body:
      "Requirements from the job description appear in your skills section or summary, but experience bullets never show you used them on real work. Mentioned is not proven.",
  },
  {
    title: "Rejection risks",
    body:
      "For each posting, gaps surface as screening risks: listed-but-unproven tools, missing impact metrics, or weak role fit — not just a low keyword percentage.",
  },
  {
    title: "Recommended fixes",
    body:
      "Prioritize fixes you can honestly make before you apply: move proven skills into bullets, quantify outcomes, and address the highest-risk gaps for that job.",
  },
];

export const INTERVIEW_BRIDGE_GUIDE = {
  path: RESUME_NOT_GETTING_INTERVIEWS_PATH,
  label: "Resume not getting interviews — full guide",
} as const;

export function interviewBridgeIntro(competitorName?: string): string {
  if (competitorName) {
    return `Many people switch from ${competitorName} when a strong match score still leaves their resume not getting interviews. The pattern is usually the same:`;
  }
  return "When your resume is not getting interviews, the pattern is usually the same — regardless of ATS score or keyword match:";
}
