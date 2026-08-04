import { useEffect, useState } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";

import appCss from "../styles.css?url";
import i18n, { languageForHost } from "../i18n";
import CookieBanner from "../components/CookieBanner";

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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "color-scheme", content: "dark" },
      { name: "supported-color-schemes", content: "dark" },
      { name: "theme-color", content: "#0d0b1a" },
      { title: "fifthexit — Web & app dev built with speed." },
      { name: "description", content: "fifthexit builds vibrant, high-performance web and mobile apps for brands ready to stand out. Book a project consultation today." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "fifthexit — Web & app dev built with speed." },
      { property: "og:description", content: "fifthexit builds vibrant, high-performance web and mobile apps for brands ready to stand out. Book a project consultation today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "fifthexit — Web & app dev built with speed." },
      { name: "twitter:description", content: "fifthexit builds vibrant, high-performance web and mobile apps for brands ready to stand out. Book a project consultation today." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/825d9382-cf12-437f-9411-1fe48398e456/id-preview-261bc88d--1bc49ac9-eacd-4499-bd7a-e95875986f3f.lovable.app-1785861843417.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/825d9382-cf12-437f-9411-1fe48398e456/id-preview-261bc88d--1bc49ac9-eacd-4499-bd7a-e95875986f3f.lovable.app-1785861843417.png" },
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
              url: "https://fifthexit.com",
              logo: "https://fifthexit.com/favicon.png",
            },
            {
              "@type": "WebSite",
              name: "fifthexit",
              url: "https://fifthexit.com",
            },
            {
              "@type": "ProfessionalService",
              name: "fifthexit",
              url: "https://fifthexit.com",
              image: "https://fifthexit.com/favicon.png",
              description:
                "Web & app development studio building blazing-fast websites, slick mobile apps, and digital products.",
            },
          ],
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://fifthexit.com" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
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
  return (
    <I18nextProvider i18n={i18n}>
      <Outlet />
      <CookieBanner />
    </I18nextProvider>
  );
}
