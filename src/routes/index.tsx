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
} from "lucide-react";
import { z } from "zod";
import openSkedPreview from "@/assets/opensked-preview.png";
import notaryPreview from "@/assets/notary-preview.png";
import rinPreview from "@/assets/rin-preview.png";
import eliteRidePreview from "@/assets/elite-ride-preview.png";
import PriceEstimator from "@/components/PriceEstimator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hype Street — Web & App Development that Hits Different" },
      {
        name: "description",
        content:
          "Hype Street builds vibrant, high-performance web and mobile apps for brands ready to stand out. Book a project consultation today.",
      },
      { property: "og:title", content: "Hype Street — Web & App Development" },
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
    title: "Web Development",
    desc: "Lightning-fast, conversion-driven websites built with modern stacks.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-feel iOS & Android apps that users actually open daily.",
  },
  {
    icon: Sparkles,
    title: "Brand & UI",
    desc: "Bold visual identities and interfaces designed to turn heads.",
  },
  {
    icon: Zap,
    title: "Launch & Scale",
    desc: "From MVP to millions — we ship fast and iterate faster.",
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
  return (
    <section id="top" className="relative pt-24 pb-10 md:pt-28 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/30 blur-[100px] pointer-events-none animate-float" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          Web & app dev <br />
          <span className="text-gradient">built with hype.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
          hype/street is a creative dev studio building blazing-fast websites, slick mobile apps,
          and digital products that make competitors sweat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-7">
            <a href="#estimator">Start a project <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-7 glass">
            <a href="#work">See our work</a>
          </Button>
        </div>
      </div>
    </section>
  );
}


function Services() {
  return (
    <section id="services" className="py-12 md:pt-16 md:pb-16 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">What we do</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Full-stack craft, <span className="text-gradient">zero compromise.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From the first sketch to scaling on launch day — we handle every layer of your product.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-glow text-center md:text-left flex flex-col items-center md:items-start"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 shadow-glow">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const projects = [
    {
      name: "OpenSked™",
      tag: "Task & Scheduling",
      desc: "Modern scheduling platform for teams that move fast.",
      href: "https://opensked.com/",
      image: openSkedPreview,
    },
    {
      name: "Notary Closing Network",
      tag: "Business Website",
      desc: "Nationwide notary marketplace with a polished brand.",
      href: "https://notaryclosingnetwork.com/",
      image: notaryPreview,
    },
    {
      name: "RIN Aesthetic Practice",
      tag: "Cosmetic Studio Site",
      desc: "Elegant site for a luxury aesthetic studio in VA.",
      href: "https://rinaestheticsva.com/",
      image: rinPreview,
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
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
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
    <section id="work" className="py-12 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">Selected work</div>
          <h2 className="text-4xl md:text-5xl font-bold">Recent <span className="text-gradient">drops.</span></h2>
          <a href="#book" className="mt-3 inline-flex text-sm text-muted-foreground hover:text-foreground transition items-center gap-1">
            Want to be next? <ArrowRight className="h-4 w-4" />
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
                <div
                  key={p.name}
                  data-card
                  className="snap-center shrink-0 flex flex-col gap-4 w-[85%] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)]"
                >
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className="work-card group relative block overflow-hidden cursor-pointer border border-border/60 md:transition-all md:duration-300 md:hover:border-transparent"
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
                          View project <ArrowRight className="h-4 w-4 text-accent" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <div className="px-1">
                    <div className="text-xs uppercase tracking-widest text-accent mb-1">{p.tag}</div>
                    <div className="text-xl font-bold font-display mb-2">{p.name}</div>
                    <p className="text-sm text-muted-foreground mb-2 md:hidden">{p.desc}</p>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      View project <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
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
  const steps = [
    { n: "01", t: "Discovery", d: "We dig into your goals, audience, and vibes." },
    { n: "02", t: "Design", d: "Bold concepts, real prototypes, fast feedback." },
    { n: "03", t: "Build", d: "Modern stacks, clean code, weekly demos." },
    { n: "04", t: "Launch", d: "Ship, monitor, iterate. We stick around." },
  ];
  return (
    <section id="process" className="py-12 md:pt-16 md:pb-16 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">How we roll</div>
          <h2 className="text-4xl md:text-5xl font-bold">A simple <span className="text-gradient">4-step process.</span></h2>
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

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

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

function formatDayLabel(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const days = getNextDays(7);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast.success("Consult booked! We'll confirm within 2 hours.");
    }, 800);
  };

  if (done) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center mb-6 shadow-glow">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">You're on the list 🚀</h3>
        <p className="text-muted-foreground">We'll confirm your consult within 2 hours.</p>
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
        <Label>Pick a day *</Label>
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
                {formatDayLabel(d)}
              </button>
            );
          })}
        </div>
      </div>

      {form.date && (
        <div className="space-y-3">
          <Label>Pick a time *</Label>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((t) => {
              const selected = form.time === t;
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, time: t })}
                  className={`${pillBase} ${selected ? pillSelected : pillIdle}`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Rivera" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" maxLength={160} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="alex@brand.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your project *</Label>
        <Textarea
          id="message"
          maxLength={1500}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="A quick overview of goals, timeline, and any links..."
        />
      </div>

      <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow h-12 text-base">
        {submitting ? "Sending..." : "Confirm my consult"}
        {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Free 30-minute discovery call · We respond within 2 hours to confirm
      </p>
    </form>
  );
}

function Booking() {
  return (
    <section id="book" className="py-12 md:pt-16 md:pb-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">Let's build</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Book your <span className="text-gradient">free consult.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us what you're cooking up. We'll come back with ideas, timeline, and a quote.
          </p>
        </div>
        <BookingForm />
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
      setVisible(window.scrollY >= el.offsetTop);
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

function Index() {
  return (
    <div className="min-h-screen">
      <Toaster theme="dark" position="top-center" />
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <section id="estimator" className="py-12 md:pt-16 md:pb-16">
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
