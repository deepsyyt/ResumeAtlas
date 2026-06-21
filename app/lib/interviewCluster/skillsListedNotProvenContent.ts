import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import type { ClusterArticleConfig } from "@/app/lib/interviewCluster/articleTypes";
import { SKILLS_LISTED_NOT_PROVEN_PATH } from "@/app/lib/interviewCluster/paths";

export { SKILLS_LISTED_NOT_PROVEN_PATH };

export const skillsListedNotProvenConfig: ClusterArticleConfig = {
  path: SKILLS_LISTED_NOT_PROVEN_PATH,
  primaryKeyword: "skills listed but not proven on resume",
  title: `Skills Listed But Not Proven on Resume (${CONTENT_FRESHNESS_YEAR}) | ResumeAtlas`,
  h1: "Skills Listed But Not Proven on Your Resume",
  metaDescription:
    "Skills listed but not proven on your resume? Recruiters evaluate evidence, not lists. See unproven skills, elimination risks, and recommended fixes before you apply.",
  heroIntro:
    "Many resumes list AWS, Python, LangChain, or MLOps in a skills section. Recruiters do not hire lists — they hire evidence. If a skill is not demonstrated in project or work bullets, it may be treated as weak or unproven. That gap is one of the most common reasons a resume is not getting interviews.",
  sections: [
    {
      heading: "Mentioned is not the same as proven",
      paragraphs: [
        "Keyword tools reward presence: did the term appear somewhere on the page? Recruiters ask a harder question: did this person actually do the work?",
        "A skills cloud can make your resume look qualified at a glance while experience bullets tell a narrower story. When the two diverge, screening often stops before a human invests more time.",
      ],
    },
    {
      heading: "Example: strong list, weak proof",
      paragraphs: [
        "Skills: AWS · Kubernetes · Python · LangChain · CI/CD · PostgreSQL",
        "Experience bullet: “Built REST APIs and improved deployment workflows.”",
        "The list signals senior platform work. The bullet proves API delivery — not AWS, not Kubernetes, not LangChain. A recruiter targeting this posting may treat three listed skills as unproven.",
      ],
      bullets: [
        "Proven in bullets: API development, general deployment work",
        "Listed only: AWS, Kubernetes, LangChain",
        "Risk: screening pass despite looking qualified on paper",
      ],
    },
    {
      heading: "Why ATS scores miss this",
      paragraphs: [
        "A 75–85% keyword match can coexist with multiple unproven skills. Match rate measures overlap, not whether each requirement is evidenced where recruiters look first — your experience section.",
        "That is why resume not getting interviews persists after Jobscan or ATS tuning: the score improved, the proof did not.",
      ],
    },
    {
      heading: "How to fix unproven skills honestly",
      paragraphs: [
        "You do not need to invent projects. You need to relocate truth: if you used AWS on a shipped service, say so in a bullet with scale or outcome. If you only touched a tool in a tutorial, do not list it as a core skill for senior roles.",
      ],
      bullets: [
        "Move must-have posting terms from skills-only into the best-matching job bullet",
        "Quantify outcomes: latency, cost, reliability, users, revenue where real",
        "Trim skills you cannot defend in an interview for this role",
        "Compare resume to the specific job description — not a generic checklist",
      ],
    },
  ],
  productHeading: "How ResumeAtlas analyzes skill proof",
  productParagraphs: [
    "Paste your resume and a job description. ResumeAtlas separates what you list from what you prove — per posting, not in the abstract.",
  ],
  productBullets: [
    "Proven skills — requirements evidenced in experience bullets",
    "Weak skills — mentioned but thin or absent from work history",
    "Missing skills — posting requirements not on your resume at all",
    "Rejection risks — what may eliminate you during screening",
    "Recommended fixes — prioritized changes before you apply",
  ],
  faq: [
    {
      question: "Should I remove skills I cannot prove?",
      answer:
        "For a specific application, trim or demote skills you cannot discuss with examples. Keeping every tool you ever touched inflates keyword scores and deflates trust when a recruiter skims bullets.",
    },
    {
      question: "Is listing a skill in a skills section enough for ATS?",
      answer:
        "Sometimes for parsing, yes. For human shortlists, rarely. Many recruiters weight experience bullets far more than skills clouds when judging fit.",
    },
    {
      question: "Why is my resume not getting interviews if my skills match the job?",
      answer:
        "Match often means mentioned, not proven. Compare each posting requirement to a bullet that shows you used it. Gaps there explain silence better than a low ATS score alone.",
    },
    {
      question: "Can I add keywords without lying?",
      answer:
        "Yes — by reframing real work with accurate tools and outcomes. Mirror posting language only where your experience supports it. Do not add tools you have not used in professional context.",
    },
  ],
};
