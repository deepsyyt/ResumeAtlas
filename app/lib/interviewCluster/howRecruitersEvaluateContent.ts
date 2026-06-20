import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import type { ClusterArticleConfig } from "@/app/lib/interviewCluster/articleTypes";
import { HOW_RECRUITERS_EVALUATE_PATH } from "@/app/lib/interviewCluster/paths";

export { HOW_RECRUITERS_EVALUATE_PATH };

export const howRecruitersEvaluateConfig: ClusterArticleConfig = {
  path: HOW_RECRUITERS_EVALUATE_PATH,
  primaryKeyword: "how recruiters evaluate resumes",
  title: `How Recruiters Evaluate Resumes (${CONTENT_FRESHNESS_YEAR}) | ResumeAtlas`,
  h1: "How Recruiters Evaluate Resumes",
  metaDescription:
    "Recruiters scan resumes in seconds — not for keyword density, but for evidence you can do the job. Learn what they look for and why listed skills without proof fail.",
  heroIntro:
    "Most resume advice optimizes for ATS parsers or writing quality. Recruiters optimize for risk reduction: can I believe this person did the work this role requires? That lens explains why many resumes with good scores still are not getting interviews.",
  sections: [
    {
      heading: "The first pass is evidence, not keywords",
      paragraphs: [
        "On an initial screen, recruiters look for role fit, recognizable employers or projects, and bullets that prove relevant tools and outcomes — usually in under ten seconds.",
        "Keyword-stuffed skills sections do not substitute for experience that reads credible at a glance.",
      ],
      bullets: [
        "Headline and summary: what role and domain?",
        "Recent experience: same function, similar stack, measurable results?",
        "Must-haves from posting: evidenced in bullets, not only listed?",
      ],
    },
    {
      heading: "What gets a resume rejected fast",
      paragraphs: ["Common rejection triggers on human review:"],
      bullets: [
        "Skills listed with no supporting project or work bullet",
        "Generic bullets (“responsible for,” “helped with”) without outcomes",
        "Title or level mismatch vs the posting",
        "Gaps between posting must-haves and visible proof",
        "Formatting that hides dates, titles, or employers",
      ],
    },
    {
      heading: "Lists vs proof — the recruiter distinction",
      paragraphs: [
        "A resume that lists AWS, Python, and LangChain signals breadth. Bullets that describe shipping on AWS with Python for a production workload signal depth.",
        "Recruiters hire depth for the role in front of them. Unproven list items read as noise or inflation — especially for senior postings.",
      ],
    },
    {
      heading: "How to align with how recruiters actually read",
      paragraphs: [
        "Mirror posting language where your experience is true. Put proof where eyes go first: summary, then most recent relevant job, then supporting history.",
        "Before you apply, compare resume to job description and ask: for each requirement, where is the bullet a recruiter would underline?",
      ],
      bullets: [
        "One bullet per must-have where possible",
        "Numbers where honest: scale, time saved, error reduction, revenue",
        "Trim skills you cannot defend in a phone screen",
        "Check rejection risks for that specific posting",
      ],
    },
  ],
  productHeading: "Evaluate your resume the way screening works",
  productParagraphs: [
    "ResumeAtlas models apply-readiness for one posting: what recruiters would question, not just what an ATS might parse.",
  ],
  productBullets: [
    "Application Verdict for the role you pasted",
    "Skill proof — proven, weak, and missing requirements",
    "Rejection risks tied to the job description",
    "Recommended fixes ranked before you apply",
  ],
  faq: [
    {
      question: "Do recruiters read every bullet?",
      answer:
        "Often no on the first pass. They scan top-down until they find proof of fit or a reason to stop. Front-load relevant evidence.",
    },
    {
      question: "How long do recruiters spend on a resume?",
      answer:
        "Initial screens are often seconds to a minute. Clarity and proof in the first third of page one matter more than length or design flourishes.",
    },
    {
      question: "Do recruiters use ATS scores?",
      answer:
        "Some workflows use ATS filters; humans then judge evidence. A resume can pass filters and fail the recruiter scan — especially when skills are listed but not proven.",
    },
    {
      question: "What matters more — keywords or achievements?",
      answer:
        "Achievements that use the posting’s vocabulary beat keywords without context. The best bullets do both: right words, real outcomes.",
    },
  ],
};
