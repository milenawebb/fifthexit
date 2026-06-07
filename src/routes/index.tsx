import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
import {
  Smartphone,
  Sparkles,
  Zap,
  Globe,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Lightbulb,
  Palette,
  FileText,
  Rocket,
} from "lucide-react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import openSkedPreview from "@/assets/opensked-preview.png";
import notaryPreview from "@/assets/notary-preview.png";
import rinPreview from "@/assets/rin-preview.png";
import bellhousePreview from "@/assets/bellhouse-preview.png";
import eliteRidePreview from "@/assets/elite-ride-preview.png";
import PriceEstimator from "@/components/PriceEstimator";
import { useEstimatorSelections, setEstimatorSelections } from "@/lib/estimator-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "hype/street builds vibrant, high-performance web and mobile apps for brands ready to stand out. Book a project consultation today.",
      },
      {
        property: "og:description",
        content: "Sleek, vibrant web & app development. Book your project today.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Globe,
    titleKey: "services.webDev",
    descKey: "services.webDevDesc",
  },
  {
    icon: Smartphone,
    titleKey: "services.mobileApps",
    descKey: "services.mobileAppsDesc",
  },
  {
    icon: Sparkles,
    titleKey: "services.brandUI",
    descKey: "services.brandUIDesc",
  },
  {
    icon: Zap,
    titleKey: "services.launchScale",
    descKey: "services.launchScaleDesc",
  },
];

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1500),
});

import { Header, Footer } from "@/components/site-chrome";

