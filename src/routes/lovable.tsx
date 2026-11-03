import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import Booking from "@/components/home/Booking";
import { useHomeMotion } from "@/hooks/use-home-motion";
import { getHost } from "@/lib/host.functions";
import { siteMetaForHost } from "@/lib/site-meta";
import { loadMessages } from "@/i18n";

const path = "/lovable";

interface LovableCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  ctaReview: string;
  ctaIncluded: string;
  heroNote: string;
  last20Title: string;
  last20Intro: string;
  items: { label: string; text: string }[];
  howTitle: string;
  steps: { n: string; title: string; text: string }[];
  proofTitle: string;
  stats: { value: string; label: string }[];
  proofSource: string;
  recentTitle: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
}

export const Route = createFileRoute("/lovable")({
  loader: async () => {
    const host = typeof window === "undefined" ? await getHost() : window.location.host;
    const site = siteMetaForHost(host);
    const messages = await loadMessages("en");
    const copy = messages.lovablePage as LovableCopy;
    return {
      origin: site.origin,
      title: copy.metaTitle,
      description: copy.metaDescription,
      image: siteMetaForHost("fifthexit.com").image,
      copy,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "fifthexit" }, { name: "robots", content: "noindex" }] };
    const { origin, title, description, image } = loaderData;
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
  component: LovablePage,
  errorComponent: () => <p role="alert" className="px-6 py-24 text-foreground">Finish my Lovable site: page unavailable.</p>,
});

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl bg-gradient-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold">{q}</span>
        <span aria-hidden="true" className="shrink-0 text-accent text-xl leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}

function LovablePage() {
  const { copy } = Route.useLoaderData();
  const motionRef = useHomeMotion();
  return (
    <div ref={motionRef} className="homepage-motion dark min-h-screen" style={{ backgroundColor: "#0d0b1a" }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] pointer-events-none" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{copy.eyebrow}</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">{copy.h1}</h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">{copy.subhead}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-7">
                <Link to="/" hash="book">{copy.ctaReview}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 glass">
                <a href="#included">{copy.ctaIncluded}</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{copy.heroNote}</p>
          </div>
        </section>

        {/* The last 20% */}
        <section id="included" className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-5xl px-6">
            <div data-reveal className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{copy.last20Title}</h2>
              <p className="text-muted-foreground text-lg">{copy.last20Intro}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {copy.items.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-5xl px-6">
            <div data-reveal className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold">{copy.howTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {copy.steps.map((step, i) => (
                <div
                  key={step.n}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="glass rounded-2xl p-6"
                >
                  <div className="text-5xl font-bold font-display text-gradient mb-4">{step.n}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-5xl px-6">
            <div data-reveal className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold">{copy.proofTitle}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3 mb-4">
              {copy.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8 text-center"
                >
                  <p className="mb-3 font-display text-5xl font-bold text-accent">{stat.value}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <p data-reveal className="text-xs text-muted-foreground text-center mb-10">{copy.proofSource}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-3xl px-6">
            <div data-reveal className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold">{copy.faqTitle}</h2>
            </div>
            <div data-reveal className="space-y-3">
              {copy.faq.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA with quick-question form */}
        <Booking defaultTab="question" requireSiteUrl heading={copy.ctaTitle} />
      </main>
      <Footer />
    </div>
  );
}
