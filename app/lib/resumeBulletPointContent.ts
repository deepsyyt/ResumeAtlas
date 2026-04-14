import type { RoleSlug } from "@/app/lib/seoPages";

/** Public URLs use `/{role}-resume-bullet-points*`; internal routes use `/resume-bullet-points/{role}/...`. */
export const RESUME_BULLET_ROLES = [
  "data-scientist",
  "software-engineer",
  "product-manager",
] as const satisfies readonly RoleSlug[];

export type ResumeBulletRole = (typeof RESUME_BULLET_ROLES)[number];

export type ResumeBulletLevel = "entry-level" | "junior" | "senior";

export type ProjectBlock = {
  /** Entry-level: section label before this block (e.g. “Academic Projects”). */
  groupHeading?: string;
  /** One line under groupHeading — tool / intent reinforcement for SEO. */
  groupIntro?: string;
  /** Short label shown as H3 (e.g. “Pricing experiment”, “ML platform”). */
  name: string;
  bullets: string[];
};

export type HubLevelCard = {
  /** One-line promise (CTR on the card). */
  hook: string;
  /** What that level page contains—teasers only, not duplicate bullet banks. */
  whatsInside: string[];
};

/** Grouped preview lines for hub SERP-weight block (12–16 bullets; distinct from full level pages). */
export type HubPreviewGroup = { label: string; bullets: string[] };

/** Long-tail query + internal URL (“People also search for”). */
export type HubRelatedSearch = { label: string; href: string };

export type ResumeBulletHubCopy = {
  /** Display name: "Data Scientist" */
  roleName: string;
  metaTitle: string;
  metaDescription: string;
  /** Optional extra keywords for metadata. */
  keywords: string[];
  /** Primary visible headline—query-aligned + benefit. */
  h1: string;
  /** One line under H1 for SERP snippet alignment & CTR. */
  heroSubheadline: string;
  /** Three visible bullets directly under hero CTAs (above-the-fold relevance). */
  aboveFoldBullets: [string, string, string];
  /** Short trust line after intro block (no fabricated stats). */
  authorityLine: string;
  /** 1–2 sentences with role-specific tools/terms for keyword density. */
  roleKeywordDensity: string;
  /** First 2–3 sentences: must cover “resume bullet points”, role, entry/junior/senior, ATS + keywords. */
  introIntentStack: string;
  /** Featured-snippet style: question H2 + two-line direct answer. */
  snippetDefinition: {
    h2: string;
    line1: string;
    line2: string;
  };
  /** Paragraphs 2–3: supporting depth. */
  paragraphs: [string, string];
  /** Natural use of “resume lines / statements / achievements” for query coverage. */
  semanticVariation: string;
  /** Visible intro line before the <details> SERP-weight block. */
  previewSectionIntro: string;
  /** Collapsed preview block H2 + grouped bullets (crawlable). */
  previewSection: {
    h2: string;
    groups: HubPreviewGroup[];
  };
  /** “Why bullets fail” contrast section. */
  comparisonSection: {
    title: string;
    points: string[];
  };
  /** FAQ for hub FAQPage schema + on-page. */
  faq: { question: string; answer: string }[];
  /** Related searches / query adjacency; prefer internal links. */
  relatedSearches: HubRelatedSearch[];
  levelCards: Record<ResumeBulletLevel, HubLevelCard>;
};

export type ResumeBulletDetailCopy = {
  metaTitle: string;
  metaDescription: string;
  /** Optional metadata keywords (entry-level / long-tail). */
  keywords?: string[];
  h1: string;
  /** Intent stacking: fresher / entry-level, resume bullet points, ATS + keywords (2–3 sentences). */
  intentStack?: string;
  /** Featured-snippet style definition for entry-level pages. */
  snippetDefinition?: { h2: string; line1: string; line2: string };
  /** Visible hero bullets (3–4 lines); entry-level often uses four for CTR. */
  aboveFoldBullets?: [string, string, string] | [string, string, string, string];
  /** Exact-match phrasing for primary queries (after intent / reassurance). */
  exactMatchQueryLine?: string;
  /** List-snippet H2 immediately above the above-the-fold bullet list. */
  examplesAboveFoldH2?: string;
  /** Crawl hint line directly above the “show more” details block. */
  detailsIntroLine?: string;
  /** Keyword reinforcement before project blocks. */
  projectSemanticReinforcement?: string;
  /** Closing intent recap before conversion CTAs. */
  endOfPageRecap?: string;
  /** Extra FAQ for voice-style long-tail queries. */
  entryFaqExtra?: { question: string; answer: string };
  /** Senior-level supplemental FAQ (voice / long-tail). */
  seniorFaqExtra?: { question: string; answer: string };
  /** Junior / mid-level supplemental FAQ (voice / long-tail). */
  juniorFaqExtra?: { question: string; answer: string };
  /** Override project section H2 (any level; used for senior/junior section titles). */
  projectsSectionTitle?: string;
  /** Override gray intro under project section H2. */
  projectsSectionSubcopy?: string;
  /** Right after H1 — reassures candidates with little or no paid experience. */
  noExperienceReassurance?: string;
  /** Long-tail query breadth: students, internship, no experience, etc. */
  queryBreadthLine?: string;
  /** Student / no-experience micro-section (2–3 bullets). */
  studentIntentBlock?: { h2: string; bullets: string[] };
  /** Second featured-snippet style block (“How to write…”). */
  howToWriteSnippet?: { h2: string; line1: string; line2: string };
  /** Trust line near example bullets. */
  realismLine?: string;
  /** Line above hero bullets — copy/paste intent. */
  copyIntentLine?: string;
  /** Early ATS warning + CTA after the three hero bullets. */
  earlyAtsWarning?: { body: string; ctaLabel: string; href: string };
  /** H2 for project section (entry-level: “Projects & Internships”). */
  entryProjectsSectionTitle?: string;
  /** Optional differentiation + conversion. */
  commonMistakes?: { title: string; points: string[] };
  /** Short trust line (no fabricated stats). */
  authorityLine?: string;
  intro: string;
  /** Conversion interrupt before examples. */
  doubtLine: string;
  projects: ProjectBlock[];
  /** Intent bridge immediately before the leadership block (senior). */
  leadershipQueryBridge?: string;
  /** SEO-aligned H2 for leadership examples (senior). */
  leadershipSectionTitle?: string;
  /** Role expansion under leadership H2 (staff / lead / principal…). */
  leadershipSectionSubcopy?: string;
  /** Featured-snippet style block inside the leadership section (senior). */
  leadershipSnippet?: { h3: string; line1: string; line2: string };
  /** Senior only: org-wide / leadership scope. */
  leadershipBullets?: string[];
};

