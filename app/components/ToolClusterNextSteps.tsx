import Link from "next/link";
import {
  ANALYZE_OPTIMIZE_RESUME_JD_CTA,
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  OPTIMIZE_RESUME_FOR_JD_PATH,
} from "@/app/lib/internalLinks";
import { ROLE_OPTIMIZER_ORDER } from "@/app/lib/roleOptimizer/registry";

const TOOL_PAGE_OPTIMIZER_ROLES = ROLE_OPTIMIZER_ORDER.slice(0, 5);

/**
 * Post-results workflow on the compare tool page: fix in-tool → optional role guides → rerun.
 */
export function ToolClusterNextSteps() {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6"
      aria-labelledby="tool-next-steps"
    >
      <h2
        id="tool-next-steps"
        className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
      >
        What to do after your results
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        You are already on the free compare and optimize tool. Use the steps below in order.
      </p>

      <ol className="mt-5 space-y-4">
        <li className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 1</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Fix gaps and optimize in the tool above
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Close missing keywords from your gap list, apply AI optimization suggestions, and edit
            bullets in the workbench. Stay on this page—analysis and optimization are one workflow.
          </p>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {ANALYZE_OPTIMIZE_RESUME_JD_CTA}
          </a>
        </li>

        <li className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Step 2 · Optional
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Role-specific prep (guides, not a second tool)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Need sample JD match examples or ATS keyword checklists before you edit? Open a role
            guide, then return here to paste your posting.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-3 font-semibold">Role</th>
                  <th className="py-2 px-2 font-semibold">Optimizer</th>
                  <th className="py-2 px-2 font-semibold">Keywords</th>
                  <th className="py-2 pl-2 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {TOOL_PAGE_OPTIMIZER_ROLES.map((role) => {
                  if (!role.relatedKeywordsPath || !role.relatedExamplePath) return null;
                  return (
                    <tr key={role.path} className="border-b border-slate-100 last:border-0">
                      <td className="py-2.5 pr-3 font-medium text-slate-900">{role.roleName}</td>
                      <td className="py-2.5 px-2">
                        <Link
                          href={role.path}
                          className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
                        >
                          Guide
                        </Link>
                      </td>
                      <td className="py-2.5 px-2">
                        <Link
                          href={role.relatedKeywordsPath}
                          className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
                        >
                          Keywords
                        </Link>
                      </td>
                      <td className="py-2.5 pl-2">
                        <Link
                          href={role.relatedExamplePath}
                          className="text-sky-800 underline underline-offset-2 hover:text-sky-950"
                        >
                          Example
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            ML engineer, DevOps, backend, and more on the{" "}
            <Link
              href={OPTIMIZE_RESUME_FOR_JD_PATH}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              optimize resume for job description hub
            </Link>
            .
          </p>
        </li>

        <li className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 3</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Rerun your match score</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            After you optimize bullets, paste your updated resume with the same job description to
            see a new ATS match score and keyword gap readout.
          </p>
          <a
            href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
            className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Rerun compare resume to job description (free)
          </a>
        </li>
      </ol>
    </section>
  );
}
