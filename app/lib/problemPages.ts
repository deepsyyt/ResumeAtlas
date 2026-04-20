/**
 * Pain-intent SEO pages under /problems/[slug].
 * Each page targets a high-intent job-search query with unique angle and internal links.
 */

export const PROBLEM_SLUGS = [
  "applied-to-200-jobs-no-response",
  "resume-not-getting-interviews",
  "why-am-i-not-getting-interviews",
  "no-response-after-applying",
  "ats-rejecting-my-resume",
  "resume-not-passing-ats",
  "missing-keywords-in-resume",
  "how-to-tailor-resume-to-job-description",
  "resume-vs-job-description",
  "why-recruiters-ignore-resume",
] as const;

/**
 * Canonical problems set (one pillar page per intent).
 * Duplicates remain reachable but are noindex + redirected.
 */
export const CANONICAL_PROBLEM_SLUGS = [
  "resume-not-getting-interviews",
  "no-response-after-applying",
  "ats-rejecting-my-resume",
  "missing-keywords-in-resume",
  "resume-vs-job-description",
] as const;

/**
 * Problem pages to include in the sitemap and allow indexing.
 * Others in {@link CANONICAL_PROBLEM_SLUGS} stay reachable (hub + links) but are noindex to reduce SERP overlap with tools.
 */
export const INDEXED_PROBLEM_SLUGS = [
  "resume-not-getting-interviews",
  "no-response-after-applying",
  "ats-rejecting-my-resume",
] as const satisfies readonly ProblemSlug[];

/**
 * Old URLs that 301 to a canonical problem page (`next.config.mjs`).
 * Do not pre-render these paths — avoids duplicate HTML + clearer crawl signals.
 */
export const PROBLEM_REDIRECT_SOURCE_SLUGS = [
  "why-am-i-not-getting-interviews",
  "applied-to-200-jobs-no-response",
  "resume-not-passing-ats",
  "how-to-tailor-resume-to-job-description",
  "why-recruiters-ignore-resume",
] as const satisfies readonly ProblemSlug[];

export type ProblemSlug = (typeof PROBLEM_SLUGS)[number];

export type ProblemPageConfig = {
  slug: ProblemSlug;
  /** Primary phrase for SEO (used in copy, not stuffed) */
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  hook: string[];
  rootCauses: {
    heading: string;
    intro: string;
    bullets: { title: string; text: string }[];
  };
  mistakes: {
    heading: string;
    intro: string;
    bullets: string[];
  };
  whatWorks: {
    heading: string;
    steps: { title: string; body: string }[];
  };
  resumeAtlas: {
    heading: string;
    paragraphs: string[];
  };
  benefits: {
    heading: string;
    items: string[];
  };
  scenario: {
    heading: string;
    beforeTitle: string;
    before: string;
    afterTitle: string;
    after: string;
  };
  cta: {
    heading: string;
    body: string;
  };
  faq: { question: string; answer: string }[];
  /** Other problem pages to surface (not including self) */
  relatedSlugs: ProblemSlug[];
};

