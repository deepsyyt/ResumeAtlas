import { PROBLEM_SLUGS, type ProblemSlug } from "@/app/lib/problemPages";

/** Visitor intent — drives tone, preview emphasis, and CTAs */
export type ProblemIntent = "frustration" | "diagnostic" | "technical" | "tactical" | "comparison";

/** What the product preview visually emphasizes */
export type PreviewEmphasis = "keywords" | "ats" | "alignment" | "overall-gaps";

export type ProblemLandingVariant = {
  intent: ProblemIntent;
  previewEmphasis: PreviewEmphasis;
  previewTitle: string;
  previewSubtitle: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroSupportLine: string;
  bridgeTitle: string;
  bridgeLead: string;
  /** Sets empathy vs analysis vs action before root-causes */
  problemToneIntro: string;
  cta: {
    hero: string;
    afterProblem: string;
    afterBenefits: string;
    afterBeforeAfter: string;
    bottomPrimary: string;
    bottomSecondary: string;
  };
  uniqueSection: {
    title: string;
    paragraphs: string[];
  };
};

/** Shallow copy shape for hub cards (backward compat) */
export type ProblemConversionCopy = Pick<
  ProblemLandingVariant,
  "heroHeadline" | "heroSubheadline" | "heroSupportLine" | "bridgeTitle" | "bridgeLead"
>;

