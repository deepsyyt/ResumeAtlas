import Link from "next/link";
import {
  RESUME_EXAMPLES_HUB_PATH,
  RESUME_GUIDES_HUB_PATH,
  RESUME_KEYWORDS_HUB_PATH,
} from "@/app/lib/seoHubPages";
import { absoluteCanonicalUrl } from "@/app/lib/searchIntentSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

export type SeoBreadcrumbKind = "example" | "guide" | "keywords" | "hub";

type Props = {
  kind: SeoBreadcrumbKind;
  /** Current page label (e.g. "Data Analyst Resume Example"). */
  currentLabel: string;
  /** Canonical path of the current page (for JSON-LD). */
  currentPath: string;
  className?: string;
};

function hubForKind(kind: SeoBreadcrumbKind): { path: string; name: string } | null {
  switch (kind) {
    case "example":
      return { path: RESUME_EXAMPLES_HUB_PATH, name: "Resume Examples" };
    case "guide":
      return { path: RESUME_GUIDES_HUB_PATH, name: "Resume Guides" };
    case "keywords":
      return { path: RESUME_KEYWORDS_HUB_PATH, name: "Resume Keywords" };
    case "hub":
      return null;
  }
}

export function SeoBreadcrumbs({ kind, currentLabel, currentPath, className = "" }: Props) {
  const canonicalBase = getSiteUrl().replace(/\/$/, "");
  const hub = hubForKind(kind);

  const items: { name: string; href?: string }[] = [{ name: "Home", href: "/" }];
  if (hub) {
    items.push({ name: hub.name, href: hub.path });
  }
  items.push({ name: currentLabel });

  const schemaItems = items.map((item, index) => {
    const position = index + 1;
    if (item.href) {
      const path = item.href === "/" ? "/" : item.href;
      return {
        "@type": "ListItem" as const,
        position,
        name: item.name,
        item: path === "/" ? `${canonicalBase}/` : absoluteCanonicalUrl(path),
      };
    }
    return {
      "@type": "ListItem" as const,
      position,
      name: item.name,
      item: absoluteCanonicalUrl(currentPath),
    };
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems,
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={`text-left text-[11px] text-slate-500 sm:text-xs ${className}`}
      >
        {items.map((item, i) => (
          <span key={`${item.name}-${i}`}>
            {i > 0 ? <span className="mx-1.5 text-slate-400">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-600">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
