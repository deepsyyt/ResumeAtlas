type KeywordApplicationModuleProps = {
  keywordMistakes?: string[];
};

export function KeywordApplicationModule({ keywordMistakes }: KeywordApplicationModuleProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
        How to use these keywords in your resume
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
        <li>
          Place role-relevant keywords in your <strong>summary</strong>, <strong>skills</strong>,{" "}
          <strong>experience bullets</strong>, and <strong>projects</strong>.
        </li>
        <li>Use ~25-35 relevant keywords naturally across the full resume.</li>
        <li>
          Avoid keyword stuffing. Keywords should appear inside outcome-based bullet points, not as repeated
          lists.
        </li>
      </ul>

      <h3 className="mt-8 text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
        How ATS uses keywords
      </h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
        <li>ATS compares your resume to the job description for keyword overlap and context.</li>
        <li>
          Keywords inside clear bullets usually carry more value than dumping terms in a long skills list.
        </li>
        <li>
          Strong match signals come from pairing keywords with scope and measurable impact language.
        </li>
      </ul>

      {keywordMistakes?.length ? (
        <>
          <h3 className="mt-8 text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            Common keyword mistakes
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm sm:text-base text-slate-700">
            {keywordMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
