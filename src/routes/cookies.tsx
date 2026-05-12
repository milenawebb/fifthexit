import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection, type TocItem } from "@/components/legal-layout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Hype Street" },
      { name: "description", content: "How Hype Street uses cookies and similar tracking technologies." },
      { property: "og:title", content: "Cookie Policy — Hype Street" },
      { property: "og:description", content: "Hype Street's Cookie Policy." },
    ],
  }),
  component: CookiesPage,
});

const toc: TocItem[] = [{ id: "coming-soon", label: "Coming soon" }];

function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      effectiveDate="MW Global LLC (DBA: Hype Street)"
      toc={toc}
    >
      <LegalSection id="coming-soon" title="Coming soon">
        <p>
          Our full Cookie Policy is being finalized. In the meantime, contact us at{" "}
          <a href="mailto:info@hype-street.com" className="text-primary hover:underline">
            info@hype-street.com
          </a>{" "}
          with any questions.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
