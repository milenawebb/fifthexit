import { Header, Footer } from "@/components/site-chrome";
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
      <Header />

      {/* Page header (offset for fixed nav) */}
      <section className="border-b border-border/60 pt-24 pb-6 md:pt-28 md:pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <h1
            className="text-gradient text-4xl md:text-6xl font-bold tracking-tight"
          >
            {title}
          </h1>
          {effectiveDate && (
            <p className="mt-3 text-sm text-muted-foreground">{effectiveDate}</p>
          )}
        </div>
      </section>

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Table of contents">
              <p
                className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
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

          <article className="min-w-0 max-w-3xl text-foreground/90 leading-relaxed">
            {children}
          </article>
        </div>
      </div>

      <Footer />
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
      >
        {title}
      </h2>
      <div className="space-y-4 text-base text-foreground/80">{children}</div>
    </section>
  );
}
