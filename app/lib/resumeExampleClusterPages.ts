import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";
import type { RoleSlug } from "@/app/lib/seoPages";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";

/** Roles with dedicated `/resume-examples/{slug}` pages (high “resume example” demand). Excludes full-stack. */
export type ResumeExampleClusterSlug =
  | "data-analyst"
  | "software-engineer"
  | "product-manager"
  | "data-engineer"
  | "business-analyst"
  | "data-scientist"
  | "machine-learning-engineer"
  | "devops-engineer"
  | "frontend-developer"
  | "backend-developer";

export const RESUME_EXAMPLE_CLUSTER_TIER1: readonly ResumeExampleClusterSlug[] = [
  "data-analyst",
  "software-engineer",
  "product-manager",
  "data-engineer",
  "business-analyst",
];

export const RESUME_EXAMPLE_CLUSTER_TIER2: readonly ResumeExampleClusterSlug[] = [
  "data-scientist",
  "machine-learning-engineer",
  "devops-engineer",
  "frontend-developer",
  "backend-developer",
];

export const RESUME_EXAMPLE_CLUSTER_SLUGS: readonly ResumeExampleClusterSlug[] = [
  ...RESUME_EXAMPLE_CLUSTER_TIER1,
  ...RESUME_EXAMPLE_CLUSTER_TIER2,
];

export function resumeExampleClusterPath(slug: ResumeExampleClusterSlug): string {
  return `/resume-examples/${slug}`;
}

export function isResumeExampleClusterSlug(slug: string): slug is ResumeExampleClusterSlug {
  return (RESUME_EXAMPLE_CLUSTER_SLUGS as readonly string[]).includes(slug);
}

export function isRoleSlugCluster(
  slug: ResumeExampleClusterSlug
): slug is Exclude<ResumeExampleClusterSlug, "data-engineer"> {
  return slug !== "data-engineer";
}

export type AtsDimension = { label: string; score: number; note: string };

export type ResumeSample = {
  name: string;
  headline: string;
  contact: string;
  summary: string;
  skills: string;
  experience: { title: string; company: string; dates: string; bullets: string[] }[];
  projects?: { title: string; context: string; bullets: string[] }[];
  education: string;
  certifications?: string;
};

export type KeywordGroup = { heading: string; terms: string[] };

export type RecruiterSectionReview = {
  section: string;
  verdict: string;
  detail: string;
};

export type ResumeExampleClusterConfig = {
  slug: ResumeExampleClusterSlug;
  roleName: string;
  roleNameLower: string;
  title: string;
  description: string;
  h1: string;
  opening: string;
  whoFor: string[];
  atsSummary: string;
  atsDimensions: AtsDimension[];
  sample: ResumeSample;
  whyItWorks: string[];
  recruiterReview: RecruiterSectionReview[];
  keywordGroups: KeywordGroup[];
  mistakes: string[];
  customizeLevels: { level: string; guidance: string }[];
  faq: { question: string; answer: string }[];
  keywordsPath: string;
  guidePath: string;
  downloadFilename: string;
};

function metaTitle(roleName: string): string {
  return `${roleName} Resume Example (${CONTENT_FRESHNESS_YEAR} ATS-Friendly Sample)${RESUME_ATLAS_TITLE_SUFFIX}`;
}

function keywordsAndGuide(slug: ResumeExampleClusterSlug): { keywordsPath: string; guidePath: string } {
  if (slug === "data-engineer") {
    return {
      keywordsPath: "/data-engineer-resume-keywords",
      guidePath: "/data-engineer-resume-guide",
    };
  }
  return {
    keywordsPath: roleResumeKeywordsPath(slug),
    guidePath: roleResumePillarPath(slug),
  };
}

function baseConfig(
  slug: ResumeExampleClusterSlug,
  roleName: string,
  description: string,
  opening: string,
  whoFor: string[],
  atsSummary: string,
  atsDimensions: AtsDimension[],
  sample: ResumeSample,
  whyItWorks: string[],
  recruiterReview: RecruiterSectionReview[],
  keywordGroups: KeywordGroup[],
  mistakes: string[],
  customizeLevels: { level: string; guidance: string }[],
  faq: { question: string; answer: string }[]
): ResumeExampleClusterConfig {
  const paths = keywordsAndGuide(slug);
  const roleNameLower = roleName.toLowerCase();
  return {
    slug,
    roleName,
    roleNameLower,
    title: metaTitle(roleName),
    description,
    h1: `${roleName} Resume Example (${CONTENT_FRESHNESS_YEAR} ATS-Friendly Sample)`,
    opening,
    whoFor,
    atsSummary,
    atsDimensions,
    sample,
    whyItWorks,
    recruiterReview,
    keywordGroups,
    mistakes,
    customizeLevels,
    faq,
    keywordsPath: paths.keywordsPath,
    guidePath: paths.guidePath,
    downloadFilename: `${slug}-resume-structure.txt`,
  };
}

export const RESUME_EXAMPLE_CLUSTER_PAGES: Record<
  ResumeExampleClusterSlug,
  ResumeExampleClusterConfig
