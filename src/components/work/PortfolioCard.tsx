import { ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-projects";

/** Card content shared by the homepage carousel and the /portfolio grid. */
export function PortfolioCardContent({ project, viewLabel }: { project: PortfolioProject; viewLabel: string }) {
  const domain = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
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
            src={project.image}
            alt={`${project.name} website preview`}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-top md:transition-transform md:duration-700 md:group-hover:scale-105 pointer-events-none"
            loading="lazy"
          />
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="hidden md:flex absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/95 via-black/85 to-black/40 p-5 flex-col text-white">
            <p className="text-sm text-white/90 mb-3">{project.desc}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gradient w-fit">
              {viewLabel} <ArrowRight className="h-4 w-4 text-accent" />
            </span>
          </div>
        </div>
      </div>

      <div className="px-1">
        <div className="text-xs uppercase tracking-widest text-accent mb-1">{project.tag}</div>
        <div className="text-xl font-bold font-display mb-2 text-foreground">{project.name}</div>
        <p className="text-sm text-muted-foreground mb-2 md:hidden">{project.desc}</p>
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition">
          {viewLabel} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </>
  );
}
