import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useHomeMotion, useMvpFocus } from "@/hooks/use-home-motion";
import StatCounter from "@/components/home/StatCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import { ArrowRight, Check, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import openSkedPreview from "@/assets/opensked-preview.png";
import notaryPreview from "@/assets/notary-preview.png";
import rinPreviewAsset from "@/assets/portfolio_rin_aesthetic.png.asset.json";
import eliteRidePreview from "@/assets/elite-ride-preview.png";
import clubtreePreview from "@/assets/clubtree-preview.png";
import rotaryCvillePreview from "@/assets/rotary-cville-preview.png";
import webbConsultingPreview from "@/assets/webb-consulting-preview.png";
import m5ConsultPreview from "@/assets/m5-consult-preview.png";
import twillsyPreview from "@/assets/twillsy-preview.png";
import revsiPreviewAsset from "@/assets/portfolio_revsi.png.asset.json";
import yayLogoPreviewAsset from "@/assets/portfolio_yaylogo.png.asset.json";


import { lazy, Suspense } from "react";
const PriceEstimator = lazy(() => import("@/components/PriceEstimator"));
const Work = lazy(() => import("@/components/home/Work"));
const Booking = lazy(() => import("@/components/home/Booking"));
import LazySection from "@/components/home/LazySection";
import { useEstimatorSelections, setEstimatorSelections } from "@/lib/estimator-store";
import { getHost } from "@/lib/host.functions";
import { siteMetaForHost } from "@/lib/site-meta";


export const Route = createFileRoute("/")({
  loader: async () => {
    const host = typeof window === "undefined" ? await getHost() : window.location.host;
    return { site: siteMetaForHost(host) };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site ?? siteMetaForHost(null);
    return {
      meta: [
        { title: site.title },
        { name: "description", content: site.description },
        { property: "og:title", content: site.ogTitle },
        { property: "og:type", content: "website" },
        { property: "og:description", content: site.description },
        { property: "og:url", content: site.origin },
        { property: "og:image", content: site.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: site.ogTitle },
        { name: "twitter:description", content: site.description },
        { name: "twitter:image", content: site.image },
      ],
    };
  },
  component: Index,
});


const services = [
  {
    titleKey: "services.webDev",
    descKey: "services.webDevDesc",
  },
  {
    titleKey: "services.mobileApps",
    descKey: "services.mobileAppsDesc",
  },
  {
    titleKey: "services.brandUI",
    descKey: "services.brandUIDesc",
  },
  {
    titleKey: "services.launchScale",
    descKey: "services.launchScaleDesc",
  },
];

import { Header, Footer } from "@/components/site-chrome";

