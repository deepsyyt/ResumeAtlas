import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import type { HubLinkItem } from "@/app/lib/seoHubPages";
import { ATS_RESUME_CHECKER_PATH } from "@/app/lib/roleClusterLinks";

type Props = {
  hubPath: string;
  hubTitle: string;
  hubDescription: string;
  h1: string;
  items: HubLinkItem[];
  /** Optional section title override */
  listHeading?: string;
};

export function RoleSeoHubPage({
  hubPath,
  hubTitle,
  hubDescription,
  h1,
  items,
  listHeading = "Browse by role",
}: Props) {
  const primary = items.filter((i) => i.tier !== "secondary");
  const secondary = items.filter((i) => i.tier === "secondary");

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <SeoBreadcrumbs
            kind="hub"
            currentLabel={hubTitle}
            currentPath={hubPath}
            className="mb-4 text-left"
          />
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">{hubDescription}</p>
          <LastUpdated className="mx-auto mt-3 max-w-2xl text-xs text-slate-500" label={CONTENT_LAST_UPDATED_LABEL} />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="inline-flex rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800"
            >
              {CHECK_RESUME_AGAINST_JD_PRIMARY_CTA}
            </Link>
            <Link
              href={ATS_RESUME_CHECKER_PATH}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50"
            >
              ATS resume checker
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-lg font-semibold text-slate-900">{listHeading}</h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {primary.map((item) => (
            <li key={item.path} className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
              <Link href={item.path} className="font-semibold text-slate-900 hover:underline">
                {item.label}
              </Link>
              {item.description ? (
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">{item.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
        {secondary.length > 0 ? (
          <>
            <h2 className="mt-10 text-base font-semibold text-slate-800">More roles</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
              {secondary.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-sky-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </main>
  );
}
