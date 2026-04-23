"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { TemplatePreviewModel } from "./templatePreviewModels";

const GOOGLE_DOCS_BLANK = "https://docs.google.com/document/create" as const;

const BENEFITS = [
  "Single-column ATS-safe layout",
  "Correct section order for parsers",
  "Recruiter-friendly plain formatting",
  "Easy to customize for each role",
] as const;

type Props = {
  model: TemplatePreviewModel;
  plainText: string;
  docxHref: string;
  structureHref: string;
};

function LargeResumePreview({
  model,
  hideTemplateLettering,
}: {
  model: TemplatePreviewModel;
  /** Hero uses the same sample as Template A - hide "Template A" here so it is not repeated above the B/C cards. */
  hideTemplateLettering?: boolean;
}) {
  return (
    <div className="relative flex justify-center lg:justify-start">
      <div
        className="w-full max-w-xl rounded-sm border border-slate-300 bg-white text-slate-900 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5"
        aria-label="Full-width preview of ATS-friendly resume template"
      >
        <div className="border-b border-slate-200 bg-slate-50/90 px-4 py-2.5 sm:px-5">
          {hideTemplateLettering ? (
            <p className="text-xs font-semibold tracking-tight text-slate-700 sm:text-sm">
              Featured starter · general / early career
            </p>
          ) : (
            <>
              <p className="text-[10px] font-bold uppercase tracking-wider text-sky-800">{model.eyebrow}</p>
              <p className="text-xs font-medium text-slate-600 sm:text-sm">{model.cardTitle}</p>
            </>
          )}
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <header className="border-b border-slate-200 pb-5 text-center">
            <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.7rem] sm:tracking-tight">
              {model.name}
            </p>
            <p className="mt-1.5 text-sm font-medium text-slate-700">{model.roleLine}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{model.contactLine}</p>
            {model.contactLine2 ? (
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{model.contactLine2}</p>
            ) : null}
          </header>

          <div className="mt-6 space-y-6">
            <section>
              <h3 className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Summary
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-[0.9375rem]">{model.summary}</p>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Skills
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-[0.9375rem]">{model.skills}</p>
            </section>

            <section>
              <h3 className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Professional experience
              </h3>
              {model.experienceJob ? (
                <div className="mt-3">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <p className="text-sm font-semibold text-slate-900 sm:text-[0.9375rem]">
                      {model.experienceJob.title}
                      <span className="font-normal text-slate-600"> · {model.experienceJob.company}</span>
                    </p>
                    <p className="shrink-0 text-xs font-medium tabular-nums text-slate-600 sm:text-sm">
                      {model.experienceJob.dates}
                    </p>
                  </div>
                  <ul className="mt-2.5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[0.9375rem]">
                    {model.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800">
                  {model.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </section>

            {model.projects?.length ? (
              <section>
                <h3 className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Projects
                </h3>
                <div className="mt-3 space-y-5">
                  {model.projects.map((p, i) => (
                    <div key={`${p.title}-${i}`}>
                      <p className="text-sm font-semibold text-slate-900 sm:text-[0.9375rem]">{p.title}</p>
                      {p.context ? (
                        <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">{p.context}</p>
                      ) : null}
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[0.9375rem]">
                        <li>{p.outcome}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {model.education ? (
              <section>
                <h3 className="border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Education
                </h3>
                <p className="mt-3 text-sm font-medium text-slate-800 sm:text-[0.9375rem]">{model.education}</p>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AtsTemplateHeroPanel({ model, plainText, docxHref, structureHref }: Props) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus(null), 2000);
    } catch {
      setCopyStatus("If copy is blocked, download .docx or .txt below.");
      window.setTimeout(() => setCopyStatus(null), 4000);
    }
  }, [plainText]);

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="order-2 lg:order-1">
        <LargeResumePreview model={model} hideTemplateLettering />
      </div>

      <div className="order-1 flex flex-col justify-center space-y-5 lg:order-2 lg:pt-2">
        <ul className="space-y-2.5 text-sm text-slate-700">
          {BENEFITS.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="mt-0.5 shrink-0 font-semibold text-emerald-700" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2.5">
          <a
            href={docxHref}
            download
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
          >
            Download Word template
          </a>
          <a
            href={GOOGLE_DOCS_BLANK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Open Google Docs template
          </a>
          <button
            type="button"
            onClick={() => void onCopy()}
            className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Copy plain text template
          </button>
        </div>

        {copyStatus ? <p className="text-center text-xs text-emerald-800 lg:text-left">{copyStatus}</p> : null}

        <p className="text-center text-sm text-slate-600 lg:text-left">
          After your draft is ready:{" "}
          <Link
            href="#tailor-template-to-jd"
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            Match resume to job description
          </Link>
        </p>

        <p className="text-center text-xs text-slate-500 lg:text-left">
          <Link href={structureHref} className="font-medium text-sky-800 underline underline-offset-2">
            Applicant tracking system resume template  -  section order checklist
          </Link>
        </p>
      </div>
    </div>
  );
}
