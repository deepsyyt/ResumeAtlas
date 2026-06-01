import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";

export const DATA_ENGINEER_RESUME_GUIDE_PATH = "/data-engineer-resume-guide" as const;

export const DATA_ENGINEER_RESUME_GUIDE = {
  path: DATA_ENGINEER_RESUME_GUIDE_PATH,
  roleName: "Data Engineer",
  title: `Data Engineer Resume Guide (${CONTENT_FRESHNESS_YEAR} ATS Sections & Bullets)${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "Data engineer resume guide: summary, skills, pipeline bullets, projects, and ATS-safe structure. Links to full example, keywords, and free JD matcher.",
  h1: `Data Engineer Resume Guide (${CONTENT_FRESHNESS_YEAR})`,
  intro:
    "This guide covers how to structure a data engineer resume for ATS and hiring managers—pipeline ownership, warehouse platforms, orchestration, and reliability metrics. For a full annotated sample with recruiter review, use the data engineer resume example page; for keyword lists, use the keywords hub.",
  examplePath: "/resume-examples/data-engineer",
  keywordsPath: "/data-engineer-resume-keywords",
  sections: [
    {
      id: "summary",
      title: "Professional summary",
      body: "Lead with years of experience, primary stack (e.g. Spark, Airflow, Snowflake), and one proof metric (freshness, cost, scale). Avoid generic “passionate data professional” lines—name orchestration and cloud platforms the posting uses.",
      bullets: [
        "Data engineer with 5 years building batch and streaming pipelines on AWS and Snowflake, focused on SLAs and data quality.",
        "Owns Airflow DAGs and PySpark jobs processing billions of events/day; cut warehouse spend 26% through right-sizing and clustering.",
      ],
    },
    {
      id: "skills",
      title: "Skills section",
      body: "Group by pipeline, warehouse, and cloud. Every tool in Skills should appear in at least one Experience bullet—recruiters and ATS both weight proof over lists.",
      bullets: [
        "Python · PySpark · SQL · Airflow · dbt · Snowflake · AWS (S3, Glue) · Kafka · Terraform",
      ],
    },
    {
      id: "experience",
      title: "Experience bullets",
      body: "Use action + system + metric. Hiring managers want volume, runtime, cost, defect prevention, and cross-team ownership—not task lists.",
      bullets: [
        "Built PySpark jobs processing 1.8B events/day into Snowflake marts; reduced batch runtime from 3.1h to 55m via partitioning.",
        "Owned Airflow DAGs for core revenue pipelines; improved on-time freshness from 92% to 99.4%.",
        "Implemented Great Expectations checks on critical facts, preventing P1 incidents tied to null keys.",
      ],
    },
    {
      id: "projects",
      title: "Projects (entry-level & career switchers)",
      body: "If you lack full-time DE titles, show one end-to-end pipeline: ingestion → transform → warehouse table with documented volume and schedule.",
      bullets: [
        "End-to-end ETL capstone: Kafka → Spark → S3 → Snowflake with daily Airflow schedule and data quality tests on primary keys.",
      ],
    },
    {
      id: "ats-format",
      title: "ATS-safe format",
      body: "Single column, standard headings (Summary, Skills, Experience, Education). No tables, icons, or text boxes in the body. Save as .docx or PDF exported from a plain editor.",
      bullets: [],
    },
  ],
  faq: [
    {
      question: "What is the difference between the data engineer resume guide and resume example?",
      answer:
        "This guide explains section patterns and bullets. The resume example page includes a full sample, ATS breakdown, and recruiter review.",
    },
    {
      question: "Should I list Spark on a data engineer resume?",
      answer: "Yes when you have production Spark work—include scale, runtime, or cost outcomes, not only the logo.",
    },
    {
      question: "How do I tailor a data engineer resume to a job description?",
      answer:
        "Mirror orchestration, warehouse, and cloud terms from the posting, then run your draft against the JD in ResumeAtlas to find gaps.",
    },
  ],
} as const;
