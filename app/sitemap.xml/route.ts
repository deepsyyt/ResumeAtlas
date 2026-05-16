import { getDedupedSitemapEntries } from "@/app/lib/sitemapEntries";
import { buildUrlsetXml } from "@/app/lib/sitemapXml";

export async function GET() {
  const xml = buildUrlsetXml(getDedupedSitemapEntries());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
