import {
  extractRequirementsFromJD,
  type JDCategories,
} from "./extractRequirements";
import {
  computeJDMatch,
  type JDMatchResultEngine,
} from "./match";
import { computeATSPassProbability } from "./ats";

export type JDAnalysisResultEngine = JDMatchResultEngine & {
  ats_pass_probability: number;
  jd_categories: JDCategories;
};

export async function computeJDAnalysis(
  resumeText: string,
  jdText: string
): Promise<JDAnalysisResultEngine> {
  const jdCategories = await extractRequirementsFromJD(jdText);

  const { jd_match, matched_count, total_required, missing } = computeJDMatch(
    resumeText,
    jdCategories
  );

  const ats_pass_probability = computeATSPassProbability(
    matched_count,
    total_required
  );

  return {
    jd_match,
    missing,
    ats_pass_probability,
    jd_categories: jdCategories,
  };
}

