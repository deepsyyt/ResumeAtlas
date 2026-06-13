import {
  buildRoleOptimizerMetaDescription,
  buildRoleOptimizerMetaTitle,
  buildRoleOptimizerH1,
  buildRoleOptimizerPath,
  type RoleOptimizerContent,
} from "@/app/lib/roleOptimizerContent";

const slug = "data-scientist";
const roleName = "Data Scientist";

export const dataScientistOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName,
  title: buildRoleOptimizerMetaTitle(roleName),
  description: buildRoleOptimizerMetaDescription(roleName),
  h1: buildRoleOptimizerH1(roleName),
  targetKeywords: [
    "compare data scientist resume to job description",
    "tailor data scientist resume to job description",
    "data scientist resume match job description",
    "ATS data scientist resume",
    "data science resume optimization",
    "machine learning resume keywords",
    "feature engineering resume bullets",
    "model deployment resume examples",
  ],
  jdDemonstration: {
    sectionTitle: "Data scientist resume match example",
    intro:
      "Below is a realistic walkthrough: a sample job description, what a draft resume misses, the match score ResumeAtlas would surface, and how one bullet changes after optimization.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "Python",
      "SQL",
      "Machine Learning",
      "A/B Testing",
      "Forecasting",
      "Stakeholder Communication",
    ],
    matchScore: 68,
    missingKeywords: ["A/B Testing", "Forecasting", "Experiment Design"],
    beforeBullet: "Built predictive models for customer churn.",
    afterBullet:
      "Developed XGBoost and forecasting models on 14 months of behavioral data that improved churn prediction accuracy by 18% and informed retention A/B tests across three customer segments.",
    outro:
      "Paste your resume and the real posting into the free compare and optimize tool to run match score, gap analysis, and AI rewrites on your posting",
  },
  keywordSection: {
    h2: "ATS keywords for data scientist resumes",
    intro:
      "These terms appear repeatedly in data scientist job descriptions and ATS filters. Use them where you have evidence, not as a disconnected skills dump.",
    checklist: [
      "Python",
      "SQL",
      "Machine Learning",
      "Feature Engineering",
      "A/B Testing",
      "Forecasting",
      "Deep Learning",
      "Statistical Modeling",
      "Experimentation",
      "Model Deployment",
    ],
    body:
      "ResumeAtlas compares these keywords against the job description you paste and highlights missing skills in your bullets and skills section. Start with the checklist, then run a match analysis on your target posting to see which requirements your resume never states.",
  },
  introParagraphs: [
    "Data scientist hiring has become unusually signal heavy. Most postings combine broad strategy expectations with deeply specific tooling requirements, then add domain constraints such as finance, healthcare, or marketplace analytics. Recruiters and hiring managers are not simply scanning for Python or machine learning anymore. They are judging whether you can frame a business question, define a robust experimental setup, choose practical modeling tradeoffs, and communicate outcomes in language that non technical partners can act on. A generic resume that lists methods without outcomes typically looks interchangeable, even when the candidate is strong.",
    "The resume challenge is that data science work is often nonlinear and collaborative. You may spend weeks cleaning source data, validating assumptions, designing offline metrics, and coordinating with engineering before any visible launch happens. If your resume only states that you built models and improved accuracy, it misses the true hiring signal. Teams want to see production relevance, not only notebook work. They want confidence that your work moved a KPI, reduced risk, shortened decision time, or improved the reliability of a downstream process. The strongest resumes map technical choices directly to product or operational impact.",
    "Job descriptions for data scientists also vary by maturity of the company. Early stage teams expect broad ownership across analysis, modeling, and stakeholder communication. Larger organizations often split responsibilities between experimentation, decision science, applied research, and platform-focused science. Resume tailoring is therefore not cosmetic. It is a precision task where you align your evidence to the role archetype in front of you. If a posting emphasizes causal inference and experimentation, your resume should foreground test design and business decision influence. If it emphasizes recommendation systems, your bullets should highlight retrieval, ranking, and online performance outcomes.",
    "ResumeAtlas helps convert scattered project history into targeted evidence for each posting. Instead of forcing you into keyword stuffing, the optimizer surfaces which requirements you already satisfy and where proof is missing in your bullets. You can then rewrite with a clean structure that preserves factual accuracy while improving ATS match quality. This process is especially valuable for data scientists because subtle language changes can affect both machine parsing and human interpretation. A tailored resume should read like a coherent story of analytical judgment, engineering collaboration, and measurable impact, not a list of disconnected methods.",
  ],
  commonMistakes: [
    "Listing model names without business context. Bullets like \"built XGBoost model\" are weak unless you specify the decision it supported, the baseline, and the measurable impact on revenue, cost, risk, or user behavior.",
    "Overweighting academic metrics that are not tied to production goals. Reporting only AUC or F1 can be incomplete when the role cares about latency, calibration, forecast stability, or downstream operational constraints.",
    "Hiding data quality and feature pipeline ownership. Many candidates skip the hardest work they did, such as source validation, feature freshness controls, and label leakage prevention, which are key hiring signals.",
    "Using vague collaboration language. Statements like \"worked with stakeholders\" do not show influence. Strong bullets explain which teams were involved, what decision changed, and what timeframe improvement followed.",
    "Claiming end to end ownership without architectural detail. If you mention deployment, include where and how the model shipped, such as batch scoring, API inference, monitoring setup, and rollback safeguards.",
    "Copying generic skill blocks for every application. Data science postings differ sharply by domain and maturity, so failing to reorder skills and projects for the target role can reduce both ATS match and recruiter confidence.",
    "Not quantifying experiment rigor. For experimentation-focused jobs, resumes often miss sample sizing, segmentation logic, or guardrail metrics, making it hard to trust that reported gains are statistically dependable.",
  ],
  topSkills: [
    "Python",
    "SQL",
    "Machine learning",
    "Statistical modeling",
    "Experimentation design",
    "Feature engineering",
    "Model evaluation",
    "Data visualization",
    "Stakeholder communication",
    "A/B testing",
    "Model deployment",
    "Forecasting",
  ],
  skillsNarrative:
    "Top data scientist resumes combine analytical depth with execution evidence. Hiring teams want to see core modeling and statistics, but they also want proof that you can frame ambiguous problems, build reliable datasets, and collaborate across product and engineering boundaries. Prioritize the skills that appear repeatedly in the target posting, then connect each to a concrete result in your experience section. For example, if experimentation is central, pair A/B testing and statistical modeling with a decision outcome, not only a p value. If deployment is central, tie model work to latency, reliability, and monitoring practices. This framing demonstrates judgment and production readiness rather than tool familiarity alone.",
  beforeExample: {
    before: "Built churn prediction model in Python and improved model performance for subscription users.",
    after:
      "Built a Python churn model on 14 months of behavioral and billing data, improved recall from 0.61 to 0.79, and enabled retention teams to prioritize outreach that reduced quarterly logo churn by 11%.",
  },
  beforeAfterContext:
    "The stronger bullet keeps the same core achievement but adds hiring-relevant evidence. It names the dataset scope, clarifies the metric that improved, and links the technical output to a business process that drove measurable retention impact. This matters because recruiters can quickly assess both rigor and practical value. The revised version also reads naturally for ATS systems by including role-aligned terms such as behavioral data, recall, and retention outreach without repeating keywords unnaturally.",
  howAtlasOptimizes: [
    {
      heading: "ATS compatibility",
      body:
        "ResumeAtlas checks whether your data scientist resume uses parser-friendly structure so critical details are not lost before review. It flags layout risks, unclear section labels, and formatting patterns that commonly break extraction of skills, project outcomes, and role chronology. For candidates with research-heavy or portfolio-heavy histories, this is important because dense visuals can hide valuable evidence from ATS systems. The optimizer helps you keep technical credibility while ensuring machine-readable clarity.",
    },
    {
      heading: "Keyword matching",
      body:
        "The optimizer compares your resume against the exact target posting and highlights relevant gaps across data science language clusters. It distinguishes between broad terms such as machine learning and specific requirements such as causal inference, recommender systems, or time series forecasting. You can then add missing terminology where you have real experience. This improves ATS match quality while also making recruiter review faster because your resume mirrors the role vocabulary with context and proof.",
    },
    {
      heading: "Missing skills detection",
      body:
        "Data science postings often hide must-have signals in responsibilities rather than skill lists. ResumeAtlas scans both sections and detects missing evidence for methods, tools, and business competencies, including experimentation leadership and stakeholder communication. Instead of simply saying a skill is absent, it points to where your existing experience could credibly fill the gap through stronger wording. This helps you avoid fabricated claims while still presenting transferable work in language hiring teams expect for the role.",
    },
    {
      heading: "Resume tailoring",
      body:
        "Role-specific tailoring in ResumeAtlas reorders and reframes your content to match the target data scientist archetype. If a posting is product analytics oriented, your experimentation and decision support bullets can move higher. If it is modeling heavy, your feature engineering and deployment outcomes can lead. This targeted sequencing improves relevance during short recruiter scans. The output remains factual and consistent with your background, but it is positioned around the requirements that matter for that application.",
    },
    {
      heading: "Optimization recommendations",
      body:
        "The recommendation engine provides concrete rewrite guidance for weak bullets, replacing generic activity statements with tool plus action plus outcome structure. Suggestions include better metric framing, stronger baseline comparisons, and clearer descriptions of cross-functional impact. You stay in control of edits, but the system accelerates high-quality iteration so each application version is faster to produce. For data scientists applying broadly, this reduces manual rewriting fatigue while keeping quality standards high across postings.",
    },
  ],
  faq: [
    {
      question: "How should a data scientist resume differ from a machine learning engineer resume?",
      answer:
        "A data scientist resume usually emphasizes problem framing, experimentation, statistical reasoning, and business decision impact. A machine learning engineer resume typically leans more on production infrastructure, model serving reliability, and platform ownership. There is overlap, but your resume should match the job description emphasis. If the posting prioritizes experimentation and analytics influence, lead with those outcomes. If it prioritizes low-latency inference and deployment systems, push operational model delivery evidence higher in your experience section.",
    },
    {
      question: "What metrics should I include in data scientist resume bullets?",
      answer:
        "Use metrics that represent both model quality and business effect. Model metrics such as precision, recall, or calibration are useful when paired with context, baseline, and constraints. Business metrics such as churn reduction, conversion lift, forecast error reduction, or analyst time saved show practical value. Avoid isolated percentages with no explanation. Strong bullets connect methods to decisions and decisions to measurable outcomes, so hiring teams can evaluate technical rigor and organizational impact at the same time.",
    },
    {
      question: "Can I optimize for ATS keywords without sounding repetitive?",
      answer:
        "Yes, if keywords are integrated into evidence-based bullets instead of dumped into a large skills block. Mention terms where they naturally belong: model type in project context, tooling in implementation details, and business language in impact statements. Repetition becomes a problem when the same phrase appears without added meaning. ResumeAtlas helps by identifying missing terms and suggesting where to add them with supporting context so your resume remains readable while still improving ATS alignment.",
    },
    {
      question: "How many projects should a data scientist include on a tailored resume?",
      answer:
        "Most candidates should feature two to four high relevance projects, not every project they have done. Choose examples that map directly to the target role requirements and show clear outcomes. For senior candidates, project details can be embedded into role bullets instead of a separate projects section. Prioritize depth over breadth. Recruiters want confidence you can execute similar work in their environment, which comes from precise, contextual evidence rather than a long catalog of disconnected experiments.",
    },
    {
      question: "Should I include tools I used briefly during one internship?",
      answer:
        "Include them only if you can discuss practical usage and if they match the job description. Listing tools without credible experience can create interview risk and weaken trust. A better strategy is to categorize proficiency implicitly through bullet depth: tools you used deeply appear in outcomes, while lighter exposure can remain in a concise skills list. If a posting strongly requires a tool you used lightly, acknowledge related experience and show fast learning evidence rather than overstating expertise.",
    },
    {
      question: "How often should I tailor my data scientist resume?",
      answer:
        "Tailor for every high-priority application. Data science roles with similar titles can still differ on experimentation, NLP, forecasting, or stakeholder scope, and those differences affect screening decisions. You do not need to rewrite from scratch each time, but you should adjust ordering, terminology, and selected bullets to match the posting. Using ResumeAtlas lets you create posting-specific variants quickly, so customization becomes a repeatable workflow instead of an inconsistent manual effort.",
    },
  ],
  relatedExamplePath: "/data-scientist-resume-guide",
  relatedKeywordsPath: "/data-scientist-resume-keywords",
};
