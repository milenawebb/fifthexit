import { useEffect } from "react";
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
      { title: "fifthexit — Web & app dev built with hype." },
      { name: "description", content: "Web & app development. We build blazing-fast websites, slick mobile apps, and digital products." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "fifthexit — Web & app dev built with hype." },
      { property: "og:description", content: "Web & app development. We build blazing-fast websites, slick mobile apps, and digital products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "fifthexit — Web & app dev built with hype." },
      { name: "twitter:description", content: "Web & app development. We build blazing-fast websites, slick mobile apps, and digital products." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/4e40a8dd-1d96-42b8-a480-4e362d620921" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/4e40a8dd-1d96-42b8-a480-4e362d620921" },
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
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: "#0d0b1a" }}>
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
  useEffect(() => {
    const lng = languageForHost(window.location.hostname);
    if (i18n.language !== lng) i18n.changeLanguage(lng);
  }, []);
  return (
    <I18nextProvider i18n={i18n}>
      <Outlet />
      <CookieBanner />
    </I18nextProvider>
  );
}
