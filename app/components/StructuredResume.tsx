"use client";

import type { ResumeDocument } from "@/app/lib/resumeDocument";
import React from "react";

type StructuredResumeProps = {
  resume: ResumeDocument;
  highlightKeywords?: string[];
  /** Bullet texts that should have numeric metrics highlighted (quantified achievements). */
  quantifiedBullets?: string[];
  /** Bullet texts that should be highlighted as rewritten/improved. */
  highlightedBullets?: string[];
  /** Bullet texts where JD keywords were newly added. */
  keywordBullets?: string[];
  editable?: boolean;
  onUpdateSummary?: (value: string) => void;
  onUpdateSkills?: (value: string[]) => void;
  onUpdateExperienceBullet?: (
    expIndex: number,
    bulletIndex: number,
    value: string,
    ctx?: { projectIndex: number }
  ) => void;
  onUpdateExperienceField?: (
    expIndex: number,
    field: "role" | "company" | "dates",
    value: string
  ) => void;
  onUpdateEducationLine?: (eduIndex: number, line: string) => void;
  onUpdateResumeMeta?: (
    patch: Partial<Pick<ResumeDocument, "name" | "title" | "contact">>
  ) => void;
};

function highlightKeywordsOnly(
  text: string,
  keywords: string[] | undefined
): React.ReactNode[] {
  let basePieces: React.ReactNode[] = [text];
  if (keywords && keywords.length > 0) {
    const escaped = keywords
      .filter((k) => k.trim().length > 0)
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .sort((a, b) => b.length - a.length);
    if (!escaped.length) return basePieces;
    const re = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(re);
    basePieces = parts.map((part, i) =>
      i % 2 === 1 ? (
        <mark
          key={`kw-${i}`}
          className="rounded bg-sky-100 px-0.5 font-medium text-sky-900 print:bg-transparent print:px-0 print:font-inherit print:text-inherit"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  }
  return basePieces;
}

function highlightMetrics(
  nodes: React.ReactNode[]
): React.ReactNode {
  const out: React.ReactNode[] = [];
  const metricRe = /(\d[\d.,]*(?:\s*[%+xX]?)?)/g;

  nodes.forEach((node, idx) => {
    if (typeof node !== "string") {
      out.push(<React.Fragment key={`n-${idx}`}>{node}</React.Fragment>);
      return;
    }
    const parts = node.split(metricRe);
    parts.forEach((part, j) => {
      const key = `m-${idx}-${j}`;
      if (j % 2 === 1 && part.trim().length > 0) {
        out.push(
          <mark
            key={key}
            className="rounded bg-emerald-50 px-0.5 font-semibold text-emerald-800 print:bg-transparent print:px-0 print:font-inherit print:text-inherit"
          >
            {part}
          </mark>
        );
      } else if (part) {
        out.push(<React.Fragment key={key}>{part}</React.Fragment>);
      }
    });
  });

  return <>{out}</>;
}

function sanitizeBulletText(text: string): string {
  return String(text ?? "")
    .replace(/^\s*(?:optimized|optimised|rewritten|improved)\s+bullet\s*:\s*/i, "")
    .replace(/^\s*bullet\s*:\s*/i, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeBulletKey(text: string): string {
  return sanitizeBulletText(text).toLowerCase();
}

type ExperienceBulletRowProps = {
  text: string;
  bulletIndex: number;
  expIndex: number;
  projectIndex?: number;
  editable: boolean;
  editingExperience: boolean;
  onUpdateExperienceBullet?: StructuredResumeProps["onUpdateExperienceBullet"];
  highlightedSet: Set<string>;
  keywordSet: Set<string>;
  quantifiedSet: Set<string>;
  highlightKeywords?: string[];
};

function ExperienceBulletRow({
  text,
  bulletIndex,
  expIndex,
  projectIndex,
  editable,
  editingExperience,
  onUpdateExperienceBullet,
  highlightedSet,
  keywordSet,
  quantifiedSet,
  highlightKeywords,
}: ExperienceBulletRowProps) {
  const key = normalizeBulletKey(text);
  const shouldHighlightKeyword = keywordSet.has(key);
  const ctx =
    projectIndex === undefined ? undefined : { projectIndex };

  const isRewritten = highlightedSet.has(key);
  const isKeyword = keywordSet.has(key);
  const isQuantified = quantifiedSet.has(key);
  const hasCallout = isRewritten || isKeyword || isQuantified;

  const calloutClass = [
    hasCallout ? "rounded-md px-2 py-1.5 print:bg-transparent print:px-0 print:py-0 print:ring-0 print:border-l-0" : "py-0.5",
    isRewritten ? "bg-violet-50 ring-1 ring-violet-200 border-l-2 border-violet-500" : "",
    isKeyword ? "bg-sky-100 ring-1 ring-sky-300 border-l-2 border-sky-500" : "",
    isQuantified ? "bg-emerald-50/80 ring-1 ring-emerald-200 border-l-2 border-emerald-500" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className="m-0 flex list-none items-start gap-2">
      <span
        className="mt-1.5 w-3 shrink-0 select-none text-center text-sm text-slate-600"
        aria-hidden
      >
        •
      </span>
      <div className={`min-w-0 flex-1 text-sm leading-relaxed text-slate-700 ${calloutClass}`}>
        {editable && editingExperience ? (
          <textarea
            value={text}
            onChange={(e) =>
              onUpdateExperienceBullet?.(expIndex, bulletIndex, e.target.value, ctx)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
            rows={2}
          />
        ) : isQuantified ? (
          highlightMetrics(
            highlightKeywordsOnly(
              text,
              shouldHighlightKeyword ? highlightKeywords : undefined
            )
          )
        ) : (
          highlightKeywordsOnly(
            text,
            shouldHighlightKeyword ? highlightKeywords : undefined
          ).map((node, k) => <React.Fragment key={k}>{node}</React.Fragment>)
        )}
        <span className="ml-2 inline-flex flex-wrap gap-1 align-middle print:hidden">
          {isRewritten && (
            <span className="inline-flex rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-800">
              rewritten
            </span>
          )}
          {isKeyword && (
            <span className="inline-flex rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-800">
              keyword
            </span>
          )}
          {isQuantified && (
            <span className="inline-flex rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
              quantified
            </span>
          )}
        </span>
      </div>
    </li>
  );
}

export function StructuredResume({
  resume,
  highlightKeywords,
  quantifiedBullets,
  highlightedBullets,
  keywordBullets,
  editable = false,
  onUpdateSummary,
  onUpdateSkills,
  onUpdateExperienceBullet,
  onUpdateExperienceField,
  onUpdateEducationLine,
  onUpdateResumeMeta,
}: StructuredResumeProps) {
  const name = resume.name?.trim() ?? "";
  const title = resume.title?.trim() ?? "";
  const contact = resume.contact?.trim() ?? "";
  const summary = resume.summary?.trim() ?? "";
  const skills = resume.skills ?? [];
  const experience = resume.experience ?? [];
  const education = resume.education ?? [];
  const highlightedSet = React.useMemo(
    () => new Set((highlightedBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [highlightedBullets]
  );
  const keywordSet = React.useMemo(
    () => new Set((keywordBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [keywordBullets]
  );
  const quantifiedSet = React.useMemo(
    () => new Set((quantifiedBullets ?? []).map((b) => normalizeBulletKey(String(b ?? "")))),
    [quantifiedBullets]
  );
  const [editing, setEditing] = React.useState({
    header: false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
  });

  return (
    <div className="h-full overflow-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-8 text-slate-900 print:h-auto print:overflow-visible print:rounded-none print:border-0 print:shadow-none print:p-0">
      {/* Header */}
      <header className="border-b border-slate-200 pb-4 mb-4">
        {editable ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                  Header details
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, header: !prev.header }))
                  }
                  className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
                >
                  {editing.header ? "Done" : "Edit"}
                </button>
              </div>
            </div>
            {editing.header ? (
              <div className="space-y-2">
                <input
                  value={resume.name ?? ""}
                  onChange={(e) => onUpdateResumeMeta?.({ name: e.target.value })}
                  placeholder="Name"
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-2xl font-bold tracking-tight text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <input
                  value={resume.title ?? ""}
                  onChange={(e) => onUpdateResumeMeta?.({ title: e.target.value })}
                  placeholder="Title / headline"
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                <textarea
                  value={resume.contact ?? ""}
                  onChange={(e) => onUpdateResumeMeta?.({ contact: e.target.value })}
                  placeholder="Phone, email, location, links (one per line is fine)"
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  rows={4}
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {name || "Resume"}
                </h1>
                {title ? (
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{title}</p>
                ) : null}
                {contact
                  ? contact.split(/\r?\n/).map((line, i) =>
                      line.trim() ? (
                        <p key={i} className="text-xs text-slate-600 mt-0.5">
                          {line.trim()}
                        </p>
                      ) : null
                    )
                  : null}
              </>
            )}
          </div>
        ) : name || title || contact ? (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{name || "Resume"}</h1>
            {title ? (
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{title}</p>
            ) : null}
            {contact
              ? contact.split(/\r?\n/).map((line, i) =>
                  line.trim() ? (
                    <p key={i} className="text-xs text-slate-600 mt-0.5">
                      {line.trim()}
                    </p>
                  ) : null
                )
              : null}
          </>
        ) : (
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resume</h1>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Professional Summary
            </h2>
            {editable && (
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({ ...prev, summary: !prev.summary }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.summary ? "Done" : "Edit"}
              </button>
            )}
          </div>
          {editable && editing.summary ? (
            <textarea
              value={resume.summary ?? ""}
              onChange={(e) => onUpdateSummary?.(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
              rows={4}
            />
          ) : (
            <p className="text-sm leading-relaxed text-slate-700">
              {highlightKeywordsOnly(summary, highlightKeywords).map((node, i) => (
                <React.Fragment key={i}>{node}</React.Fragment>
              ))}
            </p>
          )}
        </section>
      )}

      {/* Skills — same order as resumeDocumentToPlainText */}
      {skills.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Skills
            </h2>
            {editable && (
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({ ...prev, skills: !prev.skills }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.skills ? "Done" : "Edit"}
              </button>
            )}
          </div>
          {editable && editing.skills ? (
            <textarea
              value={skills.join(", ")}
              onChange={(e) =>
                onUpdateSkills?.(
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
              rows={3}
            />
          ) : (
            <p className="text-sm leading-relaxed text-slate-700">
              {highlightKeywordsOnly(skills.join(" • "), highlightKeywords).map(
                (node, i) => (
                  <React.Fragment key={i}>{node}</React.Fragment>
                )
              )}
            </p>
          )}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Experience
          </h2>
          {editable && (
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({
                    ...prev,
                    experience: !prev.experience,
                  }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.experience ? "Done" : "Edit"}
              </button>
            </div>
          )}
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  {editable && editing.experience ? (
                    <div className="grid w-full grid-cols-1 gap-1.5 sm:grid-cols-3">
                      <input
                        value={exp.role ?? ""}
                        onChange={(e) =>
                          onUpdateExperienceField?.(idx, "role", e.target.value)
                        }
                        placeholder="Role"
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <input
                        value={exp.company ?? ""}
                        onChange={(e) =>
                          onUpdateExperienceField?.(idx, "company", e.target.value)
                        }
                        placeholder="Company"
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <input
                        value={exp.dates ?? ""}
                        onChange={(e) =>
                          onUpdateExperienceField?.(idx, "dates", e.target.value)
                        }
                        placeholder="Dates (e.g. Jan 2022 - Mar 2025)"
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-sm text-slate-900">
                        {exp.role || exp.company || "Experience"}
                      </p>
                      {exp.dates && (
                        <p className="text-xs text-slate-500 shrink-0">{exp.dates}</p>
                      )}
                    </>
                  )}
                </div>
                {exp.company && !(editable && editing.experience) && (
                  <p className="text-xs text-slate-600 mt-0.5">{exp.company}</p>
                )}
                {exp.bullets.filter((b) => sanitizeBulletText(String(b ?? "")).length > 0).length >
                  0 && (
                  <ul className="mt-2 flex list-none flex-col gap-2 pl-0 text-sm text-slate-700 leading-relaxed">
                    {exp.bullets
                      .map((b, j) => ({
                        j,
                        text: sanitizeBulletText(String(b ?? "")),
                      }))
                      .filter((b) => b.text.length > 0)
                      .map(({ j, text }) => (
                        <ExperienceBulletRow
                          key={`top-${idx}-${j}`}
                          text={text}
                          bulletIndex={j}
                          expIndex={idx}
                          editable={editable}
                          editingExperience={editing.experience}
                          onUpdateExperienceBullet={onUpdateExperienceBullet}
                          highlightedSet={highlightedSet}
                          keywordSet={keywordSet}
                          quantifiedSet={quantifiedSet}
                          highlightKeywords={highlightKeywords}
                        />
                      ))}
                  </ul>
                )}
                {(exp.projects ?? []).map((proj, pIdx) => (
                  <div key={`proj-${idx}-${pIdx}`} className="mt-3">
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {proj.title}
                    </p>
                    <ul className="mt-2 flex list-none flex-col gap-2 pl-0 text-sm text-slate-700 leading-relaxed">
                      {(proj.bullets ?? [])
                        .map((b, j) => ({
                          j,
                          text: sanitizeBulletText(String(b ?? "")),
                        }))
                        .filter((b) => b.text.length > 0)
                        .map(({ j, text }) => (
                          <ExperienceBulletRow
                            key={`p-${idx}-${pIdx}-${j}`}
                            text={text}
                            bulletIndex={j}
                            expIndex={idx}
                            projectIndex={pIdx}
                            editable={editable}
                            editingExperience={editing.experience}
                            onUpdateExperienceBullet={onUpdateExperienceBullet}
                            highlightedSet={highlightedSet}
                            keywordSet={keywordSet}
                            quantifiedSet={quantifiedSet}
                            highlightKeywords={highlightKeywords}
                          />
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="border-t border-slate-100 pt-4 mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Education
            </h2>
            {editable && (
              <button
                type="button"
                onClick={() =>
                  setEditing((prev) => ({
                    ...prev,
                    education: !prev.education,
                  }))
                }
                className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
              >
                {editing.education ? "Done" : "Edit"}
              </button>
            )}
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            {education.map((line, idx) => (
              <div key={idx}>
                {editable && editing.education ? (
                  <input
                    value={line}
                    onChange={(e) =>
                      onUpdateEducationLine?.(idx, e.target.value)
                    }
                    placeholder="Degree · Institution · Year"
                    className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                ) : (
                  <p className="text-slate-900">{line}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

