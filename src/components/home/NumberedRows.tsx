import { useTranslation } from "react-i18next";

type Row = { titleKey: string; descKey: string };

export default function NumberedRows({
  id,
  labelKey,
  headingKey,
  introKey,
  rows,
}: {
  id: string;
  labelKey: string;
  headingKey: string;
  introKey: string;
  rows: Row[];
}) {
  const { t } = useTranslation();
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 max-w-4xl md:mb-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(labelKey)}</p>
          <h2 id={`${id}-heading`} className="mb-6 text-4xl font-semibold leading-tight tracking-normal text-foreground md:text-5xl">{t(headingKey)}</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(introKey)}</p>
        </header>
        <ol className="border-t border-section-divider">
          {rows.map((row, index) => (
            <li key={row.titleKey} className="group grid gap-5 border-b border-section-divider py-9 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,0.8fr)] md:gap-8 md:py-12 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,0.65fr)] lg:gap-12">
              <span className="pt-1 font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground motion-reduce:transition-none">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="min-w-0 text-2xl font-medium leading-snug tracking-normal text-foreground md:text-3xl lg:text-4xl">{t(row.titleKey)}</h3>
              <p className="min-w-0 max-w-prose text-base leading-relaxed text-muted-foreground">{t(row.descKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}