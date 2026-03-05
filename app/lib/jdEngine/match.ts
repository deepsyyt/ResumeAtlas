import { normalizeText } from "./normalize";
import type { JDCategories } from "./extractRequirements";

export type JDMatchResultEngine = {
  jd_match: number;
  matched_count: number;
  total_required: number;
  missing: {
    critical_missing: string[];
    supporting_missing: string[];
    optional_missing: string[];
  };
};

export function computeJDMatch(
  resumeText: string,
  jdCategories: JDCategories
): JDMatchResultEngine {
  const normalizedResume = normalizeText(resumeText);

  const allRequirements = Array.from(
    new Set(
      [
        ...jdCategories.technical_skills,
        ...jdCategories.tools_technologies,
        ...jdCategories.certifications,
        ...jdCategories.domain_expertise,
        ...jdCategories.explicit_soft_skills,
      ].filter(Boolean)
    )
  );

  // Helper: consider a requirement "present" if ANY meaningful token from it
  // appears in the normalized resume text (fuzzy, concept-level match).
  const isReqPresent = (req: string): boolean => {
    const normalizedReq = normalizeText(req);
    if (!normalizedReq) return false;
    const tokens = normalizedReq.split(" ").filter((t) => t.length >= 3);
    if (!tokens.length) return false;
    return tokens.some((t) => normalizedResume.includes(t));
  };

  let matched = 0;
  for (const req of allRequirements) {
    if (!req) continue;
    if (isReqPresent(req)) matched += 1;
  }

  const total = allRequirements.length;
  const jd_match = total === 0 ? 0 : Math.round((matched / total) * 100);

  const critical_missing: string[] = [];
  const supporting_missing: string[] = [];
  const optional_missing: string[] = [];

  const checkMissing = (items: string[], bucket: string[]) => {
    for (const item of items) {
      if (!item) continue;
      if (!isReqPresent(item)) {
        bucket.push(item);
      }
    }
  };

  checkMissing(
    [
      ...jdCategories.technical_skills,
      ...jdCategories.tools_technologies,
      ...jdCategories.certifications,
    ],
    critical_missing
  );

  checkMissing(jdCategories.domain_expertise, supporting_missing);
  checkMissing(jdCategories.explicit_soft_skills, optional_missing);

  return {
    jd_match,
    matched_count: matched,
    total_required: total,
    missing: {
      critical_missing,
      supporting_missing,
      optional_missing,
    },
  };
}

