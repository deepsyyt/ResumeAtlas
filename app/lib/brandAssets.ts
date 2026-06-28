/** Canonical brand asset paths and dimensions (single source of truth). */

export const BRAND_ICON_SVG_PATH = "/favicon.svg" as const;
export const BRAND_LOGO_PATH = "/favicon.svg" as const;
export const BRAND_OG_IMAGE_PATH = "/icon-512.png" as const;

export const BRAND_LOGO_WIDTH = 512;
export const BRAND_LOGO_HEIGHT = 512;

export function brandLogoAbsoluteUrl(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");
  return `${base}${BRAND_LOGO_PATH}`;
}
