import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { getHost } from "@/lib/host.functions";
import { siteMetaForHost } from "@/lib/site-meta";
import { getPortfolioProjects, type PortfolioFilter } from "@/lib/portfolio-projects";
import { PortfolioCardContent } from "@/components/work/PortfolioCard";

const path = "/portfolio";

type Filter = "all" | PortfolioFilter;
const filters: Filter[] = ["all", "websites", "web-apps", "e-commerce", "our-products"];

const filterKeys: Record<Filter, string> = {
  all: "portfolioPage.filterAll",
  websites: "portfolioPage.filterWebsites",
  "web-apps": "portfolioPage.filterWebApps",
  "e-commerce": "portfolioPage.filterEcommerce",
  "our-products": "portfolioPage.filterOurProducts",
};

export const Route = createFileRoute("/portfolio")({
  loader: async () => {
    const host = typeof window === "undefined" ? await getHost() : window.location.host;
    const site = siteMetaForHost(host);
    return { origin: site.origin, image: siteMetaForHost("fifthexit.com").image };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "fifthexit" }, { name: "robots", content: "noindex" }] };
    const { origin, image } = loaderData;
    const title = "Portfolio: websites, apps and products | fifthexit";
    const description =
      "Websites, web apps, e-commerce and our own products: every fifthexit project is live. Filter by type and see what we ship.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${origin}${path}` },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [
        { rel: "canonical", href: `${origin}${path}` },
        { rel: "alternate", hrefLang: "en", href: `https://fifthexit.com${path}` },
        { rel: "alternate", hrefLang: "x-default", href: `https://fifthexit.com${path}` },
      ],
    };
  },
  component: PortfolioPage,
  errorComponent: () => <p role="alert" className="px-6 py-24 text-foreground">Portfolio: page unavailable.</p>,
});

function PortfolioPage() {
  const motionRef = useHomeMotion();
  const { t } = useTranslation();
  const projects = getPortfolioProjects(t, "en");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace(/^#/, "");
      setFilter((filters as string[]).includes(slug) ? (slug as Filter) : "all");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (f: Filter) => {
    setFilter(f);
    window.history.replaceState(null, "", f === "all" ? path : `${path}#${f}`);
  };

  const visible = projects.filter((p) => filter === "all" || p.filter === filter);

  return (
    <div ref={motionRef} className="homepage-motion dark min-h-screen" style={{ backgroundColor: "#0d0b1a" }}>
      <Header />
      <main style={{ backgroundColor: "#0d0b1a" }}>
        <section className="relative pt-32 pb-10 md:pt-40 md:pb-14 overflow-hidden" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <div data-reveal className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">
              {t("portfolioPage.eyebrow")}
            </div>
            <h1 data-reveal className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              {t("portfolioPage.heading")}
            </h1>
            <p data-reveal className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("portfolioPage.subhead")}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label={t("portfolioPage.filterLabel")}>
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => select(f)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    filter === f
                      ? "border-transparent bg-gradient-hero text-primary-foreground shadow-glow"
                      : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  {t(filterKeys[f])}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const className = "group flex flex-col gap-4 cursor-pointer";
                const content = <PortfolioCardContent project={p} viewLabel={t("work.viewProject")} />;
                return p.to ? (
                  <Link key={p.name} to={p.to} className={className}>{content}</Link>
                ) : (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
                );
              })}
            </div>
          </div>
        </section>

        <section data-reveal className="border-t border-border py-16 md:py-24 text-center" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("portfolioPage.ctaHeading")}</h2>
            <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-7">
              <Link to="/" hash="book">{t("portfolioPage.ctaButton")}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
