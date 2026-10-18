import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

/** Mounts children only when near the viewport (or when its hash is targeted); reserves height meanwhile. */
export default function LazySection({ id, minHeight, children, className }: { id: string; minHeight: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.location.hash === `#${id}`) { setShow(true); return; }
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShow(true); return; }
    const io = new IntersectionObserver((e) => {
      if (e.some((x) => x.isIntersecting)) { setShow(true); io.disconnect(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    const onHash = () => { if (window.location.hash === `#${id}`) setShow(true); };
    window.addEventListener("hashchange", onHash);
    return () => { io.disconnect(); window.removeEventListener("hashchange", onHash); };
  }, [id]);

  const placeholder = <div className={className} id={id} ref={ref} style={{ minHeight }} aria-hidden="true" />;
  if (!show) return placeholder;
  return <Suspense fallback={<div className={className} id={id} style={{ minHeight }} />}>{children}</Suspense>;
}
