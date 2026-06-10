import {
  buildRoleOptimizerMetaDescription,
  buildRoleOptimizerMetaTitle,
  buildRoleOptimizerPath,
  type RoleOptimizerContent,
} from "@/app/lib/roleOptimizerContent";

const slug = "analytics-manager";
const roleName = "Analytics Manager";

export const analyticsManagerOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName,
  title: buildRoleOptimizerMetaTitle(roleName),
  description: buildRoleOptimizerMetaDescription(roleName),
  h1: "Optimize Your Analytics Manager Resume for a Job Description",
  targetKeywords: [
    "analytics manager resume optimizer",
    "optimize analytics manager resume for job description",
    "analytics leadership resume keywords",
    "business intelligence manager resume optimization",
    "data analytics manager resume ATS",
    "analytics team management resume",
    "stakeholder reporting resume bullets",
    "analytics strategy resume examples",
    "KPI framework resume optimization",
    "resume optimization for analytics manager roles",
  ],
  jdDemonstration: {
    sectionTitle: "Analytics manager resume match example",
    intro:
      "Below is a realistic walkthrough: a sample job description, what a baseline resume draft misses, the match score ResumeAtlas would surface, and how one bullet improves after optimization.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "Team leadership",
      "Advanced SQL",
      "Executive dashboards",
      "Forecasting",
      "Stakeholder communication",
      "KPI governance",
    ],
    matchScore: 63,
    missingKeywords: ["Forecasting", "KPI Governance", "Stakeholder Communication"],
    beforeBullet: "Managed analytics reporting and supported business stakeholders.",
    afterBullet:
      "Led a team of 6 analysts to standardize SQL metric layers and executive dashboards, improving quarterly forecast accuracy by 12% and reducing stakeholder decision cycle time from 10 days to 4 days through KPI governance reviews.",
    outro:
      "Paste your resume and the actual posting into the free compare and optimize tool to run match score, gap analysis, and AI rewrites on your posting",
  },
  keywordSection: {
    h2: "ATS keywords for analytics manager resumes",
    intro:
      "These terms show up repeatedly in analytics manager job descriptions and recruiter filters. Include them where your work demonstrates real ownership and outcomes.",
    checklist: [
      "SQL",
      "Dashboard Strategy",
      "Forecasting",
      "KPI Governance",
      "Stakeholder Management",
      "Experiment Analysis",
      "Data Quality",
      "Semantic Layer",
      "Executive Reporting",
      "Analytics Roadmap",
    ],
    body:
      "ResumeAtlas checks these terms against the posting you paste and highlights where your resume lacks evidence in summary, bullets, or skills. Use the checklist first, then run posting-level analysis to prioritize edits that improve both ATS visibility and hiring-manager confidence.",
  },
  introParagraphs: [
    "Analytics manager resumes are evaluated on two dimensions at once: technical decision quality and organizational influence. Many candidates are strong in one and weakly represented in the other, which creates uncertainty for hiring teams. A resume that focuses only on dashboards, SQL, and tooling can look tactical rather than strategic. A resume that focuses only on leadership language can look disconnected from analytical rigor. The target job description usually clarifies the balance expected. Some roles prioritize building self-serve analytics platforms and data governance standards. Others prioritize direct partnership with product, finance, and executive teams to guide planning decisions. ResumeAtlas helps you tune your resume toward that balance by aligning your bullet priorities and language with the exact operating model in the posting.",
    "A high-performing analytics manager resume should show how insights turned into decisions, and how decisions translated into measurable business outcomes. Hiring managers want evidence that you did more than publish reports. They want to see that you shaped metric definitions, resolved data trust issues, guided experiment design, influenced roadmap tradeoffs, and improved team productivity through better data infrastructure. If those achievements are buried under generic management statements, your profile gets flattened into people management without analytical leverage. ResumeAtlas analyzes your draft against posting requirements and highlights where your strongest impact evidence is not visible enough. It helps convert abstract leadership claims into decision-focused narratives with scope, metrics, and cross-functional consequences.",
    "Keyword strategy is often mishandled in analytics manager applications. Candidates include long lists of tools but miss intent-specific terms that appear in leadership-level postings, such as KPI governance, executive storytelling, experimentation culture, data quality SLAs, semantic layer ownership, and analytics roadmap prioritization. ATS systems and recruiter searches rely on those terms, yet human reviewers still expect concise and credible storytelling. ResumeAtlas identifies missing high-intent language and recommends where to place it naturally, especially in role summaries and outcome bullets. This prevents the common failure mode of having technically rich experience that does not map cleanly to how the company describes the role.",
    "Tailoring for analytics manager roles is a leverage activity, not cosmetic editing. It means selecting the right accomplishments, reframing scope to match team maturity, and proving that your leadership style fits the company's decision environment. A scale-up may need an analytics manager who can build process from scratch, while a large enterprise may need someone who can improve consistency across existing teams. ResumeAtlas supports this by scoring role fit for each job description and generating rewrite suggestions grounded in your actual experience. You get a resume version that communicates strategic value, execution discipline, and stakeholder influence for the specific role, which increases the probability of moving from application to hiring manager conversation.",
  ],
  commonMistakes: [
    "Describing dashboard delivery without showing how insights changed business decisions or performance.",
    "Listing BI tools extensively while omitting KPI governance, prioritization, and stakeholder influence examples.",
    "Using generic leadership language such as managed team without operational detail or outcome metrics.",
    "Ignoring data quality and trust work that is often central to analytics manager responsibilities.",
    "Failing to distinguish individual contributor analytics work from manager-level team impact.",
    "Not tailoring resume emphasis for different analytics contexts such as product, marketing, operations, or finance.",
    "Overloading skills sections with tools while underdeveloping narrative evidence of strategic analytics leadership.",
  ],
  topSkills: [
    "Analytics strategy and prioritization",
    "SQL and data modeling",
    "Business intelligence and dashboard governance",
    "KPI framework design",
    "Experimentation partnership",
    "Stakeholder communication",
    "Team leadership and hiring",
    "Data quality and metric trust",
    "Cross-functional planning support",
    "Analytics roadmap management",
    "Executive storytelling with data",
  ],
  skillsNarrative:
    "Analytics manager hiring decisions usually hinge on whether you can convert data capability into decision quality at scale. Technical fluency in SQL, modeling, and BI tooling is expected, but it is not sufficient for manager roles. Employers want KPI framework ownership, because metric definitions drive planning behavior across teams. Experimentation partnership matters since product and growth groups need analytical guidance to run credible tests and interpret results correctly. Stakeholder communication should show adaptation across audiences, from daily operational teams to executive leadership reviews. Team leadership needs evidence of hiring quality, analyst development, and workflow design that improves throughput and insight consistency. Data quality work is a strong signal of maturity, especially when you can show how trust improvements changed decision speed or reduced costly misalignment. The best skills narrative combines technical reliability, business context, and organizational influence into one coherent operating profile.",
  beforeExample: {
    before: "Managed analytics team and created dashboards for leadership reporting.",
    after:
      "Led a team of 7 analysts to redesign the executive KPI framework and self-serve dashboard model, reducing weekly reporting turnaround from 3 days to 6 hours, improving forecast accuracy by 11%, and enabling product and marketing leaders to retire 14 conflicting metric definitions.",
  },
  beforeAfterContext:
    "The stronger bullet ties management activity to process transformation and business outcomes. It clarifies team scope, decision impact, and governance improvements, which are core expectations in analytics manager job descriptions.",
  howAtlasOptimizes: [
    {
      heading: "Prioritizes manager-level evidence over analyst-level tasks",
      body:
        "ResumeAtlas identifies bullets that read like individual contributor output and helps elevate them into management outcomes. It emphasizes themes such as team leverage, prioritization, process design, and executive influence. This repositioning is important when candidates were recently promoted and still carry IC-style wording in their resume.",
    },
    {
      heading: "Aligns analytics language with business function context",
      body:
        "Analytics manager roles differ heavily by function. Product analytics roles emphasize experimentation and feature adoption, while finance analytics roles emphasize forecasting and planning consistency. ResumeAtlas maps posting vocabulary to your experience so the final resume speaks the same business language as the hiring team.",
    },
    {
      heading: "Strengthens KPI and governance credibility signals",
      body:
        "Many job descriptions ask for ownership of metric standards and data trust. ResumeAtlas surfaces where your experience already supports this and rewrites bullets to make governance impact explicit. This can be a decisive differentiator against candidates who focus only on dashboard output volume.",
    },
    {
      heading: "Improves ATS match without bloating tool lists",
      body:
        "The optimizer recommends role-relevant terms with placement guidance, so your resume includes critical keywords while staying concise. Instead of expanding a long software inventory, it integrates high-intent concepts into outcome bullets and summary lines. That keeps both ATS systems and human reviewers engaged.",
    },
    {
      heading: "Builds role-specific narratives for team maturity stage",
      body:
        "An early-stage company and a mature enterprise need different manager profiles. ResumeAtlas helps you adjust emphasis toward building foundations, scaling operations, or optimizing established processes based on the posting. This targeted narrative improves fit perception and reduces mismatch risk during interviews.",
    },
  ],
  faq: [
    {
      question: "What should analytics manager resumes highlight first, tools or leadership?",
      answer:
        "Start with outcomes that demonstrate leadership impact, then support those outcomes with technical and process details. Hiring teams assume baseline tool fluency for experienced candidates. They look for evidence that you improved decisions, team productivity, metric alignment, and business performance. Tool lists help with discoverability, but leadership outcomes drive interview decisions.",
    },
    {
      question: "How can I show strategic impact if my role was operationally heavy?",
      answer:
        "Strategic impact can still be shown through process improvements and decision influence. Highlight where you improved reporting speed, reduced metric disagreement, raised data trust, or enabled faster planning cycles. Even operational work becomes strategic when you connect it to organizational outcomes and stakeholder decisions.",
    },
    {
      question: "Should I include analyst-level projects on an analytics manager resume?",
      answer:
        "Include only those that show transferable leadership signals or deep domain credibility relevant to the target role. If a project demonstrates experimentation standards, KPI redesign, or cross-functional decision influence, keep it. Otherwise, compress it to preserve space for manager-level responsibilities and team outcomes.",
    },
    {
      question: "How many metrics should each bullet include?",
      answer:
        "Usually one to two metrics per bullet is enough when the metrics represent different dimensions, such as speed and quality, or adoption and revenue. Too many numbers can reduce readability. Prioritize metrics that directly map to the role requirements in the job description.",
    },
    {
      question: "What keywords are most important for analytics manager ATS performance?",
      answer:
        "Beyond common tools, manager-level ATS performance improves with terms like KPI governance, analytics roadmap, stakeholder alignment, data quality, experiment analysis, and executive reporting. Use these terms where they are supported by outcomes. Contextual keyword use is more effective than keyword volume.",
    },
    {
      question: "How does ResumeAtlas tailor resumes for different analytics manager postings?",
      answer:
        "ResumeAtlas compares your resume to each posting and surfaces requirement gaps, then suggests rewrites that emphasize the most relevant outcomes for that specific context. You can quickly produce versions optimized for product analytics, revenue analytics, operations analytics, or BI leadership while keeping content accurate and concise.",
    },
  ],
  /** Example adjacency only — no keyword hub (data analyst keywords page owns DA intent). */
  relatedExamplePath: "/data-analyst-resume-guide",
};
