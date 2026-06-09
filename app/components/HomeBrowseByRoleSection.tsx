import Link from "next/link";
import { CHECK_RESUME_AGAINST_JD_FORM_HREF, OPTIMIZE_RESUME_FOR_JD_PATH } from "@/app/lib/internalLinks";
import { HOME_ROLE_BROWSE_CARDS } from "@/app/lib/homeRoleBrowse";
import { getSiteUrl } from "@/app/lib/siteUrl";

const siteBase = () => getSiteUrl().replace(/\/$/, "");

function homeRoleBrowseItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Resume and job description optimize resources by role",
    description:
      "Role-specific resume examples, guides, ATS keyword lists, and JD optimize prep pages on ResumeAtlas.",
    numberOfItems: HOME_ROLE_BROWSE_CARDS.length,
    itemListElement: HOME_ROLE_BROWSE_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${card.roleName} resume resources`,
      url: `${siteBase()}${card.optimizerPath ?? card.guidePath}`,
    })),
  };
}

export function HomeBrowseByRoleSection() {
  const jsonLd = homeRoleBrowseItemListJsonLd();

  return (
    <section
      id="browse-by-role"
      className="border-t border-slate-200/60 bg-[#eef2f8]/80"
      aria-labelledby="home-browse-by-role-heading"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="home-browse-by-role-heading"
            className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            Resume resources by role
          </h2>
          <p className="mt-2 text-sm leading-snug text-slate-600">
            Examples, guides, keywords, and JD optimize prep by role. Ready to run your evidence match check?{" "}
            <a
              href={CHECK_RESUME_AGAINST_JD_FORM_HREF}
              className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
            >
              Use the free tool at the top of this page
            </a>
            .
          </p>
        </div>

        <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_ROLE_BROWSE_CARDS.map((card) => (
            <li
              key={card.slug}
              className="rounded-xl border border-white/80 bg-white/80 p-3.5 shadow-sm shadow-slate-900/[0.03] ring-1 ring-slate-900/[0.04] backdrop-blur-sm sm:p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">{card.roleName}</h3>
              <ul className="m-0 mt-2.5 list-none space-y-1.5 p-0 text-sm">
                <li>
                  <Link
                    href={card.examplePath}
                    className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
                  >
                    Example
                  </Link>
                  <span className="text-slate-400"> · </span>
                  <Link
                    href={card.guidePath}
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-950"
                  >
                    Guide
                  </Link>
                  <span className="text-slate-400"> · </span>
                  <Link
                    href={card.keywordsPath}
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-950"
                  >
                    Keywords
                  </Link>
                  {card.optimizerPath ? (
                    <>
                      <span className="text-slate-400"> · </span>
                      <Link
                        href={card.optimizerPath}
                        className="text-sky-700 underline underline-offset-2 hover:text-sky-950"
                      >
                        Optimizer
                      </Link>
                    </>
                  ) : null}
                </li>
                {card.bulletGuideAnchor ? (
                  <li>
                    <Link
                      href={card.bulletGuideAnchor}
                      className="text-sky-700 underline underline-offset-2 hover:text-sky-950"
                    >
                      Bullet examples
                    </Link>
                  </li>
                ) : null}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-slate-500 sm:text-sm">
          Full optimize hub:{" "}
          <Link
            href={OPTIMIZE_RESUME_FOR_JD_PATH}
            className="font-medium text-sky-800 underline underline-offset-2 hover:text-sky-950"
          >
            optimize resume for job description by role
          </Link>
        </p>
      </div>
    </section>
  );
}
