import Link from "next/link";
import { LastUpdated } from "@/app/components/LastUpdated";
import { SeoBreadcrumbs } from "@/app/components/SeoBreadcrumbs";
import {
  CHECK_RESUME_AGAINST_JD_FORM_HREF,
  CHECK_RESUME_AGAINST_JD_PRIMARY_CTA,
} from "@/app/lib/internalLinks";
import { CONTENT_LAST_UPDATED_LABEL } from "@/app/lib/contentFreshness";
import type { HubLinkItem, HubLinkSection } from "@/app/lib/seoHubPages";
import { ATS_RESUME_CHECKER_PATH } from "@/app/lib/roleClusterLinks";

type Props = {
  hubPath: string;
  hubTitle: string;
  hubDescription: string;
  h1: string;
  items?: HubLinkItem[];
  /** When set, renders grouped sections (e.g. pilot keyword guides inside the hub). */
  sections?: HubLinkSection[];
  /** Optional section title override (flat list mode only). */
  listHeading?: string;
};

function HubItemCard({ item }: { item: HubLinkItem }) {
  const isSecondary = item.tier === "secondary";
  return (
    <li
      className={
        isSecondary
          ? undefined
          : "rounded-xl border border-sky-200 bg-sky-50/40 p-4 list-none"
      }
    >
      <Link
        href={item.path}
        className={
          isSecondary
            ? "text-sky-700 hover:underline"
            : "font-semibold text-slate-900 hover:underline"
        }
      >
        {item.label}
      </Link>
      {item.description ? (
        <p className={`mt-1 text-xs text-slate-600 ${isSecondary ? "" : "line-clamp-2"}`}>
          {item.description}
        </p>
      ) : null}
    </li>
  );
}

export function RoleSeoHubPage({
  hubPath,
  hubTitle,
  hubDescription,
  h1,
  items = [],
  sections,
  listHeading = "Browse by role",
}: Props) {
  const primary = items.filter((i) => i.tier !== "secondary");
  const secondary = items.filter((i) => i.tier === "secondary");

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="page-prose-wide py-14 text-center">
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

      <section className="page-prose-wide py-10 sm:py-12 space-y-10">
        {sections?.length ? (
          sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
              {section.items[0]?.tier === "secondary" ? (
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm list-none m-0 p-0">
                  {section.items.map((item) => (
                    <HubItemCard key={item.path} item={item} />
                  ))}
                </ul>
              ) : (
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 list-none m-0 p-0">
                  {section.items.map((item) => (
                    <HubItemCard key={item.path} item={item} />
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{listHeading}</h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 list-none m-0 p-0">
                {primary.map((item) => (
                  <HubItemCard key={item.path} item={item} />
                ))}
              </ul>
            </div>
            {secondary.length > 0 ? (
              <div>
                <h2 className="text-base font-semibold text-slate-800">More roles</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm list-none m-0 p-0">
                  {secondary.map((item) => (
                    <HubItemCard key={item.path} item={item} />
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}