const HUB: Record<ResumeBulletRole, ResumeBulletHubCopy> = {
  "data-scientist": {
    roleName: "Data Scientist",
    metaTitle:
      "40+ Data Scientist Resume Bullet Points (Entry, Junior, Senior – Copy & Paste) | ResumeAtlas",
    metaDescription:
      "40+ data scientist resume bullet points you can copy and adapt. Entry-level, junior, and senior examples—plus check your resume for ATS keyword gaps vs any job description, free.",
    keywords: [
      "data scientist resume bullet points",
      "data scientist resume bullets",
      "fresher data science resume",
      "ATS keywords data science",
      "machine learning resume bullets",
    ],
    h1: "Data Scientist Resume Bullets That Sound Credible",
    heroSubheadline:
      "Project-wise examples by career stage—entry, junior, and senior. No fluff: metrics, tools, and scope you can defend in an interview.",
    aboveFoldBullets: [
      "Shipped a Python + SQL scoring pipeline on 2M+ rows nightly; cut forecast error (MAPE) by 18% vs prior quarter.",
      "Trained ML models (Python, XGBoost) with calibrated metrics; reduced false positives 18% at the chosen operating point.",
      "Ran sequential A/B tests using SQL cohorts and experiment design; lifted conversion 12% with pre-registered guardrails.",
    ],
    authorityLine:
      "Used by job seekers applying to competitive roles at well-known technology and data-driven companies.",
    roleKeywordDensity:
      "Strong data scientist resume bullet points should include tools like Python, SQL, machine learning, and A/B testing—plus metrics that prove business impact, not just model accuracy.",
    introIntentStack:
      "Data scientist resume bullet points should match how you actually work: entry-level, junior, or senior—and the ATS keywords in each job posting. This hub gives copy-ready resume bullet points for every level, plus free tools to scan for missing keywords and compare your resume to the job description before you apply.",
    snippetDefinition: {
      h2: "What Are Good Data Scientist Resume Bullet Points?",
      line1:
        "Good data scientist resume bullet points pair concrete tools (Python, SQL, machine learning, experimentation) with measurable outcomes and the scope you truly owned.",
      line2:
        "They should also align with ATS screening: include keywords from the job description naturally—without stuffing metrics you cannot defend in an interview.",
    },
    paragraphs: [
      "Recruiters and ATS skim for tools (Python, SQL, Spark), outcomes (lift, precision, dollars), and how you influenced decisions. This hub routes you to one of three pages—each built around realistic project blocks—so the language matches how you actually worked.",
      "Treat every line as a template: swap our X% and N rows for numbers from your work. If a bullet oversells your role, tighten it; credibility beats buzzwords when someone asks follow-ups in screening.",
    ],
    semanticVariation:
      "These resume bullet points (also called resume lines or statements) should highlight measurable achievements—not adjectives. If you describe achievements honestly, you stay interview-safe while still improving ATS match.",
    previewSectionIntro:
      "These grouped examples add SERP depth: 16 data scientist resume bullet points across machine learning, data analysis, projects, and business impact—then open entry-level, junior, or senior pages for full project-wise banks.",
    previewSection: {
      h2: "Data Scientist Resume Bullet Point Examples (Preview)",
      groups: [
        {
          label: "Machine learning",
          bullets: [
            "Trained a gradient-boosted classifier (Python, XGBoost) on 120k labeled rows; improved recall@K by 4.2 pts vs baseline for a fraud-adjacent use case.",
            "Fine-tuned a transformer encoder for text classification; reached macro-F1 0.84 with class-weighting and stratified evaluation.",
            "Built calibration plots and threshold selection for a churn model; reduced false positives by 18% at the chosen operating point.",
            "Shipped a production scoring pipeline with drift monitoring; automated retrain review when PSI crossed agreed thresholds.",
          ],
        },
        {
          label: "Data analysis",
          bullets: [
            "Wrote SQL (CTEs, window functions) to build cohort retention tables; identified a 9% drop-off between day 0 and day 7 activation.",
            "Designed and analyzed sequential A/B tests; reported lift with CIs and guarded against peeking with a pre-registered analysis plan.",
            "Maintained a metric dictionary with data engineering; resolved three conflicting definitions of “active user” across dashboards.",
            "Built executive dashboards for revenue and funnel health; flagged a segment churn spike tied to $3.2M ARR at risk.",
          ],
        },
        {
          label: "Projects",
          bullets: [
            "Shipped a Looker dashboard for weekly KPI reviews; replaced a 5-tab spreadsheet workflow and saved ~6 hours/week of analyst time.",
            "Prototyped a notebook-to-batch scoring pipeline for monthly scoring; cut manual runs from 2 days to 45 minutes.",
            "Partnered with PM on an NLP assist feature; defined offline evaluation and success metrics before engineering committed headcount.",
            "Led a cross-functional data quality sprint; fixed lineage gaps that blocked 12 downstream reports for two weeks.",
          ],
        },
        {
          label: "Business impact",
          bullets: [
            "Linked model improvements to a 12% lift in conversion on a key funnel; documented assumptions for finance sign-off.",
            "Reduced forecast error by 18% vs prior quarter; tightened inventory targets and avoided $400k+ in excess stock.",
            "Quantified churn drivers with survival analysis; influenced roadmap prioritization for a retention theme.",
            "Cut reporting cycle time from 5 days to 1 day; enabled exec reviews on current data instead of stale exports.",
          ],
        },
      ],
    },
    comparisonSection: {
      title: "Why Most Resume Bullet Points Don't Work",
      points: [
        "Too generic: could apply to any company, so ATS and recruiters see no signal.",
        "No metrics: “improved model” without lift, latency, or cost is unverifiable.",
        "Missing keywords: the posting asks for SQL, experimentation, and causal thinking—but your resume never says them.",
        "Not aligned to the job description: strong bullets for the wrong role still lose.",
      ],
    },
    faq: [
      {
        question: "Why are data scientist resume bullets split by entry, junior, and senior?",
        answer:
          "Scope and language differ by level. Entry-level bullets emphasize coursework, internships, and foundational ML/SQL; junior bullets reflect ownership of analyses and models; senior bullets include cross-team influence, experimentation systems, and leadership. Mixing them makes your resume sound mis-leveled.",
      },
      {
        question: "Can I copy these bullets directly?",
        answer:
          "Use them as patterns and swap in your real metrics, tools, and outcomes. Copying verbatim without alignment to your experience can hurt you in interviews—and ATS still needs keywords from each specific job description.",
      },
      {
        question: "How do I know if my resume matches a job posting?",
        answer:
          "Paste your resume and the job description into ResumeAtlas. You get a practical view of keyword overlap and gaps compared to that posting—not a generic score—so you know what to fix before you apply.",
      },
    ],
    relatedSearches: [
      { label: "data scientist resume summary examples", href: "/data-scientist-resume-example" },
      { label: "data scientist resume projects", href: "/data-scientist-resume-bullet-points-entry-level" },
      { label: "machine learning resume bullet points", href: "/data-scientist-resume-bullet-points" },
      { label: "resume bullet points for freshers", href: "/data-scientist-resume-bullet-points-entry-level" },
    ],
    levelCards: {
      "entry-level": {
        hook: "Internships, capstone, and portfolio projects—SQL, Python, and first ML wins.",
        whatsInside: [
          "2–3 project blocks (academic + internship-style)",
          "Metric-friendly phrasing you can localize to your work",
          "CTA to scan for missing keywords vs the posting",
        ],
      },
      junior: {
        hook: "Experiments, production models, and stakeholder-ready narratives.",
        whatsInside: [
          "4 project blocks (A/B, LTV, NLP, analytics hygiene)",
          "Language that matches mid-level DS scope",
          "JD compare + keyword gap flow",
        ],
      },
      senior: {
        hook: "Platform ML, org-wide experimentation, and leadership scope.",
        whatsInside: [
          "5 deep project blocks + 10 leadership lines",
          "Staff-style outcomes: reliability, governance, exec comms",
          "Tailor to director+ postings with ATS alignment checks",
        ],
      },
    },
  },
  "software-engineer": {
    roleName: "Software Engineer",
    metaTitle:
      "40+ Software Engineer Resume Bullet Points (Entry, Junior, Senior – Copy & Paste) | ResumeAtlas",
    metaDescription:
      "40+ software engineer resume bullet points to copy and adapt—entry, junior, senior. APIs, reliability, scale—then compare your resume to a job description and fix ATS keyword gaps, free.",
    keywords: [
      "software engineer resume bullet points",
      "software developer resume bullets",
      "junior software engineer resume",
      "ATS software engineer keywords",
      "resume lines for engineers",
    ],
    h1: "Software Engineer Resume Bullets Hiring Managers Actually Read",
    heroSubheadline:
      "Shipped features, reliability work, and scale—broken out by level so your bullets match the job you want, not a generic template.",
    aboveFoldBullets: [
      "Shipped TypeScript/React features behind REST APIs; cut p95 latency 22% on a core checkout path.",
      "Hardened CI with Playwright + unit tests; dropped flaky integration failure rate from 11% to under 2%.",
      "Led zero-downtime PostgreSQL migrations; served 1M+ DAU with no customer-visible schema errors.",
    ],
    authorityLine:
      "Used by job seekers applying to competitive engineering teams at well-known technology companies.",
    roleKeywordDensity:
      "Strong software engineer resume bullet points should name your stack (TypeScript, React, Node, cloud), reliability signals (tests, SLOs, latency), and measurable outcomes hiring managers can verify.",
    introIntentStack:
      "Software engineer resume bullet points need to match your level—entry-level, junior, or senior—and the ATS keywords in each posting. This hub links full example pages for every stage, plus free tools to find missing keywords and compare your resume to the job description.",
    snippetDefinition: {
      h2: "What Are Good Software Engineer Resume Bullet Points?",
      line1:
        "Good software engineer resume bullet points name your stack (languages, frameworks, cloud), constraints (scale, latency, reliability), and a measurable result you can explain.",
      line2:
        "They should also pass ATS screening for that employer: mirror important keywords from the job description honestly—especially tools and domains the role emphasizes.",
    },
    paragraphs: [
      "Strong engineering resumes prove ownership: what you built, under what constraints, with what measurable result (latency, incidents, adoption). The three pages below mirror how IC scope grows—from bootcamp and internship projects to services, CI, and cross-team architecture.",
      "Use stacks and numbers you can defend. If you did not own the rollout, say how you contributed; if you measured p95 or error budgets, say so. Vague “improved performance” lines get skipped.",
    ],
    semanticVariation:
      "Think of these as resume lines and achievement bullets: short resume statements that prove impact. Hiring managers skim for proof, not buzzwords.",
    previewSectionIntro:
      "Below are 16 software engineer resume bullet points across ML-related work, data-heavy debugging, project delivery, and business impact—use them as patterns, then open entry-level, junior, or senior pages for deeper banks.",
    previewSection: {
      h2: "Software Engineer Resume Bullet Point Examples (Preview)",
      groups: [
        {
          label: "Machine learning",
          bullets: [
            "Productionized an ML inference service (Python, gRPC); held p99 under 85ms during peak with autoscaling and request budgets.",
            "Improved ranking for a recommendations feed; lifted click-through 6.4% with offline/online metric parity checks.",
            "Added model monitoring for data drift; cut false escalations 40% by tuning alert thresholds with SRE.",
            "Built batch + streaming feature pipelines; reduced training-serving skew with shared feature definitions.",
          ],
        },
        {
          label: "Data analysis",
          bullets: [
            "Optimized hot SQL paths and added Redis caching; reduced p95 read latency from 210ms to 120ms on a top endpoint.",
            "Built dashboards in Grafana for error budgets; helped the team exit a 30-day burn-rate breach.",
            "Instrumented client events end-to-end; uncovered a 14% drop in funnel completion on mobile Safari.",
            "Wrote data-quality checks in the deploy pipeline; blocked three bad releases before they hit production.",
          ],
        },
        {
          label: "Projects",
          bullets: [
            "Implemented idempotent REST endpoints for billing retries; cut failed charge recovery tickets by 38% over two releases.",
            "Designed schema migrations with zero-downtime deploys; avoided customer-visible errors during a high-traffic holiday window.",
            "Reduced React bundle size by 14% via code-splitting and lazy routes; improved LCP on the signup funnel.",
            "Partnered with design on accessibility fixes; closed 22 WCAG issues flagged in an audit.",
          ],
        },
        {
          label: "Business impact",
          bullets: [
            "Owned on-call for a Tier-1 service; reduced MTTR from 55m to 18m by adding runbooks and SLO dashboards.",
            "Led rollout of feature flags for a risky migration; rolled back once within 5 minutes with no customer data loss.",
            "Shipped pricing API hardening; recovered $1.1M annualized revenue from failed renewal flows.",
            "Mentored two junior engineers through code review norms; improved review turnaround time by 30%.",
          ],
        },
      ],
    },
    comparisonSection: {
      title: "Why Most Resume Bullet Points Don't Work",
      points: [
        "Buzzwords without proof: “strong collaborator” does not replace shipped outcomes.",
        "Missing metrics: latency, uptime, adoption, or error rate beats “improved performance.”",
        "Wrong keywords for the role: backend-heavy posting with only frontend bullets loses ATS match.",
        "Same resume for every job: stacks and domains differ—tailor honestly.",
      ],
    },
    faq: [
      {
        question: "Should I use the same resume bullets for every software engineer job?",
        answer:
          "No. You should keep a master resume, then tailor bullets and keywords to each posting. Same title at different companies often emphasizes different stacks (e.g. Kubernetes vs serverless) and domains.",
      },
      {
        question: "What makes a software engineer bullet “senior”?",
        answer:
          "Senior bullets usually show trade-offs, scale, reliability, mentorship, and cross-team impact—not just tasks. If you are applying to senior roles, your bullets should reflect that scope honestly.",
      },
      {
        question: "How can I check ATS keyword fit?",
        answer:
          "Use ResumeAtlas to compare your resume with the job description and run a keyword scan. Together they show what is missing compared to that specific posting.",
      },
    ],
    relatedSearches: [
      { label: "software engineer resume summary examples", href: "/software-engineer-resume-example" },
      { label: "software engineer resume projects", href: "/software-engineer-resume-bullet-points-entry-level" },
      { label: "backend engineer resume bullet points", href: "/software-engineer-resume-bullet-points" },
      { label: "resume bullet points for freshers", href: "/software-engineer-resume-bullet-points-entry-level" },
    ],
    levelCards: {
      "entry-level": {
        hook: "Coursework, internships, and first production commits—tests and stack details matter.",
        whatsInside: [
          "3 project blocks (API, React perf, systems coursework)",
          "Concrete stacks: TypeScript, Node, Playwright, etc.",
          "Path to JD match + missing keywords",
        ],
      },
      junior: {
        hook: "Services, CI, observability—mid-level ownership on real systems.",
        whatsInside: [
          "4 project blocks (microservices, flaky tests, payments, metrics)",
          "Bullets that show delivery + reliability, not only tasks",
          "Conversion layer to tailor vs the posting",
        ],
      },
      senior: {
        hook: "Architecture, SLOs, cost, security—and org-wide leadership.",
        whatsInside: [
          "5 project blocks + 10 leadership bullets",
          "RFCs, incident culture, hiring, exec visibility",
          "Built for staff/principal-style job descriptions",
        ],
      },
    },
  },
  "product-manager": {
    roleName: "Product Manager",
    metaTitle:
      "40+ Product Manager Resume Bullet Points (Entry, Junior, Senior – Copy & Paste) | ResumeAtlas",
    metaDescription:
      "40+ product manager resume bullet points you can copy—APM, mid-level, senior. Discovery, metrics, roadmaps—then compare your resume to a job description and fix ATS gaps, free.",
    keywords: [
      "product manager resume bullet points",
      "APM resume bullets",
      "PM resume achievements",
      "product manager ATS keywords",
      "resume statements product management",
    ],
    h1: "Product Manager Resume Bullets Tied to Outcomes",
    heroSubheadline:
      "Discovery, prioritization, and measurable launches—by level—so you do not sound like a feature list with no business impact.",
    aboveFoldBullets: [
      "Ran 18 customer discovery interviews; synthesized themes into a roadmap backlog that lifted trial-to-paid by 2.1%.",
      "Reprioritized roadmap using SQL-backed cohort retention and funnel metrics; fixed SMB churn concentrated in onboarding.",
      "Defined PRD success metrics and go/no-go gates; blocked a launch when guardrail KPIs signaled elevated support load.",
    ],
    authorityLine:
      "Used by job seekers targeting product roles at growth-stage and established technology companies.",
    roleKeywordDensity:
      "Strong product manager resume bullet points should weave in discovery, metrics, roadmaps, and stakeholder outcomes—using terms that match each job description’s domain (B2B SaaS, marketplace, platform, etc.).",
    introIntentStack:
      "Product manager resume bullet points should match your stage: entry-level, junior, or senior PM—and the ATS keywords in each job posting. This hub routes you to full example pages for every level, with tools to scan for missing keywords and compare your resume to the job description.",
    snippetDefinition: {
      h2: "What Are Good Product Manager Resume Bullet Points?",
      line1:
        "Good product manager resume bullet points connect customer evidence, business metrics (conversion, retention, revenue), and the decisions you influenced—not a feature laundry list.",
      line2:
        "They should also align with ATS screening: reuse keywords from the job description (discovery, roadmap, stakeholders, metrics) where they match your true experience.",
    },
    paragraphs: [
      "PM resumes get shortlisted when they show problems you framed, decisions you influenced, and metrics that moved (conversion, retention, revenue, NPS). The three pages map language to associate, mid-level, and senior scope—without mixing “owned roadmap” with work you only supported.",
      "Credibility beats title inflation. If you facilitated discovery but did not set strategy, the bullet should say that clearly—then show the impact you did drive.",
    ],
    semanticVariation:
      "These resume bullet points work as resume lines or short statements—what matters is measurable product outcomes, not a list of tools unless the posting demands them.",
    previewSectionIntro:
      "Below are 16 product manager resume bullet points grouped by ML collaboration, data analysis, shipped projects, and business impact—then use the entry-level, junior, or senior pages for complete project blocks.",
    previewSection: {
      h2: "Product Manager Resume Bullet Point Examples (Preview)",
      groups: [
        {
          label: "Machine learning",
          bullets: [
            "Partnered with data science on model launch criteria; required offline/online parity checks before scaling spend.",
            "Defined human-in-the-loop workflows for an ML assist feature; cut incorrect suggestions 31% vs launch baseline.",
            "Prioritized labeling budget for a classifier; improved precision at fixed recall and reduced review queue load.",
            "Shipped model-backed ranking changes behind flags; rolled back within one hour when a guardrail metric regressed.",
          ],
        },
        {
          label: "Data analysis",
          bullets: [
            "Built cohort retention tables with analytics; identified a 9% activation gap between segments.",
            "Ran sequential experiments; reported lift with confidence intervals and a pre-registered stopping plan.",
            "Partnered with finance on unit economics; reframed roadmap cuts using contribution margin, not vanity adoption.",
            "Instrumented funnel events; found a 14% drop on mobile checkout and prioritized a fix ahead of a marketing launch.",
          ],
        },
        {
          label: "Projects",
          bullets: [
            "Ran 18 customer interviews across two segments; synthesized themes into a prioritized backlog that shipped three fixes lifting trial-to-paid by 2.1%.",
            "Defined success metrics for an onboarding redesign; prevented launch when guardrail metrics showed increased support load.",
            "Wrote acceptance criteria for a billing edge case; reduced UAT defects from 22 to 6 vs the prior similar release.",
            "Owned a roadmap theme tied to net revenue retention; reprioritized two quarters after cohort analysis showed SMB churn.",
          ],
        },
        {
          label: "Business impact",
          bullets: [
            "Recommended a packaging change after price sensitivity research; improved ARPU by 6% without hurting top-of-funnel conversion.",
            "Aligned engineering and GTM on an API SLA for enterprise deals; shipped transparent status comms and fewer escalations.",
            "Represented product in two enterprise pilots; converted both by tying roadmap milestones to contract KPIs.",
            "Facilitated quarterly planning with finance; tied roadmap cuts to explicit trade-offs vs burn rate and risk.",
          ],
        },
      ],
    },
    comparisonSection: {
      title: "Why Most Resume Bullet Points Don't Work",
      points: [
        "Feature lists without outcomes: shipping is not the win—impact is.",
        "No metrics: conversion, retention, revenue, or time-to-value beats vague “improved product.”",
        "Missing domain keywords: B2B SaaS vs marketplace vs platform roles read differently to ATS.",
        "Same bullets for every employer: tailor to each job description.",
      ],
    },
    faq: [
      {
        question: "How are PM resume bullets different for entry vs senior roles?",
        answer:
          "Entry-level bullets often emphasize discovery support, delivery partnership, and clear metrics on owned slices. Senior bullets emphasize portfolio trade-offs, multi-team alignment, revenue or cost impact, and executive communication.",
      },
      {
        question: "Should PM bullets mention tools like Jira or Figma?",
        answer:
          "Only when they add signal. Prioritize outcomes, customer evidence, and business metrics; tools are supporting detail unless the posting emphasizes a specific stack.",
      },
      {
        question: "How do I tailor PM bullets to a job description?",
        answer:
          "Paste the posting into ResumeAtlas alongside your resume. You will see which themes and keywords are underrepresented so you can adjust wording without inventing experience.",
      },
    ],
    relatedSearches: [
      { label: "product manager resume summary examples", href: "/product-manager-resume-example" },
      { label: "product manager resume projects", href: "/product-manager-resume-bullet-points-entry-level" },
      { label: "APM resume bullet points", href: "/product-manager-resume-bullet-points-entry-level" },
      { label: "resume bullet points for freshers", href: "/product-manager-resume-bullet-points-entry-level" },
    ],
    levelCards: {
      "entry-level": {
        hook: "APM / associate PM—discovery, shipping support, and measurable slices.",
        whatsInside: [
          "3 project blocks (discovery sprint, launch support, stakeholders)",
          "Honest scope: what you owned vs supported",
          "JD + keyword checks before you apply",
        ],
      },
      junior: {
        hook: "Mid PM—roadmap slices, pricing, and cross-functional delivery.",
        whatsInside: [
          "4 project blocks (OKRs, pricing, platform, experiments)",
          "Outcome-first language hiring managers scan for",
          "Tailoring flow for each posting",
        ],
      },
      senior: {
        hook: "Senior / Group PM—portfolio, exec narrative, and org-wide bets.",
        whatsInside: [
          "5 project blocks + 10 leadership bullets",
          "P&L, compliance, enterprise, and hiring themes",
          "Built for high-stakes job descriptions",
        ],
      },
    },
  },
};

