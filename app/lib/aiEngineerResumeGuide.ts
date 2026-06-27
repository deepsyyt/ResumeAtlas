import { CONTENT_FRESHNESS_YEAR } from "@/app/lib/contentFreshness";
import { RESUME_ATLAS_TITLE_SUFFIX } from "@/app/lib/searchIntentSeo";

export const AI_ENGINEER_RESUME_GUIDE_PATH = "/ai-engineer-resume-guide" as const;

export const AI_ENGINEER_RESUME_GUIDE = {
  path: AI_ENGINEER_RESUME_GUIDE_PATH,
  roleName: "AI Engineer",
  title: `AI Engineer Resume Guide (${CONTENT_FRESHNESS_YEAR}): Skills, Keywords & ATS Tips${RESUME_ATLAS_TITLE_SUFFIX}`,
  description:
    "AI engineer resume guide: summary, skills, LLM integration bullets, RAG projects, evals, and ATS-safe structure. Links to keyword list and free JD matcher.",
  h1: `AI Engineer Resume Guide (${CONTENT_FRESHNESS_YEAR})`,
  intro:
    "This guide covers how to structure an AI engineer resume for ATS and hiring managers — LLM integration, RAG pipelines, evals, guardrails, and production AI systems. For keyword lists grouped by category, seniority, and placement strategy, use the AI engineer keywords page.",
  examplePath: AI_ENGINEER_RESUME_GUIDE_PATH,
  keywordsPath: "/ai-engineer-resume-keywords",
  sections: [
    {
      id: "summary",
      title: "Professional summary",
      body: "Lead with years of experience, primary AI domain (RAG, agents, fine-tuning), anchor stack, and one outcome metric (latency, cost reduction, accuracy delta, CSAT). Avoid generic 'passionate about AI' — name the LLM platform and system type the posting requires.",
      bullets: [
        "AI engineer with 4+ years building production LLM systems on OpenAI and Anthropic APIs — RAG pipelines, agentic workflows, and eval frameworks focused on retrieval accuracy and latency SLAs.",
        "Reduced inference cost 31% through token budget optimization and model routing while sustaining p95 latency under 900ms for customer-facing generative AI features.",
      ],
    },
    {
      id: "skills",
      title: "Skills section",
      body: "Group by LLM APIs, Orchestration, Vector DBs, Evals, and Cloud. Every tool in Skills should appear in at least one Experience bullet — ATS and recruiters both weight proof over lists. Limit to 15–25 terms you can explain in a technical screen.",
      bullets: [
        "Python · LangChain · LlamaIndex · OpenAI API · Anthropic API · RAG · Pinecone · pgvector · FastAPI · Evals · Langfuse · Docker · Kubernetes · AWS · Git",
      ],
    },
    {
      id: "experience",
      title: "Experience bullets",
      body: "Use action + system built + stack + outcome. Hiring managers want retrieval accuracy, latency, cost, and cross-team ownership — not task lists. Pair RAG with a faithfulness or recall metric, agents with task completion, and fine-tuning with an accuracy delta.",
      bullets: [
        "Built a RAG pipeline with LangChain and Pinecone over a 50K-document corpus, reducing hallucination rate by 38% (measured via RAGAS faithfulness) and average response latency to under 800ms.",
        "Deployed an LLM-powered support agent on AWS Bedrock with policy guardrails, handling 1,200+ daily queries at 4.4/5 CSAT.",
        "Instrumented AI observability with Langfuse on three production LLM pipelines, surfacing token budget overruns that cut monthly inference cost by $18K.",
      ],
    },
    {
      id: "evals",
      title: "Evals and guardrails (required in 2026)",
      body: "AI engineer JDs in 2026 universally expect evaluation and safety work. Document evals you designed or ran, metrics you defined (faithfulness, context recall, latency SLA), and any guardrail or red-teaming work. Omitting evals is the most common screening miss on AI engineer resumes.",
      bullets: [
        "Partnered with ML science on eval design for a recommendation LLM — defining retrieval accuracy, faithfulness, and latency SLAs that became the team standard.",
        "Led red-teaming sessions and jailbreak testing before public launch, documenting 12 attack vectors and shipping mitigations within sprint.",
      ],
    },
    {
      id: "projects",
      title: "Projects (portfolio and career switchers)",
      body: "If you lack full-time AI engineer titles, build and document a complete project: a RAG pipeline with chunking, embedding, retrieval, and evals; an agent with tool use; or a fine-tuned model with benchmark metrics. Publish to GitHub with architecture decisions and eval results cited in your resume bullets.",
      bullets: [
        "End-to-end RAG capstone: PDF ingestion → chunking → OpenAI embeddings → Pinecone retrieval → LangChain chain → RAGAS eval suite, with documented faithfulness (0.84) and context recall (0.91).",
      ],
    },
    {
      id: "ats-format",
      title: "ATS-safe format",
      body: "Single column, standard headings (Summary, Skills, Experience, Projects, Education). No tables, icons, or text boxes. Save as .docx or plain PDF. AI engineer resumes often contain special characters from tool names — keep them in plain text, not styled callouts.",
      bullets: [],
    },
  ],
  faq: [
    {
      question: "What is the difference between AI engineer and machine learning engineer on a resume?",
      answer:
        "ML engineer resumes emphasize model training, GPU infrastructure, MLOps, and data pipelines. AI engineer resumes emphasize building on top of foundation models: LLM APIs, RAG, prompt engineering, agents, and evals. Mirror the posting's title and first-screen keywords.",
    },
    {
      question: "Should I list specific AI models (GPT-4, Claude) on my resume?",
      answer:
        "Only when you have production experience with them and they match the posting. Focus on the system you built and the reliability outcome — not the model version.",
    },
    {
      question: "How do I tailor an AI engineer resume to a specific job description?",
      answer:
        "Mirror the posting's stack (AWS Bedrock vs Anthropic API vs Azure OpenAI), LLM framework, and eval expectations. Paste your resume and the JD into ResumeAtlas to see gap terms and weak bullets before you apply.",
    },
    {
      question: "Are evals required on an AI engineer resume?",
      answer:
        "Yes — in 2026, production AI roles universally expect evaluation work. Document any eval framework you designed or ran, metrics defined, or guardrail/red-teaming work. Omitting evals is the most common screening miss.",
    },
    {
      question: "How do I show AI engineering without production experience?",
      answer:
        "Build a complete end-to-end project (RAG pipeline, agent with tool use, or fine-tuned model) with documented architecture, eval results, and a GitHub README. Cite retrieval or accuracy metrics in resume bullets.",
    },
  ],
} as const;
