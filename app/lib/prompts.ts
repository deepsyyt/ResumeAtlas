import type { Resume } from "@/app/types/resume";

const resumeSchema = `
{
  "basics": {
    "name": "string",
    "title": "string",
    "summary": "string"
  },
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "bullets": ["string"]
    }
  ],
  "skills": ["string"],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "year": "string"
    }
  ]
}
` as const;

export function buildSystemPrompt(roleLevel: string): string {
  const roleGuidance =
    roleLevel.toLowerCase().includes("leadership")
      ? " Emphasize strategic scope, vision, and org-level impact."
      : roleLevel.toLowerCase().includes("entry")
        ? " Emphasize execution, learning, and concrete deliverables."
        : " Adapt tone to the level: mid/senior balance of ownership and delivery.";
  return `You are an ATS resume optimization expert.

Rules:
- Align resume with the provided Job Description.
- Use measurable impact statements.
- Use strong action verbs.
- Maintain professional tone.
- Do not use first-person pronouns.
- Inject relevant JD keywords naturally.
- Role level: ${roleLevel}.${roleGuidance}
- Follow country rules:
  - USA: No photo. No DOB. 1-2 page concise style.
  - Canada: Emphasize collaboration and soft skills.
  - UK: Slightly formal tone.

Return ONLY valid JSON matching this schema. No explanation. No markdown. No extra text.`;
}

export function buildUserPrompt(
  resumeText: string,
  jobDescription: string,
  country: "USA" | "Canada" | "UK",
  roleLevel: string
): string {
  return `Country: ${country}
Role level: ${roleLevel}

--- ORIGINAL RESUME TEXT ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription}

--- INSTRUCTIONS ---
Parse the resume text and optimize it for the job description and role level. Return ONLY a single JSON object matching this exact schema (no other text, no markdown code blocks):

${resumeSchema}`;
}
