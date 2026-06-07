import { buildRoleOptimizerPath, type RoleOptimizerContent } from "@/app/lib/roleOptimizerContent";

const slug = "backend-engineer";

export const backendEngineerOptimizer: RoleOptimizerContent = {
  slug,
  path: buildRoleOptimizerPath(slug),
  roleName: "Backend Engineer",
  title: "Backend Engineer Resume Optimizer for Job Description | ResumeAtlas",
  description:
    "Optimize your backend engineer resume for a target job description with ATS keyword alignment, architecture-specific positioning, and impact-focused bullet rewrites.",
  h1: "Optimize Your Backend Engineer Resume for a Job Description",
  targetKeywords: [
    "backend engineer resume optimizer",
    "optimize backend engineer resume for job description",
    "backend developer resume keywords",
    "API backend resume optimization",
    "distributed systems resume tailoring",
    "backend resume ATS optimization",
    "database performance resume bullets",
    "microservices resume examples",
    "backend scalability resume optimization",
    "resume optimization for backend jobs",
  ],
  jdDemonstration: {
    sectionTitle: "Backend engineer resume match example",
    intro:
      "Below is a realistic walkthrough: a sample job description, what a baseline resume misses, the match score ResumeAtlas would show, and how one bullet improves after optimization.",
    sampleJdLabel: "Sample job description requirements",
    sampleJdRequirements: [
      "API design",
      "Microservices architecture",
      "PostgreSQL performance tuning",
      "Caching strategy",
      "System design",
      "Service reliability",
    ],
    matchScore: 69,
    missingKeywords: ["Caching", "System Design", "Microservices"],
    beforeBullet: "Developed backend services and improved application performance.",
    afterBullet:
      "Designed and shipped Node.js microservices with PostgreSQL query tuning and Redis caching, reducing p95 API latency from 430ms to 145ms and increasing checkout throughput by 29% while improving service error budget compliance.",
    outro:
      "Paste your resume and target posting into the free compare and optimize tool to run match score, gap analysis, and AI rewrites on your posting",
  },
  keywordSection: {
    h2: "ATS keywords for backend engineer resumes",
    intro:
      "These terms appear frequently in backend developer and backend engineer job descriptions. Include them where your experience demonstrates architectural ownership and measurable impact.",
    checklist: [
      "API Development",
      "Microservices",
      "PostgreSQL",
      "Caching",
      "System Design",
      "Distributed Systems",
      "Query Optimization",
      "Service Reliability",
      "Asynchronous Processing",
      "Backend Scalability",
    ],
    body:
      "ResumeAtlas compares this checklist to the specific posting you paste and highlights where your resume lacks direct evidence. Use that gap report to strengthen your most relevant backend bullets and improve both ATS relevance and technical credibility.",
  },
  introParagraphs: [
    "Backend engineer resumes are often crowded with frameworks, languages, and infrastructure terms, yet still fail to communicate why the candidate is effective. Hiring teams are not searching for people who can simply write endpoints. They need engineers who can design reliable services, maintain data correctness, scale systems under load, and collaborate across product and platform constraints. The target job description usually reveals which backend challenges matter most, such as API design standards, distributed systems reliability, event-driven architecture, data modeling discipline, security hardening, or performance optimization. A resume optimized for that posting should surface matching achievements early and in clear language. ResumeAtlas helps you align technical evidence with the role's core requirements so your application reads like a direct response to the hiring need.",
    "One major weakness in backend resumes is output without impact context. Candidates describe implemented services, built APIs, or migrated databases without showing what improved for users, developers, or the business. Backend work can look invisible unless you quantify latency reduction, throughput gains, error-rate decreases, cost improvements, or engineering productivity increases. Another common issue is architecture claims with little operational proof. Saying designed scalable microservices is weak unless you explain transaction integrity, failure handling, observability strategy, or traffic profile. ResumeAtlas identifies these credibility gaps and suggests rewrites that anchor technical choices to measurable outcomes. This makes your resume stronger for both recruiter screens and deep technical interviews.",
    "ATS alignment matters because backend titles and vocabulary vary across companies. One posting may ask for backend engineer, another for platform engineer, and another for software engineer, server side, while requiring similar capabilities. Keyword mismatch can reduce visibility even when experience is relevant. ResumeAtlas extracts high-intent terms from each job description and maps them to your actual work history, helping you incorporate terminology such as API gateway, asynchronous processing, caching strategy, transaction boundaries, query optimization, and service observability where appropriate. The goal is not to maximize keyword volume, but to place the right terms where they are supported by strong evidence.",
    "Tailoring is especially important when backend roles differ in system maturity and business context. A startup role may prioritize shipping speed and broad ownership across the stack. A mature platform role may prioritize consistency, reliability, and long-term maintainability under high traffic. ResumeAtlas supports role-specific optimization by showing which achievements to prioritize for each posting and how to rewrite bullets to match expected seniority and operating conditions. This targeted approach improves interview conversion because reviewers can quickly see that your experience fits their actual environment rather than a generic concept of backend development.",
  ],
  commonMistakes: [
    "Listing backend technologies without showing measurable service reliability or performance improvements.",
    "Using generic architecture claims that omit scale, failure handling, and data integrity context.",
    "Describing API development tasks without product or business outcome linkage.",
    "Ignoring database and query optimization achievements that are central to many backend roles.",
    "Overstating distributed systems ownership when responsibilities were partial or collaborative.",
    "Failing to tailor resume language for posting-specific backend requirements and terminology.",
    "Including too many low-impact bullets that bury the highest-value backend outcomes.",
  ],
  topSkills: [
    "API design and implementation",
    "Database schema and query optimization",
    "Distributed systems fundamentals",
    "Microservices and service decomposition",
    "Caching and performance tuning",
    "Asynchronous processing",
    "Observability and debugging",
    "Security and authentication",
    "Testing and reliability engineering",
    "Cloud deployment",
    "Cross-team technical collaboration",
  ],
  skillsNarrative:
    "Backend engineer skills are persuasive when they show how you make systems dependable, performant, and maintainable over time. API design should include versioning strategy, backward compatibility, and contract clarity. Database optimization should be linked to response time improvements, query stability, and data correctness. Distributed systems expertise is stronger when you discuss failure scenarios, idempotency, retries, and consistency tradeoffs rather than abstract scalability claims. Microservices skills should show rational decomposition choices and operational consequences, not architecture fashion. Caching and asynchronous processing matter when tied to throughput, latency, or queue stability outcomes. Observability and debugging are critical because backend reliability depends on rapid detection and diagnosis of production issues. Security competence should include authentication flows, authorization boundaries, and risk mitigation in data handling. Testing and reliability practices demonstrate long-term engineering discipline and lower incident probability. Together, these skills communicate that you can build backend systems that support product growth without constant operational fragility.",
  beforeExample: {
    before: "Built backend APIs and improved system performance for core product features.",
    after:
      "Redesigned order-processing APIs and data access layer in Node.js and PostgreSQL, reducing p95 response time from 480ms to 170ms, increasing successful checkout throughput 32%, and lowering Sev2 production incidents 41% through contract tests, idempotent retry handling, and targeted query index tuning.",
  },
  beforeAfterContext:
    "The optimized bullet shows architecture work tied to performance, reliability, and business throughput. It also demonstrates engineering rigor through testing and failure handling details, which improves credibility for backend interview loops.",
  howAtlasOptimizes: [
    {
      heading: "Detects backend-specific requirement signals in postings",
      body:
        "ResumeAtlas identifies whether the target role emphasizes APIs, distributed systems, data modeling, reliability, or platform integration. It then prioritizes your related achievements so the resume aligns with what hiring teams are most likely to screen for in that specific opening.",
    },
    {
      heading: "Strengthens impact clarity in technical bullets",
      body:
        "Backend achievements can sound abstract without measurable outcomes. ResumeAtlas suggests edits that combine technical action, system context, and results in one concise structure. This helps recruiters and engineering managers understand contribution quality quickly.",
    },
    {
      heading: "Aligns ATS keywords with proven experience",
      body:
        "The optimizer highlights missing high-intent terms from the posting and recommends where to place them naturally in your resume. It avoids keyword stuffing by linking terms to evidence, improving both ATS discoverability and reviewer trust.",
    },
    {
      heading: "Improves seniority signaling through ownership framing",
      body:
        "ResumeAtlas helps distinguish between task execution and system ownership. It can reframe bullets to clarify design decisions, tradeoff management, cross-team collaboration, and operational accountability when those elements are already present in your experience.",
    },
    {
      heading: "Supports rapid adaptation across backend role variants",
      body:
        "Backend roles vary across product teams, platform groups, and infrastructure-heavy organizations. ResumeAtlas enables targeted resume versions for each posting by adjusting emphasis and language while preserving factual consistency, which improves application quality at scale.",
    },
  ],
  faq: [
    {
      question: "What makes a backend engineer resume stand out to hiring managers?",
      answer:
        "Specificity and impact. Hiring managers want to see what systems you built or improved, under what constraints, and with what measurable outcomes. Include metrics tied to latency, reliability, throughput, cost, or development efficiency. Clear ownership framing and credible technical detail usually matter more than long tool inventories.",
    },
    {
      question: "Should backend resumes include architecture diagrams or links?",
      answer:
        "Not usually in the resume itself. Keep bullets concise and outcome-focused. If you have strong architecture artifacts, reference them in a portfolio or project link. The resume should provide enough technical signal to secure interviews where deeper architecture discussion can happen.",
    },
    {
      question: "How many backend technologies should I list in skills?",
      answer:
        "List technologies relevant to the target role and supported by evidence in your experience section. A focused list is easier to scan and more credible. Prioritize languages, databases, and infrastructure tools that are central to your strongest achievements.",
    },
    {
      question: "How can I show reliability ownership if I was not the on-call lead?",
      answer:
        "Highlight the reliability work you directly influenced, such as improving alert quality, adding retries and idempotency, strengthening test coverage, or reducing specific incident classes. You do not need formal on-call ownership to show reliable systems thinking and measurable operational improvements.",
    },
    {
      question: "Is ATS optimization still important for experienced backend engineers?",
      answer:
        "Yes. Experienced candidates are still filtered through ATS and recruiter search workflows before technical review. Aligning terminology with the target posting improves visibility. The key is to integrate keywords into evidence-based bullets so human reviewers see both relevance and credibility.",
    },
    {
      question: "How does ResumeAtlas tailor backend resumes per job description?",
      answer:
        "ResumeAtlas compares your current resume against a specific posting, highlights missing requirements, and suggests rewrites that improve role fit, ATS match, and technical clarity. You can generate targeted versions quickly for different backend contexts without diluting factual accuracy.",
    },
  ],
  relatedExamplePath: "/backend-developer-resume-guide",
  relatedKeywordsPath: "/backend-developer-resume-keywords",
};
