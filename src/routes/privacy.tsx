import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection, type TocItem } from "@/components/legal-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Hype Street" },
      { name: "description", content: "How Hype Street (MW Global LLC) collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Hype Street" },
      { property: "og:description", content: "Hype Street's Privacy Policy." },
    ],
  }),
  component: PrivacyPage,
});

const toc: TocItem[] = [{ id: "coming-soon", label: "Coming soon" }];

function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      effectiveDate="MW Global LLC (DBA: Hype Street)"
      toc={toc}
    >
      <LegalSection id="coming-soon" title="Coming soon">
        <p>
          Our full Privacy Policy is being finalized. In the meantime, contact us at{" "}
          <a href="mailto:info@hype-street.com" className="text-primary hover:underline">
            info@hype-street.com
          </a>{" "}
          with any privacy questions.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
