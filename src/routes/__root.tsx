import { useEffect, useState } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";

import appCss from "../styles.css?url";
import sgBold from "@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2?url";
import interReg from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import dmReg from "@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2?url";
import { lazy, Suspense } from "react";
import i18n, { languageForHost, loadMessages, ensureMessages } from "../i18n";
const CookieBanner = lazy(() => import("../components/CookieBanner"));
import { getHost } from "../lib/host.functions";
import { siteMetaForHost } from "../lib/site-meta";
import { hreflangLinks } from "../lib/seo-hosts";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  loader: async ({ location }) => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const host =
      typeof window === "undefined" ? await getHost() : window.location.host;
    const site = siteMetaForHost(host);
    const lang = site.lang === "bg" ? "bg" : "en";
    const messages =
      typeof window !== "undefined" && i18n.hasResourceBundle(lang, "translation") ? null : await loadMessages(lang);
    ensureMessages(lang, messages);
    return { site, messages, path };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site ?? siteMetaForHost(null);
    const path = loaderData?.path ?? "/";
    const pageUrl = path === "/" ? `${site.origin}/` : `${site.origin}${path}`;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "color-scheme", content: "dark" },
        { name: "supported-color-schemes", content: "dark" },
        { name: "theme-color", content: "#0d0b1a" },
        { title: site.title },
        { name: "description", content: site.description },
        { name: "author", content: "fifthexit" },
        { property: "og:site_name", content: "fifthexit" },
        { property: "og:locale", content: site.lang === "bg" ? "bg_BG" : "en_US" },
        { property: "og:title", content: site.ogTitle },
        { property: "og:description", content: site.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: site.ogTitle },
        { name: "twitter:description", content: site.description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "fifthexit",
                url: site.origin,
                logo: `${site.origin}/favicon.png`,
              },
              {
                "@type": "WebSite",
                name: "fifthexit",
                url: site.origin,
              },
              {
                "@type": "ProfessionalService",
                name: "fifthexit",
                url: site.origin,
                image: `${site.origin}/favicon.png`,
                description: site.description,
              },
            ],
          }),
        },
      ],
      links: [
        ...(site.lang === "bg"
          ? [{ rel: "preload", as: "font", type: "font/woff2", href: dmReg, crossOrigin: "anonymous" as const }]
          : [
              { rel: "preload", as: "font", type: "font/woff2", href: sgBold, crossOrigin: "anonymous" as const },
              { rel: "preload", as: "font", type: "font/woff2", href: interReg, crossOrigin: "anonymous" as const },
            ]),
        { rel: "preload", as: "style", href: appCss },
        { rel: "stylesheet", href: appCss },
        ...(path.startsWith("/work/") || path === "/lovable" || path === "/portfolio" ? [] : [
          { rel: "canonical", href: pageUrl },
          ...hreflangLinks(path),
        ]),
        { rel: "icon", type: "image/png", href: "/favicon.png" },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});


function RootShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>(i18n.language || "en");

  useEffect(() => {
    const host = languageForHost(window.location.hostname);
    if (i18n.language !== host && i18n.hasResourceBundle(host, "translation")) i18n.changeLanguage(host);
    setLang(host);
    const onChange = (lng: string) => setLang(lng);
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, []);

  return (
    <html lang={lang} suppressHydrationWarning className="dark" style={{ backgroundColor: "#0d0b1a" }}>
      <head>
        <HeadContent />
      </head>
      <body className="dark" style={{ backgroundColor: "#0d0b1a" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const data = Route.useLoaderData();
  const lang = data?.site?.lang === "bg" ? "bg" : "en";
  ensureMessages(lang, data?.messages);
  if (i18n.language !== lang) i18n.changeLanguage(lang);
  const [deferred, setDeferred] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setDeferred(true), { timeout: 2000 });
    else setTimeout(() => setDeferred(true), 1200);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Outlet />
      {deferred && <Suspense fallback={null}><CookieBanner /></Suspense>}
    </I18nextProvider>
  );
}
