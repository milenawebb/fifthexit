import { Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { useHomeMotion } from "@/hooks/use-home-motion";

export interface CaseStudyCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subhead: string;
  meta: { label: string; value: string }[];
  overviewTitle: string;
  overview: string[];
  builtTitle: string;
  built: { label: string; text: string }[];
  designTitle: string;
  design: string;
  imageAlt: string;
  imagePlaceholder: string;
  gallery?: { alt: string; caption: string }[];
  resultsTitle: string;
  results: { value: string; label: string }[];
  source: string;
  stackTitle: string;
  visit: string;
  previous: string;
  next: string;
  cta: string;
  book: string;
}

interface CaseStudyProps {
  copy: CaseStudyCopy;
  image: string;
  imageSize?: { width: number; height: number };
  gallery?: { image: string; alt: string; caption: string }[];
  stack: string[];
  liveUrl: string;
  previous: { name: string; href: string };
  next: { name: string; href: string };
}

const ext = (href: string) => (href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" });

export function CaseStudy({ copy, image, imageSize = { width: 1200, height: 718 }, gallery, stack, liveUrl, previous, next }: CaseStudyProps) {
  const motionRef = useHomeMotion();
  return (
    <div ref={motionRef} className="case-study bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-7xl px-6 pt-32 md:pt-40">
        <article>
          <header className="mb-12 md:mb-16">
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">{copy.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{copy.subhead}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 md:grid-cols-5">
              {copy.meta.map(item => (
                <div key={item.label} className="min-w-0">
                  <dt className="mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm leading-relaxed">{item.value}</dd>
                </div>
              ))}
            </dl>
          </header>
          <img src={image} alt={copy.imageAlt} width={imageSize.width} height={imageSize.height} fetchPriority="high" className="block h-auto w-full rounded-lg" />
          <section data-reveal className="grid gap-6 border-b border-border py-16 md:grid-cols-[1fr_2fr] md:gap-16 md:py-24">
            <h2 className="text-2xl font-bold md:text-3xl">{copy.overviewTitle}</h2>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {copy.overview.map(text => <p key={text}>{text}</p>)}
            </div>
          </section>
          <section data-reveal className="grid gap-6 border-b border-border py-16 md:grid-cols-[1fr_2fr] md:gap-16 md:py-24">
            <h2 className="text-2xl font-bold md:text-3xl">{copy.builtTitle}</h2>
            <ul className="divide-y divide-border">
              {copy.built.map(item => <li key={item.label} className="py-5 first:pt-0 last:pb-0"><h3 className="mb-2 text-lg font-semibold">{item.label}</h3><p className="leading-relaxed text-muted-foreground">{item.text}</p></li>)}
            </ul>
          </section>
          <section className="py-16 md:py-24">
            <div data-reveal className="mb-10 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
              <h2 className="text-2xl font-bold md:text-3xl">{copy.designTitle}</h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{copy.design}</p>
            </div>
            {gallery?.length ? (
              <div data-reveal className="grid gap-6 md:grid-cols-2 md:gap-8">
                {gallery.map(item => (
                  <figure key={item.caption} className="min-w-0">
                    <img src={item.image} alt={item.alt} width={1600} height={1000} loading="lazy" decoding="async" className="block h-auto w-full rounded-lg border border-border" />
                    <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div data-reveal role="img" aria-label={copy.imagePlaceholder} className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-border bg-card px-6">
                <p aria-hidden="true" className="text-center font-mono text-sm text-muted-foreground">{copy.imagePlaceholder}</p>
              </div>
            )}
          </section>
          <section data-reveal className="border-t border-border py-16 md:py-24">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">{copy.resultsTitle}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {copy.results.map(item => <div key={item.label} className="rounded-lg border border-border bg-card p-6 md:p-8"><p className="mb-4 font-display text-5xl font-bold text-accent">{item.value}</p><p className="text-sm leading-relaxed text-muted-foreground">{item.label}</p></div>)}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{copy.source}</p>
          </section>
          <section data-reveal className="flex flex-wrap items-center justify-between gap-8 border-y border-border py-8">
            <div><h2 className="mb-4 text-lg font-semibold">{copy.stackTitle}</h2><ul className="flex flex-wrap gap-2">{stack.map(name => <li key={name} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground">{name}</li>)}</ul></div>
            <Button asChild className="bg-gradient-hero text-primary-foreground hover:opacity-90"><a href={liveUrl} target="_blank" rel="noopener noreferrer">{copy.visit}</a></Button>
          </section>
          <nav aria-label={copy.eyebrow} className="grid grid-cols-2 gap-6 py-10 md:py-14">
            <a href={previous.href} {...ext(previous.href)} className="min-w-0 py-2 transition hover:text-accent"><span className="mb-2 block text-xs font-mono uppercase text-muted-foreground">{copy.previous}</span><span className="text-sm font-semibold md:text-lg">{previous.name}</span></a>
            <a href={next.href} {...ext(next.href)} className="min-w-0 py-2 text-right transition hover:text-accent"><span className="mb-2 block text-xs font-mono uppercase text-muted-foreground">{copy.next}</span><span className="text-sm font-semibold md:text-lg">{next.name}</span></a>
          </nav>
        </article>
        <section data-reveal className="border-t border-border py-16 text-center md:py-24">
          <h2 className="mx-auto mb-8 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">{copy.cta}</h2>
          <Button asChild className="bg-gradient-hero text-primary-foreground hover:opacity-90"><Link to="/" hash="book">{copy.book}</Link></Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}