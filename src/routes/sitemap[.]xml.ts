import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ORIGIN_BG, ORIGIN_EN, SITEMAP_PAGES, originForHost } from "../lib/seo-hosts";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const base = originForHost(request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host);
        const urls = SITEMAP_PAGES.map((e) =>
          [
            `  <url>`,
            `    <loc>${base}${e.path}</loc>`,
            `    <lastmod>${e.lastmod}</lastmod>`,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN_EN}${e.path}"/>`,
            `    <xhtml:link rel="alternate" hreflang="bg" href="${ORIGIN_BG}${e.path}"/>`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN_EN}${e.path}"/>`,
            `  </url>`,
          ].join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600", Vary: "Host" },
        });
      },
    },
  },
});