function Hero() {
  const { t } = useTranslation();
  return (
    <section id="top" className="relative pt-24 pb-10 md:pt-28 md:pb-16 overflow-hidden" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/30 blur-[100px] pointer-events-none animate-float" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
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
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("services.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("services.heading1")} <span className="text-gradient">{t("services.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("services.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.titleKey}
              className="group bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-glow text-center md:text-left flex flex-col items-center md:items-start"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 shadow-glow">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
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
    <div className={`marquee${reverse ? " reverse" : ""} group relative`}>
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
        .marquee:hover > div { animation-play-state: paused !important; }
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
        <div className="max-w-2xl mx-auto text-center mb-8">
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
          {stats.map((s) => (
            <div
              key={s.v}
              className="flex-1 basis-0 min-w-0 bg-gradient-card border border-border rounded-2xl p-3 md:p-6 text-center"
            >
              <div className="text-[2rem] md:text-5xl font-bold font-display text-gradient mb-2 leading-none">{s.v}</div>
              <p className="text-xs md:text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const { t } = useTranslation();
  const projects = [
    {
      name: t("work.project1Name"),
      tag: t("work.project1Category"),
      desc: t("work.project1Desc"),
      href: "https://opensked.com/",
      image: openSkedPreview,
    },
    {
      name: t("work.project2Name"),
      tag: t("work.project2Category"),
      desc: t("work.project2Desc"),
      href: "https://notaryclosingnetwork.com/",
      image: notaryPreview,
    },
    {
      name: t("work.project3Name"),
      tag: t("work.project3Category"),
      desc: t("work.project3Desc"),
      href: "https://rinaestheticsva.com/",
      image: rinPreview,
    },
    {
      name: t("work.project4Name"),
      tag: t("work.project4Category"),
      desc: t("work.project4Desc"),
      href: "https://bellhouserealestate.com",
      image: bellhousePreview,
    },
    {
      name: "Elite Ride Solutions",
      tag: "Luxury Transportation",
      desc: "Premium ride booking site for a custom transportation brand.",
      href: "https://eliteridesolutions.com/",
      image: eliteRidePreview,
    },
  ] as const;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-card]");
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Click & drag (desktop)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        try { el.setPointerCapture(e.pointerId); } catch {}
      }
      if (moved) el.scrollLeft = startScroll - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      try { el.releasePointerCapture(e.pointerId); } catch {}
      if (moved) {
        const prevent = (ev: Event) => { ev.preventDefault(); ev.stopPropagation(); el.removeEventListener("click", prevent, true); };
        el.addEventListener("click", prevent, true);
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const target = cards[i];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="work" className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("work.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold">{t("work.heading1")} <span className="text-gradient">{t("work.heading2")}</span></h2>
          <a href="#book" className="mt-3 inline-flex text-sm text-muted-foreground hover:text-foreground transition items-center gap-1">
            {t("work.wantToBeNext")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full glass border border-border/60 hover:border-primary/50 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full glass border border-border/60 hover:border-primary/50 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-6 snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none"
            style={{
              cursor: "grab",
              overflowX: "scroll",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              touchAction: "pan-x",
            }}
          >
            {projects.map((p) => {
              const domain = p.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
              return (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  data-card
                  className="snap-start shrink-0 flex flex-col gap-4 w-[85%] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] group cursor-pointer"
                  style={{ scrollSnapAlign: "start", flexShrink: 0 }}
                >
                  <div
                    className="work-card relative block overflow-hidden border border-border/60 md:transition-all md:duration-300 md:group-hover:border-transparent"
                    style={{ borderRadius: "8px", background: "#1a1a2e" }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-[#1a1a2e]">
                      <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 mx-2 flex justify-center">
                        <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/60 font-mono truncate max-w-full">
                          {domain}
                        </div>
                      </div>
                      <div className="w-[42px]" />
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={`${p.name} website preview`}
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover object-top md:transition-transform md:duration-700 md:group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 grid-bg opacity-10" />
                      <div className="hidden md:flex absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/95 via-black/85 to-black/40 p-5 flex-col text-white">
                        <p className="text-sm text-white/90 mb-3">{p.desc}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-gradient w-fit">
                          {t("work.viewProject")} <ArrowRight className="h-4 w-4 text-accent" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-1">
                    <div className="text-xs uppercase tracking-widest text-accent mb-1">{p.tag}</div>
                    <div className="text-xl font-bold font-display mb-2 text-foreground">{p.name}</div>
                    <p className="text-sm text-muted-foreground mb-2 md:hidden">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition">
                      {t("work.viewProject")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "w-8 bg-gradient-hero"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
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
        <div className="text-center max-w-2xl mx-auto mb-8">
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

const SLOT_POOL = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed: number) {
  let s = seed || 1;
  return () => {
    s = Math.imul(s ^ (s >>> 15), 2246822507);
    s = Math.imul(s ^ (s >>> 13), 3266489909);
    s ^= s >>> 16;
    return (s >>> 0) / 4294967296;
  };
}

function slotsForDate(dateKey: string): string[] {
  const rand = seededRandom(hashString(dateKey));
  const count = 4 + Math.floor(rand() * 3); // 4..6
  const pool = [...SLOT_POOL];
  // Fisher-Yates with seeded rand
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const picked = pool.slice(0, count);
  picked.sort((a, b) => {
    const [ah, am] = a.split(":").map(Number);
    const [bh, bm] = b.split(":").map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });
  return picked;
}

function formatSlot(slot: string, locale: string) {
  if (locale === "bg") return slot;
  const [h, m] = slot.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${period}`;
}

function getNextDays(count: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDayLabel(d: Date, locale: string) {
  const tag = locale === "bg" ? "bg-BG" : "en-US";
  return d.toLocaleDateString(tag, { weekday: "short", month: "long", day: "numeric" });
}

function BookingForm() {
  const { t, i18n } = useTranslation();
  const estimator = useEstimatorSelections();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [takenSlots, setTakenSlots] = useState<Set<string>>(new Set());
  const days = getNextDays(7);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/public/booking-taken-slots")
        .then((r) => (r.ok ? r.json() : { taken: [] }))
        .then((d) => {
          if (!cancelled) setTakenSlots(new Set(d.taken ?? []));
        })
        .catch(() => {});
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    setSubmitting(true);
    try {
      let clientTimezone: string | undefined;
      try {
        clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
      } catch {
        clientTimezone = undefined;
      }
      const res = await fetch("/api/public/booking-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          locale: i18n.language,
          estimator: estimator ?? undefined,
          clientTimezone,
        }),
      });
      if (res.status === 409) {
        setTakenSlots((prev) => new Set(prev).add(`${result.data.date}|${result.data.time}`));
        setForm((f) => ({ ...f, time: "" }));
        toast.error(
          i18n.language === "bg"
            ? "Този час вече е зает. Моля, изберете друг."
            : "That time is already booked. Please pick another slot.",
        );
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDone(true);
      setEstimatorSelections(null);
      toast.success("Your consult is confirmed.");
    } catch (err) {
      console.error("Booking submit failed", err);
      toast.error("Could not submit. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center mb-6 shadow-glow">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">You're on the list 🚀</h3>
        <p className="text-muted-foreground">Your consult is confirmed.</p>
      </div>
    );
  }

  const pillBase =
    "px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer select-none";
  const pillIdle = "border-border/60 text-muted-foreground hover:text-foreground hover:border-border";
  const pillSelected =
    "text-foreground border-transparent bg-gradient-hero shadow-glow [background-clip:padding-box]";

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-10 space-y-6">
      <div className="space-y-3">
        <Label>{t("booking.pickDay")} *</Label>
        <div className="flex flex-wrap gap-2">
          {days.map((d) => {
            const key = formatDayKey(d);
            const selected = form.date === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setForm({ ...form, date: key, time: "" })}
                className={`${pillBase} ${selected ? pillSelected : pillIdle}`}
              >
                {formatDayLabel(d, i18n.language)}
              </button>
            );
          })}
        </div>
      </div>

      {form.date && (
        <div className="space-y-3">
          <Label>{t("booking.pickTime")} *</Label>
          <div className="flex flex-wrap gap-2">
            {slotsForDate(form.date).map((slot) => {
              const selected = form.time === slot;
              const taken = takenSlots.has(`${form.date}|${slot}`);
              return (
                <button
                  type="button"
                  key={slot}
                  disabled={taken}
                  onClick={() => !taken && setForm({ ...form, time: slot })}
                  className={`${pillBase} ${
                    taken
                      ? "border-border/30 text-muted-foreground/40 line-through cursor-not-allowed"
                      : selected
                      ? pillSelected
                      : pillIdle
                  }`}
                >
                  {formatSlot(slot, i18n.language)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">{t("booking.name")} *</Label>
          <Input id="name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("booking.namePlaceholder")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("booking.email")} *</Label>
          <Input id="email" type="email" maxLength={160} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="alex@brand.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("booking.projectDetails")} *</Label>
        <Textarea
          id="message"
          maxLength={1500}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t("booking.projectPlaceholder")}
        />
      </div>

      <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow h-12 text-base">
        {submitting ? "..." : t("booking.confirmButton")}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        {t("booking.callInfo")}
      </p>
    </form>
  );
}

function QuickQuestionForm() {
  const { t, i18n } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const schema = z.object({
      name: z.string().trim().min(2).max(80),
      email: z.string().trim().email().max(160),
      message: z.string().trim().min(2).max(2000),
    });
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/quick-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, locale: i18n.language }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDone(true);
      toast.success(t("booking.questionSuccess"));
    } catch (err) {
      console.error("Quick question failed", err);
      toast.error("Could not submit. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center mb-6 shadow-glow">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <p className="text-muted-foreground">{t("booking.questionSuccess")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="qq-name">{t("booking.name")} *</Label>
          <Input id="qq-name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("booking.namePlaceholder")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qq-email">{t("booking.email")} *</Label>
          <Input id="qq-email" type="email" maxLength={160} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="alex@brand.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="qq-message">{t("booking.message")} *</Label>
        <Textarea
          id="qq-message"
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t("booking.messagePlaceholder")}
        />
      </div>
      <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow h-12 text-base">
        {submitting ? "..." : t("booking.sendMessage")}
      </Button>
    </form>
  );
}

function Booking() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"book" | "question">("book");
  return (
    <section id="book" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("booking.label")}</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("booking.heading1")} <span className="text-gradient">{t("booking.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("booking.subheading")}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div role="tablist" className="inline-flex items-center gap-1 p-1 rounded-full border border-border/60 bg-[#16142a]">
            {([
              { id: "book", label: t("booking.tabBook") },
              { id: "question", label: t("booking.tabQuestion") },
            ] as const).map((tb) => {
              const active = tab === tb.id;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "bg-gradient-hero text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tb.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div
            key={tab}
            className="animate-in fade-in duration-300"
          >
            {tab === "book" ? <BookingForm /> : <QuickQuestionForm />}
          </div>
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
  { icon: Lightbulb, titleKey: "mvp.step1Title", descKey: "mvp.step1Desc" },
  { icon: Palette, titleKey: "mvp.step2Title", descKey: "mvp.step2Desc" },
  { icon: FileText, titleKey: "mvp.step3Title", descKey: "mvp.step3Desc" },
  { icon: Rocket, titleKey: "mvp.step4Title", descKey: "mvp.step4Desc" },
];

function MvpStepCard({ step, index }: { step: typeof mvpSteps[number]; index: number }) {
  const { t } = useTranslation();
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
  const Icon = step.icon;
  return (
    <div
      ref={ref}
      className="mvp-step-card rounded-2xl p-6 border border-border/60 h-full"
      style={{
        backgroundColor: "#1a1530",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition:
          "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div
        className="mvp-icon-badge h-11 w-11 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 shadow-glow"
        style={{
          animation: `process-float 3s ease-in-out ${index * 0.4}s infinite`,
          transition: "transform 0.3s ease",
        }}
      >
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gradient inline-block">{t(step.titleKey)}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
    </div>
  );
}

function MvpJourney() {
  const { t } = useTranslation();
  return (
    <section id="mvp-journey" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("mvp.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("mvp.heading1")} <span className="text-gradient">{t("mvp.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("mvp.subheading")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {mvpSteps.map((s, i) => (
            <MvpStepCard key={s.titleKey} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="dark min-h-screen" style={{ backgroundColor: "#0d0b1a" }}>
      <Toaster theme="dark" position="top-center" />
      <Header />
      <main style={{ backgroundColor: "#0d0b1a" }}>
        <Hero />
        <Services />
        <MvpJourney />
        <TechStack />
        <Work />
        <Process />
        <section id="estimator" className="py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
          <div className="mx-auto max-w-5xl px-6">
            <PriceEstimator />
          </div>
        </section>
        <Booking />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
