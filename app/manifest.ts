import type { MetadataRoute } from "next";
import { HOME_PAGE_DESCRIPTION } from "@/app/lib/homePageSeo";
import {
  BRAND_ICON_SVG_PATH,
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_WIDTH,
  BRAND_OG_IMAGE_PATH,
} from "@/app/lib/brandAssets";
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
        src: `${siteUrl}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
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
        src: `${siteUrl}${BRAND_ICON_SVG_PATH}`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
