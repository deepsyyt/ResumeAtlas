export type RoleOptimizerFaqItem = { question: string; answer: string };

export type RoleOptimizerJdDemonstration = {
  sectionTitle: string;
  intro: string;
  sampleJdLabel: string;
  sampleJdRequirements: string[];
  matchScore: number;
  missingKeywords: string[];
  beforeBullet: string;
  afterBullet: string;
  outro: string;
};

export type RoleOptimizerKeywordSection = {
  h2: string;
  intro: string;
  checklist: string[];
  body: string;
};

export type RoleOptimizerContent = {
  /** Role key without suffix, e.g. `data-scientist`. */
  slug: string;
  /** Public URL path, e.g. `/data-scientist-resume-optimizer`. */
  path: string;
  roleName: string;
  title: string;
  description: string;
  h1: string;
  targetKeywords: string[];
  /** Sample JD → match score → gaps → optimized bullet (demonstration block). */
  jdDemonstration: RoleOptimizerJdDemonstration;
  /** Visible ATS keyword checklist targeting resume-keywords query intent. */
  keywordSection: RoleOptimizerKeywordSection;
  /** Role-specific intro (section 2). */
  introParagraphs: string[];
  commonMistakes: string[];
  topSkills: string[];
  /** Narrative after skills list. */
  skillsNarrative: string;
  beforeExample: { before: string; after: string };
  beforeAfterContext: string;
  /** Section 6: how ResumeAtlas optimizes. */
  howAtlasOptimizes: { heading: string; body: string }[];
  faq: RoleOptimizerFaqItem[];
  /** Optional links to resume example / keywords in same cluster. */
  relatedExamplePath?: string;
  relatedKeywordsPath?: string;
};

export type OptimizeHubContent = {
  path: typeof OPTIMIZE_HUB_PATH;
  title: string;
  description: string;
  h1: string;
  heroIntro: string;
  targetKeywords: string[];
  webAppName: string;
  webAppDescription: string;
  howItWorks: { step: number; title: string; body: string }[];
  optimizationVsAts: { heading: string; paragraphs: string[] };
  beforeAfterExamples: { label: string; before: string; after: string; context: string }[];
  faq: RoleOptimizerFaqItem[];
};

export const OPTIMIZE_HUB_PATH = "/optimize-resume-for-job-description" as const;

/** @deprecated Use CHECK_RESUME_AGAINST_JD_FORM_HREF — tool page owns the workbench funnel. */
export { CHECK_RESUME_AGAINST_JD_FORM_HREF as OPTIMIZE_HUB_FORM_HREF } from "@/app/lib/internalLinks";

