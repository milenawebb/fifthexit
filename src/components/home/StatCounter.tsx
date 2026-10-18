import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, index }: { value: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || index > 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      if (reduced.matches) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        const number = (index === 0 ? 2 : 90) * (1 - Math.pow(1 - progress, 3));
        setDisplay(progress === 1 ? value : value.replace(index === 0 ? "2" : "90", index === 0 ? number.toFixed(1) : String(Math.round(number))));
        if (progress < 1 && !reduced.matches) frame = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.18 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [value, index]);
  return <span ref={ref} aria-label={value}><span aria-hidden="true">{display}</span></span>;
}