import {
  buildRoleOptimizerMetaDescription,
  buildRoleOptimizerMetaTitle,
  buildRoleOptimizerPath,
  type RoleOptimizerContent,
} from "@/app/lib/roleOptimizerContent";

const slug = "product-manager";
const roleName = "Product Manager";

export const productManagerOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName,
  title: buildRoleOptimizerMetaTitle(roleName),
  description: buildRoleOptimizerMetaDescription(roleName),
  h1: "Optimize Your Product Manager Resume for a Job Description",
  targetKeywords: [
    "product manager resume optimizer",
    "tailor product manager resume to job description",
    "ATS product manager resume",
    "product strategy resume keywords",
    "roadmap resume optimization",
    "cross-functional product leadership resume",
    "product metrics resume examples",
  ],
  jdDemonstration: {
    sectionTitle: "Product manager resume match example",
    intro:
      "This sample walkthrough shows how ResumeAtlas evaluates PM role fit from job requirements, then improves a generic bullet with stronger product decision evidence.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "Product roadmap ownership",
      "Customer discovery",
      "PRD writing",
      "Metric definition",
      "Cross-functional leadership",
      "Experiment prioritization",
      "Stakeholder communication",
    ],
    matchScore: 59,
    missingKeywords: ["PRD", "North star metric", "Discovery interviews"],
    beforeBullet: "Managed roadmap and coordinated with engineering to launch features.",
    afterBullet:
      "Owned quarterly roadmap for onboarding, led 18 discovery interviews, authored PRDs for three high-friction improvements, aligned design and engineering on scope tradeoffs, and improved activation-to-trial conversion by 4.9 percentage points.",
    outro:
      "Use the free compare and optimize tool to run match score, gap analysis, and AI rewrites on your posting",
  },
  keywordSection: {
    h2: "ATS keywords for product manager resumes",
    intro:
      "PM ATS filters look for strategy and execution language together. Add these terms where your bullets show decisions, tradeoffs, and measurable product outcomes.",
    checklist: [
      "Product roadmap",
      "Customer discovery",
      "PRD",
      "Product metrics",
      "Cross-functional leadership",
      "Experimentation",
      "Prioritization",
      "Go-to-market",
      "Stakeholder alignment",
      "Funnel optimization",
    ],
    body:
      "ResumeAtlas compares these keywords against the target job description and highlights missing skills that are not represented in your resume narrative. It helps you add evidence-backed language so ATS match improves without reducing readability.",
  },
  introParagraphs: [
    "Product manager hiring is one of the most narrative-sensitive areas in recruiting. Teams are not only assessing whether you shipped features. They are assessing how you identify opportunities, prioritize tradeoffs, align cross-functional execution, and deliver measurable outcomes. Many PM resumes fail because they read like project logs instead of decision narratives. Listing meetings, backlog grooming, and release coordination does not communicate product judgment. Hiring panels want evidence that you can choose what not to build, validate assumptions, and drive meaningful business or user impact.",
    "The role also spans strategy and execution, which makes resume structure crucial. A strong PM candidate may work across discovery, analytics, roadmap planning, pricing, go-to-market alignment, and launch quality. If this range is summarized as broad ownership without specifics, reviewers cannot evaluate depth. Effective bullets connect context, action, and result. They show what customer or business problem existed, what decision framework guided prioritization, what teams were aligned, and what changed after release. This allows interviewers to infer product thinking maturity from concise evidence.",
    "Tailoring matters because product manager postings vary by company stage and function. Growth PM roles emphasize experiment velocity, conversion economics, and lifecycle metrics. Platform PM roles emphasize internal customer alignment, reliability, and adoption across technical teams. Enterprise PM roles may emphasize stakeholder complexity, compliance, and long sales cycles. A static resume usually underperforms across these variants. A tailored resume selects the right examples and language for the role's decision environment, making your relevance obvious during short screening windows.",
    "ResumeAtlas helps product managers convert broad experience into posting-specific evidence without losing authenticity. The optimizer maps your resume against the target job description, highlights keyword and competency gaps, and suggests stronger framing for weak bullets. It keeps the focus on truthful impact, not inflated claims. This is especially useful when applying to multiple PM role types because you can preserve a core narrative while quickly adjusting emphasis. The result is a clearer story of product judgment, execution leadership, and outcomes that matter to hiring teams.",
  ],
  commonMistakes: [
    "Confusing activity with impact. Bullets that only mention roadmap ownership or sprint ceremonies are weak unless they show decisions made and measurable outcome changes.",
    "Overusing generic leadership language. Phrases like \"cross-functional collaboration\" need specificity about which teams aligned, what conflict was resolved, and what business result followed.",
    "Ignoring product metrics. PM resumes should include adoption, retention, conversion, revenue, efficiency, or risk metrics tied to launches and strategic decisions.",
    "Using one version for all PM roles. Growth, platform, and enterprise PM postings require different evidence priorities and terminology.",
    "Not showing discovery quality. Many candidates skip customer research, insight synthesis, and hypothesis validation details, which are critical indicators of product judgment.",
    "Claiming ownership without scope boundaries. Strong PM bullets clarify team size, product area, stage, and decision authority to establish credibility.",
    "Missing go-to-market and rollout evidence. Product success includes launch readiness, adoption enablement, and post-release learning loops, not only feature completion.",
  ],
  topSkills: [
    "Product strategy",
    "Roadmap prioritization",
    "Customer discovery",
    "Experiment design",
    "Data-informed decision making",
    "Stakeholder alignment",
    "Go-to-market planning",
    "Requirements definition",
    "Agile product delivery",
    "Product analytics",
    "Outcome measurement",
    "Executive communication",
  ],
  skillsNarrative:
    "High-performing product manager resumes combine strategic thinking with operational execution evidence. Core PM skills such as prioritization, discovery, and roadmap ownership are expected, but hiring teams look for proof that these capabilities produced measurable outcomes. Align your skill emphasis with the posting and reinforce each skill through specific impact bullets. For example, tie discovery work to reduced feature risk, or tie prioritization to revenue and retention gains. Include collaboration and communication skills in ways that show influence across engineering, design, sales, and leadership groups. This framing demonstrates that you can move from insight to shipped value while balancing tradeoffs in real business contexts.",
  beforeExample: {
    before: "Owned roadmap for onboarding improvements and worked with engineering to launch new signup features.",
    after:
      "Led onboarding roadmap using funnel analysis and customer interviews, prioritized three high-friction fixes, and improved trial-to-paid conversion from 12.4% to 17.1% within six months.",
  },
  beforeAfterContext:
    "The improved bullet demonstrates product judgment rather than task tracking. It explains the decision inputs, clarifies prioritization scope, and quantifies the business result. This helps recruiters and hiring managers assess strategic and execution capability quickly. It also includes role-relevant terms such as funnel analysis and conversion, improving ATS keyword alignment while keeping language concise and credible. Outcome-focused framing is essential for PM roles where impact quality matters more than feature count.",
  howAtlasOptimizes: [
    {
      heading: "ATS compatibility",
      body:
        "ResumeAtlas validates that your product manager resume remains ATS-readable while preserving strategic detail. It flags formatting patterns that can hide roadmap outcomes, metric evidence, and cross-functional leadership signals. PM resumes often include visual-heavy layouts that look polished but parse poorly. The optimizer recommends cleaner structure so machine screening captures critical content. This ensures your strongest decision and impact evidence survives the first pass before human review begins.",
    },
    {
      heading: "Keyword matching",
      body:
        "The keyword matcher aligns your PM resume with the exact target posting and highlights missing terminology across strategy, discovery, experimentation, and launch themes. It prioritizes terms by relevance so you can focus on edits that improve fit fastest. Suggestions are context-aware, encouraging integration within outcome bullets rather than isolated keyword blocks. This improves ATS match and helps interview panels quickly recognize familiar product language tied to concrete execution evidence.",
    },
    {
      heading: "Missing skills detection",
      body:
        "ResumeAtlas detects capability gaps that postings imply but resumes often omit, such as hypothesis validation, stakeholder conflict resolution, and post-launch measurement loops. Many PM candidates mention ownership but understate how decisions were made and evaluated. The optimizer identifies these weak spots and suggests where existing experience can be reframed to show full product lifecycle competence. This helps you present stronger evidence without exaggerating responsibilities or inventing unsupported claims.",
    },
    {
      heading: "Resume tailoring",
      body:
        "Tailoring guidance restructures your resume around the PM role type you are targeting. Growth roles can foreground experiment velocity and funnel outcomes. Platform roles can foreground internal customer adoption and reliability impact. Enterprise roles can foreground stakeholder complexity and rollout governance. ResumeAtlas enables these shifts quickly while keeping your core narrative stable. The result is a more relevant resume that makes hiring alignment obvious during fast recruiter and panel reviews.",
    },
    {
      heading: "Optimization recommendations",
      body:
        "The optimizer offers practical rewrite suggestions that transform generic PM bullets into decision-and-impact statements. It prompts clearer framing of problem context, prioritization rationale, and measurable outcomes so evaluators can assess product judgment accurately. You can accept, refine, or reject each suggestion to maintain authenticity. This workflow reduces editing time across multiple applications and raises consistency, helping each tailored resume version communicate strategic value with stronger clarity.",
    },
  ],
  faq: [
    {
      question: "What makes a product manager resume stand out to hiring teams?",
      answer:
        "A standout PM resume shows decision quality, not just delivery volume. Hiring teams want evidence that you identified meaningful opportunities, prioritized effectively, and delivered measurable outcomes. Strong bullets include context, approach, and result with clear metrics such as conversion lift, retention gains, or operational efficiency improvements. They also show collaboration across functions and communication with leadership. Tailoring this evidence to the specific role type greatly improves screening and interview performance.",
    },
    {
      question: "How should I tailor a PM resume for growth roles?",
      answer:
        "For growth PM roles, prioritize evidence tied to funnel performance, activation, retention, pricing, and experiment velocity. Lead with bullets that show hypothesis design, test interpretation, and measurable business impact. Include collaboration with marketing, data, and lifecycle teams where relevant. Keep platform or process-heavy work lower unless it directly affected growth outcomes. Using role-specific language and metrics helps ATS alignment and signals immediate relevance to growth-focused hiring managers.",
    },
    {
      question: "How can I show strategic thinking in concise resume bullets?",
      answer:
        "Use a compact structure: customer or business problem, prioritization or discovery method, and measurable outcome. Strategic thinking becomes visible when you explain why a decision was made, not only what was shipped. Mention inputs such as customer interviews, funnel analysis, or market constraints, then connect them to impact metrics. This approach communicates judgment efficiently and helps interviewers ask better follow-up questions during panel rounds.",
    },
    {
      question: "Should PM resumes include technical depth?",
      answer:
        "Include technical depth in proportion to role requirements. For platform or technical PM roles, architecture constraints, API considerations, and reliability tradeoffs should appear clearly. For less technical PM roles, keep technical references focused on decision relevance and cross-functional execution. The goal is credibility, not overloading jargon. Tailor depth based on the posting so reviewers can quickly assess whether you can collaborate effectively with engineering in that specific environment.",
    },
    {
      question: "What metrics are best for product manager resume impact?",
      answer:
        "Use metrics that reflect product outcomes and business value, such as conversion rate, retention, activation speed, churn reduction, feature adoption, revenue lift, or cost-to-serve changes. Pair metrics with context and timeframe so results are interpretable. Avoid reporting numbers without explaining the product decision that drove them. Hiring teams evaluate both outcome magnitude and quality of judgment behind those outcomes, so metric framing should make causal logic as clear as possible.",
    },
    {
      question: "How often should I customize my PM resume?",
      answer:
        "Customize for each priority role because PM responsibilities vary significantly by stage, domain, and team model. Keep a stable master version, then adjust examples, terminology, and bullet ordering to match the posting. This increases ATS relevance and improves panel perception of fit. ResumeAtlas helps accelerate this process by identifying role-specific gaps and suggesting targeted rewrites, so customization remains practical even when you are applying to multiple companies at once.",
    },
  ],
  relatedExamplePath: "/product-manager-resume-guide",
  relatedKeywordsPath: "/product-manager-resume-keywords",
};