export const PROBLEM_LANDING_VARIANTS: Record<ProblemSlug, ProblemLandingVariant> = {
  "applied-to-200-jobs-no-response": {
    intent: "frustration",
    previewEmphasis: "overall-gaps",
    previewTitle: "See your score and every gap for this posting",
    previewSubtitle:
      "One dashboard for estimated ATS alignment, missing terms, coverage, and stronger bullets so you stop guessing after dozens of silent applications.",
    heroEyebrow: "When volume applying backfires",
    heroHeadline: "Applied to 200 jobs and heard nothing? Your resume probably never matched the role.",
    heroSubheadline:
      "Paste one job you actually want plus your resume. Surface missing keywords, ATS-style issues, and flat bullets. Get rewrites tuned to that posting while your real experience stays intact.",
    heroSupportLine:
      "You are not failing as a candidate. You are submitting a generic file into targeted filters. Edit everything, adjust tone, export PDF or DOCX, then apply with proof of fit.",
    bridgeTitle: "Why spray-and-pray stops working",
    bridgeLead:
      "The same bullets and keywords for every company read as a weak match every time. Recruiters and ATS weight overlap with each specific posting. Here is what usually breaks first.",
    problemToneIntro:
      "If you are exhausted from applications with no reply, you are not alone. The patterns below are fixable, and they are about presentation and fit on paper, not your worth.",
    cta: {
      hero: "Fix my resume for this job",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Check my resume against a job",
      afterBeforeAfter: "Fix my resume now",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "Why applying to hundreds of jobs often fails",
      paragraphs: [
        "Each posting is a different spec. When one resume goes out hundreds of times, it rarely mirrors the language, tools, and outcomes each employer emphasized.",
        "ATS and first-pass screens reward overlap with that job description. Volume without tailoring usually repeats the same miss at scale, which feels like bad luck but is predictable.",
        "ResumeAtlas flips the loop: pick a target job, compare, close gaps for that posting, then repeat for the next role with a fresh pass instead of another blind send.",
      ],
    },
  },

  "resume-not-getting-interviews": {
    intent: "diagnostic",
    previewEmphasis: "overall-gaps",
    previewTitle: "Diagnose fit: score, gaps, and bullet fixes",
    previewSubtitle:
      "A single view of how your resume lines up with one job description so you can see what is missing before you blame the market.",
    heroEyebrow: "Interview pipeline starts on paper",
    heroHeadline: "Resume not getting interviews? See exactly what the posting is not seeing.",
    heroSubheadline:
      "Structured compare: your resume vs a real JD. Missing keywords, thin bullets, ATS-style readouts, and suggested rewrites grounded in work you actually did.",
    heroSupportLine:
      "Diagnostic, not demoralizing. Edit any line, tune voice, accept or reject AI output, then download when it reflects you.",
    bridgeTitle: "Why interviews stall",
    bridgeLead:
      "Shortlists favor obvious overlap with the role. If your resume hides that overlap, you rarely get the conversation. Here is what typically fails first.",
    problemToneIntro:
      "Use the checklist below like a report: each item is a hypothesis you can verify against a real job description, not a judgment about you.",
    cta: {
      hero: "Check my resume",
      afterProblem: "Compare resume with job description",
      afterBenefits: "See what is missing",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Fix my resume",
    },
    uniqueSection: {
      title: "What blocks interviews first",
      paragraphs: [
        "Most screens happen before a human reads your story. Systems and recruiters look for vocabulary overlap, proof in bullets, and a layout they can parse in seconds.",
        "When those signals are weak, you can be qualified and still never reach a phone screen. The gap is usually visible once you compare side by side with the posting.",
        "ResumeAtlas makes that comparison explicit: what the JD asks for, what your file shows, and where to tighten language without inventing experience.",
      ],
    },
  },

  "why-am-i-not-getting-interviews": {
    intent: "diagnostic",
    previewEmphasis: "overall-gaps",
    previewTitle: "Map your resume to what employers scan for",
    previewSubtitle:
      "Estimated alignment, missing keywords, coverage vs the JD, and bullet upgrades in one place so you can answer why replies are low with data, not guesswork.",
    heroEyebrow: "Answer the why with evidence",
    heroHeadline: "Why am I not getting interviews? Start with what your resume is not proving.",
    heroSubheadline:
      "Run your resume against a real job description: gap list, ATS-style notes, and AI drafts that use the employer language where it matches your history.",
    heroSupportLine:
      "No vague advice. Edit every suggestion, adjust tone, export PDF or DOCX when the draft matches the role and your truth.",
    bridgeTitle: "What the first screen usually measures",
    bridgeLead:
      "Replies drop when fit is unclear on paper or keywords never appear where ATS expects them. These are the patterns we see most often.",
    problemToneIntro:
      "Treat this section as a structured readout. For each point, ask: does my resume show this clearly for the job I pasted?",
    cta: {
      hero: "Check my resume",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Run a gap analysis",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "What we look at first",
      paragraphs: [
        "Hiring teams and systems compress your file into a few signals: role fit, tool and domain keywords, measurable outcomes, and whether the layout parses cleanly.",
        "If those signals are scattered or missing, you look like a weaker match than you are. Comparing against one JD at a time turns vague anxiety into a fix list.",
        "ResumeAtlas surfaces that list automatically so you spend time editing, not hunting through the posting for the tenth time.",
      ],
    },
  },

  "no-response-after-applying": {
    intent: "frustration",
    previewEmphasis: "overall-gaps",
    previewTitle: "Your overall fit score and what is still missing",
    previewSubtitle:
      "See estimated ATS alignment plus concrete gaps for the job you applied to so silence is less mysterious and more actionable.",
    heroEyebrow: "When the inbox stays quiet",
    heroHeadline: "Applied to jobs but heard nothing? See why your resume gets ignored.",
    heroSubheadline:
      "Paste the posting and your resume. Get keyword gaps, ATS-style feedback, and stronger bullets aligned to that role before you send more applications into the void.",
    heroSupportLine:
      "Sometimes timing or internal hires explain silence. When it keeps happening, materials matter. You keep full edit control and export when you are ready.",
    bridgeTitle: "Why silence is often a mismatch signal",
    bridgeLead:
      "Not every non-reply is your fault. When the pattern repeats, your resume often loses on keyword fit, proof, or parsing before a human compares stories.",
    problemToneIntro:
      "If this has been discouraging, that is normal. The goal here is a concrete check you can run once per job, not another lecture about hustle.",
    cta: {
      hero: "Compare resume with job description",
      afterProblem: "Fix my resume for this role",
      afterBenefits: "Check my resume",
      afterBeforeAfter: "Compare resume with job description",
      bottomPrimary: "Fix my resume",
      bottomSecondary: "Compare resume with job description",
    },
    uniqueSection: {
      title: "When silence usually means mismatch",
      paragraphs: [
        "Employers often filter on job-description overlap before they invest in a conversation. If your file reads generic or omits must-have terms, you may never reach the human stage.",
        "That can happen even when you have the skills, because those skills were never written in the language of the posting.",
        "A targeted compare fixes the signal: show the overlap explicitly, back it with bullets, and resubmit with a document built for that application.",
      ],
    },
  },

  "ats-rejecting-my-resume": {
    intent: "technical",
    previewEmphasis: "ats",
    previewTitle: "ATS alignment score and parsing risk, first",
    previewSubtitle:
      "Put estimated pass strength and formatting risk up front, then drill into missing keywords and bullet fixes for this exact job.",
    heroEyebrow: "ATS and keyword reality",
    heroHeadline: "ATS rejecting your resume? Check what fails before you apply again.",
    heroSubheadline:
      "Compare resume to the JD for coverage, structure, and bullet quality. AI aligns phrasing to the posting without inventing employers, tools, or metrics.",
    heroSupportLine:
      "You approve every change. Tweak tone, fix sections manually, export a clean PDF or DOCX for applicant portals.",
    bridgeTitle: "What ATS rejection usually means",
    bridgeLead:
      "Often it is low estimated match, missing required terms, or text extraction problems. Different vendors score differently, but the levers are similar.",
    problemToneIntro:
      "Below is a structured breakdown of common technical and keyword failure modes. Use it like a checklist against your file and one target posting.",
    cta: {
      hero: "Check ATS fit for this job",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Run ATS-style analysis",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "How applicant tracking systems use your resume",
      paragraphs: [
        "Most ATS extract text into fields: experience, education, skills. They score or filter using keyword overlap with the requisition and whether headings and dates parsed correctly.",
        "Graphics-heavy layouts, tables in the wrong place, or odd section titles can garble extraction. Even a strong background can score low if the system misreads titles or dates.",
        "Keyword alignment still matters: if must-have tools only live in a footer, you can look under-qualified compared with someone who mirrored the JD in bullets.",
        "ResumeAtlas is built around that stack: readability-style notes plus JD comparison so you fix both parsing risk and vocabulary fit.",
      ],
    },
  },

  "resume-not-passing-ats": {
    intent: "technical",
    previewEmphasis: "ats",
    previewTitle: "ATS score and what is dragging it down",
    previewSubtitle:
      "Lead with estimated ATS alignment and structure signals, then tighten keywords and bullets for the specific role you target.",
    heroEyebrow: "ATS screening, demystified",
    heroHeadline: "Resume not passing ATS? Tighten structure, keywords, and proof for this job.",
    heroSubheadline:
      "Line your resume up with one job description: see coverage gaps, format risks, and AI-assisted bullet rewrites. Edit until the file is accurate and machine-readable.",
    heroSupportLine:
      "No universal pass guarantee, but you can improve fit and parseability. Full manual control before PDF or DOCX export.",
    bridgeTitle: "ATS and your resume: a practical view",
    bridgeLead:
      "Employers use different systems and weights. Focus on stronger keyword fit, standard sections, and clear impact so your content survives automated passes more often.",
    problemToneIntro:
      "These factors are measurable: term overlap, section clarity, and whether your achievements are expressed in a way parsers and recruiters can capture.",
    cta: {
      hero: "Check ATS alignment",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Improve my ATS score",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "What passing ATS usually means",
      paragraphs: [
        "Passing is rarely a single yes or no. Most setups estimate match strength, check required skills, and rely on clean text extraction from your file.",
        "Improving outcomes usually means mirroring the job description where honest, placing keywords in experience bullets, and avoiding layouts that break copy-paste or parsing.",
        "ResumeAtlas combines JD comparison with ATS-oriented feedback so you address vocabulary and structure in one pass instead of guessing from a template blog.",
      ],
    },
  },

  "missing-keywords-in-resume": {
    intent: "tactical",
    previewEmphasis: "keywords",
    previewTitle: "Missing keywords surfaced next to your bullets",
    previewSubtitle:
      "Prioritize gap chips and coverage vs the JD, then upgrade bullets so terms appear with proof, not stuffing.",
    heroEyebrow: "Keyword gaps, closed fast",
    heroHeadline: "Missing keywords in your resume? Find the exact gaps in one scan.",
    heroSubheadline:
      "Side-by-side compare lists absent or thin terms from the posting. AI weaves them into bullets only where they match your work, and flags ATS-style issues.",
    heroSupportLine:
      "You edit every line. No keyword dumps without evidence. Export when the resume reads natural and defensible in an interview.",
    bridgeTitle: "Why keyword gaps cost shortlists",
    bridgeLead:
      "If the posting names tools, domains, or outcomes you have but never wrote, you can look like a non-match. Evidence-backed wording fixes that.",
    problemToneIntro:
      "Use the steps below tactically: extract terms from the JD, map each to a bullet or skill line you can defend, then ship.",
    cta: {
      hero: "Find missing keywords",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Map keywords to my bullets",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "Where keywords matter on your resume",
      paragraphs: [
        "ATS and recruiters weight terms in context: summary, skills, and especially experience bullets. A footer list without proof reads weaker than the same term inside a shipped outcome.",
        "Repeating words without substance can hurt you with humans and some systems. The win is mirroring the employer vocabulary where it honestly describes your work.",
        "ResumeAtlas highlights gaps against the JD and helps you place language where it belongs, then lets you rewrite until it sounds like you.",
      ],
    },
  },

  "how-to-tailor-resume-to-job-description": {
    intent: "tactical",
    previewEmphasis: "alignment",
    previewTitle: "Resume vs job description: overlap at a glance",
    previewSubtitle:
      "See how your file lines up with the posting: keyword overlap, coverage bar, and bullet rewrites that echo the JD without inventing history.",
    heroEyebrow: "Tailoring without the grind",
    heroHeadline: "Tailor your resume to any job in minutes, not hours.",
    heroSubheadline:
      "Paste resume + JD. ATS-style scoring, missing keywords, and aligned bullet drafts. Stop rereading the posting line by line every time.",
    heroSupportLine:
      "Your base experience stays intact. Refine tone, rewrite sections, export PDF or DOCX in one guided flow.",
    bridgeTitle: "From one master resume to a targeted send",
    bridgeLead:
      "Tailoring is repetitive work: extract terms, remap bullets, recheck ATS. Automate the heavy lifting so you spend energy on judgment, not busywork.",
    problemToneIntro:
      "Follow the playbook below when you need a repeatable routine: pick the JD, mirror language honestly, quantify, then verify parseability.",
    cta: {
      hero: "Tailor my resume now",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Speed up tailoring",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "The fastest way to mirror a job description",
      paragraphs: [
        "Start from a solid master resume. For each application, duplicate and adjust summary, skills, and the bullets that best match the posting.",
        "Pull repeated nouns and phrases from the JD: tools, methodologies, customer type. Map each to evidence in your experience before you add a single new line.",
        "ResumeAtlas accelerates that mapping: it lists likely gaps and suggests wording, while you decide what stays true before export.",
      ],
    },
  },

  "resume-vs-job-description": {
    intent: "comparison",
    previewEmphasis: "alignment",
    previewTitle: "Side-by-side alignment: resume and JD",
    previewSubtitle:
      "Visualize overlap: coverage vs the posting, missing terms, ATS-style readout, and bullets rewritten to echo the job ask.",
    heroEyebrow: "Compare, then close gaps",
    heroHeadline: "Resume vs job description mismatch? Find gaps and fix them fast.",
    heroSubheadline:
      "Instant compare view for keywords, bullets, and structure against what the employer asked for. AI aligns language to the JD while preserving your real history.",
    heroSupportLine:
      "You edit freely: humanize, tighten, or go more technical before PDF or DOCX.",
    bridgeTitle: "What gets compared in the first pass",
    bridgeLead:
      "Teams scan for vocabulary overlap, proof in bullets, and clarity. If your resume does not mirror the ask, you lose before interviews start.",
    problemToneIntro:
      "Use this section as a comparison rubric: for each heading, score your current resume against the posting and note fixes.",
    cta: {
      hero: "Compare resume with job description",
      afterProblem: "Fix alignment gaps",
      afterBenefits: "Check my resume",
      afterBeforeAfter: "Fix my resume",
      bottomPrimary: "Compare resume with job description",
      bottomSecondary: "Check my resume",
    },
    uniqueSection: {
      title: "Side-by-side: your resume and the posting",
      paragraphs: [
        "Employers mentally overlay the job description onto your file. They look for the same tools, outcomes, and seniority cues they wrote into the req.",
        "When those cues are missing or buried, you look like a weaker match than candidates who simply used the posting language accurately.",
        "ResumeAtlas makes the overlay explicit: show the JD, show your resume, list the delta, then rewrite with AI assistance you fully control.",
      ],
    },
  },

  "why-recruiters-ignore-resume": {
    intent: "frustration",
    previewEmphasis: "overall-gaps",
    previewTitle: "Overall score plus every gap hurting your skim",
    previewSubtitle:
      "Recruiters move fast. See alignment, missing keywords, and sharper bullets so your file registers in seconds, not never.",
    heroEyebrow: "When great people get skipped",
    heroHeadline: "Recruiters skimming past your resume? Make the job fit obvious in one pass.",
    heroSubheadline:
      "Match your resume to a real posting: keyword coverage, stronger bullets, ATS-friendly structure. AI tightens role-specific lines you can edit before export.",
    heroSupportLine:
      "Speed without fabrication. Full control over tone and facts. PDF or DOCX when you are done.",
    bridgeTitle: "Why strong candidates still get skipped",
    bridgeLead:
      "Skim time is brutal. Generic openers and duty-list bullets do not compete with resumes that speak the job language in the first screen.",
    problemToneIntro:
      "If you know you are qualified but not getting traction, that disconnect is painful. These points focus on what skimmers actually react to, not blame.",
    cta: {
      hero: "Fix my resume",
      afterProblem: "Compare resume with job description",
      afterBenefits: "Check my resume",
      afterBeforeAfter: "Compare resume with job description",
      bottomPrimary: "Fix my resume",
      bottomSecondary: "Compare resume with job description",
    },
    uniqueSection: {
      title: "Why recruiters skip otherwise qualified resumes",
      paragraphs: [
        "Most first looks last seconds. If the top of the resume does not state role fit and proof in the employer vocabulary, the rest may never be read.",
        "Weak bullets that list tasks without outcomes blend into dozens of similar files. Specificity and metrics are not optional when the pile is deep.",
        "ResumeAtlas helps you compress signal: align to one JD, upgrade bullets, and export a version meant to survive that skim.",
      ],
    },
  },
};

