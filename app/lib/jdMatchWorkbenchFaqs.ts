/** Shared commercial FAQ for homepage workbench (HTML + JSON-LD). */

export const JD_MATCH_WORKBENCH_FAQ = [
  {
    question: "Why is my resume not getting interviews?",
    answer:
      "Resumes often list the right skills but fail screening when those skills are not proven in project bullets. Paste your resume and the job description to read your application verdict, elimination risks, and which requirements need stronger evidence before you apply.",
  },
  {
    question: "How do I check my resume against a job description for free?",
    answer:
      "Paste your resume and the full job description into ResumeAtlas. You get an application verdict, proven vs weak skills, recommended fixes, and optional optimization for that posting — free, instant, and no signup required.",
  },
  {
    question: "What is the application verdict on ResumeAtlas?",
    answer:
      "The application verdict estimates whether your experience supports this specific role — from skills proven in work bullets, missing requirements, and top elimination risks. It is directional guidance to prioritize edits, not a hiring guarantee.",
  },
  {
    question: "How do I compare my resume to a job description?",
    answer:
      "Paste your resume and the exact job posting into the tool above. You get an application verdict, proven vs weak skills, recommended fixes, and evidence-first optimization suggestions focused on that job description.",
  },
  {
    question: "What is the skill-by-skill proof map?",
    answer:
      "For each JD skill, the proof map shows whether it is proven in a project bullet, mentioned in experience text, listed only in Skills, or missing honestly. That helps you see where a resume looks qualified on paper but proof is thin.",
  },
  {
    question: "Is this resume vs job description checker free?",
    answer:
      "Yes. Application verdict, proven vs weak skills, recommended fixes, and evidence-first optimization suggestions are free with instant results and no signup. Analyze and edit in the tool before any export step.",
  },
  {
    question: "How is this different from an ATS resume checker?",
    answer:
      "An ATS resume checker focuses on parsing and formatting risk. ResumeAtlas evaluates whether your experience supports this specific role: application verdict, elimination risks, skill proof, and recommended fixes for the posting you paste.",
  },
  {
    question: "How does evidence-first optimization work?",
    answer:
      "After the application verdict, ResumeAtlas rewrites your summary and project bullets for the same posting: supported JD skills move into the bullets where you used them, with stronger impact language from work you already did. Unsupported requirements stay visible as gaps. You review every change before export.",
  },
  {
    question: "How can I improve my shortlist odds?",
    answer:
      "Move supported JD skills from lists into project bullets, address the recommended fixes and elimination risks the dashboard flags, then run evidence-first optimization. Leave unsupported requirements honest instead of inventing experience.",
  },
  {
    question: "What is resume gap analysis?",
    answer:
      "Gap analysis compares your resume to one job description and surfaces what is missing or only listed: required skills without bullet proof, thin impact signals, and unsupported posting requirements. The skill proof map makes those gaps concrete before you optimize.",
  },
  {
    question: "How do I compare my resume to a job posting?",
    answer:
      "Copy the full job posting text, not a summary, and paste it with your resume into the tool above. ResumeAtlas analyzes the posting, compares your bullets and skills against required and preferred terms, and returns an application verdict, skill proof levels, and optimization priorities.",
  },
  {
    question: "What is a good application verdict?",
    answer:
      "A stronger verdict usually means more JD skills are proven in project bullets with outcomes, not just listed. Use the verdict with recommended fixes to sequence edits. Treat it as a prioritization signal, not a hiring guarantee.",
  },
  {
    question: "How does job description analysis work?",
    answer:
      "The tool parses the posting for required skills, preferred skills, seniority signals, and experience evidence employers expect. Those requirements are compared against your bullets and skills to build the application verdict, proof levels per skill, and fix-before-you-apply callouts before optimization.",
  },
  {
    question: "Can I optimize my resume for a job description with this tool?",
    answer:
      "Yes. This is the canonical free tool for both analysis and optimization. Paste one job description, read the application verdict and skill proof map, then apply evidence-first optimization to strengthen bullets for that posting while keeping claims interview-safe.",
  },
] as const;

/** Privacy and product trust — shown on `/faq` alongside workbench FAQs. */
export const SITE_PRIVACY_FAQ = [
  {
    question: "Do you store my resume or share it with anyone?",
    answer:
      "For anonymous sessions, your resume and job description are used to compute the analysis in real time and then discarded. If you log in, we may store optimized versions and usage data so you can download and revisit them later. We do not sell your resume data to advertisers or data brokers.",
  },
  {
    question: "What makes ResumeAtlas different from basic ATS checkers?",
    answer:
      "Most ATS tools focus on keywords and parsing. ResumeAtlas evaluates whether your experience supports the role you are applying to: application verdict, elimination risks, skill proof, and recommended fixes for the job description you paste.",
  },
] as const;

export const ALL_SITE_FAQ = [...JD_MATCH_WORKBENCH_FAQ, ...SITE_PRIVACY_FAQ] as const;
