import {
  buildRoleOptimizerMetaDescription,
  buildRoleOptimizerMetaTitle,
  buildRoleOptimizerPath,
  type RoleOptimizerContent,
} from "@/app/lib/roleOptimizerContent";

const slug = "software-engineer";
const roleName = "Software Engineer";

export const softwareEngineerOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName,
  title: buildRoleOptimizerMetaTitle(roleName),
  description: buildRoleOptimizerMetaDescription(roleName),
  h1: "Optimize Your Software Engineer Resume for a Job Description",
  targetKeywords: [
    "software engineer resume optimizer",
    "tailor software engineer resume to job description",
    "ATS software engineer resume",
    "software developer resume keywords",
    "full stack resume optimization",
    "backend engineering resume bullets",
    "frontend performance resume examples",
  ],
  jdDemonstration: {
    sectionTitle: "Software engineer resume match example",
    intro:
      "Here is a practical demonstration of how ResumeAtlas scores a software engineer resume against common posting requirements and improves one weak bullet.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "TypeScript",
      "React",
      "REST API development",
      "Automated testing",
      "System design",
      "CI/CD workflows",
      "Performance optimization",
    ],
    matchScore: 71,
    missingKeywords: ["Integration testing", "System design", "API versioning"],
    beforeBullet: "Built frontend features and backend endpoints for the main product.",
    afterBullet:
      "Delivered TypeScript React features and versioned Node.js REST APIs for the billing workflow, added Jest and Playwright coverage that reduced regression defects by 38%, and applied system design changes that lowered p95 API latency by 27%.",
    outro:
      "Paste your resume and target posting into the free compare and optimize tool to see your own match score, missing terms, and rewrite suggestions tuned to that role.",
  },
  keywordSection: {
    h2: "ATS keywords for software engineer resumes",
    intro:
      "Software engineer ATS screens prioritize stack fit plus delivery signals. Keep these terms in outcome-focused bullets rather than a disconnected keyword block.",
    checklist: [
      "TypeScript",
      "React",
      "REST APIs",
      "System design",
      "Unit testing",
      "Integration testing",
      "CI/CD",
      "Node.js",
      "Performance optimization",
      "Code review",
    ],
    body:
      "ResumeAtlas compares your resume language against the job description and highlights missing skills that are not clearly stated in your experience. It then helps you add those terms in context so ATS parsing and recruiter review both improve.",
  },
  introParagraphs: [
    "Software engineering job descriptions are increasingly specific, yet many resumes still look broad and generic. Companies now screen for stack fit, system complexity, product context, and delivery ownership all at once. Recruiters and hiring managers want to know whether you can contribute quickly in their architecture, not whether you have touched popular tools in the past. A resume that lists technologies without decision context or measurable impact often gets filtered out early, even when the candidate has strong experience.",
    "The underlying issue is that software work spans multiple layers. You might design APIs, tune performance, ship frontend features, harden deployment pipelines, and mentor team members in the same quarter. If your resume compresses this into vague statements like \"built features\" or \"improved performance,\" the value becomes invisible. Strong resumes show what problem was solved, what technical approach was used, and what changed for users or the business. They also clarify scope, such as owning a service boundary or driving a cross-team migration.",
    "Tailoring matters because software engineer titles are inconsistent across companies. A backend-heavy role may prioritize distributed systems and database performance, while another role with the same title may prioritize React architecture and user experience metrics. Submitting one static resume for both usually weakens fit for each. A better approach is to keep a core history but adjust bullet ordering, keyword emphasis, and examples based on the posting. This allows your strongest evidence to match the team's immediate needs.",
    "ResumeAtlas supports this workflow by comparing your resume against a specific job description and highlighting where your evidence is strong or thin. It identifies missing terminology, ATS formatting issues, and weak bullets that fail to communicate outcomes. Instead of stuffing keywords, you can rewrite with precision and maintain truthful claims. The result is a targeted software engineer resume that reads clearly to recruiters, maps to technical expectations for hiring managers, and preserves your authentic engineering narrative.",
  ],
  commonMistakes: [
    "Relying on generic action verbs with no outcome detail. Statements such as \"implemented features\" do not show impact unless linked to performance, reliability, conversion, or productivity improvements.",
    "Listing large stacks without showing depth. Mentioning many frameworks can look unfocused unless your bullets prove ownership and tradeoff decisions in specific areas.",
    "Ignoring system context. Recruiters and managers need to know whether your work happened in monoliths, microservices, real-time systems, or high-traffic products.",
    "Using one resume for every engineering posting. Backend, frontend, platform, and product engineering roles require different evidence priorities, even under the same title.",
    "Missing collaboration and delivery signals. Engineering success depends on cross-functional execution, but many resumes omit coordination with product, design, QA, or SRE partners.",
    "Overstating architecture ownership. Claims like \"designed entire platform\" can damage credibility if no concrete scope, timeline, or results support the statement.",
    "Failing to quantify performance and reliability improvements. Metrics such as p95 latency, error rate, deployment frequency, or incident reduction help evaluators assess seniority.",
  ],
  topSkills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Node.js",
    "REST API design",
    "System design",
    "SQL and database performance",
    "Testing and quality engineering",
    "Cloud deployment",
    "CI/CD automation",
    "Performance optimization",
    "Cross-functional collaboration",
  ],
  skillsNarrative:
    "Effective software engineer resumes show a coherent mix of coding ability, system judgment, and delivery impact. Core stack skills are expected, but hiring teams decide based on evidence of problem-solving under real constraints. Prioritize the skills that match the posting and tie each to measurable results in your experience bullets. For example, pair API design with reduced failure rates, or frontend work with improved conversion and load speed. Include testing and deployment practices to show production discipline, not only feature shipping. This structure demonstrates that you can deliver reliable software in collaborative environments, adapt to evolving architecture needs, and produce outcomes that matter beyond code completion.",
  beforeExample: {
    before: "Worked on checkout features and improved site performance using React and Node.",
    after:
      "Owned checkout enhancements across React and Node services, reduced p95 checkout latency by 34%, and increased completed purchase rate by 6.8% over two release cycles.",
  },
  beforeAfterContext:
    "The revised bullet improves hiring clarity by naming scope, technical surface area, and measurable outcomes. It turns a vague activity statement into evidence of ownership and business impact. Recruiters can quickly identify role fit, while engineering managers gain enough detail to evaluate complexity and execution quality. This format also improves ATS parsing because important terms such as checkout, latency, and release cycles are embedded naturally in a result-driven narrative.",
  howAtlasOptimizes: [
    {
      heading: "ATS compatibility",
      body:
        "ResumeAtlas verifies that your software engineer resume structure is parse-friendly for ATS systems, reducing the risk that key skills and achievements are dropped during ingestion. It flags formatting issues like multi-column layouts, inconsistent headers, and dense visual sections that often break extraction. This is useful for engineers who use project-heavy resume designs. The optimizer keeps content technically rich while ensuring that chronology, stack details, and outcome bullets remain visible to automated screening.",
    },
    {
      heading: "Keyword matching",
      body:
        "The keyword matcher compares your resume to the exact software engineer posting and highlights terminology gaps across role-specific themes such as backend architecture, frontend frameworks, testing practices, and cloud deployment. It distinguishes core requirements from optional language so you can prioritize edits efficiently. Suggestions focus on integrating terms where you have proof, not repeating words artificially. This raises ATS match quality and helps hiring teams see a direct connection between your experience and the target role.",
    },
    {
      heading: "Missing skills detection",
      body:
        "ResumeAtlas identifies skills that the posting emphasizes but your resume does not clearly evidence, including soft requirements like ownership, debugging depth, and collaboration patterns. Many software resumes mention tools but miss delivery signals such as incident response, release cadence, or mentoring. The optimizer surfaces these hidden gaps and points to relevant past work that can fill them through better framing. This gives you a stronger, more balanced profile without inventing new experience.",
    },
    {
      heading: "Resume tailoring",
      body:
        "Tailoring recommendations help you reorganize your resume around the target engineering role. For frontend-focused jobs, user experience and performance bullets can lead. For backend-focused jobs, API reliability and data modeling outcomes can move higher. ResumeAtlas supports these shifts while keeping your base history intact. The result is a posting-specific narrative that improves first-pass relevance and helps reviewers quickly find the evidence they care about for immediate team impact.",
    },
    {
      heading: "Optimization recommendations",
      body:
        "The optimizer generates concrete rewrite prompts that transform weak bullets into action-plus-impact statements. It encourages clear ownership language, stronger metric usage, and concise technical context so your experience is easier to evaluate. Recommendations are editable, allowing you to keep your voice and factual precision while accelerating resume iteration. For software engineers applying across multiple teams, this process reduces manual overhead and improves consistency in quality from one tailored application to the next.",
    },
  ],
  faq: [
    {
      question: "How should I tailor a software engineer resume for backend versus frontend roles?",
      answer:
        "Prioritize evidence that matches the role focus instead of keeping a fixed ordering. For backend roles, lead with API design, data modeling, reliability, and scalability outcomes. For frontend roles, lead with user-facing delivery, performance, accessibility, and experiment impact. Keep your broader skills, but move role-relevant bullets to the top and align terminology with the posting. This helps recruiters and managers quickly confirm fit and reduces the chance that strong but less relevant work distracts from your core candidacy.",
    },
    {
      question: "What metrics are most useful in software engineer resume bullets?",
      answer:
        "Use metrics that tie technical changes to user or business outcomes. Useful examples include latency reduction, error rate reduction, uptime improvements, deployment frequency gains, conversion lift, or support ticket decline. Include baseline context when possible, because percentages without starting points can feel vague. Metrics should illuminate impact, not decorate bullets. A clear link between implementation and result helps hiring teams evaluate both technical execution and product value.",
    },
    {
      question: "Is it better to include many technologies or focus on fewer?",
      answer:
        "Focus on technologies that are relevant to the target role and supported by evidence in your bullets. A long skill list can look impressive but often weakens credibility if depth is unclear. Recruiters and managers care more about demonstrated ownership than tool count. Keep a concise skills section, then prove your strongest technologies through project outcomes and architectural decisions. Tailoring the list per application improves ATS relevance and makes your resume easier to review.",
    },
    {
      question: "Should I include open-source and side projects on my software engineer resume?",
      answer:
        "Include them when they strengthen role fit or fill gaps in recent professional experience. Open-source contributions can demonstrate code quality, collaboration, and initiative, especially if they map to the target stack. Side projects are useful when they show meaningful engineering complexity and measurable usage or performance outcomes. Keep entries concise and outcome-focused. If projects are less relevant than your core work history, they should support rather than dominate the resume narrative.",
    },
    {
      question: "How can I improve ATS performance without making my resume robotic?",
      answer:
        "Use posting terminology in context-rich bullets rather than repeating keywords in isolation. Keep a clean structure with clear section headers, consistent formatting, and straightforward chronology. Then integrate role-specific terms where they naturally belong, such as frameworks in implementation details or reliability terms in impact statements. This keeps language human while still improving machine matching. ResumeAtlas helps by showing exactly where missing terms can be added credibly based on your existing experience.",
    },
    {
      question: "How often should I customize my software engineer resume?",
      answer:
        "Customize for every high-priority role, especially when team responsibilities differ. Even within software engineering, postings vary on architecture, domain, and collaboration expectations. A one-size-fits-all resume usually underperforms because it dilutes relevance. Use a strong base version, then adjust bullet order, skill emphasis, and terminology for each application. This level of tailoring improves screening outcomes and interview quality because reviewers see clearer alignment with their current hiring needs.",
    },
  ],
  relatedExamplePath: "/software-engineer-resume-guide",
  relatedKeywordsPath: "/software-engineer-resume-keywords",
};
