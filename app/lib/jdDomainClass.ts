export type JdDomain =
  | "engineering"
  | "data"
  | "product"
  | "project_program"
  | "leadership"
  | "finance_analytics"
  | "operations";

const DOMAIN_PATTERNS: { domain: JdDomain; re: RegExp }[] = [
  {
    domain: "project_program",
    re: /\b(scrum master|agile coach|program manager|project manager|tpm\b|technical program|delivery manager|release train|pi planning)\b/i,
  },
  {
    domain: "finance_analytics",
    re: /\b(fp&a|financial planning|financial analyst|finance manager|accounting|forecast(?:ing)?|budget(?:ing)?|variance analysis|p&l|profit and loss|revenue recognition)\b/i,
  },
  {
    domain: "product",
    re: /\b(product manager|product owner|product management|roadmap|go-to-market|gtm\b|user research|product strategy|prd\b)\b/i,
  },
  {
    domain: "leadership",
    re: /\b(engineering manager|director|head of|vp\b|vice president|people manager|direct reports|org(?:anization)?al leadership|chief \w+ officer)\b/i,
  },
  {
    domain: "data",
    re: /\b(data scientist|machine learning|ml engineer|analytics engineer|statistician|experimentation|a\/b test|mlops|deep learning|nlp\b|computer vision)\b/i,
  },
  {
    domain: "operations",
    re: /\b(operations manager|supply chain|logistics|procurement|warehouse|facilities|business operations|process improvement|six sigma|lean\b)\b/i,
  },
  {
    domain: "engineering",
    re: /\b(software engineer|developer|devops|sre\b|platform engineer|full stack|backend|frontend|infrastructure engineer|systems engineer)\b/i,
  },
];

export function jdDomainLabel(domain: JdDomain | undefined): string {
  switch (domain) {
    case "engineering":
      return "an engineering role";
    case "data":
      return "a data role";
    case "product":
      return "a product role";
    case "project_program":
      return "a project or program role";
    case "leadership":
      return "a leadership role";
    case "finance_analytics":
      return "a finance or analytics role";
    case "operations":
      return "an operations role";
    default:
      return "this role type";
  }
}

/** Classify posting domain from target role title + JD text (heuristic, no LLM). */
export function classifyJdDomain(jobDescription: string, targetRoleTitle?: string): JdDomain {
  const blob = `${targetRoleTitle ?? ""}\n${jobDescription}`.toLowerCase();

  for (const { domain, re } of DOMAIN_PATTERNS) {
    if (re.test(blob)) return domain;
  }

  if (/\b(analyst|analytics|bi\b|tableau|looker|sql\b)\b/i.test(blob)) {
    return "finance_analytics";
  }

  return "engineering";
}
