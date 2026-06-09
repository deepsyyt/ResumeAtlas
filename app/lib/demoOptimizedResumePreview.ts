import type { ResumeDocument } from "@/app/lib/resumeDocument";

/** Representative optimized resume for marketing / hero previews (not user data). */
export const DEMO_OPTIMIZED_RESUME: ResumeDocument = {
  name: "Alex Morgan",
  title: "Senior Software Engineer",
  summary:
    "Software engineer with 8+ years building production systems on AWS and Kubernetes. Summary updated for this job to highlight cloud platforms, system design, and on-call ownership.",
  skills: ["Python", "AWS", "Kubernetes", "PostgreSQL", "CI/CD", "System design"],
  experience: [
    {
      company: "Northline Systems",
      role: "Senior Software Engineer",
      dates: "2021 – Present",
      bullets: [
        "Led migration of 12 legacy services to Kubernetes on AWS, cutting deploy time 40% and improving on-call MTTR from 45m to 18m across three product teams.",
        "Designed event-driven ingestion pipeline processing 2.1M records/day with idempotent workers, reducing duplicate writes 92% and stabilizing downstream analytics SLAs.",
        "Moved CI/CD and observability work from the skills list into a project bullet: built OpenTelemetry + Grafana tracing so on-call could find cross-service failures in under 5 minutes.",
      ],
    },
  ],
  education: ["B.S. Computer Science"],
};

export const DEMO_OPTIMIZED_RESUME_HIGHLIGHTS = {
  keywords: ["Kubernetes", "AWS", "distributed", "CI/CD"],
  rewritten: [
    "Led migration of 12 legacy services to Kubernetes on AWS, cutting deploy time 40% and improving on-call MTTR from 45m to 18m across three product teams.",
  ],
  newBullets: [
    "Moved CI/CD and observability work from the skills list into a project bullet: built OpenTelemetry + Grafana tracing so on-call could find cross-service failures in under 5 minutes.",
  ],
  keywordBullets: [
    "Designed event-driven ingestion pipeline processing 2.1M records/day with idempotent workers, reducing duplicate writes 92% and stabilizing downstream analytics SLAs.",
  ],
  quantified: [
    "Led migration of 12 legacy services to Kubernetes on AWS, cutting deploy time 40% and improving on-call MTTR from 45m to 18m across three product teams.",
    "Designed event-driven ingestion pipeline processing 2.1M records/day with idempotent workers, reducing duplicate writes 92% and stabilizing downstream analytics SLAs.",
  ],
} as const;
