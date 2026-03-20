export type Resume = {
  basics: {
    name: string;
    title: string;
    summary: string;
    /** Multiline contact block (phone, email, links) — matches optimize preview header. */
    contact?: string;
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    bullets: string[];
    /** Sub-sections such as "Project 1: …" under one role. */
    projects?: { title: string; bullets: string[] }[];
  }[];
  skills: string[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
};
