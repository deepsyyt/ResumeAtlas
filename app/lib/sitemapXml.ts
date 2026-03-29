import type { MetadataRoute } from "next";

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lastModTag(entry: MetadataRoute.Sitemap[number]): string {
  const lm = entry.lastModified;
  if (!lm) return "";
  const d = typeof lm === "string" ? new Date(lm) : lm;
  if (Number.isNaN(d.getTime())) return "";
  return `<lastmod>${d.toISOString().split("T")[0]}</lastmod>`;
}

export function buildUrlsetXml(entries: MetadataRoute.Sitemap): string {
  const inner = entries
    .map(
      (e) =>
        `<url><loc>${escapeXml(e.url)}</loc>${lastModTag(e)}</url>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${inner}</urlset>`;
}

export function buildSitemapIndexXml(absoluteLocs: string[]): string {
  const inner = absoluteLocs
    .map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${inner}</sitemapindex>`;
}
