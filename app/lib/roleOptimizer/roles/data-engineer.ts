import { buildRoleOptimizerPath, type RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";

const slug = "data-engineer";

export const dataEngineerOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName: "Data Engineer",
  title: "Data Engineer Resume Optimizer for Job Description | ResumeAtlas",
  description:
    "Tailor and optimize your data engineer resume for ATS and keyword alignment, with stronger pipeline impact bullets matched to each job description.",
  h1: "Optimize Your Data Engineer Resume for a Job Description",
  targetKeywords: [
    "data engineer resume optimizer",
    "tailor data engineer resume to job description",
    "ETL resume keywords",
    "ATS data engineer resume",
    "data pipeline resume optimization",
    "data warehouse resume bullets",
    "Spark and Airflow resume examples",
  ],
  jdDemonstration: {
    sectionTitle: "Data engineer resume match example",
    intro:
      "This walkthrough shows how ResumeAtlas evaluates a draft data engineer resume against a typical posting before and after one targeted bullet rewrite.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "Apache Spark",
      "Airflow orchestration",
      "ETL pipeline design",
      "Data warehouse modeling",
      "Pipeline latency optimization",
      "Snowflake",
      "Data quality monitoring",
    ],
    matchScore: 64,
    missingKeywords: ["dbt", "Pipeline latency", "Data quality checks", "Schema evolution"],
    beforeBullet: "Built ETL jobs to move data into our warehouse for analytics.",
    afterBullet:
      "Engineered Spark ETL pipelines orchestrated in Airflow to load 2.1B weekly events into Snowflake, reduced end-to-end pipeline latency from 3.8 hours to 52 minutes, and implemented data quality checks that cut failed downstream reports by 41%.",
    outro:
      "Use the free compare and optimize tool to run match score, gap analysis, and AI rewrites on your posting",
  },
  keywordSection: {
    h2: "ATS keywords for data engineer resumes",
    intro:
      "These terms appear frequently in modern data engineer postings and ATS filters. Include them where your bullets prove real implementation depth.",
    checklist: [
      "Apache Spark",
      "Airflow",
      "ETL",
      "ELT",
      "Data warehouse",
      "Snowflake",
      "dbt",
      "Pipeline latency",
      "Data quality",
      "Schema evolution",
    ],
    body:
      "ResumeAtlas compares these keywords against the job description you paste and highlights missing skills across your bullets and skills section. You can then close gaps with evidence-based edits instead of stuffing isolated terms.",
  },
  introParagraphs: [
    "Data engineering hiring focuses on reliability, scale, and delivery speed, but many resumes still read like tool inventories. Listing Spark, Airflow, and Snowflake is not enough when teams are under pressure to improve data freshness, reduce pipeline failures, and support analytics and machine learning consumers with stable contracts. Recruiters look for signals that you can design systems that survive growth. They want to see thoughtful architecture choices, dependable operations, and measurable improvements in throughput, latency, cost, or incident rate. A generic resume rarely communicates this clearly.",
    "The challenge is that data engineer work often spans invisible infrastructure changes that are hard to summarize. You may spend quarters migrating orchestration, redesigning partition strategies, implementing schema governance, or fixing batch dependencies that silently delayed executive dashboards. These efforts matter, but weak bullets hide the outcome by describing tasks without operational evidence. A stronger resume shows how your design decisions changed business reliability. For example, reducing late-arriving data from six hours to thirty minutes has direct downstream impact on forecasting, campaign optimization, and reporting trust.",
    "Job descriptions also differ widely between platform engineering, analytics engineering support, and product data engineering. Some roles prioritize streaming and event architecture. Others emphasize dimensional modeling, dbt development standards, and stakeholder delivery cadence. Tailoring is therefore critical. Instead of submitting one static resume, align project selection and wording with the target role. If the posting highlights governance and lineage, foreground your metadata and quality controls. If it highlights real-time systems, foreground your ingestion architecture and latency improvements.",
    "ResumeAtlas helps data engineers translate infrastructure work into hiring-relevant evidence. The optimizer maps your existing bullets to posting requirements, surfaces missing keywords, and suggests rewrites that connect technical implementation to reliability and business outcomes. This avoids the common trap of keyword stuffing while still improving ATS coverage. You keep full control over wording, but each application becomes faster to prepare and more precise. The result is a resume that presents you as an engineer who builds dependable data systems, not just someone familiar with a stack.",
  ],
  commonMistakes: [
    "Using vague ETL language with no scale context. Strong data engineering bullets should mention data volume, job frequency, SLA expectations, and measurable changes in throughput or failure rates.",
    "Failing to distinguish architecture work from maintenance work. Recruiters need to know which improvements required design ownership versus routine operational support.",
    "Omitting reliability metrics. If you improved data quality checks, orchestration, or retries, include outcomes such as reduced incident count, improved SLA compliance, or faster recovery time.",
    "Mixing analytics engineer and platform engineer signals without prioritization. A resume should align with the role target, otherwise it can appear unfocused despite strong experience.",
    "Listing cloud tools without describing deployment patterns. Mentioning AWS or GCP alone is weak unless you explain services used, tradeoffs made, and resulting performance or cost impact.",
    "Ignoring stakeholder impact. Data engineering is technical, but hiring teams still want proof that your work improved decision speed, dashboard trust, or machine learning readiness.",
    "Not showing governance and schema discipline. Mature teams look for evidence of contracts, lineage, and change management, especially in regulated or high-scale environments.",
  ],
  topSkills: [
    "SQL",
    "Python",
    "Apache Spark",
    "Airflow",
    "Data warehousing",
    "ETL and ELT design",
    "Dimensional modeling",
    "dbt",
    "Cloud data platforms",
    "Data quality monitoring",
    "Streaming pipelines",
    "Schema governance",
  ],
  skillsNarrative:
    "A competitive data engineer resume balances systems depth with evidence of dependable delivery. Start with foundational skills such as SQL, Python, and warehouse design, then emphasize platform-specific strengths that match the posting, such as Spark optimization, orchestration workflows, or streaming architecture. The strongest resumes show how these skills improved reliability, freshness, and stakeholder trust. For example, pairing Airflow with SLA recovery improvements is more persuasive than listing Airflow alone. Treat each skill as a means to an operational outcome. This approach helps both ATS systems and human reviewers understand that you can design robust pipelines, maintain quality under change, and support analytics and machine learning teams at production scale.",
  beforeExample: {
    before: "Built data pipelines with Airflow and Spark to move data into the warehouse for reporting.",
    after:
      "Designed Airflow and Spark pipelines ingesting 1.8B events daily into Snowflake, cut end-to-end latency from 4.5 hours to 55 minutes, and raised on-time dashboard delivery from 82% to 98%.",
  },
  beforeAfterContext:
    "The improved bullet adds scale, architecture context, and measurable reliability outcomes. It helps hiring teams evaluate whether your work maps to their production environment, not just whether you touched similar tools. Including latency and delivery improvements also demonstrates that your engineering contributed to business decision quality. ATS systems benefit from specific terms such as Snowflake, Spark, and pipeline latency, while human reviewers gain confidence that you can balance performance and operational consistency.",
  howAtlasOptimizes: [
    {
      heading: "ATS compatibility",
      body:
        "ResumeAtlas checks whether technical details in your data engineering resume remain machine-readable in ATS pipelines. It flags formatting choices that often break extraction of architecture highlights, project timelines, and key tools. This is especially useful for engineers with dense platform content where tables or multi-column layouts can hide important evidence. By enforcing parser-friendly structure, the optimizer helps ensure that reliability and scale achievements are visible at screening instead of being lost in ingestion.",
    },
    {
      heading: "Keyword matching",
      body:
        "The tool compares your resume text to the target data engineer posting and maps your experience against required terminology. It highlights missing or underrepresented keywords across core areas like orchestration, warehousing, streaming, and governance. Rather than suggesting blind repetition, it points to where relevant terms can be added with truthful context. This improves ATS recall and also helps recruiters scan quickly by seeing familiar language aligned to actual implementation and outcome evidence.",
    },
    {
      heading: "Missing skills detection",
      body:
        "ResumeAtlas identifies gaps between role requirements and your current evidence, including operational responsibilities that are often implied but not written. For example, many resumes mention pipeline creation but omit observability, incident response, or schema evolution practices. The optimizer surfaces these missing signals and suggests how to represent transferable experience accurately. This is valuable when moving between analytics-heavy and platform-heavy roles, where the same background can be framed differently depending on the posting priorities.",
    },
    {
      heading: "Resume tailoring",
      body:
        "Tailoring recommendations adjust ordering and emphasis so your resume reflects the target data engineering archetype. If the posting is streaming-focused, event processing and low-latency architecture can lead. If the posting is warehouse-centric, modeling standards and data quality controls can take precedence. ResumeAtlas helps structure this shift without rewriting your full history. The result is a role-specific narrative that improves relevance in first-pass reviews and positions your strongest evidence where decision makers look first.",
    },
    {
      heading: "Optimization recommendations",
      body:
        "The optimizer provides practical bullet rewrites that convert tool-first statements into outcome-driven evidence. Suggestions include adding data scale, reliability baselines, and delivery impact while keeping wording concise. It also prompts stronger action verbs and clearer ownership boundaries so reviewers can judge seniority accurately. For high-volume applications, this speeds up iteration and keeps quality consistent. You get posting-specific improvements without sacrificing factual integrity or spending excessive time manually rebuilding every bullet.",
    },
  ],
  faq: [
    {
      question: "What should a data engineer resume emphasize for modern roles?",
      answer:
        "Prioritize evidence of reliability, scalability, and stakeholder impact. Modern data engineering teams need more than pipeline creation. They need engineers who can manage schema evolution, monitor quality, and keep data products trustworthy as systems grow. Include outcomes such as latency reduction, SLA improvement, cost efficiency, or incident reduction. Also show collaboration with analytics, machine learning, and platform teams. This combination signals that you can own both technical architecture and the business reliability that depends on it.",
    },
    {
      question: "How do I show scale without exposing sensitive company data?",
      answer:
        "Use directional or range-based metrics that communicate magnitude while protecting confidential details. For example, describe event volume bands, processing frequency, latency changes, or percentage improvements instead of exact revenue numbers. You can also reference relative growth, such as a tenfold increase in throughput handled without SLA degradation. The goal is to provide enough context for reviewers to assess complexity. Scale framing is essential because it helps hiring teams evaluate whether your experience matches their system demands.",
    },
    {
      question: "Should I include both batch and streaming experience if the posting focuses on one?",
      answer:
        "Include both only if relevant, but prioritize the mode emphasized by the posting. If a role is streaming-heavy, lead with event ingestion, windowing, and low-latency architecture outcomes. Keep batch work as supporting evidence unless it is directly connected. If the role is warehouse-focused, reverse that emphasis. Tailoring does not mean hiding capabilities. It means presenting the most decision-relevant evidence first so reviewers can quickly map your strengths to immediate team needs.",
    },
    {
      question: "How technical should my bullets be for recruiter screens?",
      answer:
        "Write at a level that remains understandable to recruiters while still credible for engineering managers. Include core tools and architecture terms, but anchor them in outcomes that non-specialists can interpret, such as faster dashboard delivery or lower pipeline failure rates. Avoid overly abstract infrastructure descriptions that lack context. A good rule is to combine one technical mechanism with one measurable impact in each strong bullet. This balances keyword coverage with clear business relevance.",
    },
    {
      question: "Is a separate projects section necessary for experienced data engineers?",
      answer:
        "Not always. For experienced candidates, project impact is often stronger when integrated into role bullets under each company. A separate projects section can still help if it highlights highly relevant technologies missing from recent roles or demonstrates specialized skills like streaming architecture. Keep it concise and outcome-oriented. Recruiters care less about project count and more about evidence quality. Use whichever structure best supports a clear narrative aligned to the target job description.",
    },
    {
      question: "How frequently should I update my tailored data engineer resume?",
      answer:
        "Update it for every priority application and after major role changes. Data engineering requirements shift quickly across companies, and even similar titles can differ on orchestration, cloud stack, and governance expectations. A reusable base resume is useful, but posting-specific edits are what improve match quality. ResumeAtlas can accelerate this by preserving your core content while surfacing gaps and recommending focused rewrites, so you can tailor consistently without rebuilding documents from scratch.",
    },
  ],
  relatedExamplePath: "/data-engineer-resume-guide",
  relatedKeywordsPath: "/data-engineer-resume-keywords",
};