function dsEntry(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "20+ Entry-Level Data Scientist Resume Bullet Points (Freshers – Copy & Paste) | ResumeAtlas",
    metaDescription:
      "20+ entry-level data scientist resume bullet points for freshers, recent graduates, and internships: Python, SQL, ML projects—plus ATS keyword scan and job description match, free.",
    keywords: [
      "data scientist resume bullet points entry level",
      "resume bullet points for freshers",
      "resume bullet points for internship",
      "resume bullet points with no experience",
      "resume bullet points for students",
      "fresher data science resume bullets",
      "recent graduate data science resume",
      "internship data scientist resume",
      "Python SQL resume bullets",
      "ATS data science keywords",
    ],
    h1: "20+ Entry-Level Data Scientist Resume Bullet Points (Freshers – Copy & Paste)",
    noExperienceReassurance:
      "No experience? These bullet points are designed for projects, internships, and coursework.",
    queryBreadthLine:
      "These resume bullet points are ideal for freshers, students, internship applicants, and candidates with no prior work experience.",
    studentIntentBlock: {
      h2: "Resume Bullet Points for Students (No Experience)",
      bullets: [
        "Completed a statistics and machine learning course project in Python; documented methodology, metrics, and limitations for a graded write-up non-experts could follow.",
        "Joined a student analytics club and supported one dashboard refresh in SQL; summarized insights in three bullets for a faculty sponsor.",
        "Built a personal portfolio notebook analyzing a public dataset; linked the repo on your resume with a one-line problem statement and outcome.",
      ],
    },
    intentStack:
      "Looking for entry-level data scientist resume bullet points as a fresher, recent graduate, or internship applicant? These examples are designed to pass ATS screening and match job descriptions. Below are 20+ lines across academic, internship, and personal projects—edit with your real tools, metrics, and scope.",
    exactMatchQueryLine:
      "If you are searching for entry-level data scientist resume bullet points, these examples are designed for freshers and students with no experience.",
    copyIntentLine:
      "Copy and paste these into your resume (edit with your own tools and results).",
    examplesAboveFoldH2: "Examples of Entry-Level Data Scientist Resume Bullet Points",
    earlyAtsWarning: {
      body: "These examples are generic patterns. Your resume may still miss keywords required by ATS for a specific posting.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Entry-Level Data Scientist Resume Bullet Points?",
      line1:
        "Good entry-level data scientist resume bullet points name tools you actually used (Python, pandas, SQL, scikit-learn) and a measurable outcome or learning—even from class, internships, or Kaggle-style projects.",
      line2:
        "They should also echo ATS-friendly keywords from the job description: statistics, experimentation, dashboards—without inventing production scope you did not have.",
    },
    howToWriteSnippet: {
      h2: "How to Write Entry-Level Data Scientist Resume Bullet Points",
      line1:
        "Entry-level data scientist resume bullet points should focus on projects, internships, coursework, and measurable results you can defend in an interview.",
      line2:
        "Include tools like Python, SQL, pandas, and machine learning where you used them, and mirror keywords from each job description without overstating scope.",
    },
    aboveFoldBullets: [
      "Built a machine learning classifier as part of an academic capstone project, improving macro-F1 by 5 pts using Python and scikit-learn (stratified k-fold validation).",
      "Wrote SQL with joins and window functions during a summer internship to reconcile funnel vs revenue data; surfaced a 6% attribution gap for the ops lead.",
      "Trained an NLP text classifier as a personal portfolio project (TF–IDF + logistic regression vs a small transformer baseline) and documented error analysis in a public GitHub README.",
      "Documented EDA and modeling steps in Jupyter for a statistics course; earned full credit for reproducibility and clear visualizations.",
    ],
    detailsIntroLine:
      "Here are more entry-level resume bullet point examples you can use:",
    projectSemanticReinforcement:
      "These entry-level data scientist resume bullet points include skills like Python, SQL, machine learning, and data analysis—mirror the terms your target job description uses.",
    endOfPageRecap:
      "Whether you are a fresher, student, or internship applicant, these entry-level data scientist resume bullet points can help you improve your resume and pass ATS screening.",
    entryFaqExtra: {
      question: "Can I use these resume bullet points without experience?",
      answer:
        "Yes. These examples are designed for students, freshers, and candidates with no work experience, using projects, internships, and coursework you can defend in interviews.",
    },
    realismLine:
      "These examples are based on real projects, internships, and coursework—replace every metric and tool with your own truth.",
    authorityLine:
      "Used by students and career switchers building a first data science resume that still reads credible to recruiters.",
    intro:
      "Use the project blocks below as patterns: swap in your datasets, course names, and honest metrics. Entry-level screening still rewards specificity—tools, methods, and outcomes—over buzzwords.",
    doubtLine:
      "Examples are starting points. Your resume still needs the exact skills and tools each employer lists—otherwise ATS and recruiters may never see the fit.",
    entryProjectsSectionTitle:
      "Entry-Level Data Scientist Resume Bullet Points (Projects & Internships)",
    commonMistakes: {
      title: "Common Mistakes in Entry-Level Resume Bullet Points",
      points: [
        "No metrics: “worked on ML” without Python/SQL detail or any measurable outcome.",
        "Too generic: bullets that could describe any student without tools or methods.",
        "Missing keywords: the posting asks for experimentation, statistics, or dashboards—but your resume never says them.",
        "Not aligned to the job description: strong class projects for the wrong role or stack still lose.",
      ],
    },
    projects: [
      {
        groupHeading: "Academic Projects",
        groupIntro:
          "These academic project bullet points highlight data science skills like Python, SQL, statistics, and machine learning—common phrases ATS parsers look for.",
        name: "Capstone: churn prediction (course)",
        bullets: [
          "Built a binary classification model in Python (pandas, scikit-learn) on ~50k rows as part of a degree capstone; validated with stratified k-fold and reported precision/recall trade-offs to a non-technical audience.",
          "Engineered features from timestamps and usage aggregates; documented assumptions and leakage checks so results were reproducible from a clean notebook export.",
          "Presented model limitations and next steps in a 10-minute readout; received top marks for clarity on bias and class imbalance handling.",
          "Compared at least two model families with a simple hyperparameter grid; chose the best model using held-out metrics, not training accuracy alone.",
        ],
      },
      {
        name: "Regression & statistics coursework",
        bullets: [
          "Completed a semester project fitting generalized linear models in Python; interpreted coefficients and checked residual diagnostics for a public health dataset.",
          "Ran hypothesis tests and confidence intervals for A/B-style lab assignments; documented why p-values alone were insufficient without effect sizes.",
          "Built a simple power analysis spreadsheet for lab exercises; explained why underpowered tests could miss meaningful effects.",
          "Visualized heteroskedasticity and applied a variance-stabilizing transform; summarized limitations for a non-technical grader in two sentences.",
        ],
      },
      {
        groupHeading: "Internship Projects",
        groupIntro:
          "These internship bullet points emphasize SQL, analytics, dashboards, and stakeholder communication—keywords many data job descriptions repeat.",
        name: "SQL + dashboard internship",
        bullets: [
          "Wrote SQL (joins, window functions) to reconcile daily revenue vs funnel events; surfaced a 6% discrepancy between marketing attribution and finance totals for the ops lead.",
          "Prototyped a Looker dashboard used weekly by two teams; cut ad-hoc Slack requests by replacing them with three standard views (funnel, cohort, weekly KPI).",
          "Documented metric definitions in a shared sheet; resolved one conflicting KPI between growth and finance before leadership review.",
          "Partnered with an analyst to QA a new event; fixed a tracking bug that understated sign-ups by ~4% in weekly reporting.",
        ],
      },
      {
        groupHeading: "Personal Projects",
        groupIntro:
          "These personal portfolio bullet points show end-to-end practice with Python, NLP, and reproducible workflows—useful when you have no traditional job title yet.",
        name: "Kaggle-style NLP (portfolio)",
        bullets: [
          "Trained a text classifier on ~20k labeled reviews; compared TF–IDF + logistic regression vs a small fine-tuned transformer baseline and reported error analysis by class.",
          "Packaged preprocessing and evaluation in a public repo with a one-page README so a reviewer could rerun training in under 30 minutes on CPU.",
          "Submitted to a class leaderboard competition; ranked top 15% by macro-F1 while keeping inference time under the stated CPU budget.",
          "Added a short ethics note on label noise and class imbalance; proposed next steps if the model were used beyond the coursework scope.",
        ],
      },
      {
        name: "Exploratory analysis notebook (GitHub)",
        bullets: [
          "Published an EDA notebook on a public dataset (Python, pandas, plots); summarized three actionable insights with cited visualizations for a mock stakeholder review.",
          "Cleaned messy categorical fields with explicit rules; logged every transform so a peer could reproduce the same tables from raw CSVs.",
          "Created a correlation heatmap and flagged two redundant features before modeling; reduced multicollinearity risk in a follow-on homework.",
          "Wrote a short “next steps” section listing modeling options and data gaps; matched rubric expectations for reproducible academic work.",
        ],
      },
    ],
  };
}

