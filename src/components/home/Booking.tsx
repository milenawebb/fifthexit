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
import rinPreviewAsset from "@/assets/portfolio_rin_aesthetic.png.asset.json";
import eliteRidePreview from "@/assets/elite-ride-preview.png";
import clubtreePreview from "@/assets/clubtree-preview.png";
import rotaryCvillePreview from "@/assets/rotary-cville-preview.png";
import webbConsultingPreview from "@/assets/webb-consulting-preview.png";
import m5ConsultPreview from "@/assets/m5-consult-preview.png";
import twillsyPreview from "@/assets/twillsy-preview.png";
import revsiPreviewAsset from "@/assets/portfolio_revsi.png.asset.json";
import yayLogoPreviewAsset from "@/assets/portfolio_yaylogo.png.asset.json";

import { useEstimatorSelections, setEstimatorSelections } from "@/lib/estimator-store";


const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1500),
});

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
      toast.success(t("booking.successSubtext"));
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
        <h3 className="text-2xl font-bold mb-2">{t("booking.successHeading")}</h3>
        <p className="text-muted-foreground">{t("booking.successSubtext")}</p>
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

function QuickQuestionForm({ requireSiteUrl = false }: { requireSiteUrl?: boolean }) {
  const { t, i18n } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", siteUrl: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const schema = z.object({
      name: z.string().trim().min(2).max(80),
      email: z.string().trim().email().max(160),
      message: z.string().trim().min(2).max(2000),
      siteUrl: requireSiteUrl
        ? z.string().trim().url("Enter a valid URL").max(300)
        : z.string().trim().max(300).optional(),
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
      {requireSiteUrl && (
        <div className="space-y-2">
          <Label htmlFor="qq-site-url">{t("booking.siteUrl")} *</Label>
          <Input id="qq-site-url" type="url" maxLength={300} value={form.siteUrl} onChange={(e) => setForm({ ...form, siteUrl: e.target.value })} placeholder={t("booking.siteUrlPlaceholder")} />
        </div>
      )}
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

export default function Booking({ defaultTab = "book", requireSiteUrl = false, heading }: { defaultTab?: "book" | "question"; requireSiteUrl?: boolean; heading?: string }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"book" | "question">(defaultTab);
  return (
    <section id="book" className="py-12 md:pt-16 md:pb-16 relative" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div data-reveal className="text-center mb-8">
          {heading ? (
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{heading}</h2>
          ) : (
            <>
              <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("booking.label")}</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {t("booking.heading1")} <span className="text-gradient">{t("booking.heading2")}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {t("booking.subheading")}
              </p>
            </>
          )}
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

        <div data-reveal className="relative">
          <div
            key={tab}
            className="animate-fade-only duration-300"
          >
            {tab === "book" ? <BookingForm /> : <QuickQuestionForm requireSiteUrl={requireSiteUrl} />}
          </div>
        </div>
      </div>
    </section>
  );
}
