import { createMiddleware, createStart } from "@tanstack/react-start";
import { isLegacyHost } from "./lib/seo-hosts";

const legacyRedirect = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? url.host;
  if (isLegacyHost(host) || isLegacyHost(url.hostname)) {
    return new Response(null, {
      status: 301,
      headers: { Location: `https://fifthexit.com${url.pathname}${url.search}` },
    }) as never;
  }
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [legacyRedirect],
}));
