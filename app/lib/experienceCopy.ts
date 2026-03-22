/** Human-readable line for the Experience alignment metric card. */
export function buildExperienceAlignmentSubtitle(params: {
  requiredMin: number | null;
  requiredMax: number | null;
  resumeYears: number;
  verdictLabel: string;
}): string {
  const { requiredMin, requiredMax, resumeYears, verdictLabel } = params;
  const y = (n: number) => (n === 1 ? "year" : "years");
  const resumePhrase = `Your resume reflects ~${resumeYears} ${y(resumeYears)} of professional experience`;

  if (requiredMin === null) {
    return `${resumePhrase}. ${verdictLabel}.`;
  }

  let requiredPhrase: string;
  if (requiredMax !== null && requiredMax >= requiredMin) {
    if (requiredMax === requiredMin) {
      requiredPhrase = `${requiredMin} ${y(requiredMin)}`;
    } else {
      requiredPhrase = `${requiredMin} to ${requiredMax} years`;
    }
  } else {
    requiredPhrase = `at least ${requiredMin} ${y(requiredMin)}`;
  }

  return `Required: ${requiredPhrase}. ${resumePhrase}. ${verdictLabel}.`;
}
