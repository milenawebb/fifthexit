import { useEffect, useRef } from "react";
import { mvpProgress, scrollProgress } from "./motion-math";

/** One observer for eager and lazy content; the initial page remains visible until hydration. */
export function useHomeMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const start = () => {
      cleanup();
      if (reduced.matches) {
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => el.classList.remove("reveal-pending"));
        return;
      }
      const seen = new WeakSet<Element>();
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-shown");
          io.unobserve(entry.target);
        });
      }, { threshold: 0.18 });
      const discover = () => root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => {
        if (seen.has(el) || el.classList.contains("reveal-shown")) return;
        seen.add(el);
        // Don't hide content already painted in the first viewport.
        if (el.getBoundingClientRect().top < window.innerHeight && window.scrollY < 80) {
          el.classList.add("reveal-shown");
        } else {
          el.classList.add("reveal-pending");
          io.observe(el);
        }
      });
      discover();
      const mutations = new MutationObserver(discover);
      mutations.observe(root, { childList: true, subtree: true });
      const hero = root.querySelector<HTMLElement>("#top");
      let frame = 0;
      let near = true;
      const update = () => {
        frame = 0;
        if (!hero || !near) return;
        const progress = scrollProgress(-hero.getBoundingClientRect().top, hero.offsetHeight);
        hero.style.setProperty("--hero-progress", String(progress));
      };
      const onScroll = () => { if (!frame && near) frame = requestAnimationFrame(update); };
      const heroObserver = new IntersectionObserver(entries => {
        near = entries.some(e => e.isIntersecting);
        if (!near && hero) hero.style.setProperty("--hero-progress", window.scrollY > hero.offsetHeight ? "1" : "0");
        if (near) onScroll();
      });
      if (hero && !CSS.supports("animation-timeline", "scroll()")) {
        heroObserver.observe(hero);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();
      }
      cleanup = () => {
        io.disconnect(); mutations.disconnect(); heroObserver.disconnect(); cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      };
    };
    start();
    reduced.addEventListener("change", start);
    return () => { cleanup(); reduced.removeEventListener("change", start); };
  }, []);
  return ref;
}

export function useMvpFocus() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-mvp-step]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let near = false;
    const update = () => {
      frame = 0;
      if (!near) return;
      let best = 0;
      let distance = Infinity;
      cards.forEach((card, i) => {
        const box = card.getBoundingClientRect();
        const d = Math.abs(box.top + box.height / 2 - window.innerHeight / 2);
        if (d < distance) { distance = d; best = i; }
      });
      cards.forEach((card, i) => card.classList.toggle("mvp-active", i === best));
      section.style.setProperty("--mvp-progress", String(mvpProgress(best)));
      section.dataset.activeStep = String(best + 1);
    };
    const schedule = () => { if (!frame && !reduced.matches) frame = requestAnimationFrame(update); };
    const io = new IntersectionObserver(entries => { near = entries.some(e => e.isIntersecting); schedule(); });
    io.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { io.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, []);
  return ref;
}