export const OPTIMIZE_HUB_CONTENT: OptimizeHubContent = {
  path: OPTIMIZE_HUB_PATH,
  title: "Optimize Resume for Job Description | Free AI Resume Optimization",
  description:
    "Analyze ATS compatibility, identify missing keywords, and optimize your resume for a specific job description using ResumeAtlas.",
  h1: "Optimize Your Resume for Any Job Description",
  heroIntro:
    "Role-specific guides with sample JD match examples and ATS keyword checklists. When you are ready, use the free compare resume to job description tool for match score, gap analysis, and AI optimization on your posting.",
  targetKeywords: [
    "optimize resume for job description",
    "tailor resume to job description",
    "customize resume for job application",
    "AI resume optimization",
    "resume rewrite for job description",
  ],
  webAppName: "ResumeAtlas resume optimizer for job descriptions",
  webAppDescription:
    "Free AI resume optimization: paste a job description, get ATS compatibility checks, missing keywords, skill gaps, and tailored rewrite suggestions for that posting.",
  howItWorks: [
    {
      step: 1,
      title: "Paste your resume and the target job description",
      body:
        "Copy the full responsibilities and requirements section from the posting you plan to apply to. ResumeAtlas compares that text to your resume file, not a generic role profile.",
    },
    {
      step: 2,
      title: "Get ATS compatibility and keyword match analysis",
      body:
        "See parsing risks (tables, columns, odd section headers) alongside a resume match score and missing keywords from that specific job description.",
    },
    {
      step: 3,
      title: "Review skill gaps and evidence quality",
      body:
        "Must-have tools and outcomes surface as gaps when they appear in the posting but not in your bullets. The tool flags keywords you list without proof.",
    },
    {
      step: 4,
      title: "Apply AI resume optimization recommendations",
      body:
        "Use suggested rewrites to tailor bullets to the posting while keeping truthful scope. Edit in the workbench, then download when you are ready to apply.",
    },
  ],
  optimizationVsAts: {
    heading: "Resume optimization vs ATS scoring",
    paragraphs: [
      "ATS scoring alone tells you whether a file is machine-readable. It does not tell you whether your experience matches one job description. A resume can parse cleanly yet still miss the tools, seniority signals, and outcomes a specific posting emphasizes.",
      "Resume optimization for a job description is a targeted rewrite pass: align section order, titles, skills, and bullets to that posting's language while keeping facts accurate. You are trading a generic master resume for a posting-specific version that still survives ATS filters.",
      "ResumeAtlas combines both layers. ATS compatibility checks protect parsing. Keyword matching and gap analysis show what the posting asks for that your resume never states. Optimization recommendations help you customize the resume for that job application without inventing experience.",
    ],
  },
  beforeAfterExamples: [
    {
      label: "Software engineer bullet",
      context:
        "A posting asked for TypeScript, React, and measurable latency improvements. The original bullet named tools but hid the outcome.",
      before:
        "Worked on frontend features using React and improved performance for the app.",
      after:
        "Shipped TypeScript/React features for checkout; cut p95 page load 28% by lazy-loading routes and trimming bundle size 19%.",
    },
    {
      label: "Product manager bullet",
      context:
        "The job description prioritized discovery, roadmap tradeoffs, and revenue impact. The draft listed activities without metrics.",
      before:
        "Owned roadmap and worked with engineering on feature delivery.",
      after:
        "Ran discovery with 14 customer interviews; reprioritized Q3 roadmap to launch billing self-serve, adding $420K ARR in two quarters.",
    },
  ],
  faq: [
    {
      question: "What does it mean to optimize a resume for a job description?",
      answer:
        "It means aligning your resume to one specific posting: mirror must-have keywords where you have real experience, reorder sections recruiters scan first, and rewrite bullets with tools plus outcomes that posting names. The goal is a truthful, posting-specific version—not keyword stuffing.",
    },
    {
      question: "How is AI resume optimization different from a generic resume review?",
      answer:
        "A generic review checks formatting and grammar. AI resume optimization in ResumeAtlas compares your resume text to the job description you paste, surfaces missing keywords and skill gaps for that posting, and suggests tailored bullet rewrites you can edit before download.",
    },
    {
      question: "Can I tailor my resume to multiple job descriptions?",
      answer:
        "Yes. Run a new analysis for each posting. Save a master resume elsewhere; use ResumeAtlas to customize a version per application. Different postings weight different tools even within the same job title.",
    },
    {
      question: "Will optimizing for keywords hurt readability for humans?",
      answer:
        "Only if you add terms without evidence. Good tailoring weaves posting language into bullets that still read naturally: tool + action + metric. ResumeAtlas highlights gaps so you add keywords where you can back them up.",
    },
    {
      question: "Is ResumeAtlas resume optimization free?",
      answer:
        "Analysis, match scoring, gap lists, and edit-in-workbench are free. You can optimize and refine before any paid download step, consistent with other ResumeAtlas tools.",
    },
    {
      question: "Should I use the compare tool or the optimize hub first?",
      answer:
        "Start here if your intent is to tailor or rewrite for a posting. Use the compare resume to job description tool when you want the deepest walkthrough of match score methodology. Both use the same workbench and analysis API.",
    },
  ],
};

export function buildRoleOptimizerPath(slug: string): string {
  return `/${slug}-resume-optimizer`;
}

export {
  ROLE_OPTIMIZER_BY_PATH,
  ROLE_OPTIMIZER_ORDER,
  getRoleOptimizerByPath,
  getRoleOptimizerNeighbors,
  isRoleOptimizerPath,
} from "@/app/lib/roleOptimizer/registry";
