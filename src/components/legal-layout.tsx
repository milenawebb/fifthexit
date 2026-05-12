import { Link } from "@tanstack/react-router";
import { ArrowLeft, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function LegalLayout({
  title,
  effectiveDate,
  toc,
  children,
}: {
  title: string;
  effectiveDate?: string;
  toc: TocItem[];
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d0b1a" }}>
      {/* Sticky top nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl bg-[#0d0b1a]/80">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-lg">Hype Street</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Page header */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <h1
            className="text-gradient text-4xl md:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {title}
          </h1>
          {effectiveDate && (
            <p className="mt-4 text-sm text-muted-foreground">{effectiveDate}</p>
          )}
        </div>
      </section>

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
          {/* Sticky TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Table of contents">
              <p
                className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                On this page
              </p>
              <ul className="space-y-1.5 text-sm border-l border-border/60">
                {toc.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block pl-4 -ml-px py-1 border-l-2 transition-colors ${
                          isActive
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="min-w-0 max-w-3xl text-foreground/90 leading-relaxed">
            {children}
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 mt-16">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-hero">
              <Code2 className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            Hype Street
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              Cookies
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Hype Street</p>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <h2
        className="text-2xl md:text-3xl font-bold mb-4 text-gradient"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-base text-foreground/80">{children}</div>
    </section>
  );
}