function dsJunior(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "Junior Data Scientist Resume Bullet Points (Mid-Level IC – Examples) | ResumeAtlas",
    metaDescription:
      "Junior / mid-level data scientist resume bullets: A/B tests, production models, Python, SQL, stakeholders—plus free ATS keyword scan and job description match.",
    keywords: [
      "junior data scientist resume bullet points",
      "mid level data scientist resume examples",
      "data scientist resume bullets 2 years experience",
      "ATS data science keywords",
      "machine learning resume bullets mid level",
    ],
    h1: "Data Scientist Resume Bullet Points (Junior)",
    intentStack:
      "Mid-level data scientist roles expect owned analyses, trustworthy experiments, and stakeholder-ready metrics. These resume bullet points are built for that scope—edit every line to match your posting.",
    exactMatchQueryLine:
      "If you are searching for junior data scientist resume bullet points, these examples cover experiments, modeling, analytics hygiene, and cross-functional work typical of a mid-level IC.",
    copyIntentLine:
      "Copy and adapt these lines (swap metrics, datasets, and tools for your real work).",
    examplesAboveFoldH2: "Examples of Junior Data Scientist Resume Bullet Points",
    earlyAtsWarning: {
      body: "These lines are patterns. Your resume still needs the exact tools and domains each employer lists in the job description.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Junior Data Scientist Resume Bullet Points?",
      line1:
        "Good junior (mid-level) data scientist resume bullet points show end-to-end ownership: experiment design, modeling or analysis, and a measurable product or ops outcome—not notebook tasks alone.",
      line2:
        "They should also align with ATS screening: Python, SQL, statistics or ML, and experimentation language pulled honestly from each job description.",
    },
    howToWriteSnippet: {
      h2: "How to Write Junior Data Scientist Resume Bullet Points",
      line1:
        "Lead with the decision or metric, then the method: what you measured, what changed, and how you partnered with eng or PM.",
      line2:
        "Avoid junior-in-title inflation: if you supported an analysis, say how; if you owned the metric story, say that clearly.",
    },
    aboveFoldBullets: [
      "Designed and analyzed sequential A/B tests on onboarding; recommended a flow change that lifted 7-day activation by 4.1% (95% CI 1.2–6.9%) without harming support volume.",
      "Built gradient-boosted LTV estimates in Python; calibrated bins vs realized revenue over 6 months and shared uncertainty ranges with marketing for budget allocation.",
      "Fine-tuned a compact transformer for multi-label intent on ~40k tickets; achieved macro-F1 0.81 vs 0.68 for the legacy rules baseline in offline eval.",
      "Owned metric definitions for “active user” across mobile and web; resolved three conflicting dashboards by publishing a single source of truth doc and dbt tests.",
    ],
    authorityLine:
      "Used by mid-level data scientists targeting product analytics, applied ML, and growth roles.",
    projectsSectionTitle: "Junior Data Scientist Resume Bullet Points (Experience & Projects)",
    projectsSectionSubcopy:
      "Four project blocks—experiments, modeling, NLP assist, and metrics hygiene. Replace numbers with yours; mid-level screens reward clarity and defensible scope.",
    realismLine:
      "These examples reflect common junior DS themes—swap in your real experiments, stacks, and business context.",
    projectSemanticReinforcement:
      "These junior data scientist resume bullet points reinforce Python, SQL, machine learning, and experimentation—mirror the exact phrases and tools in each job description.",
    endOfPageRecap:
      "Whether you are a mid-level IC or moving from entry-level to more ownership, junior data scientist resume bullet points should prove impact—then compare your resume to the posting for gaps before you apply.",
    juniorFaqExtra: {
      question: "Are “junior” and “mid-level” data scientist resume bullets the same?",
      answer:
        "Often yes on a resume: both usually mean you own analyses and models without org-wide platform leadership. Use the language your target job uses (IC2, mid-level, experienced)—and align bullets to that scope honestly.",
    },
    commonMistakes: {
      title: "Common Mistakes in Junior Data Scientist Resume Bullet Points",
      points: [
        "Notebook tasks with no product metric: “built a model” without lift, calibration, or stakeholder use.",
        "Generic ML stack dumps: algorithms listed without problem, data, or outcome.",
        "Missing posting fit: the JD emphasizes causal inference or forecasting—your bullets stay only on dashboards.",
        "Scope blur: “led” when you only supported data pulls—recruiters probe this in screens.",
      ],
    },
    intro:
      "Use these patterns when you own analyses end-to-end, partner with PMs or engineers, and ship work that affects product or operations—not only ad-hoc notebooks.",
    doubtLine:
      "If your bullets could apply to any company, they will not match a specific posting. Compare your resume to the job description to see which terms and outcomes are missing.",
    projects: [
      {
        name: "Onboarding experiment roadmap",
        bullets: [
          "Designed and analyzed sequential A/B tests on onboarding; recommended a flow change that lifted 7-day activation by 4.1% (95% CI 1.2–6.9%) without harming support volume.",
          "Partnered with engineering on event quality; improved coverage of key funnel events from 78% to 96% before scaling the experiment to 100% traffic.",
        ],
      },
      {
        name: "Customer LTV model (batch scoring)",
        bullets: [
          "Built gradient-boosted LTV estimates in Python; calibrated bins vs realized revenue over 6 months and shared uncertainty ranges with marketing for budget allocation.",
          "Automated monthly scoring in Airflow; reduced manual spreadsheet work by ~8 hours per month for the growth team.",
        ],
      },
      {
        name: "NLP: ticket routing assist",
        bullets: [
          "Fine-tuned a compact transformer for multi-label intent on ~40k tickets; achieved macro-F1 0.81 vs 0.68 for the legacy rules baseline in offline eval.",
          "Shipped shadow-mode inference behind a feature flag; monitored drift weekly and defined rollback criteria with on-call support.",
        ],
      },
      {
        name: "Self-serve analytics hygiene",
        bullets: [
          "Owned metric definitions for “active user” across mobile and web; resolved three conflicting dashboards by publishing a single source of truth doc and dbt tests.",
        ],
      },
    ],
  };
}

function dsSenior(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "Senior Data Scientist Resume Bullet Points (Staff / Leadership Examples) | ResumeAtlas",
    metaDescription:
      "Senior data scientist resume bullets: platform ML, experimentation systems, exec-level stakeholder leadership, and org-wide metrics—plus free ATS keyword scan and job description match.",
    keywords: [
      "senior data scientist resume bullet points",
      "staff data scientist resume examples",
      "data science leadership resume bullets",
      "principal data scientist resume",
      "ATS data science keywords senior",
      "machine learning leadership resume",
      "leadership resume bullet points",
    ],
    h1: "Senior Data Scientist Resume Bullet Points",
    intentStack:
      "Targeting senior or staff data scientist roles? These resume bullet points emphasize platform scale, trustworthy experimentation, and cross-functional leadership. Use them as patterns—then align every line to the posting’s keywords and scope.",
    exactMatchQueryLine:
      "If you are searching for senior data scientist resume bullet points, these examples cover platform ML, experiments at scale, and leadership-style lines you can split across summary and experience.",
    copyIntentLine:
      "Copy and adapt these lines (replace metrics, tools, and scope with your own truth).",
    examplesAboveFoldH2: "Examples of Senior Data Scientist Resume Bullet Points",
    earlyAtsWarning: {
      body: "These patterns are illustrative. Your resume must still match the exact tools, domains, and leadership verbs from each job description.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Senior Data Scientist Resume Bullet Points?",
      line1:
        "Good senior data scientist resume bullet points show platform or product-level impact: experimentation systems, ranking or forecasting at scale, and clear trade-offs—not just model names.",
      line2:
        "They should also echo ATS-friendly leadership and stakeholder language from the posting: roadmaps, governance, exec reviews, and cross-functional alignment—where you truly owned that scope.",
    },
    howToWriteSnippet: {
      h2: "How to Write Senior Data Scientist Resume Bullet Points",
      line1:
        "Lead with the business or product outcome, then the method: owned the loop, shipped the guardrails, influenced the roadmap—paired with Python, SQL, ML, and experimentation where relevant.",
      line2:
        "Mirror senior-level keywords from each job description (staff, principal, platform, reliability, stakeholders) without inflating title or scope you did not have.",
    },
    aboveFoldBullets: [
      "Led adoption of a centralized experimentation service (power analysis, sequential testing guardrails); cut time-to-first-valid experiment from ~4 weeks to ~6 days for eight product squads.",
      "Owned the iteration loop for a ranking model serving ~12k RPS; reduced p99 latency by 22% via batching + caching while holding offline NDCG within 0.5% of prior.",
      "Delivered probabilistic demand forecasts used in quarterly planning; reduced MAPE vs naive baseline by 18% on top SKUs with documented downside scenarios for finance.",
      "Defined monitoring for fairness and stability on a credit-adjacent model; coordinated with legal and risk on documentation for regulatory review.",
    ],
    authorityLine:
      "Used by senior ICs and staff data scientists applying to high-bar product and platform teams.",
    projectsSectionTitle: "Senior Data Scientist Resume Bullet Points (Experience & Projects)",
    projectsSectionSubcopy:
      "Five project blocks—experimentation, real-time ranking, forecasting, risk, and mentorship. Replace every metric with your own; senior screens reward specificity and defensible scope.",
    realismLine:
      "These examples are based on common senior DS themes—swap in your real systems, teams, and numbers.",
    projectSemanticReinforcement:
      "These senior data scientist resume bullet points reinforce skills like Python, SQL, machine learning, and A/B testing—plus leadership and stakeholder language—so ATS and humans see the same story.",
    endOfPageRecap:
      "Whether you are a staff IC, senior lead, or principal-track candidate, senior data scientist resume bullet points should match how you actually influenced scope—then align your resume to each posting before you apply.",
    seniorFaqExtra: {
      question: "Should senior data scientist resume bullets include leadership if I am still an IC?",
      answer:
        "Yes, when it is true: mentoring, hiring, roadmap influence, and cross-org alignment are all fair signals for senior IC roles. Keep them concrete and tied to outcomes—not vague “leadership” adjectives.",
    },
    commonMistakes: {
      title: "Common Mistakes in Senior Data Scientist Resume Bullet Points",
      points: [
        "Model-only bullets: techniques without business impact, scale, or governance context.",
        "Inflated leadership: claiming org-wide scope you only supported in a meeting.",
        "Missing posting keywords: the JD asks for experimentation, causal inference, or platform—your resume never says them.",
        "Generic metrics: “improved model” without lift, latency, or risk trade-offs you can defend.",
      ],
    },
    intro:
      "Senior ICs are hired for judgment under ambiguity, reliable delivery, and cross-functional leadership. These examples emphasize scope, trade-offs, and business outcomes—not model names alone.",
    doubtLine:
      "Senior titles get screened hard for keyword fit. Generic wins will not beat a tailored resume for this job description.",
    leadershipQueryBridge:
      "If you are looking for senior or staff-level resume bullet points, focus on leadership, ownership, and business impact.",
    leadershipSectionTitle: "Leadership Resume Bullet Points for Senior Data Scientists",
    leadershipSectionSubcopy:
      "These leadership resume bullet points are designed for senior, staff, lead, and principal data scientists working on cross-team impact and large-scale systems.",
    leadershipSnippet: {
      h3: "What Are Leadership Resume Bullet Points?",
      line1:
        "Leadership resume bullet points highlight ownership, cross-team impact, hiring, and strategic decision-making across large systems or products.",
      line2:
        "For data science, they often show up as roadmap influence with VPs, model ROI narratives for execs, vendor governance, or org-wide metrics—not one-off analyses.",
    },
    projects: [
      {
        name: "Experimentation platform & culture",
        bullets: [
          "Led adoption of a centralized experimentation service (power analysis, sequential testing guardrails); cut time-to-first-valid experiment from ~4 weeks to ~6 days for eight product squads.",
          "Instituted review office hours with PM and design; blocked three launches where underpowered designs would have produced misleading lift claims.",
        ],
      },
      {
        name: "Real-time ranking / relevance",
        bullets: [
          "Owned the iteration loop for a ranking model serving ~12k RPS; reduced p99 latency by 22% via batching + caching while holding offline NDCG within 0.5% of prior.",
          "Partnered with infra on canary deploys and automated rollback on feature-distribution drift beyond agreed thresholds.",
        ],
      },
      {
        name: "Forecasting & planning",
        bullets: [
          "Delivered probabilistic demand forecasts used in quarterly planning; reduced MAPE vs naive baseline by 18% on top SKUs and documented downside scenarios for finance.",
        ],
      },
      {
        name: "Model risk & compliance",
        bullets: [
          "Defined monitoring for fairness and stability on a credit-adjacent model; coordinated with legal and risk on documentation for regulatory review.",
        ],
      },
      {
        name: "Mentorship & hiring",
        bullets: [
          "Mentored four junior scientists on experimental design and code review standards; raised median experiment review turnaround from 6 days to 2 days.",
        ],
      },
    ],
    leadershipBullets: [
      "Led a cross-functional initiative with product and finance to align forecasting and inventory inputs; influenced $12M+ in annual planning decisions tied to model outputs across three regions.",
      "Set the annual DS roadmap with product and engineering VPs; rebalanced two initiatives toward platform reliability after a Q2 outage postmortem.",
      "Owned the executive narrative for model ROI: standardized a one-page template tying model releases to revenue, cost, and risk metrics used in board prep.",
      "Negotiated vendor spend on labeling and feature stores; consolidated two contracts to save ~$180k ARR without reducing label quality SLAs.",
      "Stood up a science–engineering SLA for model handoffs (docs, tests, dashboards); cut production incidents tagged “unclear ownership” by 40% quarter over quarter.",
      "Led hiring for three senior IC roles; introduced a live case focused on trade-off communication, improving onsite-to-offer calibration.",
      "Partnered with security on data access patterns for PII-heavy features; delivered a reviewed design that passed internal audit on first submission.",
      "Facilitated quarterly planning with GTM: translated model roadmap into customer-facing capability timelines without overpromising delivery dates.",
      "Represented data science in customer calls for two enterprise pilots; converted both by tying roadmap to measurable KPIs in the SOW.",
      "Drove adoption of a feature store across three business units; defined governance for shared features and deprecation policy.",
      "Sponsored an internal “stats literacy” series for PMs; tracked follow-up survey NPS +12 and fewer mis-specified experiment requests to DS.",
    ],
  };
}

