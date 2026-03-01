export type Resume = {
  basics: {
    name: string;
    title: string;
    summary: string;
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    bullets: string[];
  }[];
  skills: string[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
};
