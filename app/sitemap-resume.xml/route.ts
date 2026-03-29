import { getSiteUrl } from "@/app/lib/siteUrl";
import { getAllSitemapEntries, splitSitemapEntries } from "@/app/lib/sitemapEntries";
import { buildUrlsetXml } from "@/app/lib/sitemapXml";

export async function GET() {
  const base = getSiteUrl().replace(/\/$/, "");
  const all = getAllSitemapEntries();
  const { resume } = splitSitemapEntries(all, base);
  const xml = buildUrlsetXml(resume);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
