type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/[0.03]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">{item.question}</h2>
            <span className="shrink-0 text-xs text-slate-400 group-open:hidden" aria-hidden>
              +
            </span>
            <span className="hidden shrink-0 text-xs text-slate-400 group-open:inline" aria-hidden>
              −
            </span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
