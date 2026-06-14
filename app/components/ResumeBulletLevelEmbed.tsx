import {
  bulletLevelAnchorId,
  getResumeBulletDetail,
  levelLabel,
  type ResumeBulletLevel,
  type ResumeBulletRole,
} from "@/app/lib/resumeBulletPointContent";

type Props = {
  role: ResumeBulletRole;
  level: ResumeBulletLevel;
};

/** Bullet-only block for hub pages — projects + leadership, no methodology chrome. */
export function ResumeBulletLevelEmbed({ role, level }: Props) {
  const d = getResumeBulletDetail(role, level);
  const leadershipCount = d.leadershipBullets?.length ?? 0;

  return (
    <section id={bulletLevelAnchorId(level)} className="scroll-mt-24 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">{levelLabel(level)}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{d.h1}</h2>
        {d.noExperienceReassurance ? (
          <p className="mt-3 text-sm font-semibold text-slate-800">{d.noExperienceReassurance}</p>
        ) : null}
        {d.queryBreadthLine ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.queryBreadthLine}</p>
        ) : null}
      </div>

      {d.studentIntentBlock ? (
        <div className="rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-4 sm:px-5">
          <h3 className="text-base font-semibold text-slate-900">{d.studentIntentBlock.h2}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
            {d.studentIntentBlock.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {d.aboveFoldBullets ? (
        <ul className="space-y-2.5 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-snug text-slate-800 shadow-sm sm:text-[15px]">
          {d.aboveFoldBullets.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          {d.projectsSectionTitle ?? d.entryProjectsSectionTitle ?? "Project-wise resume bullets"}
        </h3>
        {d.projectsSectionSubcopy ? (
          <p className="mt-2 text-sm text-slate-600">{d.projectsSectionSubcopy}</p>
        ) : null}
        <div className="mt-5 space-y-6">
          {d.projects.map((proj, idx) => (
            <div key={`${proj.name}-${idx}`}>
              {proj.groupHeading ? (
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-slate-900">{proj.groupHeading}</h4>
                  {proj.groupIntro ? (
                    <p className="mt-1 text-sm text-slate-600">{proj.groupIntro}</p>
                  ) : null}
                </div>
              ) : null}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{proj.name}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800 sm:text-base">
                  {proj.bullets.map((line, i) => (
                    <li key={`${proj.name}-${i}`}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {d.leadershipBullets && d.leadershipBullets.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {d.leadershipSectionTitle ?? "Leadership & org-wide scope"}
          </h3>
          {d.leadershipSectionSubcopy ? (
            <p className="mt-2 text-sm text-slate-600">{d.leadershipSectionSubcopy}</p>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              {leadershipCount} leadership lines — keep only what matches your real scope.
            </p>
          )}
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-800 sm:text-base">
            {d.leadershipBullets.map((line, i) => (
              <li key={`leadership-${i}`}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
