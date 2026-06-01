import Link from "next/link";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF } from "@/app/lib/internalLinks";
import { getKeywordIntentContent } from "@/app/lib/keywordIntentContent";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import { keywordIntentLabel, type RoleKeywordIntent } from "@/app/lib/roleSeo";
import { roleResumeKeywordsPath } from "@/app/lib/searchIntentSeo";

type Props = {
  role: RoleSlug;
  intent: RoleKeywordIntent;
};

export function RoleKeywordIntentHubBlock({ role, intent }: Props) {
  const content = getKeywordIntentContent(role, intent);
  const roleName = KEYWORD_PAGES[role].roleName;
  const hubPath = roleResumeKeywordsPath(role);

  return (
    <li
      id={intent}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900">
        <a href={`${hubPath}#${intent}`} className="text-sky-900 hover:underline">
          {keywordIntentLabel(intent)}
        </a>
      </h3>
      <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">{content.intro}</p>

      <div className="mt-6 space-y-6">
        {content.clusters.map((cluster) => (
          <div key={cluster.title} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm font-semibold text-slate-900">{cluster.title}</h4>
            <p className="mt-1 text-sm text-slate-600">{cluster.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cluster.keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="list-none rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-800"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-700">
        <Link
          href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
          className="font-semibold text-sky-800 underline underline-offset-2 hover:text-sky-950"
        >
          Scan your {roleName.toLowerCase()} resume for missing {keywordIntentLabel(intent).toLowerCase()}
        </Link>
      </p>
    </li>
  );
}
