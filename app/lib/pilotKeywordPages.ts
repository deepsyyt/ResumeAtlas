import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";

export type PilotKeywordSlug = "data-engineer" | "sql-developer" | "power-bi" | "ai-engineer" | "python-developer";

export type KeywordCategoryBlock = {
  heading: string;
  terms: string[];
};

export type PilotKeywordSeniorityTier = {
  label: string;
  keywords: string[];
};

export type PilotKeywordPageConfig = {
  slug: PilotKeywordSlug;
  path: string;
  roleName: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  roleOverview: string;
  scopeNote: string;
  keywordCategories: KeywordCategoryBlock[];
  seniority: { title: string; tiers: PilotKeywordSeniorityTier[] };
  tools: string[];
  domainVerbs: string[];
  topKeywords: string[];
  exampleBullets: string[];
  keywordMistakes: string[];
  placementStrategy: { section: string; guidance: string }[];
  resumeSnippets: { label: string; text: string }[];
  howResumeAtlasScores: string;
  relatedKeywordPages: { path: string; label: string }[];
  relatedGuidePages: { path: string; label: string }[];
  faq: { question: string; answer: string }[];
};

function pathFor(slug: PilotKeywordSlug): string {
  return `/${slug}-resume-keywords`;
}

export const PILOT_KEYWORD_PAGES: Record<PilotKeywordSlug, PilotKeywordPageConfig> = {
  "data-engineer": {
    slug: "data-engineer",
    path: pathFor("data-engineer"),
    roleName: "Data Engineer",
    h1: `Data Engineer Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS Guide)`,
    title: `150+ Data Engineer Resume Keywords That Pass ATS (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Data engineer resume keywords for ATS: Spark, Airflow, Snowflake, Databricks, Kafka, ETL, dbt, AWS. Copy 150+ terms, bullets, and scan your resume vs the JD free.",
    intro:
      "Data engineer resume keywords that match how ATS and hiring managers read pipeline, warehouse, and orchestration roles in 2026—grouped by stack, seniority, and where to place terms so they count as proof, not stuffing.",
    roleOverview:
      "Data engineers build and operate the pipelines, warehouses, and batch or streaming jobs that feed analytics and product features. Recruiters scan for orchestration (Airflow, Dagster), compute (Spark, SQL engines), cloud data platforms (Snowflake, BigQuery, Redshift, Databricks), ingestion (Kafka, Kinesis), and reliability practices (data quality, SLAs, observability). Your resume should show ownership of end-to-end data movement—not only tool names—with outcomes like latency, cost, freshness, and defect rates.",
    scopeNote:
      "This page targets data engineer, analytics engineer (pipeline-heavy), and ETL developer titles. For dashboard-centric analytics roles, use data analyst keywords. For modeling and experiments, use data scientist keywords. For BI semantic layers and executive reporting, use business intelligence keywords.",
    keywordCategories: [
      {
        heading: "Core skills",
        terms: [
          "Data engineering",
          "ETL",
          "ELT",
          "Data pipelines",
          "Data modeling",
          "Dimensional modeling",
          "Data warehouse",
          "Data lake",
          "Batch processing",
          "Stream processing",
          "Data quality",
          "Data governance",
          "Schema design",
          "Incremental loads",
          "Idempotent pipelines",
          "Reverse ETL",
          "Data contracts",
          "Metadata management",
          "Pipeline monitoring",
        ],
      },
      {
        heading: "Technical skills",
        terms: [
          "Apache Spark",
          "PySpark",
          "SQL",
          "Python",
          "Scala",
          "Distributed systems",
          "Partitioning",
          "Parquet",
          "Avro",
          "CDC",
          "Change data capture",
          "API ingestion",
          "REST ingestion",
          "Data lineage",
          "Orchestration",
          "Workflow scheduling",
          "Query optimization",
          "Window functions",
          "Data replication",
          "Lakehouse",
          "Object storage",
          "Serverless compute",
        ],
      },
      {
        heading: "Tools",
        terms: [
          "Apache Airflow",
          "Dagster",
          "Prefect",
          "dbt",
          "Fivetran",
          "Airbyte",
          "Apache Kafka",
          "Spark SQL",
          "Great Expectations",
          "Terraform",
          "Docker",
          "Kubernetes",
          "Git",
          "CI/CD",
          "Jenkins",
          "GitHub Actions",
          "Luigi",
          "Apache Flink",
          "Debezium",
          "dbt Cloud",
          "Monte Carlo",
          "Soda",
        ],
      },
      {
        heading: "Platforms & cloud",
        terms: [
          "Snowflake",
          "Databricks",
          "Amazon Redshift",
          "Google BigQuery",
          "AWS Glue",
          "Amazon S3",
          "AWS Lambda",
          "Amazon Kinesis",
          "Azure Data Factory",
          "Azure Synapse",
          "Google Cloud Storage",
          "GCP Dataflow",
          "Delta Lake",
          "Iceberg",
          "Hive",
          "HDFS",
          "Amazon EMR",
          "AWS Step Functions",
          "GCP Composer",
          "Azure Databricks",
          "Redshift Spectrum",
          "S3 data lake",
        ],
      },
      {
        heading: "Methodologies",
        terms: [
          "Medallion architecture",
          "Bronze silver gold",
          "Kimball",
          "Star schema",
          "Slowly changing dimensions",
          "SCD Type 2",
          "Data mesh",
          "FinOps",
          "Cost optimization",
          "SLA monitoring",
          "Incident response",
          "Root cause analysis",
          "Agile",
          "Code review",
          "Infrastructure as code",
          "Backfill jobs",
          "Dead letter queues",
          "Exactly-once delivery",
          "Data observability",
          "Pipeline versioning",
        ],
      },
      {
        heading: "Certifications (when relevant)",
        terms: [
          "AWS Certified Data Engineer",
          "Databricks Certified Data Engineer",
          "Google Professional Data Engineer",
          "SnowPro Core",
          "Azure Data Engineer Associate",
          "Confluent Kafka certification",
        ],
      },
    ],
    seniority: {
      title: "Data engineer keywords by experience level",
      tiers: [
        {
          label: "Entry-level",
          keywords: [
            "SQL",
            "Python",
            "ETL scripts",
            "Airflow basics",
            "Git",
            "Unit tests",
            "Documentation",
            "Staging tables",
            "Data validation",
            "Ticket-driven fixes",
            "Jupyter",
            "CSV ingestion",
          ],
        },
        {
          label: "Mid-level",
          keywords: [
            "Apache Spark",
            "dbt models",
            "Snowflake",
            "Pipeline ownership",
            "Data quality checks",
            "Kafka consumers",
            "CI/CD for data",
            "On-call rotation",
            "Cost monitoring",
            "Cross-team stakeholders",
            "Dimensional models",
            "Incremental models",
          ],
        },
        {
          label: "Senior-level",
          keywords: [
            "Architecture reviews",
            "Platform standards",
            "Mentoring",
            "SLA design",
            "Capacity planning",
            "Multi-tenant warehouses",
            "Streaming at scale",
            "Governance policies",
            "Vendor evaluation",
            "Roadmap prioritization",
            "Reliability targets",
            "Executive metrics",
          ],
        },
      ],
    },
    tools: [
      "Apache Spark",
      "Airflow",
      "Snowflake",
      "Databricks",
      "dbt",
      "Kafka",
      "AWS",
      "Python",
      "SQL",
      "Terraform",
    ],
    domainVerbs: [
      "built",
      "orchestrated",
      "migrated",
      "optimized",
      "instrumented",
      "automated",
      "modeled",
      "validated",
      "deployed",
      "reduced",
    ],
    topKeywords: [
      "Data engineer",
      "ETL",
      "ELT",
      "Data pipelines",
      "Apache Spark",
      "Apache Airflow",
      "Snowflake",
      "Databricks",
      "dbt",
      "Apache Kafka",
      "AWS",
      "Python",
      "SQL",
      "Data warehouse",
      "Data lake",
      "Batch processing",
      "Stream processing",
      "Data quality",
      "Terraform",
      "Parquet",
    ],
    exampleBullets: [
      "Built PySpark ETL jobs on Databricks processing 2.1B events/day, cutting batch runtime from 4.2h to 95 minutes via partition pruning and broadcast joins.",
      "Orchestrated 40+ Airflow DAGs feeding Snowflake marts with SLA monitoring, improving on-time freshness from 91% to 99.2% over two quarters.",
      "Migrated legacy on-prem SQL Server ETL to AWS Glue and S3 landing zones, reducing monthly pipeline compute cost by 34% while preserving audit trails.",
      "Implemented Kafka-to-Snowflake streaming ingestion with schema registry checks, lowering bad-record rates in production feeds by 78%.",
      "Authored dbt models and tests for finance revenue marts, surfacing contract-level discrepancies before month-end close twice in a row.",
      "Designed medallion (bronze/silver/gold) tables in Delta Lake with incremental merges, enabling analysts to query trusted datasets 6 hours earlier.",
      "Automated data quality suites with Great Expectations on critical pipelines, preventing three P1 incidents tied to null key violations.",
      "Partnered with analytics on dimensional models (star schema, SCD Type 2) used by 120+ Looker users without manual spreadsheet exports.",
      "Tuned Snowflake warehouses and clustering keys for top spend queries, saving ~$18K/quarter in credits without hurting dashboard latency.",
      "Led Terraform modules for CI/CD data infrastructure (Docker, GitHub Actions), standardizing deploys across four product squads.",
    ],
    keywordMistakes: [
      "Listing Spark, Airflow, or Snowflake without pipeline scope, data volume, or reliability outcomes in the same bullets.",
      "Copying data analyst dashboard keywords when the job description owns ingestion, orchestration, and warehouse modeling.",
      "Stuffing 80 tools in a skills block while experience bullets only mention generic “worked with data.”",
      "Using data scientist ML terms (experiments, causal inference) for pure platform or ETL engineer roles.",
      "Omitting cloud provider context (AWS, GCP, Azure) when the posting names specific managed services.",
      "Describing batch jobs without freshness SLAs, failure handling, or idempotency language recruiters expect.",
      "Ignoring orchestration and data quality terms that appear in the first screen of the JD.",
      "Claiming Kafka or streaming experience without consumer groups, topics, lag, or schema evolution proof.",
      "Single-column resume layouts with tables or icons that break ATS parsing of tool names.",
      "One generic resume for “data roles” instead of mirroring the posting’s stack (e.g., Databricks vs Redshift).",
    ],
    placementStrategy: [
      {
        section: "Headline",
        guidance:
          "Use the exact title from the posting (Data Engineer, Analytics Engineer, ETL Developer) plus one anchor stack term, e.g. “Data Engineer | Spark, Airflow, Snowflake.”",
      },
      {
        section: "Summary",
        guidance:
          "Two to three sentences: years of experience, pipeline types (batch/stream), primary platforms, and one metric (cost, latency, volume, quality).",
      },
      {
        section: "Skills",
        guidance:
          "Group by Orchestration, Compute, Warehouse, Cloud, and Quality. List only tools you can defend in interviews—15–25 terms max.",
      },
      {
        section: "Experience",
        guidance:
          "Each bullet: verb + system built + stack + metric. Pair Spark with partition strategy; Airflow with DAG count and SLA; Snowflake with modeling or cost wins.",
      },
      {
        section: "Projects",
        guidance:
          "Highlight end-to-end pipelines (source → transform → warehouse) and tests you ran. Link public repos only if they reinforce the same stack as the JD.",
      },
    ],
    resumeSnippets: [
      {
        label: "Summary",
        text: "Data engineer with 5+ years building batch and streaming pipelines on AWS and Snowflake. Own Airflow orchestration, PySpark transforms, and dbt marts used by analytics and product teams; focused on freshness SLAs and data quality.",
      },
      {
        label: "Skills line",
        text: "Python · SQL · PySpark · Airflow · dbt · Snowflake · Databricks · Kafka · AWS (S3, Glue, Lambda) · Terraform · Great Expectations · Git · CI/CD",
      },
      {
        label: "Experience opener",
        text: "Built and operated production ETL/ELT pipelines feeding enterprise Snowflake warehouses, partnering with analytics on dimensional models and stakeholder reporting deadlines.",
      },
    ],
    howResumeAtlasScores:
      "ResumeAtlas compares your resume text to the job description the way many ATS matchers do: required tools (Spark, Airflow, warehouse platforms), pipeline verbs, and cloud terms weighted against where they appear. You get a gap list for missing keywords and weak bullets so you can add truthful proof before applying—not generic synonym stuffing.",
    relatedKeywordPages: [
      { path: "/data-analyst-resume-keywords", label: "Data analyst resume keywords" },
      { path: "/sql-developer-resume-keywords", label: "SQL developer resume keywords" },
      { path: "/power-bi-resume-keywords", label: "Power BI resume keywords" },
      { path: "/data-scientist-resume-keywords", label: "Data scientist resume keywords" },
      { path: "/business-intelligence-resume-keywords", label: "Business intelligence resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/data-engineer-resume-guide", label: "Data engineer resume guide" },
      { path: "/data-engineer-resume-guide", label: "Data engineer resume example" },
    ],
    faq: [
      {
        question: "What are the best data engineer resume keywords for ATS?",
        answer:
          "Prioritize terms from the job description: orchestration (Airflow, Dagster), compute (Spark, SQL), warehouse/lake platforms (Snowflake, Databricks, BigQuery), streaming (Kafka), IaC (Terraform), and data quality. Mirror the employer’s exact product names.",
      },
      {
        question: "How many data engineer keywords should be on a resume?",
        answer:
          "Aim for 25–35 relevant terms used naturally across summary, skills, and bullets—not a single dense list. Each major tool should appear near an outcome (volume, runtime, cost, defect rate, SLA).",
      },
      {
        question: "Are data engineer and data analyst resume keywords the same?",
        answer:
          "Overlap exists on SQL and Python, but data engineer postings emphasize pipelines, orchestration, warehouses, and streaming. Use this page for DE titles; use the data analyst page for reporting and dashboard-heavy roles.",
      },
      {
        question: "Should I include Spark and Airflow on every data engineer resume?",
        answer:
          "Only if you have real projects or jobs using them. If the JD requires Spark, show PySpark scope (batch size, optimization). If it requires Airflow, mention DAG ownership and SLAs—not just the logo.",
      },
      {
        question: "What ATS keywords matter for Snowflake vs Databricks?",
        answer:
          "Snowflake JDs often stress warehousing, roles, clustering, and cost. Databricks JDs stress Spark, Delta Lake, notebooks, and Unity Catalog. Copy the platform language from the posting verbatim.",
      },
      {
        question: "How do I show Kafka experience on a data engineer resume?",
        answer:
          "Reference topics, consumers/producers, schema registry, lag, or streaming joins—and tie them to freshness or defect metrics. Avoid listing Kafka without operational detail.",
      },
      {
        question: "Is dbt a data engineer or analyst keyword?",
        answer:
          "Both. Analytics engineers use dbt heavily; data engineers list dbt when they own warehouse transformations and tests. Include dbt if you authored models, tests, or docs—not only consumed dashboards.",
      },
      {
        question: "What certifications help data engineer ATS scans?",
        answer:
          "AWS Data Engineer, Databricks Data Engineer, Google Professional Data Engineer, and SnowPro can match filtered reqs. List them only if earned or in progress with clear status.",
      },
      {
        question: "How is analytics engineer different from data engineer on a resume?",
        answer:
          "Analytics engineer JDs skew dbt, warehouse modeling, and stakeholder metrics; data engineer JDs skew ingestion, Spark, Airflow, and platform reliability. Pick keywords from the title and first third of the description.",
      },
      {
        question: "How do I find missing data engineer keywords before applying?",
        answer:
          "Paste your resume and the job description into ResumeAtlas’s free checker to see gap terms and weak bullets, then add keywords only where you have defensible experience.",
      },
    ],
  },
  "sql-developer": {
    slug: "sql-developer",
    path: pathFor("sql-developer"),
    roleName: "SQL Developer",
    h1: `SQL Developer Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS Guide)`,
    title: `120+ SQL Developer Resume Keywords That Pass ATS (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "SQL developer resume keywords for ATS: T-SQL, PostgreSQL, query tuning, stored procedures, indexes, ETL. Copy 120+ terms and scan your resume vs the job description free.",
    intro:
      "SQL developer resume keywords aligned to how ATS and DBAs screen application and warehouse roles—query craft, performance tuning, procedural SQL, and platform-specific terms you can defend in interviews.",
    roleOverview:
      "SQL developers design, optimize, and maintain database logic that applications and analytics depend on. Hiring teams look for dialect fluency (T-SQL, PL/SQL, PostgreSQL, MySQL), performance tuning (indexes, execution plans, statistics), procedural objects (stored procedures, functions, views), data modeling basics, and safe change practices (migrations, code review, backups). Strong resumes pair tool names with throughput, latency, accuracy, or incident outcomes—not a bare list of database brands.",
    scopeNote:
      "This page is for SQL developer, database developer, and T-SQL/PL/SQL-heavy roles. For pipeline orchestration (Airflow, Spark), use data engineer keywords. For dashboard and BI delivery, use data analyst or business intelligence keywords.",
    keywordCategories: [
      {
        heading: "Core skills",
        terms: [
          "SQL development",
          "Transact-SQL",
          "T-SQL",
          "PL/SQL",
          "PostgreSQL",
          "Microsoft SQL Server",
          "Oracle Database",
          "MySQL",
          "Query optimization",
          "Query tuning",
          "Execution plans",
          "Index design",
          "Stored procedures",
          "User-defined functions",
          "Views",
          "Triggers",
          "Database design",
          "Normalization",
          "Referential integrity",
          "Data modeling",
        ],
      },
      {
        heading: "Technical skills",
        terms: [
          "Window functions",
          "CTEs",
          "Common table expressions",
          "Joins",
          "Subqueries",
          "Pivot queries",
          "Dynamic SQL",
          "Parameterized queries",
          "Temp tables",
          "Table variables",
          "Partitioning",
          "Columnstore indexes",
          "Statistics maintenance",
          "Deadlock analysis",
          "Blocking sessions",
          "Isolation levels",
          "Transactions",
          "ACID",
          "Concurrency control",
          "Query hints",
        ],
      },
      {
        heading: "Tools",
        terms: [
          "SQL Server Management Studio",
          "SSMS",
          "Azure Data Studio",
          "pgAdmin",
          "DBeaver",
          "Oracle SQL Developer",
          "Toad",
          "Redgate",
          "Flyway",
          "Liquibase",
          "SSIS",
          "dbt",
          "Git",
          "ER/Studio",
          "dbdiagram.io",
          "SQL Profiler",
          "Extended Events",
          "AWS RDS",
          "sqlcmd",
          "bcp",
        ],
      },
      {
        heading: "Platforms & cloud",
        terms: [
          "Amazon RDS",
          "Amazon Aurora",
          "Azure SQL Database",
          "Azure SQL Managed Instance",
          "Google Cloud SQL",
          "Snowflake SQL",
          "Synapse dedicated SQL pool",
          "BigQuery SQL",
          "Redshift",
          "Always On availability groups",
          "Replication",
          "Log shipping",
          "Backup and restore",
          "Point-in-time recovery",
          "High availability",
          "Disaster recovery",
        ],
      },
      {
        heading: "Methodologies",
        terms: [
          "Code review",
          "Peer review",
          "Database migrations",
          "Version control",
          "Agile",
          "Incident response",
          "Root cause analysis",
          "Change management",
          "Capacity planning",
          "Performance baselines",
          "SLA monitoring",
          "Data quality checks",
          "Unit testing SQL",
          "Regression testing",
          "Documentation standards",
        ],
      },
      {
        heading: "Certifications (when relevant)",
        terms: [
          "Microsoft Certified: Azure Database Administrator",
          "Oracle Database SQL Certified Associate",
          "Oracle PL/SQL Developer Certified Associate",
          "IBM Db2 certification",
          "AWS Database Specialty",
        ],
      },
    ],
    seniority: {
      title: "SQL developer keywords by experience level",
      tiers: [
        {
          label: "Entry-level",
          keywords: [
            "SELECT",
            "INSERT",
            "UPDATE",
            "JOINs",
            "GROUP BY",
            "Basic indexes",
            "CRUD",
            "Simple stored procedures",
            "Data validation queries",
            "Ticket fixes",
            "Documentation",
            "Git basics",
          ],
        },
        {
          label: "Mid-level",
          keywords: [
            "Query tuning",
            "Execution plans",
            "Index strategy",
            "Stored procedures",
            "ETL SQL",
            "Migration scripts",
            "Performance testing",
            "Replication support",
            "On-call",
            "Cross-team reviews",
            "Dimensional queries",
            "Reporting extracts",
          ],
        },
        {
          label: "Senior-level",
          keywords: [
            "Architecture guidance",
            "Capacity planning",
            "HA/DR design",
            "Mentoring",
            "Standards ownership",
            "Production incident lead",
            "Platform upgrades",
            "Cost optimization",
            "Security reviews",
            "Partitioning strategy",
            "Vendor escalation",
            "Roadmap input",
          ],
        },
      ],
    },
    tools: [
      "T-SQL",
      "PostgreSQL",
      "SQL Server",
      "Oracle",
      "MySQL",
      "SSMS",
      "Query tuning",
      "Stored procedures",
      "Indexes",
      "SSIS",
    ],
    domainVerbs: [
      "optimized",
      "authored",
      "refactored",
      "tuned",
      "migrated",
      "automated",
      "indexed",
      "validated",
      "deployed",
      "reduced",
    ],
    topKeywords: [
      "SQL developer",
      "T-SQL",
      "PostgreSQL",
      "SQL Server",
      "Query optimization",
      "Stored procedures",
      "Indexes",
      "Execution plans",
      "PL/SQL",
      "ETL",
      "Database design",
      "Performance tuning",
      "Views",
      "Functions",
      "Triggers",
      "Migrations",
      "Replication",
      "Azure SQL",
      "Oracle",
      "Data modeling",
    ],
    exampleBullets: [
      "Rewrote 40+ legacy T-SQL reports into set-based queries, cutting average runtime from 18 minutes to under 90 seconds on SQL Server 2019.",
      "Designed covering indexes and updated statistics on a 800M-row fact table, reducing nightly ETL blocking incidents by 72%.",
      "Authored idempotent migration scripts in Flyway for PostgreSQL schema changes across dev/stage/prod with zero failed deploys over 12 releases.",
      "Built parameterized stored procedures for a billing API team, eliminating SQL injection risk and standardizing access patterns for 6 applications.",
      "Tuned PL/SQL packages in Oracle 19c using AWR snapshots, lowering peak CPU on month-end close jobs from 89% to 41%.",
      "Automated index maintenance and integrity checks with SQL Agent jobs, preventing three P1 outages tied to fragmented heaps.",
      "Partnered with data engineers on SSIS packages loading Azure SQL, documenting source-to-target mappings used by analytics stakeholders.",
      "Refactored dynamic SQL modules to use sp_executesql with plan guides, stabilizing plan cache churn that caused morning latency spikes.",
      "Implemented row-level security patterns in SQL Server for multi-tenant SaaS data, passing external audit with no critical findings.",
      "Mentored junior developers on reading execution plans and index seeks vs scans, improving PR review turnaround by 30%.",
    ],
    keywordMistakes: [
      "Listing SQL Server, Oracle, and PostgreSQL without showing which dialect you used in production bullets.",
      "Copying data engineer Spark/Airflow keywords when the posting is pure SQL development and tuning.",
      "Claiming “advanced SQL” with only SELECT statements and no tuning, indexing, or procedural proof.",
      "Omitting execution plan, index, or runtime language for performance-focused roles.",
      "Stuffing 50 database acronyms in skills while experience mentions only “wrote queries.”",
      "Using data analyst dashboard terms without ETL, stored procedure, or schema ownership when the JD is developer-heavy.",
      "Ignoring cloud-managed database names (Azure SQL, RDS, Cloud SQL) when they appear in the first screen of the JD.",
      "Describing migrations without tools (Flyway, Liquibase) or rollback strategy.",
      "Failing to mention transaction, locking, or concurrency context for high-write systems.",
      "One generic resume for all “data jobs” instead of mirroring the posting’s dialect and platform.",
    ],
    placementStrategy: [
      {
        section: "Headline",
        guidance:
          "Mirror the posting title (SQL Developer, Database Developer, T-SQL Developer) and one anchor: “SQL Developer | T-SQL · SQL Server · Query Tuning.”",
      },
      {
        section: "Summary",
        guidance:
          "State years of experience, primary dialect/platform, and one metric (runtime reduction, incident reduction, rows processed, deploy frequency).",
      },
      {
        section: "Skills",
        guidance:
          "Group by Dialect, Performance, Procedural SQL, Tools, Cloud DB. List 12–20 terms you can whiteboard in an interview.",
      },
      {
        section: "Experience",
        guidance:
          "Each bullet: verb + object (procedure, index, migration) + dialect/platform + measurable outcome. Mention execution plans when you tuned queries.",
      },
      {
        section: "Projects",
        guidance:
          "Show schema design, migration, or tuning projects with before/after timings. Avoid unrelated ML or dashboard-only work unless the JD asks.",
      },
    ],
    resumeSnippets: [
      {
        label: "Summary",
        text: "SQL developer with 6+ years on Microsoft SQL Server and PostgreSQL—stored procedures, performance tuning, and migration automation for high-volume transactional and reporting workloads.",
      },
      {
        label: "Skills line",
        text: "T-SQL · PostgreSQL · SQL Server · Oracle PL/SQL · Query tuning · Execution plans · Indexes · Stored procedures · Flyway · SSIS · Azure SQL · Git",
      },
      {
        label: "Experience opener",
        text: "Owned database layer changes for customer billing services—authored T-SQL modules, tuned ETL SQL, and partnered with app teams on parameterized access patterns and release windows.",
      },
    ],
    howResumeAtlasScores:
      "ResumeAtlas matches your resume to the job description for dialect terms (T-SQL vs PL/SQL), performance vocabulary (indexes, execution plans), procedural objects, and platform names. You see missing phrases and weak bullets before applying—so you add keywords next to real tuning or migration outcomes.",
    relatedKeywordPages: [
      { path: "/data-analyst-resume-keywords", label: "Data analyst resume keywords" },
      { path: "/data-engineer-resume-keywords", label: "Data engineer resume keywords" },
      { path: "/power-bi-resume-keywords", label: "Power BI resume keywords" },
      { path: "/business-intelligence-resume-keywords", label: "Business intelligence resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/data-analyst-resume-guide", label: "Data analyst resume example" },
      { path: "/data-scientist-resume-guide", label: "Data scientist resume example" },
    ],
    faq: [
      {
        question: "What are the best SQL developer resume keywords for ATS?",
        answer:
          "Use the job description’s dialect and platform first: T-SQL, PL/SQL, PostgreSQL, Oracle, SQL Server, MySQL. Add performance terms (indexes, execution plans, tuning) and procedural objects (stored procedures, functions) when listed.",
      },
      {
        question: "Should I list both SQL Server and Oracle on my resume?",
        answer:
          "Only if you have production experience in both. Otherwise lead with the platform in the posting and mention others as exposure, not as equal expertise.",
      },
      {
        question: "How is a SQL developer different from a data analyst on a resume?",
        answer:
          "SQL developers emphasize database logic, tuning, migrations, and procedural code. Data analysts emphasize dashboards, stakeholder metrics, and BI tools. Use this page for developer titles; use the data analyst page for analytics roles.",
      },
      {
        question: "What keywords matter for query tuning roles?",
        answer:
          "Execution plans, indexes (clustered, nonclustered, covering), statistics, waits, blocking, and before/after runtime or CPU metrics in bullets—not just the phrase “query optimization.”",
      },
      {
        question: "Do I need cloud database keywords as a SQL developer?",
        answer:
          "If the JD names Azure SQL, RDS, Aurora, or Cloud SQL, mirror those exactly. Managed services still need tuning, security, and migration language.",
      },
      {
        question: "Should SSIS appear on a SQL developer resume?",
        answer:
          "Include SSIS when you built or maintained packages loading warehouses or apps. Skip it for pure OLTP tuning roles unless the posting requires it.",
      },
      {
        question: "How many SQL keywords should I include?",
        answer:
          "Aim for 20–30 relevant terms woven through skills and bullets. Avoid a 60-line skills dump with no outcomes.",
      },
      {
        question: "Are stored procedures still ATS keywords?",
        answer:
          "Yes for enterprise SQL Server and Oracle roles. Mention procedures, functions, and views you authored—not only ad hoc SELECT work.",
      },
      {
        question: "How do SQL developer and data engineer keywords overlap?",
        answer:
          "Overlap on SQL, ETL, and warehouses. Data engineer postings add orchestration and Spark; SQL developer postings go deeper on tuning and procedural SQL. Pick the page that matches the title.",
      },
      {
        question: "How do I find missing SQL keywords before applying?",
        answer:
          "Paste your resume and the job description into ResumeAtlas’s free checker to see gap terms, then add them only where you have defensible examples.",
      },
    ],
  },
  "power-bi": {
    slug: "power-bi",
    path: pathFor("power-bi"),
    roleName: "Power BI",
    h1: `Power BI Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS Guide)`,
    title: `110+ Power BI Resume Keywords That Pass ATS (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Power BI resume keywords for ATS: DAX, Power Query, semantic models, dataflows, RLS, Fabric. Copy 110+ terms and scan your resume vs the job description free.",
    intro:
      "Power BI resume keywords for BI developer and analyst roles where the posting names Microsoft Power BI, DAX, semantic models, and Fabric—grouped for ATS scans and recruiter skims, with placement guidance that keeps terms tied to outcomes.",
    roleOverview:
      "Power BI specialists turn warehouse and application data into governed datasets, reports, and dashboards executives actually use. Recruiters filter for Power Query (M), data modeling (star schema, relationships), DAX measures, publishing (apps, workspaces), refresh automation, row-level security, and increasingly Microsoft Fabric / OneLake. Your resume should show report adoption, refresh reliability, and metric definitions—not only that you opened Desktop.",
    scopeNote:
      "This page is for Power BI–centric titles and JDs (Power BI Developer, Power BI Analyst, Fabric analytics). For tool-agnostic BI or mixed Tableau/Looker roles, use business intelligence resume keywords. For general analytics without a BI tool mandate, use data analyst keywords.",
    keywordCategories: [
      {
        heading: "Core skills",
        terms: [
          "Power BI",
          "Microsoft Power BI",
          "Power BI Desktop",
          "Power BI Service",
          "DAX",
          "Power Query",
          "M language",
          "Data modeling",
          "Semantic model",
          "Star schema",
          "Relationships",
          "Measures",
          "Calculated columns",
          "Dashboards",
          "Paginated reports",
          "KPIs",
          "Self-service BI",
          "Report publishing",
          "Workspace governance",
          "Certified datasets",
        ],
      },
      {
        heading: "Technical skills",
        terms: [
          "DAX measures",
          "CALCULATE",
          "Time intelligence",
          "YTD",
          "Rolling averages",
          "Context transition",
          "Row-level security",
          "RLS",
          "Object-level security",
          "Incremental refresh",
          "Composite models",
          "Aggregations",
          "Field parameters",
          "What-if parameters",
          "Query folding",
          "DirectQuery",
          "Import mode",
          "Dual storage mode",
          "Performance Analyzer",
          "VertiPaq",
        ],
      },
      {
        heading: "Tools",
        terms: [
          "Power BI Desktop",
          "Power BI Service",
          "Power BI Report Builder",
          "Power BI Mobile",
          "Power Query Editor",
          "Tabular Editor",
          "DAX Studio",
          "ALM Toolkit",
          "XMLA endpoint",
          "On-premises data gateway",
          "Data gateway",
          "Power Automate",
          "SharePoint integration",
          "Teams integration",
          "Deployment pipelines",
          "Git integration",
          "Microsoft Fabric",
          "OneLake",
          "Lakehouse",
          "Dataflows Gen2",
        ],
      },
      {
        heading: "Data sources & platforms",
        terms: [
          "SQL Server",
          "Azure SQL",
          "Snowflake connector",
          "SharePoint lists",
          "Excel",
          "CSV",
          "REST API",
          "OData",
          "Analysis Services",
          "Azure Analysis Services",
          "Dynamics 365",
          "SAP connector",
          "Oracle connector",
          "PostgreSQL",
          "Dataverse",
          "Azure Data Lake",
        ],
      },
      {
        heading: "Methodologies",
        terms: [
          "Requirements gathering",
          "Wireframes",
          "UX for reports",
          "Metric definitions",
          "Data governance",
          "Documentation",
          "Agile",
          "Stakeholder demos",
          "UAT",
          "Change management",
          "Version control",
          "Release management",
          "Capacity planning",
          "Refresh scheduling",
          "Incident support",
          "Adoption tracking",
        ],
      },
      {
        heading: "Certifications (when relevant)",
        terms: [
          "Microsoft Certified: Power BI Data Analyst Associate",
          "PL-300",
          "Microsoft Fabric Analytics Engineer Associate",
          "DP-600",
          "Azure Data Fundamentals",
        ],
      },
    ],
    seniority: {
      title: "Power BI keywords by experience level",
      tiers: [
        {
          label: "Entry-level",
          keywords: [
            "Power BI Desktop",
            "Import mode",
            "Basic DAX",
            "Charts",
            "Slicers",
            "Power Query",
            "Excel source",
            "SharePoint publish",
            "Report formatting",
            "Documentation",
            "SQL SELECT",
            "Ad hoc reports",
          ],
        },
        {
          label: "Mid-level",
          keywords: [
            "Semantic models",
            "DAX measures",
            "RLS",
            "Gateway setup",
            "Incremental refresh",
            "Workspace apps",
            "Stakeholder training",
            "Performance tuning",
            "Dataflows",
            "Star schema",
            "Deployment pipelines",
            "UAT sign-off",
          ],
        },
        {
          label: "Senior-level",
          keywords: [
            "Fabric migration",
            "Governance standards",
            "Certified datasets",
            "Center of excellence",
            "Capacity admin",
            "Premium capacity",
            "Enterprise rollout",
            "Metric catalog",
            "Cross-org adoption",
            "Mentoring",
            "Vendor management",
            "Executive dashboards",
          ],
        },
      ],
    },
    tools: [
      "Power BI Desktop",
      "DAX",
      "Power Query",
      "Power BI Service",
      "Microsoft Fabric",
      "Tabular Editor",
      "SQL",
      "Azure",
      "RLS",
      "Dataflows",
    ],
    domainVerbs: [
      "built",
      "modeled",
      "published",
      "automated",
      "standardized",
      "optimized",
      "governed",
      "trained",
      "visualized",
      "reduced",
    ],
    topKeywords: [
      "Power BI",
      "DAX",
      "Power Query",
      "Semantic model",
      "Dashboards",
      "Power BI Service",
      "Data modeling",
      "Row-level security",
      "Incremental refresh",
      "Microsoft Fabric",
      "Star schema",
      "KPI",
      "Self-service",
      "Paginated reports",
      "Dataflows",
      "Gateway",
      "Tabular Editor",
      "DirectQuery",
      "Import mode",
      "Report publishing",
    ],
    exampleBullets: [
      "Built a Power BI executive revenue app with 12 DAX measures and RLS by region, replacing 6 static Excel packs and saving ~9 hours of leadership prep weekly.",
      "Modeled a star-schema semantic model in Power BI Desktop (Import) over Azure SQL, cutting report refresh failures from 11% to under 2% via incremental refresh policies.",
      "Authored 40+ reusable DAX measures with documented definitions, aligning finance and sales on one set of pipeline KPIs for QBR decks.",
      "Implemented row-level security and workspace roles for 300+ field users, passing internal audit with no critical access findings.",
      "Optimized DirectQuery dashboards using Performance Analyzer and aggregations, reducing p95 load time from 14s to 4s on a 50M-row fact table.",
      "Automated Power Query dataflows from SharePoint and SQL sources, improving dataset freshness from daily to hourly for operations teams.",
      "Led migration of legacy SSRS reports to Power BI paginated reports, retiring 18 reports while preserving pixel-perfect finance layouts.",
      "Partnered with stakeholders on wireframes and UAT, increasing monthly active viewers of the customer health dashboard by 34%.",
      "Configured on-premises gateway clusters and deployment pipelines across dev/test/prod, standardizing releases for five analytics squads.",
      "Trained 25 analysts on self-service datasets and certified models, lowering ad-hoc request volume to central BI by 41% in two quarters.",
    ],
    keywordMistakes: [
      "Listing Power BI without DAX, modeling, or publishing outcomes in the same bullets.",
      "Using Tableau-only language on a Power BI–only posting (worksheets, LOD) instead of datasets, measures, and apps.",
      "Claiming Fabric or Premium features without workspace, capacity, or migration context you can explain.",
      "Stuffing CALCULATE and time-intelligence terms with no examples of measures you shipped.",
      "Ignoring gateway, refresh, or RLS keywords when the JD owns enterprise deployment—not just desktop report building.",
      "Copying data scientist ML keywords for a reporting role that only needs semantic models and dashboards.",
      "Omitting SQL or source-system terms when the JD connects Power BI to Azure SQL, Snowflake, or Dynamics.",
      "Describing “dashboards” without users, decisions, or adoption metrics.",
      "One resume for all BI tools with no primary stack when the title says Power BI Developer.",
      "Screenshots-only portfolios with no ATS-readable tool names in the resume body.",
    ],
    placementStrategy: [
      {
        section: "Headline",
        guidance:
          "Use the exact title (Power BI Developer, BI Analyst – Power BI) plus anchors: “Power BI | DAX · Semantic Models · Fabric.”",
      },
      {
        section: "Summary",
        guidance:
          "Two sentences: years on Power BI, modeling + DAX focus, and one outcome (refresh reliability, hours saved, adoption, load-time improvement).",
      },
      {
        section: "Skills",
        guidance:
          "Group DAX, Power Query, Modeling, Service/Admin, Sources (SQL, SharePoint). Keep to tools you can demo live.",
      },
      {
        section: "Experience",
        guidance:
          "Bullets: built/published + dataset/report name + technique (RLS, incremental refresh, DAX) + stakeholder or performance metric.",
      },
      {
        section: "Projects",
        guidance:
          "Include a semantic model or app link description in text (not only images). Mention row counts or refresh windows when credible.",
      },
    ],
    resumeSnippets: [
      {
        label: "Summary",
        text: "Power BI developer with 5+ years building governed semantic models, DAX measures, and executive dashboards on Azure SQL and SharePoint sources—focused on refresh reliability, RLS, and adoption.",
      },
      {
        label: "Skills line",
        text: "Power BI Desktop & Service · DAX · Power Query (M) · Semantic modeling · RLS · Incremental refresh · Fabric · Tabular Editor · SQL · Azure SQL · Deployment pipelines",
      },
      {
        label: "Experience opener",
        text: "Owned the customer analytics workspace in Power BI Service—modeled facts/dimensions, published apps to 200+ users, and partnered with finance on certified datasets for recurring leadership reporting.",
      },
    ],
    howResumeAtlasScores:
      "ResumeAtlas compares your resume text to the job description for Power BI–specific phrases (DAX, Power Query, semantic model, RLS, Fabric) and generic BI terms. You get a prioritized gap list so you can align bullets with the posting before apply—not generic keyword stuffing.",
    relatedKeywordPages: [
      { path: "/business-intelligence-resume-keywords", label: "Business intelligence resume keywords" },
      { path: "/data-analyst-resume-keywords", label: "Data analyst resume keywords" },
      { path: "/sql-developer-resume-keywords", label: "SQL developer resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/data-analyst-resume-guide", label: "Data analyst resume example" },
      { path: "/business-analyst-resume-guide", label: "Business analyst resume example" },
    ],
    faq: [
      {
        question: "What are the best Power BI resume keywords for ATS?",
        answer:
          "Mirror the JD: Power BI Desktop/Service, DAX, Power Query, semantic model, dashboards, RLS, incremental refresh, gateway, and Fabric if listed. Use the employer’s exact product names.",
      },
      {
        question: "Should I list DAX functions by name on my resume?",
        answer:
          "Mention DAX, measures, time intelligence, and CALCULATE only if you built real measures. A laundry list of functions without context adds little ATS value.",
      },
      {
        question: "How is Power BI different from business intelligence keywords on a resume?",
        answer:
          "Power BI pages stress Microsoft stack terms (DAX, Power Query, Fabric). Broader BI pages include Tableau, Looker, and cross-tool governance. Use this page when Power BI is the primary tool in the title.",
      },
      {
        question: "Do I need Microsoft Fabric keywords in 2026?",
        answer:
          "Include Fabric, OneLake, or lakehouse when the posting mentions them. Otherwise Desktop + Service + gateway language is enough for many roles.",
      },
      {
        question: "What keywords matter for Power BI developer vs analyst roles?",
        answer:
          "Developers: modeling, DAX, RLS, deployment pipelines, performance tuning. Analysts: dashboards, stakeholder requirements, KPI definitions, adoption. Pull verbs from the first third of the JD.",
      },
      {
        question: "Should I mention row-level security on a Power BI resume?",
        answer:
          "Yes when you implemented RLS or workspace roles. Pair with user counts, audit outcomes, or departments scoped—proof beats the acronym alone.",
      },
      {
        question: "How do Power BI and data analyst resumes overlap?",
        answer:
          "Both use SQL and dashboards. Power BI roles emphasize semantic models, DAX, and Service publishing. Use the data analyst page when tools are mixed or unspecified.",
      },
      {
        question: "Is Power Query the same as Power BI on ATS?",
        answer:
          "Related but distinct. List both when you transform data in Power Query and publish in Service. Mention M or dataflows if you used them.",
      },
      {
        question: "What certifications help Power BI ATS filters?",
        answer:
          "PL-300 (Power BI Data Analyst Associate) is the most common. Fabric/DP-600 matters for Fabric-forward JDs. List only earned or in-progress credentials.",
      },
      {
        question: "How do I find missing Power BI keywords before applying?",
        answer:
          "Paste your resume and the job description into ResumeAtlas’s free checker to see gap phrases, then add them beside bullets you can defend in a technical interview.",
      },
    ],
  },
  "ai-engineer": {
    slug: "ai-engineer",
    path: pathFor("ai-engineer"),
    roleName: "AI Engineer",
    h1: `AI Engineer Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS Guide)`,
    title: `130+ AI Engineer Resume Keywords That Pass ATS (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "AI engineer resume keywords for ATS: LLM integration, RAG, prompt engineering, evals, vector databases, and production AI systems. Copy 130+ terms and scan your resume vs the job description free.",
    intro:
      "AI engineer resume keywords that match how ATS and hiring managers screen applied AI roles in 2026 — grouped by LLM integration, retrieval systems, evaluation, and infrastructure so terms appear as proof, not stuffing.",
    roleOverview:
      "AI engineers build production systems on top of foundation models: LLM APIs, retrieval-augmented generation (RAG) pipelines, agentic workflows, and evaluation (evals) frameworks. Recruiters filter for prompt engineering, LLM orchestration (LangChain, LlamaIndex), vector databases (Pinecone, Weaviate, pgvector), model fine-tuning, and AI observability. Titles vary widely: AI engineer, applied AI engineer, AI software engineer, LLM engineer, generative AI engineer. Your resume should show production ownership — latency, cost, accuracy, and guardrails — not only that you called an API.",
    scopeNote:
      "This page targets applied AI engineer, LLM engineer, and generative AI engineer titles that build on top of foundation models. For model training and MLOps-heavy roles, use machine learning engineer keywords. For data pipeline work, use data engineer keywords.",
    keywordCategories: [
      {
        heading: "Core skills",
        terms: [
          "AI engineering",
          "LLM integration",
          "Generative AI",
          "Applied AI",
          "Retrieval-augmented generation",
          "RAG",
          "Prompt engineering",
          "AI agents",
          "Agentic workflows",
          "Model evaluation",
          "Evals",
          "AI observability",
          "AI safety",
          "Guardrails",
          "Context window management",
          "Structured outputs",
          "Function calling",
          "AI system design",
          "Production AI",
          "Responsible AI",
        ],
      },
      {
        heading: "Technical skills",
        terms: [
          "Python",
          "Large language models",
          "Transformer architecture",
          "Embeddings",
          "Semantic search",
          "Vector search",
          "Fine-tuning",
          "LoRA",
          "RLHF",
          "Chain-of-thought prompting",
          "Few-shot prompting",
          "Streaming APIs",
          "Inference optimization",
          "Token budget management",
          "Latency optimization",
          "Chunking strategies",
          "Reranking",
          "Hybrid search",
          "Multimodal AI",
          "Batch inference",
        ],
      },
      {
        heading: "Tools & frameworks",
        terms: [
          "LangChain",
          "LlamaIndex",
          "LangGraph",
          "OpenAI API",
          "Anthropic API",
          "Hugging Face",
          "FastAPI",
          "Pinecone",
          "Weaviate",
          "ChromaDB",
          "pgvector",
          "Redis",
          "MLflow",
          "Weights & Biases",
          "Arize AI",
          "Langfuse",
          "RAGAS",
          "Pytest",
          "Docker",
          "Git",
        ],
      },
      {
        heading: "Platforms & cloud",
        terms: [
          "OpenAI",
          "Anthropic Claude",
          "Google Gemini",
          "AWS Bedrock",
          "Azure OpenAI",
          "Google Vertex AI",
          "Cohere",
          "AWS Lambda",
          "GCP Cloud Run",
          "AWS ECS",
          "Supabase",
          "PostgreSQL",
          "Kubernetes",
          "GitHub Actions",
          "Terraform",
        ],
      },
      {
        heading: "Methodologies",
        terms: [
          "Prompt versioning",
          "A/B testing prompts",
          "Human-in-the-loop",
          "Red teaming",
          "LLM eval frameworks",
          "Retrieval accuracy metrics",
          "Hallucination detection",
          "Context faithfulness",
          "Latency SLAs",
          "Cost optimization",
          "CI/CD for AI",
          "Model registry",
          "Shadow deployment",
          "Feedback loops",
          "Data flywheel",
          "Agile",
          "Code review",
          "Pair programming",
          "Documentation",
          "On-call rotation",
        ],
      },
      {
        heading: "Certifications (when relevant)",
        terms: [
          "DeepLearning.AI LLM specialization",
          "AWS Certified Machine Learning Specialty",
          "Google Professional Machine Learning Engineer",
          "Microsoft Azure AI Engineer Associate",
          "Hugging Face certifications",
          "Databricks Generative AI certification",
        ],
      },
    ],
    seniority: {
      title: "AI engineer keywords by experience level",
      tiers: [
        {
          label: "Entry-level",
          keywords: [
            "Python",
            "OpenAI API",
            "LangChain basics",
            "Prompt engineering",
            "RAG basics",
            "Vector store setup",
            "Evals basics",
            "FastAPI",
            "Git",
            "Documentation",
            "Unit tests",
            "API integration",
          ],
        },
        {
          label: "Mid-level",
          keywords: [
            "Production RAG pipelines",
            "LLM orchestration",
            "Fine-tuning",
            "AI observability",
            "Latency optimization",
            "Cost optimization",
            "Agentic workflows",
            "Prompt versioning",
            "A/B testing",
            "On-call rotation",
            "Cross-team delivery",
            "Reranking strategies",
          ],
        },
        {
          label: "Senior-level",
          keywords: [
            "AI system architecture",
            "Eval framework design",
            "Multi-agent systems",
            "AI safety strategy",
            "Platform standards",
            "Reliability targets",
            "Vendor evaluation",
            "Mentoring",
            "Roadmap input",
            "Executive communication",
            "Capacity planning",
            "Responsible AI governance",
          ],
        },
      ],
    },
    tools: [
      "Python",
      "LangChain",
      "LlamaIndex",
      "OpenAI API",
      "Anthropic API",
      "Pinecone",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Weights & Biases",
    ],
    domainVerbs: [
      "built",
      "deployed",
      "optimized",
      "evaluated",
      "fine-tuned",
      "integrated",
      "instrumented",
      "reduced",
      "shipped",
      "designed",
    ],
    topKeywords: [
      "AI engineer",
      "LLM integration",
      "Retrieval-augmented generation",
      "RAG",
      "Prompt engineering",
      "Generative AI",
      "AI agents",
      "Embeddings",
      "Vector database",
      "Fine-tuning",
      "Evals",
      "LangChain",
      "OpenAI API",
      "Python",
      "AI observability",
      "Guardrails",
      "Semantic search",
      "FastAPI",
      "Pinecone",
      "Production AI",
    ],
    exampleBullets: [
      "Built a RAG pipeline with LangChain and Pinecone over a 50K-document corpus, reducing hallucination rate by 38% (measured via RAGAS faithfulness) and cutting average response latency to under 800ms.",
      "Deployed an LLM-powered customer support agent on AWS Bedrock with guardrails for policy compliance, handling 1,200+ daily queries with a 4.4/5 CSAT from post-chat surveys.",
      "Fine-tuned a Llama 3 model on proprietary engineering documentation using LoRA, improving domain-specific task accuracy by 29% over the base model on internal evals.",
      "Designed prompt versioning and A/B testing infrastructure in LangGraph, enabling product teams to iterate on prompts without engineering deploys and reducing rollback incidents by 65%.",
      "Instrumented AI observability with Langfuse on three production LLM pipelines, surfacing latency spikes and token budget overruns that reduced monthly inference cost by $18K.",
      "Integrated semantic search using pgvector and OpenAI embeddings into the product search layer, improving relevant-result rate by 22% measured via click-through and zero-result rates.",
      "Built an AI agent with tool use and function calling for structured data extraction, replacing a manual review queue and saving 15 analyst hours per week.",
      "Implemented streaming responses with retry logic and fallback models across the API layer, improving p99 availability from 97.2% to 99.6% for LLM-dependent features.",
      "Led red-teaming sessions and jailbreak testing for a consumer-facing generative AI feature, documenting 12 attack vectors and shipping mitigations before public launch.",
      "Partnered with product and ML science on eval design for a recommendation LLM, defining retrieval accuracy, context faithfulness, and latency SLAs that became the team's standard.",
    ],
    keywordMistakes: [
      "Listing OpenAI API or LangChain without showing the problem you solved, the scale, or the reliability outcome.",
      "Claiming 'built RAG' without chunking strategy, retrieval metric (faithfulness, recall), or latency context.",
      "Copying ML engineer model-training keywords (GPU training, Spark, distributed systems) for roles that build on top of foundation models.",
      "Stuffing model names (GPT-4, Claude, Gemini) as skills when the JD cares about system design and reliability, not which model you picked.",
      "Omitting evals — production AI roles universally expect evaluation frameworks, human-in-the-loop review, or at least prompt A/B testing.",
      "Using 'prompt engineering' alone without retrieval, agents, or production proof — it reads as research, not engineering.",
      "Ignoring latency, cost, or accuracy outcomes in bullets (token spend reduction, p95 latency, CSAT, or zero-result rate improvement).",
      "No guardrails or safety mention for any role touching consumer-facing AI — a significant screening signal in 2026.",
      "One generic LLM resume for all 'AI jobs' — mirror the posting's stack (AWS Bedrock vs Anthropic vs OpenAI) and focus area (RAG vs agents vs fine-tuning).",
      "Listing vector databases without embedding model, indexing strategy, or retrieval metric that proves you understand the stack.",
    ],
    placementStrategy: [
      {
        section: "Headline",
        guidance:
          "Mirror the posting title (AI Engineer, Applied AI Engineer, LLM Engineer) plus one anchor stack: 'AI Engineer | LangChain · RAG · OpenAI API.'",
      },
      {
        section: "Summary",
        guidance:
          "Two to three sentences: years of experience, primary AI domain (RAG, agents, fine-tuning), primary stack, and one reliability or accuracy metric.",
      },
      {
        section: "Skills",
        guidance:
          "Group by LLM APIs, Orchestration, Vector DBs, Evals, and Cloud. List 15–25 terms you can explain in a technical screen.",
      },
      {
        section: "Experience",
        guidance:
          "Each bullet: verb + system built + stack + outcome. Pair RAG with retrieval metric; agents with task completion rate; fine-tuning with accuracy delta; infra with latency or cost improvement.",
      },
      {
        section: "Projects",
        guidance:
          "Show end-to-end AI pipelines with evals and production scale. Include a GitHub link only when the repo demonstrates the same stack the JD requires.",
      },
    ],
    resumeSnippets: [
      {
        label: "Summary",
        text: "AI engineer with 4+ years building production LLM systems — RAG pipelines, agentic workflows, and eval frameworks on OpenAI and Anthropic APIs. Focused on retrieval accuracy, latency SLAs, and cost-efficient inference for customer-facing features.",
      },
      {
        label: "Skills line",
        text: "Python · LangChain · LlamaIndex · OpenAI API · Anthropic API · RAG · Pinecone · pgvector · FastAPI · Evals · Langfuse · Docker · Kubernetes · AWS · Git",
      },
      {
        label: "Experience opener",
        text: "Built and owned the LLM integration layer for core product features — RAG pipelines, streaming APIs, guardrails, and observability dashboards — partnering with product and ML science on eval design and reliability targets.",
      },
    ],
    howResumeAtlasScores:
      "ResumeAtlas compares your resume to the job description for AI-specific terms (RAG, evals, LangChain, vector databases, guardrails) and system-level outcomes (latency, cost, accuracy). You get a gap list for missing keywords and weak bullets so you can add defensible proof before applying — not keyword stuffing.",
    relatedKeywordPages: [
      { path: "/machine-learning-engineer-resume-keywords", label: "Machine learning engineer resume keywords" },
      { path: "/data-engineer-resume-keywords", label: "Data engineer resume keywords" },
      { path: "/software-engineer-resume-keywords", label: "Software engineer resume keywords" },
      { path: "/data-scientist-resume-keywords", label: "Data scientist resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/ai-engineer-resume-guide", label: "AI engineer resume guide" },
      { path: "/machine-learning-engineer-resume-guide", label: "Machine learning engineer resume example" },
    ],
    faq: [
      {
        question: "Do I need to sign up to check my AI engineer resume keywords against a job description?",
        answer:
          "No. Paste your resume and any AI engineer job description into ResumeAtlas for a full intelligence dashboard — Application Verdict, shortlist odds, rejection risks, and keyword gaps — in one free scan with no account needed. Signing in with Google adds a second free scan and unlocks free job-specific resume optimization. You only pay ($2.99) if you want to download the ATS-ready optimized version.",
      },
      {
        question: "What are the best AI engineer resume keywords for ATS?",
        answer:
          "Prioritize terms from the job description: LLM integration, RAG, prompt engineering, evals, vector databases (Pinecone, Weaviate, pgvector), LangChain or LlamaIndex, OpenAI or Anthropic API, and production outcomes (latency, cost, accuracy). Mirror the employer's exact tool and model names.",
      },
      {
        question: "Is AI engineer a real job title in 2026?",
        answer:
          "Yes — it is one of the fastest-growing engineering titles in 2026. Titles vary: AI engineer, applied AI engineer, LLM engineer, generative AI engineer, AI software engineer. Use the exact title from the posting in your headline. The keyword lists on this page apply across these variants.",
      },
      {
        question: "What is the difference between AI engineer and machine learning engineer resume keywords?",
        answer:
          "ML engineer roles emphasize model training, data pipelines, GPU infrastructure, MLOps, and deployment of custom models. AI engineer roles emphasize building on top of foundation models: LLM APIs, RAG, prompt engineering, agents, and evals. There is significant overlap at senior levels. Use this page when the posting says AI engineer or LLM engineer; use machine learning engineer keywords when the JD says model training, MLOps, or Spark-based pipelines.",
      },
      {
        question: "What AI engineer keywords matter for senior-level roles?",
        answer:
          "Eval framework design, AI system architecture, multi-agent systems, AI safety and guardrails, reliability targets, responsible AI governance, mentoring, and cross-team leadership. Senior AI engineering JDs expect both technical depth (fine-tuning, retrieval optimization, observability) and delivery influence (platform standards, roadmap input).",
      },
      {
        question: "Should I list specific AI models (GPT-4, Claude, Gemini) on my resume?",
        answer:
          "Only when you have production experience with them and they match the posting. JDs that name AWS Bedrock, Azure OpenAI, or Anthropic want platform-specific experience — not model name-dropping. Focus on the system you built and the outcome, not the model version.",
      },
      {
        question: "How do I show AI engineering skills without production experience?",
        answer:
          "Build and document a complete project: a RAG pipeline with chunking, embedding, retrieval, and evals; an agent with tool use; or a fine-tuned model with before/after benchmark metrics. Publish to GitHub, add a README with architecture decisions and eval results, then cite metrics (faithfulness, latency, accuracy) in your resume bullets.",
      },
      {
        question: "What AI certifications help ATS filters in 2026?",
        answer:
          "AWS Certified Machine Learning Specialty, Google Professional Machine Learning Engineer, Microsoft Azure AI Engineer Associate, and DeepLearning.AI specializations are recognized. Databricks Generative AI certification is gaining relevance for enterprise roles. List only earned or clearly in-progress credentials.",
      },
      {
        question: "Which AI engineer tools should appear in resume bullets, not just the skills section?",
        answer:
          "LangChain or LlamaIndex (with outcome), Pinecone or pgvector (with retrieval metric or scale), Langfuse or Arize (with observability outcome), RAGAS or similar eval framework (with faithfulness or accuracy result), and FastAPI (with latency or RPS metric). Tools listed only in skills without bullet-level proof have lower ATS weight.",
      },
      {
        question: "How do I find missing AI engineer keywords before applying?",
        answer:
          "Paste your resume and the job description into ResumeAtlas's free checker to see gap terms and weak bullets. AI engineer JDs vary widely in stack — always mirror the posting's specific tools (e.g., AWS Bedrock vs Anthropic API vs Azure OpenAI) rather than using a generic keyword list.",
      },
    ],
  },

  "python-developer": {
    slug: "python-developer",
    path: pathFor("python-developer"),
    roleName: "Python Developer",
    h1: `Python Developer Resume Keywords (${CONTENT_FRESHNESS_YEAR} ATS Guide)`,
    title: `120+ Python Developer Resume Keywords That Pass ATS (${CONTENT_FRESHNESS_YEAR})${RESUME_ATLAS_TITLE_SUFFIX}`,
    description:
      "Python developer resume keywords for ATS: Django, Flask, FastAPI, pandas, SQLAlchemy, pytest, Docker, AWS. Copy 120+ terms by category, see seniority tiers, and scan your resume vs the JD free.",
    intro:
      "Python developer resume keywords grouped by stack, use case, and seniority — written to match how ATS tools and hiring managers parse Python engineering roles in 2026. Use these to anchor proof in bullets, not pad a skills list.",
    roleOverview:
      "Python developers build web APIs, data pipelines, automation scripts, ML tooling, or backend services depending on the domain. Hiring managers scan for the Python web framework (Django, Flask, FastAPI), data libraries (pandas, SQLAlchemy, Pydantic), testing approach (pytest, coverage), and infrastructure context (Docker, AWS, CI/CD). ATS keyword matching is stack-specific — a backend Python JD that says 'FastAPI' and 'PostgreSQL' will not score 'Django' or 'MySQL' as equivalent. Mirror the posting's exact tool names.",
    scopeNote:
      "This page targets Python developer, Python engineer, and Python backend developer titles. For data-pipeline-focused Python roles, see the data engineer keywords page. For ML model training, see the machine learning engineer keywords. For Python in analytics or visualization, see the data analyst keywords.",
    keywordCategories: [
      {
        heading: "Core Python skills",
        terms: [
          "Python 3",
          "Object-oriented programming",
          "Functional programming",
          "Type hints",
          "Asyncio",
          "Concurrency",
          "Decorators",
          "Context managers",
          "Generators",
          "List comprehensions",
          "Virtual environments",
          "pip / Poetry / uv",
          "Module design",
          "Package management",
          "PEP 8",
          "Code review",
          "Refactoring",
          "Performance optimization",
          "Memory management",
          "Profiling",
        ],
      },
      {
        heading: "Web frameworks & APIs",
        terms: [
          "Django",
          "Django REST Framework",
          "Flask",
          "FastAPI",
          "Pydantic",
          "REST APIs",
          "GraphQL",
          "WebSockets",
          "Authentication (OAuth2, JWT)",
          "Middleware",
          "Celery",
          "Redis",
          "WSGI / ASGI",
          "OpenAPI / Swagger",
          "Rate limiting",
          "Caching",
          "Session management",
        ],
      },
      {
        heading: "Data & databases",
        terms: [
          "SQLAlchemy",
          "PostgreSQL",
          "MySQL",
          "SQLite",
          "Alembic (migrations)",
          "pandas",
          "NumPy",
          "Polars",
          "MongoDB (PyMongo)",
          "Redis (redis-py)",
          "Elasticsearch",
          "Database indexing",
          "Query optimization",
          "ORMs",
        ],
      },
      {
        heading: "Testing & quality",
        terms: [
          "pytest",
          "unittest",
          "Mocking (unittest.mock)",
          "Test coverage",
          "Fixtures",
          "Parametrize",
          "Integration tests",
          "End-to-end tests",
          "Code coverage (coverage.py)",
          "mypy (type checking)",
          "Ruff / flake8 / Black",
          "Pre-commit hooks",
          "TDD",
          "Regression testing",
        ],
      },
      {
        heading: "DevOps & cloud",
        terms: [
          "Docker",
          "Docker Compose",
          "Kubernetes",
          "GitHub Actions",
          "CI/CD",
          "AWS (Lambda, EC2, S3, RDS)",
          "GCP (Cloud Run, Cloud Functions)",
          "Terraform",
          "Linux",
          "Bash scripting",
          "Environment variables",
          "Secrets management",
          "Logging",
          "Observability",
        ],
      },
      {
        heading: "Architecture & patterns",
        terms: [
          "Microservices",
          "API design",
          "Event-driven architecture",
          "Message queues (Kafka, RabbitMQ)",
          "Design patterns (Factory, Repository)",
          "Dependency injection",
          "Domain-driven design",
          "Monorepo",
          "Twelve-factor app",
          "Service mesh",
          "API gateway",
          "Background tasks",
        ],
      },
    ],
    seniority: {
      title: "Python developer keywords by seniority",
      tiers: [
        {
          label: "Junior / early-career",
          keywords: [
            "Python 3", "Django or Flask", "REST APIs", "PostgreSQL", "pytest",
            "Git", "Docker (basics)", "type hints", "virtual environments", "code review",
          ],
        },
        {
          label: "Mid-level",
          keywords: [
            "FastAPI", "SQLAlchemy", "Celery", "Redis caching", "CI/CD pipelines",
            "Database query optimization", "asyncio", "API authentication", "test coverage >80%", "AWS Lambda or EC2",
          ],
        },
        {
          label: "Senior / staff",
          keywords: [
            "System design", "microservices architecture", "Kubernetes", "observability (OpenTelemetry)",
            "performance profiling", "API versioning strategy", "dependency injection", "platform standards",
            "cross-team technical leadership", "infrastructure cost optimization",
          ],
        },
      ],
    },
    tools: ["Django", "FastAPI", "Flask", "pytest", "SQLAlchemy", "pandas", "Docker", "GitHub Actions", "AWS"],
    domainVerbs: ["implemented", "designed", "optimized", "refactored", "deployed", "integrated", "automated", "built"],
    topKeywords: [
      "Python", "Django", "FastAPI", "Flask", "REST API", "PostgreSQL", "SQLAlchemy",
      "pytest", "Docker", "AWS", "Redis", "Celery", "pandas", "type hints", "asyncio",
      "CI/CD", "GitHub Actions", "Pydantic", "microservices", "performance optimization",
    ],
    exampleBullets: [
      "Built a FastAPI REST service with JWT authentication and Pydantic validation, handling 15k daily requests at P95 latency under 80ms on AWS ECS.",
      "Refactored a Django ORM query that caused N+1 issues; reduced database calls from 200+ to 4 per request and cut page load time 65%.",
      "Wrote pytest fixture library covering 90% of core business logic; reduced production bugs caught after release by 40% in two quarters.",
      "Designed a Celery-based background job system for PDF generation, replacing a synchronous bottleneck that had caused 30% request timeouts.",
      "Migrated monolithic Flask app to three FastAPI microservices with Docker Compose; reduced deployment time from 45 minutes to 8 minutes.",
    ],
    keywordMistakes: [
      "Listing Python frameworks without showing scale, latency, or request volume context.",
      "Using data-science Python keywords (scikit-learn, Jupyter) for a web backend role — ATS and hiring managers see misalignment.",
      "Claiming 'Django expert' or 'FastAPI expert' in a skills list without a single bullet showing what you built, the scale, or an outcome.",
      "Listing test coverage in skills without showing a real coverage number and what it prevented.",
    ],
    placementStrategy: [
      {
        section: "Skills",
        guidance: "Group by area: core Python, frameworks, data/DB, testing, cloud. Max 5 items per group. Every item must appear in at least one bullet.",
      },
      {
        section: "Experience bullets",
        guidance: "Lead with the framework + use case + scale or outcome. 'Built FastAPI service handling 15k req/day at <80ms P95' is how ATS and hiring managers score Python depth.",
      },
      {
        section: "Projects",
        guidance: "Add GitHub link. Name the framework, the problem solved, the scale (users, requests, dataset size), and one quality signal (test coverage, latency, uptime).",
      },
    ],
    resumeSnippets: [
      {
        label: "Mid-level Python backend bullet",
        text: "Designed and implemented a FastAPI microservice for order processing with Celery task queue and PostgreSQL; handled 2M transactions/month with 99.9% uptime and P95 latency under 90ms.",
      },
      {
        label: "Testing and quality bullet",
        text: "Built pytest fixture library with 87% coverage of the core billing module; reduced post-release defect rate by 35% over two quarters.",
      },
    ],
    howResumeAtlasScores:
      "ResumeAtlas checks whether your Python keywords appear in bullets with outcome context — not only in the skills list. A skills-only mention of FastAPI with no bullet showing what you built scores lower than a bullet with framework + use case + latency or uptime metric. Paste your resume and the job description to see exact gap terms and selectable fixes.",
    relatedKeywordPages: [
      { path: "/data-engineer-resume-keywords", label: "Data engineer resume keywords" },
      { path: "/software-engineer-resume-keywords", label: "Software engineer resume keywords" },
    ],
    relatedGuidePages: [
      { path: "/software-engineer-resume-guide", label: "Software engineer resume guide" },
    ],
    faq: [
      {
        question: "Do I need to sign up to check if my Python resume matches a job description?",
        answer:
          "No signup needed. Paste your resume and the job description into ResumeAtlas — you get a full keyword match score, rejection risks, and selectable fixes in about 60 seconds. First scan is free with no account required.",
      },
      {
        question: "What Python keywords do ATS systems look for on a Python developer resume?",
        answer:
          "ATS tools match exact or near-exact terms from the job description. Common required terms include the primary framework (Django, FastAPI, Flask), database (PostgreSQL, SQLAlchemy), testing approach (pytest), and cloud platform (AWS Lambda, Docker). Copy the exact tool names from each posting — 'Python web framework' does not score as 'Django'.",
      },
      {
        question: "Should I list both Django and FastAPI on my Python resume?",
        answer:
          "List both only if you have real production experience with each. If the posting says FastAPI and your work has been Django, that's worth noting — but don't pad. ATS will match Django for Django JDs and FastAPI for FastAPI JDs. Interview screens will probe whichever you claim.",
      },
      {
        question: "How do I show Python testing skills on a resume?",
        answer:
          "Name pytest in both Skills and a bullet. The bullet should show coverage percentage, what it protected, and a result: 'Wrote pytest fixture library with 87% coverage of billing module; reduced post-release defects 35%.' Listing 'pytest' in skills only is undifferentiated.",
      },
      {
        question: "What's the difference between a Python developer and a software engineer resume?",
        answer:
          "A Python developer resume emphasizes Python-specific frameworks, libraries, and idioms. A software engineer resume may be language-agnostic. If the posting says 'Python developer', mirror that title and lead with Python-specific keywords. If it says 'software engineer (Python)', balance general engineering keywords with Python stack terms.",
      },
      {
        question: "How do I list async Python skills on a resume?",
        answer:
          "Name asyncio, ASGI (if using FastAPI or Starlette), or the specific async pattern used (background tasks, WebSockets, async database clients). Add a bullet with scale: 'Refactored synchronous Flask API to async FastAPI, reducing P95 latency from 400ms to 90ms under 10k concurrent requests.'",
      },
      {
        question: "Should I include Python version (3.10, 3.12) on my resume?",
        answer:
          "Mentioning 'Python 3' is sufficient. Don't list specific patch versions — they change frequently and signal poor judgment about what recruiters care about. If you've used specific features introduced in a version (e.g., structural pattern matching in 3.10), mention the feature, not the version.",
      },
      {
        question: "How do I find which Python keywords are missing from my resume for a specific job?",
        answer:
          "Paste your resume and the job description into ResumeAtlas. The JD comparison shows exact missing terms — whether the posting requires Django and you have Flask, or wants 'async Python' and your bullets don't mention asyncio. Fixing specific gaps before applying takes about 60 seconds.",
      },
    ],
  },
};

export const PILOT_KEYWORD_SLUGS = Object.keys(PILOT_KEYWORD_PAGES) as PilotKeywordSlug[];

export function getPilotKeywordConfig(slug: PilotKeywordSlug): PilotKeywordPageConfig {
  return PILOT_KEYWORD_PAGES[slug];
}

export function isPilotKeywordPath(pathname: string): PilotKeywordSlug | null {
  const normalized = pathname.replace(/\/$/, "");
  for (const slug of PILOT_KEYWORD_SLUGS) {
    if (normalized === pathFor(slug)) return slug;
  }
  return null;
}

/** Flat list of all categorized terms (for counts and chips). */
export function allCategorizedTerms(config: PilotKeywordPageConfig): string[] {
  return config.keywordCategories.flatMap((c) => c.terms);
}
