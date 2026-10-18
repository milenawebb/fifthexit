import { useCallback, useEffect, useRef, useState } from "react";
import { scrollProgress } from "./motion-math";

export function usePortfolioMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const desktop = useRef(false);
  const reduced = useRef(false);
  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!section || !scroller || !track) return;
    const wide = window.matchMedia("(min-width: 861px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let near = false;
    const update = () => {
      frame = 0;
      if (!near) return;
      const max = Math.max(0, track.scrollWidth - scroller.clientWidth);
      let offset = scroller.scrollLeft;
      if (desktop.current) {
        const box = section.getBoundingClientRect();
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        offset = scrollProgress(-box.top, distance) * max;
        track.style.transform = `translate3d(${-offset}px,0,0)`;
      }
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
      // Use a leading-card index so the first and last dots are reachable.
      const index = max ? Math.round(offset / max * (cards.length - 1)) : 0;
      setActiveIndex(index);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      reduced.current = motion.matches;
      desktop.current = wide.matches && !motion.matches;
      section.classList.toggle("portfolio-desktop", desktop.current);
      track.style.transform = "";
      scroller.scrollLeft = 0;
      schedule();
    };
    configure();
    const io = new IntersectionObserver(entries => { near = entries.some(e => e.isIntersecting); schedule(); }, { rootMargin: "200px" });
    io.observe(section);
    const resize = new ResizeObserver(schedule);
    resize.observe(scroller); resize.observe(track);
    window.addEventListener("scroll", schedule, { passive: true });
    scroller.addEventListener("scroll", schedule, { passive: true });
    wide.addEventListener("change", configure); motion.addEventListener("change", configure);
    const focus = (e: FocusEvent) => {
      if (!desktop.current || !(e.target instanceof Element)) return;
      const card = e.target.closest<HTMLElement>("[data-card]");
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
      if (card) {
        const index = cards.indexOf(card);
        const top = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + index / Math.max(1, cards.length - 1) * (section.offsetHeight - window.innerHeight), behavior: "instant" });
      }
    };
    track.addEventListener("focusin", focus);
    return () => {
      io.disconnect(); resize.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule); scroller.removeEventListener("scroll", schedule);
      wide.removeEventListener("change", configure); motion.removeEventListener("change", configure); track.removeEventListener("focusin", focus);
    };
  }, []);
  const goTo = useCallback((index: number) => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!section || !scroller || !track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    const i = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[i];
    if (!card) return;
    if (desktop.current) {
      const top = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({ top: top + i / Math.max(1, cards.length - 1) * (section.offsetHeight - window.innerHeight), behavior: "smooth" });
    } else {
      scroller.scrollTo({ left: card.offsetLeft, behavior: reduced.current ? "instant" : "smooth" });
    }
  }, []);
  return { sectionRef, scrollerRef, trackRef, activeIndex, goTo };
}