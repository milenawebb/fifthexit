import { usePortfolioMotion } from "@/hooks/use-portfolio-motion";
import { Link } from "@tanstack/react-router";
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
import bellhousePreviewAsset from "@/assets/portfolio_bellhouse_real_estate.png.asset.json";
import eliteRidePreview from "@/assets/elite-ride-preview.png";
import clubtreePreview from "@/assets/clubtree-preview.png";
import rotaryCvillePreview from "@/assets/rotary-cville-preview.png";
import webbConsultingPreview from "@/assets/webb-consulting-preview.png";
import m5ConsultPreview from "@/assets/m5-consult-preview.png";
import twillsyPreview from "@/assets/twillsy-preview.png";
import revsiPreviewAsset from "@/assets/portfolio_revsi.png.asset.json";
import yayLogoPreviewAsset from "@/assets/portfolio_yaylogo.png.asset.json";

import { useEstimatorSelections, setEstimatorSelections } from "@/lib/estimator-store";

export default function Work() {
  const { t, i18n } = useTranslation();
  const projects = [
    {
      name: t("work.project1Name"),
      tag: t("work.project1Category"),
      desc: t("work.project1Desc"),
      href: "https://opensked.com/",
      image: openSkedPreview,
    },
    {
      name: t("work.project_yaylogo_name"),
      tag: t("work.project_yaylogo_category"),
      desc: t("work.project_yaylogo_desc"),
      href: "https://yaylogo.com",
      image: yayLogoPreviewAsset.url,
    },
    {
      name: t("work.project_revsi_name"),
      tag: t("work.project_revsi_category"),
      desc: t("work.project_revsi_desc"),
      href: "https://revsi.app",
      image: revsiPreviewAsset.url,
    },
    {
      name: t("work.project_ct_name"),
      tag: t("work.project_ct_category"),
      desc: t("work.project_ct_desc"),
      href: "https://clubtree.app",
      image: clubtreePreview,
    },
    {
      name: t("work.project2Name"),
      tag: t("work.project2Category"),
      desc: t("work.project2Desc"),
      href: "https://notaryclosingnetwork.com/",
      image: notaryPreview,
    },
    {
      name: t("work.project_rc_name"),
      tag: t("work.project_rc_category"),
      desc: t("work.project_rc_desc"),
      href: "https://charlottesvillerotary.org",
      image: rotaryCvillePreview,
    },
    ...(i18n.language.startsWith("bg")
      ? [
          {
            name: t("work.project_m5_name"),
            tag: t("work.project_m5_category"),
            desc: t("work.project_m5_desc"),
            href: "https://mfiveconsult.com",
            image: m5ConsultPreview,
          },
        ]
      : [
          {
            name: t("work.project_wc_name"),
            tag: t("work.project_wc_category"),
            desc: t("work.project_wc_desc"),
            href: "https://webb-consulting.net",
            image: webbConsultingPreview,
          },
        ]),

    {
      name: t("work.project3Name"),
      tag: t("work.project3Category"),
      desc: t("work.project3Desc"),
      href: "https://rinaestheticsva.com/",
      image: rinPreviewAsset.url,
    },
    {
      name: t("work.project4Name"),
      tag: t("work.project4Category"),
      desc: t("work.project4Desc"),
      href: "https://bellhouserealestate.com",
      image: bellhousePreviewAsset.url,
    },
    {
      name: "Elite Ride Solutions",
      tag: "Luxury Transportation",
      desc: "Premium ride booking site for a custom transportation brand.",
      href: "https://eliteridesolutions.com/",
      image: eliteRidePreview,
    },
    {
      name: t("work.project_tw_name"),
      tag: t("work.project_tw_category"),
      desc: t("work.project_tw_desc"),
      href: "https://twillsy.com",
      image: twillsyPreview,
    },
  ];
  const { sectionRef, scrollerRef, trackRef, activeIndex, goTo } = usePortfolioMotion();
  const scrollByCard = (dir: 1 | -1) => goTo(activeIndex + dir);

  return (
    <section ref={sectionRef} id="work" className="portfolio-section py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="portfolio-pin mx-auto max-w-7xl px-6">
        <div data-reveal className="text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("work.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold">{t("work.heading1")} <span className="text-gradient">{t("work.heading2")}</span></h2>
          <a href="#book" className="mt-3 inline-flex text-sm text-muted-foreground hover:text-foreground transition items-center gap-1">
            {t("work.wantToBeNext")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative">
          {/* Arrows */}
          <Button variant="ghost"
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full glass border border-border/60 hover:border-primary/50 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost"
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full glass border border-border/60 hover:border-primary/50 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div
            ref={scrollerRef}
            className="portfolio-scroller relative pb-4 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div ref={trackRef} className="portfolio-track flex gap-6">
            {projects.map((p) => {
              const domain = p.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
              const content = (
                <>
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
                </>
              );
              const className = "snap-start shrink-0 flex flex-col gap-4 w-[85%] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] group cursor-pointer";
              return p.href === "https://rinaestheticsva.com/" ? (
                <Link key={p.name} to="/work/rin-aesthetic-practice" draggable={false} data-card className={className}>{content}</Link>
              ) : p.href === "https://bellhouserealestate.com" ? (
                <Link key={p.name} to="/work/bellhouse-real-estate" draggable={false} data-card className={className}>{content}</Link>
              ) : (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" draggable={false} data-card className={className}>{content}</a>
              );
            })}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex flex-wrap justify-center gap-1 mt-4">
            {projects.map((p, i) => (
              <Button variant="ghost"
                key={p.name}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                onClick={() => goTo(i)}
                className="group inline-flex h-6 min-w-6 shrink-0 items-center justify-center px-1"
              >
                <span
                  className={`block h-2 rounded-full transition-opacity ${
                    i === activeIndex
                      ? "w-2 bg-gradient-hero"
                      : "w-2 bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                  }`}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
