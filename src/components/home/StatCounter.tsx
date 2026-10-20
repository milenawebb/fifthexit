import { useEffect, useRef } from "react";

// Single text node: the count-up writes into the same node that holds the final value.
export default function StatCounter({ value, index }: { value: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || index > 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const target = index === 0 ? "2" : "90";
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      if (reduced.matches) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        const n = (index === 0 ? 2 : 90) * (1 - Math.pow(1 - progress, 3));
        el.textContent = progress === 1 ? value : value.replace(target, index === 0 ? n.toFixed(1) : String(Math.round(n)));
        if (progress < 1 && !reduced.matches) frame = requestAnimationFrame(tick);
        else el.textContent = value;
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.18 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); el.textContent = value; };
  }, [value, index]);
  return <span ref={ref}>{value}</span>;
}
