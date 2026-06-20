import Link from "next/link";
import {
  INTERVIEW_BRIDGE_GUIDE,
  INTERVIEW_BRIDGE_STEPS,
  interviewBridgeIntro,
} from "@/app/lib/competitorComparison/interviewBridgeContent";

type Props = {
  competitorName?: string;
  id?: string;
};

export function InterviewProblemBridge({ competitorName, id = "interview-bridge" }: Props) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        Resume not getting interviews? Follow the chain
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
        {interviewBridgeIntro(competitorName)}
      </p>
      <ol className="mt-6 max-w-3xl space-y-0">
        {INTERVIEW_BRIDGE_STEPS.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
            {index < INTERVIEW_BRIDGE_STEPS.length - 1 ? (
              <span
                className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-slate-200"
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <div className="pt-0.5">
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href={INTERVIEW_BRIDGE_GUIDE.path}
        className="mt-4 inline-flex text-sm font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
      >
        {INTERVIEW_BRIDGE_GUIDE.label} →
      </Link>
    </section>
  );
}