function seEntry(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "20+ Entry-Level Software Engineer Resume Bullet Points (Freshers – Copy & Paste) | ResumeAtlas",
    metaDescription:
      "20+ entry-level software engineer resume bullet points for freshers, recent graduates, and internships: TypeScript, React, APIs, tests—plus ATS scan and job description match, free.",
    keywords: [
      "software engineer resume bullet points entry level",
      "resume bullet points for freshers",
      "resume bullet points for internship",
      "resume bullet points with no experience",
      "resume bullet points for students",
      "fresher software engineer resume",
      "recent graduate software engineer resume",
      "software engineering internship resume",
      "ATS software engineer keywords",
    ],
    h1: "20+ Entry-Level Software Engineer Resume Bullet Points (Freshers – Copy & Paste)",
    noExperienceReassurance:
      "No experience? These bullet points are designed for projects, internships, and coursework.",
    queryBreadthLine:
      "These resume bullet points are ideal for freshers, students, internship applicants, and candidates with no prior work experience.",
    studentIntentBlock: {
      h2: "Resume Bullet Points for Students (No Experience)",
      bullets: [
        "Implemented a data structures assignment in Java with unit tests; documented time/space complexity trade-offs the rubric required.",
        "Built a simple full-stack app for a student hackathon (React + Express); deployed a demo link teammates could share with judges.",
        "Contributed two reviewed PRs to a campus open-source club repo; followed lint rules and CI checks before merge.",
      ],
    },
    intentStack:
      "Looking for entry-level software engineer resume bullet points as a fresher, recent graduate, or internship applicant? These examples are designed to pass ATS screening and match job descriptions. Below are 20+ lines across academic, internship, and personal projects—edit with your real stack, commits, and metrics.",
    exactMatchQueryLine:
      "If you are searching for entry-level software engineer resume bullet points, these examples are designed for freshers and students with no experience.",
    copyIntentLine:
      "Copy and paste these into your resume (edit with your own tools and results).",
    examplesAboveFoldH2: "Examples of Entry-Level Software Engineer Resume Bullet Points",
    earlyAtsWarning: {
      body: "These examples are generic patterns. Your resume may still miss keywords required by ATS for a specific posting.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Entry-Level Software Engineer Resume Bullet Points?",
      line1:
        "Good entry-level software engineer resume bullet points cite real code: languages, frameworks, tests, and a metric (latency, crashes, coverage) or a concrete artifact (PRs merged, tickets closed).",
      line2:
        "They should also mirror ATS keywords from the posting—REST, CI/CD, React, cloud—when those match experience you can explain in an interview.",
    },
    howToWriteSnippet: {
      h2: "How to Write Entry-Level Software Engineer Resume Bullet Points",
      line1:
        "Entry-level software engineer resume bullet points should focus on projects, internships, coursework, and measurable results you can defend in a technical screen.",
      line2:
        "Include tools like TypeScript, React, Node, testing, and CI where you used them, and align phrasing with keywords from each job description.",
    },
    aboveFoldBullets: [
      "Implemented REST endpoints in Node.js + TypeScript as part of a university group project, raising Jest line coverage on handlers from 0% to 78% with Zod validation.",
      "Fixed a React memory leak during a software engineering internship; cut crash rate ~35% on a key page (Sentry) over two releases.",
      "Added Playwright smoke tests for checkout as internship work; caught two regressions pre-release on a four-person team.",
      "Shipped a small CLI tool in TypeScript for a personal repo; added unit tests and README usage examples a reviewer could run locally.",
    ],
    detailsIntroLine:
      "Here are more entry-level resume bullet point examples you can use:",
    projectSemanticReinforcement:
      "These entry-level software engineer resume bullet points include skills like TypeScript, React, testing, and APIs—align the stack with each job description.",
    endOfPageRecap:
      "Whether you are a fresher, student, or internship applicant, these entry-level software engineer resume bullet points can help you improve your resume and pass ATS screening.",
    entryFaqExtra: {
      question: "Can I use these resume bullet points without experience?",
      answer:
        "Yes. These examples are designed for students, freshers, and candidates with no work experience, using projects, internships, and coursework you can defend in interviews.",
    },
    realismLine:
      "These examples are based on real projects, internships, and coursework—replace every metric and tool with your own truth.",
    authorityLine:
      "Built for new grads, interns, and bootcamp students who need credible stack detail without overselling senior scope.",
    intro:
      "Mix internships, class projects, and open-source—just keep each bullet tied to something you can walk through in a technical screen.",
    doubtLine:
      "Bootcamp and class projects help, but job-specific keywords still matter. Scan your resume against each posting before you apply.",
    entryProjectsSectionTitle:
      "Entry-Level Software Engineer Resume Bullet Points (Projects & Internships)",
    commonMistakes: {
      title: "Common Mistakes in Entry-Level Resume Bullet Points",
      points: [
        "No metrics: “built features” without stack, tests, or latency/crash/coverage detail.",
        "Too generic: bullets that could describe any CS student without languages or frameworks.",
        "Missing keywords: the posting asks for React, Node, or CI—but your resume never says them.",
        "Not aligned to the job description: strong coursework for the wrong stack (mobile vs backend) still loses ATS match.",
      ],
    },
    projects: [
      {
        groupHeading: "Academic Projects",
        groupIntro:
          "These academic project bullet points stress languages, testing, and reproducible setup—signals hiring managers and ATS parsers associate with junior engineering roles.",
        name: "REST API group project (typed stack)",
        bullets: [
          "Implemented CRUD endpoints in Node.js + TypeScript with Zod validation; added Jest unit tests that brought line coverage on handlers from 0% to 78%.",
          "Containerized the service with Docker Compose for local dev; wrote README steps so new contributors could run the stack in under 10 minutes.",
          "Added OpenAPI-style request/response examples in the repo; reduced integration bugs when the mobile client consumed the API.",
          "Participated in code review for a teammate’s PR; caught an off-by-one error in pagination that would have shipped without tests.",
        ],
      },
      {
        name: "Data structures / systems coursework",
        bullets: [
          "Implemented a concurrent job queue in Go with worker pools and context cancellation; benchmarked throughput vs a naive mutex approach on 8 cores.",
          "Wrote a design note comparing backpressure strategies; matched professor rubric for correctness under concurrent load tests.",
          "Added benchmarks to justify a channel buffer size; documented trade-offs between throughput and memory in the submission.",
          "Extended the assignment with a unit test proving no goroutine leaks under shutdown; earned full marks on the concurrency rubric.",
        ],
      },
      {
        groupHeading: "Internship Projects",
        groupIntro:
          "These internship bullet points highlight React, reliability, and quality practices—keywords common on junior web and full-stack postings.",
        name: "Web app: bug fixes + performance",
        bullets: [
          "Fixed a memory leak in a React effect tied to unsubscribed listeners; reduced crash rate on a key page by ~35% over two releases (Sentry).",
          "Added Playwright smoke tests for checkout; caught two regressions pre-release in a four-person team.",
          "Profiled a slow list render; memoized child components and cut interaction latency enough to clear the perf budget for release.",
          "Shipped a small accessibility fix (labels + focus order) after an audit; closed two WCAG issues flagged in an internship review.",
        ],
      },
      {
        groupHeading: "Personal Projects",
        groupIntro:
          "These personal project bullet points show shipping, docs, and performance thinking—strong when you have no employer brand yet.",
        name: "Portfolio site + CLI tool",
        bullets: [
          "Built a static portfolio with Next.js and deployed on Vercel; added Lighthouse-driven tweaks that improved LCP on mobile.",
          "Published a tiny CLI in TypeScript that formats JSON logs; wrote unit tests and usage docs in the README.",
          "Instrumented basic analytics events with privacy-first defaults; no PII collected, documented in the repo.",
          "Cut bundle size by lazy-loading a heavy chart dependency; documented the trade-off in a short ADR note.",
        ],
      },
      {
        name: "Open-source contribution (small PR)",
        bullets: [
          "Submitted a documentation PR to an OSS library used in coursework; clarified TypeScript generics with an example that maintainers merged.",
          "Reproduced a bug locally, added a failing test, and opened an issue with repro steps; followed up after the fix landed.",
          "Signed commits and followed contributor guidelines; kept the change scoped to avoid review churn.",
          "Linked the merged PR on my resume with one line on impact (clarity for other students using the library).",
        ],
      },
    ],
  };
}

