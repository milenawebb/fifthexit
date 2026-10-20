import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { originForHost } from "../lib/seo-hosts";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const base = originForHost(request.headers.get("host") ?? new URL(request.url).host);
        return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`, {
          headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=3600", Vary: "Host" },
        });
      },
    },
  },
});
