import { languageForHost } from "../i18n";

export const ORIGIN_EN = "https://fifthexit.com";
export const ORIGIN_BG = "https://fifthexit.eu";

/** Public pages and the date their content last changed significantly. */
export const SITEMAP_PAGES: { path: string; lastmod: string; changefreq: string; priority: string }[] = [
  { path: "/", lastmod: "2026-10-19", changefreq: "weekly", priority: "1.0" },
  { path: "/terms", lastmod: "2026-10-18", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", lastmod: "2026-10-18", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", lastmod: "2026-10-18", changefreq: "yearly", priority: "0.3" },
  { path: "/work/rin-aesthetic-practice", lastmod: "2026-10-20", changefreq: "monthly", priority: "0.7" },
  { path: "/work/bellhouse-real-estate", lastmod: "2026-10-27", changefreq: "monthly", priority: "0.7" },
];

export function originForHost(host?: string | null): string {
  return languageForHost(host) === "bg" ? ORIGIN_BG : ORIGIN_EN;
}

/** Old brand domain: every request 301s to fifthexit.com. */
export function isLegacyHost(host?: string | null): boolean {
  const h = (host ?? "").toLowerCase().split(":")[0];
  return h === "hype-street.com" || h.endsWith(".hype-street.com");
}

export function hreflangLinks(path: string) {
  return [
    { rel: "alternate", hrefLang: "en", href: `${ORIGIN_EN}${path}` },
    { rel: "alternate", hrefLang: "bg", href: `${ORIGIN_BG}${path}` },
    { rel: "alternate", hrefLang: "x-default", href: `${ORIGIN_EN}${path}` },
  ];
}