function seJunior(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "Junior Software Engineer Resume Bullet Points (Mid-Level IC – Examples) | ResumeAtlas",
    metaDescription:
      "Junior / mid-level software engineer resume bullets: services, CI/CD, reliability, observability—plus free ATS keyword scan and job description match.",
    keywords: [
      "junior software engineer resume bullet points",
      "mid level software engineer resume examples",
      "software engineer resume bullets 2 years experience",
      "ATS software engineer keywords",
      "full stack resume bullets mid level",
    ],
    h1: "Software Engineer Resume Bullet Points (Junior)",
    intentStack:
      "Mid-level software engineer roles reward shipping, reliability, and clear metrics. These resume bullet points match that bar—adapt stack and scale to each job description.",
    exactMatchQueryLine:
      "If you are searching for junior software engineer resume bullet points, these examples include services, CI, features, and observability lines typical of a mid-level IC.",
    copyIntentLine:
      "Copy and adapt these lines (replace services, languages, and numbers with your own).",
    examplesAboveFoldH2: "Examples of Junior Software Engineer Resume Bullet Points",
    earlyAtsWarning: {
      body: "These are illustrative patterns. Your resume must still reflect the frameworks, cloud, and domains each posting requires.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Junior Software Engineer Resume Bullet Points?",
      line1:
        "Good junior (mid-level) software engineer resume bullet points tie a concrete system change to a measurable outcome: latency, flakiness, incidents, cost, or delivery risk.",
      line2:
        "They should also mirror ATS keywords from the posting—languages, infra, testing—without claiming architecture you did not own.",
    },
    howToWriteSnippet: {
      h2: "How to Write Junior Software Engineer Resume Bullet Points",
      line1:
        "Name the constraint first (scale, debt, outage risk), then what you shipped, then the metric or incident trend that moved.",
      line2:
        "Credit collaborators when needed, but make your contribution legible: “implemented,” “owned rollout,” “cut p95 by ….”",
    },
    aboveFoldBullets: [
      "Split a monolith checkout path into a Node service behind REST; reduced p95 latency from 420ms to 260ms by isolating hot queries and adding Redis caching.",
      "Cut flaky integration tests from ~12% fail rate to under 2% by stabilizing fixtures, parallelizing safely, and quarantining brittle legacy suites.",
      "Shipped idempotent charge retries with exponential backoff; reduced failed retries requiring manual ops from ~40/week to under 5/week.",
      "Added structured logging and RED metrics dashboards for a critical worker; shortened median incident triage from ~45m to ~15m for three sev-2 incidents.",
    ],
    authorityLine:
      "Used by mid-level engineers applying across backend, full-stack, and product infrastructure teams.",
    projectsSectionTitle: "Junior Software Engineer Resume Bullet Points (Experience & Projects)",
    projectsSectionSubcopy:
      "Four project blocks—services, CI, product delivery, and observability. Mid-level readers skim for ownership and numbers; align verbs to each posting.",
    realismLine:
      "These examples map to common mid-level themes—swap in your repos, services, and on-call reality.",
    projectSemanticReinforcement:
      "These junior software engineer resume bullet points stress languages, reliability, and delivery—echo the stack and reliability terms from each job description.",
    endOfPageRecap:
      "Whether you are a mid-level IC or stepping up from entry-level scope, junior software engineer resume bullet points should show measurable ownership—then run a keyword and JD compare before you submit.",
    juniorFaqExtra: {
      question: "Should I say “junior” or “mid-level” on my software engineer resume?",
      answer:
        "Use the title that matches your experience and the roles you want. Many employers say “Software Engineer II” or “mid-level” instead of “junior”—mirror the job listing’s language when it is truthful.",
    },
    commonMistakes: {
      title: "Common Mistakes in Junior Software Engineer Resume Bullet Points",
      points: [
        "Feature dumps: shipped X and Y with no latency, reliability, or user impact.",
        "Stack salad: technologies listed without a problem or outcome.",
        "Missing domain fit: backend role but only frontend bullets—or vice versa.",
        "Inflated ownership: “designed system” for a small module you implemented.",
      ],
    },
    intro:
      "Mid-level IC bullets should show ownership of features, reliability work, and collaboration with design, product, or infra.",
    doubtLine:
      "Strong bullets still fail ATS if the posting’s stack and domain terms are missing. Match your resume to the job description, not a generic template.",
    projects: [
      {
        name: "Microservice extraction",
        bullets: [
          "Split a monolith checkout path into a Node service behind REST; reduced p95 latency from 420ms to 260ms by isolating hot queries and adding Redis caching.",
          "Wrote contract tests against consumer teams; prevented three breaking changes from reaching production across a six-month migration.",
        ],
      },
      {
        name: "CI reliability",
        bullets: [
          "Cut flaky integration tests from ~12% fail rate to under 2% by stabilizing fixtures, parallelizing safely, and quarantining brittle legacy suites.",
        ],
      },
      {
        name: "Feature delivery (payments)",
        bullets: [
          "Shipped idempotent charge retries with exponential backoff; reduced failed retries requiring manual ops from ~40/week to under 5/week.",
        ],
      },
      {
        name: "Observability",
        bullets: [
          "Added structured logging and RED metrics dashboards for a critical worker; shortened median incident triage from ~45m to ~15m for three sev-2 incidents.",
        ],
      },
    ],
  };
}

function seSenior(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "Senior Software Engineer Resume Bullet Points (Staff / Leadership Examples) | ResumeAtlas",
    metaDescription:
      "Senior software engineer resume bullets: distributed systems, reliability, security, cost—and leadership lines for staff IC roles. Free ATS keyword scan and job description match.",
    keywords: [
      "senior software engineer resume bullet points",
      "staff software engineer resume examples",
      "software engineer leadership resume bullets",
      "principal engineer resume bullets",
      "ATS software engineer keywords senior",
      "system design resume bullets",
      "leadership resume bullet points",
    ],
    h1: "Senior Software Engineer Resume Bullet Points",
    intentStack:
      "Applying as a senior or staff software engineer? These resume bullet points stress architecture, reliability, security, and cross-team influence. Adapt the wording to your stack and the exact posting.",
    exactMatchQueryLine:
      "If you are searching for senior software engineer resume bullet points, these examples include architecture, SLOs, mentorship, and org-wide impact lines you can place in experience or summary.",
    copyIntentLine:
      "Copy and adapt these lines (swap stacks, services, and metrics for your real work).",
    examplesAboveFoldH2: "Examples of Senior Software Engineer Resume Bullet Points",
    earlyAtsWarning: {
      body: "These examples are patterns. Your resume still needs the frameworks, cloud, and reliability terms each employer lists.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Senior Software Engineer Resume Bullet Points?",
      line1:
        "Good senior software engineer resume bullet points combine system design, operational rigor, and measurable outcomes: latency, incidents avoided, cost, security, and clear ownership.",
      line2:
        "For ATS and recruiters, they should also mirror the posting’s stack and domains—Kubernetes, event-driven design, SLOs, migrations—without buzzwords you cannot back in a system-design interview.",
    },
    howToWriteSnippet: {
      h2: "How to Write Senior Software Engineer Resume Bullet Points",
      line1:
        "Start with the constraint or risk (scale, outage, compliance), then what you changed (RFC, policy, rollout), then the measurable result.",
      line2:
        "Add mentorship, hiring, or cross-team forums only when they produced a durable outcome—rubrics, incident trends, or delivery speed—not generic “mentored engineers.”",
    },
    aboveFoldBullets: [
      "Led design for an event-driven order pipeline (Kafka, idempotent consumers); sustained 2× holiday peak with <0.02% duplicate processing (audited via reconciliation job).",
      "Drove error-budget policy for three Tier-1 services; shifted release cadence from weekly to on-demand gated by SLO burn rate.",
      "Partnered with security on secrets rotation and least-privilege IAM for batch jobs; closed all critical findings from external pen test before deadline.",
      "Reduced annual cloud spend by ~$420k by rightsizing K8s requests, autoscaling profiles, and moving cold storage to a cheaper tier without SLA breaches.",
    ],
    authorityLine:
      "Used by senior and staff engineers targeting high-scale product and infrastructure teams.",
    projectsSectionTitle: "Senior Software Engineer Resume Bullet Points (Experience & Projects)",
    projectsSectionSubcopy:
      "Five project blocks—architecture, reliability, security, mentorship, and cost. Senior readers look for trade-offs, scale, and ownership; align verbs to each job description.",
    realismLine:
      "These examples reflect common senior IC themes—replace services, clouds, and numbers with your own production reality.",
    projectSemanticReinforcement:
      "These senior software engineer resume bullet points surface skills like distributed systems, testing, observability, and cloud—mirror the exact stack and reliability language in each posting.",
    endOfPageRecap:
      "Whether you are a senior IC, staff engineer, or tech-lead track candidate, senior software engineer resume bullet points should reflect real scope—then compare your resume to the job description for keyword gaps before you submit.",
    seniorFaqExtra: {
      question: "How many leadership bullets should a senior software engineer resume include?",
      answer:
        "There is no fixed count—include leadership only where it is true and specific: hiring loops, RFCs adopted org-wide, incident programs, or roadmap trade-offs. A few strong lines beat a wall of vague “led team.”",
    },
    commonMistakes: {
      title: "Common Mistakes in Senior Software Engineer Resume Bullet Points",
      points: [
        "Task lists without scale: features shipped with no latency, traffic, or incident context.",
        "Buzzword stacks: technologies listed without a problem, design choice, or outcome.",
        "Missing posting fit: the JD emphasizes reliability or security—your bullets stay feature-only.",
        "Inflated scope: “owned architecture” for a small slice you advised on once.",
      ],
    },
    intro:
      "Senior IC and staff-style bullets emphasize trade-offs, scale, and enabling others—architecture reviews, incident culture, and long-term maintainability.",
    doubtLine:
      "Senior candidates get filtered on both leadership keywords and hard skills. Generic wins will not substitute for posting-specific language.",
    leadershipQueryBridge:
      "If you are looking for senior or staff-level resume bullet points, focus on leadership, ownership, and business impact.",
    leadershipSectionTitle: "Leadership Resume Bullet Points for Senior Software Engineers",
    leadershipSectionSubcopy:
      "These leadership resume bullet points are designed for senior, staff, lead, and principal software engineers working on cross-team impact and large-scale systems.",
    leadershipSnippet: {
      h3: "What Are Leadership Resume Bullet Points?",
      line1:
        "Leadership resume bullet points highlight ownership, cross-team impact, hiring, and strategic decision-making across large systems or products.",
      line2:
        "For engineering, they often surface as RFCs adopted org-wide, reliability or security programs, vendor choices, or roadmaps that span multiple services and teams.",
    },
    projects: [
      {
        name: "Platform architecture",
        bullets: [
          "Led design for an event-driven order pipeline (Kafka, idempotent consumers); sustained 2× holiday peak with <0.02% duplicate processing (audited via reconciliation job).",
          "Authored RFC process adopted by 6 teams; standardized retry semantics and DLQ handling, reducing cross-service incident volume by ~30% YoY.",
        ],
      },
      {
        name: "Org-wide reliability",
        bullets: [
          "Drove error-budget policy for three Tier-1 services; shifted release cadence from weekly to on-demand gated by SLO burn rate.",
        ],
      },
      {
        name: "Security & compliance",
        bullets: [
          "Partnered with security on secrets rotation and least-privilege IAM for batch jobs; closed all critical findings from external pen test before deadline.",
        ],
      },
      {
        name: "Mentorship & velocity",
        bullets: [
          "Mentored six engineers across two squads; introduced design-doc template that cut review churn cycles from ~5 rounds to ~2 on average.",
        ],
      },
      {
        name: "Cost optimization",
        bullets: [
          "Reduced annual cloud spend by ~$420k by rightsizing K8s requests, autoscaling profiles, and moving cold storage to a cheaper tier without SLA breaches.",
        ],
      },
    ],
    leadershipBullets: [
      "Led a cross-functional reliability initiative with product and finance impacting $8M+ in annual revenue at risk across checkout and payments; aligned engineering, SRE, and GTM on a phased rollout with shared SLOs.",
      "Co-owned the technical roadmap for the commerce domain with EM + PM; deprioritized two initiatives after capacity modeling showed delivery risk.",
      "Represented engineering in quarterly business reviews; translated reliability work into revenue-at-risk avoided using incident history and SLO data.",
      "Established a production readiness checklist for acquisitions; integrated two acquired stacks in 90 days with zero sev-1 incidents.",
      "Negotiated vendor evaluation for APM tooling; selected vendor B on TCO + query performance after a two-week bake-off with real traces.",
      "Sponsored internal guild on async debugging; reduced mean time to reproduce for async bugs by 28% measured over two quarters.",
      "Partnered with legal on data residency for EU customers; delivered sharding approach that met counsel requirements without a full rewrite.",
      "Led incident review reforms: blameless postmortems with action-item SLAs; tracked completion rate at 92% vs 61% prior year.",
      "Scaled hiring loop for senior ICs: added system-design rubric aligned to production constraints; improved onsite signal-to-noise per recruiter feedback.",
      "Drove deprecation of a legacy auth module used by 11 services; coordinated cutover windows with CS to avoid customer-facing auth blips.",
      "Facilitated architecture review board monthly; blocked one high-risk launch until chaos testing and rollback drills were completed.",
    ],
  };
}

