/** Shared commercial FAQ for homepage workbench (HTML + JSON-LD). */

export const JD_MATCH_WORKBENCH_FAQ = [
  {
    question: "What is evidence match on ResumeAtlas?",
    answer:
      "Evidence match estimates how much of a specific job description you prove in experience and project bullets, not just skills lists. The intelligence dashboard also shows what-we-measured signals, a skill-by-skill proof map, reference ATS metrics, and honest gap callouts. It is directional guidance to prioritize edits, not a hiring guarantee.",
  },
  {
    question: "How do I compare my resume to a job description?",
    answer:
      "Paste your resume and the exact job posting into the tool above. You get an evidence match score, skill proof map, gap analysis, what-we-measured signals, and evidence-first optimization suggestions focused on that job description.",
  },
  {
    question: "What is the skill-by-skill proof map?",
    answer:
      "For each JD skill, the proof map shows whether it is proven in a project bullet, mentioned in experience text, listed only in Skills, or missing honestly. That helps you see where keyword coverage looks fine but real proof is thin.",
  },
  {
    question: "Is this resume vs job description checker free?",
    answer:
      "Yes. Evidence match, skill proof map, gap analysis, and evidence-first optimization suggestions are free with instant results and no signup. Analyze and edit in the tool before any export step.",
  },
  {
    question: "How is this different from an ATS resume checker?",
    answer:
      "An ATS resume checker focuses on parsing and formatting risk. This page adds posting-specific proof: evidence match, skill-by-skill proof, architecture and deployment signals, and evidence-first optimization for the job description you paste. ATS keyword score is a reference metric only.",
  },
  {
    question: "How does evidence-first optimization work?",
    answer:
      "After the intelligence dashboard, ResumeAtlas rewrites your summary and project bullets for the same posting: supported JD skills move into the bullets where you used them, with stronger architecture, deployment, and impact language from work you already did. Unsupported requirements stay visible as gaps. You review every change before export.",
  },
  {
    question: "How can I improve my evidence match score?",
    answer:
      "Move supported JD skills from lists into project bullets, strengthen weak bullets with architecture, deployment, and measurable outcomes from your existing work, then run evidence-first optimization. Leave unsupported requirements honest on the skill proof map instead of inventing keywords.",
  },
  {
    question: "What is resume gap analysis?",
    answer:
      "Gap analysis compares your resume to one job description and surfaces what is missing or only listed: required skills without bullet proof, thin impact signals, and unsupported posting requirements. The skill proof map makes those gaps concrete before you optimize.",
  },
  {
    question: "How do I compare my resume to a job posting?",
    answer:
      "Copy the full job posting text, not a summary, and paste it with your resume into the tool above. ResumeAtlas analyzes the posting, compares your bullets and skills against required and preferred terms, and returns evidence match, a skill proof map, and optimization priorities.",
  },
  {
    question: "What is a good evidence match score?",
    answer:
      "Higher evidence match usually means more JD skills are proven in project bullets with outcomes, not just listed. Use the score with the skill proof map and what-we-measured signals to sequence fixes. Treat it as a prioritization signal, not a hiring guarantee.",
  },
  {
    question: "How does job description analysis work?",
    answer:
      "The tool parses the posting for required skills, preferred skills, seniority signals, domain themes, and experience evidence employers expect. Those requirements are compared against your bullets and skills to build evidence match, proof levels per skill, and fix-before-you-apply callouts before optimization.",
  },
  {
    question: "Can I optimize my resume for a job description with this tool?",
    answer:
      "Yes. This is the canonical free tool for both analysis and optimization. Paste one job description, read evidence match and the skill proof map, then apply evidence-first optimization to strengthen bullets for that posting while keeping claims interview-safe.",
  },
] as const;
