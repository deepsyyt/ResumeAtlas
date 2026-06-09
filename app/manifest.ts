import type { MetadataRoute } from "next";
import { HOME_PAGE_DESCRIPTION } from "@/app/lib/homePageSeo";
import { getSiteUrl } from "@/app/lib/siteUrl";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();
  return {
    name: "ResumeAtlas",
    short_name: "ResumeAtlas",
    description: HOME_PAGE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0284c7",
    icons: [
      {
        src: `${siteUrl}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${siteUrl}/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: `${siteUrl}/favicon.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