function pmEntry(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "20+ Entry-Level Product Manager Resume Bullet Points (APM / Freshers – Copy & Paste) | ResumeAtlas",
    metaDescription:
      "20+ entry-level product manager resume bullet points for freshers, recent graduates, and internships: discovery, metrics, roadmaps—plus ATS keyword scan and job description match, free.",
    keywords: [
      "APM resume bullet points",
      "entry level product manager resume",
      "resume bullet points for freshers",
      "resume bullet points for internship",
      "resume bullet points with no experience",
      "resume bullet points for students",
      "associate PM resume bullets",
      "recent graduate product manager resume",
      "product management internship resume",
      "ATS product manager keywords",
    ],
    h1: "20+ Entry-Level Product Manager Resume Bullet Points (APM / Freshers – Copy & Paste)",
    noExperienceReassurance:
      "No experience? These bullet points are designed for projects, internships, and coursework.",
    queryBreadthLine:
      "These resume bullet points are ideal for freshers, students, internship applicants, and candidates with no prior work experience.",
    studentIntentBlock: {
      h2: "Resume Bullet Points for Students (No Experience)",
      bullets: [
        "Led a student club initiative with a one-page goals doc; tracked weekly metrics on sign-ups and presented a 5-minute recap to faculty.",
        "Organized a campus product talk series; negotiated with two speakers and published recap notes other students could reuse.",
        "Completed a product teardown assignment; wrote a SWOT-style memo with three prioritized recommendations for a mock executive review.",
      ],
    },
    intentStack:
      "Looking for entry-level product manager resume bullet points as a fresher, recent graduate, or internship applicant? These examples are designed to pass ATS screening and match job descriptions. Below are 20+ lines across academic, internship, and campus-style projects—edit with your real scope, metrics, and tools.",
    exactMatchQueryLine:
      "If you are searching for entry-level product manager resume bullet points, these examples are designed for freshers and students with no experience.",
    copyIntentLine:
      "Copy and paste these into your resume (edit with your own tools and results).",
    examplesAboveFoldH2: "Examples of Entry-Level Product Manager Resume Bullet Points",
    earlyAtsWarning: {
      body: "These examples are generic patterns. Your resume may still miss keywords required by ATS for a specific posting.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Entry-Level Product Manager Resume Bullet Points?",
      line1:
        "Good entry-level PM resume bullet points tie customer evidence to outcomes: interviews, funnel metrics, or launch support—with honest scope (what you owned vs facilitated).",
      line2:
        "They should also reflect ATS keywords from the posting: roadmap, stakeholders, experiments, SQL or analytics—only where you truly used them.",
    },
    howToWriteSnippet: {
      h2: "How to Write Entry-Level Product Manager Resume Bullet Points",
      line1:
        "Entry-level product manager resume bullet points should focus on projects, internships, coursework, and measurable outcomes—especially discovery, delivery support, and metrics.",
      line2:
        "Include tools like spreadsheets, BI dashboards, SQL, or roadmaps when you truly used them, and match phrasing to keywords from each job description.",
    },
    aboveFoldBullets: [
      "Ran 14 user interviews as part of an APM internship; synthesized themes into a backlog where two shipped tweaks lifted trial-to-paid conversion by 2.3% in six weeks.",
      "Built a funnel dashboard during a product internship; replaced a weekly Excel pull that cost ~3 hours of PM + analyst time.",
      "Wrote acceptance criteria for a billing export in a cross-functional class project; cut UAT defects from 22 to 6 vs the prior release of similar scope (team exercise).",
      "Facilitated weekly standups for a five-person product course team; logged decisions in a shared doc that reduced scope churn before the final demo.",
    ],
    detailsIntroLine:
      "Here are more entry-level resume bullet point examples you can use:",
    projectSemanticReinforcement:
      "These entry-level product manager resume bullet points include themes like discovery, metrics, roadmaps, and stakeholder coordination—echo the vocabulary in each posting.",
    endOfPageRecap:
      "Whether you are a fresher, student, or internship applicant, these entry-level product manager resume bullet points can help you improve your resume and pass ATS screening.",
    entryFaqExtra: {
      question: "Can I use these resume bullet points without experience?",
      answer:
        "Yes. These examples are designed for students, freshers, and candidates with no work experience, using projects, internships, and coursework you can defend in interviews.",
    },
    realismLine:
      "These examples are based on real projects, internships, and coursework—replace every metric and tool with your own truth.",
    authorityLine:
      "Written for APM programs, associate PMs, and internship candidates who need outcome-focused language without claiming full roadmap ownership.",
    intro:
      "If you facilitated discovery but did not set strategy, say so clearly—then show impact you did drive. Credibility beats title inflation for early PM screens.",
    doubtLine:
      "PM job descriptions vary wildly (B2B vs consumer, platform vs growth). Generic bullets will not match the keywords each recruiter screens for.",
    entryProjectsSectionTitle:
      "Entry-Level Product Manager Resume Bullet Points (Projects & Internships)",
    commonMistakes: {
      title: "Common Mistakes in Entry-Level Resume Bullet Points",
      points: [
        "No metrics: “helped ship features” without interviews, funnel impact, or defects reduced.",
        "Too generic: PM bullets that could apply to any club officer without product vocabulary.",
        "Missing keywords: the posting asks for SQL, experiments, or roadmaps—but your resume never says them.",
        "Not aligned to the job description: strong campus projects for the wrong domain (consumer vs B2B) still lose ATS match.",
      ],
    },
    projects: [
      {
        groupHeading: "Academic Projects",
        groupIntro:
          "These academic project bullet points highlight discovery, prioritization, and communication—core phrases recruiters and ATS tools associate with product roles.",
        name: "Case competition (product strategy)",
        bullets: [
          "Placed top 10% in a national product case competition; recommended pricing and packaging changes with a simple sensitivity model and cited customer research themes.",
          "Built a one-page PRD for a mock mobile app; listed success metrics, risks, and a phased rollout plan aligned to a 6-week capstone timeline.",
          "Presented trade-offs between growth vs retention initiatives to a panel; defended assumptions with a lightweight cohort sketch using public data.",
          "Synthesized competitor teardown notes into three differentiation angles; tied each angle to a measurable KPI the judges could audit.",
        ],
      },
      {
        name: "Product management course (group)",
        bullets: [
          "Facilitated weekly standups for a five-person class team; reduced scope churn by logging decisions in a shared doc referenced in the final demo.",
          "Drafted user stories from professor-provided personas; prioritized a backlog using impact vs effort with explicit assumptions documented.",
          "Ran five guerrilla interviews on campus; translated quotes into two usability fixes shipped before the final presentation.",
          "Measured task completion time before/after UI tweaks; reported a 12% improvement on the graded rubric’s usability criterion.",
        ],
      },
      {
        groupHeading: "Internship Projects",
        groupIntro:
          "These internship bullet points emphasize interviews, metrics, roadmaps, and stakeholder coordination—keywords common on APM and associate PM postings.",
        name: "Discovery sprint (APM / internship)",
        bullets: [
          "Ran 14 user interviews and synthesized themes into a prioritized backlog; two shipped tweaks lifted trial-to-paid conversion by 2.3% in 6 weeks.",
          "Built a lightweight funnel dashboard in the BI tool; replaced a weekly manual Excel pull that took ~3 hours of PM + analyst time.",
          "Tagged interview quotes with themes in a research repository; shortened weekly synthesis time for the lead PM by ~45 minutes.",
          "Partnered with design on a prototype test plan; summarized pass/fail criteria before building to avoid wasted engineering time.",
        ],
      },
      {
        name: "Feature launch support",
        bullets: [
          "Wrote clear acceptance criteria and edge cases for a billing export; reduced UAT defects from 22 to 6 vs the prior release of similar scope.",
          "Partnered with QA on a regression checklist for currency edge cases; prevented two launch-day bugs found in staging.",
          "Drafted customer-facing release notes with support; aligned language with the actual shipped behavior to reduce ticket volume.",
          "Tracked launch KPIs for two weeks post-release; escalated one metric regression that triggered a fast-follow patch.",
        ],
      },
      {
        groupHeading: "Personal & Campus Projects",
        groupIntro:
          "These campus and side-project bullet points show ownership without a job title—useful for students and no-experience candidates building PM credibility.",
        name: "Campus club + metrics cadence",
        bullets: [
          "Facilitated weekly syncs between design and two engineering pods; cut scope churn mid-sprint by documenting decisions in a single decision log.",
          "Prepared a one-page launch recap with metrics vs hypothesis; shared with GTM so messaging matched the shipped behavior.",
          "Tracked activation and retention in a shared spreadsheet; flagged a 9% week-over-week drop that led to a prioritized bugfix before paid campaigns restarted.",
          "Organized a campus product talk series; grew attendance 20% quarter over quarter with lightweight email experiments.",
        ],
      },
    ],
  };
}

function pmJunior(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "Junior Product Manager Resume Bullet Points (Mid-Level PM – Examples) | ResumeAtlas",
    metaDescription:
      "Junior / mid-level PM resume bullets: roadmaps, OKRs, pricing, experiments, and cross-functional delivery—plus free ATS scan and job description match.",
    keywords: [
      "junior product manager resume bullet points",
      "mid level product manager resume examples",
      "associate PM resume bullets",
      "PM resume bullets 2 years experience",
      "ATS product manager keywords",
      "product manager OKR resume examples",
    ],
    h1: "Product Manager Resume Bullet Points (Junior)",
    intentStack:
      "Mid-level PM roles expect outcomes, trade-offs, and cross-functional delivery—not feature lists. These resume bullet points reflect that scope; tailor every line to your domain and the posting.",
    exactMatchQueryLine:
      "If you are searching for junior product manager resume bullet points, these examples cover roadmaps, pricing, platform partnerships, and experiment cadence typical of a mid-level PM.",
    copyIntentLine:
      "Copy and adapt these lines (replace metrics, products, and stakeholders with your own results).",
    examplesAboveFoldH2: "Examples of Junior Product Manager Resume Bullet Points",
    earlyAtsWarning: {
      body: "These are templates. Your resume still needs the domain, metrics, and keywords from each specific job description.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Junior Product Manager Resume Bullet Points?",
      line1:
        "Good junior (mid-level) PM resume bullet points connect decisions to metrics: retention, revenue, conversion, or operational risk—with clear cross-functional work.",
      line2:
        "They should also align with ATS language: roadmaps, OKRs, discovery, experiments, and stakeholder groups named in the posting.",
    },
    howToWriteSnippet: {
      h2: "How to Write Junior Product Manager Resume Bullet Points",
      line1:
        "Start with the customer or business problem, the option you pushed, and the measurable result—or the learning if the bet failed.",
      line2:
        "Avoid buzzword roadmaps: name the bet, the constraint, and who you aligned (eng, design, GTM, legal) when that is true.",
    },
    aboveFoldBullets: [
      "Owned a roadmap theme tied to net revenue retention; reordered two quarters of work after cohort analysis showed churn concentrated in SMB accounts.",
      "Ran price sensitivity research (conjoint + competitive teardown); recommended a tier change that improved ARPU by 6% without hurting top-of-funnel conversion.",
      "Partnered with platform PM + infra on SLA for API uptime; aligned customer comms and GTM on a 99.95% target with transparent status page updates.",
      "Instituted a weekly experiment review with design and data; increased experiment throughput from ~2/month to ~5/month while holding false-positive rate flat.",
    ],
    authorityLine:
      "Used by associate and mid-level PMs across B2B SaaS, marketplaces, and growth teams.",
    projectsSectionTitle: "Junior Product Manager Resume Bullet Points (Experience & Projects)",
    projectsSectionSubcopy:
      "Four project blocks—roadmap, pricing, platform, and growth systems. Replace metrics with yours; mid-level PM screens reward specificity.",
    realismLine:
      "These examples reflect common mid-level PM themes—swap in your real products, users, and numbers.",
    projectSemanticReinforcement:
      "These junior product manager resume bullet points reinforce roadmaps, metrics, discovery, and cross-functional delivery—mirror the verbs and domains each employer uses.",
    endOfPageRecap:
      "Whether you are an associate PM moving up or a mid-level PM changing companies, junior product manager resume bullet points should prove outcomes—then align your resume to each posting before you apply.",
    juniorFaqExtra: {
      question: "Is “junior PM” the same as associate or mid-level PM on a resume?",
      answer:
        "Often, yes—employers use different labels. Match the job title language in the postings you want (Associate PM, PM II, Growth PM) and keep bullets aligned to that level of ownership.",
    },
    commonMistakes: {
      title: "Common Mistakes in Junior Product Manager Resume Bullet Points",
      points: [
        "Feature shipping lists with no metric or business outcome.",
        "Vague prioritization: “managed backlog” without trade-offs or results.",
        "Wrong domain signals: B2B role but only consumer examples—or the reverse.",
        "Inflated scope: “owned roadmap” for a narrow slice you supported.",
      ],
    },
    intro:
      "Mid-level PM bullets emphasize ownership of outcomes, prioritization frameworks, and measurable launches—not just shipping features.",
    doubtLine:
      "If your resume does not echo the posting’s domain (e.g. marketplace, SaaS metrics, compliance), you may look unqualified before a human reads deeply.",
    projects: [
      {
        name: "Roadmap & OKRs",
        bullets: [
          "Owned a roadmap theme tied to net revenue retention; reordered two quarters of work after cohort analysis showed churn concentrated in SMB accounts.",
          "Negotiated scope with engineering to ship a retention bundle; hit OKR with +$1.2M ARR annualized impact within two release cycles.",
        ],
      },
      {
        name: "Pricing & packaging",
        bullets: [
          "Ran price sensitivity research (conjoint + competitive teardown); recommended a tier change that improved ARPU by 6% without hurting top-of-funnel conversion.",
        ],
      },
      {
        name: "Platform partnership",
        bullets: [
          "Partnered with platform PM + infra on SLA for API uptime; aligned customer comms and GTM on a 99.95% target with transparent status page updates.",
        ],
      },
      {
        name: "Growth experiment system",
        bullets: [
          "Instituted a weekly experiment review with design and data; increased experiment throughput from ~2/month to ~5/month while holding false-positive rate flat.",
        ],
      },
    ],
  };
}

