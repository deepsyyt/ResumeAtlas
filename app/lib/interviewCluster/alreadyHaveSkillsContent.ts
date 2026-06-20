import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import type { ClusterArticleConfig } from "@/app/lib/interviewCluster/articleTypes";
import { ALREADY_HAVE_SKILLS_PATH } from "@/app/lib/interviewCluster/paths";

export { ALREADY_HAVE_SKILLS_PATH };

export const alreadyHaveSkillsConfig: ClusterArticleConfig = {
  path: ALREADY_HAVE_SKILLS_PATH,
  primaryKeyword: "have the skills but not getting interviews",
  title: `Have the Skills But Not Getting Interviews? (${CONTENT_FRESHNESS_YEAR}) | ResumeAtlas`,
  h1: "Already Have the Skills But Not Getting Interviews?",
  metaDescription:
    "Background fits the job but resume is silent? Often skills are real but not proven on paper. Learn why recruiters pass and how to show evidence before you apply again.",
  heroIntro:
    "You read the posting and think: I have done this. Months later, still no interviews. The issue is rarely that you lack the skills — it is that your resume does not prove them fast enough for the specific role you want.",
  sections: [
    {
      heading: "Competence vs credibility on paper",
      paragraphs: [
        "Hiring is a credibility problem before it is a competence problem. Recruiters cannot verify your full career in one pass. They scan for evidence that maps to this posting.",
        "When your resume is not getting interviews despite real experience, the gap is usually presentation of proof — not absence of ability.",
      ],
    },
    {
      heading: "Patterns that look qualified but fail screening",
      paragraphs: ["These show up constantly on resumes from capable candidates:"],
      bullets: [
        "Right skills in the wrong section — tools listed, never used in a bullet",
        "Right work, wrong vocabulary — you did the job but used different terms than the posting",
        "Right history, wrong emphasis — relevant wins buried under unrelated older roles",
        "Right score, wrong story — high keyword match with thin impact metrics",
      ],
    },
    {
      heading: "The ten-second recruiter test",
      paragraphs: [
        "Hand your resume to someone for ten seconds with one question: “Could this person do this job?” If they hesitate, you have a proof problem — not necessarily a skill problem.",
        "Fix the top third of page one for the target role before you send another application.",
      ],
    },
    {
      heading: "What to do before the next application",
      paragraphs: [
        "Pick one posting you genuinely fit. Compare resume to job description line by line. For each must-have, locate a bullet that proves it. If you cannot find one, that is your highest-priority fix — not another round of keyword insertion.",
      ],
      bullets: [
        "Lead with the role’s domain and stack in summary + first bullets",
        "Quantify one outcome per recent bullet where possible",
        "Cut or shrink jobs that dilute the story for this application",
        "Run apply-readiness check: verdict, rejection risks, recommended fixes",
      ],
    },
  ],
  productHeading: "See where proof breaks for one job",
  productParagraphs: [
    "ResumeAtlas is built for the moment you are sure you fit but the market disagrees. Paste the posting you want — not a generic resume review.",
  ],
  productBullets: [
    "Application Verdict — should you apply to this role?",
    "Skill proof — which requirements you evidence vs list only",
    "Rejection risks — likely screening failures for this posting",
    "Recommended fixes — what to change before you submit",
  ],
  faq: [
    {
      question: "I have the skills but my resume is not getting interviews — why?",
      answer:
        "Usually because those skills are not visible in experience bullets recruiters scan, or because impact is implied instead of shown. Compare your resume to the exact posting to find proof gaps.",
    },
    {
      question: "Should I rewrite my whole resume?",
      answer:
        "Not necessarily. Often reordering, retitling, and strengthening five to eight bullets for one target role moves outcomes more than a full redesign.",
    },
    {
      question: "Does a high ATS score mean I should get interviews?",
      answer:
        "No. ATS and keyword tools measure term overlap. Recruiters measure whether bullets convince them you can do this job. See why ATS scores are not enough for the full picture.",
    },
    {
      question: "How many jobs should I apply to while fixing this?",
      answer:
        "Fix proof for one serious target role first. Spraying the same unproven resume to more postings scales rejection, not learning.",
    },
  ],
};
