import type { Metadata } from "next";
import { ATS_RESUME_TEMPLATE_GUIDE_PATH } from "@/app/lib/internalLinks";
import { AtsResumeTemplateGuide } from "./atsResumeTemplateGuide";

export const metadata: Metadata = {
  title: "ATS Resume Template (Free Examples + Format That Passes ATS) | ResumeAtlas",
  description:
    "Copy-paste ATS resume templates, real-format examples, and the exact ATS-friendly layout recruiters and parsers prefer—then run your resume against any job description for free.",
  keywords: [
    "ATS resume template",
    "ATS resume format",
    "best resume format for ATS",
    "ATS CV template",
    "resume template ATS",
    "applicant tracking system resume template",
    "scannable resume template",
    "ATS resume examples",
    "resume format for ATS",
    "ATS optimized resume",
    "resume formatting for ATS",
    "resume templates for ATS systems",
    "ATS resume design",
  ],
  alternates: {
    canonical: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  },
  openGraph: {
    title: "ATS Resume Template (Free Examples + Format That Passes ATS) | ResumeAtlas",
    description:
      "Copy-paste templates, ATS resume format rules, sample resume text, and a free checker—match your resume to any job description.",
    type: "article",
    url: ATS_RESUME_TEMPLATE_GUIDE_PATH,
  },
};

export default function AtsResumeTemplatePage() {
  return <AtsResumeTemplateGuide />;
}
