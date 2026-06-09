type OptimizationProcessingScreenProps = {
  /** Override default AI processing copy. */
  message?: string;
};

function ProcessingSpinner() {
  return (
    <div className="relative h-[4.75rem] w-[4.75rem]" aria-hidden>
      <svg className="h-full w-full -rotate-90 animate-spin" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#BFDBFE"
          strokeWidth="2.5"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="56 158"
        />
      </svg>
    </div>
  );
}

/**
 * Full-page optimization wait state (resume AI rewrite in progress).
 */
export function OptimizationProcessingScreen({
  message = "Please wait while our artificial intelligence processes the information from your resume and selects the right fields",
}: OptimizationProcessingScreenProps) {
  return (
    <div
      className="flex min-h-[calc(100vh-9rem)] flex-1 flex-col items-center justify-center bg-white px-6 py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <ProcessingSpinner />
      <h1 className="mt-8 text-center font-serif text-[2rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[2.15rem]">
        Processing
      </h1>
      <p className="mt-5 max-w-md text-center text-[15px] leading-relaxed text-slate-500 sm:text-base">
        {message}
      </p>
    </div>
  );
}
