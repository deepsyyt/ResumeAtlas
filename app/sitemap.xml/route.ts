import { getSiteUrl } from "@/app/lib/siteUrl";
import { buildSitemapIndexXml } from "@/app/lib/sitemapXml";

export async function GET() {
  const base = getSiteUrl().replace(/\/$/, "");
  const xml = buildSitemapIndexXml([
    `${base}/sitemap-resume.xml`,
    `${base}/sitemap-keywords.xml`,
  ]);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
