import { useEffect, useState } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";

import appCss from "../styles.css?url";
import i18n, { languageForHost } from "../i18n";
import CookieBanner from "../components/CookieBanner";
import { getHost } from "../lib/host.functions";
import { siteMetaForHost } from "../lib/site-meta";


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
  loader: async () => {
    const host =
      typeof window === "undefined" ? await getHost() : window.location.host;
    return { site: siteMetaForHost(host) };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site ?? siteMetaForHost(null);
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
        { property: "og:url", content: site.origin },
        { property: "og:image", content: site.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: site.ogTitle },
        { name: "twitter:description", content: site.description },
        { name: "twitter:image", content: site.image },
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
        { rel: "preload", as: "style", href: appCss },
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: site.origin },
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
    if (i18n.language !== host) i18n.changeLanguage(host);
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
  const lang = data?.site?.lang ?? "en";
  if (i18n.language !== lang) i18n.changeLanguage(lang);

  return (
    <I18nextProvider i18n={i18n}>
      <Outlet />
      <CookieBanner />
    </I18nextProvider>
  );
}
