import { useTranslation } from "react-i18next";
import { Header, Footer } from "@/components/site-chrome";
import { BgPrivacyContent } from "@/components/legal-bg/privacy";
import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection, type TocItem } from "@/components/legal-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { name: "description", content: "How fifthexit (MW Global LLC / DBA Fifth Exit) collects, uses, and protects your personal information." },
      { property: "og:description", content: "fifthexit's Privacy Policy." },
    ],
  }),
  component: LocalizedPage,
});

const toc: TocItem[] = [
  { id: "introduction", label: "1. Introduction" },
  { id: "info-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Information" },
  { id: "sharing", label: "4. Sharing Your Information" },
  { id: "retention", label: "5. Data Retention" },
  { id: "security", label: "6. Security" },
  { id: "your-rights", label: "7. Your Rights" },
  { id: "children", label: "8. Children's Privacy" },
  { id: "third-party-links", label: "9. Third-Party Links" },
  { id: "changes", label: "10. Changes to This Policy" },
  { id: "contact", label: "11. Contact Us" },
];

function PrivacyPageEn() {
  return (
    <LegalLayout
      title="Privacy Policy"
      effectiveDate="Effective date: May 12, 2026 · MW Global LLC / DBA Fifth Exit (DBA: fifthexit)"
      toc={toc}
    >
      <p className="mb-10 text-foreground/70">
        Your privacy matters to us. This Privacy Policy explains how MW Global LLC / DBA Fifth Exit (DBA: fifthexit) collects, uses, and protects information when you visit our website or engage our
        services.
      </p>

      <LegalSection id="introduction" title="1. Introduction">
        <p>
          MW Global LLC / DBA Fifth Exit, doing business as fifthexit, operates the website at fifthexit.com.
          This policy describes our practices for collecting, using, disclosing, and protecting
          personal information. This policy is intended to comply with applicable privacy laws,
          including the Florida Information Protection Act (FIPA).
        </p>
      </LegalSection>

      <LegalSection id="info-we-collect" title="2. Information We Collect">
        <p>
          <strong className="text-foreground">Information You Provide Directly:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong className="text-foreground">Contact & Inquiry Forms</strong> — name, email
            address, company name, project details, service interest, and budget range.
          </li>
          <li>
            <strong className="text-foreground">Client Onboarding</strong> — business information,
            billing address, and payment details (processed by third-party payment processors; we do
            not store card numbers).
          </li>
          <li>
            <strong className="text-foreground">Communications</strong> — the content of emails and
            messages you send us.
          </li>
        </ul>

        <p>
          <strong className="text-foreground">Information Collected Automatically:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong className="text-foreground">Usage Data</strong> — IP address, browser type and
            version, operating system, referring URL, pages visited, time spent on pages, and
            clickstream data.
          </li>
          <li>
            <strong className="text-foreground">Cookies & Tracking Technologies</strong> — see our
            Cookie Policy for details.
          </li>
          <li>
            <strong className="text-foreground">Analytics</strong> — aggregated data collected
            through tools such as Google Analytics.
          </li>
        </ul>

        <p>
          <strong className="text-foreground">Information from Third Parties:</strong> Information
          from referral partners or publicly available sources when assessing potential client
          engagements.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" title="3. How We Use Your Information">
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Respond to inquiries and provide requested services (contractual necessity)</li>
          <li>Send project updates, invoices, and communications (contractual necessity)</li>
          <li>Process payments through our payment processor (contractual necessity)</li>
          <li>Improve our website and services (legitimate interest)</li>
          <li>Analyze website usage and performance (legitimate interest)</li>
          <li>Send marketing or promotional content if opted in (your consent)</li>
          <li>Comply with legal obligations (legal obligation)</li>
          <li>Detect and prevent fraud or abuse (legitimate interest)</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </LegalSection>

      <LegalSection id="sharing" title="4. Sharing Your Information">
        <p>We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Service Providers</strong> — trusted third-party
            vendors who assist us in operating our business (payment processors, cloud hosting,
            email delivery, project management tools), bound contractually to protect your data.
          </li>
          <li>
            <strong className="text-foreground">Professional Advisors</strong> — lawyers,
            accountants, or other advisors under duties of confidentiality.
          </li>
          <li>
            <strong className="text-foreground">Business Transfers</strong> — in the event of a
            merger, acquisition, or sale of assets.
          </li>
          <li>
            <strong className="text-foreground">Legal Requirements</strong> — when required by law,
            court order, or governmental authority.
          </li>
        </ul>
        <p>
          We do not share, rent, or sell your personal information to advertisers or data brokers.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="5. Data Retention">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Client project records are retained for a minimum of 5 years after project completion.</li>
          <li>Inquiry form submissions are retained for up to 2 years if no engagement results.</li>
          <li>
            Website analytics data is retained per our analytics provider's settings (typically 26
            months).
          </li>
        </ul>
        <p>When data is no longer needed, we securely delete or anonymize it.</p>
      </LegalSection>

      <LegalSection id="security" title="6. Security">
        <p>We implement reasonable administrative, technical, and physical safeguards including:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>HTTPS/TLS encryption on our website and in data transmissions</li>
          <li>Access controls limiting data access to authorized personnel</li>
          <li>Use of reputable, security-certified third-party service providers</li>
          <li>Regular review of our data collection and storage practices</li>
        </ul>
        <p>
          No transmission or storage system is 100% secure. If you believe your information has been
          compromised, contact us at{" "}
          <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
            info@fifthexit.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="7. Your Rights">
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Access a copy of the personal information we hold about you</li>
          <li>Correction of inaccurate or incomplete information</li>
          <li>Deletion of your personal information, subject to legal retention requirements</li>
          <li>Object to or request restriction of certain processing activities</li>
          <li>Receive your data in a machine-readable format where feasible</li>
          <li>Withdraw consent where processing is based on your consent</li>
          <li>Opt out of marketing emails</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
            info@fifthexit.com
          </a>
          . We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection id="children" title="8. Children's Privacy">
        <p>
          Our website and services are not directed to individuals under the age of 13. We do not
          knowingly collect personal information from children under 13. Contact us at{" "}
          <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
            info@fifthexit.com
          </a>{" "}
          if you believe we have inadvertently collected such information.
        </p>
      </LegalSection>

      <LegalSection id="third-party-links" title="9. Third-Party Links">
        <p>
          Our website may contain links to third-party websites. This Privacy Policy does not apply
          to those third parties. We are not responsible for the content or privacy practices of
          external sites.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy periodically. We will post updates at
          fifthexit.com/privacy with a revised effective date.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="11. Contact Us">
        <p>
          MW Global LLC / DBA Fifth Exit (DBA: fifthexit)
          <br />
          Privacy Contact:{" "}
          <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
            info@fifthexit.com
          </a>
          <br />
          Website: fifthexit.com
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

function LocalizedPage() {
  const { i18n } = useTranslation();
  if (i18n.language?.startsWith("bg")) {
    return (
      <>
        <Header />
        <BgPrivacyContent />
        <Footer />
      </>
    );
  }
  return <PrivacyPageEn />;
}
