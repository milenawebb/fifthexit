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
import { getPortfolioProjects } from "@/lib/portfolio-projects";
import { PortfolioCardContent } from "@/components/work/PortfolioCard";

import { useEstimatorSelections, setEstimatorSelections } from "@/lib/estimator-store";

export default function Work() {
  const { t, i18n } = useTranslation();
  const projects = getPortfolioProjects(t, i18n.language);
  const { sectionRef, scrollerRef, trackRef, activeIndex, goTo } = usePortfolioMotion();
  const scrollByCard = (dir: 1 | -1) => goTo(activeIndex + dir);

  return (
    <section ref={sectionRef} id="work" className="portfolio-section py-12 md:pt-16 md:pb-16" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="portfolio-pin mx-auto max-w-7xl px-6">
        <div data-reveal className="text-center mb-8">
          <div className="text-sm font-medium text-accent mb-3 uppercase tracking-widest">{t("work.label")}</div>
          <h2 className="text-4xl md:text-5xl font-bold">{t("work.heading1")} <span className="text-gradient">{t("work.heading2")}</span></h2>
          {i18n.language.startsWith("bg") ? (
            <a href="#book" className="mt-3 inline-flex text-sm text-muted-foreground hover:text-foreground transition items-center gap-1">
              {t("work.wantToBeNext")} <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <Link to="/portfolio" className="mt-3 inline-flex text-sm text-muted-foreground hover:text-foreground transition items-center gap-1">
              {t("work.viewAllWork")} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
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
              const content = <PortfolioCardContent project={p} viewLabel={t("work.viewProject")} />;
              const className = "snap-start shrink-0 flex flex-col gap-4 w-[85%] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] group cursor-pointer";
              return p.to ? (
                <Link key={p.name} to={p.to} draggable={false} data-card className={className}>{content}</Link>
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