export const PROBLEM_PAGES: Record<ProblemSlug, ProblemPageConfig> = {
  "applied-to-200-jobs-no-response": {
    slug: "applied-to-200-jobs-no-response",
    primaryKeyword: "applied to 200 jobs no response",
    metaTitle:
      "Applied to 200 Jobs With No Response? Fix Your Resume Before You Apply Again | ResumeAtlas",
    metaDescription:
      "If you applied to hundreds of jobs with no response, your resume may not match roles or ATS filters. Learn why mass applying fails and how to tailor before the next send.",
    h1: "You Applied to 200 Jobs and Got No Response - Here’s What’s Likely Going Wrong",
    hook: [
      "You are not imagining it. When you have applied to 200 jobs with no response, the problem is rarely “bad luck” alone. Something in how you present fit - or how systems read your resume - is quietly filtering you out.",
      "This page is for people who are exhausted from clicking “Easy Apply” and refreshing an empty inbox. We will walk through real reasons this happens, what usually makes it worse, and what to change before you send another batch.",
    ],
    rootCauses: {
      heading: "Why this happens after you’ve applied to so many jobs",
      intro:
        "When you have applied to 200 jobs no response is often a signal that your documents are not winning the first screen - human or machine.",
      bullets: [
        {
          title: "Your resume does not mirror each job description",
          text: "One generic file sent everywhere reads as “maybe” for every role. Recruiters and ATS both look for overlap with the posting. If you applied to 200 jobs no response patterns often start here: same bullets, same keywords, same emphasis.",
        },
        {
          title: "Missing keywords where ATS expects them",
          text: "Tools and titles from the posting need to appear in context - summary, skills, experience - not once in a footer. If those phrases are absent or buried, you can look like a weaker match than you are.",
        },
        {
          title: "Weak impact bullets",
          text: "Tasks without outcomes blend together. When a recruiter skims fifty resumes, “responsible for” lines do not stand out against people who show measurable results.",
        },
        {
          title: "ATS parsing issues",
          text: "Complex layouts, icons, or tables can garble text. If the system misreads your job titles or dates, your estimated match can tank even when your experience is strong.",
        },
        {
          title: "Role mismatch you are not naming",
          text: "Sometimes you are close but not exact - for example “analyst” vs “scientist.” If you do not bridge that gap in language, you look like the wrong bucket.",
        },
        {
          title: "Volume without feedback",
          text: "Spraying applications feels productive, but without tailoring you repeat the same miss. That is how you end up with applied to 200 jobs no response and no learning loop.",
        },
      ],
    },
    mistakes: {
      heading: "What most people do wrong after no replies",
      intro:
        "Panic leads to habits that feel efficient but hurt signal.",
      bullets: [
        "Mass applying with one resume and hoping volume beats fit.",
        "Keyword stuffing: repeating terms in a list with no proof in experience.",
        "Ignoring the structure of the job description - skipping must-have tools in your skills section.",
        "Assuming “no response” means you are unqualified, instead of misaligned on paper.",
      ],
    },
    whatWorks: {
      heading: "What actually works (before you apply again)",
      steps: [
        {
          title: "Pick fewer roles, tailor deeper",
          body: "For your next ten applications, rewrite your summary and top bullets per posting. Mention the employer’s language for stack, scope, and outcomes.",
        },
        {
          title: "Extract keywords from the job description",
          body: "Highlight repeated nouns and phrases: tools, methodologies, seniority cues. Map each to a bullet or skill line where you have real experience.",
        },
        {
          title: "Reorder sections for the story they need",
          body: "If the role is IC-heavy, lead with technical impact. If it is cross-functional, foreground collaboration and delivery.",
        },
        {
          title: "Quantify where you can",
          body: "Even rough numbers beat vague claims: latency, revenue, adoption, cycle time.",
        },
        {
          title: "Sanity-check ATS readability",
          body: "Use a simple one-column layout and standard headings so parsers do not drop your content.",
        },
      ],
    },
    resumeAtlas: {
      heading: "How ResumeAtlas helps when you have applied to 200 jobs with no response",
      paragraphs: [
        "ResumeAtlas compares your resume to a specific job description and surfaces likely gaps: missing terms, weak alignment between bullets and requirements, and ATS-style parsing notes. We describe estimated match strength and alignment feedback - not a guarantee you will pass every employer’s system.",
        "You paste the posting you actually want, so the feedback matches that role instead of generic “resume tips.” That turns your next applications into a test of fit, not hope.",
      ],
    },
    benefits: {
      heading: "What you get with ResumeAtlas",
      items: [
        "Side-by-side view of resume text and job description for targeted edits.",
        "Highlights missing or thin keywords in context, not random lists.",
        "Alignment feedback so you see where experience and posting diverge.",
        "ATS-oriented readability notes to reduce parsing risk.",
        "Edit manually after suggestions - you stay in control of what is true.",
        "Export to PDF or DOCX when you are ready to submit.",
        "Faster iteration than rereading the same posting ten times without a checklist.",
      ],
    },
    scenario: {
      heading: "Example: from spray-and-pray to targeted",
      beforeTitle: "Before (one resume for everything)",
      before:
        "“Software engineer with strong communication skills. Experienced with modern stacks. Looking for a challenging role in a fast-paced environment.” Bullets list tasks without metrics; skills block is a long comma list unrelated to the posting.",
      afterTitle: "After (same person, posting-specific)",
      after:
        "Summary names the stack from the job (e.g. TypeScript, Node, AWS) and one shipped outcome. Bullets tie each requirement to an example: API latency, test coverage, on-call. Skills mirror the job description’s groupings. That is the kind of shift that breaks an applied to 200 jobs no response cycle.",
    },
    cta: {
      heading: "Before the next 50 applications",
      body: "Paste one target job description and your resume into ResumeAtlas. Fix the biggest gaps on that posting first - then repeat for the next role. Small batch, higher signal.",
    },
    faq: [
      {
        question: "Why am I not getting interviews if I am qualified?",
        answer:
          "Qualification and “looking qualified on paper” are different. Misaligned keywords, generic bullets, or ATS parsing issues can hide your real experience. Tailoring and clarity usually move the needle before you change careers.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They are one signal among many. Employers use different systems and rules. Use scores as alignment feedback, not a promise of an interview.",
      },
      {
        question: "How can I tailor my resume quickly?",
        answer:
          "Start from a master resume, duplicate for the role, then adjust summary, skills, and three to five bullets. ResumeAtlas helps by listing likely gaps against the posting so you do not guess.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "You can, but it usually underperforms. Small wording shifts per posting often outperform one perfect generic file sent two hundred times.",
      },
    ],
    relatedSlugs: [
      "no-response-after-applying",
      "resume-not-getting-interviews",
      "why-recruiters-ignore-resume",
      "missing-keywords-in-resume",
    ],
  },

  "resume-not-getting-interviews": {
    slug: "resume-not-getting-interviews",
    primaryKeyword: "resume not getting interviews",
    metaTitle: "Resume Not Getting Interviews? Fix It for This Job in Minutes | ResumeAtlas",
    metaDescription:
      "Compare your resume to a job description: missing keywords, weak bullets, ATS gaps, and AI-aligned rewrites while you keep full control. Free analysis, no login, export PDF or DOCX.",
    h1: "Your Resume Is Not Getting Interviews - Fix It for the Job You Want",
    hook: [
      "When your resume is not getting interviews, it is easy to assume you need a complete rewrite. Often the issue is narrower: your resume does not prove fit for each specific role, or systems cannot connect your experience to the posting.",
      "Below is a practical pass: what breaks first, what people get wrong, and how to align your resume to the job description without sounding fake.",
    ],
    rootCauses: {
      heading: "Why a resume not getting interviews is so common",
      intro:
        "Interviews start from shortlists. Shortlists favor clear overlap with the job and easy scanning.",
      bullets: [
        {
          title: "Fit reads vague",
          text: "If a recruiter cannot answer “why this role?” in ten seconds, you sink in the pile. A resume not getting interviews often lacks a tight headline and summary for the target job.",
        },
        {
          title: "Keywords live in the wrong places",
          text: "Tools and domains need to appear in experience bullets, not only a skills cloud. Otherwise you look keyword-light even when you did the work.",
        },
        {
          title: "One-size-fits-all file",
          text: "The same resume for a startup IC role and an enterprise lead role will underperform both. Each needs a different emphasis.",
        },
        {
          title: "ATS or format friction",
          text: "Odd section titles or multi-column layouts can scramble parsing. Your resume not getting interviews might be invisible data as much as wording.",
        },
        {
          title: "Impact is implied, not shown",
          text: "“Improved systems” does not compete with “cut error rate by 22%.” Recruiters reward proof.",
        },
        {
          title: "Competition at the keyword layer",
          text: "Others mirror the posting more closely. Without that step, you lose on estimated match before a human compares stories.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes that keep a resume from getting interviews",
      intro: "These habits feel safe but flatten your story.",
      bullets: [
        "Listing every technology you ever touched instead of what matches this job.",
        "Copy-pasting the job description into a “skills” paragraph.",
        "Hiding layoffs or gaps with confusing dates instead of one honest line.",
        "Using a flashy template that breaks copy-paste and ATS parsing.",
      ],
    },
    whatWorks: {
      heading: "What works when your resume is not getting interviews",
      steps: [
        {
          title: "Lead with the role’s vocabulary",
          body: "Mirror nouns from the posting in your summary and first page: product area, stack, customer type.",
        },
        {
          title: "Tie each must-have to evidence",
          body: "If they want Kubernetes, show where you ran workloads, not just that you “know” it.",
        },
        {
          title: "Trim unrelated wins",
          body: "Older jobs can shrink to one line so space goes to relevant proof.",
        },
        {
          title: "Ask a blunt friend to skim for ten seconds",
          body: "If they cannot state your target role, rewrite the top third.",
        },
        {
          title: "Run a JD comparison pass",
          body: "Use a tool or checklist to find missing phrases before you submit.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas for when your resume is not getting interviews",
      paragraphs: [
        "Paste a real job description alongside your resume. ResumeAtlas highlights likely gaps between your text and the posting, with alignment feedback you can act on. We do not guarantee interviews - we show where the document and the role diverge.",
        "That is especially useful when you are sure your background fits but the shortlist says otherwise. Small edits to wording and ordering often change estimated match more than a full redesign.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "See missing or thin terms next to the job description.",
        "Prioritize edits that move alignment instead of cosmetic tweaks.",
        "ATS-oriented notes to reduce formatting risk.",
        "Keep ownership of your claims - suggestions are starting points.",
        "Export when you are happy with the draft.",
        "Iterate faster than manual highlight-and-guess.",
        "Clearer story before you invest in more applications.",
      ],
    },
    scenario: {
      heading: "Before and after",
      beforeTitle: "Before",
      before:
        "Summary: “Hard-working professional seeking new challenges.” Experience bullets list duties. Skills: fifty tools in one line.",
      afterTitle: "After",
      after:
        "Summary states role family, domain, and two proof points using words from a real posting. Bullets each echo a requirement. Skills grouped and trimmed to what you will defend in interview. That is how you address resume not getting interviews without inventing experience.",
    },
    cta: {
      heading: "Try a targeted pass",
      body: "Pick one job you want, not five you might take. Align your resume to that posting in ResumeAtlas, then apply. Repeat.",
    },
    faq: [
      {
        question: "Why am I not getting interviews?",
        answer:
          "Often your resume does not show clear overlap with the job on paper: missing keywords, weak bullets, or ATS parsing issues. Comparing your resume to a specific job description surfaces those gaps so you can fix them before you apply again.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "Use them as directional alignment feedback, not a guarantee. Employers use different systems. ResumeAtlas shows estimated match and gaps so you can tighten keyword fit and structure.",
      },
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Paste your resume and the job description into ResumeAtlas. You get a fast ATS-style read, missing keywords, and AI-suggested bullet rewrites. Edit everything manually, adjust tone, then download PDF or DOCX.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "You can, but reply rates are usually lower. A few minutes of job-specific alignment (keywords, bullets, summary) per posting typically outperforms one generic file sent everywhere.",
      },
      {
        question: "Will AI invent experience on my resume?",
        answer:
          "No. ResumeAtlas is built to preserve your real experience and intent. You review every change, edit any bullet, and accept or reject suggestions before you export.",
      },
    ],
    relatedSlugs: [
      "no-response-after-applying",
      "missing-keywords-in-resume",
      "ats-rejecting-my-resume",
      "resume-vs-job-description",
    ],
  },

  "why-am-i-not-getting-interviews": {
    slug: "why-am-i-not-getting-interviews",
    primaryKeyword: "why am I not getting interviews",
    metaTitle: "Why Am I Not Getting Interviews? (Resume, Fit & ATS) | ResumeAtlas",
    metaDescription:
      "Ask why am I not getting interviews? Often it is resume–job mismatch, keywords, or volume without tailoring. Practical steps and how ResumeAtlas helps.",
    h1: "Why Am I Not Getting Interviews? Start With How You Look Next to the Job Description",
    hook: [
      "If you keep asking why am I not getting interviews, you are probably tired of generic advice. The honest answer blends market luck with things you control: clarity of fit, proof, and whether your resume survives the first automated pass.",
      "This breakdown focuses on the controllable side - so you can answer why am I not getting interviews with a checklist instead of a shrug.",
    ],
    rootCauses: {
      heading: "Six real reasons people ask why am I not getting interviews",
      intro:
        "These stack. Fixing one layer often improves replies without changing your whole career.",
      bullets: [
        {
          title: "Resume not aligned to job description",
          text: "You may be qualified while your file reads generic. Recruiters match phrases and outcomes to the posting.",
        },
        {
          title: "Missing keywords in the right context",
          text: "Buzzwords in isolation look hollow. Same terms in bullets with outcomes look credible.",
        },
        {
          title: "Generic resume across many roles",
          text: "If nothing moves when you change companies but keep one resume, that is a clue.",
        },
        {
          title: "Weak impact bullets",
          text: "Tasks blend; numbers and scope separate candidates when everything else is similar.",
        },
        {
          title: "ATS filtering or parsing issues",
          text: "You might be filtered on estimated match before a person sees nuance.",
        },
        {
          title: "Mismatch you have not bridged",
          text: "Title or domain jumps need one sentence of translation so reviewers do not reject you for the wrong reason.",
        },
      ],
    },
    mistakes: {
      heading: "What people get wrong while wondering why am I not getting interviews",
      intro: "These extend the drought.",
      bullets: [
        "Applying more without changing the resume - same miss, higher count.",
        "Blaming the market only and skipping a JD-based edit pass.",
        "Stuffing keywords without evidence.",
        "Ignoring instructions (portfolio link, word count, format) in the posting.",
      ],
    },
    whatWorks: {
      heading: "What actually works",
      steps: [
        {
          title: "Tailor per job description",
          body: "Adjust summary, skills, and bullets to echo must-haves.",
        },
        {
          title: "Extract keywords deliberately",
          body: "Build a small list from the posting and cover it in experience where true.",
        },
        {
          title: "Align experience to requirements",
          body: "Reorder bullets so the strongest match is first under each role.",
        },
        {
          title: "Quantify impact",
          body: "Add one number per major bullet where possible.",
        },
        {
          title: "Check ATS-friendly structure",
          body: "Simple layout, standard headings, text-based file.",
        },
      ],
    },
    resumeAtlas: {
      heading: "How ResumeAtlas fits the “why am I not getting interviews” question",
      paragraphs: [
        "ResumeAtlas compares your resume to a job description and shows likely gaps and alignment feedback. It helps you see whether the issue is wording, missing terms, or structure - with estimated match context, not a promise of a callback.",
        "Use it on roles you genuinely want so the analysis matches your intent.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Structured comparison instead of gut feel.",
        "Keyword and alignment cues tied to the posting.",
        "Editable workflow with export options.",
        "Saves time versus rereading JDs without a map.",
        "Improves clarity before more applications go out.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Candidate asks why am I not getting interviews while sending identical resumes to product and program roles.",
      afterTitle: "After",
      after:
        "Two focused versions: one leads with roadmap and metrics, the other with delivery and stakeholders. Same person, clearer fit per funnel.",
    },
    cta: {
      heading: "Answer the question with data",
      body: "Run one posting through ResumeAtlas. Address the top gaps, then reapply to similar roles with the updated file.",
    },
    faq: [
      {
        question: "Why am I not getting interviews even with experience?",
        answer:
          "Experience has to be visible in the language and proof the employer uses. Alignment beats raw years on paper.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They reflect how closely your text resembles the posting in ways many systems care about. Use them as one input.",
      },
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Batch-edit by section: summary first, then skills, then three bullets. Use a tool to list missing terms.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "You can, but it usually lowers interview odds versus targeted versions.",
      },
    ],
    relatedSlugs: [
      "resume-not-getting-interviews",
      "no-response-after-applying",
      "resume-vs-job-description",
      "missing-keywords-in-resume",
    ],
  },

  "no-response-after-applying": {
    slug: "no-response-after-applying",
    primaryKeyword: "no response after applying",
    metaTitle: "Applied but No Response? See Why Your Resume Gets Ignored | ResumeAtlas",
    metaDescription:
      "No response after applying usually means weak match or pipeline noise. Learn how to improve tailoring, keywords, and clarity before the next wave of applications.",
    h1: "No Response After Applying - How to Break the Silence Without Sending 100 More Copies",
    hook: [
      "No response after applying is demoralizing. Sometimes the role was filled internally, sometimes timing was off - but when the pattern repeats, your materials are the lever you can move today.",
      "We will treat no response after applying as a signal to tighten fit per posting, not to spam harder.",
    ],
    rootCauses: {
      heading: "Why no response after applying keeps happening",
      intro:
        "Pipelines are noisy, but recurring silence often points to resume–JD distance.",
      bullets: [
        {
          title: "Resume not aligned to job description",
          text: "If your headline and bullets could describe any applicant, you will not stand out when everyone else mirrors the posting.",
        },
        {
          title: "Missing keywords",
          text: "No response after applying correlates with thin overlap on required tools and domains.",
        },
        {
          title: "Generic resume",
          text: "Same file for different seniority levels reads as unfocused.",
        },
        {
          title: "Weak impact bullets",
          text: "Without outcomes, you look interchangeable.",
        },
        {
          title: "ATS issues",
          text: "Parsing errors can tank estimated match silently.",
        },
        {
          title: "Role mismatch",
          text: "You might be close; without translating your story, you look off-target.",
        },
      ],
    },
    mistakes: {
      heading: "What most people do wrong",
      intro: "Panic-applications rarely fix no response after applying.",
      bullets: [
        "Doubling volume with the same resume.",
        "Ignoring custom questions or work samples when the posting asks.",
        "Keyword stuffing without proof.",
        "Assuming ghosting means you are unqualified.",
      ],
    },
    whatWorks: {
      heading: "What works",
      steps: [
        {
          title: "Tailor resume per JD",
          body: "Adjust language to each employer’s requirements.",
        },
        {
          title: "Extract keywords",
          body: "Build a checklist from the posting and tick it off in your draft.",
        },
        {
          title: "Align experience",
          body: "Move strongest relevant bullets up.",
        },
        {
          title: "Reorder sections",
          body: "Put the proof they care about first.",
        },
        {
          title: "Quantify impact",
          body: "Swap vague verbs for numbers where you can.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas when you get no response after applying",
      paragraphs: [
        "Compare your resume to the exact posting you chose. ResumeAtlas surfaces likely gaps and alignment feedback so you can fix the document before another silent drop. We provide estimated match insight, not a guarantee of employer behavior.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Targeted gap list against the job description.",
        "Faster iteration than manual diffing.",
        "ATS-oriented readability notes.",
        "Manual edits after AI suggestions.",
        "PDF and DOCX export.",
        "Better clarity before more applications.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Ten applications, no response after applying, identical resume emphasizing academia.",
      afterTitle: "After",
      after:
        "For industry roles, lead with shipped work and tools from the posting; education moves down. Same credentials, clearer commercial signal.",
    },
    cta: {
      heading: "Next steps",
      body: "Take one role where you got no response after applying. Reopen the posting, run ResumeAtlas, revise, and reapply or apply to a parallel opening with the stronger file.",
    },
    faq: [
      {
        question: "Why am I not getting interviews?",
        answer:
          "Often weak on-paper fit, competition, or pipeline timing. Improving alignment per job is the fastest experiment.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They are useful alignment feedback; employers differ in how they use them.",
      },
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Focus on summary, skills, and top bullets first. Use a JD comparison tool for missing terms.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "Rarely optimal. Even small per-role tweaks help.",
      },
    ],
    relatedSlugs: [
      "resume-not-getting-interviews",
      "no-response-after-applying",
      "ats-rejecting-my-resume",
      "missing-keywords-in-resume",
    ],
  },

  "ats-rejecting-my-resume": {
    slug: "ats-rejecting-my-resume",
    primaryKeyword: "ATS rejecting my resume",
    metaTitle: "ATS Rejecting Your Resume? Check What Fails Before You Apply Again | ResumeAtlas",
    metaDescription:
      "Worried about ATS rejecting my resume? Learn format fixes, keyword alignment, and how to get useful match feedback - without guaranteed ATS promises.",
    h1: "ATS Rejecting My Resume - What That Usually Means (and What to Do Next)",
    hook: [
      "If you say ATS rejecting my resume, you might picture a robot stamping “no.” In practice, many systems score or filter on keyword overlap, role fit, and whether text parsed correctly. “Rejection” is often low estimated match or parsing loss - both fixable.",
      "Here is a grounded look at why ATS rejecting my resume feels personal, and how to improve alignment without shady tricks.",
    ],
    rootCauses: {
      heading: "Why it feels like ATS rejecting my resume",
      intro:
        "Different employers configure thresholds differently. Common underlying issues:",
      bullets: [
        {
          title: "Missing keywords vs the job description",
          text: "If your resume omits must-have tools, estimated match drops.",
        },
        {
          title: "Generic resume",
          text: "Broad files underperform on role-specific scoring.",
        },
        {
          title: "Formatting that breaks parsing",
          text: "Columns and graphics can scramble content so keywords never attach to you.",
        },
        {
          title: "Weak bullets",
          text: "Thin evidence makes even correct keywords look decorative.",
        },
        {
          title: "Role mismatch",
          text: "Titles and scope that do not line up with the posting trigger filters.",
        },
        {
          title: "Keyword stuffing done wrong",
          text: "Lists without experience look spammy and may not score well.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes",
      intro: "When people panic about ATS rejecting my resume they often:",
      bullets: [
        "Hide keywords in white text - risky and embarrassing if found.",
        "Ignore the job description structure.",
        "Use image-heavy templates.",
        "Assume one magic score fixes everything.",
      ],
    },
    whatWorks: {
      heading: "What works",
      steps: [
        {
          title: "Tailor to the job description",
          body: "Echo real requirements in honest bullets.",
        },
        {
          title: "Extract keywords systematically",
          body: "Cover them where you have real work to cite.",
        },
        {
          title: "Simplify layout",
          body: "One column, standard headings.",
        },
        {
          title: "Quantify",
          body: "Strengthen proof next to each skill claim.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas and “ATS rejecting my resume”",
      paragraphs: [
        "ResumeAtlas gives alignment feedback and estimated match context against a pasted job description. It is not a guarantee you will pass every ATS - no ethical tool can promise that - but it shows likely gaps and formatting risks you can fix before you apply.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "JD-specific comparison.",
        "Missing keyword highlights.",
        "Readability notes.",
        "Human-in-the-loop editing.",
        "Export options.",
        "Saves time vs guesswork.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Designer template with icons; skills in a sidebar table. Candidate worries about ATS rejecting my resume.",
      afterTitle: "After",
      after:
        "Plain layout; skills inline with experience. Same facts, more reliable parsing and clearer keyword placement.",
    },
    cta: {
      heading: "Check before you assume rejection",
      body: "Paste your resume and a target JD into ResumeAtlas. Address top gaps, then submit.",
    },
    faq: [
      {
        question: "Do ATS scores matter?",
        answer:
          "They are one signal. Use them to improve alignment, not as a single score that defines you.",
      },
      {
        question: "Can ATS reject my resume?",
        answer:
          "Systems may filter or rank candidates. Improving fit and parse quality usually helps more than chasing a perfect number.",
      },
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Prioritize the top requirements in the posting; reflect them in summary and bullets.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "Not if you want strong ATS alignment per role.",
      },
    ],
    relatedSlugs: [
      "resume-not-getting-interviews",
      "no-response-after-applying",
      "missing-keywords-in-resume",
      "resume-vs-job-description",
    ],
  },

  "resume-not-passing-ats": {
    slug: "resume-not-passing-ats",
    primaryKeyword: "resume not passing ATS",
    metaTitle: "Resume Not Passing ATS? Alignment, Keywords & Format Fixes | ResumeAtlas",
    metaDescription:
      "If your resume is not passing ATS checks, fix keyword alignment, structure, and proof. Practical steps and ResumeAtlas alignment feedback - no guaranteed scores.",
    h1: "Resume Not Passing ATS - Fix Alignment Before You Chase Another Template",
    hook: [
      "When your resume is not passing ATS checks, the instinct is to download a new theme. Often the issue is content overlap with the job description and whether machines can read your text at all.",
      "Below: why resume not passing ATS happens, mistakes people make, and a practical fix path.",
    ],
    rootCauses: {
      heading: "Why resume not passing ATS is a common complaint",
      intro:
        "“Passing” depends on employer settings. You can still improve typical drivers of low scores.",
      bullets: [
        {
          title: "Resume not aligned to job description",
          text: "Low overlap reads as poor fit.",
        },
        {
          title: "Missing keywords",
          text: "Required terms absent from skills and experience.",
        },
        {
          title: "Generic resume",
          text: "Broad wording scores weakly against specific postings.",
        },
        {
          title: "Weak impact bullets",
          text: "Thin bullets undermine strong keyword lists.",
        },
        {
          title: "Parsing issues",
          text: "Complex PDFs or layouts garble content.",
        },
        {
          title: "Role mismatch",
          text: "Seniority or domain off without explanation.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes",
      intro: "When resume not passing ATS, avoid:",
      bullets: [
        "Buying “100% ATS guaranteed” claims.",
        "Stuffing keywords without evidence.",
        "Ignoring the actual posting you want.",
      ],
    },
    whatWorks: {
      heading: "What works",
      steps: [
        {
          title: "Tailor resume per JD",
          body: "Match language and emphasis.",
        },
        {
          title: "Extract keywords",
          body: "From must-have and nice-to-have sections.",
        },
        {
          title: "Align experience",
          body: "Prove each major keyword with a bullet.",
        },
        {
          title: "Reorder for relevance",
          body: "Most relevant role first, strongest bullets first.",
        },
        {
          title: "Quantify impact",
          body: "Numbers increase credibility next to skills.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas for resume not passing ATS",
      paragraphs: [
        "Get alignment feedback and likely keyword gaps against a real job description. We help you understand estimated match and readability - not a universal pass/fail for every employer.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Posting-specific analysis.",
        "Missing requirement highlights.",
        "Faster tailoring.",
        "Manual control after suggestions.",
        "Export to standard formats.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Resume not passing ATS on multiple applications using one generic file.",
      afterTitle: "After",
      after:
        "Per-posting tweaks raise overlap: same core resume, adjusted summary and five bullets.",
    },
    cta: {
      heading: "Try one job",
      body: "Run ResumeAtlas on your next priority role and fix the listed gaps first.",
    },
    faq: [
      {
        question: "Do ATS scores matter?",
        answer:
          "They are a useful guide for alignment. Employers set their own bars.",
      },
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Edit top sections first; use a gap list from a JD comparison.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "It usually hurts ATS alignment for specialized roles.",
      },
      {
        question: "Why am I not getting interviews?",
        answer:
          "ATS alignment is one factor; fit and competition matter too.",
      },
    ],
    relatedSlugs: [
      "ats-rejecting-my-resume",
      "missing-keywords-in-resume",
      "how-to-tailor-resume-to-job-description",
      "applied-to-200-jobs-no-response",
    ],
  },

  "missing-keywords-in-resume": {
    slug: "missing-keywords-in-resume",
    primaryKeyword: "missing keywords in resume",
    metaTitle: "Missing Keywords in Resume? Find the Exact Gaps in One Scan | ResumeAtlas",
    metaDescription:
      "Missing keywords in resume often cost interviews. Learn how to pull terms from the job description, place them credibly, and check gaps with ResumeAtlas.",
    h1: "Missing Keywords in Resume - How to Find Them Without Turning Into a Word Salad",
    hook: [
      "If you have missing keywords in resume files compared to the posting, ATS and recruiters may assume you lack skills you actually have - you just never said them in the right place.",
      "This guide covers how to spot missing keywords in resume drafts, place them next to proof, and avoid lazy stuffing.",
    ],
    rootCauses: {
      heading: "Why missing keywords in resume matters",
      intro:
        "Systems and humans scan for overlap. Gaps read as “no.”",
      bullets: [
        {
          title: "Resume not aligned to job description",
          text: "Different vocabulary for the same work creates false gaps.",
        },
        {
          title: "Keywords only in a skills cloud",
          text: "Without bullets, missing keywords in resume body still look thin.",
        },
        {
          title: "Generic resume",
          text: "You never imported the posting’s language.",
        },
        {
          title: "Weak impact bullets",
          text: "Even with keywords, empty bullets fail persuasion.",
        },
        {
          title: "ATS parsing",
          text: "If text is hidden in graphics, keywords never count.",
        },
        {
          title: "Role mismatch framing",
          text: "You need bridge phrases when titles differ.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes",
      intro: "Fixing missing keywords in resume the wrong way:",
      bullets: [
        "Dumping a block of terms at the bottom.",
        "Adding tools you cannot discuss.",
        "Ignoring synonyms the employer uses.",
      ],
    },
    whatWorks: {
      heading: "What works",
      steps: [
        {
          title: "Tailor resume using the job description",
          body: "Highlight repeated and must-have phrases.",
        },
        {
          title: "Extract keywords into a checklist",
          body: "Map each to a bullet or skill line.",
        },
        {
          title: "Align experience",
          body: "Rewrite bullets to include terms naturally.",
        },
        {
          title: "Reorder",
          body: "Put JD-aligned wins first.",
        },
        {
          title: "Quantify",
          body: "Pair keywords with outcomes.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas for missing keywords in resume",
      paragraphs: [
        "Compare your resume to a job description to see likely missing keywords and alignment gaps. Use it as a checklist, then edit manually so every term is truthful.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Clear gap list for the specific posting.",
        "Less time hunting terms by eye.",
        "Alignment feedback beyond raw keyword count.",
        "Export when done.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Missing keywords in resume: posting says “Snowflake,” resume only says “data warehouses.”",
      afterTitle: "After",
      after:
        "One bullet cites migration work on Snowflake with a metric - honest and visible overlap.",
    },
    cta: {
      heading: "Close the gaps",
      body: "Paste a JD you care about and fix missing keywords in resume sections where you have proof.",
    },
    faq: [
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Start with keyword coverage in summary and three bullets, then widen.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They reflect overlap among other signals. Strong honest keywords help.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "You will often carry missing keywords in resume for each distinct posting.",
      },
      {
        question: "Why am I not getting interviews?",
        answer:
          "Keyword gaps are one common reason; fit and proof matter too.",
      },
    ],
    relatedSlugs: [
      "resume-not-getting-interviews",
      "no-response-after-applying",
      "ats-rejecting-my-resume",
      "resume-vs-job-description",
    ],
  },

  "how-to-tailor-resume-to-job-description": {
    slug: "how-to-tailor-resume-to-job-description",
    primaryKeyword: "how to tailor resume to job description",
    metaTitle:
      "How to Tailor Resume to Job Description (2026): Step-by-Step ATS Method | ResumeAtlas",
    metaDescription:
      "Learn how to tailor your resume to a job description in 2026: extract required keywords, map must-haves to proof bullets, reorder for relevance, and validate ATS gaps before you apply.",
    h1: "How to Tailor Your Resume to a Job Description (Fast, Honest, Repeatable)",
    hook: [
      "Tailoring is not rewriting from zero. It is a structured match process: map one posting's must-haves to your real evidence and make relevance obvious in the top half of your resume.",
      "Use this method for every new application when you search how to tailor resume to job description, compare resume to job posting, or optimize resume for ATS screening.",
    ],
    rootCauses: {
      heading: "Why tailoring beats a generic file",
      intro:
        "Generic resumes lose on relevance before recruiters read deeply.",
      bullets: [
        {
          title: "Weak requirement-to-proof mapping",
          text: "Recruiters need to see each must-have mapped to concrete evidence fast.",
        },
        {
          title: "Missing required keywords",
          text: "Important role terms never appear in summary, skills, or top bullets.",
        },
        {
          title: "One-size-fits-all story",
          text: "The same resume for every role hides your strongest job-specific fit.",
        },
        {
          title: "Bullets without outcomes",
          text: "Claims are not backed by measurable business or delivery impact.",
        },
        {
          title: "ATS ranking drag",
          text: "Low overlap with posting language reduces shortlist probability.",
        },
        {
          title: "Unclear seniority or domain fit",
          text: "Missing bridge language makes your background look off-target.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes",
      intro: "When learning how to tailor resume to job description, avoid:",
      bullets: [
        "Copying job description text word-for-word without proof.",
        "Changing titles or scope to fake fit.",
        "Editing summary only and leaving core bullets unchanged.",
      ],
    },
    whatWorks: {
      heading: "Step-by-step: how to tailor resume to job description",
      steps: [
        {
          title: "Extract must-haves in 5 minutes",
          body: "Mark required skills, tools, ownership terms, and outcomes from the posting.",
        },
        {
          title: "Build a keyword map",
          body: "Group terms into tools, methods, domain language, and communication signals.",
        },
        {
          title: "Map each requirement to proof",
          body: "For every must-have, add one truthful bullet or skill line showing evidence.",
        },
        {
          title: "Reorder for relevance",
          body: "Move the most role-relevant bullets and skills into the top half of the resume.",
        },
        {
          title: "Quantify outcomes",
          body: "Attach clear metrics, scope, or quality impact to tailored claims.",
        },
        {
          title: "Validate ATS and skim-read",
          body: "Run a JD match check, then skim your resume in 30 seconds for clarity and fit.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas speeds up how to tailor resume to job description",
      paragraphs: [
        "Paste one posting and your resume to get keyword gaps, requirement mismatch signals, and priority fixes. You still control wording and truthfulness; ResumeAtlas highlights where your draft diverges from the JD.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Checklist-driven tailoring.",
        "Highlights missing requirements automatically.",
        "AI-assisted suggestions with manual editing.",
        "PDF/DOCX export.",
        "Saves time versus unstructured rewrites.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Candidate applies to a senior backend role with a generic engineer resume and gets no replies.",
      afterTitle: "After",
      after:
        "Summary and top bullets are rewritten around APIs, CI/CD reliability, on-call ownership, and impact metrics used in the posting.",
    },
    cta: {
      heading: "Tailor the next application",
      body: "Use one real job description in ResumeAtlas, apply the highest-impact gap fixes, and submit a targeted resume version.",
    },
    faq: [
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Use a 30-minute pass: extract must-have terms, update summary/skills, rewrite top 3 bullets with proof, and validate match before sending.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "You can use a master file, but export a tailored version per application.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They are directional. Use ATS-style scores to compare versions and confirm that tailoring improved overlap with the posting.",
      },
      {
        question: "Why am I not getting interviews?",
        answer:
          "Weak tailoring is a frequent cause.",
      },
    ],
    relatedSlugs: [
      "resume-vs-job-description",
      "missing-keywords-in-resume",
      "resume-not-getting-interviews",
      "no-response-after-applying",
    ],
  },

  "resume-vs-job-description": {
    slug: "resume-vs-job-description",
    primaryKeyword: "resume vs job description",
    metaTitle:
      "Resume vs Job Description (2026): Compare, Match Keywords & Fix Gaps | ResumeAtlas",
    metaDescription:
      "Compare your resume to a job description and see alignment gaps: missing keywords, weak evidence, and ordering mistakes. Practical 2026 framework to tailor honestly before applying.",
    h1: "Resume vs Job Description: How to Compare, Match Keywords, and Improve Fit",
    hook: [
      "Treat resume vs job description as a side-by-side matching exercise, not a generic writing task. You are proving fit to one posting, fast.",
      "Use this page when you are unsure which bullets to rewrite first, which keywords matter most, and how to improve ATS alignment without keyword stuffing.",
    ],
    rootCauses: {
      heading: "Why resume vs job description alignment matters",
      intro:
        "The comparison is blunt: overlap wins early rounds.",
      bullets: [
        {
          title: "Resume not aligned to job description",
          text: "Gaps in resume vs job description reading cost shortlists.",
        },
        {
          title: "Missing keywords",
          text: "Different words for the same skill create false negatives.",
        },
        {
          title: "Generic resume",
          text: "Broad file loses resume vs job description battles for niche roles.",
        },
        {
          title: "Weak bullets",
          text: "Keywords without proof lose to candidates who show both.",
        },
        {
          title: "ATS",
          text: "Automated resume vs job description scoring amplifies small gaps.",
        },
        {
          title: "Role mismatch",
          text: "You must bridge titles with one crisp line.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes",
      intro: "Weak resume vs job description work looks like:",
      bullets: [
        "Only reading the job title, not responsibilities.",
        "Ignoring must-have tools.",
        "Assuming the cover letter fixes a misaligned resume.",
      ],
    },
    whatWorks: {
      heading: "What works",
      steps: [
        {
          title: "Side-by-side compare",
          body: "Open resume and job description next to each other.",
        },
        {
          title: "Extract keywords",
          body: "Highlight repeated phrases.",
        },
        {
          title: "Map requirements to bullets",
          body: "Every must-have gets evidence or an honest gap plan.",
        },
        {
          title: "Reorder",
          body: "Match their priority order.",
        },
        {
          title: "Quantify",
          body: "Strengthen each mapped bullet.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas for resume vs job description checks",
      paragraphs: [
        "Automate part of the comparison: likely gaps, alignment feedback, and keyword coverage for this posting. You still decide what to claim.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Structured resume vs job description view.",
        "Saves manual highlighting.",
        "Clearer next edits.",
        "Export options.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Resume vs job description: posting emphasizes “growth experiments”; resume only says “marketing.”",
      afterTitle: "After",
      after:
        "Bullets cite experiments, channels, and lift metrics using their vocabulary.",
    },
    cta: {
      heading: "Run the comparison",
      body: "Paste a posting into ResumeAtlas with your resume and close resume vs job description gaps you agree with.",
    },
    faq: [
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Focus on the top five requirements in the job description first.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They approximate automated resume vs job description overlap.",
      },
      {
        question: "Why am I not getting interviews?",
        answer:
          "Misalignment between resume vs job description is a frequent cause.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "You will fight resume vs job description mismatch on every different spec.",
      },
    ],
    relatedSlugs: [
      "resume-not-getting-interviews",
      "no-response-after-applying",
      "ats-rejecting-my-resume",
      "missing-keywords-in-resume",
    ],
  },

  "why-recruiters-ignore-resume": {
    slug: "why-recruiters-ignore-resume",
    primaryKeyword: "why recruiters ignore resume",
    metaTitle: "Why Recruiters Ignore Resumes (Skim Time, Fit & Clarity) | ResumeAtlas",
    metaDescription:
      "Why recruiters ignore resume files: weak fit, dense text, missing keywords, or red flags. Learn fixes and how ResumeAtlas tightens alignment before you apply.",
    h1: "Why Recruiters Ignore Resume Files - It Is Usually Skim Time, Not Malice",
    hook: [
      "If you wonder why recruiters ignore resume submissions, remember they often have seconds per file. Ignoring is often “could not see fit fast enough,” not a personal verdict.",
      "Combine that with pipeline volume and you get silence. Here is how to reduce reasons recruiters ignore resume drafts that actually represent you well.",
    ],
    rootCauses: {
      heading: "Why recruiters ignore resume applications",
      intro:
        "Human and automated filters both reward clarity.",
      bullets: [
        {
          title: "Resume not aligned to job description",
          text: "If fit is not obvious, they move on.",
        },
        {
          title: "Missing keywords",
          text: "Skim fails when expected terms are absent.",
        },
        {
          title: "Generic resume",
          text: "Nothing hooks attention in the first screen.",
        },
        {
          title: "Weak impact bullets",
          text: "Blurry outcomes blend into noise.",
        },
        {
          title: "ATS issues",
          text: "Some recruiters never see mangled parses.",
        },
        {
          title: "Role mismatch",
          text: "Without framing, you look off-target.",
        },
      ],
    },
    mistakes: {
      heading: "Mistakes",
      intro: "Patterns that increase why recruiters ignore resume files:",
      bullets: [
        "Wall of text with no hierarchy.",
        "Burying the target role at the bottom.",
        "Jargon from a different industry with no translation.",
        "Typos in key terms from the posting.",
      ],
    },
    whatWorks: {
      heading: "What works",
      steps: [
        {
          title: "Tailor resume per JD",
          body: "Match language in the first third of page one.",
        },
        {
          title: "Extract keywords",
          body: "So skimmers see expected terms early.",
        },
        {
          title: "Align experience",
          body: "Front-load relevant roles.",
        },
        {
          title: "Reorder",
          body: "Strongest proof first.",
        },
        {
          title: "Quantify impact",
          body: "Numbers pop in skims.",
        },
      ],
    },
    resumeAtlas: {
      heading: "ResumeAtlas",
      paragraphs: [
        "Tighten alignment with a specific posting so the first skim has hooks: keywords, proof, and structure recruiters and systems expect. Alignment feedback helps; outcomes still depend on the full process.",
      ],
    },
    benefits: {
      heading: "Benefits",
      items: [
        "Faster tailoring for each posting.",
        "Gap visibility before submit.",
        "Manual edits after suggestions.",
        "Download PDF or DOCX.",
        "More confidence before applying again.",
      ],
    },
    scenario: {
      heading: "Example",
      beforeTitle: "Before",
      before:
        "Dense paragraph format; reasons recruiters ignore resume skims pile up.",
      afterTitle: "After",
      after:
        "Short summary, scannable bullets, metrics in the first half of page one.",
    },
    cta: {
      heading: "Make the skim work for you",
      body: "Run ResumeAtlas with a real posting, fix top gaps, then reapply with a clearer first screen.",
    },
    faq: [
      {
        question: "Why am I not getting interviews?",
        answer:
          "Recruiters may pass if fit and proof are not instant; improving tailoring helps.",
      },
      {
        question: "Do ATS scores matter?",
        answer:
          "They matter alongside human skim. Both like clarity and overlap.",
      },
      {
        question: "How to tailor a resume quickly?",
        answer:
          "Focus on headline, summary, and three bullets per target role.",
      },
      {
        question: "Can I use one resume for all jobs?",
        answer:
          "Rarely optimal for skims tailored to different specs.",
      },
    ],
    relatedSlugs: [
      "resume-not-getting-interviews",
      "no-response-after-applying",
      "applied-to-200-jobs-no-response",
      "how-to-tailor-resume-to-job-description",
    ],
  },
};

/** Safe navigation label for a problem page */
export function problemPageLinkLabel(slug: ProblemSlug): string {
  return PROBLEM_PAGES[slug].h1.replace(/ - .*$/, "").trim();
}

/** Labels for related links: query-style phrase (primaryKeyword) for cluster UX + SEO. */
export function getRelatedProblemEntries(
  slug: ProblemSlug
): { slug: ProblemSlug; label: string }[] {
  const allowed = new Set<string>(INDEXED_PROBLEM_SLUGS);
  return PROBLEM_PAGES[slug].relatedSlugs
    .filter((s) => allowed.has(s) && s !== slug)
    .map((s) => ({
      slug: s,
      label: PROBLEM_PAGES[s].primaryKeyword,
    }));
}