> = {
  "data-analyst": baseConfig(
    "data-analyst",
    "Data Analyst",
    "Data analyst resume example with ATS score breakdown, recruiter review, SQL/Python skills, and a realistic sample you can adapt—not a blank template.",
    "Recruiters spend about six seconds on the first screen of a data analyst resume. They look for SQL and a BI tool named explicitly, bullets that tie analysis to revenue or efficiency, and a layout parsers can read. ATS filters often score keyword overlap before a human opens the file—so the example below is written to pass both machines and a hiring manager skimming for proof.",
    [
      "Analysts applying to product analytics, marketing analytics, or operations roles with SQL + dashboard ownership.",
      "Career switchers who have portfolio projects but need stronger business-outcome framing.",
      "Mid-level ICs targeting postings that mention experimentation, stakeholder communication, or self-serve BI.",
    ],
    "This sample would likely clear initial ATS screens for many mid-level data analyst postings because tools appear in both Skills and Experience, and bullets include metrics. A human reviewer would still check for domain fit (B2B SaaS vs healthcare, etc.).",
    [
      { label: "Keyword match", score: 86, note: "SQL, Python, Tableau, A/B testing appear in context—not only Skills." },
      { label: "Structure", score: 94, note: "Standard headings; single column; no tables/icons." },
      { label: "Impact density", score: 88, note: "Most bullets include %, hours saved, or revenue-adjacent outcomes." },
      { label: "Seniority signal", score: 82, note: "Reads mid-level; could add scope (teams, ARR) for senior roles." },
    ],
    {
      name: "Maya Chen",
      headline: "Data Analyst",
      contact: "Chicago, IL · maya.chen@email.com · (312) 555-0142 · linkedin.com/in/mayachen",
      summary:
        "Data analyst with 4+ years in B2B SaaS turning product and GTM data into decisions. Owns SQL pipelines, Tableau/Looker dashboards, and experiment readouts for growth and finance partners.",
      skills:
        "SQL · Python (pandas) · Tableau · Looker · Excel · A/B testing · dbt (basics) · Snowflake · Stakeholder reporting",
      experience: [
        {
          title: "Data Analyst II",
          company: "Northline Analytics (B2B SaaS)",
          dates: "Mar 2022 – Present",
          bullets: [
            "Built activation funnel dashboards in Tableau used weekly by product and sales leadership, surfacing drop-off at onboarding step 3 that drove a 14% lift in week-1 activation after two shipped experiments.",
            "Wrote SQL models in Snowflake (dbt) for self-serve revenue metrics, cutting ad-hoc finance requests by ~9 hours/week.",
            "Partnered with PMs on A/B tests for pricing page copy; documented guardrail metrics and shipped the variant that increased trial-to-paid conversion by 6% (p<0.05).",
            "Improved event tracking coverage from 71% to 96% with engineering, reducing blind spots in cohort analyses used for retention campaigns.",
          ],
        },
        {
          title: "Data Analyst",
          company: "Harbor Retail Group",
          dates: "Jun 2019 – Feb 2022",
          bullets: [
            "Automated weekly store-performance packs in Python + Excel, saving 12 hours of manual compilation across four regions.",
            "Identified inventory misallocation patterns that informed a pilot reorder policy, reducing stockouts by 11% in test locations.",
          ],
        },
      ],
      projects: [
        {
          title: "Subscription churn post-mortem (internal)",
          context: "Cross-functional analysis · Q3 2024",
          bullets: [
            "Segmented churn by plan, tenure, and feature adoption using SQL; recommended lifecycle emails adopted by marketing.",
          ],
        },
      ],
      education: "B.S. Statistics, University of Illinois Chicago, 2019",
      certifications: "Google Data Analytics Certificate, 2021",
    },
    [
      "Keywords are repeated where Maya actually used them: SQL in modeling bullets, Tableau/Looker in dashboard work, A/B testing in experimentation bullet.",
      "Bullets follow action + method + metric, which is what both ATS rankers and analytics managers scan for.",
      "One page is appropriate; second page would only help with 7+ years of highly relevant work.",
      "Projects section supports career switchers; for senior analysts, replace with larger scope bullets (teams led, ARR influenced).",
    ],
    [
      {
        section: "Summary",
        verdict: "Strong",
        detail: "Names years, domain (B2B SaaS), tools, and stakeholders—no vague “detail-oriented analyst.”",
      },
      {
        section: "Skills",
        verdict: "Good",
        detail: "Readable list; every major skill appears again in Experience. Trim tools Maya cannot discuss in interviews.",
      },
      {
        section: "Experience",
        verdict: "Strong",
        detail: "Quantified outcomes and cross-functional partners. Could add one bullet on data quality or documentation for senior postings.",
      },
      {
        section: "Education",
        verdict: "Fine",
        detail: "Degree aligns with analytics; certification supports non-traditional paths.",
      },
    ],
    [
      {
        heading: "Technical skills",
        terms: ["SQL", "Python", "Statistics", "A/B testing", "Cohort analysis", "Data modeling"],
      },
      {
        heading: "Tools",
        terms: ["Tableau", "Looker", "Excel", "Snowflake", "dbt", "Google Analytics"],
      },
      {
        heading: "Business skills",
        terms: ["Stakeholder management", "Executive reporting", "KPI definition", "Experiment design"],
      },
    ],
    [
      "Listing every BI tool you have touched once—recruiters will probe the one in the job description.",
      "Bullets that only describe tasks (“created dashboards”) without decisions or metrics.",
      "Two-column Canva layouts that break ATS parsing of skills and employers.",
      "Burying SQL-only work at the bottom while the posting leads with warehouse analytics.",
      "Using data scientist keywords (deep learning) for analyst roles without ML ownership.",
      "Giant skills blocks with no proof in Experience.",
      "Omitting experiment or metric language when the JD mentions growth or product analytics.",
      "Same resume for healthcare and fintech without swapping domain keywords.",
    ],
    [
      {
        level: "Entry-level",
        guidance:
          "Lead with internships and academic projects; keep one strong SQL + dashboard project with metrics. One page.",
      },
      {
        level: "Mid-level",
        guidance:
          "Use this structure as-is; swap company context and ensure each bullet has a number.",
      },
      {
        level: "Senior-level",
        guidance:
          "Add scope (teams, revenue influenced, standards you set). Consider a second page only with 8+ years of direct analytics ownership.",
      },
    ],
    [
      {
        question: "What should a data analyst resume example include?",
        answer:
          "A clear summary, SQL and at least one BI tool in skills and bullets, measurable outcomes, and standard headings. This sample shows that pattern.",
      },
      {
        question: "How long should a data analyst resume be?",
        answer:
          "One page for most candidates under ~8 years. Two pages only if every line is relevant and quantified.",
      },
      {
        question: "Is this an ATS-friendly resume format?",
        answer:
          "Yes—single column, standard section names, no graphics in the body text. Copy the structure, not necessarily Maya’s employers.",
      },
      {
        question: "Should I copy these bullets word for word?",
        answer:
          "No. Use the pattern (tool + business outcome). Interviewers will ask follow-ups on any metric you claim.",
      },
      {
        question: "SQL or Python—which matters more on a data analyst resume?",
        answer:
          "Most postings require SQL; Python is increasingly common for analysis. Mirror the job description order.",
      },
      {
        question: "Do I need a projects section?",
        answer:
          "Helpful for entry-level and career switchers. Mid-level candidates can fold projects into Experience if space is tight.",
      },
      {
        question: "How do I tailor this example to one job description?",
        answer:
          "Paste your draft and the posting into ResumeAtlas to see missing keywords, then rewrite bullets with your real work.",
      },
      {
        question: "Tableau or Power BI on a data analyst resume?",
        answer:
          "Use whichever the posting names. If both appear, list both only if you can demo either in an interview.",
      },
    ]
  ),

  "software-engineer": baseConfig(
    "software-engineer",
    "Software Engineer",
    "Software engineer resume example with recruiter section-by-section review, ATS breakdown, and a realistic TypeScript/Node sample—not generic filler.",
    "Engineering managers scan for scope (what you shipped), stack match, and signals you work on a team. ATS systems weight title keywords, languages, frameworks, and cloud terms. The sample below reflects a product engineer at a SaaS company—adjust stack names to match each posting.",
    [
      "Backend-leaning full-stack engineers targeting product companies.",
      "Developers with 3–6 years experience preparing for technical screens and recruiter phone screens.",
      "Candidates who need stronger impact bullets instead of feature lists.",
    ],
    "Strong keyword coverage for general software engineer roles; add Go or Java explicitly if the posting requires them.",
    [
      { label: "Keyword match", score: 84, note: "TypeScript, Node, React, testing, CI mentioned with context." },
      { label: "Structure", score: 95, note: "Clear sections; parse-friendly." },
      { label: "Impact density", score: 85, note: "Includes reliability and product metrics." },
      { label: "Seniority signal", score: 80, note: "Mid-level IC; add design docs/mentorship for senior." },
    ],
    {
      name: "Alex Rivera",
      headline: "Software Engineer",
      contact: "Austin, TX · alex.rivera@email.com · (512) 555-0198 · github.com/arivera-dev",
      summary:
        "Software engineer with 5 years building customer-facing features in TypeScript, React, and Node.js. Focus on reliable delivery, testing, and measurable product outcomes.",
      skills:
        "TypeScript · JavaScript · React · Node.js · PostgreSQL · Redis · AWS (ECS, S3) · Jest · Playwright · Git · REST APIs",
      experience: [
        {
          title: "Software Engineer II",
          company: "Flowpath (workflow SaaS)",
          dates: "Jan 2022 – Present",
          bullets: [
            "Shipped onboarding redesign in React + Node that cut time-to-first-value by 28% for new workspace admins.",
            "Reduced P95 API latency for billing endpoints 35% via query tuning, caching, and connection pool fixes.",
            "Raised unit/integration coverage on payment service from 58% to 86% with Jest and contract tests, lowering payment regressions in production.",
            "Led migration of legacy Express routes to typed handlers; decreased production TypeErrors reported in Sentry by 40% quarter-over-quarter.",
          ],
        },
        {
          title: "Software Engineer",
          company: "Brightline Health Tech",
          dates: "Jul 2019 – Dec 2021",
          bullets: [
            "Built patient scheduling APIs consumed by mobile and web clients (~2M requests/day).",
            "Participated in on-call rotation; authored runbooks that cut MTTR for Sev-2 incidents from 90 to 45 minutes.",
          ],
        },
      ],
      education: "B.S. Computer Science, UT Austin, 2019",
    },
    [
      "Stack appears in Skills and in bullets—critical for ATS and for engineering managers.",
      "Outcomes mix user metrics (activation) and engineering metrics (latency, coverage)—both matter in product eng hiring.",
      "GitHub link is appropriate for SWE; skip for non-technical roles.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Years, stack, and product focus in three lines." },
      { section: "Skills", verdict: "Good", detail: "Grouped logically; verify every item is interview-deep." },
      { section: "Experience", verdict: "Strong", detail: "Shows ownership and reliability, not only feature delivery." },
      { section: "Education", verdict: "Fine", detail: "CS degree matches typical filters for SWE roles." },
    ],
    [
      { heading: "Technical skills", terms: ["TypeScript", "Algorithms", "System design", "API design", "Testing"] },
      { heading: "Tools", terms: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "GitHub Actions"] },
      { heading: "Platforms", terms: ["AWS ECS", "S3", "Linux", "CI/CD"] },
      { heading: "Collaboration", terms: ["Code review", "Agile", "On-call", "Technical documentation"] },
    ],
    [
      "Listing 30 languages/frameworks without production depth.",
      "Bullets that say “worked on microservices” with no scale or outcome.",
      "Omitting testing or code review when the JD emphasizes quality.",
      "Resume PDFs with multi-column skill grids.",
      "Claiming “full stack” but showing only frontend chores.",
      "No link between your work and product or business metrics.",
      "Copy-pasting job description buzzwords into Skills with no Experience proof.",
      "Hiding employment gaps without a short project or contract line.",
    ],
    [
      { level: "Entry-level", guidance: "Emphasize internships, OSS, and class projects with deploy links; keep stack focused." },
      { level: "Mid-level", guidance: "Mirror this bullet depth; add system design scope if you led migrations." },
      { level: "Senior-level", guidance: "Add mentorship, cross-team design, and reliability leadership." },
    ],
    [
      {
        question: "What makes a good software engineer resume example?",
        answer: "Clear stack, shipped outcomes, testing/on-call signals, and parse-friendly formatting.",
      },
      {
        question: "Should I list every programming language?",
        answer: "List languages you can whiteboard in. Lead with the posting’s primary stack.",
      },
      {
        question: "One page or two for software engineers?",
        answer: "One page through mid-level; two only if senior with substantial relevant impact.",
      },
      {
        question: "Do I need a projects section?",
        answer: "Optional if Experience is strong; valuable for bootcamp grads and career switchers.",
      },
      {
        question: "How important are metrics on engineering resumes?",
        answer: "Very—latency, adoption, error rates, and coverage are credible engineering outcomes.",
      },
      {
        question: "Should I include GitHub?",
        answer: "Yes if repos are maintained and relevant; otherwise link one strong project.",
      },
      {
        question: "How do I pass ATS as a software engineer?",
        answer: "Match job title keywords and stack terms in Experience bullets, not only Skills.",
      },
      {
        question: "Can I use this sample for backend-only roles?",
        answer: "Yes—de-emphasize React bullets and expand API/database depth to match the posting.",
      },
    ]
  ),

  "product-manager": baseConfig(
    "product-manager",
    "Product Manager",
    "Product manager resume example with metrics-first bullets, recruiter review, and ATS breakdown for B2B SaaS PM hiring.",
    "Hiring managers want outcomes (revenue, retention, adoption), discovery/process fluency, and clarity. ATS looks for product manager title variants, Agile language, and tools like Jira or Amplitude. This sample targets B2B SaaS platform PM roles.",
    [
      "Associate to senior PMs moving from project management into product ownership.",
      "PMs who have shipped features but weak metric storytelling.",
      "Candidates applying to roles emphasizing roadmaps, discovery, and cross-functional leadership.",
    ],
    "Reads PM, not project coordinator—metrics and discovery verbs throughout.",
    [
      { label: "Keyword match", score: 85, note: "Roadmap, discovery, KPIs, Agile present." },
      { label: "Structure", score: 93, note: "Clean; easy to skim." },
      { label: "Impact density", score: 90, note: "Revenue and adoption metrics included." },
      { label: "Seniority signal", score: 84, note: "Senior-leaning IC PM." },
    ],
    {
      name: "Jordan Kim",
      headline: "Senior Product Manager",
      contact: "Seattle, WA · jordan.kim@email.com · (206) 555-0167",
      summary:
        "Product manager with 7 years in B2B SaaS owning discovery through launch. Partners with design and engineering to ship measurable outcomes for admins and revenue teams.",
      skills:
        "Product discovery · Roadmapping · PRDs · User research · A/B testing · SQL (analysis) · Figma · Jira · Amplitude · Stakeholder alignment",
      experience: [
        {
          title: "Senior Product Manager",
          company: "Ledgerly (AP automation)",
          dates: "Apr 2021 – Present",
          bullets: [
            "Owned roadmap for invoice automation used by 2,400+ finance teams; features shipped in 2024 contributed to 18% expansion revenue YoY.",
            "Ran 24 discovery interviews/quarter with controllers and AP clerks; prioritized backlog that reduced time-to-close invoices by 22%.",
            "Defined success metrics and experiment plan for pricing packaging test; winning variant increased ARPU 9% without increasing churn.",
            "Aligned sales, CS, and engineering on quarterly OKRs; improved on-time delivery from 74% to 91% of committed roadmap items.",
          ],
        },
        {
          title: "Product Manager",
          company: "Northwind Tools",
          dates: "Jun 2018 – Mar 2021",
          bullets: [
            "Launched mobile approvals MVP that grew weekly active finance users by 31% in six months.",
            "Introduced lightweight PRD template adopted by three PMs, reducing rework in engineering handoff.",
          ],
        },
      ],
      education: "MBA, Foster School of Business, UW, 2018 · B.A. Economics, 2013",
    },
    [
      "Uses PM vocabulary in context: discovery, roadmap, OKRs, expansion revenue.",
      "Shows cross-functional leadership without saying “communication skills” generically.",
      "SQL listed for analysis credibility—common for data-informed PMs.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Seniority and domain clear in first lines." },
      { section: "Skills", verdict: "Good", detail: "Mix of process and tools; trim items you cannot discuss." },
      { section: "Experience", verdict: "Strong", detail: "Revenue and adoption metrics; discovery cadence." },
      { section: "Education", verdict: "Good", detail: "MBA supports senior PM filters at some firms." },
    ],
    [
      { heading: "Technical skills", terms: ["Product discovery", "Prioritization", "OKRs", "A/B testing", "SQL"] },
      { heading: "Tools", terms: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel"] },
      { heading: "Business skills", terms: ["Roadmapping", "Go-to-market", "Stakeholder management", "Pricing"] },
    ],
    [
      "Feature lists without problems solved or metrics.",
      "Calling yourself “CEO of the product” without scope or outcomes.",
      "Hiding collaboration—PM resumes must show engineering and design partnership.",
      "Keyword stuffing Agile terms with no delivery evidence.",
      "One resume for B2C and B2B without adjusting domain language.",
      "Omitting revenue/retention metrics when applying to growth PM roles.",
      "Two-page resumes filled with every side project.",
      "Using technical jargon you cannot explain in a screening call.",
    ],
    [
      { level: "Associate PM", guidance: "Highlight shipped features, user research, and one metric per bullet." },
      { level: "Senior PM", guidance: "Use this sample’s outcome density; add portfolio company scale (ARR, users)." },
      { level: "Director-track", guidance: "Add team leadership, portfolio tradeoffs, and executive communication examples." },
    ],
    [
      { question: "What should a product manager resume example show?", answer: "Outcomes, discovery, roadmap ownership, and cross-functional delivery—not task lists." },
      { question: "Do PMs need technical skills on a resume?", answer: "Often SQL, analytics tools, or APIs are mentioned—include only what you use." },
      { question: "How long should a PM resume be?", answer: "One page is standard until director-level with long tenure." },
      { question: "Should I include an MBA?", answer: "Include it if you have it; many PMs are hired without MBA." },
      { question: "Can I use this for technical PM roles?", answer: "Yes—add API/platform keywords from the posting in Skills and bullets." },
      { question: "How do I show discovery work?", answer: "Name interviews, synthesis, and decisions changed—not only shipped features." },
      { question: "What metrics matter for PM resumes?", answer: "Revenue, adoption, retention, efficiency, and on-time delivery are strong." },
      { question: "How do I tailor to one JD?", answer: "Use ResumeAtlas to compare your resume to the posting for missing themes." },
    ]
  ),

  "data-engineer": baseConfig(
    "data-engineer",
    "Data Engineer",
    "Data engineer resume example with pipeline-focused sample, ATS breakdown, and recruiter review for Spark/SQL/warehouse roles.",
    "Data engineer hiring managers scan for orchestration, warehouse platforms, and reliability outcomes—not only “ETL” in a skills list. This sample reflects batch + cloud warehouse work typical of mid-level DE postings.",
    [
      "Analysts moving into data engineering with SQL depth.",
      "Engineers targeting Spark, Airflow, Snowflake, or Databricks postings.",
      "Candidates who need proof of data quality and SLA ownership.",
    ],
    "Aligned to data engineer JD keyword patterns; less ideal for pure analytics roles.",
    [
      { label: "Keyword match", score: 87, note: "Spark, Airflow, Snowflake, ETL in bullets." },
      { label: "Structure", score: 94, note: "Parse-friendly layout." },
      { label: "Impact density", score: 86, note: "Runtime, cost, freshness metrics." },
      { label: "Seniority signal", score: 83, note: "Mid-level pipeline owner." },
    ],
    {
      name: "Priya Nair",
      headline: "Data Engineer",
      contact: "Denver, CO · priya.nair@email.com · (303) 555-0133",
      summary:
        "Data engineer with 5 years building batch and near-real-time pipelines on AWS and Snowflake. Focus on reliable SLAs, data quality, and cost-aware modeling.",
      skills:
        "Python · PySpark · SQL · Airflow · dbt · Snowflake · AWS (S3, Glue) · Kafka · Terraform · Great Expectations",
      experience: [
        {
          title: "Data Engineer II",
          company: "StreamVault Media",
          dates: "Feb 2022 – Present",
          bullets: [
            "Built PySpark jobs processing 1.8B events/day into Snowflake marts, cutting batch runtime from 3.1h to 55m via partitioning and file compaction.",
            "Owned Airflow DAGs for core revenue pipelines; improved on-time freshness from 92% to 99.4% over two quarters.",
            "Implemented data quality checks with Great Expectations on critical facts, preventing two P1 incidents tied to null keys.",
            "Reduced Snowflake spend 26% through warehouse right-sizing and clustering keys on top spend queries.",
          ],
        },
        {
          title: "Data Engineer",
          company: "HealthCore Analytics",
          dates: "Aug 2019 – Jan 2022",
          bullets: [
            "Migrated on-prem SQL Server ETL to AWS Glue + S3 landing zone with documented lineage for compliance reviewers.",
            "Partnered with analytics on star-schema models used by 80+ Looker users.",
          ],
        },
      ],
      education: "B.S. Computer Engineering, CU Boulder, 2019",
      certifications: "AWS Certified Data Engineer – Associate, 2023",
    },
    [
      "Pipeline verbs and platforms appear together—how ATS and DE managers evaluate fit.",
      "Cost and SLA metrics mirror real DE performance reviews.",
      "Certification supports filtered reqs without crowding the page.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Batch + cloud + reliability in opening." },
      { section: "Skills", verdict: "Good", detail: "DE stack clustered; drop tools you only used once." },
      { section: "Experience", verdict: "Strong", detail: "Scale, runtime, cost—credible DE bullets." },
      { section: "Education", verdict: "Fine", detail: "Engineering degree fits many DE filters." },
    ],
    [
      { heading: "Technical skills", terms: ["ETL", "ELT", "Data modeling", "Distributed systems", "SQL tuning"] },
      { heading: "Tools", terms: ["Apache Spark", "Airflow", "dbt", "Kafka", "Terraform"] },
      { heading: "Platforms", terms: ["Snowflake", "AWS S3", "AWS Glue", "Delta Lake"] },
    ],
    [
      "Listing Spark without volume or runtime context.",
      "Using analyst dashboard keywords for a pipeline role.",
      "No orchestration tool when the JD requires Airflow/Dagster.",
      "Ignoring data quality and incident language for production DE teams.",
      "Claiming Kafka without consumer/producer detail.",
      "Omitting cloud provider alignment (AWS vs GCP).",
      "Skills-only resume with no pipeline ownership bullets.",
      "Copying DE buzzwords from a bootcamp list with no job proof.",
    ],
    [
      { level: "Entry-level", guidance: "Highlight SQL + one end-to-end pipeline project with volumes." },
      { level: "Mid-level", guidance: "Match this structure; emphasize SLAs and cost you influenced." },
      { level: "Senior-level", guidance: "Add architecture decisions, mentoring, and multi-team standards." },
    ],
    [
      { question: "What should a data engineer resume example include?", answer: "Orchestration, compute, warehouse, and reliability metrics in bullets." },
      { question: "Is this different from a data analyst example?", answer: "Yes—DE emphasizes pipelines and platform reliability, not dashboard delivery." },
      { question: "Should I list Spark on every DE resume?", answer: "Only if you ran Spark jobs with credible scale or optimization story." },
      { question: "How do I show Airflow experience?", answer: "Mention DAG count, SLAs, failures prevented—not only the logo." },
      { question: "One page for data engineers?", answer: "Usually yes for under ~8 years unless senior with major platform scope." },
      { question: "Do certifications help?", answer: "AWS/Databricks certs can match filters; list if earned." },
      { question: "How do I tailor to a Snowflake JD?", answer: "Mirror Snowflake-specific terms and mirror warehouse outcomes from your work." },
      { question: "Can analysts use this example?", answer: "Only when applying to DE roles; otherwise use the data analyst example page." },
    ]
  ),

  "business-analyst": baseConfig(
    "business-analyst",
    "Business Analyst",
    "Business analyst resume example with requirements-focused sample, ATS notes, and recruiter review for Agile BA roles.",
    "BA hiring looks for requirements artifacts, process improvement, and stakeholder work with traceable outcomes. ATS weights Business Analyst title, Agile, SQL/Visio/Jira, and domain keywords.",
    [
      "BAs in finance, operations, or product teams preparing for Agile ceremonies.",
      "Candidates moving from operations into formal BA roles.",
      "Consultants needing a credible one-page sample structure.",
    ],
    "Strong fit for BA postings; swap finance domain terms for healthcare or supply chain as needed.",
    [
      { label: "Keyword match", score: 84, note: "Requirements, Agile, SQL, Power BI in context." },
      { label: "Structure", score: 92, note: "Skimmable sections." },
      { label: "Impact density", score: 87, note: "Hours saved, error reduction, adoption." },
      { label: "Seniority signal", score: 81, note: "Mid-level BA." },
    ],
    {
      name: "Elena Vasquez",
      headline: "Business Analyst",
      contact: "Charlotte, NC · elena.vasquez@email.com · (704) 555-0181",
      summary:
        "Business analyst with 5 years translating operations problems into requirements, user stories, and measurable process improvements in regulated fintech.",
      skills:
        "Requirements elicitation · User stories · BPMN · SQL · Power BI · Jira · Confluence · UAT · Process mapping · Stakeholder workshops",
      experience: [
        {
          title: "Business Analyst II",
          company: "Crescent Pay (fintech)",
          dates: "May 2021 – Present",
          bullets: [
            "Facilitated workshops with compliance, ops, and engineering to define wire-transfer exception handling; reduced manual review queue by 34%.",
            "Authored 120+ user stories with acceptance criteria for two squads, improving sprint predictability from 68% to 89% committed items delivered.",
            "Built Power BI dashboards for operations SLAs adopted by team leads in three regions.",
            "Led UAT for KYC rule changes with traceable test cases; zero critical defects at production launch.",
          ],
        },
        {
          title: "Business Analyst",
          company: "Metro Logistics",
          dates: "Jun 2018 – Apr 2021",
          bullets: [
            "Mapped order-to-cash process gaps; recommended automation saving ~900 analyst hours annually.",
          ],
        },
      ],
      education: "B.B.A. Information Systems, UNC Charlotte, 2018",
      certifications: "Certified Scrum Master (CSM), 2022",
    },
    [
      "Shows BA deliverables (stories, UAT, workshops) recruiters expect.",
      "Regulated industry context without drowning in jargon.",
      "SQL + Power BI signal data-informed BA, common in modern postings.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Domain + BA artifacts named upfront." },
      { section: "Skills", verdict: "Good", detail: "Process and tools balanced." },
      { section: "Experience", verdict: "Strong", detail: "Workshop → story → UAT chain visible." },
      { section: "Education", verdict: "Fine", detail: "IS degree supports BA filters." },
    ],
    [
      { heading: "Technical skills", terms: ["Requirements", "Process modeling", "SQL", "UAT", "Agile"] },
      { heading: "Tools", terms: ["Jira", "Confluence", "Power BI", "Visio", "Lucidchart"] },
      { heading: "Business skills", terms: ["Stakeholder management", "Change management", "Workshop facilitation"] },
    ],
    [
      "Saying “gathered requirements” with no artifact or outcome.",
      "Confusing BA with project manager titles without delivery proof.",
      "Listing Scrum terms with no squad outcomes.",
      "Omitting tools the JD names in the first screen.",
      "Using BSA/systems keywords for a classic BA role.",
      "Dense paragraphs recruiters will not read.",
      "No metrics on process improvements.",
      "Applying with a generic resume across unrelated industries.",
    ],
    [
      { level: "Junior BA", guidance: "Emphasize internships, shadowing, and one end-to-end story with UAT." },
      { level: "Mid-level", guidance: "Keep metrics on process and delivery; align domain to posting." },
      { level: "Senior BA", guidance: "Add standards, cross-team facilitation, and complex program scope." },
    ],
    [
      { question: "What should a business analyst resume example include?", answer: "Requirements work, process outcomes, tools, and stakeholder context." },
      { question: "Is SQL required for business analysts?", answer: "Often yes for analysis-heavy BA roles; mirror the posting." },
      { question: "BA vs business systems analyst?", answer: "Use BSA pages when the title says BSA; this sample is classic BA." },
      { question: "Should I list CSM or CBAP?", answer: "Include credentials you hold; skip planned-only certs." },
      { question: "How long should a BA resume be?", answer: "One page for most candidates through senior BA." },
      { question: "Can I use this in consulting?", answer: "Yes—add client industries and engagement outcomes if allowed." },
      { question: "How do I pass ATS?", answer: "Match title variants and tool names from the JD in Experience." },
      { question: "How do I customize per JD?", answer: "Scan the posting for domain and artifact keywords, then compare with ResumeAtlas." },
    ]
  ),

  "data-scientist": baseConfig(
    "data-scientist",
    "Data Scientist",
    "Data scientist resume example with experimentation and ML deployment signals, recruiter review, and ATS breakdown.",
    "DS hiring managers look for experimentation, modeling judgment, and communication. This sample balances technical depth with business outcomes.",
    [
      "Scientists targeting product analytics or applied ML roles.",
      "PhDs and masters graduates entering industry roles.",
      "Analysts upskilling into modeling-heavy positions.",
    ],
    "Strong for data scientist titles; trim ML jargon for analyst postings.",
    [
      { label: "Keyword match", score: 85, note: "Python, SQL, experimentation, ML deployment." },
      { label: "Structure", score: 93, note: "Clear sections." },
      { label: "Impact density", score: 88, note: "Retention and revenue-adjacent metrics." },
      { label: "Seniority signal", score: 83, note: "Mid-level scientist." },
    ],
    {
      name: "Sam Okonkwo",
      headline: "Data Scientist",
      contact: "Boston, MA · sam.okonkwo@email.com · (617) 555-0174",
      summary:
        "Data scientist with 6 years designing experiments and production models in Python. Partners with product and engineering on measurable growth and retention outcomes.",
      skills:
        "Python · SQL · scikit-learn · XGBoost · Experiment design · Causal inference (intro) · AWS SageMaker · Git · Stakeholder communication",
      experience: [
        {
          title: "Data Scientist",
          company: "Helix Learning",
          dates: "Mar 2021 – Present",
          bullets: [
            "Designed A/B tests on onboarding that increased day-7 retention 5.2% with pre-registered metrics and exec-ready readouts.",
            "Shipped churn model (XGBoost) into batch scoring on AWS; precision@100 improved targeting efficiency 18% for lifecycle campaigns.",
            "Built feature store documentation adopted by engineering, reducing duplicate feature work across two teams.",
          ],
        },
        {
          title: "Associate Data Scientist",
          company: "RetailIQ",
          dates: "Jul 2018 – Feb 2021",
          bullets: [
            "Forecasted promotional lift with time-series models, improving inventory allocation and reducing waste 7% in pilot regions.",
          ],
        },
      ],
      education: "M.S. Statistics, Boston University, 2018 · B.S. Mathematics, 2016",
    },
    [
      "Shows experimentation discipline—not only model accuracy bragging.",
      "Deployment and documentation bullets help for product-facing DS teams.",
      "Education signals quantitative rigor recruiters expect.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Experiment + production angle clear." },
      { section: "Skills", verdict: "Good", detail: "Right-sized ML stack." },
      { section: "Experience", verdict: "Strong", detail: "Business metrics anchor models." },
      { section: "Education", verdict: "Strong", detail: "MS stats fits many DS filters." },
    ],
    [
      { heading: "Technical skills", terms: ["Machine learning", "Statistics", "Experimentation", "Feature engineering"] },
      { heading: "Tools", terms: ["Python", "SQL", "scikit-learn", "Jupyter", "Airflow"] },
      { heading: "Business skills", terms: ["Stakeholder readouts", "Metric design", "Product analytics"] },
    ],
    [
      "Listing every Kaggle technique without production use.",
      "No experiment or causality language for product DS roles.",
      "Burying SQL—the workhorse skill for most DS jobs.",
      "Resume reads like a research CV with no business outcomes.",
      "Claiming deep learning without GPU/project context.",
      "Omitting communication and cross-functional bullets.",
      "Using DE-only keywords for a scientist posting.",
      "One resume for DS and MLE without tailoring.",
    ],
    [
      { level: "Entry-level", guidance: "Lead with thesis/internship projects with clear metrics." },
      { level: "Mid-level", guidance: "Balance modeling and experimentation stories." },
      { level: "Senior", guidance: "Add roadmap influence, mentorship, and metric strategy." },
    ],
    [
      { question: "What should a data scientist resume example show?", answer: "Experiments, models tied to decisions, SQL/Python, and communication." },
      { question: "Do I need a publications section?", answer: "Optional for industry roles; required for some research labs." },
      { question: "How long should a data scientist resume be?", answer: "One page for most industry roles under ~10 years." },
      { question: "Should I list deep learning?", answer: "Only with projects you can explain end-to-end." },
      { question: "How is this different from ML engineer?", answer: "More experimentation/insights; MLE sample stresses deployment/SRE." },
      { question: "Can I use this for analyst roles?", answer: "Trim ML; use the data analyst example instead." },
      { question: "How do I pass ATS?", answer: "Mirror posting keywords in bullets with outcomes." },
      { question: "How do I tailor quickly?", answer: "Use ResumeAtlas JD comparison for gap terms." },
    ]
  ),

  "machine-learning-engineer": baseConfig(
    "machine-learning-engineer",
    "Machine Learning Engineer",
    "Machine learning engineer resume example focused on deployment, monitoring, and production ML—not notebook-only work.",
    "MLE recruiters scan for Python, ML frameworks, and production ownership (APIs, monitoring, feature pipelines).",
    [
      "Scientists moving into deployment-heavy roles.",
      "Software engineers specializing in ML platform work.",
      "Candidates targeting postings with MLOps vocabulary.",
    ],
    "Optimized for MLE titles; use data scientist example for research-heavy roles.",
    [
      { label: "Keyword match", score: 86, note: "Python, PyTorch/sklearn, AWS, monitoring." },
      { label: "Structure", score: 94, note: "ATS-safe." },
      { label: "Impact density", score: 87, note: "Latency, drift, reliability." },
      { label: "Seniority signal", score: 82, note: "Mid-level MLE." },
    ],
    {
      name: "Rina Patel",
      headline: "Machine Learning Engineer",
      contact: "San Jose, CA · rina.patel@email.com · (408) 555-0155",
      summary:
        "MLE with 4 years shipping models to production on AWS. Focus on reliable inference, feature pipelines, and partnership with data engineering.",
      skills:
        "Python · PyTorch · scikit-learn · FastAPI · Docker · Kubernetes · AWS · MLflow · Feature stores · Model monitoring",
      experience: [
        {
          title: "Machine Learning Engineer II",
          company: "CartSense AI",
          dates: "Jan 2022 – Present",
          bullets: [
            "Deployed real-time recommendation service (FastAPI + K8s) serving 12k RPS P95 at 120ms after batch feature precompute optimizations.",
            "Built training pipelines in MLflow with automated eval gates, cutting bad releases caught only in prod by 60%.",
            "Partnered with DE on daily feature freshness SLAs; reduced training-serving skew incidents from 4/quarter to 0 for two quarters.",
          ],
        },
        {
          title: "ML Engineer",
          company: "AgriVision Labs",
          dates: "Jun 2019 – Dec 2021",
          bullets: [
            "Containerized batch scoring jobs on ECS for crop imagery models used in three regions.",
          ],
        },
      ],
      education: "M.S. Computer Science (ML), SJSU, 2019",
    },
    [
      "Production language throughout—differentiates from notebook-only DS resumes.",
      "Serving and monitoring metrics speak to MLE interview loops.",
      "Collaboration with DE shows realistic org structure.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Production-first positioning." },
      { section: "Skills", verdict: "Good", detail: "Serving + training stack coherent." },
      { section: "Experience", verdict: "Strong", detail: "Scale and reliability present." },
      { section: "Education", verdict: "Good", detail: "MS CS common for MLE." },
    ],
    [
      { heading: "Technical skills", terms: ["Model deployment", "Feature engineering", "Model evaluation", "MLOps"] },
      { heading: "Tools", terms: ["PyTorch", "Docker", "Kubernetes", "MLflow", "Airflow"] },
      { heading: "Platforms", terms: ["AWS ECS", "S3", "SageMaker"] },
    ],
    [
      "Listing frameworks without serving or monitoring story.",
      "Treating MLE resume like a research publication list.",
      "No scale numbers on inference or training data.",
      "Ignoring collaboration with DE/platform teams.",
      "Omitting Python packaging/API keywords.",
      "Claiming MLOps without CI/CD or versioning detail.",
      "Using scientist-only language for engineer roles.",
      "Skills block of 40 buzzwords.",
    ],
    [
      { level: "Junior MLE", guidance: "Highlight one deployed model with API or batch scoring metrics." },
      { level: "Mid-level", guidance: "Emphasize monitoring, SLAs, and release process." },
      { level: "Senior", guidance: "Add platform standards, cost, and multi-team governance." },
    ],
    [
      { question: "What should an ML engineer resume example include?", answer: "Training, deployment, monitoring, and scale metrics." },
      { question: "MLE vs data scientist resume?", answer: "MLE stresses production; scientist stresses experiments/insights." },
      { question: "Do I need Kubernetes?", answer: "Include if the JD mentions K8s or large-scale serving." },
      { question: "Should I list research papers?", answer: "Optional unless applying to research labs." },
      { question: "How long should an MLE resume be?", answer: "One page for most candidates under senior MLE." },
      { question: "How do I show MLOps?", answer: "Name MLflow, CI gates, versioning, and incident reductions." },
      { question: "Can I use this for data engineer roles?", answer: "No—use the data engineer example for pipeline roles." },
      { question: "How do I tailor a posting?", answer: "Compare your resume to the JD with ResumeAtlas." },
    ]
  ),

  "devops-engineer": baseConfig(
    "devops-engineer",
    "DevOps Engineer",
    "DevOps engineer resume example with CI/CD, Kubernetes, and reliability metrics—recruiter-reviewed sample.",
    "DevOps hiring prioritizes automation, cloud platforms, incident response, and measurable reliability improvements.",
    [
      "SRE-adjacent DevOps engineers.",
      "Sysadmins moving into cloud-native roles.",
      "Platform engineers supporting product teams.",
    ],
    "Matches DevOps/SRE keyword clusters well.",
    [
      { label: "Keyword match", score: 88, note: "K8s, Terraform, CI/CD, observability." },
      { label: "Structure", score: 95, note: "Clean scan." },
      { label: "Impact density", score: 89, note: "MTTR, deploy time, uptime." },
      { label: "Seniority signal", score: 82, note: "Mid-level." },
    ],
    {
      name: "Marcus Lee",
      headline: "DevOps Engineer",
      contact: "Portland, OR · marcus.lee@email.com · (503) 555-0129",
      summary:
        "DevOps engineer with 6 years building CI/CD, Kubernetes platforms, and observability stacks on AWS. Focus on safe, fast delivery for product engineering.",
      skills:
        "Kubernetes · Terraform · AWS · GitHub Actions · Docker · Prometheus · Grafana · Linux · Python (automation) · Helm · ArgoCD",
      experience: [
        {
          title: "DevOps Engineer II",
          company: "Relay Commerce",
          dates: "Aug 2021 – Present",
          bullets: [
            "Maintained EKS clusters for 40+ microservices; standardized Helm charts cutting deploy failures 45% QoQ.",
            "Built GitHub Actions pipelines with security scans, reducing average lead time for changes from 3 days to 8 hours.",
            "Implemented SLO dashboards and paging policies; lowered MTTR for Sev-2 incidents from 75 to 38 minutes.",
            "Drove Terraform module library adopted by four teams, improving audit pass rate for infrastructure changes.",
          ],
        },
        {
          title: "Systems Engineer",
          company: "Cascade Networks",
          dates: "May 2018 – Jul 2021",
          bullets: [
            "Migrated Jenkins pipelines to Actions + container builds for legacy Java services.",
          ],
        },
      ],
      education: "B.S. Information Technology, Oregon State, 2018",
      certifications: "CKA (Kubernetes Administrator), 2023",
    },
    [
      "Reliability metrics are the currency of DevOps interviews.",
      "Platform adoption (Helm library) shows influence beyond ticket work.",
      "Certification supports filtered enterprise roles.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Platform + reliability focus." },
      { section: "Skills", verdict: "Good", detail: "Cloud-native cluster clear." },
      { section: "Experience", verdict: "Strong", detail: "SLO/MTTR/deploy frequency trifecta." },
      { section: "Education", verdict: "Fine", detail: "IT degree acceptable for many DevOps roles." },
    ],
    [
      { heading: "Technical skills", terms: ["CI/CD", "Infrastructure as code", "Observability", "Linux administration"] },
      { heading: "Tools", terms: ["Kubernetes", "Terraform", "Docker", "Prometheus", "Grafana", "ArgoCD"] },
      { heading: "Platforms", terms: ["AWS EKS", "EC2", "IAM", "VPC networking"] },
    ],
    [
      "Listing Kubernetes without cluster scale or outcomes.",
      "Saying “CI/CD” with no tooling or frequency metrics.",
      "Ignoring on-call/incident language for 24/7 platforms.",
      "Claiming Terraform without module/audit context.",
      "Omitting collaboration with security/compliance.",
      "Resume as a tool dump without projects.",
      "Using developer feature bullets for DevOps roles.",
      "No cloud provider alignment.",
    ],
    [
      { level: "Junior", guidance: "Highlight homelab/K8s projects and internships with automation scripts." },
      { level: "Mid-level", guidance: "Use reliability metrics prominently." },
      { level: "Senior", guidance: "Add platform strategy, cost optimization, and standards leadership." },
    ],
    [
      { question: "What should a DevOps resume example show?", answer: "CI/CD, IaC, observability, and incident metrics." },
      { question: "DevOps vs SRE resume?", answer: "SRE emphasizes SLOs/error budgets; DevOps emphasizes delivery pipelines—overlap is fine." },
      { question: "Do I need CKA?", answer: "Helpful when listed in JD; include if you have it." },
      { question: "Should I list every cloud?", answer: "Lead with the posting’s cloud." },
      { question: "How long should a DevOps resume be?", answer: "One page is typical through mid-level." },
      { question: "Can sysadmins use this?", answer: "Yes—translate tickets into automation outcomes." },
      { question: "How do I pass ATS?", answer: "Mirror exact tool names from the JD in Experience." },
      { question: "How do I tailor?", answer: "Compare resume vs JD in ResumeAtlas for missing platform terms." },
    ]
  ),

  "frontend-developer": baseConfig(
    "frontend-developer",
    "Frontend Developer",
    "Frontend developer resume example with React/TypeScript sample, accessibility and performance signals, recruiter review.",
    "Frontend hiring managers scan for framework match, UX collaboration, and quality (a11y, performance, testing).",
    [
      "React/TypeScript engineers targeting product companies.",
      "UI engineers moving from agencies to in-house product.",
      "Developers who need metric-backed bullets beyond “built UI.”",
    ],
    "Strong for React-heavy postings; swap Next.js/Vue terms per JD.",
    [
      { label: "Keyword match", score: 86, note: "React, TS, a11y, testing." },
      { label: "Structure", score: 94, note: "Clean layout." },
      { label: "Impact density", score: 85, note: "Core Web Vitals, conversion." },
      { label: "Seniority signal", score: 80, note: "Mid-level FE." },
    ],
    {
      name: "Taylor Brooks",
      headline: "Frontend Developer",
      contact: "Brooklyn, NY · taylor.brooks@email.com · (718) 555-0163 · taylorbrooks.dev",
      summary:
        "Frontend developer with 4 years building accessible React interfaces in TypeScript. Partners with design and backend on performance and reliable releases.",
      skills:
        "TypeScript · React · Next.js · HTML/CSS · Accessibility (WCAG) · Jest · React Testing Library · Figma handoff · Web performance",
      experience: [
        {
          title: "Frontend Developer II",
          company: "Lumen EdTech",
          dates: "Sep 2021 – Present",
          bullets: [
            "Rebuilt course player in React/Next.js improving LCP from 4.2s to 2.1s on mobile for top markets.",
            "Fixed 40+ a11y issues (keyboard, contrast, labels) to meet WCAG 2.1 AA for district contracts.",
            "Introduced component tests with RTL + Jest, reducing UI regressions caught in QA by 30%.",
            "Shipped design-system tokens with design team, cutting UI implementation time ~20% on new features.",
          ],
        },
        {
          title: "Frontend Developer",
          company: "Studio North Agency",
          dates: "Jun 2019 – Aug 2021",
          bullets: [
            "Delivered marketing sites with measurable conversion lifts up to 11% for two retail clients.",
          ],
        },
      ],
      education: "B.F.A. Design & Technology, Parsons, 2019",
    },
    [
      "Performance and a11y differentiate this from generic “built React app” resumes.",
      "Design-system work signals mature product engineering.",
      "Portfolio link appropriate for frontend.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "Framework + quality focus." },
      { section: "Skills", verdict: "Good", detail: "Matches modern FE stack." },
      { section: "Experience", verdict: "Strong", detail: "Metrics + collaboration." },
      { section: "Education", verdict: "Fine", detail: "Design-tech degree fits UI engineering." },
    ],
    [
      { heading: "Technical skills", terms: ["React", "TypeScript", "Responsive design", "Accessibility", "State management"] },
      { heading: "Tools", terms: ["Next.js", "Jest", "Webpack", "Figma", "Storybook"] },
      { heading: "Performance", terms: ["Core Web Vitals", "Lighthouse", "Bundle optimization"] },
    ],
    [
      "Listing React without TypeScript when the JD requires TS.",
      "Ignoring accessibility for regulated or ed/public sector clients.",
      "No testing keywords while claiming quality focus.",
      "Image-only portfolios with no parseable text in the resume file.",
      "Claiming full stack without backend depth.",
      "Bullets that only say “implemented designs.”",
      "Omitting performance metrics.",
      "30 npm packages listed with no usage proof.",
    ],
    [
      { level: "Junior", guidance: "Portfolio + 1–2 shipped projects with metrics." },
      { level: "Mid-level", guidance: "Keep a11y/perf bullets; align framework to JD." },
      { level: "Senior", guidance: "Add design system leadership and mentorship." },
    ],
    [
      { question: "What should a frontend developer resume example include?", answer: "Framework, quality, collaboration, and metrics." },
      { question: "Should I list design skills?", answer: "List Figma/handoff if you do implementation—not only visual design." },
      { question: "Is a portfolio required?", answer: "Strongly recommended; link it in contact line." },
      { question: "React or Next.js?", answer: "Use what the posting emphasizes." },
      { question: "How do I show accessibility?", answer: "Name standards (WCAG) and fixes with user impact." },
      { question: "One page for frontend devs?", answer: "Yes for most through mid-level." },
      { question: "How do I pass ATS?", answer: "Include framework names in Experience bullets." },
      { question: "How do I tailor?", answer: "ResumeAtlas JD scan for missing frontend terms." },
    ]
  ),

  "backend-developer": baseConfig(
    "backend-developer",
    "Backend Developer",
    "Backend developer resume example with API scale, database tuning, and reliability—recruiter-reviewed.",
    "Backend recruiters want API ownership, data stores, and production operations experience.",
    [
      "API engineers in Node, Java, or Go shops (sample is Node-leaning).",
      "Full-stack developers applying backend-only roles.",
      "Engineers highlighting performance and uptime.",
    ],
    "Node/SQL/AWS aligned; swap Java/Go in skills and bullets for other stacks.",
    [
      { label: "Keyword match", score: 85, note: "APIs, SQL, caching, AWS." },
      { label: "Structure", score: 94, note: "Parser-friendly." },
      { label: "Impact density", score: 88, note: "Latency, uptime, throughput." },
      { label: "Seniority signal", score: 81, note: "Mid-level backend." },
    ],
    {
      name: "Chris Nguyen",
      headline: "Backend Developer",
      contact: "San Francisco, CA · chris.nguyen@email.com · (415) 555-0144",
      summary:
        "Backend developer with 5 years designing APIs and data layers in Node.js and PostgreSQL on AWS. Focus on performance, observability, and safe releases.",
      skills:
        "Node.js · TypeScript · PostgreSQL · Redis · REST · GraphQL · Docker · AWS · Kafka · OpenTelemetry · Jest",
      experience: [
        {
          title: "Backend Developer II",
          company: "Fleetline Logistics",
          dates: "Apr 2021 – Present",
          bullets: [
            "Designed shipment tracking APIs handling 8k RPS with 99.95% monthly uptime and P95 latency under 180ms.",
            "Optimized PostgreSQL queries and indexes, reducing DB CPU 40% during peak season.",
            "Introduced idempotent webhook processing with Kafka consumers, eliminating duplicate charge incidents.",
            "Added OpenTelemetry tracing adopted by on-call, cutting MTTR for API incidents 35%.",
          ],
        },
        {
          title: "Backend Developer",
          company: "StudyHub",
          dates: "Jul 2018 – Mar 2021",
          bullets: [
            "Built billing microservice migration from monolith with zero-downtime cutover plan.",
          ],
        },
      ],
      education: "B.S. Software Engineering, SFSU, 2018",
    },
    [
      "Scale and reliability metrics match how backend managers score resumes.",
      "Idempotency/Kafka story differentiates from CRUD-only APIs.",
      "Observability shows modern production maturity.",
    ],
    [
      { section: "Summary", verdict: "Strong", detail: "API + data store focus." },
      { section: "Skills", verdict: "Good", detail: "Coherent backend stack." },
      { section: "Experience", verdict: "Strong", detail: "Throughput and incident outcomes." },
      { section: "Education", verdict: "Fine", detail: "Engineering degree." },
    ],
    [
      { heading: "Technical skills", terms: ["API design", "Distributed systems", "SQL tuning", "Caching"] },
      { heading: "Tools", terms: ["Node.js", "PostgreSQL", "Redis", "Kafka", "Docker"] },
      { heading: "Platforms", terms: ["AWS ECS", "RDS", "CloudWatch"] },
    ],
    [
      "Listing APIs without scale or error handling detail.",
      "Claiming microservices with no ownership boundary.",
      "Omitting database technology the JD requires.",
      "No on-call or incident learning mentioned for 24/7 services.",
      "Frontend-heavy bullets on a backend application.",
      "Buzzword skills without production proof.",
      "Ignoring security/auth keywords when JD lists OAuth/JWT.",
      "Resume formatted as infographic.",
    ],
    [
      { level: "Junior", guidance: "Highlight API projects with auth, tests, and deploy link." },
      { level: "Mid-level", guidance: "Lead with latency, uptime, and data scale." },
      { level: "Senior", guidance: "Add architecture, mentorship, and cross-service design." },
    ],
    [
      { question: "What should a backend developer resume example show?", answer: "API scale, databases, reliability, and ops signals." },
      { question: "Node vs Java backend resumes?", answer: "Mirror the posting’s language; this sample is Node-leaning." },
      { question: "Should I include GraphQL?", answer: "Include if production experience exists." },
      { question: "Do I need system design buzzwords?", answer: "Use them only with real design stories in bullets." },
      { question: "How long should a backend resume be?", answer: "One page for most through mid-level." },
      { question: "Full stack applying backend?", answer: "Trim frontend; expand API/data depth." },
      { question: "How do I pass ATS?", answer: "Match datastore and framework names in Experience." },
      { question: "How do I tailor?", answer: "Use ResumeAtlas to find missing backend terms in your draft." },
    ]
  ),
};

export function getResumeExampleClusterConfig(
  slug: ResumeExampleClusterSlug
): ResumeExampleClusterConfig {
  return RESUME_EXAMPLE_CLUSTER_PAGES[slug];
}

/** Plain-text structure for copy/download. */
export function resumeSampleToPlainText(sample: ResumeSample): string {
  const lines: string[] = [
    sample.name,
    sample.headline,
    sample.contact,
    "",
    "SUMMARY",
    sample.summary,
    "",
    "SKILLS",
    sample.skills,
    "",
    "EXPERIENCE",
  ];
  for (const job of sample.experience) {
    lines.push(`${job.title} | ${job.company} | ${job.dates}`);
    for (const b of job.bullets) lines.push(`• ${b}`);
    lines.push("");
  }
  if (sample.projects?.length) {
    lines.push("PROJECTS");
    for (const p of sample.projects) {
      lines.push(`${p.title} · ${p.context}`);
      for (const b of p.bullets) lines.push(`• ${b}`);
      lines.push("");
    }
  }
  lines.push("EDUCATION", sample.education);
  if (sample.certifications) {
    lines.push("", "CERTIFICATIONS", sample.certifications);
  }
  return lines.join("\n");
}