function assertAllSlugs(): void {
  for (const slug of PROBLEM_SLUGS) {
    if (!PROBLEM_LANDING_VARIANTS[slug]) throw new Error(`Missing landing variant for ${slug}`);
  }
}
assertAllSlugs();

export const PROBLEM_CONVERSION: Record<ProblemSlug, ProblemConversionCopy> = Object.fromEntries(
  PROBLEM_SLUGS.map((slug) => {
    const v = PROBLEM_LANDING_VARIANTS[slug];
    const copy: ProblemConversionCopy = {
      heroHeadline: v.heroHeadline,
      heroSubheadline: v.heroSubheadline,
      heroSupportLine: v.heroSupportLine,
      bridgeTitle: v.bridgeTitle,
      bridgeLead: v.bridgeLead,
    };
    return [slug, copy];
  })
) as Record<ProblemSlug, ProblemConversionCopy>;

export function problemToneCalloutClass(intent: ProblemIntent): string {
  switch (intent) {
    case "frustration":
      return "border-rose-200/80 bg-rose-50/50 text-rose-950";
    case "diagnostic":
      return "border-violet-200/80 bg-violet-50/50 text-violet-950";
    case "technical":
      return "border-slate-300 bg-slate-100/60 text-slate-900";
    case "tactical":
      return "border-emerald-200/80 bg-emerald-50/50 text-emerald-950";
    case "comparison":
      return "border-sky-200/80 bg-sky-50/50 text-sky-950";
    default:
      return "border-slate-200 bg-slate-50/60 text-slate-900";
  }
}

export function heroEyebrowClass(intent: ProblemIntent): string {
  switch (intent) {
    case "frustration":
      return "text-rose-800";
    case "diagnostic":
      return "text-violet-800";
    case "technical":
      return "text-slate-600";
    case "tactical":
      return "text-emerald-800";
    case "comparison":
      return "text-sky-800";
    default:
      return "text-sky-700";
  }
}
