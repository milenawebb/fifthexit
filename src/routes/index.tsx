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
} from "lucide-react";
import { z } from "zod";
import openSkedPreview from "@/assets/opensked-preview.png";
import notaryPreview from "@/assets/notary-preview.png";
import rinPreview from "@/assets/rin-preview.png";

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
  company: z.string().trim().max(120).optional(),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().min(1, "Pick a budget"),
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
          Hype Street is a creative dev studio building blazing-fast websites, slick mobile apps,
          and digital products that make competitors sweat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-7">
            <a href="#book">Start a project <ArrowRight className="ml-1 h-4 w-4" /></a>
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
    <section id="services" className="py-12 md:py-20 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
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
  ] as const;
  return (
    <section id="work" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">Selected work</div>
          <h2 className="text-4xl md:text-5xl font-bold">Recent <span className="text-gradient">drops.</span></h2>
          <a href="#book" className="mt-4 text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1">
            Want to be next? <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => {
            const domain = p.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
            return (
              <div key={p.name} className="flex flex-col gap-4 mb-12 md:mb-0">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:work-card group relative block overflow-hidden cursor-pointer border border-border/60 md:transition-all md:duration-300 md:hover:border-transparent"
                  style={{ borderRadius: "8px", background: "#1a1a2e" }}
                >
                  {/* Browser chrome */}
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

                  {/* Screenshot window */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.name} website preview`}
                      className="absolute inset-0 h-full w-full object-cover object-top md:transition-transform md:duration-700 md:group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 grid-bg opacity-10" />

                    {/* Desktop: hover overlay slides up */}
                    <div className="hidden md:flex absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/95 via-black/85 to-black/40 p-5 flex-col text-white">
                      <p className="text-sm text-white/90 mb-3">{p.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-gradient w-fit">
                        View project <ArrowRight className="h-4 w-4 text-accent" />
                      </span>
                    </div>
                  </div>
                </a>

                {/* Label below the browser frame */}
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
      className="glass rounded-2xl p-6 text-center md:text-left transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="text-5xl font-bold font-display text-gradient mb-4">{step.n}</div>
      <h3 className="text-xl font-bold mb-2">{step.t}</h3>
      <p className="text-sm text-muted-foreground">{step.d}</p>
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
    <section id="process" className="py-12 md:py-20 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
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

function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
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
      toast.success("Booking received! We'll reach out within 48 hours.");
    }, 800);
  };

  if (done) {
    return (
      <div className="glass rounded-3xl p-12 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center mb-6 shadow-glow">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">You're on the list 🚀</h3>
        <p className="text-muted-foreground">We'll be in your inbox within 48 hours with next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-10 space-y-5">
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
        <Label htmlFor="company">Company</Label>
        <Input id="company" maxLength={120} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Service *</Label>
          <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
            <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web Development</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="brand">Brand & UI</SelectItem>
              <SelectItem value="full">Full Product Build</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Budget *</Label>
          <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
            <SelectTrigger><SelectValue placeholder="Pick a range" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="5-10k">$5k – $10k</SelectItem>
              <SelectItem value="10-25k">$10k – $25k</SelectItem>
              <SelectItem value="25-50k">$25k – $50k</SelectItem>
              <SelectItem value="50k+">$50k+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Project details *</Label>
        <Textarea
          id="message"
          maxLength={1500}
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your goals, timeline, and any links to inspiration..."
        />
      </div>
      <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow h-12 text-base">
        {submitting ? "Sending..." : "Book my project"}
        {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
      <p className="text-xs text-muted-foreground text-center">We respond within 48 hours. No spam, ever.</p>
    </form>
  );
}

function Booking() {
  return (
    <section id="book" className="py-12 md:py-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
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
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
