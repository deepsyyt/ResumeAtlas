export type ResumeGuideSlug =
  | "ats-friendly-resume-example"
  | "ats-resume-template"
  | "one-page-resume-example"
  | "resume-summary-examples"
  | "resume-achievements-examples"
  | "resume-skills-examples"
  | "resume-work-experience-examples"
  | "resume-projects-examples"
  | "resume-template-for-job-application";

export type ResumeGuidePageConfig = {
  slug: ResumeGuideSlug;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  // Simple section headings and short description text
  sections: {
    heading: string;
    body: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

export const RESUME_GUIDE_PAGES: Record<ResumeGuideSlug, ResumeGuidePageConfig> = {
  "ats-friendly-resume-example": {
    slug: "ats-friendly-resume-example",
    h1: "ATS Friendly Resume Example",
    metaTitle: "ATS Friendly Resume Example (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "See an ATS friendly resume example and learn how to structure your resume to pass applicant tracking systems and reach recruiters.",
    intro:
      "An ATS friendly resume is designed so that applicant tracking systems can easily read, parse, and score your experience. Instead of fancy templates, it uses a clean layout, clear headings, and keywords that match the job description. This guide walks through the structure of an ATS friendly resume and shows you how to adapt it to your career.",
    sections: [
      {
        heading: "What Is an ATS Friendly Resume?",
        body:
          "An ATS friendly resume is a simple, text-based document that uses standard section headings, a single-column layout, and keyword-rich bullets. It avoids elements that can break parsing such as tables, images, text boxes, and decorative fonts. The goal is to make it easy for the system to extract your work history, skills, and education without guessing.",
      },
      {
        heading: "Example ATS Friendly Resume Structure",
        body:
          "A typical ATS friendly resume starts with your name and contact information, followed by a short professional summary. Next comes a skills section, then reverse-chronological work experience with impact-focused bullets, and finally education and optional sections such as certifications. Each section has a clear heading so the ATS can map it correctly.",
      },
      {
        heading: "Tips to Make Your Resume ATS Friendly",
        body:
          "Use standard headings like Work Experience, Education, and Skills. Keep everything in one column. Spell out important acronyms at least once. Make sure the tools and responsibilities from the job description appear in your summary, skills list, and bullets, as long as they reflect your real experience.",
      },
      {
        heading: "Common Mistakes That Break ATS Parsing",
        body:
          "Overly designed templates, multiple text columns, images, icons, and tables can confuse ATS parsers and cause your content to be misread or dropped. Another common issue is hiding keywords in images or sidebars that systems ignore. Keeping your layout simple and text-based is safer and easier to maintain.",
      },
    ],
    faq: [
      {
        question: "Do I need a special template to make my resume ATS friendly?",
        answer:
          "No. A simple one-column resume using standard section headings is often better than a complex template. Focus on clear structure and relevant keywords instead of heavy design.",
      },
      {
        question: "Will an ATS friendly resume still look good to recruiters?",
        answer:
          "Yes. Recruiters appreciate resumes that are easy to skim. A clean layout, short paragraphs, and strong bullets read well on screen and on paper.",
      },
      {
        question: "How can I check if my resume is ATS friendly?",
        answer:
          "Paste your resume and a job description into ResumeAtlas to see how well it matches, which skills are missing, and whether your structure is likely to pass ATS.",
      },
    ],
  },
  "ats-resume-template": {
    slug: "ats-resume-template",
    h1: "ATS Resume Template",
    metaTitle: "ATS Resume Template (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "Use this ATS resume template to structure your resume for applicant tracking systems. Includes layout, sections, and keyword tips.",
    intro:
      "An ATS resume template gives you a reliable starting point so you do not have to guess about layout or section order. The template below is intentionally simple: one column, clear headings, and space for impact-focused bullets. You can adapt it to almost any industry or role.",
    sections: [
      {
        heading: "Recommended ATS Resume Layout",
        body:
          "Start with a header containing your name, email, phone, location, and links like LinkedIn or portfolio. Then add a short professional summary, a skills section, work experience in reverse chronological order, education, and optional extras such as certifications or projects. Each section should be clearly labeled.",
      },
      {
        heading: "ATS Resume Template Example",
        body:
          "Name and contact details on one line, followed by a three-to-four sentence summary that highlights years of experience, core skills, and the type of roles you target. Next, a skills list grouped by category. Under Work Experience, use bullets that describe what you did and what changed because of your work. Close with your education and any relevant credentials.",
      },
      {
        heading: "How to Customize the Template for Your Role",
        body:
          "Mirror the language from the job description in your summary and skills list. If the posting emphasizes stakeholder communication, project management, or specific tools, make sure those appear prominently where they are true for you. Remove sections that are not relevant and keep the document to one or two pages.",
      },
      {
        heading: "Testing Your Template with ATS",
        body:
          "Once you have filled in the template, run it through an ATS checker like ResumeAtlas with a real job description. This helps you confirm that your keywords and structure are aligned with the role you care about before you apply.",
      },
    ],
    faq: [
      {
        question: "Can I use this template for any industry?",
        answer:
          "Yes. The core layout works across industries. You should, however, adapt the skills, terminology, and examples to match your specific domain and target roles.",
      },
      {
        question: "Should my ATS resume template always be one page?",
        answer:
          "One page is ideal for early-career professionals. Senior candidates with 8+ years of experience can use two pages if needed, as long as every line earns its place.",
      },
      {
        question: "Do I need a different template for every job?",
        answer:
          "You can reuse the same base template, but you should tailor the summary, skills, and top bullets to each job description to improve your ATS match score.",
      },
    ],
  },
  "one-page-resume-example": {
    slug: "one-page-resume-example",
    h1: "One Page Resume Example",
    metaTitle: "One Page Resume Example (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "See a one page resume example and learn how to fit your experience into a concise, ATS-friendly layout.",
    intro:
      "One page resumes force you to prioritize what matters most. When done well, they are easier for recruiters to read and can perform better in ATS because signal is high and noise is low.",
    sections: [
      {
        heading: "When a One Page Resume Makes Sense",
        body:
          "If you have less than 8–10 years of experience or are changing careers, a one page resume is usually enough. It keeps attention on your strongest, most recent roles and achievements.",
      },
      {
        heading: "Example One Page Resume Layout",
        body:
          "Use a compact header, a three to four line summary, a short skills section, and your two or three most relevant roles with strong bullets. Older roles can be summarized briefly or omitted.",
      },
      {
        heading: "Prioritizing Content for One Page",
        body:
          "Cut repeated bullets, remove low-impact responsibilities, and focus on metrics. Ask yourself whether each line helps you get this specific job. If not, trim it.",
      },
      {
        heading: "Avoiding the Tiny Font Trap",
        body:
          "Do not shrink your font or margins to cram everything in. It is better to be selective and readable than dense and overwhelming.",
      },
    ],
    faq: [
      {
        question: "Can senior candidates use a one page resume?",
        answer:
          "Yes, especially if they are targeting a narrow set of roles. However, many senior professionals find that two pages allows for clearer storytelling.",
      },
      {
        question: "Should I include every job on a one page resume?",
        answer:
          "No. Focus on the roles that best support your target job and summarize the rest briefly or omit them.",
      },
      {
        question: "Is it okay if my one page resume spills onto a second page slightly?",
        answer:
          "Avoid orphaned lines on a second page. If you truly need more room, commit to a well-structured two page resume instead.",
      },
    ],
  },
  "resume-summary-examples": {
    slug: "resume-summary-examples",
    h1: "Resume Summary Examples",
    metaTitle: "Resume Summary Examples (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "Get resume summary examples and learn how to write a strong profile that highlights your value in 3–4 lines.",
    intro:
      "Your resume summary is often the first thing recruiters read after your name. A good summary makes it immediately clear who you are, what you do, and what value you bring.",
    sections: [
      {
        heading: "What Makes a Strong Resume Summary",
        body:
          "Effective summaries are short, specific, and tailored to the role. They mention years of experience, key domains or industries, and a few of your strongest skills or outcomes.",
      },
      {
        heading: "Examples of Resume Summaries",
        body:
          "For a data analyst: “Data analyst with 4+ years of experience turning messy data into clear, actionable insights for product and growth teams. Expert in SQL, Python, and Tableau, with a track record of increasing activation and retention.” For a software engineer: “Full‑stack engineer focused on building reliable, user‑centric features in React and Node.js, shipping iteratively with product and design.”",
      },
      {
        heading: "Tailoring Summaries to Each Job",
        body:
          "Read the job description and mirror its language in your summary. Highlight the skills and outcomes that matter most for that specific role, not a generic list of everything you can do.",
      },
      {
        heading: "Common Mistakes in Resume Summaries",
        body:
          "Avoid buzzword-heavy statements that say little, such as “results-driven professional with a proven track record.” Instead, show results through specifics: metrics, domains, and clear responsibilities.",
      },
    ],
    faq: [
      {
        question: "Do I need a summary on my resume?",
        answer:
          "While not mandatory, a summary helps busy recruiters quickly understand your profile and decide whether to keep reading.",
      },
      {
        question: "How long should a resume summary be?",
        answer:
          "Aim for 3–5 short lines or bullets. Anything longer becomes a second cover letter.",
      },
      {
        question: "Should I write my summary in first person?",
        answer:
          "Most summaries are written without pronouns, e.g. “Software engineer with 5+ years…” rather than “I am a software engineer…”.",
      },
    ],
  },
  "resume-achievements-examples": {
    slug: "resume-achievements-examples",
    h1: "Resume Achievements Examples",
    metaTitle: "Resume Achievements Examples (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "See resume achievements examples and learn how to turn your responsibilities into measurable, impact-focused bullets.",
    intro:
      "Achievements are the core of a strong resume. They show not just what you did, but what changed because you did it.",
    sections: [
      {
        heading: "Turning Tasks into Achievements",
        body:
          "Start from a responsibility and ask “so what?” until you surface the impact. For example, instead of “managed email campaigns,” write “managed email campaigns that increased click‑through rates by 18% and contributed to a 10% lift in monthly revenue.”",
      },
      {
        heading: "Examples of Strong Achievement Bullets",
        body:
          "“Reduced page load times by 35%, boosting organic conversions by 8%.” “Designed A/B tests that increased onboarding completion by 12%.” “Negotiated vendor contracts that cut infrastructure costs by $120K annually.”",
      },
      {
        heading: "Using Metrics Even When You Lack Exact Numbers",
        body:
          "If you do not have precise figures, use reasonable ranges or qualitative improvements like “significantly” only when they are backed by real outcomes. You can also reference scale: number of users, revenue bands, or team size.",
      },
      {
        heading: "Balancing Individual and Team Achievements",
        body:
          "Give credit to your team while still showing your role. Phrases like “led a team of 4 engineers to…” or “collaborated with design and marketing to…” are effective.",
      },
    ],
    faq: [
      {
        question: "What if my job felt mostly operational?",
        answer:
          "Even operational roles have achievements: error reductions, faster response times, higher satisfaction scores, or reduced manual work.",
      },
      {
        question: "How many achievements should I list per job?",
        answer:
          "Aim for 3–6 bullets per recent role, focusing on your most impressive outcomes.",
      },
      {
        question: "Can I reuse achievements across job applications?",
        answer:
          "Yes, but you should prioritize different achievements depending on the role you are targeting.",
      },
    ],
  },
  "resume-skills-examples": {
    slug: "resume-skills-examples",
    h1: "Resume Skills Examples",
    metaTitle: "Resume Skills Examples (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "Get resume skills examples and learn how to list hard and soft skills in a way that works for ATS and recruiters.",
    intro:
      "Skills sections are often the first thing ATS and recruiters scan to decide whether you are worth a closer look. A strong skills section is specific, honest, and aligned with the job description.",
    sections: [
      {
        heading: "Choosing the Right Skills to Highlight",
        body:
          "Start with the job description. Identify the tools, technologies, and competencies that appear most often. Add those to your skills section if they truthfully reflect your experience.",
      },
      {
        heading: "Grouping Skills for Clarity",
        body:
          "Group skills by category, such as Languages, Frameworks, Tools, and Soft Skills. This makes scanning easier than a single long comma-separated list.",
      },
      {
        heading: "Examples of Skills Lists",
        body:
          "For a frontend engineer: “Languages: JavaScript, TypeScript. Frameworks: React, Next.js. Tools: Git, Jest, Playwright. Soft skills: Stakeholder communication, mentoring.” For a data analyst: “SQL, Python, Tableau, Excel, A/B testing, experimentation design.”",
      },
      {
        heading: "Avoiding Common Skills Section Mistakes",
        body:
          "Do not list every tool you have ever touched. Focus on the ones that matter for the roles you want now. Avoid vague skills like “Microsoft Office” unless they are truly central to the role.",
      },
    ],
    faq: [
      {
        question: "How many skills should I list on my resume?",
        answer:
          "Most candidates do well with 8–20 focused skills, grouped into 3–4 categories.",
      },
      {
        question: "Should I include soft skills in my skills section?",
        answer:
          "Yes, but make them concrete and support them with examples in your experience bullets.",
      },
      {
        question: "Do I need a separate skills resume for ATS?",
        answer:
          "No. A single, well-structured skills section that matches the job description is enough, especially when combined with aligned experience bullets.",
      },
    ],
  },
  "resume-work-experience-examples": {
    slug: "resume-work-experience-examples",
    h1: "Resume Work Experience Examples",
    metaTitle: "Resume Work Experience Examples (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "See resume work experience examples and learn how to write bullets that clearly describe your role and impact.",
    intro:
      "Your work experience section is where recruiters decide whether to move you forward. It should combine clear responsibilities with measurable results.",
    sections: [
      {
        heading: "Structuring Work Experience Entries",
        body:
          "Each entry should include job title, company, location, and dates, followed by 3–6 bullets. Lead with your most recent role and move backward in time.",
      },
      {
        heading: "Examples for Early-Career Candidates",
        body:
          "Highlight internships, projects, and part-time roles that demonstrate real skills. Use bullets like “Built a React dashboard for 500+ users” rather than generic statements like “Helped on front-end tasks.”",
      },
      {
        heading: "Examples for Mid/Senior Candidates",
        body:
          "Emphasize ownership, leadership, and business outcomes. For example: “Led a team of 3 engineers to launch a feature that increased conversion by 9%.” or “Implemented monitoring that reduced incident response time by 30%.”",
      },
      {
        heading: "Dealing with Employment Gaps or Career Changes",
        body:
          "Use bullets to highlight transferable skills and outcomes, even from non-traditional roles. Be honest, but focus on what prepares you for the jobs you want now.",
      },
    ],
    faq: [
      {
        question: "How far back should my work experience go?",
        answer:
          "Most resumes cover the last 8–15 years, with more detail on recent roles and less on older positions.",
      },
      {
        question: "Can I include freelance or contract work?",
        answer:
          "Yes. Treat substantial freelance or contract engagements like regular roles, with titles, dates, and bullets.",
      },
      {
        question: "Should I list responsibilities or achievements?",
        answer:
          "Both, but err toward achievements. Responsibilities set context; achievements show why they mattered.",
      },
    ],
  },
  "resume-projects-examples": {
    slug: "resume-projects-examples",
    h1: "Resume Projects Examples",
    metaTitle: "Resume Projects Examples (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "Get resume project examples and learn how to describe academic, side, and professional projects on your resume.",
    intro:
      "Projects can be powerful evidence of your skills, especially if you are early in your career or changing fields. They show initiative, learning, and real-world results.",
    sections: [
      {
        heading: "When to Add a Projects Section",
        body:
          "Add a Projects section if you have work worth highlighting that does not fit neatly into traditional jobs: hackathon entries, open-source contributions, side startups, or major academic projects.",
      },
      {
        heading: "How to Describe Projects",
        body:
          "Treat projects like mini roles: include a name, brief description, technologies used, and 2–3 impact-focused bullets. Mention outcomes such as users, usage, or recognition.",
      },
      {
        heading: "Examples of Strong Project Bullets",
        body:
          "“Built a budgeting app in React and Node.js with 300+ monthly active users.” “Created an NLP model that classifies support tickets with 92% accuracy.” “Led a team of 4 classmates to deliver a capstone project on time and present to a panel of industry judges.”",
      },
      {
        heading: "Avoiding Common Project Section Pitfalls",
        body:
          "Avoid listing every tutorial or half-finished idea. Focus on a small number of projects that show real depth and outcomes.",
      },
    ],
    faq: [
      {
        question: "Where should I place projects on my resume?",
        answer:
          "Students and career changers often place projects near the top, while experienced candidates usually put them after work experience.",
      },
      {
        question: "Should I include links to my projects?",
        answer:
          "Yes, if they are stable and professional. GitHub repositories or live demos can provide valuable proof of your work.",
      },
      {
        question: "Do all roles need a Projects section?",
        answer:
          "No. Only include a Projects section if it adds clear value for the roles you are targeting.",
      },
    ],
  },
  "resume-template-for-job-application": {
    slug: "resume-template-for-job-application",
    h1: "Resume Template for Job Application",
    metaTitle: "Resume Template for Job Application (ATS-Friendly Resume Guide) | ResumeAtlas",
    metaDescription:
      "Use this resume template for job applications to structure your experience, skills, and education in an ATS-friendly way.",
    intro:
      "A good resume template for job applications takes the guesswork out of section order and formatting. The template in this guide is optimized for ATS and easy for recruiters to scan.",
    sections: [
      {
        heading: "What to Look for in a Job Application Resume Template",
        body:
          "The best templates keep things simple: standard fonts, clear headings, and enough white space. They should not lock you into irrelevant sections or flashy design elements that add noise.",
      },
      {
        heading: "Template Structure Overview",
        body:
          "Header with contact information, followed by a short summary that names your target role. Then skills, work experience, education, and optional extras such as certifications or projects. Each section lives on its own line with a clear heading.",
      },
      {
        heading: "Customizing the Template for Each Application",
        body:
          "For every job you apply to, adjust your summary, skills, and top bullets to reflect the language and priorities in the posting. This extra 10–15 minutes of tailoring can dramatically increase your callback rate.",
      },
      {
        heading: "Checking Your Template Before You Submit",
        body:
          "Run your completed resume through ResumeAtlas with the exact job description to spot missing keywords, weak bullets, or formatting issues before you hit submit.",
      },
    ],
    faq: [
      {
        question: "Can I reuse the same template across companies?",
        answer:
          "Yes, but you should always tailor the content for each job description rather than submitting the same generic resume everywhere.",
      },
      {
        question: "Is it okay to use company-provided resume templates?",
        answer:
          "If a company provides a template, following it is usually a good idea. Just make sure your content is still clear and ATS friendly.",
      },
      {
        question: "Do I need separate templates for ATS and non-ATS applications?",
        answer:
          "In most cases, a single clean, ATS-friendly template works for both. You can keep a more visual version for in-person networking if desired.",
      },
    ],
  },
};

