import { ATS_RESUME_TEMPLATE_GUIDE_PATH } from "@/app/lib/internalLinks";

export type AtsGuideSection = {
  id: string;
  title: string;
  /** Short label for jump nav */
  navLabel: string;
};

export const ATS_GUIDE_SECTIONS: readonly AtsGuideSection[] = [
  { id: "what-is-ats", title: "What is ATS?", navLabel: "What is ATS?" },
  {
    id: "how-ats-scoring-works",
    title: "How ATS scoring works",
    navLabel: "ATS scoring",
  },
  {
    id: "ats-parsing-explained",
    title: "ATS parsing explained",
    navLabel: "Parsing",
  },
  {
    id: "ats-keyword-matching",
    title: "ATS keyword matching",
    navLabel: "Keywords",
  },
  {
    id: "ats-resume-format-examples",
    title: "ATS resume format examples",
    navLabel: "Format examples",
  },
  {
    id: "ats-resume-templates",
    title: "ATS resume templates",
    navLabel: "Templates",
  },
  {
    id: "ats-resume-mistakes",
    title: "ATS resume mistakes",
    navLabel: "Mistakes",
  },
  {
    id: "ats-compatibility-score",
    title: "ATS compatibility score",
    navLabel: "Compatibility score",
  },
] as const;

export const ATS_RESUME_TEMPLATE_PATH = ATS_RESUME_TEMPLATE_GUIDE_PATH;