function Hero() {
  const { t } = useTranslation();
  return (
    <section id="top" className="hero-depth relative pt-24 pb-10 md:pt-28 md:pb-16 overflow-hidden" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="hero-glow absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] pointer-events-none" />
      <div className="hero-glow absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/30 blur-[100px] pointer-events-none animate-float" />

      <div className="hero-content relative mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          {t("hero.heading1")} <br />
          <span className="text-gradient">{t("hero.heading2")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
          {t("hero.subheading")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-7">
            <a href="#estimator">{t("hero.ctaPrimary")} <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-7 glass">
            <a href="#work">{t("hero.ctaSecondary")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}


function Services() {
  const { t } = useTranslation();
  return (
    <section id="services" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="max-w-2xl mx-auto text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("services.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("services.heading1")} <span className="text-gradient">{t("services.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("services.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.titleKey}
              data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="group bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-glow text-center md:text-left flex flex-col items-center md:items-start"
            >
              <h3 className="text-xl font-bold mb-2">{t(s.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const { t } = useTranslation();
  const row1 = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Vue", icon: "🟢" },
    { name: "React Native", icon: "📱" },
    { name: "Swift UI", icon: "🦅" },
    { name: "Tailwind CSS", icon: "🌬️" },
    { name: "Framer Motion", icon: "🎞️" },
    { name: "GSAP", icon: "💚" },
    { name: "Figma", icon: "🎨" },
  ];
  const row2 = [
    { name: "Node.js", icon: "🟩" },
    { name: "Python", icon: "🐍" },
    { name: "Supabase", icon: "⚡" },
    { name: "Firebase", icon: "🔥" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "GraphQL", icon: "◈" },
    { name: "REST APIs", icon: "🔌" },
    { name: "Vercel", icon: "▲" },
    { name: "AWS", icon: "☁️" },
    { name: "Cloudflare", icon: "🟧" },
  ];
  const stats = [
    { v: t("stack.stat1Value"), d: t("stack.stat1Desc") },
    { v: t("stack.stat2Value"), d: t("stack.stat2Desc") },
    { v: t("stack.stat3Value"), d: t("stack.stat3Desc") },
  ];

  const Pill = ({ p }: { p: { name: string; icon: string } }) => (
    <div className="tech-pill group relative inline-flex items-center gap-2 rounded-full border border-border/60 bg-[#16142a] px-4 py-2 text-sm text-foreground/90 whitespace-nowrap transition-colors">
      <span className="text-base leading-none">{p.icon}</span>
      <span className="font-medium">{p.name}</span>
    </div>
  );

  const Marquee = ({ items, reverse = false }: { items: { name: string; icon: string }[]; reverse?: boolean }) => (
    <div role="region" tabIndex={0} aria-label={items.map(item => item.name).join(", ")} className={`marquee${reverse ? " reverse" : ""} group relative`}>
      <div className="flex gap-3 w-max">
        {[...items, ...items].map((p, i) => (
          <Pill key={`${p.name}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="stack" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <style>{`
        @keyframes techMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee { overflow: hidden; }
        .marquee > div {
          animation: techMarquee 20s linear infinite;
        }
        .marquee.reverse > div {
          animation-direction: reverse;
        }
        .marquee:hover > div, .marquee:focus-within > div { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) { .marquee > div { animation: none; } }
        .tech-pill { position: relative; }
        .tech-pill::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          padding: 1px;
          background: var(--gradient-hero);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .tech-pill:hover::before { opacity: 1; }
        .tech-pill:hover { box-shadow: 0 0 20px -4px oklch(0.72 0.25 330 / 0.5); }
      `}</style>
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="max-w-2xl mx-auto text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("stack.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("stack.heading1")} <span className="text-gradient">{t("stack.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("stack.subheading")}
          </p>
        </div>

        <div className="space-y-4 mb-10 -mx-6 px-6">
          <Marquee items={row1} />
          <Marquee items={row2} reverse />
        </div>

        <div className="flex flex-row gap-3 md:gap-5">
          {stats.map((s, i) => (
            <div
              key={s.v}
              data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="flex-1 basis-0 min-w-0 bg-gradient-card border border-border rounded-2xl p-3 md:p-6 text-center"
            >
              <div className="text-[2rem] md:text-5xl font-bold font-display text-gradient mb-2 leading-none"><StatCounter value={s.v} index={i} /></div>
              <p className="text-xs md:text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function ProcessCard({ step, index }: { step: { n: string; t: string; d: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="glass rounded-2xl p-6 text-center md:text-left"
        style={{
          animation: visible ? "process-float 3s ease-in-out infinite" : undefined,
          animationDelay: visible ? `${index * 0.4 + 0.5}s` : undefined,
        }}
      >
        <div className="text-5xl font-bold font-display text-gradient mb-4">{step.n}</div>
        <h3 className="text-xl font-bold mb-2">{step.t}</h3>
        <p className="text-sm text-muted-foreground">{step.d}</p>
      </div>
    </div>
  );
}

function Process() {
  const { t } = useTranslation();
  const steps = [
    { n: t("process.step1Number"), t: t("process.step1Title"), d: t("process.step1Desc") },
    { n: t("process.step2Number"), t: t("process.step2Title"), d: t("process.step2Desc") },
    { n: t("process.step3Number"), t: t("process.step3Title"), d: t("process.step3Desc") },
    { n: t("process.step4Number"), t: t("process.step4Title"), d: t("process.step4Desc") },
  ];
  return (
    <section id="process" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("process.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold">{t("process.heading1")} <span className="text-gradient">{t("process.heading2")}</span></h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <ProcessCard key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("process");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setVisible(window.scrollY >= top);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground shadow-glow transition-all duration-300 hover:opacity-90 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

const mvpSteps = [
  { titleKey: "mvp.step1Title", descKey: "mvp.step1Desc" },
  { titleKey: "mvp.step2Title", descKey: "mvp.step2Desc" },
  { titleKey: "mvp.step3Title", descKey: "mvp.step3Desc" },
  { titleKey: "mvp.step4Title", descKey: "mvp.step4Desc" },
];

function MvpStepCard({ step, index }: { step: typeof mvpSteps[number]; index: number }) {
  const { t } = useTranslation();
  return (
    <div data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
      <div data-mvp-step className={`mvp-step-card rounded-2xl p-6 border border-border/60 h-full${index === 0 ? " mvp-active" : ""}`}>
        <h3 className="text-xl font-bold mb-2 text-gradient inline-block">{t(step.titleKey)}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
      </div>
    </div>
  );
}

function MvpJourney() {
  const { t } = useTranslation();
  const ref = useMvpFocus();
  return (
    <section ref={ref} id="mvp-journey" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mvp-layout mx-auto max-w-6xl px-6">
        <div data-reveal className="mvp-intro max-w-2xl mx-auto text-center mb-10">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("mvp.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("mvp.heading1")} <span className="text-gradient">{t("mvp.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("mvp.subheading")}</p>
          <div className="mvp-progress" aria-hidden="true"><span /></div>
        </div>
        <div className="mvp-steps grid gap-5">
          {mvpSteps.map((s, i) => (
            <MvpStepCard key={s.titleKey} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Practices() {
  const { t, i18n } = useTranslation();
  if (i18n.language === "bg") return null;
  return (
    <section className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-3xl px-6">
        <div data-reveal className="max-w-2xl mx-auto text-center">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("routing.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("routing.heading1")} <span className="text-gradient">{t("routing.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">{t("routing.body")}</p>
          <a
            href="https://webb-consulting.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-base md:text-lg font-medium text-accent underline underline-offset-4 hover:text-foreground transition"
          >
            {t("routing.link")}
          </a>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const motionRef = useHomeMotion();
  return (
    <div ref={motionRef} className="homepage-motion dark min-h-screen" style={{ backgroundColor: "#0d0b1a" }}>
      <Toaster theme="dark" position="top-center" />
      <Header />
      <main style={{ backgroundColor: "#0d0b1a" }}>
        <Hero />
        <Services />
        <MvpJourney />
        <TechStack />
        <LazySection id="work" minHeight={900} className="portfolio-reservation"><Work /></LazySection>
        <Process />
        <section id="estimator" className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
          <div data-reveal className="mx-auto max-w-5xl px-6">
            <LazySection id="estimator-inner" minHeight={640}><PriceEstimator /></LazySection>
          </div>
        </section>
        <LazySection id="book" minHeight={1000}><Booking /></LazySection>
        <Practices />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