function pmSenior(): ResumeBulletDetailCopy {
  return {
    metaTitle:
      "Senior Product Manager Resume Bullet Points (Staff / Leadership Examples) | ResumeAtlas",
    metaDescription:
      "Senior PM resume bullets: portfolio strategy, enterprise GTM, compliance launches, and exec-ready metrics—plus free ATS keyword scan and job description match.",
    keywords: [
      "senior product manager resume bullet points",
      "group product manager resume examples",
      "principal product manager resume bullets",
      "PM leadership resume bullets",
      "ATS product manager keywords senior",
      "product strategy resume examples",
      "leadership resume bullet points",
    ],
    h1: "Senior Product Manager Resume Bullet Points",
    intentStack:
      "Hiring for senior, group, or principal PM roles? These resume bullet points highlight portfolio bets, cross-org alignment, revenue and risk trade-offs, and executive communication—edit to match your true scope.",
    exactMatchQueryLine:
      "If you are searching for senior product manager resume bullet points, these examples cover strategy, multi-team roadmaps, regulated launches, and leadership lines for summary or experience.",
    copyIntentLine:
      "Copy and adapt these lines (replace metrics, products, and stakeholders with your own facts).",
    examplesAboveFoldH2: "Examples of Senior Product Manager Resume Bullet Points",
    earlyAtsWarning: {
      body: "These examples are templates. Your resume still needs the domain, metrics, and leadership verbs from each job description.",
      ctaLabel: "Check missing keywords in my resume",
      href: "/resume-keyword-scanner#ats-checker-form",
    },
    snippetDefinition: {
      h2: "What Are Good Senior Product Manager Resume Bullet Points?",
      line1:
        "Good senior PM resume bullet points show portfolio decisions, measurable outcomes (revenue, retention, risk), and cross-functional leadership—not a list of features shipped.",
      line2:
        "They should also align with ATS and exec screens: roadmaps, OKRs, discovery, enterprise, compliance, and stakeholder management—where the posting actually uses those terms.",
    },
    howToWriteSnippet: {
      h2: "How to Write Senior Product Manager Resume Bullet Points",
      line1:
        "Frame the problem and decision first, then the outcome: what you stopped, prioritized, or negotiated—and what metrics moved.",
      line2:
        "Mirror senior PM language from each posting (group, principal, platform, regulated markets) without claiming scope you did not own.",
    },
    aboveFoldBullets: [
      "Led a three-horizon portfolio plan (core, adjacent, new bets); secured headcount by tying each bet to revenue guardrails and risk caps approved by the CFO office.",
      "Aligned roadmap across product, design, and five engineering teams for a unified customer account model; reduced duplicate work estimated at ~18 engineer-months.",
      "Partnered with sales and solutions on six enterprise deals; customized roadmap commitments that balanced short-term revenue with platform debt reduction.",
      "Delivered a regulated-market launch on schedule; coordinated legal, security, and support with zero major post-launch incidents in first 60 days.",
    ],
    authorityLine:
      "Used by senior and group PMs targeting strategy-heavy roles and enterprise customers.",
    projectsSectionTitle: "Senior Product Manager Resume Bullet Points (Experience & Projects)",
    projectsSectionSubcopy:
      "Five project blocks—portfolio, alignment, GTM, compliance, and org design. Leadership bullets below add exec- and board-level scope; keep every claim interview-safe.",
    realismLine:
      "These examples are based on common senior PM themes—swap in your real products, customers, and metrics.",
    projectSemanticReinforcement:
      "These senior product manager resume bullet points reinforce skills like roadmaps, metrics, discovery, and stakeholder leadership—echo the exact phrases your target posting uses.",
    endOfPageRecap:
      "Whether you are a senior PM, group PM, or principal PM candidate, senior product manager resume bullet points should prove judgment and outcomes—then align your resume to each posting before you apply.",
    seniorFaqExtra: {
      question: "Should senior PM resume bullets mention revenue and P&L?",
      answer:
        "When you can credibly tie your work to revenue, margin, cost, or risk—yes. Exec readers and many ATS filters look for business outcomes, not only feature delivery. Use numbers you can explain in a panel interview.",
    },
    commonMistakes: {
      title: "Common Mistakes in Senior Product Manager Resume Bullet Points",
      points: [
        "Feature laundry lists: shipped X and Y with no outcome, trade-off, or metric.",
        "Vague leadership: “influenced stakeholders” without a decision or result.",
        "Missing domain language: the posting says B2B SaaS, enterprise, or regulated—your resume stays generic.",
        "Scope inflation: “owned roadmap” for work you only supported.",
      ],
    },
    intro:
      "Senior PM and Group PM resumes should show portfolio choices, multi-team alignment, and business outcomes across quarters—not only shipping velocity.",
    doubtLine:
      "Executive readers and ATS both expect domain language from the job description. Tailor before you submit.",
    leadershipQueryBridge:
      "If you are looking for senior or staff-level resume bullet points, focus on leadership, ownership, and business impact.",
    leadershipSectionTitle: "Leadership Resume Bullet Points for Senior Product Managers",
    leadershipSectionSubcopy:
      "These leadership resume bullet points are designed for senior, staff, lead, and principal product managers working on cross-team impact and large-scale product bets.",
    leadershipSnippet: {
      h3: "What Are Leadership Resume Bullet Points?",
      line1:
        "Leadership resume bullet points highlight ownership, cross-team impact, hiring, and strategic decision-making across large systems or products.",
      line2:
        "For product management, they often mean portfolio trade-offs, revenue or risk outcomes, enterprise commitments, and exec-ready narratives—not a backlog of features.",
    },
    projects: [
      {
        name: "Portfolio strategy",
        bullets: [
          "Led a three-horizon portfolio plan (core, adjacent, new bets); secured headcount by tying each bet to revenue guardrails and risk caps approved by the CFO office.",
          "Sunset a low-ROI product line serving <4% of revenue; redirected two squads to a platform initiative with clearer TAM.",
        ],
      },
      {
        name: "Multi-team alignment",
        bullets: [
          "Aligned roadmap across product, design, and five engineering teams for a unified customer account model; reduced duplicate work estimated at ~18 engineer-months.",
        ],
      },
      {
        name: "Enterprise GTM",
        bullets: [
          "Partnered with sales and solutions on six enterprise deals; customized roadmap commitments that balanced short-term revenue with platform debt reduction.",
        ],
      },
      {
        name: "Compliance-heavy launch",
        bullets: [
          "Delivered a regulated-market launch on schedule; coordinated legal, security, and support with zero major post-launch incidents in first 60 days.",
        ],
      },
      {
        name: "Org design",
        bullets: [
          "Proposed PM craft expectations and leveling rubric adopted by the CPO org; used in calibration for two promotion cycles.",
        ],
      },
    ],
    leadershipBullets: [
      "Led a cross-functional initiative with sales and finance impacting $15M+ in ARR; negotiated roadmap commitments across three product lines to protect margin while meeting enterprise SLAs.",
      "Presented quarterly business review to C-suite on portfolio health; reframed roadmap cuts as explicit trade-offs vs burn rate and competitive risk.",
      "Owned P&L narrative for a $40M ARR product line; partnered with finance on pricing strategy that improved gross margin by 3 points YoY.",
      "Mediated conflict between marketing and engineering on launch dates; brokered phased rollout that preserved revenue target and reduced outage risk.",
      "Sponsored cross-functional OKR process for 12 PMs; reduced orphaned goals by tying every KR to a measurable customer or revenue outcome.",
      "Led vendor selection for customer research platform; consolidated two tools, saving $95k and improving insight turnaround by one week.",
      "Represented product in board prep for two fundraising rounds; produced defensible cohort and expansion metrics used in investor Q&A.",
      "Drove international expansion playbook (ICP, localization scope, support readiness); first EU market hit adoption target in 90 days.",
      "Established executive steering for AI-assisted features; defined guardrails with legal and set public-facing transparency commitments.",
      "Scaled hiring for PM org (+8 headcount); introduced case interviews aligned to discovery rigor and stakeholder management.",
      "Championed customer advisory board; converted feedback into a prioritized theme that shipped within two quarters and lifted NPS +9 for enterprise accounts.",
    ],
  };
}

const DETAIL: Record<
  ResumeBulletRole,
  Record<ResumeBulletLevel, () => ResumeBulletDetailCopy>
> = {
  "data-scientist": {
    "entry-level": dsEntry,
    junior: dsJunior,
    senior: dsSenior,
  },
  "software-engineer": {
    "entry-level": seEntry,
    junior: seJunior,
    senior: seSenior,
  },
  "product-manager": {
    "entry-level": pmEntry,
    junior: pmJunior,
    senior: pmSenior,
  },
};

export function isResumeBulletRole(role: string): role is ResumeBulletRole {
  return (RESUME_BULLET_ROLES as readonly string[]).includes(role);
}

export function getResumeBulletHub(role: ResumeBulletRole): ResumeBulletHubCopy {
  return HUB[role];
}

/** Flat list for ItemList schema and copy-to-clipboard. */
export function flattenHubPreviewBullets(hub: ResumeBulletHubCopy): string[] {
  return hub.previewSection.groups.flatMap((g) => g.bullets);
}

export function getHubPreviewPlainText(hub: ResumeBulletHubCopy): string {
  return hub.previewSection.groups
    .map((g) => `${g.label}\n${g.bullets.map((b) => `• ${b}`).join("\n")}`)
    .join("\n\n");
}

export function getResumeBulletDetail(
  role: ResumeBulletRole,
  level: ResumeBulletLevel
): ResumeBulletDetailCopy {
  return DETAIL[role][level]();
}

/**
 * Split project blocks so the first `maxVisible` bullets can render above a “show more” fold.
 * Preserves `groupHeading`/`groupIntro` on the first fragment; continued fragments omit them.
 */
export function splitProjectsAtBulletCount(
  projects: ProjectBlock[],
  maxVisible: number
): { visible: ProjectBlock[]; rest: ProjectBlock[] } {
  if (maxVisible <= 0) {
    return { visible: [], rest: [...projects] };
  }
  const visible: ProjectBlock[] = [];
  const rest: ProjectBlock[] = [];
  let used = 0;
  for (const p of projects) {
    if (used >= maxVisible) {
      rest.push(p);
      continue;
    }
    const room = maxVisible - used;
    if (p.bullets.length <= room) {
      visible.push(p);
      used += p.bullets.length;
    } else {
      const headBullets = p.bullets.slice(0, room);
      const tailBullets = p.bullets.slice(room);
      visible.push({
        ...p,
        bullets: headBullets,
      });
      rest.push({
        ...p,
        groupHeading: undefined,
        groupIntro: undefined,
        name: tailBullets.length > 0 ? `${p.name} (continued)` : p.name,
        bullets: tailBullets,
      });
      used = maxVisible;
    }
  }
  return { visible, rest };
}

export function publicPathForBulletHub(role: ResumeBulletRole): string {
  return `/${role}-resume-bullet-points`;
}

export function publicPathForBulletDetail(
  role: ResumeBulletRole,
  level: ResumeBulletLevel
): string {
  const suffix =
    level === "entry-level"
      ? "-entry-level"
      : level === "junior"
        ? "-junior"
        : "-senior";
  return `/${role}-resume-bullet-points${suffix}`;
}

export const RESUME_BULLET_LEVELS: ResumeBulletLevel[] = [
  "entry-level",
  "junior",
  "senior",
];

export function levelLabel(level: ResumeBulletLevel): string {
  switch (level) {
    case "entry-level":
      return "Entry-level";
    case "junior":
      return "Junior";
    case "senior":
      return "Senior";
  }
}
