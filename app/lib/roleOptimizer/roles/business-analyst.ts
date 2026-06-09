import {
  buildRoleOptimizerMetaDescription,
  buildRoleOptimizerMetaTitle,
  buildRoleOptimizerPath,
  type RoleOptimizerContent,
} from "@/app/lib/roleOptimizerContent";

const slug = "business-analyst";
const roleName = "Business Analyst";

export const businessAnalystOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName,
  title: buildRoleOptimizerMetaTitle(roleName),
  description: buildRoleOptimizerMetaDescription(roleName),
  h1: "Optimize Your Business Analyst Resume for a Job Description",
  targetKeywords: [
    "business analyst resume optimizer",
    "tailor business analyst resume to job description",
    "ATS business analyst resume",
    "requirements gathering resume keywords",
    "business analysis resume optimization",
    "process improvement resume bullets",
    "stakeholder management resume examples",
  ],
  jdDemonstration: {
    sectionTitle: "Business analyst resume match example",
    intro:
      "This demonstration shows how ResumeAtlas compares a business analyst resume to a sample posting and turns a vague responsibility bullet into measurable impact.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "Requirements gathering",
      "SQL analysis",
      "Stakeholder management",
      "Process mapping",
      "User story refinement",
      "Jira backlog management",
      "Root cause analysis",
    ],
    matchScore: 62,
    missingKeywords: ["Acceptance criteria", "Jira", "Process mapping", "UAT support"],
    beforeBullet: "Worked with stakeholders and documented requirements for process changes.",
    afterBullet:
      "Facilitated requirements workshops with operations and engineering, mapped the claims intake process in Jira, translated findings into 32 prioritized user stories with acceptance criteria, and reduced rework defects by 29% after UAT cycles.",
    outro:
      "Run your own role-targeted comparison in the free compare and optimize tool to run match score, gap analysis, and AI rewrites on your posting",
  },
  keywordSection: {
    h2: "ATS keywords for business analyst resumes",
    intro:
      "Business analyst postings usually combine communication and analytical execution terms. Use this checklist to confirm your resume mirrors that language with evidence.",
    checklist: [
      "Requirements gathering",
      "Business requirements document",
      "Process mapping",
      "Stakeholder management",
      "SQL",
      "Jira",
      "User stories",
      "Acceptance criteria",
      "Root cause analysis",
      "UAT",
    ],
    body:
      "ResumeAtlas compares these keywords against the job description and highlights missing skills in your experience and summary sections. The goal is to show requirement ownership and measurable process impact, not just tool familiarity.",
  },
  introParagraphs: [
    "Business analyst roles sit at the intersection of operations, product, and technology, which makes resume quality unusually important. Hiring teams are trying to identify candidates who can translate ambiguous business needs into clear requirements, align stakeholders with different incentives, and drive measurable process or product improvements. Many resumes miss this by sounding administrative instead of analytical. Listing meetings attended or documents produced does not show strategic value. Decision makers want proof that your analysis changed priorities, reduced risk, or accelerated delivery outcomes.",
    "A common issue is that business analysts often do high-impact work that appears invisible unless framed carefully. You might resolve conflicting requirements, identify root causes behind recurring incidents, or design KPI frameworks that improve leadership decisions. If those contributions are summarized as routine coordination tasks, your seniority and influence are understated. Strong resume bullets show the problem context, the analytical method, and the result. They also demonstrate communication range, from executive briefing to detailed handoff with engineering or operations teams.",
    "Tailoring is critical because business analyst postings vary by domain and execution model. Some roles focus on enterprise process redesign and compliance documentation. Others focus on digital product delivery, agile ceremonies, and backlog readiness. A single static resume cannot fully support both. Targeted editing lets you prioritize the right examples. For a process role, emphasize workflow redesign and cycle time improvements. For a product role, emphasize requirement quality, release readiness, and adoption outcomes tied to user or customer metrics.",
    "ResumeAtlas helps business analysts turn broad experience into role-specific evidence that passes both ATS and human review. It maps your content to posting requirements, highlights missing keywords, and surfaces weak bullets that need stronger impact framing. The objective is not keyword stuffing. It is clearer communication of business value. With guided rewrites, you can present the same truthful experience in language that matches the target role and demonstrates analytical ownership instead of task completion.",
  ],
  commonMistakes: [
    "Describing outputs instead of outcomes. Bullets that only mention requirement documents, workshops, or dashboards are weak unless they show what decision or performance change those outputs enabled.",
    "Using generic stakeholder language. Saying you \"worked with stakeholders\" does not show influence. Strong bullets identify who aligned, what conflict was resolved, and what changed in delivery or process quality.",
    "Omitting analytical methods. Business analysts should reference techniques such as root cause analysis, process mapping, KPI design, or prioritization frameworks to demonstrate structured thinking.",
    "Failing to quantify process improvements. If you improved cycle time, defect rates, SLA adherence, or forecast accuracy, include concrete metrics and timeframe context.",
    "Not tailoring domain language. A financial services BA role and a healthcare operations BA role can require very different terminology, controls, and reporting expectations.",
    "Overloading the resume with tool names. BI and ticketing tools matter, but tool lists without business context do not communicate strategic contribution.",
    "Ignoring change management contributions. Many analysts drive adoption, training, or rollout governance, and leaving this out can understate execution capability.",
  ],
  topSkills: [
    "Requirements gathering",
    "Process mapping",
    "Root cause analysis",
    "Stakeholder management",
    "User story refinement",
    "Data analysis",
    "SQL",
    "Dashboard interpretation",
    "KPI design",
    "Documentation standards",
    "Agile delivery support",
    "Change management",
  ],
  skillsNarrative:
    "A strong business analyst resume demonstrates structured analysis and measurable business impact. Core skills like requirements gathering and process mapping are expected, but hiring teams make decisions based on how those skills improved delivery outcomes. Prioritize skills that map directly to the posting, then connect each to evidence in your experience section. For example, tie root cause analysis to reduced incident volume, or stakeholder alignment to faster release approval. Include communication and change management signals to show that your recommendations translated into execution, not just documentation. This framing positions you as a decision-enabling analyst who can move initiatives from ambiguity to measurable results across cross-functional teams.",
  beforeExample: {
    before: "Gathered requirements from business teams and created documentation for a new claims processing workflow.",
    after:
      "Led requirements workshops across operations, compliance, and engineering, translated 47 pain points into a phased claims workflow backlog, and reduced average claim resolution time by 22% within two quarters.",
  },
  beforeAfterContext:
    "The revised bullet clarifies leadership scope, analytical depth, and business outcome. It moves beyond document creation to show problem discovery, prioritization, and measurable improvement in operational efficiency. This matters for hiring because business analyst roles are evaluated on decision quality and execution influence, not paperwork volume. The stronger version also includes role-relevant terms such as backlog and workflow, which improves ATS keyword alignment while preserving readable, evidence-based storytelling.",
  howAtlasOptimizes: [
    {
      heading: "ATS compatibility",
      body:
        "ResumeAtlas checks whether your business analyst resume is structured for reliable ATS parsing. It flags layout issues and unclear section labeling that can hide requirement analysis, KPI outcomes, and stakeholder achievements during ingestion. Business analyst resumes often include dense tables or matrix-style content that machines struggle to read. The optimizer helps you preserve detail while presenting it in a cleaner format so both systems and recruiters can capture the evidence that supports your candidacy.",
    },
    {
      heading: "Keyword matching",
      body:
        "The keyword engine compares your resume to the target posting and identifies missing business analysis language across requirements, process improvement, and delivery collaboration themes. It separates high-priority terms from lower-impact wording so your edits stay focused. Instead of repeating phrases, ResumeAtlas recommends where to integrate keywords naturally within outcome-driven bullets. This improves ATS relevance and gives human reviewers faster confidence that your experience aligns with the role's domain and execution expectations.",
    },
    {
      heading: "Missing skills detection",
      body:
        "ResumeAtlas detects capability gaps that are implied in postings but often absent from resumes, such as prioritization frameworks, risk mitigation, and adoption support. Many analysts mention gathering requirements but omit how they validated tradeoffs or managed change after release. The optimizer surfaces these omissions and suggests where your existing experience can be reframed to show complete analysis-to-execution ownership. This helps you present a fuller professional profile without introducing inflated or unverified claims.",
    },
    {
      heading: "Resume tailoring",
      body:
        "Tailoring guidance reorganizes your resume around the specific business analyst role type. For operations-heavy jobs, process redesign and efficiency gains can move to the top. For product-oriented jobs, backlog quality and release collaboration can lead. ResumeAtlas preserves your core history while shifting emphasis to match the posting. This targeted sequencing improves relevance in early screens and makes it easier for hiring teams to identify the exact evidence they need when comparing candidates quickly.",
    },
    {
      heading: "Optimization recommendations",
      body:
        "The recommendation layer rewrites weak bullets into clear problem-method-impact statements that better reflect business analyst value. It suggests stronger verbs, sharper metric framing, and improved stakeholder context so your contributions are easier to evaluate. You can edit every suggestion, keeping voice and accuracy intact. For candidates applying across multiple domains, this workflow reduces manual rewriting effort and increases consistency, helping each tailored version communicate both analytical rigor and practical delivery influence.",
    },
  ],
  faq: [
    {
      question: "What do hiring managers look for most in a business analyst resume?",
      answer:
        "They look for evidence that your analysis led to better decisions and measurable outcomes. Strong resumes show how you gathered and prioritized requirements, resolved stakeholder conflicts, and translated complexity into executable plans. Managers also value proof of delivery influence, such as reduced cycle time, improved adoption, or lower defect rates. Tool familiarity helps, but business impact and communication clarity carry more weight. Tailoring your examples to the role domain increases interview conversion significantly.",
    },
    {
      question: "How can I quantify business analyst impact if my work is cross-functional?",
      answer:
        "Use metrics tied to process and delivery outcomes rather than trying to claim sole ownership of revenue changes. Examples include requirement defect reduction, approval cycle acceleration, incident decline, backlog readiness improvement, or SLA gains. Pair each metric with your contribution, such as workshop facilitation, root cause analysis, or prioritization design. This shows both influence and accountability. Cross-functional work is expected in BA roles, and clear attribution helps recruiters understand your specific value in shared outcomes.",
    },
    {
      question: "Should I include technical skills like SQL on a business analyst resume?",
      answer:
        "Yes, when they are relevant to the posting and supported by practical examples. SQL, dashboard analysis, and data validation skills can strengthen your profile, especially for data-informed or product-facing analyst roles. The key is to connect technical skills to decisions, not just list tools. For example, explain how query analysis uncovered process bottlenecks or informed prioritization. This keeps your resume balanced between business communication and analytical execution.",
    },
    {
      question: "How do I tailor my resume for agile versus enterprise process roles?",
      answer:
        "For agile product roles, emphasize user stories, acceptance criteria quality, sprint readiness, and collaboration with product and engineering. For enterprise process roles, emphasize workflow redesign, controls, compliance alignment, and operational performance outcomes. Keep core competencies in both versions, but reorder examples and terminology based on the posting. This helps hiring teams quickly see role fit and reduces confusion caused by mixed signals. Tailoring is about relevance, not changing your core experience.",
    },
    {
      question: "What is the best format for business analyst resume bullets?",
      answer:
        "Use a clear structure: problem context, analysis action, and measurable result. Start with what needed improvement, then describe your method, such as process mapping or root cause analysis, and finish with the business outcome. This format communicates strategic thinking and execution impact in one line. Avoid long narrative blocks or vague activity lists. Concise evidence-driven bullets are easier for ATS parsing and faster for recruiters to evaluate.",
    },
    {
      question: "How often should I update a tailored business analyst resume?",
      answer:
        "Update for each high-value application and after major project outcomes. Business analyst postings differ in domain language and scope, so even similar titles may prioritize different competencies. Keep a stable base resume, then tailor headline skills, bullet ordering, and terminology to each role. ResumeAtlas can streamline this process by showing exact gaps and rewrite priorities, making regular customization practical without sacrificing consistency or factual accuracy.",
    },
  ],
  relatedExamplePath: "/business-analyst-resume-guide",
  relatedKeywordsPath: "/business-analyst-resume-keywords",
};
